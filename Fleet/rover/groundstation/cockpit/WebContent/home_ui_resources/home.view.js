sap.ui.jsview("home_ui_resources.home", {
	
      getControllerName : function() {
         return "home_ui_resources.home";
      },

      createContent : function(oController) {
    	 var oLayout = new sap.ui.commons.layout.MatrixLayout();
   	 
    	 buildHome(oController,oLayout);
  	     return oLayout;
      }

});



function buildHome(oController,oLayout){	
	myHplApp.model.setLayoutHomeContent(myHplApp.model.getConfigMainmenuView());
	oLayout.createRow(myHplApp.model.getLayoutHomeContent());    
}





