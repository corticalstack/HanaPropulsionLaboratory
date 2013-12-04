sap.ui.jsview("index_ui_resources.index", {
	
      getControllerName : function() {
         return "index_ui_resources.index";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();

    	 buildKeyToStart(oController,oLayout);    	 
  	     return oLayout;
      }

});


function buildKeyToStart(oController,oLayout){
	var oMlKeyToStart 	= new sap.ui.commons.layout.MatrixLayout({
		   id : "mlKeyToStart",
		   width:"100%"
	});
	
	
	var oRowKeyToStart 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oCellKeyToStart = new sap.ui.commons.layout.MatrixLayoutCell();
    var oLblKeyToStart 	= new sap.ui.commons.Label("lblKeyToStart");
    
    
    oLblKeyToStart.setText("PRESS KEY TO START");
    
    oCellKeyToStart.addContent(oLblKeyToStart);
    oRowKeyToStart.addCell(oCellKeyToStart);
    oMlKeyToStart.addRow(oRowKeyToStart);
    oLayout.createRow(oMlKeyToStart);    	
}



