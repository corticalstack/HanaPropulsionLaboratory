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
	
	
	
	myHplApp.cockpit.maps.model.getStateGoogleMapLastZoom = function() {
		return state.googleMapLastZoom;
	};

	myHplApp.cockpit.maps.model.getStateGoogleMapLastMapType = function() {
		return state.googleMapLastMapType;
	};

	myHplApp.cockpit.maps.model.setMapTypeIdSatellite = function() {
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
	