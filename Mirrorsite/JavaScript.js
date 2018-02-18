function add(a, b) {
    return a + b;
}



                //  00c5a9bacda1d265d5ad4692edf1acaf  openWeathermap key 
//     "id": 2862831,
 //   "name": "Niederstetten",
 //   "country": "DE",
 //   "coord": {
 //     "lon": 9.91944,
 //     "lat": 49.400002


{
    "coord":{ "lon":9.92, "lat":49.4 },
    "weather":[{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }],
    "base":"stations", "main":{ "temp":274.43, "pressure":1013, "humidity":51, "temp_min":273.15, "temp_max":276.15 },
    "visibility":10000, "wind":{ "speed":2.6, "deg":180 },
    "clouds":{ "all":20 },
    "dt":1518533760, "sys":{ "type":1, "id":4966, "message":0.0046, "country":"DE", "sunrise":1518503534, "sunset":1518539850 },
    "id":2862831, "name":"Niederstetten", "cod":200
}

var myData = JSON.parse(wetter);

$(document).ready(function () {
    $.each(myData, function () {
        $('<li>' + this.temp </li > ').appendTo("#groups");
            });
});

document.getElementById("demo").innerHTML = myFunction(10, 2); 

<button id="getIt" onclick="gettingJSON()">Get JSON</button>
    <ul id="getIt"></ul>
    <button id="getTemp" onclick="getTemp()">Get Temp</button>
    <ul id="groups"></ul>

        function gettingJSON() {
    // document.write("jquery loaded");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=2862831&APPID=00c5a9bacda1d265d5ad4692edf1acaf", function (json) {
        document.write(JSON.stringify(json));
    });
}




<!DOCTYPE html>
            <html>
                <head>
                    <title>Weather</title>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>    <!-- adds jQuery -->
    <script>

                        $(document).ready(function () {

                            setInterval(function () {
                                console.log("test");                    // wird jede 2 sekunden aufgerufen
                            }, 2000);

                        });

        function gettingJSON(asdfasdf)
        {
                            $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=2862831&APPID=00c5a9bacda1d265d5ad4692edf1acaf", asdfasdf);    // holt die JSON
                        }

    </script>
                </head>
                <body>
                    <p id="temp"></p>
                    <script>
                        gettingJSON(function (json) {
                            console.log(json.main.temp);
                        temp = json.main.temp + "";
            document.getElementById('temp').innerHTML = temp
        });
    </script>



                    <p>
                        Hello World!
    </p>


                </body>
    </html>


weather.weather.description
weather.weather.icon        https://openweathermap.org/weather-conditions
main.main.temp
main.main.humidity
wind.wind.speed
name