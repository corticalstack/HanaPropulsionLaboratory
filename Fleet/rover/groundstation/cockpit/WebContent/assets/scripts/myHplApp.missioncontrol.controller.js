(function (myHplApp) {
 
	myHplApp.missioncontrol.controller = myHplApp.missioncontrol.controller || {};
	
	var missioncontrolModel = myHplApp.missioncontrol.model;
	

	myHplApp.missioncontrol.controller.init = function() { 
		console.log('Initialising missioncontrol controller');
		missioncontrolModel.state.missionControlOnline 	= false;
		
		missioncontrolModel.activeMission.missionId 	= '000001';
		missioncontrolModel.activeMission.vehicleId 	= '001';
		missioncontrolModel.activeMission.pilotId   	= '001';

    };

	
	myHplApp.missioncontrol.controller.messagePump = function(categoryId, messageId, feed) { 
		if (!missioncontrolModel.state.missionControlOnline) {
			return;
		}
			  
		dateNow = new Date();
				 
		jQuery.ajax({
			url:missioncontrolModel.serviceMessagePumpUri,
			jsonpCallback: 'processJSON',
			dataType: 'jsonp',
			data: {missionId:			missioncontrolModel.activeMission.missionId, 
				   vehicleId: 			missioncontrolModel.activeMission.vehicleId, 
				   pilotId: 			missioncontrolModel.activeMission.pilotId, 
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
	    
	
	myHplApp.missioncontrol.controller.init();
	
} (myHplApp = window.myHplApp || {}));