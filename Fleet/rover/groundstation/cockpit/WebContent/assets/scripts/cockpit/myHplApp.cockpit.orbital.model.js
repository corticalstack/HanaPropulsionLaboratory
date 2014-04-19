(function(myHplApp) {
 
	myHplApp.cockpit.orbital.model = myHplApp.cockpit.orbital.model || {};
	
	var config = {
			serviceMissionStatsSpeedUri: 						'http://hanaserver/hpl/missioncontrol/services/missionStatsSpeed.xsodata',
			serviceMissionStatsAltUri: 							'http://hanaserver/hpl/missioncontrol/services/missionStatsAlt.xsodata',
			serviceMissionDistanceUri: 							'http://hanaserver/hpl/missioncontrol/services/missionDistance.xsodata'
	};

	
	var statsSpeed = {
			maxCms: 										0,
			maxKph: 										0,
			maxMph: 										0,
			avgCms: 										0,
			avgKph: 										0,
			avgMph: 										0
	};


	var statsAlt = {
			minM: 											0,			
			minFt: 											0,
			maxM: 											0,
			maxFt: 											0,
			avgM: 											0,
			avgFt: 											0
	};


	var statsDistance = {
			travelledM: 									0,
			travelledKm: 									0,
			travelledMiles: 								0			
	};
	

	//Get methods for config
	myHplApp.cockpit.orbital.model.getConfigServiceMissionStatsSpeedUri = function() { 
		return config.serviceMissionStatsSpeedUri;
	};


	myHplApp.cockpit.orbital.model.getConfigServiceMissionStatsAltUri = function() { 
		return config.serviceMissionStatsAltUri;
	};

	
	myHplApp.cockpit.orbital.model.getConfigServiceMissionDistanceUri = function() { 
		return config.serviceMissionDistanceUri;
	};

	
	//Get methods for Speed Stats
	myHplApp.cockpit.orbital.model.getStatsSpeed = function() {
		return statsSpeed;	
	};

	
	//Get methods for Alt Stats
	myHplApp.cockpit.orbital.model.getStatsAlt = function() {
		return statsAlt;	
	};
	
	
	//Get methods for Distance Stats
	myHplApp.cockpit.orbital.model.getStatsDistance = function() {
		return statsDistance;	
	};
	
	
	//Set methods for state
	myHplApp.cockpit.orbital.model.setStateActive = function(bool) {
		state.active = bool;
	};
	
		
	//Set methods for Speed Stats
	myHplApp.cockpit.orbital.model.setStatsSpeed = function(stats) {		
		statsSpeed.maxCms = stats.maxCms;
		statsSpeed.maxKph = stats.maxKph;
		statsSpeed.maxMph = stats.maxMph;
		statsSpeed.avgCms = stats.avgCms;
		statsSpeed.avgKph = stats.avgKph;
		statsSpeed.avgMph = stats.avgMph; 													
	};

	
	//Set methods for Alt Stats
	myHplApp.cockpit.orbital.model.setStatsAlt = function(stats) {		
		statsAlt.minM  = stats.minM;			
		statsAlt.minFt = stats.minFt;
		statsAlt.maxM  = stats.maxM;
		statsAlt.maxFt = stats.maxFt;
		statsAlt.avgM  = stats.avgM;
		statsAlt.avgFt = stats.avgFt;					
	};

			
	//Set methods for DistanceStats
	myHplApp.cockpit.orbital.model.setStatsDistance = function(stats) {
		statsDistance.travelledM     = stats.travelledM;
		statsDistance.travelledKm    = stats.travelledKm;
		statsDistance.travelledMiles = stats.travelledMiles;				
	};
	
	
} (myHplApp = window.myHplApp || {}));