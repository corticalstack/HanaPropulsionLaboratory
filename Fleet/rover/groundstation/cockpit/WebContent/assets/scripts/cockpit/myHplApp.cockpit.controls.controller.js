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
		var message = '';
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigDirection() && 
			vehicleModel.getStateThrottleVal() < vehicleModel.getConfigThrottleMaxDirChange() && 
			vehicleModel.getStateStop() == false) { 
			vehicleModel.setStateDirectionOn();
			if (vehicleModel.getStateDirectionVal() == vehicleCmdModel.getInstructionDirectionForward()) {
				vehicleModel.setStateDirectionVal(vehicleCmdModel.getInstructionDirectionReverse());
			}
			else
			{
				vehicleModel.setStateDirectionVal(vehicleCmdModel.getInstructionDirectionForward());
			}
				  
			
			message = vehicleModel.getStateDirectionVal() + ':'  + vehicleCmdModel.getInstructionThrottle + vehicleModel.getStateThrottleVal() + model.config.msgTerminator;
			cockpitController.emitControl(message);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdDrive(), missioncontrolModel.getMessageIdMotor(), message );
		}


		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigStop() ) {
			vehicleModel.setStateStopOn();		 
			cockpitController.emitControl(vehicleCmdModel.getInstructionStop());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdDrive(), missioncontrolModel.getMessageIdMotor(), vehicleCmdModel.getInstructionStop());
		}


		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanLeft()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamPanLeft());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamPanLeft());			
		}
				
			
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanRight()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamPanRight());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamPanRight());
		}

			
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltUp()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamTiltUp());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamTiltUp());
		}

			
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltDown()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamTiltDown());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamTiltDown());
		}
				

		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigGoogleMapTypeChange()) {
			switch (cockpitMapsModel.getStateGoogleMapLastMapType()) {
				case cockpitMapsModel.getConfigGoogleMapRoad():
					cockpitMapsModel.setMapTypeIdSatellite();
					break;
				case cockpitMapsModel.getConfigGoogleMapSatellite():
					cockpitMapsModel.setMapTypeIdRoad();
					break;
			}
		}
				
				
				
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigToggleHeadlights()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionToggleHeadlights());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdLights(), missioncontrolModel.getMessageIdHeadlights(), vehicleCmdModel.getInstructionToggleHeadlights());
		}

		
//		if (gamepadEvent.control == gamepadCmdThrottlePadLeft) {
//			sap.ui.getCore().byId("viewCockpit").getController().gamepad_button_down(gamepadEvent);
//		}

		
//		if (gamepadEvent.control == gamepadCmdThrottlePadRight) {
//			sap.ui.getCore().byId("viewCockpit").getController().gamepad_button_down(gamepadEvent);
//		}

	};


	myHplApp.cockpit.controls.controller.gamepad_button_up = function(gamepadEvent) {
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanLeft() || gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamPanRight()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamPanStop());
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamPanStop());			
		}
				
				
		if (gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltUp() || gamepadEvent.control == cockpitControlsModel.getDeviceConfigCamTiltDown()) {
			cockpitController.emitControl(vehicleCmdModel.getInstructionCamTiltStop());			
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), vehicleCmdModel.getInstructionCamTiltStop());
		}
			
	};


	myHplApp.cockpit.controls.controller.gamepad_axis_changed = function(gamepadEvent) {
		var message = '';

		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigThrottle()) {
			var speed = parseFloat(gamepadEvent.value);
			speed = speed * 100;
			var speed1 = speed.toFixed(0);	
			if (speed1 < cockpitControlsModel.getDeviceConfigThrottleDeadzoneVal()) {
				speed1 = 0;
			}
				   

			if (speed1 == 0) {
				vehicleModel.setStateStopOff();
			}
				  

			if (vehicleModel.getStateStop() == false && speed1 != vehicleModel.getStateThrottleVal()) {
				vehicleModel.setStateThrottleOn();
				vehicleModel.setStateThrottleVal(speed1);
				message = message + vehicleModel.getStateDirectionVal() + ':'  + vehicleCmdModel.getInstructionThrottle() + speed1 + ':';
			}
			
			cockpitModel.refreshGauge({id: 'gaugeThrust', val: speed1});
		}
		    
			
		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigHeading()) {
			vehicleModel.setStateHeadingOn();
			var heading = parseFloat(gamepadEvent.value);
			heading = heading * 100;
			var heading1 = heading.toFixed(0);	
			message = message + vehicleCmdModel.getInstructionHeading()  + heading1 + ':';
		}

		    
		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigRotate() && vehicleModel.getStateThrottleVal() == 0) {
			vehicleModel.setStateRotateOn();
			var rotate = parseFloat(gamepadEvent.value);
			rotate = rotate * 100;
			var rotate1 = rotate.toFixed(0);	
			if (rotate1 != vehicleModel.getStateRotateVal()) {
				vehicleModel.setStateRotateVal(rotate1);
				message = message + vehicleCmdModel.getInstructionRotate()  + rotate1 + ':';
			}
		}

		    
		if (message != '') {
			message = message + ']';    
			cockpitController.emitControl(message);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdDrive(), missioncontrolModel.getMessageIdMotor(), message);
		}

				
 		if (gamepadEvent.axis == cockpitControlsModel.getDeviceConfigGoogleMapZoom()){
			var zoom = parseFloat(gamepadEvent.value);
			zoom = zoom * 10;
			zoom = zoom.toFixed(0);
			if (zoom == 0) {
				zoom = 11;
			}
				
			if (zoom != cockpitMapsModel.getStateGoogleMapLastZoom()) {
				cockpitMapsModel.setStateGoogleMapLastZoom(zoom);
			    var tempzoom = parseInt(cockpitMapsModel.getStateGoogleMapLastZoom(), 10) + parseInt(cockpitMapsModel.getConfigGoogleMapZoomBase(), 10); 
			    cockpitMapsModel.setMapZoom(tempzoom);
			    cockpitMapsModel.setMapCenter();
			}
		}
	};

} (myHplApp = window.myHplApp || {}));	
	