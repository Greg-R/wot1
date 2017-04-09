/*jshint esversion: 6 */

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
   
    let proxyResources = new Proxy(resources.pi.sensors.temperature, {
        set: function (target, property, value, receiver) {
            console.log('This is the proxyResources speaking.  A value has been set.');
            console.log(`The property being changed is ${property}`);
            console.log(`The value being set is ${value}`);
            target[property] = value;
            return true;
        }
    });

    ws.send('Message from PI server');
});
