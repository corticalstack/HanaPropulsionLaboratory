sap.ui.jsview("mainmenu_ui_resources.mainmenu", {
	
      getControllerName : function() {
         return "mainmenu_ui_resources.mainmenu";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();

//    	 buildKeyToStart(oController,oLayout);    	 
    	 buildMainMenu(oController,oLayout);
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


function buildMainMenu(oController,oLayout){
	
	
	
	var oMlMainMenu 	= new sap.ui.commons.layout.MatrixLayout({
		   id : "mlMainMenu",
		   width:"100%"
	});

	
	var oRowKeyToStart 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oCellKeyToStart = new sap.ui.commons.layout.MatrixLayoutCell();
    var oLblKeyToStart 	= new sap.ui.commons.Label("lblKeyToStart");
    
    
    oLblKeyToStart.setText("PRESS KEY TO START");
    
    oCellKeyToStart.addContent(oLblKeyToStart);
    oRowKeyToStart.addCell(oCellKeyToStart);
    oMlMainMenu.addRow(oRowKeyToStart);
//    oLayout.createRow(oMlKeyToStart);    	
    

	var oRowSoloCampaign 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oRowMultiplayer 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oRowFreeride 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oRowSettings 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oRowQuit 	= new sap.ui.commons.layout.MatrixLayoutRow();
	
	var oCellSoloCampaign = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellMultiplayer = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellFreeride = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellSettings = new sap.ui.commons.layout.MatrixLayoutCell();
	var oCellQuit = new sap.ui.commons.layout.MatrixLayoutCell();

    
	var oLinkSoloCampaign = new sap.ui.commons.Link({
		id : "lnkSoloCampaign",
		text: "Solo Campaign", 
		press: function() {alert('Alert from ' + oLinkSoloCampaign.getText());}});
	
	var oLinkMultiplayer = new sap.ui.commons.Link({
		id : "lnkMultiplayer",
		text: "Multiplayer", 
		press: function() {alert('Alert from ' + oLinkMultiplayer.getText());}});

	var oLinkFreeride = new sap.ui.commons.Link({
		id : "lnkFreeride",
		text: "Freeride",
		press: function() {alert('Alert from ' + oLinkFreeride.getText());}});


	var oLinkSettings = new sap.ui.commons.Link({
		id : "lnkSettings",
		text: "Settings", 
		press:function() {setHomeContent()}});   

	var oLinkQuit = new sap.ui.commons.Link({
		id : "lnkQuit",
		text: "Quit", 	
		press: function() {alert('Alert from ' + oLinkQuit.getText());}});

    oCellSoloCampaign.addContent(oLinkSoloCampaign);
    oRowSoloCampaign.addCell(oCellSoloCampaign);    
    oMlMainMenu.addRow(oRowSoloCampaign);

    oCellMultiplayer.addContent(oLinkMultiplayer);
    oRowMultiplayer.addCell(oCellMultiplayer);    
    oMlMainMenu.addRow(oRowMultiplayer);

    oCellFreeride.addContent(oLinkFreeride);
    oRowFreeride.addCell(oCellFreeride);    
    oMlMainMenu.addRow(oRowFreeride);
    
    oCellSettings.addContent(oLinkSettings);
    oRowSettings.addCell(oCellSettings);    
   oMlMainMenu.addRow(oRowSettings);
    
    oCellQuit.addContent(oLinkQuit);
    oRowQuit.addCell(oCellQuit);    
    oMlMainMenu.addRow(oRowQuit);
       
    oLayout.createRow(oMlMainMenu);    	
}





