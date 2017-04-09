/*jshint esversion: 6 */

var httpServer = require('./servers/http');
//var wsServer =   require('./servers/websockets');
var WebSocketServer = require('ws').Server;
var resources = require('./resources/model');
var emitter = require('./resources/proxyResources').emitter;
var proxyresource = require('./resources/proxyResources').resourceProxy;

//test
//var ledsPlugin = require('./plugins/ledsPlugin');
var pirPlugin = require('./plugins/internal/pirPlugin');
var dhtPlugin = require('./plugins/internal/DHT22SensorPlugin');

pirPlugin.start({
    'simulate': false,
    'frequency': 2000
});
dhtPlugin.start({
    'simulate': false,
    'frequency': 10000
});

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});

var wss = new WebSocketServer({
    server: server
});

wss.on('listening', function () {
    console.log('WebSocketServer listening event fired.');
});

wss.on('connection', function (ws) {
    console.info('Successfully connected to WebSocket.');
    console.info(`The initial temperature value is ${resources.pi.sensors.temperature.value}`);
    var url = ws.upgradeReq.url;
    console.info('The upgrade url is %s', url);
    console.info('The websocket url is %s', ws.url);
    ws.on('message', function (message) {
        console.log('A Websocket message is received: %s', message);
    });
    //  Now figure out how to use a Proxy to detect change and send a message.
    //  Send the temperature using an Event emitted by a temperature change (via Proxy);
    emitter.on('tempChange', function () {
  //      ws.send(`Temperature update: ${resources.pi.sensors.temperature.value}`);
              ws.send(JSON.stringify(resources.pi.sensors.temperature));
    });
    emitter.on('humidityChange', function () {
        ws.send(`Humidity update: ${resources.pi.sensors.humidity}`);
    });
});
