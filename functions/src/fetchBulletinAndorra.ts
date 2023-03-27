import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as xml2js from "xml2js";
import md5 = require("md5");
import { format, parse } from "date-fns";
// eslint-disable-next-line import/no-unresolved
import { Timestamp } from "firebase-admin/firestore";

import { bulletinUrls } from "./bulletinURLS";
import {
  calcMaxDangerRating,
  fetchBulletin,
  isUpdated,
  updateFirestore,
  updatesForMapbox,
} from "./processCAAMLv5";

import {
  IBulletin,
  IDangerRating,
  IElevation,
  TAvalancheSize,
  TValidTimePeriod,
} from "./models";
import { regionNames } from "../assets/region_names_en";
import { DangerLevels } from "../utils";

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "512MB",
};

const euFunctions = functions.region("europe-west1");
const heavyFunctions = euFunctions.runWith(runtimeOpts);

const PROVIDER = "AD";

export const fetchAndorraMeteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(PROVIDER);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error("Error fetching  file: ", err);
      response.send(`Error fetching json file: ${err}`);
    }
  }
);

export const fetchAndorraMeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(PROVIDER);
  });

export async function updateBulletins(
  provider: string
): Promise<Record<string, Record<string, Timestamp | string>>> {
  let updated: Record<string, Record<string, Timestamp | string>> = {};
  const languages: string[] = bulletinUrls[provider].lang;
  const url: string = bulletinUrls[provider].url.xml;

  for (const lang of languages) {
    try {
      const text = await fetchBulletin(url);
      if (text) {
        const checksum = md5(text);
        if (await isUpdated(checksum, lang, provider)) {
          functions.logger.info(
            `Processing new updates to ${provider} bulletin in lang: ${lang}`
          );
          const jsonData = await xml2js.parseStringPromise(text);
          if (jsonData) {
            const bulletins = processBulletins(jsonData, provider, lang);
            const updates = await updateFirestore(bulletins, lang);
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
              `xml data for ${url} bulletin failed to convert to json`
            );
          }
        } else {
          functions.logger.warn(
            `No new updates for ${provider} bulletin in lang: ${lang}`
          );
        }
      } else {
        functions.logger.warn(`fetchBulletin ${url} returned no data`);
      }
    } catch (err) {
      functions.logger.error(`Error updating ${provider} bulletins: `, err);
    }
  }
  return updated;
}

const RegionID: Record<string, string> = {
  nord: "AD-01",
  centre: "AD-02",
  sud: "AD-03",
};

function processBulletins(
  jsonData: any,
  provider: string,
  lang: string
): IBulletin[] {
  // Get general data that applies to all bulletins
  const source = getSource(provider);
  const validTime = getValidTimePeriod(jsonData);
  const bulletinDate = getBulletinDate(validTime.startTime.toDate());

  // Procees regional bulletins
  const rawBulletin = jsonData.weather.geopos[0].gp;

  const bulletins = rawBulletin.map((bulletin: any) => {
    const regionID = getRegionID(bulletin);
    const dangerRatings = getDangerRating(bulletin);
    const maxDangerRatingsAllDay = calcMaxDangerRating(dangerRatings);

    return {
      bulletinDate,
      bulletinID: [`${regionID}_${validTime.startTime.seconds}`],
      publicationTime: validTime.startTime,
      validTime,
      lang,
      source,
      dangerRatings,
      regionID,
      regionName: regionNames[regionID],
      bulletinURI: bulletinUrls[provider].url.bulletin.replace("${lang}", lang),
      maxDangerRatings: {
        allDay: maxDangerRatingsAllDay,
        earlier: maxDangerRatingsAllDay,
        later: maxDangerRatingsAllDay,
      },
      provider,
    };
  });

  return bulletins;
}

function getBulletinDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function getDangerRating(bulletin: any): IDangerRating[] {
  const idstate = bulletin.neige[0]["$"].idstate;

  // Default is that the danger rating is not dependent on time of day or elevation
  let risk = [idstate];

  let riskDependency = "";
  let elevation: IElevation | undefined = {};

  // Check if the idstate contains a dash or "damunt"
  const match = idstate.match(/(-|damunt)/);
  if (match) {
    // If the idstate contains a dash, it means that the danger rating is dependent on the time of day
    if (match[1] === "-") {
      risk = idstate.split("-");
      riskDependency = "daytime";
      // If the idstate contains "damunt", it means that the danger rating is dependent on the elevation
    } else if (match[1] === "damunt") {
      risk = idstate.split("damunt");
      riskDependency = "elevation";
    }
  }

  return risk.map((r: string, index: number) => {
    let validTimePeriod: TValidTimePeriod = "allDay";
    if (risk.length > 1 && riskDependency === "daytime") {
      validTimePeriod = index === 0 ? "earlier" : "later";
    }
    // No elevations values provided in bulletin
    if (risk.length > 1 && riskDependency === "elevation") {
      elevation =
        index === 0
          ? { upperBound: { string: "", numeric: -1 } }
          : { lowerBound: { string: "", numeric: -1 } };
    }

    return {
      mainValue: {
        numeric: Number(r) as TAvalancheSize,
        string: DangerLevels[r],
      },
      validTimePeriod,
      elevation,
    };
  });
}

function getRegionID(bulletin: any) {
  return RegionID[bulletin["$"].id];
}

function getSource(provider: string) {
  return bulletinUrls[provider].source;
}

function getValidTimePeriod(jsonData: any) {
  const date = jsonData.weather.date[0];
  const startTime = parse(date, "MM/dd/yyyy", new Date());
  const endTime = parse(
    `${date}/23:59:59:999`,
    "MM/dd/yyyy/kk:mm:ss:SSS",
    new Date()
  );
  return {
    startTime: Timestamp.fromDate(startTime),
    endTime: Timestamp.fromDate(endTime),
  };
}
