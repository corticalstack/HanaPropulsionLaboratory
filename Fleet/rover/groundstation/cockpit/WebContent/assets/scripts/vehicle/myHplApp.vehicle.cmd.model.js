(function(myHplApp) {
 
	myHplApp.vehicle.cmd.model = myHplApp.vehicle.cmd.model || {};
	

	var instruction = {
			throttle:			'V',
			direction:			'D',
			directionForward:   'DF',
			directionReverse:   'DR',
			heading:			'H',
			rotate:				'R',
			stop:				'X:]',
			camPanLeft:			'P-5:]',
			camPanRight:		'P5:]',
			camPanStop:			'P0:]',
			camTiltUp:			'T-5:]',
			camTiltDown:		'T5:]',
			camTiltStop:		'T0:]',
			toggleHeadlights:	'L:]',
			cockpitHeartbeat:	'B:]'	
	};
 
	
	myHplApp.vehicle.cmd.model.getInstructionThrottle = function() { 
        return instruction.throttle;
    };

    myHplApp.vehicle.cmd.model.getInstructionDirection = function() { 
        return instruction.direction;
    };

    myHplApp.vehicle.cmd.model.getInstructionDirectionForward = function() { 
        return instruction.directionForward;
    };

    myHplApp.vehicle.cmd.model.getInstructionDirectionReverse = function() { 
        return instruction.directionReverse;
    };

    
    myHplApp.vehicle.cmd.model.getInstructionHeading = function() { 
        return instruction.heading;
    };

    myHplApp.vehicle.cmd.model.getInstructionRotate = function() { 
        return instruction.rotate;
    };

    myHplApp.vehicle.cmd.model.getInstructionStop = function() { 
        return instruction.stop;
    };

    myHplApp.vehicle.cmd.model.getInstructionCamPanLeft = function() { 
        return instruction.camPanLeft;
    };

    myHplApp.vehicle.cmd.model.getInstructionCamPanRight = function() { 
        return instruction.camPanRight;
    };

    myHplApp.vehicle.cmd.model.getInstructionCamPanStop = function() { 
        return instruction.camPanStop;
    };

    myHplApp.vehicle.cmd.model.getInstructionCamTiltUp = function() { 
        return instruction.camTiltUp;
    };

    myHplApp.vehicle.cmd.model.getInstructionCamTiltDown = function() { 
        return instruction.camTiltDown;
    };

    myHplApp.vehicle.cmd.model.getInstructionCamTiltStop = function() { 
        return instruction.camTiltStop;
    };

    myHplApp.vehicle.cmd.model.getInstructionToggleHeadlights = function() { 
        return instruction.toggleHeadlights;
    };

    myHplApp.vehicle.cmd.model.getInstructionCockpitHeartbeat = function() { 
        return instruction.cockpitHeartbeat;
    };
       
    
} (myHplApp = window.myHplApp || {}));
