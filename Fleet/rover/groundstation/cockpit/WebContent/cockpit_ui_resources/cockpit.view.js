

sap.ui.jsview("cockpit_ui_resources.cockpit", {

	
      getControllerName : function() {
         return "cockpit_ui_resources.cockpit";
      },

      createContent : function(oController) {
    	  
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
    	 
    	 buildPanePilotCam(oController,oLayout);
    	 
    	 buildPaneBearingIndicators(oController,oLayout);
    	 buildPaneWaypoint(oController,oLayout);
    	 
    	 
    	 buildPaneCrosshair(oController,oLayout);
    	 buildPaneLowBattery(oController,oLayout);
    	 buildPaneLaserIndicator(oController,oLayout);
    	 buildPaneProximitySensorFront(oController,oLayout);
      	 buildPaneProximitySensorRear(oController,oLayout);
      	 buildPaneProximitySensorCam(oController,oLayout);
      	 buildPaneWeapon1(oController,oLayout);
    	 buildPaneWeapon1State(oController,oLayout);
      	 buildPaneWeapon2(oController,oLayout);
    	 buildPaneWeapon2State(oController,oLayout);
      	 buildPaneThrust(oController,oLayout);
      	 buildPaneSpeed(oController,oLayout);      	 
    	 buildPaneShield(oController,oLayout);      	 
    	 buildPaneThreatOrientation(oController,oLayout);
    	 
    	 
    	 buildPaneDrive(oController,oLayout);
    	 buildPaneGyro(oController,oLayout);
    	 buildPaneEarthTime(oController,oLayout);    
    	 buildPanePilotScore(oController,oLayout);
    	 buildPanePower(oController,oLayout);
    	 buildPanePrimarySystems(oController,oLayout);    	 
    	 buildPaneNavigation(oController,oLayout);
    	 buildPaneMissionControl(oController,oLayout);
    	 

    	 buildPaneFooter(oController,oLayout);
    	 buildPaneChartNetworkTrafficOut(oController,oLayout);
    	 buildPaneTotalNetworkTrafficOut(oController,oLayout);
    	 buildPaneChartNetworkTrafficIn(oController,oLayout);
    	 buildPaneTotalNetworkTrafficIn(oController,oLayout);
    	 
    	 buildPaneDividers(oController,oLayout);
    	 
    	 buildPaneMessage(oController,oLayout);
    	 
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
	    	id: 		"lblStatusLeftEngineThrust",
	    	text: 		myHplApp.controller.getTextFromBundle("leftenginethrust"),
	    	width: 		"90px"
	});
	
	 
	var olblValLeftEngineThrust = new sap.ui.commons.Label({
	    	id: 		"lblValLeftEngineThrust",
	    	text: 		"",
	    	textAlign: 	"Right",
	    	width: 		"25px"	    	
	});
	 
	 
	var olblStatusRightEngineThrust = new sap.ui.commons.Label({
	    	id: 		"lblStatusRightEngineThrust",
	    	text: 		myHplApp.controller.getTextFromBundle("rightenginethrust"),
	    	width: 		"90px"	    	
	});
	 
	 
	var olblValRightEngineThrust = new sap.ui.commons.Label({
	    	id: 		"lblValRightEngineThrust",
	    	text: 		"",
	    	textAlign: 	"Right",
	    	width: 		"25px"	    		    	
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
	 
	  
	omlPaneDrive.createRow(omlPaneDrive1);
	oLayout.createRow(omlPaneDrive);   

}


function buildPanePrimarySystems(oController,oLayout){

	var omlPanePrimarySystems = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPanePrimarySystems",
			width:			"125px",
		    layoutFixed: 	true
	});	
	
		
	
	var omlCell1 					= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellPanePrimaryTitle 	= new sap.ui.commons.layout.MatrixLayoutCell();
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
	    	width: 		"100px"
	});
	
	 
	var olblIndThrustFailsafe = new sap.ui.commons.Label({
	    	id: 		"lblIndThrustFailsafe",
	    	text: 		myHplApp.controller.getTextFromBundle("thrustfailsafe"),
	    	textAlign: 	"Center",
	    	width: 		"100px"
	});
	 
	 	
	var ohtmlGaugeCoreTemp = new sap.ui.core.HTML({  
	    	content: 	"<div id='gaugeCoreTemp'></div>"
	});

	
	var oimgSignalStrength = new sap.ui.commons.Image({
	    	id: 	'imgSignalStrength',
	    	src: 	'assets/images/hud/signalStrength0.png',
	        width: 	"40px",
	        height: "39px"
	    });


	omlCellPanePrimaryTitle.addContent(olblPanePrimarySystems);
	omlRowPanePrimarySystems.addCell(omlCellPanePrimaryTitle);
	omlPanePrimarySystems.addRow(omlRowPanePrimarySystems);
	 
	 
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlRowPrimary1	= new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});
	omlCell1.addContent(olblIndPowerFailsafe);
	omlRowPrimary1.addCell(omlCell1);
	omlPanePrimarySystems.addRow(omlRowPrimary1);

	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlRowPrimary1	= new sap.ui.commons.layout.MatrixLayoutRow({height: "32px"});
	omlCell1.addContent(olblIndThrustFailsafe);
	omlRowPrimary1.addCell(omlCell1);
	omlPanePrimarySystems.addRow(omlRowPrimary1);

	omlPanePrimarySystems.createRow(ohtmlGaugeCoreTemp);
	
	omlCell1 		= new sap.ui.commons.layout.MatrixLayoutCell();
	omlRowPrimary1	= new sap.ui.commons.layout.MatrixLayoutRow();
	omlCell1.addContent(oimgSignalStrength);
	omlCell1.setHAlign(sap.ui.commons.layout.HAlign.Center);
	omlRowPrimary1.addCell(omlCell1);
	omlPanePrimarySystems.addRow(omlRowPrimary1);	
	
	oLayout.createRow(omlPanePrimarySystems);   	 
}


