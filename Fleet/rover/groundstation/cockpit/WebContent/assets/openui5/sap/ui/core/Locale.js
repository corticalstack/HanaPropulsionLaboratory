/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.Locale");jQuery.sap.require("sap.ui.base.Object");(function(){var a=/^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?(-[0-9A-Z]{5,8}|(?:[0-9][0-9A-Z]{3}))*(?:-([0-9A-WYZ](?:-[0-9A-Z]{2,8})+))*(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;sap.ui.base.Object.extend("sap.ui.core.Locale",{constructor:function(l){sap.ui.base.Object.apply(this);var r=a.exec(l.replace(/_/g,"-"));this.sLocaleId=l;this.sLanguage=r[1]||null;this.sScript=r[2]||null;this.sRegion=r[3]||null;this.sVariant=(r[4]&&r[4].slice(1))||null;this.sExtension=r[5]||null;this.sPrivateUse=r[6]||null;if(this.sLanguage){this.sLanguage=this.sLanguage.toLowerCase()}if(this.sScript){this.sScript=this.sScript.toLowerCase().replace(/^[a-z]/,function($){return $.toUpperCase()})}if(this.sRegion){this.sRegion=this.sRegion.toUpperCase()}},getLanguage:function(){return this.sLanguage},getScript:function(){return this.sScript},getRegion:function(){return this.sRegion},getVariant:function(){return this.sVariant},getVariantSubtags:function(){return this.sVariant?this.sVariant.split('-'):[]},getExtension:function(){return this.sExtension},getExtensionSubtags:function(){return this.sExtension?this.sExtension.slice(2).split('-'):[]},getPrivateUse:function(){return this.sPrivateUse},getPrivateUseSubtags:function(){return this.sPrivateUse?this.sPrivateUse.slice(2).split('-'):[]},hasPrivateUseSubtag:function(s){return jQuery.inArray(s,this.getPrivateUseSubtags())>=0},toString:function(){var r=[this.sLanguage];if(this.sScript){r.push(this.sScript)}if(this.sRegion){r.push(this.sRegion)}if(this.sVariant){r.push(this.sVariant)}if(this.sExtension){r.push(this.sExtension)}if(this.sPrivateUse){r.push(this.sPrivateUse)}return r.join("-")},getSAPLogonLanguage:function(){var l=this.sLanguage||"",m;if(l.indexOf("-")>=0){l=l.slice(0,l.indexOf("-"))}l=M[l]||l;if(l==="zh"){if(this.sScript==="Hant"||(!this.sScript&&this.sRegion==="TW")){l="zf"}}if(this.sPrivateUse&&(m=/-(saptrc|sappsd)(?:-|$)/i.exec(this.sPrivateUse))){l=(m[1].toLowerCase()==="saptrc")?"1Q":"2Q"}return l.toUpperCase()}});var M={"iw":"he","ji":"yi","in":"id","sh":"sr"};var A="ar,fa,he".split(",");sap.ui.core.Locale._impliesRTL=function(l){var L=new sap.ui.core.Locale(l);l=L.getLanguage()||"";l=(l&&M[l])||l;var r=L.getRegion()||"";if(r&&jQuery.inArray(l+"_"+r,A)>=0){return true}return jQuery.inArray(l,A)>=0}}());
