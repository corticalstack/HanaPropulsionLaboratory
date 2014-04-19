(function (myHplApp) {
 
	myHplApp.cockpit.datalink.controller = myHplApp.cockpit.datalink.controller || {};
	
	var missioncontrolModel 	= myHplApp.missioncontrol.model;
	var datalinkModel 	    	= myHplApp.cockpit.datalink.model;
	
	

	myHplApp.cockpit.datalink.controller.init = function() { 
		console.log('Initialising Hana Datalink Controller');	
    };	
	
    	
	
	myHplApp.cockpit.datalink.controller.getMissionStatsMessageCategoryId = function() {
		var myUrl = myHplApp.cockpit.datalink.model.getConfigServiceMissionStatsMessageCategoryIdUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,CM_NAV,CM_COC,CM_NOT,CM_SEN,CM_POW,CM_DRI&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true, 
	         success: myHplApp.cockpit.datalink.controller.onLoadStatsMessageCategoryId,
	         error: myHplApp.cockpit.datalink.controller.onErrorStatsMessageCategoryId 
		});
	};
	
		
	myHplApp.cockpit.datalink.controller.onLoadStatsMessageCategoryId = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			var datalinkStatsMessageCategoryId = {
					nav: 	myJSON.d.results[i].CM_NAV,
					coc: 	myJSON.d.results[i].CM_COC,
					not: 	myJSON.d.results[i].CM_NOT,
					sen: 	myJSON.d.results[i].CM_SEN,
					pow: 	myJSON.d.results[i].CM_POW,
					dri: 	myJSON.d.results[i].CM_DRI,
			};
			myHplApp.cockpit.datalink.model.setStatsMessageCategoryId(datalinkStatsMessageCategoryId);
		};		
	};
	

	myHplApp.cockpit.datalink.controller.onErrorStatsMessageCategoryId = function(jqXHR, textStatus, errorThrown){

	};


	myHplApp.cockpit.datalink.controller.getMissionStatsSpeed = function() {
		var myUrl = myHplApp.cockpit.datalink.model.getConfigServiceMissionStatsSpeedUri() +
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
	         success: myHplApp.cockpit.datalink.controller.onLoadStatsSpeed,
	         error: myHplApp.cockpit.datalink.controller.onErrorStatsSpeed 
		});
	};
	
		
	myHplApp.cockpit.datalink.controller.onLoadStatsSpeed = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			myHplApp.cockpit.datalink.model.setSpeedStatsMaxCms(myJSON.d.results[i].MAX_SPEED_CMS);
			myHplApp.cockpit.datalink.model.setSpeedStatsMaxKph(myJSON.d.results[i].MAX_SPEED_KPH);
			myHplApp.cockpit.datalink.model.setSpeedStatsMaxMph(myJSON.d.results[i].MAX_SPEED_MPH);
			myHplApp.cockpit.datalink.model.setSpeedStatsAvgCms(myJSON.d.results[i].AVG_SPEED_CMS);
			myHplApp.cockpit.datalink.model.setSpeedStatsAvgKph(myJSON.d.results[i].AVG_SPEED_KPH);
			myHplApp.cockpit.datalink.model.setSpeedStatsAvgMph(myJSON.d.results[i].AVG_SPEED_MPH);

		};		
	};
	

	myHplApp.cockpit.datalink.controller.onErrorStatsSpeed = function(jqXHR, textStatus, errorThrown){

	};

	

	myHplApp.cockpit.datalink.controller.getMissionStatsAlt = function() {
		var myUrl = myHplApp.cockpit.datalink.model.getConfigServiceMissionStatsAltUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,MIN_ALT_M,MIN_ALT_FT,MAX_ALT_M,MAX_ALT_FT,AVG_ALT_M,AVG_ALT_FT&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplApp.cockpit.datalink.controller.onLoadStatsAlt,
	         error: myHplApp.cockpit.datalink.controller.onErrorStatsAlt 
		});
	};
	
		
	myHplApp.cockpit.datalink.controller.onLoadStatsAlt = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			myHplApp.cockpit.datalink.model.setAltStatsMinM(myJSON.d.results[i].MIN_ALT_M);
			myHplApp.cockpit.datalink.model.setAltStatsMinFt(myJSON.d.results[i].MIN_ALT_FT);
			myHplApp.cockpit.datalink.model.setAltStatsMaxM(myJSON.d.results[i].MAX_ALT_M);
			myHplApp.cockpit.datalink.model.setAltStatsMaxFt(myJSON.d.results[i].MAX_ALT_FT);
			myHplApp.cockpit.datalink.model.setAltStatsAvgM(myJSON.d.results[i].AVG_ALT_M);
			myHplApp.cockpit.datalink.model.setAltStatsAvgFt(myJSON.d.results[i].AVG_ALT_FT);

		};		
	};
	

	myHplApp.cockpit.datalink.controller.onErrorStatsAlt = function(jqXHR, textStatus, errorThrown){

	};

	
	myHplApp.cockpit.datalink.controller.getMissionDistanceTravelled = function() {
		var myUrl = myHplApp.cockpit.datalink.model.getConfigServiceMissionDistanceTravelledUri() +
			'?missionId=' +
			myHplApp.missioncontrol.model.getActiveMissionId() +
			'&vehicleId=' +
			myHplApp.missioncontrol.model.getActiveVehicleId() +
			'&pilotId=' +
			myHplApp.missioncontrol.model.getActivePilotId(); 
		jQuery.ajax({
			url:myUrl,
			dataType: 'jsonp',
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			async: true,
			success: myHplApp.cockpit.datalink.controller.processMissionDistanceTravelled,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		
	};

	myHplApp.cockpit.datalink.controller.processMissionDistanceTravelled = function(data) {
		console.log(data);
		myHplApp.cockpit.datalink.model.setDistanceStatsTravelledM(data.distanceTravelledM);	
	};
	
	
	myHplApp.cockpit.datalink.controller.init();
	
} (myHplApp = window.myHplApp || {}));