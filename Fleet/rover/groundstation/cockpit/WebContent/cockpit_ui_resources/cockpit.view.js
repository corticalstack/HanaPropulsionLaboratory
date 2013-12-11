

sap.ui.jsview("cockpit_ui_resources.cockpit", {

	
      getControllerName : function() {
         return "cockpit_ui_resources.cockpit";
      },

      createContent : function(oController) {
    	  
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
    	 buildPilotCam(oController,oLayout);
    	 buildCommsPanel(oController,oLayout);
    	 buildEarthTime(oController,oLayout);
    	 buildPowerPanel(oController,oLayout);
    	 
    	 buildCockpitMap(oController,oLayout);
    	 buildGauge(oController,oLayout);
    	 buildPrimarySystemsStatusPanel(oController,oLayout);
    	 buildSecondarySystemsStatusPanel(oController,oLayout);
    	 buildBearingIndicators(oController,oLayout);

  	     return oLayout;
      }

});



function buildPilotCam(oController,oLayout){
		
	var omlPilotCam = new sap.ui.commons.layout.MatrixLayout({
			id: 	"mlPilotCam",
			width:	"1320px"
		});
	 
	
    var omlCellPilotCam = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowPilotCam = new sap.ui.commons.layout.MatrixLayoutRow();

	var ohtmlIframeRadioCamStream = new sap.ui.core.HTML({  
	    	content: '<iframe id="iframePilotCamStream" width="1320px" height="990px" frameBorder="0">Pilot Cam Stream Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'pilotcamstream.html';
	    		$("#iframePilotCamStream").load(function() {  
	    			$("#iframePilotCamStream").attr("width","1320px").attr("height","990px");  
	    		}).attr("src",newSrc);  
	    	}
	 });

	 omlCellPilotCam.addContent(ohtmlIframeRadioCamStream);
	 omlRowPilotCam.addCell(omlCellPilotCam);
	 omlPilotCam.addRow(omlRowPilotCam);
	 oLayout.createRow(omlPilotCam);    
	
}


function buildCommsPanel(oController,oLayout){
	var omlCommsPanel = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlCommsPanel",
			width: "500px"
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
			width: "280px"
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
	    	content: '<iframe id="iframeEarthTime" width="280px" height="58px" frameBorder="0">Earth Time Offline!!!</iframe>',
	    	preferDOM : true,   
	    	afterRendering: function() {  
	    		newSrc = 'earthtime.html';
	    		$("#iframeEarthTime").load(function() {  
	    			$("#iframeEarthTime").attr("width","280px").attr("height","58px");  
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
			width: "500px",			
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
	 var omlCellGauge1 = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "100px"
	  });
	 
	 var ohtmlGauge1 = new sap.ui.core.HTML({  
         content : "<div id='cockpitGauge1'></div>"
     });
	 
	 omlCellGauge1.addContent(ohtmlGauge1);
	 omlRowPower1.addCell(omlCellGauge1);
	 
	 omlPowerPanel.addRow(omlRowPower1);
	 oLayout.createRow(omlPowerPanel);   

}




function buildCockpitMap(oController,oLayout){
	var omlMap = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlcockpitMap",
			width:	"300px"
	});	
	
	 
    var omlCellMap = new sap.ui.commons.layout.MatrixLayoutCell();
	var omlRowMap = new sap.ui.commons.layout.MatrixLayoutRow();
		
	var ohtmlMap = new sap.ui.core.HTML({  
	         content : "<div id='cockpitMap' style='width: 300px; height: 300px;'></div>"  
	     });
	
		
	 
	 omlCellMap.addContent(ohtmlMap);
	 omlRowMap.addCell(omlCellMap);
	 omlMap.addRow(omlRowMap);
	 oLayout.createRow(omlMap);   

}


function buildGauge(oController,oLayout){
	var omlGauge = new sap.ui.commons.layout.MatrixLayout({
			id:		"mlcockpitGauge",
			width: "250px"
	});	
	

	  
	  var omlCellGauge2 = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "100px"
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

	  
	  var omlRowGauge1 = new sap.ui.commons.layout.MatrixLayoutRow();
	  var omlRowGauge2 = new sap.ui.commons.layout.MatrixLayoutRow();
	  var omlRowGauge3 = new sap.ui.commons.layout.MatrixLayoutRow();
	  var omlRowGauge4 = new sap.ui.commons.layout.MatrixLayoutRow();
		
	
		var ohtmlGauge2 = new sap.ui.core.HTML({  
	         content : "<div id='cockpitGauge2'></div>"
	     });

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

		

	 omlCellGauge2.addContent(ohtmlGauge2);
	 omlCellGauge3.addContent(ohtmlGauge3);
	 omlCellGauge4.addContent(ohtmlGauge4);
	 omlCellGauge5.addContent(ohtmlGauge5);
	 omlCellGauge6.addContent(ohtmlGauge6);
	 omlCellGauge7.addContent(ohtmlGauge7);
	 
	 

	 omlRowGauge1.addCell(omlCellGauge2);
	 omlGauge.addRow(omlRowGauge1);
	 
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


