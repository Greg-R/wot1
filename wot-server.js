var httpServer = require('./servers/http');
//var wsServer =   require('./servers/websockets');
var WebSocketServer = require('ws').Server;
var resources = require('./resources/model');

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
    var url = ws.upgradeReq.url;
    console.info('The upgrade url is %s', url);
    console.info('The websocket url is %s', ws.url);
    ws.on('message', function (message) {
        console.log('A Websocket message is received: %s', message);
    });
    //  Now figure out how to use a Proxy to detect change and send a message.
    var resourceProxy = new Proxy(resources, {get: handler(resources, resources.pi.sensors.temperature.value )});
});

function handler (trapTarget, key, value, receiver) {
    console.log('Temperature value changed');
    return true;
    
}


