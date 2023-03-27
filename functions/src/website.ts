import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const fetchLatestTilesetDate = functions.https.onRequest(
  async (request, response) => {
    try {
      const mapboxRef = admin
        .firestore()
        .collection("bulletinState")
        .doc("mapbox");
      const mapboxDoc = await mapboxRef.get();
      if (mapboxDoc.exists) {
        const bulletinState = mapboxDoc.data();
        if (bulletinState) {
          const latest = bulletinState["latest_bulletin"];
          response.header("Access-Control-Allow-Origin", "*");
          response.status(200).send(latest);
        }
      }
    } catch (err) {
      functions.logger.error(
        "Error fetching latest Mapbox Tileset date: ",
        err
      );
      response
        .status(404)
        .send(`Error fetching latest Mapbox Tileset date: ${err}`);
    }
  }
);
