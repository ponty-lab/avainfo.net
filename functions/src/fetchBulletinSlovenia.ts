import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { bulletinUrls } from "./bulletinURLS";
import * as xml2js from "xml2js";
import * as md5 from "md5";
import { addDays } from "date-fns";
import { stripPrefix } from "xml2js/lib/processors";
import {
  calcMaxDangerRating,
  cleanString,
  getValidTimePeriod,
  getBulletinDate,
  fetchBulletin,
  isUpdated,
  getAvProblems,
  getElevation,
  updateFirestore,
  updatesForMapbox,
} from "./processCAAMLv5";
import { regionNames } from "../assets";
import { IBulletin, TAvalancheSize } from "./models";
import { DangerLevels } from "../utils";
// eslint-disable-next-line import/no-unresolved
import { Timestamp } from "firebase-admin/firestore";

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "512MB",
};
console;

const euFunctions = functions.region("europe-west1");
const heavyFunctions = euFunctions.runWith(runtimeOpts);

const PROVIDER = "SI";

export const fetchSloveniaMeteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateSloveniaBulletins(PROVIDER);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${PROVIDER} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchSloveniaMeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateSloveniaBulletins(PROVIDER);
  });

async function updateSloveniaBulletins(
  provider: string
): Promise<Record<string, Record<string, Timestamp | string>>> {
  let updated: Record<string, Record<string, Timestamp | string>> = {};
  const languages: string[] = bulletinUrls[provider].lang;
  for (const lang of languages) {
    const url = bulletinUrls[provider].url.xml.replace("${lang}", ...lang);
    const text = await fetchBulletin(url);
    if (text) {
      const checksum = md5(text);
      if (await isUpdated(checksum, lang, provider)) {
        functions.logger.info(`${lang} ${provider} bulletin has new updates`);
        const jsonData = await xml2js.parseStringPromise(text, {
          tagNameProcessors: [stripPrefix],
        });
        if (jsonData) {
          const bulletins = processSloveniaBulletins(jsonData, provider);
          const updates = await updateFirestore(bulletins, lang);
          updated = { ...updated, ...updates };
          await updatesForMapbox(updated);
          const ref = admin
            .firestore()
            .collection("bulletinState")
            .doc(provider);
          await ref.update({ [`checksum_${lang}`]: checksum });
          functions.logger.info(
            `Updates to ${provider} bulletins in ${lang} finished. . Mapbox bulletin state updated`
          );
        } else {
          functions.logger.warn(
            `xml data for ${lang} ${provider} bulletin failed to convert to json`
          );
        }
      } else {
        functions.logger.warn(`No new updates ${lang} ${provider} bulletin`);
      }
    }
  }
  return updated;
}

function processSloveniaBulletins(
  jsonData: any,
  provider: string
): IBulletin[] {
  const bulletins: IBulletin[] = [];
  const data = jsonData.Bulletin;
  const observations = data.bulletinResultsOf[0].BulletinMeasurements[0];

  // Common bulletin for all regions
  const bulletin = processSloveniaBulletin(data, provider);

  const regions = getRegionsFromBulletin(observations);

  // Danger ratings are grouped by regionID
  const bulletinDate = new Date(
    data.validTime[0].TimeInstant[0].timePosition[0]
  );
  const nextBulletinDate = addDays(new Date(bulletinDate), 1);

  for (const region of regions) {
    const excludedRegions = bulletinUrls[provider].excludedRegions;

    const dangerRatingObj: any[] = [];
    if (observations.dangerRatings) {
      observations.dangerRatings[0].DangerRating.forEach((key: any) => {
        if (key.locRef[0].$["xlink:href"] === region) {
          dangerRatingObj.push(key);
        }
      });
    }

    const dangerRatings = getDangerRating(
      dangerRatingObj,
      bulletinDate,
      provider
    );
    const maxDangerRatingsAllDay = calcMaxDangerRating(dangerRatings);
    const maxDangerRatingsEarlier = calcMaxDangerRating(
      dangerRatings,
      "earlier"
    );
    const maxDangerRatingsLater = calcMaxDangerRating(dangerRatings, "later");

    if (!excludedRegions.includes(region)) {
      // console.log(`Region ${region} is regionName: ${regionNames[region]}`);
      bulletins.push({
        ...bulletin,
        regionName: regionNames[region],
        regionID: region,
        maxDangerRatings: {
          allDay: maxDangerRatingsAllDay,
          earlier: maxDangerRatingsEarlier
            ? maxDangerRatingsEarlier
            : maxDangerRatingsAllDay,
          later: maxDangerRatingsLater
            ? maxDangerRatingsLater
            : maxDangerRatingsAllDay,
        },
        dangerRatings,
        tendency: {
          ...bulletin.tendency,
          type: getTendency(dangerRatingObj, bulletinDate, nextBulletinDate),
        },
        provider,
      });
    }
  }

  return bulletins;
}

