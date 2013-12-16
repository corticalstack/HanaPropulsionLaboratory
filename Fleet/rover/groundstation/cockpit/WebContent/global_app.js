//Constants

var servicePilotsUri = 'http://hanaserver:8000/hpl/missioncontrol/services/pilots.xsodata/pilots/?$format=json';
	

////
jQuery.sap.require("jquery.sap.resources");
var sLocale 							= sap.ui.getCore().getConfiguration().getLanguage();
var otextBundle 						= jQuery.sap.resources({url : "./assets/i18n/messagebundle.hdbtextbundle", locale: sLocale});


var pilotList = [];

///
// Groundstation
var groundStationSocketURL				= 'http://192.168.1.62:8090';
	
// Cockpit
var socketEventCockpit                  = 'cockpit';
//var cockpitHeartbeatTick 				= setInterval(function(){cockpitHeartbeat()},250);

//Vehicle 
var vehicleName                         = 'Slice of Life';
    
    
// Vehicle commands
var cmdThrottle             			= 'V';
var cmdDirection            			= 'D';
var cmdHeading              			= 'H';
var cmdRotate               			= 'R';
var cmdStop                 			= 'X:]';
var cmdCamPanLeft          				= 'P-5:]';
var cmdCamPanRight         				= 'P5:]';
var cmdCamPanStop         				= 'P0:]';
var cmdCamTiltUp             			= 'T5:]';
var cmdCamTiltDown             			= 'T-5:]';
var cmdCamTiltStop             			= 'T0:]';
var cmdToggleHeadlights        			= 'L:]';
var cmdCockpitHeartbeat        			= 'B:]';


var vehicleDirectionForward 			= 'DF';
var vehicleDirectionReverse 			= 'DR';
var vehicleDirection        			= vehicleDirectionForward;
    
    
var cmdThrottleTx 						= false;
var cmdThrottleValLast 					= 0;

var cmdDirectionTx 						= false;
var cmdDirectionValLast 				= 0;
	
var cmdHeadingTx 						= false;
var cmdHeadingValLast 					= 0;

var cmdRotateTx 						= false;
var cmdRotateValLast 					= 0;

var cmdStopTx 							= false;

var throttleDeadzoneVal       			= 7;
var throttleMaxForDirectionChange       = 30;

var msgTerminator             			= ':]';

var infoPanelIndex                      = 0;
var infoPanelIndexMin                   = 0;
var infoPanelIndexMax                   = 2;



// Message Pump
var message = new Object();
var datenow;
var missionId = '000001';
var vehicleId = '001';
var pilotId   = '001';



// Gamepad Mapping
var gamepadCmdToggleHeadlights          = 'FACE_2';
var gamepadCmdDirection                 = 'FACE_4';
var gamepadCmdStop                      = 'FACE_3';
var gamepadCmdThrottle                  = 'RIGHT_BOTTOM_SHOULDER';
var gamepadCmdHeading                   = 'LEFT_STICK_X';
var gamepadCmdRotate                    = 'RIGHT_STICK_X';
var gamepadCmdCamPanLeft                = 'DPAD_LEFT';
var gamepadCmdCamPanRight               = 'DPAD_RIGHT';
var gamepadCmdCamTiltUp                 = 'DPAD_UP';
var gamepadCmdCamTiltDown               = 'DPAD_DOWN';
var gamepadCmdGoogleMapTypeChange       = 'LEFT_TOP_SHOULDER';
var gamepadCmdGoogleMapZoom 	        = 'LEFT_BOTTOM_SHOULDER';
var gamepadCmdThrottlePadLeft    		= 'SELECT_BACK';
var gamepadCmdThrottlePadRight    		= 'START_FORWARD';



// Google Maps
var googleMap;
var googleMapUpdateCounter 				= 0;
var googleMapInitialised 				= false;
var googleMapLastLattitude              = '46.475241';
var googleMapLastLongitude              = '6.892743';
var googleMapMapTypeRoad 				= google.maps.MapTypeId.ROADMAP;
var googleMapMapTypeSatellite			= google.maps.MapTypeId.SATELLITE;
var googleMapLastMapType 				= google.maps.MapTypeId.ROADMAP;
var googleMapZoomBase                   = 11;
var googleMapLastZoom                   = 11;
var googleMapMarker;
var latlng = new google.maps.LatLng(googleMapLastLattitude, googleMapLastLongitude);


