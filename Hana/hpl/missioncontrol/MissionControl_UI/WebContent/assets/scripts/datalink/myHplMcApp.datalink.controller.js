(function (myHplMcApp) {
 
	myHplMcApp.datalink.controller = myHplMcApp.datalink.controller || {};
	
	var missioncontrolModel 	= myHplMcApp.missioncontrol.model;
	var datalinkModel 	    	= myHplMcApp.datalink.model;
	var datalinkRefreshTick    	= 0;	
	

	myHplMcApp.datalink.controller.init = function() { 
		console.log('Initialising Hana Datalink Controller');		
		myHplMcApp.missioncontrol.model.setActiveMissionId(jQuery.sap.getUriParameters().get("missionId"));
		myHplMcApp.missioncontrol.model.setActiveVehicleId(jQuery.sap.getUriParameters().get("vehicleId"));
		myHplMcApp.missioncontrol.model.setActivePilotId(jQuery.sap.getUriParameters().get("pilotId"));
    };	
	
    
    myHplMcApp.datalink.controller.setStateActive = function(bool) {
		datalinkModel.setStateActive(bool);
		switch(bool){
			case false:
				myHplMcApp.datalink.controller.clearDatalinkRefreshTick();			
				break;
			case true:
				myHplMcApp.datalink.controller.setDatalinkRefreshTick();
				break;
		} 
	};
	
	
	myHplMcApp.datalink.controller.getMissionMessageCategoryIdRanking = function() {
		var myUrl = datalinkModel.getConfigServiceMissionMessageCategoryIdRankingUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplMcApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplMcApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplMcApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,CM_NAV,CM_COC,CM_NOT,CM_SEN,CM_POW,CM_DRI&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true, 
	         success: myHplMcApp.datalink.controller.onLoadMessageCategoryIdRanking,
	         error: myHplMcApp.datalink.controller.onErrorMessageCategoryIdRanking 
		});
	};
	
		
	myHplMcApp.datalink.controller.onLoadMessageCategoryIdRanking = function(myJSON) {
		console.log('Datalink loaded from mission control');
		console.log(myJSON);
		for (var i = 0; i<myJSON.d.results.length; i++) {
			var datalinkMessageCategoryIdStats = {
					nav: 	myJSON.d.results[i].CM_NAV,
					coc: 	myJSON.d.results[i].CM_COC,
					not: 	myJSON.d.results[i].CM_NOT,
					sen: 	myJSON.d.results[i].CM_SEN,
					pow: 	myJSON.d.results[i].CM_POW,
					dri: 	myJSON.d.results[i].CM_DRI,
			};
			datalinkModel.setMessageCategoryIdStats(datalinkMessageCategoryIdStats);
		};		
	};
	

	myHplMcApp.datalink.controller.onErrorMessageCategoryIdRanking = function(jqXHR, textStatus, errorThrown){

	};


	myHplMcApp.datalink.controller.getMissionMaxSpeed = function() {
		var myUrl = datalinkModel.getConfigServiceMissionMaxSpeedUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplMcApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplMcApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplMcApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,CA_SPEED_KPH,CA_SPEED_MPH&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplMcApp.datalink.controller.onLoadMaxSpeed,
	         error: myHplMcApp.datalink.controller.onErrorMaxSpeed 
		});
	};
	
		
	myHplMcApp.datalink.controller.onLoadMaxSpeed = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			datalinkModel.setSpeedStatsMaxCms(myJSON.d.results[i].GPSVELSPEEDCMS);
			datalinkModel.setSpeedStatsMaxKph(myJSON.d.results[i].CA_SPEED_KPH);
		};		
	};
	

	myHplMcApp.datalink.controller.onErrorMaxSpeed = function(jqXHR, textStatus, errorThrown){

	};

	

	myHplMcApp.datalink.controller.getMissionAvgSpeed = function() {
		var myUrl = datalinkModel.getConfigServiceMissionAvgSpeedUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplMcApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplMcApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplMcApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,CA_SPEED_CMS,CA_SPEED_KPH,CA_SPEED_MPH&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplMcApp.datalink.controller.onLoadAvgSpeed,
	         error: myHplMcApp.datalink.controller.onErrorAvgSpeed 
		});
	};
	
		
	myHplMcApp.datalink.controller.onLoadAvgSpeed = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			datalinkModel.setSpeedStatsAvgCms(myJSON.d.results[i].CA_SPEED_CMS);
			datalinkModel.setSpeedStatsAvgKph(myJSON.d.results[i].CA_SPEED_KPH);
		};		
	};
	

	myHplMcApp.datalink.controller.onErrorAvgSpeed = function(jqXHR, textStatus, errorThrown){

	};
	

	myHplMcApp.datalink.controller.getMissionMinAlt = function() {
		var myUrl = datalinkModel.getConfigServiceMissionMinAltUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplMcApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplMcApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplMcApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,CA_ALT_FT,GPSPOSALTITUDE&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplMcApp.datalink.controller.onLoadMinAlt,
	         error: myHplMcApp.datalink.controller.onErrorMinAlt 
		});
	};
	
		
	myHplMcApp.datalink.controller.onLoadMinAlt = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			datalinkModel.setAltStatsMinM(myJSON.d.results[i].GPSPOSALTITUDE);
			datalinkModel.setAltStatsMinFt(myJSON.d.results[i].CA_ALT_FT);
		};		
	};
	

	myHplMcApp.datalink.controller.onErrorMinAlt = function(jqXHR, textStatus, errorThrown){

	};


	myHplMcApp.datalink.controller.getMissionMaxAlt = function() {
		var myUrl = datalinkModel.getConfigServiceMissionMaxAltUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplMcApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplMcApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplMcApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,CA_ALT_FT,GPSPOSALTITUDE&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplMcApp.datalink.controller.onLoadMaxAlt,
	         error: myHplMcApp.datalink.controller.onErrorMaxAlt 
		});
	};
	
		
	myHplMcApp.datalink.controller.onLoadMaxAlt = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			datalinkModel.setAltStatsMaxM(myJSON.d.results[i].GPSPOSALTITUDE);
			datalinkModel.setAltStatsMaxFt(myJSON.d.results[i].CA_ALT_FT);
		};		
	};
	

	myHplMcApp.datalink.controller.onErrorMaxAlt = function(jqXHR, textStatus, errorThrown){

	};


	myHplMcApp.datalink.controller.getMissionAvgAlt = function() {
		var myUrl = datalinkModel.getConfigServiceMissionAvgAltUri() +
		'/InputParams(IP_MISSIONID=\'' +
		myHplMcApp.missioncontrol.model.getActiveMissionId() +
		'\',IP_VEHICLEID=\'' +
		myHplMcApp.missioncontrol.model.getActiveVehicleId() +
		'\',IP_PILOTID=\'' +
		myHplMcApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results?$select=MISSIONID_MISSIONID,VEHICLEID_VEHICLEID,PILOTID_PILOTID,CA_ALT_M,CA_ALT_FT&$format=json';
		$.ajax({ type: 'GET',
	         url: myUrl,
	         dataType: 'json',
	         crossDomain: true,
	         async: true,
	         success: myHplMcApp.datalink.controller.onLoadAvgAlt,
	         error: myHplMcApp.datalink.controller.onErrorAvgAlt 
		});
	};
	
		
	myHplMcApp.datalink.controller.onLoadAvgAlt = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			datalinkModel.setAltStatsAvgM(myJSON.d.results[i].CA_ALT_M);
			datalinkModel.setAltStatsAvgFt(myJSON.d.results[i].CA_ALT_FT);
		};		
	};
	

	myHplMcApp.datalink.controller.onErrorAvgAlt = function(jqXHR, textStatus, errorThrown){

	};

	
	myHplMcApp.datalink.controller.getMissionDistanceTravelled = function() {
		var myUrl = datalinkModel.getConfigServiceMissionDistanceTravelledUri() +
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
			success: myHplMcApp.datalink.controller.processMissionDistanceTravelled,
			error: function(xhr, status, error) { console.log('Error ', xhr); console.log(status); console.log(error);}
		});	
		
		
	};

	myHplMcApp.datalink.controller.processMissionDistanceTravelled = function(data) {
		console.log(data);
		datalinkModel.setDistanceStatsTravelledM(data.distanceTravelledM);	
	};
	
	
	myHplMcApp.datalink.controller.setDatalinkRefreshTick = function() {
		console.log('Hana Datalink setting refresh.....');
		datalinkRefreshTick = setInterval(function(){sap.ui.getCore().byId("viewDatalink").getController().datalinkRefresh()},1000);
	};


	myHplMcApp.datalink.controller.clearDatalinkRefreshTick  = function() {
		clearInterval(datalinkRefreshTick);
	};

    
	myHplMcApp.datalink.controller.init();
	
} (myHplMcApp = window.myHplMcApp || {}));