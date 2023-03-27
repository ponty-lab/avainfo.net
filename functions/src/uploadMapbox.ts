/* eslint-disable no-unused-vars */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
import * as FormData from "form-data";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { EuropeShapefileSource } from "../assets/index";
import { addDays, compareAsc, format, parse } from "date-fns";
import { IBulletin } from "./models";
// eslint-disable-next-line import/no-unresolved
import { DocumentData, Timestamp } from "firebase-admin/firestore";
import { bulletinUrls } from "./bulletinURLS";
import { regionNames } from "../assets/region_names_en";

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "512MB",
};

const euFunctions = functions.region("europe-west1");
const heavyFunctions = euFunctions.runWith(runtimeOpts);

const MAPBOX_API = "https://api.mapbox.com";

export const updateMapboxVectorTileset = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await uploadingToMapboxTilingService();
      response.send(`Updated ${JSON.stringify(updated)} bulletins`);
    } catch (err) {
      functions.logger.error("Error uploading to Mapbox Tiling Service: ", err);
      response.send(`Error uploading to Mapbox Tiling Service: ${err}`);
    }
  }
);

export const updateMapboxVectorTilesetScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:05 to 20:05")
  .timeZone("UTC")
  .onRun(async (context) => {
    await uploadingToMapboxTilingService();
  });

async function uploadingToMapboxTilingService() {
  const updated: Record<string, number> = {};
  let lastBulletinUpdateTime: Date | undefined;
  // const languages = ['en', 'fr', 'de'];
  const languages = ["en"];

  const mapboxRef = admin.firestore().collection("bulletinState").doc("mapbox");
  const mapboxDoc = await mapboxRef.get();

  if (mapboxDoc.exists) {
    const bulletinState = mapboxDoc.data();

    if (bulletinState) {
      // Check for any recent updates to the bulletins
      lastBulletinUpdateTime = getBulletinUpdateTime(bulletinState);

      // Generate mapboxlayer if new bulletin updates
      if (lastBulletinUpdateTime) {
        const bulletinDate = getBulletinDate(bulletinState);

        for (const lang of languages) {
          const tilesetSourceID = "avalanche-danger-ratings";
          const tilesetID = `avalanche-map-${lang}-${bulletinDate}`;

          const tileSource = await generateTileSource(
            lang,
            bulletinState,
            bulletinDate
          );
          functions.logger.debug("Updated", tileSource.length);

          updated[lang] = tileSource.length;

          const ldGeoJSON = tileSource
            .map((source) => JSON.stringify(source))
            .join("\n")
            .replace(/(^[ \t]*\n)/gm, "");

          await createTileSource(ldGeoJSON, tilesetSourceID);

          if (!(await checkTilesetExists(tilesetID))) {
            await createTileset(tilesetID, lang);
          }

          const publishing = await publishTileset(tilesetID);

          await checkStatus(publishing.jobId, tilesetSourceID);
        }

        await mapboxRef.update({
          ["mapbox_updateTime"]: Timestamp.fromDate(lastBulletinUpdateTime),
          ["latest_bulletin"]: bulletinDate,
        });

        functions.logger.info(
          `Completed uploads of Mapbox Vector Tiles ['mapbox_updateTime']: ${lastBulletinUpdateTime}`
        );
      }
    }
  }

  return updated;
}

function getBulletinUpdateTime(
  bulletinState: Record<string, any>
): Date | undefined {
  const lastBulletinUpdateTime = bulletinState["bulletin_updateTime"].toDate();
  const lastMapBoxUpdateTime =
    bulletinState["mapbox_updateTime"]?.toDate() ?? new Date();

  if (compareAsc(lastBulletinUpdateTime, lastMapBoxUpdateTime) === 1) {
    return lastBulletinUpdateTime;
  }

  functions.logger.debug(
    `data.bulletin_updateTime ${lastBulletinUpdateTime} updated by Mapbox on ${lastMapBoxUpdateTime}: ${
      compareAsc(lastBulletinUpdateTime, lastMapBoxUpdateTime) < 1
    }`
  );

  return undefined;
}

