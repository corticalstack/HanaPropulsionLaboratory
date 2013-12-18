(function(myHplApp) {
 
	myHplApp.controller = myHplApp.controller || {};
	
	var model = myHplApp.model;
	
	
	myHplApp.controller.init = function() {
		console.log('Initialising app controller');	
		model.setConfigSlocale();		
		model.setConfigOtextBundle();
		sap.ui.localResources("mainmenu_ui_resources");
		model.config.mainmenuView = sap.ui.view({  
		    	id: 		"viewMainMenu",  
		    	viewName:	"mainmenu_ui_resources.mainmenu",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});  


		sap.ui.localResources("cockpit_ui_resources");
		model.config.cockpitView = sap.ui.view({  
		    	id: 		"viewCockpit",  
		    	viewName: 	"cockpit_ui_resources.cockpit",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});  


		sap.ui.localResources("pilot_ui_resources");
		model.config.pilotView = sap.ui.view({  
		    	id: 		"viewPilot",  
		    	viewName: 	"pilot_ui_resources.pilot",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});
		
		
		model.config.oAbsoluteLayoutHome = new sap.ui.commons.layout.AbsoluteLayout({width: "100%", height: "100%"});
		model.config.currentViewContent  = model.config.mainmenuView;

	};
	
	
	myHplApp.controller.getTextFromBundle = function(textId) {
		model.getOtextBundle().getText(textId);
	}
	
	
	
	myHplApp.controller.init();
	
} (myHplApp = window.myHplApp || {}));	
	