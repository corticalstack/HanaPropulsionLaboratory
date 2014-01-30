(function(myHplApp) {
 
	myHplApp.cockpit.controls.controller 	= myHplApp.cockpit.controls.controller || {};
	myHplApp.cockpit.controller 			= myHplApp.cockpit.controller || {};
		
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
		var missioncontrolModel 				= myHplApp.missioncontrol.model;
		var missioncontrolController 			= myHplApp.missioncontrol.controller;
		var message = '';
		var weapons;
		
		if (!cockpitModel.getStateActive()) {
			return;
		}
		
		
		//Direction
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigDirection()) {
			if (vehicleModel.getStateThrottleVal() < vehicleModel.getConfigThrottleMaxDirChange()) { 
				vehicleModel.setStateDirectionOn();
				myHplApp.controller.playSoundEffect({'effect': 'pulse1', 'volume': 0.5});
				if (vehicleModel.getStateDirectionVal() == vehicleModel.getInstructionDirectionForward()) {
					vehicleModel.setStateDirectionVal(vehicleModel.getInstructionDirectionReverse());
					sap.ui.getCore().byId("viewCockpit").getController().setTextDirectionReverse();
				}
				else
				{
					vehicleModel.setStateDirectionVal(vehicleModel.getInstructionDirectionForward());
					sap.ui.getCore().byId("viewCockpit").getController().setTextDirectionForward();
				}
				  			
				message = vehicleModel.getStateDirectionVal() + ':'  + vehicleModel.getInstructionThrottle() + vehicleModel.getStateThrottleVal() + model.getConfigMsgTerminator();
				cockpitController.emitControl(message);
				console.log(message);
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdDirection(), vehicleModel.getStateDirectionVal());
			}
		}


		//Stop
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigStop() ) {
			vehicleModel.setStateStopOn();	
			cockpitController.emitControl(vehicleModel.getInstructionStop());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdStop(), missioncontrolModel.getMessageIdStop());
			cockpitModel.setIndicatorVal({id: 'lblIndStop', val: 1});
			myHplApp.controller.playSoundEffect({'effect': 'powerDown', 'volume': 0.5});
		}


		//Fire
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigFire() ) {
			weapons = vehicleModel.getWeapons();
			for (var i = 0; i < weapons.loadout.length; i++) {
			    if (weapons.loadout[i].active) {
			    	if (vehicleModel.getWeaponRemainingAmmo(i) > 0)
						vehicleModel.setWeaponFiringPulseStart(i);
			    		cockpitController.emitControl(weapons.loadout[i].fireInstruction);
						missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdWeaponFire(), weapons.loadout[i].fireInstruction + weapons.loadout[i].id);
						console.log(weapons.loadout[i].fireInstruction);
						var soundEffectFire = myHplApp.model.getSoundEffectByName(weapons.loadout[i].soundEffectFire);
						soundEffectFire.addEventListener('ended', function(){	this.currentTime = 0;
																				this.play();
																	  		}, false);
						soundEffectFire.play();
			    }
			}		
		}
	
		
		//Cam Pan Left
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanLeft()) {
			cockpitController.emitControl(vehicleModel.getInstructionCamPanLeft());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdCamera(), vehicleModel.getInstructionCamPanLeft());	
		}
				

		//Cam Pan Right
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanRight()) {
			cockpitController.emitControl(vehicleModel.getInstructionCamPanRight());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdCamera(), vehicleModel.getInstructionCamPanRight());
		}

		
		//Cam Tilt Up
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltUp()) {
			cockpitController.emitControl(vehicleModel.getInstructionCamTiltUp());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdCamera(), vehicleModel.getInstructionCamTiltUp());
		}

		
		//Cam Tilt Down			
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltDown()) {
			cockpitController.emitControl(vehicleModel.getInstructionCamTiltDown());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdCamera(), vehicleModel.getInstructionCamTiltDown());
		}
				

		//Map Change Type
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigGoogleMapTypeChange()) {	
			
			switch (cockpitMapsModel.getStateGoogleMapLastMapType()) {
				case cockpitMapsModel.getConfigGoogleMapRoad():
					cockpitMapsModel.setMapTypeIdSatellite();				
					myHplApp.controller.playSoundEffect({'effect': 'click9', 'volume': 0.5});
					break;
				case cockpitMapsModel.getConfigGoogleMapSatellite():
					cockpitMapsModel.setMapTypeIdRoad();
					myHplApp.controller.playSoundEffect({'effect': 'click8', 'volume': 0.5});
					break;
			}
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdMapType(), cockpitMapsModel.getStateGoogleMapLastMapType());
		}
				

		//Laser toggle				
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigToggleLaser()) {
			cockpitController.emitControl(vehicleModel.getInstructionToggleLaser());
			vehicleModel.setStateLaserVal();

			if (vehicleModel.getStateLaserVal()) {
				$('#mlPaneLaserIndicator').css('opacity', '1');
				myHplApp.controller.playSoundEffect({'effect': 'laserPowerOn', 'volume': 0.5});		
			}
			else {
				$('#mlPaneLaserIndicator').css('opacity', '0');
				myHplApp.controller.playSoundEffect({'effect': 'laserPowerOff', 'volume': 0.5});
				
			}		
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdLaser(), vehicleModel.getStateLaserVal());
		}


		//Weapon toggle				
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigToggleWeapon()) {
			vehicleModel.setWeaponActiveSelected();
			weapons = vehicleModel.getWeapons();
			for (var i = 0; i < weapons.loadout.length; i++) {
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdWeaponActive(), weapons.loadout[i].active + weapons.loadout[i].id);
			    if (weapons.loadout[i].active) {
					$('#' + weapons.loadout[i].stateId).attr('src', weapons.loadout[i].imgActive);
			    }
			    else
			    {
					$('#' + weapons.loadout[i].stateId).attr('src', weapons.loadout[i].imgInactive);
			    }			    
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
		var missioncontrolModel 				= myHplApp.missioncontrol.model;
		var missioncontrolController 			= myHplApp.missioncontrol.controller;
		var weapons;
		
		if (!cockpitModel.getStateActive()) {
			return;
		}

		
		//Fire
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigFire() ) {
			weapons = vehicleModel.getWeapons();
			for (var i = 0; i < weapons.loadout.length; i++) {
			    if (weapons.loadout[i].active) {
			    	cockpitController.emitControl(weapons.loadout[i].stopInstruction);
			    	vehicleModel.setWeaponFiringPulseEnd(i);
					missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdWeaponStop(), weapons.loadout[i].stopInstruction + weapons.loadout[i].id);
					console.log(weapons.loadout[i].stopInstruction);
					vehicleModel.setWeaponRemainingAmmo(i);
					setTimeout(function(myWeapons, myWeaponsIndex){ myHplApp.controller.playSoundEffect({'effect': myWeapons.loadout[myWeaponsIndex].soundEffectSpindown, 'volume': 0.5});
					   					   							myHplApp.controller.stopSoundEffect(myWeapons.loadout[myWeaponsIndex].soundEffectFire);
					 					  						  }(weapons, i),400);
					cockpitModel.setGaugeVal({id: weapons.loadout[i].ammoGauge, val: myHplApp.vehicle.model.getWeaponRemainingAmmoPct(i)});
					vehicleModel.resetWeaponFiringPulseStart(i);
			    }

			}
		}

		
		//Cam Pan
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanLeft() || gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanRight()) {
			cockpitController.emitControl(vehicleModel.getInstructionCamPanStop());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdCamera(), vehicleModel.getInstructionCamPanStop());			
		}
				
		
		//Cam Tilt
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltUp() || gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltDown()) {
			cockpitController.emitControl(vehicleModel.getInstructionCamTiltStop());			
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdCamera(), vehicleModel.getInstructionCamTiltStop());
		}
				
			
	};


	myHplApp.cockpit.controls.controller.gamepad_axis_changed = function(gamepadEvent) {
		var vehicleModel 						= myHplApp.vehicle.model;		
		var cockpitController 					= myHplApp.cockpit.controller;
		var cockpitModel 						= myHplApp.cockpit.model;
		var cockpitControlsModel 				= myHplApp.cockpit.controls.model;	
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
				message = message + vehicleModel.getStateDirectionVal() + ':'  + vehicleModel.getInstructionThrottle() + throttle + ':';
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdThrust(), throttle);
			}
			
			cockpitModel.setGaugeVal({id: 'gaugeThrust', val: throttle});
		}
		    
		
		//Heading
		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigHeading()) {
			var heading = parseFloat(gamepadEvent.value);
			vehicleModel.setStateHeadingOn();
			heading = heading * 100;
			heading = heading.toFixed(0);
			message = message + vehicleModel.getInstructionHeading()  + heading + ':';
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdHeading(), heading);

		}

		
		//Rotate
		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigRotate() && vehicleModel.getStateThrottleVal() == 0) {
			var rotate = parseFloat(gamepadEvent.value);			
			vehicleModel.setStateRotateOn();
			rotate = rotate * 100;
			rotate = rotate.toFixed(0);	
			if (rotate != vehicleModel.getStateRotateVal()) {
				vehicleModel.setStateRotateVal(rotate);
				message = message + vehicleModel.getInstructionRotate()  + rotate + ':';
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdRotate(), rotate);
			}
		}
		
		    
		if (message != '') {
			message = message + ']';    
			cockpitController.emitControl(message);
		}


		//Map Zoom
 		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigGoogleMapZoom()){
 			var lastZoom = cockpitMapsModel.getStateGoogleMapLastZoom();
			var zoom = parseFloat(gamepadEvent.value);
			zoom = zoom * 10;
			zoom = zoom.toFixed(0);
				
			if (zoom != lastZoom) {
				if (zoom > lastZoom) {
					myHplApp.controller.playSoundEffect({'effect': 'click6', 'volume': 0.5});
				}
				else {
					myHplApp.controller.playSoundEffect({'effect': 'click5', 'volume': 0.5});
				}				
				
				cockpitMapsModel.setStateGoogleMapLastZoom(zoom);
			    zoom = parseInt(cockpitMapsModel.getStateGoogleMapLastZoom(), 10) + parseInt(cockpitMapsModel.getConfigGoogleMapZoomBase(), 10);
			    cockpitMapsModel.setMapZoom(zoom);
			    cockpitMapsModel.setMapCenter();
				missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdMapZoom(), zoom);
			}
		}
 		
		
	};

} (myHplApp = window.myHplApp || {}));	
	