var http = require('http');
var ASQ = require('asynquence');
var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);
var io = require('socket.io');
var port = 3000;
var host = 'localhost';


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

var server = http.createServer(httpHandler)
    .listen(port, host);

// This tells our server to listen also for socket.io connections
io.listen(server);
