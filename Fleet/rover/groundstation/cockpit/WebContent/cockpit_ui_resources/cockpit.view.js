

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
    	 
    	 buildPaneBearingIndicators(oController,oLayout);
    	 buildPaneWaypoint(oController,oLayout);
    	 buildPaneGyro(oController,oLayout);
      	 buildPaneProximitySensors(oController,oLayout);
    	 
      	 buildPaneFooter(oController,oLayout);

    	 return oLayout;
      }

});



function buildPanePilotCam(oController,oLayout){
		
	var omlPanePilotCam = new sap.ui.commons.layout.MatrixLayout({
			id: 			"mlPanePilotCam",
			layoutFixed: 	true,
			width:			"1206px"
		});
	 
	
	var ohtmlIframeRadioCamStream = new sap.ui.core.HTML({  
	    	content: '<iframe id="iframePilotCamStream" width="1206px" height="912px" frameBorder="0">Pilot Cam Stream Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'pilotcamstream.html';
	    		$("#iframePilotCamStream").load(function() {  
	    			$("#iframePilotCamStream").attr("width","1206px").attr("height","912px");  
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
	    	text: 		myHplApp.controller.getTextFromBundle("drive"),	
	    	textAlign: 	"Center",
	    	width: 		"100%"
	    });
	 
	 var olblIndDriveDirection = new sap.ui.commons.Label({
	    	id: 		"lblIndDriveDirection",
	    	text: 		myHplApp.controller.getTextFromBundle("forward"),
	    	textAlign: 	"Center",
	    	width: 		"100px"
	    });
	
	 
	 var olblIndStop = new sap.ui.commons.Label({
	    	id: 		"lblIndStop",
	    	text: 		myHplApp.controller.getTextFromBundle("stop"),
	    	textAlign: 	"Center",
	    	width: 		"100px"
	    });

	 
	 var olblStatusLeftEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblStatusLeftEngineThrust",
	    	text: 	myHplApp.controller.getTextFromBundle("leftenginethrust"),
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
	    	text: 	myHplApp.controller.getTextFromBundle("rightenginethrust"),
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
    		text: 		myHplApp.controller.getTextFromBundle("primarysystems"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });

	
	var olblIndPowerFailsafe = new sap.ui.commons.Label({
	   		id: 		"lblIndPowerFailsafe",
	    	text: 		myHplApp.controller.getTextFromBundle("powerfailsafe"),
	    	textAlign: 	"Center",
	    	width: 		"90px"
	});
	
	 
	var olblIndCommsFailsafe = new sap.ui.commons.Label({
	    	id: 		"lblIndCommsFailsafe",
	    	text: 		myHplApp.controller.getTextFromBundle("commsfailsafe"),
	    	textAlign: 	"Center",
	    	width: 		"90px"
	});


	var olblIndThrustFailsafe = new sap.ui.commons.Label({
	    	id: 		"lblIndThrustFailsafe",
	    	text: 		myHplApp.controller.getTextFromBundle("thrustfailsafe"),
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
			width: 	"493px"
	});
	 
	
    var omlCellPaneEarthTime 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellPaneEarthTimeTitle 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPaneEarthTimeTitle 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	var omlRowPaneEarthTime 		= new sap.ui.commons.layout.MatrixLayoutRow();

	var olblPaneEarthTime = new sap.ui.commons.Label({
    		id: 		"lblPaneEarthTime",
    		text: 		myHplApp.controller.getTextFromBundle("earthtime"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });
	
	
	var ohtmlIframeEarthTime = new sap.ui.core.HTML({  
	    	content: '<iframe id="iframeEarthTime" width="493px" height="100px" frameBorder="0">Earth Time Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'earthtime.html';
	    		$("#iframeEarthTime").load(function() {  
	    			$("#iframeEarthTime").attr("width","493px").attr("height","100px");  
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
		    text: 		myHplApp.controller.getTextFromBundle("power"),	
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
			id:				"mlPaneNavigation",
			layoutFixed: 	true,
			width:			"580px"
	});	

	var omlPaneNavigation1 = new sap.ui.commons.layout.MatrixLayout({
    		id: 			"mlPaneNavigation1",
    		layoutFixed: 	true,
    		width: 			"480px",
    		columns : 		6,
    		widths: 		["90px", "70px", "90px", "70px", "90px", "70px"]  
	});

	var omlPaneNavigation2 = new sap.ui.commons.layout.MatrixLayout({
    		id: 			"mlPaneNavigation2",
    		layoutFixed: 	true,
    		width: 			"426px",  
	});

	
	var olblPaneNavigation = new sap.ui.commons.Label({
			id: 			"lblPaneNavigation",
			text: 			myHplApp.controller.getTextFromBundle("navigation"),
			textAlign: 		"Center",
			width: 			"100%"
	});

	
	
	var omlCell1 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell2 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell3 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell4 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell5 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell6 		= new sap.ui.commons.layout.MatrixLayoutCell();	
	
	
	var olblStatusSatellites = new sap.ui.commons.Label({
    		id: 		"lblStatusSatellites",
    		text: 		myHplApp.controller.getTextFromBundle("satellites"),
    		width: 		"90px"
	});

 
	var olblValSatellites = new sap.ui.commons.Label({
    		id: 		"lblValSatellites",
    		text: 		"0",
    		textAlign: 	"Right",
    		width: 		"70px"	    	
	});


	var olblStatusFixType = new sap.ui.commons.Label({
	    	id: 		"lblStatusFixType",
	    	text: 		myHplApp.controller.getTextFromBundle("fixtype"),
	    	width: 		"90px"
	});
	
	 
	var olblValFixType = new sap.ui.commons.Label({
	    	id: 		"lblValFixType",
	    	text: 		"",
	    	textAlign: 	"Right",
	    	width: 		"70px"	    	
	});


	var olblStatusLattitude = new sap.ui.commons.Label({
	    	id: 		"lblStatusLattitude",
	    	text: 		myHplApp.controller.getTextFromBundle("lattitude"),
	    	width: 		"90px"
	});
	
	 
	var olblValLattitude = new sap.ui.commons.Label({
	    	id: 		"lblValLattitude",
	    	text: 		"",
	    	textAlign: 	"Right",
	    	width: 		"70px"	    	
	});
	

	var olblStatusLongitude = new sap.ui.commons.Label({
		    id: 		"lblStatusLongitude",
		    text: 		myHplApp.controller.getTextFromBundle("longitude"),
		    width: 		"90px"
	});
		
		 
	var olblValLongitude = new sap.ui.commons.Label({
		    id: 		"lblValLongitude",
		    text: 		"",
		    textAlign: 	"Right",
		    width: 		"70px"	    	
	});
 

	var olblStatusAltitude = new sap.ui.commons.Label({
		    id: 		"lblStatusAltitude",
		    text: 		myHplApp.controller.getTextFromBundle("altitude"),
		    width: 		"90px"
	});
		
		 
	var olblValAltitude = new sap.ui.commons.Label({
		    id: 		"lblValAltitude",
		    text: 		"",
		    textAlign: 	"Right",
		    width: 		"70px"	    	
	});
		

	var olblStatusSpeedCms = new sap.ui.commons.Label({
	   		id: 		"lblStatusSpeedCms",
			text: 		myHplApp.controller.getTextFromBundle("speedcms"),
			width: 		"90px"
	});
			
			 
	var olblValSpeedCms = new sap.ui.commons.Label({
			id: 		"lblValSpeedCms",
			text: 		"",
			textAlign: 	"Right",
			width: 		"70px"	    	
	});		 
		 

	var olblStatusHeading = new sap.ui.commons.Label({
			id: 		"lblStatusHeading",
			text: 		myHplApp.controller.getTextFromBundle("heading"),
			width: 		"90px"
	});
			
			 
	var olblValHeading = new sap.ui.commons.Label({
			id: 		"lblValHeading",
			text: 		"",
			textAlign: 	"Right",
			width: 		"70px"	    	
	});		 

	
	var olblStatusDistanceWp = new sap.ui.commons.Label({
			id: 		"lblStatusDistanceWp",
			text: 		myHplApp.controller.getTextFromBundle("distancewp"),
			width: 		"90px"
	});
		
		 
	var olblValDistanceWp = new sap.ui.commons.Label({
			id: 		"lblValDistanceWp",
			text: 		"",
			textAlign: 	"Right",
			width: 		"70px"	    	
	});		 

	
	var olblStatusBearingWp = new sap.ui.commons.Label({
			id: 		"lblStatusBearingWp",
			text: 		myHplApp.controller.getTextFromBundle("bearingwp"),
			width: 		"90px"
	});
	
	 
	var olblValBearingWp = new sap.ui.commons.Label({
			id: 		"lblValBearingWp",
			text: 		"",
			textAlign: 	"Right",
			width: 		"70px"	    	
	});		 

	var ohtmlMap = new sap.ui.core.HTML({  
    		content : "<div id='cockpitMap' style='width: 563px; height: 422px;'></div>"  
	});
				 
	
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 8});
	omlCell1.addContent(olblPaneNavigation);
	omlRow1 = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	omlRow1.addCell(omlCell1);
	omlPaneNavigation1.addRow(omlRow1);
	 
	
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell3 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell4 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell5 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell6 = new sap.ui.commons.layout.MatrixLayoutCell();	
	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	
	omlCell1.addContent(olblStatusLattitude);
	omlCell2.addContent(olblValLattitude);	
	omlCell3.addContent(olblStatusHeading);
	omlCell4.addContent(olblValHeading);
	omlCell5.addContent(olblStatusSatellites);
	omlCell6.addContent(olblValSatellites);
	
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlRow1.addCell(omlCell5);
	omlRow1.addCell(omlCell6);	
	omlPaneNavigation1.addRow(omlRow1);	 

				 
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell3 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell4 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell5 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell6 = new sap.ui.commons.layout.MatrixLayoutCell();	
	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	
	omlCell1.addContent(olblStatusLongitude);
	omlCell2.addContent(olblValLongitude);	 
	omlCell3.addContent(olblStatusSpeedCms);
	omlCell4.addContent(olblValSpeedCms);
	omlCell5.addContent(olblStatusFixType);
	omlCell6.addContent(olblValFixType);	
	
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlRow1.addCell(omlCell5);
	omlRow1.addCell(omlCell6);	
	omlPaneNavigation1.addRow(omlRow1);	 


	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell3 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell4 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell5 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell6 = new sap.ui.commons.layout.MatrixLayoutCell();	
	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});	

	omlCell1.addContent(olblStatusAltitude);
	omlCell2.addContent(olblValAltitude);
	omlCell3.addContent(olblStatusDistanceWp);
	omlCell4.addContent(olblValDistanceWp);	 
	omlCell5.addContent(olblStatusBearingWp);
	omlCell6.addContent(olblValBearingWp);	 
	
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlRow1.addCell(omlCell5);
	omlRow1.addCell(omlCell6);

	omlPaneNavigation1.addRow(omlRow1);	 
	omlPaneNavigation.createRow(omlPaneNavigation1);
	

	omlPaneNavigation.createRow(ohtmlMap);
//	omlPaneNavigation.createRow(omlPaneNavigation2);

	oLayout.createRow(omlPaneNavigation);   
 
}


