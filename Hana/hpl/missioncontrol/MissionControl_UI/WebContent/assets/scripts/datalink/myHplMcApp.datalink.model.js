(function (myHplMcApp) {
 
	myHplMcApp.datalink.model = myHplMcApp.datalink.model || {};
	
	var config = {
			serviceMissionMessageCategoryIdRankingUri: 			'http://hanaserver/hpl/missioncontrol/services/missionMessageCategoryIdRanking.xsodata',
			serviceMissionMaxSpeedUri: 							'http://hanaserver/hpl/missioncontrol/services/missionMaxSpeed.xsodata',
			serviceMissionAvgSpeedUri: 							'http://hanaserver/hpl/missioncontrol/services/missionAvgSpeed.xsodata',
			serviceMissionMinAltUri: 							'http://hanaserver/hpl/missioncontrol/services/missionMinAlt.xsodata',
			serviceMissionMaxAltUri: 							'http://hanaserver/hpl/missioncontrol/services/missionMaxAlt.xsodata',
			serviceMissionAvgAltUri: 							'http://hanaserver/hpl/missioncontrol/services/missionAvgAlt.xsodata',
			serviceMissionDistanceTravelledUri: 				'http://hanaserver/hpl/missioncontrol/services/missionDistanceTravelled.xsjs'
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
				
	
	var speedStats = {
			maxCms: 											0,
			maxKph: 											0,
			avgCms: 											0,
			avgKph: 											0
	};


	var altStats = {
			minM: 											0,			
			minFt: 											0,
			maxM: 											0,
			maxFt: 											0,
			avgM: 											0,
			avgFt: 											0
	};


	var distanceStats = {
			travelledM: 									0			
	};
	

	//Get methods for config
	myHplMcApp.datalink.model.getConfigServiceMissionMessageCategoryIdRankingUri = function() { 
		return config.serviceMissionMessageCategoryIdRankingUri;
	};

	myHplMcApp.datalink.model.getConfigServiceMissionMaxSpeedUri = function() { 
		return config.serviceMissionMaxSpeedUri;
	};


	myHplMcApp.datalink.model.getConfigServiceMissionAvgSpeedUri = function() { 
		return config.serviceMissionAvgSpeedUri;
	};

	myHplMcApp.datalink.model.getConfigServiceMissionMinAltUri = function() { 
		return config.serviceMissionMinAltUri;
	};

	myHplMcApp.datalink.model.getConfigServiceMissionMaxAltUri = function() { 
		return config.serviceMissionMaxAltUri;
	};

	myHplMcApp.datalink.model.getConfigServiceMissionAvgAltUri = function() { 
		return config.serviceMissionAvgAltUri;
	};

	myHplMcApp.datalink.model.getConfigServiceMissionDistanceTravelledUri = function() { 
		return config.serviceMissionDistanceTravelledUri;
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
	

	//Get methods for speedStats
	myHplMcApp.datalink.model.getSpeedStatsMaxCms = function() {
		return speedStats.maxCms;	
	};

	myHplMcApp.datalink.model.getSpeedStatsMaxKph = function() {
		return speedStats.maxKph;	
	};

	myHplMcApp.datalink.model.getSpeedStatsAvgCms = function() {
		return speedStats.avgCms;	
	};

	myHplMcApp.datalink.model.getSpeedStatsAvgKph = function() {
		return speedStats.avgKph;	
	};

	
	//Get methods for altStats
	myHplMcApp.datalink.model.getAltStatsMinM = function() {
		return altStats.minM;	
	};

	myHplMcApp.datalink.model.getAltStatsMinFt = function() {
		return altStats.minFt;	
	};

	myHplMcApp.datalink.model.getAltStatsMaxM = function() {
		return altStats.maxM;	
	};

	myHplMcApp.datalink.model.getAltStatsMaxFt = function() {
		return altStats.maxFt;	
	};

	myHplMcApp.datalink.model.getAltStatsAvgM = function() {
		return altStats.avgM;	
	};
	
	myHplMcApp.datalink.model.getAltStatsAvgFt = function() {
		return altStats.avgFt;	
	};
	
	
	//Get methods for distanceStats
	myHplMcApp.datalink.model.getDistanceStatsTravelledM = function() {
		return distanceStats.travelledM;	
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

	
	//Set methods for Speed Stats
	myHplMcApp.datalink.model.setSpeedStatsMaxCms = function(val) {		
		speedStats.maxCms = val;		
	};

	myHplMcApp.datalink.model.setSpeedStatsMaxKph = function(val) {		
		speedStats.maxKph = val;		
	};

	myHplMcApp.datalink.model.setSpeedStatsAvgCms = function(val) {		
		speedStats.avgCms = val;		
	};

	myHplMcApp.datalink.model.setSpeedStatsAvgKph = function(val) {		
		speedStats.avgKph = val;		
	};

	
	//Set methods for AltStats
	myHplMcApp.datalink.model.setAltStatsMinM = function(val) {		
		altStats.minM = val;		
	};

	myHplMcApp.datalink.model.setAltStatsMinFt = function(val) {		
		altStats.minFt = val;		
	};

	myHplMcApp.datalink.model.setAltStatsMaxM = function(val) {		
		altStats.maxM = val;		
	};

	myHplMcApp.datalink.model.setAltStatsMaxFt = function(val) {		
		altStats.maxFt = val;		
	};

	myHplMcApp.datalink.model.setAltStatsAvgM = function(val) {		
		altStats.avgM = val;		
	};

	myHplMcApp.datalink.model.setAltStatsAvgFt = function(val) {		
		altStats.avgFt = val;		
	};

	
	//Set methods for DistanceStats
	myHplMcApp.datalink.model.setDistanceStatsTravelledM = function(val) {		
		distanceStats.travelledM = val;		
	};

	
	
} (myHplMcApp = window.myHplMcApp || {}));