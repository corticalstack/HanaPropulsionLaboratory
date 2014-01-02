(function(myHplApp) {
 
	myHplApp.cockpit.model = myHplApp.cockpit.model || {};
	
	var config = {
			socketEvent:		'cockpit',
	};

	
	var gauge = {
			gaugeCurrent:   			{},
			gaugeAmps:					{},
			gaugeConsumedMah: 			{},
			gaugeVoltage:				{},
			gaugeBattRemaining:			{},
			gaugeThrust:				{},
			gaugeAmmo:					{},
			gaugeShield:				{},
			gaugeCoreTemp:				{},
			gaugeFrontProximitySensor:	{},
			gaugeRearProximitySensor:	{},
			gaugeCamProximitySensor:	{}
	};
	
	
	var indicators = [];
	
	
	//Get methods
	
	myHplApp.cockpit.model.getConfigSocketEvent = function() {
		return config.socketEvent;
	};

	
	myHplApp.cockpit.model.getGaugeCurrent = function() {
		return gauge.gaugeCurrent;
	};
    

	myHplApp.cockpit.model.getGaugeAmps = function() {
		return gauge.gaugeAmps;
	};

	
	myHplApp.cockpit.model.getGaugeConsumedMah = function() {
		return gauge.gaugeConsumedMah;
	};

	
	myHplApp.cockpit.model.getGaugeVoltage = function() {
		return gauge.gaugeVoltage;
	};


	myHplApp.cockpit.model.getGaugeBattRemaining = function() {
		return gauge.gaugeBattRemaining;
	};


	myHplApp.cockpit.model.getGaugeThrust = function() {
		return gauge.gaugeBattRemaining;
	};


	myHplApp.cockpit.model.getGaugeAmmo = function() {
		return gauge.gaugeAmmo;
	};

	
	myHplApp.cockpit.model.getGaugeShield = function() {
		return gauge.gaugeShield;
	};


	myHplApp.cockpit.model.getGaugeCoreTemp = function() {
		return gauge.gaugeCoreTemp;
	};

	myHplApp.cockpit.model.getGaugeFrontProximitySensor = function() {
		return gauge.gaugeFrontProximitySensor;
	};

	myHplApp.cockpit.model.getGaugeRearProximitySensor = function() {
		return gauge.gaugeRearProximitySensor;
	};

	myHplApp.cockpit.model.getGaugeCamProximitySensor = function() {
		return gauge.gaugeCamProximitySensor;
	};

	
	//Set methods
	myHplApp.cockpit.model.setGauge = function(mygauge) {
		var gaugeId 	= mygauge['id'];
		gauge[gaugeId] 	= mygauge['gauge'];
	};


	myHplApp.cockpit.model.refreshGauge = function(myGauge) {
		var gaugeId = myGauge['id'];
		gauge[gaugeId].refresh(myGauge['val']);
	};

	
	myHplApp.cockpit.model.setIndicator = function(myIndicator) {
		indicators.push(myIndicator);
	};

	
	myHplApp.cockpit.model.refreshIndicator = function(myIndicator) {
		var indicatorId = myIndicator['id'];
		for (var i = 0; i < indicators.length; i++) {
		    if (indicators[i].id == indicatorId) {
    			indicators[i].refresh = true;
    			indicators[i].value = myIndicator['val'];
		    }
		}
	};
	
	
	myHplApp.cockpit.model.setIndicatorClearRefresh = function(i) {
		indicators[i].refresh = false;
	};
	
	
	//Get methods
	myHplApp.cockpit.model.getIndicators = function() {
		return indicators;
	};
	
	
} (myHplApp = window.myHplApp || {}));	
	