function buildPaneMissionControl(oController,oLayout){
	var omlPaneMissionControl = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneMissionControl",
			layoutFixed: 	true,
			width:			"580px"
	});	
	
	var omlPaneMissionControl1 = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneMissionControl1",
			layoutFixed: 	true,
			width:			"565px"
	});	
	 
	var olblPaneMissionControl = new sap.ui.commons.Label({
    		id: 		"lblPaneMissionControl",
    		text: 		myHplApp.controller.getTextFromBundle("missioncontrol"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });

	var omlLayoutTab = new sap.ui.commons.layout.MatrixLayout({
			id: 		"mlLayoutTab", 
			width: 		"100%"
	});
	
	
	var omlCellPaneMissionControlTitle 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPaneMissionControlTitle 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
		
	
	omlCellPaneMissionControlTitle.addContent(olblPaneMissionControl);
	omlRowPaneMissionControlTitle.addCell(omlCellPaneMissionControlTitle);
	omlPaneMissionControl.addRow(omlRowPaneMissionControlTitle);
//////
	 
	  // Create a TabStrip instance
    var otstrMissionControl = new sap.ui.commons.TabStrip({
    		id: "tstrMissionControl",
    		width: "565px",
    		height: "435px"
    });
    
    
    otstrMissionControl.attachClose( function (oEvent) { var otstrSource = oEvent.oSource;
    													 otstrSource.closeTab(oEvent.getParameter("index"));
    });

    
    olbl1 = new sap.ui.commons.Label("lbl1", {text: 'Offline 1'});
    olbl1.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlLayoutTab.createRow(olbl1);
    
    olbl2 = new sap.ui.commons.Label("lbl2", {text: 'ETA'});
    olbl2.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlLayoutTab.createRow(olbl2);

    
    otstrMissionControl.createTab("Mission",omlLayoutTab);

    
    
    // 2. tab: Telemetry
    otab2 = new sap.ui.commons.Tab({
    		id: "tab2"
    });
    
    
    otab2.setTooltip("Waypoints");
    otab2.setTitle(new sap.ui.commons.Title("TitleWaypoints",{text:"Waypoints"}));

    var omlLayoutTabWaypoints = new sap.ui.commons.layout.MatrixLayout({
		id: 		"mlLayoutWaypoints", 
		width: 		"100%"
    });
    

    olblWaypoint1 = new sap.ui.commons.Label("lblWaypoint1", {text: 'Waypoint 1'});
    olblWaypoint1.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlLayoutTabWaypoints.createRow(olblWaypoint1);
	
	otab2.addContent(omlLayoutTabWaypoints);
	otstrMissionControl.addTab(otab2);
    

	omlPaneMissionControl1.createRow(otstrMissionControl);
    omlPaneMissionControl.createRow(omlPaneMissionControl1);   
    oLayout.createRow(omlPaneMissionControl);   

}


