

sap.ui.jsview("cockpit_ui_resources.cockpit", {

	
      getControllerName : function() {
         return "cockpit_ui_resources.cockpit";
      },

      createContent : function(oController) {
    	  
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
    	 buildPanePilotCam(oController,oLayout);
    	 buildPaneDrive(oController,oLayout);
    	 buildPaneWeapons(oController,oLayout);
    	 buildPanePower(oController,oLayout);
    	 buildPaneEarthTime(oController,oLayout);
    	 buildPanePrimarySystems(oController,oLayout);
    	 
    	 buildPaneNavigation(oController,oLayout);
    	 buildPaneMissionControl(oController,oLayout);
//    	 buildGauge(oController,oLayout);
//    	 buildPrimarySystemsStatusPanel(oController,oLayout);
//    	 buildSecondarySystemsStatusPanel(oController,oLayout);
    	 buildBearingIndicators(oController,oLayout);

  	     return oLayout;
      }

});



function buildPanePilotCam(oController,oLayout){
		
	var omlPanePilotCam = new sap.ui.commons.layout.MatrixLayout({
			id: 			"mlPanePilotCam",
			layoutFixed: 	true,
			width:			"1280px"
		});
	 
	
	var ohtmlIframeRadioCamStream = new sap.ui.core.HTML({  
	    	content: '<iframe id="iframePilotCamStream" width="1280px" height="968px" frameBorder="0">Pilot Cam Stream Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'pilotcamstream.html';
	    		$("#iframePilotCamStream").load(function() {  
	    			$("#iframePilotCamStream").attr("width","1280px").attr("height","968px");  
	    		}).attr("src",newSrc);  
	    	}
	});

	 
	omlPanePilotCam.createRow(ohtmlIframeRadioCamStream);
	oLayout.createRow(omlPanePilotCam);    
	
}


function buildPaneDrive(oController,oLayout){
	
	var omlPaneDrive = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneDrive",
			layoutFixed: 	true,
			width: 			"125px",		
			
	});	
	
	
	var omlPaneDrive1 = new sap.ui.commons.layout.MatrixLayout({
        	id: 			"mlPaneDrive1",
        	layoutFixed: 	true,
        	width: 			"115px",
        	columns: 		2,
        	widths: 		["90px", "25px"]  
	});
	
	

	 var omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});
	 

	 var olblPaneDrive = new sap.ui.commons.Label({
	    	id: 		"lblPaneDrive",
	    	text: 		otextBundle.getText("drive"),	
	    	textAlign: 	"Center",
	    	width: 		"100%"
	    });
	 
	 var olblIndDriveDirection = new sap.ui.commons.Label({
	    	id: 		"lblIndDriveDirection",
	    	text: 		otextBundle.getText("forward"),
	    	textAlign: 	"Center",
	    	width: 		"100px"
	    });
	
	 
	 var olblIndStop = new sap.ui.commons.Label({
	    	id: 		"lblIndStop",
	    	text: 		otextBundle.getText("stop"),
	    	textAlign: 	"Center",
	    	width: 		"100px"
	    });

	 
	 var olblStatusLeftEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblStatusLeftEngineThrust",
	    	text: 	otextBundle.getText("leftenginethrust"),
	    	width: 	"90px"
	    });
	
	 
	 var olblValLeftEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblValLeftEngineThrust",
	    	text: 	"99",
	    	textAlign: 	"Right",
	    	width: 	"25px"	    	
	 });
	 
	 
	 var olblStatusRightEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblStatusRightEngineThrust",
	    	text: 	otextBundle.getText("rightenginethrust"),
	    	width: 	"90px"	    	
	 });
	 
	 
	 var olblValRightEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblValRightEngineThrust",
	    	text: 	"-20",
	    	textAlign: 	"Right",
	    	width: 	"25px"	    		    	
	 });

	 
	 var ohtmlGaugeThrust = new sap.ui.core.HTML({  
         	content : "<div id='gaugeThrust'></div>"
     });

	 
	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	 omlCell1.addContent(olblPaneDrive);
	 omlRow1.addCell(omlCell1);
	 omlPaneDrive.addRow(omlRow1);
	 
	 
	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});
	 omlCell1.addContent(olblIndDriveDirection);
	 omlRow1.addCell(omlCell1);	
	 omlPaneDrive.addRow(omlRow1);

	 
	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});
	 omlCell1.addContent(olblIndStop);
	 omlRow1.addCell(omlCell1);
	 omlPaneDrive.addRow(omlRow1);

	 	
	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	 omlCell1.addContent(olblStatusLeftEngineThrust);
	 omlCell2.addContent(olblValLeftEngineThrust);
	 omlRow1.addCell(omlCell1);
	 omlRow1.addCell(omlCell2);
	 omlPaneDrive1.addRow(omlRow1);


	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	 omlCell1.addContent(olblStatusRightEngineThrust);
	 omlCell2.addContent(olblValRightEngineThrust);
	 omlRow1.addCell(omlCell1);
	 omlRow1.addCell(omlCell2);
	 omlPaneDrive1.addRow(omlRow1);
	 
	 
	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});
	 omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "90px"});
	 omlCell1.addContent(ohtmlGaugeThrust);
	 omlRow1.addCell(omlCell1);
	 omlPaneDrive1.addRow(omlRow1);
	 
	 
	 omlPaneDrive.createRow(omlPaneDrive1);
	 oLayout.createRow(omlPaneDrive);   

}


