(function(myHplApp) {
 
	myHplApp.vehicle.model = myHplApp.vehicle.model || {};
	
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
			weaponRoundsFired:	 				0
	};

	
	var weapons = {
			activeSelected:						0,
			loadout:[{
				     	name: 					'Cannon1',
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
						firingPulseStart:		0,
						firingPulseEnd:			0
				     },
					 {				     
				     	name: 					'Cannon2',
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
						firingPulseStart:		0,
						firingPulseEnd:			0
				     }]
	};


	
	
	//Get functions
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

    myHplApp.vehicle.model.getWeapons = function() { 
        return weapons;
    };

    myHplApp.vehicle.model.getStateActiveWeapon = function() { 
        return state.activeWeapon;
    };

    myHplApp.vehicle.model.getStateActiveWeapons = function(weapon) { 
    	var activeWeapon 		= weapons.loadout[weapon];
    	return activeWeapon.active;
    };

    myHplApp.vehicle.model.getStateWeaponFiringPulseStart = function() { 
        return state.weaponFiringPulseStart;
    };

    myHplApp.vehicle.model.getStateWeaponFiringPulseEnd = function() { 
        return state.weaponFiringPulseEnd;
    };
    
    myHplApp.vehicle.model.getStateWeaponRoundsFired = function() { 
        return state.weaponRoundsFired;
    };
    

    myHplApp.vehicle.model.getWeaponRemainingAmmo = function(weaponIndex) { 
    	var activeWeapon = weapons.loadout[weaponIndex];
    	return activeWeapon.remainingAmmo;
    };

    myHplApp.vehicle.model.getStateActiveWeaponRemainingAmmoPct = function() { 
    	var activeWeapon 		= weapons.loadout[state.activeWeaponSelected];
    	var remainingAmmoPct 	= (activeWeapon.remainingAmmo / activeWeapon.maxAmmo) * 100;
    	remainingAmmoPct 		= remainingAmmoPct.toFixed(0);
    	return parseInt(remainingAmmoPct, 10);
    };
    

    myHplApp.vehicle.model.getStateActiveWeaponSoundEffectFire = function() { 
    	var activeWeapon = weapons.loadout[state.activeWeaponSelected];
    	return activeWeapon.soundEffectFire;
    };

    
    myHplApp.vehicle.model.getStateActiveWeaponSoundEffectSpindown = function() { 
    	var activeWeapon = weapons.loadout[state.activeWeaponSelected];
    	return activeWeapon.soundEffectSpindown;
    };


    //Set functions
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

    
    myHplApp.vehicle.model.setWeaponFiringPulseStart = function(weaponIndex) { 
        weapons.loadout[weaponIndex].firingPulseStart = new Date().getTime();
    };

    myHplApp.vehicle.model.setWeaponFiringPulseEnd = function(weaponIndex) { 
    	weapons.loadout[weaponIndex].firingPulseEnd = new Date().getTime();
    };

    myHplApp.vehicle.model.setWeaponRoundsFired = function() { 
    	var triggerTime 			= state.weaponFiringPulseEnd - state.weaponFiringPulseStart;
    	triggerTime 				= triggerTime / 100;
    	var activeWeapon 			= weapons.loadout[state.activeWeaponSelected];
    	var roundsFired 			= triggerTime /  activeWeapon.rps;
    	roundsFired = Math.ceil(roundsFired * 10) / 10;
    	if (roundsFired == 0) {
    		roundsFired = 1;
    	}

    	state.weaponRoundsFired = roundsFired.toFixed(0);

    };

    myHplApp.vehicle.model.setStateActiveWeaponRemainingAmmo = function() { 
    	var activeWeapon 			= weapons.loadout[state.activeWeaponSelected];
    	activeWeapon.remainingAmmo 	= activeWeapon.remainingAmmo - state.weaponRoundsFired;
    };

} (myHplApp = window.myHplApp || {}));