type Bulletin = any;
type Observations = any;

function getRegionsFromBulletin(observations: Observations) {
  const regions: string[] = [];

  if (observations.dangerRatings) {
    for (const region of observations.dangerRatings[0].DangerRating) {
      regions.push(region.locRef[0].$["xlink:href"]);
    }
  }
  return [...new Set(regions)];
}

function getDangerRating(
  dangerRating: any,
  bulletinDate: Date,
  provider: string
) {
  return dangerRating
    .map((danger: any) => {
      const validTime = new Date(
        danger.validTime[0].TimePeriod[0].beginPosition
      );
      if (validTime.getDay() === bulletinDate.getDay()) {
        return {
          mainValue: {
            numeric: Number(danger.mainValue[0]) as TAvalancheSize,
            string: DangerLevels[danger.mainValue[0]],
          },
          validTimePeriod: getValidTimePeriod(danger),
          elevation: danger.validElevation
            ? getElevation(danger.validElevation[0], provider)
            : null,
        };
      }
      return null;
    })
    .filter((danger: any) => danger !== null);
}

function getTendency(
  dangerRating: any,
  bulletinDate: Date,
  nextBulletinDate: Date
) {
  const today: number[] = [];
  const nextDay: number[] = [];
  let tendencyType: string | undefined = undefined;

  dangerRating.forEach((danger: any) => {
    const validTime = new Date(danger.validTime[0].TimePeriod[0].beginPosition);
    if (validTime.getDay() === bulletinDate.getDay()) {
      today.push(Number(danger.mainValue[0]));
    } else if (validTime.getDay() === nextBulletinDate.getDay()) {
      nextDay.push(Number(danger.mainValue[0]));
    }
  });

  const dangerToday = Math.max(...today);
  const dangerNextDay = Math.max(...nextDay);

  if (dangerToday < dangerNextDay) {
    tendencyType = "increasing";
  } else if (dangerToday === dangerNextDay) {
    tendencyType = "steady";
  } else if (dangerToday > dangerNextDay) {
    tendencyType = "decreasing";
  }

  return tendencyType;
}

function processSloveniaBulletin(bulletin: Bulletin, provider: string): any {
  const publicationTime = new Date(
    bulletin.metaDataProperty[0].MetaData[0].dateTimeReport[0]
  );
  const bulletinDate = getBulletinDate(publicationTime);
  const bulletinID = [
    `${bulletin.$["gml:id"].replace("_PM", "")}-${bulletinDate}`,
  ];
  const observations = bulletin.bulletinResultsOf[0].BulletinMeasurements[0];
  const avalancheProblems = getAvProblems({ observations, provider });
  //   functions.logger.info(`Generating bulletin id "${bulletinID}" at ${publicationTime}`);

  return {
    bulletinID,
    publicationTime: Timestamp.fromDate(publicationTime),
    bulletinDate: bulletinDate,
    validTime: {
      startTime: Timestamp.fromDate(
        new Date(bulletin.validTime[0].TimeInstant[0].timePosition[0])
      ),
      endTime: Timestamp.fromDate(new Date(`${bulletinDate}T23:59:59.999Z`)),
    },
    lang: "sl",
    source: "meteo.arso.gov.si",
    avalancheProblems,
    highlights: cleanString(observations.highlights),
    avalancheActivity: [
      {
        highlight: cleanString(observations.avActivityHighlights),
        comment: cleanString(observations.travelAdvisoryComment),
      },
    ],
    snowpackStructure: {
      highlight: cleanString(observations.snowpackStructureHighlights),
      comment: cleanString(observations.snowpackStructureComment),
    },
    tendency: {
      comment: cleanString(observations.wxSynopsisComment),
    },
    bulletinURI: bulletinUrls[provider].url.bulletin,
  };
}
