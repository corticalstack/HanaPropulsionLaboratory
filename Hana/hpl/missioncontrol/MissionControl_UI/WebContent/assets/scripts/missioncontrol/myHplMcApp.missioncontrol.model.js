(function (myHplMcApp) {
 
	myHplMcApp.missioncontrol.model = myHplMcApp.missioncontrol.model || {};
	
	var config = {
			servicePilotsUri: 								'http://hanaserver:80/hpl/missioncontrol/services/pilots.xsodata/pilots/?$format=json',
	};

	
	//Get methods for config
	myHplMcApp.missioncontrol.model.getConfigServicePilotsUri = function() { 
		return config.servicePilotsUri;
	};

	
	
} (myHplMcApp = window.myHplMcApp || {}));