function buildPanePrimarySystems(oController,oLayout){

	var omlPanePrimarySystems = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPanePrimarySystems",
			width:			"390px",
		    layoutFixed: 	true,
	        columns: 		3,
	        widths: 		["125px", "125px", "110px"]
	});	
	
	
	var omlPanePrimarySystems1 = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlPanePrimarySystems1",
			width:	"150px"
	});	
	
	
	var omlCell1 					= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellPanePrimaryTitle 	= new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 3});
	var omlRowPanePrimarySystems	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	var omlRowPrimary1				= new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});

	
	var olblPanePrimarySystems = new sap.ui.commons.Label({
    		id: 		"lblPanePrimarySystems",
    		text: 		otextBundle.getText("primarysystems"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });

	
	var olblIndPowerFailsafe = new sap.ui.commons.Label({
	   		id: 		"lblIndPowerFailsafe",
	    	text: 		otextBundle.getText("powerfailsafe"),
	    	textAlign: 	"Center",
	    	width: 		"90px"
	});
	
	 
	var olblIndCommsFailsafe = new sap.ui.commons.Label({
	    	id: 		"lblIndCommsFailsafe",
	    	text: 		otextBundle.getText("commsfailsafe"),
	    	textAlign: 	"Center",
	    	width: 		"90px"
	});


	var olblIndThrustFailsafe = new sap.ui.commons.Label({
	    	id: 		"lblIndThrustFailsafe",
	    	text: 		otextBundle.getText("thrustfailsafe"),
	    	textAlign: 	"Center",
	    	width: 		"90px"
	});
	 
	 
	var ohtmlGaugeShield = new sap.ui.core.HTML({  
	    	content: "<div id='gaugeShield'></div>"
	});

	
	var ohtmlGaugeCoreTemp = new sap.ui.core.HTML({  
	    	content: "<div id='gaugeCoreTemp'></div>"
	});

	

	omlCellPanePrimaryTitle.addContent(olblPanePrimarySystems);
	omlRowPanePrimarySystems.addCell(omlCellPanePrimaryTitle);
	omlPanePrimarySystems.addRow(omlRowPanePrimarySystems);
	 
	 
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlRowPrimary1	= new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});
	omlCell1.addContent(olblIndPowerFailsafe);
	omlRowPrimary1.addCell(omlCell1);
	omlPanePrimarySystems1.addRow(omlRowPrimary1);

	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlRowPrimary1	= new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});
	omlCell1.addContent(olblIndThrustFailsafe);
	omlRowPrimary1.addCell(omlCell1);
	omlPanePrimarySystems1.addRow(omlRowPrimary1);

	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlRowPrimary1	= new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});
	omlCell1.addContent(olblIndCommsFailsafe);
	omlRowPrimary1.addCell(omlCell1);
	omlPanePrimarySystems1.addRow(omlRowPrimary1);


	omlPanePrimarySystems.createRow(ohtmlGaugeCoreTemp, ohtmlGaugeShield, omlPanePrimarySystems1);

	 
	oLayout.createRow(omlPanePrimarySystems);   	 
}


