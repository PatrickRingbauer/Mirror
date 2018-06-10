var myjson;
var url;
var lang = "de";
var city = localStorage.getItem("city");
var notes = localStorage.getItem("notes");
var land = localStorage.getItem("country");

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

    var ws = new WebSocket("ws://localhost:9999");
    ws.onopen = function () {
        console.log("onOpen");
    };

    ws.onmessage = function (websocket) {
        var received_msg = JSON.parse(websocket.data);
        console.log("Message is received..." + JSON.stringify(websocket.data));
        land = received_msg["country"];
        city = received_msg["city"];
        notes = received_msg["notes"];
        localStorage.setItem("country", land);
        localStorage.setItem("city", city);
        localStorage.setItem("notes", notes);
        gettingJSON();
    };

    ws.onclose = function () {

        // websocket is closed.
        console.log("Connection is closed...");
    };
});

function gettingJSON() {
    console.log("2 - getting JSON start");
    $.getJSON(getURL(), function (json, status) {             // holt die JSON
        console.log('4 - in "getJSON" callback function');
        console.log("status: " + status);
        console.log(json.name);
        myjson = json;
        updateUI();
        console.log(getURL());
    });

    console.log("3 - Zeile nach getJSON()");
}

function getURL() {
    return "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + land + "&lang=" + lang + "&APPID=00c5a9bacda1d265d5ad4692edf1acaf";
}

function updateUI() {

    console.log("5 - in updateUI");
    document.getElementById('city').innerHTML = myjson.name;
    document.getElementById('temp').innerHTML = "Temperatur " + (myjson.main.temp - 273.15).toFixed(1) + " °C";
    document.getElementById('humi').innerHTML = "Luftfeuchtigkeit " + myjson.main.humidity + " %";
    document.getElementById('windspeed').innerHTML = "Windgeschwindigkeit " + myjson.wind.speed + " km/h";
    document.getElementById('description').innerHTML = myjson.weather[0].description;
    document.getElementById("image").src = "http://openweathermap.org/img/w/" + myjson.weather[0].icon + ".png";
    document.getElementById('notes').innerHTML = localStorage.getItem("notes");
    console.log(localStorage.getItem("notes"));
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;

    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    day = checkTime(day);
    month = checkTime(month);
    document.getElementById('date').innerHTML = day + "." + month + "." + year;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }  // add zero in front of numbers < 10
    return i;
}


//http://api.openweathermap.org/data/2.5/weather?id=2862831&APPID=00c5a9bacda1d265d5ad4692edf1acaf