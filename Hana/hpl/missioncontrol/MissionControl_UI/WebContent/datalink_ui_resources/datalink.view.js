sap.ui.jsview("datalink_ui_resources.datalink", {
	
      getControllerName : function() {
         return "datalink_ui_resources.datalink";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();

    	 buildDatalink(oController,oLayout);    	 
  	     return oLayout;
      }

});


function buildDatalink(oController,oLayout){
	var omlStats = new sap.ui.commons.layout.MatrixLayout({
		   id : "mlDatalink",
		   columns: 2,
		   width:"100%"
	});
	
	
	//Message Category ID counts
	var otvStatCountNavigation = new sap.ui.commons.TextView("tvStatCountNavigation",{
			text : ""}
	);
    
    olblStatCountNavigation = new sap.ui.commons.Label("lblStatCountNavigation", {text: 'Navigation Count', labelFor: otvStatCountNavigation});
    olblStatCountNavigation.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountNavigation, otvStatCountNavigation);
    
    
    var otvStatCountCockpit = new sap.ui.commons.TextView("tvStatCountCockpit",{
			text : ""}
    );
    olblStatCountCockpit = new sap.ui.commons.Label("lblStatCountCockpit", {text: 'Cockpit Count', labelFor: otvStatCountCockpit});
    olblStatCountCockpit.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountCockpit, otvStatCountCockpit);
    
    
    var otvStatCountNotification = new sap.ui.commons.TextView("tvStatCountNotification",{
		text : ""}
    );
    olblStatCountNotification = new sap.ui.commons.Label("lblStatCountNotification", {text: 'Notification Count', labelFor: otvStatCountNotification});
    olblStatCountNotification.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountNotification, otvStatCountNotification);
    

    var otvStatCountSensor = new sap.ui.commons.TextView("tvStatCountSensor",{
		text : ""}
    );
    olblStatCountSensor = new sap.ui.commons.Label("lblStatCountSensor", {text: 'Sensor Count', labelFor: otvStatCountSensor});
    olblStatCountSensor.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountSensor, otvStatCountSensor);
    

    var otvStatCountPower = new sap.ui.commons.TextView("tvStatCountPower",{
		text : ""}
    );
    olblStatCountPower = new sap.ui.commons.Label("lblStatCountPower", {text: 'Power Count', labelFor: otvStatCountPower});
    olblStatCountPower.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountPower, otvStatCountPower);

    
    var otvStatCountDrive = new sap.ui.commons.TextView("tvStatCountDrive",{
		text : ""}
    );
    olblStatCountDrive = new sap.ui.commons.Label("lblStatCountDrive", {text: 'Drive Count', labelFor: otvStatCountDrive});
    olblStatCountDrive.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatCountDrive, otvStatCountDrive);

        
    oLayout.createRow(omlStats);    	
    
    
}








