function init() {
    map_init();
}

function map_init() {
    document.querySelector("#mapid div").remove();
    mapp = L.map('mapid',{'worldCopyJump':true}).setView([0,0],0);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapp);
}

var mapp;
var featcoll;

document.addEventListener("DOMContentLoaded", init);