function buildPaneEarthTime(oController,oLayout){
	
	var omlPaneEarthTime = new sap.ui.commons.layout.MatrixLayout({
			id: 	"mlPaneEarthTime",
			width: 	"1206px"
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
	    	content: '<iframe id="iframeEarthTime" width="1206px" height="84px" frameBorder="0">Earth Time Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'earthtime.html';
	    		$("#iframeEarthTime").load(function() {  
	    			$("#iframeEarthTime").attr("width","1206px").attr("height","84px");  
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

function buildPanePilotScore(oController,oLayout){
	 
	var omlPanePilotScore = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPanePilotScore",			
			columns:		2,
			width:			"84px",
		    layoutFixed: 	true
	});	
	
	var oimgPilotPortrait = new sap.ui.commons.Image({
	    	id: 			'imgPilotPortrait',
	    	src: 			'assets/images/trans.jpg',
	        width: 			"84px",
	        height: 		"84px"
	});
	
	var olblStatPilotScore = new sap.ui.commons.Label({
			id:				"lblStatPilotScore", 
			text: 			"Score",
			width:			"100%",
			textAlign: 		"Center",
	});

	var olblValPilotScore = new sap.ui.commons.Label({
			id: 			"lblValPilotScore",	
			text: 			"0",
			width:			"100%",
			textAlign: 		"Center",
	});

	
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});
	omlRow1	 = new sap.ui.commons.layout.MatrixLayoutRow();
	omlCell1.addContent(oimgPilotPortrait);	
	omlRow1.addCell(omlCell1);

	omlPanePilotScore.addRow(omlRow1);	
	omlPanePilotScore.createRow(olblStatPilotScore, olblValPilotScore);
	oLayout.createRow(omlPanePilotScore);   	 
}


function buildPaneTotalNetworkTrafficIn(oController,oLayout){
	var omlPaneTotalNetworkTrafficIn = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneTotalNetworkTrafficIn",
			layoutFixed: 	true,
			width:			"155px",
			columns: 		2,
    		widths: 		["100px", "55px"]  
	});	
	
	
	var olblTotalTrafficIn = new sap.ui.commons.Label({
			id: 			"lblTotalTrafficIn",
			text: 			myHplApp.controller.getTextFromBundle("totaltrafficin"),	
			textAlign: 		"Left",
			width: 			"100%"
	});

	var olblValTotalTrafficIn = new sap.ui.commons.Label({
			id: 			"lblValTotalTrafficIn",
			text: 			"",	
			textAlign: 		"Right",
			width: 			"100%"
	});
	
	
	var omlCell1 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell2 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRow1 	= new sap.ui.commons.layout.MatrixLayoutRow();
			
	omlCell1.addContent(olblTotalTrafficIn);
	omlCell2.addContent(olblValTotalTrafficIn);
	
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlPaneTotalNetworkTrafficIn.addRow(omlRow1);
		
	oLayout.createRow(omlPaneTotalNetworkTrafficIn);   
}


function buildPaneChartNetworkTrafficIn(oController,oLayout){
	var omlPaneChartNetworkTrafficIn = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneChartNetworkTrafficIn",
			layoutFixed: 	true,
			width:			"400px"			
	});	

 
	var ohtmlChartNetworkTrafficIn = new sap.ui.core.HTML({  
			content: 		"<div id='chartNetworkTrafficIn' width='400px' height='103px'></div>"
	});


	omlPaneChartNetworkTrafficIn.createRow(ohtmlChartNetworkTrafficIn);
	oLayout.createRow(omlPaneChartNetworkTrafficIn);   	 
}


function buildPaneTotalNetworkTrafficOut(oController,oLayout){
	var omlPaneTotalNetworkTrafficOut = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneTotalNetworkTrafficOut",
			layoutFixed: 	true,
			width:			"155px",
			columns: 		2,
    		widths: 		["100px", "55px"]  
	});	
	
	
	var olblTotalTrafficOut = new sap.ui.commons.Label({
			id: 			"lblTotalTrafficOut",
			text: 			myHplApp.controller.getTextFromBundle("totaltrafficout"),	
			textAlign: 		"Left",
			width: 			"100%"
	});

	var olblValTotalTrafficOut = new sap.ui.commons.Label({
			id: 			"lblValTotalTrafficOut",
			text: 			"",	
			textAlign: 		"Right",
			width: 			"100%"
	});
	
	
	var omlCell1 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell2 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRow1 	= new sap.ui.commons.layout.MatrixLayoutRow();
			
	omlCell1.addContent(olblTotalTrafficOut);
	omlCell2.addContent(olblValTotalTrafficOut);
	
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlPaneTotalNetworkTrafficOut.addRow(omlRow1);
		
	oLayout.createRow(omlPaneTotalNetworkTrafficOut);   
}


function buildPaneChartNetworkTrafficOut(oController,oLayout){
	var omlPaneChartNetworkTrafficOut = new sap.ui.commons.layout.MatrixLayout({
		id:				"mlPaneChartNetworkTrafficOut",
	    layoutFixed: 	true,
		width:			"400px"			
	});	

 
	var ohtmlChartNetworkTrafficOut = new sap.ui.core.HTML({  
			content: "<div id='chartNetworkTrafficOut' width='400px' height='103px'></div>"
	});


	omlPaneChartNetworkTrafficOut.createRow(ohtmlChartNetworkTrafficOut);
	oLayout.createRow(omlPaneChartNetworkTrafficOut);   	 
}


