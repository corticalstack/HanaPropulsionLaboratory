sap.ui.jsview("pilotmenu_ui_resources.pilotmenu", {
	
      getControllerName : function() {
         return "pilotmenu_ui_resources.pilotmenu";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();

    	 buildPilotMenu(oController,oLayout);
  	     return oLayout;
      }

});



function buildPilotMenu(oController,oLayout){
	
	var oMlPilotMenu 	= new sap.ui.commons.layout.MatrixLayout({
		   id : "mlPilotMenu",
		   width:"610px"
	});

	
	var oRowPilot 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oCellPilot = new sap.ui.commons.layout.MatrixLayoutCell();

    
    
	var oCarousel = new sap.ui.commons.Carousel();
	oCarousel.setWidth("100%");
	oCarousel.setOrientation("horizontal");
	oCarousel.setVisibleItems(3);

	oCarousel.addContent(new sap.ui.commons.Image("IMG1", {
		src : "assets/images/pilots/avatar_JP.png",
		width : "180px",
		height : "320px"
	}));

	oCarousel.addContent(new sap.ui.commons.Image("IMG3", {
		src : "assets/images/pilots/avatar_Rudi.png",
		width : "180px",
		height : "320px"
	}));
	
	oCarousel.addContent(new sap.ui.commons.Image("IMG4", {
		src : "assets/images/pilots/avatar_Peter.png",
		width : "180px",
		height : "320px"
	}));
	
	oCarousel.addContent(new sap.ui.commons.Image("IMG2", {
		src : "assets/images/pilots/avatar_Nadia.png",
		width : "180px",
		height : "320px"
	}));

	
	oCarousel.addContent(new sap.ui.commons.Image("IMG5", {
		src : "assets/images/pilots/avatar_Trond.png",
		width : "180px",
		height : "320px"
	}));


    oCellPilot.addContent(oCarousel);
    oRowPilot.addCell(oCellPilot);
    oMlPilotMenu.addRow(oRowPilot);
       
    oLayout.createRow(oMlPilotMenu);    	
}