function buildPaneEarthTime(oController,oLayout){
	
	var omlPaneEarthTime = new sap.ui.commons.layout.MatrixLayout({
			id: 	"mlPaneEarthTime",
			width: "567px"
	});
	 
	
    var omlCellPaneEarthTime 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellPaneEarthTimeTitle 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPaneEarthTimeTitle 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	var omlRowPaneEarthTime 		= new sap.ui.commons.layout.MatrixLayoutRow();

	var olblPaneEarthTime = new sap.ui.commons.Label({
    		id: 		"lblPaneEarthTime",
    		text: 		otextBundle.getText("earthtime"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });
	
	
	var ohtmlIframeEarthTime = new sap.ui.core.HTML({  
	    	content: '<iframe id="iframeEarthTime" width="567px" height="100px" frameBorder="0">Earth Time Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'earthtime.html';
	    		$("#iframeEarthTime").load(function() {  
	    			$("#iframeEarthTime").attr("width","567px").attr("height","100px");  
	    		}).attr("src",newSrc);  
	    	}
	});

	
	omlCellPaneEarthTimeTitle.addContent(olblPaneEarthTime);
	omlRowPaneEarthTimeTitle.addCell(omlCellPaneEarthTimeTitle);
	omlPaneEarthTime.addRow(omlRowPaneEarthTimeTitle);
	 
	omlCellPaneEarthTime.addContent(ohtmlIframeEarthTime);
	omlRowPaneEarthTime.addCell(omlCellPaneEarthTime);
	omlPaneEarthTime.addRow(omlRowPaneEarthTime);
	oLayout.createRow(omlPaneEarthTime);    
	
}


function buildPanePower(oController,oLayout){

	var omlPanePower = new sap.ui.commons.layout.MatrixLayout({
	        id: 			"mlPanePower",
	        layoutFixed: 	true,
	        width: 			"440px",
	        columns: 		4,
	        widths: 		["65px", "125px", "125px", "125px"]  
	});
		

	var omlPanePower1 = new sap.ui.commons.layout.MatrixLayout({
        id: 			"mlPanePower1",
        layoutFixed: 	true,
        width: 			"100px"
	});


	var omlCellPanePowerTitle 	= new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 4});
	
	
	var omlRowPanePowerTitle 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	
	var olblPanePower = new sap.ui.commons.Label({
			id: 		"lblPanePower",
		    text: 		otextBundle.getText("power"),	
		    textAlign: 	"Center",
		    width: 		"100%"
		});
	
	 
	var ohtmlGaugeCurrent = new sap.ui.core.HTML({  
        	content: "<div id='gaugeCurrent'></div>"
	});

	
	var ohtmlGaugeAmps = new sap.ui.core.HTML({  
    		content : "<div id='gaugeAmps'></div>"
	});
	
	
	var ohtmlGaugeBattRemaining = new sap.ui.core.HTML({  
	    	content: "<div id='gaugeBattRemaining'></div>"
	});

	var ohtmlGaugeVoltage = new sap.ui.core.HTML({  
    		content: "<div id='gaugeVoltage'></div>"
	});

	var ohtmlGaugeConsumedMah = new sap.ui.core.HTML({  
    		content: "<div id='gaugeConsumedMah'></div>"
	});


	

	 
	omlCellPanePowerTitle.addContent(olblPanePower);
	omlRowPanePowerTitle.addCell(omlCellPanePowerTitle);
	omlPanePower.addRow(omlRowPanePowerTitle);
	 

	omlPanePower1.createRow(ohtmlGaugeCurrent);
	omlPanePower1.createRow(ohtmlGaugeAmps);	

		
  	omlPanePower.createRow(omlPanePower1, ohtmlGaugeConsumedMah, ohtmlGaugeVoltage, ohtmlGaugeBattRemaining );
	oLayout.createRow(omlPanePower);   

}




