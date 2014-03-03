(function (myHplMcApp) {
 
    //create a nested namespace
	myHplMcApp.model = myHplMcApp.model || {};
 
 
	var config = {
			sLocale: 			'en',
			otextBundle: 		{},
			oAbsoluteLayoutHome: {}
	};
	
	
	
	myHplMcApp.model.setConfigSlocale = function() {
		config.sLocale = sap.ui.getCore().getConfiguration().getLanguage();
	};

	
	myHplMcApp.model.getOtextBundle = function() {
		return config.otextBundle;
	};


		
	myHplMcApp.model.setConfigOtextBundle = function() {
  	    config.otextBundle = jQuery.sap.resources({url : "/assets/i18n/messagebundle.hdbtextbundle", locale: config.sLocale});
	};


} (myHplMcApp = window.myHplMcApp || {}));









