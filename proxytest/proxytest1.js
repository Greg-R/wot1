/*jshint esversion: 6 */

let resources = require('./../resources/model');

let validator = {
    get: function (target, key) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], validator);
    } else {
      return target[key];
    }
  } ,
    set: function(target, property, value, receiver) {
        console.log('Hello from resourcesProxy.');
        console.log(`The property changed is ${property} and the value is ${value}`);
        target[property] = value;
        return true;
    }
};

/*let resourcesProxy = new Proxy(resources, {
    get: function (target, key) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], validator);
    } else {
      return target[key];
    }
  } ,
    set: function(target, property, value, receiver) {
        console.log('Hello from resourcesProxy.');
        return false;
    }
});*/

let resourcesProxy = new Proxy(resources, validator);

console.log(`The temperature value at beginning is ${resources.pi.sensors.temperature.value}`);

//  Now change the temperature using the Proxy:

resourcesProxy.pi.sensors.temperature.value = 25;

console.log(`The temperature value at end is ${resources.pi.sensors.temperature.value}`);