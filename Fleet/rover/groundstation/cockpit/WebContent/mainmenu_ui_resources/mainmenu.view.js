sap.ui.jsview("mainmenu_ui_resources.mainmenu", {
	
      getControllerName : function() {
         return "mainmenu_ui_resources.mainmenu";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();

    	 buildKeyToStart(oController,oLayout);    	 
    	 buildMainMenu(oController,oLayout);
  	     return oLayout;
      }

});


function buildKeyToStart(oController,oLayout){
	var omlKeyToStart = new sap.ui.commons.layout.MatrixLayout({
		   id: 		"mlKeyToStart",
		   width:	"100%"
	});
	
	
	var omlRowKeyToStart = new sap.ui.commons.layout.MatrixLayoutRow();
	var omlCellKeyToStart= new sap.ui.commons.layout.MatrixLayoutCell();
    var oLblKeyToStart 	 = new sap.ui.commons.Label({
    		id: 	"lblKeyToStart",
    		text: 	myHplApp.controller.getTextFromBundle("pressanykeytostart"),
    });
    
    
    omlCellKeyToStart.addContent(oLblKeyToStart);
    omlRowKeyToStart.addCell(omlCellKeyToStart);
    omlKeyToStart.addRow(omlRowKeyToStart);
    oLayout.createRow(omlKeyToStart);    	
}


function buildMainMenu(oController,oLayout){	
	var omlMainMenu = new sap.ui.commons.layout.MatrixLayout({
		   id: 		"mlMainMenu",
		   width:	"100%"
	});

	
	var omlRowSoloCampaign 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var omlRowMultiplayer 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var omlRowSettings 		= new sap.ui.commons.layout.MatrixLayoutRow();
	var omlRowQuit 			= new sap.ui.commons.layout.MatrixLayoutRow();
	
	var omlCellSoloCampaign = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellMultiplayer 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellSettings 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellQuit 		= new sap.ui.commons.layout.MatrixLayoutCell();

    
	var olnkSoloCampaign = new sap.ui.commons.Link({
			id: 	"lnkSoloCampaign",
			text:  	myHplApp.controller.getTextFromBundle("solo"),	
			width: 	"250px",
			press:  myHplApp.controller.setViewContent
		});
	
	
	var olnkMultiplayer = new sap.ui.commons.Link({
			id: 	"lnkMultiplayer",
			text: 	myHplApp.controller.getTextFromBundle("multiplayer"),
			width: 	"250px",
			press:  myHplApp.controller.setViewContent
	});

	
	var olnkSettings = new sap.ui.commons.Link({
			id: 	"lnkSettings",
			text: 	myHplApp.controller.getTextFromBundle("settings"),
			width: 	"250px",
			press:  myHplApp.controller.setViewContent
	});

	
	var olnkQuit = new sap.ui.commons.Link({
			id: 	"lnkQuit",
			text: 	myHplApp.controller.getTextFromBundle("quit"), 	
			width: 	"250px",
			press:  myHplApp.controller.setViewContent
	});

	
    omlCellSoloCampaign.addContent(olnkSoloCampaign);
    omlRowSoloCampaign.addCell(omlCellSoloCampaign);    
    omlMainMenu.addRow(omlRowSoloCampaign);

    omlCellMultiplayer.addContent(olnkMultiplayer);
    omlRowMultiplayer.addCell(omlCellMultiplayer);    
    omlMainMenu.addRow(omlRowMultiplayer);

    omlCellSettings.addContent(olnkSettings);
    omlRowSettings.addCell(omlCellSettings);    
    omlMainMenu.addRow(omlRowSettings);
    
    omlCellQuit.addContent(olnkQuit);
    omlRowQuit.addCell(omlCellQuit);    
    omlMainMenu.addRow(omlRowQuit);
       
    oLayout.createRow(omlMainMenu);    	
}
