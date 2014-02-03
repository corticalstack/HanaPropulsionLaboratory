/*
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.util.serializer.XMLViewSerializer");jQuery.sap.require("sap.ui.core.util.serializer.delegate.XML");jQuery.sap.require("sap.ui.base.EventProvider");jQuery.sap.require("sap.ui.thirdparty.vkbeautify");sap.ui.base.EventProvider.extend("sap.ui.core.util.serializer.XMLViewSerializer",{constructor:function(v,w,d,g,G){sap.ui.base.EventProvider.apply(this);this._oView=v;this._oWindow=w;this._sDefaultNamespace=d;this._fnGetControlId=g;this._fnGetEventHandlerName=G}});
sap.ui.core.util.serializer.XMLViewSerializer.prototype.serialize=function(){var p=[];var m=function(C,P){if(!P){var t=(C)?C.constructor:"?";throw Error("Controls with empty package are currently not supported by the XML serializer: "+t)}if(jQuery.inArray(P,p)===-1){p.push(P)}};var s=function(C){return(C instanceof this._oWindow.sap.ui.core.mvc.View)};var c=new sap.ui.core.util.serializer.Serializer(this._oView,new sap.ui.core.util.serializer.delegate.XML(this._sDefaultNamespace,this._fnGetControlId,this._fnGetEventHandlerName,m),true,this._oWindow,s);var r=c.serialize();var v=[];v.push('<sap.ui.core:View');if(this._oView.getControllerName()){v.push(' controllerName="'+this._oView.getControllerName()+'"')}if(jQuery.inArray('sap.ui.core',p)===-1){p.push('sap.ui.core')}for(var i=0;i<p.length;i++){if(this._sDefaultNamespace&&this._sDefaultNamespace===p[i]){v.push(' xmlns="'+p[i]+'"')}else{v.push(' xmlns:'+p[i]+'="'+p[i]+'"')}}v.push(" >");v.push(r);v.push("</sap.ui.core:View>");return vkbeautify.xml(v.join(""))};
