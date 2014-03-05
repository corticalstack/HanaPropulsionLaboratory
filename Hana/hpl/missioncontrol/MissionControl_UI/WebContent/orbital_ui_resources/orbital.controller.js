sap.ui.controller("orbital_ui_resources.orbital", {
	

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() { 
	},

	
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
	onBeforeRendering: function() {
		myHplMcApp.orbital.controller.setStateActive(true);
	},

	
	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
	//   onAfterRendering: function() {
	//
	//   },

	
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
	   onExit: function() {
		   myHplMcApp.orbital.controller.setStateActive(false);
	   },
	

	
	orbitalRefresh: function() {
		console.log('Orbital refresh');
		myHplMcApp.orbital.controller.getMissionStatsSpeed();
		myHplMcApp.orbital.controller.getMissionStatsAlt();
		myHplMcApp.orbital.controller.getMissionDistanceTravelled();
		sap.ui.getCore().byId("tvStatSpeedMaxCms").setText(myHplMcApp.orbital.model.getSpeedStatsMaxCms());
		sap.ui.getCore().byId("tvStatSpeedMaxKph").setText(myHplMcApp.orbital.model.getSpeedStatsMaxKph());
		sap.ui.getCore().byId("tvStatSpeedMaxMph").setText(myHplMcApp.orbital.model.getSpeedStatsMaxMph());
		sap.ui.getCore().byId("tvStatSpeedAvgCms").setText(myHplMcApp.orbital.model.getSpeedStatsAvgCms());
		sap.ui.getCore().byId("tvStatSpeedAvgKph").setText(myHplMcApp.orbital.model.getSpeedStatsAvgKph());
		sap.ui.getCore().byId("tvStatSpeedAvgMph").setText(myHplMcApp.orbital.model.getSpeedStatsAvgMph());		
		sap.ui.getCore().byId("tvStatAltMinM").setText(myHplMcApp.orbital.model.getAltStatsMinM());
		sap.ui.getCore().byId("tvStatAltMinFt").setText(myHplMcApp.orbital.model.getAltStatsMinFt());
		sap.ui.getCore().byId("tvStatAltMaxM").setText(myHplMcApp.orbital.model.getAltStatsMaxM());
		sap.ui.getCore().byId("tvStatAltMaxFt").setText(myHplMcApp.orbital.model.getAltStatsMaxFt());
		sap.ui.getCore().byId("tvStatAltAvgM").setText(myHplMcApp.orbital.model.getAltStatsAvgM());
		sap.ui.getCore().byId("tvStatAltAvgFt").setText(myHplMcApp.orbital.model.getAltStatsAvgFt());
		sap.ui.getCore().byId("tvStatTravelledM").setText(myHplMcApp.orbital.model.getDistanceStatsTravelledM());

	},
});