// Artifical
//Artificial horizon


var TWO_PI 								= 2 * Math.PI, HALF_PI = Math.PI / 2, KAPPA = 0.5522847498, radius_mul_kappa;
var GROUND_COLOR 						= "#323232", LINE_COLOR = "#ffffff", SKY_COLOR = "#72cde4";
var canvas;
var context;
var diameter 							= 0;
var radius 								= 0;
var pitch 								= 0;
var roll 								= 0;
var horizon;
var aspectRatio 						= 0;
var _rawRoll 							= 0;
var aX 									= 0;
var aY 									= 0;
var aZ 									= 0;
var rotationCorrection 					= 0;


var art_test = 0;


var oAbsoluteLayoutHome = new sap.ui.commons.layout.AbsoluteLayout({width: "100%", height: "100%"});


getPilots();


sap.ui.localResources("mainmenu_ui_resources");
var mainmenuView = sap.ui.view({  
    	id: 		"viewMainMenu",  
    	viewName:	"mainmenu_ui_resources.mainmenu",  
    	type: 		sap.ui.core.mvc.ViewType.JS  
	});  


sap.ui.localResources("cockpit_ui_resources");
var cockpitView = sap.ui.view({  
    	id: 		"viewCockpit",  
    	viewName: 	"cockpit_ui_resources.cockpit",  
    	type: 		sap.ui.core.mvc.ViewType.JS  
	});  


sap.ui.localResources("pilot_ui_resources");
var pilotView = sap.ui.view({  
    	id: 		"viewPilot",  
    	viewName: 	"pilot_ui_resources.pilot",  
    	type: 		sap.ui.core.mvc.ViewType.JS  
	});  


var currentViewContent = mainmenuView;

function googleMapInitialise() {

	var myOptions = {
			zoom : googleMapLastZoom,
            center : latlng,
            tilt: 0,
            mapTypeId : googleMapLastMapType
    }
    
    googleMap = new google.maps.Map($('#cockpitMap').get(0), myOptions);
    
    googleMapMarker = new google.maps.Marker({
    	position: latlng,
        map: googleMap,
        title: 'vehicleName'
    });
   
}    
    

function cockpitHeartbeat() {
	window.socket.emit(socketEventCockpit, cmdCockpitHeartbeat);
}



function test(){
	alert('Test art');  
  }


function draw() {

	aspectRatio = document.body.clientWidth / document.body.clientHeight;

	if (rotationCorrection !== 0 && (rotationCorrection % HALF_PI) == 0 && (rotationCorrection / HALF_PI) !== 1) {
		aspectRatio = document.body.clientHeight / document.body.clientWidth;
	}

	
	aspectRatio = 0;  //JP
	rawRoll 	= 0;  //JP
	    
	
	diameter 	= Math.min(canvas.width, canvas.height);
	radius 		= diameter / 2;

	radius_mul_kappa = radius * KAPPA;
	    
	
	// calculate pitch and roll
	roll = Math.atan2(aX, aY);
	pitch = -Math.atan2(aZ, aX * Math.sin(roll) + aY * Math.cos(roll));
	
	
	// calculate horizon
	horizon = getHorizon(pitch);
	    
	
	// repaint
	repaint();
	    
	requestAnimationFrame(draw);

}


function repaint() {
	context.save();
	    
	context.translate(radius, radius);
	context.rotate(roll - rotationCorrection);
	    
	context.fillStyle 	= GROUND_COLOR;
	context.strokeStyle = LINE_COLOR;
	context.lineWidth 	= 3;

	
	// draw ground
	context.beginPath();
	context.arc(0, 0, radius, 0, 2 * Math.PI, false);
	context.fill();
	    
	context.fillStyle = SKY_COLOR;

	
	// draw sky
	context.beginPath();
	context.moveTo( -radius, 0);
	context.arcTo(0, -radius*2, radius, 0, radius);
	context.bezierCurveTo(radius, horizon * KAPPA, radius_mul_kappa, horizon, 0, horizon);
	context.bezierCurveTo( -radius_mul_kappa, horizon, -radius, horizon * KAPPA, -radius, 0);
	context.closePath();
	context.stroke();
	context.fill();

	context.lineWidth = 2;
	
	
	// draw scale
	drawScale(36, radius * 0.8);
	drawScale(30, radius * 0.1);
	drawScale(24, radius * 0.6);
	drawScale(18, radius * 0.1);
	drawScale(12, radius * 0.4);
	drawScale(6, radius * 0.1);

	context.restore();

}