function buildPanePower(oController,oLayout){

	var omlPanePower = new sap.ui.commons.layout.MatrixLayout({
	        id: 			"mlPanePower",
	        layoutFixed: 	true,
	        width: 			"125px"
	});
		

	var omlCellPanePowerTitle 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPanePowerTitle 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	
	var olblPanePower = new sap.ui.commons.Label({
			id: 		"lblPanePower",
		    text: 		myHplApp.controller.getTextFromBundle("power"),	
		    textAlign: 	"Center",
		    width: 		"100%"
	});
	
	
	var ohtmlGaugeVoltage = new sap.ui.core.HTML({  
			content: "<div id='gaugeVoltage'></div>"
	});

	var ohtmlGaugeBattRemaining = new sap.ui.core.HTML({  
    		content: "<div id='gaugeBattRemaining'></div>"
	});

	var ohtmlGaugeConsumedMah = new sap.ui.core.HTML({  
		content: "<div id='gaugeConsumedMah'></div>"
	});

	var ohtmlGaugeAmps = new sap.ui.core.HTML({  
    		content: "<div id='gaugeAmps'></div>"
	});
	
	var ohtmlGaugeCurrent = new sap.ui.core.HTML({  
    		content: "<div id='gaugeCurrent'></div>"
	});
	
	 
	omlCellPanePowerTitle.addContent(olblPanePower);
	omlRowPanePowerTitle.addCell(omlCellPanePowerTitle);
	omlPanePower.addRow(omlRowPanePowerTitle);
	 

	omlPanePower.createRow(ohtmlGaugeVoltage);
	omlPanePower.createRow(ohtmlGaugeBattRemaining);
	omlPanePower.createRow(ohtmlGaugeConsumedMah);
	omlPanePower.createRow(ohtmlGaugeAmps);
	omlPanePower.createRow(ohtmlGaugeCurrent);
	
	oLayout.createRow(omlPanePower);   

}




function buildPaneNavigation(oController,oLayout){
	var omlPaneNavigation = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneNavigation",
			layoutFixed: 	true,
			width:			"582px"
	});	

	var omlPaneNavigation1 = new sap.ui.commons.layout.MatrixLayout({
    		id: 			"mlPaneNavigation1",
    		layoutFixed: 	true,
    		width: 			"540px",
    		columns : 		8,
    		widths: 		["70px", "70px", "70px", "70px", "70px", "70px", "70px", "70px"]  
	});
	
	
	var olblPaneNavigation = new sap.ui.commons.Label({
			id: 			"lblPaneNavigation",
			text: 			myHplApp.controller.getTextFromBundle("navigation"),
			textAlign: 		"Center",
			width: 			"100%"
	});

	
		
	var olblStatusSatellites = new sap.ui.commons.Label({
    		id: 		"lblStatusSatellites",
    		text: 		myHplApp.controller.getTextFromBundle("satellites"),
    		width: 		"75px"
	});

 
	var olblValSatellites = new sap.ui.commons.Label({
    		id: 		"lblValSatellites",
    		text: 		"",
    		textAlign: 	"Right",
    		width: 		"70px"	    	
	});


	var olblStatusLatitude = new sap.ui.commons.Label({
	    	id: 		"lblStatusLatitude",
	    	text: 		myHplApp.controller.getTextFromBundle("latitude"),
	    	width: 		"75px"
	});
	
	 
	var olblValLatitude = new sap.ui.commons.Label({
	    	id: 		"lblValLatitude",
	    	text: 		"",
	    	textAlign: 	"Right",
	    	width: 		"70px"	    	
	});
	

	var olblStatusLongitude = new sap.ui.commons.Label({
		    id: 		"lblStatusLongitude",
		    text: 		myHplApp.controller.getTextFromBundle("longitude"),
		    width: 		"75px"
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
		    width: 		"75px"
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
			width: 		"75px"
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
			width: 		"75px"
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
			width: 		"75px"
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
			width: 		"75px"
	});
	
	 
	var olblValBearingWp = new sap.ui.commons.Label({
			id: 		"lblValBearingWp",
			text: 		"",
			textAlign: 	"Right",
			width: 		"70px"	    	
	});		 

	var ohtmlMap = new sap.ui.core.HTML({  
    		content: 	"<div id='cockpitMap' style='width: 564px; height: 432px;'></div>"  
	});
				 
	
	var omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell3 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell4 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell5 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell6 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell7 = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell8 = new sap.ui.commons.layout.MatrixLayoutCell();
	

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
	omlCell7 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell8 = new sap.ui.commons.layout.MatrixLayoutCell();	

	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	
	omlCell1.addContent(olblStatusLatitude);
	omlCell2.addContent(olblValLatitude);	
	omlCell3.addContent(olblStatusAltitude);
	omlCell4.addContent(olblValAltitude);
	omlCell5.addContent(olblStatusHeading);
	omlCell6.addContent(olblValHeading);
	omlCell7.addContent(olblStatusSatellites);
	omlCell8.addContent(olblValSatellites);
	
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlRow1.addCell(omlCell5);
	omlRow1.addCell(omlCell6);	
	omlRow1.addCell(omlCell7);
	omlRow1.addCell(omlCell8);	
	omlPaneNavigation1.addRow(omlRow1);	 

				 
	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell3 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell4 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell5 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell6 = new sap.ui.commons.layout.MatrixLayoutCell();	
	omlCell7 = new sap.ui.commons.layout.MatrixLayoutCell();
	omlCell8 = new sap.ui.commons.layout.MatrixLayoutCell();	

	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	
	omlCell1.addContent(olblStatusLongitude);
	omlCell2.addContent(olblValLongitude);	 
	omlCell3.addContent(olblStatusSpeedCms);
	omlCell4.addContent(olblValSpeedCms);
	omlCell5.addContent(olblStatusBearingWp);
	omlCell6.addContent(olblValBearingWp);
	omlCell7.addContent(olblStatusDistanceWp);
	omlCell8.addContent(olblValDistanceWp);	 

	
	omlRow1.addCell(omlCell1);
	omlRow1.addCell(omlCell2);
	omlRow1.addCell(omlCell3);
	omlRow1.addCell(omlCell4);
	omlRow1.addCell(omlCell5);
	omlRow1.addCell(omlCell6);	
	omlRow1.addCell(omlCell7);
	omlRow1.addCell(omlCell8);	
	omlPaneNavigation1.addRow(omlRow1);	 

	omlPaneNavigation.createRow(omlPaneNavigation1);
	
	omlPaneNavigation.createRow(ohtmlMap);
	oLayout.createRow(omlPaneNavigation);   
 
}


