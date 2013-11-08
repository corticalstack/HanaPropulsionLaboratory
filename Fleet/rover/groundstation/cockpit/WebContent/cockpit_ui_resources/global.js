jQuery.sap.require("jquery.sap.resources");
var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
var oBundle = jQuery.sap.resources({url : "./i18n/messagebundle.hdbtextbundle", locale: sLocale});
var oBarModel = new sap.ui.model.json.JSONModel();
    
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


// Gamepad Mapping
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
var art_test = 0;


function googleMapInitialise() {

    var myOptions = {
    		zoom : googleMapLastZoom,
            center : latlng,
            mapTypeId : googleMapLastMapType
    }
    
    googleMap = new google.maps.Map($('#map_canvas').get(0), myOptions);
    
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

//Artificial horizon

      
	  var TWO_PI = 2 * Math.PI, HALF_PI = Math.PI / 2, KAPPA = 0.5522847498, radius_mul_kappa;
	  
	  var GROUND_COLOR = "#323232", LINE_COLOR = "#ffffff", SKY_COLOR = "#72cde4";
	  
	  var canvas, context;

	  var diameter = 0, radius = 0;

	  var pitch = 0, roll = 0;

	  var horizon, aspectRatio = 0;

	  var _rawRoll = 0;
	  
	  var aX = 0, aY = 0, aZ = 0;
	  var rotationCorrection = 0;

	  function draw() {

	    aspectRatio = document.body.clientWidth / document.body.clientHeight;

	    if (rotationCorrection !== 0 
	          && (rotationCorrection % HALF_PI) == 0
	            && (rotationCorrection / HALF_PI) !== 1) {

	      aspectRatio = document.body.clientHeight / document.body.clientWidth;

	    }

	    aspectRatio = 0;  //JP
	    rawRoll = 0;      //JP
	    
	    diameter = Math.min(canvas.width, canvas.height);
	    radius = diameter / 2;

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
	    
	    context.fillStyle = GROUND_COLOR;
	    context.strokeStyle = LINE_COLOR;
	    context.lineWidth = 3;

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

//	    window.addEventListener('devicemotion', updateAccelerations, true);
	//    window.addEventListener('deviceorientation', updateOrientations, true);

	    draw();

	  }

	

	    function initAndRun() {
	      canvas = document.getElementById("horizon");
	      context = canvas.getContext("2d");

	      var backgroundLoaded = false, topLoaded = false;
	      
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

	  



	window.addEventListener("load", function() {
	 initAndRun();
	}, false);

	google.maps.event.addDomListener(window, 'load', googleMapInitialise);

