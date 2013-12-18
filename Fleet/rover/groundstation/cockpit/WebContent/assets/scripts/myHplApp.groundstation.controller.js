(function (myHplApp) {
 
	myHplApp.groundstation.controller = myHplApp.groundstation.controller || {};
	
	var groundstationModel = myHplApp.groundstation.model;
	
	
	myHplApp.groundstation.controller.init = function() {
		console.log('Initialising groundstation controller');
		groundstationModel.config.socket = io.connect('http://192.168.1.38:8090');
		groundstationModel.state.connected = false;		
	};
	    
	
	myHplApp.groundstation.controller.init();
	
	
	groundstationModel.config.socket.on('connect', function(data){
    	try { 
    			sap.ui.getCore().byId("viewCockpit").getController().connect(data);
    	}
    	catch(err){}
    });

    
	groundstationModel.config.socket.on('wildcard', function(){
    	try {			
    			sap.ui.getCore().byId("viewCockpit").getController().wildcard();
    		}
    	catch(err){}
    });
    	
	
	groundstationModel.config.socket.on('feed', function(data){
			try {
    			sap.ui.getCore().byId("viewCockpit").getController().feed(data);
    		}
    	catch(err){}
    });
	
} (myHplApp = window.myHplApp || {}));