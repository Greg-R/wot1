var express = require('express');
var router = express.Router();
var resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
	res.send(resources.pi.sensors);
});

router.route('/pir').get(function (req, res, next) {
	res.send(resources.pi.sensors.pir);
});

router.route('/temperature').get(function (req, res, next) {
	res.send(resources.pi.sensors.temperature);
});

router.route('/humidity').get(function (req, res, next) {
	res.send(resources.pi.sensors.humidity);
});

module.exports = router;
