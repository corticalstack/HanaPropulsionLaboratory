(function (myHplMcApp) {
 
	myHplMcApp.orbital.model = myHplMcApp.orbital.model || {};
	
	var config = {
			serviceMissionStatsSpeedUri: 						'http://hanaserver/hpl/missioncontrol/services/missionStatsSpeed.xsodata',
			serviceMissionStatsAltUri: 							'http://hanaserver/hpl/missioncontrol/services/missionStatsAlt.xsodata',
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

	var speedStats = {
			maxCms: 										0,
			maxKph: 										0,
			maxMph: 										0,
			avgCms: 										0,
			avgKph: 										0,
			avgMph: 										0
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
	myHplMcApp.orbital.model.getConfigServiceMissionStatsSpeedUri = function() { 
		return config.serviceMissionStatsSpeedUri;
	};


	myHplMcApp.orbital.model.getConfigServiceMissionStatsAltUri = function() { 
		return config.serviceMissionStatsAltUri;
	};

	
	myHplMcApp.orbital.model.getConfigServiceMissionDistanceTravelledUri = function() { 
		return config.serviceMissionDistanceTravelledUri;
	};

	
	//Get methods for state
	myHplMcApp.orbital.model.getStateActive = function() {
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
	
	
	//Get methods for Stats
	myHplMcApp.orbital.model.getSpeedStatsMaxCms = function() {
		return speedStats.maxCms;	
	};

	myHplMcApp.orbital.model.getSpeedStatsMaxKph = function() {
		return speedStats.maxKph;	
	};

	myHplMcApp.orbital.model.getSpeedStatsMaxMph = function() {
		return speedStats.maxMph;	
	};

	myHplMcApp.orbital.model.getSpeedStatsAvgCms = function() {
		return speedStats.avgCms;	
	};

	myHplMcApp.orbital.model.getSpeedStatsAvgKph = function() {
		return speedStats.avgKph;	
	};

	myHplMcApp.orbital.model.getSpeedStatsAvgMph = function() {
		return speedStats.avgMph;	
	};
	
	
	//Get methods for altStats
	myHplMcApp.orbital.model.getAltStatsMinM = function() {
		return altStats.minM;	
	};

	myHplMcApp.orbital.model.getAltStatsMinFt = function() {
		return altStats.minFt;	
	};

	myHplMcApp.orbital.model.getAltStatsMaxM = function() {
		return altStats.maxM;	
	};

	myHplMcApp.orbital.model.getAltStatsMaxFt = function() {
		return altStats.maxFt;	
	};

	myHplMcApp.orbital.model.getAltStatsAvgM = function() {
		return altStats.avgM;	
	};
	
	myHplMcApp.orbital.model.getAltStatsAvgFt = function() {
		return altStats.avgFt;	
	};
	
	
	//Get methods for distanceStats
	myHplMcApp.orbital.model.getDistanceStatsTravelledM = function() {
		return distanceStats.travelledM;	
	};
	
	
	//Set methods for state
	myHplMcApp.orbital.model.setStateActive = function(bool) {
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
	
	
	
	//Set methods for Speed Stats
	myHplMcApp.orbital.model.setSpeedStatsMaxCms = function(val) {		
		speedStats.maxCms = val;		
	};

	myHplMcApp.orbital.model.setSpeedStatsMaxKph = function(val) {		
		speedStats.maxKph = val;		
	};

	myHplMcApp.orbital.model.setSpeedStatsMaxMph = function(val) {		
		speedStats.maxMph = val;		
	};

	myHplMcApp.orbital.model.setSpeedStatsAvgCms = function(val) {		
		speedStats.avgCms = val;		
	};

	myHplMcApp.orbital.model.setSpeedStatsAvgKph = function(val) {		
		speedStats.avgKph = val;		
	};

	myHplMcApp.orbital.model.setSpeedStatsAvgMph = function(val) {		
		speedStats.avgMph = val;		
	};
	
	
	//Set methods for AltStats
	myHplMcApp.orbital.model.setAltStatsMinM = function(val) {		
		altStats.minM = val;		
	};

	myHplMcApp.orbital.model.setAltStatsMinFt = function(val) {		
		altStats.minFt = val;		
	};

	myHplMcApp.orbital.model.setAltStatsMaxM = function(val) {		
		altStats.maxM = val;		
	};

	myHplMcApp.orbital.model.setAltStatsMaxFt = function(val) {		
		altStats.maxFt = val;		
	};

	myHplMcApp.orbital.model.setAltStatsAvgM = function(val) {		
		altStats.avgM = val;		
	};

	myHplMcApp.orbital.model.setAltStatsAvgFt = function(val) {		
		altStats.avgFt = val;		
	};

	
	//Set methods for DistanceStats
	myHplMcApp.orbital.model.setDistanceStatsTravelledM = function(val) {		
		distanceStats.travelledM = val;		
	};

	
	
} (myHplMcApp = window.myHplMcApp || {}));