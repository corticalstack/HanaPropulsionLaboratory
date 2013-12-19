(function(myHplApp) {
 
	myHplApp.cockpit.model = myHplApp.cockpit.model || {};
	
	var config = {
			socketEvent:		'cockpit',
			gaugeCurrent:   	{},
			gaugeAmps:			{},
			gaugeConsumedMah: 	{},
			gaugeVoltage:		{},
			gaugeBattRemaining:	{},
			gaugeThrust:		{},
			gaugeAmmo:			{},
			gaugeShield:		{},
			gaugeCoreTemp:		{}
	};
	
	
	//Get methods
	myHplApp.cockpit.model.getGaugeCurrent = function() {
		return config.gaugeCurrent;
	};
    

	myHplApp.cockpit.model.getGaugeAmps = function() {
		return config.gaugeAmps;
	};

	
	myHplApp.cockpit.model.getGaugeConsumedMah = function() {
		return config.gaugeConsumedMah;
	};

	
	myHplApp.cockpit.model.getGaugeVoltage = function() {
		return config.gaugeVoltage;
	};


	myHplApp.cockpit.model.getGaugeBattRemaining = function() {
		return config.gaugeBattRemaining;
	};


	myHplApp.cockpit.model.getGaugeThrust = function() {
		return config.gaugeBattRemaining;
	};


	myHplApp.cockpit.model.getGaugeAmmo = function() {
		return config.gaugeAmmo;
	};

	
	myHplApp.cockpit.model.getGaugeShield = function() {
		return config.gaugeShield;
	};


	myHplApp.cockpit.model.getGaugeCoreTemp = function() {
		return config.gaugeCoreTemp;
	};
	
	
	//Set methods
	myHplApp.cockpit.model.setGauge = function(mygauge) {
		var gaugeId 		= mygauge['id'];
		config[gaugeId] 	= mygauge['gauge'];
	};


	myHplApp.cockpit.model.refreshGauge = function(mygauge) {
		var gaugeId = mygauge['id'];
		config[gaugeId].refresh(mygauge['val']);
	};

	
} (myHplApp = window.myHplApp || {}));	
	