function drawScale(offset, scaleWidth) {

	context.save();

	context.beginPath();
	context.rect( -scaleWidth / 2, -diameter, scaleWidth, 2 * diameter);
	context.clip();

	
	horizon = getHorizon(pitch + offset * Math.PI / 180);
	context.beginPath();
	context.moveTo(radius, 0);
	context.bezierCurveTo(radius, horizon * KAPPA, radius_mul_kappa, horizon, 0, horizon);
	context.bezierCurveTo( -radius_mul_kappa, horizon, -radius, horizon * KAPPA, -radius, 0);
	context.stroke();

	
	horizon = getHorizon(pitch -offset * Math.PI / 180);
	context.beginPath();
	context.moveTo(radius, 0);
	context.bezierCurveTo(radius, horizon * KAPPA, radius_mul_kappa, horizon, 0, horizon);
	context.bezierCurveTo( -radius_mul_kappa, horizon, -radius, horizon * KAPPA, -radius, 0);
	context.stroke();
	    
	context.restore();

}

	 
function updateAccelerations(accel_x, accel_y, accel_z) {
	var _aX = accel_x;
	var _aY = accel_y; 
	var _aZ = accel_z;

	if (aspectRatio > 1 && _rawRoll > 0) {
		aX = _aY;
	    aY = -_aX;
	} else if (aspectRatio > 1 && _rawRoll <= 0) {
		aX = -_aY;
	    aY = _aX;
    } else {
    	aX = _aX;
	    aY = _aY;
	}

	aZ = _aZ;

}


function updateOrientations(evt) {
	if (!evt || evt.gamma == null) {
		return;
	}

	
	_rawRoll = evt.gamma;
}


function getHorizon(pitch) {
	return Math.sin(pitch) * radius;
}
	  

function run() {

	//window.addEventListener('devicemotion', updateAccelerations, true);
	//window.addEventListener('deviceorientation', updateOrientations, true);
    draw();
}



function initAndRun() {
    var backgroundLoaded 	= false;
    var topLoaded 			= false;
    
	canvas 	= document.getElementById("horizon");
	context = canvas.getContext("2d");

	
	var backgroundImage = new Image();
	backgroundImage.onload = function() {
		backgroundLoaded = true;
	    if (topLoaded) {
	    	run();
	    }
	}
	
	
	backgroundImage.src = "/images/bg.jpg";

	var topImage = new Image();
	topImage.onload = function() {
		topLoaded = true;
	    if (backgroundLoaded) {
	    	run();
	    }
	}
	
	topImage.src = "/images/tool_320.png";

}


//window.addEventListener("load", function() {
//	initAndRun();
//	}, false);

	
	
$(document).ready(function() {
	var gamepad = new Gamepad();
	gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
	});

			
	gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
		$('#gamepad-' + device.index).remove();
	});

		
	gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
	});

		
	gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
		try {
			gamepad_button_down(e);
    	}
    	
		catch(err){alert(err);}
	});
	
		
	gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
		try {
			gamepad_button_up(e);
    	}
    	catch(err){}
	});

			
	gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
		try {
			gamepad_axis_changed(e);
    	}
    	catch(err){}
	});

		
	if (!gamepad.init()) {
		alert('Your browser does not support gamepads, get the latest Google Chrome or Firefox.');
	}
});


