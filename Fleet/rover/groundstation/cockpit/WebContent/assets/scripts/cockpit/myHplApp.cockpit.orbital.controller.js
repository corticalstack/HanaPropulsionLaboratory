(function(myHplApp) {
 
	myHplApp.cockpit.orbital.controller = myHplApp.cockpit.orbital.controller || {};
	
	var missioncontrolModel 	= myHplApp.missioncontrol.model;
	var orbitalModel 	    	= myHplApp.cockpit.orbital.model;
		
	

	myHplApp.cockpit.orbital.controller.init = function() { 
		console.log('Initialising Hana Orbital Controller');	
    };	
	
    	
	myHplApp.cockpit.orbital.controller.getMissionStatsSpeed = function() {
		var myUrl = myHplApp.cockpit.orbital.model.getConfigServiceMissionStatsSpeedUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,AVG_SPEED_CMS,AVG_SPEED_KPH,AVG_SPEED_MPH,MAX_SPEED_CMS,MAX_SPEED_KPH,MAX_SPEED_MPH&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplApp.cockpit.orbital.controller.onLoadStatsSpeed,
	         error: myHplApp.cockpit.orbital.controller.onErrorStatsSpeed 
		});
	};
	
		
	myHplApp.cockpit.orbital.controller.onLoadStatsSpeed = function(myJSON) {
		for (var i = 0; i < myJSON.d.results.length; i++) {
			var orbitalStatsSpeed = {
					maxCms: myJSON.d.results[i].MAX_SPEED_CMS,
					maxKph: myJSON.d.results[i].MAX_SPEED_KPH,
					maxMph: myJSON.d.results[i].MAX_SPEED_MPH,
					avgCms: myJSON.d.results[i].AVG_SPEED_CMS,
					avgKph: myJSON.d.results[i].AVG_SPEED_KPH,
					avgMph: myJSON.d.results[i].AVG_SPEED_MPH
			};

			myHplApp.cockpit.orbital.model.setStatsSpeed(orbitalStatsSpeed);
		};		
	};
	

	myHplApp.cockpit.orbital.controller.onErrorStatsSpeed = function(jqXHR, textStatus, errorThrown){

	};

	

	myHplApp.cockpit.orbital.controller.getMissionStatsAlt = function() {
		var myUrl = myHplApp.cockpit.orbital.model.getConfigServiceMissionStatsAltUri() +
			'/InputParams(IP_MISSIONID=\'' +
			myHplApp.missioncontrol.model.getActiveMissionId() +
			'\',IP_VEHICLEID=\'' +
			myHplApp.missioncontrol.model.getActiveVehicleId() +
			'\',IP_PILOTID=\'' +
			myHplApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,MIN_ALT_M,MIN_ALT_FT,MAX_ALT_M,MAX_ALT_FT,AVG_ALT_M,AVG_ALT_FT&$format=json';
		$.ajax({ 
			 type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplApp.cockpit.orbital.controller.onLoadStatsAlt,
	         error: myHplApp.cockpit.orbital.controller.onErrorStatsAlt 
		});
	};
	
		
	myHplApp.cockpit.orbital.controller.onLoadStatsAlt = function(myJSON) {
		for (var i = 0; i < myJSON.d.results.length; i++) {
			var orbitalStatsAlt = {
					minM:  myJSON.d.results[i].MIN_ALT_M,			
					minFt: myJSON.d.results[i].MIN_ALT_FT,
					maxM:  myJSON.d.results[i].MAX_ALT_M,
					maxFt: myJSON.d.results[i].MAX_ALT_FT,
					avgM:  myJSON.d.results[i].AVG_ALT_M,
					avgFt: myJSON.d.results[i].AVG_ALT_FT
			};

			myHplApp.cockpit.orbital.model.setStatsAlt(orbitalStatsAlt);

		};		
	};
	

	myHplApp.cockpit.orbital.controller.onErrorStatsAlt = function(jqXHR, textStatus, errorThrown){

	};

	
	myHplApp.cockpit.orbital.controller.getMissionStatsDistance = function() {
		var myUrl = myHplApp.cockpit.orbital.model.getConfigServiceMissionDistanceUri() +
			'/InputParams(IP_MISSIONID=\'' +
			myHplApp.missioncontrol.model.getActiveMissionId() +
			'\',IP_VEHICLEID=\'' +
			myHplApp.missioncontrol.model.getActiveVehicleId() +
			'\',IP_PILOTID=\'' +
			myHplApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,DISTANCETRAVELLEDKM,DISTANCETRAVELLEDMILES,DISTANCETRAVELLEDPREVTOHEREM&$format=json';
		$.ajax({
			type: 'GET',
			url: myUrl,
			dataType: 'json',
			crossDomain: true,
			async: true,
			success: myHplApp.cockpit.orbital.controller.onLoadMissionStatsDistance,
			error: myHplApp.cockpit.orbital.controller.onErrorMissionDistance 
		});	
		
		
	};

	
	myHplApp.cockpit.orbital.controller.onLoadMissionStatsDistance = function(myJSON) {
		for (var i = 0; i < myJSON.d.results.length; i++) {
			var orbitalStatsDistance = {
					travelledM:     myJSON.d.results[i].DISTANCETRAVELLEDPREVTOHEREM,			
					travelledKm:    myJSON.d.results[i].DISTANCETRAVELLEDKM,
					travelledMiles: myJSON.d.results[i].DISTANCETRAVELLEDMILES,					
			};
			
			myHplApp.cockpit.orbital.model.setStatsDistance(orbitalStatsDistance);	
		};		
	};
	

	myHplApp.cockpit.orbital.controller.onErrorMissionStatsDistance = function(jqXHR, textStatus, errorThrown){

	};
	
	    
	myHplApp.cockpit.orbital.controller.init();
	
} (myHplApp = window.myHplApp || {}));