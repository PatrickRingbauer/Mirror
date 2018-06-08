var myjson;
var url;
var lang = localStorage.getItem("lang");
var city = localStorage.getItem("city");
var notes = localStorage.getItem("notes");
var land = "de";

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

        // Web Socket is connected, send data using send()
        ws.send("Message to send");
        //alert("Message is sent...");
        console.log("Message is sent...");
    };

    ws.onmessage = function (evt) {
        var received_msg = JSON.parse(evt.data);
        //alert("Message is received...");
        console.log("Message is received..." + JSON.stringify(evt.data));
        lang = received_msg["lang"];
        city = received_msg["city"];
        notes = received_msg["notes"];
        localStorage.setItem("lang", lang);
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
    console.log("request URL: " + getURL());
    $.getJSON(getURL(), function (json, status) {             // holt die JSON
        console.log('4 - in "getJSON" callback function');
        console.log("response: " + JSON.stringify(name));
        console.log("status: " + status);
        console.log(json.name);
        //if (status =! "success") {
        //    document.getElementById('success').innerHTML = "Fehler beim Wetterdatenabruf";
        //}
        myjson = json;
        updateUI();
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