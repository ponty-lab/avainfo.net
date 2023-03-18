import mapboxgl from "mapbox-gl";

export const initMap = (container: HTMLDivElement) => {
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
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  });

  map.touchZoomRotate.disableRotation();

  return map;
};
