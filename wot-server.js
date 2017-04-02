var httpServer = require('./servers/http');
var wsServer =   require('./servers/websockets');
var resources =  require('./resources/model');

//test
//var ledsPlugin = require('./plugins/ledsPlugin');
var pirPlugin  = require('./plugins/internal/pirPlugin');
var dhtPlugin = require('./plugins/internal/DHT22SensorPlugin');

pirPlugin.start({'simulate': false, 'frequency': 2000});
dhtPlugin.start({'simulate': false, 'frequency': 10000});

var server = httpServer.listen(resources.pi.port, function() {
	console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});
                               
    wsServer.listen(server);
 

