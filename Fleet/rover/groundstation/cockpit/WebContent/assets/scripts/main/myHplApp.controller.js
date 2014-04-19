(function(myHplApp) {
 
	myHplApp.controller = myHplApp.controller || {};
	
	var model 				  = myHplApp.model;
//	var cockpitMapsController = myHplApp.cockpit.maps.controller; 
	
	
	myHplApp.controller.init = function() {
		console.log('Initialising app controller');	
		model.setConfigSlocale();		
		model.setConfigOtextBundle();
		model.setAssetLoaderInit();
		
		//Load all sound effects
		model.setLoadSoundEffects();
		setTimeout(function(){myHplApp.controller.playSoundEffect({'effect': 'time', 'volume': 0.8})},3000);
		

	};
	
	
	myHplApp.controller.getTextFromBundle = function(textId) {
		return model.getOtextBundle().getText(textId);
	};
	
			
	myHplApp.controller.setViewContent = function(oControlEvent) {
		model.removeCurrentHomeContent();
		
		switch (oControlEvent.getSource().getId())
		{
			case "lnkSoloCampaign":
				model.setConfigCurrentViewContent(model.getConfigPilotView());
				model.setLayoutHomeContent(model.getConfigCurrentViewContent());
				break;
			
			case "lnkMultiplayer":
				model.setConfigCurrentViewContent(model.getConfigPilotView());
				model.setLayoutHomeContent(model.getConfigCurrentViewContent());
				break;
								
			case "lnkSettings":
//				currentViewContent = settingsView;
				break;
				
			case "lnkQuit":
//				currentViewContent = quitView;
				break;
			
			case "lnkLaunch" + oControlEvent.getSource().getId().slice("lnkLaunch".length):
				console.log(oControlEvent.getSource().getId().slice("lnkLaunch".length));
				console.log(oControlEvent.getSource().getId());
				model.setConfigCockpitView();
				model.setConfigCurrentViewContent(model.getConfigCockpitView());
				model.setLayoutHomeContent(model.getConfigCurrentViewContent());				
				$.fn.hideBackgroundImage();
				myHplApp.controller.stopSoundEffect('time');
				myHplApp.model.setMessageQueue();
				myHplApp.missioncontrol.model.setActivePilotId(oControlEvent.getSource().getId().slice("lnkLaunch".length));
				myHplApp.cockpit.controller.launch();												
				break;
		}
	};	
	
	
	myHplApp.controller.playSoundEffect = function(effectOptions) {		
		var defaults = { 
				effect:      'bleep', 
			    volume:      0.5
		};
		
		var options 	  = $.extend({}, defaults, effectOptions);		
		var sound 	 	  = myHplApp.model.getSoundEffectByName(options.effect);
		sound.volume 	  = options.volume;
		sound.currentTime = 0;
		sound.play();
	};
	

	
	myHplApp.controller.stopSoundEffect = function(effect) {
		var sound = myHplApp.model.getSoundEffectByName(effect);
		sound.pause();
		sound.currentTime = 0;
	};


	myHplApp.controller.soundEffectIsPlaying = function(effect) {
		var sound = myHplApp.model.getSoundEffectByName(effect);
		return !sound.paused && !sound.ended && 0 < sound.currentTime;
	};

	myHplApp.controller.toRad = function(val) {
		return val * 0.0174532925199433;  // (PI / 180)
	};


	myHplApp.controller.toDeg = function(val) {
		return val * 57.2957795131;  // (180 / PI)		
	};

	
	myHplApp.controller.Distance = function(fromLattitude, fromLongitude, toLattitude, toLongitude) {
		var earthRadiusMetres = 6371000; // in metres
		var distanceLattitude = myHplApp.controller.toRad(fromLattitude - toLattitude);
		var distanceLongitude = myHplApp.controller.toRad(fromLongitude - toLongitude);
		var lat1 = myHplApp.controller.toRad(fromLattitude);
		var lat2 = myHplApp.controller.toRad(toLattitude);
		var a = Math.sin(distanceLattitude / 2) * Math.sin(distanceLattitude / 2) +
		        Math.sin(distanceLongitude / 2) * Math.sin(distanceLongitude / 2) * 
		        Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));	
		var distance = (earthRadiusMetres * c).toFixed(2);
		return distance;
	};
	

	myHplApp.controller.Bearing = function(fromLattitude, fromLongitude, toLattitude, toLongitude) {
		var distanceLattitude = myHplApp.controller.toRad(fromLattitude - toLattitude);
		var distanceLongitude = myHplApp.controller.toRad(fromLongitude - toLongitude);
		
		var y = Math.sin(distanceLongitude) * Math.cos(toLattitude);
		var x = Math.cos(fromLattitude)*Math.sin(toLattitude) -
		        Math.sin(fromLattitude)*Math.cos(toLattitude)*Math.cos(distanceLongitude);
		var bearing = myHplApp.controller.toDeg(Math.atan2(y, x));
		bearing = ((bearing + 360.0) % 360.0).toFixed(0);
		return bearing;
	};

	myHplApp.controller.init();
	
} (myHplApp = window.myHplApp || {}));	
	