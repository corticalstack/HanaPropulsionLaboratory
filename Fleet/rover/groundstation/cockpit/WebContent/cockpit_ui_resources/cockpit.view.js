

sap.ui.jsview("cockpit_ui_resources.cockpit", {

	
      getControllerName : function() {
         return "cockpit_ui_resources.cockpit";
      },

      createContent : function(oController) {
    	  
    	  ////
    	  
    	  
    	  
    	  
    	  ////
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
    	 buildBanner(oController,oLayout);
    	 buildCamMap(oController,oLayout);
    	 buildDashboard(oController,oLayout);
    	 
//    	 buildDrivePanel(oController,oLayout); 	       
    	 
  	     return oLayout;
      }

});


function buildBanner(oController,oLayout){
	
    
	 var oMlBanner = new sap.ui.commons.layout.MatrixLayout({width:"1920px"});
	 
	 var oRowBanner = new sap.ui.commons.layout.MatrixLayoutRow();
     var oCellPlayer = new sap.ui.commons.layout.MatrixLayoutCell();
     var oCellVehicle = new sap.ui.commons.layout.MatrixLayoutCell();
     var oCellPoints = new sap.ui.commons.layout.MatrixLayoutCell();
     var oCellStatus = new sap.ui.commons.layout.MatrixLayoutCell();
     var oCellHeartbeat = new sap.ui.commons.layout.MatrixLayoutCell();
    
     
     var oLblPlayer = new sap.ui.commons.Label("lblPlayer");
     oLblPlayer.setText("Player");
     oLblPlayer.setDesign(sap.ui.commons.LabelDesign.Bold);     
     var oTvPlayer = new sap.ui.commons.TextView();
     oTvPlayer.setText("  JP");

     
     var oLblVehicle = new sap.ui.commons.Label("lblVehicle");
     oLblVehicle.setText("Vehicle");
     oLblVehicle.setDesign(sap.ui.commons.LabelDesign.Bold);
     var oTvVehicle = new sap.ui.commons.TextView();
     oTvVehicle.setText("  Slice of Life");

     
     var oLblPoints = new sap.ui.commons.Label("lblPoints");
     oLblPoints.setText("Points");
     oLblPoints.setDesign(sap.ui.commons.LabelDesign.Bold);
     var oTvPoints = new sap.ui.commons.TextView();
     oTvPoints.setText("  1000");

     
     
     var oLblStatus = new sap.ui.commons.Label("lblStatus");
     oLblStatus.setText("Status");
     oLblStatus.setDesign(sap.ui.commons.LabelDesign.Bold);     
     var oTvStatus = new sap.ui.commons.TextView();
     oTvStatus.setText("  Online");
     

     var oLblHeartbeat = new sap.ui.commons.Label("lblHeartbeat");
     oLblHeartbeat.setText("Heartbeat");
     oLblHeartbeat.setDesign(sap.ui.commons.LabelDesign.Bold);
     var oTvHeartbeat = new sap.ui.commons.TextView();
     oTvHeartbeat.setText("  Healthy");

     
     oCellPlayer.addContent(oLblPlayer);
     oCellPlayer.addContent(oTvPlayer);
     
     
     oCellVehicle.addContent(oLblVehicle);
     oCellVehicle.addContent(oTvVehicle);
     
     
     oCellPoints.addContent(oLblPoints); 
     oCellPoints.addContent(oTvPoints);
     
     
     oCellStatus.addContent(oLblStatus); 
     oCellStatus.addContent(oTvStatus);
     
     
     oCellHeartbeat.addContent(oLblHeartbeat);
     oCellHeartbeat.addContent(oTvHeartbeat);
     
     var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 1});
     oCell.addContent(new sap.ui.commons.HorizontalDivider());
     
     oLayout.createRow(oCell);
     
     oRowBanner.addCell(oCellPlayer);
     oRowBanner.addCell(oCellVehicle); 
     oRowBanner.addCell(oCellPoints); 
     oRowBanner.addCell(oCellStatus); 
     oRowBanner.addCell(oCellHeartbeat);
     oMlBanner.addRow(oRowBanner);
     oLayout.createRow(oMlBanner);    
	
}

