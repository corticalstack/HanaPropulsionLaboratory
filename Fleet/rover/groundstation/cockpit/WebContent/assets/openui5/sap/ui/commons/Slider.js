/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.Slider");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.Slider",{metadata:{library:"sap.ui.commons",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"min":{type:"float",group:"Appearance",defaultValue:0},"max":{type:"float",group:"Appearance",defaultValue:100},"value":{type:"float",group:"Appearance",defaultValue:50},"smallStepWidth":{type:"float",group:"Appearance",defaultValue:null},"totalUnits":{type:"int",group:"Appearance",defaultValue:null},"stepLabels":{type:"boolean",group:"Appearance",defaultValue:false},"visible":{type:"boolean",group:"",defaultValue:true},"editable":{type:"boolean",group:"Behavior",defaultValue:true},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"labels":{type:"string[]",group:"Misc",defaultValue:null},"vertical":{type:"boolean",group:"Appearance",defaultValue:false},"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}},associations:{"ariaDescribedBy":{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},"ariaLabelledBy":{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{"change":{},"liveChange":{}}}});sap.ui.commons.Slider.M_EVENTS={'change':'change','liveChange':'liveChange'};jQuery.sap.require("sap.ui.core.ResizeHandler");jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.ui.commons.Slider.prototype);
sap.ui.commons.Slider.prototype.exit=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};
sap.ui.commons.Slider.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};
sap.ui.commons.Slider.prototype.onAfterRendering=function(){if(this.getMin()>=this.getMax()){jQuery.sap.log.warning('Property wrong: Min:'+this.getMin()+' > Max:'+this.getMax())}this.oGrip=jQuery.sap.domById(this.getId()+'-grip');this.oBar=jQuery.sap.domById(this.getId()+'-bar');this.oHiLi=jQuery.sap.domById(this.getId()+'-hili');this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this.bAcc=sap.ui.getCore().getConfiguration().getAccessibility();this.bTextLabels=(this.getLabels()&&this.getLabels().length>0);this.oMovingGrip=this.oGrip;var n=this.getValue();if(n>=this.getMax()){n=this.getMax()}else if(n<=this.getMin()){n=this.getMin()}if(this.bTextLabels&&(this.getLabels().length-1)!=this.getTotalUnits()){jQuery.sap.log.warning('label count should be one more than total units','sap.ui.commons.Slider')}this.iDecimalFactor=this.calcDecimalFactor(this.getSmallStepWidth());this.iShiftGrip=Math.round(this.getOffsetWidth(this.oGrip)/2);var N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl||this.getVertical()){N=this.getBarWidth()-N}this.changeGrip(n,N,this.oGrip);this.repositionTicksAndLabels();this.allowTextSelection(false);this.oDomRef=this.getDomRef();this.sResizeListenerId=sap.ui.core.ResizeHandler.register(this.oDomRef,jQuery.proxy(this.onresize,this))};
sap.ui.commons.Slider.prototype.onclick=function(e){var m=this.oMovingGrip;if(this.getEditable()&&this.getEnabled()){var M;var s=e.target.getAttribute('ID');var n=this.getValue();var N=this.getOffsetLeft(this.oGrip)+this.iShiftGrip;switch(s){case(this.oBar.id):case(this.oHiLi.id):if(this.getVertical()){M=this.getBarWidth()-this.getOffsetX(e)}else{M=this.getOffsetX(e)}if(s==this.oHiLi.id){if(this.getVertical()){M-=this.getOffsetLeft(this.oHiLi)}else{M+=this.getOffsetLeft(this.oHiLi)}}n=this.convertRtlValue(this.getMin()+(((this.getMax()-this.getMin())/this.getBarWidth())*M));N=this.getOffsetX(e);if(s==this.oHiLi.id){N+=this.getOffsetLeft(this.oHiLi)}if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget}else if(this.targetIsGrip(s)){m=e.target}else{m=this.getNearestGrip(N)}break;case(this.getId()+'-left'):N=0;if(this.getVertical()){n=this.getMax();m=this.getRightGrip()}else{n=this.getMin();m=this.getLeftGrip()}break;case(this.getId()+'-right'):N=this.getBarWidth();if(!this.getVertical()){n=this.getMax();m=this.getRightGrip()}else{n=this.getMin();m=this.getLeftGrip()}break;default:if(this.targetIsGrip(s)){return}var t=s.search('-tick');if(t>=0){var T=parseInt(s.slice(this.getId().length+5),10);N=this.fTickDist*T;var i;if(this.bTextLabels){i=this.getLabels().length-1}else{i=this.getTotalUnits()}n=this.convertRtlValue(this.getMin()+(((this.getMax()-this.getMin())/i)*T));if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget}else if(this.targetIsGrip(s)){m=e.target}else{m=this.getNearestGrip(N)}break}var o=jQuery(this.oBar).offset();var O=jQuery(e.target).offset();if(this.getVertical()){N=this.getOffsetX(e)-(o.top-O.top)}else{N=this.getOffsetX(e)-(o.left-O.left)}if(N<=0){N=0;if(this.getVertical()){n=this.getMax()}else{n=this.getMin()}}else{if(N>=this.getBarWidth()){N=this.getBarWidth();if(this.getVertical()){n=this.getMin()}else{n=this.getMax()}}else{if(this.getVertical()){M=this.getBarWidth()-N}else{M=N}n=this.getMin()+(((this.getMax()-this.getMin())/this.getBarWidth())*M)}}n=this.convertRtlValue(n);if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget}else if(this.targetIsGrip(s)){m=e.target}else{m=this.getNearestGrip(N)}break}var v=this.validateNewPosition(n,N,m,(this.getValueForGrip(m)>n));n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,m);this.handleFireChange()}m.focus();this.oMovingGrip=m;this.oStartTarget=null};
sap.ui.commons.Slider.prototype.onmousedown=function(e){if(this.getEditable()&&this.getEnabled()){var m=e.target.getAttribute('ID');if(this.targetIsGrip(m)){this.bGripMousedown=true;this.iStartDragX=e.pageX;this.iStartDragY=e.pageY;this.iStartLeft=this.getOffsetLeft(e.target)+this.iShiftGrip;this.oMovingGrip=e.target;var t=this;this.handleMoveCall=function(a){t.handleMove(a)};this.preventSelect=function(a){return false};jQuery(window.document).bind('mousemove',this.handleMoveCall);jQuery(window.document).bind('selectstart',this.preventSelect);jQuery.sap.bindAnyEvent(jQuery.proxy(this.onAnyEvent,this))}this.oStartTarget=null}};
sap.ui.commons.Slider.prototype.onmouseup=function(e){if(this.getEditable()&&this.getEnabled()){this.bGripMousedown=false;if(this.handleMoveCall){jQuery(window.document).unbind('mousemove',this.handleMoveCall);jQuery(window.document).unbind('selectstart',this.preventSelect);jQuery.sap.unbindAnyEvent(this.onAnyEvent);if(this.iStartLeft!=(this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip)){this.handleFireChangeWithoutLive()}this.handleMoveCall=null;this.iStartDragX=null;this.iStartDragY=null;this.iStartLeft=null}}};
sap.ui.commons.Slider.prototype.handleMove=function(e){if(this.getEditable()&&this.getEnabled()&&this.bGripMousedown){e=e||window.event;var n;if(this.getVertical()){n=this.iStartLeft+e.pageY-this.iStartDragY}else{n=this.iStartLeft+e.pageX-this.iStartDragX}if(n<=0){n=0;if(this.getVertical()){var N=this.getMax()}else{var N=this.getMin()}}else{if(n>=this.getBarWidth()){n=this.getBarWidth();if(this.getVertical()){var N=this.getMin()}else{var N=this.getMax()}}else{if(this.getVertical()){var m=this.getBarWidth()-n}else{var m=n}var N=this.getMin()+(((this.getMax()-this.getMin())/this.getBarWidth())*m)}}N=this.convertRtlValue(N);var o=this.getValueForGrip(this.oMovingGrip);var v=this.validateNewPosition(N,n,this.oMovingGrip,(o>N));N=v.fNewValue;n=v.iNewPos;this.changeGrip(N,n,this.oMovingGrip);N=this.getValueForGrip(this.oMovingGrip);this.fireLiveChangeForGrip(this.oMovingGrip,N,o);this.oStartTarget=this.oMovingGrip}e.cancelBubble=true;return false};
sap.ui.commons.Slider.prototype.fireLiveChangeForGrip=function(g,n,o){if(g==this.oGrip){if(o!=n){this.fireLiveChange({value:n})}}};
sap.ui.commons.Slider.prototype.onAnyEvent=function(e){jQuery.sap.log.info('onAnyEvent fired: "'+e.type+'"');if((!this.getEditable())||(!this.getEnabled())||!this.bGripMousedown){return}var s=e.target;if((!jQuery.sap.containsOrEquals(this.oDomRef,s)||s.tagName=="BODY")&&e.type=='mouseup'){this.onmouseup(e)}};
sap.ui.commons.Slider.prototype.onsapright=function(e){if(this.getEditable()&&this.getEnabled()){var n=this.convertRtlValue(this.getValueForGrip(this.oMovingGrip));var N=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip;if(this.getSmallStepWidth()>0){var s=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(s>1){n=n+this.getSmallStepWidth();if(this.getVertical()){N=N-s}else{N=N+s}}else{n=n+(1/s*this.getSmallStepWidth());if(this.getVertical()){N=N-1}else{N=N+1}}}else{n=n+((this.getMax()-this.getMin())/this.getBarWidth());if(this.getVertical()){N=N-1}else{N=N+1}}n=this.convertRtlValue(n);var v=this.validateNewPosition(n,N,this.oMovingGrip,!this.getVertical()&&this.bRtl);n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange()}e.preventDefault();e.stopPropagation()};
sap.ui.commons.Slider.prototype.onsapleft=function(e){if(this.getEditable()&&this.getEnabled()){var n=this.convertRtlValue(this.getValueForGrip(this.oMovingGrip));var N=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip;if(this.getSmallStepWidth()>0){var s=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(s>1){n=n-this.getSmallStepWidth();if(this.getVertical()){N=N+s}else{N=N-s}}else{n=n-(1/s*this.getSmallStepWidth());if(this.getVertical()){N=N+1}else{N=N-1}}}else{n=n-((this.getMax()-this.getMin())/this.getBarWidth());if(this.getVertical()){N=N+1}else{N=N-1}}n=this.convertRtlValue(n);var v=this.validateNewPosition(n,N,this.oMovingGrip,this.getVertical()||!this.bRtl);n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange()}e.preventDefault();e.stopPropagation()};
sap.ui.commons.Slider.prototype.onsapup=function(e){if(this.bRtl&&!this.getVertical()){this.onsapleft(e)}else{this.onsapright(e)}};
sap.ui.commons.Slider.prototype.onsapdown=function(e){if(this.bRtl&&!this.getVertical()){this.onsapright(e)}else{this.onsapleft(e)}};
sap.ui.commons.Slider.prototype.onsapexpand=function(e){if(!this.bRtl){this.onsapright(e)}else{this.onsapleft(e)}};
sap.ui.commons.Slider.prototype.onsapcollapse=function(e){if(!this.bRtl){this.onsapleft(e)}else{this.onsapright(e)}};
sap.ui.commons.Slider.prototype.onsaphome=function(e){if(this.getEditable()&&this.getEnabled()){this.setValue(this.getMin());this.handleFireChange()}e.preventDefault();e.stopPropagation()};
sap.ui.commons.Slider.prototype.onsapend=function(e){if(this.getEditable()&&this.getEnabled()){this.setValue(this.getMax());this.handleFireChange()}e.preventDefault();e.stopPropagation()};
sap.ui.commons.Slider.prototype.onsaprightmodifiers=function(e){if(this.getEditable()&&this.getEnabled()){if(!this.fPageSize){if(this.getTotalUnits()>0){this.fPageSize=(this.getMax()-this.getMin())/this.getTotalUnits()}else{this.fPageSize=(this.getMax()-this.getMin())/10}}if(!this.bRtl||this.getVertical()){var n=this.getValueForGrip(this.oMovingGrip)+this.fPageSize}else{var n=this.getValueForGrip(this.oMovingGrip)-this.fPageSize}var N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N}if(this.getVertical()){if(N>this.getBarWidth())N=this.getBarWidth();N=this.getBarWidth()-N}var v=this.validateNewPosition(n,N,this.oMovingGrip,!this.getVertical()&&this.bRtl);n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange()}e.preventDefault();e.stopPropagation()};
sap.ui.commons.Slider.prototype.onsapleftmodifiers=function(e){if(this.getEditable()&&this.getEnabled()){if(!this.fPageSize){if(this.getTotalUnits()>0){this.fPageSize=(this.getMax()-this.getMin())/this.getTotalUnits()}else{this.fPageSize=(this.getMax()-this.getMin())/10}}if(!this.bRtl||this.getVertical()){var n=this.getValueForGrip(this.oMovingGrip)-this.fPageSize}else{var n=this.getValueForGrip(this.oMovingGrip)+this.fPageSize}var N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N}if(this.getVertical()){if(N<0)N=0;N=this.getBarWidth()-N}var v=this.validateNewPosition(n,N,this.oMovingGrip,this.getVertical()||!this.bRtl);n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange()}e.preventDefault();e.stopPropagation()};
sap.ui.commons.Slider.prototype.onsapdownmodifiers=function(e){if(this.bRtl&&!this.getVertical()){this.onsaprightmodifiers(e)}else{this.onsapleftmodifiers(e)}};
sap.ui.commons.Slider.prototype.onsapupmodifiers=function(e){if(this.bRtl&&!this.getVertical()){this.onsapleftmodifiers(e)}else{this.onsaprightmodifiers(e)}};
sap.ui.commons.Slider.prototype.onresize=function(e){if(!this.getDomRef()){if(this.sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this.sResizeListenerId);this.sResizeListenerId=null}return}var n=this.getValue();var N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.getVertical()||this.bRtl){N=this.getBarWidth()-N}this.changeGrip(n,N,this.oGrip);this.repositionTicksAndLabels()};
sap.ui.commons.Slider.prototype.repositionTicksAndLabels=function(){var t;if(this.bTextLabels){t=this.getLabels().length-1}else{t=this.getTotalUnits()}if(t>0){var T=null;var o=null;this.fTickDist=this.getBarWidth()/t;for(var i=0;i<=t;i++){T=jQuery.sap.domById(this.getId()+'-tick'+i);if(!this.bRtl||this.getVertical()){var l=Math.round(this.fTickDist*i)-Math.ceil(this.getOffsetWidth(T)/2)}else{var l=Math.round(this.fTickDist*i)-Math.floor(this.getOffsetWidth(T)/2)}if(this.getVertical()){l=this.getBarWidth()-l-this.getOffsetWidth(T)}this.setLeft(l,T);if(this.getStepLabels()&&i>0&&i<t){o=jQuery.sap.domById(this.getId()+'-text'+i);if(this.getSmallStepWidth()>0&&this.iDecimalFactor>0&&!this.bTextLabels){jQuery(o).text(Math.round(parseFloat(jQuery(o).text())*this.iDecimalFactor)/this.iDecimalFactor)}var l;if(!this.bRtl||this.getVertical()){l=Math.round((this.fTickDist*i))-Math.round((this.getOffsetWidth(o)/2))}else{l=Math.round((this.fTickDist*(t-i)))-Math.round((this.getOffsetWidth(o)/2))}if(this.getVertical()){l=this.getBarWidth()-l-this.getOffsetWidth(o)}this.setLeft(l,o)}}}};
sap.ui.commons.Slider.prototype.onThemeChanged=function(e){if(this.getDomRef()){this.iShiftGrip=Math.round(this.getOffsetWidth(this.oGrip)/2);this.onresize()}};
sap.ui.commons.Slider.prototype.changeGrip=function(n,N,g){if(N!=(this.getOffsetLeft(g)+this.iShiftGrip)){if(this.getSmallStepWidth()>0){var s=parseInt((n-this.getMin())/this.getSmallStepWidth(),10);var l=(s*this.getSmallStepWidth())+this.getMin();var r=((s+1)*this.getSmallStepWidth())+this.getMin();if(r>this.getMax()){r=this.getMax()}var S=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if((n-l)<(r-n)){n=l;N=s*S}else{n=r;N=(s+1)*S;if(N>this.getBarWidth()){N=this.getBarWidth()}}if(this.getVertical()||this.bRtl){N=this.getBarWidth()-N}n=Math.round(n*this.iDecimalFactor)/this.iDecimalFactor}var L=Math.round(N-this.iShiftGrip);if(isNaN(L))return;jQuery.sap.log.info("iNewPos: "+N+" - iLeft: "+L+" - iShiftGrip: "+this.iShiftGrip);this.updateValueProperty(n,g);if(this.bTextLabels){g.title=this.getNearestLabel(n)}else{g.title=n}this.setLeft(L,g);this.adjustHighlightBar(N,g);if(this.bAcc){this.setAriaState()}}};
sap.ui.commons.Slider.prototype.updateValueProperty=function(n,g){this.setProperty('value',n,true)};
sap.ui.commons.Slider.prototype.adjustHighlightBar=function(n,g){if(this.bRtl){if(this.getVertical()){this.oHiLi.style.height=this.getBarWidth()-Math.round(n)+'px'}else{this.oHiLi.style.width=this.getBarWidth()-Math.round(n)+'px'}}else{if(this.getVertical()){this.oHiLi.style.height=this.getBarWidth()-Math.round(n)+'px'}else{this.oHiLi.style.width=Math.round(n)+'px'}}};
sap.ui.commons.Slider.prototype.calcDecimalFactor=function(V){var f=1;if(!(V>0)){return f}var m=String(V);if(m.indexOf('.')>=0){var M=m.length-m.indexOf('.')-1}else{if(m.indexOf('e-')>=0){var M=m.slice(m.indexOf('e-')+2)}else{return f}}for(var i=1;i<=M;i++){f=f*10}return f};
sap.ui.commons.Slider.prototype.setEditable=function(e){this.setProperty('editable',e,true);if(this.oDomRef&&this.getEnabled()){if(e){jQuery(this.oDomRef).removeClass('sapUiSliRo').addClass('sapUiSliStd');if(this.bAcc){jQuery(this.oGrip).attr('aria-disabled',false)}}else{jQuery(this.oDomRef).removeClass('sapUiSliStd').addClass('sapUiSliRo');if(this.bAcc){jQuery(this.oGrip).attr('aria-disabled',true)}}}return this};
sap.ui.commons.Slider.prototype.setEnabled=function(e){this.setProperty('enabled',e,true);if(this.oDomRef){jQuery(this.oDomRef).toggleClass('sapUiSliDsbl',!e);if(e){jQuery(this.oGrip).attr('tabindex','0');if(this.getEditable()){jQuery(this.oDomRef).addClass('sapUiSliStd');if(this.bAcc){jQuery(this.oGrip).attr('aria-disabled',false)}}else{jQuery(this.oDomRef).addClass('sapUiSliRo');if(this.bAcc){jQuery(this.oGrip).attr('aria-disabled',true)}}}else{jQuery(this.oGrip).attr('tabindex','-1').attr('aria-disabled',true);if(this.getEditable()){jQuery(this.oDomRef).removeClass('sapUiSliStd')}else{jQuery(this.oDomRef).removeClass('sapUiSliRo')}}}return this};
sap.ui.commons.Slider.prototype.setTotalUnits=function(t){this.setProperty('totalUnits',t,false);this.fPageSize=false;return this};
sap.ui.commons.Slider.prototype.setValue=function(v){this.setProperty('value',v,true);if(isNaN(v)){return this}if(!this.oBar){return this}var n=parseFloat(v);var N;if(n>=this.getMax()){n=this.getMax();if(this.getVertical()){N=0}else{N=this.getBarWidth()}}else if(n<=this.getMin()){n=this.getMin();if(this.getVertical()){N=this.getBarWidth()}else{N=0}}else{N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth()}if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N}this.changeGrip(n,N,this.oGrip);return this};
sap.ui.commons.Slider.prototype.handleFireChangeWithoutLive=function(){this.fireChange({value:this.getValue()})};
sap.ui.commons.Slider.prototype.handleFireChange=function(){var v=this.getValue();if(v!==this._lastValue){this.fireChange({value:v});this.fireLiveChange({value:v});this._lastValue=v}};
sap.ui.commons.Slider.prototype.setAriaState=function(){var v=this.getValue();if(this.bTextLabels){v=this.getNearestLabel(v)}this.oGrip.setAttribute('aria-valuenow',v);this.oGrip.setAttribute('aria-valuetext','Value '+v)};
sap.ui.commons.Slider.prototype.getValueForGrip=function(g){return this.getValue()};
sap.ui.commons.Slider.prototype.validateNewPosition=function(n,N,g,m){if(!this.bRtl||this.getVertical()){if(m){if(n<=this.getMin()||N<=0){n=this.getMin();if(this.getVertical()){N=this.getBarWidth()}else{N=0}}}else{if(n>=this.getMax()||N>this.getBarWidth()){n=this.getMax();if(!this.getVertical()){N=this.getBarWidth()}else{N=0}}}}else{if(m){if(n<=this.getMin()||N>this.getBarWidth()){n=this.getMin();N=this.getBarWidth()}}else{if(n>=this.getMax()||N<=0){n=this.getMax();N=0}}}return{fNewValue:n,iNewPos:N}};
sap.ui.commons.Slider.prototype.getNearestLabel=function(v){var p=Math.round((this.getLabels().length-1)/(this.getMax()-this.getMin())*(v-this.getMin()));if(this.bRtl){p=this.getLabels().length-1-p}return this.getLabels()[p]};
sap.ui.commons.Slider.prototype.getNearestGrip=function(o){return this.oGrip};
sap.ui.commons.Slider.prototype.getLeftGrip=function(){return this.oGrip};
sap.ui.commons.Slider.prototype.getRightGrip=function(){return this.oGrip};
sap.ui.commons.Slider.prototype.setLeft=function(n,o){if(o==undefined)return;if(this.getVertical()){o.style.top=n+'px'}else{o.style.left=n+'px'}};
sap.ui.commons.Slider.prototype.getOffsetWidth=function(o){if(this.getVertical()){return o.offsetHeight}else{return o.offsetWidth}};
sap.ui.commons.Slider.prototype.getBarWidth=function(){if(this.getVertical()){return this.oBar.clientHeight}else{return this.oBar.clientWidth}};
sap.ui.commons.Slider.prototype.getOffsetLeft=function(o){if(this.getVertical()){return o.offsetTop}else{return o.offsetLeft}};
sap.ui.commons.Slider.prototype.getOffsetX=function(e){if(this.getVertical()){return e.getOffsetY()}else{if(this.bRtl){return e.getOffsetX()}else{return e.getOffsetX()}}};
sap.ui.commons.Slider.prototype.convertRtlValue=function(n){if(this.bRtl&&!this.getVertical()){n=this.getMax()-n+this.getMin()}return n};
sap.ui.commons.Slider.prototype.targetIsGrip=function(m){if(m==this.oGrip.id){return true}return false};
sap.ui.commons.Slider.prototype.getFocusDomRef=function(){return this.oGrip};
sap.ui.commons.Slider.prototype.getIdForLabel=function(){return this.getId()+'-grip'};