function buildPaneWeapons(oController,oLayout){
	var omlPaneWeapons = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneWeapons",
			layoutFixed: 	true,
			width: 			"125px",		
		
	});	


	var omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
 

	var olblPaneWeapons = new sap.ui.commons.Label({
    		id: 		"lblPaneWeapons",
    		text: 		myHplApp.controller.getTextFromBundle("weapons"),	
    		textAlign: 	"Center",
    		width: 		"100%"
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
 
 
	omlPaneWeapons.createRow(ohtmlGaugeAmmo);
	omlPaneWeapons.createRow(oimgWeapon);
 
 	oLayout.createRow(omlPaneWeapons);   

	 
}


function buildPaneProximitySensors(oController,oLayout){
	var omlPaneProximitySensors = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneProximitySensors",
			layoutFixed: 	true,
			width:			"125px",
	});	
		

	var omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});


	var ohtmlGaugeFrontProximitySensor = new sap.ui.core.HTML({  
      	content : "<div id='gaugeFrontProximitySensor'></div>"
	});
	
	

	var ohtmlGaugeRearProximitySensor = new sap.ui.core.HTML({  
      	content : "<div id='gaugeRearProximitySensor'></div>"
	});
	
	
	var ohtmlGaugeCamProximitySensor = new sap.ui.core.HTML({  
      	content : "<div id='gaugeCamProximitySensor'></div>"
	});
	
	
	var olblPaneProximitySensors = new sap.ui.commons.Label({
			id: 		"lblPaneProximitySensors",
			text: 		myHplApp.controller.getTextFromBundle("proximity"),	
			textAlign: 	"Center",
			width: 		"100%"
	});


	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	omlCell1.addContent(olblPaneProximitySensors);
	omlRow1.addCell(omlCell1);	
	omlPaneProximitySensors.addRow(omlRow1);
	
	omlPaneProximitySensors.createRow(ohtmlGaugeFrontProximitySensor);
	omlPaneProximitySensors.createRow(ohtmlGaugeRearProximitySensor);
	omlPaneProximitySensors.createRow(ohtmlGaugeCamProximitySensor);
	
			
	oLayout.createRow(omlPaneProximitySensors);   
}


