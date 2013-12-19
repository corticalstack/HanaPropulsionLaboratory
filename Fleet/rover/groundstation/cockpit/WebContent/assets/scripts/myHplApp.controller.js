(function(myHplApp) {
 
	myHplApp.controller = myHplApp.controller || {};
	
	var model = myHplApp.model;
	var cockpitMapsController = myHplApp.cockpit.maps.controller; 
	
	
	myHplApp.controller.init = function() {
		console.log('Initialising app controller');	
		model.setConfigSlocale();		
		model.setConfigOtextBundle();
		model.setConfigViews();
		model.initLayoutHome();
		model.setConfigCurrentViewContent(model.getConfigMainmenuView());

	};
	
	
	myHplApp.controller.getTextFromBundle = function(textId) {
		model.getOtextBundle().getText(textId);
	};
	
	
	myHplApp.controller.setViewContent = function(oControlEvent) {
		model.removeCurrentHomeContent();
		
		switch (oControlEvent.getSource().getId())
		{
			case "lnkSoloCampaign":
				model.setConfigCurrentViewContent(pilotView);
				model.setLayoutHomeContent(model.config.currentViewContent);
				break;
			case "lnkMultiplayer":
				model.setConfigCurrentViewContent(pilotView);
				model.setLayoutHomeContent(model.config.currentViewContent);
				break;
				
			case "lnkFreeride":
				model.setConfigCurrentViewContent(pilotView);
				model.setLayoutHomeContent(model.config.currentViewContent);
				break;
				
			case "lnkSettings":
//				currentViewContent = settingsView;
				break;
				
			case "lnkQuit":
//				currentViewContent = quitView;
				break;
			
			case "lnkLaunch" + oControlEvent.getSource().getId().slice("lnkLaunch".length):
				model.config.currentViewContent = model.config.cockpitView;
				model.config.oAbsoluteLayoutHome.addContent(model.config.currentViewContent);
				$.fn.hideBackgroundImage();
				cockpitMapsController.googleMapInitialise();
				//newGauge();			
				//newFlot();
				
				break;
		}
	};	
	
	
	myHplApp.controller.init();
	
} (myHplApp = window.myHplApp || {}));	
	