function buildPaneMissionControl(oController,oLayout){
	var omlPaneMissionControl = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneMissionControl",
			layoutFixed: 	true,
			width:			"582px"
	});	
	
	var omlPaneMissionControl1 = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneMissionControl1",
			layoutFixed: 	true,
			width:			"582px"
	});	
	 
	var olblPaneMissionControl = new sap.ui.commons.Label({
    		id: 		"lblPaneMissionControl",
    		text: 		myHplApp.controller.getTextFromBundle("missioncontrol"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });

	var oControl; 
	var omlCellPaneMissionControlTitle 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPaneMissionControlTitle 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});

	omlCellPaneMissionControlTitle.addContent(olblPaneMissionControl);
	omlRowPaneMissionControlTitle.addCell(omlCellPaneMissionControlTitle);
	omlPaneMissionControl.addRow(omlRowPaneMissionControlTitle);
	
	
	// Create a TabStrip instance
    var otstrMissionControl = new sap.ui.commons.TabStrip({
    		id: 	"tstrMissionControl",
    		width: 	"582px",
    		height: "530px"
    });
	

    //Tab 1 - Mission
	var omlMission = new sap.ui.commons.layout.MatrixLayout({
		   id : "mlMission",
		   width:"100%"
	});

	////
	var missionPilotScoreBreakdownUri = myHplApp.missioncontrol.model.getConfigServicePilotScoreBreakdownUri();
	var odataModelPilotScoreBreakdown = new sap.ui.model.odata.ODataModel(missionPilotScoreBreakdownUri, false);	
	var otblPilotScoreBreakdown 	  = new sap.ui.table.Table({tableId: "tblPilotScoreBreakdown", 
															    visibleRowCount: 		5, 
															    columnHeaderVisible: 	false,
															    showNoData:				false,
															    selectionMode: 			"None", 
															    editable: 				false, 
															    enableColumnReordering: false
	}); 

	odataModelPilotScoreBreakdown.setCountSupported(false); 
	
	
	  

	oControl = new sap.ui.commons.TextField({value: "{CA_ACHIEVEMENT_KEYFRAME_GROUP}"}); 
	otblPilotScoreBreakdown.addColumn(new sap.ui.table.Column({label: 			new sap.ui.commons.Label({text:"Keyframe Group"}), 
													           visible: 		false, 
													           template: 		oControl, 
													           sortProperty: 	"CA_ACHIEVEMENT_KEYFRAME_GROUP", 
													           filterProperty: 	"CA_ACHIEVEMENT_KEYFRAME_GROUP" 
	})); 

	
	oControl = new sap.ui.commons.TextField({value: "{CONDITIONID}"}); 
	otblPilotScoreBreakdown.addColumn(new sap.ui.table.Column({label:			new sap.ui.commons.Label({text:"Condition ID"}), 
															   visible: 		false, 
															   template: 		oControl, 
															   sortProperty: 	"CONDITIONID", 
															   filterProperty: 	"CONDITIONID" 
	}));  

	
	oControl = new sap.ui.commons.Image({src: 		"{VISUALURI}", 
										 width: 	"30px", 
										 height: 	"30px" }); 
	
	otblPilotScoreBreakdown.addColumn(new sap.ui.table.Column({label:			new sap.ui.commons.Label({text:"URI"}), 
		                                                       template: 		oControl, 
		                                                       width: 			"30px" 
	})); 

	
	oControl = new sap.ui.commons.TextField({value: "{NAME}"}); 
	oControl.addStyleClass("lblPilotAchivementName");
	otblPilotScoreBreakdown.addColumn(new sap.ui.table.Column({label:			new sap.ui.commons.Label({text:"Name"}), 
															   template: 		oControl, 
															   width: 			"50px" 
	})); 

	
	oControl = new sap.ui.commons.TextField({value: "{SCORE}"}); 
	oControl.addStyleClass("lblPilotAchivementScore");
	otblPilotScoreBreakdown.addColumn(new sap.ui.table.Column({label:			new sap.ui.commons.Label({text:"Score"}), 
															   template: 		oControl, 
															   sortProperty: 	"SCORE", 
															   filterProperty: 	"SCORE", 
															   width: 			"50px" 
	}));  

	otblPilotScoreBreakdown.setModel(odataModelPilotScoreBreakdown); 
	
	var sortDescending = true;  
	var mdlSort = new sap.ui.model.Sorter("CA_ACHIEVEMENT_KEYFRAME_GROUP", sortDescending);
	var pilotScoreBreakdownParams = '/InputParams(IP_MISSIONID=\'' +
			myHplApp.missioncontrol.model.getActiveMissionId() +
			'\',IP_VEHICLEID=\'' +
			myHplApp.missioncontrol.model.getActiveVehicleId() +
			'\',IP_PILOTID=\'' +
			myHplApp.missioncontrol.model.getActivePilotId() + 
			'\')/Results';
	
	otblPilotScoreBreakdown.bindRows(pilotScoreBreakdownParams,mdlSort);
    omlMission.createRow(otblPilotScoreBreakdown);
    
    otstrMissionControl.createTab("Mission",omlMission);
    myHplApp.cockpit.model.setModelPilotScoreBreakdown(odataModelPilotScoreBreakdown);
    
	
    //Tab 2 - Commlink Status
	var omlCommlink = new sap.ui.commons.layout.MatrixLayout({
		   id : "mlCommlink",
		   columns: 2,
		   width:"100%"
	});
	
	
	//Message Category ID counts
	var olblStatCountNavigation = new sap.ui.commons.Label({
			id:			"lblStatCountNavigation", 
			text: 		'Navigation Count'
	});

	var olblValStatCountNavigation = new sap.ui.commons.Label({
			id: 		"lblValStatCountNavigation",	
			text: 		""
	});
	
	omlCommlink.createRow(olblStatCountNavigation, olblValStatCountNavigation);
 

	var olblStatCountCockpit = new sap.ui.commons.Label({
			id:			"lblStatCountCockpit", 
			text: 		'Cockpit Count'
	});
	
	var olblValStatCountCockpit = new sap.ui.commons.Label({
			id:			"lblValStatCountCockpit",
			text: 		""
	});

	omlCommlink.createRow(olblStatCountCockpit, olblValStatCountCockpit);
 
 
	var olblStatCountNotification = new sap.ui.commons.Label({
			id:			"lblStatCountNotification", 
			text: 		'Notification Count'
	});
	
	var olblValStatCountNotification = new sap.ui.commons.Label({
			id: 		"lblValStatCountNotification",
			text: 		""
	});
	
	
	omlCommlink.createRow(olblStatCountNotification, olblValStatCountNotification);
 

	var olblStatCountSensor = new sap.ui.commons.Label({
			id:			"lblStatCountSensor",
			text: 		'Sensor Count'
	});
	
	var olblValStatCountSensor = new sap.ui.commons.Label({
			id:			"lblValStatCountSensor",
			text: 		""
	});

	omlCommlink.createRow(olblStatCountSensor, olblValStatCountSensor);
 

	var olblStatCountPower = new sap.ui.commons.Label({
			id:			"lblStatCountPower",
			text: 		'Power Count'
	});
	
	var olblValStatCountPower = new sap.ui.commons.Label({
			id:			"lblValStatCountPower",
			text : ""
	});
	
	omlCommlink.createRow(olblStatCountPower, olblValStatCountPower);

 
	var olblStatCountDrive = new sap.ui.commons.Label({
			id:			"lblStatCountDrive", 
			text: 		'Drive Count'
	});
	
	var olblValStatCountDrive = new sap.ui.commons.Label({
			id:			"lblValStatCountDrive",
			text: 		""
	});
	
	omlCommlink.createRow(olblStatCountDrive, olblValStatCountDrive);

     
    otstrMissionControl.createTab("COMMLINK STATUS",omlCommlink);
    
    
    
   
    //Tab 2 - Orbital Status
	var omlOrbital = new sap.ui.commons.layout.MatrixLayout({
		   id : "mlOrbital",
		   columns: 2,
		   width:"100%"
	});
	
	
	//Average Speed
	var olblStatSpeedAvgCms = new sap.ui.commons.Label({
			id:			"lblStatSpeedAvgCms", 
			text: 		'Avg Speed CMS'
	});
	
	var olblValStatSpeedAvgCms = new sap.ui.commons.Label({
			id:			"lblValStatSpeedAvgCms",
			text: 		""
	});

	omlOrbital.createRow(olblStatSpeedAvgCms, olblValStatSpeedAvgCms);


	var olblStatSpeedAvgKph = new sap.ui.commons.Label({
			id:			"lblStatSpeedAvgKph", 
			text: 		'Avg Speed Kph'
	});
	
	var olblValStatSpeedAvgKph = new sap.ui.commons.Label({
			id:			"lblValStatSpeedAvgKph",
			text: 		""
	});

	omlOrbital.createRow(olblStatSpeedAvgKph, olblValStatSpeedAvgKph);

 
	var olblStatSpeedAvgMph = new sap.ui.commons.Label({
			id:			"lblStatSpeedAvgMph", 
			text: 		'Avg Speed MPH'
	});
	
	var olblValStatSpeedAvgMph = new sap.ui.commons.Label({
			id:			"lblValStatSpeedAvgMph",
			text: 		""
	});
	
	omlOrbital.createRow(olblStatSpeedAvgMph, olblValStatSpeedAvgMph);

 
	//Max Speed
	var olblStatSpeedMaxCms = new sap.ui.commons.Label({
			id:			"lblStatSpeedMaxCms", 
			text: 		'Max Speed CMS'
	});
	
	var olblValStatSpeedMaxCms = new sap.ui.commons.Label({
			id:			"lblValStatSpeedMaxCms",
			text: 		""
	});

	omlOrbital.createRow(olblStatSpeedMaxCms, olblValStatSpeedMaxCms);


	var olblStatSpeedMaxKph = new sap.ui.commons.Label({
			id:			"lblStatSpeedMaxKph", 
			text: 		'Max Speed KPH'
	});
	
	var olblValStatSpeedMaxKph = new sap.ui.commons.Label({
			id:			"lblValStatSpeedMaxKph",
			text: 		""
	});

	omlOrbital.createRow(olblStatSpeedMaxKph, olblValStatSpeedMaxKph);

	var olblStatSpeedMaxMph = new sap.ui.commons.Label({
			id:			"lblStatSpeedMaxMph", 
			text: 		'Max Speed MPH'
	});
	
	
	var olblValStatSpeedMaxMph = new sap.ui.commons.Label({
			id:			"lblValStatSpeedMaxMph",
			text : ""
	});
		
	omlOrbital.createRow(olblStatSpeedMaxMph, olblValStatSpeedMaxMph);

 
	//Minimum Altitude
	var olblStatAltMinM = new sap.ui.commons.Label({
			id:			"lblStatAltMinM", 
			text: 		'Min Alt M'
	});
	
	var olblValStatAltMinM = new sap.ui.commons.Label({
			id:			"lblValStatAltMinM",
			text: 		""
	});
	
	omlOrbital.createRow(olblStatAltMinM, olblValStatAltMinM);

	
	var olblStatAltMinFt = new sap.ui.commons.Label({
			id:			"lblStatAltMinFt", 
			text: 		'Min Alt Ft'
	});
	
	var olblValStatAltMinFt = new sap.ui.commons.Label({
			id:			"lblValStatAltMinFt",
			text: 		""
	});
			
	omlOrbital.createRow(olblStatAltMinFt, olblValStatAltMinFt);

 
	//Maximum Altitude
	var olblStatAltMaxM = new sap.ui.commons.Label({
			id:			"lblStatAltMaxM", 
			text: 		'Max AltM'
	});
	
	var olblValStatAltMaxM = new sap.ui.commons.Label({
			id:			"lblValStatAltMaxM",
			text: 		""
	});
		
	omlOrbital.createRow(olblStatAltMaxM, olblValStatAltMaxM);

	
	var olblStatAltMaxFt = new sap.ui.commons.Label({
			id:			"lblStatAltMaxFt", 
			text: 		'Max Alt Ft'
	});
	
	var olblValStatAltMaxFt = new sap.ui.commons.Label({
			id:			"lblValStatAltMaxFt",
			text: 		""
	});
	
	omlOrbital.createRow(olblStatAltMaxFt, olblValStatAltMaxFt);

 
	//Average Altitude
	var olblStatAltAvgM = new sap.ui.commons.Label({
			id:			"lblStatAltAvgM", 
			text: 		'Avg Alt M'
	});
	
	var olblValStatAltAvgM = new sap.ui.commons.Label({
			id:			"lblValStatAltAvgM",
			text: 		""
	});
	
	omlOrbital.createRow(olblStatAltAvgM, olblValStatAltAvgM);

	var olblStatAltAvgFt = new sap.ui.commons.Label({
			id:			"lblStatAltAvgFt", 
			text: 		'Avg Alt Ft'
	});
	
	var olblValStatAltAvgFt = new sap.ui.commons.Label({
			id:			"lblValStatAltAvgFt",
			text: 		""
	});
	
	
	omlOrbital.createRow(olblStatAltAvgFt, olblValStatAltAvgFt);

     
	//Distance Travelled
	var olblStatTravelledM = new sap.ui.commons.Label({
			id:			"lblStatTravelledM", 
			text: 		'Travelled M'
	});
	
	var olblValStatTravelledM = new sap.ui.commons.Label({
			id:			"lblValStatTravelledM",
			text: 		""
	});
	
	omlOrbital.createRow(olblStatTravelledM, olblValStatTravelledM);
	
	
	var olblStatTravelledKm = new sap.ui.commons.Label({
		id:			"lblStatTravelledKm", 
		text: 		'Travelled KM'
	});

	var olblValStatTravelledKm = new sap.ui.commons.Label({
		id:			"lblValStatTravelledKm",
		text: 		""
	});

	omlOrbital.createRow(olblStatTravelledKm, olblValStatTravelledKm);


	var olblStatTravelledMiles = new sap.ui.commons.Label({
		id:			"lblStatTravelledMiles", 
		text: 		'Travelled Miles'
	});

	var olblValStatTravelledMiles = new sap.ui.commons.Label({
		id:			"lblValStatTravelledMiles",
		text: 		""
	});

	omlOrbital.createRow(olblStatTravelledMiles, olblValStatTravelledMiles);

	
	otstrMissionControl.createTab("ORBITAL STATUS",omlOrbital);
    
    
	
	//Add tabstrip to mission control
	omlPaneMissionControl1.createRow(otstrMissionControl);
    omlPaneMissionControl.createRow(omlPaneMissionControl1);   
    oLayout.createRow(omlPaneMissionControl);   

}