function gamepad_button_down(gamepadEvent) {
	var socketMessage = '';
	if (gamepadEvent.control == gamepadCmdDirection && cmdThrottleValLast < throttleMaxForDirectionChange && cmdStopTx == false) { 
		cmdDirectionTx = true;
		if (vehicleDirection == vehicleDirectionForward) {
			vehicleDirection = vehicleDirectionReverse;
		}
		else
		{
			vehicleDirection = vehicleDirectionForward;
		}
			  
			  
		cmdDirectionVal = vehicleDirection;
		socketMessage = vehicleDirection + ':'  + cmdThrottle + cmdThrottleValLast + msgTerminator;
		window.socket.emit(socketEventCockpit, socketMessage);
		datenow = new Date();
		message.messageCategoryId = 'DRI';
		message.messageId = 'M';	
		message.loggedAt = datenow.getTime();
		message.feed = socketMessage;
		messageLogPump(message);
	}


	if (gamepadEvent.control == gamepadCmdStop) {
		cmdStopTx = true;		 
		window.socket.emit(socketEventCockpit, cmdStop);
		datenow = new Date();
		message.messageCategoryId = 'DRI';
		message.messageId = 'M';	
		message.loggedAt = datenow.getTime();
		message.feed = cmdStop;
		messageLogPump(message);

	}


	if (gamepadEvent.control == gamepadCmdCamPanLeft) {
		window.socket.emit(socketEventCockpit, cmdCamPanLeft);
		datenow = new Date();
		message.messageCategoryId = 'SEN';
		message.messageId = 'C';	
		message.loggedAt = datenow.getTime();
		message.feed = cmdCamPanLeft;
		messageLogPump(message);

	}
			
		
	if (gamepadEvent.control == gamepadCmdCamPanRight) {
		window.socket.emit(socketEventCockpit, cmdCamPanRight);
		datenow = new Date();
		message.messageCategoryId = 'SEN';
		message.messageId = 'C';	
		message.loggedAt = datenow.getTime();
		message.feed = cmdCamPanRight;
		messageLogPump(message);

	}

		
	if (gamepadEvent.control == gamepadCmdCamTiltUp) {
		window.socket.emit(socketEventCockpit, cmdCamTiltUp);
		datenow = new Date();
		message.messageCategoryId = 'SEN';
		message.messageId = 'C';	
		message.loggedAt = datenow.getTime();
		message.feed = cmdCamTiltUp;
		messageLogPump(message);

	}

		
	if (gamepadEvent.control == gamepadCmdCamTiltDown) {
		window.socket.emit(socketEventCockpit, cmdCamTiltDown);
		datenow = new Date();
		message.messageCategoryId = 'SEN';
		message.messageId = 'C';	
		message.loggedAt = datenow.getTime();
		message.feed = cmdCamTiltDown;
		messageLogPump(message);
	}
			

	if (gamepadEvent.control == gamepadCmdGoogleMapTypeChange) {
		switch (googleMapLastMapType) {
			case googleMapMapTypeRoad:
				googleMap.setMapTypeId(googleMapMapTypeSatellite);
				googleMapLastMapType = googleMapMapTypeSatellite;
				break;
			case googleMapMapTypeSatellite:
				googleMap.setMapTypeId(googleMapMapTypeRoad);
				googleMapLastMapType = googleMapMapTypeRoad; 
				break;
			default:
				googleMapLastMapType = googleMapMapTypeRoad;
		}
	}
			
			
			
	if (gamepadEvent.control == gamepadCmdToggleHeadlights) {
		window.socket.emit(socketEventCockpit, cmdToggleHeadlights);
		datenow = new Date();
		message.messageCategoryId = 'LIT';
		message.messageId = 'L';	
		message.loggedAt = datenow.getTime();
		message.feed = cmdToggleHeadlights;
		messageLogPump(message);
	}

	
	if (gamepadEvent.control == gamepadCmdThrottlePadLeft) {
		sap.ui.getCore().byId("viewCockpit").getController().gamepad_button_down(gamepadEvent);
	}

	
	if (gamepadEvent.control == gamepadCmdThrottlePadRight) {
		sap.ui.getCore().byId("viewCockpit").getController().gamepad_button_down(gamepadEvent);
	}

}


