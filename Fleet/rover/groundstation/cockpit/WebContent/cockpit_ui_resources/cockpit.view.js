

sap.ui.jsview("cockpit_ui_resources.cockpit", {

	
      getControllerName : function() {
         return "cockpit_ui_resources.cockpit";
      },

      createContent : function(oController) {
    	  
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
    	 buildPilotCam(oController,oLayout);
    	 buildDrivePanel(oController,oLayout);
    	 buildWeaponsPanel(oController,oLayout);
    	 buildPowerPanel(oController,oLayout);
    	 buildEarthTime(oController,oLayout);
    	 buildCommsPanel(oController,oLayout);
    	 
    	 buildNavigationPanel(oController,oLayout);
    	 buildMissionControlPanel(oController,oLayout);
//    	 buildGauge(oController,oLayout);
    	 buildPrimarySystemsStatusPanel(oController,oLayout);
    	 buildSecondarySystemsStatusPanel(oController,oLayout);
    	 buildBearingIndicators(oController,oLayout);

  	     return oLayout;
      }

});



function buildPilotCam(oController,oLayout){
		
	var omlPilotCam = new sap.ui.commons.layout.MatrixLayout({
			id: 	"mlPilotCam",
			width:	"1280px"
		});
	 
	
    var omlCellPilotCam = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPilotCam = new sap.ui.commons.layout.MatrixLayoutRow();

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

	 omlCellPilotCam.addContent(ohtmlIframeRadioCamStream);
	 omlRowPilotCam.addCell(omlCellPilotCam);
	 omlPilotCam.addRow(omlRowPilotCam);
	 oLayout.createRow(omlPilotCam);    
	
}


function buildDrivePanel(oController,oLayout){
	var omlDrivePanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlDrivePanel",
			width: "150px",		
//			layoutFixed: 	true,
//			columns : 		3,
//	        widths: 		["140x", "220px", "140px"] 
	});	
	
	
	var olblDrivePanel = new sap.ui.commons.Label({
    	id: 		"lblPanelDrive",
    	text: 		otextBundle.getText("drive"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });


	 var omlCellDrivePanelTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRowDrivePanelTitle = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
	 omlCellDrivePanelTitle.addContent(olblDrivePanel);
	 omlRowDrivePanelTitle.addCell(omlCellDrivePanelTitle);
	 omlDrivePanel.addRow(omlRowDrivePanelTitle);
	 
	 
	 var omlRowDrive1 = new sap.ui.commons.layout.MatrixLayoutRow();
	 var omlRowDrive2 = new sap.ui.commons.layout.MatrixLayoutRow();
	 var omlRowDrive3 = new sap.ui.commons.layout.MatrixLayoutRow();
	 var omlRowDrive4 = new sap.ui.commons.layout.MatrixLayoutRow();
	 
	 
	 var omlCellDriveDirection = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "140px"
	  });
	 
	 var olblDriveDirection = new sap.ui.commons.Label({
	    	id: 	"lblPanelDriveDirection",
	    	text: 	otextBundle.getText("forward"),
	    });
	 
	 omlCellDriveDirection.addContent(olblDriveDirection);
	 omlRowDrive1.addCell(omlCellDriveDirection);
	 omlDrivePanel.addRow(omlRowDrive1);
	 

	 var omlCellLeftEngineThrust = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "140px"
	  });
	 
	 var olblLeftEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblPanelLeftEngineThrust",
	    	text: 	otextBundle.getText("leftenginethrust"),
	    });
	 
	 omlCellLeftEngineThrust.addContent(olblLeftEngineThrust);
	 omlRowDrive2.addCell(omlCellLeftEngineThrust);
	 omlDrivePanel.addRow(omlRowDrive2);


	 var omlCellRightEngineThrust = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "140px"
	  });
	 
	 var olblRightEngineThrust = new sap.ui.commons.Label({
	    	id: 	"lblPanelRightEngineThrust",
	    	text: 	otextBundle.getText("rightenginethrust"),
	    });
	 
	 omlCellRightEngineThrust.addContent(olblRightEngineThrust);
	 omlRowDrive3.addCell(omlCellRightEngineThrust);
	 omlDrivePanel.addRow(omlRowDrive3);

	 
	 
	 var omlCellGaugeThrust = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "140px"
	  });
	 
	 var ohtmlGaugeThrust = new sap.ui.core.HTML({  
         content : "<div id='gaugeThrust'></div>"
     });
	 
	 omlCellGaugeThrust.addContent(ohtmlGaugeThrust);
	 omlRowDrive4.addCell(omlCellGaugeThrust);
	 omlDrivePanel.addRow(omlRowDrive4);
	 
	 oLayout.createRow(omlDrivePanel);   

}


function buildCommsPanel(oController,oLayout){
	var omlCommsPanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlCommsPanel",
			width: "570px"
	});	
	
	
	var olblCommsPanel = new sap.ui.commons.Label({
    	id: 		"lblPanelComms",
    	text: 		otextBundle.getText("comms"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });


	 var omlCellCommsPanelTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRowCommsPanel = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
	 omlCellCommsPanelTitle.addContent(olblCommsPanel);
	 omlRowCommsPanel.addCell(omlCellCommsPanelTitle);
	 omlCommsPanel.addRow(omlRowCommsPanel);
	 oLayout.createRow(omlCommsPanel);   

}


