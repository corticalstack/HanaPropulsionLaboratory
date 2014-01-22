(function(myHplApp) {
 
	myHplApp.cockpit.controls.controller 	= myHplApp.cockpit.controls.controller || {};
	myHplApp.cockpit.controller 			= myHplApp.cockpit.controller || {};
	
	var model                   			= myHplApp.model;
	var vehicleModel 						= myHplApp.vehicle.model;		
	var cockpitController 					= myHplApp.cockpit.controller;
	var cockpitModel 						= myHplApp.cockpit.model;
	var cockpitControlsModel 				= myHplApp.cockpit.controls.model;
	var cockpitMapsModel 					= myHplApp.cockpit.maps.model;
	var vehicleCmdModel 					= myHplApp.vehicle.cmd.model;	
	var missioncontrolModel 				= myHplApp.missioncontrol.model;
	var missioncontrolController 			= myHplApp.missioncontrol.controller;
	
	
	
	
	$(document).ready(function() {
		var gamepad = new Gamepad();
		gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
		});

				
		gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
			$('#gamepad-' + device.index).remove();
		});

			
		gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
		});

			
		gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
			try {
				myHplApp.cockpit.controls.controller.gamepad_button_down(e);
	    	}
	    	
			catch(err){alert(err);}
		});
		
			
		gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
			try {
				myHplApp.cockpit.controls.controller.gamepad_button_up(e);
	    	}
	    	catch(err){}
		});

				
		gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
			try {
				myHplApp.cockpit.controls.controller.gamepad_axis_changed(e);
	    	}
	    	catch(err){}
		});

			
		if (!gamepad.init()) {
			alert('Your browser does not support gamepads, get the latest Google Chrome or Firefox.');
		}
	});

	
	myHplApp.cockpit.controls.controller.gamepad_button_down = function(gamepadEvent) {		
		var vehicleModel 						= myHplApp.vehicle.model;		
		var cockpitController 					= myHplApp.cockpit.controller;
		var cockpitModel 						= myHplApp.cockpit.model;
		var cockpitControlsModel 				= myHplApp.cockpit.controls.model;
		var cockpitMapsModel 					= myHplApp.cockpit.maps.model;
		var vehicleCmdModel 					= myHplApp.vehicle.cmd.model;	
		var missioncontrolModel 				= myHplApp.missioncontrol.model;
		var missioncontrolController 			= myHplApp.missioncontrol.controller;
		var message = '';
		
		if (!cockpitModel.getStateActive()) {
			return;
		}
		
		
		//Direction
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigDirection()) {
			if (vehicleModel.getStateThrottleVal() < vehicleModel.getConfigThrottleMaxDirChange()) { 
				vehicleModel.setStateDirectionOn();
				myHplApp.controller.playSoundEffect('pulse1');
				if (vehicleModel.getStateDirectionVal() == vehicleCmdModel.getInstructionDirectionForward()) {
					vehicleModel.setStateDirectionVal(vehicleCmdModel.getInstructionDirectionReverse());
					sap.ui.getCore().byId("viewCockpit").getController().setTextDirectionReverse();
				}
				else
				{
					vehicleModel.setStateDirectionVal(vehicleCmdModel.getInstructionDirectionForward());
					sap.ui.getCore().byId("viewCockpit").getController().setTextDirectionForward();
				}
				  			
				message = vehicleModel.getStateDirectionVal() + ':'  + vehicleCmdModel.getInstructionThrottle() + vehicleModel.getStateThrottleVal() + model.getConfigMsgTerminator();
				cockpitController.emitControl(message);
				console.log(message);
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdDrive(), missioncontrolModel.getMessageIdMotor(), message );
			}
		}


		//Stop
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigStop() ) {
			vehicleModel.setStateStopOn();	
			cockpitController.emitControl(vehicleCmdModel.getInstructionStop());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdDrive(), missioncontrolModel.getMessageIdMotor(), vehicleCmdModel.getInstructionStop());
			cockpitModel.setIndicatorVal({id: 'lblIndStop', val: 1});
			myHplApp.controller.playSoundEffect('powerDown');
		}


		//Fire
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigFire() ) {
			if (vehicleModel.getStateActiveWeaponRemainingAmmo() > 0) {
				vehicleModel.setStateActiveWeapon(true);
				vehicleModel.setStateWeaponFiringPulseStart();
				cockpitController.emitControl(vehicleCmdModel.getInstructionFireGun1());
				cockpitController.emitControl(vehicleCmdModel.getInstructionFireGun2());
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdWeapon(), missioncontrolModel.getMessageIdGun1(), vehicleCmdModel.getInstructionFireGun1());
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdWeapon(), missioncontrolModel.getMessageIdGun1(), vehicleCmdModel.getInstructionFireGun2());
				var soundEffectFire = myHplApp.model.getSoundEffectByName(myHplApp.vehicle.model.getStateActiveWeaponSoundEffectFire());
				soundEffectFire.addEventListener('ended', function(){	this.currentTime = 0;
																		this.play();
															  		}, false);
				soundEffectFire.play();
			}
		}
	
		
		//Cam Pan Left
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanLeft()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamPanLeft());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamPanLeft());	
		}
				

		//Cam Pan Right
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanRight()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamPanRight());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamPanRight());
		}

		
		//Cam Tilt Up
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltUp()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamTiltUp());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamTiltUp());
		}

		
		//Cam Tilt Down			
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltDown()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamTiltDown());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamTiltDown());
		}
				

		//Map Change Type
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigGoogleMapTypeChange()) {	
			
			switch (cockpitMapsModel.getStateGoogleMapLastMapType()) {
				case cockpitMapsModel.getConfigGoogleMapRoad():
					cockpitMapsModel.setMapTypeIdSatellite();
					myHplApp.controller.playSoundEffect('click9');
					break;
				case cockpitMapsModel.getConfigGoogleMapSatellite():
					cockpitMapsModel.setMapTypeIdRoad();
					myHplApp.controller.playSoundEffect('click8');
					break;
			}
		}
				

		//Laser toggle				
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigToggleLaser()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionToggleLaser());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdLights(), missioncontrolModel.getMessageIdLaser(), vehicleCmdModel.getInstructionToggleLaser());
			vehicleModel.setStateLaserVal();

			if (vehicleModel.getStateLaserVal()) {	
				myHplApp.controller.playSoundEffect('laserPowerOn');				
			}
			else {
				myHplApp.controller.playSoundEffect('laserPowerOff');
				
			}				
		}

		
