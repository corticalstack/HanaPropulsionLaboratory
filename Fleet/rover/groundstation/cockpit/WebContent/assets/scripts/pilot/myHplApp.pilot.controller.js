(function (myHplApp) {
 
	myHplApp.pilot.controller 	= myHplApp.pilot.controller || {};
	
	var pilotModel 				= myHplApp.pilot.model;
	var missioncontrolModel 	= myHplApp.missioncontrol.model;
	
	
	
	
	myHplApp.pilot.controller.init = function() {
		console.log('Initialising pilot controller');	
		myHplApp.pilot.controller.setPilotRoster();
	};
	
	
	myHplApp.pilot.controller.setPilotRoster = function() { 
		$.ajax({ type: 'GET',
	         url: missioncontrolModel.getConfigServicePilotsUri(),
	         dataType: 'json',
	         crossDomain: true,
	         async: false, 
	         success: myHplApp.pilot.controller.onLoadPilots,
	         error: myHplApp.pilot.controller.onErrorCall 
		});
	};
	
		
	myHplApp.pilot.controller.onLoadPilots = function(myJSON) {
		console.log('Pilot roster uploaded from mission control');
		missioncontrolModel.setStateMissioncontrolOnline(true);
		for (var i = 0; i<myJSON.d.results.length; i++) {
			var pilot = {
					pilotId: 	myJSON.d.results[i].pilotId,
					name: 		myJSON.d.results[i].name,
					avatarUri: 	myJSON.d.results[i].avatarUri,
					clanName: 	myJSON.d.results[i].clanName,
					clanUri: 	myJSON.d.results[i].clanUri
			};
			pilotModel.pushRoster(pilot);
		};		
	};



	myHplApp.pilot.controller.onErrorCall = function(jqXHR, textStatus, errorThrown){
//		sap.ui.core.BusyIndicator.hide();		
//		sap.ui.commons.MessageBox.show(jqXHR.responseText, 
//				 "ERROR",
//				 otextBundle.getText("error") );		
//		return;
		console.log('Pilot roster default set');
		var pilot = {
				pilotId: 	'1',
				name: 		'JP',
				avatarUri: 	'assets/images/pilots/avatarJP.png',
				clanName: 	'Wolf',
				clanUri: 	'assets/images/emblems/Wolf.jpg'
		};
		pilotModel.pushRoster(pilot);
		
		var pilot = {
				pilotId: 	'2',
				name: 		'Nadia',
				avatarUri: 	'assets/images/pilots/avatarNadia.png',
				clanName: 	'Black Widow',
				clanUri: 	'assets/images/emblems/Black Widow.jpg'
		};
		pilotModel.pushRoster(pilot);
		
		var pilot = {
				pilotId: 	'6',
				name: 		'Jane',
				avatarUri: 	'assets/images/pilots/avatarJane.png',
				clanName: 	'Snake',
				clanUri: 	'assets/images/emblems/Snake.jpg'
		};
		pilotModel.pushRoster(pilot);

		var pilot = {
				pilotId: 	'7',
				name: 		'Joe',
				avatarUri: 	'assets/images/pilots/avatarJoe.png',
				clanName: 	'Wasp',
				clanUri: 	'assets/images/emblems/Wasp.jpg'
		};
		pilotModel.pushRoster(pilot);

	};
	
	
	myHplApp.pilot.controller.init();
	
} (myHplApp = window.myHplApp || {}));