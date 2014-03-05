sap.ui.jsview("orbital_ui_resources.orbital", {
	
      getControllerName : function() {
         return "orbital_ui_resources.orbital";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();

    	 buildOrbital(oController,oLayout);    	 
  	     return oLayout;
      }

});


function buildOrbital(oController,oLayout){
	var omlStats = new sap.ui.commons.layout.MatrixLayout({
		   id : "mlOrbital",
		   columns: 2,
		   width:"100%"
	});
	
	
    //Average Speed
    var otvStatSpeedAvgCms = new sap.ui.commons.TextView("tvStatSpeedAvgCms",{
		text : ""}
    );
    olblStatSpeedAvgCms = new sap.ui.commons.Label("lblStatSpeedAvgCms", {text: 'Avg Speed CMS', labelFor: otvStatSpeedAvgCms});
    olblStatSpeedAvgCms.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatSpeedAvgCms, otvStatSpeedAvgCms);

    
    var otvStatSpeedAvgKph = new sap.ui.commons.TextView("tvStatSpeedAvgKph",{
		text : ""}
    );
    olblStatSpeedAvgKph = new sap.ui.commons.Label("lblStatSpeedAvgKph", {text: 'Avg Speed Kph', labelFor: otvStatSpeedAvgKph});
    olblStatSpeedAvgKph.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatSpeedAvgKph, otvStatSpeedAvgKph);

    
    var otvStatSpeedAvgMph = new sap.ui.commons.TextView("tvStatSpeedAvgMph",{
		text : ""}
    );
    olblStatSpeedAvgMph = new sap.ui.commons.Label("lblStatSpeedAvgMph", {text: 'Avg Speed MPH', labelFor: otvStatSpeedAvgMph});
    olblStatSpeedAvgMph.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatSpeedAvgMph, otvStatSpeedAvgMph);

    
    //Max Speed
    var otvStatSpeedMaxCms = new sap.ui.commons.TextView("tvStatSpeedMaxCms",{
		text : ""}
    );
    olblStatSpeedMaxCms = new sap.ui.commons.Label("lblStatSpeedMaxCms", {text: 'Max Speed CMS', labelFor: otvStatSpeedMaxCms});
    olblStatSpeedMaxCms.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatSpeedMaxCms, otvStatSpeedMaxCms);


    var otvStatSpeedMaxKph = new sap.ui.commons.TextView("tvStatSpeedMaxKph",{
		text : ""}
    );
    olblStatSpeedMaxKph = new sap.ui.commons.Label("lblStatSpeedMaxKph", {text: 'Max Speed KPH', labelFor: otvStatSpeedMaxKph});
    olblStatSpeedMaxKph.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatSpeedMaxKph, otvStatSpeedMaxKph);

    var otvStatSpeedMaxMph = new sap.ui.commons.TextView("tvStatSpeedMaxMph",{
		text : ""}
    );
    olblStatSpeedMaxMph = new sap.ui.commons.Label("lblStatSpeedMaxMph", {text: 'Max Speed MPH', labelFor: otvStatSpeedMaxMph});
    olblStatSpeedMaxMph.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatSpeedMaxMph, otvStatSpeedMaxMph);

    
    //Minimum Altitude
    var otvStatAltMinM = new sap.ui.commons.TextView("tvStatAltMinM",{
		text : ""}
    );
    olblStatAltMinM = new sap.ui.commons.Label("lblStatAltMinM", {text: 'Min Alt M', labelFor: otvStatAltMinM});
    olblStatAltMinM.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatAltMinM, otvStatAltMinM);

    var otvStatAltMinFt = new sap.ui.commons.TextView("tvStatAltMinFt",{
		text : ""}
    );
    olblStatAltMinFt = new sap.ui.commons.Label("lblStatAltMinFt", {text: 'Min Alt M', labelFor: otvStatAltMinFt});
    olblStatAltMinFt.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatAltMinFt, otvStatAltMinFt);

    
    //Maximum Altitude
    var otvStatAltMaxM = new sap.ui.commons.TextView("tvStatAltMaxM",{
		text : ""}
    );
    olblStatAltMaxM = new sap.ui.commons.Label("lblStatAltMaxM", {text: 'Max AltM', labelFor: otvStatAltMaxM});
    olblStatAltMaxM.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatAltMaxM, otvStatAltMaxM);

    var otvStatAltMaxFt = new sap.ui.commons.TextView("tvStatAltMaxFt",{
		text : ""}
    );
    olblStatAltMaxFt = new sap.ui.commons.Label("lblStatAltMaxFt", {text: 'Max Alt Ft', labelFor: otvStatAltMaxFt});
    olblStatAltMaxFt.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatAltMaxFt, otvStatAltMaxFt);

    
    //Average Altitude
    var otvStatAltAvgM = new sap.ui.commons.TextView("tvStatAltAvgM",{
		text : ""}
    );
    olblStatAltAvgM = new sap.ui.commons.Label("lblStatAltAvgM", {text: 'Avg Alt M', labelFor: otvStatAltAvgM});
    olblStatAltAvgM.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatAltAvgM, otvStatAltAvgM);

    var otvStatAltAvgFt = new sap.ui.commons.TextView("tvStatAltAvgFt",{
		text : ""}
    );
    olblStatAltAvgFt = new sap.ui.commons.Label("lblStatAltAvgFt", {text: 'Avg Alt Ft', labelFor: otvStatAltAvgFt});
    olblStatAltAvgFt.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatAltAvgFt, otvStatAltAvgFt);

        
    //Distance Travelled
    var otvStatTravelledM = new sap.ui.commons.TextView("tvStatTravelledM",{
		text : ""}
    );
    olblStatTravelledM = new sap.ui.commons.Label("lblStatTravelledM", {text: 'Travelled M', labelFor: otvStatTravelledM});
    olblStatTravelledM.setDesign(sap.ui.commons.LabelDesign.Bold);
    omlStats.createRow(olblStatTravelledM, otvStatTravelledM);
    
    oLayout.createRow(omlStats);    	
    
    
}








