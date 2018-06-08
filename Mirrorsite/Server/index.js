var WebSocket = require('ws');
const express = require('express');
var bodyParser = require('body-parser');

var ws = new WebSocket.Server({ port: 9999 });

const app = express()

var clients = [];
app.use(bodyParser.json());

ws.on('connection', function (client) {
    console.log("on connection open: " + client);
    clients.push(client);
});

app.post('/weather', function (req, res) {
    var city = req.body["city"];
    var country = req.body["country"];
    var notes = req.body["notes"];
    console.log('Hello World!' + city + " " + country);
    var objectToSend = {
        "city": city,
        "country": country,
        "notes": notes
    }
    clients.forEach(function (client) {
        console.log("in forEach: " + client);
        client.send(JSON.stringify(objectToSend));
    });
    res.send(JSON.stringify({ "statusCode": "OK" }))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))



