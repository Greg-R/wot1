/*jshint esversion: 6 */

//let resources = require('./../resources/model');

let resources = {'pi':{
    'sensors':{'temperature':{'degrees':1.0}}
}};

let temperature = resources.pi.sensors.temperature.degree;

console.log(`The value of temperature at the beginning is ${temperature}`);

//  Change the value of temperature and report it.

resources.pi.sensors.temperature.degree = 40;

temperature = resources.pi.sensors.temperature.degree;

console.log(`The value of temperature now is ${temperature}`);

console.log(`The value of temperature now is ${resources.pi.sensors.temperature.degree}`);

//  Now create a proxy for resources and see if it will detect changes in temperature.

/*let proxyResources = new Proxy(resources.pi.sensors.temperature, {
    set: function(target, property, value, receiver) {
        console.log('This is the proxyResources speaking.  A value has been set.');
        console.log(`The property being changed is ${property}`);
        console.log(`The value being set is ${value}`);
        target[property] = value;
        return true;
    }    
});*/

let proxyResources = new Proxy(resources, {
    set: function('resources.pi.sensors.temperature', property, value, receiver) {
        console.log('This is the proxyResources speaking.  A value has been set.');
        console.log(`The property being changed is ${property}`);
        console.log(`The value being set is ${value}`);
        target[property] = value;
        return true;
    }    
});

proxyResources.degree = 99.1;

console.log(`The proxy's temperature is ${proxyResources.degree}`);

proxyResources.degree = 89.1;
proxyResources.degree = 79.1;