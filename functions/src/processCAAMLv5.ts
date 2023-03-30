import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
import * as xml2js from "xml2js";
import * as md5 from "md5";
import { addDays, format } from "date-fns";
import {
  IBulletin,
  IDangerRating,
  IElevation,
  IElevationValue,
  TValidTimePeriod,
  TAvalancheSize,
  IAvalancheProblem,
  IDangerRatingValue,
} from "./models";
import { regionNames } from "../assets";
import { bulletinUrls } from "./bulletinURLS";
import { DangerLevels, mergeObject } from "../utils";
// eslint-disable-next-line import/no-unresolved
import { Timestamp } from "firebase-admin/firestore";

export async function updateBulletins(
  provider: string
): Promise<Record<string, Record<string, Timestamp | string>>> {
  let updated: Record<string, Record<string, Timestamp | string>> = {};
  const languages: string[] = bulletinUrls[provider].lang;

  for (const lang of languages) {
    try {
      const url = bulletinUrls[provider].url.xml.replace("${lang}", lang);
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

export async function fetchBulletin(url: string): Promise<string | null> {
  const resp = await fetch(url);
  if (resp.ok) {
    return await resp.text();
  } else {
    functions.logger.error(`Bad response ${resp.status} for `, url, 2);
  }
  return null;
}

export async function updatesForMapbox(
  updated: Record<string, Record<string, Timestamp | string>>
) {
  Object.assign(updated, { ["bulletin_updateTime"]: Timestamp.now() });
  const ref = admin.firestore().collection("bulletinState").doc("mapbox");
  return await ref.update(updated);
}

export async function isUpdated(
  checksum: string,
  lang: string,
  provider: string
): Promise<boolean> {
  const ref = admin.firestore().collection("bulletinState").doc(provider);
  const doc = await ref.get();

  if (doc.exists) {
    const data = doc.data();
    const check = `checksum_${lang}`;
    functions.logger.debug(
      `data.${check} ${data?.[check]}, current checksum ${checksum} updated: ${
        data?.[check] !== checksum
      }`
    );
    return data?.[check] !== checksum;
  }
  return true;
}

export async function updateFirestore(bulletins: IBulletin[], lang: string) {
  const updated: Record<string, Record<string, Timestamp | string>> = {};
  let regionId: string;
  const db = admin.firestore();
  const batch = db.batch();

  bulletins.forEach((bulletin) => {
    regionId = bulletin.regionID;
    updated[regionId] = {
      ["validEndTime"]: bulletin.validTime.endTime,
      ["bulletinDate"]: bulletin.bulletinDate,
    };
    const ref = db
      .collection("bulletinReports")
      .doc(bulletin.regionID)
      .collection(bulletin.bulletinDate)
      .doc(lang);
    batch.set(ref, bulletin);
  });

  await batch.commit();

  return updated;
}

export function processRegionalBulletins(
  bulletins: IBulletin[],
  provider: string
) {
  return bulletins
    .map((bulletin: any) => {
      // console.log(bulletin);
      const { lang, bulletinDate, bulletinID, regions, dateTime, ...report } =
        bulletin;
      const excludedRegions = bulletinUrls[provider].excludedRegions ?? [];

      return regions
        .filter((region: string) => {
          const updatedRegion = region.startsWith("IT-32") ? "IT-32" : region;

          return !excludedRegions.includes(updatedRegion);
        })
        .map((region: string) => {
          let regionID = region;
          if (provider === "CH") {
            regionID = `CH-${region}`;
          }

          if (regionNames[regionID]) {
            let pdfID: string = bulletinID.toString();
            if (provider.startsWith("AT") || provider.startsWith("DE")) {
              const match = pdfID.match(/RID(\d*)*/);
              if (match) {
                pdfID = match[1];
              }
            }
            let shortenedRegionID = regionID;
            if (provider == "Albina") {
              console.log("regionID: ", regionID);
              const match = regionID.match(/(IT-32-\w+)/);
              console.log(match);
              if (match) {
                shortenedRegionID = match?.[0];
              }
            } else if (provider === "IT") {
              const match = regionID.match(/(IT-\w+)/);
              if (match) {
                shortenedRegionID = match?.[0];
              }
            }

            return {
              ...report,
              lang,
              bulletinDate,
              bulletinID,
              regionID,
              regionName: regionNames[regionID],
              pdfURI: bulletinUrls[provider].url.pdf
                .replace(/\${date}/g, bulletinDate)
                .replace("${regionID}", shortenedRegionID)
                .replace("${id}", pdfID)
                .replace("${lang}", lang)
                .replace("${dateTime}", dateTime),
              bulletinURI: bulletinUrls[provider].url.bulletin
                .replace("${lang}", lang)
                .replace("${date}", bulletinDate)
                .replace("${id}", bulletinID)
                .replace("${regionID", shortenedRegionID),
              provider,
            };
          } else {
            functions.logger.warn(
              `regionID ${region} not in found regionNames`
            );
            return undefined;
          }
        })
        .filter((v: any) => v !== undefined);
    })
    .flat();
}

export function processBulletins(
  jsonData: any,
  provider: string,
  lang: string
): IBulletin[] {
  const data = jsonData.ObsCollection.observations[0].Bulletin;
  // console.log(JSON.stringify(data));
  const bulletins = data.map((bulletin: any) =>
    processBulletin(bulletin, provider, lang)
  );

  // Merges AM and PM bulletin reports
  const groupedBulletins = groupBy(bulletins, "bulletinID");
  // console.log(groupedBulletins);

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

type Bulletin = any;

export function getRegionsFromBulletin(bulletin: Bulletin): string[] {
  return bulletin.locRef.map((region: any) => region.$["xlink:href"]);
}

export function getBulletinDate(publicationTime: Date): string {
  // If bulletin published after 13:00, bulletin date is next day.
  const bulletinDate =
    publicationTime.getHours() > 13
      ? addDays(new Date(publicationTime), 1)
      : new Date(publicationTime);

  return format(bulletinDate, "yyyy-MM-dd");
}

interface TimeProps {
  bulletin: Bulletin;
  validTimePeriod: TValidTimePeriod;
}

export function getValidStartTime({
  bulletin,
  validTimePeriod,
}: TimeProps): Timestamp | undefined {
  if (validTimePeriod !== "later") {
    const startTime = new Date(
      bulletin.validTime[0].TimePeriod[0].beginPosition[0]
    );
    return Timestamp.fromDate(startTime);
  }
  return;
}

export function getValidEndTime({
  bulletin,
  validTimePeriod,
}: TimeProps): Timestamp | undefined {
  if (validTimePeriod !== "earlier") {
    const endTime = new Date(
      bulletin.validTime[0].TimePeriod[0].endPosition[0]
    );
    return Timestamp.fromDate(endTime);
  }
  return;
}

export function getValidTimePeriod(bulletin: Bulletin): TValidTimePeriod {
  const regex = new RegExp(/.*T([0-9][0-9]).*/);
  const endTime = bulletin.validTime[0].TimePeriod[0].endPosition[0];
  const startTime = bulletin.validTime[0].TimePeriod[0].beginPosition[0];

  if (
    // returns later for bulletins issued after 9:00
    startTime.match(regex)?.[1] > 9 &&
    startTime.match(regex)?.[1] < 14 &&
    endTime.match(regex)?.[1] > 14
  ) {
    return "later";
  } else if (endTime.match(regex)?.[1] < 14 && endTime.match(regex)?.[1] > 9) {
    // returns earlier for bulletins with validEndTimes earlier than 14:00
    return "earlier";
  }

  return "allDay";
}

export function convertElevation(
  position: string,
  provider: string
): IElevationValue | null {
  // Elevation can be a string Forestline (Austrian bulletins) or Treeline (Italian or Albina bulletins)
  const isString =
    position === "Forestline" || position === "Treeline" ? true : false;

  // Slovenian bulletins set lower (0m) and upper limits(3000m)
  if (position === "0" || (provider === "SI" && position === "3000")) {
    return null;
  } else if (!isNaN(Number(position)) || isString === true) {
    return {
      string: isString ? "Treeline" : `${position}m`,
      numeric: isString ? bulletinUrls[provider].treeline : Number(position),
    };
  } else {
    functions.logger.warn(`${position} not recognised string or number`);
    return null;
  }
}

export function getElevation(elev: any, provider: string): IElevation {
  const elevation: Record<string, any> = {};

  if (elev) {
    if (elev.$) {
      // Elevation is a single value
      const match: string = elev.$["xlink:href"].match(
        /ElevationRange_(.*)(..$)/
      );
      if (match?.[2] === "Hi") {
        // pyAvaCore defines Hi as lowerBound
        elevation.lowerBound = convertElevation(match?.[1], provider);
      } else if (match?.[2] === "Lw" || match?.[2] === "Lo") {
        // pyAvaCore defines Lw as upperBound
        elevation.upperBound = convertElevation(match?.[1], provider);
      }
    }

    if (provider === "SI") {
      if (elev.ElevationRange) {
        // Elevation is an array
        elevation.lowerBound = convertElevation(
          elev.ElevationRange[0].beginPosition[0],
          provider
        );
        elevation.upperBound = convertElevation(
          elev.ElevationRange[0].endPosition[0],
          provider
        );
      }
    } else {
      if (elev.elevationRange) {
        // Elevation is an array
        elevation.lowerBound = convertElevation(
          elev.elevationRange[0].beginPosition[0],
          provider
        );
        elevation.upperBound = convertElevation(
          elev.elevationRange[0].endPosition[0],
          provider
        );
      }
    }
  }
  return elevation;
}

export function getAspects(problem: any) {
  return problem.validAspect?.map((aspect: any) =>
    aspect.$["xlink:href"].match(/AspectRange_(.*)/)[1].toUpperCase()
  );
}

interface dangerProps {
  observations: any;
  provider: string;
  validTimePeriod?: TValidTimePeriod;
}

export function getDangerRating({
  observations,
  provider,
  validTimePeriod,
}: dangerProps): IDangerRating[] | null {
  if (observations.dangerRatings) {
    return observations.dangerRatings[0].DangerRating.map((danger: any) => ({
      mainValue: {
        numeric: Number(danger.mainValue[0]) as TAvalancheSize,
        string: DangerLevels[danger.mainValue[0]],
      },
      validTimePeriod,
      elevation: danger.validElevation
        ? getElevation(danger.validElevation[0], provider)
        : null,
    }));
  }

  return null;
}

export function getAvProblems({
  observations,
  provider,
  validTimePeriod,
}: dangerProps): IAvalancheProblem[] | null {
  if (observations.avProblems[0]) {
    return observations.avProblems[0].AvProblem.map((problem: any) => ({
      type: problem.type[0].replace(/\s/g, "_"),
      aspects: getAspects(problem) ?? [],
      elevation: problem.validElevation
        ? getElevation(problem.validElevation[0], provider)
        : null,
      terrainFeature: cleanString(problem.comment),
      validTimePeriod: validTimePeriod
        ? validTimePeriod
        : getValidTimePeriod(problem),
    }));
  }

  return null;
}

export function cleanString(array: string[]): string {
  if (array && array[0]) {
    return (
      array[0]
        .replace(/&nbsp;/g, " ")
        .replace(/\n|\s+/g, " ")
        // .replace(/&lt;br\/&gt;/g, '')
        .replace(/^\s+/g, "")
        .replace(/\s$/g, "")
    );
  }
  return "";
}

export function calcMaxDangerRating(
  dangerRatings: IDangerRating[] | undefined,
  validTimePeriod?: TValidTimePeriod | null
): IDangerRatingValue | null {
  let rating: any;

  if (dangerRatings) {
    rating = Math.max(
      ...(validTimePeriod
        ? dangerRatings.filter(
            (dangerRating) => dangerRating.validTimePeriod === validTimePeriod
          )
        : dangerRatings
      ).map((dR) => dR.mainValue.numeric)
    );
  }

  return isNaN(rating) || rating === -Infinity || rating === Infinity
    ? null
    : {
        numeric: rating as TAvalancheSize,
        string: DangerLevels[rating],
      };
}

function processBulletin(bulletin: Bulletin, provider: string, lang: string) {
  const observations = bulletin.bulletinResultsOf[0].BulletinMeasurements[0];
  const validTimePeriod = getValidTimePeriod(bulletin);
  const dangerRatings = getDangerRating({
    observations,
    provider,
    validTimePeriod,
  });
  const avalancheProblems = getAvProblems({
    observations,
    provider,
    validTimePeriod,
  });
  const publicationTime = new Date(
    bulletin.metaDataProperty[0].MetaData[0].dateTimeReport[0]
  );

  return {
    bulletinID: [bulletin.$["gml:id"].replace("_PM", "")],
    publicationTime: Timestamp.fromDate(publicationTime),
    bulletinDate: getBulletinDate(publicationTime),
    validTime: {
      startTime: getValidStartTime({ bulletin, validTimePeriod }),
      endTime: getValidEndTime({ bulletin, validTimePeriod }),
    },
    lang,
    source:
      bulletin.metaDataProperty[0].MetaData[0].srcRef[0].Operation[0].name[0],
    dangerRatings,
    avalancheProblems,
    highlights: cleanString(observations.avActivityHighlights),
    avalancheActivity: [
      {
        highlight: cleanString(observations.avActivityHighlights),
        comment: cleanString(observations.avActivityComment),
      },
    ],
    snowpackStructure: {
      highlight: cleanString(observations.snowpackStructureHighlights),
      comment: cleanString(observations.snowpackStructureComment),
    },
    tendency: {
      type: observations.tendency ? observations.tendency[0].type[0] : null,
      comment: cleanString(observations.tendencyComment),
    },
    regions: getRegionsFromBulletin(bulletin),
  };
}

export function groupBy(
  objectArray: Array<Record<string, any>>,
  property: string
) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? {};
    const mergeObj = mergeObject(curGroup, obj);

    return { ...acc, [key]: { ...mergeObj } };
  }, {});
}
