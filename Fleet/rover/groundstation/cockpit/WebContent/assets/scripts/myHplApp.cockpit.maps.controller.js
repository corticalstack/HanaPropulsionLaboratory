(function(myHplApp) {
 
	myHplApp.cockpit.maps.controller = myHplApp.cockpit.maps.controller || {};
	
	var mapsModel = myHplApp.cockpit.maps.model;

	myHplApp.cockpit.maps.controller.init = function() {
		console.log('Initialising cockpit maps controller');
		mapsModel.config.googleMapRoad 			= google.maps.MapTypeId.ROADMAP;
		mapsModel.config.googleMapSatellite 	= google.maps.MapTypeId.SATELLITE;
		mapsModel.config.googleMapZoomBase 		= 11;

		mapsModel.state.googleMapInitialised   	= false;
		mapsModel.state.latlng					= new google.maps.LatLng(googleMapLastLattitude, googleMapLastLongitude);
		mapsModel.state.googleMapLastMapType 	= google.maps.MapTypeId.ROADMAP;		
		mapsModel.state.googleMapUpdateCounter 	= 0;
		mapsModel.state.googleMapLastLattitude 	= '46.475241';
		mapsModel.state.googleMapLastLongitude 	= '6.892743';
	};
	
	myHplApp.cockpit.maps.controller.googleMapInitialise = function() {
		var myOptions = {
				zoom: 		mapsModel.config.googleMapLastZoom,
	            center: 	mapsModel.config.googleMapLastZoomlatlng,
	            tilt: 		0,
	            mapTypeId : mapsModel.config.googleMapLastMapType
	    };
	    
		
		mapsModel.config.googleMap = new google.maps.Map($('#cockpitMap').get(0), myOptions);
	    
		mapsModel.config.googleMapMarker = new google.maps.Marker({
	    	position: 	mapsModel.config.latlng,
	        map: 		mapsModel.config.googleMap,
	        title: 		'vehicleName'
	    });
	   
	};    
	
	
	myHplApp.cockpit.maps.controller.init();
	 
} (myHplApp = window.myHplApp || {}));	
	