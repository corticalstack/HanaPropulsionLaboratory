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
	var oimgAvatar2 = new sap.ui.commons.Image("imgAvatar2");
	var oimgAvatar3 = new sap.ui.commons.Image("imgAvatar3");
	var oimgAvatar4 = new sap.ui.commons.Image("imgAvatar4");
	
	oimgAvatar.setWidth("135px");
	oimgAvatar.setHeight("320px");

	oimgAvatar1.setWidth("135px");
	oimgAvatar1.setHeight("320px");

	oimgAvatar2.setWidth("135px");
	oimgAvatar2.setHeight("320px");

	oimgAvatar3.setWidth("135px");
	oimgAvatar3.setHeight("320px");

	oimgAvatar4.setWidth("135px");
	oimgAvatar4.setHeight("320px");

	
	
	var olblPilot = new sap.ui.commons.Label("lblPilot"); 
	olblPilot.setText("Pilot"); 
	
	var olblPilotName = new sap.ui.commons.Label("lblPilotName");


	
	var olblPilot1 = new sap.ui.commons.Label("lblPilot1"); 
	olblPilot1.setText("Pilot"); 
	
	var olblPilotName1 = new sap.ui.commons.Label("lblPilotName1");


	var olblPilot2 = new sap.ui.commons.Label("lblPilot2"); 
	olblPilot2.setText("Pilot"); 
	
	var olblPilotName2 = new sap.ui.commons.Label("lblPilotName2");

	var olblPilot3 = new sap.ui.commons.Label("lblPilot3"); 
	olblPilot3.setText("Pilot"); 
	
	var olblPilotName3 = new sap.ui.commons.Label("lblPilotName3");

	var olblPilot4 = new sap.ui.commons.Label("lblPilot4"); 
	olblPilot4.setText("Pilot"); 
	
	var olblPilotName4 = new sap.ui.commons.Label("lblPilotName4");

	
	
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

	
	var olblComplChallanges2 = new sap.ui.commons.Label("lblComplChallenges2");
	olblComplChallanges2.setText("Completed Mission Challenges");
	
	var oProgressIndicator2 = new sap.ui.commons.ProgressIndicator("ProgInd2", {
        width: "200px", 
        percentValue: 33, 
        displayValue: "7 / 20"
        });

	var olblComplChallanges3 = new sap.ui.commons.Label("lblComplChallenges3");
	olblComplChallanges3.setText("Completed Mission Challenges");
	
	var oProgressIndicator3 = new sap.ui.commons.ProgressIndicator("ProgInd3", {
        width: "200px", 
        percentValue: 10, 
        displayValue: "2 / 20"
        });


	var olblComplChallanges4 = new sap.ui.commons.Label("lblComplChallenges4");
	olblComplChallanges4.setText("Completed Mission Challenges");
	
	var oProgressIndicator4 = new sap.ui.commons.ProgressIndicator("ProgInd4", {
        width: "200px", 
        percentValue: 5, 
        displayValue: "1 / 20"
        });

	
	var olblClan = new sap.ui.commons.Label("lblClan");
	
    var oimgClan = new sap.ui.commons.Image("imgClan");
	oimgClan.setWidth("200px");
	oimgClan.setHeight("200px");

	var olblClan1 = new sap.ui.commons.Label("lblClan1");
	
    var oimgClan1 = new sap.ui.commons.Image("imgClan1");
	oimgClan1.setWidth("200px");
	oimgClan1.setHeight("200px");


	var olblClan2 = new sap.ui.commons.Label("lblClan2");
	
    var oimgClan2 = new sap.ui.commons.Image("imgClan2");
	oimgClan2.setWidth("200px");
	oimgClan2.setHeight("200px");
    
	
	var olblClan3 = new sap.ui.commons.Label("lblClan3");
	
    var oimgClan3 = new sap.ui.commons.Image("imgClan3");
	oimgClan3.setWidth("200px");
	oimgClan3.setHeight("200px");

	
	var olblClan4 = new sap.ui.commons.Label("lblClan4");
	
    var oimgClan4 = new sap.ui.commons.Image("imgClan4");
	oimgClan4.setWidth("200px");
	oimgClan4.setHeight("200px");

	
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
	

 
    olblPilotName1.setText("Peter"); 
    
	
	oMatrix1.createRow(oCell2, oCell1, olblPilot1, olblPilotName1, oCell3);
	oMatrix1.createRow(olblComplChallanges1, oProgressIndicator1);
	 
 
    olblClan1.setText("Clan Falcon"); 
	oimgClan1.setSrc("assets/images/emblems/Falcon.jpg");
	
    oMatrix1.createRow(olblClan1, oimgClan1);
	oCarousel.addContent(oMatrix1);
	

    // Add Nadia	
	oMatrix2  = new sap.ui.commons.layout.MatrixLayout({
        id : 'matrix2',
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


	oimgAvatar2.setSrc("assets/images/pilots/avatar_Nadia1.png");
	
	oCell1.addContent(oimgAvatar2);
	oCell2.addContent(oImagePadding1);
	oCell3.addContent(oImagePadding1);
	

 
    olblPilotName2.setText("Nadia"); 
    
	
	oMatrix2.createRow(oCell2, oCell1, olblPilot2, olblPilotName2, oCell3);
	oMatrix2.createRow(olblComplChallanges2, oProgressIndicator2);
	 
 
    olblClan2.setText("Clan Black Widow"); 
	oimgClan2.setSrc("assets/images/emblems/Black Widow.jpg");
	
    oMatrix2.createRow(olblClan2, oimgClan2);
	oCarousel.addContent(oMatrix2);

	
    // Add Trond	
	oMatrix3  = new sap.ui.commons.layout.MatrixLayout({
        id : 'matrix3',
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


	oimgAvatar3.setSrc("assets/images/pilots/avatar_Trond1.png");
	
	oCell1.addContent(oimgAvatar3);
	oCell2.addContent(oImagePadding1);
	oCell3.addContent(oImagePadding1);
	

 
    olblPilotName3.setText("Trond"); 
    
	
	oMatrix3.createRow(oCell2, oCell1, olblPilot3, olblPilotName3, oCell3);
	oMatrix3.createRow(olblComplChallanges3, oProgressIndicator3);
	 
 
    olblClan3.setText("Clan Valkyrie"); 
	oimgClan3.setSrc("assets/images/emblems/Valkyrie.jpg");
	
    oMatrix3.createRow(olblClan3, oimgClan3);
	oCarousel.addContent(oMatrix3);

	

    // Add Rudi	
	oMatrix4  = new sap.ui.commons.layout.MatrixLayout({
        id : 'matrix4',
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


	oimgAvatar4.setSrc("assets/images/pilots/avatar_Rudi1.png");
	
	oCell1.addContent(oimgAvatar4);
	oCell2.addContent(oImagePadding1);
	oCell3.addContent(oImagePadding1);
	

 
    olblPilotName4.setText("Rudi"); 
    
	
	oMatrix4.createRow(oCell2, oCell1, olblPilot4, olblPilotName4, oCell3);
	oMatrix4.createRow(olblComplChallanges4, oProgressIndicator4);
	 
 
    olblClan4.setText("Clan Lion"); 
	oimgClan4.setSrc("assets/images/emblems/Leo.jpg");
	
    oMatrix4.createRow(olblClan4, oimgClan4);
	oCarousel.addContent(oMatrix4);

	
	
	//Add carousel
	var oRowPilot 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oCellPilot = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oCellPilot.addContent(oCarousel);
	oRowPilot.addCell(oCellPilot);
	omlPilotMenu.addRow(oRowPilot);
	    
	oLayout.createRow(omlPilotMenu);    	
}





