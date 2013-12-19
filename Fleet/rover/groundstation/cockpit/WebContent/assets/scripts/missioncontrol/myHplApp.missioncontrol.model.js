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
			lights:		'LIT',
			navigation: 'NAV',
			power: 		'POW'
	};

	var messageId = {
			battery:	'B',
			camera:		'C',
			distance:	'D',
			inertial:	'I',
			motor:		'M',				
			headlights:	'H',
			compass:    'C',
			gpsSol:    	'S',
			gpsPos:    	'P',
			gpsVel:    	'V'
	};

	
	
	var activeMission = {
			missionId: '000001',
			vehicleId: '001',
			pilotId:   '001'
	};

	
	
	//Get methods for config
	myHplApp.missioncontrol.model.getConfigServicePilotsUri = function() { 
		return config.servicePilotsUri;
	};

	
	myHplApp.missioncontrol.model.getConfigServiceMessagePumpUri = function() { 
		return config.serviceMessagePumpUri;
	};

	//Set methods for config
	
	
	
	
	//Get methods for state
    myHplApp.missioncontrol.model.getStateMissioncontrolOnline = function() {
    	return state.missionControlOnline;
    };

    
    
	//Set methods for state
    myHplApp.missioncontrol.model.setStateMissioncontrolOnline = function(val) {
    	state.missionControlOnline = val;
    };
    
    
    
	//Get methods for messageCategoryId
    myHplApp.missioncontrol.model.getMessageCategoryIdDrive = function() {
    	return messageCategoryId.drive;
    };

    
    myHplApp.missioncontrol.model.getMessageCategoryIdSensor = function() {
    	return messageCategoryId.sensor;
    };
    

    myHplApp.missioncontrol.model.getMessageCategoryIdLights = function() {
    	return messageCategoryId.lights;
    };

    myHplApp.missioncontrol.model.getMessageCategoryIdNavigation = function() {
    	return messageCategoryId.navigation;
    };
    
    
	//Get methods for messageId
    myHplApp.missioncontrol.model.getMessageIdCamera = function() {
    	return messageId.camera;
    };

    
    myHplApp.missioncontrol.model.getMessageIdDistance = function() {
    	return messageId.distance;
    };
    
    
    myHplApp.missioncontrol.model.getMessageIdMotor = function() {
    	return messageId.motor;
    };

    
    myHplApp.missioncontrol.model.getMessageIdHeadlights = function() {
    	return messageId.headlights;
    };

    myHplApp.missioncontrol.model.getMessageIdCompass = function() {
    	return messageId.compass;
    };
    

    myHplApp.missioncontrol.model.getMessageIdGpsSol = function() {
    	return messageId.gpsSol;
    };


    myHplApp.missioncontrol.model.getMessageIdGpsSol = function() {
    	return messageId.gpsSol;
    };

    
    myHplApp.missioncontrol.model.getMessageIdGpsPos = function() {
    	return messageId.gpsPos;
    };
    
    myHplApp.missioncontrol.model.getMessageIdGpsVel = function() {
    	return messageId.gpsVel;
    };
    
    //Get methods for activeMission
	myHplApp.missioncontrol.model.getActiveMissionId = function(val) { 
		return activeMission.missionId;
	};
	
	myHplApp.missioncontrol.model.getActiveMissionVehicleId = function(val) { 
		return activeMission.vehicleId;
	};

	myHplApp.missioncontrol.model.getActiveMissionPilotId = function(val) { 
		return activeMission.pilotId;
	};
    
    
    
    //Set methods for activeMission
	myHplApp.missioncontrol.model.setActiveMissionId = function(val) { 
		activeMission.missionId = val;
	};

	
	myHplApp.missioncontrol.model.setActiveMissionVehicleId = function(val) { 
		activeMission.vehicleId = val;
	};

	myHplApp.missioncontrol.model.setActiveMissionPilotId = function(val) { 
		activeMission.pilotId = val;
	};

	
} (myHplApp = window.myHplApp || {}));