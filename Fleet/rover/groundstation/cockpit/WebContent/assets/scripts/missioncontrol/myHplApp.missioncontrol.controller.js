(function (myHplApp) {
 
	myHplApp.missioncontrol.controller = myHplApp.missioncontrol.controller || {};
	
	var missioncontrolModel = myHplApp.missioncontrol.model;
	

	myHplApp.missioncontrol.controller.init = function() { 
		console.log('Initialising missioncontrol controller');
		missioncontrolModel.setActiveMissionId('000001');
		missioncontrolModel.setActiveVehicleId('001');
		missioncontrolModel.setActivePilotId('001');
		missioncontrolModel.setDataNetworkTrafficIn(-1);
		missioncontrolModel.setDataNetworkTrafficOut(-1);
    };

	
	myHplApp.missioncontrol.controller.messagePump = function(categoryId, messageId, feed) {
		var missioncontrolModel = myHplApp.missioncontrol.model;
		if (!missioncontrolModel.getStateMissioncontrolOnline()) {
			return;
		}
	
		dateNow = new Date();			 
		jQuery.ajax({
			url:missioncontrolModel.getConfigServiceMessagePumpUri(),
			dataType: 'jsonp',
			data: {missionId:			missioncontrolModel.getActiveMissionId(), 
				   vehicleId: 			missioncontrolModel.getActiveVehicleId(), 
				   pilotId: 			missioncontrolModel.getActivePilotId, 
				   keyFrame:			missioncontrolModel.getActiveKeyFrame(),
				   messageCategoryId: 	categoryId, 
				   messageId: 			messageId,  
				   feed: 				feed},
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			success: myHplApp.missioncontrol.controller.processMessagePumpResponse,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		missioncontrolModel.addNetworkPacketOut(feed.length);
	};


	myHplApp.missioncontrol.controller.processMessagePumpResponse = function(data) {
	};
	
	myHplApp.missioncontrol.controller.getFlightDirectorNextMissionId = function() {
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
		missioncontrolModel.addNetworkPacketOut(data.length);		
	};
	
	myHplApp.missioncontrol.controller.checkSetHomeLatLng = function() { 
		missioncontrolModel.incrementGps3DFixCount();
		if (missioncontrolModel.getGps3DFixCount() == 10) {
			missioncontrolModel.setActiveHomeLatLng();
			myHplApp.missioncontrol.model.addWaypoint('HOME', 	myHplApp.missioncontrol.model.getHomeLongitude(), myHplApp.missioncontrol.model.getHomeLattitude());
		}
    };

	
	myHplApp.missioncontrol.controller.init();
	
} (myHplApp = window.myHplApp || {}));