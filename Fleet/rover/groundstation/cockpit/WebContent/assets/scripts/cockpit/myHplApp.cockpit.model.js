(function(myHplApp) {
 
	myHplApp.cockpit.model = myHplApp.cockpit.model || {};
	
	var config = {
			socketEvent:		'cockpit',
	};


	var state = {
			active:				false
	};
	
		
	var indicators 	= [];	
	var gauges 		= [];
	
	
	var chartNetworkTrafficInOptions = {
			series: {
				shadowSize: 0,
				lines: { 
       		  		show: true,
       		  		lineWidth: 1.2,
       		  		fill: 0.7,
				}
			},
			yaxis: {
				min: 0,
				max: 252,
		        tickSize: 42,
				tickFormatter: function () {
					return "";
				}
			},
			xaxis: {
				mode: "time",
				tickSize: [0.25, "second"],
				tickFormatter: function () {
					return "";
				}
			},
		    grid: {
		    	backgroundColor: "#030918",
		        borderColor: "#2565B0",
		        borderWidth: 1,
		        tickColor: "#081C54"
		    }
	};
	

	var chartNetworkTrafficOutOptions = {
			series: {
				shadowSize: 0,
				lines: { 
       		  		show: true,
       		  		lineWidth: 1.2,
       		  		fill: 0.7,
				}
			},
			yaxis: {
				min: 0,
				max: 30,
		        tickSize: 5,
				tickFormatter: function () {
					return "";
				}
			},
			xaxis: {
				mode: "time",
				tickSize: [0.25, "second"],
				tickFormatter: function () {
					return "";
				}
			},
		    grid: {
		    	backgroundColor: "#030918",
		        borderColor: "#2565B0",
		        borderWidth: 1,
		        tickColor: "#081C54"
		    }
	};

	//Get methods
	
	myHplApp.cockpit.model.getConfigSocketEvent = function() {
		return config.socketEvent;
	};

	
	myHplApp.cockpit.model.getStateActive = function() {
		return state.active;
	};


	myHplApp.cockpit.model.getIndicators = function() {
		return indicators;
	};


	myHplApp.cockpit.model.getGauges = function() {
		return gauges;
	};

	
	myHplApp.cockpit.model.getChartNetworkTrafficInOptions = function() {
		return chartNetworkTrafficInOptions;
	};

	myHplApp.cockpit.model.getChartNetworkTrafficOutOptions = function() {
		return chartNetworkTrafficOutOptions;
	};
	
	
	
	//Set methods
	myHplApp.cockpit.model.setStateActive = function(bool) {
		state.active = bool;
	};

	
	myHplApp.cockpit.model.setGauge = function(mygauge) {
		var gaugeId 	= mygauge['id'];
		var gauge 		= {};
		gauge.id 		= gaugeId;
		gauge.gauge 	= mygauge['gauge'];
		gauge.val 		= mygauge['val'];
		gauge.refresh 	= false;
		gauges.push(gauge);
	};


	
	myHplApp.cockpit.model.setGaugeVal = function(myGauge) {
		var gaugeId = myGauge['id'];
		for (var i = 0; i < gauges.length; i++) {
		    if (gauges[i].id == gaugeId) {
		    	gauges[i].refresh 	= true;
				gauges[i].val 		= myGauge['val'];
		    }
		}
	};

	
	
	myHplApp.cockpit.model.setIndicator = function(myIndicator) {
		indicators.push(myIndicator);
	};

	
	myHplApp.cockpit.model.setIndicatorVal = function(myIndicator) {
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
	

	myHplApp.cockpit.model.setGaugeClearRefresh = function(i) {
		gauges[i].refresh = false;
	};

	//Get methods

	
} (myHplApp = window.myHplApp || {}));	
	