function buildPaneNavigation(oController,oLayout){
	var omlPaneNavigation = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlPaneNavigation",
			layoutFixed: 	true,
			width:	"507px"
	});	

	var omlPaneNavigation1 = new sap.ui.commons.layout.MatrixLayout({
    		id: 			"mlPaneNavigation1",
    		layoutFixed: 	true,
    		width: 			"410px",
    		columns : 		5,
    		widths: 		["130px", "70px", "10px", "130px", "70px"]  
	});

	var omlPaneNavigation2 = new sap.ui.commons.layout.MatrixLayout({
    		id: 			"mlPaneNavigation2",
    		layoutFixed: 	true,
    		width: 			"426px",  
	});

	
	var olblPaneNavigation = new sap.ui.commons.Label({
			id: 		"lblPaneNavigation",
			text: 		otextBundle.getText("navigation"),
			textAlign: 	"Center",
			width: 		"100%"
	});

	
	var omlCell1 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell2 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell3 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell4 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellPadding	= new sap.ui.commons.layout.MatrixLayoutCell();
	
	var olblStatusSatellites = new sap.ui.commons.Label({
    		id: 		"lblStatusSatellites",
    		text: 		otextBundle.getText("satellites"),
    		width: 		"130px"
	});

 
	var olblValSatellites = new sap.ui.commons.Label({
    		id: 		"lblValSatellites",
    		text: 		"11",
    		textAlign: 	"Right",
    		width: 		"70px"	    	
	});


	var olblStatusFixType = new sap.ui.commons.Label({
	    	id: 		"lblStatusFixType",
	    	text: 		otextBundle.getText("fixtype"),
	    	width: 		"130px"
	});
	
	 
	var olblValFixType = new sap.ui.commons.Label({
	    	id: 		"lblValFixType",
	    	text: 		"3D",
	    	textAlign: 	"Right",
	    	width: 		"70px"	    	
	});


	var olblStatusLattitude = new sap.ui.commons.Label({
	    	id: 		"lblStatusLattitude",
	    	text: 		otextBundle.getText("lattitude"),
	    	width: 		"130px"
	});
	
	 
	var olblValLattitude = new sap.ui.commons.Label({
	    	id: 		"lblValLattitude",
	    	text: 		"46.12345",
	    	textAlign: 	"Right",
	    	width: 		"70px"	    	
	});
	

	var olblStatusLongitude = new sap.ui.commons.Label({
		    id: 		"lblStatusLongitude",
		    text: 		otextBundle.getText("longitude"),
		    width: 		"130px"
	});
		
		 
	var olblValLongitude = new sap.ui.commons.Label({
		    id: 		"lblValLongitude",
		    text: 		"6.123456",
		    textAlign: 	"Right",
		    width: 		"70px"	    	
	});
 

	var olblStatusAltitude = new sap.ui.commons.Label({
		    id: 		"lblStatusAltitude",
		    text: 		otextBundle.getText("altitude"),
		    width: 		"130px"
	});
		
		 
	var olblValAltitude = new sap.ui.commons.Label({
		    id: 		"lblValAltitude",
		    text: 		"716.14",
		    textAlign: 	"Right",
		    width: 		"70px"	    	
	});
		

	var olblStatusSpeedcms = new sap.ui.commons.Label({
	   		id: 		"lblStatusSpeedcms",
			text: 		otextBundle.getText("speedcms"),
			width: 		"130px"
	});
			
			 
	var olblValSpeedcms = new sap.ui.commons.Label({
			id: 		"lblValSpeedcms",
			text: 		"3d",
			textAlign: 	"Right",
			width: 		"70px"	    	
	});		 
		 

	var olblStatusHoriAccEst = new sap.ui.commons.Label({
			id: 		"lblStatusHoriAccEst",
			text: 		otextBundle.getText("horiaccest"),
			width: 		"130px"
	});
			
			 
	var olblValHoriAccEst = new sap.ui.commons.Label({
			id: 		"lblValHoriAccEst",
			text: 		"716",
			textAlign: 	"Right",
			width: 		"70px"	    	
	});

	
	var olblStatusVertAccEst = new sap.ui.commons.Label({
			id: 		"lblStatusVertAccEst",
			text: 		otextBundle.getText("vertaccest"),
			width: 		"130px"
	});
				
				 
	var olblValVertAccEst = new sap.ui.commons.Label({
			id: 		"lblValVertAccEst",
			text: 		"3d",
			textAlign: 	"Right",
			width: 		"70px"	    	
	});		 

	
	var ohtmlMap = new sap.ui.core.HTML({  
    		content : "<div id='cockpitMap' style='width: 426px; height: 320px;'></div>"  
	});
				 
	
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 5});
	omlCell1.addContent(olblPaneNavigation);
	omlRow1 = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	omlRow1.addCell(omlCell1);
	omlPaneNavigation1.addRow(omlRow1);
	 
	
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell3 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCellPadding	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlRow1 = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});	
	omlCell1.addContent(olblStatusSatellites);
	omlCell2.addContent(olblValSatellites);
	omlCell3.addContent(olblStatusFixType);
	omlCell4.addContent(olblValFixType);	 
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCellPadding);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlPaneNavigation1.addRow(omlRow1);	 

				 
	omlCell1 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell2 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell3 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell4 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCellPadding	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlRow1 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	omlCell1.addContent(olblStatusLattitude);
	omlCell2.addContent(olblValLattitude);	
	omlCell3.addContent(olblStatusLongitude);
	omlCell4.addContent(olblValLongitude);	 
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCellPadding);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlPaneNavigation1.addRow(omlRow1);	 

	
	omlCell1 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell2 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell3 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell4 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCellPadding	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlRow1 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});	
	omlCell1.addContent(olblStatusAltitude);
	omlCell2.addContent(olblValAltitude);
	omlCell3.addContent(olblStatusSpeedcms);
	omlCell4.addContent(olblValSpeedcms);	 
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCellPadding);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlPaneNavigation1.addRow(omlRow1);	 



	omlCell1 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell2 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell3 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell4 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCellPadding	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlRow1 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	omlCell1.addContent(olblStatusHoriAccEst);
	omlCell2.addContent(olblValHoriAccEst);
	omlCell3.addContent(olblStatusVertAccEst);
	omlCell4.addContent(olblValVertAccEst);	 		 
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCellPadding);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlPaneNavigation1.addRow(omlRow1);	 
					 
	 
	omlPaneNavigation.createRow(omlPaneNavigation1);
	

	omlPaneNavigation2.createRow(ohtmlMap);
	omlPaneNavigation.createRow(omlPaneNavigation2);

	oLayout.createRow(omlPaneNavigation);   
 
}

