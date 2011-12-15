/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


window[esri._dojoScopeName||"dojo"]._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","dijit.form.ValidationTextBox"],["require","dojo.i18n"],["require","dijit.form.TextBox"],["require","dijit.Tooltip"],["requireLocalization","dijit.form","validate",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw","ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["dijit.form.ValidationTextBox"]){_4._hasResource["dijit.form.ValidationTextBox"]=true;_4.provide("dijit.form.ValidationTextBox");_4.require("dojo.i18n");_4.require("dijit.form.TextBox");_4.require("dijit.Tooltip");_4.declare("dijit.form.ValidationTextBox",_5.form.TextBox,{templateString:_4.cache("dijit.form","templates/ValidationTextBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\" waiRole=\"presentation\"\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&Chi; \" type=\"text\" tabIndex=\"-1\" readOnly waiRole=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\r\n\t\t\t${!nameAttrSetting} type='${type}'\r\n\t/></div\r\n></div>\r\n"),baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",constraints:{},regExp:".*",regExpGen:function(_7){return this.regExp;},state:"",tooltipPosition:[],_setValueAttr:function(){this.inherited(arguments);this.validate(this._focused);},validator:function(_8,_9){return (new RegExp("^(?:"+this.regExpGen(_9)+")"+(this.required?"":"?")+"$")).test(_8)&&(!this.required||!this._isEmpty(_8))&&(this._isEmpty(_8)||this.parse(_8,_9)!==undefined);},_isValidSubset:function(){return this.textbox.value.search(this._partialre)==0;},isValid:function(_a){return this.validator(this.textbox.value,this.constraints);},_isEmpty:function(_b){return /^\s*$/.test(_b);},getErrorMessage:function(_c){return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;},getPromptMessage:function(_d){return this.promptMessage;},_maskValidSubsetError:true,validate:function(_e){var _f="";var _10=this.disabled||this.isValid(_e);if(_10){this._maskValidSubsetError=true;}var _11=this._isEmpty(this.textbox.value);var _12=!_10&&!_11&&_e&&this._isValidSubset();this.state=((_10||((!this._hasBeenBlurred||_e)&&_11)||_12)&&this._maskValidSubsetError)?"":"Error";if(this.state=="Error"){this._maskValidSubsetError=_e;}this._setStateClass();_5.setWaiState(this.focusNode,"invalid",_10?"false":"true");if(_e){if(this.state=="Error"){_f=this.getErrorMessage(true);}else{_f=this.getPromptMessage(true);}this._maskValidSubsetError=true;}this.displayMessage(_f);return _10;},_message:"",displayMessage:function(_13){if(this._message==_13){return;}this._message=_13;_5.hideTooltip(this.domNode);if(_13){_5.showTooltip(_13,this.domNode,this.tooltipPosition,!this.isLeftToRight());}},_refreshState:function(){this.validate(this._focused);this.inherited(arguments);},constructor:function(){this.constraints={};},_setConstraintsAttr:function(_14){if(!_14.locale&&this.lang){_14.locale=this.lang;}this.constraints=_14;this._computePartialRE();},_computePartialRE:function(){var p=this.regExpGen(this.constraints);this.regExp=p;var _15="";if(p!=".*"){this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){switch(re.charAt(0)){case "{":case "+":case "?":case "*":case "^":case "$":case "|":case "(":_15+=re;break;case ")":_15+="|$)";break;default:_15+="(?:"+re+"|$)";break;}});}try{"".search(_15);}catch(e){_15=this.regExp;console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);}this._partialre="^(?:"+_15+")$";},postMixInProperties:function(){this.inherited(arguments);this.messages=_4.i18n.getLocalization("dijit.form","validate",this.lang);if(this.invalidMessage=="$_unset_$"){this.invalidMessage=this.messages.invalidMessage;}if(!this.invalidMessage){this.invalidMessage=this.promptMessage;}if(this.missingMessage=="$_unset_$"){this.missingMessage=this.messages.missingMessage;}if(!this.missingMessage){this.missingMessage=this.invalidMessage;}this._setConstraintsAttr(this.constraints);},_setDisabledAttr:function(_16){this.inherited(arguments);this._refreshState();},_setRequiredAttr:function(_17){this.required=_17;_5.setWaiState(this.focusNode,"required",_17);this._refreshState();},reset:function(){this._maskValidSubsetError=true;this.inherited(arguments);},_onBlur:function(){this.displayMessage("");this.inherited(arguments);}});_4.declare("dijit.form.MappedTextBox",_5.form.ValidationTextBox,{postMixInProperties:function(){this.inherited(arguments);this.nameAttrSetting="";},serialize:function(val,_18){return val.toString?val.toString():"";},toString:function(){var val=this.filter(this.get("value"));return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";},validate:function(){this.valueNode.value=this.toString();return this.inherited(arguments);},buildRendering:function(){this.inherited(arguments);this.valueNode=_4.place("<input type='hidden'"+(this.name?" name='"+this.name+"'":"")+">",this.textbox,"after");},reset:function(){this.valueNode.value="";this.inherited(arguments);}});_4.declare("dijit.form.RangeBoundTextBox",_5.form.MappedTextBox,{rangeMessage:"",rangeCheck:function(_19,_1a){return ("min" in _1a?(this.compare(_19,_1a.min)>=0):true)&&("max" in _1a?(this.compare(_19,_1a.max)<=0):true);},isInRange:function(_1b){return this.rangeCheck(this.get("value"),this.constraints);},_isDefinitelyOutOfRange:function(){var val=this.get("value");var _1c=false;var _1d=false;if("min" in this.constraints){var min=this.constraints.min;min=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min);_1c=(typeof min=="number")&&min<0;}if("max" in this.constraints){var max=this.constraints.max;max=this.compare(val,((typeof max!="number")||max>0)?max:0);_1d=(typeof max=="number")&&max>0;}return _1c||_1d;},_isValidSubset:function(){return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();},isValid:function(_1e){return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_1e));},getErrorMessage:function(_1f){var v=this.get("value");if(v!==null&&v!==""&&v!==undefined&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_1f)){return this.rangeMessage;}return this.inherited(arguments);},postMixInProperties:function(){this.inherited(arguments);if(!this.rangeMessage){this.messages=_4.i18n.getLocalization("dijit.form","validate",this.lang);this.rangeMessage=this.messages.rangeMessage;}},_setConstraintsAttr:function(_20){this.inherited(arguments);if(this.focusNode){if(this.constraints.min!==undefined){_5.setWaiState(this.focusNode,"valuemin",this.constraints.min);}else{_5.removeWaiState(this.focusNode,"valuemin");}if(this.constraints.max!==undefined){_5.setWaiState(this.focusNode,"valuemax",this.constraints.max);}else{_5.removeWaiState(this.focusNode,"valuemax");}}},_setValueAttr:function(_21,_22){_5.setWaiState(this.focusNode,"valuenow",_21);this.inherited(arguments);}});}}};});