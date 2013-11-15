var SerialPort, io, serial, port;
var socketio 		= require( 'socket.io' ),
SerialPort 			= require('serialport').SerialPort;
socketioWildcard 	= require( 'socket.io-wildcard' ),
BufferStream 		= require('bufferstream');
stream 				= new BufferStream({encoding:'utf8', size:'flexible'})
port 				= '/dev/ttyUSB0';
stream.split(':', '\r', '\n', '[', ']');


io 		= socketioWildcard( socketio ).listen( 8090 );
serial 	= new SerialPort (port, {baudrate: 57600});


io.sockets.on('connection', function(socket) {

	serial.on("data", function(chunk){	
		stream.write(chunk);
    });

    
	//Outbound vehicle messages
	stream.on('split', function (chunk, token) {
		var mychunk = chunk.toString();
        switch (mychunk.substr(0,1)) {
			case "S":
				socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

            case "P":
				socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

            case "V":
				socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

            case "C":
				socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

			case "I":
                socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;
						
            default:
		}
    });

	
	//Inbound Ground Control Station messages
    socket.on("*", function(message) {
	    serial.write(message.args[0]);
		//console.log(message.args[0]);
    });
	
});