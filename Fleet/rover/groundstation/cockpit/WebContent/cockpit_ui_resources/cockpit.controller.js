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
		//initialise_map('46.475241', '6.892743');
		if (mapInitialised == 0) {
			  initialise_map('46.475241', '6.892743');
			  mapInitialised = 1;
		}
		
		if (data.substr(0,3) == 'GNS') {
			var gps_msg_nav_sol_fields = data.split(',');
		//	sap.ui.getCore().byId("TvGpsNavSolGpsMs").setText(gps_msg_nav_sol_fields[0].substr(3));
			sap.ui.getCore().byId("TvGpsNavSolFixType").setText(gps_msg_nav_sol_fields[1]);
	//		sap.ui.getCore().byId("TvGpsNavSolAccEst3d").setText(gps_msg_nav_sol_fields[2]);
			sap.ui.getCore().byId("TvGpsNavSolNumberSv").setText(gps_msg_nav_sol_fields[3]);
		};
		

		if (data.substr(0,3) == 'GNP') {
			var gps_msg_nav_posllh_fields = data.split(',');
		//	sap.ui.getCore().byId("TvGpsNavPosllhGpsMs").setText(gps_msg_nav_posllh_fields[0].substr(3));
			var longitude = parseFloat(gps_msg_nav_posllh_fields[1], 10);
			longitude = longitude / 10000000;
			var lattitude = parseFloat(gps_msg_nav_posllh_fields[2], 10);
			lattitude = lattitude / 10000000; 
			sap.ui.getCore().byId("TvGpsNavPosllhLongitude").setText(longitude);
			sap.ui.getCore().byId("TvGpsNavPosllhLattitude").setText(lattitude);
			sap.ui.getCore().byId("TvGpsNavPosllhHeight").setText(gps_msg_nav_posllh_fields[3]);
			mapUpdateCounter += 1;
			if (mapUpdateCounter > 5) {
				 initialise_map(lattitude, longitude);
				mapUpdateCounter = 0;
			}
	//		set_map(lattitude, longitude);
		//	sap.ui.getCore().byId("TvGpsNavPosllhHeightMsl").setText(gps_msg_nav_posllh_fields[4]);			
	//		sap.ui.getCore().byId("TvGpsNavPosllhHoriAccEst").setText(gps_msg_nav_posllh_fields[5]);			
		//	sap.ui.getCore().byId("TvGpsNavPosllhVertAccEst").setText(gps_msg_nav_posllh_fields[6]);			
		//	sap.ui.getCore().byId("TvGpsNavPosllhVertAccEst").setText(gps_msg_nav_posllh_fields[7]);
		};


		if (data.substr(0,3) == 'GNV') {
			var gps_msg_nav_velned_fields = data.split(',');
//			sap.ui.getCore().byId("TvGpsNavVelnedGpsMs").setText(gps_msg_nav_velned_fields[0].substr(3));
			sap.ui.getCore().byId("TvGpsNavVelnedNorthVelCms").setText(gps_msg_nav_velned_fields[1]);
			sap.ui.getCore().byId("TvGpsNavVelnedEastVelCms").setText(gps_msg_nav_velned_fields[2]);			
			sap.ui.getCore().byId("TvGpsNavVelnedDownVelCms").setText(gps_msg_nav_velned_fields[3]);			
			sap.ui.getCore().byId("TvGpsNavVelnedSpeed3dCms").setText(gps_msg_nav_velned_fields[4]);			
			sap.ui.getCore().byId("TvGpsNavVelnedGroundSpeed2dCms").setText(gps_msg_nav_velned_fields[5]);			
			sap.ui.getCore().byId("TvGpsNavVelnedHeading").setText(gps_msg_nav_velned_fields[6]);			
//			sap.ui.getCore().byId("TvGpsNavVelnedSpeedAccEst").setText(gps_msg_nav_velned_fields[7]);			
	//		sap.ui.getCore().byId("TvGpsNavVelnedCourseAccEst").setText(gps_msg_nav_velned_fields[8]);			
		};

				
		//sap.ui.getCore().byId("tvSharpir1").setText(data.substr(3));
		
