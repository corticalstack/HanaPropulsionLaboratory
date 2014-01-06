sap.ui.controller("cockpit_ui_resources.cockpit", {
	
	
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {
	

	},

	
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
	onBeforeRendering: function() {
		//   alert('Controller before rendering');

	},

	
	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
	   onAfterRendering: function() {
	//
			$("#gyroContainer").parent().css({"overflow":"visible"});
	   },

	
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
	onExit: function() {
		myHplApp.cockpit.controller.setStateActive(false);
	},
	
	
	
	connect: function(data) {
		//sap.ui.getCore().byId("tvStatus").setText(data);		 
	},
	
	
	wildcard: function() {		
		//sap.ui.getCore().byId("tvStatus").setText('Hello');
	},
	

	feed: function(data) {
		var vehicleModel 				= myHplApp.vehicle.model;
		var vehicleCmdModel 			= myHplApp.vehicle.cmd.model;
		var missioncontrolModel	 		= myHplApp.missioncontrol.model;
		var missioncontrolController 	= myHplApp.missioncontrol.controller;
		var cockpitModel 				= myHplApp.cockpit.model;
		var cockpitMapsModel			= myHplApp.cockpit.maps.model;
		var message;

		//Power message
		if (data.substr(0,1) == 'B') {
			var inertialsensor_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdPower(), missioncontrolModel.getMessageIdBattery(), message );
			
			cockpitModel.refreshGauge({id: 'gaugeVoltage', val: inertialsensor_msg_fields[0].substr(1)});
			cockpitModel.refreshGauge({id: 'gaugeCurrent', val: inertialsensor_msg_fields[1]});
			cockpitModel.refreshGauge({id: 'gaugeAmps', val: inertialsensor_msg_fields[2]});
			cockpitModel.refreshGauge({id: 'gaugeConsumedMah', val: inertialsensor_msg_fields[3]});
			cockpitModel.refreshGauge({id: 'gaugeBattRemaining', val: inertialsensor_msg_fields[4]});
		};

		
		//Compass message
		if (data.substr(0,1) == 'C') {
			var compass_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdNavigation(), missioncontrolModel.getMessageIdCompass(), message );
			
			var compassHeading = parseInt(compass_msg_fields[0].substr(1), 10);
			sap.ui.getCore().byId("lblCompassVal").setText(compassHeading + '°');		
			$('#imgCompassIndicator').css('-webkit-transform', 'rotate(' + compassHeading + 'deg)');
		};


		//Distance sensors message
		if (data.substr(0,1) == 'D') {
			var distance_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdDistance(), message );
			cockpitModel.refreshGauge({id: 'gaugeRearProximitySensor', val: distance_msg_fields[0].substr(1)});
			cockpitModel.refreshGauge({id: 'gaugeFrontProximitySensor', val: distance_msg_fields[1]});
			cockpitModel.refreshGauge({id: 'gaugeCamProximitySensor', val: distance_msg_fields[2]});
		};


		
		//camera message
		if (data.substr(0,1) == 'F') {
			var camera_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), message);
			vehicleModel.setStateCamPanVal(camera_msg_fields[0].substr(1));
			sap.ui.getCore().byId("viewCockpit").getController().setCamPan();
		};

		
		//Inertial sensor message
		if (data.substr(0,1) == 'I') {
			var inertialsensor_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdInertial(), message );			
