jQuery.sap.require("jquery.sap.resources");
var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
var oBundle = jQuery.sap.resources({url : "./i18n/messagebundle.hdbtextbundle", locale: sLocale});
var oBarModel = new sap.ui.model.json.JSONModel();
    
// Groundstation
var groundStationSocketURL				= 'http://192.168.1.62:8090'
	
// Cockpit
var socketEventCockpit                  = 'cockpit';

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
var cmdCamSweep            				= 'W';

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


function googleMapInitialise() {
	var latlng = new google.maps.LatLng(googleMapLastLattitude, googleMapLastLongitude);
    var myOptions = {
    		zoom : googleMapLastZoom,
            center : latlng,
            mapTypeId : googleMapLastMapType
    }
    
    map = new google.maps.Map($('#map_canvas').get(0), myOptions);
    var marker = new google.maps.Marker({
    		position: latlng,
    		map: map,
    		title: vehicleName
    });
}    
    

function googleMapSet() {
    var latlng = new google.maps.LatLng(googleMapLastLattitude, googleMapLastLongitude);

    var zoom = parseInt(googleMapLastZoom, 10) + parseInt(googleMapZoomBase, 10);


    var myOptions = {
    		zoom : zoom,
            center : latlng,
            mapTypeId : googleMapLastMapType
    }
        
    map = new google.maps.Map($('#map_canvas').get(0), myOptions);
    var marker = new google.maps.Marker({
      		position: latlng,
            map: map,
            title: vehicleName
        });
    }


	