function getBulletinDate(bulletinState: Record<string, any>) {
  const bulletinDate: string = bulletinState["latest_bulletin"];
  const today = new Date();

  // Returns next day if generating new mapbox vector layer after 16:00
  if (today.getHours() >= 16) {
    const nextDay = format(addDays(today, 1), "yyyy-MM-dd");
    if (nextDay !== bulletinDate) {
      functions.logger.info(`Creating new mapbox vector layer for ${nextDay}`);
      return nextDay;
    }
  }

  // Updates to existing mapbox vector layers uses the same date
  functions.logger.info(
    `Updating existing mapbox vector layer for ${bulletinDate}`
  );
  return bulletinDate;
}

async function generateTileSource(
  lang: string,
  bulletinState: DocumentData,
  bulletinDate: string
): Promise<Record<string, any>[]> {
  const features: Record<string, any>[] = [];

  for (const featureCollection of EuropeShapefileSource) {
    const geojsonBulletin = await Promise.all(
      featureCollection.features.map(async (feature: any) => {
        const {
          id: regionID,
          provider,
          // eslint-disable-next-line no-unused-vars
          Massif,
          // eslint-disable-next-line camelcase, no-unused-vars
          start_date,
          // eslint-disable-next-line camelcase
          end_date,
          // eslint-disable-next-line camelcase
          id_alt,
          ...properties
        } = feature.properties;

        const validEndDate =
          bulletinState[regionID]?.validEndTime?.toDate() ?? new Date();

        const mvlDate = parse(
          `${bulletinDate}-06`,
          "yyyy-MM-dd-HH",
          new Date()
        );

        const lastBulletinDate = bulletinState[regionID]?.bulletinDate ?? "";

        const featureCopy = JSON.parse(JSON.stringify(feature, null, 2));

        if (compareAsc(validEndDate, mvlDate) === 1) {
          functions.logger.debug(
            `Fetching ${lang} bulletin for regionID ${regionID} using date ${lastBulletinDate}`
          );

          // Checks if bulletin is valid after 6 am of the bulletinDate
          const bulletin = await fetchBulletinFromFirestore(
            lastBulletinDate,
            regionID,
            lang
          );

          const flatBulletin = flattenBulletinStructure(regionID, bulletin);

          featureCopy.properties = {
            ...properties,
            ...flatBulletin,
          };
        } else {
          // Returns bulletin with no dangerRatings if not valid
          functions.logger.debug(
            `Out of date bulletin for ${regionID}. Valid end date ${validEndDate} > Bulletin date ${mvlDate}: ${
              compareAsc(validEndDate, mvlDate) === 1
            }. Using default bulletin settings`
          );

          const skeletonBulletin = {
            maxDangerRating_earlier_numeric: -1,
            maxDangerRating_earlier_string: "no_rating",
            maxDangerRating_later_numeric: -1,
            maxDangerRating_later_string: "no_rating",
            maxDangerRating_allDay_numeric: -1,
            maxDangerRating_allDay_string: "no_rating",
            regionID,
            regionName: regionNames[regionID],
            lastBulletinDate: bulletinState[regionID]?.bulletinDate,
            source: bulletinUrls[provider]?.source,
            bulletinURI: bulletinUrls[provider]?.url.latest,
          };
          featureCopy.properties = {
            ...properties,
            ...skeletonBulletin,
          };
        }
        return await featureCopy;
      })
    );

    features.push(...geojsonBulletin);
  }

  return features;
}

async function fetchBulletinFromFirestore(
  bulletinDate: string,
  regionID: string,
  bulletinLang: string
) {
  const providers = Object.keys(bulletinUrls);
  let lang: string = bulletinLang;

  // Setting fallback language if bulletin is not available in lang
  for (const provider of providers) {
    const match = new RegExp(`${provider}`);
    if (match.test(regionID)) {
      if (!bulletinUrls[provider].lang.includes(bulletinLang)) {
        lang = bulletinUrls[provider].defaultLang;
      }
    }
  }

  if (bulletinDate) {
    const ref = admin
      .firestore()
      .collection("bulletinReports")
      .doc(regionID)
      .collection(bulletinDate)
      .doc(lang);

    const doc = await ref.get();

    return doc.data() as IBulletin;
  }
  return undefined;
}

