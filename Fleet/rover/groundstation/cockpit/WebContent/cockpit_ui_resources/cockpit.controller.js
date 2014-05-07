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
		$("#gyroContainer").parent().css({"overflow":"visible"});
	    $("#gaugeCurrent").parent().css({"overflow":"visible"});
	    $("#gaugeAmps").parent().css({"overflow":"visible"});
	    $("#gaugeConsumedMah").parent().css({"overflow":"visible"});
	    $("#gaugeBattRemaining").parent().css({"overflow":"visible"});
	    $(".sapUiTableVScr").css({"overflow-x":"hidden"});
	    $(".sapUiTableVScr").css({"overflow-y":"hidden"});
	    $(".sapUiTableVSb").css({"overflow-x":"hidden"});
	    $(".sapUiTableVSb").css({"overflow-y":"hidden"});

			
	    sap.ui.getCore().byId("viewCockpit").getController().drawCrosshair();
	    
	    var pilot   = myHplApp.pilot.model.getPilotById(myHplApp.missioncontrol.model.getActivePilotId());		
		$('#imgPilotPortrait').attr('src', pilot.portraitUri);			
	},

	
	init: function() {
	},
	
	
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
	onExit: function() {
		myHplApp.missioncontrol.controller.missionLogPump(missioncontrolModel.getMessageCategoryIdCockpit(), missioncontrolModel.getMessageIdStop(), vehicleModel.getInstructionStop());  //Inject initial stop
		myHplApp.cockpit.controller.setStateActive(false);
		myHplApp.cockpit.controller.clearTicks();
		
	},
	
	
	
	connect: function(data) {
		//sap.ui.getCore().byId("tvStatus").setText(data);		 
	},
	
	
	wildcard: function() {		
		//sap.ui.getCore().byId("tvStatus").setText('Hello');
	},
	

	feed: function(data) {
		var vehicleModel 				= myHplApp.vehicle.model;
		var missioncontrolModel	 		= myHplApp.missioncontrol.model;
		var missioncontrolController 	= myHplApp.missioncontrol.controller;
		var cockpitModel 				= myHplApp.cockpit.model;
		var cockpitMapsModel			= myHplApp.cockpit.maps.model;
		var message;

		
		//Add feed length to network traffic in count
		missioncontrolModel.addNetworkPacketIn(data.length);
		
		
		//Notify message
		if (data.substr(0,1) == 'N') {
			var notify_msg_fields = data.split(',');
			message = data.substr(1);
			switch(notify_msg_fields[0].substr(1,1)) {
				case 'A':	//Arming
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdArming(), message);
					myHplApp.model.setMessage(myHplApp.controller.getTextFromBundle("arming"));
					break;
					
				case 'B':	//Armed
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdArmed(), message);
					myHplApp.model.setMessage(myHplApp.controller.getTextFromBundle("armed"));
					myHplApp.controller.playSoundEffect({'effect': 'voiceallsystemsactive', 'volume': 0.5});
					break;
					
				case 'C':  	//Comms
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdCommsTick(), message);					
					var inboundTickSpan = parseInt(notify_msg_fields[0].substr(2), 10);
					var tickNow = new Date().getTime();
					missioncontrolModel.setStateLastInboundCommsTick(tickNow);
					missioncontrolModel.setStateLastInboundCommsTickSpan(inboundTickSpan);
					break;
					
				case 'I':	//Inertial Initialised
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdInertialInit(), message);
					myHplApp.model.setMessage(myHplApp.controller.getTextFromBundle("inertialinit"));
					myHplApp.controller.playSoundEffect({'effect': 'voiceholographicimagingactivated', 'volume': 0.5});
					break;

				case 'G':	//GPS Initialised
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdGpsInit(), message);
					myHplApp.model.setMessage(myHplApp.controller.getTextFromBundle("gpsinit"));
					break;
					
				case 'M':	//Compass Initialised
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdCompassInit(), message);
					myHplApp.model.setMessage(myHplApp.controller.getTextFromBundle("compassinit"));
					break;
					
				case 'P':	//Power Failsafe
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdPowerFailsafe(), message);
					cockpitModel.setIndicatorVal({id: 'lblIndPowerFailsafe', val: 1});
					break;
					
				case 'S':	//Systems Power Up
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdSystemsPowerUp(), message);
					myHplApp.model.setMessage(myHplApp.controller.getTextFromBundle("systemspowerup"));
					myHplApp.controller.playSoundEffect({'effect': 'voicelaunchsequenceactivated', 'volume': 0.5});
					break;
					
				case 'T':	//Thrust Failsafe
					missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNotify(), missioncontrolModel.getMessageIdThrustFailsafe(), message);
					cockpitModel.setIndicatorVal({id: 'lblIndThrustFailsafe', val: 1});					
					break;
			}
		}
				
		
		//Power message
		if (data.substr(0,1) == 'B') {
			var inertialsensor_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdPower(), missioncontrolModel.getMessageIdBattery(), message );
			
			cockpitModel.setGaugeVal({id: 'gaugeVoltage', val: inertialsensor_msg_fields[0].substr(1)});
			cockpitModel.setGaugeVal({id: 'gaugeCurrent', val: inertialsensor_msg_fields[1]});
			cockpitModel.setGaugeVal({id: 'gaugeAmps', val: inertialsensor_msg_fields[2]});
			cockpitModel.setGaugeVal({id: 'gaugeConsumedMah', val: inertialsensor_msg_fields[3]});
			cockpitModel.setGaugeVal({id: 'gaugeBattRemaining', val: inertialsensor_msg_fields[4]});
			
			if (inertialsensor_msg_fields[0].substr(1) > 7.5) {
				$('#mlPaneLowBattery').css('opacity', '0');
			}
			else {
				$('#mlPaneLowBattery').css('opacity', '1');
			}
		};

		
		//Compass message
		if (data.substr(0,1) == 'C') {
			var compass_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNavigation(), missioncontrolModel.getMessageIdCompass(), message );
			
			var compassHeading = parseInt(compass_msg_fields[0].substr(1), 10);
			sap.ui.getCore().byId("lblCompassVal").setText(compassHeading + '°');		
			$('#imgCompassIndicator').css('-webkit-transform', 'rotate(' + compassHeading + 'deg)');
		};


		//Distance sensors message
		if (data.substr(0,1) == 'D') {
			var distance_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdDistance(), message );
			cockpitModel.setGaugeVal({id: 'gaugeRearProximitySensor', val: distance_msg_fields[0].substr(1)});
			cockpitModel.setGaugeVal({id: 'gaugeFrontProximitySensor', val: distance_msg_fields[1]});
			cockpitModel.setGaugeVal({id: 'gaugeCamProximitySensor', val: distance_msg_fields[2]});
		};


		
		//camera message
		if (data.substr(0,1) == 'F') {
			var camera_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdCamera(), message);
			vehicleModel.setStateCamPanVal(camera_msg_fields[0].substr(1));
			sap.ui.getCore().byId("viewCockpit").getController().setCamPan();
		};

		
		//Inertial sensor message
		if (data.substr(0,1) == 'I') {
			var inertialsensor_msg_fields = data.split(',');
			var accelx 		              = inertialsensor_msg_fields[0].substr(1);
			var accely 		              = inertialsensor_msg_fields[1];
			var accelz 		              = inertialsensor_msg_fields[2];
			var coreTemp   	              = inertialsensor_msg_fields[3];
			message = data.substr(1);
			missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdSensor(), missioncontrolModel.getMessageIdInertial(), message );			
						
			accelx = accelx * -10;
			accely = accely * -10;
			accelz = accelz * -10;
			$('#gyroBox')[0].style.webkitTransform = "rotateX("+accelx+"deg) rotateZ("+accely+"deg) translateZ( 74px )";// 
			cockpitModel.setGaugeVal({id: 'gaugeCoreTemp', val: coreTemp});
		};

		
		//Motors thrust message
		if (data.substr(0,1) == 'M') {
			var motors_thrust_msg_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdDrive(), missioncontrolModel.getMessageIdThrust(), message );	
			sap.ui.getCore().byId("lblValLeftEngineThrust").setText(motors_thrust_msg_fields[0].substr(1) - 90);
			sap.ui.getCore().byId("lblValRightEngineThrust").setText(motors_thrust_msg_fields[1] - 90);
			cockpitModel.setIndicatorVal({id: 'lblStatusLeftEngineThrust', val: motors_thrust_msg_fields[0].substr(1) - 90});
			cockpitModel.setIndicatorVal({id: 'lblStatusRightEngineThrust', val: motors_thrust_msg_fields[1] - 90});
			if (motors_thrust_msg_fields[0].substr(1) != 90 && motors_thrust_msg_fields[1] != 90) {
				cockpitModel.setIndicatorVal({id: 'lblIndThrustFailsafe', val: 0});
				cockpitModel.setIndicatorVal({id: 'lblIndPowerFailsafe', val: 0});
			}
		};
		
		
		//GPS Sol message
		if (data.substr(0,1) == 'S') {			
			var gps_msg_nav_sol_fields = data.split(',');
			message = data.substr(1);
			missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNavigation(), missioncontrolModel.getMessageIdGpsSol(), message );
			
			switch(gps_msg_nav_sol_fields[0].substr(1)) {
				case '2':
					break;
				case '3':
					missioncontrolController.checkSetHomeLatLngAlt();
					break;
			}
			
			sap.ui.getCore().byId("lblValSatellites").setText(gps_msg_nav_sol_fields[1]);
			cockpitModel.setIndicatorVal({id: 'lblStatusSatellites', val: gps_msg_nav_sol_fields[1]});

		};
		

		//GPS posllh message 
		if (data.substr(0,1) == 'P') {			
			var gps_msg_nav_posllh_fields = data.split(',');
			var longitude 	                 = parseFloat(gps_msg_nav_posllh_fields[0].substr(1), 10);
			var latitude 	                 = parseFloat(gps_msg_nav_posllh_fields[1], 10);
			var altitude  	                 = parseFloat(gps_msg_nav_posllh_fields[2], 10);
			var distanceTravelledPrevToHereM = 0;
			
			longitude 		                 = longitude / 10000000;
			latitude 		                 = latitude / 10000000;
			altitude 		                 = altitude / 1000;
			altitude 		                 = altitude.toFixed(2);

			missioncontrolModel.setPreviousLatitude(myHplApp.missioncontrol.model.getCurrentLatitude());
			missioncontrolModel.setPreviousLongitude(myHplApp.missioncontrol.model.getCurrentLongitude());
			missioncontrolModel.setPreviousAltitude(myHplApp.missioncontrol.model.getCurrentAltitude());
			
			missioncontrolModel.setCurrentLatitude(latitude);
			missioncontrolModel.setCurrentLongitude(longitude);
			missioncontrolModel.setCurrentAltitude(altitude);
			
			//Have a solid GPS 3D fix
			if (missioncontrolModel.getGps3DFixCount() > 10) {
				
				
				

				distanceTravelledPrevToHereM = myHplApp.controller.Distance(latitude, 
						                                                    longitude,
								                                            myHplApp.missioncontrol.model.getPreviousLatitude(),
								                                            myHplApp.missioncontrol.model.getPreviousLongitude());
										
				message = longitude + ',' + latitude + ',' + altitude + ',' + distanceTravelledPrevToHereM;
				missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNavigation(), missioncontrolModel.getMessageIdGpsPos(), message );

				cockpitMapsModel.setStateGoogleMapLastLongitude(longitude);
				cockpitMapsModel.setStateGoogleMapLastLatitude(latitude);
				cockpitMapsModel.setStateLatLng();
				cockpitMapsModel.setPosition();
				cockpitMapsModel.panTo();
				sap.ui.getCore().byId("lblValLongitude").setText(longitude);
				sap.ui.getCore().byId("lblValLatitude").setText(latitude);
				sap.ui.getCore().byId("lblValAltitude").setText(altitude);
		
				cockpitModel.setIndicatorVal({id: 'lblStatusLatitude', val: latitude});
				cockpitModel.setIndicatorVal({id: 'lblStatusLongitude', val: longitude});
				cockpitModel.setIndicatorVal({id: 'lblStatusAltitude', val: altitude});
				sap.ui.getCore().byId("viewCockpit").getController().refreshWaypoint();
			}
		};


		//GPS velned message - Only interested if we have a solid GPS 3D fix
		if (data.substr(0,1) == 'V' && missioncontrolModel.getGps3DFixCount() > 10) {
			var gps_msg_nav_velned_fields = data.split(',');
			var heading = parseFloat(gps_msg_nav_velned_fields[1], 10);
			heading 	= heading / 100000;
			heading     = heading.toFixed(0);
			message     = gps_msg_nav_velned_fields[0].substr(1) + ',' + heading;
			missioncontrolController.missionLogPump(missioncontrolModel.getMessageCategoryIdNavigation(), missioncontrolModel.getMessageIdGpsVel(), message );
			sap.ui.getCore().byId("lblValSpeedCms").setText(gps_msg_nav_velned_fields[0].substr(1));	
			sap.ui.getCore().byId("lblValHeading").setText(heading + '°');
			cockpitModel.setIndicatorVal({id: 'lblStatusSpeedCms', val: gps_msg_nav_velned_fields[0].substr(1)});
			cockpitModel.setIndicatorVal({id: 'lblStatusHeading', val: heading});
			cockpitModel.setGaugeVal({id: 'gaugeSpeed', val: gps_msg_nav_velned_fields[0].substr(1)});
		};
				
	},
	
	
	cockpitMainRefresh: function() {
		sap.ui.getCore().byId("viewCockpit").getController().setNetworkTrafficCharts();
		sap.ui.getCore().byId("viewCockpit").getController().refreshIndicators(); 
		sap.ui.getCore().byId("viewCockpit").getController().refreshGauges();
		sap.ui.getCore().byId("viewCockpit").getController().setSignalStrength();
		sap.ui.getCore().byId("viewCockpit").getController().setThreatOrientation();
		
	},
		

	refreshIndicators: function() {
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
		    	if (myIndicators[i].value >= myIndicators[i].min && myIndicators[i].value <= myIndicators[i].max) {
		    		applyClass = myIndicators[i].cssClass;
		    	}
		    }
		    if (applyClass != '') {
	    		$('#' + myIndicators[i].id).addClass(applyClass);
	    	}
	    }
		
	},
	
	
	refreshGauges: function() {
		var myGauges = myHplApp.cockpit.model.getGauges();
		for (var i = 0; i < myGauges.length; i++) {
		    if (myGauges[i].refresh == true) {
	    		myHplApp.cockpit.model.setGaugeClearRefresh(i);
	    		myGauges[i].gauge.refresh(myGauges[i].val);
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
		var cockpitModel = myHplApp.cockpit.model;

		//Only update bearing if we know we now have a solid GPS 3D fix
		if (myHplApp.missioncontrol.model.getGps3DFixCount() < 11) {
			return;
		}
		
		var bearing = 	myHplApp.controller.Bearing(myHplApp.missioncontrol.model.getCurrentLatitude(),
													myHplApp.missioncontrol.model.getCurrentLongitude(),
													myHplApp.missioncontrol.model.getHomeLatitude(),
													myHplApp.missioncontrol.model.getHomeLongitude());

		cockpitModel.setIndicatorVal({id: 'lblStatusBearingWp', val: bearing});
		sap.ui.getCore().byId("lblWaypointVal").setText(bearing + '°');
		sap.ui.getCore().byId("lblValBearingWp").setText(bearing + '°');		
		$('#imgWaypointIndicator').css('-webkit-transform', 'rotate(' + bearing + 'deg)');		

		var distance = 	myHplApp.controller.Distance(myHplApp.missioncontrol.model.getCurrentLatitude(), 
				  									 myHplApp.missioncontrol.model.getCurrentLongitude(),
				  									 myHplApp.missioncontrol.model.getHomeLatitude(),
				  									 myHplApp.missioncontrol.model.getHomeLongitude());

		cockpitModel.setIndicatorVal({id: 'lblStatusDistanceWp', val: distance});
		
		sap.ui.getCore().byId("lblValDistanceToWaypoint").setText(distance + 'm');
		sap.ui.getCore().byId("lblValDistanceWp").setText(distance + 'm');
		
		myHplApp.missioncontrol.controller.missionLogPump(myHplApp.missioncontrol.model.getMessageCategoryIdNavigation(), myHplApp.missioncontrol.model.getMessageIdHome(), distance );
		
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
	},

	
	setNetworkTrafficTotals: function() {
		sap.ui.getCore().byId("lblValTotalTrafficIn").setText(myHplApp.missioncontrol.model.getTotalNetworkTrafficIn());
		sap.ui.getCore().byId("lblValTotalTrafficOut").setText(myHplApp.missioncontrol.model.getTotalNetworkTrafficOut());	
	},
	
	
	setNetworkTrafficCharts: function() {		
		sap.ui.getCore().byId("viewCockpit").getController().setNetworkTrafficTotals();
		
		var datasetIn 	= [{ data: myHplApp.missioncontrol.model.getDataNetworkTrafficIn(), color: "#2565B0" }];
		var datasetOut 	= [{ data: myHplApp.missioncontrol.model.getDataNetworkTrafficOut(), color: "#2565B0" }];
		
		myHplApp.missioncontrol.model.setDataNetworkTrafficIn(myHplApp.missioncontrol.model.getNetworkPacketIn());
		myHplApp.missioncontrol.model.setDataNetworkTrafficOut(myHplApp.missioncontrol.model.getNetworkPacketOut());
        $.plot($("#chartNetworkTrafficOut"), datasetOut, myHplApp.cockpit.model.getChartNetworkTrafficOutOptions());
        $.plot($("#chartNetworkTrafficIn"), datasetIn, myHplApp.cockpit.model.getChartNetworkTrafficInOptions());
		myHplApp.missioncontrol.model.resetNetworkPacketIn();
		myHplApp.missioncontrol.model.resetNetworkPacketOut();
	},

	
	setSignalStrength: function() {
		var now 	 = new Date().getTime();
		var tickSpan = myHplApp.missioncontrol.model.getStateLastInboundCommsTickSpan();
		
		if ((now - myHplApp.missioncontrol.model.getStateLastInboundCommsTick()) > 700 ) {
			tickSpan = 999;
		}
		
		if (tickSpan >= 0 && tickSpan <= 399) {
			$('#imgSignalStrength').attr('src', 'assets/images/hud/signalStrength100.png');
		}
		else if (tickSpan >= 400 && tickSpan <= 499) {
			$('#imgSignalStrength').attr('src', 'assets/images/hud/signalStrength75.png');
		}
		else if (tickSpan >= 500 && tickSpan <= 599) {
			$('#imgSignalStrength').attr('src', 'assets/images/hud/signalStrength50.png');
		}
		else if (tickSpan >= 600 && tickSpan <= 699) {
			$('#imgSignalStrength').attr('src', 'assets/images/hud/signalStrength25.png');
		}
		else {
			$('#imgSignalStrength').attr('src', 'assets/images/hud/signalStrength0.png');
		}
	
	},
	
		
	setAmmoPct: function() {
		var vehicleModel 	= myHplApp.vehicle.model;
		var cockpitModel 	= myHplApp.cockpit.model;
		var weapons 		= vehicleModel.getWeapons();
		for (var i = 0; i < weapons.loadout.length; i++) {
		    if (weapons.loadout[i].active && vehicleModel.getWeaponFiringPulseStart(i) > 0) {
		    	console.log('Ammo pct setting pulse end');
		    	vehicleModel.setWeaponFiringPulseEnd(i);
		    	console.log('Ammo pct cal remaining ammo');
		    	vehicleModel.setWeaponRemainingAmmo(i);
		    	console.log('Ammo pct set gaugae val');
		    	cockpitModel.setGaugeVal({id: weapons.loadout[i].ammoGauge, val: vehicleModel.getWeaponRemainingAmmoPct(i)});
		    	console.log('Ammo pct set pulse start');
		    	vehicleModel.setWeaponFiringPulseStart(i);
		    }	
		}
	},
	
	
	setThreatOrientation: function() {
		var myGauges = myHplApp.cockpit.model.getGauges();
		var margin  		= 0;
		var frontProximity 	= 0;
		var rearProximity 	= 0;
		for (var i = 0; i < myGauges.length; i++) {

		    if (myGauges[i].id == 'gaugeFrontProximitySensor') {
		    	frontProximity 	= parseInt(myGauges[i].val);
		    	margin 			= (frontProximity * 4) + 15;
		    	$('#threatOrientationTop').css({"margin-top":(margin * -1  ), "opacity": 1});  
		    } 
		    		
		    if (myGauges[i].id == 'gaugeRearProximitySensor') {
		    	rearProximity 	= parseInt(myGauges[i].val);
		    	margin 			= (rearProximity * 4) + 15;
		    	$('#threatOrientationBottom').css({"margin-top":margin, "opacity": 1});
		    }
	    }
		
		if ((frontProximity > 0 && frontProximity < 30) || (rearProximity > 0 && rearProximity < 30)) {
			if (!myHplApp.controller.soundEffectIsPlaying('sonarbeep1')) {
				myHplApp.controller.playSoundEffect({'effect': 'sonarbeep1', 'volume': 0.5});
			}
		}
		
//		if ((frontProximity > 0 && frontProximity < 13) || (rearProximity > 0 && rearProximity < 13)) {
//			if (!myHplApp.controller.soundEffectIsPlaying('voicewarning')) {
//				myHplApp.controller.playSoundEffect({'effect': 'voicewarning', 'volume': 0.5});
//			}				
//		}
	},
	
	
	setPilotScoreRefresh: function() {
		myHplApp.cockpit.model.getPilotScoreBreakdown().refresh();
		myHplApp.missioncontrol.controller.getPilotScore();
		sap.ui.getCore().byId("lblValPilotScore").setText(myHplApp.missioncontrol.model.getActivePilotScore());
	},


	
	setDatalinkRefresh: function() {
		myHplApp.cockpit.datalink.controller.getMissionStatsMessageCategoryId();
		var missionStatsMessageCategoryId = myHplApp.cockpit.datalink.model.getStatsMessageCategoryId();
		sap.ui.getCore().byId("lblValStatCountNavigation").setText(missionStatsMessageCategoryId.nav);
		sap.ui.getCore().byId("lblValStatCountCockpit").setText(missionStatsMessageCategoryId.coc);
		sap.ui.getCore().byId("lblValStatCountNotification").setText(missionStatsMessageCategoryId.not);
		sap.ui.getCore().byId("lblValStatCountSensor").setText(missionStatsMessageCategoryId.sen);
		sap.ui.getCore().byId("lblValStatCountPower").setText(missionStatsMessageCategoryId.pow);
		sap.ui.getCore().byId("lblValStatCountDrive").setText(missionStatsMessageCategoryId.dri);
	},
	
	
	setOrbitalRefresh: function() {
		myHplApp.cockpit.orbital.controller.getMissionStatsSpeed();
		myHplApp.cockpit.orbital.controller.getMissionStatsAlt();
		myHplApp.cockpit.orbital.controller.getMissionStatsDistance();
		var missionStatsSpeed = myHplApp.cockpit.orbital.model.getStatsSpeed();
		var missionStatsAlt   = myHplApp.cockpit.orbital.model.getStatsAlt();
		var missionDistance   = myHplApp.cockpit.orbital.model.getStatsDistance();
		sap.ui.getCore().byId("lblValStatSpeedMaxCms").setText(missionStatsSpeed.maxCms);
		sap.ui.getCore().byId("lblValStatSpeedMaxKph").setText(missionStatsSpeed.maxKph);
		sap.ui.getCore().byId("lblValStatSpeedMaxMph").setText(missionStatsSpeed.maxMph);
		sap.ui.getCore().byId("lblValStatSpeedAvgCms").setText(missionStatsSpeed.avgCms);
		sap.ui.getCore().byId("lblValStatSpeedAvgKph").setText(missionStatsSpeed.avgKph);
		sap.ui.getCore().byId("lblValStatSpeedAvgMph").setText(missionStatsSpeed.avgMph);		
		sap.ui.getCore().byId("lblValStatAltMinM").setText(missionStatsAlt.minM);
		sap.ui.getCore().byId("lblValStatAltMinFt").setText(missionStatsAlt.minFt);
		sap.ui.getCore().byId("lblValStatAltMaxM").setText(missionStatsAlt.maxM);
		sap.ui.getCore().byId("lblValStatAltMaxFt").setText(missionStatsAlt.maxFt);
		sap.ui.getCore().byId("lblValStatAltAvgM").setText(missionStatsAlt.avgM);
		sap.ui.getCore().byId("lblValStatAltAvgFt").setText(missionStatsAlt.avgFt);
		sap.ui.getCore().byId("lblValStatTravelledM").setText(missionDistance.travelledM);
		sap.ui.getCore().byId("lblValStatTravelledKm").setText(missionDistance.travelledKm);
		sap.ui.getCore().byId("lblValStatTravelledMiles").setText(missionDistance.travelledMiles);
	},
	
	
	setMissionMonitor: function() {
		var location = myHplApp.missioncontrol.controller.containsLocation();
		if (location != null) {
			if (location.hitpoints != 0) {
				myHplApp.vehicle.model.setStateShield(location.hitpoints);
				myHplApp.cockpit.model.setGaugeVal({id: 'gaugeShield', val: myHplApp.vehicle.model.getStateShield()});
			}
			if (location.healthpoints != 0) {
				myHplApp.vehicle.model.setStateShield(location.healthpoints);
				myHplApp.cockpit.model.setGaugeVal({id: 'gaugeShield', val: myHplApp.vehicle.model.getStateShield()});
			}
		}
	},
	
	
	setMissionControlPanelIndex: function() {
		sap.ui.getCore().byId("tstrMissionControl").setSelectedIndex(myHplApp.missioncontrol.model.getPanelIndex());
	},
	
	
	drawCrosshair: function() {
		var canvas 	= document.getElementById('canvasCrosshair');
		var context = canvas.getContext('2d');

		//Left horizontal 
		sap.ui.getCore().byId("viewCockpit").getController().drawLine(context, 343, 456, 408, 456, 2, 'white', 'round', 0, 1, 3, "black");
		sap.ui.getCore().byId("viewCockpit").getController().drawLine(context, 343, 456, 408, 456, 2, 'white', 'round', 0, -1, 3, "black");
		sap.ui.getCore().byId("viewCockpit").getController().drawLine(context, 473, 456, 493, 456, 2, 'white', 'round', 0, 1, 3, "black");
		sap.ui.getCore().byId("viewCockpit").getController().drawLine(context, 473, 456, 493, 456, 2, 'white', 'round', 0, -1, 3, "black");

		
		//Right horizontal		
		sap.ui.getCore().byId("viewCockpit").getController().drawLine(context, 713, 456, 733, 456, 2, 'white', 'round', 0, 1, 3, "black");
		sap.ui.getCore().byId("viewCockpit").getController().drawLine(context, 713, 456, 733, 456, 2, 'white', 'round', 0, -1, 3, "black");
		sap.ui.getCore().byId("viewCockpit").getController().drawLine(context, 798, 456, 863, 456, 2, 'white', 'round', 0, 1, 3, "black");
		sap.ui.getCore().byId("viewCockpit").getController().drawLine(context, 798, 456, 863, 456, 2, 'white', 'round', 0, -1, 3, "black");

		
		//Left arc
		sap.ui.getCore().byId("viewCockpit").getController().drawArc(context, 583, 456, 90, 235, 125, true, 2, 'white', 0, 1, 3, "black");
		sap.ui.getCore().byId("viewCockpit").getController().drawArc(context, 583, 456, 90, 235, 125, true, 2, 'white', 0, -1, 3, "black");
		
		
		//Sight recepticle
		sap.ui.getCore().byId("viewCockpit").getController().drawArc(context, 603, 456, 15, 0, 360, false, 2, 'white', 0, 1, 3, "black");

		
		//Right arc
		sap.ui.getCore().byId("viewCockpit").getController().drawArc(context, 623, 456, 90, 305, 55, false, 2, 'white', 0, 1, 3, "black");		
		sap.ui.getCore().byId("viewCockpit").getController().drawArc(context, 623, 456, 90, 305, 55, false, 2, 'white', 0, -1, 3, "black");

	},	
	
	
	drawArc: function(myCanvasContext, xPos, yPos, radius, startAngle, endAngle, anticlockwise, lineWidth, lineColour, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor) {
		startAngle 	= startAngle * (Math.PI/180);
		endAngle 	= endAngle * (Math.PI/180);

		myCanvasContext.strokeStyle = lineColour;
		myCanvasContext.lineWidth 	= lineWidth;
		myCanvasContext.shadowOffsetX = shadowOffsetX;
		myCanvasContext.shadowOffsetY = shadowOffsetY;
		myCanvasContext.shadowBlur = shadowBlur;
		myCanvasContext.shadowColor = shadowColor;
		myCanvasContext.beginPath();
		myCanvasContext.arc(xPos, yPos, radius, startAngle, endAngle, anticlockwise);
		myCanvasContext.stroke();
	},
	
	
	drawLine: function(myCanvasContext, xStartPos, yStartPos, xEndPos, yEndPos, lineWidth, lineColor, lineCap, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor) {
		myCanvasContext.lineWidth = lineWidth;
		myCanvasContext.strokeStyle = lineColor;
		myCanvasContext.lineCap = lineCap;
		myCanvasContext.shadowOffsetX = shadowOffsetX;
		myCanvasContext.shadowOffsetY = shadowOffsetY;
		myCanvasContext.shadowBlur = shadowBlur;
		myCanvasContext.shadowColor = shadowColor;
		myCanvasContext.beginPath();
		myCanvasContext.moveTo(xStartPos, yStartPos);
		myCanvasContext.lineTo(xEndPos, yEndPos);
		myCanvasContext.stroke();
	}
	
	
});

