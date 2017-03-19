var httpserver = require('./servers/http');
var resources = require('./resources/model');

var server = httpServer.listen(resources.pi.port, function() {
	console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});