function gamepad_button_up(gamepadEvent) {
	if (gamepadEvent.control == gamepadCmdCamPanLeft || gamepadEvent.control == gamepadCmdCamPanRight) {
		window.socket.emit(socketEventCockpit, cmdCamPanStop);
		datenow = new Date();
		message.messageCategoryId = 'LIT';
		message.messageId = 'L';	
		message.loggedAt = datenow.getTime();
		message.feed = cmdCamPanStop;
		messageLogPump(message);
	}
			
			
	if (gamepadEvent.control == gamepadCmdCamTiltUp || gamepadEvent.control == gamepadCmdCamTiltDown ) {
		window.socket.emit(socketEventCockpit, cmdCamTiltStop);
		datenow = new Date();
		message.messageCategoryId = 'LIT';
		message.messageId = 'L';	
		message.loggedAt = datenow.getTime();
		message.feed = cmdCamTiltStop;
		messageLogPump(message);
	}
		
};


function gamepad_axis_changed(gamepadEvent) {
	var socketMessage = '';

	if (gamepadEvent.axis == gamepadCmdThrottle) {
		var speed = parseFloat(gamepadEvent.value);
		speed = speed * 100;
		var speed1 = speed.toFixed(0);	
		if (speed1 < throttleDeadzoneVal) {
			speed1 = 0;
		}
			   

		if (speed1 == 0) {
			cmdStopTx = false;
		}
			  

		if (cmdStopTx == false && speed1 != cmdThrottleValLast) {
			cmdThrottleTx = true;
			cmdThrottleValLast = speed1;
			socketMessage = socketMessage + vehicleDirection + ':'  + cmdThrottle + speed1 + ':';
		}
	}
	    
		
	if (gamepadEvent.axis == gamepadCmdHeading) {
		cmd_heading_tx = true;
		var heading = parseFloat(gamepadEvent.value);
		heading = heading * 100;
		var heading1 = heading.toFixed(0);	
		socketMessage = socketMessage + cmdHeading  + heading1 + ':';
	}

	    
	if (gamepadEvent.axis == gamepadCmdRotate && cmdThrottleValLast == 0) {
		cmd_rotate_tx = true;
		var rotate = parseFloat(gamepadEvent.value);
		rotate = rotate * 100;
		var rotate1 = rotate.toFixed(0);	
		if (rotate1 != cmdRotateValLast) {
			cmdRotateValLast = rotate1;
			socketMessage = socketMessage + cmdRotate  + rotate1 + ':';
		}
	}

	    
	if (socketMessage != '') {
		socketMessage = socketMessage + ']';        	        
		window.socket.emit(socketEventCockpit, socketMessage);
		datenow = new Date();
		message.messageCategoryId = 'DRI';
		message.messageId = 'M';	
		message.loggedAt = datenow.getTime();
		message.feed = socketMessage;
		messageLogPump(message);

	}

			
	if (gamepadEvent.axis == gamepadCmdGoogleMapZoom) {
		var zoom = parseFloat(gamepadEvent.value);
		zoom = zoom * 10;
		zoom = zoom.toFixed(0);
		if (zoom == 0) {
			zoom = 11;
		}

			
		if (zoom != googleMapLastZoom) {
			googleMapLastZoom = zoom;
		    var tempzoom = parseInt(googleMapLastZoom, 10) + parseInt(googleMapZoomBase, 10); 
		    googleMap.setZoom(tempzoom);
			googleMap.setCenter(googleMapMarker.getPosition());
		}
	}
};

	



function procesJSON(){
	
}



function messageLogPump(message) {
	
  message.missionId = missionId;
  message.vehicleId = vehicleId;
  message.pilotId	= pilotId;

	
  var jURL = 'http://hanaserver:8000/hpl/missioncontrol/services/messageLogPump.xsjs';
	 jQuery.ajax({
	        url:jURL,
	        jsonpCallback: 'processJSON',
	        dataType: 'jsonp',
	        data: {missionId : message.missionId, vehicleId : message.vehicleId, pilotId : message.pilotId, messageCategoryId : message.messageCategoryId, messageId : message.messageId, loggedAt : message.loggedAt, feed : message.feed },
	        type: 'GET',
	        headers : {"Access-Control-Allow-Origin" : "*"},
	        crossDomain: true,
	        success: function(result) { console.log(result); },
	        error: function() { console.log('Failed!'); }
	 });	
}


////




