import * as functions from "firebase-functions";
import { updateBulletins } from "./processCAAMLv5";

const PROVIDER = "IT";

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "512MB",
};

const euFunctions = functions.region("europe-west1");
const heavyFunctions = euFunctions.runWith(runtimeOpts);

export const fetchItalianMeteo = heavyFunctions.https.onRequest(
  async (request, response) => {
    try {
      const updated = await updateBulletins(PROVIDER);
      response.send(
        `Updated ${Object.keys(updated).length}, ${JSON.stringify(updated)}`
      );
    } catch (err) {
      functions.logger.error(`Error fetching ${PROVIDER} xml file: `, err);
      response.send(`Error fetching index: ${err}`);
    }
  }
);

export const fetchItalianMeteoScheduled = heavyFunctions.pubsub
  .schedule("every 1 hours from 06:00 to 20:00")
  .timeZone("UTC")
  .onRun(async (context) => {
    await updateBulletins(PROVIDER);
  });
