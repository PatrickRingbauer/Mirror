var myjson;
var city;
var land;

$(document).ready(function () {
    console.log("1");
    gettingJSON();
    startTime();

    setInterval(function () {
        console.log("6 - in interval");                    // wird jede 10 Minuten aufgerufen
        gettingJSON();
    }, 600000);

    setInterval(function () {                               // wird jede 0,5 Sekunden aufgerufen
        startTime();
    }, 500);
});

function gettingJSON() {
    console.log("2 - getting JSON start");
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?id=2862831&lang=de&APPID=00c5a9bacda1d265d5ad4692edf1acaf', function (json, status) {             // holt die JSON
        console.log('4 - in "getJSON" callback function')
        console.log("status: " + status);
        console.log(json.name);
        if (status =! "success") {
            document.getElementById('success').innerHTML = "Fehler beim Wetterdatenabruf"
        }
        myjson = json;
        updateUI();
    });    

    console.log("3 - Zeile nach getJSON()");
}

function updateUI() {

    console.log("5 - in updateUI");
    document.getElementById('city').innerHTML = myjson.name;
    document.getElementById('temp').innerHTML = "Temperatur " + (myjson.main.temp - 273.15).toFixed(1) + " °C";
    document.getElementById('humi').innerHTML = "Luftfeuchtigkeit " + myjson.main.humidity + " %";
    document.getElementById('windspeed').innerHTML = "Windgeschwindigkeit " + myjson.wind.speed + " km/h";
    document.getElementById('description').innerHTML = myjson.weather[0].description;
    document.getElementById("image").src = "http://openweathermap.org/img/w/"+ myjson.weather[0].icon +".png";

}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}


//http://api.openweathermap.org/data/2.5/weather?id=2862831&APPID=00c5a9bacda1d265d5ad4692edf1acaf