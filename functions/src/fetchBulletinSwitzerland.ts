import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
import * as md5 from "md5";
import {
  IAvalancheProblem,
  IBulletin,
  ITendency,
  IText,
  TValidTimePeriod,
} from "./models";
import { DangerLevels } from "../utils";
import {
  calcMaxDangerRating,
  getBulletinDate,
  groupBy,
  isUpdated,
  processRegionalBulletins,
  updateFirestore,
  updatesForMapbox,
} from "./processCAAMLv5";
// eslint-disable-next-line import/no-unresolved
import { Timestamp } from "firebase-admin/firestore";
import { bulletinUrls } from "./bulletinURLS";
import { formatInTimeZone } from "date-fns-tz";

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "512MB",
};

const euFunctions = functions.region("europe-west1");
const heavyFunctions = euFunctions.runWith(runtimeOpts);

const PROVIDER = "CH";

export const fetchSLFMeteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(PROVIDER);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error("Error fetching region map file: ", err);
      response.send(`Error fetching region map file: ${err}`);
    }
  }
);

export const fetchSLFMeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(PROVIDER);
  });

async function updateBulletins(
  provider: string
): Promise<Record<string, Record<string, Timestamp | string>>> {
  let updated: Record<string, Record<string, Timestamp | string>> = {};
  const languages: string[] = bulletinUrls[provider].lang;

  for (const lang of languages) {
    try {
      const url = bulletinUrls[provider].url.json;
      const json = await fetchBulletin(url);

      if (json && json.bulletin_active === true) {
        const checksum = md5(JSON.stringify(json));

        if (await isUpdated(checksum, lang, provider)) {
          functions.logger.info(
            `Processing new updates to ${provider} bulletin in lang: ${lang}`
          );

          const jsonData = json.avalanche_bulletin;
          const bulletins = processBulletins(jsonData, provider, lang);
          const regionalBulletins = processRegionalBulletins(
            bulletins,
            provider
          );

          const updates = await updateFirestore(regionalBulletins, lang);
          updated = { ...updated, ...updates };

          const ref = admin
            .firestore()
            .collection("bulletinState")
            .doc(provider);
          await ref.update({ [`checksum_${lang}`]: checksum });
          await updatesForMapbox(updated);
          functions.logger.info(
            `Updates to ${provider} bulletins in ${lang} finished. Mapbox bulletin state updated`
          );
        } else {
          functions.logger.warn(
            `No new updates for ${provider} bulletin in lang: ${lang}`
          );
        }
      } else {
        functions.logger.info(`No new updates to ${lang} Swiss Bulletin`);
      }
    } catch (err) {
      functions.logger.error(`Error updating ${provider} bulletins: `, err);
    }
  }
  return updated;
}

async function fetchBulletin(url: string): Promise<any | null> {
  const resp = await fetch(url);

  if (resp.ok) {
    return await resp.json();
  } else {
    functions.logger.error(`Bad response ${resp.status} for `, url, 2);
  }
}

export function processBulletins(
  jsonData: any,
  provider: string,
  lang: string
): IBulletin[] {
  const generalBulletin = processGeneralBulletin(jsonData, lang);

  const id = jsonData.id;
  const bulletins = jsonData.avalanche_map_bulletin.rating_1.regions.map(
    (bulletin: any, index: number) => {
      const bulletinID = `${provider}-${id}${String(index).padStart(3, "0")}`;
      const validTimePeriod: TValidTimePeriod =
        jsonData.avalanche_map_bulletin.rating_2 === null
          ? "allDay"
          : "earlier";
      return processBulletin(bulletin, lang, bulletinID, validTimePeriod);
    }
  );

  if (jsonData.avalanche_map_bulletin.rating_2) {
    bulletins.concat(
      jsonData.avalanche_map_bulletin.rating_2.regions.map(
        (bulletin: any, index: number) => {
          const bulletinID = `${provider}-${id}${String(index).padStart(
            3,
            "0"
          )}`;
          const validTimePeriod: TValidTimePeriod =
            jsonData.avalanche_map_bulletin.rating_2 === null
              ? "allDay"
              : "later";
          return processBulletin(bulletin, lang, bulletinID, validTimePeriod);
        }
      )
    );
  }

  // Merges AM and PM bulletin reports
  const groupedBulletins = groupBy(bulletins, "bulletinID");

  const finalBulletins = Object.values(groupedBulletins).map(
    (bulletin: IBulletin) => {
      const maxDangerRatingsAllDay = calcMaxDangerRating(
        bulletin.dangerRatings
      );
      const maxDangerRatingsEarlier = calcMaxDangerRating(
        bulletin.dangerRatings,
        "earlier"
      );
      const maxDangerRatingsLater = calcMaxDangerRating(
        bulletin.dangerRatings,
        "later"
      );
      return {
        ...generalBulletin,
        ...bulletin,
        maxDangerRatings: {
          allDay: maxDangerRatingsAllDay,
          earlier: maxDangerRatingsEarlier
            ? maxDangerRatingsEarlier
            : maxDangerRatingsAllDay,
          later: maxDangerRatingsLater
            ? maxDangerRatingsLater
            : maxDangerRatingsAllDay,
        },
      };
    }
  );

  return finalBulletins;
}