//		if (gamepadEvent.control == gamepadCmdThrottlePadLeft) {
//			sap.ui.getCore().byId("viewCockpit").getController().gamepad_button_down(gamepadEvent);
//		}

		
//		if (gamepadEvent.control == gamepadCmdThrottlePadRight) {
//			sap.ui.getCore().byId("viewCockpit").getController().gamepad_button_down(gamepadEvent);
//		}

	};


	myHplApp.cockpit.controls.controller.gamepad_button_up = function(gamepadEvent) {
		var vehicleModel 						= myHplApp.vehicle.model;		
		var cockpitController 					= myHplApp.cockpit.controller;
		var cockpitModel 						= myHplApp.cockpit.model;
		var cockpitControlsModel 				= myHplApp.cockpit.controls.model;
		var cockpitMapsModel 					= myHplApp.cockpit.maps.model;
		var vehicleCmdModel 					= myHplApp.vehicle.cmd.model;	
		var missioncontrolModel 				= myHplApp.missioncontrol.model;
		var missioncontrolController 			= myHplApp.missioncontrol.controller;
		
		if (!cockpitModel.getStateActive()) {
			return;
		}

		
		//Fire
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigFire() ) {
			if (vehicleModel.getStateActiveWeapon() == true) {
				vehicleModel.setStateActiveWeapon(false);
				cockpitController.emitControl(vehicleCmdModel.getInstructionStopGun1());
				cockpitController.emitControl(vehicleCmdModel.getInstructionStopGun2());
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdWeapon(), missioncontrolModel.getMessageIdGun1(), vehicleCmdModel.getInstructionStopGun1());
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdWeapon(), missioncontrolModel.getMessageIdGun1(), vehicleCmdModel.getInstructionStopGun2());
				vehicleModel.setStateWeaponFiringPulseEnd();
				vehicleModel.setStateWeaponRoundsFired();

				setTimeout(function(){ myHplApp.controller.playSoundEffect(vehicleModel.getStateActiveWeaponSoundEffectSpindown());
									   myHplApp.controller.stopSoundEffect(vehicleModel.getStateActiveWeaponSoundEffectFire());
									 },400);



				vehicleModel.setStateActiveWeaponRemainingAmmo();
				cockpitModel.setGaugeVal({id: 'gaugeAmmo', val: myHplApp.vehicle.model.getStateActiveWeaponRemainingAmmoPct()});
			}
		}

		
		//Cam Pan
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanLeft() || gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanRight()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamPanStop());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamPanStop());			
		}
				
		
		//Cam Tilt
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltUp() || gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltDown()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamTiltStop());			
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamTiltStop());
		}
				
			
	};


	myHplApp.cockpit.controls.controller.gamepad_axis_changed = function(gamepadEvent) {
		var vehicleModel 						= myHplApp.vehicle.model;		
		var cockpitController 					= myHplApp.cockpit.controller;
		var cockpitModel 						= myHplApp.cockpit.model;
		var cockpitControlsModel 				= myHplApp.cockpit.controls.model;
		var cockpitMapsModel 					= myHplApp.cockpit.maps.model;
		var vehicleCmdModel 					= myHplApp.vehicle.cmd.model;	
		var missioncontrolModel 				= myHplApp.missioncontrol.model;
		var missioncontrolController 			= myHplApp.missioncontrol.controller;
		var message = '';
		var soundEffect;

		
		if (!cockpitModel.getStateActive()) {
			return;
		}

		
		//Throttle
		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigThrottle()) {
			var throttle = parseFloat(gamepadEvent.value);
			throttle = throttle * 100;
			throttle = throttle.toFixed(0);	
			if (throttle < cockpitControlsModel.getDeviceConfigThrottleDeadzoneVal()) {
				throttle = 0;
			}
				   

			if (throttle == 0) {
				vehicleModel.setStateStopOff();
				cockpitModel.setIndicatorVal({id: 'lblIndStop', val: 1});
			}

			
			if (throttle != 0 && vehicleModel.getStateStop() == false) {
				cockpitModel.setIndicatorVal({id: 'lblIndStop', val: 0});
			}
						

			if (vehicleModel.getStateStop() == false && throttle != vehicleModel.getStateThrottleVal()) {
				vehicleModel.setStateThrottleOn();
				vehicleModel.setStateThrottleVal(throttle);
				message = message + vehicleModel.getStateDirectionVal() + ':'  + vehicleCmdModel.getInstructionThrottle() + throttle + ':';
			}
			
			cockpitModel.setGaugeVal({id: 'gaugeThrust', val: throttle});
		}
		    
		
		//Heading
		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigHeading()) {
			var heading = parseFloat(gamepadEvent.value);
			vehicleModel.setStateHeadingOn();
			heading = heading * 100;
			heading = heading.toFixed(0);
			message = message + vehicleCmdModel.getInstructionHeading()  + heading + ':';

		}

		
		//Rotate
		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigRotate() && vehicleModel.getStateThrottleVal() == 0) {
			var rotate = parseFloat(gamepadEvent.value);			
			vehicleModel.setStateRotateOn();
			rotate = rotate * 100;
			rotate = rotate.toFixed(0);	
			if (rotate != vehicleModel.getStateRotateVal()) {
				vehicleModel.setStateRotateVal(rotate);
				message = message + vehicleCmdModel.getInstructionRotate()  + rotate + ':';
			}
		}
		
		    
		if (message != '') {
			message = message + ']';    
			cockpitController.emitControl(message);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdDrive(), missioncontrolModel.getMessageIdMotor(), message);
		}


		//Map Zoom
 		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigGoogleMapZoom()){
 			var lastZoom = cockpitMapsModel.getStateGoogleMapLastZoom();
			var zoom = parseFloat(gamepadEvent.value);
			zoom = zoom * 10;
			zoom = zoom.toFixed(0);
				
			if (zoom != lastZoom) {
				if (zoom > lastZoom) {
					myHplApp.controller.playSoundEffect('click6');
				}
				else {
					myHplApp.controller.playSoundEffect('click5');
				}				
				
				cockpitMapsModel.setStateGoogleMapLastZoom(zoom);
			    zoom = parseInt(cockpitMapsModel.getStateGoogleMapLastZoom(), 10) + parseInt(cockpitMapsModel.getConfigGoogleMapZoomBase(), 10);
			    cockpitMapsModel.setMapZoom(zoom);
			    cockpitMapsModel.setMapCenter();
			}
		}
 		
		
	};

} (myHplApp = window.myHplApp || {}));	
	