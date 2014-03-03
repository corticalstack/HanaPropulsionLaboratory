sap.ui.jsview("datalink_ui_resources.datalink", {
	
      getControllerName : function() {
         return "datalink_ui_resources.datalink";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();

    	 buildStats(oController,oLayout);    	 
  	     return oLayout;
      }

});


function buildStats(oController,oLayout){
	var omlStats = new sap.ui.commons.layout.MatrixLayout({
		   id : "mlStats",
		   columns: 2,
		   width:"100%"
	});
	
	
	var otvStatTotalNavigation = new sap.ui.commons.TextView("tvStatTotalNavigation",{
			text : "0"}
	);
    
    olblStatCountNavigation = new sap.ui.commons.Label("lblStatCountNavigation", {text: 'Navigation Count', labelFor: otvStatTotalNavigation});
    olblStatCountNavigation.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountNavigation, otvStatTotalNavigation);
    
    
    var otvStatTotalCockpit = new sap.ui.commons.TextView("tvStatTotalCockpit",{
			text : "0"}
    );
    olblStatCountCockpit = new sap.ui.commons.Label("lblStatCountCockpit", {text: 'Cockpit Count', labelFor: otvStatTotalCockpit});
    olblStatCountCockpit.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountCockpit, otvStatTotalCockpit);
    
    
    var otvStatTotalNotification = new sap.ui.commons.TextView("tvStatTotalNotification",{
		text : "0"}
    );
    olblStatCountNotification = new sap.ui.commons.Label("lblStatCountNotification", {text: 'Notification Count', labelFor: otvStatTotalNotification});
    olblStatCountNotification.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountNotification, otvStatTotalNotification);
    

    var otvStatTotalSensor = new sap.ui.commons.TextView("tvStatTotalSensor",{
		text : "0"}
    );
    olblStatCountSensor = new sap.ui.commons.Label("lblStatCountSensor", {text: 'Sensor Count', labelFor: otvStatTotalSensor});
    olblStatCountSensor.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountSensor, otvStatTotalSensor);
    

    var otvStatTotalPower = new sap.ui.commons.TextView("tvStatTotalPower",{
		text : "0"}
    );
    olblStatCountPower = new sap.ui.commons.Label("lblStatCountPower", {text: 'Power Count', labelFor: otvStatTotalPower});
    olblStatCountPower.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountPower, otvStatTotalPower);

    
    var otvStatTotalDrive = new sap.ui.commons.TextView("tvStatTotalDrive",{
		text : "0"}
    );
    olblStatCountDrive = new sap.ui.commons.Label("lblStatCountDrive", {text: 'Drive Count', labelFor: otvStatTotalDrive});
    olblStatCountDrive.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountDrive, otvStatTotalDrive);

    
    var otvStatAvgSpeed = new sap.ui.commons.TextView("tvStatAvgSpeed",{
		text : "0"}
    );
    olblStatAvgSpeed = new sap.ui.commons.Label("lblStatAvgSpeed", {text: 'Avg Speed', labelFor: otvStatAvgSpeed});
    olblStatAvgSpeed.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatAvgSpeed, otvStatAvgSpeed);

    
    var otvStatMaxSpeed = new sap.ui.commons.TextView("tvStatMaxSpeed",{
		text : "0"}
    );
    olblStatMaxSpeed = new sap.ui.commons.Label("lblStatMaxSpeed", {text: 'Max Speed', labelFor: otvStatMaxSpeed});
    olblStatMaxSpeed.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatMaxSpeed, otvStatMaxSpeed);

    
    var otvStatMinAlt = new sap.ui.commons.TextView("tvStatMinAlt",{
		text : "0"}
    );
    olblStatMinAlt = new sap.ui.commons.Label("lblStatMinAlt", {text: 'Min Alt', labelFor: otvStatMinAlt});
    olblStatMinAlt.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatMinAlt, otvStatMinAlt);

    var otvStatMaxAlt = new sap.ui.commons.TextView("tvStatMaxAlt",{
		text : "0"}
    );
    olblStatMaxAlt = new sap.ui.commons.Label("lblStatMaxAlt", {text: 'Max Alt', labelFor: otvStatMaxAlt});
    olblStatMaxAlt.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatMaxAlt, otvStatMaxAlt);

    var otvStatAvgAlt = new sap.ui.commons.TextView("tvStatAvgAlt",{
		text : "0"}
    );
    olblStatAvgAlt = new sap.ui.commons.Label("lblStatAvgAlt", {text: 'Avg Alt', labelFor: otvStatAvgAlt});
    olblStatAvgAlt.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatAvgAlt, otvStatAvgAlt);

    var otvStatTravelledM = new sap.ui.commons.TextView("tvStatTravelledM",{
		text : "0"}
    );
    olblStatTravelledM = new sap.ui.commons.Label("lblStatTravelledM", {text: 'Travelled M', labelFor: otvStatTravelledM});
    olblStatTravelledM.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatTravelledM, otvStatTravelledM);
    
    oLayout.createRow(omlStats);    	
    
    
}








