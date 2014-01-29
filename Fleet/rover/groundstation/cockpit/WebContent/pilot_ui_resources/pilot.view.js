sap.ui.jsview("pilot_ui_resources.pilot", {
	
      getControllerName : function() {
         return "pilot_ui_resources.pilot";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();

    	 buildPilotCarousel(oController,oLayout);
  	     return oLayout;
      }

});



function buildPilotCarousel(oController,oLayout){
    var pilotCarouselContent = [];	
    var roster = myHplApp.pilot.model.getRoster();
    pilotCard = new Object();

    
	var omlPilotCarousel = new sap.ui.commons.layout.MatrixLayout({
			id: 	"mlPilotCarousel",
			width: 	"734px",
			height: "365px"
	});
	
	
	var ocarPilot = new sap.ui.commons.Carousel({
			id: 			"carPilot",
			width: 			"734px",
			height: 		"365px",
			orientation: 	"horizontal",
			visibleItems: 	1,
	});
	
	
	var oimgPadding = new sap.ui.commons.Image({		
			id:		"imgPadding",
			width: 	"5px",
			height: "1px"
	});
	

    
	
	for (var i=0; i < roster.length; i++) {
        var imgAvatarId 			= 'imgAvatar' + roster[i].pilotId,
         	lblPilotId 				= 'lblPilot' + roster[i].pilotId,
         	lblPilotNameId 			= 'lblPilotName' + roster[i].pilotId,
         	lblComplChallengesId 	= 'lblComplChallenges' + roster[i].pilotId,
         	prgIndId 				= 'prgInd' + roster[i].pilotId,
         	lblClanId 				= 'lblClan' + roster[i].pilotId,
         	imgClanId 				= 'imgClan' + roster[i].pilotId,
         	mlPilotId 				= 'mlPilot' + roster[i].pilotId,
         	lnkLaunchId				= 'lnkLaunch' + roster[i].pilotId;
        
        
        pilotCard.oimgAvatar = new sap.ui.commons.Image({
        	id: imgAvatarId,
        	src: roster[i].avatarUri,
            width: "135px",
            height: "320px"
        });
        
        
        pilotCard.olblPilot = new sap.ui.commons.Label({
        	id: 	lblPilotId,
            text: 	myHplApp.controller.getTextFromBundle("pilot")
        });    	
	
        
        pilotCard.olblPilotName = new sap.ui.commons.Label({
        	id: 	lblPilotNameId,
        	text: 	roster[i].name
        });
        
		
        pilotCard.olblComplChallanges = new sap.ui.commons.Label({
        	id: lblComplChallengesId,
        	text: myHplApp.controller.getTextFromBundle("completedchallenges")
        });
        
        
        pilotCard.oPrgInd = new sap.ui.commons.ProgressIndicator({
        	id: 			prgIndId,
	        width: 			"200px", 
	        percentValue: 	20, 
	        displayValue: 	"4 / 20"
	    }); 
		
		
        pilotCard.olblClan = new sap.ui.commons.Label({
        	id: lblClanId,
        	text: roster[i].clanName
	    });
        
        
        pilotCard.oimgClan = new sap.ui.commons.Image({
        	id: 	imgClanId,
        	src: 	roster[i].clanUri,
        	width:	"200px",
        	height:	"200px"
	    });        		
	
        
        pilotCard.omlPilot = new sap.ui.commons.layout.MatrixLayout({
	        id: 			mlPilotId,
	        layoutFixed: 	true,
	        width: 			"734px",
	        columns : 		5,
	        widths: 		["2px", "150px", "330px", "250px", "2px"] });
		
        
        pilotCard.olnkLaunch = new sap.ui.commons.Link({
		 	id: 	lnkLaunchId,
		 	text: 	myHplApp.controller.getTextFromBundle("launch"),
		 	width: 	"100%",
		 	press:	myHplApp.controller.setViewContent
        });

        
		oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({rowSpan: 3 });
		oCell2 = new sap.ui.commons.layout.MatrixLayoutCell({rowSpan: 3 });
		oCell3 = new sap.ui.commons.layout.MatrixLayoutCell({rowSpan: 3 });
		oCell4 = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 5 });
	
		
		oCell1.addContent(pilotCard.oimgAvatar);		
		oCell2.addContent(oimgPadding);
		oCell3.addContent(oimgPadding);
		oCell4.addContent(pilotCard.olnkLaunch);
		
		pilotCard.omlPilot.createRow(oCell2, oCell1,  pilotCard.olblPilot,  pilotCard.olblPilotName, oCell3);
		pilotCard.omlPilot.createRow( pilotCard.olblComplChallanges,  pilotCard.oPrgInd);	 
		pilotCard.omlPilot.createRow( pilotCard.olblClan,  pilotCard.oimgClan);		
		pilotCard.omlPilot.createRow(oCell4);
		
		pilotCarouselContent.push(pilotCard); 
		
		ocarPilot.addContent(pilotCarouselContent[i].omlPilot);

	}
	
	
	var omlRowPilot 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var omlCellPilot 	= new sap.ui.commons.layout.MatrixLayoutCell();
	
	omlCellPilot.addContent(ocarPilot);
	omlRowPilot.addCell(omlCellPilot);
	omlPilotCarousel.addRow(omlRowPilot);
	    
	oLayout.createRow(omlPilotCarousel);    	
}