function buildEarthTime(oController,oLayout){
	
	var omlEarthTime = new sap.ui.commons.layout.MatrixLayout({
			id: 	"mlEarthTime",
			width: "160px"
		});
	 
	
    var omlCellEarthTime = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlCellEarthTimePanelTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowEarthTimePanelTitle = new sap.ui.commons.layout.MatrixLayoutRow();
	var omlRowEarthTime = new sap.ui.commons.layout.MatrixLayoutRow();

	var olblEarthTimePanel = new sap.ui.commons.Label({
    	id: 		"lblPanelEarthTime",
    	text: 		otextBundle.getText("earthtime"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });
	
	
	var ohtmlIframeEarthTime = new sap.ui.core.HTML({  
	    	content: '<iframe id="iframeEarthTime" width="140px" height="58px" frameBorder="0">Earth Time Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'earthtime.html';
	    		$("#iframeEarthTime").load(function() {  
	    			$("#iframeEarthTime").attr("width","140px").attr("height","58px");  
	    		}).attr("src",newSrc);  
	    	}
	 });

	 omlCellEarthTimePanelTitle.addContent(olblEarthTimePanel);
	 omlRowEarthTimePanelTitle.addCell(omlCellEarthTimePanelTitle);
	 omlEarthTime.addRow(omlRowEarthTimePanelTitle);
	 
	 omlCellEarthTime.addContent(ohtmlIframeEarthTime);
	 omlRowEarthTime.addCell(omlCellEarthTime);
	 omlEarthTime.addRow(omlRowEarthTime);
	 oLayout.createRow(omlEarthTime);    
	
}


function buildPowerPanel(oController,oLayout){
	var omlPowerPanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlPowerPanel",
			width: "570px",		
//			layoutFixed: 	true,
//			columns : 		3,
//	        widths: 		["140x", "220px", "140px"] 
	});	
	
	
	var olblPowerPanel = new sap.ui.commons.Label({
    	id: 		"lblPanelPower",
    	text: 		otextBundle.getText("power"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });


	 var omlCellPowerPanelTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRowPowerPanelTitle = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
	 omlCellPowerPanelTitle.addContent(olblPowerPanel);
	 omlRowPowerPanelTitle.addCell(omlCellPowerPanelTitle);
	 omlPowerPanel.addRow(omlRowPowerPanelTitle);
	 
	 
	 var omlRowPower1 = new sap.ui.commons.layout.MatrixLayoutRow();
	 var omlCellGaugeBattRemaining = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "140px"
	  });
	 
	 var ohtmlGaugeBattRemaining = new sap.ui.core.HTML({  
         content : "<div id='gaugeBattRemaining'></div>"
     });
	 
	 omlCellGaugeBattRemaining.addContent(ohtmlGaugeBattRemaining);
	 omlRowPower1.addCell(omlCellGaugeBattRemaining);
	 omlPowerPanel.addRow(omlRowPower1);
	 
	 oLayout.createRow(omlPowerPanel);   

}




function buildNavigationPanel(oController,oLayout){
	var omlNavigationPanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlNavigationPanel",
			width:	"490px"
	});	
	
	 
	var olblNavigationPanel = new sap.ui.commons.Label({
    	id: 		"lblPanelNavigation",
    	text: 		otextBundle.getText("navigation"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });


	 var omlCellNavigationPanelTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRowNavigationPanelTitle = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
	 omlCellNavigationPanelTitle.addContent(olblNavigationPanel);
	 omlRowNavigationPanelTitle.addCell(omlCellNavigationPanelTitle);
	 omlNavigationPanel.addRow(omlRowNavigationPanelTitle);
	
	
    var omlCellMap = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowMap = new sap.ui.commons.layout.MatrixLayoutRow();
		
	var ohtmlMap = new sap.ui.core.HTML({  
	         content : "<div id='cockpitMap' style='width: 470px; height: 470px;'></div>"  
	     });
	
		
	 
	 omlCellMap.addContent(ohtmlMap);
	 omlRowMap.addCell(omlCellMap);
	 omlNavigationPanel.addRow(omlRowMap);
	 oLayout.createRow(omlNavigationPanel);   

}

function buildMissionControlPanel(oController,oLayout){
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


function buildWeaponsPanel(oController,oLayout){
	var omlWeaponsPanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlWeaponsPanel",
			width:	"150px"
	});	
	
	 
	var olblWeaponsPanel = new sap.ui.commons.Label({
    	id: 		"lblPanelWeapons",
    	text: 		otextBundle.getText("weapons"),
    	textAlign: 	"Center",
    	width: 		"100%"
    });


	 var omlCellWeaponsPanelTitle = new sap.ui.commons.layout.MatrixLayoutCell();
	 var omlRowWeaponsPanelTitle = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
	 omlCellWeaponsPanelTitle.addContent(olblWeaponsPanel);
	 omlRowWeaponsPanelTitle.addCell(omlCellWeaponsPanelTitle);
	 omlWeaponsPanel.addRow(omlRowWeaponsPanelTitle);
	
	
	 oLayout.createRow(omlWeaponsPanel);   

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