function flattenBulletinStructure(regionID: string, bulletin?: IBulletin) {
  const avalancheProblems =
    bulletin?.avalancheProblems?.reduce((problems, problem, index) => {
      const count = index + 1;
      const flatProblem = {
        [`avalancheProblem_${count}_type`]: problem.type,
        [`avalancheProblem_${count}_aspects`]: problem.aspects?.join(","),
        [`avalancheProblem_${count}_validTimePeriod`]: problem.validTimePeriod,
        [`avalancheProblem_${count}_terrainFeature`]: problem.terrainFeature,
        [`avalancheProblem_${count}_elevation_upperBound_string`]:
          problem.elevation?.upperBound?.string,
        [`avalancheProblem_${count}_elevation_upperBound_numeric`]:
          problem.elevation?.upperBound?.numeric,
        [`avalancheProblem_${count}_elevation_lowerBound_string`]:
          problem.elevation?.lowerBound?.string,
        [`avalancheProblem_${count}_elevation_lowerBound_numeric`]:
          problem.elevation?.upperBound?.numeric,
      };
      return { ...problems, ...flatProblem };
    }, {}) ?? {};

  const dangerRatings =
    bulletin?.dangerRatings?.reduce((ratings, rating, index) => {
      const count = index + 1;
      const flatRating = {
        [`dangerRating_${count}_mainValue_numeric`]: rating.mainValue.numeric,
        [`dangerRating_${count}_mainValue_string`]: rating.mainValue.string,
        [`dangerRating_${count}_validTimePeriod`]: rating.validTimePeriod,
        [`dangerRating_${count}_elevation_lowerBound_string`]:
          rating.elevation?.lowerBound?.string,
        [`dangerRating_${count}_elevation_lowerBound_numeric`]:
          rating.elevation?.lowerBound?.numeric,
        [`dangerRating_${count}_elevation_upperBound_string`]:
          rating.elevation?.upperBound?.string,
        [`dangerRating_${count}_elevation_upperBound_numeric`]:
          rating.elevation?.upperBound?.numeric,
      };
      return { ...ratings, ...flatRating };
    }, {}) ?? {};

  const weather =
    bulletin?.weather?.reduce((weathers, item, index) => {
      const count = index + 1;
      const flatWeather = {
        [`weather_${count}_highlight`]: item.highlight,
        [`weather_${count}_comment`]: item.comment,
        [`weather_${count}_snow`]: item.snow,
        [`weather_${count}_temp`]: item.temp,
        [`weather_${count}_wind`]: item.wind,
      };
      return { ...weathers, ...flatWeather };
    }, {}) ?? {};

  const avalancheActivity =
    bulletin?.avalancheActivity?.reduce((activity, item, index) => {
      const count = index + 1;
      const flatActivity = {
        [`avalancheActivity_${count}_highlights`]: item.highlight,
        [`avalancheActivity_${count}_comment`]: item.comment,
      };
      return { ...activity, ...flatActivity };
    }, {}) ?? {};

  let flatBulletin: any;

  if (bulletin) {
    let publicationTime;
    if (bulletin.publicationTime instanceof Timestamp) {
      publicationTime = bulletin.publicationTime;
    } else if ((bulletin.publicationTime as any) instanceof Map) {
      publicationTime = new Timestamp(
        bulletin.publicationTime["_seconds"],
        bulletin.publicationTime["_nanoseconds"]
      );
    }

    flatBulletin = {
      ...avalancheActivity,
      avalancheActivitys_count: bulletin.avalancheActivity?.length ?? 0,
      ...avalancheProblems,
      avalancheProblems_count: bulletin.avalancheProblems?.length ?? 0,
      bulletinDate: bulletin.bulletinDate,
      bulletinID: bulletin.bulletinID.join(","),
      bulletinURI: bulletin.bulletinURI,
      ...dangerRatings,
      dangerRatings_count: bulletin.dangerRatings?.length ?? 0,
      highlights: bulletin.highlights,
      maxDangerRating_earlier_numeric:
        bulletin.maxDangerRatings.earlier?.numeric ?? -1,
      maxDangerRating_earlier_string:
        bulletin.maxDangerRatings.earlier?.string ?? "no_rating",
      maxDangerRating_later_numeric:
        bulletin.maxDangerRatings.later?.numeric ?? -1,
      maxDangerRating_later_string:
        bulletin.maxDangerRatings.later?.string ?? "no_rating",
      maxDangerRating_allDay_numeric:
        bulletin.maxDangerRatings?.allDay?.numeric ?? -1,
      maxDangerRating_allDay_string:
        bulletin.maxDangerRatings?.allDay?.string ?? "no_rating",
      lang: bulletin?.lang,
      pdfURI: bulletin?.pdfURI,
      publicationTime: publicationTime?.toDate(),
      regionID: bulletin.regionID,
      regionName: bulletin.regionName,
      snowpackStructureHighlights: bulletin?.snowpackStructure?.highlight,
      snowpackStructureComment: bulletin?.snowpackStructure?.comment,
      source: bulletin.source,
      tendencyComment: bulletin.tendency?.comment,
      tendencyType: bulletin.tendency?.type,
      ...weather,
      weathers_count: bulletin.weather?.length ?? 0,
      validEndTime: bulletin.validTime.endTime.toDate(),
      validStartTime: bulletin.validTime.startTime.toDate(),
    };
  } else {
    functions.logger.debug(
      `No bulletin for ${regionID}. Using default bulletin settings`
    );
    flatBulletin = {
      maxDangerRating_earlier_numeric: -1,
      maxDangerRating_earlier_string: "no_rating",
      maxDangerRating_later_numeric: -1,
      maxDangerRating_later_string: "no_rating",
      maxDangerRating_allDay_numeric: -1,
      maxDangerRating_allDay_string: "no_rating",
      regionID: regionID,
      regionName: regionNames[regionID],
    };
  }

  return flatBulletin;
}

