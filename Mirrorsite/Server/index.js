var WebSocket = require('ws');
var ws = new WebSocket.Server({ port: 9999 });
const express = require('express'), bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.post('/weather', function (req, res) {
    var city = req.body["city"];
    var country = req.body["country"];
    console.log('Hello World!' + city + " " + country);
    ws.send("test");
    res.send('Hello World!' + city + " " + country)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

ws.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log("Received: " + message);

        s.clients.forEach(function e(client) {
            client.send(message);
        });

        //ws.send("From Server:" + message);                       //Schickt an Client
    });

    ws.on('close', function () {
        console.log("I lost a client");
    });

    console.log("one more client connected");
});