function buildPaneFooter(oController,oLayout){
	var omlPaneFooter = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneFooter",
			layoutFixed: 	true,
			width:			"1920px",
			columns : 		3,
    		widths: 		["125px", "1206px", "589px"]  
	});	
		
	var olblPaneFooter = new sap.ui.commons.Label({
    	id: 		"lblPaneFooter",
    	text: 		myHplApp.controller.getTextFromBundle("hpl"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });

	 var omlCell1 	= new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlCell2 	= new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlCell3 	= new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRow1 	= new sap.ui.commons.layout.MatrixLayoutRow();
			
	
	 omlCell2.addContent(olblPaneFooter);
	 
	 omlRow1.addCell(omlCell1);
	 omlRow1.addCell(omlCell2);
	 omlRow1.addCell(omlCell3);
	 omlPaneFooter.addRow(omlRow1);
		
	 oLayout.createRow(omlPaneFooter);   
}




function buildPaneBearingIndicators(oController,oLayout){
	var omlPaneBearingIndicators = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlPaneBearingIndicators",
			width:	"600px"
	});	
	
	var omlPaneBearingIndicators1 = new sap.ui.commons.layout.MatrixLayout({
		id: 			"mlPaneBearingIndicators1",
		layoutFixed: 	true,
		width: 			"450px",
		columns : 		3,
		widths: 		["150px", "150px", "150px"]
	});

	var omlCellCompassIndicator 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellCamPanIndicator 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellWaypointIndicator 	= new sap.ui.commons.layout.MatrixLayoutCell();
	
	omlCellCompassIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);
	omlCellCamPanIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);
	omlCellWaypointIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);
	
	var omlRowBearingIndicators = new sap.ui.commons.layout.MatrixLayoutRow();
		
    oimgCompassIndicator = new sap.ui.commons.Image({
    	id: 'imgCompassIndicator',
    	src: 'assets/images/hud/Compass.png',
        width: "82px",
        height: "120px"
    });

    oimgCamPanIndicator = new sap.ui.commons.Image({
    	id: 'imgCamPanindicator',
    	src: 'assets/images/hud/Compass.png',
        width: "82px",
        height: "120px"
    });

    oimgWaypointIndicator = new sap.ui.commons.Image({
    	id: 'imgWaypointIndicator',
    	src: 'assets/images/hud/Compass.png',
        width: "82px",
        height: "120px"
    });

	var olblCompass = new sap.ui.commons.Label({
    	id: 		"lblCompass",
    	text: 		myHplApp.controller.getTextFromBundle("compass"),
    	textAlign: 	"Center"
    });

	var olblCompassVal = new sap.ui.commons.Label({
    	id: 		"lblCompassVal",
    	text: 		"0",
    	textAlign: 	"Center"
    });

	var olblCamPan = new sap.ui.commons.Label({
    	id: 		"lblCamPan",
    	text: 		myHplApp.controller.getTextFromBundle("campan"),
    	textAlign: 	"Center"
    });

	var olblCamPanVal = new sap.ui.commons.Label({
    	id: 		"lblCamPanVal",
    	text: 		"0",
    	textAlign: 	"Center"
    });

	var olblWaypoint = new sap.ui.commons.Label({
    	id: 		"lblWaypoint",
    	text: 		myHplApp.controller.getTextFromBundle("waypoint"),
    	textAlign: 	"Center"
    });

	var olblWaypointVal = new sap.ui.commons.Label({
    	id: 		"lblWaypointVal",
    	text: 		"0",
    	textAlign: 	"Center"
    });
	
    
	omlCellCompassIndicator.addContent(oimgCompassIndicator);
    omlCellCamPanIndicator.addContent(oimgCamPanIndicator);
    omlCellWaypointIndicator.addContent(oimgWaypointIndicator);    
    omlRowBearingIndicators.addCell(omlCellCompassIndicator);
    omlRowBearingIndicators.addCell(omlCellCamPanIndicator);
    omlRowBearingIndicators.addCell(omlCellWaypointIndicator);    
    omlPaneBearingIndicators1.addRow(omlRowBearingIndicators);
    
    
    omlCellCompassIndicator 	= new sap.ui.commons.layout.MatrixLayoutCell({textAlign: 	"Center"});
	omlCellCamPanIndicator 		= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCellWaypointIndicator 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlRowBearingIndicators 	= new sap.ui.commons.layout.MatrixLayoutRow();
	omlCellCompassIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);
	omlCellCamPanIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);
	omlCellWaypointIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);
	omlCellCompassIndicator.addContent(olblCompass);
    omlCellCamPanIndicator.addContent(olblCamPan);
    omlCellWaypointIndicator.addContent(olblWaypoint);    
    omlRowBearingIndicators.addCell(omlCellCompassIndicator);
    omlRowBearingIndicators.addCell(omlCellCamPanIndicator);
    omlRowBearingIndicators.addCell(omlCellWaypointIndicator);    
    omlPaneBearingIndicators1.addRow(omlRowBearingIndicators);
    
    omlCellCompassIndicator 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCellCamPanIndicator 		= new sap.ui.commons.layout.MatrixLayoutCell();
	omlCellWaypointIndicator 	= new sap.ui.commons.layout.MatrixLayoutCell();
	omlRowBearingIndicators 	= new sap.ui.commons.layout.MatrixLayoutRow();
	omlCellCompassIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);
	omlCellCamPanIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);
	omlCellWaypointIndicator.setHAlign(sap.ui.commons.layout.HAlign.Center);	
	omlCellCompassIndicator.addContent(olblCompassVal);
    omlCellCamPanIndicator.addContent(olblCamPanVal);
    omlCellWaypointIndicator.addContent(olblWaypointVal);    
    omlRowBearingIndicators.addCell(omlCellCompassIndicator);
    omlRowBearingIndicators.addCell(omlCellCamPanIndicator);
    omlRowBearingIndicators.addCell(omlCellWaypointIndicator);    
    omlPaneBearingIndicators1.addRow(omlRowBearingIndicators);
	
    omlPaneBearingIndicators.createRow(omlPaneBearingIndicators1); 
    
	oLayout.createRow(omlPaneBearingIndicators);   

}

