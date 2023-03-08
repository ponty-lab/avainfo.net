import mapboxgl from "mapbox-gl";

export const initMap = (
  container: HTMLDivElement,
  bounds?: mapboxgl.LngLatBounds
) => {
  const sw = new mapboxgl.LngLat(-2, 37);
  const ne = new mapboxgl.LngLat(20, 49);
  const llb: mapboxgl.LngLatBounds = new mapboxgl.LngLatBounds(sw, ne);
  const map = new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/light-v10",
    pitchWithRotate: false,
    dragRotate: false,
    center: llb.getCenter(),
    bounds: llb,
    //zoom: 10,
    //maxBounds: bounds,
    //maxZoom: 14,
    //minZoom: 8,
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  });

  map.touchZoomRotate.disableRotation();

  return map;
};