//		var sharpir_value = parseInt(data.substr(3));
//		var percentval = (sharpir_value / 500) * 100; 
//		var barvalue = 100 - percentval; 
//		sap.ui.getCore().byId("ProgInd1").setPercentValue(barvalue);
//		sap.ui.getCore().byId("ProgInd1").setDisplayValue(percentval);
	},
	
	execute: function(oEvent,oController){
        var message = '';
        var speed = parseInt(sap.ui.getCore().byId('Sli').getValue());
        
        if (oEvent.oSource.getId() == 'btnForward') {
          message = message + 'DF:' + 'V' + speed + ':' + 'S:';	
        }
        		
        if (oEvent.oSource.getId() == 'btnStop') {
            message = message + 'X:';	
          }

        if (oEvent.oSource.getId() == 'btnReverse') {
            message = message + 'DB:' + 'V' + speed + ':' + 'S:';	
          }

        if (oEvent.oSource.getId() == 'btnClockwise') {
            message = message + 'RL:' + 'V' + speed + ':' + 'S:';	
          }
		
        if (oEvent.oSource.getId() == 'btnCounterClockwise') {
            message = message + 'RR:' + 'V' + speed + ':' + 'S:';	
          }
		
        if (oEvent.oSource.getId() == 'btnPanLeft') {
        	message = message + 'PL:';
        }
        
        if (oEvent.oSource.getId() == 'btnPanRight') {
        	message = message + 'PR:';
        }

        if (oEvent.oSource.getId() == 'btnTiltUp') {
        	message = message + 'TU:';
        }

        if (oEvent.oSource.getId() == 'btnTiltDown') {
        	message = message + 'TD:';
        }

        if (oEvent.oSource.getId() == 'btnCamSweep') {
        	message = message + 'W:';
        }

        if (oEvent.oSource.getId() == 'btnLightsOn') {
        	message = message + 'L1:';
        }

        if (oEvent.oSource.getId() == 'btnLightsOff') {
        	message = message + 'L0:';
        }

        message = message + ']';        
        
		window.socket.emit( 'dashboard', message );

	},
	
	gamepad_button_down: function(e) {
					     
		var message = '';
		if (e.control == 'FACE_4' && cmd_throttle_val < 30) { 
		  cmd_direction_tx = true;
		  if (direction == 'DF') {
			  direction = 'DR';
		  }
		  else
		  {
			  direction = 'DF';
		  }
		  
		  cmd_direction_val= direction;
		  message = direction + ':'  + 'V' + cmd_throttle_val + ':]';
		  window.socket.emit( 'dashboard', message );
	      }


		if (e.control == 'FACE_3') {
			cmd_stop_tx = true;
			 message = message + 'X:]';			 
			   window.socket.emit( 'dashboard', message );
		  	  
		      }
		
		if (e.control == 'DPAD_LEFT') {
			 message = 'P-5:]';			 
			   window.socket.emit( 'dashboard', message );
		  	  
		      }
		
		if (e.control == 'DPAD_RIGHT') {
			 message = 'P5:]';			 
			   window.socket.emit( 'dashboard', message );
		  	  
		      }
		
		if (e.control == 'DPAD_UP') {
			 message = 'T-5:]';			 
			   window.socket.emit( 'dashboard', message );
		  	  
		      }

		if (e.control == 'DPAD_DOWN') {
			 message = 'T5:]';			 
			   window.socket.emit( 'dashboard', message );
		  	  
		      }


	},


	gamepad_button_up: function(e) {

		

	},


	gamepad_axis_changed: function(e) {
	  var message = '';
	  
	  

	  if (e.axis == 'RIGHT_BOTTOM_SHOULDER') {
		  
    	  var speed = parseFloat(e.value);
		  speed = speed * 100;
		  var speed1 = speed.toFixed(0);	

		  if (speed1 < 7) {
			  speed1 = 0;
		   }
		   
		   if (speed1 == 0) {
			   cmd_stop_tx = false;
		   }
		  
		  if (cmd_stop_tx == false && speed1 != cmd_throttle_val) {
			  cmd_throttle_tx = true;
			  cmd_throttle_val = speed1;
			   message = message + direction + ':'  + 'V' + speed1 + ':';
		  }
		   

		  
		  

  	  
      }
      
      if (e.axis == 'LEFT_STICK_X') {
    	  cmd_heading_tx = true;
    	  var heading = parseFloat(e.value);
		   heading = heading * 100;
		   var heading1 = heading.toFixed(0);	
		   	   
		   message = message + 'H'  + heading1 + ':';

      }

      if (e.axis == 'RIGHT_STICK_X' && cmd_throttle_val == 0) {
    	  cmd_rotate_tx = true;
    	  var rotate = parseFloat(e.value);
		   rotate = rotate * 100;
		   var rotate1 = rotate.toFixed(0);	
		   	   
		   message = message + 'R'  + rotate1 + ':';

      }

      /*
      if (e.axis == 'RIGHT_STICK_Y') {
    	  var tilt = parseFloat(e.value);
		   tilt = tilt * 100;
		   var tilt1 = tilt.toFixed(0);	
		   	   
		   message = message + 'T'  + tilt1 + ':';

      }
      */

      if (message != '') {
    	  message = message + ']';        	        
    	  window.socket.emit( 'dashboard', message );
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


function onLoadSizes(myJSON){
}

function onErrorCall(jqXHR, textStatus, errorThrown){
	sap.ui.core.BusyIndicator.hide();		
	sap.ui.commons.MessageBox.show(jqXHR.responseText, 
			 "ERROR",
			 oBundle.getText("error_action") );		
	return;
	}