async function createTileSource(ldGeoJSON: any, tilesetSourceID: string) {
  // Replaces a tileset source with new source data, or creates a source if it does not exist already.
  functions.logger.info(`Uploading tileset source to ${tilesetSourceID}...`);

  const url = `${MAPBOX_API}/tilesets/v1/sources/${process.env.MAPBOX_USERNAME}/${tilesetSourceID}?access_token=${process.env.MAPBOX_TOKEN}`;
  const filePath = path.join(os.tmpdir(), "tileset-source.ld");
  const formData = new FormData();

  try {
    fs.writeFileSync(filePath, ldGeoJSON);
    const fileStream = fs.createReadStream(filePath);
    formData.append("file", fileStream, "tileset-source.ld");
    const resp = await fetch(url, {
      method: "PUT",
      body: formData,
      headers: formData.getHeaders(),
    });
    if (resp.ok) {
      const body: any = await resp.json();
      functions.logger.info(
        `Tileset source created: ${body.id}. Files ${body.files}, Size: ${body.file_size} bytes`
      );
      return body;
    } else {
      functions.logger.warn(`${resp.status}: ${resp.statusText}`);
    }
    fs.unlinkSync(filePath);
  } catch (err) {
    functions.logger.error(
      `Error uploading line-delimited GeoJSON file: ${err}`
    );
  }
}

async function checkTilesetExists(tilesetID: string) {
  const url = `https://api.mapbox.com/tilesets/v1/${process.env.MAPBOX_USERNAME}.${tilesetID}/recipe?access_token=${process.env.MAPBOX_TOKEN}`;

  try {
    const resp = await fetch(url);
    if (resp.ok) {
      return true;
    }
  } catch (err) {
    functions.logger.error(`Error fetching ${url}`, err);
  }
  return false;
}

