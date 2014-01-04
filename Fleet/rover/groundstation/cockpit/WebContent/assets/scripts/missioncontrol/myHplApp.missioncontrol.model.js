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
			drive:					'DRI',
			sensor:					'SEN',
			lights:					'LIT',
			navigation: 			'NAV',
			power: 					'POW'
	};

	var messageId = {
			battery:				'B',
			camera:					'C',
			distance:				'D',
			inertial:				'I',
			motor:					'M',
			thrust:					'T',
			headlights:				'H',
			compass:    			'C',
			gpsSol:    				'S',
			gpsPos:    				'P',
			gpsVel:    				'V'
	};

	
	
	var activeMission = {
			missionId: 				'000001',
			vehicleId: 				'001',
			pilotId:   				'001',
			homeLattitude: 			0,
			homeLongitude:			0,
			currentLattitude:		0,
			currentLongitude:		0,
			nextWaypointId:			'',
			waypoints:				[]
	};

	
 
	
	var gps3DFixCount = 0;
	
	
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
    
    myHplApp.missioncontrol.model.getMessageCategoryIdPower = function() {
    	return messageCategoryId.power;
    };
    
    
	//Get methods for messageId
    myHplApp.missioncontrol.model.getMessageIdBattery = function() {
    	return messageId.battery;
    };

    myHplApp.missioncontrol.model.getMessageIdCamera = function() {
    	return messageId.camera;
    };

    
    myHplApp.missioncontrol.model.getMessageIdDistance = function() {
    	return messageId.distance;
    };
    
    myHplApp.missioncontrol.model.getMessageIdInertial = function() {
    	return messageId.inertial;
    };

    myHplApp.missioncontrol.model.getMessageIdMotor = function() {
    	return messageId.motor;
    };

    myHplApp.missioncontrol.model.getMessageIdThrust = function() {
    	return messageId.thrust;
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
	
	myHplApp.missioncontrol.model.getActiveVehicleId = function(val) { 
		return activeMission.vehicleId;
	};

	myHplApp.missioncontrol.model.getActivePilotId = function(val) { 
		return activeMission.pilotId;
	};
    
	myHplApp.missioncontrol.model.getHomeLongitude = function(val) { 
		return activeMission.homeLongitude;
	};
	
	myHplApp.missioncontrol.model.getHomeLattitude = function(val) { 
		return activeMission.homeLattitude;
	};
	
	myHplApp.missioncontrol.model.getCurrentLattitude = function(val) { 
		return activeMission.currentLattitude;
	};

	myHplApp.missioncontrol.model.getCurrentLongitude = function(val) { 
		return activeMission.currentLongitude;
	};

	
	
	
	
	//Set methods for activeMission    
	myHplApp.missioncontrol.model.setActiveHomeLatLng = function() {
		activeMission.homeLattitude = activeMission.currentLattitude; 
		activeMission.homeLongitude = activeMission.currentLongitude;
	};

	
    
	myHplApp.missioncontrol.model.setActiveMissionId = function(val) { 
		activeMission.missionId = val;
	};

	
	myHplApp.missioncontrol.model.setActiveVehicleId = function(val) { 
		activeMission.vehicleId = val;
	};

	myHplApp.missioncontrol.model.setActivePilotId = function(val) { 
		activeMission.pilotId = val;
	};

	myHplApp.missioncontrol.model.setCurrentLattitude = function(val) { 
		activeMission.currentLattitude = val;
	};

	myHplApp.missioncontrol.model.setCurrentLongitude = function(val) { 
		activeMission.currentLongitude = val;
	};

	
	
	myHplApp.missioncontrol.model.addWaypoint = function(id, longitudeVal, lattitudeVal) {
		var waypoint = {
				id: id,
				longitude: longitudeVal,
				lattitude: lattitudeVal 
		};
		activeMission.waypoints.push(waypoint); 
	};
	
	
	
	
//Misc Get
	myHplApp.missioncontrol.model.getGps3DFixCount = function() {
		return gps3DFixCount;
	};
	
	
	//Misc Set
	myHplApp.missioncontrol.model.incrementGps3DFixCount = function() {
		gps3DFixCount++;
	};
	
} (myHplApp = window.myHplApp || {}));