function setViewContent(oControlEvent) {
	oAbsoluteLayoutHome.removeContent(currentViewContent);
	
	switch (oControlEvent.getSource().getId())
	{
		case "lnkSoloCampaign":
			currentViewContent = pilotView;
			oAbsoluteLayoutHome.addContent(currentViewContent);
			break;
		case "lnkMultiplayer":
			currentViewContent = pilotView;
			oAbsoluteLayoutHome.addContent(currentViewContent);
			break;
			
		case "lnkFreeride":
			currentViewContent = pilotView;
			oAbsoluteLayoutHome.addContent(currentViewContent);
			break;
			
		case "lnkSettings":
//			currentViewContent = settingsView;
			break;
			
		case "lnkQuit":
//			currentViewContent = quitView;
			break;
		
		case "lnkLaunch" + oControlEvent.getSource().getId().slice("lnkLaunch".length):
			currentViewContent = cockpitView;
			oAbsoluteLayoutHome.addContent(currentViewContent);
			$.fn.hideBackgroundImage();
			googleMapInitialise();
			newGauge();			
			newFlot();
			
			break;
	}
}	

function newGauge() {

	
	var gaugeCurrent = new JustGage({
			id: "gaugeCurrent",
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 12,	
			label: "CURRENT",
			labelMinFontSize: 12,
			value: 40,
			valueMinFontSize: 12,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.4,
			customSectors: [{
								color: "#00ff00",
								lo: 0,
								hi: 60
							},{
								color: "#ff8000",
								lo: 60,
								hi: 80
							}, {
								color: "#ff0000",
								lo: 80,
								hi: 100
							}],
			counter: true
	});

	
	var gaugeAmps = new JustGage({
			id: "gaugeAmps",
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 12,	
			label: "AMPS",
			labelMinFontSize: 12,
			value: 40,
			valueMinFontSize: 12,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.4,
			customSectors: [{
								color: "#00ff00",
								lo: 0,
								hi: 60
							},{
								color: "#ff8000",
								lo: 60,
								hi: 80
							}, {
								color: "#ff0000",
								lo: 80,
								hi: 100
							}],
			counter: true
	});
	
	
	var gaugeConsumedMah = new JustGage({
		id: "gaugeConsumedMah",
		donut: true,
		title: "",	
		titleFontColor: "#ffffff",
		titleMinFontSize: 14,	
		label: "CONSUMED MAH",
		labelMinFontSize: 16,
		value: 5000,
		valueMinFontSize: 14,
		valueFontColor: "#ffffff",
		min: 0,
		max: 10000,
		showMinMax: false,
		gaugeWidthScale: 0.5,
		customSectors: [{
							color: "#ff0000",
							lo: 0,
							hi: 20
						},{
							color: "#ffff00",
							lo: 20,
							hi: 50
						}, {
							color: "#00ff00",
							lo: 50,
							hi: 100
						}],
		counter: true
	});
	
	
	var gaugeVoltage = new JustGage({
		id: "gaugeVoltage",
		title: "",
		titleFontColor: "#ffffff",
		titleMinFontSize: 14,	
		label: "VOLTAGE",
		labelMinFontSize: 16,
		value: 8,
		valueMinFontSize: 22,
		valueFontColor: "#ffffff",
		min: 7,
		max: 9,
		showMinMax: false,
		gaugeWidthScale: 0.5,
		customSectors: [{
							color: "#ff0000",
							lo: 0,
							hi: 20
						},{
							color: "#ffff00",
							lo: 20,
							hi: 50
						}, {
							color: "#00ff00",
							lo: 50,
							hi: 100
						}],
		counter: true
	});
	
	
	var gaugeBattRemaining = new JustGage({
			id: "gaugeBattRemaining",
			donut: true,
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "BATTERY %",
			labelMinFontSize: 16,
			value: 19,
			valueMinFontSize: 14,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			showMinMax : false,
			gaugeWidthScale: 0.5,
			customSectors: [{
								color: "#ff0000",
								lo: 0,
								hi: 20
							},{
								color: "#ffff00",
								lo: 20,
								hi: 50
							}, {
								color: "#00ff00",
								lo: 50,
								hi: 100
							}],
			counter: true
	});
	
	
	
	var gaugeThrust = new JustGage({
			id: "gaugeThrust",
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "THRUST %",
			labelMinFontSize: 16,
			value: 40,
			valueMinFontSize: 22,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.5,
			customSectors: [{
								color : "#00ff00",
								lo: 0,
								hi: 60
							},{
								color: "#ff8000",
								lo: 60,
								hi: 80
							}, {
								color: "#ff0000",
								lo: 80,
								hi: 100
							}],
			counter: true
	});

	
	var gaugeAmmo = new JustGage({
		id: "gaugeAmmo",
		donut: true,
		title: "",
		titleFontColor: "#ffffff",
		titleMinFontSize: 14,	
		label: "AMMO %",
		labelMinFontSize: 16,
		value: 40,
		valueMinFontSize: 22,
		valueFontColor: "#ffffff",
		min: 0,
		max: 100,
		gaugeWidthScale: 0.5,
		customSectors: [{
							color : "#00ff00",
							lo: 0,
							hi: 60
						},{
							color: "#ff8000",
							lo: 60,
							hi: 80
						}, {
							color: "#ff0000",
							lo: 80,
							hi: 100
						}],
		counter: true
	});


	
	var gaugeShield = new JustGage({
			id: "gaugeShield",
			donut: true,
			title: "",	
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "SHIELD %",
			labelMinFontSize: 16,
			value: 100,
			valueMinFontSize: 14,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			showMinMax: false,
			gaugeWidthScale: 0.5,
			customSectors: [{
								color: "#ff0000",
								lo: 0,
								hi: 20
							},{
								color : "#ffff00",
								lo: 20,
								hi: 50
							}, {
								color: "#00ff00",
								lo: 50,
								hi: 100
							}],
			counter: true
	});


	var gaugeCoreTemp = new JustGage({
			id: "gaugeCoreTemp",
			title: "",	
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "CORE TEMP",
			labelMinFontSize: 16,
			value: 20,
			valueMinFontSize: 22,
			valueFontColor: "#ffffff",
			min: 10,
			max: 90,
			showMinMax: false,
			gaugeWidthScale: 0.5,
			customSectors: [{
								color: "#ff0000",
								lo: 0,
								hi: 20
							},{
								color: "#ffff00",
								lo: 20,
								hi: 50
							}, {
								color: "#00ff00",
								lo: 50,
								hi: 100
							}],
			counter: true
	});

	
	/*
	var gaugeProximityCam = new JustGage({
		id: "gaugeProximityCam",
		title: otextBundle.getText("proximitycam"),	
		titleFontColor: "#ffffff",
		titleMinFontSize: 14,	
	    label: "CM",
		labelMinFontSize: 16,
	    value : 8,
	    valueMinFontSize: 14,
	    valueFontColor: "#ffffff",
	    min: 0,
	    max: 24,
	    showMinMax : false,
	    gaugeWidthScale: 0.7,
	    customSectors: [{
	      color : "#ff0000",
	      lo : 0,
	      hi : 20
	    },{
	      color : "#ffff00",
	      lo : 20,
	      hi : 50
	    }, {
	      color : "#00ff00",
	      lo : 50,
	      hi : 100
	    }],
	    counter: true
	  });


	var gaugeProximityFront = new JustGage({
		id: "gaugeProximityFront",
		title: otextBundle.getText("proximityfront"),	
		titleFontColor: "#ffffff",
		titleMinFontSize: 14,	
	    label: "CM",
		labelMinFontSize: 16,
	    value : 8,
	    valueMinFontSize: 14,
	    valueFontColor: "#ffffff",
	    min: 0,
	    max: 24,
	    showMinMax : false,
	    gaugeWidthScale: 0.7,
	    customSectors: [{
	      color : "#ff0000",
	      lo : 0,
	      hi : 20
	    },{
	      color : "#ffff00",
	      lo : 20,
	      hi : 50
	    }, {
	      color : "#00ff00",
	      lo : 50,
	      hi : 100
	    }],
	    counter: true
	  });
	

	var gaugeProximityRear = new JustGage({
		id: "gaugeProximityRear",
		title: otextBundle.getText("proximityrear"),	
		titleFontColor: "#ffffff",
		titleMinFontSize: 14,	
	    label: "CM",
		labelMinFontSize: 16,
	    value : 8,
	    valueMinFontSize: 14,
	    valueFontColor: "#ffffff",
	    min: 0,
	    max: 24,
	    showMinMax : false,
	    gaugeWidthScale: 0.7,
	    customSectors: [{
	      color : "#ff0000",
	      lo : 0,
	      hi : 20
	    },{
	      color : "#ffff00",
	      lo : 20,
	      hi : 50
	    }, {
	      color : "#00ff00",
	      lo : 50,
	      hi : 100
	    }],
	    counter: true
	  });

	*/

}








