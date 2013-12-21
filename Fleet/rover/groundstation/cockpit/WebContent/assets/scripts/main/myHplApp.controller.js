(function(myHplApp) {
 
	myHplApp.controller = myHplApp.controller || {};
	
	var model 				  = myHplApp.model;
//	var cockpitMapsController = myHplApp.cockpit.maps.controller; 
	
	
	myHplApp.controller.init = function() {
		console.log('Initialising app controller');	
		model.setConfigSlocale();		
		model.setConfigOtextBundle();

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
				
			case "lnkFreeride":
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
				model.setConfigCurrentViewContent(model.getConfigCockpitView());
				model.setLayoutHomeContent(model.getConfigCurrentViewContent());
				$.fn.hideBackgroundImage();
				myHplApp.cockpit.maps.controller.googleMapInitialise();
				myHplApp.cockpit.controller.initGauges();			
				myHplApp.cockpit.controller.initIndicators();
				sap.ui.getCore().byId("viewCockpit").getController().refreshIndicators();
				//newFlot();
				
				break;
		}
	};	
	
	
	myHplApp.controller.init();
	
} (myHplApp = window.myHplApp || {}));	
	