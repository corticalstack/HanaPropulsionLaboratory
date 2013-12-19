(function(myHplApp) {
 
	myHplApp.vehicle.model = myHplApp.vehicle.model || {};
	
	var config = {
			throttleMaxDirChange: 	30	
	};
	
	var state = {
			stop:					false,
			throttle:				false,
			direction:				false,
			rotate:					false,
			throttleVal:			0,
			directionVal:			'DF',
			headingVal:				0,
			rotateVal:				0	
	};

	
	

    myHplApp.vehicle.model.getConfigThrottleMaxDirChange = function() { 
        return config.throttleMaxDirChange;
    };

	    
	myHplApp.vehicle.model.getStateStop = function() { 
        return state.stop;
    };

    myHplApp.vehicle.model.getStateThrottle = function() { 
        return state.throttle;
    };

    myHplApp.vehicle.model.getStateDirection = function() { 
        return state.direction;
    };

    myHplApp.vehicle.model.getStateRotate = function() { 
        return state.rotate;
    };
    
    myHplApp.vehicle.model.setStateStopOn = function() { 
        state.stop = true;
    };

    myHplApp.vehicle.model.setStateThrottleOn = function() { 
        state.throttle = true;
    };

    myHplApp.vehicle.model.setStateDirectionOn = function() { 
        state.direction = true;
    };

    myHplApp.vehicle.model.setStateRotateOn = function() { 
        state.rotate = true;
    };

    myHplApp.vehicle.model.setStateStopOff = function() { 
        state.stop = false;
    };

    myHplApp.vehicle.model.setStateThrottleOff = function() { 
        state.throttle = false;
    };

    myHplApp.vehicle.model.setStateDirectionOff = function() { 
        state.direction = false;
    };

    myHplApp.vehicle.model.setStateRotateOff = function() { 
        state.rotate = false;
    };


    myHplApp.vehicle.model.getStateThrottleVal = function() { 
        return state.throttleVal;
    };

    myHplApp.vehicle.model.getStateDirectionVal = function() { 
        return state.directionVal;
    };

    myHplApp.vehicle.model.getStateHeadingVal = function() { 
        return state.headingVal;
    };

    myHplApp.vehicle.model.getStateRotateVal = function() { 
        return state.rotateVal;
    };

    myHplApp.vehicle.model.setStateThrottleVal = function(val) { 
        state.throttleVal = val;
    };

    myHplApp.vehicle.model.setStateDirectionVal = function(val) { 
        state.directionVal = val;
    };

    myHplApp.vehicle.model.setStateHeadingVal = function(val) { 
        state.headingVal = val;
    };

    myHplApp.vehicle.model.setStateRotateVal = function(val) { 
        state.rotateVal = val;
    };
    
    
} (myHplApp = window.myHplApp || {}));
