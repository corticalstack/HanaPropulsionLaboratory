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
	
	myHplApp.cockpit.maps.controller.googleMapSetScenarioTerrain = function(scenarioTerrain) {
		var coordinates;
		console.log('Setting map scenario terrain');
		for (var i = 0; i < scenarioTerrain.geoCollection.length; i++) {
			for (var j = 0; j < scenarioTerrain.geoCollection[i].geometry.coordinates.length; j++) {
				coordinates = scenarioTerrain.geoCollection[i].geometry.coordinates[j];			
				for (var k = 0; k < coordinates.length; k++) {
					console.log('Longitude', coordinates[k][0]);
					console.log('Latitude', coordinates[k][1]);
				}
			}
			
		}

	};
	
	
	myHplApp.cockpit.maps.controller.init();
	 
} (myHplApp = window.myHplApp || {}));	
	