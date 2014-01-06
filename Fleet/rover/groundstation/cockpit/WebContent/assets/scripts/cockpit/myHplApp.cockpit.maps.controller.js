(function(myHplApp) {
 
	myHplApp.cockpit.maps.controller = myHplApp.cockpit.maps.controller || {};
	
	var mapsModel = myHplApp.cockpit.maps.model;

	myHplApp.cockpit.maps.controller.init = function() {
		console.log('Initialising cockpit maps controller');
		myHplApp.cockpit.maps.controller.googleMapInitialise();
		mapsModel.setStateGoogleMapInitialisedTrue();
	};
	
	myHplApp.cockpit.maps.controller.googleMapInitialise = function() {

		mapsModel.setStateGoogleMapLastLattitude('46.475241');
		mapsModel.setStateGoogleMapLastLongitude('6.892743');
		mapsModel.setStateLatLng();

		var myOptions = {
				zoom: 		11,
	            center: 	mapsModel.getStateLatLng(),
	            tilt: 		0,
	            mapTypeId : mapsModel.getStateGoogleMapLastMapType()
	    };
	    
		mapsModel.setStateGoogleMap(myOptions);
		mapsModel.setStateGoogleMapMarker("vehicleName");
		mapsModel.setMapTypeIdRoad();
	   
	};    
	
	
	myHplApp.cockpit.maps.controller.init();
	 
} (myHplApp = window.myHplApp || {}));	
	