function buildCamMap(oController,oLayout){
		
	var oMlCamMap = new sap.ui.commons.layout.MatrixLayout({width:"1650px"});
	 
	var oRowCamMap = new sap.ui.commons.layout.MatrixLayoutRow();
	var oRowArt = new sap.ui.commons.layout.MatrixLayoutRow();
    var oCellCam = new sap.ui.commons.layout.MatrixLayoutCell();
    var oCellMap = new sap.ui.commons.layout.MatrixLayoutCell();
    var oCellArt = new sap.ui.commons.layout.MatrixLayoutCell();
    var oCellArtback = new sap.ui.commons.layout.MatrixLayoutCell();
    
    
	 var oHtmlRadioCamStream = new sap.ui.core.HTML({  
	      content: '<iframe id="myiframe" width="825px" height="625px" frameBorder="0">No frame loaded</iframe>',
	      preferDOM : true,   
	      afterRendering: function() {  
	          newSrc = 'radiocamstream.html';
	          
	          $("#myiframe").load(function() {  
	        	//  $("#myiframe").attr("height",960).attr("width",720);  
	          
	              
	          }).attr("src",newSrc);  
	          
	    }
	 });

	 oCellCam.addContent(oHtmlRadioCamStream);
	 
	
	 
	 var oHtmlMap = new sap.ui.core.HTML({  
         content : "<div id='map_canvas' style='width: 825px; height: 625px;'></div>"  
     });  

	 oCellMap.addContent(oHtmlMap);
	 
	 
	 
	 var oHtmlArt = new sap.ui.core.HTML({  
         content : "<div id='canvaswrapper'><canvas id='horizon' width='272' height='272'></canvas></div>"  
     });  

	 oCellArt.addContent(oHtmlArt);

	 var oHtmlArtback = new sap.ui.core.HTML({  
         content : "<div id='top' width='360px' height='360px'></div>"  
     });  

	 oCellArtback.addContent(oHtmlArtback);

    
    
    var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan: 1});
    oCell.addContent(new sap.ui.commons.HorizontalDivider());
    
    oLayout.createRow(oCell);
    
    oRowCamMap.addCell(oCellCam);
    oRowCamMap.addCell(oCellMap); 
    oRowArt.addCell(oCellArt);
    oRowArt.addCell(oCellArtback);
    oMlCamMap.addRow(oRowCamMap);
    oMlCamMap.addRow(oRowCamMap);
    oMlCamMap.addRow(oRowArt);
    oLayout.createRow(oMlCamMap);    
	
}


