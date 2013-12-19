(function (myHplApp) {
 
    //create a nested namespace
	myHplApp.model = myHplApp.model || {};
 
 
	var config = {
			sLocale: 			'en',
			otextBundle: 		{},
			msgTerminator: 		':]',
			mainmenuView: 		'',
			cockpitView:    	'',
			pilotView:      	'',
			currentViewContent: '',
			oAbsoluteLayoutHome: {}
	};
	
	
	myHplApp.model.setConfigSlocale = function() {
		config.sLocale = sap.ui.getCore().getConfiguration().getLanguage();
	};

	
	myHplApp.model.getOtextBundle = function() {
		return config.otextBundle;
	};


		
	myHplApp.model.setConfigOtextBundle = function() {
  	    config.otextBundle = jQuery.sap.resources({url : "./assets/i18n/messagebundle.hdbtextbundle", locale: config.sLocale});
	};


	myHplApp.model.getConfigMainmenuView = function() {
  	    return config.mainmenuView;
	};


	myHplApp.model.getConfigCockpitView = function() {
  	    return config.cockpitView;
	};

	myHplApp.model.getConfigPilotView = function() {
  	    return config.pilotView;
	};

	
	myHplApp.model.initLayoutHome = function() {
		config.oAbsoluteLayoutHome = new sap.ui.commons.layout.AbsoluteLayout({width: "100%", height: "100%"});
	};
	
	
	myHplApp.model.setConfigViews = function() {
		sap.ui.localResources("mainmenu_ui_resources");
		config.mainmenuView = sap.ui.view({  
		    	id: 		"viewMainMenu",  
		    	viewName:	"mainmenu_ui_resources.mainmenu",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});  


		sap.ui.localResources("cockpit_ui_resources");
		config.cockpitView = sap.ui.view({  
		    	id: 		"viewCockpit",  
		    	viewName: 	"cockpit_ui_resources.cockpit",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});  


		sap.ui.localResources("pilot_ui_resources");
		config.pilotView = sap.ui.view({  
		    	id: 		"viewPilot",  
		    	viewName: 	"pilot_ui_resources.pilot",  
		    	type: 		sap.ui.core.mvc.ViewType.JS  
		});
	};

	myHplApp.model.removeCurrentHomeContent = function(view) {
		config.oAbsoluteLayoutHome.removeContent(config.currentViewContent);
	};

	
	myHplApp.model.setLayoutHomeContent = function(view) {
		config.oAbsoluteLayoutHome.addContent(view);
	};

	myHplApp.model.getLayoutHomeContent = function(view) {
		return config.oAbsoluteLayoutHome;
	};

	myHplApp.model.setConfigCurrentViewContent = function(view) {
		config.currentViewContent = view;
	};
	
} (myHplApp = window.myHplApp || {}));