function buildPaneWaypoint(oController,oLayout){
	var omlPaneWaypoint = new sap.ui.commons.layout.MatrixLayout({
			id:			"mlPaneWaypoint",
			width:		"120px",
	        columns: 	2,
	        widths: 	["90px", "30px"]  
	});	
	

	var olblWaypointId = new sap.ui.commons.Label({
    	id: 		"lblWaypointId",
    	text: 		myHplApp.controller.getTextFromBundle("waypoint")
    });


	 var olblValWaypointId = new sap.ui.commons.Label({
	    	id: 	"lblValWaypointId",
	    	text: 	"",
	    	textAlign: 	"Right"	    		    	
	 });


	
	 var olblDistanceToWaypoint = new sap.ui.commons.Label({
	    	id: 		"lblDistanceToWaypoint",
	    	text: 		myHplApp.controller.getTextFromBundle("distancewp")
	});


	var olblValDistanceToWaypoint = new sap.ui.commons.Label({
	    	id: 	"lblValDistanceToWaypoint",
	    	text: 	"",
	    	textAlign: 	"Right"	    		    	
	});

    
	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	 omlCell1.addContent(olblWaypointId);
	 omlCell2.addContent(olblValWaypointId);
	 omlRow1.addCell(omlCell1);
	 omlRow1.addCell(omlCell2);
	 omlPaneWaypoint.addRow(omlRow1);

	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	 omlCell1.addContent(olblDistanceToWaypoint);
	 omlCell2.addContent(olblValDistanceToWaypoint);
	 omlRow1.addCell(omlCell1);
	 omlRow1.addCell(omlCell2);
	 omlPaneWaypoint.addRow(omlRow1);
  
    
	oLayout.createRow(omlPaneWaypoint);   
}


function buildPaneGyro(oController,oLayout){
	
	var omlPaneGyro = new sap.ui.commons.layout.MatrixLayout({
			id: 			"mlPaneGyro",
			layoutFixed: 	true,
			width:			"74px"
		});
	 

	var ohtmlIframeGyro = new sap.ui.core.HTML({  
	    	content: '<div id="gyroContainer"><div id="gyroBox"><P class="front"></P><P class="back"></P><P class="right"></P><P class="left"></P><P class="top"></P><P class="bottom"></P></div></div>',
	    	preferDOM : false
	});
	
	omlPaneGyro.createRow(ohtmlIframeGyro);
	oLayout.createRow(omlPaneGyro);    
	
}

