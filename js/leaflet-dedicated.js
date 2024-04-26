const singleGroup = L.layerGroup(); // need a group to clear a layer...

function createDedicatedMap() {
  base = createBaseLayers();
  const map = L.map('dedicated_map', {
    center: initCenter,
    zoom: initZoom,
    layers: [base.OSM, singleGroup]
  });
  const layerControl = L.control.layers(base).addTo(map);
  let elevation_options = { //https://github.com/Raruto/leaflet-elevation
    theme: "lightblue-theme",
    detached: true,
    elevationDiv: "#elevation",
    autohide: false,
    collapsed: false,
    position: "bottomleft",
    closeBtn: true,
    followMarker: false,
    autofitBounds: true,
    imperial: false,
    reverseCoords: false,
    acceleration: false,
    slope: false,
    speed: false,
    altitude: true,
    time: false,
    distance: true,
    summary: 'inline',
    downloadLink: 'link', // not shown apart from mapD.elevation.load()
    ruler: false,
    legend: false,
    almostOver: false,
    distanceMarkers: false,
    edgeScale: false,
    hotline: false,
    timestamps: false,
    waypoints: false,
    wptIcons: false,
    wptLabels: false,
    preferCanvas: true,
    polyline: { className: '' } //https://github.com/Raruto/leaflet-elevation/issues/235
  };
  map.elevation = L.control.elevation(elevation_options).addTo(map);
  return map
}

let mapD;
let dedicatedMapCreated = false;

function trackMap() {
  trackDescription = document.getElementById("description");
  trackDescription.innerHTML = "<p>?</p>";
  const selectedTrack = ddlTracks.selectedIndex;
  singleGroup.clearLayers(); dedicatedMapUpdated = false;
  if (selectedTrack === -1) return;
  let track;
  if (btnRoad_cl.contains("clicked"))
    track = roadTracks[selectedTrack];
  else
    track = gravelTracks[selectedTrack];
  trackDescription.innerHTML = `<p>${track.description}
    <a href="${track.path}">Download the gpx file</a>.</p>`;
  if (!dedicatedMapCreated) {
    mapD = createDedicatedMap();
    dedicatedMapCreated = true;
  }
  //https://raruto.github.io/leaflet-elevation/examples/leaflet-elevation_toggable-tracks.html
  new L.GPX(track.path, {
    async: true,
    marker_options: options_marker,
    gpx_options: options_gpx,
    polyline_options: {
      color: options_color[selectedTrack%options_color.length],
      weight: 5
    }
  }).on('loaded', (e) => {
    mapD.fitBounds(e.target.getBounds());
  }).on("addline", (e) => {
    mapD.elevation.clear();
    mapD.elevation.addData(e.line);
  }).addTo(singleGroup);
  //mapD.elevation.load(track.path); // overwrites mapD.elevation.addData()
  dedicatedMapUpdated = true;
}
