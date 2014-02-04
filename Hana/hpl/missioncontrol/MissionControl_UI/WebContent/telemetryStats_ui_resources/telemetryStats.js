jQuery.sap.require("jquery.sap.resources");
var sLocale 							= sap.ui.getCore().getConfiguration().getLanguage();
var oBundle 							= jQuery.sap.resources({url : "./assets/i18n/messagebundle.hdbtextbundle", locale: sLocale});
var oBarModel 							= new sap.ui.model.json.JSONModel();

