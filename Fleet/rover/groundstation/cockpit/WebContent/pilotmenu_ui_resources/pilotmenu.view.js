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
	var omlPilotMenu = new sap.ui.commons.layout.MatrixLayout({
		id : 'mlPilotMenu',
		width: "734px",
		height: "325px"
	});
	
	
	var oCarousel = new sap.ui.commons.Carousel();        
	oCarousel.setWidth("734px");
	oCarousel.setHeight("325px");
	oCarousel.setOrientation("horizontal");
	oCarousel.setVisibleItems(1);
	
	
	//Generic
	var oImagePadding1 = new sap.ui.commons.Image("IMGPADDING1");
	
	
	oImagePadding1.setSrc("assets/images/trans.jpg");
	oImagePadding1.setWidth("5px");
	oImagePadding1.setHeight("1px");

	
	var oimgAvatar = new sap.ui.commons.Image("imgAvatar");
	var oimgAvatar1 = new sap.ui.commons.Image("imgAvatar1");
	oimgAvatar.setWidth("135px");
	oimgAvatar.setHeight("320px");

	oimgAvatar1.setWidth("135px");
	oimgAvatar1.setHeight("320px");

	
	var olblPilot = new sap.ui.commons.Label("lblPilot"); 
	olblPilot.setText("Pilot"); 
	
	var olblPilotName = new sap.ui.commons.Label("lblPilotName");
	
	var olblComplChallanges = new sap.ui.commons.Label("lblComplChallenges");
	olblComplChallanges.setText("Completed Mission Challenges");
	
	var oProgressIndicator = new sap.ui.commons.ProgressIndicator("ProgInd", {
        width: "200px", 
        percentValue: 20, 
        displayValue: "4 / 20"
        });


	var olblComplChallanges1 = new sap.ui.commons.Label("lblComplChallenges1");
	olblComplChallanges1.setText("Completed Mission Challenges");
	
	var oProgressIndicator1 = new sap.ui.commons.ProgressIndicator("ProgInd1", {
        width: "200px", 
        percentValue: 50, 
        displayValue: "10 / 20"
        });

	
	var olblClan = new sap.ui.commons.Label("lblClan");
	
    var oimgClan = new sap.ui.commons.Image("imgClan");
	oimgClan.setWidth("200px");
	oimgClan.setHeight("200px");

	var olblClan1 = new sap.ui.commons.Label("lblClan1");
	
    var oimgClan1 = new sap.ui.commons.Image("imgClan1");
	oimgClan1.setWidth("200px");
	oimgClan1.setHeight("200px");

    
    // Add JP	
	var oMatrix  = new sap.ui.commons.layout.MatrixLayout({
        id : 'matrix',
        layoutFixed : true,
        width : '734px',
        columns : 5,
        widths : ['2px', '150px', '330px', '250px', '2px'] });
	

	oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
		rowSpan : 4 });

	oCell2 = new sap.ui.commons.layout.MatrixLayoutCell({
		rowSpan : 4 });

	oCell3 = new sap.ui.commons.layout.MatrixLayoutCell({
		rowSpan : 4 });


	oimgAvatar.setSrc("assets/images/pilots/avatar_JP1.png");
	
	oCell1.addContent(oimgAvatar);
	oCell2.addContent(oImagePadding1);
	oCell3.addContent(oImagePadding1);
	

 
    olblPilotName.setText("JP"); 
    
	
	oMatrix.createRow(oCell2, oCell1, olblPilot, olblPilotName, oCell3);
	oMatrix.createRow(olblComplChallanges, oProgressIndicator);
	 
 
    olblClan.setText("Clan Wolf"); 
	oimgClan.setSrc("assets/images/emblems/Wolf.jpg");
	
    oMatrix.createRow(olblClan, oimgClan);
	oCarousel.addContent(oMatrix);


	
    // Add Peter	
	oMatrix1  = new sap.ui.commons.layout.MatrixLayout({
        id : 'matrix1',
        layoutFixed : true,
        width : '734px',
        columns : 5,
        widths : ['2px', '150px', '330px', '250px', '2px'] });
	

	oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
		rowSpan : 4 });

	oCell2 = new sap.ui.commons.layout.MatrixLayoutCell({
		rowSpan : 4 });

	oCell3 = new sap.ui.commons.layout.MatrixLayoutCell({
		rowSpan : 4 });


	oimgAvatar1.setSrc("assets/images/pilots/avatar_Peter1.png");
	
	oCell1.addContent(oimgAvatar1);
	oCell2.addContent(oImagePadding1);
	oCell3.addContent(oImagePadding1);
	

 
    olblPilotName.setText("Peter"); 
    
	
	oMatrix1.createRow(oCell2, oCell1, olblPilot, olblPilotName, oCell3);
	oMatrix1.createRow(olblComplChallanges1, oProgressIndicator1);
	 
 
    olblClan1.setText("Clan Wolf"); 
	oimgClan1.setSrc("assets/images/emblems/Wolf.jpg");
	
    oMatrix1.createRow(olblClan1, oimgClan1);
	oCarousel.addContent(oMatrix1);
	
	
	//Add carousel
	var oRowPilot 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oCellPilot = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oCellPilot.addContent(oCarousel);
	oRowPilot.addCell(oCellPilot);
	omlPilotMenu.addRow(oRowPilot);
	    
	oLayout.createRow(omlPilotMenu);    	
}





