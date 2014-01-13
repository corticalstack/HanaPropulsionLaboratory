(function (myHplApp) {
 
	myHplApp.groundstation.controller = myHplApp.groundstation.controller || {};
	
	var groundstationModel = myHplApp.groundstation.model;
	
	
	myHplApp.groundstation.controller.init = function() {
		console.log('Initialising groundstation controller');
		try {
				groundstationModel.setConfigSocket();
				groundstationModel.setStateConnected(true);
				console.log('Groundstation connected');
			}
		catch(err) {
				groundstationModel.setStateConnected(false);
				console.log('Groundstation not connected');
		}
				
	};
	    
	
	myHplApp.groundstation.controller.init();
	
	if (groundstationModel.getStateConnected()) {
		groundstationModel.getConfigSocket().on('connect', function(data){
			try { 
					sap.ui.getCore().byId("viewCockpit").getController().connect(data);
				}
			catch(err){}
		});

    
		groundstationModel.getConfigSocket().on('wildcard', function(){
			try {			
    				sap.ui.getCore().byId("viewCockpit").getController().wildcard();
    			}
			catch(err){}
		});
    	
	
		groundstationModel.getConfigSocket().on('feed', function(data){
			try {
    				sap.ui.getCore().byId("viewCockpit").getController().feed(data);
    			}
			catch(err){}
		});
	};
	
} (myHplApp = window.myHplApp || {}));