/*jshint esversion: 6 */

var httpServer = require('./servers/http');
//var wsServer =   require('./servers/websockets');
var WebSocketServer = require('ws').Server;
var resources = require('./resources/model');
var events = require('events');

var emitter = new events.EventEmitter();

var validator = {
    get: function (target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], validator);
        } else {
            return target[key];
        }
    },
    set: function (target, key, value) {
        console.log(target);
        console.log(key);
        console.log(value);
        target[key] = value;
        emitter.emit('tempChange');
        return true;
    }
};

let resourcesProxy = new Proxy(resources, validator);

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

    let proxyResources = new Proxy(resources.pi.sensors.temperature, {
        set: function (target, property, value, receiver) {
            console.log('This is the proxyResources speaking.  A value has been set.');
            console.log(`The property being changed is ${property}`);
            console.log(`The value being set is ${value}`);
            target[property] = value;
            return true;
        }
    });
//  Send the temperature using an Event emitted by a temperature change (via Proxy);
    emitter.on('tempChange', function (ws) { 
        ws.send(`Temperature update: ${resources.pi.sensors.temperature.value}`);
    });
});