function buildPaneWeapon1(oController,oLayout){
	var omlPaneWeapon1 = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneWeapon1",
			layoutFixed: 	true,
			width: 			"65px",		
		
	});	

	var ohtmlGaugeAmmo1 = new sap.ui.core.HTML({  
     		content: "<div id='gaugeAmmo1'></div>"
	});

	omlPaneWeapon1.createRow(ohtmlGaugeAmmo1);
 	oLayout.createRow(omlPaneWeapon1);
 	
}


function buildPaneWeapon2(oController,oLayout){
	var omlPaneWeapon2 = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneWeapon2",
			layoutFixed: 	true,
			width: 			"65px",		
		
	});	

	var ohtmlGaugeAmmo2 = new sap.ui.core.HTML({  
     		content: "<div id='gaugeAmmo2'></div>"
	});

	omlPaneWeapon2.createRow(ohtmlGaugeAmmo2);
 	oLayout.createRow(omlPaneWeapon2);   

}

function buildPaneSpeed(oController,oLayout){
	var omlPaneSpeed = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneSpeed",
			layoutFixed: 	true,
			width: 			"65px",		
		
	});	


	var ohtmlGaugeSpeed = new sap.ui.core.HTML({  
     		content: "<div id='gaugeSpeed'></div>"
	});


	omlPaneSpeed.createRow(ohtmlGaugeSpeed);
 	oLayout.createRow(omlPaneSpeed);   

}


