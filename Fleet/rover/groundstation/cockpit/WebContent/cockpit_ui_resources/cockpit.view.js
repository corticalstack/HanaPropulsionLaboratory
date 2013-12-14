

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
    	 buildPaneComms(oController,oLayout);
    	 
//    	 buildPaneNavigation(oController,oLayout);
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
			width: 			"160px",		
			
	});	
	
	
	var omlPaneDrive1 = new sap.ui.commons.layout.MatrixLayout({
        	id: 			"mlPaneDrive1",
        	layoutFixed: 	true,
        	width: 			"150px",
        	columns : 		2,
        	widths: 		["120px", "30px"]  
	});
	
	

	 var omlCell1 			   		= new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlCell2   		   		= new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlCellPaneDriveTitle 		= new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});
	 var omlCellDriveDirection 		= new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});
	 var omlCellDriveStop 			= new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});
	 var omlCellGaugeThrust 		= new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 2});

	 
	 var omlRowPaneDriveTitle 		= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	 var omlRowDriveDirection		= new sap.ui.commons.layout.MatrixLayoutRow({height: "35px"});
	 var omlRowDriveStop			= new sap.ui.commons.layout.MatrixLayoutRow({height: "35px"});
	 var omlRowLeftEngineThrust		= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	 var omlRowRightEngineThrust	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	 var omlRowGaugeThrust			= new sap.ui.commons.layout.MatrixLayoutRow({height: "120px"});
	 

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
	    	width: 		"145px"
	    });
	
	 
	 var olblIndStop = new sap.ui.commons.Label({
	    	id: 		"lblIndStop",
	    	text: 		otextBundle.getText("stop"),
	    	textAlign: 	"Center",
	    	width: 		"145px"
	    });

	 
	 var olblStatusLeftEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblStatusLeftEngineThrust",
	    	text: 	otextBundle.getText("leftenginethrust"),
	    	width: 	"120px"
	    });
	
	 
	 var olblValLeftEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblValLeftEngineThrust",
	    	text: 	"99",
	    	textAlign: 	"Right",
	    	width: 	"30px"	    	
	    });
	 
	 
	 var olblStatusRightEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblStatusRightEngineThrust",
	    	text: 	otextBundle.getText("rightenginethrust"),
	    	width: 	"120px"	    	
	    });
	 
	 
	 var olblValRightEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblValRightEngineThrust",
	    	text: 	"-20",
	    	textAlign: 	"Right",
	    	width: 	"30px"	    		    	
	    });

	 
	 var ohtmlGaugeThrust = new sap.ui.core.HTML({  
         	content : "<div id='gaugeThrust'></div>"
     });

	 
	 
	 omlCellPaneDriveTitle.addContent(olblPaneDrive);
	 omlRowPaneDriveTitle.addCell(omlCellPaneDriveTitle);
	 omlPaneDrive1.addRow(omlRowPaneDriveTitle);
	 
	 

	 
	 omlCellDriveDirection.addContent(olblIndDriveDirection);
	 omlRowDriveDirection.addCell(omlCellDriveDirection);	
	 omlPaneDrive1.addRow(omlRowDriveDirection);

	 
	 omlCellDriveStop.addContent(olblIndStop);
	 omlRowDriveStop.addCell(omlCellDriveStop);
	 omlPaneDrive1.addRow(omlRowDriveStop);

	 
	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlCell1.addContent(olblStatusLeftEngineThrust);
	 omlCell2.addContent(olblValLeftEngineThrust);
	 omlRowLeftEngineThrust.addCell(omlCell1);
	 omlRowLeftEngineThrust.addCell(omlCell2);
	 omlPaneDrive1.addRow(omlRowLeftEngineThrust);


	 omlCell1 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlCell2 = new sap.ui.commons.layout.MatrixLayoutCell();
	 omlCell1.addContent(olblStatusRightEngineThrust);
	 omlCell2.addContent(olblValRightEngineThrust);
	 omlRowRightEngineThrust.addCell(omlCell1);
	 omlRowRightEngineThrust.addCell(omlCell2);
	 omlPaneDrive1.addRow(omlRowRightEngineThrust);
	 
	 
	 omlCellGaugeThrust.addContent(ohtmlGaugeThrust);
	 omlRowGaugeThrust.addCell(omlCellGaugeThrust);
	 omlPaneDrive1.addRow(omlRowGaugeThrust);
	 
	 
	 omlPaneDrive.createRow(omlPaneDrive1);
	 
	 oLayout.createRow(omlPaneDrive);   

}


