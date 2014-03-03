(function(myHplMcApp) {
 
	myHplMcApp.controller = myHplMcApp.controller || {};
	
	var model 				  = myHplMcApp.model; 	
	
	myHplMcApp.controller.init = function() {
		console.log('Initialising Hana Mission controll app controller');	
		model.setConfigSlocale();		
		model.setConfigOtextBundle();

		
	};
	
	
	myHplMcApp.controller.getTextFromBundle = function(textId) {
		return model.getOtextBundle().getText(textId);
	};
	
			
	myHplMcApp.controller.toRad = function(val) {
		return val * 0.0174532925199433;  // (PI / 180)
	};


	myHplMcApp.controller.toDeg = function(val) {
		return val * 57.2957795131;  // (180 / PI)		
	};

	
	myHplMcApp.controller.init();
	
} (myHplMcApp = window.myHplMcApp || {}));	
	