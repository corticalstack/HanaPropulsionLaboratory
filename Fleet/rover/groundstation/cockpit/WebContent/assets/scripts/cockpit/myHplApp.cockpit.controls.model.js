(function(myHplApp) {
 
	myHplApp.cockpit.controls.model = myHplApp.cockpit.controls.model || {};
	

	var deviceConfig = {
			toggleLaser:  			'FACE_2',
			toggleWeapon:  			'FACE_1',
			direction: 				'FACE_4',
			stop: 					'FACE_3',
			throttle:  				'RIGHT_BOTTOM_SHOULDER',
			fire:					'RIGHT_TOP_SHOULDER',
			heading:  				'LEFT_STICK_X',
			rotate: 				'RIGHT_STICK_X',
			camPanLeft:  			'DPAD_LEFT',
			camPanRight:           	'DPAD_RIGHT',
			camTiltUp: 				'DPAD_UP',
			camTiltDown:           	'DPAD_DOWN',
			googleMapTypeChange:   	'LEFT_TOP_SHOULDER',
			googleMapZoom: 			'LEFT_BOTTOM_SHOULDER',
			throttlePadLeft:     	'SELECT_BACK',
			throttlePadRight:     	'START_FORWARD',
			throttleDeadzoneVal:     7
	};
	

	myHplApp.cockpit.controls.model.getDeviceConfigToggleLaser = function() { 
        return deviceConfig.toggleLaser;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigToggleWeapon = function() { 
        return deviceConfig.toggleWeapon;
    };
    
    
	myHplApp.cockpit.controls.model.getDeviceConfigDirection = function() { 
        return deviceConfig.direction;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigStop = function() { 
        return deviceConfig.stop;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigThrottle = function() { 
        return deviceConfig.throttle;
    };


	myHplApp.cockpit.controls.model.getDeviceConfigFire = function() { 
        return deviceConfig.fire;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigHeading = function() { 
        return deviceConfig.heading;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigRotate = function() { 
        return deviceConfig.rotate;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigCamPanLeft = function() { 
        return deviceConfig.camPanLeft;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigCamPanRight = function() { 
        return deviceConfig.camPanRight;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigCamTiltUp = function() { 
        return deviceConfig.camTiltUp;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigCamTiltDown = function() { 
        return deviceConfig.camTiltDown;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigGoogleMapTypeChange = function() { 
        return deviceConfig.googleMapTypeChange;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigGoogleMapZoom = function() { 
        return deviceConfig.googleMapZoom;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigThrottlePadLeft = function() { 
        return deviceConfig.throttlePadLeft;
    };

    
	myHplApp.cockpit.controls.model.getDeviceConfigThrottlePadRight = function() { 
        return deviceConfig.throttlePadRight;
    };

	myHplApp.cockpit.controls.model.getDeviceConfigThrottleDeadzoneVal = function() { 
        return deviceConfig.throttleDeadzoneVal;
    };
    
} (myHplApp = window.myHplApp || {}));	
	