function buildPaneThrust(oController,oLayout){
	
	var omlPaneThrust = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneThrust",
			layoutFixed: 	true,
			width: 			"65px",		
			
	});	
	
	
	var ohtmlGaugeThrust = new sap.ui.core.HTML({  
         	content: "<div id='gaugeThrust'></div>"
    });
	
	 
	omlPaneThrust.createRow(ohtmlGaugeThrust);
	oLayout.createRow(omlPaneThrust);   
	
}


function buildPaneShield(oController,oLayout){

	var omlPaneShield = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneShield",
		    layoutFixed: 	true,
			width:			"65px"
	});	
	
	 
	var ohtmlGaugeShield = new sap.ui.core.HTML({  
	    	content: "<div id='gaugeShield'></div>"
	});

	
	omlPaneShield.createRow(ohtmlGaugeShield);
	oLayout.createRow(omlPaneShield);   	 
}



function buildPaneProximitySensorFront(oController,oLayout){
	var omlPaneProximitySensorFront = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneProximitySensorFront",
			layoutFixed: 	true,
			width:			"65px",
	});	
		

	var ohtmlGaugeFrontProximitySensor = new sap.ui.core.HTML({  
      	content: "<div id='gaugeFrontProximitySensor'></div>"
	});
	
		
	omlPaneProximitySensorFront.createRow(ohtmlGaugeFrontProximitySensor);
	oLayout.createRow(omlPaneProximitySensorFront);   
}


