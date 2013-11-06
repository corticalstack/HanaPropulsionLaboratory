sap.ui.controller("cockpit_ui_resources.cockpit", {
	

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {
	   //alert('Controller on init');
  
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
		console.log(data);
		if (googleMapInitialised == false) {
			googleMapLastLattitude = '46.475241';
			googleMapLastLongitude = '6.892743';
			googleMapInitialise();
			googleMapInitialised = true;
		}
		

		if (data.substr(0,3) == 'CPS') {
			var compass_msg_fields = data.split(',');
			sap.ui.getCore().byId("TvCompassHeading").setText(compass_msg_fields[0].substr(3));
		};

		
		if (data.substr(0,3) == 'GNS') {
			var gps_msg_nav_sol_fields = data.split(',');
			//	sap.ui.getCore().byId("TvGpsNavSolGpsMs").setText(gps_msg_nav_sol_fields[0].substr(3));
			sap.ui.getCore().byId("TvGpsNavSolFixType").setText(gps_msg_nav_sol_fields[1]);
			//	sap.ui.getCore().byId("TvGpsNavSolAccEst3d").setText(gps_msg_nav_sol_fields[2]);
			sap.ui.getCore().byId("TvGpsNavSolNumberSv").setText(gps_msg_nav_sol_fields[3]);
		};
		

		if (data.substr(0,3) == 'GNP') {
			var gps_msg_nav_posllh_fields = data.split(',');
			//	sap.ui.getCore().byId("TvGpsNavPosllhGpsMs").setText(gps_msg_nav_posllh_fields[0].substr(3));
			var longitude = parseFloat(gps_msg_nav_posllh_fields[1], 10);
			longitude = longitude / 10000000;
			googleMapLastLongitude = longitude;
			var lattitude = parseFloat(gps_msg_nav_posllh_fields[2], 10);
			lattitude = lattitude / 10000000; 
			googleMapLastLattitude = lattitude;
			sap.ui.getCore().byId("TvGpsNavPosllhLongitude").setText(longitude);
			sap.ui.getCore().byId("TvGpsNavPosllhLattitude").setText(lattitude);
			sap.ui.getCore().byId("TvGpsNavPosllhHeight").setText(gps_msg_nav_posllh_fields[3]);
			mapUpdateCounter += 1;
			if (mapUpdateCounter > 5) {
				googleMapSet();
				mapUpdateCounter = 0;
			}
			//	set_map(lattitude, longitude);
			//	sap.ui.getCore().byId("TvGpsNavPosllhHeightMsl").setText(gps_msg_nav_posllh_fields[4]);			
			//	sap.ui.getCore().byId("TvGpsNavPosllhHoriAccEst").setText(gps_msg_nav_posllh_fields[5]);			
			//	sap.ui.getCore().byId("TvGpsNavPosllhVertAccEst").setText(gps_msg_nav_posllh_fields[6]);			
			//	sap.ui.getCore().byId("TvGpsNavPosllhVertAccEst").setText(gps_msg_nav_posllh_fields[7]);
		};


		if (data.substr(0,3) == 'GNV') {
			var gps_msg_nav_velned_fields = data.split(',');
			//		sap.ui.getCore().byId("TvGpsNavVelnedGpsMs").setText(gps_msg_nav_velned_fields[0].substr(3));
			sap.ui.getCore().byId("TvGpsNavVelnedNorthVelCms").setText(gps_msg_nav_velned_fields[1]);
			sap.ui.getCore().byId("TvGpsNavVelnedEastVelCms").setText(gps_msg_nav_velned_fields[2]);			
			sap.ui.getCore().byId("TvGpsNavVelnedDownVelCms").setText(gps_msg_nav_velned_fields[3]);			
			sap.ui.getCore().byId("TvGpsNavVelnedSpeed3dCms").setText(gps_msg_nav_velned_fields[4]);			
			sap.ui.getCore().byId("TvGpsNavVelnedGroundSpeed2dCms").setText(gps_msg_nav_velned_fields[5]);			
			sap.ui.getCore().byId("TvGpsNavVelnedHeading").setText(gps_msg_nav_velned_fields[6]);			
			//		sap.ui.getCore().byId("TvGpsNavVelnedSpeedAccEst").setText(gps_msg_nav_velned_fields[7]);			
			//	sap.ui.getCore().byId("TvGpsNavVelnedCourseAccEst").setText(gps_msg_nav_velned_fields[8]);			
		};

				
		//sap.ui.getCore().byId("tvSharpir1").setText(data.substr(3));
		
		//		var sharpir_value = parseInt(data.substr(3));
		//		var percentval = (sharpir_value / 500) * 100; 
		//		var barvalue = 100 - percentval; 
		//		sap.ui.getCore().byId("ProgInd1").setPercentValue(barvalue);
		//		sap.ui.getCore().byId("ProgInd1").setDisplayValue(percentval);
	},
	
	
	execute: function(oEvent,oController){
	
	},
	
	
	
	gamepad_button_down: function(gamepadEvent) {
		var socketMessage = '';
		if (gamepadEvent.control == gamepadCmdDirection && cmdThrottleValLast < throttleMaxForDirectionChange) { 
			cmdDirectionTx = true;
			if (vehicleDirection == vehicleDirectionForward) {
				vehicleDirection = vehicleDirectionReverse;
			}
			else
			{
				vehicleDirection = vehicleDirectionForward;
			}
		  
		  
			cmdDirectionVal = vehicleDirection;
			socketMessage = vehicleDirection + ':'  + cmdThrottle + cmdThrottleValLast + msgTerminator;
			window.socket.emit(socketEventCockpit, socketMessage);
		}


		if (gamepadEvent.control == gamepadCmdStop) {
			cmdStopTx = true;		 
			window.socket.emit(socketEventCockpit, cmdStop);
		}


		if (gamepadEvent.control == gamepadCmdCamPanLeft) {
			window.socket.emit(socketEventCockpit, cmdCamPanLeft);
		}
		
	
		if (gamepadEvent.control == gamepadCmdCamPanRight) {
			window.socket.emit(socketEventCockpit, cmdCamPanRight);
		}

	
		if (gamepadEvent.control == gamepadCmdCamTiltUp) {
			window.socket.emit(socketEventCockpit, cmdCamTiltUp);
		}

	
		if (gamepadEvent.control == gamepadCmdCamTiltDown) {
			window.socket.emit(socketEventCockpit, cmdCamTiltDown);
		}
		

		if (gamepadEvent.control == gamepadCmdGoogleMapTypeChange) {
			switch (googleMapLastMapType) {
				case googleMapMapTypeRoad:
					googleMapLastMapType = googleMapMapTypeSatellite;
					break;
				case googleMapMapTypeSatellite:
					googleMapLastMapType = googleMapMapTypeRoad;
					break;
				default:
					googleMapLastMapType = googleMapMapTypeRoad;
			}
			googleMapSet();
		}
				
	},


	gamepad_button_up: function(gamepadEvent) {

		if (gamepadEvent.control == gamepadCmdCamPanLeft || gamepadEvent.control == gamepadCmdCamPanRight) {
			window.socket.emit(socketEventCockpit, cmdCamPanStop);
		}
		
		
		if (gamepadEvent.control == gamepadCmdCamTiltUp || gamepadEvent.control == gamepadCmdCamTiltDown ) {
			window.socket.emit(socketEventCockpit, cmdCamTiltStop);
		}
	
	},


	gamepad_axis_changed: function(gamepadEvent) {
		var socketMessage = '';

		if (gamepadEvent.axis == gamepadCmdThrottle) {
			var speed = parseFloat(gamepadEvent.value);
			speed = speed * 100;
			var speed1 = speed.toFixed(0);	
			if (speed1 < throttleDeadzoneVal) {
				speed1 = 0;
			}
		   

			if (speed1 == 0) {
				cmdStopTx = false;
			}
		  

			if (cmdStopTx == false && speed1 != cmdThrottleValLast) {
				cmdThrottleTx = true;
				cmdThrottleValLast = speed1;
				socketMessage = socketMessage + vehicleDirection + ':'  + cmdThrottle + speed1 + ':';
			}
		}
    
	
		if (gamepadEvent.axis == gamepadCmdHeading) {
			cmd_heading_tx = true;
			var heading = parseFloat(gamepadEvent.value);
			heading = heading * 100;
			var heading1 = heading.toFixed(0);	
			socketMessage = socketMessage + cmdHeading  + heading1 + ':';
		}

    
		if (gamepadEvent.axis == gamepadCmdRotate && cmdThrottleValLast == 0) {
			cmd_rotate_tx = true;
			var rotate = parseFloat(gamepadEvent.value);
			rotate = rotate * 100;
			var rotate1 = rotate.toFixed(0);	
			socketMessage = socketMessage + cmdRotate  + rotate1 + ':';
		}

    

		if (socketMessage != '') {
			socketMessage = socketMessage + ']';        	        
			window.socket.emit(socketEventCockpit, socketMessage);
		}

		
		if (gamepadEvent.axis == gamepadCmdGoogleMapZoom) {
			var zoom = parseFloat(gamepadEvent.value);
		
			zoom = zoom * 10;
			zoom = zoom.toFixed(0);
		
			if (zoom != googleMapLastZoom) {
				googleMapLastZoom = zoom;
				googleMapSet();			
			}
		}

		
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
