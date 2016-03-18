var http = require('http');
var ASQ = require('asynquence');
require("asynquence-contrib");
var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);


var port = process.env.PORT || 8080;
var host = process.env.HOST || '0.0.0.0';

var users = [];
var id = 1;


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

    socket.on('newUser', function(userName) {
        if(userName == null) userName = 'user'+id;
        users.push({
            id: id,
            name: userName
        });

        var welcomeMsg = 'User ' + users[id-1].name + ' entered the room.';
        io.sockets.emit('newUserInRoom', { welcomeMsg: welcomeMsg, users: users });

        socket.emit('userAdded', users[id-1]);

        id++;
    });

    console.log("Client connected");

    socket.on('sendMessage', function(msg) {
        socket.broadcast.emit('message', msg); // Using socket.broadcast sends the msg for everyon except the msg sender. Use io.broadcast if you want to include sender
    });

}

var server = http.createServer(httpHandler);
server.listen(port, host);

// This tells our server to listen also for socket.io connections
var io = require('socket.io').listen(server); // Yes, we must place .listen here

// Called every time we get a new incoming websocket connection
io.on('connection', ioHandler);
