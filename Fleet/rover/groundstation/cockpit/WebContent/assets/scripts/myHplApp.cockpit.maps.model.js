(function(myHplApp) {
 
	myHplApp.cockpit.maps.model = myHplApp.cockpit.maps.model || {};
	

	var config = {
			googleMapRoad: 				google.maps.MapTypeId.ROADMAP,
			googleMapSatellite:			google.maps.MapTypeId.SATELLITE,
			googleMapZoomBase:          11
	};

	
	var state = {
			googleMap: 					{},
			googleMapMarker:			{},
			latlng: 					{},			
			googleMapInitialised:  		false,
			googleMapLastLattitude:     '46.475241',
			googleMapLastLongitude:     '6.892743',
			googleMapLastMapType: 		google.maps.MapTypeId.ROADMAP,
			googleMapLastZoom:          11,
			googleMapUpdateCounter:		0
	};
	
	
	myHplApp.cockpit.maps.model.getConfigGoogleMapRoad = function() {
		return config.googleMapRoad;
	};

	myHplApp.cockpit.maps.model.getConfigGoogleMapSatellite = function() {
		return config.googleMapSatellite;
	};

	myHplApp.cockpit.maps.model.getConfigGoogleMapZoomBase = function() {
		return config.googleMapZoomBase;
	};
	
	
	myHplApp.cockpit.maps.model.getStateGoogleMapInitialised = function() {
		return state.googleMapInitialised;
	};

	myHplApp.cockpit.maps.model.setStateGoogleMapInitialisedTrue = function() {
		state.googleMapInitialised = true;
	};

	myHplApp.cockpit.maps.model.getStateGoogleMapInitialisedFalse = function() {
		state.googleMapInitialised = false;
	};
	

	myHplApp.cockpit.maps.model.setStateLatLng = function() {
		state.latlng = new google.maps.LatLng(state.googleMapLastLattitude, state.googleMapLastLongitude);
	};
	
	
	myHplApp.cockpit.maps.model.getStateLatLng = function() {
		return state.latlng;
	};
	
	
	myHplApp.cockpit.maps.model.setStateGoogleMapLastLattitude = function(val) {
		state.googleMapLastLattitude = val;
	};

	myHplApp.cockpit.maps.model.setStateGoogleMapLastLongitude = function(val) {
		state.googleMapLastLongitude = val;
	};
	
	myHplApp.cockpit.maps.model.getStateGoogleMapLastLattitude = function(val) {
		return state.googleMapLastLattitude;
	};

	myHplApp.cockpit.maps.model.getStateGoogleMapLastLongitude = function(val) {
		return state.googleMapLastLongitude;
	};

	
	myHplApp.cockpit.maps.model.getStateGoogleMapLastZoom = function() {
		return state.googleMapLastZoom;
	};

	myHplApp.cockpit.maps.model.getStateGoogleMapLastMapType = function() {
		return state.googleMapLastMapType;
	};

	myHplApp.cockpit.maps.model.setMapTypeIdSatellite = function() {
		googleMap.setMapTypeId(googleMapMapTypeSatellite);
		state.googleMap.setMapTypeId(config.googleMapSatellite);
		state.googleMapLastMapType = config.googleMapSatellite;
	};

	
	myHplApp.cockpit.maps.model.setMapTypeIdRoad = function() {
		state.googleMap.setMapTypeId(config.googleMapRoad);
		state.googleMapLastMapType = config.googleMapRoad;
	};

	myHplApp.cockpit.maps.model.setStateGoogleMapLastZoom = function(val) {
		state.googleMapLastZoom = val;
	};

	myHplApp.cockpit.maps.model.setMapZoom = function(val) {
		state.googleMap.setZoom(val);
	};

	myHplApp.cockpit.maps.model.setMapCenter = function() {
		state.googleMap.setCenter(state.googleMapMarker.getPosition());
	};

	
} (myHplApp = window.myHplApp || {}));	
	