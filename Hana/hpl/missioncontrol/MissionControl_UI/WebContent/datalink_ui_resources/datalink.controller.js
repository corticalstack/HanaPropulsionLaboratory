sap.ui.controller("datalink_ui_resources.datalink", {
	

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
		myHplMcApp.datalink.controller.setStateActive(true);
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
		   myHplMcApp.datalink.controller.setStateActive(false);
	   },
	

	
	datalinkRefresh: function() {
		console.log('Datalink refresh');
		myHplMcApp.datalink.controller.getMissionMessageCategoryIdRanking();
		myHplMcApp.datalink.controller.getMissionMaxSpeed();
		myHplMcApp.datalink.controller.getMissionAvgSpeed();
		myHplMcApp.datalink.controller.getMissionMinAlt();
		myHplMcApp.datalink.controller.getMissionMaxAlt();
		myHplMcApp.datalink.controller.getMissionAvgAlt();
		myHplMcApp.datalink.controller.getMissionDistanceTravelled();
		sap.ui.getCore().byId("tvStatTotalNavigation").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().nav);
		sap.ui.getCore().byId("tvStatTotalCockpit").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().coc);
		sap.ui.getCore().byId("tvStatTotalNotification").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().not);
		sap.ui.getCore().byId("tvStatTotalSensor").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().sen);
		sap.ui.getCore().byId("tvStatTotalPower").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().pow);
		sap.ui.getCore().byId("tvStatTotalDrive").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().dri);
		sap.ui.getCore().byId("tvStatMaxSpeed").setText(myHplMcApp.datalink.model.getSpeedStatsMaxKph());
		sap.ui.getCore().byId("tvStatAvgSpeed").setText(myHplMcApp.datalink.model.getSpeedStatsAvgKph());
		sap.ui.getCore().byId("tvStatMinAlt").setText(myHplMcApp.datalink.model.getAltStatsMinM());
		sap.ui.getCore().byId("tvStatMaxAlt").setText(myHplMcApp.datalink.model.getAltStatsMaxM());
		sap.ui.getCore().byId("tvStatAvgAlt").setText(myHplMcApp.datalink.model.getAltStatsAvgM());
		sap.ui.getCore().byId("tvStatTravelledM").setText(myHplMcApp.datalink.model.getDistanceStatsTravelledM());
	},
});