function buildPaneProximitySensorRear(oController,oLayout){
	var omlPaneProximitySensorRear = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneProximitySensorRear",
			layoutFixed: 	true,
			width:			"65px",
	});	
		

	var ohtmlGaugeRearProximitySensor = new sap.ui.core.HTML({  
      	content: "<div id='gaugeRearProximitySensor'></div>"
	});
	
		
	
	omlPaneProximitySensorRear.createRow(ohtmlGaugeRearProximitySensor);
	oLayout.createRow(omlPaneProximitySensorRear);   
}


function buildPaneProximitySensorCam(oController,oLayout){
	var omlPaneProximitySensorCam = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneProximitySensorCam",
			layoutFixed: 	true,
			width:			"65px",
	});	
		

	var ohtmlGaugeCamProximitySensor = new sap.ui.core.HTML({  
      	content: "<div id='gaugeCamProximitySensor'></div>"
	});
	
	
	omlPaneProximitySensorCam.createRow(ohtmlGaugeCamProximitySensor);
	oLayout.createRow(omlPaneProximitySensorCam);   
}


function buildPaneFooter(oController,oLayout){
	var omlPaneFooter = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneFooter",
			layoutFixed: 	true,
			width:			"1205px",
			columns: 		3,
    		widths: 		["100px", "1005px", "100px"]  
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
			width:	"450px"
	});	
	
	var omlPaneBearingIndicators1 = new sap.ui.commons.layout.MatrixLayout({
		id: 			"mlPaneBearingIndicators1",
		layoutFixed: 	true,
		width: 			"450px",
		columns: 		3,
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
    	id: 	'imgCompassIndicator',
    	src: 	'assets/images/hud/Compass.png',
        width: 	"89px",
        height: "130px"
    });

    oimgCamPanIndicator = new sap.ui.commons.Image({
    	id: 	'imgCamPanindicator',
    	src: 	'assets/images/hud/Compass.png',
        width: 	"89px",
        height: "130px"
    });

    oimgWaypointIndicator = new sap.ui.commons.Image({
    	id: 	'imgWaypointIndicator',
    	src: 	'assets/images/hud/Compass.png',
        width: 	"89px",
        height: "130px"
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
//  omlCellWaypointIndicator.addContent(olblWaypoint);    
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
			width:		"60px"  
	});	
	

	var olblValWaypointId = new sap.ui.commons.Label({
	    	id: 		"lblValWaypointId",
	    	text: 		"HOME",
	    	textAlign: 	"Center"
	});


	var olblValDistanceToWaypoint = new sap.ui.commons.Label({
	    	id: 		"lblValDistanceToWaypoint",
	    	text: 		"",
	    	textAlign: 	"Center"
	});


	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell({width: "60px"});
	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow();
	omlCell1.addContent(olblValWaypointId);
	omlRow1.addCell(omlCell1);
	omlPaneWaypoint.addRow(omlRow1);

	omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell({width: "60px"});
	omlRow1  = new sap.ui.commons.layout.MatrixLayoutRow();
	omlCell1.addContent(olblValDistanceToWaypoint);
	omlRow1.addCell(omlCell1);
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
	    	content: 	'<div id="gyroContainer"><div id="gyroBox"><P class="front"></P><P class="back"></P><P class="right"></P><P class="left"></P><P class="top"></P><P class="bottom"></P></div></div>',
	    	preferDOM: 	false
	});
	
	omlPaneGyro.createRow(ohtmlIframeGyro);
	oLayout.createRow(omlPaneGyro);    
	
}


function buildPaneCrosshair(oController,oLayout){
	
	var omlPaneCrosshair = new sap.ui.commons.layout.MatrixLayout({
			id: 			"mlPaneCrosshair",
			layoutFixed: 	true,
			width:			"1206px"
		});
	 
	
	var ohtmlCanvasCrosshair = new sap.ui.core.HTML({  
	    	content: 	'<canvas width = "1206px" height = "912px" id = "canvasCrosshair" style = "border:none;">Your browser does not support HTML5 Canvas. Please shift to another browser.</canvas>',
	    	preferDOM: 	false   
	});

	 
	omlPaneCrosshair.createRow(ohtmlCanvasCrosshair);
	oLayout.createRow(omlPaneCrosshair);    
	
}


function buildPaneLowBattery(oController,oLayout){
	
	var omlPaneLowBattery = new sap.ui.commons.layout.MatrixLayout({
			id: 			"mlPaneLowBattery",
			layoutFixed: 	true,
			width:			"23px"
	});
	
    oimgLowBattery = new sap.ui.commons.Image({
    	id: 	'imgLowBattery',
    	src: 	'assets/images/hud/lowBattery.png',
        width: 	"23px",
        height: "39px"
    });

    omlPaneLowBattery.createRow(oimgLowBattery);
	oLayout.createRow(omlPaneLowBattery);
}

function buildPaneLaserIndicator(oController,oLayout){
	
	var omlPaneLaserIndicator = new sap.ui.commons.layout.MatrixLayout({
			id: 			"mlPaneLaserIndicator",
			layoutFixed: 	true,
			width:			"15px"
	});
	
    oimgLaserIndicator = new sap.ui.commons.Image({
    	id: 	'imgLaserIndicator',
    	src: 	'assets/images/hud/redDot.png',
        width: 	"15px",
        height: "15px"
    });

    omlPaneLaserIndicator.createRow(oimgLaserIndicator);
	oLayout.createRow(omlPaneLaserIndicator);
}

