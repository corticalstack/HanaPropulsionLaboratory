(function (myHplApp) {
 
	myHplApp.cockpit.datalink.model = myHplApp.cockpit.datalink.model || {};
	
	var config = {
			serviceMissionStatsMessageCategoryIdUri: 			'http://hanaserver:80/hpl/missioncontrol/services/missionMessageCategoryIdRanking.xsodata',
	};


	var statsMessageCategoryId = {
			nav: 											0,
			coc: 											0,
			not: 											0,
			sen: 											0,
			pow: 											0,
			dri: 											0
	};
				
	
	//Get methods for config
	myHplApp.cockpit.datalink.model.getConfigServiceMissionStatsMessageCategoryIdUri = function() { 
		return config.serviceMissionStatsMessageCategoryIdUri;
	};

	
	//Get methods for state
	myHplApp.cockpit.datalink.model.getStateActive = function() {
		return state.active;
	};
	
	
	//Get methods for messageCategoryIdStats
	myHplApp.cockpit.datalink.model.getStatsMessageCategoryId = function() {
		return statsMessageCategoryId;	
	};
		
	
	//Set methods for state
	myHplApp.cockpit.datalink.model.setStateActive = function(bool) {
		state.active = bool;
	};
	
		
	
	//Set methods for MessageCategoryIdstats
	myHplApp.cockpit.datalink.model.setStatsMessageCategoryId = function(stats) {		
		statsMessageCategoryId.nav = stats.nav;		
		statsMessageCategoryId.coc = stats.coc;
		statsMessageCategoryId.not = stats.not;
		statsMessageCategoryId.sen = stats.sen;
		statsMessageCategoryId.pow = stats.pow;
		statsMessageCategoryId.dri = stats.dri;		
	};
		
	
} (myHplApp = window.myHplApp || {}));