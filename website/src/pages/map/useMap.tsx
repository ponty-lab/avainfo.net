import React, { useCallback, useEffect, useRef, useState } from "react";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import AvaColors from "../../styles/colors.style";
import fetchLatestTileDate from "../../api";
import { format, parse } from "date-fns";
import { processMapboxData } from "./processMapboxData";

const _geojson_source = "avalanche-map";
const __id = "avalanche-danger";
const _layer_name = "avalanche-danger-ratings";

const URL =
  "https://us-central1-avainfo-net.cloudfunctions.net/fetchLatestTilesetDate";

const paintColor = (property: string) => {
  return [
    "case",
    ["boolean", ["feature-state", "click"], false],
    "rgba(0,0,0,0.5)",
    ["boolean", ["feature-state", "hover"], false],
    "rgba(0,0,0,0.3)",
    [
      "step",
      ["get", `maxDangerRating_${property}_numeric`],
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
  ];
};

type OptionProps = {
  name: string;
  property: string;
  paint: any;
};

const options: OptionProps[] = [
  {
    name: "AM",
    property: "earlier",
    paint: paintColor("earlier"),
  },
  {
    name: "PM",
    property: "later",
    paint: paintColor("later"),
  },
];

const PopupDescription = (feature: any) => {
  const property = feature.properties;
  return `${property.regionName} | ${property.maxDangerRating_allDay_string}`;
};

export const useMap = (
  mapContainer: React.RefObject<HTMLDivElement | null>
) => {
  const [active, setActive] = useState<OptionProps>(options[0]);
  const [bulletin, setBulletin] = useState<Record<string, any> | null>(null);
  const [featureId, setFeatureId] = useState<string | null>(null);
  const [tileDate, setTileDate] = useState<string | null>(null);
  const [baseMap, setBaseMap] = useState<mapboxgl.Map | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [mapReady, setBaseMapReady] = useState<boolean>(false);

  let hoveredRegionId = useRef<string | undefined>(undefined);
  let clickedRegionId = useRef<string | undefined>(undefined);
  const popupRef = useRef<mapboxgl.Popup>(
    new mapboxgl.Popup({
      className: "ava-popup",
      closeButton: false,
      offset: 5,
    })
  );

  type MapProps = {
    setBaseMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>;
    mapContainer: React.RefObject<HTMLDivElement | null>;
  };

  useEffect(() => {
    const initialiseMap = ({ setBaseMap, mapContainer }: MapProps) => {
      const sw = new mapboxgl.LngLat(-2, 37);
      const ne = new mapboxgl.LngLat(20, 49);
      const llb: mapboxgl.LngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v10?optimize=true",
        pitchWithRotate: false,
        dragRotate: false,
        center: llb.getCenter(),
        bounds: llb,
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      });

      map.on("load", () => {
        setBaseMap(map);
        map.touchZoomRotate.disableRotation();
        map.resize();
      });

      map.on("load", async () => {
        // Fetch the latest tileset date and set the mapbox tileset
        const latestDate = await fetchLatestTileDate(URL);
        const dateString = parse(latestDate, "yyyy-MM-dd", new Date());
        setTileDate(format(dateString, "dd MMMM yyyy"));
        const _mapbox_tileset = `mapbox://avainfo.avalanche-map-en-${latestDate}`;

        // Add tileset data to the map as a layer
        map.addSource(_geojson_source, {
          type: "vector",
          url: _mapbox_tileset,
        });

        // Add fill layer to the map
        map.addLayer({
          id: __id,
          type: "fill",
          source: _geojson_source,
          "source-layer": _layer_name,
          layout: {},
          paint: {
            "fill-antialias": false,
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "click"], false],
              1,
              ["boolean", ["feature-state", "hover"], false],
              0.7,
              0.5,
            ],
          },
        });

        // Add line layer to the map
        map.addLayer({
          id: "avalanche-danger-line",
          type: "line",
          source: _geojson_source,
          "source-layer": _layer_name,
          layout: {},
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

        // Set the paint color
        map.setPaintProperty(__id, "fill-color", paintColor("earlier"));
        setBaseMapReady(true);

        // Check if the user has clicked on a region.
        map.on("click", __id, (e: any) => {
          e.preventDefault();
          if (e.features.length > 0) {
            const feature = e.features[0];

            if (feature.properties) {
              // Center the map on the clicked region
              map.flyTo({
                center: [e.lngLat.lng - 1, e.lngLat.lat],
                duration: 950,
              });

              // Process the polygon feature data into a JSON object and set modal state
              const data = processMapboxData(feature.properties);
              setBulletin(data);
              setModalOpen(true);

              // Remove the previous feature state
              if (clickedRegionId.current) {
                map.removeFeatureState({
                  source: _geojson_source,
                  sourceLayer: _layer_name,
                  id: clickedRegionId.current,
                });
              }

              // Set the new feature state
              clickedRegionId.current = feature.id;
              map.setFeatureState(
                {
                  source: _geojson_source,
                  sourceLayer: _layer_name,
                  id: clickedRegionId.current,
                },
                { click: true }
              );
              setFeatureId(feature.id);
            }
          }
        });

        map.on("click", (e: any) => {
          if (e.defaultPrevented === false) {
            if (clickedRegionId.current) {
              map.removeFeatureState({
                source: _geojson_source,
                sourceLayer: _layer_name,
                id: clickedRegionId.current,
              });
            }
          }
        });

        // When the user moves their mouse over the avalanche layer, update the
        // feature state for the feature under the mouse.
        map.on("mousemove", __id, (e: any) => {
          // Change the cursor to a pointer when the mouse is over the avalanche layer.
          map.getCanvas().style.cursor = "pointer";

          if (e.features.length > 0) {
            const feature = e.features[0];

            // Remove the previous feature state
            if (hoveredRegionId.current) {
              map.setFeatureState(
                {
                  source: _geojson_source,
                  sourceLayer: _layer_name,
                  id: hoveredRegionId.current,
                },
                { hover: false }
              );
            }

            // Set the new feature state
            hoveredRegionId.current = feature.id;
            map.setFeatureState(
              {
                source: _geojson_source,
                sourceLayer: _layer_name,
                id: hoveredRegionId.current,
              },
              { hover: true }
            );

            // Create the popup
            const description = PopupDescription(feature);
            popupRef.current
              .setLngLat(e.lngLat)
              .setHTML(description)
              .addTo(map);
          }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on("mouseleave", __id, () => {
          // Change it back to a pointer when it leaves.
          map.getCanvas().style.cursor = "";

          // Remove the popup
          popupRef.current.remove();
          if (hoveredRegionId.current) {
            map.setFeatureState(
              {
                source: _geojson_source,
                sourceLayer: _layer_name,
                id: hoveredRegionId.current,
              },
              { hover: false }
            );

            hoveredRegionId.current = undefined;
          }
        });
      });

      return () => map.remove();
    };

    if (!baseMap) {
      initialiseMap({ setBaseMap, mapContainer });
    }
  }, [baseMap, mapContainer]);

  // Function to update the paint property of the map
  const paint = useCallback(() => {
    if (baseMap && mapReady) {
      baseMap.setPaintProperty(__id, "fill-color", active.paint);
    }
  }, [baseMap, active.paint, mapReady]);

  // Update the paint property of the map trigerred
  // when the active state changes by changeState
  useEffect(() => {
    paint();
  }, [active, paint]);

  // Callback for when the user toggles between AM and PM
  // danger ratings
  const changeState = (i: number) => {
    setActive(options[i]);
  };

  // Callback for when the user closes the sidebar
  const onPress = () => {
    setModalOpen(false);

    // Remove the click state from the map

    if (featureId) {
      baseMap.removeFeatureState({
        source: _geojson_source,
        sourceLayer: _layer_name,
      });
    }
    clickedRegionId.current = undefined;
    setFeatureId(null);
  };

  return {
    tileDate,
    bulletin,
    onPress,
    modalOpen,
    options,
    changeState,
    active,
  };
};
