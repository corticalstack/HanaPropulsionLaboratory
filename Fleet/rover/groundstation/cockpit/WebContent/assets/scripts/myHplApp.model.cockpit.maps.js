(function(myHplApp) {
 
	myHplApp.model.cockpit.maps = myHplApp.model.cockpit.maps || {};
	

	var config = {
			googleMap: 					{},
			googleMapUpdateCounter:		0,
			googleMapInitialised:  		false,
			googleMapLastLattitude:     '46.475241',
			googleMapLastLongitude:     '6.892743',
			googleMapMapTypeRoad: 		google.maps.MapTypeId.ROADMAP,
			googleMapMapTypeSatellite:	google.maps.MapTypeId.SATELLITE,
			googleMapLastMapType: 		google.maps.MapTypeId.ROADMAP,
			googleMapZoomBase:          11,
			googleMapLastZoom:          11,
			googleMapMarker:			{},
			latlng: 					{}
	};

	
	
	myHplApp.model.cockpit.maps.init = function() {
		googleMapUpdateCounter 		= 0;
		googleMapInitialised   		= false;
		googleMapLastLattitude 		= '46.475241';
		googleMapLastLongitude 		= '6.892743';
		googleMapMapTypeRoad 		= google.maps.MapTypeId.ROADMAP;
		googleMapMapTypeSatellite 	= google.maps.MapTypeId.SATELLITE;
		googleMapLastMapType 		= google.maps.MapTypeId.ROADMAP;
		googleMapZoomBase 			= 11;
		googleMapLastZoom 			= 11;
		latlng						= new google.maps.LatLng(googleMapLastLattitude, googleMapLastLongitude);	
	};
	
	 
} (myHplApp = window.myHplApp || {}));	
	