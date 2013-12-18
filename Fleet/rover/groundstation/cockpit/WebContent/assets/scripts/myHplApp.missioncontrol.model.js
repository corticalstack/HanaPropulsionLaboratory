(function (myHplApp) {
 
	myHplApp.missioncontrol.model = myHplApp.missioncontrol.model || {};
	
	var config = {
			servicePilotsUri: 			'http://hanaserver:8000/hpl/missioncontrol/services/pilots.xsodata/pilots/?$format=json',
			serviceMessagePumpUri: 		'http://hanaserver:8000/hpl/missioncontrol/services/messageLogPump.xsjs'
	};

	
	var state = {
			missionControlOnline: false,
	};
	
	
	var messageCategoryId = {
			drive:		'DRI',
			sensor:		'SEN',
			lights:		'LIT'
	};

	var messageId = {
			camera:		'C',
			motor:		'M',				
			headlights:	'H'				
	};

	
	
	var activeMission = {
			missionId: '000001',
			vehicleId: '001',
			pilotId:   '001'
	};

	
    
    myHplApp.missioncontrol.model.getMessageCategoryIdDrive = function() {
    	return messageCategoryId.drive;
    };

    myHplApp.missioncontrol.model.getMessageCategoryIdSensor = function() {
    	return messageCategoryId.sensor;
    };

    myHplApp.missioncontrol.model.getMessageIdCamera = function() {
    	return messageId.camera;
    };

    myHplApp.missioncontrol.model.getMessageIdMotor = function() {
    	return messageId.motor;
    };

    
	myHplApp.missioncontrol.model.getConfigServicePilotsUri = function() { 
		return config.servicePilotsUri;
	};
	    
	myHplApp.missioncontrol.model.getConfigServiceMessagePumpUri = function() { 
		return config.serviceMessagePumpUri;
	};

} (myHplApp = window.myHplApp || {}));