function buildPaneMissionControl(oController,oLayout){
	var omlPaneMissionControl = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlPaneMissionControl",
			width:	"507px"
	});	
	
	 
	var olblPaneMissionControl = new sap.ui.commons.Label({
    	id: 		"lblPaneMissionControl",
    	text: 		otextBundle.getText("missioncontrol"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });


	 var omlCellPaneMissionControlTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRowPaneMissionControlTitle = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
	 omlCellPaneMissionControlTitle.addContent(olblPaneMissionControl);
	 omlRowPaneMissionControlTitle.addCell(omlCellPaneMissionControlTitle);
	 omlPaneMissionControl.addRow(omlRowPaneMissionControlTitle);
	
	
	 oLayout.createRow(omlPaneMissionControl);   

}


function buildPaneWeapons(oController,oLayout){
	var omlPaneWeapons = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneWeapons",
			layoutFixed: 	true,
			width: 			"125px",		
		
	});	


	var omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "35px"});
 

	var olblPaneWeapons = new sap.ui.commons.Label({
    		id: 		"lblPaneWeapons",
    		text: 		otextBundle.getText("weapons"),	
    		textAlign: 	"Center",
    		width: 		"100%"
    	});
 
	var olblIndArmed = new sap.ui.commons.Label({
    		id: 		"lblIndArmed",
    		text: 		otextBundle.getText("armed"),
    		textAlign: 	"Center",
    		width: 		"100px"
    });

 
	var ohtmlGaugeAmmo = new sap.ui.core.HTML({  
     		content : "<div id='gaugeAmmo'></div>"
	});

	var oimgWeapon = new sap.ui.commons.Image({
    		id: "imgWeapon",
    		src: "assets/images/weapons/Missile.png",
    		width: "100px",
    		height: "100px"
    });
 
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	omlCell1.addContent(olblPaneWeapons);
	omlRow1.addCell(omlCell1);	
	omlPaneWeapons.addRow(omlRow1);
 
 
	omlPaneWeapons.createRow(olblIndArmed);
	omlPaneWeapons.createRow(ohtmlGaugeAmmo);
	omlPaneWeapons.createRow(oimgWeapon);
 
 	oLayout.createRow(omlPaneWeapons);   

	 
}


