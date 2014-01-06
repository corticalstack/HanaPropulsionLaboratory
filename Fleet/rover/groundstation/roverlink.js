var SerialPort, io, serial, port;
var socketio 				= require( 'socket.io' ),
SerialPort 					= require('serialport').SerialPort;
socketioWildcard 			= require( 'socket.io-wildcard' ),
BufferStream 				= require('bufferstream');
stream 						= new BufferStream({encoding:'utf8', size:'flexible'})
port 						= '/dev/ttyUSB0';
stream.split(':', '\r', '\n', '[', ']');

var msg_power		 		= 'B';
var msg_compass				= 'C';
var msg_sharpsensor	 		= 'D';
var msg_camera		 		= 'F';
var msg_ins					= 'I';
var msg_motors_thrust 		= 'M';
var msg_gps_nav_posllh 		= 'P';
var msg_gps_nav_sol 		= 'S';
var msg_gps_nav_velned 		= 'V';

io 							= socketioWildcard( socketio ).listen( 8090 );

//Reduce logging
//io.set('log level', 1);

serial 	= new SerialPort (port, {baudrate: 57600});


io.sockets.on('connection', function(socket) {

	serial.on("data", function(chunk){	
		stream.write(chunk);
    });

    
	//Outbound vehicle to Ground Control Station messages
	stream.on('split', function (chunk, token) {
		var mychunk = chunk.toString();
        switch (mychunk.substr(0,1)) {
			case msg_gps_nav_sol:
				socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

            case msg_gps_nav_posllh:
				socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

            case msg_gps_nav_velned:
				socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

            case msg_compass:
				socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

			case msg_ins:
                socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

			case msg_power:
                socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

			case msg_sharpsensor:
                socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

			case msg_motors_thrust:
                socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;

			case msg_camera:
                socket.emit("feed", chunk.toString());
				//console.log(chunk);
                break;
				
            default:
		}
    });

	
	//Inbound Ground Control Station to vehicle messages
    socket.on("*", function(message) {
	    serial.write(message.args[0]);
		console.log(message.args[0]);
    });
	
});