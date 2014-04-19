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
			googleMapLastLatitude:     '46.475241',
			googleMapLastLongitude:     '6.892743',
			googleMapLastMapType: 		google.maps.MapTypeId.ROADMAP,
			googleMapLastZoom:          11,
			googleMapUpdateCounter:		0
	};
	
	
	//Get methods for config	
	myHplApp.cockpit.maps.model.getConfigGoogleMapRoad = function() {
		return config.googleMapRoad;
	};

	
	myHplApp.cockpit.maps.model.getConfigGoogleMapSatellite = function() {
		return config.googleMapSatellite;
	};

	
	myHplApp.cockpit.maps.model.getConfigGoogleMapZoomBase = function() {
		return config.googleMapZoomBase;
	};
	
	
	
	
	//Get methods for state
	myHplApp.cockpit.maps.model.getStateGoogleMap = function() {
		return state.googleMap;
	};
	
	myHplApp.cockpit.maps.model.getStateLatLng = function() {
		return state.latlng;
	};
	
	
	myHplApp.cockpit.maps.model.getStateGoogleMapInitialised = function() {
		return state.googleMapInitialised;
	};

	
	myHplApp.cockpit.maps.model.getStateGoogleMapLastLatitude = function(val) {
		return state.googleMapLastLatitude;
	};

	
	myHplApp.cockpit.maps.model.getStateGoogleMapLastLongitude = function(val) {
		return state.googleMapLastLongitude;
	};

	
	myHplApp.cockpit.maps.model.getStateGoogleMapLastMapType = function() {
		return state.googleMapLastMapType;
	};

	
	myHplApp.cockpit.maps.model.getStateGoogleMapLastZoom = function() {
		return state.googleMapLastZoom;
	};


	
	
	//Set methods for state
	myHplApp.cockpit.maps.model.setStateGoogleMap = function(options) {
		console.log('Set state GoogleMap');
		state.googleMap = new google.maps.Map($('#cockpitMap').get(0), options);
	};
	
	
	myHplApp.cockpit.maps.model.setStateGoogleMapMarker = function(title) {
		console.log('Set state GoogleMap Marker');

		var iconMapPin = 'assets/images/hud/mapPin.png';
		state.googleMapMarker = new google.maps.Marker({
			position: 	state.latlng,
			map: 		state.googleMap,
			title: 		title,
			icon:       iconMapPin
		});
	};

	
	myHplApp.cockpit.maps.model.setStateGoogleMapInitialised = function(val) {
		state.googleMapInitialised = val;
	};

	
	myHplApp.cockpit.maps.model.setStateLatLng = function() {
		state.latlng = new google.maps.LatLng(state.googleMapLastLatitude, state.googleMapLastLongitude);
	};
	

	myHplApp.cockpit.maps.model.setStateGoogleMapLastLatitude = function(val) {
		state.googleMapLastLatitude = val;
	};

	
	myHplApp.cockpit.maps.model.setStateGoogleMapLastLongitude = function(val) {
		state.googleMapLastLongitude = val;
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

	myHplApp.cockpit.maps.model.setPosition = function() {
		 state.googleMapMarker.setPosition(state.latlng);
	};
	
	myHplApp.cockpit.maps.model.panTo = function() {
		state.googleMap.panTo(state.googleMapMarker.getPosition());
	};

} (myHplApp = window.myHplApp || {}));	
	