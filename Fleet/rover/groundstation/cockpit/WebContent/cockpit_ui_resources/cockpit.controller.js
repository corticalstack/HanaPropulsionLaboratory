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

		sap.ui.getCore().byId("tvStatus").setText(data);
	},
	
	
	wildcard: function() {
		
		sap.ui.getCore().byId("tvStatus").setText('Hello');
	},
	

	feed: function(data) {
		sap.ui.getCore().byId("tvSharpir1").setText(data.substr(3));
		
		var sharpir_value = parseInt(data.substr(3));
		var percentval = (sharpir_value / 500) * 100; 
		var barvalue = 100 - percentval; 
		sap.ui.getCore().byId("ProgInd1").setPercentValue(barvalue);
		sap.ui.getCore().byId("ProgInd1").setDisplayValue(percentval);
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

