function forgetNav() {
  const buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++)
    buttons[i].classList.remove("clicked");
}
function forgetNav1() {
  const buttons = document.querySelectorAll("#menu1 button");
  for (let i = 0; i < buttons.length; i++)
    buttons[i].classList.remove("clicked");
}
function forgetNav2() {
  const buttons = document.querySelectorAll(".menu2 button");
  for (let i = 0; i < buttons.length; i++)
    buttons[i].classList.remove("clicked");
}

const btnHome = document.getElementById("btnHome");
const btnHome_cl = btnHome.classList;
const btnRoad = document.getElementById("btnRoad");
const btnRoad_cl = btnRoad.classList;
const btnGravel = document.getElementById("btnGravel");
const btnGravel_cl = btnGravel.classList;

const menu2 = document.querySelector(".menu2");
const menu2_cl = menu2.classList;
const btnCatalog = document.getElementById("btnCatalog");
const btnCatalog_cl = btnCatalog.classList;
const btnTrack = document.getElementById("btnTrack");
const btnTrack_cl = btnTrack.classList;

const home = document.querySelector(".home");
const home_cl = home.classList;
const catalog = document.querySelector(".catalog");
const catalog_cl = catalog.classList;
const ddlTracks = document.getElementById("ddlTracks");
const track = document.querySelector(".track");
const track_cl = track.classList;

// main menu
btnHome.addEventListener("click", () => {
  forgetNav(); btnHome_cl.add("clicked");
  menu2_cl.add("hidden");
  home_cl.remove("hidden");
  catalog_cl.add("hidden");
  track_cl.add("hidden");
  dedicatedMapUpdated = false;
});
btnRoad.addEventListener("click", () => {
  if (menu2_cl.contains("hidden")) {
    forgetNav(); btnRoad_cl.add("clicked");
    btnCatalog_cl.add("clicked"); menu2_cl.remove("hidden");
    home_cl.add("hidden");
    catalog_cl.remove("hidden"); catalogMap();
    track_cl.add("hidden");
  } else {
    forgetNav1(); btnRoad_cl.add("clicked");
    dedicatedMapUpdated = false; resetTrackList();
    if (btnCatalog_cl.contains("clicked"))
      catalogMap();
    else
      trackMap();
  }
});
btnGravel.addEventListener("click", () => { // failed to factorize with above
  if (menu2_cl.contains("hidden")) {
    forgetNav(); btnGravel_cl.add("clicked");
    btnCatalog_cl.add("clicked"); menu2_cl.remove("hidden");
    home_cl.add("hidden");
    catalog_cl.remove("hidden"); catalogMap();
    track_cl.add("hidden");
  } else {
    forgetNav1(); btnGravel_cl.add("clicked");
    dedicatedMapUpdated = false; resetTrackList();
    if (btnCatalog_cl.contains("clicked"))
      catalogMap();
    else
      trackMap();
  }
});

// secondary menu
let dedicatedMapUpdated = false;
btnCatalog.addEventListener("click", () => {
  forgetNav2(); btnCatalog_cl.add("clicked");
  catalog_cl.remove("hidden"); track_cl.add("hidden");
  catalogMap();
});
btnTrack.addEventListener("click", () => {
  forgetNav2(); btnTrack_cl.add("clicked");
  catalog_cl.add("hidden"); track_cl.remove("hidden");
  if (!dedicatedMapUpdated) resetTrackList(); trackMap();
});

// detailed map selector
function resetTrackList(i = -1) {
  if (!dedicatedMapUpdated) {
  let trackOptions = "";
  if (btnRoad_cl.contains("clicked"))
    for (let i = 0; i < roadTracks.length; i++)
      trackOptions += `<option>${roadTracks[i].label}</option>`;
  else // btnGravel
    for (let i = 0; i < gravelTracks.length; i++)
      trackOptions += `<option>${gravelTracks[i].label}</option>`;
  ddlTracks.innerHTML = trackOptions;
  }
  ddlTracks.selectedIndex = i;
}
ddlTracks.addEventListener("input", () => {
  trackMap();
});
