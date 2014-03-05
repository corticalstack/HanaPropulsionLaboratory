(function (myHplMcApp) {
 
	myHplMcApp.datalink.controller = myHplMcApp.datalink.controller || {};
	
	var missioncontrolModel 	= myHplMcApp.missioncontrol.model;
	var datalinkModel 	    	= myHplMcApp.datalink.model;
	var datalinkRefreshTick    	= 0;	
	

	myHplMcApp.datalink.controller.init = function() { 
		console.log('Initialising Hana Datalink Controller');	
		console.log('Datalink mission ',jQuery.sap.getUriParameters().get("missionId"));
		console.log('Datalink vehicle ',jQuery.sap.getUriParameters().get("vehicleId"));
		console.log('Datalink pilot ',jQuery.sap.getUriParameters().get("pilotId"));
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


	myHplMcApp.datalink.controller.getMissionStatsSpeed = function() {
		var myUrl = datalinkModel.getConfigServiceMissionStatsSpeedUri() +
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
	         success: myHplMcApp.datalink.controller.onLoadStatsSpeed,
	         error: myHplMcApp.datalink.controller.onErrorStatsSpeed 
		});
	};
	
		
	myHplMcApp.datalink.controller.onLoadStatsSpeed = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			datalinkModel.setSpeedStatsMaxCms(myJSON.d.results[i].MAX_SPEED_CMS);
			datalinkModel.setSpeedStatsMaxKph(myJSON.d.results[i].MAX_SPEED_KPH);
			datalinkModel.setSpeedStatsMaxMph(myJSON.d.results[i].MAX_SPEED_MPH);
			datalinkModel.setSpeedStatsAvgCms(myJSON.d.results[i].AVG_SPEED_CMS);
			datalinkModel.setSpeedStatsAvgKph(myJSON.d.results[i].AVG_SPEED_KPH);
			datalinkModel.setSpeedStatsAvgMph(myJSON.d.results[i].AVG_SPEED_MPH);

		};		
	};
	

	myHplMcApp.datalink.controller.onErrorStatsSpeed = function(jqXHR, textStatus, errorThrown){

	};

	

	myHplMcApp.datalink.controller.getMissionStatsAlt = function() {
		var myUrl = datalinkModel.getConfigServiceMissionStatsAltUri() +
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
	         success: myHplMcApp.datalink.controller.onLoadStatsAlt,
	         error: myHplMcApp.datalink.controller.onErrorStatsAlt 
		});
	};
	
		
	myHplMcApp.datalink.controller.onLoadStatsAlt = function(myJSON) {
		for (var i = 0; i<myJSON.d.results.length; i++) {
			datalinkModel.setAltStatsMinM(myJSON.d.results[i].MIN_ALT_M);
			datalinkModel.setAltStatsMinFt(myJSON.d.results[i].MIN_ALT_FT);
			datalinkModel.setAltStatsMaxM(myJSON.d.results[i].MAX_ALT_M);
			datalinkModel.setAltStatsMaxFt(myJSON.d.results[i].MAX_ALT_FT);
			datalinkModel.setAltStatsAvgM(myJSON.d.results[i].AVG_ALT_M);
			datalinkModel.setAltStatsAvgFt(myJSON.d.results[i].AVG_ALT_FT);

		};		
	};
	

	myHplMcApp.datalink.controller.onErrorStatsAlt = function(jqXHR, textStatus, errorThrown){

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