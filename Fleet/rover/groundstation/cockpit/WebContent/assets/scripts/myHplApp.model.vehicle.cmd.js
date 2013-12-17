(function(myHplApp) {
 
	myHplApp.model.vehicle.cmd = myHplApp.model.vehicle.cmd || {};
	

	var instruction = {
			throttle:			'V',
			direction:			'D',
			heading:			'H',
			rotate:				'R',
			stop:				'X:]',
			camPanLeft:			'P-5:]',
			camPanRight:		'P5:]',
			camPanStop:			'P0:]',
			camTiltUp:			'T5:]',
			camTiltDown:		'T-5:]',
			camTiltStop:		'T0:]',
			toggleHeadlights:	'L:]',
			cockpitHeartbeat:	'B:]'	
	};
 
	
	
	
    //add a public function to our new namespace
	myHplApp.model.vehicle.cmd.getInstructionThrottle = function() { 
        return instruction.throttle;
    };

	myHplApp.model.vehicle.cmd.getInstructionDirection = function() { 
        return instruction.direction;
    };

	myHplApp.model.vehicle.getInstructionHeading = function() { 
        return instruction.heading;
    };

	myHplApp.model.vehicle.getInstructionRotate = function() { 
        return instruction.rotate;
    };

	myHplApp.model.vehicle.getInstructionStop = function() { 
        return instruction.stop;
    };

	myHplApp.model.vehicle.getInstructionCamPanLeft = function() { 
        return instruction.camPanLeft;
    };

	myHplApp.model.vehicle.getInstructionCamPanRight = function() { 
        return instruction.camPanRight;
    };

	myHplApp.model.vehicle.getInstructionCamPanStop = function() { 
        return instruction.camPanStop;
    };

	myHplApp.model.vehicle.getInstructionCamTiltUp = function() { 
        return instruction.camTiltUp;
    };

	myHplApp.model.vehicle.getInstructionCamTiltDown = function() { 
        return instruction.camTiltDown;
    };

	myHplApp.model.vehicle.getInstructionCamTiltStop = function() { 
        return instruction.camTiltStop;
    };

	myHplApp.model.vehicle.getInstructionToggleHeadlights = function() { 
        return instruction.toggleHeadlights;
    };

	myHplApp.model.vehicle.getInstructionCockpitHeartbeat = function() { 
        return instruction.cockpitHeartbeat;
    };
       
    
} (myHplApp = window.myHplApp || {}));