//			sap.ui.getCore().byId("TvInsAccelX").setText(inertialsensor_msg_fields[0].substr(1));
//			sap.ui.getCore().byId("TvInsAccelY").setText(inertialsensor_msg_fields[1]);
//			sap.ui.getCore().byId("TvInsAccelZ").setText(inertialsensor_msg_fields[2]);
//			sap.ui.getCore().byId("TvInsGyroX").setText(inertialsensor_msg_fields[3]);
//			sap.ui.getCore().byId("TvInsGyroY").setText(inertialsensor_msg_fields[4]);
//			sap.ui.getCore().byId("TvInsGyroZ").setText(inertialsensor_msg_fields[5]);
			
			var accelx 		= inertialsensor_msg_fields[0].substr(1);
			var accely 		= inertialsensor_msg_fields[1];
			var accelz 		= inertialsensor_msg_fields[2];
			var coreTemp   	= inertialsensor_msg_fields[3];
			
			accelx = accelx * -10;
			accely = accely * -10;
			accelz = accelz * -10;
			$('#gyroBox')[0].style.webkitTransform = "rotateX("+accelx+"deg) rotateZ("+accely+"deg) translateZ( 74px )";// 
			cockpitModel.refreshGauge({id: 'gaugeCoreTemp', val: coreTemp});
		};

		
		//Motors thrust message
		if (data.substr(0,1) == 'M') {
			var motors_thrust_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdDrive(), missioncontrolModel.getMessageIdThrust(), message );	
			console.log(vehicleModel.getStateDirectionVal());
			sap.ui.getCore().byId("lblValLeftEngineThrust").setText(motors_thrust_msg_fields[0].substr(1) - 90);
			sap.ui.getCore().byId("lblValRightEngineThrust").setText(motors_thrust_msg_fields[1] - 90);
			cockpitModel.refreshIndicator({id: 'lblStatusLeftEngineThrust', val: motors_thrust_msg_fields[0].substr(1) - 90});
			cockpitModel.refreshIndicator({id: 'lblStatusRightEngineThrust', val: motors_thrust_msg_fields[1] - 90});
		};
		
		
		//GPS Sol message
		if (data.substr(0,1) == 'S') {
			var gps_msg_nav_sol_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdNavigation(), missioncontrolModel.getMessageIdGpsSol(), message );
			
			switch(gps_msg_nav_sol_fields[0].substr(1)) {
				case '2':
					sap.ui.getCore().byId("lblValFixType").setText('2D');
					break;
				case '3':
					sap.ui.getCore().byId("lblValFixType").setText('3D');
					break;
			}
			
			sap.ui.getCore().byId("lblValSatellites").setText(gps_msg_nav_sol_fields[1]);
			cockpitModel.refreshIndicator({id: 'lblStatusFixType', val: gps_msg_nav_sol_fields[0].substr(1)});
			cockpitModel.refreshIndicator({id: 'lblStatusSatellites', val: gps_msg_nav_sol_fields[1]});
			missioncontrolController.checkSetHomeLatLng();
		};
		

		//GPS posllh message
		if (data.substr(0,1) == 'P') {
			var gps_msg_nav_posllh_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdNavigation(), missioncontrolModel.getMessageIdGpsPos(), message );
			
			var longitude 	= parseFloat(gps_msg_nav_posllh_fields[0].substr(1), 10);
			var lattitude 	= parseFloat(gps_msg_nav_posllh_fields[1], 10);
			var altitude  	= parseFloat(gps_msg_nav_posllh_fields[2], 10);
			
			longitude 		= longitude / 10000000;
			lattitude 		= lattitude / 10000000;
			altitude 		= altitude / 1000;
			altitude 		= altitude.toFixed(2);

			cockpitMapsModel.setStateGoogleMapLastLongitude(longitude);
			cockpitMapsModel.setStateGoogleMapLastLattitude(lattitude);
			cockpitMapsModel.setStateLatLng();
			cockpitMapsModel.setPosition();
			cockpitMapsModel.panTo();
			sap.ui.getCore().byId("lblValLongitude").setText(longitude);
			sap.ui.getCore().byId("lblValLattitude").setText(lattitude);
			sap.ui.getCore().byId("lblValAltitude").setText(altitude);
			missioncontrolModel.setCurrentLattitude(lattitude);
			missioncontrolModel.setCurrentLongitude(longitude);
			cockpitModel.refreshIndicator({id: 'lblStatusLattitude', val: lattitude});
			cockpitModel.refreshIndicator({id: 'lblStatusLongitude', val: longitude});
			cockpitModel.refreshIndicator({id: 'lblStatusAltitude', val: altitude});
			sap.ui.getCore().byId("viewCockpit").getController().refreshWaypoint();			
		};


		//GPS velned message
		if (data.substr(0,1) == 'V') {
			var gps_msg_nav_velned_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.messagePump(missioncontrolModel.getMessageCategoryIdNavigation(), missioncontrolModel.getMessageIdGpsVel(), message );
			
			var heading = parseFloat(gps_msg_nav_velned_fields[1], 10);
			heading 	= heading / 100000;
			heading     = heading.toFixed(0);
			sap.ui.getCore().byId("lblValSpeedCms").setText(gps_msg_nav_velned_fields[0].substr(1));	
			sap.ui.getCore().byId("lblValHeading").setText(heading + '°');
			cockpitModel.refreshIndicator({id: 'lblStatusSpeedCms', val: gps_msg_nav_velned_fields[0].substr(1)});
			cockpitModel.refreshIndicator({id: 'lblStatusHeading', val: heading});
		};
				
	},
	
	
	gamepad_button_down: function(gamepadEvent) {
	

		if (gamepadEvent.control == gamepadCmdThrottlePadLeft) {
			infoPanelIndex--;
			
			if (infoPanelIndex < infoPanelIndexMin) {
			   infoPanelIndex = infoPanelIndexMax;
			}
			
			sap.ui.getCore().byId("TabStrip1").setSelectedIndex(infoPanelIndex);
		}
		
		
		if (gamepadEvent.control == gamepadCmdThrottlePadRight) {
			infoPanelIndex++;
			
			if (infoPanelIndex > infoPanelIndexMax) {
			   infoPanelIndex = infoPanelIndexMin;
			}

			sap.ui.getCore().byId("TabStrip1").setSelectedIndex(infoPanelIndex);
		}
	},
	
	
	
	
	execute: function(oEvent,oController){
	
	},
	
	
	refreshIndicators: function() {
		console.log('Cockpit controller - refreshing indicators....');
		var myIndicators = myHplApp.cockpit.model.getIndicators();

		//First pass to remove previously assigned classes
		for (var i = 0; i < myIndicators.length; i++) {
		    if (myIndicators[i].refresh == true) {
	    		$('#' + myIndicators[i].id).removeClass(myIndicators[i].cssClass);
		    }
		}
		
		
		//Second pass assigns class according to current value against defined range
		for (var i = 0; i < myIndicators.length; i++) {
			var applyClass	= '';
		    if (myIndicators[i].refresh == true) {
	    		myHplApp.cockpit.model.setIndicatorClearRefresh(i);
	    		console.log(myIndicators[i].value, myIndicators[i].min, myIndicators[i].max);
		    	if (myIndicators[i].value >= myIndicators[i].min && myIndicators[i].value <= myIndicators[i].max) {
		    		applyClass = myIndicators[i].cssClass;
		    		console.log(applyClass);
		    		console.log(myIndicators[i].id);
		    	}
		    }
		    if (applyClass != '') {
	    		$('#' + myIndicators[i].id).addClass(applyClass);
	    	}
	    }
		
	},
	

	setTextDirectionForward: function(){
		sap.ui.getCore().byId("lblIndDriveDirection").setText(myHplApp.controller.getTextFromBundle("forward"));
	},


	setTextDirectionReverse: function(){
		sap.ui.getCore().byId("lblIndDriveDirection").setText(myHplApp.controller.getTextFromBundle("reverse"));
	},

	
	
	refreshWaypoint: function() {
		
		//Only update bearing if we know we now have a solid GPS 3D fix
		if (myHplApp.missioncontrol.model.getGps3DFixCount() < 11) {
			return;
		}
		
		var bearing = 	myHplApp.controller.Bearing(myHplApp.missioncontrol.model.getCurrentLattitude(),
						myHplApp.missioncontrol.model.getCurrentLongitude(),
						myHplApp.missioncontrol.model.getHomeLattitude(),
						myHplApp.missioncontrol.model.getHomeLongitude());
		cockpitModel.refreshIndicator({id: 'lblStatusBearingWp', val: bearing});
		sap.ui.getCore().byId("lblWaypointVal").setText(bearing + '°');
		sap.ui.getCore().byId("lblValBearingWp").setText(bearing + '°');
		
		$('#imgWaypointIndicator').css('-webkit-transform', 'rotate(' + bearing + 'deg)');
		
		var distance = 	myHplApp.controller.Distance(myHplApp.missioncontrol.model.getCurrentLattitude(), 
				  		myHplApp.missioncontrol.model.getCurrentLongitude(),
				  		myHplApp.missioncontrol.model.getHomeLattitude(),
				  		myHplApp.missioncontrol.model.getHomeLongitude());
		cockpitModel.refreshIndicator({id: 'lblStatusDistanceWp', val: distance});
		
		sap.ui.getCore().byId("lblValDistanceToWaypoint").setText(distance + 'm');
		sap.ui.getCore().byId("lblValDistanceWp").setText(distance + 'm');
		
	},
	
	
	setCamPan: function() {
		var camPanVal = (myHplApp.vehicle.model.getStateCamPanVal() - 90);
		sap.ui.getCore().byId("lblCamPanVal").setText(camPanVal + '°');
		if (camPanVal < 0) {
			$('#imgCamPanindicator').css('-webkit-transform', 'rotate(' + (360 + camPanVal) + 'deg)');
		}
		else
		{
			$('#imgCamPanindicator').css('-webkit-transform', 'rotate(' + camPanVal + 'deg)');
		}
	}
	
});