async function createTileset(tilesetID: string, lang: string) {
  functions.logger.info(`Creating tileset ${tilesetID}....`);

  const date = tilesetID.slice(tilesetID.length - 10);
  const url = `https://api.mapbox.com/tilesets/v1/${process.env.MAPBOX_USERNAME}.${tilesetID}?access_token=${process.env.MAPBOX_TOKEN}`;

  try {
    const resp = await fetch(url, {
      body: JSON.stringify({
        recipe: {
          version: 1,
          layers: {
            "avalanche-danger-ratings": {
              source:
                "mapbox://tileset-source/avainfo/avalanche-danger-ratings",
              minzoom: 0,
              maxzoom: 5,
              features: {
                simplification: 0,
              },
            },
          },
        },
        private: true,
        name: `Avalanche Danger Ratings ${date} ${lang.toUpperCase()}`,
        description:
          "European avalanche danger ratings updated on a daily basis",
        attribution: [
          { text: "© AvaInfo", link: "https://ponty-lab.github.io/" },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (resp.ok) {
      const body: any = await resp.json();
      functions.logger.info(body.message);
      return body;
    } else {
      functions.logger.error(`${resp.status}: ${resp.statusText}`);
    }
  } catch (err) {
    functions.logger.error(`Error creating tileset ${tilesetID}: ${err}`);
  }
}

async function publishTileset(tilesetID: string) {
  functions.logger.info(`Publishing tileset ${tilesetID} ...`);
  const param = "publish";
  const url = createURL(tilesetID, param);

  try {
    const resp = await fetch(url, { method: "POST" });
    if (resp.ok) {
      const response: any = await resp.json();
      functions.logger.info(`${response.message}. JobId: ${response.jobId}`);
      return response;
    } else {
      functions.logger.error(`${resp.status}: ${resp.statusText}`);
    }
  } catch (err) {
    functions.logger.error(`Failed to publish tileset ${tilesetID}: ${err}`);
  }
}

function tilesetStatus(jobId: string) {
  setTimeout(checkStatus, 10000, jobId);
}

async function checkStatus(jobId: string, tilesetID: string) {
  functions.logger.info(`Checking completed job status ${jobId}...`);
  const param = `jobs/${jobId}`;
  const url = createURL(tilesetID, param);

  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const body: any = await resp.json();
      if (body.stage === "processing" || body.stage === "queued") {
        functions.logger.info(`Status: ${body.stage} ${body.id}`);
        tilesetStatus(jobId);
      } else if (body.stage === "success") {
        functions.logger.info(
          `Job ${body.id}: Tileset ${body.tilesetId} published at ${body.created_nice}`
        );
        functions.logger.info(
          `Complete: Now available at https://studio.mapbox.com/tilesets/${body.tilesetId}`
        );
      } else {
        functions.logger.error("Error publishing tileset", body.errors);
      }
    }
  } catch (err) {
    functions.logger.error(
      `Unable to check job status ${jobId} on tileset: ${tilesetID}`,
      err
    );
  }
}

function createURL(tilesetID: string, param: string): string {
  return `https://api.mapbox.com/tilesets/v1/${process.env.MAPBOX_USERNAME}.${tilesetID}/${param}?access_token=${process.env.MAPBOX_TOKEN}`;
}

// const AvaColour: Record<string, string> = {
//   '0': '#42799a',
//   '1': '#ccff66',
//   '2': '#ffff00',
//   '3': '#ff9900',
//   '4': '#ff0000',
//   '5': '#600000',
// };

// uploadingToMapboxTilingService();

// /* async function createStyleSheet() {
//     const jsonArray = await updateBulletins()

//     const fillColour: any[] = []

//     if (jsonArray) {
//         jsonArray.forEach(feature => {
//             fillColour.push(feature.regionId, AvaColour[String(feature.maxDangerRating)])
//         })
//     }

//     return {
//         "version": 8,
//         "name": "AvalancheDanger",
//         "sources": {
//             "avalanche-danger-map": {
//                 "type": "vector",
//                 "url": "mapbox://avainfo.avalanche-danger-map"
//             }
//         },
//         "layers": [
//             {
//                 "id": "avalanche-danger-ratings",
//                 "source": "avalanche-danger-map",
//                 "source-layer": "avalanche-danger-ratings",
//                 "type": "fill",
//                 "paint": {
//                     "fillColor": [
//                         'match',
//                         ['get', 'regionId'],
//                         ...fillColour,
//                         '#000000'
//                     ],
//                     "fillOpacity": 0.65
//                 }
//             }
//         ],
//         "draft": true
//     }

// } */
