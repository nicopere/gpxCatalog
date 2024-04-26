function createBaseLayers() {
  //https://leaflet-extras.github.io/leaflet-providers/preview/
  const OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  const OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  const OpenStreetMap_BZH = L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
    bounds: [[46.2, -5.5], [50, 0.7]]
  });
  const CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  /* check out myKeys.js before activating this layer
  const Thunderforest_OpenCycleMap = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: myThunderforestKey,
    maxZoom: 22
  });
  */
  const GeoportailFrance_plan = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
    attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
    bounds: [[-75, -180], [81, 180]],
    minZoom: 2,
    maxZoom: 18,
    apikey: 'choisirgeoportail',
    format: 'image/png',
    style: 'normal'
  });
  const GeoportailFrance_orthos = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
    attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
    bounds: [[-75, -180], [81, 180]],
    minZoom: 2,
    maxZoom: 19,
    apikey: 'choisirgeoportail',
    format: 'image/jpeg',
    style: 'normal'
  });

  const baseLayers = {
    'OSM': OpenStreetMap_Mapnik,
    'OSM.France': OpenStreetMap_France,
    'OSM.BZH': OpenStreetMap_BZH,
    'OSM.cyclo': CyclOSM,
    /* check out myKeys.js before activating this layer
    'ThunderForest.cyclo': Thunderforest_OpenCycleMap,
    */
    'Geoportail.carte': GeoportailFrance_plan,
    'Geoportail.photo': GeoportailFrance_orthos
  };
  return baseLayers;
}

//https://github.com/mpetazzoni/leaflet-gpx
const options_marker = {
/*startIconUrl: 'img/pin-icon-start.png',
  endIconUrl:   'img/pin-icon-end.png',
  iconSize: [21, 30],*/
  startIconUrl: 'img/pin-icon-play.png',
  endIconUrl:   'img/pin-icon-stop.png',
  iconSize:   [21, 33],
  iconAnchor: [11, 30],
  shadowUrl:     null,
  wptIconUrls: {
    '': 'img/pin-icon-wpt.png'
  }
};
const options_gpx = {
   parseElements: ['track']
}
const options_color = ['red', 'green', 'blue'];

const initCenter = [48.6, -4.5];
const initZoom = 11;