function buildGauge(oController,oLayout){
	var omlGauge = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlcockpitGauge",
			width: "250px"
	});	
	

	  

	  var omlCellGauge3 = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "100px"
	  });

	  var omlCellGauge4 = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "100px"
	  });

	  var omlCellGauge5 = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "100px"
	  });

	  var omlCellGauge6 = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "100px"
	  });

	  var omlCellGauge7 = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "100px"
	  });

	  
	  var omlRowGauge2 = new sap.ui.commons.layout.MatrixLayoutRow();
	  var omlRowGauge3 = new sap.ui.commons.layout.MatrixLayoutRow();
	  var omlRowGauge4 = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
		var ohtmlGauge3 = new sap.ui.core.HTML({  
	         content : "<div id='cockpitGauge3'></div>"
	     });

		var ohtmlGauge4 = new sap.ui.core.HTML({  
	         content : "<div id='cockpitGauge4'></div>"
	     });

		var ohtmlGauge5 = new sap.ui.core.HTML({  
	         content : "<div id='cockpitGauge5'></div>"
	     });

		var ohtmlGauge6 = new sap.ui.core.HTML({  
	         content : "<div id='cockpitGauge6'></div>"
	     });

		var ohtmlGauge7 = new sap.ui.core.HTML({  
	         content : "<div id='cockpitGauge7'></div>"
	     });

		


	 omlCellGauge3.addContent(ohtmlGauge3);
	 omlCellGauge4.addContent(ohtmlGauge4);
	 omlCellGauge5.addContent(ohtmlGauge5);
	 omlCellGauge6.addContent(ohtmlGauge6);
	 omlCellGauge7.addContent(ohtmlGauge7);
	 
	
	 
	 omlRowGauge2.addCell(omlCellGauge3);
	 omlRowGauge2.addCell(omlCellGauge4);
	 omlGauge.addRow(omlRowGauge2);
	
	 omlRowGauge3.addCell(omlCellGauge5);
	 omlRowGauge3.addCell(omlCellGauge6);
	 omlGauge.addRow(omlRowGauge3);
	
	 omlRowGauge4.addCell(omlCellGauge7);
	 omlGauge.addRow(omlRowGauge4);
	 
	 oLayout.createRow(omlGauge);   
	 
	 
	 //And to update, g.refresh(newValue)
	 //See http://justgage.com/demos/refreshmax/
	 //http://papermashup.com/awesome-dashboard-gauges-with-javascript/
	 //http://stackoverflow.com/questions/15643012/how-to-show-color-by-sector-with-justgage
}


function buildPrimarySystemsStatusPanel(oController,oLayout){
	var omlPrimarySystemsStatusPanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlPrimarySystemsStatusPanel",
			width:	"300px"
	});	
	

	var omlCellPowerStatus = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPowerStatus = new sap.ui.commons.layout.MatrixLayoutRow();
	
	var omlCellLinkStatus = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowLinkStatus = new sap.ui.commons.layout.MatrixLayoutRow();

	
		
	var olblPowerStatus = new sap.ui.commons.Label({
	    	id: 	"lblPowerStatus",
	    	text: 	otextBundle.getText("power"),
	    });
		 
		 
	 omlCellPowerStatus.addContent(olblPowerStatus);
	 omlRowPowerStatus.addCell(omlCellPowerStatus);
	 omlPrimarySystemsStatusPanel.addRow(omlRowPowerStatus);

	 
	 var olblLinkStatus = new sap.ui.commons.Label({
	    	id: 	"lblLinkStatus",
	    	text: 	otextBundle.getText("link"),
	    });

	 omlCellLinkStatus.addContent(olblLinkStatus);
	 omlRowLinkStatus.addCell(omlCellLinkStatus);
	 omlPrimarySystemsStatusPanel.addRow(omlRowLinkStatus);
	 
	 oLayout.createRow(omlPrimarySystemsStatusPanel);   

}


