(function(myHplApp) {
 
	myHplApp.cockpit.controller = myHplApp.cockpit.cockpit.controller || {};
	
	var cockpitModel = myHplApp.cockpit.model;
	
	
		
	myHplApp.cockpit.controller.emitHeartbeat = function() {
		window.socket.emit(socketEventCockpit, cmdCockpitHeartbeat);
	};
	

	myHplApp.cockpit.controller.emitControl = function(message) {
		window.socket.emit(cockpitModel.config.socketEvent, message);
	};
	

	myHplApp.cockpit.controller.init = function() {
		console.log('Initialising cockpit controller');
		cockpitModel.config.gaugeCurrent = new JustGage({
			id: "gaugeCurrent",
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 12,	
			label: "CURRENT",
			labelMinFontSize: 12,
			value: 40,
			valueMinFontSize: 12,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.4,
			customSectors: [{
								color: "#00ff00",
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

		
		cockpitModel.config.gaugeAmps = new JustGage({
			id: "gaugeAmps",
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 12,	
			label: "AMPS",
			labelMinFontSize: 12,
			value: 40,
			valueMinFontSize: 12,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.4,
			customSectors: [{
								color: "#00ff00",
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
		
		
		cockpitModel.config.gaugeConsumedMah = new JustGage({
			id: "gaugeConsumedMah",
			donut: true,
			title: "",	
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "CONSUMED MAH",
			labelMinFontSize: 16,
			value: 5000,
			valueMinFontSize: 14,
			valueFontColor: "#ffffff",
			min: 0,
			max: 10000,
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
		
		
		cockpitModel.config.gaugeVoltage = new JustGage({
			id: "gaugeVoltage",
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "VOLTAGE",
			labelMinFontSize: 16,
			value: 8,
			valueMinFontSize: 22,
			valueFontColor: "#ffffff",
			min: 7,
			max: 9,
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
		
		
		cockpitModel.config.gaugeBattRemaining = new JustGage({
				id: "gaugeBattRemaining",
				donut: true,
				title: "",
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "BATTERY %",
				labelMinFontSize: 16,
				value: 19,
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
		
		
		cockpitModel.config.gaugeThrust = new JustGage({
				id: "gaugeThrust",
				title: "",
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "THRUST %",
				labelMinFontSize: 16,
				value: 40,
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

		
		cockpitModel.config.gaugeAmmo = new JustGage({
			id: "gaugeAmmo",
			donut: true,
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "AMMO %",
			labelMinFontSize: 16,
			value: 40,
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


		
		cockpitModel.config.gaugeShield = new JustGage({
				id: "gaugeShield",
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


		cockpitModel.config.gaugeCoreTemp = new JustGage({
				id: "gaugeCoreTemp",
				title: "",	
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "CORE TEMP",
				labelMinFontSize: 16,
				value: 20,
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

	};
	
	
	myHplApp.cockpit.controller.init();
	
} (myHplApp = window.myHplApp || {}));	
	