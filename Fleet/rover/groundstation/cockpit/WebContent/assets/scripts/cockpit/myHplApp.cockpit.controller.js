(function(myHplApp) {
 
	myHplApp.cockpit.controller = myHplApp.cockpit.controller || {};
	
	var cockpitModel 	   		= myHplApp.cockpit.model;
	var groundstationModel 		= myHplApp.groundstation.model;
	var vehicleCmdModel         = myHplApp.vehicle.cmd.model; 
	var cockpitHeartbeatTick 	= setInterval(function(){myHplApp.cockpit.controller.emitHeartbeat()},250);
	
	
	myHplApp.cockpit.controller.emitHeartbeat = function() {
		groundstationModel.getConfigSocket().emit(cockpitModel.getConfigSocketEvent(), vehicleCmdModel.getInstructionCockpitHeartbeat());
	};
	

	myHplApp.cockpit.controller.emitControl = function(message) {
		console.log(message);
		groundstationModel.getConfigSocket().emit(cockpitModel.getConfigSocketEvent(), message);
	};
	
	myHplApp.cockpit.controller.init = function() {
		console.log('Initialising cockpit controller');		
	};
	
	myHplApp.cockpit.controller.initGauges = function() {
		console.log('Initialising cockpit controller gauges');
		
		var gaugeId = "gaugeCurrent";		 
		var ogauge 	= new JustGage({
			id: gaugeId,
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 12,	
			label: "CURRENT",
			labelMinFontSize: 12,
			value: 0,
			valueMinFontSize: 12,
			valueFontColor: "#ffffff",
			min: 0,
			max: 10,
			gaugeWidthScale: 0.4,
			customSectors: [{
								color: "#00ff00",
								lo: 0,
								hi: 3
							},{
								color: "#ff8000",
								lo: 3,
								hi: 6
							}, {
								color: "#ff0000",
								lo: 6,
								hi: 10
							}],
			counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});
		
		
		gaugeId = "gaugeAmps";
		ogauge 	= new JustGage({
			id: gaugeId,
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 12,	
			label: "AMPS",
			labelMinFontSize: 12,
			value: 0,
			valueMinFontSize: 12,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.4,
			customSectors: [{
								color: "#00ff00",
								lo: 0,
								hi: 25
							},{
								color: "#ff8000",
								lo: 25,
								hi: 80
							}, {
								color: "#ff0000",
								lo: 80,
								hi: 100
							}],
			counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});
		
		
		gaugeId = "gaugeConsumedMah";
		ogauge 	= new JustGage({
			id: gaugeId,
			donut: true,
			title: "",	
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "CONSUMED MAH",
			labelMinFontSize: 16,
			value: 0,
			valueMinFontSize: 14,
			valueFontColor: "#ffffff",
			min: 0,
			max: 10000,
			showMinMax: false,
			gaugeWidthScale: 0.5,
			customSectors: [{
								color: "#00ff00",
								lo: 0,
								hi: 5000
							},{
								color: "#ffff00",
								lo: 5000,
								hi: 8000
							}, {
								color: "#ff0000",
								lo: 8000,
								hi: 10000
							}],
			counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});
		
		
		gaugeId = "gaugeVoltage";
		ogauge 	= new JustGage({
			id: gaugeId,
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "VOLTAGE",
			labelMinFontSize: 16,
			value: 0,
			valueMinFontSize: 22,
			valueFontColor: "#ffffff",
			min: 7,
			max: 8.20,
			showMinMax: false,
			humanFriendlyDecimal: 2,
	        decimals: 2,
			gaugeWidthScale: 0.5,
			customSectors: [{
								color: "#ff0000",
								lo: 7,
								hi: 7.65
							},{
								color: "#ffff00",
								lo: 7.65,
								hi: 7.90
							}, {
								color: "#00ff00",
								lo: 7.90,
								hi: 8.20
							}],
			counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});
		
		
		gaugeId = "gaugeBattRemaining";
		ogauge 	= new JustGage({
				id: gaugeId,
				donut: true,
				title: "",
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "BATTERY %",
				labelMinFontSize: 16,
				value: 0,
				valueMinFontSize: 14,
				valueFontColor: "#ffffff",
				min: 0,
				max: 100,
				showMinMax : false,
				gaugeWidthScale: 0.5,
				customSectors: [{
									color: "#ff0000",
									lo: 0,
									hi: 20
								},{
									color: "#ffff00",
									lo: 20,
									hi: 50
								}, {
									color: "#00ff00",
									lo: 50,
									hi: 100
								}],
				counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});
		
		
		gaugeId = "gaugeThrust";
		ogauge 	= new JustGage({
				id: gaugeId,
				title: "",
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "THRUST %",
				labelMinFontSize: 16,
				value: 0,
				valueMinFontSize: 22,
				valueFontColor: "#ffffff",
				min: 0,
				max: 100,
				gaugeWidthScale: 0.5,
				customSectors: [{
									color : "#00ff00",
									lo: 0,
									hi: 60
								},{
									color: "#ff8000",
									lo: 60,
									hi: 80
								}, {
									color: "#ff0000",
									lo: 80,
									hi: 100
								}],
				counter: true
		});

		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});
		
		
		gaugeId = "gaugeAmmo";
		ogauge 	= new JustGage({
			id: gaugeId,
			donut: true,
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "AMMO %",
			labelMinFontSize: 16,
			value: 0,
			valueMinFontSize: 22,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.5,
			customSectors: [{
								color : "#00ff00",
								lo: 0,
								hi: 60
							},{
								color: "#ff8000",
								lo: 60,
								hi: 80
							}, {
								color: "#ff0000",
								lo: 80,
								hi: 100
							}],
			counter: true
		});

		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});
		
		
		
		gaugeId = "gaugeShield";
		ogauge 	= new JustGage({
				id: gaugeId,
				donut: true,
				title: "",	
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "SHIELD %",
				labelMinFontSize: 16,
				value: 100,
				valueMinFontSize: 14,
				valueFontColor: "#ffffff",
				min: 0,
				max: 100,
				showMinMax: false,
				gaugeWidthScale: 0.5,
				customSectors: [{
									color: "#ff0000",
									lo: 0,
									hi: 20
								},{
									color : "#ffff00",
									lo: 20,
									hi: 50
								}, {
									color: "#00ff00",
									lo: 50,
									hi: 100
								}],
				counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});
		
		
		
		gaugeId = "gaugeCoreTemp";
		ogauge 	= new JustGage({
				id: gaugeId,
				title: "",	
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "CORE TEMP",
				labelMinFontSize: 16,
				value: 0,
				valueMinFontSize: 22,
				valueFontColor: "#ffffff",
				min: 10,
				max: 90,
				showMinMax: false,
				gaugeWidthScale: 0.5,
				customSectors: [{
									color: "#ff0000",
									lo: 0,
									hi: 20
								},{
									color: "#ffff00",
									lo: 20,
									hi: 50
								}, {
									color: "#00ff00",
									lo: 50,
									hi: 100
								}],
				counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge});

	};
	
	
	myHplApp.cockpit.controller.init();
	
} (myHplApp = window.myHplApp || {}));	
	