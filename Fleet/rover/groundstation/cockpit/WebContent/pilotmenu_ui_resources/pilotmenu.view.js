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

    var pilotCarouselContent = [];	
    pilotCard = new Object();
    
    alert(pilotList.length);
	
	for (var i=0; i < pilotList.length; i++) {
        var imgAvatarId = 'imgAvatar' + i;
        var lblPilotId = 'lblPilot' + i;
        var lblPilotNameId = 'lblPilotName' + i;
        var lblComplChallengesId = 'lblComplChallenges' + i;
        var prgIndId = 'prgIndId' + i;
        var lblClanId = 'lblClanId' + i;
        var imgClanId = 'imgClanId' + i;
        var mlId = 'mlId' + i;
        
        alert(mlId);
        pilotCard.oimgAvatar = new sap.ui.commons.Image(imgAvatarId);
        pilotCard.oimgAvatar.setSrc(pilotList[i].avatarUrl);
        pilotCard.oimgAvatar.setWidth("135px");
        pilotCard.oimgAvatar.setHeight("320px");
		
        pilotCard.olblPilot = new sap.ui.commons.Label(lblPilotId);
        pilotCard.olblPilot.setText("Pilot");
	
        pilotCard.olblPilotName = new sap.ui.commons.Label(lblPilotNameId);
        pilotCard.olblPilotName.setText(pilotList[i].name);
		
        pilotCard.olblComplChallanges = new sap.ui.commons.Label(lblComplChallengesId);
        pilotCard.olblComplChallanges.setText("Completed Mission Challenges");
		
        pilotCard.oPrgInd = new sap.ui.commons.ProgressIndicator(prgIndId, {
	        width: "200px", 
	        percentValue: 20, 
	        displayValue: "4 / 20"
	        }); 
		
		
        pilotCard.olblClan = new sap.ui.commons.Label(lblClanId);
        pilotCard.olblClan.setText(pilotList[i].clanName); 
        pilotCard.oimgClan = new sap.ui.commons.Image(imgClanId);
        pilotCard.oimgClan.setSrc(pilotList[i].clanUrl);
        pilotCard.oimgClan.setWidth("200px");
        pilotCard.oimgClan.setHeight("200px");
	
        pilotCard.oMlPilot = new sap.ui.commons.layout.MatrixLayout({
	        id : mlId,
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

	
		oCell1.addContent( pilotCard.oimgAvatar);
		
		oCell2.addContent(oImagePadding1);
		oCell3.addContent(oImagePadding1);
	
		pilotCard.oMlPilot.createRow(oCell2, oCell1,  pilotCard.olblPilot,  pilotCard.olblPilotName, oCell3);
		pilotCard.oMlPilot.createRow( pilotCard.olblComplChallanges,  pilotCard.oPrgInd);
	 
		pilotCard.oMlPilot.createRow( pilotCard.olblClan,  pilotCard.oimgClan);
		pilotCarouselContent.push(pilotCard); 
		
		oCarousel.addContent(pilotCarouselContent[i].oMlPilot);



	}
	
	//Add carousel
	var oRowPilot 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var oCellPilot = new sap.ui.commons.layout.MatrixLayoutCell();
	
	oCellPilot.addContent(oCarousel);
	oRowPilot.addCell(oCellPilot);
	omlPilotMenu.addRow(oRowPilot);
	    
	oLayout.createRow(omlPilotMenu);    	
}





