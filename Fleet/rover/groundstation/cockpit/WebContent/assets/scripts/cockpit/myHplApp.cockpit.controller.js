(function(myHplApp) {
 
	myHplApp.cockpit.controller = myHplApp.cockpit.controller || {};
	
	var cockpitModel 	   			= myHplApp.cockpit.model;
	var groundstationModel 			= myHplApp.groundstation.model;
	var vehicleCmdModel         	= myHplApp.vehicle.cmd.model; 
	var missioncontrolModel	 		= myHplApp.missioncontrol.model;
	var cockpitHeartbeatTick    	= 0;
	var cockpitMainRefresh	    	= 0;	
	
	
	myHplApp.cockpit.controller.emitHeartbeat = function() {
		myHplApp.cockpit.controller.emitControl(vehicleCmdModel.getInstructionCockpitHeartbeat());

	};
	

	myHplApp.cockpit.controller.emitControl = function(message) {
		var socket =  groundstationModel.getConfigSocket();
		if (socket != '') {			
			socket.emit(cockpitModel.getConfigSocketEvent(), message);
			missioncontrolModel.addNetworkPacketOut(message.length);
		}		
	};
	
	myHplApp.cockpit.controller.init = function() {
		console.log('Initialising cockpit controller');		
	};
	

	myHplApp.cockpit.controller.setStateActive = function(bool) {
		cockpitModel.setStateActive(bool);
		switch(bool){
			case false:
				myHplApp.cockpit.controller.clearCockpitHeartbeatTick();
				myHplApp.cockpit.controller.clearCockpitMainRefreshTick();
				myHplApp.cockpit.controller.clearAmmoPctTick();
				break;
			case true:
				setTimeout(myHplApp.cockpit.controller.setCockpitHeartbeatTick,3000);
				myHplApp.cockpit.controller.setCockpitMainRefreshTick();
				myHplApp.cockpit.controller.setAmmoPctTick();
				break;
		} 
	};

	
	myHplApp.cockpit.controller.setCockpitHeartbeatTick = function() {
		console.log('Cockpit controller setting cockpit heartbeat tick.....');
		cockpitHeartbeatTick = setInterval(function(){myHplApp.cockpit.controller.emitHeartbeat()},250);
	};

	
	myHplApp.cockpit.controller.clearCockpitHeartbeatTick = function() {
		console.log('Cockpit controller clearing cockpit heartbeat tick.....');
		clearInterval(cockpitHeartbeatTick);
	};

	
	myHplApp.cockpit.controller.setCockpitMainRefreshTick = function() {
		console.log('Cockpit controller setting cockpit main refresh.....');
		cockpitMainRefresh = setInterval(function(){sap.ui.getCore().byId("viewCockpit").getController().cockpitMainRefresh()},25);
	};


	myHplApp.cockpit.controller.clearCockpitMainRefreshTick  = function() {
		clearInterval(cockpitMainRefreshTick);
	};
	
	
	myHplApp.cockpit.controller.setAmmoPctTick = function() {
		ammoPctTick = setInterval(function(){sap.ui.getCore().byId("viewCockpit").getController().setAmmoPct()},300);
	};

	
	myHplApp.cockpit.controller.clearAmmoPctTick = function() {
		clearInterval(ammoPctTick);
	};
	
	myHplApp.cockpit.controller.initGauges = function() {
		console.log('Initialising cockpit controller gauges');
		
		var gaugeId 	= "gaugeCurrent";	
		var gaugeVal 	= 0;
		var ogauge 		= new JustGage({
			id: gaugeId,
			donut: true,
			gaugeColor: '#003078',
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "CURRENT",
			labelMinFontSize: 16,
			value: gaugeVal,
			valueMinFontSize: 14,
			valueFontColor: "#ffffff",
			min: 0,
			max: 10,
			gaugeWidthScale: 0.5,
			humanFriendlyDecimal: 2,
	        decimals: 2,
			startAnimationTime: 1,
			startAnimationType: "linear",
			refreshAnimationTime: 1,
			refreshAnimationType: "linear",					
			customSectors: [{
								color: "#00ff00",
								lo: 0,
								hi: 3
							},{
								color: "#ffff00",
								lo: 3,
								hi: 6
							}, {
								color: "#ff0000",
								lo: 6,
								hi: 10
							}],
			counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		
		
		gaugeId 	= "gaugeAmps";
		gaugeVal 	= 0;
		ogauge 		= new JustGage({
			id: gaugeId,
			donut: true,
			gaugeColor: '#003078',
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "AMPS",
			labelMinFontSize: 16,
			value: gaugeVal,
			valueMinFontSize: 14,
			valueFontColor: "#ffffff",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.5,
			humanFriendlyDecimal: 2,
	        decimals: 2,
			customSectors: [{
								color: "#00ff00",
								lo: 0,
								hi: 25
							},{
								color: "#ffff00",
								lo: 25,
								hi: 80
							}, {
								color: "#ff0000",
								lo: 80,
								hi: 100
							}],
			counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		
		
		gaugeId 	= "gaugeConsumedMah";
		gaugeVal 	= 0;
		ogauge 		= new JustGage({
			id: gaugeId,
			donut: true,
			gaugeColor: '#003078',
			title: "",	
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "CONSUMED MAH",
			labelMinFontSize: 16,
			value: gaugeVal,
			valueMinFontSize: 14,
			valueFontColor: "#ffffff",
			min: 0,
			max: 10000,
			showMinMax: false,
			gaugeWidthScale: 0.5,
			startAnimationTime: 1,
			startAnimationType: "linear",
			refreshAnimationTime: 1,
			refreshAnimationType: "linear",								
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
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		
		
		gaugeId 	= "gaugeVoltage";
		gaugeVal 	= 0;
		ogauge 		= new JustGage({
			id: gaugeId,
			donut: true,
			gaugeColor: '#003078',
			title: "",
			titleFontColor: "#ffffff",
			titleMinFontSize: 14,	
			label: "VOLTS",
			labelMinFontSize: 16,			
			value: gaugeVal,
			valueMinFontSize: 14,
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
								hi: 7.5
							},{
								color: "#ffff00",
								lo: 7.5,
								hi: 7.90
							}, {
								color: "#00ff00",
								lo: 7.90,
								hi: 8.20
							}],
			counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});

		
		gaugeId 	= "gaugeBattRemaining";
		gaugeVal 	= 0;
		ogauge 		= new JustGage({
				id: gaugeId,
				donut: true,
				title: "",
				gaugeColor: '#003078',
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "BATTERY %",
				labelMinFontSize: 16,
				value: gaugeVal,
				valueMinFontSize: 14,
				valueFontColor: "#ffffff",
				min: 0,
				max: 100,
				showMinMax : false,
				gaugeWidthScale: 0.5,
				startAnimationTime: 1,
				startAnimationType: "linear",
				refreshAnimationTime: 1,
				refreshAnimationType: "linear",									
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
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		
		
		gaugeId 	= "gaugeThrust";
		gaugeVal 	= 0;
		ogauge 		= new JustGage({
				id: gaugeId,
				title: "",
				gaugeColor: '#003078',
				titleFontColor: "#ffffff",
				titleMinFontSize: 13,	
				label: "THRUST",
				labelMinFontSize: 14,
				minLabelMinFontSize: 11,
				maxLabelMinFontSize: 11,
				labelFontColor: "#000000",
				value: gaugeVal,
				valueMinFontSize: 16,
				valueFontColor: "#000000",
				min: 0,
				max: 100,
				gaugeWidthScale: 0.4,
				startAnimationTime: 1,
				startAnimationType: "linear",
				refreshAnimationTime: 1,
				refreshAnimationType: "linear",								
				customSectors: [{
									color : "#00ff00",
									lo: 0,
									hi: 60
								},{
									color: "#ffff00",
									lo: 60,
									hi: 80
								}, {
									color: "#ff0000",
									lo: 80,
									hi: 100
								}],
				counter: true
		});

		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		
		
		gaugeId 	= "gaugeAmmo1";
		gaugeVal 	= 100;
		ogauge 		= new JustGage({
			id: gaugeId,
			title: "",
			gaugeColor: '#003078',	
			titleFontColor: "#ffffff",
			titleMinFontSize: 13,	
			label: myHplApp.controller.getTextFromBundle("ammo1pct"),
			labelMinFontSize: 13,
			minLabelMinFontSize: 11,
			maxLabelMinFontSize: 11,
			labelFontColor: "#000000",
			value: gaugeVal,
			valueMinFontSize: 16,
			valueFontColor: "#000000",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.4,
			startAnimationTime: 1,
			startAnimationType: "linear",
			refreshAnimationTime: 1,
			refreshAnimationType: "linear",								
			customSectors: [{
								color : "#ff0000",
								lo: 0,
								hi: 20
							},{
								color: "#ffff00",
								lo: 20,
								hi: 40
							}, {
								color: "#00ff00",
								lo: 40,
								hi: 100
							}],
			counter: true
		});

		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		

		gaugeId 	= "gaugeAmmo2";
		gaugeVal 	= 100;
		ogauge 		= new JustGage({
			id: gaugeId,
			title: "",
			gaugeColor: '#003078',	
			titleFontColor: "#ffffff",
			titleMinFontSize: 13,	
			label: myHplApp.controller.getTextFromBundle("ammo2pct"),
			labelMinFontSize: 13,
			minLabelMinFontSize: 11,
			maxLabelMinFontSize: 11,
			labelFontColor: "#000000",
			value: gaugeVal,
			valueMinFontSize: 16,
			valueFontColor: "#000000",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.4,
			startAnimationTime: 1,
			startAnimationType: "linear",
			refreshAnimationTime: 1,
			refreshAnimationType: "linear",								
			customSectors: [{
								color : "#ff0000",
								lo: 0,
								hi: 20
							},{
								color: "#ffff00",
								lo: 20,
								hi: 40
							}, {
								color: "#00ff00",
								lo: 40,
								hi: 100
							}],
			counter: true
		});

		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		

		gaugeId 	= "gaugeSpeed";
		gaugeVal 	= 100;
		ogauge 		= new JustGage({
			id: gaugeId,
			title: "",
			gaugeColor: '#003078',	
			titleFontColor: "#ffffff",
			titleMinFontSize: 13,	
			label: "SPEED",
			labelMinFontSize: 14,
			minLabelMinFontSize: 11,
			maxLabelMinFontSize: 11,
			labelFontColor: "#000000",
			value: gaugeVal,
			valueMinFontSize: 16,
			valueFontColor: "#000000",
			min: 0,
			max: 100,
			gaugeWidthScale: 0.4,
			startAnimationTime: 1,
			startAnimationType: "linear",
			refreshAnimationTime: 1,
			refreshAnimationType: "linear",								
			customSectors: [{
								color : "#00ff00",
								lo: 0,
								hi: 60
							},{
								color: "#ffff00",
								lo: 60,
								hi: 80
							}, {
								color: "#ff0000",
								lo: 80,
								hi: 100
							}],
			counter: true
		});

		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});

		
		gaugeId 	= "gaugeShield";
		gaugeVal 	= 0;
		ogauge 		= new JustGage({
				id: gaugeId,
				title: "",	
				gaugeColor: '#003078',	
				titleFontColor: "#ffffff",
				titleMinFontSize: 13,	
				label: "SHIELD",
				labelMinFontSize: 14,
				minLabelMinFontSize: 11,
				maxLabelMinFontSize: 11,
				labelFontColor: "#000000",
				value: gaugeVal,
				valueMinFontSize: 16,
				valueFontColor: "#000000",
				min: 0,
				max: 100,
				showMinMax: false,
				gaugeWidthScale: 0.4,
				startAnimationTime: 1,
				startAnimationType: "linear",
				refreshAnimationTime: 1,
				refreshAnimationType: "linear",									
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
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		
		
		
		gaugeId 	= "gaugeCoreTemp";
		gaugeVal 	= 0;
		ogauge 		= new JustGage({
				id: gaugeId,
				gaugeColor: '#003078',
				title: "",	
				titleFontColor: "#ffffff",
				titleMinFontSize: 14,	
				label: "CORE TEMP",
				labelMinFontSize: 16,
				value: gaugeVal,
				valueMinFontSize: 22,
				valueFontColor: "#ffffff",
				min: 15,
				max: 35,
				showMinMax: false,
				gaugeWidthScale: 0.5,
				startAnimationTime: 1,
				startAnimationType: "linear",
				refreshAnimationTime: 1,
				refreshAnimationType: "linear",									
				customSectors: [{
									color: "#0864BF",
									lo: 15,
									hi: 25
								},{
									color: "#ffff00",
									lo: 25,
									hi: 30
								}, {
									color: "#ff0000",
									lo: 30,
									hi: 35
								}],
				counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});

		
		gaugeId 	= "gaugeFrontProximitySensor";
		gaugeVal 	= 30;
		ogauge 		= new JustGage({
				id: gaugeId,
				title: "",	
				gaugeColor: '#003078',			
				titleFontColor: "#ffffff",
				titleMinFontSize: 13,	
				label: "FRONT",
				labelMinFontSize: 14,
				minLabelMinFontSize: 11,
				maxLabelMinFontSize: 11,
				labelFontColor: "#000000",
				value: gaugeVal,
				valueMinFontSize: 16,
				valueFontColor: "#000000",
				min: 4,
				max: 30,
				showMinMax: false,
				gaugeWidthScale: 0.4,
				showInnerShadow: true,
				shadowSize: 5,
				shadowOpacity: 0.5,
				shadowVerticalOffset: 5,
				customSectors: [{
									color: "#ff0000",
									lo: 4,
									hi: 15
								},{
									color: "#ffff00",
									lo: 15,
									hi: 25
								}, {
									color: "#00ff00",
									lo: 25,
									hi: 30
								}],
				counter: true
		});
		
		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		
		
		gaugeId 	= "gaugeRearProximitySensor";
		gaugeVal 	= 30;
		ogauge 		= new JustGage({
				id: gaugeId,
				title: "",	
				gaugeColor: '#003078',	
				titleFontColor: "#ffffff",
				titleMinFontSize: 13,	
				label: "REAR",
				labelMinFontSize: 14,
				minLabelMinFontSize: 11,
				maxLabelMinFontSize: 11,
				labelFontColor: "#000000",
				value: gaugeVal,
				valueMinFontSize: 16,
				valueFontColor: "#000000",
				min: 4,
				max: 30,
				showMinMax: false,
				gaugeWidthScale: 0.4,
				customSectors: [{
									color: "#ff0000",
									lo: 4,
									hi: 15
								},{
									color: "#ffff00",
									lo: 15,
									hi: 25
								}, {
									color: "#00ff00",
									lo: 25,
									hi: 30
								}],
				counter: true
		});

		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});
		
		
		gaugeId 	= "gaugeCamProximitySensor";
		gaugeVal 	= 150;
		ogauge 		= new JustGage({
				id: gaugeId,
				title: "",	
				gaugeColor: '#003078',	
				titleFontColor: "#ffffff",
				titleMinFontSize: 13,	
				label: "CAM",
				labelMinFontSize: 14,
				minLabelMinFontSize: 11,
				maxLabelMinFontSize: 11,
				labelFontColor: "#000000",
				value: gaugeVal,
				valueMinFontSize: 16,
				valueFontColor: "#000000",
				min: 20,
				max: 150,
				showMinMax: false,
				gaugeWidthScale: 0.4,
				customSectors: [{
									color: "#ff0000",
									lo: 20,
									hi: 60
								},{
									color: "#ffff00",
									lo: 60,
									hi: 120
								}, {
									color: "#00ff00",
									lo: 120,
									hi: 150
								}],
				counter: true
		});

		cockpitModel.setGauge({id: gaugeId, gauge: ogauge, val: gaugeVal});

	};
	
	
	myHplApp.cockpit.controller.initIndicators = function() {
		console.log('Initialising cockpit controller indicators');

		//Stop
		var indicator = {
				id: 				'lblIndStop',
				value: 				0,
				refresh: 			true,
				min: 				0,
				max: 				0,
				cssClass:    		'lblIndOff'
		};
		cockpitModel.setIndicator(indicator);

		
		var indicator = {
				id: 				'lblIndStop',
				value: 				0,
				refresh: 			false,
				min: 				1,
				max: 				1,
				cssClass:   		'lblIndOn'
		};
		cockpitModel.setIndicator(indicator);


		//Left Thrust
		var indicator = {
				id: 				'lblStatusLeftEngineThrust',
				value: 				0,
				refresh: 			false,
				min: 				-50,
				max: 				-41,
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusLeftEngineThrust',
				value: 				0,
				refresh: 			false,
				min: 				-40,
				max: 				-31,
				cssClass:    		'lblStatusYellow'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusLeftEngineThrust',
				value: 				0,
				refresh: 			true,
				min: 				-30,
				max: 				30,
				cssClass:    		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusLeftEngineThrust',
				value: 				0,
				refresh: 			false,
				min: 				31,
				max: 				40,
				cssClass:    		'lblStatusYellow'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusLeftEngineThrust',
				value: 				0,
				refresh: 			false,
				min: 				41,
				max: 				50,
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);
		
		

		//Right Thrust
		var indicator = {
				id: 				'lblStatusRightEngineThrust',
				value: 				0,
				refresh: 			false,
				min: 				-50,
				max: 				-41,
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusRightEngineThrust',
				value: 				0,
				refresh: 			false,
				min: 				-40,
				max: 				-31,
				cssClass:    		'lblStatusYellow'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusRightEngineThrust',
				value: 				0,
				refresh: 			true,
				min: 				-30,
				max: 				30,
				cssClass:    		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusRightEngineThrust',
				value: 				0,
				refresh: 			false,
				min: 				31,
				max: 				40,
				cssClass:    		'lblStatusYellow'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusRightEngineThrust',
				value: 				0,
				refresh: 			false,
				min: 				41,
				max: 				50,
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);

		
		//Power Failsafe
		var indicator = {
				id: 				'lblIndPowerFailsafe',
				value: 				0,
				refresh: 			true,
				min: 				0,
				max: 				0,
				cssClass:    		'lblIndOff'
		};		
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblIndPowerFailsafe',
				value: 				0,
				refresh: 			true,
				min: 				1,
				max: 				1,
				cssClass:   		'lblIndOn'
		};		
		cockpitModel.setIndicator(indicator);

		
		//Thrust Failsafe
		var indicator = {
				id: 				'lblIndThrustFailsafe',
				value: 				0,
				refresh: 			true,
				min: 				0,
				max: 				0,
				cssClass:    		'lblIndOff'
		};		
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblIndThrustFailsafe',
				value: 				0,
				refresh: 			true,
				min: 				1,
				max: 				1,
				cssClass:   		'lblIndOn'
		};
		
		cockpitModel.setIndicator(indicator);

		
		//Satellites
		var indicator = {
				id: 				'lblStatusSatellites',
				value: 				0,
				refresh: 			true,
				min: 				0,
				max: 				0,
				cssClass:    		'lblStatusRed'
		};		
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusSatellites',
				value: 				0,
				refresh: 			true,
				min: 				1,
				max: 				3,
				cssClass:   		'lblStatusYellow',
		};		
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusSatellites',
				value: 				0,
				refresh: 			true,			
				min: 				4,
				max: 				15,
				cssClass:    		'lblStatusGreen'
		};		
		cockpitModel.setIndicator(indicator);

		
		//Lattitude
		var indicator = {
				id: 				'lblStatusLattitude',
				value: 				'',
				refresh: 			true,
				min: 				'',
				max: 				'',
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);
		
		var indicator = {
				id: 				'lblStatusLattitude',
				value: 				'',
				refresh: 			true,
				min: 				0,
				max: 				999,
				cssClass:   		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);

		
		//Longitude
		var indicator = {
				id: 				'lblStatusLongitude',
				value: 				'',
				refresh: 			true,
				min: 				'',
				max: 				'',
				cssClass:    		'lblStatusRed'			
		};
		cockpitModel.setIndicator(indicator);
		
		var indicator = {
				id: 				'lblStatusLongitude',
				value: 				'',
				refresh: 			true,
				min: 				0,
				max: 				999,
				cssClass:   		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);

		
		//Altitude
		var indicator = {
				id: 				'lblStatusAltitude',
				value: 				'',
				refresh: 			true,
				min: 				'',
				max: 				'',
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusAltitude',
				value: 				'',
				refresh: 			true,
				min: 				0,
				max: 				99999,
				cssClass:   		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);
		

		//Heading
		var indicator = {
				id: 				'lblStatusHeading',
				value: 				'',
				refresh: 			true,
				min: 				'',
				max: 				'',
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusHeading',
				value: 				'',
				refresh: 			true,
				min: 				0,
				max: 				99999,
				cssClass:   		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);


		//Speed cms
		var indicator = {
				id: 				'lblStatusSpeedCms',
				value: 				'',
				refresh: 			true,
				min: 				'',
				max: 				'',
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusSpeedCms',
				value: 				'',
				refresh: 			true,
				min: 				0,
				max: 				99999,
				cssClass:   		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);


		//Distance WP
		var indicator = {
				id: 				'lblStatusDistanceWp',
				value: 				'',
				refresh: 			true,
				min: 				'',
				max: 				'',
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusDistanceWp',
				value: 				'',
				refresh: 			true,
				min: 				0,
				max: 				99999,
				cssClass:   		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);

		
		//Bearing WP
		var indicator = {
				id: 				'lblStatusBearingWp',
				value: 				'',
				refresh: 			true,
				min: 				'',
				max: 				'',
				cssClass:    		'lblStatusRed'
		};
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusBearingWp',
				value: 				'',
				refresh: 			true,
				min: 				0,
				max: 				99999,
				cssClass:   		'lblStatusGreen'
		};
		cockpitModel.setIndicator(indicator);

		//Satellite Type
		var indicator = {
				id: 				'lblStatusFixType',
				value: 				'',
				refresh: 			true,
				min: 				'',
				max: 				'',
				cssClass:    		'lblStatusRed'
		};		
		cockpitModel.setIndicator(indicator);

		var indicator = {
				id: 				'lblStatusFixType',
				value: 				'',
				refresh: 			true,
				min: 				2,
				max: 				3,
				cssClass:   		'lblStatusGreen'
		};		
		cockpitModel.setIndicator(indicator);
				

	};
	
	
	
	
	myHplApp.cockpit.controller.init();
	
} (myHplApp = window.myHplApp || {}));	
	