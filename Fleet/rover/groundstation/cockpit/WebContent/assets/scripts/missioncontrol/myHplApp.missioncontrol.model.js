(function (myHplApp) {
 
	myHplApp.missioncontrol.model = myHplApp.missioncontrol.model || {};
	
	var config = {
			servicePilotsUri: 			'http://hanaserver:8000/hpl/missioncontrol/services/pilots.xsodata/pilots/?$format=json',
			serviceMessagePumpUri: 		'http://hanaserver:8000/hpl/missioncontrol/services/messageLogPump.xsjs',
			chartNetworkTotalPoints: 	100,
			chartNetworkUpdateInterval: 30
	};

	
	var state = {
			missionControlOnline: 		false,
			lastInboundCommsTick:		0,
			lastInboundCommsTickSpan:	0,
	};
	
	
	var messageCategoryId = {
			notify:						'NOT',
			drive:						'DRI',
			sensor:						'SEN',
			navigation: 				'NAV',
			power: 						'POW',
			cockpit:					'COC',
	};

	var messageId = {
			arming:	    				'ARM',
			armed:	    				'ARD',			
			battery:					'BAT',
			camera:						'CAM',
			compass:    				'CPS',			
			compassInit:	    		'CPI',
			commsTick:					'COM',			
			distance:					'DST',
			direction:					'DIR',
			inertial:					'INE',
			inertialInit:	    		'INI',
			gpsInit:	    			'GPI',
			gpsPos:    					'GPP',			
			gpsSol:    					'GPS',
			gpsVel:    					'GPV',
			heading:					'HDG',
			laser:						'LAS',
			mapType:					'MPT',
			mapZoom:					'MPZ',
			motor:						'MTR',
			powerFailsafe:				'PFS',			
			rotate:						'ROT',			
			stop:    					'STP',
			systemsPowerUp:    			'SPU',
			thrust:						'THR',
			thrustFailsafe:				'TFS',
			weaponActive:				'WEA',			
			weaponFire:					'WEF',
			weaponStop:					'WES',			
	};

	
	
	var activeMission = {
			missionId: 					'000001',
			vehicleId: 					'001',
			pilotId:   					'001',
			keyFrame:					0,
			homeLattitude: 				0,
			homeLongitude:				0,
			currentLattitude:			0,
			currentLongitude:			0,
			nextWaypointId:				'',
			waypoints:					[],
			prevNetworkPacketIn:		0,
			prevNetworkPacketOut:		0,
			networkPacketIn:			0,
			networkPacketOut:			0,
			totalNetworkTrafficIn:		0,
			totalNetworkTrafficOut:		0,
			dataNetworkTrafficIn:		[],
			dataNetworkTrafficOut:		[]
	};

	
	
	var gps3DFixCount = 0;
	
	
	//Get methods for config
	myHplApp.missioncontrol.model.getConfigServicePilotsUri = function() { 
		return config.servicePilotsUri;
	};

	
	myHplApp.missioncontrol.model.getConfigServiceMessagePumpUri = function() { 
		return config.serviceMessagePumpUri;
	};

	myHplApp.missioncontrol.model.getConfigChartNetworkTotalPoints = function() { 
		return config.chartNetworkTotalPoints;
	};

	myHplApp.missioncontrol.model.getConfigChartNetworkUpdateInterval = function() { 
		return config.chartNetworkUpdateInterval;
	};

	
	//Set methods for config
	
	
	
	
	//Get methods for state
    myHplApp.missioncontrol.model.getStateMissioncontrolOnline = function() {
    	return state.missionControlOnline;
    };

    myHplApp.missioncontrol.model.getStateLastInboundCommsTick = function() {
    	return state.lastInboundCommsTick;
    };
    
    myHplApp.missioncontrol.model.getStateLastInboundCommsTickSpan = function() {
    	return state.lastInboundCommsTickSpan;
    };

	//Set methods for state
    myHplApp.missioncontrol.model.setStateMissioncontrolOnline = function(val) {
    	state.missionControlOnline = val;
    };
    
    myHplApp.missioncontrol.model.setStateLastInboundCommsTick = function(val) {
    	state.lastInboundCommsTick = val;
    };

    myHplApp.missioncontrol.model.setStateLastInboundCommsTickSpan = function(val) {
    	state.lastInboundCommsTickSpan = val;
    };

    
    
	//Get methods for messageCategoryId
    myHplApp.missioncontrol.model.getMessageCategoryIdNotify = function() {
    	return messageCategoryId.notify;
    };
        
    myHplApp.missioncontrol.model.getMessageCategoryIdDrive = function() {
    	return messageCategoryId.drive;
    };
    
    myHplApp.missioncontrol.model.getMessageCategoryIdSensor = function() {
    	return messageCategoryId.sensor;
    };
    
    myHplApp.missioncontrol.model.getMessageCategoryIdNavigation = function() {
    	return messageCategoryId.navigation;
    };
    
    myHplApp.missioncontrol.model.getMessageCategoryIdPower = function() {
    	return messageCategoryId.power;
    };

    myHplApp.missioncontrol.model.getMessageCategoryIdCockpit = function() {
    	return messageCategoryId.cockpit;
    };

    
    
	//Get methods for messageId
    myHplApp.missioncontrol.model.getMessageIdArming = function() {
    	return messageId.arming;
    };

    myHplApp.missioncontrol.model.getMessageIdArmed = function() {
    	return messageId.armed;
    };

    myHplApp.missioncontrol.model.getMessageIdBattery = function() {
    	return messageId.battery;
    };

    myHplApp.missioncontrol.model.getMessageIdCamera = function() {
    	return messageId.camera;
    };

    myHplApp.missioncontrol.model.getMessageIdCompass = function() {
    	return messageId.compass;
    };
    
    myHplApp.missioncontrol.model.getMessageIdCompassInit = function() {
    	return messageId.compassInit;
    };

    myHplApp.missioncontrol.model.getMessageIdCommsTick = function() {
    	return messageId.commsTick;
    };

    myHplApp.missioncontrol.model.getMessageIdDistance = function() {
    	return messageId.distance;
    };

    myHplApp.missioncontrol.model.getMessageIdDirection = function() {
    	return messageId.direction;
    };

    myHplApp.missioncontrol.model.getMessageIdInertial = function() {
    	return messageId.inertial;
    };

    myHplApp.missioncontrol.model.getMessageIdInertialInit = function() {
    	return messageId.inertialInit;
    };

    myHplApp.missioncontrol.model.getMessageIdGpsInit = function() {
    	return messageId.gpsInit;
    };
    
    myHplApp.missioncontrol.model.getMessageIdGpsPos = function() {
    	return messageId.gpsPos;
    };

    myHplApp.missioncontrol.model.getMessageIdGpsSol = function() {
    	return messageId.gpsSol;
    };
       
    myHplApp.missioncontrol.model.getMessageIdGpsVel = function() {
    	return messageId.gpsVel;
    };
    
    myHplApp.missioncontrol.model.getMessageIdHeading = function() {
    	return messageId.heading;
    };

    myHplApp.missioncontrol.model.getMessageIdLaser = function() {
    	return messageId.laser;
    };

    myHplApp.missioncontrol.model.getMessageIdMapType = function() {
    	return messageId.mapType;
    };

    myHplApp.missioncontrol.model.getMessageIdMapZoom = function() {
    	return messageId.mapZoom;
    };

    myHplApp.missioncontrol.model.getMessageIdMotor = function() {
    	return messageId.motor;
    };

    myHplApp.missioncontrol.model.getMessageIdPowerFailsafe = function() {
    	return messageId.powerFailsafe;
    };
    
    myHplApp.missioncontrol.model.getMessageIdRotate = function() {
    	return messageId.rotate;
    };
    
    myHplApp.missioncontrol.model.getMessageIdStop = function() {
    	return messageId.stop;
    };
    
    myHplApp.missioncontrol.model.getMessageIdSystemsPowerUp = function() {
    	return messageId.systemsPowerUp;
    };
    
    myHplApp.missioncontrol.model.getMessageIdThrust = function() {
    	return messageId.thrust;
    };

    myHplApp.missioncontrol.model.getMessageIdThrustFailsafe = function() {
    	return messageId.thrustFailsafe;
    };

    myHplApp.missioncontrol.model.getMessageIdWeaponActive = function() {
    	return messageId.weaponActive;
    };

    myHplApp.missioncontrol.model.getMessageIdWeaponFire = function() {
    	return messageId.weaponFire;
    };

    myHplApp.missioncontrol.model.getMessageIdWeaponStop = function() {
    	return messageId.weaponStop;
    };


    
    //Get methods for activeMission
	myHplApp.missioncontrol.model.getActiveMissionId = function() { 
		return activeMission.missionId;
	};
	
	myHplApp.missioncontrol.model.getActiveVehicleId = function() { 
		return activeMission.vehicleId;
	};

	myHplApp.missioncontrol.model.getActivePilotId = function() { 
		return activeMission.pilotId;
	};

	myHplApp.missioncontrol.model.getActiveKeyFrame = function() { 
		return activeMission.keyFrame;
	};

	myHplApp.missioncontrol.model.getHomeLongitude = function() { 
		return activeMission.homeLongitude;
	};
	
	myHplApp.missioncontrol.model.getHomeLattitude = function() { 
		return activeMission.homeLattitude;
	};
	
	myHplApp.missioncontrol.model.getCurrentLattitude = function() { 
		return activeMission.currentLattitude;
	};

	myHplApp.missioncontrol.model.getCurrentLongitude = function() { 
		return activeMission.currentLongitude;
	};

	myHplApp.missioncontrol.model.getNetworkPacketIn = function() { 
		return activeMission.networkPacketIn;
	};

	myHplApp.missioncontrol.model.getNetworkPacketOut = function() { 
		return activeMission.networkPacketOut;
	};
	
	myHplApp.missioncontrol.model.getTotalNetworkTrafficIn = function() { 
		return activeMission.totalNetworkTrafficIn;
	};

	myHplApp.missioncontrol.model.getTotalNetworkTrafficOut = function() { 
		return activeMission.totalNetworkTrafficOut;
	};

	myHplApp.missioncontrol.model.getDataNetworkTrafficIn = function() {
		return activeMission.dataNetworkTrafficIn;
	};
	
	myHplApp.missioncontrol.model.getDataNetworkTrafficOut = function() {
		return activeMission.dataNetworkTrafficOut;
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

	myHplApp.missioncontrol.model.setActiveKeyFrame = function() { 
		activeMission.keyFrame++;
	};

	myHplApp.missioncontrol.model.setCurrentLattitude = function(val) { 
		activeMission.currentLattitude = val;
	};

	myHplApp.missioncontrol.model.setCurrentLongitude = function(val) { 
		activeMission.currentLongitude = val;
	};

	myHplApp.missioncontrol.model.addNetworkPacketIn = function(val) { 
		activeMission.networkPacketIn = activeMission.networkPacketIn + val;
		activeMission.totalNetworkTrafficIn = activeMission.totalNetworkTrafficIn + val;
	};

	myHplApp.missioncontrol.model.addNetworkPacketOut = function(val) { 
		activeMission.networkPacketOut = activeMission.networkPacketOut + val;
		activeMission.totalNetworkTrafficOut = activeMission.totalNetworkTrafficOut + val;
	};

	
	myHplApp.missioncontrol.model.resetNetworkPacketIn = function() {
		activeMission.networkPacketIn = 0;
	};

	
	myHplApp.missioncontrol.model.resetNetworkPacketOut = function() {
		activeMission.networkPacketOut = 0;
	};

	
	myHplApp.missioncontrol.model.setDataNetworkTrafficIn = function(val) {
		var now = new Date().getTime();
		var temp;
		activeMission.dataNetworkTrafficIn.shift();

	    while (activeMission.dataNetworkTrafficIn.length < config.chartNetworkTotalPoints) {    
	    	if (val >= 0) {
	    		temp = [now += config.chartNetworkUpdateInterval, val];
	    	}
	    	else {
	    		temp = [(now - 20000) + (config.chartNetworkUpdateInterval * activeMission.dataNetworkTrafficIn.length * 10), 0];
	    	}

	        activeMission.dataNetworkTrafficIn.push(temp);
	    }
	};
	
	
	myHplApp.missioncontrol.model.setDataNetworkTrafficOut = function(val) {
		var now = new Date().getTime();
		var temp;
		activeMission.dataNetworkTrafficOut.shift();

	    while (activeMission.dataNetworkTrafficOut.length < config.chartNetworkTotalPoints) {     
	    	if (val >= 0) {
	    		temp = [now += config.chartNetworkUpdateInterval, val];
	    	}
	    	else {
	    		temp = [(now - 20000) + (config.chartNetworkUpdateInterval * activeMission.dataNetworkTrafficOut.length * 10), 0];
	    	}
	    	
	        activeMission.dataNetworkTrafficOut.push(temp);
	    }
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