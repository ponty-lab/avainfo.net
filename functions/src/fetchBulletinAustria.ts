import * as functions from "firebase-functions";
import { updateBulletins } from "./processCAAMLv5";

// //date: "2022-04-06"
// const testURLS: Record<string, any> = {
//     'AT-02': '2137',
//     'AT-03': '2139',
//     'AT-04': '2134',
//     'AT-05': '2135',
//     'AT-06': '2138',
//     'AT-08': '2133',
//     'DE-BY': '2136'
// }

const [AT02, AT03, AT04, AT05, AT06, AT08, DEBY] = [
  "AT-02",
  "AT-03",
  "AT-04",
  "AT-05",
  "AT-06",
  "AT-08",
  "DE-BY",
];

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "512MB",
};

const euFunctions = functions.region("europe-west1");
const heavyFunctions = euFunctions.runWith(runtimeOpts);

export const fetchAT02Meteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(AT02);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${AT02} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchAT02MeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(AT02);
  });

export const fetchAT03Meteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(AT03);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${AT03} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchAT03MeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(AT03);
  });

export const fetchAT04Meteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(AT04);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${AT04} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchAT04MeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(AT04);
  });

export const fetchAT05Meteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(AT05);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${AT05} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchAT05MeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(AT05);
  });

export const fetchAT06Meteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(AT06);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${AT06} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchAT06MeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(AT06);
  });

export const fetchAT08Meteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(AT08);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${AT08} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchAT08MeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(AT08);
  });

export const fetchDEBYMeteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(DEBY);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${DEBY} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchDEBYMeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(DEBY);
  });
