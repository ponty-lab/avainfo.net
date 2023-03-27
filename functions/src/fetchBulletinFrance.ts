import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
import * as xml2js from "xml2js";
import * as md5 from "md5";
import { parseISO } from "date-fns";
import { DangerLevels } from "../utils";
import {
  IBulletin,
  IDangerRating,
  IDangerRatingValue,
  TAvalancheSize,
  TValidTimePeriod,
} from "./models";
import {
  calcMaxDangerRating,
  getBulletinDate,
  updatesForMapbox,
} from "./processCAAMLv5";
// eslint-disable-next-line import/no-unresolved
import { Timestamp } from "firebase-admin/firestore";
import { regionNames } from "../assets";

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "512MB",
};

const euFunctions = functions.region("europe-west1");
const heavyFunctions = euFunctions.runWith(runtimeOpts);

const BASE_URL =
  "https://donneespubliques.meteofrance.fr/donnees_libres/Pdf/BRA";

export const fetchFranceMeteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateFrenchBulletin();
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error("Error fetching Meteo France index: ", err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchFranceMeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateFrenchBulletin();
  });

export async function updateFrenchBulletin(): Promise<
  Record<string, Record<string, Timestamp | string>>
> {
  const lang = "fr";
  const provider = "FR";
  let updated: Record<string, Record<string, Timestamp | string>> = {};
  const ref = admin.firestore().collection("bulletinState").doc(provider);
  const doc = await ref.get();

  for (const { massif, heures } of await fetchIndex()) {
    const latest = heures[heures.length - 1];
    try {
      const text = await fetchBulletin(massif, latest);
      if (text) {
        const checksum = md5(text);
        if (await isUpdated(checksum, massif, doc)) {
          const json = await xml2js.parseStringPromise(text);
          const xml = json.Bulletins.BULLETINS_NEIGE_AVALANCHE[0];
          const bulletin: IBulletin = await getBulletin(
            massif,
            heures[0],
            xml,
            provider
          );
          await updateRegion(bulletin, lang);
          updated = {
            ...updated,
            [bulletin.regionID]: {
              ["bulletinDate"]: bulletin.bulletinDate,
              ["validEndTime"]: bulletin.validTime.endTime,
            },
          };
          const bulletinStateDoc = admin
            .firestore()
            .collection("bulletinState")
            .doc("FR");
          await bulletinStateDoc.update({ [`checksum_${massif}`]: checksum });
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
        functions.logger.warn(`Massif ${massif} document ${heures} not found`);
      }
    } catch (err) {
      functions.logger.warn(`Error processing: ${massif} ${heures}`, err);
    }
  }

  return updated;
}

async function fetchBulletin(
  massif: string,
  timeStr: string
): Promise<any | null> {
  const url = `${BASE_URL}/BRA.${massif}.${timeStr}.xml`;
  const resp = await fetch(url);
  if (resp.ok) {
    return await resp.text();
  } else {
    functions.logger.error(`Bad response ${resp.status} for `, url);
  }
  return null;
}

async function fetchIndex(): Promise<any[]> {
  const today = new Date();
  const d = new Date();

  for (let i = 0; i < 2; i++) {
    d.setDate(today.getDate() - i);
    const dateStr = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(d.getDate()).padStart(2, "0")}`;
    const resp = await fetch(`${BASE_URL}/bra.${dateStr}.json`, {
      redirect: "manual",
    });
    if (resp.ok) {
      functions.logger.info(`Found index file for date ${dateStr}`);
      const data: any = await resp.json();
      if (data.length > 0) {
        return data;
      }
      functions.logger.info(`index file ${dateStr} is empty`);
    } else {
      functions.logger.info(
        `Unable to find index for ${dateStr}, resp ${resp.status} ${resp.statusText}`
      );
    }
  }
  functions.logger.info("No suitable index files found");
  return [];
}

export async function isUpdated(
  checksum: string,
  massif: string,
  doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>
): Promise<boolean> {
  if (doc.exists) {
    const data = doc.data();
    const check = `checksum_${massif}`;
    functions.logger.debug(
      `data.${check} ${data?.[check]}, current checksum ${checksum} updated: ${
        data?.[check] !== checksum
      }`
    );
    return data?.[check] !== checksum;
  }
  return true;
}

async function updateRegion(bulletin: IBulletin, lang: string): Promise<void> {
  const ref = admin
    .firestore()
    .collection("bulletinReports")
    .doc(bulletin.regionID)
    .collection(bulletin.bulletinDate)
    .doc(lang);
  functions.logger.info(
    `Updating Firestore bulletin for region id: ${bulletin.regionID}`
  );
  await ref.set(bulletin);
}

type Bulletin = any;

function getRegionID(bulletin: Bulletin) {
  const number = bulletin["$"].ID.padStart(2, "0");
  return `FR-${number}`;
}

function getPublishedAt(bulletin: Bulletin): Date {
  return parseISO(bulletin["$"].DATEDIFFUSION);
}

function getIssuedAt(bulletin: Bulletin): Date {
  return parseISO(bulletin["$"].DATEBULLETIN);
}

function getValidDate(bulletin: Bulletin): Date {
  return parseISO(bulletin["$"].DATEVALIDITE);
}

function getAspects(bulletin: Bulletin) {
  const aspectData = bulletin.CARTOUCHERISQUE[0].PENTE[0]["$"];
  return Array.from(
    Object.entries(aspectData)
      .filter(([aspect, value]) => value === "true")
      .map(([aspect, value]) => aspect)
  );
}

const Problems: any = {
  fraîche: "new_snow",
  venté: "drifting_snow",
  "sous-couche": "old_snow",
  humide: "wet_snow",
  "avalanches de fond": "gliding_snow",
  "situation favorable": "favourable_situation",
};

function getAvalancheProblems(bulletin: Bulletin) {
  const stability = bulletin.STABILITE[0].TEXTE[0];
  const aspects = getAspects(bulletin);

  return Object.keys(Problems).reduce(
    (avProblems: Record<string, any>[], key) => {
      const regex = new RegExp(key, "g");
      const problem = regex.test(stability);
      if (problem) {
        avProblems.push({
          type: Problems[key],
          aspects,
        });
      }
      return avProblems;
    },
    []
  );
}

const TrendType: any = {
  "-1": "decreasing",
  "0": "steady",
  "1": "increasing",
};

function getTendency(bulletin: Bulletin): string {
  return TrendType[bulletin.TENDANCES[0].TENDANCE[0]["$"].VALEUR] ?? null;
}

function getMaxRisk(bulletin: Bulletin) {
  const risk = Number(bulletin.CARTOUCHERISQUE[0].RISQUE[0]["$"]["RISQUEMAXI"]);
  return {
    numeric: risk as TAvalancheSize,
    string: DangerLevels[risk],
  };
}

function getRisk(
  bulletin: Bulletin,
  risque: string
): IDangerRatingValue | null {
  const risk = Number(bulletin.CARTOUCHERISQUE[0].RISQUE[0]["$"][risque]);
  if (risk) {
    return {
      numeric: risk as TAvalancheSize,
      string: DangerLevels[risk],
    };
  }
  return null;
}

function getValidTimePeriod(
  risk: Record<string, IDangerRatingValue | null>,
  key: string
): TValidTimePeriod {
  const hasDaytimeDependency =
    risk["EVOLURISQUE1"] || risk["EVOLURISQUE2"] ? true : false;

  if ((key === "RISQUE1" || key === "RISQUE2") && hasDaytimeDependency) {
    return "earlier";
  } else if (key === "EVOLURISQUE1" || key === "EVOLURISQUE2") {
    return "later";
  }

  return "allDay";
}

function getElevation(
  bulletin: Bulletin,
  risk: Record<string, IDangerRatingValue | null>,
  key: string
) {
  const altitude = Number(bulletin.CARTOUCHERISQUE[0].RISQUE[0]["$"].ALTITUDE);

  if (altitude) {
    const elevation = {
      string: `${altitude}m`,
      numeric: altitude,
    };

    if (
      (key === "RISQUE1" && risk["EVOLURISQUE1"]) ||
      (key === "RISQUE2" && risk["EVOLURISQUE2"])
    ) {
      return { upperBound: elevation };
    } else if (key === "EVOLURISQUE1" || key === "EVOLURISQUE1") {
      return { lowerBound: elevation };
    }
  }
  return null;
}

function getDangerRating(bulletin: Bulletin): IDangerRating[] {
  const keys: string[] = ["RISQUE1", "RISQUE2", "EVOLURISQUE1", "EVOLURISQUE2"];

  const dangerRatings: Record<string, IDangerRatingValue | null> = keys.reduce(
    (rating, key) => {
      const risk = getRisk(bulletin, key);
      if (risk) {
        return { ...rating, [key]: risk };
      }
      return rating;
    },
    {}
  );

  return Object.entries(dangerRatings).reduce(
    (ratings: IDangerRating[], [key, val]) => {
      if (val) {
        const obj = {
          mainValue: val,
          validTimePeriod: getValidTimePeriod(dangerRatings, key),
          elevation: getElevation(bulletin, dangerRatings, key),
        };
        ratings.push(obj);
      }
      return ratings;
    },
    []
  );
}

function getBulletin(
  massif: string,
  heures: string,
  bulletin: Bulletin,
  provider: string
): any {
  // console.log(`${massif}: heures ${heures}`)

  const dangerRatings = getDangerRating(bulletin);
  const maxDangerRatingsAllDay = getMaxRisk(bulletin);
  const maxDangerRatingsEarlier = calcMaxDangerRating(dangerRatings, "earlier");
  const maxDangerRatingsLater = calcMaxDangerRating(dangerRatings, "later");
  const regionID = getRegionID(bulletin);
  const avalancheProblems = getAvalancheProblems(bulletin);
  const publicationTime = getPublishedAt(bulletin);
  const bulletinDate = getBulletinDate(publicationTime);

  return {
    bulletinID: [`${regionID}_${heures}`],
    bulletinDate,
    lang: "fr",
    publicationTime: Timestamp.fromDate(publicationTime),
    validTime: {
      startTime: Timestamp.fromDate(getIssuedAt(bulletin)),
      endTime: Timestamp.fromDate(getValidDate(bulletin)),
    },
    source: "Météo-France",
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
    avalancheProblems,
    highlights: bulletin.CARTOUCHERISQUE[0].RESUME[0],
    avalancheActivity: [
      {
        comment: bulletin.STABILITE[0].TEXTE[0],
      },
    ],
    snowpackStructure: {
      comment: bulletin.QUALITE[0].TEXTE[0],
    },
    tendency: {
      type: getTendency(bulletin),
      comment: bulletin.METEO[0].COMMENTAIRE[0],
    },
    bulletinURI: "https://meteofrance.com/meteo-montagne",
    pdfURI: `${BASE_URL}/BRA.${massif}.${heures}.pdf`,
    regionID,
    regionName: regionNames[regionID],
    provider,
  };
}
