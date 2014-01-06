(function (myHplApp) {
 
	myHplApp.groundstation.model = myHplApp.groundstation.model || {};

	var config = {
			socket: 			'',
			socketURL:			'http://192.168.1.38:8090',
	};
	
	
	var state = {
			connected:			false
	};
		

    myHplApp.groundstation.model.setConfigSocket = function() { 
    	config.socket = io.connect('http://192.168.1.38:8090'); 
    };

	myHplApp.groundstation.model.getConfigSocket = function() { 
        return config.socket;
    };

    
	myHplApp.groundstation.model.getStateConnected = function() { 
        return state.connected;
    };
    

    myHplApp.groundstation.model.setStateConnected = function(val) { 
        state.connected = val;
    };

} (myHplApp = window.myHplApp || {}));