function processGeneralBulletin(jsonData: any, lang: string) {
  const snowPackStructure: Record<string, string> = {};
  const weather: any[] = [];
  const tendency: ITendency = {};

  const paragraphs = jsonData.avalanche_map_bulletin.snow_weather.paragraphs;
  const snowPack = [
    "schneedecke",
    "manteau neigeux",
    "manto nevoso",
    "snowpack",
  ];
  const observed = ["rückblick", "rétrospective", "retrospettiva", "observed"];
  const forecast = ["prognose", "prévisions", "previsioni", "forecast"];
  const outlook = ["tendenz", "tendance", "tendenza", "outlook"];
  const snow = ["neuschnee", "neige", "neve", "snow"];
  const temp = ["temperatur", "température", "temperatura", "temperature"];
  const wind = ["wind", "vent", "vento"];

  paragraphs.map((paragraph: any) => {
    const title: string = paragraph[`title_${lang}`] ?? "";
    const text: string = paragraph[`${lang}`] ?? "";

    if (snowPack.includes(title.toLowerCase())) {
      snowPackStructure.comment = text;
    } else if (
      outlook.some((s: string) =>
        new RegExp(`${s}`).test(`${title.toLowerCase()}`)
      ) === true
    ) {
      tendency.highlight = title;
      tendency.comment = text;
    } else if (
      observed.some(
        (s: string) =>
          new RegExp(`${s}`).test(`${title.toLowerCase()}`) === true
      ) ||
      forecast.some(
        (s: string) =>
          new RegExp(`${s}`).test(`${title.toLowerCase()}`) === true
      )
    ) {
      const conditions: Record<string, string> = {};
      let key: string = "";
      for (const subparagraph of paragraph.subparagraphs) {
        const subtitle: string = subparagraph[`title_${lang}`] ?? "";
        const array: string[][] = [snow, wind, temp];
        for (let i = 0; i < array.length; i++) {
          if (
            array[i].some(
              (s: string) =>
                new RegExp(`${s}`).test(`${subtitle.toLowerCase()}`) === true
            )
          ) {
            key = i === 0 ? "snow" : i === 1 ? "temp" : "wind";
          }
        }
        if (key.length) {
          conditions[key] = subparagraph[`${lang}`] ?? "";
        }
      }

      weather.push({
        highlight: title,
        comment: text,
        ...conditions,
      });
    }
  });

  const publicationTime = new Date(jsonData.valid_from);
  const bulletinDate = getBulletinDate(publicationTime);
  const dateTime = formatInTimeZone(
    publicationTime,
    "Europe/Paris",
    "yyyyMMddHHmm"
  );

  return {
    publicationTime: Timestamp.fromDate(publicationTime),
    bulletinDate,
    dateTime,
    validTime: {
      startTime: Timestamp.fromDate(publicationTime),
      endTime: Timestamp.fromDate(new Date(jsonData.valid_to)),
    },
    lang,
    source: "WSL Institute for Snow and Avalanche Research SLF",
    highlights: jsonData.flash[`${lang}`] ?? "",
    snowPackStructure,
    tendency,
    weather,
  };
}

