(function(myHplApp) {
 
	myHplApp.cockpit.maps.controller = myHplApp.cockpit.maps.controller || {};
	
	var mapsModel = myHplApp.cockpit.maps.model;

	myHplApp.cockpit.maps.controller.init = function() {
		console.log('Initialising cockpit maps controller');
		myHplApp.cockpit.maps.controller.googleMapInitialise();
		mapsModel.setStateGoogleMapInitialisedTrue();
	};
	
	myHplApp.cockpit.maps.controller.googleMapInitialise = function() {
		mapsModel.setStateGoogleMapLastLatitude('46.475241');
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
	
	
	myHplApp.cockpit.maps.controller.drawScenarioTerrainPolygons = function(scenarioTerrainPolygons) {
		for (var i = 0; i < 8; i++) {	
			scenarioTerrainPolygons[i].mapPolygon.setMap(myHplApp.cockpit.maps.model.getStateGoogleMap());
		};					
	};
	
	
	myHplApp.cockpit.maps.controller.init();
	 
} (myHplApp = window.myHplApp || {}));	
	