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

	
	
	myHplApp.model.setLayoutHomeContent = function(view) {
		config.oAbsoluteLayoutHome.addContent(view);
	};

	myHplApp.model.getLayoutHomeContent = function(view) {
		return config.oAbsoluteLayoutHome;
	};

	
} (myHplApp = window.myHplApp || {}));