function getPilots() {		
	$.ajax({ type: 'GET',
	         url: servicePilotsUri,
	         dataType: 'json',
	         crossDomain: true,
	         async: false, 
	         success: onLoadPilots,
	         error: onErrorCall 
	});
}
	
	
function onLoadPilots(myJSON) {
	for (var i = 0; i<myJSON.d.results.length; i++) {
		var pilot = {
				pilotId: 	myJSON.d.results[i].pilotId,
				name: 		myJSON.d.results[i].name,
				avatarUri: 	myJSON.d.results[i].avatarUri,
				clanName: 	myJSON.d.results[i].clanName,
				clanUri: 	myJSON.d.results[i].clanUri
		};
		pilotList.push(pilot);
	}		
}



function onErrorCall(jqXHR, textStatus, errorThrown){
//	sap.ui.core.BusyIndicator.hide();		
//	sap.ui.commons.MessageBox.show(jqXHR.responseText, 
//			 "ERROR",
//			 otextBundle.getText("error") );		
//	return;
	var pilot = {
			pilotId: 	'001',
			name: 		'JP',
			avatarUri: 	'assets/images/pilots/avatarJP.png',
			clanName: 	'Wolf',
			clanUri: 	'assets/images/emblems/Wolf.jpg'
	};
	pilotList.push(pilot);
	
	var pilot = {
			pilotId: 	'002',
			name: 		'Nadia',
			avatarUri: 	'assets/images/pilots/avatarNadia.png',
			clanName: 	'Black Widow',
			clanUri: 	'assets/images/emblems/Black Widow.jpg'
	};
	pilotList.push(pilot);
	
	var pilot = {
			pilotId: 	'006',
			name: 		'Jane',
			avatarUri: 	'assets/images/pilots/avatarJane.png',
			clanName: 	'Snake',
			clanUri: 	'assets/images/emblems/Snake.jpg'
	};
	pilotList.push(pilot);

	var pilot = {
			pilotId: 	'007',
			name: 		'Joe',
			avatarUri: 	'assets/images/pilots/avatarJoe.png',
			clanName: 	'Wasp',
			clanUri: 	'assets/images/emblems/Wasp.jpg'
	};
	pilotList.push(pilot);

}


