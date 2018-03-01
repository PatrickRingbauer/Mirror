var myjson;
var city;

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
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=2862831&APPID=00c5a9bacda1d265d5ad4692edf1acaf", function (json, status) {             // holt die JSON
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
    var weathercondition;
    console.log("5 - in updateUI");
    document.getElementById('city').innerHTML = myjson.name;
    document.getElementById('temp').innerHTML = "Temperatur " + (myjson.main.temp - 273.15).toFixed(1) + " °C";
    document.getElementById('humi').innerHTML = "Luftfeuchtigkeit " + myjson.main.humidity + " %";
    document.getElementById('windspeed').innerHTML = "Windgeschwindigkeit " + myjson.wind.speed + " km/h";

    weathercondition = myjson.weather[0].description;

    switch (weathercondition) {
        case "clear sky":
            document.getElementById('description').innerHTML = "Klarer Himmel";
            document.getElementById("image").src = "http://openweathermap.org/img/w/01n.png";
            break;
        case "few clouds":
            document.getElementById('description').innerHTML = "Leicht Bewölkt";
            document.getElementById("image").src = "http://openweathermap.org/img/w/02n.png";
            break;
        case "scattered clouds":
            document.getElementById('description').innerHTML = "einzelne Wolken";
            document.getElementById("image").src = "http://openweathermap.org/img/w/03n.png";
            break;
        case "broken clouds":
            document.getElementById('description').innerHTML = "Aufgelockert Bewölkung";
            document.getElementById("image").src = "http://openweathermap.org/img/w/04n.png";
            break;
        case "shower rain":
            document.getElementById('description').innerHTML = "Regenschauer";
            document.getElementById("image").src = "http://openweathermap.org/img/w/09n.png";
            break;
        case "rain":
            document.getElementById('description').innerHTML = "Regenfall";
            document.getElementById("image").src = "http://openweathermap.org/img/w/10n.png";
            break;
        case "thunderstorm":
            document.getElementById('description').innerHTML = "Gewitter";
            document.getElementById("image").src = "http://openweathermap.org/img/w/11n.png";
            break;
        case "snow":
            document.getElementById('description').innerHTML = "Schnee";
            document.getElementById("image").src = "http://openweathermap.org/img/w/13n.png";
            break;
        case "mist":
            document.getElementById('description').innerHTML = "Nebel";
            document.getElementById("image").src = "http://openweathermap.org/img/w/50n.png";
            break;
        default:
            document.getElementById('description').innerHTML = weathercondition;
    }


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