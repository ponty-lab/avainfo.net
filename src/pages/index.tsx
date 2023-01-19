import React, { useRef, useEffect, useState } from "react";
// @ts-ignore
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { format, parse } from "date-fns";
//import fetch from "node-fetch";
import AvaColors from "../styles/colors.style";
import Sidebar from "../components/sidebar";
import ToggleButton from "../components/toggleButton";

const URL = "https://us-central1-avainfo-net.cloudfunctions.net/fetchLatestTilesetDate"

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXZhaW5mbyIsImEiOiJjbDVxbDVjOTIxNDFjM2lvZWQzcDF4dndoIn0.W8Q4-jsphhQfIfCQ3grrsw";

const Home = () => {
  const options = [
    {
      name: "AM",
      property: "maxDanger_earlier",
      paint: [
        "interpolate",
        ["linear"],
        ["get", "maxDangerRating_earlier_numeric"],
        -1,
        AvaColors["-1"],
        1,
        AvaColors["1"],
        2,
        AvaColors["2"],
        3,
        AvaColors["3"],
        4,
        AvaColors["4"],
        5,
        AvaColors["5"],
      ],
    },
    {
      name: "PM",
      property: "maxDanger_later",
      paint: [
        "interpolate",
        ["linear"],
        ["get", "maxDangerRating_later_numeric"],
        -1,
        AvaColors["-1"],
        1,
        AvaColors["1"],
        2,
        AvaColors["2"],
        3,
        AvaColors["3"],
        4,
        AvaColors["4"],
        5,
        AvaColors["5"],
      ],
    },
  ];

  const mapContainer = useRef<any>(null);

  const [active, setActive] = useState<Record<string, any>>(options[0]);
  const [map, setMap] = useState<any>(null);
  const [regionName, setRegionName] = useState<string | null>(null);
  const [dangerAM, setDangerAM] = useState<number>(0);
  const [dangerPM, setDangerPM] = useState<number>(0);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      pitchWithRotate: false,
      dragRotate: false,
      center: [10.6, 46.4],
      zoom: 5.9,
    });

    map.on("load", async (e: any) => {
      // Fetch the latest date so we can call the latest tileset 
      const resp = await fetch(URL);
      const latest =  await resp.text()
      const dateString = parse(latest, "yyyy-MM-dd", new Date())
      setDate(format(dateString, "dd MMMM yyyy"))

      map.addSource("avalanche-map", {
        type: "vector",
        url: `mapbox://avainfo.avalanche-map-en-${latest}`,
      });

      map.addLayer({
        id: "avalanche-danger",
        type: "fill",
        source: "avalanche-map",
        "source-layer": "avalanche-danger-ratings",
        paint: {
          "fill-antialias": false,
          "fill-opacity": 0.65,
        },
      });

      map.addLayer({
        id: "avalanche-danger-line",
        type: "line",
        source: "avalanche-map",
        "source-layer": "avalanche-danger-ratings",
        paint: {
          "line-color": "#ffffff",
          "line-width": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            5,
            0,
            10,
            3,
          ],
        },
      });

      map.setPaintProperty("avalanche-danger", "fill-color", active.paint);

      setMap(map);
    });

    /*         map.once('idle', (e: any) => {
            const features = map.queryRenderedFeatures(e.point);
            if (features.length) {
                const feature = features[0];
                setRegionName(feature.properties.regionName)
                setDangerLevelString(feature.properties.maxDangerRating_string)
                setDangerLevelNumeric(feature.properties.maxDangerRating_numeric)
            }
        }); */

    map.on("mousemove", "avalanche-danger", (e: any) => {
      //console.log(e.point);
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];
        if (feature.properties) {
          setRegionName(feature.properties.regionName);
          setDangerAM(feature.properties.maxDangerRating_earlier_numeric);
          setDangerPM(feature.properties.maxDangerRating_later_numeric);
        }
      }
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "avalanche-danger", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "avalanche-danger", () => {
      map.getCanvas().style.cursor = "";
    });

    map.touchZoomRotate.disableRotation();

    return () => map.remove();
  }, []);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty("avalanche-danger", "fill-color", active.paint);
    }
  };

  const changeState = (i: number) => {
    setActive(options[i]);
  };

  return (
    <div>
      <Sidebar
        regionName={regionName}
        dangerAM={dangerAM}
        dangerPM={dangerPM}
        name={active.name}
      />
      <div ref={mapContainer} className="map-container" />
      <ToggleButton
        options={options}
        property={active.property}
        changeState={changeState}
      />
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 30,
          zIndex: 1,
          backgroundColor: "transparent",
        }}
      >
        <h2 className="theme-color">{date}</h2>
      </div>
    </div>
  );
};

export default Home;
