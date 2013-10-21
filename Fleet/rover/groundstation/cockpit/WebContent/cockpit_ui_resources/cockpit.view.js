sap.ui.jsview("cockpit_ui_resources.cockpit", {

	
      getControllerName : function() {
         return "cockpit_ui_resources.cockpit";
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

	
	
	 var oHtml = new sap.ui.core.HTML({  
	      content: '<iframe id="myiframe" width="640" height="480">No frame loaded</iframe>',
	      preferDOM : true,   
	      afterRendering: function() {  
	          newSrc = 'webcamstream.html';
	          
	          $("#myiframe").load(function() {  
	        	  $("#myiframe").attr("height",480).attr("width",640);  
	          
	              
	          }).attr("src",newSrc);  
	          
	    }
	 });
	 
	
	    oLyt.createRow(oTvStatus);
	    oLayout.createRow(oLyt);
		
		oLyt1.createRow(oHtml);		 
		oLayout.createRow(oLyt1);
	 	 
};


