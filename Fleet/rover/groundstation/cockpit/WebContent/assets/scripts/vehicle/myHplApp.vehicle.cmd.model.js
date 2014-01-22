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
			camPanLeft:			'P-2:]',
			camPanRight:		'P2:]',
			camPanStop:			'P0:]',
			camTiltUp:			'T-2:]',
			camTiltDown:		'T2:]',
			camTiltStop:		'T0:]',
			toggleLaser:		'L:]',
			fireGun1:			'F1:]',
			fireGun2:			'G1:]',
			stopGun1:			'F0:]',
			stopGun2:			'G0:]',
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

    myHplApp.vehicle.cmd.model.getInstructionToggleLaser = function() { 
        return instruction.toggleLaser;
    };

    myHplApp.vehicle.cmd.model.getInstructionFireGun1 = function() { 
        return instruction.fireGun1;
    };

    myHplApp.vehicle.cmd.model.getInstructionFireGun2 = function() { 
        return instruction.fireGun2;
    };

    myHplApp.vehicle.cmd.model.getInstructionStopGun1 = function() { 
        return instruction.stopGun1;
    };

    myHplApp.vehicle.cmd.model.getInstructionStopGun2 = function() { 
        return instruction.stopGun2;
    };

    myHplApp.vehicle.cmd.model.getInstructionCockpitHeartbeat = function() { 
        return instruction.cockpitHeartbeat;
    };
       
    
} (myHplApp = window.myHplApp || {}));
