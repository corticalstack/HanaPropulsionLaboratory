(function (myHplApp) {
 
	myHplApp.missioncontrol.controller = myHplApp.missioncontrol.controller || {};
	
	var missioncontrolModel = myHplApp.missioncontrol.model;
	

	myHplApp.missioncontrol.controller.init = function() { 
		console.log('Initialising missioncontrol controller');
		missioncontrolModel.setStateMissioncontrolOnline(false);
		missioncontrolModel.setActiveMissionId('000001');
		missioncontrolModel.setActiveVehicleId('001');
		missioncontrolModel.setActivePilotId('001');

    };

	
	myHplApp.missioncontrol.controller.messagePump = function(categoryId, messageId, feed) {
		var missioncontrolModel = myHplApp.missioncontrol.model;
		return;
		if (!missioncontrolModel.state.missionControlOnline) {
			return;
		}
			  
		dateNow = new Date();			 
		jQuery.ajax({
			url:missioncontrolModel.serviceMessagePumpUri,
			jsonpCallback: 'processJSON',
			dataType: 'jsonp',
			data: {missionId:			missioncontrolModel.getActiveMissionId(), 
				   vehicleId: 			missioncontrolModel.getActiveVehicleId(), 
				   pilotId: 			missioncontrolModel.getActivePilotId, 
				   messageCategoryId: 	categoryId, 
				   messageId: 			messageId, 
				   loggedAt:            dateNow, 
				   feed: 				feed },
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			success: function(result) { console.log(result); },
			error: function() { console.log('Failed!'); }
		});	
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