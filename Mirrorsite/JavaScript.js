var myjson;
var url;
var lang = "de";
var city = localStorage.getItem("city");
var notes = localStorage.getItem("notes");
var land = localStorage.getItem("country");

$(document).ready(function () {
    getUserIP(function (ip) {
        document.getElementById("ip").innerHTML = ip;
    });
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

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function (reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}


//http://api.openweathermap.org/data/2.5/weather?id=2862831&APPID=00c5a9bacda1d265d5ad4692edf1acaf