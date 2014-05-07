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
	

	myHplApp.cockpit.maps.controller.setMarker = function(marker) {
		var markerLatLng = new google.maps.LatLng(marker.latitude, marker.longitude);
		
		var googleMapMarker = new google.maps.Marker({
			position: 	markerLatLng,
			map: 		myHplApp.cockpit.maps.model.getStateGoogleMap(),
//			title: 		marker.title,
			icon:       marker.icon
		});
		googleMapMarker.openInfoWindowHtml(marker.title);
	};

	
	myHplApp.cockpit.maps.controller.drawScenarioTerrainPolygons = function(scenarioTerrainPolygons) {
		for (var i = 0; i < scenarioTerrainPolygons.length; i++) {	
			scenarioTerrainPolygons[i].mapPolygon.setMap(myHplApp.cockpit.maps.model.getStateGoogleMap());
		};					
	};
	
	
	myHplApp.cockpit.maps.controller.convertPolygonWKTtoJSON = function(polygonWkt) {
		var regex = /\(([^()]+)\)/g;
		var polygons = [];
		var polygonPoints = [];
		var regexResult;
		while( regexResult = regex.exec(polygonWkt) ) {
		    polygons.push( regexResult[1] );
		}
				
		for(var i=0; i < polygons.length; i++){
			var polygonString = polygons[i];
			var polygonPointsString = polygonString.split(",");
			    
			for (var i=0; i < polygonPointsString.length; i++) {
				var coordString = polygonPointsString[i].split(" ");
			    var coord = new google.maps.LatLng(coordString[1], coordString[0]);
			    polygonPoints.push(coord);
			}
		}
		return polygonPoints;
	};
	
		
	myHplApp.cockpit.maps.controller.init();
	 
} (myHplApp = window.myHplApp || {}));	
	