function buildSecondarySystemsStatusPanel(oController,oLayout){
	var omlSecondarySystemsStatusPanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlSecondarySystemsStatusPanel",
			width:	"300px"
	});	
	

	var omlCellGpsStatus = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowGpsStatus = new sap.ui.commons.layout.MatrixLayoutRow();
	
	
	var omlCellGyroStatus = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowGyroStatus = new sap.ui.commons.layout.MatrixLayoutRow();

	
	var omlCellHeadlightsStatus = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowHeadlightsStatus = new sap.ui.commons.layout.MatrixLayoutRow();

	var omlCellDirectionStatus = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowDirectionStatus = new sap.ui.commons.layout.MatrixLayoutRow();

	var omlCellBrakeStatus = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowBrakeStatus = new sap.ui.commons.layout.MatrixLayoutRow();

	
	var olblGpsStatus = new sap.ui.commons.Label({
	    	id: 	"lblGpsStatus",
	    	text: 	otextBundle.getText("gps"),
	    });
		 
		 
	 omlCellGpsStatus.addContent(olblGpsStatus);
	 omlRowGpsStatus.addCell(omlCellGpsStatus);
	 omlSecondarySystemsStatusPanel.addRow(omlRowGpsStatus);


	var olblGyroStatus = new sap.ui.commons.Label({
	    	id: 	"lblGyroStatus",
	    	text: 	otextBundle.getText("gyro"),
	    });
		 
		 
	 omlCellGyroStatus.addContent(olblGyroStatus);
	 omlRowGyroStatus.addCell(omlCellGyroStatus);
	 omlSecondarySystemsStatusPanel.addRow(omlRowGyroStatus);

	
	 var olblDirectionStatus = new sap.ui.commons.Label({
	    	id: 	"lblDirectionStatus",
	    	text: 	otextBundle.getText("forward"),
	    });
		 
		 
	 omlCellDirectionStatus.addContent(olblDirectionStatus);
	 omlRowDirectionStatus.addCell(omlCellDirectionStatus);
	 omlSecondarySystemsStatusPanel.addRow(omlRowDirectionStatus);

	 
	 var olblBrakeStatus = new sap.ui.commons.Label({
	    	id: 	"lblBrakeStatus",
	    	text: 	otextBundle.getText("brake"),
	    });
		 
		 
	 omlCellBrakeStatus.addContent(olblBrakeStatus);
	 omlRowBrakeStatus.addCell(omlCellBrakeStatus);
	 omlSecondarySystemsStatusPanel.addRow(omlRowBrakeStatus);
	 
	var olblHeadlightsStatus = new sap.ui.commons.Label({
	    	id: 	"lblHeadlightsStatus",
	    	text: 	otextBundle.getText("headlights"),
	    });

	 omlCellHeadlightsStatus.addContent(olblHeadlightsStatus);
	 omlRowHeadlightsStatus.addCell(omlCellHeadlightsStatus);
	 omlSecondarySystemsStatusPanel.addRow(omlRowHeadlightsStatus);
	 
	 oLayout.createRow(omlSecondarySystemsStatusPanel);   

}


function buildBearingIndicators(oController,oLayout){
	var omlBearingIndicators = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlBearingIndicators",
			width:	"600px"
	});	
	

	var omlCellCompassIndicator = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellPanIndicator = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellHomeIndicator = new sap.ui.commons.layout.MatrixLayoutCell();
	
	var omlRowBearingIndicators = new sap.ui.commons.layout.MatrixLayoutRow();
		
    oimgCompassIndicator = new sap.ui.commons.Image({
    	id: 'imgCompassIndicator',
    	src: 'assets/images/hud/Compass.png',
        width: "82px",
        height: "120px"
    });

    oimgPanIndicator = new sap.ui.commons.Image({
    	id: 'imgPanindicator',
    	src: 'assets/images/hud/Compass.png',
        width: "82px",
        height: "120px"
    });

    oimgHomeIndicator = new sap.ui.commons.Image({
    	id: 'imgHomeIndicator',
    	src: 'assets/images/hud/Compass.png',
        width: "82px",
        height: "120px"
    });

    omlCellCompassIndicator.addContent(oimgCompassIndicator);
    omlCellPanIndicator.addContent(oimgPanIndicator);
    omlCellHomeIndicator.addContent(oimgHomeIndicator);
    
    omlRowBearingIndicators.addCell(omlCellCompassIndicator);
    omlRowBearingIndicators.addCell(omlCellPanIndicator);
    omlRowBearingIndicators.addCell(omlCellHomeIndicator);
    
    omlBearingIndicators.addRow(omlRowBearingIndicators);
	oLayout.createRow(omlBearingIndicators);   

}


