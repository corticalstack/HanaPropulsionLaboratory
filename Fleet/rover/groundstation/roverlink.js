var SerialPort,fs, http, io, server, net, serial, port;
fs = require('fs');
http = require('http');
net = require('net');

var light1 = true;
var light2 = true;

SerialPort = require('serialport').SerialPort;

port = '/dev/ttyUSB0';



BufferStream = require('bufferstream');
stream = new BufferStream({encoding:'utf8', size:'flexible'})
stream.split(':', '\r', '\n', '[', ']');


var index = require('fs').readFileSync(__dirname + '/dashboard.html');
console.log(__dirname);
console.log(index);

var app = http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(index);
      console.log(res.end(index));
    });






//app.listen(8090, '192.168.0.11');


//io = require('socket.io').listen(app);

var socketio = require( 'socket.io' ),
socketioWildcard = require( 'socket.io-wildcard' ),
io = socketioWildcard( socketio ).listen( 8090 );


serial = new SerialPort (port, {baudrate: 9600});


io.sockets.on('connection', function(socket) {
        console.log("Connected");
        socket.emit("connect", "Connected");



        serial.on("data", function(chunk){
                stream.write(chunk);
        });

        stream.on('split', function (chunk, token) {
        var mychunk = chunk.toString();
        switch (mychunk.substr(0,3)) {
                case "":
                        break;
                case "SR1":
                        socket.emit("feed", chunk.toString());
                        break;
                default:
 }
//      socket.emit("feed", chunk.toString());
        //console.log("got '%s' by '%s'", chunk.toString(), token.toString())
//      console.log(stream.toString());
        });








        socket.on("Stop", function(message) {
                console.log("Stop triggered...");
                //var message = new Buffer(message);
                serial.write("0");

        });

        socket.on("Speed 1", function(message) {
                console.log("Speed1 triggered...");
                //var message = new Buffer(message);
                serial.write("1");
        });

        socket.on("Speed 2", function(message) {
                console.log("Speed2 triggered...");
                //var message = new Buffer(message);
                serial.write("2");
        });

     socket.on("Speed 4", function(message) {
                console.log("Speed4 triggered...");
                //var message = new Buffer(message);
        });

        socket.on("*", function(message) {
                console.log("Wildcard triggered...");
//                var message = new Buffer(message);
                console.log(message.args[0]);
                serial.write(message.args[0]);
                socket.emit("wildcard", "Wildcard");

        });
});