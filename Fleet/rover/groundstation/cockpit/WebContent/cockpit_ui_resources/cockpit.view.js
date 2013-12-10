

sap.ui.jsview("cockpit_ui_resources.cockpit", {

	
      getControllerName : function() {
         return "cockpit_ui_resources.cockpit";
      },

      createContent : function(oController) {
    	  
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
    	 buildPilotCam(oController,oLayout);
    	 buildCockpitMap(oController,oLayout);
    	 buildGauge(oController,oLayout);
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
	

	  var omlCellGauge1 = new sap.ui.commons.layout.MatrixLayoutCell({
		  width: "100px"
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

	    
	  var omlRowGauge1 = new sap.ui.commons.layout.MatrixLayoutRow();
	  var omlRowGauge2 = new sap.ui.commons.layout.MatrixLayoutRow();
	  var omlRowGauge3 = new sap.ui.commons.layout.MatrixLayoutRow();
		
		var ohtmlGauge1 = new sap.ui.core.HTML({  
	         content : "<div id='cockpitGauge1'></div>"
	     });
	
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

		
	 omlCellGauge1.addContent(ohtmlGauge1);
	 omlCellGauge2.addContent(ohtmlGauge2);
	 omlCellGauge3.addContent(ohtmlGauge3);
	 omlCellGauge4.addContent(ohtmlGauge4);
	 omlCellGauge5.addContent(ohtmlGauge5);
	 omlCellGauge6.addContent(ohtmlGauge6);
	 
	 
	 
	 omlRowGauge1.addCell(omlCellGauge1);
	 omlRowGauge1.addCell(omlCellGauge2);
	 omlGauge.addRow(omlRowGauge1);
	 
	 omlRowGauge2.addCell(omlCellGauge3);
	 omlRowGauge2.addCell(omlCellGauge4);
	 omlGauge.addRow(omlRowGauge2);
	
	 omlRowGauge3.addCell(omlCellGauge5);
	 omlRowGauge3.addCell(omlCellGauge6);
	 omlGauge.addRow(omlRowGauge3);
	
	 
	 oLayout.createRow(omlGauge);   
	 
}

