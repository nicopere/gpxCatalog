//https://leafletjs.com/examples/layers-control/
function gpxGroup(tracks) {
  const group = L.layerGroup();
  for (let i = 0; i < tracks.length; i++) {
  //the L.GPX call is the reason why the site must be http-served (module...)
    new L.GPX(tracks[i].path, {
      async: true,
      marker_options: options_marker,
      gpx_options: options_gpx,
      polyline_options: {
        color: options_color[i%options_color.length],
        weight: 5,
        opacity: 0.5
      }
    }).on('loaded', (e) => {
      e.target._info.name = tracks[i].label;
    }).on('mouseover', (e) => {
      let gpx = e.target;
      gpx.setStyle({
        weight: 8
      });
      infoC.update(gpx);
    }).on('mouseout', (e) => {
      e.target.setStyle({
        weight: 5
      });
      infoC.update();
    }).on('click', () => {
      forgetNav2(); btnTrack_cl.add("clicked");
      catalog_cl.add("hidden"); track_cl.remove("hidden");
      resetTrackList(i); trackMap();
    }).addTo(group);
  }
  return group;
}

const roadGroup = gpxGroup(roadTracks);
const gravelGroup = gpxGroup(gravelTracks);

function createCatalogMap() {
  base = createBaseLayers();
  const map = L.map('catalog_map', {
    center: initCenter,
    zoom: initZoom,
    layers: [base.OSM, roadGroup]
  });
  const overlays = {
    'road': roadGroup,
    'gravel': gravelGroup
  }
  const layerControl = L.control.layers(base, overlays).addTo(map);
  return map
}

let mapC, infoC;
let catalogMapCreated = false;

function catalogMap() {
  if (!catalogMapCreated) {
    mapC = createCatalogMap();
    catalogMapCreated = true;
    //https://leafletjs.com/examples/choropleth/
    infoC = L.control({position: 'bottomleft'});
    infoC.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };
    infoC.update = function (gpx) {
      this._div.innerHTML = gpx
      ?`<h4>${gpx.get_name()}</h4>
        Distance: ${Math.round(gpx.get_distance()/1000)} km<br />
        Elevation gain: ${Math.round(gpx.get_elevation_gain())} m<br />
        (click to access directly the detailed map)`
      :'<h4>Length and elevation</h4>Hover on a track (without clicking)';
    };
    infoC.addTo(mapC);
  }
  if (btnRoad_cl.contains("clicked")) {
    mapC.removeLayer(gravelGroup);
    roadGroup.addTo(mapC);
  } else {
    mapC.removeLayer(roadGroup);
    gravelGroup.addTo(mapC);
  }
}
