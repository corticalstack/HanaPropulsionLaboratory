jQuery.sap.require("jquery.sap.resources");
var sLocale 							= sap.ui.getCore().getConfiguration().getLanguage();
var oBundle 							= jQuery.sap.resources({url : "./i18n/messagebundle.hdbtextbundle", locale: sLocale});
var oBarModel 							= new sap.ui.model.json.JSONModel();

var viewCockpit = sap.ui.view({id:"viewCockpit", viewName:"cockpit_ui_resources.cockpit", type:sap.ui.core.mvc.ViewType.JS});

function onKeyPress() {
	console.log("Key pressed");
}

window.addEventListener( "keypress", onKeyPress, false );