function buildDashboard(oController,oLayout){
	
    
	
   
    
    // Create a TabStrip instance
    var oTabStrip1 = new sap.ui.commons.TabStrip("TabStrip1");
    oTabStrip1.setWidth("825px");
    oTabStrip1.setHeight("300px");
    oTabStrip1.attachClose( function (oEvent) {
            var oTabStrip = oEvent.oSource;
            oTabStrip.closeTab(oEvent.getParameter("index"));
    });

    
    var oLayout1 = new sap.ui.commons.layout.MatrixLayout("Matrix1", {columns: 2, width: "100%"});
    oLayout1.setWidths(['150px']);
    
    // 1. tab: general data (use createTab)
    var oTvCompassHeading = new sap.ui.commons.TextView("TvCompassHeading",{
		text : "0",
		tooltip : "Compass Heading" }
	);
    
    oLabel = new sap.ui.commons.Label("LblCompassHeading", {text: 'Compass Heading', labelFor: oTvCompassHeading});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout1.createRow(oLabel, oTvCompassHeading);
        

	
    var oTvInsAccelX = new sap.ui.commons.TextView("TvInsAccelX",{
		text : "0",
		tooltip : "Accel X" }
	);
    
    oLabel = new sap.ui.commons.Label("LblInsAccelX", {text: 'Accel X', labelFor: oTvInsAccelX});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout1.createRow(oLabel, oTvInsAccelX);

    var oTvInsAccelY = new sap.ui.commons.TextView("TvInsAccelY",{
		text : "0",
		tooltip : "Accel Y" }
	);
    
    oLabel = new sap.ui.commons.Label("LblInsAccelY", {text: 'Accel Y', labelFor: oTvInsAccelY});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout1.createRow(oLabel, oTvInsAccelY);

    var oTvInsAccelZ = new sap.ui.commons.TextView("TvInsAccelZ",{
		text : "0",
		tooltip : "Accel Z" }
	);
    
    oLabel = new sap.ui.commons.Label("LblInsAccelZ", {text: 'Accel Z', labelFor: oTvInsAccelZ});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout1.createRow(oLabel, oTvInsAccelZ);


    var oTvInsGyroX = new sap.ui.commons.TextView("TvInsGyroX",{
		text : "0",
		tooltip : "Gyro X" }
	);
    
    oLabel = new sap.ui.commons.Label("LblInsGyroX", {text: 'Gyro X', labelFor: oTvInsAccelX});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout1.createRow(oLabel, oTvInsGyroX);

    var oTvInsGyroY = new sap.ui.commons.TextView("TvInsGyroY",{
		text : "0",
		tooltip : "Gyro Y" }
	);
    
    oLabel = new sap.ui.commons.Label("LblInsGyroY", {text: 'Gyro Y', labelFor: oTvInsGyroY});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout1.createRow(oLabel, oTvInsGyroY);

    var oTvInsGyroZ = new sap.ui.commons.TextView("TvInsGyroZ",{
		text : "0",
		tooltip : "Gyro Z" }
	);
    
    oLabel = new sap.ui.commons.Label("LblInsGyroZ", {text: 'Gyro Z', labelFor: oTvInsGyroZ});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout1.createRow(oLabel, oTvInsGyroZ);

    
   
    
    oTabStrip1.createTab("Quick",oLayout1);

    
    
    // 2. tab: address data (use separate tab element)
    oTab2 = new sap.ui.commons.Tab("tab2");
    oTab2.setTooltip("Telemetry");
    oTab2.setTitle(new sap.ui.commons.Title("TitleTelemetry",{text:"Telemetry"}));

    var oLayout2 = new sap.ui.commons.layout.MatrixLayout("Matrix2", {columns: 2, width: "100%"});
    oLayout2.setWidths(['150px']);

    var oTvGpsNavSolFixType = new sap.ui.commons.TextView("TvGpsNavSolFixType",{
		text : "0",
		tooltip : "Nav Sol Fix Type" }
	);
    
    oLabel = new sap.ui.commons.Label("Label-fixtype", {text: 'Fix Type', labelFor: oTvGpsNavSolFixType});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavSolFixType);
    

    
    
    
    
    var oTvGpsNavSolNumberSv = new sap.ui.commons.TextView("TvGpsNavSolNumberSv",{
		text : "0",
		tooltip : "Nav Sol Number Sv" }
	);
    oLabel = new sap.ui.commons.Label("Label-numbersv", {text: 'Satellites', labelFor: oTvGpsNavSolFixType});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavSolNumberSv);
    
    
    
    var oTvGpsNavPosllhLongitude = new sap.ui.commons.TextView("TvGpsNavPosllhLongitude",{
		text : "0",
		tooltip : "Nav Posllh Longitude" }
	);
    oLabel = new sap.ui.commons.Label("Label-longitude", {text: 'Longitude', labelFor: oTvGpsNavPosllhLongitude});
    oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavPosllhLongitude);
    

	var oTvGpsNavPosllhLattitude = new sap.ui.commons.TextView("TvGpsNavPosllhLattitude",{
		text : "0",
		tooltip : "Nav Posllh Lattitude" }
	);
	oLabel = new sap.ui.commons.Label("Label-lattitude", {text: 'Lattitude', labelFor: oTvGpsNavPosllhLattitude});
	oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavPosllhLattitude);
    
    

	var oTvGpsNavPosllhHeight = new sap.ui.commons.TextView("TvGpsNavPosllhHeight",{
		text : "0",
		tooltip : "Nav Posllh height" }
	);
	oLabel = new sap.ui.commons.Label("Label-height", {text: 'Height', labelFor: oTvGpsNavPosllhHeight});
	oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavPosllhHeight);
    
	
	var oTvGpsNavVelnedNorthVelCms = new sap.ui.commons.TextView("TvGpsNavVelnedNorthVelCms",{
		text : "0",
		tooltip : "Nav Velned North Velocity cm/s" }
	);
	oLabel = new sap.ui.commons.Label("Label-nvelocitycms", {text: 'North Velocity cm/s', labelFor: oTvGpsNavVelnedNorthVelCms});
	oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavVelnedNorthVelCms);
    
    
	var oTvGpsNavVelnedEastVelCms = new sap.ui.commons.TextView("TvGpsNavVelnedEastVelCms",{
		text : "0",
		tooltip : "Nav Velned East Velocity cm/s" }
	);
	oLabel = new sap.ui.commons.Label("Label-evelocitycms", {text: 'East Velocity cm/s', labelFor: oTvGpsNavVelnedEastVelCms});
	oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavVelnedEastVelCms);
    
    
	var oTvGpsNavVelnedDownVelCms = new sap.ui.commons.TextView("TvGpsNavVelnedDownVelCms",{
		text : "0",
		tooltip : "Nav Velned Down Velocity cm/s" }
	);
	oLabel = new sap.ui.commons.Label("Label-dvelocitycms", {text: 'Down Velocity cm/s', labelFor: oTvGpsNavVelnedDownVelCms});
	oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavVelnedDownVelCms);
    

	var oTvGpsNavVelnedSpeed3dCms = new sap.ui.commons.TextView("TvGpsNavVelnedSpeed3dCms",{
		text : "0",
		tooltip : "Nav Velned Speed 3D cm/s" }
	);
	oLabel = new sap.ui.commons.Label("Label-speed3dcms", {text: 'Speed 3D cm/s', labelFor: oTvGpsNavVelnedSpeed3dCms});
	oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavVelnedSpeed3dCms);
    
    
	var oTvGpsNavVelnedGroundSpeed2dCms = new sap.ui.commons.TextView("TvGpsNavVelnedGroundSpeed2dCms",{
		text : "0",
		tooltip : "Nav Velned Ground Speed 2D cm/s" }
	);
	oLabel = new sap.ui.commons.Label("Label-groundspeedcms", {text: 'Ground Speed cm/s', labelFor: oTvGpsNavVelnedGroundSpeed2dCms});
	oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavVelnedGroundSpeed2dCms);
    

	var oTvGpsNavVelnedHeading = new sap.ui.commons.TextView("TvGpsNavVelnedHeading",{
		text : "0",
		tooltip : "Nav Velned Heading" }
	);
	oLabel = new sap.ui.commons.Label("Label-heading", {text: 'Heading', labelFor: oTvGpsNavVelnedHeading});
	oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
    oLayout2.createRow(oLabel, oTvGpsNavVelnedHeading);
    
	
	oTab2.addContent(oLayout2);
    oTabStrip1.addTab(oTab2);
    oLayout.createRow(oTabStrip1);   
	
}






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
	oLyt = new sap.ui.commons.layout.MatrixLayout("matrix_hori", { width: "1200px" });
	oLyt1 = new sap.ui.commons.layout.MatrixLayout("matrix_hor1", { width: "800px" });
	
	
	
//	var oTvStatus = new sap.ui.commons.TextView("tvStatus",{
//		text : "Connecting....",
//		tooltip : "Status" }
//	);


	/////

	$().ready(window.initialize_map);

	
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

	 	 
};


