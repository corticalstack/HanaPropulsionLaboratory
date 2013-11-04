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


// Google Maps
var googleMap;
var googleMapUpdateCounter 				= 0;
var googleMapInitialised 				= false;


function googleMapInitialise(lattitude,longitude) {
	var latlng = new google.maps.LatLng(lattitude, longitude);
    var myOptions = {
    		zoom : 20,
            center : latlng,
            mapTypeId : google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map($('#map_canvas').get(0), myOptions);
    var marker = new google.maps.Marker({
    	position: latlng,
        map: map,
        title: vehicleName
    });
}


	



