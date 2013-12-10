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
	//   onAfterRendering: function() {
	//
	//   },

	
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
	//   onExit: function() {
	//
	//   }
	
	
	getTableSizes: function(oController){
		
	},
	
	
	connect: function(data) {
		//sap.ui.getCore().byId("tvStatus").setText(data);		 
	},
	
	
	wildcard: function() {		
		//sap.ui.getCore().byId("tvStatus").setText('Hello');
	},
	

	feed: function(data) {
		var datenow;
		
		if (googleMapInitialised == false) {
			googleMapLastLattitude = '46.475241';
			googleMapLastLongitude = '6.892743';
			googleMapInitialise();
			googleMapInitialised = true;
		}
		
	

		if (data.substr(0,1) == 'C') {
			var compass_msg_fields = data.split(',');
			sap.ui.getCore().byId("TvCompassHeading").setText(compass_msg_fields[0].substr(1));
			datenow = new Date();
			message.messageCategoryId = 'NAV';
			message.messageId = 'C';	
			message.loggedAt = datenow.getTime();
			message.feed = data.substr(1);
			messageLogPump(message);

		};


		if (data.substr(0,1) == 'D') {
			var inertialsensor_msg_fields = data.split(',');
			sap.ui.getCore().byId("TvProximitySensorRear").setText(inertialsensor_msg_fields[0].substr(1));
			sap.ui.getCore().byId("TvProximitySensorFront").setText(inertialsensor_msg_fields[1]);
			sap.ui.getCore().byId("TvProximitySensorCam").setText(inertialsensor_msg_fields[2]);
			datenow = new Date();
			message.messageCategoryId = 'SEN';
			message.messageId = 'D';	
			message.loggedAt = datenow.getTime();
			message.feed = data.substr(1);
			messageLogPump(message);

		};


		
		if (data.substr(0,1) == 'B') {
			var inertialsensor_msg_fields = data.split(',');
			sap.ui.getCore().byId("TvPowerVoltage").setText(inertialsensor_msg_fields[0].substr(1));
			sap.ui.getCore().byId("TvPowerCurrent").setText(inertialsensor_msg_fields[1]);
			sap.ui.getCore().byId("TvPowerAmps").setText(inertialsensor_msg_fields[2]);
			sap.ui.getCore().byId("TvConsumedCurrentMah").setText(inertialsensor_msg_fields[3]);
			sap.ui.getCore().byId("TvPowerRemainingPct").setText(inertialsensor_msg_fields[4]);
			datenow = new Date();
			message.messageCategoryId = 'POW';
			message.messageId = 'B';	
			message.loggedAt = datenow.getTime();
			message.feed = data.substr(1);
			messageLogPump(message);

		};

		
		
		if (data.substr(0,1) == 'I') {
			var inertialsensor_msg_fields = data.split(',');
			sap.ui.getCore().byId("TvInsAccelX").setText(inertialsensor_msg_fields[0].substr(1));
			sap.ui.getCore().byId("TvInsAccelY").setText(inertialsensor_msg_fields[1]);
			sap.ui.getCore().byId("TvInsAccelZ").setText(inertialsensor_msg_fields[2]);
			sap.ui.getCore().byId("TvInsGyroX").setText(inertialsensor_msg_fields[3]);
			sap.ui.getCore().byId("TvInsGyroY").setText(inertialsensor_msg_fields[4]);
			sap.ui.getCore().byId("TvInsGyroZ").setText(inertialsensor_msg_fields[5]);
            			

//			updateAccelerations(inertialsensor_msg_fields[0].substr(1), inertialsensor_msg_fields[1], inertialsensor_msg_fields[2]);

//			draw();
			message.messageCategoryId = 'SEN';
			message.messageId = 'I';	
			message.loggedAt = datenow.getTime();
			message.feed = data.substr(1);
			messageLogPump(message);

		};

		
		if (data.substr(0,1) == 'S') {
			var gps_msg_nav_sol_fields = data.split(',');
			//	sap.ui.getCore().byId("TvGpsNavSolGpsMs").setText(gps_msg_nav_sol_fields[0].substr(3));
			sap.ui.getCore().byId("TvGpsNavSolFixType").setText(gps_msg_nav_sol_fields[1]);
			//	sap.ui.getCore().byId("TvGpsNavSolAccEst3d").setText(gps_msg_nav_sol_fields[2]);
			sap.ui.getCore().byId("TvGpsNavSolNumberSv").setText(gps_msg_nav_sol_fields[3]);
			
			datenow = new Date();
			message.messageCategoryId = 'NAV';
			message.messageId = 'S';	
			message.loggedAt = datenow.getTime();
			message.feed = data.substr(1);
			messageLogPump(message);


		};
		

		if (data.substr(0,1) == 'P') {
			var gps_msg_nav_posllh_fields = data.split(',');
			//	sap.ui.getCore().byId("TvGpsNavPosllhGpsMs").setText(gps_msg_nav_posllh_fields[0].substr(3));
			var longitude = parseFloat(gps_msg_nav_posllh_fields[0].substr(1), 10);
			longitude = longitude / 10000000;
			googleMapLastLongitude = longitude;
			var lattitude = parseFloat(gps_msg_nav_posllh_fields[1], 10);
			lattitude = lattitude / 10000000; 
			googleMapLastLattitude = lattitude;
			sap.ui.getCore().byId("TvGpsNavPosllhLongitude").setText(longitude);
			sap.ui.getCore().byId("TvGpsNavPosllhLattitude").setText(lattitude);
			sap.ui.getCore().byId("TvGpsNavPosllhHeight").setText(gps_msg_nav_posllh_fields[2]);
			googleMapUpdateCounter += 1;
//			if (googleMapUpdateCounter > 5) {
				latlng = new google.maps.LatLng(googleMapLastLattitude, googleMapLastLongitude);
			    googleMapMarker.setPosition(latlng);
				googleMap.panTo(googleMapMarker.getPosition());
				googleMapUpdateCounter = 0;
//			}
			//	set_map(lattitude, longitude);
			//	sap.ui.getCore().byId("TvGpsNavPosllhHeightMsl").setText(gps_msg_nav_posllh_fields[4]);			
			//	sap.ui.getCore().byId("TvGpsNavPosllhHoriAccEst").setText(gps_msg_nav_posllh_fields[5]);			
			//	sap.ui.getCore().byId("TvGpsNavPosllhVertAccEst").setText(gps_msg_nav_posllh_fields[6]);			
			//	sap.ui.getCore().byId("TvGpsNavPosllhVertAccEst").setText(gps_msg_nav_posllh_fields[7]);
	//			var datenow = new Date;
		//		var timenow = new Timestamp(System.currentTimeMillis());  
			//	var msg = data.substr(0,1) + '  ' + '001' + timenow + gps_msg_nav_posllh_fields[0] + 
		//		gps_msg_nav_posllh_fields[1] +
		//		gps_msg_nav_posllh_fields[2];
				
				
				datenow = new Date();
				message.messageCategoryId = 'NAV';
				message.messageId = 'P';	
				message.loggedAt = datenow.getTime();
				message.feed = data.substr(1);
				messageLogPump(message);
				
		};


		if (data.substr(0,2) == 'V') {
			var gps_msg_nav_velned_fields = data.split(',');
			//		sap.ui.getCore().byId("TvGpsNavVelnedGpsMs").setText(gps_msg_nav_velned_fields[0].substr(3));
			sap.ui.getCore().byId("TvGpsNavVelnedNorthVelCms").setText(gps_msg_nav_velned_fields[0]);
			sap.ui.getCore().byId("TvGpsNavVelnedEastVelCms").setText(gps_msg_nav_velned_fields[1]);			
			sap.ui.getCore().byId("TvGpsNavVelnedDownVelCms").setText(gps_msg_nav_velned_fields[2]);			
			sap.ui.getCore().byId("TvGpsNavVelnedSpeed3dCms").setText(gps_msg_nav_velned_fields[3]);			
			sap.ui.getCore().byId("TvGpsNavVelnedGroundSpeed2dCms").setText(gps_msg_nav_velned_fields[4]);			
			sap.ui.getCore().byId("TvGpsNavVelnedHeading").setText(gps_msg_nav_velned_fields[5]);			
			//		sap.ui.getCore().byId("TvGpsNavVelnedSpeedAccEst").setText(gps_msg_nav_velned_fields[7]);			
			//	sap.ui.getCore().byId("TvGpsNavVelnedCourseAccEst").setText(gps_msg_nav_velned_fields[8]);		
			datenow = new Date();
			message.messageCategoryId = 'NAV';
			message.messageId = 'V';	
			message.loggedAt = datenow.getTime();
			message.feed = data.substr(1);
			messageLogPump(message);

		};

				
		//sap.ui.getCore().byId("tvSharpir1").setText(data.substr(3));
		
		//		var sharpir_value = parseInt(data.substr(3));
		//		var percentval = (sharpir_value / 500) * 100; 
		//		var barvalue = 100 - percentval; 
		//		sap.ui.getCore().byId("ProgInd1").setPercentValue(barvalue);
		//		sap.ui.getCore().byId("ProgInd1").setDisplayValue(percentval);
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
	
	
	

	
	executeConfirm: function(bResult,oController){
	},
	
	
	updateReplicateProgress: function(){
	},
	
	
	triggerReplicatePO: function(oController){
	}, 

	
	triggerReplicateSO: function(oController){
	},	
	
	
	toggleGenerate: function(oEvent,oController){
	},

	
	onReseedComplete: function(myTxt,oController,oObject){
	},

	
	onReseedComplete2: function(myTxt,oController,oObject){
	},

	
	onSynonymComplete: function(myTxt,oController){	
	},
	
	
	onResequenceComplete: function(myTxt,oController,oObject){
	},

	
	onPOComplete: function(myTxt,oController,i){
	},	

	
	onSOComplete: function(myTxt,oController,i){
	},	

	
	getUniqueTime: function(){
	}	

});
