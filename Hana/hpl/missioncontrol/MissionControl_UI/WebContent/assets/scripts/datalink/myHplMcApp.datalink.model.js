(function (myHplMcApp) {
 
	myHplMcApp.datalink.model = myHplMcApp.datalink.model || {};
	
	var config = {
			serviceMissionMessageCategoryIdRankingUri: 			'http://hanaserver/hpl/missioncontrol/services/missionMessageCategoryIdRanking.xsodata',
	};


	var state = {
			active:											false
	};
	
	
	var activeMission = {
			missionId: 										'0',
			vehicleId: 										'1',
			pilotId:   										'1',
			homeLatitude: 									0,
			homeLongitude:									0,
			homeAltitude:									0,
			currentLatitude:								0,
			currentLongitude:								0,
			currentAltitude:								0,
	};

	var messageCategoryIdStats = {
			nav: 											0,
			coc: 											0,
			not: 											0,
			sen: 											0,
			pow: 											0,
			dri: 											0
	};
				
	
	//Get methods for config
	myHplMcApp.datalink.model.getConfigServiceMissionMessageCategoryIdRankingUri = function() { 
		return config.serviceMissionMessageCategoryIdRankingUri;
	};

	
	//Get methods for state
	myHplMcApp.datalink.model.getStateActive = function() {
		return state.active;
	};
	
	
	//Get methods for Active Mission
	myHplMcApp.missioncontrol.model.getActiveMissionId = function() { 
		return activeMission.missionId;
	};
	
	myHplMcApp.missioncontrol.model.getActiveVehicleId = function() { 
		return activeMission.vehicleId;
	};

	myHplMcApp.missioncontrol.model.getActivePilotId = function() { 
		return activeMission.pilotId;
	};
	
	
	//Get methods for messageCategoryIdStats
	myHplMcApp.datalink.model.getMessageCategoryIdStats = function() {
		return messageCategoryIdStats;	
	};
		
	
	//Set methods for state
	myHplMcApp.datalink.model.setStateActive = function(bool) {
		state.active = bool;
	};
	
	
	//Set methods for Active Mission
	myHplMcApp.missioncontrol.model.setActiveMissionId = function(val) { 
		activeMission.missionId = val;
	};

	
	myHplMcApp.missioncontrol.model.setActiveVehicleId = function(val) { 
		activeMission.vehicleId = val;
	};

	myHplMcApp.missioncontrol.model.setActivePilotId = function(val) { 
		activeMission.pilotId = val;
	};
	
	
	//Set methods for MessageCategoryIdstats
	myHplMcApp.datalink.model.setMessageCategoryIdStats = function(stats) {		
		messageCategoryIdStats.nav = stats.nav;		
		messageCategoryIdStats.coc = stats.coc;
		messageCategoryIdStats.not = stats.not;
		messageCategoryIdStats.sen = stats.sen;
		messageCategoryIdStats.pow = stats.pow;
		messageCategoryIdStats.dri = stats.dri;		
	};
		
	
} (myHplMcApp = window.myHplMcApp || {}));