//google.maps.event.addDomListener(window, 'load', googleMapInitialise);



function newFlot() {
	$(function() {

		// We use an inline data source in the example, usually data would
		// be fetched from a server

		var data = [],
			totalPoints = 300;

		function getRandomData() {

			if (data.length > 0)
				data = data.slice(1);

			// Do a random walk

			while (data.length < totalPoints) {

				var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}

				data.push(y);
			}

			// Zip the generated y values with the x values

			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}

			return res;
		}

		// Set up the control widget

		var updateInterval = 30;
		$("#updateInterval").val(updateInterval).change(function () {
			var v = $(this).val();
			if (v && !isNaN(+v)) {
				updateInterval = +v;
				if (updateInterval < 1) {
					updateInterval = 1;
				} else if (updateInterval > 2000) {
					updateInterval = 2000;
				}
				$(this).val("" + updateInterval);
			}
		});

		var plot = $.plot("#placeholder", [ getRandomData() ], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis: {
				min: 0,
				max: 100
			},
			xaxis: {
				show: false
			}
		});

		function update() {

			plot.setData([getRandomData()]);

			// Since the axes don't change, we don't need to call plot.setupGrid()

			plot.draw();
			setTimeout(update, updateInterval);
		}

		update();

		// Add the Flot version string to the footer

		$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
	});

}

