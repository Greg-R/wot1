
var resources = require('./../../resources/model');

var internal, sensor;
var model = resources.pi.sensors.pir;
var pluginName = resources.pi.sensors.pir.name;
var localParams = {'simulate': false, 'frequency' : 2000};

exports.start = function (params) {
    localParams = params;
    if (localParams.simulate) {
        simulate();     
    } else {
        connectHardware();
    }
};

exports.stop = function() {
    if (localParams.simulate) {
        clearInterval(interval);
    } else {
        sensor.unexport();
    }
    console.info('${pluginName} plugin stopped');
};

function connectHardware() {
    var Gpio = require('node-dht-sensor');
    var sensor = {
        initialize: function () {
            return sensorDriver.initialize(22, model.temperature.gpio);
        },
        read: function () {
            var readout = sensorDriver.read();
            model.temperature.value = parseFloat(readout.temperature.toFixed(2));
            model.humidity.value = parseFloat(readout.humidity.toFixed(2));
            showValue();
            
            setTimeout(function () {
                sensor.read();
            }, localParams.frequency);
            }
        };
    }

function simulate() {
    interval = setInterval(function() {
                           model.value = !model.value;
                           showValue();
    }, localParams.frequency);
    console.info('Simulated ${pluginName} sensor started');  
}

function showValue() {
    console.info(model.value ? 'there is someone!' : 'not anymore!');
}