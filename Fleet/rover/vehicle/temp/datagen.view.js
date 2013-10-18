sap.ui.jsview("dashboard_ui_resources.DataGen", {

	
      getControllerName : function() {
         return "dashboard_ui_resources.DataGen";
      },

      createContent : function(oController) {
    	  
    	  ////
    	  
    	  
    	  
    	  
    	  ////
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
    	 buildSharpPanel(oController,oLayout);
    	 buildDrivePanel(oController,oLayout); 	       
    	 
  	     return oLayout;
      }

});


function buildSharpPanel(oController,oLayout){
	
	var oSharpPanel = new sap.ui.commons.Panel().setText(oBundle.getText("settings"));
    oLayout.createRow(oSharpPanel);
    
	 var layoutNewSharp = new sap.ui.commons.layout.MatrixLayout({width:"800px"});
	 oSharpPanel.addContent(layoutNewSharp);
    
    
	var oTvSharpir1 = new sap.ui.commons.TextView("tvSharpir1",{
		text : "0",
		wrapping : false,
		  width: "300px",
		tooltip : "Sharp ir 1" }
	);
	
	var oProgressIndicator1 = new sap.ui.commons.ProgressIndicator("ProgInd1", {
        width: "300px", 
        percentValue: 0, 
        displayValue: "0cm"
        });
	
	
	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 5});
    oCell.addContent(oTvSharpir1);	 
	layoutNewSharp.createRow(oCell);
	
	var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 5});
    oCell.addContent(oProgressIndicator1);	 
	
}

function buildDrivePanel(oController,oLayout){
	
	
	
	
	 //var oDrivePanel = new sap.ui.commons.Panel().setText(oBundle.getText("drive"));   
	 //oLayout.createRow(oDrivePanel);

	// olayoutNew = new sap.ui.commons.layout.MatrixLayout("matrix_hori");
	// oDrivePanel.addContent(olayoutNew);
	 
	// create a simple slider with ticks
	oLyt = new sap.ui.commons.layout.MatrixLayout("matrix_hori", { width: "800px" });
	oLyt1 = new sap.ui.commons.layout.MatrixLayout("matrix_hor1", { width: "800px" });
	
	
	
	var oTvStatus = new sap.ui.commons.TextView("tvStatus",{
		text : "Connecting....",
		tooltip : "Status" }
	);

	
	//11. Slider
	var oSlider = new sap.ui.commons.Slider("Sli", {
				height: "300px", 
				min: 0,
				max: 100,
				value: 1, 
				tooltip: "Slider ",
				vertical: true,
				smallStepWidth: 5,
				totalUnits: 5,
				stepLabels: true,
				change : function(oEvent){
			      	  oController.execute(oEvent,oController); }
				});

//	var oSlider1 = new sap.ui.commons.Slider("Sli1", { 
	//	width: "300px",
//		min: -90,
//		max: 90,
//		value: 0, 
//		tooltip: "Slider 11",
//		vertical: false,
//		smallStepWidth: 5,
//		totalUnits: 6,
//		stepLabels: true
//		});
	
	
	
	 var oButton1 = new sap.ui.commons.Button("btnForward",{
	        text : oBundle.getText("btnForward"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });
	 
	 var oButton2 = new sap.ui.commons.Button("btnStop",{
	        text : oBundle.getText("btnStop"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });
	 
	 var oButton3 = new sap.ui.commons.Button("btnReverse",{
	        text : oBundle.getText("btnReverse"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });

	 var oButton4 = new sap.ui.commons.Button("btnClockwise",{
	        text : oBundle.getText("btnClockwise"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });

	 
	 var oButton5 = new sap.ui.commons.Button("btnCounterClockwise",{
	        text : oBundle.getText("btnCounterClockwise"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });


	
//	 var oHtml = new sap.ui.core.HTML({  
//	      content: '<iframe id="myiframe" width="960" height="549">No frame loaded</iframe>',
//	      preferDOM : true,   
//	      afterRendering: function() {  
//	          newSrc = 'http://192.168.0.9/webcamstream.html';
//	          
//	          $("#myiframe").load(function() {  
//	        	  $("#myiframe").attr("height",540).attr("width",960);  
//	          
//	              
//	          }).attr("src",newSrc);  
//	          
//	    }
//	 });
	 
	 var oButton6 = new sap.ui.commons.Button("btnPanLeft",{
	        text : oBundle.getText("btnPanLeft"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });
	 
	 var oButton7 = new sap.ui.commons.Button("btnPanRight",{
	        text : oBundle.getText("btnPanRight"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });
	 
	 var oButton8 = new sap.ui.commons.Button("btnTiltUp",{
	        text : oBundle.getText("btnTiltUp"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });

	 var oButton9 = new sap.ui.commons.Button("btnTiltDown",{
	        text : oBundle.getText("btnTiltDown"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });

	 
	 var oButton10 = new sap.ui.commons.Button("btnCamSweep",{
	        text : oBundle.getText("btnCamSweep"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });

	 
	 var oButton11 = new sap.ui.commons.Button("btnLightsOn",{
	        text : oBundle.getText("btnLightsOn"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });

	 
	 var oButton12 = new sap.ui.commons.Button("btnLightsOff",{
	        text : oBundle.getText("btnLightsOff"),
	        press : function(oEvent){
	      	  oController.execute(oEvent,oController); }
	    });
	
	
	    oLyt.createRow(oTvStatus);
	    
	 
	    
		oLyt.createRow(oSlider);
		oLyt.createRow(oButton1, oButton2, oButton3, oButton4, oButton5);
		
		oLayout.createRow(oLyt);
		
//		oLyt1.createRow(oHtml);		 
//		oLayout.createRow(oLyt1);
	 	
		oLyt.createRow(oButton6, oButton7, oButton8, oButton9, oButton10);
		oLayout.createRow(oLyt);

		oLyt.createRow(oButton11, oButton12);
		oLayout.createRow(oLyt);

	// oLayoutNew.createRow(oSlider1);
	// 
};