(function(myHplApp) {
 
	myHplApp.vehicle.model = myHplApp.vehicle.model || {};
	
	var instruction = {
			throttle:							'V',
			direction:							'D',
			directionForward:   				'DF',
			directionReverse:   				'DR',
			heading:							'H',
			rotate:								'R',
			stop:								'X',
			camPanLeft:							'P-2',
			camPanRight:						'P2',
			camPanStop:							'P0',
			camTiltUp:							'T-2',
			camTiltDown:						'T2',
			camTiltStop:						'T0',
			toggleLaser:						'L',
			cockpitHeartbeat:					'B'	
	};
 

	var config = {
			throttleMaxDirChange: 	30	
	};
	
	
	var state = {
			stop:								false,
			throttle:							false,
			direction:							false,
			rotate:								false,
			heading:							false,			
			throttleVal:						0,
			directionVal:						'DF',
			headingVal:							0,
			rotateVal:							0,
			camPanVal:							0,
			laserVal:							false,
			shield:                             100,
			weaponRoundsFired:	 				0
	};

	
	var weapons = {
			activeSelected:						0,
			loadout:[{
				     	id:						'CAN1',
						name: 					'Cannon 1',
				     	fireInstruction:		'F1',
				     	stopInstruction:		'F0',
				        imgSrc: 				'assets/images/weapons/Bulletproof.png',
				        stateId:				'imgWeapon1State',
				        soundEffectFire:    	'cannonFire',
				        soundEffectSpindown: 	'cannonSpindown',
				        active:					false,
				        imgActive:				'assets/images/hud/greenDot.png',
				        imgInactive:			'assets/images/hud/redDot.png',
				        rps:					3,
				        maxAmmo:				300,
				        remainingAmmo: 			300,
				        ammoGauge:				'gaugeAmmo1',
						firingPulseStart:		0,
						firingPulseEnd:			0
				     },
					 {				     
				    	id:						'CAN2',
				    	name: 					'Cannon 2',
				     	fireInstruction:		'G1',
				     	stopInstruction:		'G0',				     	
				        imgSrc: 				'assets/images/weapons/Bulletproof.png',
				        stateId:				'imgWeapon2State',
				        soundEffectFire:    	'cannonFire',
				        soundEffectSpindown: 	'cannonSpindown',
				        active:					false,
				        imgActive:				'assets/images/hud/greenDot.png',
				        imgInactive:			'assets/images/hud/redDot.png',
				        rps:					3,
				        maxAmmo:				300,
				        remainingAmmo: 			300,
				        ammoGauge:				'gaugeAmmo2',
						firingPulseStart:		0,
						firingPulseEnd:			0
				     }]
	};

	
	
	//Get functions for instructions	
	myHplApp.vehicle.model.getInstructionThrottle = function() { 
        return instruction.throttle;
    };

    myHplApp.vehicle.model.getInstructionDirection = function() { 
        return instruction.direction;
    };

    myHplApp.vehicle.model.getInstructionDirectionForward = function() { 
        return instruction.directionForward;
    };

    myHplApp.vehicle.model.getInstructionDirectionReverse = function() { 
        return instruction.directionReverse;
    };

    
    myHplApp.vehicle.model.getInstructionHeading = function() { 
        return instruction.heading;
    };

    myHplApp.vehicle.model.getInstructionRotate = function() { 
        return instruction.rotate;
    };

    myHplApp.vehicle.model.getInstructionStop = function() { 
        return instruction.stop;
    };

    myHplApp.vehicle.model.getInstructionCamPanLeft = function() { 
        return instruction.camPanLeft;
    };

    myHplApp.vehicle.model.getInstructionCamPanRight = function() { 
        return instruction.camPanRight;
    };

    myHplApp.vehicle.model.getInstructionCamPanStop = function() { 
        return instruction.camPanStop;
    };

    myHplApp.vehicle.model.getInstructionCamTiltUp = function() { 
        return instruction.camTiltUp;
    };

    myHplApp.vehicle.model.getInstructionCamTiltDown = function() { 
        return instruction.camTiltDown;
    };

    myHplApp.vehicle.model.getInstructionCamTiltStop = function() { 
        return instruction.camTiltStop;
    };

    myHplApp.vehicle.model.getInstructionToggleLaser = function() { 
        return instruction.toggleLaser;
    };

    myHplApp.vehicle.model.getInstructionFireGun1 = function() { 
        return instruction.fireGun1;
    };

    myHplApp.vehicle.model.getInstructionFireGun2 = function() { 
        return instruction.fireGun2;
    };

    myHplApp.vehicle.model.getInstructionStopGun1 = function() { 
        return instruction.stopGun1;
    };

    myHplApp.vehicle.model.getInstructionStopGun2 = function() { 
        return instruction.stopGun2;
    };

    myHplApp.vehicle.model.getInstructionCockpitHeartbeat = function() { 
        return instruction.cockpitHeartbeat;
    };

    

    //Get functions for config
    myHplApp.vehicle.model.getConfigThrottleMaxDirChange = function() { 
        return config.throttleMaxDirChange;
    };

    

    //Get functions for state
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

    myHplApp.vehicle.model.getStateCamPanVal = function() { 
        return state.camPanVal;
    };

    myHplApp.vehicle.model.getStateLaserVal = function() { 
        return state.laserVal;
    };
      
    myHplApp.vehicle.model.getStateShield = function() { 
        return state.shield;
    };
    

    //Get functions for weapons
    myHplApp.vehicle.model.getWeapons = function() { 
        return weapons;
    };

    myHplApp.vehicle.model.getWeaponRemainingAmmo = function(weapon) { 
    	var activeWeapon = weapons.loadout[weapon];
    	return activeWeapon.remainingAmmo;
    };

    myHplApp.vehicle.model.getWeaponRemainingAmmoPct = function(weapon) { 
    	var activeWeapon 		= weapons.loadout[weapon];
    	var remainingAmmoPct 	= (activeWeapon.remainingAmmo / activeWeapon.maxAmmo) * 100;
    	remainingAmmoPct 		= remainingAmmoPct.toFixed(0);
    	return parseInt(remainingAmmoPct, 10);
    };

    myHplApp.vehicle.model.getWeaponSoundEffectFire = function(weapon) { 
    	var activeWeapon = weapons.loadout[weapon];
    	return activeWeapon.soundEffectFire;
    };
    
    myHplApp.vehicle.model.getWeaponSoundEffectSpindown = function(weapon) { 
    	var activeWeapon = weapons.loadout[weapon];
    	return activeWeapon.soundEffectSpindown;
    };
    
    myHplApp.vehicle.model.getWeaponFiringPulseStart = function(weapon) { 
    	var activeWeapon = weapons.loadout[weapon];
    	return activeWeapon.firingPulseStart;
    };
    

    
    //Set functions for state
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

    myHplApp.vehicle.model.setStateHeadingOn = function() { 
        state.heading = true;
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

    myHplApp.vehicle.model.setStateHeadingOff = function() { 
        state.heading = false;
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

    myHplApp.vehicle.model.setStateCamPanVal = function(val) { 
        state.camPanVal = val;       	
    };
    
    myHplApp.vehicle.model.setStateLaserVal = function() {
        state.laserVal = !state.laserVal;       	
    };
        
    myHplApp.vehicle.model.setStateShield = function(val) {
    	console.log("Val ", val);
    	var points = parseInt(val, 10);
    	console.log("Points ", points);
        state.shield = state.shield + points;       	
        if (state.shield > 100) {
        	state.shield = 100;
        }
        if (state.shield < 0) {
        	state.shield = 0;
        }
        console.log(state.shield);
    };
    
    
    //Set functions for weapons
    myHplApp.vehicle.model.setWeaponActiveSelected = function() { 
    	var activeWeapon1 = weapons.loadout[0];
    	var activeWeapon2 = weapons.loadout[1];
    	
        weapons.activeSelected++;
        if (weapons.activeSelected > 3) {
        	weapons.activeSelected = 0;
        }        
        
        switch (weapons.activeSelected) {
			case 0:
				activeWeapon1.active = false;
				activeWeapon2.active = false;
				break;
			case 1:
				activeWeapon1.active = true;
				activeWeapon2.active = false;
				break;
			case 2:
				activeWeapon1.active = false;
				activeWeapon2.active = true;
				break;
			case 3:
				activeWeapon1.active = true;
				activeWeapon2.active = true;
				break;				
        }
    };


    myHplApp.vehicle.model.setWeaponFiringPulseStart = function(weapon) { 
        weapons.loadout[weapon].firingPulseStart = new Date().getTime();
    };

    myHplApp.vehicle.model.resetWeaponFiringPulseStart = function(weapon) { 
        weapons.loadout[weapon].firingPulseStart = 0;
    };
    
    myHplApp.vehicle.model.setWeaponFiringPulseEnd = function(weapon) { 
    	weapons.loadout[weapon].firingPulseEnd = new Date().getTime();
    };

    
    myHplApp.vehicle.model.setWeaponRemainingAmmo = function(weapon) { 
    	var triggerTime 			= weapons.loadout[weapon].firingPulseEnd - weapons.loadout[weapon].firingPulseStart;
    	triggerTime 				= triggerTime / 100;
    	var roundsFired 			= triggerTime /  weapons.loadout[weapon].rps;
    	roundsFired = Math.ceil(roundsFired * 10) / 10;
    	if (roundsFired == 0) {
    		roundsFired = 1;
    	}

    	weapons.loadout[weapon].remainingAmmo = weapons.loadout[weapon].remainingAmmo - roundsFired.toFixed(0);
    };

    
    
} (myHplApp = window.myHplApp || {}));
