var myjson;

$(document).ready(function () {
    console.log("1");
    gettingJSON();
    setInterval(function () {
        console.log("6 - in interval");                    // wird jede 2 sekunden aufgerufen
        gettingJSON();
    }, 600000);
    console.log("neue test zeile verändert");
});

function gettingJSON() {
    console.log("2 - getting JSON start");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=2862831&APPID=00c5a9bacda1d265d5ad4692edf1acaf", function (json, status) {
        console.log('4 - in "getJSON" callback function')
        console.log("status: " + status);
        myjson = json;
        updateUI();
    });    // holt die JSON

    console.log("3 - Zeile nach getJSON()");
}

function updateUI() {
    console.log("5 - in updateUI");
    document.getElementById('temp').innerHTML = myjson.main.temp;
}