function buildPaneWeapon1State(oController,oLayout){
	
	var omlPaneWeapon1State = new sap.ui.commons.layout.MatrixLayout({
			id: 			"mlPaneWeapon1State",
			layoutFixed: 	true,
			width:			"10px"
	});
	
    oimgWeapon1State = new sap.ui.commons.Image({
    	id: 	'imgWeapon1State',
    	src: 	'assets/images/hud/redDot.png',
        width: 	"10px",
        height: "10px"
    });

    omlPaneWeapon1State.createRow(oimgWeapon1State);
	oLayout.createRow(omlPaneWeapon1State);
}


function buildPaneWeapon2State(oController,oLayout){
	
	var omlPaneWeapon2State = new sap.ui.commons.layout.MatrixLayout({
			id: 			"mlPaneWeapon2State",
			layoutFixed: 	true,
			width:			"10px"
	});
	
    oimgWeapon2State = new sap.ui.commons.Image({
    	id: 	'imgWeapon2State',
    	src: 	'assets/images/hud/redDot.png',
        width: 	"10px",
        height: "10px"
    });

    omlPaneWeapon2State.createRow(oimgWeapon2State);
	oLayout.createRow(omlPaneWeapon2State);
}


function buildPaneThreatOrientation(oController,oLayout) {
	var omlPaneThreatOrientation = new sap.ui.commons.layout.MatrixLayout({
		id: 			"mlPaneThreatOrientation",
		layoutFixed: 	true,
		width:			"1260px"
	});
	
	var ohtmlIframeThreatOrientationTop = new sap.ui.core.HTML({  
    	content: 	'<div id="threatOrientationTop" opacity="0"></div>',
    	preferDOM: 	false
	});

	var ohtmlIframeThreatOrientationTopRight = new sap.ui.core.HTML({  
    	content: 	'<div id="threatOrientationTopRight"></div>',
    	preferDOM: 	false
	});

	var ohtmlIframeThreatOrientationRight = new sap.ui.core.HTML({  
    	content: 	'<div id="threatOrientationRight"></div>',
    	preferDOM: 	false
	});

	var ohtmlIframeThreatOrientationBottomRight = new sap.ui.core.HTML({  
    	content: 	'<div id="threatOrientationBottomRight"></div>',
    	preferDOM: 	false
	});

	var ohtmlIframeThreatOrientationBottom = new sap.ui.core.HTML({  
    	content: 	'<div id="threatOrientationBottom"></div>',
    	preferDOM: 	false
	});

	var ohtmlIframeThreatOrientationBottomLeft = new sap.ui.core.HTML({  
    	content: 	'<div id="threatOrientationBottomLeft"></div>',
    	preferDOM: 	false
	});

	var ohtmlIframeThreatOrientationLeft = new sap.ui.core.HTML({  
    	content: 	'<div id="threatOrientationLeft"></div>',
    	preferDOM: 	false
	});

	var ohtmlIframeThreatOrientationTopLeft = new sap.ui.core.HTML({  
    	content: 	'<div id="threatOrientationTopLeft"></div>',
    	preferDOM: 	false
	});
	
	omlPaneThreatOrientation.createRow(ohtmlIframeThreatOrientationTop);
	omlPaneThreatOrientation.createRow(ohtmlIframeThreatOrientationTopRight);
	omlPaneThreatOrientation.createRow(ohtmlIframeThreatOrientationRight);
	omlPaneThreatOrientation.createRow(ohtmlIframeThreatOrientationBottomRight);
	omlPaneThreatOrientation.createRow(ohtmlIframeThreatOrientationBottom);
	omlPaneThreatOrientation.createRow(ohtmlIframeThreatOrientationBottomLeft);
	omlPaneThreatOrientation.createRow(ohtmlIframeThreatOrientationLeft);
	omlPaneThreatOrientation.createRow(ohtmlIframeThreatOrientationTopLeft);
	
	oLayout.createRow(omlPaneThreatOrientation);
	
}
	

function buildPaneDividers(oController,oLayout){
	var omlPaneDividers = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneDividers",
			layoutFixed: 	true,
			width:			"1px",
	});	
		

	var ohtmlDivider1 = new sap.ui.core.HTML({  
      	content: "<div id='divider1'></div>"
	});
	

	var ohtmlDivider2 = new sap.ui.core.HTML({  
      	content: "<div id='divider2'></div>"
	});
		
	var ohtmlDivider3 = new sap.ui.core.HTML({  
      	content: "<div id='divider3'></div>"
	});

	var ohtmlDivider4 = new sap.ui.core.HTML({  
      	content: "<div id='divider4'></div>"
	});

	var ohtmlDivider5 = new sap.ui.core.HTML({  
      	content: "<div id='divider5'></div>"
	});

	var ohtmlDivider6 = new sap.ui.core.HTML({  
      	content: "<div id='divider6'></div>"
	});

	var ohtmlDivider7 = new sap.ui.core.HTML({  
      	content: "<div id='divider7'></div>"
	});

	omlPaneDividers.createRow(ohtmlDivider1);
	omlPaneDividers.createRow(ohtmlDivider2);
	omlPaneDividers.createRow(ohtmlDivider3);
	omlPaneDividers.createRow(ohtmlDivider4);
	omlPaneDividers.createRow(ohtmlDivider5);
	omlPaneDividers.createRow(ohtmlDivider6);
	omlPaneDividers.createRow(ohtmlDivider7);
	
	oLayout.createRow(omlPaneDividers);
	
}


function buildPaneMessage(oController,oLayout){
	var omlPaneMessage = new sap.ui.commons.layout.MatrixLayout({
			id:				"mlPaneMessage",
			layoutFixed: 	true,
			width:			"1206px",
	});	
	
	var ohtmlMessageOutput = new sap.ui.core.HTML({  
      	content: "<div id='messageOutput'></div>"
	});
	
	
	omlPaneMessage.createRow(ohtmlMessageOutput);
	oLayout.createRow(omlPaneMessage);
}
