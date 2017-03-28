var express = require('express');
var router = express.Router();
var resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
	res.send(resources.pi.sensors);
    next();
});

router.route('/pir').get(function (req, res, next) {
	res.send(resources.pi.sensors.pir);
    next();
});

router.route('/temperature').get(function (req, res, next) {
	res.send(resources.pi.sensors.temperature);
    next();
});

router.route('/humidity').get(function (req, res, next) {
	res.send(resources.pi.sensors.humidity);
    next();
});

module.exports = router;
