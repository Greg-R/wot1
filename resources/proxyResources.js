/*jshint esversion: 6 */

var resourcesObject = require('./resources.json');
var events = require('events');

let sensorEmitter = new events.EventEmitter();

//  Create a "Proxy" for the resources.  This will emit events as the data in the
//  resources object changes.

let validator = {
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
        if (target.name === 'Temperature Sensor')
            sensorEmitter.emit('tempChange');
        if (target.name === 'Humidity sensor')
            sensorEmitter.emit('humidityChange');
        return true;
    }
};

let resourceproxy = new Proxy(resourcesObject, validator);

module.exports = {
    emitter: sensorEmitter,
    resources: resourcesObject,
    resourceProxy: resourceproxy
};
