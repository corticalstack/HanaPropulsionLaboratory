(function (myHplApp) {
 
	myHplApp.missioncontrol.controller = myHplApp.missioncontrol.controller || {};
	
	var missioncontrolModel = myHplApp.missioncontrol.model;
	

	myHplApp.missioncontrol.controller.init = function() { 
		console.log('Initialising missioncontrol controller');
		missioncontrolModel.setActiveMissionId('1');
		missioncontrolModel.setActiveVehicleId('1');
		missioncontrolModel.setActivePilotId('1');
		missioncontrolModel.setDataNetworkTrafficIn(-1);
		missioncontrolModel.setDataNetworkTrafficOut(-1);
		
    };

	
	myHplApp.missioncontrol.controller.missionLogPump = function(categoryId, messageId, feed) {
		var missioncontrolModel = myHplApp.missioncontrol.model;
		if (!missioncontrolModel.getStateMissioncontrolOnline()) {
			return;
		}
	
		dateNow = new Date();			 
		jQuery.ajax({
			url:missioncontrolModel.getConfigServiceMissionLogPumpUri(),
			dataType: 'jsonp',
			data: {missionId:			missioncontrolModel.getActiveMissionId(), 
				   vehicleId: 			missioncontrolModel.getActiveVehicleId(), 
				   pilotId: 			missioncontrolModel.getActivePilotId(), 
				   keyFrame:			missioncontrolModel.getActiveKeyFrame(),
				   messageCategoryId: 	categoryId, 
				   messageId: 			messageId,  
				   feed: 				feed},
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			async: true,
			success: myHplApp.missioncontrol.controller.processMissionLogPumpResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		if (typeof feed.length != 'undefined') {
			missioncontrolModel.addNetworkPacketOut(feed.length);
		}
	};


	myHplApp.missioncontrol.controller.processMissionLogPumpResponse = function(data) {
	};

	myHplApp.missioncontrol.controller.missionCreate = function() {
		console.log('Mission control controller.....Create Mission');
		var missioncontrolModel = myHplApp.missioncontrol.model;
		if (!missioncontrolModel.getStateMissioncontrolOnline()) {
			return;
		}
		
		jQuery.ajax({
			url:missioncontrolModel.getConfigServiceMissionCreateUri(),
			dataType: 'jsonp',
			data: {missionId:			missioncontrolModel.getActiveMissionId(), 
				   vehicleId: 			missioncontrolModel.getActiveVehicleId(), 
				   pilotId: 			missioncontrolModel.getActivePilotId(), 
				   scenarioId: 			missioncontrolModel.getActiveScenarioId()},
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			async: false,
			success: myHplApp.missioncontrol.controller.processMissionCreateResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
	};


	myHplApp.missioncontrol.controller.processMissionCreateResponse = function(data) {
		missioncontrolModel.addNetworkPacketOut(Object.keys(data).length);
	};

	
	myHplApp.missioncontrol.controller.missionLogHomeLatLngAlt = function() {
		console.log('Mission control controller.....mission set home lat lng alt');
		var missioncontrolModel = myHplApp.missioncontrol.model;
		if (!missioncontrolModel.getStateMissioncontrolOnline()) {
			return;
		}
		
		jQuery.ajax({
			url:missioncontrolModel.getConfigServiceMissionSetHomeLatLngAltUri(),
			dataType: 'jsonp',
			data: {missionId:			missioncontrolModel.getActiveMissionId(), 
				   vehicleId: 			missioncontrolModel.getActiveVehicleId(), 
				   pilotId: 			missioncontrolModel.getActivePilotId(),
				   longitude: 			missioncontrolModel.getHomeLongitude(),
				   Latitude: 			missioncontrolModel.getHomeLatitude(),
				   altitude: 			missioncontrolModel.getHomeAltitude()}, 
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			async: false,			
			success: myHplApp.missioncontrol.controller.processLogHomeLatLngAltResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
	};


	myHplApp.missioncontrol.controller.processLogHomeLatLngAltResponse = function(data) {
		missioncontrolModel.addNetworkPacketOut(Object.keys(data).length);
	};
	
	myHplApp.missioncontrol.controller.getMissionNextId = function() {
		console.log('Mission control controller....getting next mission id');
		var missioncontrolModel = myHplApp.missioncontrol.model;
		if (!missioncontrolModel.getStateMissioncontrolOnline()) {
			return;
		}
	
			 
		jQuery.ajax({
			url:missioncontrolModel.getConfigServiceMissionNextIdUri(),
			dataType: 'jsonp',
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			async: false,
			success: myHplApp.missioncontrol.controller.processMissionNextIdResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		
	};

	myHplApp.missioncontrol.controller.processMissionNextIdResponse = function(data) {
		myHplApp.missioncontrol.model.setActiveMissionId(data.nextMissionId);	
		console.log('Next mission id ', data.nextMissionId);
		missioncontrolModel.addNetworkPacketOut(Object.keys(data).length);	
		myHplApp.missioncontrol.controller.missionCreate();
	};
	
	
	myHplApp.missioncontrol.controller.getScenarioTerrain = function() {
		console.log('Mission control controller....getting scenario terrain');
		var missioncontrolModel = myHplApp.missioncontrol.model;
		if (!missioncontrolModel.getStateMissioncontrolOnline()) {
			return;
		}
	
			 
		jQuery.ajax({
			url:missioncontrolModel.getConfigServiceScenarioTerrainUri(),
			dataType: 'jsonp',
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			async: false,
			success: myHplApp.missioncontrol.controller.processGetScenarioTerrainResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		
	};

	
	myHplApp.missioncontrol.controller.processGetScenarioTerrainResponse = function(data) {
		console.log('Mission control controller....process Get scenario terrain response');
		myHplApp.missioncontrol.controller.setScenarioTerrain(data);	
		myHplApp.cockpit.maps.controller.drawScenarioTerrainPolygons(myHplApp.missioncontrol.model.getScenarioTerrainPolygons());
	};
	

	myHplApp.missioncontrol.controller.setScenarioTerrain = function(scenarioTerrain) {
		console.log('Mission control controller....set scenario terrain');
		for (var i = 0; i < scenarioTerrain.geoCollection.length; i++) {
				var polygonCoordinates = myHplApp.cockpit.maps.controller.convertPolygonWKTtoJSON(scenarioTerrain.geoCollection[i].geometry);
				myHplApp.missioncontrol.controller.setScenarioTerrainPolygon(scenarioTerrain.geoCollection[i], polygonCoordinates);
		}		
	};
	
	
	myHplApp.missioncontrol.controller.setScenarioTerrainPolygon = function(scenarioTerrainPolygon, coords) {
		var myMapPolygon = new google.maps.Polygon({
				    paths: coords,
				    strokeColor: scenarioTerrainPolygon.strokeColourHex,
				    strokeOpacity: scenarioTerrainPolygon.strokeOpacity,
				    strokeWeight: scenarioTerrainPolygon.strokeWeight,
				    fillColor: scenarioTerrainPolygon.fillColourHex,
				    fillOpacity: scenarioTerrainPolygon.fillOpacity
		});

		myHplApp.missioncontrol.model.setScenarioTerrainPolygons(scenarioTerrainPolygon, myMapPolygon);
	};
	
//Goals
	myHplApp.missioncontrol.controller.getScenarioGoal = function() {
		console.log('Mission control controller....getting scenario goal');
		var missioncontrolModel = myHplApp.missioncontrol.model;
		if (!missioncontrolModel.getStateMissioncontrolOnline()) {
			return;
		}

		 
		jQuery.ajax({
			url:missioncontrolModel.getConfigServiceScenarioGoalUri(),
			dataType: 'jsonp',
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			async: false,
			success: myHplApp.missioncontrol.controller.processGetScenarioGoalResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});		
	};


	myHplApp.missioncontrol.controller.processGetScenarioGoalResponse = function(data) {
		console.log('Mission control controller....process Get scenario goal response');
		myHplApp.missioncontrol.model.setScenarioGoal(data);

	};



	
///	
	myHplApp.missioncontrol.controller.containsLocation = function() {		
		if (myHplApp.missioncontrol.model.getGps3DFixCount() > 10) {
			var currentLatLng       = new google.maps.LatLng(myHplApp.missioncontrol.model.getCurrentLatitude(), myHplApp.missioncontrol.model.getCurrentLongitude());
			var myGoogleMapPolygons = myHplApp.missioncontrol.model.getScenarioTerrainPolygons();
			for (var i = 0; i < myGoogleMapPolygons.length; i++) {
				if (google.maps.geometry.poly.containsLocation(currentLatLng, myGoogleMapPolygons[i].mapPolygon)) {
					return myGoogleMapPolygons[i];
				}
			}
		}
		return null;
	};
	
	
	myHplApp.missioncontrol.controller.checkSetHomeLatLngAlt = function() { 
		if (myHplApp.missioncontrol.model.getCurrentLongitude() != 0) {
			missioncontrolModel.incrementGps3DFixCount();
		}
		
		if (missioncontrolModel.getGps3DFixCount() == 10) {
			missioncontrolModel.setActiveHomeLatLngAlt();
			myHplApp.missioncontrol.controller.missionLogHomeLatLngAlt();
			var homeMarker = {
							longitude: myHplApp.missioncontrol.model.getHomeLongitude(),
							latitude: myHplApp.missioncontrol.model.getHomeLatitude(),
							title: 'Home',
							icon: 'assets/images/goals/wp1.png'
			};
			
			myHplApp.cockpit.maps.controller.setMarker(homeMarker);
			myHplApp.missioncontrol.model.addWaypoint('HOME', myHplApp.missioncontrol.model.getHomeLongitude(), myHplApp.missioncontrol.model.getHomeLatitude(),  myHplApp.missioncontrol.model.getHomeAltitude());
		}
    };

    
    myHplApp.missioncontrol.controller.getPilotScore = function() {
		var myUrl =  myHplApp.missioncontrol.model.getConfigServicePilotScoreUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=SCORE&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplApp.missioncontrol.controller.onLoadPilotScore,
	         error: myHplApp.missioncontrol.controller.onErrorPilotScore 
		});
	};
	
		
	myHplApp.missioncontrol.controller.onLoadPilotScore = function(myJSON) {
		for (var i = 0; i < myJSON.d.results.length; i++) {
			if (myJSON.d.results[i].SCORE != null) {
				myHplApp.missioncontrol.model.setActivePilotScore(myJSON.d.results[i].SCORE);
			}
		};		
	};
	

	myHplApp.missioncontrol.controller.onErrorPilotScore = function(jqXHR, textStatus, errorThrown){
	};
	
	myHplApp.missioncontrol.controller.init();
	
} (myHplApp = window.myHplApp || {}));