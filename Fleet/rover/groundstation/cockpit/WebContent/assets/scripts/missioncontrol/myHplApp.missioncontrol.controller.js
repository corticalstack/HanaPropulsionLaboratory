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
			success: myHplApp.missioncontrol.controller.processMissionLogPumpResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		missioncontrolModel.addNetworkPacketOut(feed.length);
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
				   pilotId: 			missioncontrolModel.getActivePilotId()}, 
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			success: myHplApp.missioncontrol.controller.processMissionCreateResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
	};


	myHplApp.missioncontrol.controller.processMissionCreateResponse = function(data) {
		missioncontrolModel.addNetworkPacketOut(Object.keys(data).length);
	};

	
	myHplApp.missioncontrol.controller.missionSetHomeLatLngAlt = function() {
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
				   lattitude: 			missioncontrolModel.getHomeLattitude(),
				   altitude: 			missioncontrolModel.getHomeAltitude()}, 
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			success: myHplApp.missioncontrol.controller.processSetHomeLatLngAltResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
	};


	myHplApp.missioncontrol.controller.processSetHomeLatLngAltResponse = function(data) {
		missioncontrolModel.addNetworkPacketOut(Object.keys(data).length);
	};
	
	myHplApp.missioncontrol.controller.getFlightDirectorNextMissionId = function() {
		console.log('Mission control controller....getting flight director next mission id');
		var missioncontrolModel = myHplApp.missioncontrol.model;
		if (!missioncontrolModel.getStateMissioncontrolOnline()) {
			return;
		}
	
			 
		jQuery.ajax({
			url:missioncontrolModel.getConfigServiceFlightDirectorNextMissionIdUri(),
			dataType: 'jsonp',
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			success: myHplApp.missioncontrol.controller.processFlightDirectorNextMissionIdResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		
	};

	myHplApp.missioncontrol.controller.processFlightDirectorNextMissionIdResponse = function(data) {
		myHplApp.missioncontrol.model.setActiveMissionId(data.nextMissionId);	
		console.log('Next mission id ', data.nextMissionId);
		missioncontrolModel.addNetworkPacketOut(Object.keys(data).length);	
		myHplApp.missioncontrol.controller.missionCreate();
	};
	
	myHplApp.missioncontrol.controller.checkSetHomeLatLngAlt = function() { 
		if (myHplApp.missioncontrol.model.getCurrentLongitude() != 0) {
			missioncontrolModel.incrementGps3DFixCount();
		}
		
		if (missioncontrolModel.getGps3DFixCount() == 10) {
			missioncontrolModel.setActiveHomeLatLngAlt();
			myHplApp.missioncontrol.controller.missionSetHomeLatLngAlt();
			myHplApp.missioncontrol.model.addWaypoint('HOME', myHplApp.missioncontrol.model.getHomeLongitude(), myHplApp.missioncontrol.model.getHomeLattitude(),  myHplApp.missioncontrol.model.getHomeAltitude());
		}
    };

	
	myHplApp.missioncontrol.controller.init();
	
} (myHplApp = window.myHplApp || {}));