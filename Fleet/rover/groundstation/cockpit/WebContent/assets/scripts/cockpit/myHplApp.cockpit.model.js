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
	
    
	myHplApp.cockpit.model.setGauge = function(mygauge) {
		var result 		= mygauge['id'];
		config[result] 	= mygauge['gauge'];
	};

	
} (myHplApp = window.myHplApp || {}));	
	