type Bulletin = any;

function getElevation(bulletin: any) {
  if (bulletin.altitude) {
    let level = bulletin.altitude.indicator;
    if (level !== "ALL") {
      const elevation = bulletin.altitude.altitude;
      level = level === "BELOW" ? "upperBound" : "lowerBound";
      return {
        [level]: {
          numeric: Number(elevation),
          string: `${elevation}m`,
        },
      };
    }
  }
  return {};
}

function getAspects(aspect: any) {
  const Aspects: Record<string, string> = {
    north: "N",
    northeast: "NE",
    east: "E",
    southeast: "SE",
    south: "S",
    southwest: "SW",
    west: "W",
    northwest: "NW",
  };
  if (aspect && Object.keys(aspect).length) {
    const aspectKeys = Object.keys(Aspects).concat(Object.keys(Aspects));
    const i1 = aspectKeys.indexOf(aspect.from);
    const i2 = aspectKeys.indexOf(aspect.to, i1);
    const points = aspectKeys.slice(i1, i2 + 1).map((a) => Aspects[a]);
    return points;
  }
  return [];
}

function getAvProblems(feature: any, validTimePeriod: string) {
  const AvalancheProblems: Record<string, string> = {
    new: "new_snow",
    drift: "drifting_snow",
    slab: "drifting_snow",
    old: "old_snow",
    alt: "old_snow",
    wet: "wet_snow",
    favourable: "favourable_situation",
    pattern: "no_distinct_pattern",
  };

  const problemsMatch = Object.keys(AvalancheProblems).join("|");
  const avProblems: IAvalancheProblem[] = [];
  const aspects = getAspects(feature.aspect);
  const elevation = getElevation(feature);

  const majorAvProblem = feature.majorAvalProblems.reduce(
    (problems: Record<string, any>[], activity: any) => {
      const highlight = activity.toLowerCase();
      const match = highlight.match(`${problemsMatch}`);
      if (match) {
        const problem = AvalancheProblems[match];
        problems.push({
          type: problem,
          aspects,
          elevation,
          validTimePeriod,
        });
      }
      return problems;
    },
    []
  );

  const additionalAvProblem = feature.additionalAvalProblems.reduce(
    (problems: Record<string, any>[], activity: any) => {
      const highlight = activity.toLowerCase();
      const match = highlight.match(`\\b(${problemsMatch})\\b`);
      if (match) {
        const problem = AvalancheProblems[match];
        problems.push({
          type: problem,
          aspects,
          elevation,
          validTimePeriod,
        });
      }
      return problems;
    },
    []
  );

  return avProblems.concat(...majorAvProblem, ...additionalAvProblem);
}

function getAvalancheActivity(bulletin: Bulletin, lang: string) {
  const avActivity: IText[] = [];

  avActivity.push({
    highlight: bulletin.coreZoneText ? bulletin.coreZoneText[`${lang}`] : "",
    comment: bulletin.majorDangerDescription
      ? bulletin.majorDangerDescription[`${lang}`]
      : "",
  });

  if (bulletin.additionalDangerDescription) {
    avActivity.push({
      comment: bulletin.additionalDangerDescription[`${lang}`],
    });
  }

  return avActivity;
}

function getDangerRating(
  bulletin: Bulletin,
  validTimePeriod: TValidTimePeriod
) {
  const [risk] = bulletin.dangerlevel.level.split("_");
  return [
    {
      mainValue: {
        numeric: Number(risk),
        string: DangerLevels[Number(risk)],
      },
      validTimePeriod,
      elevation: getElevation(bulletin),
    },
  ];
}

function processBulletin(
  bulletin: Bulletin,
  lang: string,
  bulletinID: string,
  validTimePeriod: TValidTimePeriod
) {
  const dangerRatings = getDangerRating(bulletin, validTimePeriod);
  const avalancheProblems = getAvProblems(bulletin, validTimePeriod);
  const avalancheActivity = getAvalancheActivity(bulletin, lang);

  return {
    bulletinID: [bulletinID],
    dangerRatings,
    avalancheProblems,
    avalancheActivity,
    regions: bulletin.sectorList.map((value: any) => value.id),
  };
}