function buildPaneComms(oController,oLayout){

	var omlPaneComms = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlPaneComms",
			width:	"552px"
	});	
	
	var omlCellPaneCommsTitle 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPaneComms 		= new sap.ui.commons.layout.MatrixLayoutRow();
	
	var olblPaneComms = new sap.ui.commons.Label({
    		id: 		"lblPaneComms",
    		text: 		otextBundle.getText("comms"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });


	 omlCellPaneCommsTitle.addContent(olblPaneComms);
	 omlRowPaneComms.addCell(omlCellPaneCommsTitle);
	 omlPaneComms.addRow(omlRowPaneComms);
	 oLayout.createRow(omlPaneComms);   

}


function buildPaneEarthTime(oController,oLayout){
	
	var omlPaneEarthTime = new sap.ui.commons.layout.MatrixLayout({
			id: 	"mlPaneEarthTime",
			width: "340px"
	});
	 
	
    var omlCellPaneEarthTime 		= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellPaneEarthTimeTitle 	= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPaneEarthTimeTitle 	= new sap.ui.commons.layout.MatrixLayoutRow();
	var omlRowPaneEarthTime 		= new sap.ui.commons.layout.MatrixLayoutRow();

	var olblPaneEarthTime = new sap.ui.commons.Label({
    		id: 		"lblPaneEarthTime",
    		text: 		otextBundle.getText("earthtime"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });
	
	
	var ohtmlIframeEarthTime = new sap.ui.core.HTML({  
	    	content: '<iframe id="iframeEarthTime" width="340px" height="100px" frameBorder="0">Earth Time Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'earthtime.html';
	    		$("#iframeEarthTime").load(function() {  
	    			$("#iframeEarthTime").attr("width","340px").attr("height","100px");  
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
	        width: 			"550px",
	        columns : 		4,
	        widths: 		["100px", "150px", "150px", "150px"]  });
		

	var omlPanePower1 = new sap.ui.commons.layout.MatrixLayout({
        id: 			"mlPanePower1",
        layoutFixed: 	true,
        width: 			"100px",
	});

	var omlCell1 				= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell2 				= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell3 				= new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCell4 				= new sap.ui.commons.layout.MatrixLayoutCell();	
	var omlCellPanePowerTitle 	= new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 4});
	
	
	var omlRowPanePowerTitle 	= new sap.ui.commons.layout.MatrixLayoutRow({height: "30px"});
	
	var olblPanePower = new sap.ui.commons.Label({
			id: 		"lblPanePower",
		    text: 		otextBundle.getText("power"),	
		    textAlign: 	"Center",
		    width: 		"100%"
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


	var ohtmlGaugeCurrent = new sap.ui.core.HTML({  
	        content: "<div id='gaugeCurrent'></div>"
	});

	var ohtmlGaugeAmps = new sap.ui.core.HTML({  
	    	content : "<div id='gaugeAmps'></div>"
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


}

function buildPaneMissionControl(oController,oLayout){
	var omlMissionControlPanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlMissionControlPanel",
			width:	"490px"
	});	
	
	 
	var olblMissionControlPanel = new sap.ui.commons.Label({
    	id: 		"lblPanelMissionControl",
    	text: 		otextBundle.getText("missioncontrol"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });


	 var omlCellMissionControlPanelTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRowMissionControlPanelTitle = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
	 omlCellMissionControlPanelTitle.addContent(olblMissionControlPanel);
	 omlRowMissionControlPanelTitle.addCell(omlCellMissionControlPanelTitle);
	 omlMissionControlPanel.addRow(omlRowMissionControlPanelTitle);
	
	
	 oLayout.createRow(omlMissionControlPanel);   

}


function buildPaneWeapons(oController,oLayout){
	var omlPaneWeapons = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlPaneWeapons",
			width:	"160px"
	});	
	
	 
	var olblPaneWeapons = new sap.ui.commons.Label({
    		id: 		"lblPanelWeapons",
    		text: 		otextBundle.getText("weapons"),
    		textAlign: 	"Center",
    		width: 		"100%"
    });


	 var omlCellPaneWeaponsTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRowPaneWeaponsTitle = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
	 omlCellPaneWeaponsTitle.addContent(olblPaneWeapons);
	 omlRowPaneWeaponsTitle.addCell(omlCellPaneWeaponsTitle);
	 omlPaneWeapons.addRow(omlRowPaneWeaponsTitle);
		
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


