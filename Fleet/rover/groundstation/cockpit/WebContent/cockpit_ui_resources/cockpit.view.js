sap.ui.jsview("cockpit_ui_resources.cockpit", {

	
      getControllerName : function() {
         return "cockpit_ui_resources.cockpit";
      },

      createContent : function(oController) {
    	  
    	  ////
    	  
    	  
    	  
    	  
    	  ////
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
//    	 buildSharpPanel(oController,oLayout);
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
		tooltip : "Sharp ir JPB" }
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
	
	
	
//	var oTvStatus = new sap.ui.commons.TextView("tvStatus",{
//		text : "Connecting....",
//		tooltip : "Status" }
//	);


	/////

	

	
	var oTvGpsNavSolGpsMs = new sap.ui.commons.TextView("TvGpsNavSolGpsMs",{
		text : "Nav Sol Gps Ms",
		tooltip : "Nav Sol Gps Ms" }
	);

	var oTvGpsNavSolFixType = new sap.ui.commons.TextView("TvGpsNavSolFixType",{
		text : "Nav Sol Fix Type",
		tooltip : "Nav Sol Fix Type" }
	);

	var oTvGpsNavSolAccEst3d = new sap.ui.commons.TextView("TvGpsNavSolAccEst3d",{
		text : "Nav Sol Acc Est 3D",
		tooltip : "Nav Sol Acc Est 3D" }
	);

	var oTvGpsNavSolNumberSv = new sap.ui.commons.TextView("TvGpsNavSolNumberSv",{
		text : "Nav Sol Number Sv",
		tooltip : "Nav Sol Number Sv" }
	);

	
	var oTvGpsNavPosllhGpsMs = new sap.ui.commons.TextView("TvGpsNavPosllhGpsMs",{
		text : "Nav Posllh Gps Ms",
		tooltip : "Nav Posllh Gps Ms" }
	);

	var oTvGpsNavPosllhLongitude = new sap.ui.commons.TextView("TvGpsNavPosllhLongitude",{
		text : "Nav Posllh Longitude",
		tooltip : "Nav Posllh Longitude" }
	);

	var oTvGpsNavPosllhLattitude = new sap.ui.commons.TextView("TvGpsNavPosllhLattitude",{
		text : "Nav Posllh Lattitude",
		tooltip : "Nav Posllh Lattitude" }
	);

	var oTvGpsNavPosllhHeight = new sap.ui.commons.TextView("TvGpsNavPosllhHeight",{
		text : "Nav Posllh height",
		tooltip : "Nav Posllh height" }
	);

	var oTvGpsNavPosllhHeightMsl = new sap.ui.commons.TextView("TvGpsNavPosllhHeightMsl",{
		text : "Nav Posllh height msl",
		tooltip : "Nav Posllh height msl" }
	);

	var oTvGpsNavPosllhHoriAccEst = new sap.ui.commons.TextView("TvGpsNavPosllhHoriAccEst",{
		text : "Nav Posllh hori acc est",
		tooltip : "Nav Posllh hori acc est" }
	);

	var oTvGpsNavPosllhVertAccEst = new sap.ui.commons.TextView("TvGpsNavPosllhVertAccEst",{
		text : "Nav Posllh vert acc est",
		tooltip : "Nav Posllh vert acc est" }
	);

	var oTvGpsNavVelnedGpsMs = new sap.ui.commons.TextView("TvGpsNavVelnedGpsMs",{
		text : "Nav Velned Gps Ms",
		tooltip : "Nav Velned Gps Ms" }
	);

	var oTvGpsNavVelnedNorthVelCms = new sap.ui.commons.TextView("TvGpsNavVelnedNorthVelCms",{
		text : "Nav Velned North Velocity cm/s",
		tooltip : "Nav Velned North Velocity cm/s" }
	);

	var oTvGpsNavVelnedEastVelCms = new sap.ui.commons.TextView("TvGpsNavVelnedEastVelCms",{
		text : "Nav Velned East Velocity cm/s",
		tooltip : "Nav Velned East Velocity cm/s" }
	);


	var oTvGpsNavVelnedDownVelCms = new sap.ui.commons.TextView("TvGpsNavVelnedDownVelCms",{
		text : "Nav Velned Down Velocity cm/s",
		tooltip : "Nav Velned Down Velocity cm/s" }
	);

	var oTvGpsNavVelnedSpeed3dCms = new sap.ui.commons.TextView("TvGpsNavVelnedSpeed3dCms",{
		text : "Nav Velned Speed 3D cm/s",
		tooltip : "Nav Velned Speed 3D cm/s" }
	);

	var oTvGpsNavVelnedGroundSpeed2dCms = new sap.ui.commons.TextView("TvGpsNavVelnedGroundSpeed2dCms",{
		text : "Nav Velned Ground Speed 2D cm/s",
		tooltip : "Nav Velned Ground Speed 2D cm/s" }
	);

	var oTvGpsNavVelnedHeading = new sap.ui.commons.TextView("TvGpsNavVelnedHeading",{
		text : "Nav Velned Heading",
		tooltip : "Nav Velned Heading" }
	);

	var oTvGpsNavVelnedSpeedAccEst = new sap.ui.commons.TextView("TvGpsNavVelnedSpeedAccEst",{
		text : "Nav Velned Speed Acc Est",
		tooltip : "Nav Velned Speed Acc Est" }
	);

	var oTvGpsNavVelnedCourseAccEst = new sap.ui.commons.TextView("TvGpsNavVelnedCourseAccEst",{
		text : "Nav Velned Course Acc Est",
		tooltip : "Nav Velned Course Acc Est" }
	);

	

	//////
	
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
	 
	 
	 	
		
	    oLyt.createRow(oTvGpsNavSolGpsMs);
	    oLayout.createRow(oLyt);
	    /*
	     	    oLyt.createRow(oTvStatus);
	    oLayout.createRow(oLyt);
 		*/
	    
	    oLyt.createRow(oTvGpsNavSolFixType);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavSolAccEst3d);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavSolNumberSv);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavPosllhGpsMs);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavPosllhLongitude);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavPosllhLattitude);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavPosllhHeight);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavPosllhHeightMsl);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavPosllhHoriAccEst);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavPosllhVertAccEst);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedGpsMs);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedNorthVelCms);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedEastVelCms);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedDownVelCms);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedDownVelCms);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedSpeed3dCms);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedGroundSpeed2dCms);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedHeading);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedSpeedAccEst);
	    oLayout.createRow(oLyt);
	    
	    oLyt.createRow(oTvGpsNavVelnedCourseAccEst);
	    oLayout.createRow(oLyt);
	    
	    
		oLyt1.createRow(oHtml);		 
		oLayout.createRow(oLyt1);
	 	 
};


