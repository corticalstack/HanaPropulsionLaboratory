(function (myHplApp) {
 
	myHplApp.groundstation.model = myHplApp.groundstation.model || {};

	var config = {
			socket: 			'',
			socketURL:			'http://192.168.1.62:8090',
	};
	
	
	var state = {
			connected:			false
	};
		
 
	myHplApp.groundstation.model.getStateConnected = function() { 
        return state.connected;
    };
    
} (myHplApp = window.myHplApp || {}));