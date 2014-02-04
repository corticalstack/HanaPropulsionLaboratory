sap.ui.jsview("telemetryStats_ui_resources.telemetryStats", {
	
      getControllerName : function() {
         return "telemetryStats_ui_resources.telemetryStats";
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
	
	
	var oTvTotalCount = new sap.ui.commons.TextView("TvTotalCount",{
			text : "0"}
	);
    
    oLabel = new sap.ui.commons.Label("lblTotalCount", {text: 'Total Count', labelFor: oTvTotalCount});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(oLabel, oTvTotalCount);
    oLayout.createRow(omlStats);    	
}







