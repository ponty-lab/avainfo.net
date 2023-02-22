import React, { useRef, useEffect, useState } from "react";
// @ts-ignore
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { format, parse } from "date-fns";
import AvaColors from "../styles/colors.style";
import Sidebar from "../components/Sidebar";
import ToggleButton from "../components/ToggleButton";
import { DateContainer, MapContainer} from "../styles/map.style";
// import { TailSpin} from  "react-loader-spinner";
import { processMapboxData } from "../utils/processMapboxData";
import {useTheme} from "styled-components";

const URL = "https://us-central1-avainfo-net.cloudfunctions.net/fetchLatestTilesetDate"

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXZhaW5mbyIsImEiOiJjbDVxbDVjOTIxNDFjM2lvZWQzcDF4dndoIn0.W8Q4-jsphhQfIfCQ3grrsw";



const paintColor = [
        "case",
        ["boolean", ["feature-state", "click"], false],
        "#FF9F00",
        ["boolean", ["feature-state", "hover"], false],
        "#FFA52C",
        [
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
        ]
      ]

const Home = () => {
  const options = [
    {
      name: "AM",
      property: "earlier",
      paint: paintColor,
    },
    {
      name: "PM",
      property: "later",
      paint: paintColor
    },
  ];

  const mapContainer = useRef<any>(null);

  const [active, setActive] = useState<Record<string, any>>(options[0]);
  const [map, setMap] = useState<any>(null);
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  // const [loading, setLoading] = useState<boolean>(true)
  const [id, setId] = useState<string | null>(null)

  let hoveredRegionId: string | null = null;
  let clickRegionId: string | null = null;
  let _geojson_source = "avalanche-map"
  let __id = "avalanche-danger";
  let _layer_name = "avalanche-danger-ratings"
  const theme = useTheme()

  useEffect(() => {

    //setLoading(true)
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
      let _mapbox_tileset = `mapbox://avainfo.avalanche-map-en-${latest}`
      

      map.addSource(_geojson_source, {
        type: "vector",
        url: _mapbox_tileset
      });

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
            0.5
          ],
        },
      });

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

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.

      map.setPaintProperty(__id, "fill-color", active.paint);

      setMap(map);
      //setLoading(false)

    map.on("click", __id, (e: any) => {
      e.preventDefault();
      if (e.features.length === 0) return;
      if (e.features[0].properties) {
        map.flyTo({
          center: [e.lngLat.lng - 1, e.lngLat.lat]
        })
        const data = processMapboxData(e.features[0].properties);
        console.log("data: ", data);
        setData(data)
        setModalOpen(true);
      }

      if (clickRegionId) {
        map.removeFeatureState(
          { source: _geojson_source, sourceLayer: _layer_name, id: clickRegionId }
        );
      }

      clickRegionId = e.features[0].id;
      setId( e.features[0].id)
      map.setFeatureState(
        { source: _geojson_source, sourceLayer: _layer_name, id: clickRegionId },
        { click: true }
      );  
    });

    map.on("click", (e: any) => {
      if (e.defaultPrevented === false) {
          if (clickRegionId) {
            map.removeFeatureState(
            { source: _geojson_source, sourceLayer: _layer_name, id: clickRegionId }
          );
        }
      }
  });


    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mousemove", __id, (e: any) => {
      map.getCanvas().style.cursor = "pointer";
      if (e.features.length === 0) return;

      if (hoveredRegionId) {
        map.setFeatureState(
          { source: _geojson_source, sourceLayer: _layer_name, id: hoveredRegionId },
          {hover: false}
        );
      }
      hoveredRegionId = e.features[0].id;
      map.setFeatureState(
        { source: _geojson_source, sourceLayer: _layer_name, id: hoveredRegionId },
        { hover: true }
      );  
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", __id, () => {
     
      if (hoveredRegionId) {
        map.setFeatureState(
          { source: _geojson_source, sourceLayer: _layer_name, id: hoveredRegionId },
          { hover: false }
        );
      }
      
      hoveredRegionId = null;
      map.getCanvas().style.cursor = "";
    });

    map.touchZoomRotate.disableRotation();

    return () => map.remove();
        });
  }, []);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty(__id, "fill-color", active.paint);
    }
  };

  const changeState = (i: number) => {
    setActive(options[i]);
  };


  const onPress = () => {
    setModalOpen(false);
    if (id) {
      map.removeFeatureState(
        { source: _geojson_source, sourceLayer: _layer_name, id: id }
      );
    }
    setId(null)
  }

  return (
    <div style={{position: "relative", maxHeight: "calc(100vh - 60px)"}}>
    {modalOpen ?
      <Sidebar
        data={data}
        onPress={onPress}
      /> : null
    }
    {/* {loading ?         
    <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{position: "absolute", top: "50vh", left: "50vw"}}
          wrapperClass=""
        visible={true}
      /> : null} */}
      <MapContainer ref={mapContainer}/>
      <ToggleButton
        options={options}
        property={active.property}
        changeState={changeState}
      />
      <DateContainer>
        <h3 
        className="theme-color" 
        style={{
          paddingLeft: 20, 
          paddingRight: 20, 
          fontWeight: 400, 
          fontSize: 20, 
          background: theme.primaryColor, 
          color: "white", 
          borderRadius: 50
          }}
        >
          {date}
        </h3>
      </DateContainer>
    </div>
  );
};

export default Home;
