(function (myHplMcApp) {
 
	myHplMcApp.orbital.controller = myHplMcApp.orbital.controller || {};
	
	var missioncontrolModel 	= myHplMcApp.missioncontrol.model;
	var orbitalModel 	    	= myHplMcApp.orbital.model;
	var orbitalRefreshTick    	= 0;	
	

	myHplMcApp.orbital.controller.init = function() { 
		console.log('Initialising Hana Orbital Controller');	
		console.log('Orbital mission ',jQuery.sap.getUriParameters().get("missionId"));
		console.log('Orbital vehicle ',jQuery.sap.getUriParameters().get("vehicleId"));
		console.log('Orbital pilot ',jQuery.sap.getUriParameters().get("pilotId"));
		myHplMcApp.missioncontrol.model.setActiveMissionId(jQuery.sap.getUriParameters().get("missionId"));
		myHplMcApp.missioncontrol.model.setActiveVehicleId(jQuery.sap.getUriParameters().get("vehicleId"));
		myHplMcApp.missioncontrol.model.setActivePilotId(jQuery.sap.getUriParameters().get("pilotId"));
    };	
	
    
    myHplMcApp.orbital.controller.setStateActive = function(bool) {
		orbitalModel.setStateActive(bool);
		switch(bool){
			case false:
				myHplMcApp.orbital.controller.clearOrbitalRefreshTick();			
				break;
			case true:
				myHplMcApp.orbital.controller.setOrbitalRefreshTick();
				break;
		} 
	};
	
	
	myHplMcApp.orbital.controller.getMissionStatsSpeed = function() {
		var myUrl = orbitalModel.getConfigServiceMissionStatsSpeedUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplMcApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplMcApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplMcApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,AVG_SPEED_CMS,AVG_SPEED_KPH,AVG_SPEED_MPH,MAX_SPEED_CMS,MAX_SPEED_KPH,MAX_SPEED_MPH&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplMcApp.orbital.controller.onLoadStatsSpeed,
	         error: myHplMcApp.orbital.controller.onErrorStatsSpeed 
		});
	};
	
		
	myHplMcApp.orbital.controller.onLoadStatsSpeed = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			orbitalModel.setSpeedStatsMaxCms(myJSON.d.results[i].MAX_SPEED_CMS);
			orbitalModel.setSpeedStatsMaxKph(myJSON.d.results[i].MAX_SPEED_KPH);
			orbitalModel.setSpeedStatsMaxMph(myJSON.d.results[i].MAX_SPEED_MPH);
			orbitalModel.setSpeedStatsAvgCms(myJSON.d.results[i].AVG_SPEED_CMS);
			orbitalModel.setSpeedStatsAvgKph(myJSON.d.results[i].AVG_SPEED_KPH);
			orbitalModel.setSpeedStatsAvgMph(myJSON.d.results[i].AVG_SPEED_MPH);

		};		
	};
	

	myHplMcApp.orbital.controller.onErrorStatsSpeed = function(jqXHR, textStatus, errorThrown){

	};

	

	myHplMcApp.orbital.controller.getMissionStatsAlt = function() {
		var myUrl = orbitalModel.getConfigServiceMissionStatsAltUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplMcApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplMcApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplMcApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,MIN_ALT_M,MIN_ALT_FT,MAX_ALT_M,MAX_ALT_FT,AVG_ALT_M,AVG_ALT_FT&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplMcApp.orbital.controller.onLoadStatsAlt,
	         error: myHplMcApp.orbital.controller.onErrorStatsAlt 
		});
	};
	
		
	myHplMcApp.orbital.controller.onLoadStatsAlt = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			orbitalModel.setAltStatsMinM(myJSON.d.results[i].MIN_ALT_M);
			orbitalModel.setAltStatsMinFt(myJSON.d.results[i].MIN_ALT_FT);
			orbitalModel.setAltStatsMaxM(myJSON.d.results[i].MAX_ALT_M);
			orbitalModel.setAltStatsMaxFt(myJSON.d.results[i].MAX_ALT_FT);
			orbitalModel.setAltStatsAvgM(myJSON.d.results[i].AVG_ALT_M);
			orbitalModel.setAltStatsAvgFt(myJSON.d.results[i].AVG_ALT_FT);

		};		
	};
	

	myHplMcApp.orbital.controller.onErrorStatsAlt = function(jqXHR, textStatus, errorThrown){

	};

	
	myHplMcApp.orbital.controller.getMissionDistanceTravelled = function() {
		var myUrl = orbitalModel.getConfigServiceMissionDistanceTravelledUri() +
			'?missionId=' +
			myHplMcApp.missioncontrol.model.getActiveMissionId() +
			'&vehicleId=' +
			myHplMcApp.missioncontrol.model.getActiveVehicleId() +
			'&pilotId=' +
			myHplMcApp.missioncontrol.model.getActivePilotId(); 
		jQuery.ajax({
			url:myUrl,
			dataType: 'jsonp',
			type: 'GET',
			headers : {"Access-Control-Allow-Origin" : "*"},
			crossDomain: true,
			async: true,
			success: myHplMcApp.orbital.controller.processMissionDistanceTravelled,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		
	};

	myHplMcApp.orbital.controller.processMissionDistanceTravelled = function(data) {
		console.log(data);
		orbitalModel.setDistanceStatsTravelledM(data.distanceTravelledM);	
	};
	
	
	myHplMcApp.orbital.controller.setOrbitalRefreshTick = function() {
		console.log('Hana Orbital setting refresh.....');
		orbitalRefreshTick = setInterval(function(){sap.ui.getCore().byId("viewOrbital").getController().orbitalRefresh()},1000);
	};


	myHplMcApp.orbital.controller.clearOrbitalRefreshTick  = function() {
		clearInterval(orbitalRefreshTick);
	};

    
	myHplMcApp.orbital.controller.init();
	
} (myHplMcApp = window.myHplMcApp || {}));