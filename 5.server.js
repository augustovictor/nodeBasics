var http = require('http');
var ASQ = require('asynquence');
var port = 3000;
var host = 'localhost';

function httpHandler(req, res) {
    if(req.method === 'GET') {
        if(req.url === '/') {
            res.writeHead(200, {'Content-type': 'text/plain'});
            var rand;
            ASQ(function(done) {
                setTimeout(function() {
                    done(Math.random());
                }, 1000);
            })
            .then(function(done, randNumber) {
                setTimeout(function() {
                    done("Hello world " + randNumber);
                }, 1000);
            })
            .val(function(msg) { // val() will run in Sync fashion and seq() in Async
                res.end(msg);
            })
            .or(function(err) {
                console.log(err);
            })
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
