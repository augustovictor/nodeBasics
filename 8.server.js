var http = require('http');
var ASQ = require('asynquence');
require("asynquence-contrib");
var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);


var port = 3000;
var host = '127.0.0.1';


function httpHandler(req, res) {
    if(req.method === 'GET') {
        if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener("end",function(){
				req.url = req.url.replace(/^\/(\d+).*$/, "/$1.html");
				static_files.serve(req,res);
			});
			req.resume();
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

function ioHandler(socket) {
    function disconnect() {
        console.log("Client disconnected");
    }

    socket.on('disconnect', disconnect);

    console.log("Client connected");

}

var server = http.createServer(httpHandler);
server.listen(port, host);

// This tells our server to listen also for socket.io connections
var io = require('socket.io').listen(server); // Yes, we must place .listen here

// Called every time we get a new incoming websocket connection
io.on('connection', ioHandler);
