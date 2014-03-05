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
		sap.ui.getCore().byId("tvStatCountNavigation").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().nav);
		sap.ui.getCore().byId("tvStatCountCockpit").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().coc);
		sap.ui.getCore().byId("tvStatCountNotification").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().not);
		sap.ui.getCore().byId("tvStatCountSensor").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().sen);
		sap.ui.getCore().byId("tvStatCountPower").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().pow);
		sap.ui.getCore().byId("tvStatCountDrive").setText(myHplMcApp.datalink.model.getMessageCategoryIdStats().dri);
	},
});
