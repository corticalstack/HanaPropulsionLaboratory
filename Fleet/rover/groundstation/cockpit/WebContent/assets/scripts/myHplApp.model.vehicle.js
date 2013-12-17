(function(myHplApp) {
 
	myHplApp.model.vehicle = myHplApp.model.vehicle || {};
	

	
	var state = {
			stop:				false,
			throttle:			false,
			direction:			false,
			rotate:				false,
			throttle:			0,
			direction:			0,
			heading:			0,
			rotate:				0
	};
	
	    
    myHplApp.model.vehicle.getStateStop = function() { 
        return state.stop;
    };

    myHplApp.model.vehicle.getStateThrottle = function() { 
        return state.throttle;
    };

    myHplApp.model.vehicle.getStateDirection = function() { 
        return state.direction;
    };

    myHplApp.model.vehicle.getStateRotate = function() { 
        return state.rotate;
    };
    
    myHplApp.model.vehicle.setStateStopOn = function() { 
        state.stop = true;
    };

    myHplApp.model.vehicle.setStateThrottleOn = function() { 
        state.throttle = true;
    };

    myHplApp.model.vehicle.setStateDirectionOn = function() { 
        state.direction = true;
    };

    myHplApp.model.vehicle.setStateRotateOn = function() { 
        state.rotate = true;
    };

    myHplApp.model.vehicle.setStateStopOff = function() { 
        state.stop = false;
    };

    myHplApp.model.vehicle.setStateThrottleOff = function() { 
        state.throttle = false;
    };

    myHplApp.model.vehicle.setStateDirectionOff = function() { 
        state.direction = false;
    };

    myHplApp.model.vehicle.setStateRotateOff = function() { 
        state.rotate = false;
    };


    myHplApp.model.vehicle.getCurrentThrottleStateRotateOff = function() { 
        state.rotate = false;
    };


    myHplApp.model.vehicle.getThrottle = function() { 
        return state.throttle;
    };

    myHplApp.model.vehicle.getDirection = function() { 
        return state.direction;
    };

    myHplApp.model.vehicle.getHeading = function() { 
        return state.heading;
    };

    myHplApp.model.vehicle.getRotate = function() { 
        return state.rotate;
    };


    myHplApp.model.vehicle.setThrottle = function(val) { 
        state.throttle = val;
    };

    myHplApp.model.vehicle.setDirection = function(val) { 
        state.direction = val;
    };

    myHplApp.model.vehicle.setHeading = function(val) { 
        state.heading = val;
    };

    myHplApp.model.vehicle.setRotate = function(val) { 
        state.rotate = val;
    };

    
    
} (myHplApp = window.myHplApp || {}));
