var WebSocketServer = require('ws').Server,
    resources = require('./../resources/model');

exports.listen = function (server) {
    var wss = new WebSocketServer({
        server: server
    });
    console.info('WebSocket server started...');

    // Broadcast to all.
 /*   wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === wss.OPEN) {
                client.send(new Date().toTimeString());
            }
        });
    };

    setTimeout(wss.broadcast, 1000);

    wss.onopen = (open) => {
        console.info('The onopen event was fired, the websocket opened.');
    };

    WebSocketServer.onmessage = () => {
        console.log('Server received message.');
    };*/

    wss.on('connection', function (ws) {
        var url = ws.upgradeReq.url;
        console.info('The upgrade url is ${url}.');
        ws.on('open', () => {
            console.log('A Websocket connnection is opened.');
        });
        setTimeout(
            ws.send(new Date().toTimeString(), 1000));

        // onopen creates an event listener which fires when the websocket opens a connection.

    });
};

function selectResource(url) {
    var parts = url.split('/');
    parts.shift();
    var result = resources;
    for (var i = 0; i < parts.length; i++) {
        result = result[parts[i]];
    }
    return result;
}
