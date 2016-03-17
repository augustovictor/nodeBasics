var http = require('http');
var port = 3000;
var host = 'localhost';

function httpHandler(req, res) {
    if(req.method === 'GET') {
        if(req.url === '/') {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end("Hellow World! " + Math.random());
        }
        else {
            sayGetOut(res);
        }
    }
    else {
        sayGetOut(res);
    }
}

function sayGetOut(res) {
    res.writeHead(403);
    res.end('Get outta here!');
}

var server = http.createServer(httpHandler)
    .listen(port, host);

server.listen(port, function() {
    console.log('Server running at http://' + host + ':' + port);
});
