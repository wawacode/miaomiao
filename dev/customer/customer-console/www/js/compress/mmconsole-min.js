/*!
 * ionic.bundle.js is a concatenation of:
 * ionic.js, angular.js, angular-animate.js,
 * angular-sanitize.js, angular-ui-router.js,
 * and ionic-angular.js
 */

/*!
 * Copyright 2014 Drifty Co.
 * http://drifty.com/
 *
 * Ionic, v1.0.0-beta.14
 * A powerful HTML5 mobile app framework.
 * http://ionicframework.com/
 *
 * By @maxlynch, @benjsperry, @adamdbradley <3
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

!function(){function e(e,t,n){t!==!1?k.addEventListener(e,Z[e],n):k.removeEventListener(e,Z[e])}function t(e){var t=T(e.target),i=E(t);if(ionic.tap.requiresNativeClick(i)||F)return!1;var r=ionic.tap.pointerCoord(e);n("click",i,r.x,r.y),_(i)}function n(e,t,n,i){var r=document.createEvent("MouseEvents");r.initMouseEvent(e,!0,!0,window,1,0,0,n,i,!1,!1,!1,!1,0,null),r.isIonicTap=!0,t.dispatchEvent(r)}function i(e){return("submit"!=e.target.type||0!==e.detail)&&(ionic.scroll.isScrolling&&ionic.tap.containsOrIsTextInput(e.target)||!e.isIonicTap&&!ionic.tap.requiresNativeClick(e.target))?(e.stopPropagation(),ionic.tap.isLabelWithTextInput(e.target)||e.preventDefault(),!1):void 0}function r(t){if(!t.isIonicTap&&!h(t)){if(H)return t.stopPropagation(),ionic.tap.isTextInput(t.target)&&W===t.target||/^(select|option)$/i.test(t.target.tagName)||t.preventDefault(),!1;F=!1,z=ionic.tap.pointerCoord(t),e("mousemove"),ionic.activator.start(t)}}function o(n){return H?(n.stopPropagation(),n.preventDefault(),!1):h(n)||/^(select|option)$/i.test(n.target.tagName)?!1:(v(n)||t(n),e("mousemove",!1),ionic.activator.end(),void(F=!1))}function s(t){return v(t)?(e("mousemove",!1),ionic.activator.end(),F=!0,!1):void 0}function a(t){if(!h(t)&&(F=!1,d(),z=ionic.tap.pointerCoord(t),e(U),ionic.activator.start(t),ionic.Platform.isIOS()&&ionic.tap.isLabelWithTextInput(t.target))){var n=E(T(t.target));n!==Y&&t.preventDefault()}}function l(e){h(e)||(d(),v(e)||(t(e),/^(select|option)$/i.test(e.target.tagName)&&e.preventDefault()),W=e.target,u())}function c(t){return v(t)?(F=!0,e(U,!1),ionic.activator.end(),!1):void 0}function u(){e(U,!1),ionic.activator.end(),F=!1}function d(){H=!0,clearTimeout(X),X=setTimeout(function(){H=!1},2e3)}function h(e){return e.isTapHandled?!0:(e.isTapHandled=!0,ionic.scroll.isScrolling&&ionic.tap.containsOrIsTextInput(e.target)?(e.preventDefault(),!0):void 0)}function _(e){$=null;var t=!1;"SELECT"==e.tagName?(n("mousedown",e,0,0),e.focus&&e.focus(),t=!0):g()===e?t=!0:/^(input|textarea)$/i.test(e.tagName)||e.isContentEditable?(t=!0,e.focus&&e.focus(),e.value=e.value,H&&($=e)):f(),t&&(g(e),ionic.trigger("ionic.focusin",{target:e},!0))}function f(){var e=g();e&&(/^(input|textarea|select)$/i.test(e.tagName)||e.isContentEditable)&&e.blur(),g(null)}function p(e){H&&ionic.tap.isTextInput(g())&&ionic.tap.isTextInput($)&&$!==e.target&&($.focus(),$=null),ionic.scroll.isScrolling=!1}function m(){g(null)}function g(e){return arguments.length&&(Y=e),Y||document.activeElement}function v(e){if(!e||1!==e.target.nodeType||!z||0===z.x&&0===z.y)return!1;var t=ionic.tap.pointerCoord(e),n=!(!e.target.classList||!e.target.classList.contains||"function"!=typeof e.target.classList.contains),i=n&&e.target.classList.contains("button")?B:q;return Math.abs(z.x-t.x)>i||Math.abs(z.y-t.y)>i}function T(e,t){for(var n=e,i=0;6>i&&n;i++){if("LABEL"===n.tagName)return n;n=n.parentElement}return t!==!1?e:void 0}function E(e){if(e&&"LABEL"===e.tagName){if(e.control)return e.control;if(e.querySelector){var t=e.querySelector("input,textarea,select");if(t)return t}}return e}function S(){C()?(window.addEventListener("native.keyboardshow",b),window.addEventListener("native.keyboardhide",L),window.addEventListener("native.showkeyboard",b),window.addEventListener("native.hidekeyboard",L)):document.body.addEventListener("focusout",L),document.body.addEventListener("ionic.focusin",w),document.body.addEventListener("focusin",w),document.body.addEventListener("orientationchange",I),window.navigator.msPointerEnabled?document.removeEventListener("MSPointerDown",S):document.removeEventListener("touchstart",S)}function b(e){clearTimeout(K),ionic.keyboard.height=e.keyboardHeight}function w(e){e.target&&!e.target.readOnly&&ionic.tap.isTextInput(e.target)&&!ionic.tap.isDateInput(e.target)&&G(e.target)&&(document.addEventListener("keydown",M,!1),document.body.scrollTop=0,document.body.querySelector(".scroll-content").scrollTop=0,j=e.target,y(e))}function y(e){clearTimeout(J),clearTimeout(K),J=setTimeout(function(){if(!(tt+350>Date.now())){tt=Date.now();var t,n=j.getBoundingClientRect(),i=0;Q=setInterval(function(){t=P(),i>10&&(clearInterval(Q),t=275),t&&(clearInterval(Q),D(e.target,n.top,n.bottom,et,t)),i++},100)}},32)}function D(e,t,n,i,r){var o={target:e,elementTop:Math.round(t),elementBottom:Math.round(n),keyboardHeight:r,viewportHeight:i};return o.hasPlugin=C(),o.contentHeight=i-r,o.isElementUnderKeyboard=o.elementBottom>o.contentHeight,ionic.keyboard.isOpen=!0,j=e,ionic.trigger("scrollChildIntoView",o,!0),ionic.requestAnimationFrame(function(){document.body.classList.add(nt)}),window.navigator.msPointerEnabled?document.addEventListener("MSPointerMove",N,!1):document.addEventListener("touchmove",N,!1),o}function L(){clearTimeout(K),K=setTimeout(ionic.keyboard.hide,350)}function x(){A()>et&&(et=A())}function M(e){ionic.scroll.isScrolling&&N(e)}function N(e){"TEXTAREA"!==e.target.tagName&&e.preventDefault()}function I(){var e=A();if(e===et)var t=0,n=setInterval(function(){t>10&&clearInterval(n),e=A(),e!==et&&(ionic.keyboard.landscape=et>e?!0:!1,et=e,clearInterval(n)),t++},50);else et=e}function P(){return ionic.keyboard.height?ionic.keyboard.height:ionic.Platform.isAndroid()?ionic.Platform.isFullScreen?275:A()<et?et-A():0:ionic.Platform.isIOS()?ionic.keyboard.landscape?206:ionic.Platform.isWebView()?260:216:275}function A(){return window.innerHeight||screen.height}function G(e){for(;e;){if(e.classList.contains(it))return!0;e=e.parentElement}return!1}function C(){return!!(window.cordova&&cordova.plugins&&cordova.plugins.Keyboard)}function O(){var e;for(e=0;e<document.head.children.length;e++)if("viewport"==document.head.children[e].name){rt=document.head.children[e];break}if(rt){var t,n=rt.content.toLowerCase().replace(/\s+/g,"").split(",");for(e=0;e<n.length;e++)n[e]&&(t=n[e].split("="),ot[t[0]]=t.length>1?t[1]:"_");R()}}function R(){var e=ot.width,t=ot.height,n=ionic.Platform,i=n.version(),r="device-width",o="device-height",s=ionic.viewport.orientation();delete ot.height,ot.width=r,n.isIPad()?i>7?delete ot.width:n.isWebView()?90==s?ot.height="0":7==i&&(ot.height=o):7>i&&(ot.height="0"):n.isIOS()&&(n.isWebView()?i>7?delete ot.width:7>i?t&&(ot.height="0"):7==i&&(ot.height=o):7>i&&t&&(ot.height="0")),(e!==ot.width||t!==ot.height)&&V()}function V(){var e,t=[];for(e in ot)ot[e]&&t.push(e+("_"==ot[e]?"":"="+ot[e]));rt.content=t.join(", ")}window.ionic=window.ionic||{},window.ionic.views={},window.ionic.version="1.0.0-beta.14",function(e){e.DelegateService=function(e){function t(){return!0}if(e.indexOf("$getByHandle")>-1)throw new Error("Method '$getByHandle' is implicitly added to each delegate service. Do not list it as a method.");return["$log",function(n){function i(e,t){this._instances=e,this.handle=t}function r(){this._instances=[]}function o(e){return function(){var t,i=this.handle,r=arguments,o=0;return this._instances.forEach(function(n){if((!i||i==n.$$delegateHandle)&&n.$$filterFn(n)){o++;var s=n[e].apply(n,r);1===o&&(t=s)}}),!o&&i?n.warn('Delegate for handle "'+i+'" could not find a corresponding element with delegate-handle="'+i+'"! '+e+"() was not called!\nPossible cause: If you are calling "+e+'() immediately, and your element with delegate-handle="'+i+'" is a child of your controller, then your element may not be compiled yet. Put a $timeout around your call to '+e+"() and try again."):t}}return e.forEach(function(e){i.prototype[e]=o(e)}),r.prototype=i.prototype,r.prototype._registerInstance=function(e,n,i){var r=this._instances;return e.$$delegateHandle=n,e.$$filterFn=i||t,r.push(e),function(){var t=r.indexOf(e);-1!==t&&r.splice(t,1)}},r.prototype.$getByHandle=function(e){return new i(this._instances,e)},new r}]}}(window.ionic),function(e,t,n){function i(){o=!0;for(var e=0;e<r.length;e++)n.requestAnimationFrame(r[e]);r=[],t.removeEventListener("DOMContentLoaded",i)}var r=[],o="complete"===t.readyState||"interactive"===t.readyState;o||t.addEventListener("DOMContentLoaded",i),e._rAF=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||function(t){e.setTimeout(t,16)}}();var s=e.cancelAnimationFrame||e.webkitCancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelRequestAnimationFrame;n.DomUtil={requestAnimationFrame:function(t){return e._rAF(t)},cancelAnimationFrame:function(e){s(e)},animationFrameThrottle:function(e){var t,i,r;return function(){t=arguments,r=this,i||(i=!0,n.requestAnimationFrame(function(){e.apply(r,t),i=!1}))}},getPositionInParent:function(e){return{left:e.offsetLeft,top:e.offsetTop}},ready:function(e){o?n.requestAnimationFrame(e):r.push(e)},getTextBounds:function(n){if(t.createRange){var i=t.createRange();if(i.selectNodeContents(n),i.getBoundingClientRect){var r=i.getBoundingClientRect();if(r){var o=e.scrollX,s=e.scrollY;return{top:r.top+s,left:r.left+o,right:r.left+o+r.width,bottom:r.top+s+r.height,width:r.width,height:r.height}}}}return null},getChildIndex:function(e,t){if(t)for(var n,i=e.parentNode.children,r=0,o=0,s=i.length;s>r;r++)if(n=i[r],n.nodeName&&n.nodeName.toLowerCase()==t){if(n==e)return o;o++}return Array.prototype.slice.call(e.parentNode.children).indexOf(e)},swapNodes:function(e,t){t.parentNode.insertBefore(e,t)},elementIsDescendant:function(e,t,n){var i=e;do{if(i===t)return!0;i=i.parentNode}while(i&&i!==n);return!1},getParentWithClass:function(e,t,n){for(n=n||10;e.parentNode&&n--;){if(e.parentNode.classList&&e.parentNode.classList.contains(t))return e.parentNode;e=e.parentNode}return null},getParentOrSelfWithClass:function(e,t,n){for(n=n||10;e&&n--;){if(e.classList&&e.classList.contains(t))return e;e=e.parentNode}return null},rectContains:function(e,t,n,i,r,o){return n>e||e>r?!1:i>t||t>o?!1:!0},blurAll:function(){return t.activeElement&&t.activeElement!=t.body?(t.activeElement.blur(),t.activeElement):null},cachedAttr:function(e,t,n){if(e=e&&e.length&&e[0]||e,e&&e.setAttribute){var i="$attr-"+t;return arguments.length>2?e[i]!==n&&(e.setAttribute(t,n),e[i]=n):"undefined"==typeof e[i]&&(e[i]=e.getAttribute(t)),e[i]}},cachedStyles:function(e,t){if(e=e&&e.length&&e[0]||e,e&&e.style)for(var n in t)e["$style-"+n]!==t[n]&&(e.style[n]=e["$style-"+n]=t[n])}},n.requestAnimationFrame=n.DomUtil.requestAnimationFrame,n.cancelAnimationFrame=n.DomUtil.cancelAnimationFrame,n.animationFrameThrottle=n.DomUtil.animationFrameThrottle}(window,document,ionic),function(e){e.CustomEvent=function(){if("function"==typeof window.CustomEvent)return CustomEvent;var e=function(e,t){var n;t=t||{bubbles:!1,cancelable:!1,detail:void 0};try{n=document.createEvent("CustomEvent"),n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail)}catch(i){n=document.createEvent("Event");for(var r in t)n[r]=t[r];n.initEvent(e,t.bubbles,t.cancelable)}return n};return e.prototype=window.Event.prototype,e}(),e.EventController={VIRTUALIZED_EVENTS:["tap","swipe","swiperight","swipeleft","drag","hold","release"],trigger:function(t,n,i,r){var o=new e.CustomEvent(t,{detail:n,bubbles:!!i,cancelable:!!r});n&&n.target&&n.target.dispatchEvent&&n.target.dispatchEvent(o)||window.dispatchEvent(o)},on:function(t,n,i){for(var r=i||window,o=0,s=this.VIRTUALIZED_EVENTS.length;s>o;o++)if(t==this.VIRTUALIZED_EVENTS[o]){var a=new e.Gesture(i);return a.on(t,n),a}r.addEventListener(t,n)},off:function(e,t,n){n.removeEventListener(e,t)},onGesture:function(t,n,i,r){var o=new e.Gesture(i,r);return o.on(t,n),o},offGesture:function(e,t,n){e.off(t,n)},handlePopState:function(){}},e.on=function(){e.EventController.on.apply(e.EventController,arguments)},e.off=function(){e.EventController.off.apply(e.EventController,arguments)},e.trigger=e.EventController.trigger,e.onGesture=function(){return e.EventController.onGesture.apply(e.EventController.onGesture,arguments)},e.offGesture=function(){return e.EventController.offGesture.apply(e.EventController.offGesture,arguments)}}(window.ionic),function(e){function t(){if(!e.Gestures.READY){e.Gestures.event.determineEventTypes();for(var t in e.Gestures.gestures)e.Gestures.gestures.hasOwnProperty(t)&&e.Gestures.detection.register(e.Gestures.gestures[t]);e.Gestures.event.onTouch(e.Gestures.DOCUMENT,e.Gestures.EVENT_MOVE,e.Gestures.detection.detect),e.Gestures.event.onTouch(e.Gestures.DOCUMENT,e.Gestures.EVENT_END,e.Gestures.detection.detect),e.Gestures.READY=!0}}e.Gesture=function(t,n){return new e.Gestures.Instance(t,n||{})},e.Gestures={},e.Gestures.defaults={stop_browser_behavior:"disable-user-behavior"},e.Gestures.HAS_POINTEREVENTS=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,e.Gestures.HAS_TOUCHEVENTS="ontouchstart"in window,e.Gestures.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,e.Gestures.NO_MOUSEEVENTS=e.Gestures.HAS_TOUCHEVENTS&&window.navigator.userAgent.match(e.Gestures.MOBILE_REGEX),e.Gestures.EVENT_TYPES={},e.Gestures.DIRECTION_DOWN="down",e.Gestures.DIRECTION_LEFT="left",e.Gestures.DIRECTION_UP="up",e.Gestures.DIRECTION_RIGHT="right",e.Gestures.POINTER_MOUSE="mouse",e.Gestures.POINTER_TOUCH="touch",e.Gestures.POINTER_PEN="pen",e.Gestures.EVENT_START="start",e.Gestures.EVENT_MOVE="move",e.Gestures.EVENT_END="end",e.Gestures.DOCUMENT=window.document,e.Gestures.plugins={},e.Gestures.READY=!1,e.Gestures.Instance=function(n,i){var r=this;if(null!==n)return t(),this.element=n,this.enabled=!0,this.options=e.Gestures.utils.extend(e.Gestures.utils.extend({},e.Gestures.defaults),i||{}),this.options.stop_browser_behavior&&e.Gestures.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),e.Gestures.event.onTouch(n,e.Gestures.EVENT_START,function(t){r.enabled&&e.Gestures.detection.startDetect(r,t)}),this},e.Gestures.Instance.prototype={on:function(e,t){for(var n=e.split(" "),i=0;i<n.length;i++)this.element.addEventListener(n[i],t,!1);return this},off:function(e,t){for(var n=e.split(" "),i=0;i<n.length;i++)this.element.removeEventListener(n[i],t,!1);return this},trigger:function(t,n){var i=e.Gestures.DOCUMENT.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=n;var r=this.element;return e.Gestures.utils.hasParent(n.target,r)&&(r=n.target),r.dispatchEvent(i),this},enable:function(e){return this.enabled=e,this}};var n=null,i=!1,r=!1;e.Gestures.event={bindDom:function(e,t,n){for(var i=t.split(" "),r=0;r<i.length;r++)e.addEventListener(i[r],n,!1)},onTouch:function(t,o,s){var a=this;this.bindDom(t,e.Gestures.EVENT_TYPES[o],function(l){var c=l.type.toLowerCase();if(!c.match(/mouse/)||!r){c.match(/touch/)||c.match(/pointerdown/)||c.match(/mouse/)&&1===l.which?i=!0:c.match(/mouse/)&&1!==l.which&&(i=!1),c.match(/touch|pointer/)&&(r=!0);var u=0;i&&(e.Gestures.HAS_POINTEREVENTS&&o!=e.Gestures.EVENT_END?u=e.Gestures.PointerEvent.updatePointer(o,l):c.match(/touch/)?u=l.touches.length:r||(u=c.match(/up/)?0:1),u>0&&o==e.Gestures.EVENT_END?o=e.Gestures.EVENT_MOVE:u||(o=e.Gestures.EVENT_END),(u||null===n)&&(n=l),s.call(e.Gestures.detection,a.collectEventData(t,o,a.getTouchList(n,o),l)),e.Gestures.HAS_POINTEREVENTS&&o==e.Gestures.EVENT_END&&(u=e.Gestures.PointerEvent.updatePointer(o,l))),u||(n=null,i=!1,r=!1,e.Gestures.PointerEvent.reset())}})},determineEventTypes:function(){var t;t=e.Gestures.HAS_POINTEREVENTS?e.Gestures.PointerEvent.getEvents():e.Gestures.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],e.Gestures.EVENT_TYPES[e.Gestures.EVENT_START]=t[0],e.Gestures.EVENT_TYPES[e.Gestures.EVENT_MOVE]=t[1],e.Gestures.EVENT_TYPES[e.Gestures.EVENT_END]=t[2]},getTouchList:function(t){return e.Gestures.HAS_POINTEREVENTS?e.Gestures.PointerEvent.getTouchList():t.touches?t.touches:(t.identifier=1,[t])},collectEventData:function(t,n,i,r){var o=e.Gestures.POINTER_TOUCH;return(r.type.match(/mouse/)||e.Gestures.PointerEvent.matchType(e.Gestures.POINTER_MOUSE,r))&&(o=e.Gestures.POINTER_MOUSE),{center:e.Gestures.utils.getCenter(i),timeStamp:(new Date).getTime(),target:r.target,touches:i,eventType:n,pointerType:o,srcEvent:r,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return e.Gestures.detection.stopDetect()}}}},e.Gestures.PointerEvent={pointers:{},getTouchList:function(){var e=this,t=[];return Object.keys(e.pointers).sort().forEach(function(n){t.push(e.pointers[n])}),t},updatePointer:function(t,n){return t==e.Gestures.EVENT_END?this.pointers={}:(n.identifier=n.pointerId,this.pointers[n.pointerId]=n),Object.keys(this.pointers).length},matchType:function(t,n){if(!n.pointerType)return!1;var i={};return i[e.Gestures.POINTER_MOUSE]=n.pointerType==n.MSPOINTER_TYPE_MOUSE||n.pointerType==e.Gestures.POINTER_MOUSE,i[e.Gestures.POINTER_TOUCH]=n.pointerType==n.MSPOINTER_TYPE_TOUCH||n.pointerType==e.Gestures.POINTER_TOUCH,i[e.Gestures.POINTER_PEN]=n.pointerType==n.MSPOINTER_TYPE_PEN||n.pointerType==e.Gestures.POINTER_PEN,i[t]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},e.Gestures.utils={extend:function(e,t,n){for(var i in t)void 0!==e[i]&&n||(e[i]=t[i]);return e},hasParent:function(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1},getCenter:function(e){for(var t=[],n=[],i=0,r=e.length;r>i;i++)t.push(e[i].pageX),n.push(e[i].pageY);return{pageX:(Math.min.apply(Math,t)+Math.max.apply(Math,t))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(e,t,n){return{x:Math.abs(t/e)||0,y:Math.abs(n/e)||0}},getAngle:function(e,t){var n=t.pageY-e.pageY,i=t.pageX-e.pageX;return 180*Math.atan2(n,i)/Math.PI},getDirection:function(t,n){var i=Math.abs(t.pageX-n.pageX),r=Math.abs(t.pageY-n.pageY);return i>=r?t.pageX-n.pageX>0?e.Gestures.DIRECTION_LEFT:e.Gestures.DIRECTION_RIGHT:t.pageY-n.pageY>0?e.Gestures.DIRECTION_UP:e.Gestures.DIRECTION_DOWN},getDistance:function(e,t){var n=t.pageX-e.pageX,i=t.pageY-e.pageY;return Math.sqrt(n*n+i*i)},getScale:function(e,t){return e.length>=2&&t.length>=2?this.getDistance(t[0],t[1])/this.getDistance(e[0],e[1]):1},getRotation:function(e,t){return e.length>=2&&t.length>=2?this.getAngle(t[1],t[0])-this.getAngle(e[1],e[0]):0},isVertical:function(t){return t==e.Gestures.DIRECTION_UP||t==e.Gestures.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(e,t){e&&e.classList&&(e.classList.add(t),e.onselectstart=function(){return!1})}},e.Gestures.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,n){this.current||(this.stopped=!1,this.current={inst:t,startEvent:e.Gestures.utils.extend({},n),lastEvent:!1,name:""},this.detect(n))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var n=this.current.inst.options,i=0,r=this.gestures.length;r>i;i++){var o=this.gestures[i];if(!this.stopped&&n[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==e.Gestures.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t}},stopDetect:function(){this.previous=e.Gestures.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var n=this.current.startEvent;if(n&&(t.touches.length!=n.touches.length||t.touches===n.touches)){n.touches=[];for(var i=0,r=t.touches.length;r>i;i++)n.touches.push(e.Gestures.utils.extend({},t.touches[i]))}var o=t.timeStamp-n.timeStamp,s=t.center.pageX-n.center.pageX,a=t.center.pageY-n.center.pageY,l=e.Gestures.utils.getVelocity(o,s,a);return e.Gestures.utils.extend(t,{deltaTime:o,deltaX:s,deltaY:a,velocityX:l.x,velocityY:l.y,distance:e.Gestures.utils.getDistance(n.center,t.center),angle:e.Gestures.utils.getAngle(n.center,t.center),direction:e.Gestures.utils.getDirection(n.center,t.center),scale:e.Gestures.utils.getScale(n.touches,t.touches),rotation:e.Gestures.utils.getRotation(n.touches,t.touches),startEvent:n}),t},register:function(t){var n=t.defaults||{};return void 0===n[t.name]&&(n[t.name]=!0),e.Gestures.utils.extend(e.Gestures.defaults,n,!0),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:0}),this.gestures}},e.Gestures.gestures=e.Gestures.gestures||{},e.Gestures.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,n){switch(t.eventType){case e.Gestures.EVENT_START:clearTimeout(this.timer),e.Gestures.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==e.Gestures.detection.current.name&&(e.tap.cancelClick(),n.trigger("hold",t))},n.options.hold_timeout);break;case e.Gestures.EVENT_MOVE:t.distance>n.options.hold_threshold&&clearTimeout(this.timer);break;case e.Gestures.EVENT_END:clearTimeout(this.timer)}}},e.Gestures.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,n){if(t.eventType==e.Gestures.EVENT_END&&"touchcancel"!=t.srcEvent.type){var i=e.Gestures.detection.previous,r=!1;if(t.deltaTime>n.options.tap_max_touchtime||t.distance>n.options.tap_max_distance)return;i&&"tap"==i.name&&t.timeStamp-i.lastEvent.timeStamp<n.options.doubletap_interval&&t.distance<n.options.doubletap_distance&&(n.trigger("doubletap",t),r=!0),(!r||n.options.tap_always)&&(e.Gestures.detection.current.name="tap",n.trigger("tap",t))}}},e.Gestures.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,n){if(t.eventType==e.Gestures.EVENT_END){if(n.options.swipe_max_touches>0&&t.touches.length>n.options.swipe_max_touches)return;(t.velocityX>n.options.swipe_velocity||t.velocityY>n.options.swipe_velocity)&&(n.trigger(this.name,t),n.trigger(this.name+t.direction,t))}}},e.Gestures.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!0,drag_block_vertical:!0,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,n){if(e.Gestures.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),void(this.triggered=!1);if(!(n.options.drag_max_touches>0&&t.touches.length>n.options.drag_max_touches))switch(t.eventType){case e.Gestures.EVENT_START:this.triggered=!1;break;case e.Gestures.EVENT_MOVE:if(t.distance<n.options.drag_min_distance&&e.Gestures.detection.current.name!=this.name)return;if(e.Gestures.detection.current.name!=this.name&&(e.Gestures.detection.current.name=this.name,n.options.correct_for_drag_min_distance)){var i=Math.abs(n.options.drag_min_distance/t.distance);e.Gestures.detection.current.startEvent.center.pageX+=t.deltaX*i,e.Gestures.detection.current.startEvent.center.pageY+=t.deltaY*i,t=e.Gestures.detection.extendEventData(t)}(e.Gestures.detection.current.lastEvent.drag_locked_to_axis||n.options.drag_lock_to_axis&&n.options.drag_lock_min_distance<=t.distance)&&(t.drag_locked_to_axis=!0);var r=e.Gestures.detection.current.lastEvent.direction;t.drag_locked_to_axis&&r!==t.direction&&(t.direction=e.Gestures.utils.isVertical(r)?t.deltaY<0?e.Gestures.DIRECTION_UP:e.Gestures.DIRECTION_DOWN:t.deltaX<0?e.Gestures.DIRECTION_LEFT:e.Gestures.DIRECTION_RIGHT),this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),n.trigger(this.name+t.direction,t),(n.options.drag_block_vertical&&e.Gestures.utils.isVertical(t.direction)||n.options.drag_block_horizontal&&!e.Gestures.utils.isVertical(t.direction))&&t.preventDefault();break;case e.Gestures.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},e.Gestures.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,n){if(e.Gestures.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),void(this.triggered=!1);if(!(t.touches.length<2))switch(n.options.transform_always_block&&t.preventDefault(),t.eventType){case e.Gestures.EVENT_START:this.triggered=!1;break;case e.Gestures.EVENT_MOVE:var i=Math.abs(1-t.scale),r=Math.abs(t.rotation);if(i<n.options.transform_min_scale&&r<n.options.transform_min_rotation)return;e.Gestures.detection.current.name=this.name,this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),r>n.options.transform_min_rotation&&n.trigger("rotate",t),i>n.options.transform_min_scale&&(n.trigger("pinch",t),n.trigger("pinch"+(t.scale<1?"in":"out"),t));break;case e.Gestures.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},e.Gestures.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,n){return n.options.prevent_mouseevents&&t.pointerType==e.Gestures.POINTER_MOUSE?void t.stopDetect():(n.options.prevent_default&&t.preventDefault(),void(t.eventType==e.Gestures.EVENT_START&&n.trigger(this.name,t)))}},e.Gestures.gestures.Release={name:"release",index:1/0,handler:function(t,n){t.eventType==e.Gestures.EVENT_END&&n.trigger(this.name,t)}}}(window.ionic),function(e,t,n){function i(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)"),n=t.exec(location.search);return null===n?"":decodeURIComponent(n[1].replace(/\+/g," "))}function r(){n.Platform.isWebView()?t.addEventListener("deviceready",o,!1):o(),c&&e.removeEventListener("load",r,!1)}function o(){n.Platform.isReady=!0,n.Platform.detect();for(var e=0;e<h.length;e++)h[e]();h=[],n.trigger("platformready",{target:t}),n.requestAnimationFrame(function(){t.body.classList.add("platform-ready")})}var s="ios",a="android",l="windowsphone";n.Platform={navigator:e.navigator,isReady:!1,isFullScreen:!1,platforms:null,grade:null,ua:navigator.userAgent,ready:function(e){this.isReady?e():h.push(e)},detect:function(){n.Platform._checkPlatforms(),n.requestAnimationFrame(function(){for(var e=0;e<n.Platform.platforms.length;e++)t.body.classList.add("platform-"+n.Platform.platforms[e])})},setGrade:function(e){var i=this.grade;this.grade=e,n.requestAnimationFrame(function(){i&&t.body.classList.remove("grade-"+i),t.body.classList.add("grade-"+e)})},device:function(){return e.device||{}},_checkPlatforms:function(){this.platforms=[];var e="a";this.isWebView()?(this.platforms.push("webview"),this.platforms.push("cordova")):this.platforms.push("browser"),this.isIPad()&&this.platforms.push("ipad");var t=this.platform();if(t){this.platforms.push(t);var n=this.version();if(n){var i=n.toString();i.indexOf(".")>0?i=i.replace(".","_"):i+="_0",this.platforms.push(t+i.split("_")[0]),this.platforms.push(t+i),this.isAndroid()&&4.4>n?e=4>n?"c":"b":this.isWindowsPhone()&&(e="b")}}this.setGrade(e)},isWebView:function(){return!(!e.cordova&&!e.PhoneGap&&!e.phonegap)},isIPad:function(){return/iPad/i.test(n.Platform.navigator.platform)?!0:/iPad/i.test(this.ua)},isIOS:function(){return this.is(s)},isAndroid:function(){return this.is(a)},isWindowsPhone:function(){return this.is(l)},platform:function(){return null===u&&this.setPlatform(this.device().platform),u},setPlatform:function(e){u="undefined"!=typeof e&&null!==e&&e.length?e.toLowerCase():i("ionicplatform")?i("ionicplatform"):this.ua.indexOf("Android")>0?a:this.ua.indexOf("iPhone")>-1||this.ua.indexOf("iPad")>-1||this.ua.indexOf("iPod")>-1?s:this.ua.indexOf("Windows Phone")>-1?l:n.Platform.navigator.platform&&navigator.platform.toLowerCase().split(" ")[0]||""},version:function(){return null===d&&this.setVersion(this.device().version),d},setVersion:function(e){if("undefined"!=typeof e&&null!==e&&(e=e.split("."),e=parseFloat(e[0]+"."+(e.length>1?e[1]:0)),!isNaN(e)))return void(d=e);d=0;var t=this.platform(),n={android:/Android (\d+).(\d+)?/,ios:/OS (\d+)_(\d+)?/,windowsphone:/Windows Phone (\d+).(\d+)?/};n[t]&&(e=this.ua.match(n[t]),e&&e.length>2&&(d=parseFloat(e[1]+"."+e[2])))},is:function(e){if(e=e.toLowerCase(),this.platforms)for(var t=0;t<this.platforms.length;t++)if(this.platforms[t]===e)return!0;var n=this.platform();return n?n===e.toLowerCase():this.ua.toLowerCase().indexOf(e)>=0},exitApp:function(){this.ready(function(){navigator.app&&navigator.app.exitApp&&navigator.app.exitApp()})},showStatusBar:function(i){this._showStatusBar=i,this.ready(function(){n.requestAnimationFrame(function(){n.Platform._showStatusBar?(e.StatusBar&&e.StatusBar.show(),t.body.classList.remove("status-bar-hide")):(e.StatusBar&&e.StatusBar.hide(),t.body.classList.add("status-bar-hide"))})})},fullScreen:function(e,i){this.isFullScreen=e!==!1,n.DomUtil.ready(function(){n.requestAnimationFrame(function(){panes=t.getElementsByClassName("pane");for(var e=0;e<panes.length;e++)panes[e].style.height=panes[e].offsetHeight+"px";n.Platform.isFullScreen?t.body.classList.add("fullscreen"):t.body.classList.remove("fullscreen")}),n.Platform.showStatusBar(i===!0)})}};var c,u=null,d=null,h=[];"complete"===t.readyState?r():(c=!0,e.addEventListener("load",r,!1)),e.addEventListener("load",r,!1)}(this,document,ionic),function(e,t){"use strict";t.CSS={},function(){var n,i=["webkitTransform","transform","-webkit-transform","webkit-transform","-moz-transform","moz-transform","MozTransform","mozTransform","msTransform"];for(n=0;n<i.length;n++)if(void 0!==e.documentElement.style[i[n]]){t.CSS.TRANSFORM=i[n];break}for(i=["webkitTransition","mozTransition","msTransition","transition"],n=0;n<i.length;n++)if(void 0!==e.documentElement.style[i[n]]){t.CSS.TRANSITION=i[n];break}var r=t.CSS.TRANSITION.indexOf("webkit")>-1;t.CSS.TRANSITION_DURATION=(r?"-webkit-":"")+"transition-duration",t.CSS.TRANSITIONEND=(r?"webkitTransitionEnd ":"")+"transitionend"}(),"classList"in e.documentElement||!Object.defineProperty||"undefined"==typeof HTMLElement||Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){function e(e){return function(){var n,i=t.className.split(/\s+/);for(n=0;n<arguments.length;n++)e(i,i.indexOf(arguments[n]),arguments[n]);t.className=i.join(" ")}}var t=this;return{add:e(function(e,t,n){~t||e.push(n)}),remove:e(function(e,t){~t&&e.splice(t,1)}),toggle:e(function(e,t,n){~t?e.splice(t,1):e.push(n)}),contains:function(e){return!!~t.className.split(/\s+/).indexOf(e)},item:function(e){return t.className.split(/\s+/)[e]||null}}}})}(document,ionic);var k,Y,H,X,F,z,$,W,U="touchmove",q=12,B=50,Z={click:i,mousedown:r,mouseup:o,mousemove:s,touchstart:a,touchend:l,touchcancel:u,touchmove:c,pointerdown:a,pointerup:l,pointercancel:u,pointermove:c,MSPointerDown:a,MSPointerUp:l,MSPointerCancel:u,MSPointerMove:c,focusin:p,focusout:m};ionic.tap={register:function(t){return k=t,e("click",!0,!0),e("mouseup"),e("mousedown"),window.navigator.pointerEnabled?(e("pointerdown"),e("pointerup"),e("pointcancel"),U="pointermove"):window.navigator.msPointerEnabled?(e("MSPointerDown"),e("MSPointerUp"),e("MSPointerCancel"),U="MSPointerMove"):(e("touchstart"),e("touchend"),e("touchcancel")),e("focusin"),e("focusout"),function(){for(var t in Z)e(t,!1);k=null,Y=null,H=!1,F=!1,z=null}},ignoreScrollStart:function(e){return e.defaultPrevented||/^(file|range)$/i.test(e.target.type)||"true"==(e.target.dataset?e.target.dataset.preventScroll:e.target.getAttribute("data-prevent-scroll"))||!!/^(object|embed)$/i.test(e.target.tagName)||ionic.tap.isElementTapDisabled(e.target)},isTextInput:function(e){return!!e&&("TEXTAREA"==e.tagName||"true"===e.contentEditable||"INPUT"==e.tagName&&!/^(radio|checkbox|range|file|submit|reset)$/i.test(e.type))},isDateInput:function(e){return!!e&&"INPUT"==e.tagName&&/^(date|time|datetime-local|month|week)$/i.test(e.type)},isLabelWithTextInput:function(e){var t=T(e,!1);return!!t&&ionic.tap.isTextInput(E(t))},containsOrIsTextInput:function(e){return ionic.tap.isTextInput(e)||ionic.tap.isLabelWithTextInput(e)},cloneFocusedInput:function(e){ionic.tap.hasCheckedClone||(ionic.tap.hasCheckedClone=!0,ionic.requestAnimationFrame(function(){var t=e.querySelector(":focus");if(ionic.tap.isTextInput(t)){var n=t.parentElement.querySelector(".cloned-text-input");n||(n=document.createElement(t.tagName),n.placeholder=t.placeholder,n.type=t.type,n.value=t.value,n.style=t.style,n.className=t.className,n.classList.add("cloned-text-input"),n.readOnly=!0,t.isContentEditable&&(n.contentEditable=t.contentEditable,n.innerHTML=t.innerHTML),t.parentElement.insertBefore(n,t),t.style.top=t.offsetTop,t.classList.add("previous-input-focus"))
}}))},hasCheckedClone:!1,removeClonedInputs:function(e){ionic.tap.hasCheckedClone=!1,ionic.requestAnimationFrame(function(){var t,n=e.querySelectorAll(".cloned-text-input"),i=e.querySelectorAll(".previous-input-focus");for(t=0;t<n.length;t++)n[t].parentElement.removeChild(n[t]);for(t=0;t<i.length;t++)i[t].classList.remove("previous-input-focus"),i[t].style.top="",i[t].focus()})},requiresNativeClick:function(e){return!e||e.disabled||/^(file|range)$/i.test(e.type)||/^(object|video)$/i.test(e.tagName)||ionic.tap.isLabelContainingFileInput(e)?!0:ionic.tap.isElementTapDisabled(e)},isLabelContainingFileInput:function(e){var t=T(e);if("LABEL"!==t.tagName)return!1;var n=t.querySelector("input[type=file]");return n&&n.disabled===!1?!0:!1},isElementTapDisabled:function(e){if(e&&1===e.nodeType)for(var t=e;t;){if("true"==(t.dataset?t.dataset.tapDisabled:t.getAttribute("data-tap-disabled")))return!0;t=t.parentElement}return!1},setTolerance:function(e,t){q=e,B=t},cancelClick:function(){F=!0},pointerCoord:function(e){var t={x:0,y:0};if(e){var n=e.touches&&e.touches.length?e.touches:[e],i=e.changedTouches&&e.changedTouches[0]||n[0];i&&(t.x=i.clientX||i.pageX||0,t.y=i.clientY||i.pageY||0)}return t}},ionic.DomUtil.ready(function(){var e="undefined"!=typeof angular?angular:null;(!e||e&&!e.scenario)&&ionic.tap.register(document)}),function(e,t){"use strict";function n(){o={},t.requestAnimationFrame(r)}function i(){for(var e in o)o[e]&&(o[e].classList.add(l),s[e]=o[e]);o={}}function r(){if(t.transition&&t.transition.isActive)return void setTimeout(r,400);for(var e in s)s[e]&&(s[e].classList.remove(l),delete s[e])}var o={},s={},a=0,l="activated";t.activator={start:function(e){t.requestAnimationFrame(function(){if(!(t.scroll&&t.scroll.isScrolling||t.tap.requiresNativeClick(e.target))){for(var n,r=e.target,s=0;6>s&&(r&&1===r.nodeType);s++){if(n&&r.classList.contains("item")){n=r;break}if("A"==r.tagName||"BUTTON"==r.tagName||r.hasAttribute("ng-click")){n=r;break}if(r.classList.contains("button")){n=r;break}if("ION-CONTENT"==r.tagName||r.classList.contains("pane")||"BODY"==r.tagName)break;r=r.parentElement}n&&(o[a]=n,t.requestAnimationFrame(i),a=a>29?0:a+1)}})},end:function(){setTimeout(n,200)}}}(document,ionic),function(e){var t=["0","0","0"];e.Utils={arrayMove:function(e,t,n){if(n>=e.length)for(var i=n-e.length;i--+1;)e.push(void 0);return e.splice(n,0,e.splice(t,1)[0]),e},proxy:function(e,t){var n=Array.prototype.slice.call(arguments,2);return function(){return e.apply(t,n.concat(Array.prototype.slice.call(arguments)))}},debounce:function(e,t,n){var i,r,o,s,a;return function(){o=this,r=arguments,s=new Date;var l=function(){var c=new Date-s;t>c?i=setTimeout(l,t-c):(i=null,n||(a=e.apply(o,r)))},c=n&&!i;return i||(i=setTimeout(l,t)),c&&(a=e.apply(o,r)),a}},throttle:function(e,t,n){var i,r,o,s=null,a=0;n||(n={});var l=function(){a=n.leading===!1?0:Date.now(),s=null,o=e.apply(i,r)};return function(){var c=Date.now();a||n.leading!==!1||(a=c);var u=t-(c-a);return i=this,r=arguments,0>=u?(clearTimeout(s),s=null,a=c,o=e.apply(i,r)):s||n.trailing===!1||(s=setTimeout(l,u)),o}},inherit:function(t,n){var i,r=this;i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return r.apply(this,arguments)},e.extend(i,r,n);var o=function(){this.constructor=i};return o.prototype=r.prototype,i.prototype=new o,t&&e.extend(i.prototype,t),i.__super__=r.prototype,i},extend:function(e){for(var t=Array.prototype.slice.call(arguments,1),n=0;n<t.length;n++){var i=t[n];if(i)for(var r in i)e[r]=i[r]}return e},nextUid:function(){for(var e,n=t.length;n;){if(n--,e=t[n].charCodeAt(0),57==e)return t[n]="A",t.join("");if(90!=e)return t[n]=String.fromCharCode(e+1),t.join("");t[n]="0"}return t.unshift("0"),t.join("")},disconnectScope:function(e){if(e&&e.$root!==e){var t=e.$parent;e.$$disconnected=!0,e.$broadcast("$ionic.disconnectScope"),t.$$childHead===e&&(t.$$childHead=e.$$nextSibling),t.$$childTail===e&&(t.$$childTail=e.$$prevSibling),e.$$prevSibling&&(e.$$prevSibling.$$nextSibling=e.$$nextSibling),e.$$nextSibling&&(e.$$nextSibling.$$prevSibling=e.$$prevSibling),e.$$nextSibling=e.$$prevSibling=null}},reconnectScope:function(e){if(e&&e.$root!==e&&e.$$disconnected){var t=e.$parent;e.$$disconnected=!1,e.$broadcast("$ionic.reconnectScope"),e.$$prevSibling=t.$$childTail,t.$$childHead?(t.$$childTail.$$nextSibling=e,t.$$childTail=e):t.$$childHead=t.$$childTail=e}},isScopeDisconnected:function(e){for(var t=e;t;){if(t.$$disconnected)return!0;t=t.$parent}return!1}},e.inherit=e.Utils.inherit,e.extend=e.Utils.extend,e.throttle=e.Utils.throttle,e.proxy=e.Utils.proxy,e.debounce=e.Utils.debounce}(window.ionic);var j,K,J,Q,et=A(),tt=0,nt="keyboard-open",it="scroll";ionic.keyboard={isOpen:!1,height:null,landscape:!1,hide:function(){clearTimeout(J),clearTimeout(K),clearTimeout(Q),ionic.keyboard.isOpen=!1,ionic.trigger("resetScrollView",{target:j},!0),ionic.requestAnimationFrame(function(){document.body.classList.remove(nt)}),window.navigator.msPointerEnabled?document.removeEventListener("MSPointerMove",N):document.removeEventListener("touchmove",N),document.removeEventListener("keydown",M),C()&&cordova.plugins.Keyboard.close()},show:function(){C()&&cordova.plugins.Keyboard.show()}},ionic.Platform.ready(function(){x(),setTimeout(x,999),window.navigator.msPointerEnabled?document.addEventListener("MSPointerDown",S,!1):document.addEventListener("touchstart",S,!1)});var rt,ot={};ionic.viewport={orientation:function(){return window.innerWidth>window.innerHeight?90:0}},ionic.Platform.ready(function(){O(),window.addEventListener("orientationchange",function(){setTimeout(R,1e3)},!1)}),function(e){"use strict";e.views.View=function(){this.initialize.apply(this,arguments)},e.views.View.inherit=e.inherit,e.extend(e.views.View.prototype,{initialize:function(){}})}(window.ionic);var st={effect:{}};!function(e){var t=Date.now||function(){return+new Date},n=60,i=1e3,r={},o=1;st.effect.Animate={requestAnimationFrame:function(){var t=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame,n=!!t;if(t&&!/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(t.toString())&&(n=!1),n)return function(e,n){t(e,n)};var i=60,r={},o=0,s=1,a=null,l=+new Date;return function(e){var t=s++;return r[t]=e,o++,null===a&&(a=setInterval(function(){var e=+new Date,t=r;r={},o=0;for(var n in t)t.hasOwnProperty(n)&&(t[n](e),l=e);e-l>2500&&(clearInterval(a),a=null)},1e3/i)),t}}(),stop:function(e){var t=null!=r[e];return t&&(r[e]=null),t},isRunning:function(e){return null!=r[e]},start:function(e,s,a,l,c,u){var d=t(),h=d,_=0,f=0,p=o++;if(u||(u=document.body),p%20===0){var m={};for(var g in r)m[g]=!0;r=m}var v=function(o){var m=o!==!0,g=t();if(!r[p]||s&&!s(p))return r[p]=null,void(a&&a(n-f/((g-d)/i),p,!1));if(m)for(var T=Math.round((g-h)/(i/n))-1,E=0;E<Math.min(T,4);E++)v(!0),f++;l&&(_=(g-d)/l,_>1&&(_=1));var S=c?c(_):_;e(S,g,m)!==!1&&1!==_||!m?m&&(h=g,st.effect.Animate.requestAnimationFrame(v,u)):(r[p]=null,a&&a(n-f/((g-d)/i),p,1===_||null==l))};return r[p]=!0,st.effect.Animate.requestAnimationFrame(v,u),p}}}(this);!function(e){var t=function(){},n=function(e){return Math.pow(e-1,3)+1},i=function(e){return(e/=.5)<1?.5*Math.pow(e,3):.5*(Math.pow(e-2,3)+2)};e.views.Scroll=e.views.View.inherit({initialize:function(n){var i=this;i.__container=n.el,i.__content=n.el.firstElementChild,setTimeout(function(){i.__container&&i.__content&&(i.__container.scrollTop=0,i.__content.scrollTop=0)}),i.options={scrollingX:!1,scrollbarX:!0,scrollingY:!0,scrollbarY:!0,startX:0,startY:0,wheelDampen:6,minScrollbarSizeX:5,minScrollbarSizeY:5,scrollbarsFade:!0,scrollbarFadeDelay:300,scrollbarResizeFadeDelay:1e3,animating:!0,animationDuration:250,bouncing:!0,locking:!0,paging:!1,snapping:!1,zooming:!1,minZoom:.5,maxZoom:3,speedMultiplier:1,deceleration:.97,preventDefault:!1,scrollingComplete:t,penetrationDeceleration:.03,penetrationAcceleration:.08,scrollEventInterval:10,getContentWidth:function(){return Math.max(i.__content.scrollWidth,i.__content.offsetWidth)},getContentHeight:function(){return Math.max(i.__content.scrollHeight,i.__content.offsetHeight+2*i.__content.offsetTop)}};for(var r in n)i.options[r]=n[r];i.hintResize=e.debounce(function(){i.resize()},1e3,!0),i.onScroll=function(){e.scroll.isScrolling?(clearTimeout(i.scrollTimer),i.scrollTimer=setTimeout(i.setScrollStop,80)):setTimeout(i.setScrollStart,50)},i.setScrollStart=function(){e.scroll.isScrolling=Math.abs(e.scroll.lastTop-i.__scrollTop)>1,clearTimeout(i.scrollTimer),i.scrollTimer=setTimeout(i.setScrollStop,80)},i.setScrollStop=function(){e.scroll.isScrolling=!1,e.scroll.lastTop=i.__scrollTop},i.triggerScrollEvent=e.throttle(function(){i.onScroll(),e.trigger("scroll",{scrollTop:i.__scrollTop,scrollLeft:i.__scrollLeft,target:i.__container})},i.options.scrollEventInterval),i.triggerScrollEndEvent=function(){e.trigger("scrollend",{scrollTop:i.__scrollTop,scrollLeft:i.__scrollLeft,target:i.__container})},i.__scrollLeft=i.options.startX,i.__scrollTop=i.options.startY,i.__callback=i.getRenderFn(),i.__initEventHandlers(),i.__createScrollbars()},run:function(){this.resize(),this.__fadeScrollbars("out",this.options.scrollbarResizeFadeDelay)},__isSingleTouch:!1,__isTracking:!1,__didDecelerationComplete:!1,__isGesturing:!1,__isDragging:!1,__isDecelerating:!1,__isAnimating:!1,__clientLeft:0,__clientTop:0,__clientWidth:0,__clientHeight:0,__contentWidth:0,__contentHeight:0,__snapWidth:100,__snapHeight:100,__refreshHeight:null,__refreshActive:!1,__refreshActivate:null,__refreshDeactivate:null,__refreshStart:null,__zoomLevel:1,__scrollLeft:0,__scrollTop:0,__maxScrollLeft:0,__maxScrollTop:0,__scheduledLeft:0,__scheduledTop:0,__scheduledZoom:0,__lastTouchLeft:null,__lastTouchTop:null,__lastTouchMove:null,__positions:null,__minDecelerationScrollLeft:null,__minDecelerationScrollTop:null,__maxDecelerationScrollLeft:null,__maxDecelerationScrollTop:null,__decelerationVelocityX:null,__decelerationVelocityY:null,__transformProperty:null,__perspectiveProperty:null,__indicatorX:null,__indicatorY:null,__scrollbarFadeTimeout:null,__didWaitForSize:null,__sizerTimeout:null,__initEventHandlers:function(){function t(e){return e.touches&&e.touches.length?e.touches:[{pageX:e.pageX,pageY:e.pageY}]}var n=this,i=n.__container;if(n.scrollChildIntoView=function(t){var r;if(!n.isScrolledIntoView){if(e.Platform.isIOS()||e.Platform.isFullScreen){r=i.getBoundingClientRect().bottom;var o=t.detail.viewportHeight-r,s=Math.max(0,t.detail.keyboardHeight-o);i.style.height=i.clientHeight-s+"px",i.style.overflow="visible",n.resize()}n.isScrolledIntoView=!0}if(t.detail.isElementUnderKeyboard){var a;a=e.Platform.isAndroid()&&!e.Platform.isFullScreen?e.Platform.version()<4.4?500:350:80,e.scroll.isScrolling=!0,setTimeout(function(){var o=.5*i.clientHeight;r=i.getBoundingClientRect().bottom;var s=t.detail.elementTop-r,a=s+o;a>0&&(e.tap.cloneFocusedInput(i,n),n.scrollBy(0,a,!0),n.onScroll())},a)}t.stopPropagation()},n.resetScrollView=function(){n.isScrolledIntoView&&(n.isScrolledIntoView=!1,i.style.height="",i.style.overflow="",n.resize(),e.scroll.isScrolling=!1)},i.addEventListener("scrollChildIntoView",n.scrollChildIntoView),i.addEventListener("resetScrollView",n.resetScrollView),n.touchStart=function(i){if(n.startCoordinates=e.tap.pointerCoord(i),!e.tap.ignoreScrollStart(i)){if(n.__isDown=!0,e.tap.containsOrIsTextInput(i.target)||"SELECT"===i.target.tagName)return void(n.__hasStarted=!1);n.__isSelectable=!0,n.__enableScrollY=!0,n.__hasStarted=!0,n.doTouchStart(t(i),i.timeStamp),i.preventDefault()}},n.touchMove=function(r){if(!(!n.__isDown||!n.__isDown&&r.defaultPrevented||"TEXTAREA"===r.target.tagName&&r.target.parentElement.querySelector(":focus"))){if(!n.__hasStarted&&(e.tap.containsOrIsTextInput(r.target)||"SELECT"===r.target.tagName))return n.__hasStarted=!0,n.doTouchStart(t(r),r.timeStamp),void r.preventDefault();if(n.startCoordinates){var o=e.tap.pointerCoord(r);n.__isSelectable&&e.tap.isTextInput(r.target)&&Math.abs(n.startCoordinates.x-o.x)>20&&(n.__enableScrollY=!1,n.__isSelectable=!0),n.__enableScrollY&&Math.abs(n.startCoordinates.y-o.y)>10&&(n.__isSelectable=!1,e.tap.cloneFocusedInput(i,n))}n.doTouchMove(t(r),r.timeStamp,r.scale),n.__isDown=!0}},n.touchMoveBubble=function(e){n.__isDown&&n.options.preventDefault&&e.preventDefault()},n.touchEnd=function(t){n.__isDown&&(n.doTouchEnd(t.timeStamp),n.__isDown=!1,n.__hasStarted=!1,n.__isSelectable=!0,n.__enableScrollY=!0,n.__isDragging||n.__isDecelerating||n.__isAnimating||e.tap.removeClonedInputs(i,n))},"ontouchstart"in window)i.addEventListener("touchstart",n.touchStart,!1),n.options.preventDefault&&i.addEventListener("touchmove",n.touchMoveBubble,!1),document.addEventListener("touchmove",n.touchMove,!1),document.addEventListener("touchend",n.touchEnd,!1),document.addEventListener("touchcancel",n.touchEnd,!1);else if(window.navigator.pointerEnabled)i.addEventListener("pointerdown",n.touchStart,!1),n.options.preventDefault&&i.addEventListener("pointermove",n.touchMoveBubble,!1),document.addEventListener("pointermove",n.touchMove,!1),document.addEventListener("pointerup",n.touchEnd,!1),document.addEventListener("pointercancel",n.touchEnd,!1);else if(window.navigator.msPointerEnabled)i.addEventListener("MSPointerDown",n.touchStart,!1),n.options.preventDefault&&i.addEventListener("MSPointerMove",n.touchMoveBubble,!1),document.addEventListener("MSPointerMove",n.touchMove,!1),document.addEventListener("MSPointerUp",n.touchEnd,!1),document.addEventListener("MSPointerCancel",n.touchEnd,!1);else{var r=!1;n.mouseDown=function(i){e.tap.ignoreScrollStart(i)||"SELECT"===i.target.tagName||(n.doTouchStart(t(i),i.timeStamp),e.tap.isTextInput(i.target)||i.preventDefault(),r=!0)},n.mouseMove=function(e){!r||!r&&e.defaultPrevented||(n.doTouchMove(t(e),e.timeStamp),r=!0)},n.mouseMoveBubble=function(e){r&&n.options.preventDefault&&e.preventDefault()},n.mouseUp=function(e){r&&(n.doTouchEnd(e.timeStamp),r=!1)},n.mouseWheel=e.animationFrameThrottle(function(t){var i=e.DomUtil.getParentOrSelfWithClass(t.target,"ionic-scroll");i===n.__container&&(n.hintResize(),n.scrollBy((t.wheelDeltaX||t.deltaX||0)/n.options.wheelDampen,(-t.wheelDeltaY||t.deltaY||0)/n.options.wheelDampen),n.__fadeScrollbars("in"),clearTimeout(n.__wheelHideBarTimeout),n.__wheelHideBarTimeout=setTimeout(function(){n.__fadeScrollbars("out")},100))}),i.addEventListener("mousedown",n.mouseDown,!1),n.options.preventDefault&&i.addEventListener("mousemove",n.mouseMoveBubble,!1),document.addEventListener("mousemove",n.mouseMove,!1),document.addEventListener("mouseup",n.mouseUp,!1),document.addEventListener("mousewheel",n.mouseWheel,!1),document.addEventListener("wheel",n.mouseWheel,!1)}},__cleanup:function(){var t=this,n=t.__container;n.removeEventListener("touchstart",t.touchStart),n.removeEventListener("touchmove",t.touchMoveBubble),document.removeEventListener("touchmove",t.touchMove),document.removeEventListener("touchend",t.touchEnd),document.removeEventListener("touchcancel",t.touchCancel),n.removeEventListener("pointerdown",t.touchStart),n.removeEventListener("pointermove",t.touchMoveBubble),document.removeEventListener("pointermove",t.touchMove),document.removeEventListener("pointerup",t.touchEnd),document.removeEventListener("pointercancel",t.touchEnd),n.removeEventListener("MSPointerDown",t.touchStart),n.removeEventListener("MSPointerMove",t.touchMoveBubble),document.removeEventListener("MSPointerMove",t.touchMove),document.removeEventListener("MSPointerUp",t.touchEnd),document.removeEventListener("MSPointerCancel",t.touchEnd),n.removeEventListener("mousedown",t.mouseDown),n.removeEventListener("mousemove",t.mouseMoveBubble),document.removeEventListener("mousemove",t.mouseMove),document.removeEventListener("mouseup",t.mouseUp),document.removeEventListener("mousewheel",t.mouseWheel),document.removeEventListener("wheel",t.mouseWheel),n.removeEventListener("scrollChildIntoView",t.scrollChildIntoView),n.removeEventListener("resetScrollView",t.resetScrollView),e.tap.removeClonedInputs(n,t),delete t.__container,delete t.__content,delete t.__indicatorX,delete t.__indicatorY,delete t.options.el,t.__callback=t.scrollChildIntoView=t.resetScrollView=angular.noop,t.mouseMove=t.mouseDown=t.mouseUp=t.mouseWheel=t.touchStart=t.touchMove=t.touchEnd=t.touchCancel=angular.noop,t.resize=t.scrollTo=t.zoomTo=t.__scrollingComplete=angular.noop,n=null},__createScrollbar:function(e){var t=document.createElement("div"),n=document.createElement("div");return n.className="scroll-bar-indicator scroll-bar-fade-out",t.className="h"==e?"scroll-bar scroll-bar-h":"scroll-bar scroll-bar-v",t.appendChild(n),t},__createScrollbars:function(){var e,t,n=this;n.options.scrollingX&&(e={el:n.__createScrollbar("h"),sizeRatio:1},e.indicator=e.el.children[0],n.options.scrollbarX&&n.__container.appendChild(e.el),n.__indicatorX=e),n.options.scrollingY&&(t={el:n.__createScrollbar("v"),sizeRatio:1},t.indicator=t.el.children[0],n.options.scrollbarY&&n.__container.appendChild(t.el),n.__indicatorY=t)},__resizeScrollbars:function(){var t=this;if(t.__indicatorX){var n=Math.max(Math.round(t.__clientWidth*t.__clientWidth/t.__contentWidth),20);n>t.__contentWidth&&(n=0),n!==t.__indicatorX.size&&e.requestAnimationFrame(function(){t.__indicatorX.indicator.style.width=n+"px"}),t.__indicatorX.size=n,t.__indicatorX.minScale=t.options.minScrollbarSizeX/n,t.__indicatorX.maxPos=t.__clientWidth-n,t.__indicatorX.sizeRatio=t.__maxScrollLeft?t.__indicatorX.maxPos/t.__maxScrollLeft:1}if(t.__indicatorY){var i=Math.max(Math.round(t.__clientHeight*t.__clientHeight/t.__contentHeight),20);i>t.__contentHeight&&(i=0),i!==t.__indicatorY.size&&e.requestAnimationFrame(function(){t.__indicatorY&&(t.__indicatorY.indicator.style.height=i+"px")}),t.__indicatorY.size=i,t.__indicatorY.minScale=t.options.minScrollbarSizeY/i,t.__indicatorY.maxPos=t.__clientHeight-i,t.__indicatorY.sizeRatio=t.__maxScrollTop?t.__indicatorY.maxPos/t.__maxScrollTop:1}},__repositionScrollbars:function(){var e,t,n,i,r,o=this,s=0,a=0;if(o.__indicatorX){o.__indicatorY&&(s=10),i=Math.round(o.__indicatorX.sizeRatio*o.__scrollLeft)||0,t=o.__scrollLeft-(o.__maxScrollLeft-s),o.__scrollLeft<0?(widthScale=Math.max(o.__indicatorX.minScale,(o.__indicatorX.size-Math.abs(o.__scrollLeft))/o.__indicatorX.size),i=0,o.__indicatorX.indicator.style[o.__transformOriginProperty]="left center"):t>0?(widthScale=Math.max(o.__indicatorX.minScale,(o.__indicatorX.size-t)/o.__indicatorX.size),i=o.__indicatorX.maxPos-s,o.__indicatorX.indicator.style[o.__transformOriginProperty]="right center"):(i=Math.min(o.__maxScrollLeft,Math.max(0,i)),widthScale=1);var l="translate3d("+i+"px, 0, 0) scaleX("+widthScale+")";o.__indicatorX.transformProp!==l&&(o.__indicatorX.indicator.style[o.__transformProperty]=l,o.__indicatorX.transformProp=l)}if(o.__indicatorY){r=Math.round(o.__indicatorY.sizeRatio*o.__scrollTop)||0,o.__indicatorX&&(a=10),n=o.__scrollTop-(o.__maxScrollTop-a),o.__scrollTop<0?(e=Math.max(o.__indicatorY.minScale,(o.__indicatorY.size-Math.abs(o.__scrollTop))/o.__indicatorY.size),r=0,"center top"!==o.__indicatorY.originProp&&(o.__indicatorY.indicator.style[o.__transformOriginProperty]="center top",o.__indicatorY.originProp="center top")):n>0?(e=Math.max(o.__indicatorY.minScale,(o.__indicatorY.size-n)/o.__indicatorY.size),r=o.__indicatorY.maxPos-a,"center bottom"!==o.__indicatorY.originProp&&(o.__indicatorY.indicator.style[o.__transformOriginProperty]="center bottom",o.__indicatorY.originProp="center bottom")):(r=Math.min(o.__maxScrollTop,Math.max(0,r)),e=1);var c="translate3d(0,"+r+"px, 0) scaleY("+e+")";o.__indicatorY.transformProp!==c&&(o.__indicatorY.indicator.style[o.__transformProperty]=c,o.__indicatorY.transformProp=c)}},__fadeScrollbars:function(e,t){var n=this;if(n.options.scrollbarsFade){var i="scroll-bar-fade-out";n.options.scrollbarsFade===!0&&(clearTimeout(n.__scrollbarFadeTimeout),"in"==e?(n.__indicatorX&&n.__indicatorX.indicator.classList.remove(i),n.__indicatorY&&n.__indicatorY.indicator.classList.remove(i)):n.__scrollbarFadeTimeout=setTimeout(function(){n.__indicatorX&&n.__indicatorX.indicator.classList.add(i),n.__indicatorY&&n.__indicatorY.indicator.classList.add(i)},t||n.options.scrollbarFadeDelay))}},__scrollingComplete:function(){this.options.scrollingComplete(),e.tap.removeClonedInputs(this.__container,this),this.__fadeScrollbars("out")},resize:function(){var e=this;e.__container&&e.options&&e.setDimensions(e.__container.clientWidth,e.__container.clientHeight,e.options.getContentWidth(),e.options.getContentHeight())},getRenderFn:function(){var e,t=this,n=t.__content,i=document.documentElement.style;"MozAppearance"in i?e="gecko":"WebkitAppearance"in i?e="webkit":"string"==typeof navigator.cpuClass&&(e="trident");var r,o={trident:"ms",gecko:"Moz",webkit:"Webkit",presto:"O"}[e],s=document.createElement("div"),a=o+"Perspective",l=o+"Transform",c=o+"TransformOrigin";return t.__perspectiveProperty=l,t.__transformProperty=l,t.__transformOriginProperty=c,s.style[a]!==r?function(e,i,r,o){var s="translate3d("+-e+"px,"+-i+"px,0) scale("+r+")";s!==t.contentTransform&&(n.style[l]=s,t.contentTransform=s),t.__repositionScrollbars(),o||t.triggerScrollEvent()}:s.style[l]!==r?function(e,i,r,o){n.style[l]="translate("+-e+"px,"+-i+"px) scale("+r+")",t.__repositionScrollbars(),o||t.triggerScrollEvent()}:function(e,i,r,o){n.style.marginLeft=e?-e/r+"px":"",n.style.marginTop=i?-i/r+"px":"",n.style.zoom=r||"",t.__repositionScrollbars(),o||t.triggerScrollEvent()}},setDimensions:function(e,t,n,i){var r=this;(e||t||n||i)&&(e===+e&&(r.__clientWidth=e),t===+t&&(r.__clientHeight=t),n===+n&&(r.__contentWidth=n),i===+i&&(r.__contentHeight=i),r.__computeScrollMax(),r.__resizeScrollbars(),r.scrollTo(r.__scrollLeft,r.__scrollTop,!0,null,!0))},setPosition:function(e,t){this.__clientLeft=e||0,this.__clientTop=t||0},setSnapSize:function(e,t){this.__snapWidth=e,this.__snapHeight=t},activatePullToRefresh:function(t,n,i,r,o,s,a){var l=this;l.__refreshHeight=t,l.__refreshActivate=function(){e.requestAnimationFrame(n)},l.__refreshDeactivate=function(){e.requestAnimationFrame(i)},l.__refreshStart=function(){e.requestAnimationFrame(r)},l.__refreshShow=function(){e.requestAnimationFrame(o)},l.__refreshHide=function(){e.requestAnimationFrame(s)},l.__refreshTail=function(){e.requestAnimationFrame(a)},l.__refreshTailTime=100,l.__minSpinTime=600},triggerPullToRefresh:function(){this.__publish(this.__scrollLeft,-this.__refreshHeight,this.__zoomLevel,!0);var e=new Date;this.refreshStartTime=e.getTime(),this.__refreshStart&&this.__refreshStart()},finishPullToRefresh:function(){var e=this,t=new Date,n=0;e.refreshStartTime+e.__minSpinTime>t.getTime()&&(n=e.refreshStartTime+e.__minSpinTime-t.getTime()),setTimeout(function(){e.__refreshTail&&e.__refreshTail(),setTimeout(function(){e.__refreshActive=!1,e.__refreshDeactivate&&e.__refreshDeactivate(),e.__refreshHide&&e.__refreshHide(),e.scrollTo(e.__scrollLeft,e.__scrollTop,!0)},e.__refreshTailTime)},n)},getValues:function(){return{left:this.__scrollLeft,top:this.__scrollTop,zoom:this.__zoomLevel}},getScrollMax:function(){return{left:this.__maxScrollLeft,top:this.__maxScrollTop}},zoomTo:function(e,t,n,i){var r=this;if(!r.options.zooming)throw new Error("Zooming is not enabled!");r.__isDecelerating&&(st.effect.Animate.stop(r.__isDecelerating),r.__isDecelerating=!1);var o=r.__zoomLevel;null==n&&(n=r.__clientWidth/2),null==i&&(i=r.__clientHeight/2),e=Math.max(Math.min(e,r.options.maxZoom),r.options.minZoom),r.__computeScrollMax(e);var s=(n+r.__scrollLeft)*e/o-n,a=(i+r.__scrollTop)*e/o-i;s>r.__maxScrollLeft?s=r.__maxScrollLeft:0>s&&(s=0),a>r.__maxScrollTop?a=r.__maxScrollTop:0>a&&(a=0),r.__publish(s,a,e,t)},zoomBy:function(e,t,n,i){this.zoomTo(this.__zoomLevel*e,t,n,i)},scrollTo:function(e,t,n,i,r){var o=this;if(o.__isDecelerating&&(st.effect.Animate.stop(o.__isDecelerating),o.__isDecelerating=!1),null!=i&&i!==o.__zoomLevel){if(!o.options.zooming)throw new Error("Zooming is not enabled!");e*=i,t*=i,o.__computeScrollMax(i)}else i=o.__zoomLevel;o.options.scrollingX?o.options.paging?e=Math.round(e/o.__clientWidth)*o.__clientWidth:o.options.snapping&&(e=Math.round(e/o.__snapWidth)*o.__snapWidth):e=o.__scrollLeft,o.options.scrollingY?o.options.paging?t=Math.round(t/o.__clientHeight)*o.__clientHeight:o.options.snapping&&(t=Math.round(t/o.__snapHeight)*o.__snapHeight):t=o.__scrollTop,e=Math.max(Math.min(o.__maxScrollLeft,e),0),t=Math.max(Math.min(o.__maxScrollTop,t),0),e===o.__scrollLeft&&t===o.__scrollTop&&(n=!1),o.__publish(e,t,i,n,r)},scrollBy:function(e,t,n){var i=this,r=i.__isAnimating?i.__scheduledLeft:i.__scrollLeft,o=i.__isAnimating?i.__scheduledTop:i.__scrollTop;i.scrollTo(r+(e||0),o+(t||0),n)},doMouseZoom:function(e,t,n,i){var r=e>0?.97:1.03;return this.zoomTo(this.__zoomLevel*r,!1,n-this.__clientLeft,i-this.__clientTop)},doTouchStart:function(e,t){var n=this;n.hintResize(),t instanceof Date&&(t=t.valueOf()),"number"!=typeof t&&(t=Date.now()),n.__interruptedAnimation=!0,n.__isDecelerating&&(st.effect.Animate.stop(n.__isDecelerating),n.__isDecelerating=!1,n.__interruptedAnimation=!0),n.__isAnimating&&(st.effect.Animate.stop(n.__isAnimating),n.__isAnimating=!1,n.__interruptedAnimation=!0);var i,r,o=1===e.length;o?(i=e[0].pageX,r=e[0].pageY):(i=Math.abs(e[0].pageX+e[1].pageX)/2,r=Math.abs(e[0].pageY+e[1].pageY)/2),n.__initialTouchLeft=i,n.__initialTouchTop=r,n.__initialTouches=e,n.__zoomLevelStart=n.__zoomLevel,n.__lastTouchLeft=i,n.__lastTouchTop=r,n.__lastTouchMove=t,n.__lastScale=1,n.__enableScrollX=!o&&n.options.scrollingX,n.__enableScrollY=!o&&n.options.scrollingY,n.__isTracking=!0,n.__didDecelerationComplete=!1,n.__isDragging=!o,n.__isSingleTouch=o,n.__positions=[]},doTouchMove:function(e,t,n){t instanceof Date&&(t=t.valueOf()),"number"!=typeof t&&(t=Date.now());var i=this;if(i.__isTracking){var r,o;2===e.length?(r=Math.abs(e[0].pageX+e[1].pageX)/2,o=Math.abs(e[0].pageY+e[1].pageY)/2,!n&&i.options.zooming&&(n=i.__getScale(i.__initialTouches,e))):(r=e[0].pageX,o=e[0].pageY);var s=i.__positions;if(i.__isDragging){var a=r-i.__lastTouchLeft,l=o-i.__lastTouchTop,c=i.__scrollLeft,u=i.__scrollTop,d=i.__zoomLevel;if(null!=n&&i.options.zooming){var h=d;if(d=d/i.__lastScale*n,d=Math.max(Math.min(d,i.options.maxZoom),i.options.minZoom),h!==d){var _=r-i.__clientLeft,f=o-i.__clientTop;c=(_+c)*d/h-_,u=(f+u)*d/h-f,i.__computeScrollMax(d)}}if(i.__enableScrollX){c-=a*i.options.speedMultiplier;var p=i.__maxScrollLeft;(c>p||0>c)&&(i.options.bouncing?c+=a/2*i.options.speedMultiplier:c=c>p?p:0)}if(i.__enableScrollY){u-=l*i.options.speedMultiplier;var m=i.__maxScrollTop;u>m||0>u?i.options.bouncing||i.__refreshHeight&&0>u?(u+=l/2*i.options.speedMultiplier,i.__enableScrollX||null==i.__refreshHeight||(0>u?(i.__refreshHidden=!1,i.__refreshShow()):(i.__refreshHide(),i.__refreshHidden=!0),!i.__refreshActive&&u<=-i.__refreshHeight?(i.__refreshActive=!0,i.__refreshActivate&&i.__refreshActivate()):i.__refreshActive&&u>-i.__refreshHeight&&(i.__refreshActive=!1,i.__refreshDeactivate&&i.__refreshDeactivate()))):u=u>m?m:0:i.__refreshHeight&&!i.__refreshHidden&&(i.__refreshHide(),i.__refreshHidden=!0)}s.length>60&&s.splice(0,30),s.push(c,u,t),i.__publish(c,u,d)}else{var g=i.options.locking?3:0,v=5,T=Math.abs(r-i.__initialTouchLeft),E=Math.abs(o-i.__initialTouchTop);i.__enableScrollX=i.options.scrollingX&&T>=g,i.__enableScrollY=i.options.scrollingY&&E>=g,s.push(i.__scrollLeft,i.__scrollTop,t),i.__isDragging=(i.__enableScrollX||i.__enableScrollY)&&(T>=v||E>=v),i.__isDragging&&(i.__interruptedAnimation=!1,i.__fadeScrollbars("in"))}i.__lastTouchLeft=r,i.__lastTouchTop=o,i.__lastTouchMove=t,i.__lastScale=n}},doTouchEnd:function(t){t instanceof Date&&(t=t.valueOf()),"number"!=typeof t&&(t=Date.now());var n=this;if(n.__isTracking){if(n.__isTracking=!1,n.__isDragging)if(n.__isDragging=!1,n.__isSingleTouch&&n.options.animating&&t-n.__lastTouchMove<=100){for(var i=n.__positions,r=i.length-1,o=r,s=r;s>0&&i[s]>n.__lastTouchMove-100;s-=3)o=s;if(o!==r){var a=i[r]-i[o],l=n.__scrollLeft-i[o-2],c=n.__scrollTop-i[o-1];n.__decelerationVelocityX=l/a*(1e3/60),n.__decelerationVelocityY=c/a*(1e3/60);var u=n.options.paging||n.options.snapping?4:1;(Math.abs(n.__decelerationVelocityX)>u||Math.abs(n.__decelerationVelocityY)>u)&&(n.__refreshActive||n.__startDeceleration(t))}else n.__scrollingComplete()}else t-n.__lastTouchMove>100&&n.__scrollingComplete();if(!n.__isDecelerating)if(n.__refreshActive&&n.__refreshStart){n.__publish(n.__scrollLeft,-n.__refreshHeight,n.__zoomLevel,!0);var d=new Date;n.refreshStartTime=d.getTime(),n.__refreshStart&&n.__refreshStart(),e.Platform.isAndroid()||n.__startDeceleration()}else(n.__interruptedAnimation||n.__isDragging)&&n.__scrollingComplete(),n.scrollTo(n.__scrollLeft,n.__scrollTop,!0,n.__zoomLevel),n.__refreshActive&&(n.__refreshActive=!1,n.__refreshDeactivate&&n.__refreshDeactivate());n.__positions.length=0}},__publish:function(e,t,r,o,s){var a=this,l=a.__isAnimating;if(l&&(st.effect.Animate.stop(l),a.__isAnimating=!1),o&&a.options.animating){a.__scheduledLeft=e,a.__scheduledTop=t,a.__scheduledZoom=r;var c=a.__scrollLeft,u=a.__scrollTop,d=a.__zoomLevel,h=e-c,_=t-u,f=r-d,p=function(e,t,n){n&&(a.__scrollLeft=c+h*e,a.__scrollTop=u+_*e,a.__zoomLevel=d+f*e,a.__callback&&a.__callback(a.__scrollLeft,a.__scrollTop,a.__zoomLevel,s))},m=function(e){return a.__isAnimating===e},g=function(e,t,n){t===a.__isAnimating&&(a.__isAnimating=!1),(a.__didDecelerationComplete||n)&&a.__scrollingComplete(),a.options.zooming&&a.__computeScrollMax()};a.__isAnimating=st.effect.Animate.start(p,m,g,a.options.animationDuration,l?n:i)}else a.__scheduledLeft=a.__scrollLeft=e,a.__scheduledTop=a.__scrollTop=t,a.__scheduledZoom=a.__zoomLevel=r,a.__callback&&a.__callback(e,t,r,s),a.options.zooming&&a.__computeScrollMax()},__computeScrollMax:function(e){var t=this;null==e&&(e=t.__zoomLevel),t.__maxScrollLeft=Math.max(t.__contentWidth*e-t.__clientWidth,0),t.__maxScrollTop=Math.max(t.__contentHeight*e-t.__clientHeight,0),t.__didWaitForSize||t.__maxScrollLeft||t.__maxScrollTop||(t.__didWaitForSize=!0,t.__waitForSize())},__waitForSize:function(){var e=this;clearTimeout(e.__sizerTimeout);var t=function(){e.resize()};t(),e.__sizerTimeout=setTimeout(t,1e3)},__startDeceleration:function(){var e=this;if(e.options.paging){var t=Math.max(Math.min(e.__scrollLeft,e.__maxScrollLeft),0),n=Math.max(Math.min(e.__scrollTop,e.__maxScrollTop),0),i=e.__clientWidth,r=e.__clientHeight;e.__minDecelerationScrollLeft=Math.floor(t/i)*i,e.__minDecelerationScrollTop=Math.floor(n/r)*r,e.__maxDecelerationScrollLeft=Math.ceil(t/i)*i,e.__maxDecelerationScrollTop=Math.ceil(n/r)*r}else e.__minDecelerationScrollLeft=0,e.__minDecelerationScrollTop=0,e.__maxDecelerationScrollLeft=e.__maxScrollLeft,e.__maxDecelerationScrollTop=e.__maxScrollTop,e.__refreshActive&&(e.__minDecelerationScrollTop=-1*e.__refreshHeight);var o=function(t,n,i){e.__stepThroughDeceleration(i)};e.__minVelocityToKeepDecelerating=e.options.snapping?4:.1;var s=function(){var t=Math.abs(e.__decelerationVelocityX)>=e.__minVelocityToKeepDecelerating||Math.abs(e.__decelerationVelocityY)>=e.__minVelocityToKeepDecelerating;return t||(e.__didDecelerationComplete=!0,e.options.bouncing&&!e.__refreshActive&&e.scrollTo(Math.min(Math.max(e.__scrollLeft,0),e.__maxScrollLeft),Math.min(Math.max(e.__scrollTop,0),e.__maxScrollTop),e.__refreshActive)),t},a=function(){e.__isDecelerating=!1,e.__didDecelerationComplete&&e.__scrollingComplete(),e.options.paging&&e.scrollTo(e.__scrollLeft,e.__scrollTop,e.options.snapping)};e.__isDecelerating=st.effect.Animate.start(o,s,a)},__stepThroughDeceleration:function(e){var t=this,n=t.__scrollLeft+t.__decelerationVelocityX,i=t.__scrollTop+t.__decelerationVelocityY;if(!t.options.bouncing){var r=Math.max(Math.min(t.__maxDecelerationScrollLeft,n),t.__minDecelerationScrollLeft);r!==n&&(n=r,t.__decelerationVelocityX=0);var o=Math.max(Math.min(t.__maxDecelerationScrollTop,i),t.__minDecelerationScrollTop);o!==i&&(i=o,t.__decelerationVelocityY=0)}if(e?t.__publish(n,i,t.__zoomLevel):(t.__scrollLeft=n,t.__scrollTop=i),!t.options.paging){var s=t.options.deceleration;
t.__decelerationVelocityX*=s,t.__decelerationVelocityY*=s}if(t.options.bouncing){var a=0,l=0,c=t.options.penetrationDeceleration,u=t.options.penetrationAcceleration;if(n<t.__minDecelerationScrollLeft?a=t.__minDecelerationScrollLeft-n:n>t.__maxDecelerationScrollLeft&&(a=t.__maxDecelerationScrollLeft-n),i<t.__minDecelerationScrollTop?l=t.__minDecelerationScrollTop-i:i>t.__maxDecelerationScrollTop&&(l=t.__maxDecelerationScrollTop-i),0!==a){var d=a*t.__decelerationVelocityX<=t.__minDecelerationScrollLeft;d&&(t.__decelerationVelocityX+=a*c);var h=Math.abs(t.__decelerationVelocityX)<=t.__minVelocityToKeepDecelerating;(!d||h)&&(t.__decelerationVelocityX=a*u)}if(0!==l){var _=l*t.__decelerationVelocityY<=t.__minDecelerationScrollTop;_&&(t.__decelerationVelocityY+=l*c);var f=Math.abs(t.__decelerationVelocityY)<=t.__minVelocityToKeepDecelerating;(!_||f)&&(t.__decelerationVelocityY=l*u)}}},__getDistance:function(e,t){var n=t.pageX-e.pageX,i=t.pageY-e.pageY;return Math.sqrt(n*n+i*i)},__getScale:function(e,t){return e.length>=2&&t.length>=2?this.__getDistance(t[0],t[1])/this.__getDistance(e[0],e[1]):1}}),e.scroll={isScrolling:!1,lastTop:0}}(ionic),function(e){"use strict";var t="item",n="item-content",i="item-sliding",r="item-options",o="item-placeholder",s="item-reordering",a="item-reorder",l=function(){};l.prototype={start:function(){},drag:function(){},end:function(){},isSameItem:function(){return!1}};var c=function(e){this.dragThresholdX=e.dragThresholdX||10,this.el=e.el,this.canSwipe=e.canSwipe};c.prototype=new l,c.prototype.start=function(o){var s,a,l,c;this.canSwipe()&&(s=o.target.classList.contains(n)?o.target:o.target.classList.contains(t)?o.target.querySelector("."+n):e.DomUtil.getParentWithClass(o.target,n),s&&(s.classList.remove(i),l=parseFloat(s.style[e.CSS.TRANSFORM].replace("translate3d(","").split(",")[0])||0,a=s.parentNode.querySelector("."+r),a&&(a.classList.remove("invisible"),c=a.offsetWidth,this._currentDrag={buttons:a,buttonsWidth:c,content:s,startOffsetX:l})))},c.prototype.isSameItem=function(e){return e._lastDrag&&this._currentDrag?this._currentDrag.content==e._lastDrag.content:!1},c.prototype.clean=function(){var t=this._lastDrag;t&&t.content&&(t.content.style[e.CSS.TRANSITION]="",t.content.style[e.CSS.TRANSFORM]="",e.requestAnimationFrame(function(){setTimeout(function(){t.buttons&&t.buttons.classList.add("invisible")},250)}))},c.prototype.drag=e.animationFrameThrottle(function(t){var n;if(this._currentDrag&&(!this._isDragging&&(Math.abs(t.gesture.deltaX)>this.dragThresholdX||Math.abs(this._currentDrag.startOffsetX)>0)&&(this._isDragging=!0),this._isDragging)){n=this._currentDrag.buttonsWidth;var i=Math.min(0,this._currentDrag.startOffsetX+t.gesture.deltaX);-n>i&&(i=Math.min(-n,-n+.4*(t.gesture.deltaX+n))),this._currentDrag.content.style[e.CSS.TRANSFORM]="translate3d("+i+"px, 0, 0)",this._currentDrag.content.style[e.CSS.TRANSITION]="none"}}),c.prototype.end=function(t,n){var i=this;if(!this._currentDrag)return void(n&&n());var r=-this._currentDrag.buttonsWidth;t.gesture.deltaX>-(this._currentDrag.buttonsWidth/2)&&("left"==t.gesture.direction&&Math.abs(t.gesture.velocityX)<.3?r=0:"right"==t.gesture.direction&&(r=0)),e.requestAnimationFrame(function(){if(0===r){i._currentDrag.content.style[e.CSS.TRANSFORM]="";var t=i._currentDrag.buttons;setTimeout(function(){t&&t.classList.add("invisible")},250)}else i._currentDrag.content.style[e.CSS.TRANSFORM]="translate3d("+r+"px, 0, 0)";i._currentDrag.content.style[e.CSS.TRANSITION]="",i._lastDrag||(i._lastDrag={}),angular.extend(i._lastDrag,i._currentDrag),i._currentDrag&&(i._currentDrag.buttons=null,i._currentDrag.content=null),i._currentDrag=null,n&&n()})};var u=function(e){if(this.dragThresholdY=e.dragThresholdY||0,this.onReorder=e.onReorder,this.listEl=e.listEl,this.el=e.el,this.scrollEl=e.scrollEl,this.scrollView=e.scrollView,this.listElTrueTop=0,this.listEl.offsetParent){var t=this.listEl;do this.listElTrueTop+=t.offsetTop,t=t.offsetParent;while(t)}};u.prototype=new l,u.prototype._moveElement=function(t){var n=t.gesture.center.pageY+this.scrollView.getValues().top-this._currentDrag.elementHeight/2-this.listElTrueTop;this.el.style[e.CSS.TRANSFORM]="translate3d(0, "+n+"px, 0)"},u.prototype.deregister=function(){this.listEl=null,this.el=null,this.scrollEl=null,this.scrollView=null},u.prototype.start=function(t){var n=e.DomUtil.getChildIndex(this.el,this.el.nodeName.toLowerCase()),i=this.el.scrollHeight,r=this.el.cloneNode(!0);r.classList.add(o),this.el.parentNode.insertBefore(r,this.el),this.el.classList.add(s),this._currentDrag={elementHeight:i,startIndex:n,placeholder:r,scrollHeight:scroll,list:r.parentNode},this._moveElement(t)},u.prototype.drag=e.animationFrameThrottle(function(t){var n=this;if(this._currentDrag){var i=0,r=t.gesture.center.pageY,o=this.listElTrueTop;if(this.scrollView){var s=this.scrollView.__container;i=this.scrollView.getValues().top;var a=s.offsetTop,l=a-r+this._currentDrag.elementHeight/2,c=r+this._currentDrag.elementHeight/2-a-s.offsetHeight;t.gesture.deltaY<0&&l>0&&i>0&&(this.scrollView.scrollBy(null,-l),e.requestAnimationFrame(function(){n.drag(t)})),t.gesture.deltaY>0&&c>0&&i<this.scrollView.getScrollMax().top&&(this.scrollView.scrollBy(null,c),e.requestAnimationFrame(function(){n.drag(t)}))}!this._isDragging&&Math.abs(t.gesture.deltaY)>this.dragThresholdY&&(this._isDragging=!0),this._isDragging&&(this._moveElement(t),this._currentDrag.currentY=i+r-o)}}),u.prototype._getReorderIndex=function(){for(var e,t=this,n=(this._currentDrag.placeholder,Array.prototype.slice.call(this._currentDrag.placeholder.parentNode.children).filter(function(e){return e.nodeName===t.el.nodeName&&e!==t.el})),i=this._currentDrag.currentY,r=0,o=n.length;o>r;r++)if(e=n[r],r===o-1){if(i>e.offsetTop)return r}else if(0===r){if(i<e.offsetTop+e.offsetHeight)return r}else if(i>e.offsetTop-e.offsetHeight/2&&i<e.offsetTop+e.offsetHeight)return r;return this._currentDrag.startIndex},u.prototype.end=function(t,n){if(!this._currentDrag)return void(n&&n());var i=this._currentDrag.placeholder,r=this._getReorderIndex();this.el.classList.remove(s),this.el.style[e.CSS.TRANSFORM]="",i.parentNode.insertBefore(this.el,i),i.parentNode.removeChild(i),this.onReorder&&this.onReorder(this.el,this._currentDrag.startIndex,r),this._currentDrag={placeholder:null,content:null},this._currentDrag=null,n&&n()},e.views.ListView=e.views.View.inherit({initialize:function(t){var n=this;t=e.extend({onReorder:function(){},virtualRemoveThreshold:-200,virtualAddThreshold:200,canSwipe:function(){return!0}},t),e.extend(this,t),!this.itemHeight&&this.listEl&&(this.itemHeight=this.listEl.children[0]&&parseInt(this.listEl.children[0].style.height,10)),this.onRefresh=t.onRefresh||function(){},this.onRefreshOpening=t.onRefreshOpening||function(){},this.onRefreshHolding=t.onRefreshHolding||function(){},window.ionic.onGesture("release",function(e){n._handleEndDrag(e)},this.el),window.ionic.onGesture("drag",function(e){n._handleDrag(e)},this.el),this._initDrag()},deregister:function(){this.el=null,this.listEl=null,this.scrollEl=null,this.scrollView=null},stopRefreshing:function(){var e=this.el.querySelector(".list-refresher");e.style.height="0"},didScroll:function(e){if(this.isVirtual){var t=this.itemHeight,n=(this.listEl.children.length,e.target.scrollHeight),i=this.el.parentNode.offsetHeight,r=(e.scrollTop,Math.max(0,e.scrollTop+this.virtualRemoveThreshold)),o=Math.min(n,Math.abs(e.scrollTop)+i+this.virtualAddThreshold),s=Math.floor((o-r)/t),a=parseInt(Math.abs(r/t),10),l=parseInt(Math.abs(o/t),10);this._virtualItemsToRemove=Array.prototype.slice.call(this.listEl.children,0,a);{Array.prototype.slice.call(this.listEl.children,a,a+s)}this.renderViewport&&this.renderViewport(r,o,a,l)}},didStopScrolling:function(){if(this.isVirtual)for(var e=0;e<this._virtualItemsToRemove.length;e++){{this._virtualItemsToRemove[e]}this.didHideItem&&this.didHideItem(e)}},clearDragEffects:function(){this._lastDragOp&&(this._lastDragOp.clean&&this._lastDragOp.clean(),this._lastDragOp.deregister&&this._lastDragOp.deregister(),this._lastDragOp=null)},_initDrag:function(){this._lastDragOp&&this._lastDragOp.deregister&&this._lastDragOp.deregister(),this._lastDragOp=this._dragOp,this._dragOp=null},_getItem:function(e){for(;e;){if(e.classList&&e.classList.contains(t))return e;e=e.parentNode}return null},_startDrag:function(t){var n=this;this._isDragging=!1;var i,r=this._lastDragOp;this._didDragUpOrDown&&r instanceof c&&r.clean&&r.clean(),!e.DomUtil.getParentOrSelfWithClass(t.target,a)||"up"!=t.gesture.direction&&"down"!=t.gesture.direction?!this._didDragUpOrDown&&("left"==t.gesture.direction||"right"==t.gesture.direction)&&Math.abs(t.gesture.deltaX)>5&&(i=this._getItem(t.target),i&&i.querySelector(".item-options")&&(this._dragOp=new c({el:this.el,canSwipe:this.canSwipe}),this._dragOp.start(t),t.preventDefault())):(i=this._getItem(t.target),i&&(this._dragOp=new u({listEl:this.el,el:i,scrollEl:this.scrollEl,scrollView:this.scrollView,onReorder:function(e,t,i){n.onReorder&&n.onReorder(e,t,i)}}),this._dragOp.start(t),t.preventDefault())),r&&this._dragOp&&!this._dragOp.isSameItem(r)&&t.defaultPrevented&&r.clean&&r.clean()},_handleEndDrag:function(e){var t=this;this._didDragUpOrDown=!1,this._dragOp&&this._dragOp.end(e,function(){t._initDrag()})},_handleDrag:function(e){Math.abs(e.gesture.deltaY)>5&&(this._didDragUpOrDown=!0),this.isDragging||this._dragOp||this._startDrag(e),this._dragOp&&(e.gesture.srcEvent.preventDefault(),this._dragOp.drag(e))}})}(ionic),function(e){"use strict";e.views.Modal=e.views.View.inherit({initialize:function(t){t=e.extend({focusFirstInput:!1,unfocusOnHide:!0,focusFirstDelay:600,backdropClickToClose:!0,hardwareBackButtonClose:!0},t),e.extend(this,t),this.el=t.el},show:function(){var e=this;e.focusFirstInput&&window.setTimeout(function(){var t=e.el.querySelector("input, textarea");t&&t.focus&&t.focus()},e.focusFirstDelay)},hide:function(){if(this.unfocusOnHide){var e=this.el.querySelectorAll("input, textarea");window.setTimeout(function(){for(var t=0;t<e.length;t++)e[t].blur&&e[t].blur()})}}})}(ionic),function(e){"use strict";e.views.SideMenu=e.views.View.inherit({initialize:function(e){this.el=e.el,this.isEnabled="undefined"==typeof e.isEnabled?!0:e.isEnabled,this.setWidth(e.width)},getFullWidth:function(){return this.width},setWidth:function(e){this.width=e,this.el.style.width=e+"px"},setIsEnabled:function(e){this.isEnabled=e},bringUp:function(){"0"!==this.el.style.zIndex&&(this.el.style.zIndex="0")},pushDown:function(){"-1"!==this.el.style.zIndex&&(this.el.style.zIndex="-1")}}),e.views.SideMenuContent=e.views.View.inherit({initialize:function(t){e.extend(this,{animationClass:"menu-animated",onDrag:function(){},onEndDrag:function(){}},t),e.onGesture("drag",e.proxy(this._onDrag,this),this.el),e.onGesture("release",e.proxy(this._onEndDrag,this),this.el)},_onDrag:function(e){this.onDrag&&this.onDrag(e)},_onEndDrag:function(e){this.onEndDrag&&this.onEndDrag(e)},disableAnimation:function(){this.el.classList.remove(this.animationClass)},enableAnimation:function(){this.el.classList.add(this.animationClass)},getTranslateX:function(){return parseFloat(this.el.style[e.CSS.TRANSFORM].replace("translate3d(","").split(",")[0])},setTranslateX:e.animationFrameThrottle(function(t){this.el.style[e.CSS.TRANSFORM]="translate3d("+t+"px, 0, 0)"})})}(ionic),function(e){"use strict";e.views.Slider=e.views.View.inherit({initialize:function(e){function t(){m=E.children,T=m.length,m.length<2&&(e.continuous=!1),f.transitions&&e.continuous&&m.length<3&&(E.appendChild(m[0].cloneNode(!0)),E.appendChild(E.children[1].cloneNode(!0)),m=E.children),g=new Array(m.length),v=p.offsetWidth||p.getBoundingClientRect().width,E.style.width=m.length*v+"px";for(var t=m.length;t--;){var n=m[t];n.style.width=v+"px",n.setAttribute("data-index",t),f.transitions&&(n.style.left=t*-v+"px",s(t,S>t?-v:t>S?v:0,0))}e.continuous&&f.transitions&&(s(r(S-1),-v,0),s(r(S+1),v,0)),f.transitions||(E.style.left=S*-v+"px"),p.style.visibility="visible",e.slidesChanged&&e.slidesChanged()}function n(){e.continuous?o(S-1):S&&o(S-1)}function i(){e.continuous?o(S+1):S<m.length-1&&o(S+1)}function r(e){return(m.length+e%m.length)%m.length}function o(t,n){if(S!=t){if(f.transitions){var i=Math.abs(S-t)/(S-t);if(e.continuous){var o=i;i=-g[r(t)]/v,i!==o&&(t=-i*m.length+t)}for(var a=Math.abs(S-t)-1;a--;)s(r((t>S?t:S)-a-1),v*i,0);t=r(t),s(S,v*i,n||b),s(t,0,n||b),e.continuous&&s(r(t-i),-(v*i),0)}else t=r(t),l(S*-v,t*-v,n||b);S=t,_(e.callback&&e.callback(S,m[S]))}}function s(e,t,n){a(e,t,n),g[e]=t}function a(e,t,n){var i=m[e],r=i&&i.style;r&&(r.webkitTransitionDuration=r.MozTransitionDuration=r.msTransitionDuration=r.OTransitionDuration=r.transitionDuration=n+"ms",r.webkitTransform="translate("+t+"px,0)translateZ(0)",r.msTransform=r.MozTransform=r.OTransform="translateX("+t+"px)")}function l(t,n,i){if(!i)return void(E.style.left=n+"px");var r=+new Date,o=setInterval(function(){var s=+new Date-r;return s>i?(E.style.left=n+"px",D&&c(),e.transitionEnd&&e.transitionEnd.call(event,S,m[S]),void clearInterval(o)):void(E.style.left=(n-t)*(Math.floor(s/i*100)/100)+t+"px")},4)}function c(){w=setTimeout(i,D)}function u(){D=e.auto||0,clearTimeout(w)}var d=this,h=function(){},_=function(e){setTimeout(e||h,0)},f={addEventListener:!!window.addEventListener,touch:"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,transitions:function(e){var t=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var n in t)if(void 0!==e.style[t[n]])return!0;return!1}(document.createElement("swipe"))},p=e.el;if(p){var m,g,v,T,E=p.children[0];e=e||{};var S=parseInt(e.startSlide,10)||0,b=e.speed||300;e.continuous=void 0!==e.continuous?e.continuous:!0;var w,y,D=e.auto||0,L={},x={},M={handleEvent:function(n){switch(("mousedown"==n.type||"mouseup"==n.type||"mousemove"==n.type)&&(n.touches=[{pageX:n.pageX,pageY:n.pageY}]),n.type){case"mousedown":this.start(n);break;case"touchstart":this.start(n);break;case"touchmove":this.touchmove(n);break;case"mousemove":this.touchmove(n);break;case"touchend":_(this.end(n));break;case"mouseup":_(this.end(n));break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"otransitionend":case"transitionend":_(this.transitionEnd(n));break;case"resize":_(t)}e.stopPropagation&&n.stopPropagation()},start:function(e){var t=e.touches[0];L={x:t.pageX,y:t.pageY,time:+new Date},y=void 0,x={},f.touch?(E.addEventListener("touchmove",this,!1),E.addEventListener("touchend",this,!1)):(E.addEventListener("mousemove",this,!1),E.addEventListener("mouseup",this,!1),document.addEventListener("mouseup",this,!1))},touchmove:function(t){if(!(t.touches.length>1||t.scale&&1!==t.scale||d.slideIsDisabled)){e.disableScroll&&t.preventDefault();var n=t.touches[0];x={x:n.pageX-L.x,y:n.pageY-L.y},"undefined"==typeof y&&(y=!!(y||Math.abs(x.x)<Math.abs(x.y))),y||(t.preventDefault(),u(),e.continuous?(a(r(S-1),x.x+g[r(S-1)],0),a(S,x.x+g[S],0),a(r(S+1),x.x+g[r(S+1)],0)):(x.x=x.x/(!S&&x.x>0||S==m.length-1&&x.x<0?Math.abs(x.x)/v+1:1),a(S-1,x.x+g[S-1],0),a(S,x.x+g[S],0),a(S+1,x.x+g[S+1],0)))}},end:function(){var t=+new Date-L.time,n=Number(t)<250&&Math.abs(x.x)>20||Math.abs(x.x)>v/2,i=!S&&x.x>0||S==m.length-1&&x.x<0;e.continuous&&(i=!1);var o=x.x<0;y||(n&&!i?(o?(e.continuous?(s(r(S-1),-v,0),s(r(S+2),v,0)):s(S-1,-v,0),s(S,g[S]-v,b),s(r(S+1),g[r(S+1)]-v,b),S=r(S+1)):(e.continuous?(s(r(S+1),v,0),s(r(S-2),-v,0)):s(S+1,v,0),s(S,g[S]+v,b),s(r(S-1),g[r(S-1)]+v,b),S=r(S-1)),e.callback&&e.callback(S,m[S])):e.continuous?(s(r(S-1),-v,b),s(S,0,b),s(r(S+1),v,b)):(s(S-1,-v,b),s(S,0,b),s(S+1,v,b))),f.touch?(E.removeEventListener("touchmove",M,!1),E.removeEventListener("touchend",M,!1)):(E.removeEventListener("mousemove",M,!1),E.removeEventListener("mouseup",M,!1),document.removeEventListener("mouseup",M,!1))},transitionEnd:function(t){parseInt(t.target.getAttribute("data-index"),10)==S&&(D&&c(),e.transitionEnd&&e.transitionEnd.call(t,S,m[S]))}};this.update=function(){setTimeout(t)},this.setup=function(){t()},this.loop=function(t){return arguments.length&&(e.continuous=!!t),e.continuous},this.enableSlide=function(e){return arguments.length&&(this.slideIsDisabled=!e),!this.slideIsDisabled},this.slide=this.select=function(e,t){u(),o(e,t)},this.prev=this.previous=function(){u(),n()},this.next=function(){u(),i()},this.stop=function(){u()},this.start=function(){c()},this.autoPlay=function(e){!D||0>D?u():(D=e,c())},this.currentIndex=this.selected=function(){return S},this.slidesCount=this.count=function(){return T},this.kill=function(){u(),E.style.width="",E.style.left="";for(var e=m.length;e--;){var t=m[e];t.style.width="",t.style.left="",f.transitions&&a(e,0,0)}f.addEventListener?(E.removeEventListener("touchstart",M,!1),E.removeEventListener("webkitTransitionEnd",M,!1),E.removeEventListener("msTransitionEnd",M,!1),E.removeEventListener("oTransitionEnd",M,!1),E.removeEventListener("otransitionend",M,!1),E.removeEventListener("transitionend",M,!1),window.removeEventListener("resize",M,!1)):window.onresize=null},this.load=function(){t(),D&&c(),f.addEventListener?(f.touch?E.addEventListener("touchstart",M,!1):E.addEventListener("mousedown",M,!1),f.transitions&&(E.addEventListener("webkitTransitionEnd",M,!1),E.addEventListener("msTransitionEnd",M,!1),E.addEventListener("oTransitionEnd",M,!1),E.addEventListener("otransitionend",M,!1),E.addEventListener("transitionend",M,!1)),window.addEventListener("resize",M,!1)):window.onresize=function(){t()}}}}})}(ionic),function(e){"use strict";e.views.Toggle=e.views.View.inherit({initialize:function(t){var n=this;this.el=t.el,this.checkbox=t.checkbox,this.track=t.track,this.handle=t.handle,this.openPercent=-1,this.onChange=t.onChange||function(){},this.triggerThreshold=t.triggerThreshold||20,this.dragStartHandler=function(e){n.dragStart(e)},this.dragHandler=function(e){n.drag(e)},this.holdHandler=function(e){n.hold(e)},this.releaseHandler=function(e){n.release(e)},this.dragStartGesture=e.onGesture("dragstart",this.dragStartHandler,this.el),this.dragGesture=e.onGesture("drag",this.dragHandler,this.el),this.dragHoldGesture=e.onGesture("hold",this.holdHandler,this.el),this.dragReleaseGesture=e.onGesture("release",this.releaseHandler,this.el)},destroy:function(){e.offGesture(this.dragStartGesture,"dragstart",this.dragStartGesture),e.offGesture(this.dragGesture,"drag",this.dragGesture),e.offGesture(this.dragHoldGesture,"hold",this.holdHandler),e.offGesture(this.dragReleaseGesture,"release",this.releaseHandler)},tap:function(){"disabled"!==this.el.getAttribute("disabled")&&this.val(!this.checkbox.checked)},dragStart:function(e){this.checkbox.disabled||(this._dragInfo={width:this.el.offsetWidth,left:this.el.offsetLeft,right:this.el.offsetLeft+this.el.offsetWidth,triggerX:this.el.offsetWidth/2,initialState:this.checkbox.checked},e.gesture.srcEvent.preventDefault(),this.hold(e))},drag:function(t){var n=this;this._dragInfo&&(t.gesture.srcEvent.preventDefault(),e.requestAnimationFrame(function(){if(n._dragInfo){var e=(n.track.offsetLeft+n.handle.offsetWidth/2,n.track.offsetLeft+n.track.offsetWidth-n.handle.offsetWidth/2,t.gesture.deltaX,t.gesture.touches[0].pageX-n._dragInfo.left),i=n._dragInfo.width-n.triggerThreshold;n._dragInfo.initialState?e<n.triggerThreshold?n.setOpenPercent(0):e>n._dragInfo.triggerX&&n.setOpenPercent(100):e<n._dragInfo.triggerX?n.setOpenPercent(0):e>i&&n.setOpenPercent(100)}}))},endDrag:function(){this._dragInfo=null},hold:function(){this.el.classList.add("dragging")},release:function(e){this.el.classList.remove("dragging"),this.endDrag(e)},setOpenPercent:function(t){if(this.openPercent<0||t<this.openPercent-3||t>this.openPercent+3)if(this.openPercent=t,0===t)this.val(!1);else if(100===t)this.val(!0);else{var n=Math.round(t/100*this.track.offsetWidth-this.handle.offsetWidth);n=1>n?0:n,this.handle.style[e.CSS.TRANSFORM]="translate3d("+n+"px,0,0)"}},val:function(t){return(t===!0||t===!1)&&(""!==this.handle.style[e.CSS.TRANSFORM]&&(this.handle.style[e.CSS.TRANSFORM]=""),this.checkbox.checked=t,this.openPercent=t?100:0,this.onChange&&this.onChange()),this.checkbox.checked}})}(ionic)}();
/*!
 * ionic.bundle.js is a concatenation of:
 * ionic.js, angular.js, angular-animate.js,
 * angular-sanitize.js, angular-ui-router.js,
 * and ionic-angular.js
 */

/*
 AngularJS v1.3.6
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(U,X,u){'use strict';function A(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.6/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Ra(b){if(null==b||Sa(b))return!1;var a=b.length;return b.nodeType===
na&&a?!0:z(b)||x(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d,e;if(b)if(B(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(x(b)||Ra(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==r)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Cd(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
b[d[e]],d[e]);return d}function kc(b){return function(a,c){b(c,a)}}function Dd(){return++kb}function lc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function G(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var k=f[g];b[k]=e[k]}}lc(b,a);return b}function $(b){return parseInt(b,10)}function H(){}function oa(b){return b}function ca(b){return function(){return b}}function C(b){return"undefined"===typeof b}function y(b){return"undefined"!==
typeof b}function O(b){return null!==b&&"object"===typeof b}function z(b){return"string"===typeof b}function Y(b){return"number"===typeof b}function pa(b){return"[object Date]"===Ja.call(b)}function B(b){return"function"===typeof b}function lb(b){return"[object RegExp]"===Ja.call(b)}function Sa(b){return b&&b.window===b}function Ta(b){return b&&b.$evalAsync&&b.$watch}function Ua(b){return"boolean"===typeof b}function mc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Ed(b){var a={};
b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function ua(b){return Q(b.nodeName||b[0]&&b[0].nodeName)}function Va(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Da(b,a,c,d){if(Sa(b)||Ta(b))throw Wa("cpws");if(a){if(b===a)throw Wa("cpi");c=c||[];d=d||[];if(O(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(x(b))for(var f=a.length=0;f<b.length;f++)e=Da(b[f],null,c,d),O(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);else{var g=a.$$hashKey;x(a)?a.length=
0:r(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Da(b[f],null,c,d),O(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);lc(a,g)}}else if(a=b)x(b)?a=Da(b,[],c,d):pa(b)?a=new Date(b.getTime()):lb(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):O(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Da(b,e,c,d));return a}function qa(b,a){if(x(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(O(b))for(c in a=a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=
b[c];return a||b}function ga(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(x(b)){if(!x(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ga(b[d],a[d]))return!1;return!0}}else{if(pa(b))return pa(a)?ga(b.getTime(),a.getTime()):!1;if(lb(b)&&lb(a))return b.toString()==a.toString();if(Ta(b)||Ta(a)||Sa(b)||Sa(a)||x(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!B(b[d])){if(!ga(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&
"$"!==d.charAt(0)&&a[d]!==u&&!B(a[d]))return!1;return!0}return!1}function Xa(b,a,c){return b.concat(Ya.call(a,c))}function nc(b,a){var c=2<arguments.length?Ya.call(arguments,2):[];return!B(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,Xa(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Fd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=u:Sa(a)?c="$WINDOW":a&&X===a?c="$DOCUMENT":Ta(a)&&
(c="$SCOPE");return c}function Za(b,a){if("undefined"===typeof b)return u;Y(a)||(a=a?2:null);return JSON.stringify(b,Fd,a)}function oc(b){return z(b)?JSON.parse(b):b}function va(b){b=D(b).clone();try{b.empty()}catch(a){}var c=D("<div>").append(b).html();try{return b[0].nodeType===mb?Q(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+Q(b)})}catch(d){return Q(c)}}function pc(b){try{return decodeURIComponent(b)}catch(a){}}function qc(b){var a={},c,d;r((b||"").split("&"),function(b){b&&
(c=b.replace(/\+/g,"%20").split("="),d=pc(c[0]),y(d)&&(b=y(c[1])?pc(c[1]):!0,rc.call(a,d)?x(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Nb(b){var a=[];r(b,function(b,d){x(b)?r(b,function(b){a.push(Ea(d,!0)+(!0===b?"":"="+Ea(b,!0)))}):a.push(Ea(d,!0)+(!0===b?"":"="+Ea(b,!0)))});return a.length?a.join("&"):""}function nb(b){return Ea(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Ea(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,
":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Gd(b,a){var c,d,e=ob.length;b=D(b);for(d=0;d<e;++d)if(c=ob[d]+a,z(c=b.attr(c)))return c;return null}function Hd(b,a){var c,d,e={};r(ob,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});r(ob,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Gd(c,"strict-di"),a(c,d?[d]:[],e))}function sc(b,
a,c){O(c)||(c={});c=G({strictDi:!1},c);var d=function(){b=D(b);if(b.injector()){var d=b[0]===X?"document":va(b);throw Wa("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=Ob(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return d},
e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;U&&e.test(U.name)&&(c.debugInfoEnabled=!0,U.name=U.name.replace(e,""));if(U&&!f.test(U.name))return d();U.name=U.name.replace(f,"");ha.resumeBootstrap=function(b){r(b,function(b){a.push(b)});d()}}function Id(){U.name="NG_ENABLE_DEBUG_INFO!"+U.name;U.location.reload()}function Jd(b){return ha.element(b).injector().get("$$testability")}function Pb(b,a){a=a||"_";return b.replace(Kd,function(b,d){return(d?a:"")+b.toLowerCase()})}function Ld(){var b;
tc||((ra=U.jQuery)&&ra.fn.on?(D=ra,G(ra.fn,{scope:Ka.scope,isolateScope:Ka.isolateScope,controller:Ka.controller,injector:Ka.injector,inheritedData:Ka.inheritedData}),b=ra.cleanData,ra.cleanData=function(a){var c;if(Qb)Qb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=ra._data(e,"events"))&&c.$destroy&&ra(e).triggerHandler("$destroy");b(a)}):D=R,ha.element=D,tc=!0)}function Rb(b,a,c){if(!b)throw Wa("areq",a||"?",c||"required");return b}function pb(b,a,c){c&&x(b)&&(b=b[b.length-1]);Rb(B(b),a,"not a function, got "+
(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function La(b,a){if("hasOwnProperty"===b)throw Wa("badname",a);}function uc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&B(b)?nc(e,b):b}function qb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return D(c)}function ia(){return Object.create(null)}function Md(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=A("$injector"),
d=A("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||A;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return t}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],q=a("$injector","invoke","push",d),t={_invokeQueue:b,_configBlocks:d,_runBlocks:e,requires:g,name:f,provider:a("$provide","provider"),factory:a("$provide",
"factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:q,run:function(a){e.push(a);return this}};h&&q(h);return t})}})}function Nd(b){G(b,{bootstrap:sc,copy:Da,extend:G,equals:ga,element:D,forEach:r,injector:Ob,noop:H,bind:nc,toJson:Za,fromJson:oc,identity:oa,isUndefined:C,
isDefined:y,isString:z,isFunction:B,isObject:O,isNumber:Y,isElement:mc,isArray:x,version:Od,isDate:pa,lowercase:Q,uppercase:rb,callbacks:{counter:0},getTestability:Jd,$$minErr:A,$$csp:$a,reloadWithDebugInfo:Id});ab=Md(U);try{ab("ngLocale")}catch(a){ab("ngLocale",[]).provider("$locale",Pd)}ab("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Qd});a.provider("$compile",vc).directive({a:Rd,input:wc,textarea:wc,form:Sd,script:Td,select:Ud,style:Vd,option:Wd,ngBind:Xd,ngBindHtml:Yd,ngBindTemplate:Zd,
ngClass:$d,ngClassEven:ae,ngClassOdd:be,ngCloak:ce,ngController:de,ngForm:ee,ngHide:fe,ngIf:ge,ngInclude:he,ngInit:ie,ngNonBindable:je,ngPluralize:ke,ngRepeat:le,ngShow:me,ngStyle:ne,ngSwitch:oe,ngSwitchWhen:pe,ngSwitchDefault:qe,ngOptions:re,ngTransclude:se,ngModel:te,ngList:ue,ngChange:ve,pattern:xc,ngPattern:xc,required:yc,ngRequired:yc,minlength:zc,ngMinlength:zc,maxlength:Ac,ngMaxlength:Ac,ngValue:we,ngModelOptions:xe}).directive({ngInclude:ye}).directive(sb).directive(Bc);a.provider({$anchorScroll:ze,
$animate:Ae,$browser:Be,$cacheFactory:Ce,$controller:De,$document:Ee,$exceptionHandler:Fe,$filter:Cc,$interpolate:Ge,$interval:He,$http:Ie,$httpBackend:Je,$location:Ke,$log:Le,$parse:Me,$rootScope:Ne,$q:Oe,$$q:Pe,$sce:Qe,$sceDelegate:Re,$sniffer:Se,$templateCache:Te,$templateRequest:Ue,$$testability:Ve,$timeout:We,$window:Xe,$$rAF:Ye,$$asyncCallback:Ze,$$jqLite:$e})}])}function bb(b){return b.replace(af,function(a,b,d,e){return e?d.toUpperCase():d}).replace(bf,"Moz$1")}function Dc(b){b=b.nodeType;
return b===na||!b||9===b}function Ec(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Sb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(cf.exec(b)||["",""])[1].toLowerCase();d=ja[d]||ja._default;c.innerHTML=d[1]+b.replace(df,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=Xa(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});return e}function R(b){if(b instanceof R)return b;var a;z(b)&&(b=P(b),
a=!0);if(!(this instanceof R)){if(a&&"<"!=b.charAt(0))throw Tb("nosel");return new R(b)}if(a){a=X;var c;b=(c=ef.exec(b))?[a.createElement(c[1])]:(c=Ec(b,a))?c.childNodes:[]}Fc(this,b)}function Ub(b){return b.cloneNode(!0)}function tb(b,a){a||ub(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)ub(c[d])}function Gc(b,a,c,d){if(y(d))throw Tb("offargs");var e=(d=vb(b))&&d.events,f=d&&d.handle;if(f)if(a)r(a.split(" "),function(a){if(y(c)){var d=e[a];Va(d||[],c);if(d&&0<
d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function ub(b,a){var c=b.ng339,d=c&&wb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Gc(b)),delete wb[c],b.ng339=u))}function vb(b,a){var c=b.ng339,c=c&&wb[c];a&&!c&&(b.ng339=c=++ff,c=wb[c]={events:{},data:{},handle:u});return c}function Vb(b,a,c){if(Dc(b)){var d=y(c),e=!d&&a&&!O(a),f=!a;b=(b=vb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;
if(e)return b&&b[a];G(b,a)}}}function xb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function yb(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",P((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+P(a)+" "," ")))})}function zb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");r(a.split(" "),function(a){a=P(a);-1===c.indexOf(" "+a+" ")&&
(c+=a+" ")});b.setAttribute("class",P(c))}}function Fc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Hc(b,a){return Ab(b,"$"+(a||"ngController")+"Controller")}function Ab(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=x(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=D.data(b,a[d]))!==u)return c;b=b.parentNode||11===b.nodeType&&b.host}}function Ic(b){for(tb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}
function Jc(b,a){a||tb(b);var c=b.parentNode;c&&c.removeChild(b)}function gf(b,a){a=a||U;if("complete"===a.document.readyState)a.setTimeout(b);else D(a).on("load",b)}function Kc(b,a){var c=Bb[a.toLowerCase()];return c&&Lc[ua(b)]&&c}function hf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Mc[a]}function jf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:0;if(g){if(C(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;
c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=qa(f));for(var k=0;k<g;k++)c.isImmediatePropagationStopped()||f[k].call(b,c)}};c.elem=b;return c}function $e(){this.$get=function(){return G(R,{hasClass:function(b,a){b.attr&&(b=b[0]);return xb(b,a)},addClass:function(b,a){b.attr&&(b=b[0]);return zb(b,a)},removeClass:function(b,a){b.attr&&
(b=b[0]);return yb(b,a)}})}}function Ma(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Dd)():c+":"+b}function cb(b,a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function kf(b){return(b=b.toString().replace(Nc,"").match(Oc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Wb(b,a,c){var d;if("function"===typeof b){if(!(d=b.$inject)){d=[];if(b.length){if(a)throw z(c)&&
c||(c=b.name||kf(b)),Fa("strictdi",c);a=b.toString().replace(Nc,"");a=a.match(Oc);r(a[1].split(lf),function(a){a.replace(mf,function(a,b,c){d.push(c)})})}b.$inject=d}}else x(b)?(a=b.length-1,pb(b[a],"fn"),d=b.slice(0,a)):pb(b,"fn",!0);return d}function Ob(b,a){function c(a){return function(b,c){if(O(b))r(b,kc(a));else return a(b,c)}}function d(a,b){La(a,"service");if(B(b)||x(b))b=q.instantiate(b);if(!b.$get)throw Fa("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=s.invoke(b,
this);if(C(c))throw Fa("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=q.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{z(a)?(c=ab(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):B(a)?b.push(q.invoke(a)):x(a)?b.push(q.invoke(a)):pb(a,"module")}catch(e){throw x(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&
(e=e.message+"\n"+e.stack),Fa("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===k)throw Fa("cdep",a+" <- "+l.join(" <- "));return b[a]}try{return l.unshift(a),b[a]=k,b[a]=c(a,e)}catch(f){throw b[a]===k&&delete b[a],f;}finally{l.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[],k=Wb(b,a,g),l,q,s;q=0;for(l=k.length;q<l;q++){s=k[q];if("string"!==typeof s)throw Fa("itkn",s);h.push(f&&f.hasOwnProperty(s)?f[s]:d(s,g))}x(b)&&
(b=b[l]);return b.apply(c,h)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((x(a)?a[a.length-1]:a).prototype);a=e(a,d,b,c);return O(a)||B(a)?a:d},get:d,annotate:Wb,has:function(a){return p.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var k={},l=[],m=new cb([],!0),p={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,ca(b),!1)}),constant:c(function(a,b){La(a,
"constant");p[a]=b;t[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=s.invoke(d,c);return s.invoke(b,null,{$delegate:a})}}}},q=p.$injector=h(p,function(a,b){ha.isString(b)&&l.push(b);throw Fa("unpr",l.join(" <- "));}),t={},s=t.$injector=h(t,function(a,b){var c=q.get(a+"Provider",b);return s.invoke(c.$get,c,u,a)});r(g(b),function(a){s.invoke(a||H)});return s}function ze(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location",
"$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ua(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;B(c)?c=c():mc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):Y(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}
var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||gf(function(){d.$evalAsync(g)})});return g}]}function Ze(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function nf(b,a,c,d){function e(a){try{a.apply(null,Ya.call(arguments,1))}finally{if(v--,0===v)for(;w.length;)try{w.pop()()}catch(b){c.error(b)}}}function f(a,b){(function Aa(){r(K,function(a){a()});E=b(Aa,a)})()}function g(){h();k()}function h(){J=
b.history.state;J=C(J)?null:J;ga(J,S)&&(J=S);S=J}function k(){if(F!==m.url()||L!==J)F=m.url(),L=J,r(W,function(a){a(m.url(),J)})}function l(a){try{return decodeURIComponent(a)}catch(b){return a}}var m=this,p=a[0],q=b.location,t=b.history,s=b.setTimeout,N=b.clearTimeout,n={};m.isMock=!1;var v=0,w=[];m.$$completeOutstandingRequest=e;m.$$incOutstandingRequestCount=function(){v++};m.notifyWhenNoOutstandingRequests=function(a){r(K,function(a){a()});0===v?a():w.push(a)};var K=[],E;m.addPollFn=function(a){C(E)&&
f(100,s);K.push(a);return a};var J,L,F=q.href,da=a.find("base"),I=null;h();L=J;m.url=function(a,c,e){C(e)&&(e=null);q!==b.location&&(q=b.location);t!==b.history&&(t=b.history);if(a){var f=L===e;if(F===a&&(!d.history||f))return m;var g=F&&Ga(F)===Ga(a);F=a;L=e;!d.history||g&&f?(g||(I=a),c?q.replace(a):g?(c=q,e=a.indexOf("#"),a=-1===e?"":a.substr(e+1),c.hash=a):q.href=a):(t[c?"replaceState":"pushState"](e,"",a),h(),L=J);return m}return I||q.href.replace(/%27/g,"'")};m.state=function(){return J};var W=
[],ba=!1,S=null;m.onUrlChange=function(a){if(!ba){if(d.history)D(b).on("popstate",g);D(b).on("hashchange",g);ba=!0}W.push(a);return a};m.$$checkUrlChange=k;m.baseHref=function(){var a=da.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var aa={},y="",ea=m.baseHref();m.cookies=function(a,b){var d,e,f,g;if(a)b===u?p.cookie=encodeURIComponent(a)+"=;path="+ea+";expires=Thu, 01 Jan 1970 00:00:00 GMT":z(b)&&(d=(p.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+ea).length+
1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(p.cookie!==y)for(y=p.cookie,d=y.split("; "),aa={},f=0;f<d.length;f++)e=d[f],g=e.indexOf("="),0<g&&(a=l(e.substring(0,g)),aa[a]===u&&(aa[a]=l(e.substring(g+1))));return aa}};m.defer=function(a,b){var c;v++;c=s(function(){delete n[c];e(a)},b||0);n[c]=!0;return c};m.defer.cancel=function(a){return n[a]?(delete n[a],N(a),e(H),!0):!1}}function Be(){this.$get=["$window","$log","$sniffer",
"$document",function(b,a,c,d){return new nf(b,d,a,c)}]}function Ce(){this.$get=function(){function b(b,d){function e(a){a!=p&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw A("$cacheFactory")("iid",b);var g=0,h=G({},d,{id:b}),k={},l=d&&d.capacity||Number.MAX_VALUE,m={},p=null,q=null;return a[b]={put:function(a,b){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!C(b))return a in k||g++,k[a]=b,g>l&&this.remove(q.key),b},get:function(a){if(l<
Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==p&&(p=b.p);b==q&&(q=b.n);f(b.n,b.p);delete m[a]}delete k[a];g--},removeAll:function(){k={};g=0;m={};p=q=null},destroy:function(){m=h=k=null;delete a[b]},info:function(){return G({},h,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Te(){this.$get=["$cacheFactory",function(b){return b("templates")}]}
function vc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};r(a,function(a,e){var f=a.match(c);if(!f)throw ka("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d={},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Ed("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,k=/^(on[a-z]+|formaction)$/;this.directive=function p(a,e){La(a,"directive");z(a)?(Rb(e,"directiveFactory"),d.hasOwnProperty(a)||
(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];r(d[a],function(d,g){try{var h=b.invoke(d);B(h)?h={compile:ca(h)}:!h.compile&&h.link&&(h.compile=ca(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";O(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(k){e(k)}});return f}])),d[a].push(e)):r(a,kc(p));return this};this.aHrefSanitizationWhitelist=function(b){return y(b)?
(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var l=!0;this.debugInfoEnabled=function(a){return y(a)?(l=a,this):l};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,s,N,n,v,w,K,E,J){function L(a,b){try{a.addClass(b)}catch(c){}}
function F(a,b,c,d,e){a instanceof D||(a=D(a));r(a,function(b,c){b.nodeType==mb&&b.nodeValue.match(/\S+/)&&(a[c]=D(b).wrap("<span></span>").parent()[0])});var f=da(a,b,a,c,d,e);F.$$addScopeClass(a);var g=null;return function(b,c,d){Rb(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ua(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?D(U(g,D("<div>").append(a).html())):
c?Ka.clone.call(a):a;if(h)for(var k in h)d.data("$"+k+"Controller",h[k].instance);F.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function da(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,q,s,n,w;if(p)for(w=Array(c.length),q=0;q<h.length;q+=3)f=h[q],w[f]=c[f];else w=c;q=0;for(s=h.length;q<s;)k=w[h[q++]],c=h[q++],f=h[q++],c?(c.scope?(l=a.$new(),F.$$addScopeInfo(D(k),l)):l=a,n=c.transcludeOnThisElement?I(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?I(a,
b):null,c(f,l,k,d,n)):f&&f(a,k.childNodes,u,e)}for(var h=[],k,l,q,s,p,n=0;n<a.length;n++){k=new V;l=W(a[n],[],k,0===n?d:u,e);(f=l.length?aa(l,a[n],k,b,c,null,[],[],f):null)&&f.scope&&F.$$addScopeClass(k.$$element);k=f&&f.terminal||!(q=a[n].childNodes)||!q.length?null:da(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||k)h.push(n,f,k),s=!0,p=p||f;f=null}return s?g:null}function I(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,
{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function W(b,c,g,h,k){var l=g.$attr,q;switch(b.nodeType){case na:ea(c,wa(ua(b)),"E",h,k);for(var s,n,w,N=b.attributes,K=0,t=N&&N.length;K<t;K++){var J=!1,v=!1;s=N[K];q=s.name;s=P(s.value);n=wa(q);if(w=Ha.test(n))q=Pb(n.substr(6),"-");var L=n.replace(/(Start|End)$/,""),E;a:{var F=L;if(d.hasOwnProperty(F)){E=void 0;for(var F=a.get(F+"Directive"),W=0,r=F.length;W<r;W++)if(E=F[W],E.multiElement){E=!0;break a}}E=!1}E&&n===L+"Start"&&
(J=q,v=q.substr(0,q.length-5)+"end",q=q.substr(0,q.length-6));n=wa(q.toLowerCase());l[n]=q;if(w||!g.hasOwnProperty(n))g[n]=s,Kc(b,n)&&(g[n]=!0);R(b,c,s,n,w);ea(c,n,"A",h,k,J,v)}b=b.className;if(z(b)&&""!==b)for(;q=f.exec(b);)n=wa(q[2]),ea(c,n,"C",h,k)&&(g[n]=P(q[3])),b=b.substr(q.index+q[0].length);break;case mb:T(c,b.nodeValue);break;case 8:try{if(q=e.exec(b.nodeValue))n=wa(q[1]),ea(c,n,"M",h,k)&&(g[n]=P(q[2]))}catch(da){}}c.sort(A);return c}function ba(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&
a.hasAttribute(b)){do{if(!a)throw ka("uterdir",b,c);a.nodeType==na&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return D(d)}function S(a,b,c){return function(d,e,f,g,h){e=ba(e[0],b,c);return a(d,e,f,g,h)}}function aa(a,d,e,f,g,k,l,s,p){function w(a,b,c,d){if(a){c&&(a=S(a,c,d));a.require=M.require;a.directiveName=fa;if(I===M||M.$$isolateScope)a=Y(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=S(b,c,d));b.require=M.require;b.directiveName=fa;if(I===
M||M.$$isolateScope)b=Y(b,{isolateScope:!0});s.push(b)}}function K(a,b,c,d){var e,f="data",g=!1,k=c,l;if(z(b)){l=b.match(h);b=b.substring(l[0].length);l[3]&&(l[1]?l[3]=null:l[1]=l[3]);"^"===l[1]?f="inheritedData":"^^"===l[1]&&(f="inheritedData",k=c.parent());"?"===l[2]&&(g=!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||k[f]("$"+b+"Controller");if(!e&&!g)throw ka("ctreq",b,a);return e||null}x(b)&&(e=[],r(b,function(b){e.push(K(a,b,c,d))}));return e}function J(a,c,f,g,h){function k(a,b,c){var d;
Ta(a)||(c=b,b=a,a=u);ya&&(d=L);c||(c=ya?W.parent():W);return h(a,b,d,c,Xb)}var p,w,t,v,L,db,W,S;d===f?(S=e,W=e.$$element):(W=D(f),S=new V(W,e));I&&(v=c.$new(!0));h&&(db=k,db.$$boundTransclude=h);E&&(da={},L={},r(E,function(a){var b={$scope:a===I||a.$$isolateScope?v:c,$element:W,$attrs:S,$transclude:db};t=a.controller;"@"==t&&(t=S[a.name]);b=n(t,b,!0,a.controllerAs);L[a.name]=b;ya||W.data("$"+a.name+"Controller",b.instance);da[a.name]=b}));if(I){F.$$addScopeInfo(W,v,!0,!(aa&&(aa===I||aa===I.$$originalDirective)));
F.$$addScopeClass(W,!0);g=da&&da[I.name];var ba=v;g&&g.identifier&&!0===I.bindToController&&(ba=g.instance);r(v.$$isolateBindings=I.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,k,l;switch(a.mode){case "@":S.$observe(e,function(a){ba[d]=a});S.$$observers[e].$$scope=c;S[e]&&(ba[d]=b(S[e])(c));break;case "=":if(f&&!S[e])break;h=N(S[e]);l=h.literal?ga:function(a,b){return a===b||a!==a&&b!==b};k=h.assign||function(){g=ba[d]=h(c);throw ka("nonassign",S[e],I.name);};g=ba[d]=h(c);f=function(a){l(a,
ba[d])||(l(a,g)?k(c,a=ba[d]):ba[d]=a);return g=a};f.$stateful=!0;f=a.collection?c.$watchCollection(S[e],f):c.$watch(N(S[e],f),null,h.literal);v.$on("$destroy",f);break;case "&":h=N(S[e]),ba[d]=function(a){return h(c,a)}}})}da&&(r(da,function(a){a()}),da=null);g=0;for(p=l.length;g<p;g++)w=l[g],Z(w,w.isolateScope?v:c,W,S,w.require&&K(w.directiveName,w.require,W,L),db);var Xb=c;I&&(I.template||null===I.templateUrl)&&(Xb=v);a&&a(Xb,f.childNodes,u,h);for(g=s.length-1;0<=g;g--)w=s[g],Z(w,w.isolateScope?
v:c,W,S,w.require&&K(w.directiveName,w.require,W,L),db)}p=p||{};for(var v=-Number.MAX_VALUE,L,E=p.controllerDirectives,da,I=p.newIsolateScopeDirective,aa=p.templateDirective,ea=p.nonTlbTranscludeDirective,H=!1,G=!1,ya=p.hasElementTranscludeDirective,T=e.$$element=D(d),M,fa,A,Ha=f,Q,xa=0,R=a.length;xa<R;xa++){M=a[xa];var Cb=M.$$start,$=M.$$end;Cb&&(T=ba(d,Cb,$));A=u;if(v>M.priority)break;if(A=M.scope)M.templateUrl||(O(A)?(Aa("new/isolated scope",I||L,M,T),I=M):Aa("new/isolated scope",I,M,T)),L=L||
M;fa=M.name;!M.templateUrl&&M.controller&&(A=M.controller,E=E||{},Aa("'"+fa+"' controller",E[fa],M,T),E[fa]=M);if(A=M.transclude)H=!0,M.$$tlb||(Aa("transclusion",ea,M,T),ea=M),"element"==A?(ya=!0,v=M.priority,A=T,T=e.$$element=D(X.createComment(" "+fa+": "+e[fa]+" ")),d=T[0],Db(g,Ya.call(A,0),d),Ha=F(A,f,v,k&&k.name,{nonTlbTranscludeDirective:ea})):(A=D(Ub(d)).contents(),T.empty(),Ha=F(A,f));if(M.template)if(G=!0,Aa("template",aa,M,T),aa=M,A=B(M.template)?M.template(T,e):M.template,A=Pc(A),M.replace){k=
M;A=Sb.test(A)?Qc(U(M.templateNamespace,P(A))):[];d=A[0];if(1!=A.length||d.nodeType!==na)throw ka("tplrt",fa,"");Db(g,T,d);R={$attr:{}};A=W(d,[],R);var pf=a.splice(xa+1,a.length-(xa+1));I&&y(A);a=a.concat(A).concat(pf);C(e,R);R=a.length}else T.html(A);if(M.templateUrl)G=!0,Aa("template",aa,M,T),aa=M,M.replace&&(k=M),J=of(a.splice(xa,a.length-xa),T,e,g,H&&Ha,l,s,{controllerDirectives:E,newIsolateScopeDirective:I,templateDirective:aa,nonTlbTranscludeDirective:ea}),R=a.length;else if(M.compile)try{Q=
M.compile(T,e,Ha),B(Q)?w(null,Q,Cb,$):Q&&w(Q.pre,Q.post,Cb,$)}catch(ca){c(ca,va(T))}M.terminal&&(J.terminal=!0,v=Math.max(v,M.priority))}J.scope=L&&!0===L.scope;J.transcludeOnThisElement=H;J.elementTranscludeOnThisElement=ya;J.templateOnThisElement=G;J.transclude=Ha;p.hasElementTranscludeDirective=ya;return J}function y(a){for(var b=0,c=a.length;b<c;b++){var d=b,e;e=G(Object.create(a[b]),{$$isolateScope:!0});a[d]=e}}function ea(b,e,f,g,h,k,l){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var q;
e=a.get(e+"Directive");for(var s=0,n=e.length;s<n;s++)try{if(q=e[s],(g===u||g>q.priority)&&-1!=q.restrict.indexOf(f)){if(k){var w={$$start:k,$$end:l};q=G(Object.create(q),w)}b.push(q);h=q}}catch(N){c(N)}}return h}function C(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;r(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(L(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+
b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function of(a,b,c,d,e,f,g,h){var k=[],l,q,p=b[0],n=a.shift(),w=G({},n,{templateUrl:null,transclude:null,replace:null,$$originalDirective:n}),N=B(n.templateUrl)?n.templateUrl(b,c):n.templateUrl,t=n.templateNamespace;b.empty();s(K.getTrustedResourceUrl(N)).then(function(s){var K,v;s=Pc(s);if(n.replace){s=Sb.test(s)?Qc(U(t,P(s))):[];K=s[0];if(1!=s.length||K.nodeType!==na)throw ka("tplrt",n.name,N);s={$attr:{}};
Db(d,b,K);var J=W(K,[],s);O(n.scope)&&y(J);a=J.concat(a);C(c,s)}else K=p,b.html(s);a.unshift(w);l=aa(a,K,c,e,b,n,f,g,h);r(d,function(a,c){a==K&&(d[c]=b[0])});for(q=da(b[0].childNodes,e);k.length;){s=k.shift();v=k.shift();var E=k.shift(),F=k.shift(),J=b[0];if(!s.$$destroyed){if(v!==p){var S=v.className;h.hasElementTranscludeDirective&&n.replace||(J=Ub(K));Db(E,D(v),J);L(D(J),S)}v=l.transcludeOnThisElement?I(s,l.transclude,F):F;l(q,s,J,d,v)}}k=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(k?
k.push(b,c,d,a):(l.transcludeOnThisElement&&(a=I(b,l.transclude,e)),l(q,b,c,d,a)))}}function A(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function Aa(a,b,c,d){if(b)throw ka("multidir",b.name,c.name,a,va(d));}function T(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&F.$$addBindingClass(a);return function(a,c){var e=c.parent();b||F.$$addBindingClass(e);F.$$addBindingInfo(e,d.expressions);a.$watch(d,
function(a){c[0].nodeValue=a})}}})}function U(a,b){a=Q(a||"html");switch(a){case "svg":case "math":var c=X.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function xa(a,b){if("srcdoc"==b)return K.HTML;var c=ua(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return K.RESOURCE_URL}function R(a,c,d,e,f){var h=b(d,!0);if(h){if("multiple"===e&&"select"===ua(a))throw ka("selmulti",va(a));c.push({priority:100,compile:function(){return{pre:function(c,
d,l){d=l.$$observers||(l.$$observers={});if(k.test(e))throw ka("nodomevents");l[e]&&(h=b(l[e],!0,xa(a,e),g[e]||f))&&(l[e]=h(c),(d[e]||(d[e]=[])).$$inter=!0,(l.$$observers&&l.$$observers[e].$$scope||c).$watch(h,function(a,b){"class"===e&&a!=b?l.$updateClass(a,b):l.$set(e,a)}))}}}})}}function Db(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=
c);break}f&&f.replaceChild(c,d);a=X.createDocumentFragment();a.appendChild(d);D(c).data(D(d).data());ra?(Qb=!0,ra.cleanData([d])):delete D.cache[d[D.expando]];d=1;for(e=b.length;d<e;d++)f=b[d],D(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Y(a,b){return G(function(){return a.apply(null,arguments)},a,b)}function Z(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,va(d))}}var V=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr=
{};this.$$element=a};V.prototype={$normalize:wa,$addClass:function(a){a&&0<a.length&&E.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&E.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Rc(a,b);c&&c.length&&E.addClass(this.$$element,c);(c=Rc(b,a))&&c.length&&E.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Kc(f,a),h=hf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=
e=Pb(a,"-"));g=ua(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=J(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=P(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),l=0;l<k;l++)var q=2*l,g=g+J(P(h[q]),!0),g=g+(" "+P(h[q+1]));h=P(h[2*l]).split(/\s/);g+=J(P(h[0]),!0);2===h.length&&(g+=" "+P(h[1]));this[a]=b=g}!1!==d&&(null===b||b===u?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&
r(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ia()),e=d[a]||(d[a]=[]);e.push(b);v.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){Va(e,b)}}};var ya=b.startSymbol(),fa=b.endSymbol(),Pc="{{"==ya||"}}"==fa?oa:function(a){return a.replace(/\{\{/g,ya).replace(/}}/g,fa)},Ha=/^ngAttr[A-Z]/;F.$$addBindingInfo=l?function(a,b){var c=a.data("$binding")||[];x(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:H;
F.$$addBindingClass=l?function(a){L(a,"ng-binding")}:H;F.$$addScopeInfo=l?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:H;F.$$addScopeClass=l?function(a,b){L(a,b?"ng-isolate-scope":"ng-scope")}:H;return F}]}function wa(b){return bb(b.replace(qf,""))}function Rc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Qc(b){b=D(b);var a=b.length;
if(1>=a)return b;for(;a--;)8===b[a].nodeType&&rf.call(b,a,1);return b}function De(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){La(a,"controller");O(a)?G(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!O(a.$scope))throw A("$controller")("noscp",d,b);a.$scope[b]=c}return function(g,h,k,l){var m,p,q;k=!0===k;l&&z(l)&&(q=l);z(g)&&(l=g.match(c),p=l[1],q=q||l[3],g=b.hasOwnProperty(p)?b[p]:uc(h.$scope,p,
!0)||(a?uc(e,p,!0):u),pb(g,p,!0));if(k)return k=(x(g)?g[g.length-1]:g).prototype,m=Object.create(k),q&&f(h,q,m,p||g.name),G(function(){d.invoke(g,m,h,p);return m},{instance:m,identifier:q});m=d.instantiate(g,h,p);q&&f(h,q,m,p||g.name);return m}}]}function Ee(){this.$get=["$window",function(b){return D(b.document)}]}function Fe(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Yb(b,a){if(z(b)){b=b.replace(sf,"");var c=a("Content-Type");if(c&&0===c.indexOf(Sc)&&
b.trim()||tf.test(b)&&uf.test(b))b=oc(b)}return b}function Tc(b){var a=ia(),c,d,e;if(!b)return a;r(b.split("\n"),function(b){e=b.indexOf(":");c=Q(P(b.substr(0,e)));d=P(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Uc(b){var a=O(b)?b:u;return function(c){a||(a=Tc(b));return c?(c=a[Q(c)],void 0===c&&(c=null),c):a}}function Vc(b,a,c){if(B(c))return c(b,a);r(c,function(c){b=c(b,a)});return b}function Ie(){var b=this.defaults={transformResponse:[Yb],transformRequest:[function(a){return O(a)&&
"[object File]"!==Ja.call(a)&&"[object Blob]"!==Ja.call(a)?Za(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:qa(Zb),put:qa(Zb),patch:qa(Zb)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return y(b)?(a=!!b,this):a};var c=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(d,e,f,g,h,k){function l(a){function c(a){var b=G({},a);b.data=a.data?Vc(a.data,a.headers,d.transformResponse):
a.data;a=a.status;return 200<=a&&300>a?b:h.reject(b)}var d={method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},e=function(a){var c=b.headers,d=G({},a.headers),e,f,c=G({},c.common,c[Q(a.method)]);a:for(e in c){a=Q(e);for(f in d)if(Q(f)===a)continue a;d[e]=c[e]}(function(a){var b;r(a,function(c,d){B(c)&&(b=c(),null!=b?a[d]=b:delete a[d])})})(d);return d}(a);if(!ha.isObject(a))throw A("$http")("badreq",a);G(d,a);d.headers=e;d.method=rb(d.method);var f=[function(a){e=
a.headers;var d=Vc(a.data,Uc(e),a.transformRequest);C(d)&&r(e,function(a,b){"content-type"===Q(b)&&delete e[b]});C(a.withCredentials)&&!C(b.withCredentials)&&(a.withCredentials=b.withCredentials);return m(a,d,e).then(c,c)},u],g=h.when(d);for(r(t,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,b.status,
b.headers,d)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,d)});return g};return g}function m(c,f,k){function m(b,c,d,e){function f(){w(c,b,d,e)}F&&(200<=b&&300>b?F.put(I,[b,c,Tc(d),e]):F.remove(I));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function w(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?J.resolve:J.reject)({data:a,status:b,headers:Uc(d),config:c,statusText:e})}function t(a){w(a.data,a.status,qa(a.headers()),a.statusText)}function E(){var a=l.pendingRequests.indexOf(c);
-1!==a&&l.pendingRequests.splice(a,1)}var J=h.defer(),L=J.promise,F,r,I=p(c.url,c.params);l.pendingRequests.push(c);L.then(E,E);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(F=O(c.cache)?c.cache:O(b.cache)?b.cache:q);F&&(r=F.get(I),y(r)?r&&B(r.then)?r.then(t,t):x(r)?w(r[1],r[0],qa(r[2]),r[3]):w(r,200,{},"OK"):F.put(I,L));C(r)&&((r=Wc(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:u)&&(k[c.xsrfHeaderName||b.xsrfHeaderName]=r),d(c.method,I,f,m,k,c.timeout,c.withCredentials,
c.responseType));return L}function p(a,b){if(!b)return a;var c=[];Cd(b,function(a,b){null===a||C(a)||(x(a)||(a=[a]),r(a,function(a){O(a)&&(a=pa(a)?a.toISOString():Za(a));c.push(Ea(b)+"="+Ea(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var q=f("$http"),t=[];r(c,function(a){t.unshift(z(a)?k.get(a):k.invoke(a))});l.pendingRequests=[];(function(a){r(arguments,function(a){l[a]=function(b,c){return l(G(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,
function(a){l[a]=function(b,c,d){return l(G(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");l.defaults=b;return l}]}function vf(){return new U.XMLHttpRequest}function Je(){this.$get=["$browser","$window","$document",function(b,a,c){return wf(b,vf,b.defer,a.angular.callbacks,c[0])}]}function wf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);
e.body.removeChild(f);f=null;var g=-1,t="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),t=a.type,g="error"===a.type?404:200);c&&c(g,t)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,k,l,m,p,q,t){function s(){v&&v();w&&w.abort()}function N(a,d,e,f,g){E!==u&&c.cancel(E);v=w=null;a(d,e,f,g);b.$$completeOutstandingRequest(H)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==Q(e)){var n="_"+(d.counter++).toString(36);
d[n]=function(a){d[n].data=a;d[n].called=!0};var v=f(h.replace("JSON_CALLBACK","angular.callbacks."+n),n,function(a,b){N(l,a,d[n].data,"",b);d[n]=H})}else{var w=a();w.open(e,h,!0);r(m,function(a,b){y(a)&&w.setRequestHeader(b,a)});w.onload=function(){var a=w.statusText||"",b="response"in w?w.response:w.responseText,c=1223===w.status?204:w.status;0===c&&(c=b?200:"file"==Ba(h).protocol?404:0);N(l,c,b,w.getAllResponseHeaders(),a)};e=function(){N(l,-1,null,null,"")};w.onerror=e;w.onabort=e;q&&(w.withCredentials=
!0);if(t)try{w.responseType=t}catch(K){if("json"!==t)throw K;}w.send(k||null)}if(0<p)var E=c(s,p);else p&&B(p.then)&&p.then(s)}}function Ge(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,t,s){function N(c){return c.replace(l,b).replace(m,a)}function n(a){try{var b=a;a=t?e.getTrusted(t,b):e.valueOf(b);var c;if(s&&!y(a))c=
a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=Za(a)}c=a}return c}catch(g){c=$b("interr",f,g.toString()),d(c)}}s=!!s;for(var v,w,K=0,E=[],J=[],L=f.length,F=[],r=[];K<L;)if(-1!=(v=f.indexOf(b,K))&&-1!=(w=f.indexOf(a,v+h)))K!==v&&F.push(N(f.substring(K,v))),K=f.substring(v+h,w),E.push(K),J.push(c(K,n)),K=w+k,r.push(F.length),F.push("");else{K!==L&&F.push(N(f.substring(K)));break}if(t&&1<F.length)throw $b("noconcat",f);if(!g||E.length){var I=function(a){for(var b=
0,c=E.length;b<c;b++){if(s&&C(a[b]))return;F[r[b]]=a[b]}return F.join("")};return G(function(a){var b=0,c=E.length,e=Array(c);try{for(;b<c;b++)e[b]=J[b](a);return I(e)}catch(g){a=$b("interr",f,g.toString()),d(a)}},{exp:f,expressions:E,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(J,function(c,e){var f=I(c);B(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,k=a.length,l=new RegExp(b.replace(/./g,f),"g"),m=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=
function(){return a};return g}]}function He(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,k,l){var m=a.setInterval,p=a.clearInterval,q=0,t=y(l)&&!l,s=(t?d:c).defer(),N=s.promise;k=y(k)?k:0;N.then(null,null,e);N.$$intervalId=m(function(){s.notify(q++);0<k&&q>=k&&(s.resolve(q),p(N.$$intervalId),delete f[N.$$intervalId]);t||b.$apply()},h);f[N.$$intervalId]=s;return N}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),
delete f[b.$$intervalId],!0):!1};return e}]}function Pd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function ac(b){b=b.split("/");for(var a=b.length;a--;)b[a]=nb(b[a]);return b.join("/")}function Xc(b,a){var c=Ba(b);a.$$protocol=
c.protocol;a.$$host=c.hostname;a.$$port=$(c.port)||xf[c.protocol]||null}function Yc(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Ba(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=qc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function za(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ga(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Zc(b){return b.replace(/(#.+)|#$/,
"$1")}function bc(b){return b.substr(0,Ga(b).lastIndexOf("/")+1)}function cc(b,a){this.$$html5=!0;a=a||"";var c=bc(b);Xc(b,this);this.$$parse=function(a){var b=za(c,a);if(!z(b))throw Eb("ipthprfx",a,c);Yc(b,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Nb(this.$$search),b=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),
!0;var f,g;(f=za(b,d))!==u?(g=f,g=(f=za(a,f))!==u?c+(za("/",f)||f):b+g):(f=za(c,d))!==u?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function dc(b,a){var c=bc(b);Xc(b,this);this.$$parse=function(d){d=za(b,d)||za(c,d);var e;"#"===d.charAt(0)?(e=za(a,d),C(e)&&(e=d)):e=this.$$html5?d:"";Yc(e,this);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Nb(this.$$search),e=this.$$hash?
"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ga(b)==Ga(a)?(this.$$parse(a),!0):!1}}function $c(b,a){this.$$html5=!0;dc.apply(this,arguments);var c=bc(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ga(d)?f=d:(g=za(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=function(){var c=Nb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):
"";this.$$url=ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Fb(b){return function(){return this[b]}}function ad(b,a){return function(c){if(C(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Ke(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return y(a)?(b=a,this):b};this.html5Mode=function(b){return Ua(b)?(a.enabled=b,this):O(b)?(Ua(b.enabled)&&(a.enabled=b.enabled),Ua(b.requireBase)&&(a.requireBase=b.requireBase),Ua(b.rewriteLinks)&&
(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,f){function g(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function h(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,l;l=d.baseHref();var m=d.url(),p;if(a.enabled){if(!l&&a.requireBase)throw Eb("nobase");p=m.substring(0,m.indexOf("/",m.indexOf("//")+2))+(l||"/");l=e.history?cc:$c}else p=Ga(m),
l=dc;k=new l(p,"#"+b);k.$$parseLinkUrl(m,m);k.$$state=d.state();var q=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&2!=b.which){for(var e=D(b.target);"a"!==ua(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var g=e.prop("href"),h=e.attr("href")||e.attr("xlink:href");O(g)&&"[object SVGAnimatedString]"===g.toString()&&(g=Ba(g.animVal).href);q.test(g)||!g||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(g,h)||(b.preventDefault(),k.absUrl()!=
d.url()&&(c.$apply(),U.angular["ff-684208-preventDefault"]=!0))}});k.absUrl()!=m&&d.url(k.absUrl(),!0);var t=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,g(d,!1,e)):(t=!1,h(d,e)))});c.$$phase||c.$digest()});c.$watch(function(){var a=Zc(d.url()),b=Zc(k.absUrl()),f=d.state(),l=k.$$replace,q=a!==b||k.$$html5&&e.history&&f!==k.$$state;
if(t||q)t=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===b&&(d?(k.$$parse(a),k.$$state=f):(q&&g(b,l,f===k.$$state?null:k.$$state),h(a,f)))});k.$$replace=!1});return k}]}function Le(){var b=!0,a=this;this.debugEnabled=function(a){return y(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&
(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||H;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function sa(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===
b||"__proto__"===b)throw la("isecfld",a);return b}function ta(b,a){if(b){if(b.constructor===b)throw la("isecfn",a);if(b.window===b)throw la("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw la("isecdom",a);if(b===Object)throw la("isecobj",a);}return b}function ec(b){return b.constant}function Na(b,a,c,d){ta(b,d);a=a.split(".");for(var e,f=0;1<a.length;f++){e=sa(a.shift(),d);var g=ta(b[e],d);g||(g={},b[e]=g);b=g}e=sa(a.shift(),d);ta(b[e],d);return b[e]=c}function Oa(b){return"constructor"==
b}function bd(b,a,c,d,e,f,g){sa(b,f);sa(a,f);sa(c,f);sa(d,f);sa(e,f);var h=function(a){return ta(a,f)},k=g||Oa(b)?h:oa,l=g||Oa(a)?h:oa,m=g||Oa(c)?h:oa,p=g||Oa(d)?h:oa,q=g||Oa(e)?h:oa;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=k(h[b]);if(!a)return h;if(null==h)return u;h=l(h[a]);if(!c)return h;if(null==h)return u;h=m(h[c]);if(!d)return h;if(null==h)return u;h=p(h[d]);return e?null==h?u:h=q(h[e]):h}}function yf(b,a){return function(c,d){return b(c,d,ta,a)}}function cd(b,
a,c){var d=a.expensiveChecks,e=d?zf:Af,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=6>h?bd(g[0],g[1],g[2],g[3],g[4],c,d):function(a,b){var e=0,f;do f=bd(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=u,a=f;while(e<h);return f};else{var k="";d&&(k+="s = eso(s, fe);\nl = eso(l, fe);\n");var l=d;r(g,function(a,b){sa(a,c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;if(d||Oa(a))e="eso("+e+", fe)",l=!0;k+="if(s == null) return undefined;\ns="+e+";\n"});k+="return s;";a=new Function("s",
"l","eso","fe",k);a.toString=ca(k);l&&(a=yf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,c){return Na(a,b,c,b)};return e[b]=f}function fc(b){return B(b.valueOf)?b.valueOf():Bf.call(b)}function Me(){var b=ia(),a=ia();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===
b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=fc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===e.length){var k=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,k)||(h=d(a),k=b&&fc(b));return h},b,c)}for(var l=[],q=0,p=e.length;q<p;q++)l[q]=g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var k=e[c](a);if(b||(b=!g(k,l[c])))l[c]=k&&fc(k)}b&&(h=d(a));
return h},b,c)}function k(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;B(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function l(a,b,c,d){function e(a){var b=!0;r(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;B(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function m(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){B(b)&&
b.apply(this,arguments);e()},c)}function p(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==l&&c!==k?function(c,d){var e=a(c,d);return b(e,c,d)}:function(c,d){var e=a(c,d),f=b(e,c,d);return y(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=[a]);return c}var q={csp:d.csp,expensiveChecks:!1},t={csp:d.csp,expensiveChecks:!0};return function(d,f,g){var v,w,K;switch(typeof d){case "string":K=d=d.trim();var E=g?a:b;v=E[K];
v||(":"===d.charAt(0)&&":"===d.charAt(1)&&(w=!0,d=d.substring(2)),g=g?t:q,v=new gc(g),v=(new eb(v,c,g)).parse(d),v.constant?v.$$watchDelegate=m:w?(v=e(v),v.$$watchDelegate=v.literal?l:k):v.inputs&&(v.$$watchDelegate=h),E[K]=v);return p(v,f);case "function":return p(d,f);default:return p(H,f)}}}]}function Oe(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return dd(function(a){b.$evalAsync(a)},a)}]}function Pe(){this.$get=["$browser","$exceptionHandler",function(b,a){return dd(function(a){b.defer(a)},
a)}]}function dd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=u;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{B(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),
a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=A("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return l(b,!0,a)},function(b){return l(b,!1,a)},b)}};
g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(O(b)||B(b))d=b&&b.then;B(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=
a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(B(b)?b(c):c)}catch(h){a(h)}}})}};var k=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},l=function(a,b,c){var d=null;try{B(c)&&(d=c())}catch(e){return k(e,!1)}return d&&B(d.then)?d.then(function(){return k(a,b)},function(a){return k(a,!1)}):
k(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},p=function t(a){if(!B(a))throw h("norslvr",a);if(!(this instanceof t))return new t(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};p.defer=function(){return new g};p.reject=function(a){var b=new g;b.reject(a);return b.promise};p.when=m;p.all=function(a){var b=new g,c=0,d=x(a)?[]:{};r(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||
b.reject(a)})});0===c&&b.resolve(d);return b.promise};return p}function Ye(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Ne(){var b=10,
a=A("$rootScope"),c=null,d=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(e,f,g,h){function k(){this.$id=++kb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function l(b){if(s.$$phase)throw a("inprog",s.$$phase);s.$$phase=b}function m(a,
b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function p(){}function q(){for(;v.length;)try{v.shift()()}catch(a){f(a)}d=null}function t(){null===d&&(d=h.defer(function(){s.$apply(q)}))}k.prototype={constructor:k,$new:function(a,b){function c(){d.$$destroyed=!0}var d;b=b||this;a?(d=new k,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners=
{};this.$$listenerCount={};this.$id=++kb;this.$$ChildScope=null},this.$$ChildScope.prototype=this),d=new this.$$ChildScope);d.$parent=b;d.$$prevSibling=b.$$childTail;b.$$childHead?(b.$$childTail.$$nextSibling=d,b.$$childTail=d):b.$$childHead=b.$$childTail=d;(a||b!=this)&&d.$on("$destroy",c);return d},$watch:function(a,b,d){var e=g(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,d,e);var f=this.$$watchers,h={fn:b,last:p,get:e,exp:a,eq:!!d};c=null;B(b)||(h.fn=H);f||(f=this.$$watchers=[]);f.unshift(h);
return function(){Va(f,h);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,
b){function c(a){e=a;var b,d,g,h;if(!C(e)){if(O(e))if(Ra(e))for(f!==p&&(f=p,t=f.length=0,l++),a=e.length,t!==a&&(l++,f.length=t=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==m&&(f=m={},t=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(t++,f[b]=g,l++));if(t>a)for(b in l++,f)e.hasOwnProperty(b)||(t--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,q=g(a,c),p=[],m=
{},n=!0,t=0;return this.$watch(q,function(){n?(n=!1,b(e,e,d)):b(e,h,d);if(k)if(O(e))if(Ra(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)rc.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var e,g,k,m,t,v,r=b,I,u=[],y,S;l("$digest");h.$$checkUrlChange();this===s&&null!==d&&(h.defer.cancel(d),q());c=null;do{v=!1;for(I=this;N.length;){try{S=N.shift(),S.scope.$eval(S.expression)}catch(A){f(A)}c=null}a:do{if(m=I.$$watchers)for(t=m.length;t--;)try{if(e=m[t])if((g=
e.get(I))!==(k=e.last)&&!(e.eq?ga(g,k):"number"===typeof g&&"number"===typeof k&&isNaN(g)&&isNaN(k)))v=!0,c=e,e.last=e.eq?Da(g,null):g,e.fn(g,k===p?g:k,I),5>r&&(y=4-r,u[y]||(u[y]=[]),u[y].push({msg:B(e.exp)?"fn: "+(e.exp.name||e.exp.toString()):e.exp,newVal:g,oldVal:k}));else if(e===c){v=!1;break a}}catch(D){f(D)}if(!(m=I.$$childHead||I!==this&&I.$$nextSibling))for(;I!==this&&!(m=I.$$nextSibling);)I=I.$parent}while(I=m);if((v||N.length)&&!r--)throw s.$$phase=null,a("infdig",b,u);}while(v||N.length);
for(s.$$phase=null;n.length;)try{n.shift()()}catch(ea){f(ea)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==s){for(var b in this.$$listenerCount)m(this,this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);
this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=H;this.$on=this.$watch=this.$watchGroup=function(){return H};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){s.$$phase||N.length||h.defer(function(){N.length&&s.$digest()});N.push({scope:this,expression:a})},$$postDigest:function(a){n.push(a)},$apply:function(a){try{return l("$apply"),
this.$eval(a)}catch(b){f(b)}finally{s.$$phase=null;try{s.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&v.push(b);t()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,m(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,
stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=Xa([h],arguments,1),l,q;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(q=d.length;l<q;l++)if(d[l])try{d[l].apply(null,k)}catch(m){f(m)}else d.splice(l,1),l--,q--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;
for(var g=Xa([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var s=new k,N=s.$$asyncQueue=[],n=s.$$postDigestQueue=[],v=s.$$applyAsyncQueue=[];return s}]}function Qd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;
this.aHrefSanitizationWhitelist=function(a){return y(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Ba(c).href;return""===f||f.match(e)?c:"unsafe:"+f}}}function Cf(b){if("self"===b)return b;if(z(b)){if(-1<b.indexOf("***"))throw Ca("iwcard",b);b=ed(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(lb(b))return new RegExp("^"+b.source+"$");throw Ca("imatcher");}function fd(b){var a=
[];y(b)&&r(b,function(b){a.push(Cf(b))});return a}function Re(){this.SCE_CONTEXTS=ma;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=fd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=fd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?Wc(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};
b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ca("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[ma.HTML]=e(g);h[ma.CSS]=e(g);h[ma.URL]=e(g);h[ma.JS]=e(g);h[ma.RESOURCE_URL]=e(h[ma.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ca("icontext",a,b);if(null===b||b===u||""===b)return b;if("string"!==typeof b)throw Ca("itype",a);return new c(b)},getTrusted:function(c,e){if(null===
e||e===u||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===ma.RESOURCE_URL){var g=Ba(e.toString()),p,q,t=!1;p=0;for(q=b.length;p<q;p++)if(d(b[p],g)){t=!0;break}if(t)for(p=0,q=a.length;p<q;p++)if(d(a[p],g)){t=!1;break}if(t)return e;throw Ca("insecurl",e.toString());}if(c===ma.HTML)return f(e);throw Ca("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Qe(){var b=!0;this.enabled=function(a){arguments.length&&
(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Pa)throw Ca("iequirks");var d=qa(ma);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=oa);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;r(ma,function(a,b){var c=Q(b);d[bb("parse_as_"+c)]=function(b){return e(a,
b)};d[bb("get_trusted_"+c)]=function(b){return f(a,b)};d[bb("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function Se(){this.$get=["$window","$document",function(b,a){var c={},d=$((/android (\d+)/.exec(Q((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,k=f.body&&f.body.style,l=!1,m=!1;if(k){for(var p in k)if(l=h.exec(p)){g=l[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in k&&"webkit");
l=!!("transition"in k||g+"Transition"in k);m=!!("animation"in k||g+"Animation"in k);!d||l&&m||(l=z(f.body.style.webkitTransition),m=z(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===a&&11>=Pa)return!1;if(C(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:$a(),vendorPrefix:g,transitions:l,animations:m,android:d}}]}function Ue(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;
var g=a.defaults&&a.defaults.transformResponse;x(g)?g=g.filter(function(a){return a!==Yb}):g===Yb&&(g=null);return a.get(e,{cache:b,transformResponse:g}).then(function(a){d.totalPendingRequests--;return a.data},function(a){d.totalPendingRequests--;if(!f)throw ka("tpload",e);return c.reject(a)})}d.totalPendingRequests=0;return d}]}function Ve(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];r(a,function(a){var d=
ha.element(a).data("$binding");d&&r(d,function(d){c?(new RegExp("(^|\\s)"+ed(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function We(){this.$get=
["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,k,l){var m=y(l)&&!l,p=(m?d:c).defer(),q=p.promise;k=a.defer(function(){try{p.resolve(f())}catch(a){p.reject(a),e(a)}finally{delete g[q.$$timeoutId]}m||b.$apply()},k);q.$$timeoutId=k;g[k]=p;return q}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Ba(b){Pa&&(Z.setAttribute("href",b),b=Z.href);
Z.setAttribute("href",b);return{href:Z.href,protocol:Z.protocol?Z.protocol.replace(/:$/,""):"",host:Z.host,search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,port:Z.port,pathname:"/"===Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function Wc(b){b=z(b)?Ba(b):b;return b.protocol===gd.protocol&&b.host===gd.host}function Xe(){this.$get=ca(U)}function Cc(b){function a(c,d){if(O(c)){var e={};r(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+
"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",hd);a("date",id);a("filter",Df);a("json",Ef);a("limitTo",Ff);a("lowercase",Gf);a("number",jd);a("orderBy",kd);a("uppercase",Hf)}function Df(){return function(b,a,c){if(!x(b))return b;var d;switch(typeof a){case "function":break;case "boolean":case "number":case "string":d=!0;case "object":a=If(a,c,d);break;default:return b}return b.filter(a)}}function If(b,a,c){!0===a?a=ga:B(a)||
(a=function(a,b){if(O(a)||O(b))return!1;a=Q(""+a);b=Q(""+b);return-1!==a.indexOf(b)});return function(d){return fb(d,b,a,c)}}function fb(b,a,c,d){var e=typeof b,f=typeof a;if("string"===f&&"!"===a.charAt(0))return!fb(b,a.substring(1),c,d);if("array"===e)return b.some(function(b){return fb(b,a,c,d)});switch(e){case "object":var g;if(d){for(g in b)if("$"!==g.charAt(0)&&fb(b[g],a,c))return!0;return!1}if("object"===f){for(g in a)if(e=a[g],!B(e)&&(f="$"===g,!fb(f?b:b[g],e,c,f)))return!1;return!0}return c(b,
a);case "function":return!1;default:return c(b,a)}}function hd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){C(d)&&(d=a.CURRENCY_SYM);C(e)&&(e=a.PATTERNS[1].maxFrac);return null==b?b:ld(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function jd(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:ld(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function ld(b,a,c,d,e){if(!isFinite(b)||O(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",k=[],l=!1;if(-1!==g.indexOf("e")){var m=
g.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?b=0:(h=g,l=!0)}if(l)0<e&&1>b&&(h=b.toFixed(e),b=parseFloat(h));else{g=(g.split(md)[1]||"").length;C(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(md),l=g[0],g=g[1]||"",p=0,q=a.lgSize,t=a.gSize;if(l.length>=q+t)for(p=l.length-q,m=0;m<p;m++)0===(p-m)%t&&0!==m&&(h+=c),h+=l.charAt(m);for(m=p;m<l.length;m++)0===(l.length-m)%q&&0!==m&&(h+=c),h+=l.charAt(m);for(;g.length<
e;)g+="0";e&&"0"!==e&&(h+=d+g.substr(0,e))}0===b&&(f=!1);k.push(f?a.negPre:a.posPre,h,f?a.negSuf:a.posSuf);return k.join("")}function Gb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function V(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Gb(e,a,d)}}function Hb(b,a){return function(c,d){var e=c["get"+b](),f=rb(a?"SHORT"+b:b);return d[f][e]}}function nd(b){var a=(new Date(b,0,1)).getDay();
return new Date(b,0,(4>=a?5:12)-a)}function od(b){return function(a){var c=nd(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Gb(a,b)}}function id(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=$(b[9]+b[10]),g=$(b[9]+b[11]));h.call(a,$(b[1]),$(b[2])-1,$(b[3]));f=$(b[4]||0)-f;g=$(b[5]||0)-g;h=$(b[6]||0);b=Math.round(1E3*parseFloat("0."+
(b[7]||0)));k.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g="",h=[],k,l;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;z(c)&&(c=Jf.test(c)?$(c):a(c));Y(c)&&(c=new Date(c));if(!pa(c))return c;for(;e;)(l=Kf.exec(e))?(h=Xa(h,l,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));r(h,function(a){k=Lf[a];g+=k?k(c,b.DATETIME_FORMATS):
a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ef(){return function(b,a){C(a)&&(a=2);return Za(b,a)}}function Ff(){return function(b,a){Y(b)&&(b=b.toString());if(!x(b)&&!z(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):$(a);if(z(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function kd(b){return function(a,c,d){function e(a,b){return b?
function(b,c){return a(c,b)}:a}function f(a,b){var c=typeof a,d=typeof b;return c===d&&"object"===c&&(c=typeof(a.valueOf?a=a.valueOf():a),d=typeof(b.valueOf?b=b.valueOf():b),c===d&&"object"===c&&(c=typeof(a.toString?a=a.toString():a),d=typeof(b.toString?b=b.toString():b),c===d&&a===b||"object"===c))?0:c===d?("string"===c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Ra(a))return a;c=x(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||oa;if(z(a)){if("+"==a.charAt(0)||
"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);if(""===a)return e(function(a,b){return f(a,b)},c);d=b(a);if(d.constant){var l=d();return e(function(a,b){return f(a[l],b[l])},c)}}return e(function(a,b){return f(d(a),d(b))},c)});return Ya.call(a).sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ia(b){B(b)&&(b={link:b});b.restrict=b.restrict||"AC";return ca(b)}function pd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||
Ib;f.$error={};f.$$success={};f.$pending=u;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){r(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){r(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){La(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&
f[a.$name]===a&&delete f[a.$name];r(f.$pending,function(b,c){f.$setValidity(c,null,a)});r(f.$error,function(b,c){f.$setValidity(c,null,a)});Va(g,a)};qd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Va(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Qa);d.addClass(b,Jb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Qa,Jb+" ng-submitted");
f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;r(g,function(a){a.$setPristine()})};f.$setUntouched=function(){r(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function hc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function gb(b,a,c,d,e,f){var g=Q(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;k()})}var k=function(b){l&&(f.defer.cancel(l),
l=null);if(!h){var e=a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=P(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,b)}};if(e.hasEvent("input"))a.on("input",k);else{var l,m=function(a,b,c){l||(l=f.defer(function(){l=null;b&&b.value===c||k(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",m)}a.on("change",k);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?
"":d.$viewValue)}}function Kb(b,a){return function(c,d){var e,f;if(pa(c))return c;if(z(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(Mf.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,
f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function hb(b,a,c,d){return function(e,f,g,h,k,l,m){function p(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function q(a){return y(a)?pa(a)?a:c(a):u}rd(e,f,g,h);gb(e,f,g,h,k,l);var t=h&&h.$options&&h.$options.timezone,s;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,s),"UTC"===t&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):u});h.$formatters.push(function(a){if(a&&!pa(a))throw Lb("datefmt",a);if(p(a)){if((s=
a)&&"UTC"===t){var b=6E4*s.getTimezoneOffset();s=new Date(s.getTime()+b)}return m("date")(a,d,t)}s=null;return""});if(y(g.min)||g.ngMin){var r;h.$validators.min=function(a){return!p(a)||C(r)||c(a)>=r};g.$observe("min",function(a){r=q(a);h.$validate()})}if(y(g.max)||g.ngMax){var n;h.$validators.max=function(a){return!p(a)||C(n)||c(a)<=n};g.$observe("max",function(a){n=q(a);h.$validate()})}}}function rd(b,a,c,d){(d.$$hasNativeValidators=O(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||
{};return c.badInput&&!c.typeMismatch?u:b})}function sd(b,a,c,d,e){if(y(d)){b=b(d);if(!b.constant)throw A("ngModel")("constexpr",c,d);return b(a)}return e}function qd(b){function a(a,b){b&&!f[a]?(l.addClass(e,a),f[a]=!0):!b&&f[a]&&(l.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+Pb(b,"-"):"";a(ib+b,!0===c);a(td+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,k=b.parentForm,l=b.$animate;f[td]=!(f[ib]=e.hasClass(ib));d.$setValidity=function(b,e,f){e===u?(d.$pending||(d.$pending={}),g(d.$pending,
b,f)):(d.$pending&&h(d.$pending,b,f),ud(d.$pending)&&(d.$pending=u));Ua(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(vd,!0),d.$valid=d.$invalid=u,c("",null)):(a(vd,!1),d.$valid=ud(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?u:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);k.$setValidity(b,e,d)}}function ud(b){if(b)for(var a in b)return!1;return!0}function ic(b,a){b="ngClass"+b;return["$animate",
function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!x(a)){if(z(a))return a.split(" ");if(O(a)){var b=[];r(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||{},d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(b){if(!0===
a||f.$index%2===a){var l=e(b||[]);if(!m){var t=k(l,1);h.$addClass(t)}else if(!ga(b,m)){var s=e(m),t=d(l,s),l=d(s,l),t=k(t,1),l=k(l,-1);t&&t.length&&c.addClass(g,t);l&&l.length&&c.removeClass(g,l)}}m=qa(b)}var m;f.$watch(h[b],l,!0);h.$observe("class",function(a){l(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[b]));g===a?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}var Nf=/^\/(.+)\/([a-z]*)$/,Q=function(b){return z(b)?b.toLowerCase():
b},rc=Object.prototype.hasOwnProperty,rb=function(b){return z(b)?b.toUpperCase():b},Pa,D,ra,Ya=[].slice,rf=[].splice,Of=[].push,Ja=Object.prototype.toString,Wa=A("ng"),ha=U.angular||(U.angular={}),ab,kb=0;Pa=X.documentMode;H.$inject=[];oa.$inject=[];var x=Array.isArray,P=function(b){return z(b)?b.trim():b},ed=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},$a=function(){if(y($a.isActive_))return $a.isActive_;var b=!(!X.querySelector("[ng-csp]")&&!X.querySelector("[data-ng-csp]"));
if(!b)try{new Function("")}catch(a){b=!0}return $a.isActive_=b},ob=["ng-","data-ng-","ng:","x-ng-"],Kd=/[A-Z]/g,tc=!1,Qb,na=1,mb=3,Od={full:"1.3.6",major:1,minor:3,dot:6,codeName:"robofunky-danceblaster"};R.expando="ng339";var wb=R.cache={},ff=1;R._data=function(b){return this.cache[b[this.expando]]||{}};var af=/([\:\-\_]+(.))/g,bf=/^moz([A-Z])/,Pf={mouseleave:"mouseout",mouseenter:"mouseover"},Tb=A("jqLite"),ef=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Sb=/<|&#?\w+;/,cf=/<([\w:]+)/,df=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
ja={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ja.optgroup=ja.option;ja.tbody=ja.tfoot=ja.colgroup=ja.caption=ja.thead;ja.th=ja.td;var Ka=R.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===X.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),R(U).on("load",a))},
toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?D(this[b]):D(this[this.length+b])},length:0,push:Of,sort:[].sort,splice:[].splice},Bb={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){Bb[Q(b)]=b});var Lc={};r("input select option textarea button form details".split(" "),function(b){Lc[b]=!0});var Mc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};
r({data:Vb,removeData:ub},function(b,a){R[a]=b});r({data:Vb,inheritedData:Ab,scope:function(b){return D.data(b,"$scope")||Ab(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return D.data(b,"$isolateScope")||D.data(b,"$isolateScopeNoTemplate")},controller:Hc,injector:function(b){return Ab(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:xb,css:function(b,a,c){a=bb(a);if(y(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=Q(a);if(Bb[d])if(y(c))c?
(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||H).specified?d:u;else if(y(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?u:b},prop:function(b,a,c){if(y(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(C(b)){var d=a.nodeType;return d===na||d===mb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(C(a)){if(b.multiple&&"select"===ua(b)){var c=[];r(b.options,function(a){a.selected&&
c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(C(a))return b.innerHTML;tb(b,!0);b.innerHTML=a},empty:Ic},function(b,a){R.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Ic&&(2==b.length&&b!==xb&&b!==Hc?a:d)===u){if(O(a)){for(e=0;e<g;e++)if(b===Vb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===u?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});
r({removeData:ub,on:function a(c,d,e,f){if(y(f))throw Tb("onargs");if(Dc(c)){var g=vb(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=jf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],k=g.length;k--;){d=g[k];var l=f[d];l||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Pf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),l=f[d]);l.push(e)}}},off:Gc,one:function(a,c,d){a=D(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,
d)},replaceWith:function(a,c){var d,e=a.parentNode;tb(a);r(new R(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];r(a.childNodes,function(a){a.nodeType===na&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===na||11===d){c=new R(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===na){var d=a.firstChild;r(new R(c),function(c){a.insertBefore(c,
d)})}},wrap:function(a,c){c=D(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Jc,detach:function(a){Jc(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new R(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:zb,removeClass:yb,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=d;C(f)&&(f=!xb(a,c));(f?zb:yb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},
find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Ub,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=vb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:H,type:g,target:a},c.type&&(e=G(e,
c)),c=qa(h),f=d?[e].concat(d):[e],r(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){R.prototype[c]=function(c,e,f){for(var g,h=0,k=this.length;h<k;h++)C(g)?(g=a(this[h],c,e,f),y(g)&&(g=D(g))):Fc(g,a(this[h],c,e,f));return y(g)?g:this};R.prototype.bind=R.prototype.on;R.prototype.unbind=R.prototype.off});cb.prototype={put:function(a,c){this[Ma(a,this.nextUid)]=c},get:function(a){return this[Ma(a,this.nextUid)]},remove:function(a){var c=this[a=Ma(a,this.nextUid)];delete this[a];
return c}};var Oc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,lf=/,/,mf=/^\s*(_?)(\S+?)\1\s*$/,Nc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Fa=A("$injector");Ob.$$annotate=Wb;var Qf=A("$animate"),Ae=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Qf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};
this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=ia();r((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});r(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function k(){m||
(m=a.defer(),d(function(){m.resolve();m=null}));return m.promise}function l(a,c){if(ha.isObject(c)){var d=G(c.from||{},c.to||{});a.css(d)}}var m;return{animate:function(a,c,d){l(a,{from:c,to:d});return k()},enter:function(a,c,d,e){l(a,e);d?d.after(a):c.prepend(a);return k()},leave:function(a,c){a.remove();return k()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=D(a);c=z(c)?c:x(c)?c.join(" "):"";
r(a,function(a){zb(a,c)});l(a,d);return k()},removeClass:function(a,c,d){return this.setClass(a,[],c,d)},$$removeClassImmediately:function(a,c,d){a=D(a);c=z(c)?c:x(c)?c.join(" "):"";r(a,function(a){yb(a,c)});l(a,d);return k()},setClass:function(a,c,d,e){var k=this,l=!1;a=D(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=ha.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=x(c)?c:c.split(" ");d=x(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=
a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,c);d&&this.$$removeClassImmediately(a,d);l(a,e);return k()},enabled:H,cancel:H}}]}],ka=A("$compile");vc.$inject=["$provide","$$sanitizeUriProvider"];var qf=/^((?:x|data)[\:\-_])/i,Sc="application/json",Zb={"Content-Type":Sc+";charset=utf-8"},
tf=/^\s*(\[|\{[^\{])/,uf=/[\}\]]\s*$/,sf=/^\)\]\}',?\n/,$b=A("$interpolate"),Rf=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,xf={http:80,https:443,ftp:21},Eb=A("$location"),Sf={$$html5:!1,$$replace:!1,absUrl:Fb("$$absUrl"),url:function(a){if(C(a))return this.$$url;var c=Rf.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Fb("$$protocol"),host:Fb("$$host"),port:Fb("$$port"),path:ad("$$path",function(a){a=null!==a?
a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(z(a)||Y(a))a=a.toString(),this.$$search=qc(a);else if(O(a))a=Da(a,{}),r(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Eb("isrcharg");break;default:C(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:ad("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};
r([$c,dc,cc],function(a){a.prototype=Object.create(Sf);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==cc||!this.$$html5)throw Eb("nostate");this.$$state=C(c)?null:c;return this}});var la=A("$parse"),Tf=Function.prototype.call,Uf=Function.prototype.apply,Vf=Function.prototype.bind,Mb=ia();r({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;Mb[c]=a});Mb["this"]=
function(a){return a};Mb["this"].sharedGetter=!0;var jb=G(ia(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return y(d)?y(e)?d+e:d:y(e)?e:u},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(y(d)?d:0)-(y(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,
c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Wf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},gc=function(a){this.options=a};gc.prototype={constructor:gc,lex:function(a){this.text=a;this.index=0;for(this.tokens=
[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=jb[c],f=jb[d];jb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=
a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===
a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=y(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw la("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=Q(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||
e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=
this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=Wf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var eb=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};eb.ZERO=G(function(){return 0},
{sharedGetter:!0,constant:!0});eb.prototype={constructor:eb,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.peek().identifier?a=this.identifier():this.peek().constant?a=
this.constant():this.throwError("not a primary expression",this.peek());for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw la("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw la("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,
e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){if(0===this.tokens.length)throw la("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return c},unaryFn:function(a,c){var d=jb[a];return G(function(a,f){return d(a,
f,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,c,d,e){var f=jb[c];return G(function(c,e){return f(c,e,a,d)},{constant:a.constant&&d.constant,inputs:!e&&[a,d]})},identifier:function(){for(var a=this.consume().text;this.peek(".")&&this.peekAhead(1).identifier&&!this.peekAhead(2,"(");)a+=this.consume().text+this.consume().text;return Mb[a]||cd(a,this.options,this.text)},constant:function(){var a=this.consume().value;return G(function(){return a},{constant:!0,literal:!0})},statements:function(){for(var a=
[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.$filter(this.consume().text),d,e;if(this.peek(":"))for(d=[],e=[];this.expect(":");)d.push(this.expression());var f=[a].concat(d||[]);return G(function(f,h){var k=a(f,h);if(e){e[0]=
k;for(k=d.length;k--;)e[k+1]=d[k](f,h);return c.apply(u,e)}return c(k)},{constant:!c.$stateful&&f.every(ec),inputs:!c.$stateful&&f})},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),G(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c;if(this.expect("?")&&
(c=this.assignment(),this.consume(":"))){var d=this.assignment();return G(function(e,f){return a(e,f)?c(e,f):d(e,f)},{constant:a.constant&&c.constant&&d.constant})}return a},logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.text,this.logicalAND(),!0);return a},logicalAND:function(){for(var a=this.equality(),c;c=this.expect("&&");)a=this.binaryFn(a,c.text,this.equality(),!0);return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=",
"===","!==");)a=this.binaryFn(a,c.text,this.relational());return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a=this.binaryFn(a,c.text,this.additive());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.text,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.text,this.unary());return a},unary:function(){var a;return this.expect("+")?
this.primary():(a=this.expect("-"))?this.binaryFn(eb.ZERO,a.text,this.unary()):(a=this.expect("!"))?this.unaryFn(a.text,this.unary()):this.primary()},fieldAccess:function(a){var c=this.text,d=this.consume().text,e=cd(d,this.options,c);return G(function(c,d,h){return e(h||a(c,d))},{assign:function(e,g,h){(h=a(e,h))||a.assign(e,h={});return Na(h,d,g,c)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return G(function(e,f){var g=a(e,f),h=d(e,f);sa(h,c);return g?ta(g[h],
c):u},{assign:function(e,f,g){var h=sa(d(e,g),c);(g=ta(a(e,g),c))||a.assign(e,g={});return g[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var k=c?c(g,h):y(c)?u:g,l=a(g,h,k)||H;if(f)for(var m=d.length;m--;)f[m]=ta(d[m](g,h),e);ta(k,e);if(l){if(l.constructor===l)throw la("isecfn",e);if(l===Tf||l===Uf||l===Vf)throw la("isecff",e);}k=l.apply?l.apply(k,
f):l(f[0],f[1],f[2],f[3],f[4]);return ta(k,e)}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return G(function(c,d){for(var e=[],f=0,g=a.length;f<g;f++)e.push(a[f](c,d));return e},{literal:!0,constant:a.every(ec),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.consume();d.constant?a.push(d.value):d.identifier?a.push(d.text):
this.throwError("invalid key",d);this.consume(":");c.push(this.expression())}while(this.expect(","))}this.consume("}");return G(function(d,f){for(var g={},h=0,k=c.length;h<k;h++)g[a[h]]=c[h](d,f);return g},{literal:!0,constant:c.every(ec),inputs:c})}};var Af=ia(),zf=ia(),Bf=Object.prototype.valueOf,Ca=A("$sce"),ma={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ka=A("$compile"),Z=X.createElement("a"),gd=Ba(U.location.href);Cc.$inject=["$provide"];hd.$inject=["$locale"];jd.$inject=
["$locale"];var md=".",Lf={yyyy:V("FullYear",4),yy:V("FullYear",2,0,!0),y:V("FullYear",1),MMMM:Hb("Month"),MMM:Hb("Month",!0),MM:V("Month",2,1),M:V("Month",1,1),dd:V("Date",2),d:V("Date",1),HH:V("Hours",2),H:V("Hours",1),hh:V("Hours",2,-12),h:V("Hours",1,-12),mm:V("Minutes",2),m:V("Minutes",1),ss:V("Seconds",2),s:V("Seconds",1),sss:V("Milliseconds",3),EEEE:Hb("Day"),EEE:Hb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=
a?"+":"")+(Gb(Math[0<a?"floor":"ceil"](a/60),2)+Gb(Math.abs(a%60),2))},ww:od(2),w:od(1)},Kf=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,Jf=/^\-?\d+$/;id.$inject=["$locale"];var Gf=ca(Q),Hf=ca(rb);kd.$inject=["$parse"];var Rd=ca({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var f="[object SVGAnimatedString]"===Ja.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}),sb=
{};r(Bb,function(a,c){if("multiple"!=a){var d=wa("ng-"+c);sb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});r(Mc,function(a,c){sb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Nf))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});r(["src","srcset","href"],function(a){var c=wa("ng-"+a);sb[c]=function(){return{priority:99,
link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Ja.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,function(c){c?(f.$set(h,c),Pa&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Ib={$addControl:H,$$renameControl:function(a,c){a.$name=c},$removeControl:H,$setValidity:H,$setDirty:H,$setPristine:H,$setSubmitted:H};pd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var wd=function(a){return["$timeout",function(c){return{name:"form",
restrict:a?"EAC":"E",controller:pd,compile:function(a){a.addClass(Qa).addClass(ib);return{pre:function(a,d,g,h){if(!("action"in g)){var k=function(c){a.$apply(function(){h.$commitViewValue();h.$setSubmitted()});c.preventDefault()};d[0].addEventListener("submit",k,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",k,!1)},0,!1)})}var l=h.$$parentForm,m=h.$name;m&&(Na(a,m,h,m),g.$observe(g.name?"name":"ngForm",function(c){m!==c&&(Na(a,m,u,m),m=c,Na(a,m,h,m),l.$$renameControl(h,
m))}));d.on("$destroy",function(){l.$removeControl(h);m&&Na(a,m,u,m);G(h,Ib)})}}}}}]},Sd=wd(),ee=wd(!0),Mf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Xf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Yf=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Zf=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,xd=/^(\d{4})-(\d{2})-(\d{2})$/,yd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
jc=/^(\d{4})-W(\d\d)$/,zd=/^(\d{4})-(\d\d)$/,Ad=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,$f=/(\s+|^)default(\s+|$)/,Lb=new A("ngModel"),Bd={text:function(a,c,d,e,f,g){gb(a,c,d,e,f,g);hc(e)},date:hb("date",xd,Kb(xd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":hb("datetimelocal",yd,Kb(yd,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:hb("time",Ad,Kb(Ad,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:hb("week",jc,function(a,c){if(pa(a))return a;if(z(a)){jc.lastIndex=0;var d=
jc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,k=0,l=nd(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),k=c.getMilliseconds());return new Date(e,0,l.getDate()+f,d,g,h,k)}}return NaN},"yyyy-Www"),month:hb("month",zd,Kb(zd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){rd(a,c,d,e);gb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:Zf.test(a)?parseFloat(a):u});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!Y(a))throw Lb("numfmt",
a);a=a.toString()}return a});if(d.min||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||C(h)||a>=h};d.$observe("min",function(a){y(a)&&!Y(a)&&(a=parseFloat(a,10));h=Y(a)&&!isNaN(a)?a:u;e.$validate()})}if(d.max||d.ngMax){var k;e.$validators.max=function(a){return e.$isEmpty(a)||C(k)||a<=k};d.$observe("max",function(a){y(a)&&!Y(a)&&(a=parseFloat(a,10));k=Y(a)&&!isNaN(a)?a:u;e.$validate()})}},url:function(a,c,d,e,f,g){gb(a,c,d,e,f,g);hc(e);e.$$parserName="url";e.$validators.url=function(a,
c){var d=a||c;return e.$isEmpty(d)||Xf.test(d)}},email:function(a,c,d,e,f,g){gb(a,c,d,e,f,g);hc(e);e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||Yf.test(d)}},radio:function(a,c,d,e){C(d.name)&&c.attr("name",++kb);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,k){var l=sd(k,a,"ngTrueValue",d.ngTrueValue,!0),
m=sd(k,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return ga(a,l)});e.$parsers.push(function(a){return a?l:m})},hidden:H,button:H,submit:H,reset:H,file:H},wc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,k){k[0]&&(Bd[Q(h.type)]||Bd.text)(f,g,h,k[0],
c,a,d,e)}}}}],ib="ng-valid",td="ng-invalid",Qa="ng-pristine",Jb="ng-dirty",vd="ng-pending",ag=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,k,l,m){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=u;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=
!1;this.$error={};this.$$success={};this.$pending=u;this.$name=m(d.name||"",!1)(a);var p=f(d.ngModel),q=p.assign,t=p,s=q,N=null,n=this;this.$$setOptions=function(a){if((n.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");t=function(a){var d=p(a);B(d)&&(d=c(a));return d};s=function(a,c){B(p(a))?g(a,{$$$p:n.$modelValue}):q(a,n.$modelValue)}}else if(!p.assign)throw Lb("nonassign",d.ngModel,va(e));};this.$render=H;this.$isEmpty=function(a){return C(a)||""===a||null===a||a!==
a};var v=e.inheritedData("$formController")||Ib,w=0;qd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:v,$animate:g});this.$setPristine=function(){n.$dirty=!1;n.$pristine=!0;g.removeClass(e,Jb);g.addClass(e,Qa)};this.$setDirty=function(){n.$dirty=!0;n.$pristine=!1;g.removeClass(e,Qa);g.addClass(e,Jb);v.$setDirty()};this.$setUntouched=function(){n.$touched=!1;n.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){n.$touched=
!0;n.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(N);n.$viewValue=n.$$lastCommittedViewValue;n.$render()};this.$validate=function(){if(!Y(n.$modelValue)||!isNaN(n.$modelValue)){var a=n.$$rawModelValue,c=n.$valid,d=n.$modelValue,e=n.$options&&n.$options.allowInvalid;n.$$runValidators(n.$error[n.$$parserName||"parse"]?!1:u,a,n.$$lastCommittedViewValue,function(f){e||c===f||(n.$modelValue=f?a:u,n.$modelValue!==d&&n.$$writeModelToScope())})}};this.$$runValidators=
function(a,c,d,e){function f(){var a=!0;r(n.$validators,function(e,f){var g=e(c,d);a=a&&g;h(f,g)});return a?!0:(r(n.$asyncValidators,function(a,c){h(c,null)}),!1)}function g(){var a=[],e=!0;r(n.$asyncValidators,function(f,g){var k=f(c,d);if(!k||!B(k.then))throw Lb("$asyncValidators",k);h(g,u);a.push(k.then(function(){h(g,!0)},function(a){e=!1;h(g,!1)}))});a.length?l.all(a).then(function(){k(e)},H):k(!0)}function h(a,c){m===w&&n.$setValidity(a,c)}function k(a){m===w&&e(a)}w++;var m=w;(function(a){var c=
n.$$parserName||"parse";if(a===u)h(c,null);else if(h(c,a),!a)return r(n.$validators,function(a,c){h(c,null)}),r(n.$asyncValidators,function(a,c){h(c,null)}),!1;return!0})(a)?f()?g():k(!1):k(!1)};this.$commitViewValue=function(){var a=n.$viewValue;h.cancel(N);if(n.$$lastCommittedViewValue!==a||""===a&&n.$$hasNativeValidators)n.$$lastCommittedViewValue=a,n.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=n.$$lastCommittedViewValue,d=C(c)?u:!0;if(d)for(var e=
0;e<n.$parsers.length;e++)if(c=n.$parsers[e](c),C(c)){d=!1;break}Y(n.$modelValue)&&isNaN(n.$modelValue)&&(n.$modelValue=t(a));var f=n.$modelValue,g=n.$options&&n.$options.allowInvalid;n.$$rawModelValue=c;g&&(n.$modelValue=c,n.$modelValue!==f&&n.$$writeModelToScope());n.$$runValidators(d,c,n.$$lastCommittedViewValue,function(a){g||(n.$modelValue=a?c:u,n.$modelValue!==f&&n.$$writeModelToScope())})};this.$$writeModelToScope=function(){s(a,n.$modelValue);r(n.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};
this.$setViewValue=function(a,c){n.$viewValue=a;n.$options&&!n.$options.updateOnDefault||n.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=n.$options;e&&y(e.debounce)&&(e=e.debounce,Y(e)?d=e:Y(e[c])?d=e[c]:Y(e["default"])&&(d=e["default"]));h.cancel(N);d?N=h(function(){n.$commitViewValue()},d):k.$$phase?n.$commitViewValue():a.$apply(function(){n.$commitViewValue()})};a.$watch(function(){var c=t(a);if(c!==n.$modelValue){n.$modelValue=n.$$rawModelValue=c;for(var d=
n.$formatters,e=d.length,f=c;e--;)f=d[e](f);n.$viewValue!==f&&(n.$viewValue=n.$$lastCommittedViewValue=f,n.$render(),n.$$runValidators(u,c,f,H))}return c})}],te=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:ag,priority:1,compile:function(c){c.addClass(Qa).addClass("ng-untouched").addClass(ib);return{pre:function(a,c,f,g){var h=g[0],k=g[1]||Ib;h.$$setOptions(g[2]&&g[2].$options);k.$addControl(h);f.$observe("name",function(a){h.$name!==a&&k.$$renameControl(h,
a)});a.$on("$destroy",function(){k.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],ve=ca({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),yc=function(){return{restrict:"A",require:"?ngModel",link:function(a,
c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},xc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){z(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw A("ngPattern")("noregexp",g,a,va(c));f=a||u;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||C(f)||f.test(a)}}}}},Ac=function(){return{restrict:"A",
require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=$(a);f=isNaN(a)?-1:a;e.$validate()});e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(a)||c.length<=f}}}}},zc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=$(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(c)||c.length>=f}}}}},ue=function(){return{restrict:"A",priority:100,require:"ngModel",
link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?P(f):f;e.$parsers.push(function(a){if(!C(a)){var c=[];a&&r(a.split(h),function(a){a&&c.push(g?P(a):a)});return c}});e.$formatters.push(function(a){return x(a)?a.join(f):u});e.$isEmpty=function(a){return!a||!a.length}}}},bg=/^(true|false|\d+)$/,we=function(){return{restrict:"A",priority:100,compile:function(a,c){return bg.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,
function(a){f.$set("value",a)})}}}},xe=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==u?(this.$options.updateOnDefault=!1,this.$options.updateOn=P(this.$options.updateOn.replace($f,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Xd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,
f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===u?"":a})}}}}],Zd=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===u?"":a})}}}}],Yd=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});
d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],$d=ic("",!0),be=ic("Odd",0),ae=ic("Even",1),ce=Ia({compile:function(a,c){c.$set("ngCloak",u);a.removeClass("ng-cloak")}}),de=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Bc={},cg={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=wa("ng-"+a);Bc[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};cg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var ge=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,k,l;c.$watch(e.ngIf,function(c){c?k||g(function(c,f){k=f;c[c.length++]=X.createComment(" end ngIf: "+
e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(l&&(l.remove(),l=null),k&&(k.$destroy(),k=null),h&&(l=qb(h.clone),a.leave(l).then(function(){l=null}),h=null))})}}}],he=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ha.noop,compile:function(f,g){var h=g.ngInclude||g.src,k=g.onload||"",l=g.autoscroll;return function(f,g,q,r,s){var u=0,n,v,w,K=function(){v&&(v.remove(),v=null);n&&(n.$destroy(),
n=null);w&&(d.leave(w).then(function(){v=null}),v=w,w=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=function(){!y(l)||l&&!f.$eval(l)||c()},q=++u;e?(a(e,!0).then(function(a){if(q===u){var c=f.$new();r.template=a;a=s(c,function(a){K();d.enter(a,null,g).then(h)});n=c;w=a;n.$emit("$includeContentLoaded",e);f.$eval(k)}},function(){q===u&&(K(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(K(),r.template=null)})}}}}],ye=["$compile",function(a){return{restrict:"ECA",
priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Ec(f.template,X).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],ie=Ia({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),je=Ia({terminal:!0,priority:1E3}),ke=["$locale","$interpolate",function(a,c){var d=/{}/g,e=/^when(Minus)?(.+)$/;return{restrict:"EA",link:function(f,g,h){function k(a){g.text(a||"")}var l=
h.count,m=h.$attr.when&&g.attr(h.$attr.when),p=h.offset||0,q=f.$eval(m)||{},t={},m=c.startSymbol(),s=c.endSymbol(),u=m+l+"-"+p+s,n=ha.noop,v;r(h,function(a,c){var d=e.exec(c);d&&(d=(d[1]?"-":"")+Q(d[2]),q[d]=g.attr(h.$attr[c]))});r(q,function(a,e){t[e]=c(a.replace(d,u))});f.$watch(l,function(c){c=parseFloat(c);var d=isNaN(c);d||c in q||(c=a.pluralCat(c-p));c===v||d&&isNaN(v)||(n(),n=f.$watch(t[c],k),v=c)})}}}],le=["$parse","$animate",function(a,c){var d=A("ngRepeat"),e=function(a,c,d,e,l,m,p){a[d]=
e;l&&(a[l]=m);a.$index=c;a.$first=0===c;a.$last=c===p-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,k=X.createComment(" end ngRepeat: "+h+" "),l=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw d("iexp",h);var m=l[1],p=l[2],q=l[3],t=l[4],l=m.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
if(!l)throw d("iidexp",m);var s=l[3]||l[1],y=l[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(q)))throw d("badident",q);var n,v,w,A,E={$id:Ma};t?n=a(t):(w=function(a,c){return Ma(c)},A=function(a){return a});return function(a,f,g,l,m){n&&(v=function(c,d,e){y&&(E[y]=c);E[s]=d;E.$index=e;return n(a,E)});var t=ia();a.$watchCollection(p,function(g){var l,n,p=f[0],F,E=ia(),C,H,G,T,B,x,z;q&&(a[q]=g);if(Ra(g))B=g,n=v||
w;else{n=v||A;B=[];for(z in g)g.hasOwnProperty(z)&&"$"!=z.charAt(0)&&B.push(z);B.sort()}C=B.length;z=Array(C);for(l=0;l<C;l++)if(H=g===B?l:B[l],G=g[H],T=n(H,G,l),t[T])x=t[T],delete t[T],E[T]=x,z[l]=x;else{if(E[T])throw r(z,function(a){a&&a.scope&&(t[a.id]=a)}),d("dupes",h,T,G);z[l]={id:T,scope:u,clone:u};E[T]=!0}for(F in t){x=t[F];T=qb(x.clone);c.leave(T);if(T[0].parentNode)for(l=0,n=T.length;l<n;l++)T[l].$$NG_REMOVED=!0;x.scope.$destroy()}for(l=0;l<C;l++)if(H=g===B?l:B[l],G=g[H],x=z[l],x.scope){F=
p;do F=F.nextSibling;while(F&&F.$$NG_REMOVED);x.clone[0]!=F&&c.move(qb(x.clone),null,D(p));p=x.clone[x.clone.length-1];e(x.scope,l,s,G,y,H,C)}else m(function(a,d){x.scope=d;var f=k.cloneNode(!1);a[a.length++]=f;c.enter(a,null,D(p));p=f;x.clone=a;E[x.id]=x;e(x.scope,l,s,G,y,H,C)});t=E})}}}}],me=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],fe=["$animate",
function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],ne=Ia(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),oe=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],k=[],l=[],m=function(a,c){return function(){a.splice(c,
1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=k.length;d<e;++d)a.cancel(k[d]);d=k.length=0;for(e=l.length;d<e;++d){var s=qb(h[d].clone);l[d].$destroy();(k[d]=a.leave(s)).then(m(k,d))}h.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=X.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],pe=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,
link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),qe=Ia({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),se=Ia({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw A("ngTransclude")("orphan",va(c));f(function(a){c.empty();c.append(a)})}}),Td=["$templateCache",function(a){return{restrict:"E",
terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],dg=A("ngOptions"),re=ca({restrict:"A",terminal:!0}),Ud=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:H};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,
c,d){var k=this,l={},m=e,p;k.databound=d.ngModel;k.init=function(a,c,d){m=a;p=d};k.addOption=function(c,d){La(c,'"option value"');l[c]=!0;m.$viewValue==c&&(a.val(c),p.parent()&&p.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};k.removeOption=function(a){this.hasOption(a)&&(delete l[a],m.$viewValue===a&&this.renderUnknownOption(a))};k.renderUnknownOption=function(c){c="? "+Ma(c)+" ?";p.val(c);a.prepend(p);a.val(c);p.prop("selected",!0)};k.hasOption=function(a){return l.hasOwnProperty(a)};
c.$on("$destroy",function(){k.renderUnknownOption=H})}],link:function(e,g,h,k){function l(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(E.parent()&&E.remove(),c.val(a),""===a&&n.prop("selected",!0)):C(a)&&n?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){E.parent()&&E.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new cb(d.$viewValue);r(c.find("option"),function(c){c.selected=y(a.get(c.value))})};a.$watch(function(){ga(e,
d.$viewValue)||(e=qa(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function p(e,f,g){function h(a,c,d){U[B]=d;G&&(U[G]=c);return a(e,U)}function k(a){var c;if(t)if(L&&x(a)){c=new cb([]);for(var d=0;d<a.length;d++)c.put(h(L,null,a[d]),!0)}else c=new cb(a);else L&&(a=h(L,null,a));return function(d,e){var f;f=L?L:C?C:z;return t?y(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){v||(e.$$postDigest(n),
v=!0)}function m(a,c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function n(){v=!1;var a={"":[]},c=[""],d,l,p,s,u;p=g.$viewValue;s=O(e)||[];var C=G?Object.keys(s).sort():s,x,B,D,z,S={};u=k(p);var P=!1,V,X;Q={};for(z=0;D=C.length,z<D;z++){x=z;if(G&&(x=C[z],"$"===x.charAt(0)))continue;B=s[x];d=h(J,x,B)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=u(x,B);P=P||d;B=h(E,x,B);B=y(B)?B:"";X=L?L(e,U):G?C[z]:z;L&&(Q[X]=x);l.push({id:X,label:B,selected:d})}t||(A||null===p?a[""].unshift({id:"",label:"",selected:!P}):P||a[""].unshift({id:"?",
label:"",selected:!0}));x=0;for(C=c.length;x<C;x++){d=c[x];l=a[d];R.length<=x?(p={element:H.clone().attr("label",d),label:l.label},s=[p],R.push(s),f.append(p.element)):(s=R[x],p=s[0],p.label!=d&&p.element.attr("label",p.label=d));P=null;z=0;for(D=l.length;z<D;z++)d=l[z],(u=s[z+1])?(P=u.element,u.label!==d.label&&(m(S,u.label,!1),m(S,d.label,!0),P.text(u.label=d.label),P.prop("label",u.label)),u.id!==d.id&&P.val(u.id=d.id),P[0].selected!==d.selected&&(P.prop("selected",u.selected=d.selected),Pa&&P.prop("selected",
u.selected))):(""===d.id&&A?V=A:(V=w.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).prop("label",d.label).text(d.label),s.push(u={element:V,label:d.label,id:d.id,selected:d.selected}),m(S,d.label,!0),P?P.after(V):p.element.append(V),P=V);for(z++;s.length>z;)d=s.pop(),m(S,d.label,!1),d.element.remove()}for(;R.length>x;){l=R.pop();for(z=1;z<l.length;++z)m(S,l[z].label,!1);l[0].element.remove()}r(S,function(a,c){0<a?q.addOption(c):0>a&&q.removeOption(c)})}var p;if(!(p=s.match(d)))throw dg("iexp",
s,va(f));var E=c(p[2]||p[1]),B=p[4]||p[6],D=/ as /.test(p[0])&&p[1],C=D?c(D):null,G=p[5],J=c(p[3]||""),z=c(p[2]?p[1]:B),O=c(p[7]),L=p[8]?c(p[8]):null,Q={},R=[[{element:f,label:""}]],U={};A&&(a(A)(e),A.removeClass("ng-scope"),A.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=O(e)||[],c;if(t)c=[],r(f.val(),function(d){d=L?Q[d]:d;c.push("?"===d?u:""===d?null:h(C?C:z,d,a[d]))});else{var d=L?Q[f.val()]:f.val();c="?"===d?u:""===d?null:h(C?C:z,d,a[d])}g.$setViewValue(c);n()})});g.$render=
n;e.$watchCollection(O,l);e.$watchCollection(function(){var a=O(e),c;if(a&&x(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(E,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(E,d,a[d]));return c},l);t&&e.$watchCollection(function(){return g.$modelValue},l)}if(k[1]){var q=k[0];k=k[1];var t=h.multiple,s=h.ngOptions,A=!1,n,v=!1,w=D(X.createElement("option")),H=D(X.createElement("optgroup")),E=w.clone();h=0;for(var B=g.children(),G=B.length;h<G;h++)if(""===B[h].value){n=A=B.eq(h);
break}q.init(k,A,E);t&&(k.$isEmpty=function(a){return!a||0===a.length});s?p(e,g,k):t?m(e,g,k):l(e,g,k,q)}}}}],Wd=["$interpolate",function(a){var c={addOption:H,removeOption:H};return{restrict:"E",priority:100,compile:function(d,e){if(C(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var l=d.parent(),m=l.data("$selectController")||l.parent().data("$selectController");m&&m.databound||(m=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&m.removeOption(c);m.addOption(a,
d)}):m.addOption(e.value,d);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],Vd=ca({restrict:"E",terminal:!1});U.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(Ld(),Nd(ha),D(X).ready(function(){Hd(X,sc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map

/*!
 * ionic.bundle.js is a concatenation of:
 * ionic.js, angular.js, angular-animate.js,
 * angular-sanitize.js, angular-ui-router.js,
 * and ionic-angular.js
 */

/*
 AngularJS v1.3.6
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(N,f,W){'use strict';f.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){return function(X,C,g){g=g.ngAnimateChildren;f.isString(g)&&0===g.length?C.data("$$ngAnimateChildren",!0):X.$watch(g,function(f){C.data("$$ngAnimateChildren",!!f)})}}).factory("$$animateReflow",["$$rAF","$document",function(f,C){return function(g){return f(function(){g()})}}]).config(["$provide","$animateProvider",function(X,C){function g(f){for(var n=0;n<f.length;n++){var g=f[n];if(1==g.nodeType)return g}}
function ba(f,n){return g(f)==g(n)}var t=f.noop,n=f.forEach,da=C.$$selectors,aa=f.isArray,ea=f.isString,ga=f.isObject,r={running:!0},u;X.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest","$$jqLite",function(O,N,M,Y,y,H,P,W,Z,Q){function R(a,c){var b=a.data("$$ngAnimateState")||{};c&&(b.running=!0,b.structural=!0,a.data("$$ngAnimateState",b));return b.disabled||b.running&&b.structural}function D(a){var c,b=N.defer();
b.promise.$$cancelFn=function(){c&&c()};P.$$postDigest(function(){c=a(function(){b.resolve()})});return b.promise}function I(a){if(ga(a))return a.tempClasses&&ea(a.tempClasses)&&(a.tempClasses=a.tempClasses.split(/\s+/)),a}function S(a,c,b){b=b||{};var d={};n(b,function(e,a){n(a.split(" "),function(a){d[a]=e})});var h=Object.create(null);n((a.attr("class")||"").split(/\s+/),function(e){h[e]=!0});var f=[],l=[];n(c&&c.classes||[],function(e,a){var b=h[a],c=d[a]||{};!1===e?(b||"addClass"==c.event)&&
l.push(a):!0===e&&(b&&"removeClass"!=c.event||f.push(a))});return 0<f.length+l.length&&[f.join(" "),l.join(" ")]}function T(a){if(a){var c=[],b={};a=a.substr(1).split(".");(Y.transitions||Y.animations)&&c.push(M.get(da[""]));for(var d=0;d<a.length;d++){var f=a[d],k=da[f];k&&!b[f]&&(c.push(M.get(k)),b[f]=!0)}return c}}function U(a,c,b,d){function h(e,a){var b=e[a],c=e["before"+a.charAt(0).toUpperCase()+a.substr(1)];if(b||c)return"leave"==a&&(c=b,b=null),u.push({event:a,fn:b}),J.push({event:a,fn:c}),
!0}function k(c,l,w){var E=[];n(c,function(a){a.fn&&E.push(a)});var m=0;n(E,function(c,f){var p=function(){a:{if(l){(l[f]||t)();if(++m<E.length)break a;l=null}w()}};switch(c.event){case "setClass":l.push(c.fn(a,e,A,p,d));break;case "animate":l.push(c.fn(a,b,d.from,d.to,p));break;case "addClass":l.push(c.fn(a,e||b,p,d));break;case "removeClass":l.push(c.fn(a,A||b,p,d));break;default:l.push(c.fn(a,p,d))}});l&&0===l.length&&w()}var l=a[0];if(l){d&&(d.to=d.to||{},d.from=d.from||{});var e,A;aa(b)&&(e=
b[0],A=b[1],e?A?b=e+" "+A:(b=e,c="addClass"):(b=A,c="removeClass"));var w="setClass"==c,E=w||"addClass"==c||"removeClass"==c||"animate"==c,p=a.attr("class")+" "+b;if(x(p)){var ca=t,m=[],J=[],g=t,s=[],u=[],p=(" "+p).replace(/\s+/g,".");n(T(p),function(a){!h(a,c)&&w&&(h(a,"addClass"),h(a,"removeClass"))});return{node:l,event:c,className:b,isClassBased:E,isSetClassOperation:w,applyStyles:function(){d&&a.css(f.extend(d.from||{},d.to||{}))},before:function(a){ca=a;k(J,m,function(){ca=t;a()})},after:function(a){g=
a;k(u,s,function(){g=t;a()})},cancel:function(){m&&(n(m,function(a){(a||t)(!0)}),ca(!0));s&&(n(s,function(a){(a||t)(!0)}),g(!0))}}}}}function G(a,c,b,d,h,k,l,e){function A(e){var l="$animate:"+e;J&&J[l]&&0<J[l].length&&H(function(){b.triggerHandler(l,{event:a,className:c})})}function w(){A("before")}function E(){A("after")}function p(){p.hasBeenRun||(p.hasBeenRun=!0,k())}function g(){if(!g.hasBeenRun){m&&m.applyStyles();g.hasBeenRun=!0;l&&l.tempClasses&&n(l.tempClasses,function(a){u.removeClass(b,
a)});var w=b.data("$$ngAnimateState");w&&(m&&m.isClassBased?B(b,c):(H(function(){var e=b.data("$$ngAnimateState")||{};fa==e.index&&B(b,c,a)}),b.data("$$ngAnimateState",w)));A("close");e()}}var m=U(b,a,c,l);if(!m)return p(),w(),E(),g(),t;a=m.event;c=m.className;var J=f.element._data(m.node),J=J&&J.events;d||(d=h?h.parent():b.parent());if(z(b,d))return p(),w(),E(),g(),t;d=b.data("$$ngAnimateState")||{};var L=d.active||{},s=d.totalActive||0,q=d.last;h=!1;if(0<s){s=[];if(m.isClassBased)"setClass"==q.event?
(s.push(q),B(b,c)):L[c]&&(v=L[c],v.event==a?h=!0:(s.push(v),B(b,c)));else if("leave"==a&&L["ng-leave"])h=!0;else{for(var v in L)s.push(L[v]);d={};B(b,!0)}0<s.length&&n(s,function(a){a.cancel()})}!m.isClassBased||m.isSetClassOperation||"animate"==a||h||(h="addClass"==a==b.hasClass(c));if(h)return p(),w(),E(),A("close"),e(),t;L=d.active||{};s=d.totalActive||0;if("leave"==a)b.one("$destroy",function(a){a=f.element(this);var e=a.data("$$ngAnimateState");e&&(e=e.active["ng-leave"])&&(e.cancel(),B(a,"ng-leave"))});
u.addClass(b,"ng-animate");l&&l.tempClasses&&n(l.tempClasses,function(a){u.addClass(b,a)});var fa=K++;s++;L[c]=m;b.data("$$ngAnimateState",{last:m,active:L,index:fa,totalActive:s});w();m.before(function(e){var l=b.data("$$ngAnimateState");e=e||!l||!l.active[c]||m.isClassBased&&l.active[c].event!=a;p();!0===e?g():(E(),m.after(g))});return m.cancel}function q(a){if(a=g(a))a=f.isFunction(a.getElementsByClassName)?a.getElementsByClassName("ng-animate"):a.querySelectorAll(".ng-animate"),n(a,function(a){a=
f.element(a);(a=a.data("$$ngAnimateState"))&&a.active&&n(a.active,function(a){a.cancel()})})}function B(a,c){if(ba(a,y))r.disabled||(r.running=!1,r.structural=!1);else if(c){var b=a.data("$$ngAnimateState")||{},d=!0===c;!d&&b.active&&b.active[c]&&(b.totalActive--,delete b.active[c]);if(d||!b.totalActive)u.removeClass(a,"ng-animate"),a.removeData("$$ngAnimateState")}}function z(a,c){if(r.disabled)return!0;if(ba(a,y))return r.running;var b,d,g;do{if(0===c.length)break;var k=ba(c,y),l=k?r:c.data("$$ngAnimateState")||
{};if(l.disabled)return!0;k&&(g=!0);!1!==b&&(k=c.data("$$ngAnimateChildren"),f.isDefined(k)&&(b=k));d=d||l.running||l.last&&!l.last.isClassBased}while(c=c.parent());return!g||!b&&d}u=Q;y.data("$$ngAnimateState",r);var $=P.$watch(function(){return Z.totalPendingRequests},function(a,c){0===a&&($(),P.$$postDigest(function(){P.$$postDigest(function(){r.running=!1})}))}),K=0,V=C.classNameFilter(),x=V?function(a){return V.test(a)}:function(){return!0};return{animate:function(a,c,b,d,h){d=d||"ng-inline-animate";
h=I(h)||{};h.from=b?c:null;h.to=b?b:c;return D(function(b){return G("animate",d,f.element(g(a)),null,null,t,h,b)})},enter:function(a,c,b,d){d=I(d);a=f.element(a);c=c&&f.element(c);b=b&&f.element(b);R(a,!0);O.enter(a,c,b);return D(function(h){return G("enter","ng-enter",f.element(g(a)),c,b,t,d,h)})},leave:function(a,c){c=I(c);a=f.element(a);q(a);R(a,!0);return D(function(b){return G("leave","ng-leave",f.element(g(a)),null,null,function(){O.leave(a)},c,b)})},move:function(a,c,b,d){d=I(d);a=f.element(a);
c=c&&f.element(c);b=b&&f.element(b);q(a);R(a,!0);O.move(a,c,b);return D(function(h){return G("move","ng-move",f.element(g(a)),c,b,t,d,h)})},addClass:function(a,c,b){return this.setClass(a,c,[],b)},removeClass:function(a,c,b){return this.setClass(a,[],c,b)},setClass:function(a,c,b,d){d=I(d);a=f.element(a);a=f.element(g(a));if(R(a))return O.$$setClassImmediately(a,c,b,d);var h,k=a.data("$$animateClasses"),l=!!k;k||(k={classes:{}});h=k.classes;c=aa(c)?c:c.split(" ");n(c,function(a){a&&a.length&&(h[a]=
!0)});b=aa(b)?b:b.split(" ");n(b,function(a){a&&a.length&&(h[a]=!1)});if(l)return d&&k.options&&(k.options=f.extend(k.options||{},d)),k.promise;a.data("$$animateClasses",k={classes:h,options:d});return k.promise=D(function(e){var l=a.parent(),b=g(a),c=b.parentNode;if(!c||c.$$NG_REMOVED||b.$$NG_REMOVED)e();else{b=a.data("$$animateClasses");a.removeData("$$animateClasses");var c=a.data("$$ngAnimateState")||{},d=S(a,b,c.active);return d?G("setClass",d,a,l,null,function(){d[0]&&O.$$addClassImmediately(a,
d[0]);d[1]&&O.$$removeClassImmediately(a,d[1])},b.options,e):e()}})},cancel:function(a){a.$$cancelFn()},enabled:function(a,c){switch(arguments.length){case 2:if(a)B(c);else{var b=c.data("$$ngAnimateState")||{};b.disabled=!0;c.data("$$ngAnimateState",b)}break;case 1:r.disabled=!a;break;default:a=!r.disabled}return!!a}}}]);C.register("",["$window","$sniffer","$timeout","$$animateReflow",function(r,C,M,Y){function y(){b||(b=Y(function(){c=[];b=null;x={}}))}function H(a,e){b&&b();c.push(e);b=Y(function(){n(c,
function(a){a()});c=[];b=null;x={}})}function P(a,e){var b=g(a);a=f.element(b);k.push(a);b=Date.now()+e;b<=h||(M.cancel(d),h=b,d=M(function(){X(k);k=[]},e,!1))}function X(a){n(a,function(a){(a=a.data("$$ngAnimateCSS3Data"))&&n(a.closeAnimationFns,function(a){a()})})}function Z(a,e){var b=e?x[e]:null;if(!b){var c=0,d=0,f=0,g=0;n(a,function(a){if(1==a.nodeType){a=r.getComputedStyle(a)||{};c=Math.max(Q(a[z+"Duration"]),c);d=Math.max(Q(a[z+"Delay"]),d);g=Math.max(Q(a[K+"Delay"]),g);var e=Q(a[K+"Duration"]);
0<e&&(e*=parseInt(a[K+"IterationCount"],10)||1);f=Math.max(e,f)}});b={total:0,transitionDelay:d,transitionDuration:c,animationDelay:g,animationDuration:f};e&&(x[e]=b)}return b}function Q(a){var e=0;a=ea(a)?a.split(/\s*,\s*/):[];n(a,function(a){e=Math.max(parseFloat(a)||0,e)});return e}function R(b,e,c,d){b=0<=["ng-enter","ng-leave","ng-move"].indexOf(c);var f,p=e.parent(),h=p.data("$$ngAnimateKey");h||(p.data("$$ngAnimateKey",++a),h=a);f=h+"-"+g(e).getAttribute("class");var p=f+" "+c,h=x[p]?++x[p].total:
0,m={};if(0<h){var n=c+"-stagger",m=f+" "+n;(f=!x[m])&&u.addClass(e,n);m=Z(e,m);f&&u.removeClass(e,n)}u.addClass(e,c);var n=e.data("$$ngAnimateCSS3Data")||{},k=Z(e,p);f=k.transitionDuration;k=k.animationDuration;if(b&&0===f&&0===k)return u.removeClass(e,c),!1;c=d||b&&0<f;b=0<k&&0<m.animationDelay&&0===m.animationDuration;e.data("$$ngAnimateCSS3Data",{stagger:m,cacheKey:p,running:n.running||0,itemIndex:h,blockTransition:c,closeAnimationFns:n.closeAnimationFns||[]});p=g(e);c&&(I(p,!0),d&&e.css(d));
b&&(p.style[K+"PlayState"]="paused");return!0}function D(a,e,b,c,d){function f(){e.off(D,h);u.removeClass(e,k);u.removeClass(e,t);z&&M.cancel(z);G(e,b);var a=g(e),c;for(c in s)a.style.removeProperty(s[c])}function h(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||b.timeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-H,0)>=C&&b>=x&&c()}var m=g(e);a=e.data("$$ngAnimateCSS3Data");if(-1!=m.getAttribute("class").indexOf(b)&&a){var k="",t="";n(b.split(" "),function(a,
b){var e=(0<b?" ":"")+a;k+=e+"-active";t+=e+"-pending"});var s=[],q=a.itemIndex,v=a.stagger,r=0;if(0<q){r=0;0<v.transitionDelay&&0===v.transitionDuration&&(r=v.transitionDelay*q);var y=0;0<v.animationDelay&&0===v.animationDuration&&(y=v.animationDelay*q,s.push(B+"animation-play-state"));r=Math.round(100*Math.max(r,y))/100}r||(u.addClass(e,k),a.blockTransition&&I(m,!1));var F=Z(e,a.cacheKey+" "+k),x=Math.max(F.transitionDuration,F.animationDuration);if(0===x)u.removeClass(e,k),G(e,b),c();else{!r&&
d&&(F.transitionDuration||(e.css("transition",F.animationDuration+"s linear all"),s.push("transition")),e.css(d));var q=Math.max(F.transitionDelay,F.animationDelay),C=1E3*q;0<s.length&&(v=m.getAttribute("style")||"",";"!==v.charAt(v.length-1)&&(v+=";"),m.setAttribute("style",v+" "));var H=Date.now(),D=V+" "+$,q=1E3*(r+1.5*(q+x)),z;0<r&&(u.addClass(e,t),z=M(function(){z=null;0<F.transitionDuration&&I(m,!1);0<F.animationDuration&&(m.style[K+"PlayState"]="");u.addClass(e,k);u.removeClass(e,t);d&&(0===
F.transitionDuration&&e.css("transition",F.animationDuration+"s linear all"),e.css(d),s.push("transition"))},1E3*r,!1));e.on(D,h);a.closeAnimationFns.push(function(){f();c()});a.running++;P(e,q);return f}}else c()}function I(a,b){a.style[z+"Property"]=b?"none":""}function S(a,b,c,d){if(R(a,b,c,d))return function(a){a&&G(b,c)}}function T(a,b,c,d,f){if(b.data("$$ngAnimateCSS3Data"))return D(a,b,c,d,f);G(b,c);d()}function U(a,b,c,d,f){var g=S(a,b,c,f.from);if(g){var h=g;H(b,function(){h=T(a,b,c,d,f.to)});
return function(a){(h||t)(a)}}y();d()}function G(a,b){u.removeClass(a,b);var c=a.data("$$ngAnimateCSS3Data");c&&(c.running&&c.running--,c.running&&0!==c.running||a.removeData("$$ngAnimateCSS3Data"))}function q(a,b){var c="";a=aa(a)?a:a.split(/\s+/);n(a,function(a,d){a&&0<a.length&&(c+=(0<d?" ":"")+a+b)});return c}var B="",z,$,K,V;N.ontransitionend===W&&N.onwebkittransitionend!==W?(B="-webkit-",z="WebkitTransition",$="webkitTransitionEnd transitionend"):(z="transition",$="transitionend");N.onanimationend===
W&&N.onwebkitanimationend!==W?(B="-webkit-",K="WebkitAnimation",V="webkitAnimationEnd animationend"):(K="animation",V="animationend");var x={},a=0,c=[],b,d=null,h=0,k=[];return{animate:function(a,b,c,d,f,g){g=g||{};g.from=c;g.to=d;return U("animate",a,b,f,g)},enter:function(a,b,c){c=c||{};return U("enter",a,"ng-enter",b,c)},leave:function(a,b,c){c=c||{};return U("leave",a,"ng-leave",b,c)},move:function(a,b,c){c=c||{};return U("move",a,"ng-move",b,c)},beforeSetClass:function(a,b,c,d,f){f=f||{};b=q(c,
"-remove")+" "+q(b,"-add");if(f=S("setClass",a,b,f.from))return H(a,d),f;y();d()},beforeAddClass:function(a,b,c,d){d=d||{};if(b=S("addClass",a,q(b,"-add"),d.from))return H(a,c),b;y();c()},beforeRemoveClass:function(a,b,c,d){d=d||{};if(b=S("removeClass",a,q(b,"-remove"),d.from))return H(a,c),b;y();c()},setClass:function(a,b,c,d,f){f=f||{};c=q(c,"-remove");b=q(b,"-add");return T("setClass",a,c+" "+b,d,f.to)},addClass:function(a,b,c,d){d=d||{};return T("addClass",a,q(b,"-add"),c,d.to)},removeClass:function(a,
b,c,d){d=d||{};return T("removeClass",a,q(b,"-remove"),c,d.to)}}}])}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map

/*!
 * ionic.bundle.js is a concatenation of:
 * ionic.js, angular.js, angular-animate.js,
 * angular-sanitize.js, angular-ui-router.js,
 * and ionic-angular.js
 */

/*
 AngularJS v1.3.6
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n,h,p){'use strict';function E(a){var d=[];s(d,h.noop).chars(a);return d.join("")}function g(a){var d={};a=a.split(",");var c;for(c=0;c<a.length;c++)d[a[c]]=!0;return d}function F(a,d){function c(a,b,c,l){b=h.lowercase(b);if(t[b])for(;f.last()&&u[f.last()];)e("",f.last());v[b]&&f.last()==b&&e("",b);(l=w[b]||!!l)||f.push(b);var m={};c.replace(G,function(a,b,d,c,e){m[b]=r(d||c||e||"")});d.start&&d.start(b,m,l)}function e(a,b){var c=0,e;if(b=h.lowercase(b))for(c=f.length-1;0<=c&&f[c]!=b;c--);
if(0<=c){for(e=f.length-1;e>=c;e--)d.end&&d.end(f[e]);f.length=c}}"string"!==typeof a&&(a=null===a||"undefined"===typeof a?"":""+a);var b,k,f=[],m=a,l;for(f.last=function(){return f[f.length-1]};a;){l="";k=!0;if(f.last()&&x[f.last()])a=a.replace(new RegExp("(.*)<\\s*\\/\\s*"+f.last()+"[^>]*>","i"),function(a,b){b=b.replace(H,"$1").replace(I,"$1");d.chars&&d.chars(r(b));return""}),e("",f.last());else{if(0===a.indexOf("\x3c!--"))b=a.indexOf("--",4),0<=b&&a.lastIndexOf("--\x3e",b)===b&&(d.comment&&d.comment(a.substring(4,
b)),a=a.substring(b+3),k=!1);else if(y.test(a)){if(b=a.match(y))a=a.replace(b[0],""),k=!1}else if(J.test(a)){if(b=a.match(z))a=a.substring(b[0].length),b[0].replace(z,e),k=!1}else K.test(a)&&((b=a.match(A))?(b[4]&&(a=a.substring(b[0].length),b[0].replace(A,c)),k=!1):(l+="<",a=a.substring(1)));k&&(b=a.indexOf("<"),l+=0>b?a:a.substring(0,b),a=0>b?"":a.substring(b),d.chars&&d.chars(r(l)))}if(a==m)throw L("badparse",a);m=a}e()}function r(a){if(!a)return"";var d=M.exec(a);a=d[1];var c=d[3];if(d=d[2])q.innerHTML=
d.replace(/</g,"&lt;"),d="textContent"in q?q.textContent:q.innerText;return a+d+c}function B(a){return a.replace(/&/g,"&amp;").replace(N,function(a){var c=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(c-55296)+(a-56320)+65536)+";"}).replace(O,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(a,d){var c=!1,e=h.bind(a,a.push);return{start:function(a,k,f){a=h.lowercase(a);!c&&x[a]&&(c=a);c||!0!==C[a]||(e("<"),e(a),h.forEach(k,function(c,f){var k=
h.lowercase(f),g="img"===a&&"src"===k||"background"===k;!0!==P[k]||!0===D[k]&&!d(c,g)||(e(" "),e(f),e('="'),e(B(c)),e('"'))}),e(f?"/>":">"))},end:function(a){a=h.lowercase(a);c||!0!==C[a]||(e("</"),e(a),e(">"));a==c&&(c=!1)},chars:function(a){c||e(B(a))}}}var L=h.$$minErr("$sanitize"),A=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,z=/^<\/\s*([\w:-]+)[^>]*>/,G=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,K=/^</,
J=/^<\//,H=/\x3c!--(.*?)--\x3e/g,y=/<!DOCTYPE([^>]*?)>/i,I=/<!\[CDATA\[(.*?)]]\x3e/g,N=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,O=/([^\#-~| |!])/g,w=g("area,br,col,hr,img,wbr");n=g("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");p=g("rp,rt");var v=h.extend({},p,n),t=h.extend({},n,g("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),u=h.extend({},p,g("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
n=g("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use");var x=g("script,style"),C=h.extend({},w,t,u,v,n),D=g("background,cite,href,longdesc,src,usemap,xlink:href");n=g("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width");
p=g("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan");
var P=h.extend({},D,p,n),q=document.createElement("pre"),M=/^(\s*)([\s\S]*?)(\s*)$/;h.module("ngSanitize",[]).provider("$sanitize",function(){this.$get=["$$sanitizeUri",function(a){return function(d){var c=[];F(d,s(c,function(c,b){return!/^unsafe/.test(a(c,b))}));return c.join("")}}]});h.module("ngSanitize").filter("linky",["$sanitize",function(a){var d=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/,c=/^mailto:/;return function(e,b){function k(a){a&&g.push(E(a))}
function f(a,c){g.push("<a ");h.isDefined(b)&&g.push('target="',b,'" ');g.push('href="',a.replace(/"/g,"&quot;"),'">');k(c);g.push("</a>")}if(!e)return e;for(var m,l=e,g=[],n,p;m=l.match(d);)n=m[0],m[2]||m[4]||(n=(m[3]?"http://":"mailto:")+n),p=m.index,k(l.substr(0,p)),f(n,m[0].replace(c,"")),l=l.substring(p+m[0].length);k(l);return a(g.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map

/*!
 * ionic.bundle.js is a concatenation of:
 * ionic.js, angular.js, angular-animate.js,
 * angular-sanitize.js, angular-ui-router.js,
 * and ionic-angular.js
 */

/**
 * State-based routing for AngularJS
 * @version v0.2.13
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return M(new(M(function(){},{prototype:a})),b)}function e(a){return L(arguments,function(b){b!==a&&L(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a){if(Object.keys)return Object.keys(a);var c=[];return b.forEach(a,function(a,b){c.push(b)}),c}function h(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function i(a,b,c,d){var e,i=f(c,d),j={},k=[];for(var l in i)if(i[l].params&&(e=g(i[l].params),e.length))for(var m in e)h(k,e[m])>=0||(k.push(e[m]),j[e[m]]=a[e[m]]);return M({},j,b)}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return L(a,function(a){c[a]=b[a]}),c}function l(a){var b={},c=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var d in a)-1==h(c,d)&&(b[d]=a[d]);return b}function m(a,b){var c=K(a),d=c?[]:{};return L(a,function(a,e){b(a,e)&&(d[c?d.length:e]=a)}),d}function n(a,b){var c=K(a)?[]:{};return L(a,function(a,d){c[d]=b(a,d)}),c}function o(a,b){var d=1,f=2,i={},j=[],k=i,m=M(a.when(i),{$$promises:i,$$values:i});this.study=function(i){function n(a,c){if(s[c]!==f){if(r.push(c),s[c]===d)throw r.splice(0,h(r,c)),new Error("Cyclic dependency: "+r.join(" -> "));if(s[c]=d,I(a))q.push(c,[function(){return b.get(a)}],j);else{var e=b.annotate(a);L(e,function(a){a!==c&&i.hasOwnProperty(a)&&n(i[a],a)}),q.push(c,a,e)}r.pop(),s[c]=f}}function o(a){return J(a)&&a.then&&a.$$promises}if(!J(i))throw new Error("'invocables' must be an object");var p=g(i||{}),q=[],r=[],s={};return L(i,n),i=r=s=null,function(d,f,g){function h(){--u||(v||e(t,f.$$values),r.$$values=t,r.$$promises=r.$$promises||!0,delete r.$$inheritedValues,n.resolve(t))}function i(a){r.$$failure=a,n.reject(a)}function j(c,e,f){function j(a){l.reject(a),i(a)}function k(){if(!G(r.$$failure))try{l.resolve(b.invoke(e,g,t)),l.promise.then(function(a){t[c]=a,h()},j)}catch(a){j(a)}}var l=a.defer(),m=0;L(f,function(a){s.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,s[a].then(function(b){t[a]=b,--m||k()},j))}),m||k(),s[c]=l.promise}if(o(d)&&g===c&&(g=f,f=d,d=null),d){if(!J(d))throw new Error("'locals' must be an object")}else d=k;if(f){if(!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=m;var n=a.defer(),r=n.promise,s=r.$$promises={},t=M({},d),u=1+q.length/3,v=!1;if(G(f.$$failure))return i(f.$$failure),r;f.$$inheritedValues&&e(t,l(f.$$inheritedValues,p)),M(s,f.$$promises),f.$$values?(v=e(t,l(f.$$values,p)),r.$$inheritedValues=l(f.$$values,p),h()):(f.$$inheritedValues&&(r.$$inheritedValues=l(f.$$inheritedValues,p)),f.then(h,i));for(var w=0,x=q.length;x>w;w+=3)d.hasOwnProperty(q[w])?h():j(q[w],q[w+1],q[w+2]);return r}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function p(a,b,c){this.fromConfig=function(a,b,c){return G(a.template)?this.fromString(a.template,b):G(a.templateUrl)?this.fromUrl(a.templateUrl,b):G(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return H(a)?a(b):a},this.fromUrl=function(c,d){return H(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b,headers:{Accept:"text/html"}}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function q(a,b,e){function f(b,c,d,e){if(q.push(b),o[b])return o[b];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(p[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");return p[b]=new O.Param(b,c,d,e),p[b]}function g(a,b,c){var d=["",""],e=a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!b)return e;switch(c){case!1:d=["(",")"];break;case!0:d=["?(",")?"];break;default:d=["("+c+"|",")?"]}return e+d[0]+b+d[1]}function h(c,e){var f,g,h,i,j;return f=c[2]||c[3],j=b.params[f],h=a.substring(m,c.index),g=e?c[4]:c[4]||("*"==c[1]?".*":null),i=O.type(g||"string")||d(O.type("string"),{pattern:new RegExp(g)}),{id:f,regexp:g,segment:h,type:i,cfg:j}}b=M({params:{}},J(b)?b:{});var i,j=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,k=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,l="^",m=0,n=this.segments=[],o=e?e.params:{},p=this.params=e?e.params.$$new():new O.ParamSet,q=[];this.source=a;for(var r,s,t;(i=j.exec(a))&&(r=h(i,!1),!(r.segment.indexOf("?")>=0));)s=f(r.id,r.type,r.cfg,"path"),l+=g(r.segment,s.type.pattern.source,s.squash),n.push(r.segment),m=j.lastIndex;t=a.substring(m);var u=t.indexOf("?");if(u>=0){var v=this.sourceSearch=t.substring(u);if(t=t.substring(0,u),this.sourcePath=a.substring(0,m+u),v.length>0)for(m=0;i=k.exec(v);)r=h(i,!0),s=f(r.id,r.type,r.cfg,"search"),m=j.lastIndex}else this.sourcePath=a,this.sourceSearch="";l+=g(t)+(b.strict===!1?"/?":"")+"$",n.push(t),this.regexp=new RegExp(l,b.caseInsensitive?"i":c),this.prefix=n[0],this.$$paramNames=q}function r(a){M(this,a)}function s(){function a(a){return null!=a?a.toString().replace(/\//g,"%2F"):a}function e(a){return null!=a?a.toString().replace(/%2F/g,"/"):a}function f(a){return this.pattern.test(a)}function i(){return{strict:t,caseInsensitive:p}}function j(a){return H(a)||K(a)&&H(a[a.length-1])}function k(){for(;x.length;){var a=x.shift();if(a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");b.extend(v[a.name],o.invoke(a.def))}}function l(a){M(this,a||{})}O=this;var o,p=!1,t=!0,u=!1,v={},w=!0,x=[],y={string:{encode:a,decode:e,is:f,pattern:/[^/]*/},"int":{encode:a,decode:function(a){return parseInt(a,10)},is:function(a){return G(a)&&this.decode(a.toString())===a},pattern:/\d+/},bool:{encode:function(a){return a?1:0},decode:function(a){return 0!==parseInt(a,10)},is:function(a){return a===!0||a===!1},pattern:/0|1/},date:{encode:function(a){return this.is(a)?[a.getFullYear(),("0"+(a.getMonth()+1)).slice(-2),("0"+a.getDate()).slice(-2)].join("-"):c},decode:function(a){if(this.is(a))return a;var b=this.capture.exec(a);return b?new Date(b[1],b[2]-1,b[3]):c},is:function(a){return a instanceof Date&&!isNaN(a.valueOf())},equals:function(a,b){return this.is(a)&&this.is(b)&&a.toISOString()===b.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:b.toJson,decode:b.fromJson,is:b.isObject,equals:b.equals,pattern:/[^/]*/},any:{encode:b.identity,decode:b.identity,is:b.identity,equals:b.equals,pattern:/.*/}};s.$$getDefaultValue=function(a){if(!j(a.value))return a.value;if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(a.value)},this.caseInsensitive=function(a){return G(a)&&(p=a),p},this.strictMode=function(a){return G(a)&&(t=a),t},this.defaultSquashPolicy=function(a){if(!G(a))return u;if(a!==!0&&a!==!1&&!I(a))throw new Error("Invalid squash policy: "+a+". Valid policies: false, true, arbitrary-string");return u=a,a},this.compile=function(a,b){return new q(a,M(i(),b))},this.isMatcher=function(a){if(!J(a))return!1;var b=!0;return L(q.prototype,function(c,d){H(c)&&(b=b&&G(a[d])&&H(a[d]))}),b},this.type=function(a,b,c){if(!G(b))return v[a];if(v.hasOwnProperty(a))throw new Error("A type named '"+a+"' has already been defined.");return v[a]=new r(M({name:a},b)),c&&(x.push({name:a,def:c}),w||k()),this},L(y,function(a,b){v[b]=new r(M({name:b},a))}),v=d(v,{}),this.$get=["$injector",function(a){return o=a,w=!1,k(),L(y,function(a,b){v[b]||(v[b]=new r(a))}),this}],this.Param=function(a,b,d,e){function f(a){var b=J(a)?g(a):[],c=-1===h(b,"value")&&-1===h(b,"type")&&-1===h(b,"squash")&&-1===h(b,"array");return c&&(a={value:a}),a.$$fn=j(a.value)?a.value:function(){return a.value},a}function i(b,c,d){if(b.type&&c)throw new Error("Param '"+a+"' has two type configurations.");return c?c:b.type?b.type instanceof r?b.type:new r(b.type):"config"===d?v.any:v.string}function k(){var b={array:"search"===e?"auto":!1},c=a.match(/\[\]$/)?{array:!0}:{};return M(b,c,d).array}function l(a,b){var c=a.squash;if(!b||c===!1)return!1;if(!G(c)||null==c)return u;if(c===!0||I(c))return c;throw new Error("Invalid squash policy: '"+c+"'. Valid policies: false, true, or arbitrary string")}function p(a,b,d,e){var f,g,i=[{from:"",to:d||b?c:""},{from:null,to:d||b?c:""}];return f=K(a.replace)?a.replace:[],I(e)&&f.push({from:e,to:c}),g=n(f,function(a){return a.from}),m(i,function(a){return-1===h(g,a.from)}).concat(f)}function q(){if(!o)throw new Error("Injectable functions cannot be called at configuration time");return o.invoke(d.$$fn)}function s(a){function b(a){return function(b){return b.from===a}}function c(a){var c=n(m(w.replace,b(a)),function(a){return a.to});return c.length?c[0]:a}return a=c(a),G(a)?w.type.decode(a):q()}function t(){return"{Param:"+a+" "+b+" squash: '"+z+"' optional: "+y+"}"}var w=this;d=f(d),b=i(d,b,e);var x=k();b=x?b.$asArray(x,"search"===e):b,"string"!==b.name||x||"path"!==e||d.value!==c||(d.value="");var y=d.value!==c,z=l(d,y),A=p(d,x,y,z);M(this,{id:a,type:b,location:e,array:x,squash:z,replace:A,isOptional:y,value:s,dynamic:c,config:d,toString:t})},l.prototype={$$new:function(){return d(this,M(new l,{$$parent:this}))},$$keys:function(){for(var a=[],b=[],c=this,d=g(l.prototype);c;)b.push(c),c=c.$$parent;return b.reverse(),L(b,function(b){L(g(b),function(b){-1===h(a,b)&&-1===h(d,b)&&a.push(b)})}),a},$$values:function(a){var b={},c=this;return L(c.$$keys(),function(d){b[d]=c[d].value(a&&a[d])}),b},$$equals:function(a,b){var c=!0,d=this;return L(d.$$keys(),function(e){var f=a&&a[e],g=b&&b[e];d[e].type.equals(f,g)||(c=!1)}),c},$$validates:function(a){var b,c,d,e=!0,f=this;return L(this.$$keys(),function(g){d=f[g],c=a[g],b=!c&&d.isOptional,e=e&&(b||!!d.type.is(c))}),e},$$parent:c},this.ParamSet=l}function t(a,d){function e(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function f(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function g(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return G(d)?d:!0}function h(d,e,f,g){function h(a,b,c){return"/"===p?a:b?p.slice(0,-1)+a:c?p.slice(1)+a:a}function m(a){function b(a){var b=a(f,d);return b?(I(b)&&d.replace().url(b),!0):!1}if(!a||!a.defaultPrevented){var e=o&&d.url()===o;if(o=c,e)return!0;var g,h=j.length;for(g=0;h>g;g++)if(b(j[g]))return;k&&b(k)}}function n(){return i=i||e.$on("$locationChangeSuccess",m)}var o,p=g.baseHref(),q=d.url();return l||n(),{sync:function(){m()},listen:function(){return n()},update:function(a){return a?void(q=d.url()):void(d.url()!==q&&(d.url(q),d.replace()))},push:function(a,b,e){d.url(a.format(b||{})),o=e&&e.$$avoidResync?d.url():c,e&&e.replace&&d.replace()},href:function(c,e,f){if(!c.validates(e))return null;var g=a.html5Mode();b.isObject(g)&&(g=g.enabled);var i=c.format(e);if(f=f||{},g||null===i||(i="#"+a.hashPrefix()+i),i=h(i,g,f.absolute),!f.absolute||!i)return i;var j=!g&&i?"/":"",k=d.port();return k=80===k||443===k?"":":"+k,[d.protocol(),"://",d.host(),k,j,i].join("")}}}var i,j=[],k=null,l=!1;this.rule=function(a){if(!H(a))throw new Error("'rule' must be a function");return j.push(a),this},this.otherwise=function(a){if(I(a)){var b=a;a=function(){return b}}else if(!H(a))throw new Error("'rule' must be a function");return k=a,this},this.when=function(a,b){var c,h=I(b);if(I(a)&&(a=d.compile(a)),!h&&!H(b)&&!K(b))throw new Error("invalid 'handler' in when()");var i={matcher:function(a,b){return h&&(c=d.compile(b),b=["$match",function(a){return c.format(a)}]),M(function(c,d){return g(c,b,a.exec(d.path(),d.search()))},{prefix:I(a.prefix)?a.prefix:""})},regex:function(a,b){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(c=b,b=["$match",function(a){return f(c,a)}]),M(function(c,d){return g(c,b,a.exec(d.path()))},{prefix:e(a)})}},j={matcher:d.isMatcher(a),regex:a instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](a,b));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(a){a===c&&(a=!0),l=a},this.$get=h,h.$inject=["$location","$rootScope","$injector","$browser"]}function u(a,e){function f(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){if(!a)return c;var d=I(a),e=d?a:a.name,g=f(e);if(g){if(!b)throw new Error("No reference point given for path '"+e+"'");b=l(b);for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var m=y[e];return!m||!d&&(d||m!==a&&m.self!==a)?c:m}function m(a,b){z[a]||(z[a]=[]),z[a].push(b)}function o(a){for(var b=z[a]||[];b.length;)p(b.shift())}function p(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!I(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(y.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):I(b.parent)?b.parent:J(b.parent)&&I(b.parent.name)?b.parent.name:"";if(e&&!y[e])return m(e,b.self);for(var f in B)H(B[f])&&(b[f]=B[f](b,B.$delegates[f]));return y[c]=b,!b[A]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){x.$current.navigable==b&&j(a,c)||x.transitionTo(b,a,{inherit:!0,location:!1})}]),o(c),b}function q(a){return a.indexOf("*")>-1}function r(a){var b=a.split("."),c=x.$current.name.split(".");if("**"===b[0]&&(c=c.slice(h(c,b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(h(c,b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function s(a,b){return I(a)&&!G(b)?B[a]:H(b)&&I(a)?(B[a]&&!B.$delegates[a]&&(B.$delegates[a]=B[a]),B[a]=b,this):this}function t(a,b){return J(a)?b=a:b.name=a,p(b),this}function u(a,e,f,h,m,o,p){function s(b,c,d,f){var g=a.$broadcast("$stateNotFound",b,c,d);if(g.defaultPrevented)return p.update(),B;if(!g.retry)return null;if(f.$retry)return p.update(),C;var h=x.transition=e.when(g.retry);return h.then(function(){return h!==x.transition?u:(b.options.$retry=!0,x.transitionTo(b.to,b.toParams,b.options))},function(){return B}),p.update(),h}function t(a,c,d,g,i,j){var l=d?c:k(a.params.$$keys(),c),n={$stateParams:l};i.resolve=m.resolve(a.resolve,n,i.resolve,a);var o=[i.resolve.then(function(a){i.globals=a})];return g&&o.push(g),L(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return f.load(d,{view:c,locals:n,params:l,notify:j.notify})||""}],o.push(m.resolve(e,n,i.resolve,a).then(function(f){if(H(c.controllerProvider)||K(c.controllerProvider)){var g=b.extend({},e,n);f.$$controller=h.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,i[d]=f}))}),e.all(o).then(function(){return i})}var u=e.reject(new Error("transition superseded")),z=e.reject(new Error("transition prevented")),B=e.reject(new Error("transition aborted")),C=e.reject(new Error("transition failed"));return w.locals={resolve:null,globals:{$stateParams:{}}},x={params:{},current:w.self,$current:w,transition:null},x.reload=function(){return x.transitionTo(x.current,o,{reload:!0,inherit:!1,notify:!0})},x.go=function(a,b,c){return x.transitionTo(a,b,M({inherit:!0,relative:x.$current},c))},x.transitionTo=function(b,c,f){c=c||{},f=M({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,j=x.$current,m=x.params,n=j.path,q=l(b,f.relative);if(!G(q)){var r={to:b,toParams:c,options:f},y=s(r,j.self,m,f);if(y)return y;if(b=r.to,c=r.toParams,f=r.options,q=l(b,f.relative),!G(q)){if(!f.relative)throw new Error("No such state '"+b+"'");throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'")}}if(q[A])throw new Error("Cannot transition to abstract state '"+b+"'");if(f.inherit&&(c=i(o,c||{},x.$current,q)),!q.params.$$validates(c))return C;c=q.params.$$values(c),b=q;var B=b.path,D=0,E=B[D],F=w.locals,H=[];if(!f.reload)for(;E&&E===n[D]&&E.ownParams.$$equals(c,m);)F=H[D]=E.locals,D++,E=B[D];if(v(b,j,F,f))return b.self.reloadOnSearch!==!1&&p.update(),x.transition=null,e.when(x.current);if(c=k(b.params.$$keys(),c||{}),f.notify&&a.$broadcast("$stateChangeStart",b.self,c,j.self,m).defaultPrevented)return p.update(),z;for(var I=e.when(F),J=D;J<B.length;J++,E=B[J])F=H[J]=d(F),I=t(E,c,E===b,I,F,f);var K=x.transition=I.then(function(){var d,e,g;if(x.transition!==K)return u;for(d=n.length-1;d>=D;d--)g=n[d],g.self.onExit&&h.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=D;d<B.length;d++)e=B[d],e.locals=H[d],e.self.onEnter&&h.invoke(e.self.onEnter,e.self,e.locals.globals);return x.transition!==K?u:(x.$current=b,x.current=b.self,x.params=c,N(x.params,o),x.transition=null,f.location&&b.navigable&&p.push(b.navigable.url,b.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===f.location}),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,j.self,m),p.update(!0),x.current)},function(d){return x.transition!==K?u:(x.transition=null,g=a.$broadcast("$stateChangeError",b.self,c,j.self,m,d),g.defaultPrevented||p.update(),e.reject(d))});return K},x.is=function(a,b,d){d=M({relative:x.$current},d||{});var e=l(a,d.relative);return G(e)?x.$current!==e?!1:b?j(e.params.$$values(b),o):!0:c},x.includes=function(a,b,d){if(d=M({relative:x.$current},d||{}),I(a)&&q(a)){if(!r(a))return!1;a=x.$current.name}var e=l(a,d.relative);return G(e)?G(x.$current.includes[e.name])?b?j(e.params.$$values(b),o,g(b)):!0:!1:c},x.href=function(a,b,d){d=M({lossy:!0,inherit:!0,absolute:!1,relative:x.$current},d||{});var e=l(a,d.relative);if(!G(e))return null;d.inherit&&(b=i(o,b||{},x.$current,e));var f=e&&d.lossy?e.navigable:e;return f&&f.url!==c&&null!==f.url?p.href(f.url,k(e.params.$$keys(),b||{}),{absolute:d.absolute}):null},x.get=function(a,b){if(0===arguments.length)return n(g(y),function(a){return y[a].self});var c=l(a,b||x.$current);return c&&c.self?c.self:null},x}function v(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var w,x,y={},z={},A="abstract",B={parent:function(a){if(G(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):w},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=M({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url,c={params:a.params||{}};if(I(b))return"^"==b.charAt(0)?e.compile(b.substring(1),c):(a.parent.navigable||w).url.concat(b,c);if(!b||e.isMatcher(b))return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},ownParams:function(a){var b=a.url&&a.url.params||new O.ParamSet;return L(a.params||{},function(a,c){b[c]||(b[c]=new O.Param(c,null,a,"config"))}),b},params:function(a){return a.parent&&a.parent.params?M(a.parent.params.$$new(),a.ownParams):new O.ParamSet},views:function(a){var b={};return L(G(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?M({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};w=p({name:"",url:"^",views:null,"abstract":!0}),w.navigable=null,this.decorator=s,this.state=t,this.$get=u,u.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function v(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=M(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function w(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function x(a,c,d,e){function f(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function g(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(j)return{enter:function(a,b,c){var d=j.enter(a,null,b,c);d&&d.then&&d.then(c)},leave:function(a,b){var c=j.leave(a,b);c&&c.then&&c.then(b)}};if(i){var d=i&&i(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var h=f(),i=h("$animator"),j=h("$animate"),k={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,f,h){return function(c,f,i){function j(){l&&(l.remove(),l=null),n&&(n.$destroy(),n=null),m&&(r.leave(m,function(){l=null}),l=m,m=null)}function k(g){var k,l=z(c,i,f,e),s=l&&a.$current&&a.$current.locals[l];if(g||s!==o){k=c.$new(),o=a.$current.locals[l];var t=h(k,function(a){r.enter(a,f,function(){n&&n.$emit("$viewContentAnimationEnded"),(b.isDefined(q)&&!q||c.$eval(q))&&d(a)}),j()});m=t,n=k,n.$emit("$viewContentLoaded"),n.$eval(p)}}var l,m,n,o,p=i.onload||"",q=i.autoscroll,r=g(i,c);c.$on("$stateChangeSuccess",function(){k(!1)}),c.$on("$viewContentLoading",function(){k(!1)}),k(!0)}}};return k}function y(a,b,c,d){return{restrict:"ECA",priority:-400,compile:function(e){var f=e.html();return function(e,g,h){var i=c.$current,j=z(e,h,g,d),k=i&&i.locals[j];if(k){g.data("$uiView",{name:j,state:k.$$state}),g.html(k.$template?k.$template:f);var l=a(g.contents());if(k.$$controller){k.$scope=e;var m=b(k.$$controller,k);k.$$controllerAs&&(e[k.$$controllerAs]=m),g.data("$ngControllerController",m),g.children().data("$ngControllerController",m)}l(e)}}}}}function z(a,b,c,d){var e=d(b.uiView||b.name||"")(a),f=c.inheritedData("$uiView");return e.indexOf("@")>=0?e:e+"@"+(f?f.state.name:"")}function A(a,b){var c,d=a.match(/^\s*({[^}]*})\s*$/);if(d&&(a=b+"("+d[1]+")"),c=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/),!c||4!==c.length)throw new Error("Invalid state ref '"+a+"'");return{state:c[1],paramExpr:c[3]||null}}function B(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function C(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(e,f,g,h){var i=A(g.uiSref,a.current.name),j=null,k=B(f)||a.$current,l=null,m="A"===f.prop("tagName"),n="FORM"===f[0].nodeName,o=n?"action":"href",p=!0,q={relative:k,inherit:!0},r=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in r&&(q[a]=r[a])});var s=function(c){if(c&&(j=b.copy(c)),p){l=a.href(i.state,j,q);var d=h[1]||h[0];return d&&d.$$setStateInfo(i.state,j),null===l?(p=!1,!1):void g.$set(o,l)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&s(a)},!0),j=b.copy(e.$eval(i.paramExpr))),s(),n||f.bind("click",function(b){var d=b.which||b.button;if(!(d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target"))){var e=c(function(){a.go(i.state,j,q)});b.preventDefault();var g=m&&!l?1:0;b.preventDefault=function(){g--<=0&&c.cancel(e)}}})}}}function D(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(b,d,e){function f(){g()?d.addClass(j):d.removeClass(j)}function g(){return"undefined"!=typeof e.uiSrefActiveEq?h&&a.is(h.name,i):h&&a.includes(h.name,i)}var h,i,j;j=c(e.uiSrefActiveEq||e.uiSrefActive||"",!1)(b),this.$$setStateInfo=function(b,c){h=a.get(b,B(d)),i=c,f()},b.$on("$stateChangeSuccess",f)}]}}function E(a){var b=function(b){return a.is(b)};return b.$stateful=!0,b}function F(a){var b=function(b){return a.includes(b)};return b.$stateful=!0,b}var G=b.isDefined,H=b.isFunction,I=b.isString,J=b.isObject,K=b.isArray,L=b.forEach,M=b.extend,N=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),o.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",o),p.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",p);var O;q.prototype.concat=function(a,b){var c={caseInsensitive:O.caseInsensitive(),strict:O.strictMode(),squash:O.defaultSquashPolicy()};return new q(this.sourcePath+a+this.sourceSearch,M(c,b),this)},q.prototype.toString=function(){return this.source},q.prototype.exec=function(a,b){function c(a){function b(a){return a.split("").reverse().join("")}function c(a){return a.replace(/\\-/,"-")}var d=b(a).split(/-(?!\\)/),e=n(d,b);return n(e,c).reverse()}var d=this.regexp.exec(a);if(!d)return null;b=b||{};var e,f,g,h=this.parameters(),i=h.length,j=this.segments.length-1,k={};if(j!==d.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(e=0;j>e;e++){g=h[e];var l=this.params[g],m=d[e+1];for(f=0;f<l.replace;f++)l.replace[f].from===m&&(m=l.replace[f].to);m&&l.array===!0&&(m=c(m)),k[g]=l.value(m)}for(;i>e;e++)g=h[e],k[g]=this.params[g].value(b[g]);return k},q.prototype.parameters=function(a){return G(a)?this.params[a]||null:this.$$paramNames},q.prototype.validates=function(a){return this.params.$$validates(a)},q.prototype.format=function(a){function b(a){return encodeURIComponent(a).replace(/-/g,function(a){return"%5C%"+a.charCodeAt(0).toString(16).toUpperCase()})}a=a||{};var c=this.segments,d=this.parameters(),e=this.params;if(!this.validates(a))return null;var f,g=!1,h=c.length-1,i=d.length,j=c[0];for(f=0;i>f;f++){var k=h>f,l=d[f],m=e[l],o=m.value(a[l]),p=m.isOptional&&m.type.equals(m.value(),o),q=p?m.squash:!1,r=m.type.encode(o);if(k){var s=c[f+1];if(q===!1)null!=r&&(j+=K(r)?n(r,b).join("-"):encodeURIComponent(r)),j+=s;else if(q===!0){var t=j.match(/\/$/)?/\/?(.*)/:/(.*)/;j+=s.match(t)[1]}else I(q)&&(j+=q+s)}else{if(null==r||p&&q!==!1)continue;K(r)||(r=[r]),r=n(r,encodeURIComponent).join("&"+l+"="),j+=(g?"&":"?")+(l+"="+r),g=!0}}return j},r.prototype.is=function(){return!0},r.prototype.encode=function(a){return a},r.prototype.decode=function(a){return a},r.prototype.equals=function(a,b){return a==b},r.prototype.$subPattern=function(){var a=this.pattern.toString();return a.substr(1,a.length-2)},r.prototype.pattern=/.*/,r.prototype.toString=function(){return"{Type:"+this.name+"}"},r.prototype.$asArray=function(a,b){function d(a,b){function d(a,b){return function(){return a[b].apply(a,arguments)}}function e(a){return K(a)?a:G(a)?[a]:[]}function f(a){switch(a.length){case 0:return c;case 1:return"auto"===b?a[0]:a;default:return a}}function g(a){return!a}function h(a,b){return function(c){c=e(c);var d=n(c,a);return b===!0?0===m(d,g).length:f(d)}}function i(a){return function(b,c){var d=e(b),f=e(c);if(d.length!==f.length)return!1;for(var g=0;g<d.length;g++)if(!a(d[g],f[g]))return!1;return!0}}this.encode=h(d(a,"encode")),this.decode=h(d(a,"decode")),this.is=h(d(a,"is"),!0),this.equals=i(d(a,"equals")),this.pattern=a.pattern,this.$arrayMode=b}if(!a)return this;if("auto"===a&&!b)throw new Error("'auto' array mode is for query parameters only");return new d(this,a)},b.module("ui.router.util").provider("$urlMatcherFactory",s),b.module("ui.router.util").run(["$urlMatcherFactory",function(){}]),t.$inject=["$locationProvider","$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",t),u.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",u),v.$inject=[],b.module("ui.router.state").provider("$view",v),b.module("ui.router.state").provider("$uiViewScroll",w),x.$inject=["$state","$injector","$uiViewScroll","$interpolate"],y.$inject=["$compile","$controller","$state","$interpolate"],b.module("ui.router.state").directive("uiView",x),b.module("ui.router.state").directive("uiView",y),C.$inject=["$state","$timeout"],D.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",C).directive("uiSrefActive",D).directive("uiSrefActiveEq",D),E.$inject=["$state"],F.$inject=["$state"],b.module("ui.router.state").filter("isState",E).filter("includedByState",F)}(window,window.angular);
/*!
 * ionic.bundle.js is a concatenation of:
 * ionic.js, angular.js, angular-animate.js,
 * angular-sanitize.js, angular-ui-router.js,
 * and ionic-angular.js
 */

/*!
 * Copyright 2014 Drifty Co.
 * http://drifty.com/
 *
 * Ionic, v1.0.0-beta.14
 * A powerful HTML5 mobile app framework.
 * http://ionicframework.com/
 *
 * By @maxlynch, @benjsperry, @adamdbradley <3
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

!function(){function e(e,t){return[function(){return{priority:"99",link:function(n,i,o){o.$observe(e,function(e){e||i[0].removeAttribute(t)})}}}]}function t(e){return["$ionicGesture","$parse",function(t,n){var i=e.substr(2).toLowerCase();return function(o,r,a){var s=n(a[e]),c=function(e){o.$apply(function(){s(o,{$event:e})})},l=t.on(i,c,r);o.$on("$destroy",function(){t.off(l,i,c)})}}]}function n(){return["$ionicScrollDelegate",function(e){return{restrict:"E",link:function(t,n,i){function o(t){for(var i=3,o=t.target;i--&&o;){if(o.classList.contains("button")||o.tagName.match(/input|textarea|select/i)||o.isContentEditable)return;o=o.parentNode}var r=t.gesture&&t.gesture.touches[0]||t.detail.touches[0],a=n[0].getBoundingClientRect();ionic.DomUtil.rectContains(r.pageX,r.pageY,a.left,a.top-20,a.left+a.width,a.top+a.height)&&e.scrollTop(!0)}"true"!=i.noTapScroll&&(ionic.on("tap",o,n[0]),t.$on("$destroy",function(){ionic.off("tap",o,n[0])}))}}}]}function i(e){return["$document","$timeout",function(t,n){return{restrict:"E",controller:"$ionicHeaderBar",compile:function(i){function o(t,n,i,o){e?(t.$watch(function(){return n[0].className},function(e){var n=-1===e.indexOf("ng-hide"),i=-1!==e.indexOf("bar-subheader");t.$hasHeader=n&&!i,t.$hasSubheader=n&&i}),t.$on("$destroy",function(){delete t.$hasHeader,delete t.$hasSubheader}),o.align(),t.$on("$ionicHeader.align",function(){ionic.requestAnimationFrame(o.align)})):(t.$watch(function(){return n[0].className},function(e){var n=-1===e.indexOf("ng-hide"),i=-1!==e.indexOf("bar-subfooter");t.$hasFooter=n&&!i,t.$hasSubfooter=n&&i}),t.$on("$destroy",function(){delete t.$hasFooter,delete t.$hasSubfooter}),t.$watch("$hasTabs",function(e){n.toggleClass("has-tabs",!!e)}))}return i.addClass(e?"bar bar-header":"bar bar-footer"),n(function(){e&&t[0].getElementsByClassName("tabs-top").length&&i.addClass("has-tabs-top")}),{pre:o}}}}]}function o(e){return e.clientHeight}function r(e){e.stopPropagation()}var a={method:function(e,t,n){var i=!1;return function(){return i||(i=!0,t(e)),n.apply(this,arguments)}},field:function(e,t,n,i,o){var r=!1,a=function(){return r||(r=!0,t(e)),o},s=function(n){return r||(r=!0,t(e)),o=n,n};Object.defineProperty(n,i,{get:a,set:s,enumerable:!0})}},s=angular.module("ionic",["ngAnimate","ngSanitize","ui.router"]),c=angular.extend,l=angular.forEach,u=angular.isDefined,d=(angular.isNumber,angular.isString),f=angular.element;s.factory("$ionicActionSheet",["$rootScope","$compile","$animate","$timeout","$ionicTemplateLoader","$ionicPlatform","$ionicBody",function(e,t,n,i,o,r,a){function s(o){var s=e.$new(!0);angular.extend(s,{cancel:angular.noop,destructiveButtonClicked:angular.noop,buttonClicked:angular.noop,$deregisterBackButton:angular.noop,buttons:[],cancelOnStateChange:!0},o||{});var c=s.element=t('<ion-action-sheet ng-class="cssClass" buttons="buttons"></ion-action-sheet>')(s),l=f(c[0].querySelector(".action-sheet-wrapper")),u=s.cancelOnStateChange?e.$on("$stateChangeSuccess",function(){s.cancel()}):angular.noop;return s.removeSheet=function(e){s.removed||(s.removed=!0,l.removeClass("action-sheet-up"),i(function(){a.removeClass("action-sheet-open")},400),s.$deregisterBackButton(),u(),n.removeClass(c,"active").then(function(){s.$destroy(),c.remove(),s.cancel.$scope=l=null,(e||angular.noop)()}))},s.showSheet=function(e){s.removed||(a.append(c).addClass("action-sheet-open"),n.addClass(c,"active").then(function(){s.removed||(e||angular.noop)()}),i(function(){s.removed||l.addClass("action-sheet-up")},20,!1))},s.$deregisterBackButton=r.registerBackButtonAction(function(){i(s.cancel)},b),s.cancel=function(){s.removeSheet(o.cancel)},s.buttonClicked=function(e){o.buttonClicked(e,o.buttons[e])===!0&&s.removeSheet()},s.destructiveButtonClicked=function(){o.destructiveButtonClicked()===!0&&s.removeSheet()},s.showSheet(),s.cancel.$scope=s,s.cancel}return{show:s}}]),f.prototype.addClass=function(e){var t,n,i,o,r,a;if(e&&"ng-scope"!=e&&"ng-isolate-scope"!=e)for(t=0;t<this.length;t++)if(o=this[t],o.setAttribute)if(e.indexOf(" ")<0&&o.classList.add)o.classList.add(e);else{for(a=(" "+(o.getAttribute("class")||"")+" ").replace(/[\n\t]/g," "),r=e.split(" "),n=0;n<r.length;n++)i=r[n].trim(),-1===a.indexOf(" "+i+" ")&&(a+=i+" ");o.setAttribute("class",a.trim())}return this},f.prototype.removeClass=function(e){var t,n,i,o,r;if(e)for(t=0;t<this.length;t++)if(r=this[t],r.getAttribute)if(e.indexOf(" ")<0&&r.classList.remove)r.classList.remove(e);else for(i=e.split(" "),n=0;n<i.length;n++)o=i[n],r.setAttribute("class",(" "+(r.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+o.trim()+" "," ").trim());return this},s.factory("$$ionicAttachDrag",[function(){function e(e,t,n){function i(e){h||s.onDragStart()!==!1&&(h={startX:e.gesture.center.pageX,startY:e.gesture.center.pageY,distance:s.getDistance()})}function o(e){if(h){var t=h.startX-e.gesture.center.pageX,n=h.startY-e.gesture.center.pageY,i="up"===e.gesture.direction||"down"===e.gesture.direction;if(i&&Math.abs(n)>2*Math.abs(t))return void r(e);Math.abs(t)>2*Math.abs(n)&&(f=!0);var o=a(e.gesture.center.pageX);s.onDrag(o)}}function r(e){if(h){var t=a(e.gesture.center.pageX);n.onDragEnd(t,e.gesture.velocityX),h=null}}function a(e){var t=h.startX-e,n=t/h.distance;return n}var s=c({},{getDistance:function(){return s.element.prop("offsetWidth")},onDragStart:angular.noop,onDrag:angular.noop,onDragEnd:angular.noop},n),l=ionic.onGesture("dragstart",i,t[0]),u=ionic.onGesture("drag",o,t[0]),d=ionic.onGesture("dragend",r,t[0]);e.$on("$destroy",function(){ionic.offGesture(l,"dragstart",i),ionic.offGesture(u,"drag",o),ionic.offGesture(d,"dragend",r)});var f=!1;t.on("touchmove pointermove mousemove",function(e){f&&e.preventDefault()}),t.on("touchend mouseup mouseleave",function(){f=!1});var h}return e}]),s.factory("$ionicBackdrop",["$document","$timeout",function(e,t){function n(){1===++a&&(r.addClass("visible"),ionic.requestAnimationFrame(function(){a&&r.addClass("active")}))}function i(){0===--a&&(r.removeClass("active"),t(function(){!a&&r.removeClass("visible")},400,!1))}function o(){return r}var r=f('<div class="backdrop">'),a=0;return e[0].body.appendChild(r[0]),{retain:n,release:i,getElement:o,_element:r}}]),s.factory("$ionicBind",["$parse","$interpolate",function(e,t){var n=/^\s*([@=&])(\??)\s*(\w*)\s*$/;return function(i,o,r){l(r||{},function(r,a){var s,c,l=r.match(n)||[],u=l[3]||a,d=l[1];switch(d){case"@":if(!o[u])return;o.$observe(u,function(e){i[a]=e}),o[u]&&(i[a]=t(o[u])(i));break;case"=":if(!o[u])return;c=i.$watch(o[u],function(e){i[a]=e}),i.$on("$destroy",c);break;case"&":if(o[u]&&o[u].match(RegExp(a+"(.*?)")))throw new Error('& expression binding "'+a+'" looks like it will recursively call "'+o[u]+'" and cause a stack overflow! Please choose a different scopeName.');s=e(o[u]),i[a]=function(e){return s(i,e)}}})}}]),s.factory("$ionicBody",["$document",function(e){return{addClass:function(){for(var t=0;t<arguments.length;t++)e[0].body.classList.add(arguments[t]);return this},removeClass:function(){for(var t=0;t<arguments.length;t++)e[0].body.classList.remove(arguments[t]);return this},enableClass:function(e){var t=Array.prototype.slice.call(arguments).slice(1);return e?this.addClass.apply(this,t):this.removeClass.apply(this,t),this},append:function(t){return e[0].body.appendChild(t.length?t[0]:t),this},get:function(){return e[0].body}}}]),s.factory("$ionicClickBlock",["$document","$ionicBody","$timeout",function(e,t,n){function i(){s&&(r?r.classList.remove(c):(r=e[0].createElement("div"),r.className="click-block",t.append(r)),s=!1)}function o(){r&&r.classList.add(c)}var r,a,s,c="click-block-hide";return{show:function(e){s=!0,n.cancel(a),a=n(this.hide,e||310),ionic.requestAnimationFrame(i)},hide:function(){s=!1,n.cancel(a),ionic.requestAnimationFrame(o)}}}]),s.factory("$collectionDataSource",["$cacheFactory","$parse","$rootScope",function(e,t,n){function i(e){e.css(ionic.CSS.TRANSFORM,"translate3d(-2000px,-2000px,0)")}function o(e){this.scope=e.scope,this.transcludeFn=e.transcludeFn,this.transcludeParent=e.transcludeParent,this.element=e.element,this.keyExpr=e.keyExpr,this.listExpr=e.listExpr,this.trackByExpr=e.trackByExpr,this.heightGetter=e.heightGetter,this.widthGetter=e.widthGetter,this.dimensions=[],this.data=[],this.attachedItems={},this.BACKUP_ITEMS_LENGTH=20,this.backupItemsArray=[]}return o.prototype={setup:function(){if(!this.isSetup){this.isSetup=!0;for(var e=0;e<this.BACKUP_ITEMS_LENGTH;e++)this.detachItem(this.createItem())}},destroy:function(){this.dimensions.length=0,this.data=null,this.backupItemsArray.length=0,this.attachedItems={}},calculateDataDimensions:function(){var e={};this.dimensions=this.data.map(function(t,n){return e[this.keyExpr]=t,e.$index=n,{width:this.widthGetter(this.scope,e),height:this.heightGetter(this.scope,e)}},this),this.dimensions=this.beforeSiblings.concat(this.dimensions).concat(this.afterSiblings),this.dataStartIndex=this.beforeSiblings.length},createItem:function(){var e={};return e.scope=this.scope.$new(),this.transcludeFn(e.scope,function(t){t.css("position","absolute"),e.element=t}),this.transcludeParent.append(e.element),e},getItem:function(e){var t;return(t=this.attachedItems[e])||((t=this.backupItemsArray.pop())?ionic.Utils.reconnectScope(t.scope):t=this.createItem()),t},attachItemAtIndex:function(e){if(e<this.dataStartIndex)return this.beforeSiblings[e];if(e-=this.dataStartIndex,e>this.data.length-1)return this.afterSiblings[e-this.dataStartIndex];var t=this.getItem(e),i=this.data[e];return(t.index!==e||t.scope[this.keyExpr]!==i)&&(t.index=t.scope.$index=e,t.scope[this.keyExpr]=i,t.scope.$first=0===e,t.scope.$last=e===this.getLength()-1,t.scope.$middle=!(t.scope.$first||t.scope.$last),t.scope.$odd=!(t.scope.$even=0===(1&e)),n.$$phase||t.scope.$digest()),this.attachedItems[e]=t,t},destroyItem:function(e){e.element.remove(),e.scope.$destroy(),e.scope=null,e.element=null},detachItem:function(e){delete this.attachedItems[e.index],e.isOutside?i(e.element):this.backupItemsArray.length>=this.BACKUP_ITEMS_LENGTH?this.destroyItem(e):(this.backupItemsArray.push(e),i(e.element),ionic.Utils.disconnectScope(e.scope))},getLength:function(){return this.dimensions&&this.dimensions.length||0},setData:function(e,t,n){this.data=e||[],this.beforeSiblings=t||[],this.afterSiblings=n||[],this.calculateDataDimensions(),this.afterSiblings.forEach(function(e){e.element.css({position:"absolute",top:"0",left:"0"}),i(e.element)})}},o}]),s.factory("$collectionRepeatManager",["$rootScope","$timeout",function(){function e(e){function t(){return n.viewportSize}var n=this;this.dataSource=e.dataSource,this.element=e.element,this.scrollView=e.scrollView,this.isVertical=!!this.scrollView.options.scrollingY,this.renderedItems={},this.dimensions=[],this.setCurrentIndex(0),this.scrollView.__$callback=this.scrollView.__callback,this.scrollView.__callback=angular.bind(this,this.renderScroll),this.isVertical?(this.scrollView.options.getContentHeight=t,this.scrollValue=function(){return this.scrollView.__scrollTop},this.scrollMaxValue=function(){return this.scrollView.__maxScrollTop},this.scrollSize=function(){return this.scrollView.__clientHeight},this.secondaryScrollSize=function(){return this.scrollView.__clientWidth},this.transformString=function(e,t){return"translate3d("+t+"px,"+e+"px,0)"},this.primaryDimension=function(e){return e.height},this.secondaryDimension=function(e){return e.width}):(this.scrollView.options.getContentWidth=t,this.scrollValue=function(){return this.scrollView.__scrollLeft},this.scrollMaxValue=function(){return this.scrollView.__maxScrollLeft},this.scrollSize=function(){return this.scrollView.__clientWidth},this.secondaryScrollSize=function(){return this.scrollView.__clientHeight},this.transformString=function(e,t){return"translate3d("+e+"px,"+t+"px,0)"},this.primaryDimension=function(e){return e.width},this.secondaryDimension=function(e){return e.height})}return e.prototype={destroy:function(){this.renderedItems={},this.render=angular.noop,this.calculateDimensions=angular.noop,this.dimensions=[]},calculateDimensions:function(){function e(e){var r={primarySize:this.primaryDimension(e),secondarySize:Math.min(this.secondaryDimension(e),o)};return t&&(i+=t.secondarySize,t.primaryPos===n&&i+r.secondarySize>o&&(i=0,n+=t.primarySize)),r.primaryPos=n,r.secondaryPos=i,t=r,r}var t,n=0,i=0,o=this.secondaryScrollSize();this.dataSource.beforeSiblings&&this.dataSource.beforeSiblings.forEach(e,this);var r=n+(t?t.primarySize:0);n=i=0,t=null;var a=this.dataSource.dimensions.map(e,this),s=n+(t?t.primarySize:0);return{beforeSize:r,totalSize:s,dimensions:a}},resize:function(){var e=this.calculateDimensions();this.dimensions=e.dimensions,this.viewportSize=e.totalSize,this.beforeSize=e.beforeSize,this.setCurrentIndex(0),this.render(!0),this.dataSource.setup()},setCurrentIndex:function(e){var t=(this.dimensions[e]||{}).primaryPos||0;this.currentIndex=e,this.hasPrevIndex=e>0,this.hasPrevIndex&&(this.previousPos=Math.max(t-this.dimensions[e-1].primarySize,this.dimensions[e-1].primaryPos)),this.hasNextIndex=e+1<this.dataSource.getLength(),this.hasNextIndex&&(this.nextPos=Math.min(t+this.dimensions[e+1].primarySize,this.dimensions[e+1].primaryPos))},renderScroll:ionic.animationFrameThrottle(function(e,t,n,i){return this.renderIfNeeded(this.isVertical?t:e),this.scrollView.__$callback(e,t,n,i)}),renderIfNeeded:function(e){(this.hasNextIndex&&e>=this.nextPos||this.hasPrevIndex&&e<this.previousPos)&&this.render()},getIndexForScrollValue:function(e,t){var n;if(t<=this.dimensions[e].primaryPos)for(;(n=this.dimensions[e-1])&&n.primaryPos>t;)e--;else for(;(n=this.dimensions[e+1])&&n.primaryPos<t;)e++;return e},render:function(e){function t(e,t){e<i.dataSource.dataStartIndex||i.renderItem(e,t.primaryPos-i.beforeSize,t.secondaryPos)}var n,i=this,o=this.currentIndex>=this.dataSource.getLength();if(o||e){for(n in this.renderedItems)this.removeItem(n);if(o)return}for(var r,a=this.scrollValue(),s=this.scrollSize(),c=s+a,l=this.getIndexForScrollValue(this.currentIndex,a),u=Math.max(l-1,0);u>0&&(r=this.dimensions[u])&&r.primaryPos===this.dimensions[l-1].primaryPos;)u--;for(n=u;(r=this.dimensions[n])&&r.primaryPos-r.primarySize<c;)t(n,r),n++;i.dimensions[n]&&(t(n,i.dimensions[n]),n++),i.dimensions[n]&&t(n,i.dimensions[n]);var d=n;for(var f in this.renderedItems)(u>f||f>d)&&this.removeItem(f);this.setCurrentIndex(l)},renderItem:function(e,t,n){var i=this.dataSource.attachItemAtIndex(e);i&&i.element?((i.primaryPos!==t||i.secondaryPos!==n)&&(i.element.css(ionic.CSS.TRANSFORM,this.transformString(t,n)),i.primaryPos=t,i.secondaryPos=n),this.renderedItems[e]=i):delete this.renderedItems[e]},removeItem:function(e){var t=this.renderedItems[e];t&&(t.primaryPos=t.secondaryPos=null,this.dataSource.detachItem(t),delete this.renderedItems[e])}},e}]),s.factory("$ionicGesture",[function(){return{on:function(e,t,n,i){return window.ionic.onGesture(e,t,n[0],i)},off:function(e,t,n){return window.ionic.offGesture(e,t,n)}}}]),s.factory("$ionicHistory",["$rootScope","$state","$location","$window","$timeout","$ionicViewSwitcher","$ionicNavViewDelegate",function(e,t,n,i,o,r,a){function s(e){return e?L.views[e]:null}function l(e){return e?s(e.backViewId):null}function u(e){return e?s(e.forwardViewId):null}function d(e){return e?L.histories[e]:null}function f(e){var t=h(e);return L.histories[t.historyId]||(L.histories[t.historyId]={historyId:t.historyId,parentHistoryId:h(t.scope.$parent).historyId,stack:[],cursor:-1}),d(t.historyId)}function h(t){for(var n=t;n;){if(n.hasOwnProperty("$historyId"))return{historyId:n.$historyId,scope:n};n=n.$parent}return{historyId:"root",scope:e}}function p(e){L.currentView=s(e),L.backView=l(L.currentView),L.forwardView=u(L.currentView)}function v(){var e;if(t&&t.current&&t.current.name){if(e=t.current.name,t.params)for(var n in t.params)t.params.hasOwnProperty(n)&&t.params[n]&&(e+="_"+n+"="+t.params[n]);return e}return ionic.Utils.nextUid()}function g(){var e;if(t&&t.params)for(var n in t.params)t.params.hasOwnProperty(n)&&(e=e||{},e[n]=t.params[n]);return e}function m(e){return e&&e.length&&/ion-side-menus|ion-tabs/i.test(e[0].tagName)}var $,w,b,y,S="initialView",k="newView",T="moveBack",C="moveForward",I="back",B="forward",x="enter",V="exit",E="swap",A="none",D=0,L={histories:{root:{historyId:"root",parentHistoryId:null,stack:[],cursor:-1}},views:{},backView:null,forwardView:null,currentView:null},P=function(){};return P.prototype.initialize=function(e){if(e){for(var t in e)this[t]=e[t];return this}return null},P.prototype.go=function(){return this.stateName?t.go(this.stateName,this.stateParams):this.url&&this.url!==n.url()?L.backView===this?i.history.go(-1):L.forwardView===this?i.history.go(1):void n.url(this.url):null},P.prototype.destroy=function(){this.scope&&(this.scope.$destroy&&this.scope.$destroy(),this.scope=null)},{register:function(e,t){var i,a,c,u=v(),m=f(e),P=L.currentView,H=L.backView,N=L.forwardView,_=null,O=null,M=A,R=m.historyId,U=n.url();if($!==u&&($=u,D++),y)_=y.viewId,O=y.action,M=y.direction,y=null;else if(H&&H.stateId===u)_=H.viewId,R=H.historyId,O=T,H.historyId===P.historyId?M=I:P&&(M=V,i=d(H.historyId),i&&i.parentHistoryId===P.historyId?M=x:(i=d(P.historyId),i&&i.parentHistoryId===m.parentHistoryId&&(M=E)));else if(N&&N.stateId===u)_=N.viewId,R=N.historyId,O=C,N.historyId===P.historyId?M=B:P&&(M=V,P.historyId===m.parentHistoryId?M=x:(i=d(P.historyId),i&&i.parentHistoryId===m.parentHistoryId&&(M=E))),i=h(e),N.historyId&&i.scope&&(i.scope.$historyId=N.historyId,R=N.historyId);else if(P&&P.historyId!==R&&m.cursor>-1&&m.stack.length>0&&m.cursor<m.stack.length&&m.stack[m.cursor].stateId===u){var z=m.stack[m.cursor];_=z.viewId,R=z.historyId,O=T,M=E,i=d(P.historyId),i&&i.parentHistoryId===R?M=V:(i=d(R),i&&i.parentHistoryId===P.historyId&&(M=x)),i=s(z.backViewId),i&&z.historyId!==i.historyId&&(m.stack[m.cursor].backViewId=P.viewId)}else{if(c=r.createViewEle(t),this.isAbstractEle(c,t))return{action:"abstractView",direction:A,ele:c};if(_=ionic.Utils.nextUid(),P){if(P.forwardViewId=_,O=k,N&&P.stateId!==N.stateId&&P.historyId===N.historyId&&(i=d(N.historyId))){for(a=i.stack.length-1;a>=N.index;a--)i.stack[a].destroy(),i.stack.splice(a);R=N.historyId}m.historyId===P.historyId?M=B:P.historyId!==m.historyId&&(M=x,i=d(P.historyId),i&&i.parentHistoryId===m.parentHistoryId?M=E:(i=d(i.parentHistoryId),i&&i.historyId===m.historyId&&(M=V)))}else O=S;2>D&&(M=A),L.views[_]=this.createView({viewId:_,index:m.stack.length,historyId:m.historyId,backViewId:P&&P.viewId?P.viewId:null,forwardViewId:null,stateId:u,stateName:this.currentStateName(),stateParams:g(),url:U}),m.stack.push(L.views[_])}if(o.cancel(b),w){if(w.disableAnimate&&(M=A),w.disableBack&&(L.views[_].backViewId=null),w.historyRoot){for(a=0;a<m.stack.length;a++)m.stack[a].viewId===_?(m.stack[a].index=0,m.stack[a].backViewId=m.stack[a].forwardViewId=null):delete L.views[m.stack[a].viewId];m.stack=[L.views[_]]}w=null}if(p(_),L.backView&&R==L.backView.historyId&&u==L.backView.stateId&&U==L.backView.url)for(a=0;a<m.stack.length;a++)if(m.stack[a].viewId==_){O="dupNav",M=A,m.stack[a-1].forwardViewId=L.forwardView=null,L.currentView.index=L.backView.index,L.currentView.backViewId=L.backView.backViewId,L.backView=l(L.backView),m.stack.splice(a,1);break}return m.cursor=L.currentView.index,{viewId:_,action:O,direction:M,historyId:R,enableBack:!(!L.backView||L.backView.historyId!==L.currentView.historyId),isHistoryRoot:0===L.currentView.index,ele:c}},registerHistory:function(e){e.$historyId=ionic.Utils.nextUid()},createView:function(e){var t=new P;return t.initialize(e)},getViewById:s,viewHistory:function(){return L},currentView:function(e){return arguments.length&&(L.currentView=e),L.currentView},currentHistoryId:function(){return L.currentView?L.currentView.historyId:null},currentTitle:function(e){return L.currentView?(arguments.length&&(L.currentView.title=e),L.currentView.title):void 0},backView:function(e){return arguments.length&&(L.backView=e),L.backView},backTitle:function(){return L.backView?L.backView.title:void 0},forwardView:function(e){return arguments.length&&(L.forwardView=e),L.forwardView},currentStateName:function(){return t&&t.current?t.current.name:null},isCurrentStateNavView:function(e){return!!(t&&t.current&&t.current.views&&t.current.views[e])},goToHistoryRoot:function(e){if(e){var t=d(e);if(t&&t.stack.length){if(L.currentView&&L.currentView.viewId===t.stack[0].viewId)return;y={viewId:t.stack[0].viewId,action:T,direction:I},t.stack[0].go()}}},goBack:function(){L.backView&&L.backView.go()},clearHistory:function(){var e=L.histories,t=L.currentView;if(e)for(var n in e)e[n].stack&&(e[n].stack=[],e[n].cursor=-1),t&&t.historyId===n?(t.backViewId=t.forwardViewId=null,e[n].stack.push(t)):e[n].destroy&&e[n].destroy();for(var i in L.views)i!==t.viewId&&delete L.views[i];t&&p(t.viewId)},clearCache:function(){a._instances.forEach(function(e){e.clearCache()})},nextViewOptions:function(e){return arguments.length&&(o.cancel(b),null===e?w=e:(w=w||{},c(w,e),w.expire&&(b=o(function(){w=null},w.expire)))),w},isAbstractEle:function(e,t){return t&&t.$$state&&t.$$state.self.abstract?!0:!(!e||!m(e)&&!m(e.children()))},isActiveScope:function(e){if(!e)return!1;for(var t,n=e,i=this.currentHistoryId();n;){if(n.$$disconnected)return!1;if(!t&&n.hasOwnProperty("$historyId")&&(t=!0),i){if(n.hasOwnProperty("$historyId")&&i==n.$historyId)return!0;if(n.hasOwnProperty("$activeHistoryId")&&i==n.$activeHistoryId){if(n.hasOwnProperty("$historyId"))return!0;if(!t)return!0}}t&&n.hasOwnProperty("$activeHistoryId")&&(t=!1),n=n.$parent}return i?"root"==i:!0}}}]).run(["$rootScope","$state","$location","$document","$ionicPlatform","$ionicHistory",function(e,t,n,i,o,r){function a(e){var t=r.backView();return t?t.go():ionic.Platform.exitApp(),e.preventDefault(),!1}e.$on("$ionicView.beforeEnter",function(){ionic.keyboard&&ionic.keyboard.hide&&ionic.keyboard.hide()}),e.$on("$ionicHistory.change",function(e,i){if(i){var o=r.viewHistory(),a=i.historyId?o.histories[i.historyId]:null;if(a&&a.cursor>-1&&a.cursor<a.stack.length){var s=a.stack[a.cursor];return s.go(i)}!i.url&&i.uiSref&&(i.url=t.href(i.uiSref)),i.url&&(0===i.url.indexOf("#")&&(i.url=i.url.replace("#","")),i.url!==n.url()&&n.url(i.url))}}),e.$ionicGoBack=function(){r.goBack()},e.$on("$ionicView.afterEnter",function(e,t){t&&t.title&&(i[0].title=t.title)}),o.registerBackButtonAction(a,m)}]),s.provider("$ionicConfig",function(){function e(e,i){a.platform[e]=i,o.platform[e]={},t(a,a.platform[e]),n(a.platform[e],o.platform[e],"")}function t(e,n){for(var i in e)i!=r&&e.hasOwnProperty(i)&&(angular.isObject(e[i])?(u(n[i])||(n[i]={}),t(e[i],n[i])):u(n[i])||(n[i]=null))}function n(e,t,o){l(e,function(s,c){angular.isObject(e[c])?(t[c]={},n(e[c],t[c],o+"."+c)):t[c]=function(n){if(arguments.length)return e[c]=n,t;if(e[c]==r){var s=i(a.platform,ionic.Platform.platform()+o+"."+c);return s||s===!1?s:i(a.platform,"default"+o+"."+c)}return e[c]}})}function i(e,t){t=t.split(".");for(var n=0;n<t.length;n++){if(!e||!u(e[t[n]]))return null;e=e[t[n]]}return e}var o=this;o.platform={};var r="platform",a={views:{maxCache:r,forwardCache:r,transition:r},navBar:{alignTitle:r,positionPrimaryButtons:r,positionSecondaryButtons:r,transition:r},backButton:{icon:r,text:r,previousTitleText:r},form:{checkbox:r},tabs:{style:r,position:r},templates:{maxPrefetch:r},platform:{}};n(a,o,""),e("default",{views:{maxCache:10,forwardCache:!1,transition:"ios"},navBar:{alignTitle:"center",positionPrimaryButtons:"left",positionSecondaryButtons:"right",transition:"view"},backButton:{icon:"ion-ios7-arrow-back",text:"Back",previousTitleText:!0},form:{checkbox:"circle"},tabs:{style:"standard",position:"bottom"},templates:{maxPrefetch:30}}),e("ios",{}),e("android",{views:{transition:"android"},navBar:{alignTitle:"left",positionPrimaryButtons:"right",positionSecondaryButtons:"right"},backButton:{icon:"ion-arrow-left-c",text:!1,previousTitleText:!1},form:{checkbox:"square"},tabs:{style:"striped",position:"top"}}),o.transitions={views:{},navBar:{}},o.transitions.views.ios=function(e,t,n,i){function o(e,t,n){var o={};o[ionic.CSS.TRANSITION_DURATION]=i?"":0,o.opacity=t,o[ionic.CSS.TRANSFORM]="translate3d("+n+"%,0,0)",ionic.DomUtil.cachedStyles(e,o)}return i=i&&("forward"==n||"back"==n),{run:function(i){"forward"==n?(o(e,1,99*(1-i)),o(t,1-.1*i,-33*i)):"back"==n?(o(e,1-.1*(1-i),-33*(1-i)),o(t,1,100*i)):(o(e,1,0),o(t,0,0))},shouldAnimate:i}},o.transitions.navBar.ios=function(e,t,n,i){function o(e,t,n,o){var r={};r[ionic.CSS.TRANSITION_DURATION]=i?"":0,r.opacity=1===t?"":t,e.setCss("buttons-left",r),e.setCss("buttons-right",r),e.setCss("back-button",r),r[ionic.CSS.TRANSFORM]="translate3d("+o+"px,0,0)",e.setCss("back-text",r),r[ionic.CSS.TRANSFORM]="translate3d("+n+"px,0,0)",e.setCss("title",r)}function r(e,t,n){if(e){var i=(e.titleTextX()+e.titleWidth())*(1-n),r=t&&(t.titleTextX()-e.backButtonTextLeft())*(1-n)||0;o(e,n,i,r)}}function a(e,t,n){if(e){var i=(-(e.titleTextX()-t.backButtonTextLeft())-e.titleLeftRight())*n;o(e,1-n,i,0)}}return i=i&&("forward"==n||"back"==n),{run:function(i){var o=e.controller(),s=t&&t.controller();"back"==n?(a(o,s,1-i),r(s,o,1-i)):(r(o,s,i),a(s,o,i))},shouldAnimate:i}},o.transitions.views.android=function(e,t,n,i){function o(e,t){var n={};n[ionic.CSS.TRANSITION_DURATION]=i?"":0,n[ionic.CSS.TRANSFORM]="translate3d("+t+"%,0,0)",ionic.DomUtil.cachedStyles(e,n)}return i=i&&("forward"==n||"back"==n),{run:function(i){"forward"==n?(o(e,99*(1-i)),o(t,-100*i)):"back"==n?(o(e,-100*(1-i)),o(t,100*i)):(o(e,0),o(t,0))},shouldAnimate:i}},o.transitions.navBar.android=function(e,t,n,i){function o(e,t){if(e){var n={};n.opacity=1===t?"":t,e.setCss("buttons-left",n),e.setCss("buttons-right",n),e.setCss("back-button",n),e.setCss("back-text",n),e.setCss("title",n)}}return i=i&&("forward"==n||"back"==n),{run:function(n){o(e.controller(),n),o(t&&t.controller(),1-n)},shouldAnimate:!0}},o.transitions.views.none=function(e,t){return{run:function(n){o.transitions.views.android(e,t,!1,!1).run(n)}}},o.transitions.navBar.none=function(e,t){return{run:function(n){o.transitions.navBar.ios(e,t,!1,!1).run(n),o.transitions.navBar.android(e,t,!1,!1).run(n)}}},o.setPlatformConfig=e,o.$get=function(){return o}});var h='<div class="loading-container"><div class="loading"></div></div>',p="$ionicLoading instance.hide() has been deprecated. Use $ionicLoading.hide().",v="$ionicLoading instance.show() has been deprecated. Use $ionicLoading.show().",g="$ionicLoading instance.setContent() has been deprecated. Use $ionicLoading.show({ template: 'my content' }).";s.constant("$ionicLoadingConfig",{template:'<i class="icon ion-loading-d"></i>'}).factory("$ionicLoading",["$ionicLoadingConfig","$ionicBody","$ionicTemplateLoader","$ionicBackdrop","$timeout","$q","$log","$compile","$ionicPlatform","$rootScope",function(e,t,n,i,o,r,s,l,u,d){function f(){return w||(w=n.compile({template:h,appendTo:t.get()}).then(function(e){var a=e;return e.show=function(e){var s=e.templateUrl?n.load(e.templateUrl):r.when(e.template||e.content||"");a.scope=e.scope||a.scope,this.isShown||(this.hasBackdrop=!e.noBackdrop&&e.showBackdrop!==!1,this.hasBackdrop&&(i.retain(),i.getElement().addClass("backdrop-loading"))),e.duration&&(o.cancel(this.durationTimeout),this.durationTimeout=o(angular.bind(this,this.hide),+e.duration)),b(),b=u.registerBackButtonAction(angular.noop,S),s.then(function(e){if(e){var n=a.element.children();n.html(e),l(n.contents())(a.scope)}a.isShown&&(a.element.addClass("visible"),ionic.requestAnimationFrame(function(){a.isShown&&(a.element.addClass("active"),t.addClass("loading-active"))}))}),this.isShown=!0},e.hide=function(){b(),this.isShown&&(this.hasBackdrop&&(i.release(),i.getElement().removeClass("backdrop-loading")),a.element.removeClass("active"),t.removeClass("loading-active"),setTimeout(function(){!a.isShown&&a.element.removeClass("visible")},200)),o.cancel(this.durationTimeout),this.isShown=!1},e})),w}function m(t){t=c({},e||{},t||{});var n=t.delay||t.showDelay||0;return k&&o.cancel(k),k=o(angular.noop,n),k.then(f).then(function(e){return t.hideOnStateChange&&(y=d.$on("$stateChangeSuccess",$)),e.show(t)}),{hide:a.method(p,s.error,$),show:a.method(v,s.error,function(){m(t)}),setContent:a.method(g,s.error,function(e){f().then(function(t){t.show({template:e})})})}}function $(){y(),o.cancel(k),f().then(function(e){e.hide()})}var w,b=angular.noop,y=angular.noop,k=r.when();return{show:m,hide:$,_getLoader:f}}]),s.factory("$ionicModal",["$rootScope","$ionicBody","$compile","$timeout","$ionicPlatform","$ionicTemplateLoader","$q","$log",function(e,t,n,i,o,r,a,s){var l=ionic.views.Modal.inherit({initialize:function(e){ionic.views.Modal.prototype.initialize.call(this,e),this.animation=e.animation||"slide-in-up"},show:function(e){var n=this;if(n.scope.$$destroyed)return void s.error("Cannot call "+n.viewType+".show() after remove(). Please create a new "+n.viewType+" instance.");var r=f(n.modalEl);return n.el.classList.remove("hide"),i(function(){t.addClass(n.viewType+"-open")},400),n.el.parentElement||(r.addClass(n.animation),t.append(n.el)),e&&n.positionView&&(n.positionView(e,r),ionic.on("resize",function(){ionic.off("resize",null,window),n.positionView(e,r)},window)),r.addClass("ng-enter active").removeClass("ng-leave ng-leave-active"),n._isShown=!0,n._deregisterBackButton=o.registerBackButtonAction(n.hardwareBackButtonClose?angular.bind(n,n.hide):angular.noop,w),n._isOpenPromise=a.defer(),ionic.views.Modal.prototype.show.call(n),i(function(){r.addClass("ng-enter-active"),ionic.trigger("resize"),n.scope.$parent&&n.scope.$parent.$broadcast(n.viewType+".shown",n),n.el.classList.add("active"),n.scope.$broadcast("$ionicHeader.align")},20),i(function(){n.$el.on("click",function(e){n.backdropClickToClose&&e.target===n.el&&n.hide()})},400)},hide:function(){var e=this,n=f(e.modalEl);return e.el.classList.remove("active"),n.addClass("ng-leave"),i(function(){n.addClass("ng-leave-active").removeClass("ng-enter ng-enter-active active")},20),e.$el.off("click"),e._isShown=!1,e.scope.$parent&&e.scope.$parent.$broadcast(e.viewType+".hidden",e),e._deregisterBackButton&&e._deregisterBackButton(),ionic.views.Modal.prototype.hide.call(e),e.positionView&&ionic.off("resize",null,window),i(function(){t.removeClass(e.viewType+"-open"),e.el.classList.add("hide")},e.hideDelay||320)},remove:function(){var e=this;return e.scope.$parent&&e.scope.$parent.$broadcast(e.viewType+".removed",e),e.hide().then(function(){e.scope.$destroy(),e.$el.remove()})},isShown:function(){return!!this._isShown}}),u=function(t,i){var o=i.scope&&i.scope.$new()||e.$new(!0);i.viewType=i.viewType||"modal",c(o,{$hasHeader:!1,$hasSubheader:!1,$hasFooter:!1,$hasSubfooter:!1,$hasTabs:!1,$hasTabsTop:!1});var r=n("<ion-"+i.viewType+">"+t+"</ion-"+i.viewType+">")(o);i.$el=r,i.el=r[0],i.modalEl=i.el.querySelector("."+i.viewType);var a=new l(i);return a.scope=o,i.scope||(o[i.viewType]=a),a};return{fromTemplate:function(e,t){var n=u(e,t||{});return n},fromTemplateUrl:function(e,t,n){var i;return angular.isFunction(t)&&(i=t,t=n),r.load(e).then(function(e){var n=u(e,t||{});return i&&i(n),n})}}}]),s.service("$ionicNavBarDelegate",ionic.DelegateService(["align","showBackButton","showBar","title","changeTitle","setTitle","getTitle","back","getPreviousTitle"])),s.service("$ionicNavViewDelegate",ionic.DelegateService(["clearCache"]));var m=100,$=150,w=200,b=300,y=400,S=500;s.provider("$ionicPlatform",function(){return{$get:["$q","$rootScope",function(e){var t={onHardwareBackButton:function(e){ionic.Platform.ready(function(){document.addEventListener("backbutton",e,!1)})},offHardwareBackButton:function(e){ionic.Platform.ready(function(){document.removeEventListener("backbutton",e)})},$backButtonActions:{},registerBackButtonAction:function(e,n,i){t._hasBackButtonHandler||(t.$backButtonActions={},t.onHardwareBackButton(t.hardwareBackButtonClick),t._hasBackButtonHandler=!0);var o={id:i?i:ionic.Utils.nextUid(),priority:n?n:0,fn:e};return t.$backButtonActions[o.id]=o,function(){delete t.$backButtonActions[o.id]
}},hardwareBackButtonClick:function(e){var n,i;for(i in t.$backButtonActions)(!n||t.$backButtonActions[i].priority>=n.priority)&&(n=t.$backButtonActions[i]);return n?(n.fn(e),n):void 0},is:function(e){return ionic.Platform.is(e)},on:function(e,t){return ionic.Platform.ready(function(){document.addEventListener(e,t,!1)}),function(){ionic.Platform.ready(function(){document.removeEventListener(e,t)})}},ready:function(t){var n=e.defer();return ionic.Platform.ready(function(){n.resolve(),t&&t()}),n.promise}};return t}]}}),s.factory("$ionicPopover",["$ionicModal","$ionicPosition","$document","$window",function(e,t,n,i){function o(e,o){var a=angular.element(e.target||e),s=t.offset(a),c=o.prop("offsetWidth"),l=o.prop("offsetHeight"),u=n[0].body.clientWidth,d=i.innerHeight,h={left:s.left+s.width/2-c/2},p=f(o[0].querySelector(".popover-arrow"));h.left<r?h.left=r:h.left+c+r>u&&(h.left=u-c-r),s.top+s.height+l>d?(h.top=s.top-l,o.addClass("popover-bottom")):(h.top=s.top+s.height,o.removeClass("popover-bottom")),p.css({left:s.left+s.width/2-p.prop("offsetWidth")/2-h.left+"px"}),o.css({top:h.top+"px",left:h.left+"px",marginLeft:"0",opacity:"1"})}var r=6,a={viewType:"popover",hideDelay:1,animation:"none",positionView:o};return{fromTemplate:function(t,n){return e.fromTemplate(t,ionic.Utils.extend(a,n||{}))},fromTemplateUrl:function(t,n){return e.fromTemplateUrl(t,ionic.Utils.extend(a,n||{}))}}}]);var k='<div class="popup-container" ng-class="cssClass"><div class="popup"><div class="popup-head"><h3 class="popup-title" ng-bind-html="title"></h3><h5 class="popup-sub-title" ng-bind-html="subTitle" ng-if="subTitle"></h5></div><div class="popup-body"></div><div class="popup-buttons" ng-show="buttons.length"><button ng-repeat="button in buttons" ng-click="$buttonTapped(button, $event)" class="button" ng-class="button.type || \'button-default\'" ng-bind-html="button.text"></button></div></div></div>';s.factory("$ionicPopup",["$ionicTemplateLoader","$ionicBackdrop","$q","$timeout","$rootScope","$ionicBody","$compile","$ionicPlatform",function(e,t,n,i,o,r,a,s){function l(t){t=c({scope:null,title:"",buttons:[]},t||{});var o=e.compile({template:k,scope:t.scope&&t.scope.$new(),appendTo:r.get()}),s=t.templateUrl?e.load(t.templateUrl):n.when(t.template||t.content||"");return n.all([o,s]).then(function(e){var o=e[0],r=e[1],s=n.defer();o.responseDeferred=s;var l=f(o.element[0].querySelector(".popup-body"));return r?(l.html(r),a(l.contents())(o.scope)):l.remove(),c(o.scope,{title:t.title,buttons:t.buttons,subTitle:t.subTitle,cssClass:t.cssClass,$buttonTapped:function(e,t){var n=(e.onTap||angular.noop)(t);t=t.originalEvent||t,t.defaultPrevented||s.resolve(n)}}),o.show=function(){o.isShown||(o.isShown=!0,ionic.requestAnimationFrame(function(){o.isShown&&(o.element.removeClass("popup-hidden"),o.element.addClass("popup-showing active"),h(o.element))}))},o.hide=function(e){return e=e||angular.noop,o.isShown?(o.isShown=!1,o.element.removeClass("active"),o.element.addClass("popup-hidden"),void i(e,250)):e()},o.remove=function(){o.removed||(o.hide(function(){o.element.remove(),o.scope.$destroy()}),o.removed=!0)},o})}function u(){$[0]&&$[0].responseDeferred.resolve()}function d(e){function n(e){o.then(function(t){t.removed||t.responseDeferred.resolve(e)})}var o=w._createPopup(e),a=$[0];a&&a.hide();var c=i(angular.noop,a?m.stackPushDelay:0).then(function(){return o}).then(function(e){return a||(r.addClass("popup-open"),t.retain(),w._backButtonActionDone=s.registerBackButtonAction(u,y)),$.unshift(e),e.show(),e.responseDeferred.notify({close:c.close}),e.responseDeferred.promise.then(function(n){var o=$.indexOf(e);-1!==o&&$.splice(o,1),e.remove();var a=$[0];return a?a.show():(i(function(){r.removeClass("popup-open")},400),i(function(){t.release()},m.stackPushDelay||0),(w._backButtonActionDone||angular.noop)()),n})});return c.close=n,c}function h(e){var t=e[0].querySelector("[autofocus]");t&&t.focus()}function p(e){return d(c({buttons:[{text:e.okText||"OK",type:e.okType||"button-positive",onTap:function(){return!0}}]},e||{}))}function v(e){return d(c({buttons:[{text:e.cancelText||"Cancel",type:e.cancelType||"button-default",onTap:function(){return!1}},{text:e.okText||"OK",type:e.okType||"button-positive",onTap:function(){return!0}}]},e||{}))}function g(e){var t=o.$new(!0);t.data={};var n="";return e.template&&/<[a-z][\s\S]*>/i.test(e.template)===!1&&(n="<span>"+e.template+"</span>",delete e.template),d(c({template:n+'<input ng-model="data.response" type="'+(e.inputType||"text")+'" placeholder="'+(e.inputPlaceholder||"")+'">',scope:t,buttons:[{text:e.cancelText||"Cancel",type:e.cancelType||"button-default",onTap:function(){}},{text:e.okText||"OK",type:e.okType||"button-positive",onTap:function(){return t.data.response||""}}]},e||{}))}var m={stackPushDelay:75},$=[],w={show:d,alert:p,confirm:v,prompt:g,_createPopup:l,_popupStack:$};return w}]),s.factory("$ionicPosition",["$document","$window",function(e,t){function n(e,n){return e.currentStyle?e.currentStyle[n]:t.getComputedStyle?t.getComputedStyle(e)[n]:e.style[n]}function i(e){return"static"===(n(e,"position")||"static")}var o=function(t){for(var n=e[0],o=t.offsetParent||n;o&&o!==n&&i(o);)o=o.offsetParent;return o||n};return{position:function(t){var n=this.offset(t),i={top:0,left:0},r=o(t[0]);r!=e[0]&&(i=this.offset(angular.element(r)),i.top+=r.clientTop-r.scrollTop,i.left+=r.clientLeft-r.scrollLeft);var a=t[0].getBoundingClientRect();return{width:a.width||t.prop("offsetWidth"),height:a.height||t.prop("offsetHeight"),top:n.top-i.top,left:n.left-i.left}},offset:function(n){var i=n[0].getBoundingClientRect();return{width:i.width||n.prop("offsetWidth"),height:i.height||n.prop("offsetHeight"),top:i.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:i.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}}}}]),s.service("$ionicScrollDelegate",ionic.DelegateService(["resize","scrollTop","scrollBottom","scrollTo","scrollBy","zoomTo","zoomBy","getScrollPosition","anchorScroll","getScrollView"])),s.service("$ionicSideMenuDelegate",ionic.DelegateService(["toggleLeft","toggleRight","getOpenRatio","isOpen","isOpenLeft","isOpenRight","canDragContent","edgeDragThreshold"])),s.service("$ionicSlideBoxDelegate",ionic.DelegateService(["update","slide","select","enableSlide","previous","next","stop","autoPlay","start","currentIndex","selected","slidesCount","count","loop"])),s.service("$ionicTabsDelegate",ionic.DelegateService(["select","selectedIndex"])),function(){var e=[];s.factory("$ionicTemplateCache",["$http","$templateCache","$timeout",function(t,n,i){function o(e){return"undefined"==typeof e?r():(d(e)&&(e=[e]),l(e,function(e){s.push(e)}),void(a&&r()))}function r(){if(o._runCount++,a=!0,0!==s.length){for(var e=0;4>e&&(template=s.pop());)d(template)&&t.get(template,{cache:n}),e++;s.length&&i(r,1e3)}}var a,s=e;return o._runCount=0,o}]).config(["$stateProvider","$ionicConfigProvider",function(t,n){var i=t.state;t.state=function(o,r){if("object"==typeof r){var a=r.prefetchTemplate!==!1&&e.length<n.templates.maxPrefetch();if(a&&d(r.templateUrl)&&e.push(r.templateUrl),angular.isObject(r.views))for(var s in r.views)a=r.views[s].prefetchTemplate!==!1&&e.length<n.templates.maxPrefetch(),a&&d(r.views[s].templateUrl)&&e.push(r.views[s].templateUrl)}return i.call(t,o,r)}}]).run(["$ionicTemplateCache",function(e){e()}])}(),s.factory("$ionicTemplateLoader",["$compile","$controller","$http","$q","$rootScope","$templateCache",function(e,t,n,i,o,r){function a(e){return n.get(e,{cache:r}).then(function(e){return e.data&&e.data.trim()})}function s(n){n=c({template:"",templateUrl:"",scope:null,controller:null,locals:{},appendTo:null},n||{});var r=n.templateUrl?this.load(n.templateUrl):i.when(n.template);return r.then(function(i){var r,a=n.scope||o.$new(),s=f("<div>").html(i).contents();return n.controller&&(r=t(n.controller,c(n.locals,{$scope:a})),s.children().data("$ngControllerController",r)),n.appendTo&&f(n.appendTo).append(s),e(s)(a),{element:s,scope:a}})}return{load:a,compile:s}}]),s.factory("$ionicViewService",["$ionicHistory","$log",function(e,t){function n(e,n){t.warn("$ionicViewService"+e+" is deprecated, please use $ionicHistory"+n+" instead: http://ionicframework.com/docs/nightly/api/service/$ionicHistory/")}n("","");var i={getCurrentView:"currentView",getBackView:"backView",getForwardView:"forwardView",getCurrentStateName:"currentStateName",nextViewOptions:"nextViewOptions",clearHistory:"clearHistory"};return l(i,function(t,o){i[o]=function(){return n("."+o,"."+t),e[t].apply(this,arguments)}}),i}]),s.factory("$ionicViewSwitcher",["$timeout","$document","$q","$ionicClickBlock","$ionicConfig","$ionicNavBarDelegate",function(e,t,n,i,o,r){function a(e,t){return s(e).abstract?s(e).name:t?t.stateId||t.viewId:ionic.Utils.nextUid()}function s(e){return e&&e.$$state&&e.$$state.self||{}}function u(e,t,n,i){var r=s(e),a=v||E(t,"view-transition")||r.viewTransition||o.views.transition()||"ios",l=o.navBar.transition();return n=g||E(t,"view-direction")||r.viewDirection||n||"none",c(d(i),{transition:a,navBarTransition:"view"===l?a:l,direction:n,shouldAnimate:"none"!==a&&"none"!==n})}function d(e){return e=e||{},{viewId:e.viewId,historyId:e.historyId,stateId:e.stateId,stateName:e.stateName,stateParams:e.stateParams}}function h(e,t){return arguments.length>1?void E(e,T,t):E(e,T)}function p(e){if(e&&e.length){var t=e.scope();t&&(t.$emit("$ionicView.unloaded",e.data(k)),t.$destroy()),e.remove()}}var v,g,m="webkitTransitionEnd transitionend",$="$noCache",w="$destroyEle",b="$eleId",y="$accessed",S="$fallbackTimer",k="$viewData",T="nav-view",C="active",I="cached",B="stage",x=0;ionic.transition=ionic.transition||{},ionic.transition.isActive=!1;var V,E=ionic.DomUtil.cachedAttr,A=[],D={create:function(t,l,f,T){var V,L,P,H=++x,N={init:function(e,t){D.isTransitioning(!0),N.loadViewElements(e),N.render(e,function(){t&&t()})},loadViewElements:function(e){for(var n,i=t.getViewElements(),o=a(l,f),r=t.activeEleId(),s=0,c=i.length;c>s&&(n=i.eq(s),n.data(b)===o?n.data($)?(n.data(b,o+ionic.Utils.nextUid()),n.data(w,!0)):V=n:n.data(b)===r&&(L=n),!V||!L);s++);P=!!V,P||(V=e.ele||D.createViewEle(l),V.data(b,o)),t.activeEleId(o),e.ele=null},render:function(e,n){if(L&&ionic.Utils.disconnectScope(L.scope()),P)ionic.Utils.reconnectScope(V.scope());else{h(V,B);var i=u(l,V,e.direction,f),r=o.transitions.views[i.transition]||o.transitions.views.none;r(V,null,i.direction,!0).run(0),V.data(k,{viewId:i.viewId,historyId:i.historyId,stateName:i.stateName,stateParams:i.stateParams}),(s(l).cache===!1||"false"===s(l).cache||"false"==V.attr("cache-view")||0===o.views.maxCache())&&V.data($,!0);var a=t.appendViewElement(V,l);delete i.direction,delete i.transition,a.$emit("$ionicView.loaded",i)}V.data(y,Date.now()),n&&n()},transition:function(a,s){function p(){h(V,_.shouldAnimate?"entering":C),h(L,_.shouldAnimate?"leaving":I),_.run(1),r._instances.forEach(function(e){e.triggerTransitionStart(H)}),_.shouldAnimate||$()}function $(){$.x||($.x=!0,V.off(m,$),e.cancel(V.data(S)),L&&e.cancel(L.data(S)),N.emit("after",b,y),w.resolve(t),H===x&&(n.all(A).then(D.transitionEnd),N.cleanup(b)),r._instances.forEach(function(e){e.triggerTransitionEnd()}),v=g=f=T=V=L=null)}var w=n.defer();A.push(w.promise);var b=u(l,V,a,f),y=c(c({},b),d(T));b.transitionId=y.transitionId=H,b.fromCache=!!P,b.enableBack=!!s,E(V.parent(),"nav-view-transition",b.transition),E(V.parent(),"nav-view-direction",b.direction),e.cancel(V.data(S)),N.emit("before",b,y);var k=o.transitions.views[b.transition]||o.transitions.views.none,_=k(V,L,b.direction,b.shouldAnimate);_.shouldAnimate&&(V.on(m,$),V.data(S,e($,1e3)),i.show()),h(V,B),_.run(0),e(p,16)},emit:function(e,t,n){var i=V.scope();i&&(i.$emit("$ionicView."+e+"Enter",t),"after"==e&&i.$emit("$ionicView.enter",t)),L&&(i=L.scope(),i&&(i.$emit("$ionicView."+e+"Leave",n),"after"==e&&i.$emit("$ionicView.leave",n)))},cleanup:function(e){L&&"back"==e.direction&&!o.views.forwardCache()&&p(L);var n,i,r,a=t.getViewElements(),s=a.length,c=s-1>o.views.maxCache(),l=Date.now();for(n=0;s>n;n++)i=a.eq(n),c&&i.data(y)<l?(l=i.data(y),r=a.eq(n)):i.data(w)&&h(i)!=C&&p(i);p(r),V.data($)&&V.data(w,!0)},enteringEle:function(){return V},leavingEle:function(){return L}};return N},transitionEnd:function(e){l(e,function(e){e.transitionEnd()}),D.isTransitioning(!1),i.hide(),A=[]},nextTransition:function(e){v=e},nextDirection:function(e){g=e},isTransitioning:function(t){return arguments.length&&(ionic.transition.isActive=!!t,e.cancel(V),t&&(V=e(function(){D.isTransitioning(!1)},999))),ionic.transition.isActive},createViewEle:function(e){var n=t[0].createElement("div");return e&&e.$template&&(n.innerHTML=e.$template,1===n.children.length)?(n.children[0].classList.add("pane"),f(n.children[0])):(n.className="pane",f(n))},viewEleIsActive:function(e,t){h(e,t?C:I)},getTransitionData:u,navViewAttr:h,destroyViewEle:p};return D}]),s.config(["$provide",function(e){e.decorator("$compile",["$delegate",function(e){return e.$$addScopeInfo=function(e,t,n,i){var o=n?i?"$isolateScopeNoTemplate":"$isolateScope":"$scope";e.data(o,t)},e}])}]),s.config(["$provide",function(e){function t(e,t){return e.__hash=e.hash,e.hash=function(n){return angular.isDefined(n)&&t(function(){var e=document.querySelector(".scroll-content");e&&(e.scrollTop=0)},0,!1),e.__hash(n)},e}e.decorator("$location",["$delegate","$timeout",t])}]),s.controller("$ionicHeaderBar",["$scope","$element","$attrs","$q","$ionicConfig","$ionicHistory",function(e,t,n,i,o,r){function a(e){return T[e]||(T[e]=t[0].querySelector("."+e)),T[e]}var s="title",c="back-text",l="back-button",u="default-title",d="previous-title",f="hide",h=this,p="",v="",g=0,m=0,$="",w=!1,b=!0,y=!0,S=!1,k=0;h.beforeEnter=function(t){e.$broadcast("$ionicView.beforeEnter",t)},h.title=function(e){return arguments.length&&e!==p&&(a(s).innerHTML=e,p=e,k=0),p},h.enableBack=function(e,t){return arguments.length&&(w=e,t||h.updateBackButton()),w},h.showBack=function(e,t){return arguments.length&&(b=e,t||h.updateBackButton()),b},h.showNavBack=function(e){y=e,h.updateBackButton()},h.updateBackButton=function(){if((b&&y&&w)!==S){S=b&&y&&w;var e=a(l);e&&e.classList[S?"remove":"add"](f)}},h.titleTextWidth=function(){if(!k){var e=ionic.DomUtil.getTextBounds(a(s));k=Math.min(e&&e.width||30)}return k},h.titleWidth=function(){var e=h.titleTextWidth(),t=a(s).offsetWidth;return e>t&&(e=t+(g-m-5)),e},h.titleTextX=function(){return t[0].offsetWidth/2-h.titleWidth()/2},h.titleLeftRight=function(){return g-m},h.backButtonTextLeft=function(){for(var e=0,t=a(c);t;)e+=t.offsetLeft,t=t.parentElement;return e},h.resetBackButton=function(){if(o.backButton.previousTitleText()){var e=a(d);if(e){e.classList.remove(f);var t=r.backTitle();t!==v&&(v=e.innerHTML=t)}var n=a(u);n&&n.classList.remove(f)}},h.align=function(e){var i=a(s);e=e||n.alignTitle||o.navBar.alignTitle();var r=h.calcWidths(e,!1);if(b&&v&&o.backButton.previousTitleText()){var c=h.calcWidths(e,!0),l=t[0].offsetWidth-c.titleLeft-c.titleRight;h.titleTextWidth()<=l&&(r=c)}return h.updatePositions(i,r.titleLeft,r.titleRight,r.buttonsLeft,r.buttonsRight,r.css,r.showPrevTitle)},h.calcWidths=function(e,n){var i,o,r,h,p,v,g,m,$,w=a(s),y=a(l),S=t[0].childNodes,k=0,T=0,C=0,I=0,B="",x=0;for(i=0;i<S.length;i++){if(p=S[i],g=0,1==p.nodeType){if(p===w){$=!0;continue}if(p.classList.contains(f))continue;if(b&&p===y){for(o=0;o<p.childNodes.length;o++)if(h=p.childNodes[o],1==h.nodeType)if(h.classList.contains(c))for(r=0;r<h.children.length;r++)if(v=h.children[r],n){if(v.classList.contains(u))continue;x+=v.offsetWidth}else{if(v.classList.contains(d))continue;x+=v.offsetWidth}else x+=h.offsetWidth;else 3==h.nodeType&&h.nodeValue.trim()&&(m=ionic.DomUtil.getTextBounds(h),x+=m&&m.width||0);g=x||p.offsetWidth}else g=p.offsetWidth}else 3==p.nodeType&&p.nodeValue.trim()&&(m=ionic.DomUtil.getTextBounds(p),g=m&&m.width||0);$?T+=g:k+=g}if("left"==e)B="title-left",k&&(C=k+15),T&&(I=T+15);else if("right"==e)B="title-right",k&&(C=k+15),T&&(I=T+15);else{var V=Math.max(k,T)+10;V>10&&(C=I=V)}return{backButtonWidth:x,buttonsLeft:k,buttonsRight:T,titleLeft:C,titleRight:I,showPrevTitle:n,css:B}},h.updatePositions=function(e,n,r,s,c,l,p){var v=i.defer();if(e&&(n!==g&&(e.style.left=n?n+"px":"",g=n),r!==m&&(e.style.right=r?r+"px":"",m=r),l!==$&&(l&&e.classList.add(l),$&&e.classList.remove($),$=l)),o.backButton.previousTitleText()){var w=a(d),b=a(u);w&&w.classList[p?"remove":"add"](f),b&&b.classList[p?"add":"remove"](f)}return ionic.requestAnimationFrame(function(){if(e&&e.offsetWidth+10<e.scrollWidth){var n=c+5,i=t[0].offsetWidth-g-h.titleTextWidth()-20;r=n>i?n:i,r!==m&&(e.style.right=r+"px",m=r)}v.resolve()}),v.promise},h.setCss=function(e,t){ionic.DomUtil.cachedStyles(a(e),t)};var T={};e.$on("$destroy",function(){for(var e in T)T[e]=null})}]),s.service("$ionicListDelegate",ionic.DelegateService(["showReorder","showDelete","canSwipeItems","closeOptionButtons"])).controller("$ionicList",["$scope","$attrs","$ionicListDelegate","$ionicHistory",function(e,t,n,i){var o=this,r=!0,a=!1,s=!1,c=n._registerInstance(o,t.delegateHandle,function(){return i.isActiveScope(e)});e.$on("$destroy",c),o.showReorder=function(e){return arguments.length&&(a=!!e),a},o.showDelete=function(e){return arguments.length&&(s=!!e),s},o.canSwipeItems=function(e){return arguments.length&&(r=!!e),r},o.closeOptionButtons=function(){o.listView&&o.listView.clearDragEffects()}}]),s.controller("$ionicNavBar",["$scope","$element","$attrs","$compile","$timeout","$ionicNavBarDelegate","$ionicConfig","$ionicHistory",function(e,t,n,i,o,r,a,s){function c(e,t){var n=console.warn||console.log;n&&n("navBarController."+e+" is deprecated, please use "+t+" instead")}function d(e){return B[e]?f(B[e]):void 0}function h(){for(var e=0;e<I.length;e++)if(I[e].isActive)return I[e]}function p(){for(var e=0;e<I.length;e++)if(!I[e].isActive)return I[e]}function v(e,t){e&&ionic.DomUtil.cachedAttr(e.containerEle(),"nav-bar",t)}var g,m,$,w="hide",b="$ionNavBarController",y="primaryButtons",S="secondaryButtons",k="backButton",T="primaryButtons secondaryButtons leftButtons rightButtons title".split(" "),C=this,I=[],B={},x=!0;t.parent().data(b,C);var V=n.delegateHandle||"navBar"+ionic.Utils.nextUid(),E=r._registerInstance(C,V);C.init=function(){t.addClass("nav-bar-container"),ionic.DomUtil.cachedAttr(t,"nav-bar-transition",a.views.transition()),C.createHeaderBar(!1),C.createHeaderBar(!0),e.$emit("ionNavBar.init",V)},C.createHeaderBar=function(o){function r(e,t){e&&("title"===t?g.append(e):"rightButtons"==t||t==S&&"left"!=a.navBar.positionSecondaryButtons()||t==y&&"right"==a.navBar.positionPrimaryButtons()?(v||(v=f('<div class="buttons buttons-right">'),h.append(v)),t==S?v.append(e):v.prepend(e)):(p||(p=f('<div class="buttons buttons-left">'),m[k]?m[k].after(p):h.prepend(p)),t==S?p.append(e):p.prepend(e)))}var s=f('<div class="nav-bar-block">');ionic.DomUtil.cachedAttr(s,"nav-bar",o?"active":"cached");var c=n.alignTitle||a.navBar.alignTitle(),h=f("<ion-header-bar>").addClass(n.class).attr("align-title",c);u(n.noTapScroll)&&h.attr("no-tap-scroll",n.noTapScroll);var p,v,g=f('<div class="title title-'+c+'">'),m={},$={};m[k]=d(k),m[k]&&h.append(m[k]),h.append(g),l(T,function(e){m[e]=d(e),r(m[e],e)});for(var b=0;b<h[0].children.length;b++)h[0].children[b].classList.add("header-item");s.append(h),t.append(i(s)(e.$new()));var C=h.data("$ionHeaderBarController"),B={isActive:o,title:function(e){C.title(e)},setItem:function(e,t){B.removeItem(t),e?("title"===t&&B.title(""),r(e,t),m[t]&&m[t].addClass(w),$[t]=e):m[t]&&m[t].removeClass(w)},removeItem:function(e){$[e]&&($[e].scope().$destroy(),$[e].remove(),$[e]=null)},containerEle:function(){return s},headerBarEle:function(){return h},afterLeave:function(){l(T,function(e){B.removeItem(e)}),C.resetBackButton()},controller:function(){return C},destroy:function(){l(T,function(e){B.removeItem(e)}),s.scope().$destroy();for(var e in m)m[e]&&(m[e].removeData(),m[e]=null);p&&p.removeData(),v&&v.removeData(),g.removeData(),h.removeData(),s.remove(),s=h=g=p=v=null}};return I.push(B),B},C.navElement=function(e,t){return u(t)&&(B[e]=t),B[e]},C.update=function(e){var t=!e.hasHeaderBar&&e.showNavBar;e.transition=a.views.transition(),t||(e.direction="none"),C.enable(t);var n=C.isInitialized?p():h(),i=C.isInitialized?h():null,o=n.controller();o.enableBack(e.enableBack,!0),o.showBack(e.showBack,!0),o.updateBackButton(),C.title(e.title,n),C.showBar(t),e.navBarItems&&l(T,function(t){n.setItem(e.navBarItems[t],t)}),C.transition(n,i,e),C.isInitialized=!0},C.transition=function(e,n,i){var r=e.controller(),s=a.transitions.navBar[i.navBarTransition]||a.transitions.navBar.none,c=i.transitionId;r.beforeEnter(i);var l=s(e,n,i.direction,i.shouldAnimate&&C.isInitialized);ionic.DomUtil.cachedAttr(t,"nav-bar-transition",i.navBarTransition),ionic.DomUtil.cachedAttr(t,"nav-bar-direction",i.direction),l.shouldAnimate?v(e,"stage"):(v(e,"entering"),v(n,"leaving")),r.resetBackButton(),l.run(0),o(r.align,16),(g=function(){$===c&&(v(e,"entering"),v(n,"leaving"),l.run(1),m=function(){if($==c||!l.shouldAnimate){for(var t=0;t<I.length;t++)I[t].isActive=!1;e.isActive=!0,v(e,"active"),v(n,"cached"),m=null}},g=null)})()},C.triggerTransitionStart=function(e){$=e,g&&g()},C.triggerTransitionEnd=function(){m&&m()},C.showBar=function(t){return arguments.length&&(C.visibleBar(t),e.$parent.$hasHeader=!!t),!!e.$parent.$hasHeader},C.visibleBar=function(e){e&&!x?t.removeClass(w):!e&&x&&t.addClass(w),x=e},C.enable=function(e){C.visibleBar(e);for(var t=0;t<r._instances.length;t++)r._instances[t]!==C&&r._instances[t].visibleBar(!1)},C.showBackButton=function(t){for(var n=0;n<I.length;n++)I[n].controller().showNavBack(!!t);return e.$isBackButtonShown=!!t,e.$isBackButtonShown},C.showActiveBackButton=function(e){var t=h();t&&t.controller().showBack(e)},C.title=function(t,n){return u(t)&&(t=t||"",n=n||h(),n&&n.title(t),e.$title=t,s.currentTitle(t)),e.$title},C.align=function(e,t){t=t||h(),t&&t.controller().align(e)},C.changeTitle=function(e){c("changeTitle(val)","title(val)"),C.title(e)},C.setTitle=function(e){c("setTitle(val)","title(val)"),C.title(e)},C.getTitle=function(){return c("getTitle()","title()"),C.title()},C.back=function(){c("back()","$ionicHistory.goBack()"),s.goBack()},C.getPreviousTitle=function(){c("getPreviousTitle()","$ionicHistory.backTitle()"),s.goBack()},e.$on("$destroy",function(){e.$parent.$hasHeader=!1,t.parent().removeData(b);for(var n=0;n<I.length;n++)I[n].destroy();t.remove(),t=I=null,E()})}]),s.controller("$ionicNavView",["$scope","$element","$attrs","$compile","$controller","$ionicNavBarDelegate","$ionicNavViewDelegate","$ionicHistory","$ionicViewSwitcher",function(e,t,n,i,o,r,a,s,l){function u(){if(f)for(var e=0;e<r._instances.length;e++)if(r._instances[e].$$delegateHandle==f)return r._instances[e];return t.inheritedData("$ionNavBarController")}var d,f,h,p="$eleId",v="$destroyEle",g="$noCache",m="active",$="cached",w=this,b=!1,y=l.navViewAttr;w.scope=e,w.init=function(){var i=n.name||"",o=t.parent().inheritedData("$uiView"),r=o&&o.state?o.state.name:"";i.indexOf("@")<0&&(i=i+"@"+r);var s={name:i,state:null};t.data("$uiView",s);var c=a._registerInstance(w,n.delegateHandle);return e.$on("$destroy",c),e.$on("$ionicHistory.deselect",w.cacheCleanup),s},w.register=function(t){var n=c({},s.currentView()),i=s.register(e,t);w.update(i),w.render(i,t,n)},w.update=function(e){b=!0,d=e.direction;var n=t.parent().inheritedData("$ionNavViewController");n&&(n.isPrimary(!1),("enter"===d||"exit"===d)&&(n.direction(d),"enter"===d&&(d="none")))},w.render=function(e,t,n){var i=s.getViewById(e.viewId)||{},o=l.create(w,t,i,n);o.init(e,function(){o.transition(w.direction(),e.enableBack)})},w.beforeEnter=function(e){if(b){f=e.navBarDelegate;var t=u();t&&t.update(e)}},w.activeEleId=function(e){return arguments.length&&(h=e),h},w.transitionEnd=function(){var e,n,i,o=t.children();for(e=0,n=o.length;n>e;e++)i=o.eq(e),i.data(p)===h?y(i,m):("leaving"===y(i)||y(i)===m||y(i)===$)&&(i.data(v)||i.data(g)?l.destroyViewEle(i):y(i,$))},w.cacheCleanup=function(){for(var e=t.children(),n=0,i=e.length;i>n;n++)e.eq(n).data(v)&&l.destroyViewEle(e.eq(n))},w.clearCache=function(){for(var e,n,i=t.children(),o=0,r=i.length;r>o;o++)e=i.eq(o),y(e)==$?l.destroyViewEle(e):y(e)==m&&(n=e.scope(),n&&n.$broadcast("$ionicView.clearCache"))},w.getViewElements=function(){return t.children()},w.appendViewElement=function(n,r){var a=i(n);t.append(n);var s=e.$new();if(r&&r.$$controller){r.$scope=s;var c=o(r.$$controller,r);t.children().data("$ngControllerController",c)}return a(s),s},w.title=function(e){var t=u();t&&t.title(e)},w.enableBackButton=function(e){var t=u();t&&t.enableBackButton(e)},w.showBackButton=function(e){var t=u();t&&t.showActiveBackButton(e)},w.showBar=function(e){var t=u();t&&t.showBar(e)},w.isPrimary=function(e){return arguments.length&&(b=e),b},w.direction=function(e){return arguments.length&&(d=e),d}}]),s.controller("$ionicScroll",["$scope","scrollViewOptions","$timeout","$window","$location","$document","$ionicScrollDelegate","$ionicHistory",function(e,t,n,i,o,r,a,s){var c=this;c.__timeout=n,c._scrollViewOptions=t;var l=c.element=t.el,u=c.$element=f(l),d=c.scrollView=new ionic.views.Scroll(t);(u.parent().length?u.parent():u).data("$$ionicScrollController",c);var h=a._registerInstance(c,t.delegateHandle,function(){return s.isActiveScope(e)});angular.isDefined(t.bouncing)||ionic.Platform.ready(function(){d.options&&(d.options.bouncing=!0,ionic.Platform.isAndroid()&&(d.options.bouncing=!1,d.options.deceleration=.95))});var p=angular.bind(d,d.resize);ionic.on("resize",p,i);var v=function(t){var n=(t.originalEvent||t).detail||{};e.$onScroll&&e.$onScroll({event:t,scrollTop:n.scrollTop||0,scrollLeft:n.scrollLeft||0})};u.on("scroll",v),e.$on("$destroy",function(){h(),d.__cleanup(),ionic.off("resize",p,i),i.removeEventListener("resize",p),t=null,c._scrollViewOptions.el=null,c._scrollViewOptions=null,u.off("scroll",v),u=null,c.$element=null,l=null,c.element=null,c.scrollView=null,d=null}),n(function(){d&&d.run&&d.run()}),c.getScrollView=function(){return c.scrollView},c.getScrollPosition=function(){return c.scrollView.getValues()},c.resize=function(){return n(p).then(function(){u&&u.triggerHandler("scroll.resize")})},c.scrollTop=function(e){ionic.DomUtil.blurAll(),c.resize().then(function(){d.scrollTo(0,0,!!e)})},c.scrollBottom=function(e){ionic.DomUtil.blurAll(),c.resize().then(function(){var t=d.getScrollMax();d.scrollTo(t.left,t.top,!!e)})},c.scrollTo=function(e,t,n){ionic.DomUtil.blurAll(),c.resize().then(function(){d.scrollTo(e,t,!!n)})},c.zoomTo=function(e,t,n,i){ionic.DomUtil.blurAll(),c.resize().then(function(){d.zoomTo(e,!!t,n,i)})},c.zoomBy=function(e,t,n,i){ionic.DomUtil.blurAll(),c.resize().then(function(){d.zoomBy(e,!!t,n,i)})},c.scrollBy=function(e,t,n){ionic.DomUtil.blurAll(),c.resize().then(function(){d.scrollBy(e,t,!!n)})},c.anchorScroll=function(e){ionic.DomUtil.blurAll(),c.resize().then(function(){var t=o.hash(),n=t&&r[0].getElementById(t);if(!t||!n)return void d.scrollTo(0,0,!!e);var i=n,a=0,s=0,l=0;do null!==i&&(a+=i.offsetLeft),null!==i&&(s+=i.offsetTop),i=i.offsetParent,l++;while(i.attributes!=c.element.attributes&&i.offsetParent);d.scrollTo(a,s,!!e)})},c._setRefresher=function(e,t){var n=c.refresher=t,i=c.refresher.clientHeight||60;d.activatePullToRefresh(i,function(){n.classList.add("active"),e.$onPulling()},function(){n.classList.remove("active"),n.classList.remove("refreshing"),n.classList.remove("refreshing-tail")},function(){n.classList.add("refreshing"),e.$onRefresh()},function(){n.classList.remove("invisible")},function(){n.classList.add("invisible")},function(){n.classList.add("refreshing-tail")})}}]),s.controller("$ionicSideMenus",["$scope","$attrs","$ionicSideMenuDelegate","$ionicPlatform","$ionicBody","$ionicHistory",function(e,t,n,i,o,r){var a,s,c,l,u,d,f,h=this,p=!0;h.$scope=e,h.initialize=function(e){h.left=e.left,h.right=e.right,h.setContent(e.content),h.dragThresholdX=e.dragThresholdX||10,r.registerHistory(h.$scope)},h.setContent=function(e){e&&(h.content=e,h.content.onDrag=function(e){h._handleDrag(e)},h.content.endDrag=function(e){h._endDrag(e)})},h.isOpenLeft=function(){return h.getOpenAmount()>0},h.isOpenRight=function(){return h.getOpenAmount()<0},h.toggleLeft=function(e){if(!f&&h.left.isEnabled){var t=h.getOpenAmount();0===arguments.length&&(e=0>=t),h.content.enableAnimation(),h.openPercentage(e?100:0)}},h.toggleRight=function(e){if(!f&&h.right.isEnabled){var t=h.getOpenAmount();0===arguments.length&&(e=t>=0),h.content.enableAnimation(),h.openPercentage(e?-100:0)}},h.toggle=function(e){"right"==e?h.toggleRight():h.toggleLeft()},h.close=function(){h.openPercentage(0)},h.getOpenAmount=function(){return h.content&&h.content.getTranslateX()||0},h.getOpenRatio=function(){var e=h.getOpenAmount();return e>=0?e/h.left.width:e/h.right.width},h.isOpen=function(){return 0!==h.getOpenAmount()},h.getOpenPercentage=function(){return 100*h.getOpenRatio()},h.openPercentage=function(e){var t=e/100;if(h.left&&e>=0)h.openAmount(h.left.width*t);else if(h.right&&0>e){{h.right.width}h.openAmount(h.right.width*t)}o.enableClass(0!==e,"menu-open")},h.openAmount=function(e){var t=h.left&&h.left.width||0,n=h.right&&h.right.width||0;return(h.left&&h.left.isEnabled||!(e>0))&&(h.right&&h.right.isEnabled||!(0>e))?s&&e>t?void h.content.setTranslateX(t):a&&-n>e?void h.content.setTranslateX(-n):(h.content.setTranslateX(e),void(e>=0?(s=!0,a=!1,e>0&&(h.right&&h.right.pushDown&&h.right.pushDown(),h.left&&h.left.bringUp&&h.left.bringUp())):(a=!0,s=!1,h.right&&h.right.bringUp&&h.right.bringUp(),h.left&&h.left.pushDown&&h.left.pushDown()))):void h.content.setTranslateX(0)},h.snapToRest=function(e){h.content.enableAnimation(),c=!1;var t=h.getOpenRatio();if(0===t)return void h.openPercentage(0);var n=.3,i=e.gesture.velocityX,o=e.gesture.direction;h.openPercentage(t>0&&.5>t&&"right"==o&&n>i?0:t>.5&&"left"==o&&n>i?100:0>t&&t>-.5&&"left"==o&&n>i?0:.5>t&&"right"==o&&n>i?-100:"right"==o&&t>=0&&(t>=.5||i>n)?100:"left"==o&&0>=t&&(-.5>=t||i>n)?-100:0)},h.enableMenuWithBackViews=function(e){return arguments.length&&(p=!!e),p},h.isAsideExposed=function(){return!!f},h.exposeAside=function(e){(h.left&&h.left.isEnabled||h.right&&h.right.isEnabled)&&(h.close(),f=e,h.left&&h.left.isEnabled?h.content.setMarginLeft(f?h.left.width:0):h.right&&h.right.isEnabled&&h.content.setMarginRight(f?h.right.width:0),h.$scope.$emit("$ionicExposeAside",f))},h.activeAsideResizing=function(e){o.enableClass(e,"aside-resizing")},h._endDrag=function(e){f||(c&&h.snapToRest(e),l=null,u=null,d=null)},h._handleDrag=function(e){f||(l?u=e.gesture.touches[0].pageX:(l=e.gesture.touches[0].pageX,u=l),!c&&Math.abs(u-l)>h.dragThresholdX&&(l=u,c=!0,h.content.disableAnimation(),d=h.getOpenAmount()),c&&h.openAmount(d+(u-l)))},h.canDragContent=function(t){return arguments.length&&(e.dragContent=!!t),e.dragContent},h.edgeThreshold=25,h.edgeThresholdEnabled=!1,h.edgeDragThreshold=function(e){return arguments.length&&(angular.isNumber(e)&&e>0?(h.edgeThreshold=e,h.edgeThresholdEnabled=!0):h.edgeThresholdEnabled=!!e),h.edgeThresholdEnabled},h.isDraggableTarget=function(t){var n=h.edgeThresholdEnabled&&!h.isOpen(),i=t.gesture.startEvent&&t.gesture.startEvent.center&&t.gesture.startEvent.center.pageX,o=!n||i<=h.edgeThreshold||i>=h.content.element.offsetWidth-h.edgeThreshold,a=r.backView(),s=p?!0:!a;if(!s){var c=r.currentView()||{};return a.historyId!==c.historyId}return(e.dragContent||h.isOpen())&&o&&!t.gesture.srcEvent.defaultPrevented&&s&&!t.target.tagName.match(/input|textarea|select|object|embed/i)&&!t.target.isContentEditable&&!(t.target.dataset?t.target.dataset.preventScroll:"true"==t.target.getAttribute("data-prevent-scroll"))},e.sideMenuContentTranslateX=0;var v=angular.noop,g=angular.bind(h,h.close);e.$watch(function(){return 0!==h.getOpenAmount()},function(e){v(),e&&(v=i.registerBackButtonAction(g,$))});var m=n._registerInstance(h,t.delegateHandle,function(){return r.isActiveScope(e)});e.$on("$destroy",function(){m(),v(),h.$scope=null,h.content&&(h.content.element=null,h.content=null)
}),h.initialize({left:{width:275},right:{width:275}})}]),s.controller("$ionicTab",["$scope","$ionicHistory","$attrs","$location","$state",function(e,t,n,i,o){this.$scope=e,this.hrefMatchesState=function(){return n.href&&0===i.path().indexOf(n.href.replace(/^#/,"").replace(/\/$/,""))},this.srefMatchesState=function(){return n.uiSref&&o.includes(n.uiSref.split("(")[0])},this.navNameMatchesState=function(){return this.navViewName&&t.isCurrentStateNavView(this.navViewName)},this.tabMatchesState=function(){return this.hrefMatchesState()||this.srefMatchesState()||this.navNameMatchesState()}}]),s.controller("$ionicTabs",["$scope","$element","$ionicHistory",function(e,t,n){var i,o=this,r=null;o.tabs=[],o.selectedIndex=function(){return o.tabs.indexOf(r)},o.selectedTab=function(){return r},o.add=function(e){n.registerHistory(e),o.tabs.push(e)},o.remove=function(e){var t=o.tabs.indexOf(e);if(-1!==t){if(e.$tabSelected)if(o.deselect(e),1===o.tabs.length);else{var n=t===o.tabs.length-1?t-1:t+1;o.select(o.tabs[n])}o.tabs.splice(t,1)}},o.deselect=function(e){e.$tabSelected&&(r=i=null,e.$tabSelected=!1,(e.onDeselect||angular.noop)(),e.$broadcast&&e.$broadcast("$ionicHistory.deselect"))},o.select=function(t,a){var s;if(angular.isNumber(t)){if(s=t,s>=o.tabs.length)return;t=o.tabs[s]}else s=o.tabs.indexOf(t);1===arguments.length&&(a=!(!t.navViewName&&!t.uiSref)),r&&r.$historyId==t.$historyId?a&&n.goToHistoryRoot(t.$historyId):i!==s&&(l(o.tabs,function(e){o.deselect(e)}),r=t,i=s,o.$scope&&o.$scope.$parent&&(o.$scope.$parent.$activeHistoryId=t.$historyId),t.$tabSelected=!0,(t.onSelect||angular.noop)(),a&&e.$emit("$ionicHistory.change",{type:"tab",tabIndex:s,historyId:t.$historyId,navViewName:t.navViewName,hasNavView:!!t.navViewName,title:t.title,url:t.href,uiSref:t.uiSref}))},o.hasActiveScope=function(){for(var e=0;e<o.tabs.length;e++)if(n.isActiveScope(o.tabs[e]))return!0;return!1}}]),s.controller("$ionicView",["$scope","$element","$attrs","$compile","$rootScope","$ionicViewSwitcher",function(e,t,n,i,o){function r(){var t=u(n.viewTitle)&&"viewTitle"||u(n.title)&&"title";t&&(a(n[t]),m.push(n.$observe(t,a))),u(n.hideBackButton)&&m.push(e.$watch(n.hideBackButton,function(e){d.showBackButton(!e)})),u(n.hideNavBar)&&m.push(e.$watch(n.hideNavBar,function(e){d.showBar(!e)}))}function a(e){u(e)&&e!==p&&(p=e,d.title(p))}function s(){for(var e=0;e<m.length;e++)m[e]();m=[]}function c(t){return t?i(t)(e.$new()):void 0}function l(t){return!!e.$eval(n[t])}var d,f,h,p,v=this,g={},m=[],$=e.$on("ionNavBar.init",function(e,t){e.stopPropagation(),f=t});v.init=function(){$();var n=t.inheritedData("$ionModalController");d=t.inheritedData("$ionNavViewController"),d&&!n&&(e.$on("$ionicView.beforeEnter",v.beforeEnter),e.$on("$ionicView.afterEnter",r),e.$on("$ionicView.beforeLeave",s))},v.beforeEnter=function(t,i){if(i&&!i.viewNotified){i.viewNotified=!0,o.$$phase||e.$digest(),p=u(n.viewTitle)?n.viewTitle:n.title;var r={};for(var a in g)r[a]=c(g[a]);d.beforeEnter({title:p,direction:i.direction,transition:i.transition,navBarTransition:i.navBarTransition,transitionId:i.transitionId,shouldAnimate:i.shouldAnimate,enableBack:i.enableBack,showBack:!l("hideBackButton"),navBarItems:r,navBarDelegate:f||null,showNavBar:!l("hideNavBar"),hasHeaderBar:!!h}),s()}},v.navElement=function(e,t){g[e]=t}}]),s.directive("ionActionSheet",["$document",function(e){return{restrict:"E",scope:!0,replace:!0,link:function(t,n){var i=function(e){27==e.which&&(t.cancel(),t.$apply())},o=function(e){e.target==n[0]&&(t.cancel(),t.$apply())};t.$on("$destroy",function(){n.remove(),e.unbind("keyup",i)}),e.bind("keyup",i),n.bind("click",o)},template:'<div class="action-sheet-backdrop"><div class="action-sheet-wrapper"><div class="action-sheet"><div class="action-sheet-group"><div class="action-sheet-title" ng-if="titleText" ng-bind-html="titleText"></div><button class="button" ng-click="buttonClicked($index)" ng-repeat="button in buttons" ng-bind-html="button.text"></button></div><div class="action-sheet-group" ng-if="destructiveText"><button class="button destructive" ng-click="destructiveButtonClicked()" ng-bind-html="destructiveText"></button></div><div class="action-sheet-group" ng-if="cancelText"><button class="button" ng-click="cancel()" ng-bind-html="cancelText"></button></div></div></div></div>'}}]),s.directive("ionCheckbox",["$ionicConfig",function(e){return{restrict:"E",replace:!0,require:"?ngModel",transclude:!0,template:'<label class="item item-checkbox"><div class="checkbox checkbox-input-hidden disable-pointer-events"><input type="checkbox"><i class="checkbox-icon"></i></div><div class="item-content disable-pointer-events" ng-transclude></div></label>',compile:function(t,n){var i=t.find("input");l({name:n.name,"ng-value":n.ngValue,"ng-model":n.ngModel,"ng-checked":n.ngChecked,"ng-disabled":n.ngDisabled,"ng-true-value":n.ngTrueValue,"ng-false-value":n.ngFalseValue,"ng-change":n.ngChange},function(e,t){u(e)&&i.attr(t,e)});var o=t[0].querySelector(".checkbox");o.classList.add("checkbox-"+e.form.checkbox())}}}]);var T="Cannot create a collection-repeat within a scrollView that is scrollable on both x and y axis.  Choose either x direction or y direction.",C="collection-repeat expected attribute collection-item-height to be a an expression that returns a number (in pixels) or percentage.",I="collection-repeat expected attribute collection-item-width to be a an expression that returns a number (in pixels) or percentage.",B="collection-repeat expected expression in form of '_item_ in _collection_[ track by _id_]' but got '%'";s.directive("collectionRepeat",["$collectionRepeatManager","$collectionDataSource","$parse",function(e,t,n){return{priority:1e3,transclude:"element",terminal:!0,$$tlb:!0,require:["^$ionicScroll","^?ionNavView"],controller:[function(){}],link:function(i,o,r,a,s){function c(e){var t=[],n=[],i=!0;l(H.children,function(e){if(ionic.DomUtil.elementIsDescendant(o[0],e,H))i=!1;else{if(e.hasAttribute("collection-repeat-ignore"))return;var r=e.offsetWidth,a=e.offsetHeight;if(r&&a){var s=f(e);(i?t:n).push({width:e.offsetWidth,height:e.offsetHeight,element:s,scope:s.isolateScope()||s.scope(),isOutside:!0})}}}),m.resize(),A.setData(e,t,n),D.resize()}function u(){c(L(i)),P=!H.clientWidth&&!H.clientHeight}function h(){P&&u()}var p=a[0],v=a[1],g=f('<div style="position:relative;">');o.parent()[0].insertBefore(g[0],o[0]),g.append(o);var m=p.scrollView;if(m.options.scrollingX&&m.options.scrollingY)throw new Error(T);var $=!!m.options.scrollingY;if($&&!r.collectionItemHeight)throw new Error(C);if(!$&&!r.collectionItemWidth)throw new Error(I);var w=n(r.collectionItemHeight||'"100%"'),b=n(r.collectionItemWidth||'"100%"'),y=function(e,t){var n=w(e,t);return d(n)&&n.indexOf("%")>-1?Math.floor(parseInt(n)/100*m.__clientHeight):parseInt(n)},S=function(e,t){var n=b(e,t);return d(n)&&n.indexOf("%")>-1?Math.floor(parseInt(n)/100*m.__clientWidth):parseInt(n)},k=r.collectionRepeat.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw new Error(B.replace("%",r.collectionRepeat));var x=k[1],V=k[2],E=k[3],A=new t({scope:i,transcludeFn:s,transcludeParent:o.parent(),keyExpr:x,listExpr:V,trackByExpr:E,heightGetter:y,widthGetter:S}),D=new e({dataSource:A,element:p.$element,scrollView:p.scrollView}),L=n(V);i.$watchCollection(L,function(e){if(e&&!angular.isArray(e))throw new Error("collection-repeat expects an array to repeat over, but instead got '"+typeof e+"'.");c(e)});var P,H=p.scrollView.__content;p.$element.on("scroll.resize",u),ionic.on("resize",u,window);var N;v&&(N=v.scope.$on("$ionicView.afterEnter",h)),i.$on("$destroy",function(){D.destroy(),A.destroy(),ionic.off("resize",u,window),(N||angular.noop)()})}}}]).directive({ngSrc:e("ngSrc","src"),ngSrcset:e("ngSrcset","srcset"),ngHref:e("ngHref","href")}),s.directive("ionContent",["$timeout","$controller","$ionicBind",function(e,t,n){return{restrict:"E",require:"^?ionNavView",scope:!0,priority:800,compile:function(e,i){function o(e,o,a){var s=e.$parent;if(e.$watch(function(){return(s.$hasHeader?" has-header":"")+(s.$hasSubheader?" has-subheader":"")+(s.$hasFooter?" has-footer":"")+(s.$hasSubfooter?" has-subfooter":"")+(s.$hasTabs?" has-tabs":"")+(s.$hasTabsTop?" has-tabs-top":"")},function(e,t){o.removeClass(t),o.addClass(e)}),e.$hasHeader=e.$hasSubheader=e.$hasFooter=e.$hasSubfooter=e.$hasTabs=e.$hasTabsTop=!1,n(e,a,{$onScroll:"&onScroll",$onScrollComplete:"&onScrollComplete",hasBouncing:"@",padding:"@",direction:"@",scrollbarX:"@",scrollbarY:"@",startX:"@",startY:"@",scrollEventInterval:"@"}),e.direction=e.direction||"y",angular.isDefined(a.padding)&&e.$watch(a.padding,function(e){(r||o).toggleClass("padding",!!e)}),"false"===a.scroll);else if("true"===i.overflowScroll)o.addClass("overflow-scroll");else{var c={el:o[0],delegateHandle:i.delegateHandle,locking:"true"===(i.locking||"true"),bouncing:e.$eval(e.hasBouncing),startX:e.$eval(e.startX)||0,startY:e.$eval(e.startY)||0,scrollbarX:e.$eval(e.scrollbarX)!==!1,scrollbarY:e.$eval(e.scrollbarY)!==!1,scrollingX:e.direction.indexOf("x")>=0,scrollingY:e.direction.indexOf("y")>=0,scrollEventInterval:parseInt(e.scrollEventInterval,10)||10,scrollingComplete:function(){e.$onScrollComplete({scrollTop:this.__scrollTop,scrollLeft:this.__scrollLeft})}};t("$ionicScroll",{$scope:e,scrollViewOptions:c}),e.$on("$destroy",function(){c.scrollingComplete=angular.noop,delete c.el,r=null,o=null,i.$$element=null})}}var r;return e.addClass("scroll-content ionic-scroll"),"false"!=i.scroll?(r=f('<div class="scroll"></div>'),r.append(e.contents()),e.append(r)):e.addClass("scroll-content-false"),{pre:o}}}}]),s.directive("exposeAsideWhen",["$window",function(e){return{restrict:"A",require:"^ionSideMenus",link:function(t,n,i,o){function r(){var t="large"==i.exposeAsideWhen?"(min-width:768px)":i.exposeAsideWhen;o.exposeAside(e.matchMedia(t).matches),o.activeAsideResizing(!1)}function a(){o.activeAsideResizing(!0),s()}var s=ionic.debounce(function(){t.$apply(function(){r()})},300,!1);r(),ionic.on("resize",a,e),t.$on("$destroy",function(){ionic.off("resize",a,e)})}}}]);var x="onHold onTap onTouch onRelease onDrag onDragUp onDragRight onDragDown onDragLeft onSwipe onSwipeUp onSwipeRight onSwipeDown onSwipeLeft".split(" ");x.forEach(function(e){s.directive(e,t(e))}),s.directive("ionHeaderBar",n()).directive("ionHeaderBar",i(!0)).directive("ionFooterBar",i(!1)),s.directive("ionInfiniteScroll",["$timeout",function(e){function t(e,t,n){return n?t*(1-parseFloat(e,10)/100):t-parseFloat(e,10)}return{restrict:"E",require:["^$ionicScroll","ionInfiniteScroll"],template:'<i class="icon {{icon()}} icon-refreshing"></i>',scope:{load:"&onInfinite"},controller:["$scope","$attrs",function(e,n){this.isLoading=!1,this.scrollView=null,this.getMaxScroll=function(){var e=(n.distance||"2.5%").trim(),i=-1!==e.indexOf("%"),o=this.scrollView.getScrollMax();return{left:this.scrollView.options.scrollingX?t(e,o.left,i):-1,top:this.scrollView.options.scrollingY?t(e,o.top,i):-1}}}],link:function(t,n,i,o){function r(){if(!s.isLoading){var e=c.getValues(),t=s.getMaxScroll();(-1!==t.left&&e.left>=t.left||-1!==t.top&&e.top>=t.top)&&l()}}var a=o[0],s=o[1],c=s.scrollView=a.scrollView;t.icon=function(){return angular.isDefined(i.icon)?i.icon:"ion-loading-d"};var l=function(){n[0].classList.add("active"),s.isLoading=!0,t.load()},u=function(){n[0].classList.remove("active"),e(function(){c.resize(),d()},0,!1),s.isLoading=!1};t.$on("scroll.infiniteScrollComplete",function(){u()}),t.$on("$destroy",function(){a&&a.$element&&a.$element.off("scroll",d)});var d=ionic.animationFrameThrottle(r);e(d,0,!1),a.$element.on("scroll",d)}}}]);var V='<a class="item-content" ng-href="{{$href()}}" target="{{$target()}}"></a>',E='<div class="item-content"></div>';s.directive("ionItem",function(){return{restrict:"E",controller:["$scope","$element",function(e,t){this.$scope=e,this.$element=t}],scope:!0,compile:function(e,t){var n=angular.isDefined(t.href)||angular.isDefined(t.ngHref)||angular.isDefined(t.uiSref),i=n||/ion-(delete|option|reorder)-button/i.test(e.html());if(i){var o=f(n?V:E);o.append(e.contents()),e.append(o),e.addClass("item item-complex")}else e.addClass("item");return function(e,t,n){e.$href=function(){return n.href||n.ngHref},e.$target=function(){return n.target||"_self"}}}}});var A='<div class="item-left-edit item-delete enable-pointer-events"></div>';s.directive("ionDeleteButton",function(){return{restrict:"E",require:["^ionItem","^?ionList"],priority:Number.MAX_VALUE,compile:function(e,t){return t.$set("class",(t["class"]||"")+" button icon button-icon",!0),function(e,t,n,i){var o=i[0],r=i[1],a=f(A);a.append(t),o.$element.append(a).addClass("item-left-editable"),r&&r.showDelete()&&a.addClass("visible active")}}}}),s.directive("itemFloatingLabel",function(){return{restrict:"C",link:function(e,t){var n=t[0],i=n.querySelector("input, textarea"),o=n.querySelector(".input-label");if(i&&o){var r=function(){i.value?o.classList.add("has-input"):o.classList.remove("has-input")};i.addEventListener("input",r);var a=angular.element(i).controller("ngModel");a&&(a.$render=function(){i.value=a.$viewValue||"",r()}),e.$on("$destroy",function(){i.removeEventListener("input",r)})}}}});var D='<div class="item-options invisible"></div>';s.directive("ionOptionButton",["$compile",function(){function e(e){e.stopPropagation()}return{restrict:"E",require:"^ionItem",priority:Number.MAX_VALUE,compile:function(t,n){return n.$set("class",(n["class"]||"")+" button",!0),function(t,n,i,o){o.optionsContainer||(o.optionsContainer=f(D),o.$element.append(o.optionsContainer)),o.optionsContainer.append(n),o.$element.addClass("item-right-editable"),n.on("click",e)}}}}]);var L='<div data-prevent-scroll="true" class="item-right-edit item-reorder enable-pointer-events"></div>';s.directive("ionReorderButton",["$parse",function(e){return{restrict:"E",require:["^ionItem","^?ionList"],priority:Number.MAX_VALUE,compile:function(t,n){return n.$set("class",(n["class"]||"")+" button icon button-icon",!0),t[0].setAttribute("data-prevent-scroll",!0),function(t,n,i,o){var r=o[0],a=o[1],s=e(i.onReorder);t.$onReorder=function(e,n){s(t,{$fromIndex:e,$toIndex:n})},i.ngClick||i.onClick||i.onclick||(n[0].onclick=function(e){return e.stopPropagation(),!1});var c=f(L);c.append(n),r.$element.append(c).addClass("item-right-editable"),a&&a.showReorder()&&c.addClass("visible active")}}}}]),s.directive("keyboardAttach",function(){return function(e,t){function n(e){if(!ionic.Platform.isAndroid()||ionic.Platform.isFullScreen){var n=e.keyboardHeight||e.detail.keyboardHeight;t.css("bottom",n+"px"),r=t.controller("$ionicScroll"),r&&(r.scrollView.__container.style.bottom=n+o(t[0])+"px")}}function i(){(!ionic.Platform.isAndroid()||ionic.Platform.isFullScreen)&&(t.css("bottom",""),r&&(r.scrollView.__container.style.bottom=""))}ionic.on("native.keyboardshow",n,window),ionic.on("native.keyboardhide",i,window),ionic.on("native.showkeyboard",n,window),ionic.on("native.hidekeyboard",i,window);var r;e.$on("$destroy",function(){ionic.off("native.keyboardshow",n,window),ionic.off("native.keyboardhide",i,window),ionic.off("native.showkeyboard",n,window),ionic.off("native.hidekeyboard",i,window)})}}),s.directive("ionList",["$timeout",function(e){return{restrict:"E",require:["ionList","^?$ionicScroll"],controller:"$ionicList",compile:function(t,n){var i=f('<div class="list">').append(t.contents()).addClass(n.type);return t.append(i),function(t,i,o,r){function a(){function o(e,t){t()&&e.addClass("visible")||e.removeClass("active"),ionic.requestAnimationFrame(function(){t()&&e.addClass("active")||e.removeClass("visible")})}var r=s.listView=new ionic.views.ListView({el:i[0],listEl:i.children()[0],scrollEl:c&&c.element,scrollView:c&&c.scrollView,onReorder:function(t,n,i){var o=f(t).scope();o&&o.$onReorder&&e(function(){o.$onReorder(n,i)})},canSwipe:function(){return s.canSwipeItems()}});t.$on("$destroy",function(){r&&(r.deregister&&r.deregister(),r=null)}),u(n.canSwipe)&&t.$watch("!!("+n.canSwipe+")",function(e){s.canSwipeItems(e)}),u(n.showDelete)&&t.$watch("!!("+n.showDelete+")",function(e){s.showDelete(e)}),u(n.showReorder)&&t.$watch("!!("+n.showReorder+")",function(e){s.showReorder(e)}),t.$watch(function(){return s.showDelete()},function(e,t){if(e||t){e&&s.closeOptionButtons(),s.canSwipeItems(!e),i.children().toggleClass("list-left-editing",e),i.toggleClass("disable-pointer-events",e);var n=f(i[0].getElementsByClassName("item-delete"));o(n,s.showDelete)}}),t.$watch(function(){return s.showReorder()},function(e,t){if(e||t){e&&s.closeOptionButtons(),s.canSwipeItems(!e),i.children().toggleClass("list-right-editing",e),i.toggleClass("disable-pointer-events",e);var n=f(i[0].getElementsByClassName("item-reorder"));o(n,s.showReorder)}})}var s=r[0],c=r[1];e(a)}}}}]),s.directive("menuClose",["$ionicHistory",function(e){return{restrict:"AC",link:function(t,n){n.bind("click",function(){var t=n.inheritedData("$ionSideMenusController");t&&(e.nextViewOptions({historyRoot:!0,disableAnimate:!0,expire:300}),t.close())})}}}]),s.directive("menuToggle",function(){return{restrict:"AC",link:function(e,t,n){e.$on("$ionicView.beforeEnter",function(e,n){if(n.enableBack){var i=t.inheritedData("$ionSideMenusController");i.enableMenuWithBackViews()||t.addClass("hide")}else t.removeClass("hide")}),t.bind("click",function(){var e=t.inheritedData("$ionSideMenusController");e&&e.toggle(n.menuToggle)})}}}),s.directive("ionModal",[function(){return{restrict:"E",transclude:!0,replace:!0,controller:[function(){}],template:'<div class="modal-backdrop"><div class="modal-wrapper" ng-transclude></div></div>'}}]),s.directive("ionModalView",function(){return{restrict:"E",compile:function(e){e.addClass("modal")}}}),s.directive("ionNavBackButton",["$ionicConfig","$document",function(e,t){return{restrict:"E",require:"^ionNavBar",compile:function(n,i){function o(e){return/ion-|icon/.test(e.className)}var r=t[0].createElement("button");for(var a in i.$attr)r.setAttribute(i.$attr[a],i[a]);i.ngClick||r.setAttribute("ng-click","$ionicGoBack($event)"),r.className="button back-button hide buttons "+(n.attr("class")||""),r.innerHTML=n.html()||"";for(var s,c,l,u,d=o(n[0]),f=0;f<n[0].childNodes.length;f++)s=n[0].childNodes[f],1===s.nodeType?o(s)?d=!0:s.classList.contains("default-title")?l=!0:s.classList.contains("previous-title")&&(u=!0):c||3!==s.nodeType||(c=!!s.nodeValue.trim());var h=e.backButton.icon();if(!d&&h&&"none"!==h&&(r.innerHTML='<i class="icon '+h+'"></i> '+r.innerHTML,r.className+=" button-clear"),!c){var p=t[0].createElement("span");p.className="back-text",!l&&e.backButton.text()&&(p.innerHTML+='<span class="default-title">'+e.backButton.text()+"</span>"),!u&&e.backButton.previousTitleText()&&(p.innerHTML+='<span class="previous-title"></span>'),r.appendChild(p)}return n.attr("class","hide"),n.empty(),{pre:function(e,t,n,i){i.navElement("backButton",r.outerHTML),r=null}}}}}]),s.directive("ionNavBar",function(){return{restrict:"E",controller:"$ionicNavBar",scope:!0,link:function(e,t,n,i){i.init()}}}),s.directive("ionNavButtons",["$document",function(e){return{require:"^ionNavBar",restrict:"E",compile:function(t,n){var i="left";/^primary|secondary|right$/i.test(n.side||"")&&(i=n.side.toLowerCase());var o=e[0].createElement("span");o.className=i+"-buttons",o.innerHTML=t.html();var r=i+"Buttons";return t.attr("class","hide"),t.empty(),{pre:function(e,t,n,i){var a=t.parent().data("$ionViewController");a?a.navElement(r,o.outerHTML):i.navElement(r,o.outerHTML),o=null}}}}}]),s.directive("navDirection",["$ionicViewSwitcher",function(e){return{restrict:"A",priority:1e3,link:function(t,n,i){n.bind("click",function(){e.nextDirection(i.navDirection)})}}}]),s.directive("ionNavTitle",["$document",function(e){return{require:"^ionNavBar",restrict:"E",compile:function(t,n){var i="title",o=e[0].createElement("span");for(var r in n.$attr)o.setAttribute(n.$attr[r],n[r]);return o.classList.add("nav-bar-title"),o.innerHTML=t.html(),t.attr("class","hide"),t.empty(),{pre:function(e,t,n,r){var a=t.parent().data("$ionViewController");a?a.navElement(i,o.outerHTML):r.navElement(i,o.outerHTML),o=null}}}}}]),s.directive("navTransition",["$ionicViewSwitcher",function(e){return{restrict:"A",priority:1e3,link:function(t,n,i){n.bind("click",function(){e.nextTransition(i.navTransition)})}}}]),s.directive("ionNavView",["$state","$ionicConfig",function(e,t){return{restrict:"E",terminal:!0,priority:2e3,transclude:!0,controller:"$ionicNavView",compile:function(n,i,o){return n.addClass("view-container"),ionic.DomUtil.cachedAttr(n,"nav-view-transition",t.views.transition()),function(t,n,i,r){function a(t){var n=e.$current&&e.$current.locals[c.name];n&&(t||n!==s)&&(s=n,c.state=n.$$state,r.register(n))}var s;o(t,function(e){n.append(e)});var c=r.init();t.$on("$stateChangeSuccess",function(){a(!1)}),t.$on("$viewContentLoading",function(){a(!1)}),a(!0)}}}}]),s.config(["$provide",function(e){e.decorator("ngClickDirective",["$delegate",function(e){return e.shift(),e}])}]).factory("$ionicNgClick",["$parse",function(e){return function(t,n,i){var o=angular.isFunction(i)?i:e(i);n.on("click",function(e){t.$apply(function(){o(t,{$event:e})})}),n.onclick=function(){}}}]).directive("ngClick",["$ionicNgClick",function(e){return function(t,n,i){e(t,n,i.ngClick)}}]).directive("ionStopEvent",function(){return{restrict:"A",link:function(e,t,n){t.bind(n.ionStopEvent,r)}}}),s.directive("ionPane",function(){return{restrict:"E",link:function(e,t){t.addClass("pane")}}}),s.directive("ionPopover",[function(){return{restrict:"E",transclude:!0,replace:!0,controller:[function(){}],template:'<div class="popover-backdrop"><div class="popover-wrapper" ng-transclude></div></div>'}}]),s.directive("ionPopoverView",function(){return{restrict:"E",compile:function(e){e.append(angular.element('<div class="popover-arrow"></div>')),e.addClass("popover")}}}),s.directive("ionRadio",function(){return{restrict:"E",replace:!0,require:"?ngModel",transclude:!0,template:'<label class="item item-radio"><input type="radio" name="radio-group"><div class="item-content disable-pointer-events" ng-transclude></div><i class="radio-icon disable-pointer-events icon ion-checkmark"></i></label>',compile:function(e,t){t.icon&&e.children().eq(2).removeClass("ion-checkmark").addClass(t.icon);var n=e.find("input");return l({name:t.name,value:t.value,disabled:t.disabled,"ng-value":t.ngValue,"ng-model":t.ngModel,"ng-disabled":t.ngDisabled,"ng-change":t.ngChange},function(e,t){u(e)&&n.attr(t,e)}),function(e,t,n){e.getValue=function(){return e.ngValue||n.value}}}}}),s.directive("ionRefresher",["$ionicBind",function(e){return{restrict:"E",replace:!0,require:"^$ionicScroll",template:'<div class="scroll-refresher" collection-repeat-ignore><div class="ionic-refresher-content" ng-class="{\'ionic-refresher-with-text\': pullingText || refreshingText}"><div class="icon-pulling" ng-class="{\'pulling-rotation-disabled\':disablePullingRotation}"><i class="icon {{pullingIcon}}"></i></div><div class="text-pulling" ng-bind-html="pullingText"></div><div class="icon-refreshing"><i class="icon {{refreshingIcon}}"></i></div><div class="text-refreshing" ng-bind-html="refreshingText"></div></div></div>',compile:function(t,n){return angular.isUndefined(n.pullingIcon)&&n.$set("pullingIcon","ion-ios7-arrow-down"),angular.isUndefined(n.refreshingIcon)&&n.$set("refreshingIcon","ion-loading-d"),function(t,n,i,o){e(t,i,{pullingIcon:"@",pullingText:"@",refreshingIcon:"@",refreshingText:"@",disablePullingRotation:"@",$onRefresh:"&onRefresh",$onPulling:"&onPulling"}),o._setRefresher(t,n[0]),t.$on("scroll.refreshComplete",function(){t.$evalAsync(function(){o.scrollView.finishPullToRefresh()})})}}}}]),s.directive("ionScroll",["$timeout","$controller","$ionicBind",function(e,t,n){return{restrict:"E",scope:!0,controller:function(){},compile:function(e){function i(e,i,r){var a,s;n(e,r,{direction:"@",paging:"@",$onScroll:"&onScroll",scroll:"@",scrollbarX:"@",scrollbarY:"@",zooming:"@",minZoom:"@",maxZoom:"@"}),e.direction=e.direction||"y",angular.isDefined(r.padding)&&e.$watch(r.padding,function(e){o.toggleClass("padding",!!e)}),e.$eval(e.paging)===!0&&o.addClass("scroll-paging"),e.direction||(e.direction="y");var c=e.$eval(e.paging)===!0,l={el:i[0],delegateHandle:r.delegateHandle,locking:"true"===(r.locking||"true"),bouncing:e.$eval(r.hasBouncing),paging:c,scrollbarX:e.$eval(e.scrollbarX)!==!1,scrollbarY:e.$eval(e.scrollbarY)!==!1,scrollingX:e.direction.indexOf("x")>=0,scrollingY:e.direction.indexOf("y")>=0,zooming:e.$eval(e.zooming)===!0,maxZoom:e.$eval(e.maxZoom)||3,minZoom:e.$eval(e.minZoom)||.5,preventDefault:!0};c&&(l.speedMultiplier=.8,l.bouncing=!1),s=t("$ionicScroll",{$scope:e,scrollViewOptions:l}),a=e.$parent.scrollView=s.scrollView}e.addClass("scroll-view ionic-scroll");var o=f('<div class="scroll"></div>');return o.append(e.contents()),e.append(o),{pre:i}}}}]),s.directive("ionSideMenu",function(){return{restrict:"E",require:"^ionSideMenus",scope:!0,compile:function(e,t){return angular.isUndefined(t.isEnabled)&&t.$set("isEnabled","true"),angular.isUndefined(t.width)&&t.$set("width","275"),e.addClass("menu menu-"+t.side),function(e,n,i,o){e.side=i.side||"left";var r=o[e.side]=new ionic.views.SideMenu({width:t.width,el:n[0],isEnabled:!0});e.$watch(i.width,function(e){var t=+e;t&&t==e&&r.setWidth(+e)}),e.$watch(i.isEnabled,function(e){r.setIsEnabled(!!e)})}}}}),s.directive("ionSideMenuContent",["$timeout","$ionicGesture","$window",function(e,t,n){return{restrict:"EA",require:"^ionSideMenus",scope:!0,compile:function(i,o){function r(r,a,s,c){function l(e){0!==c.getOpenAmount()?(c.close(),e.gesture.srcEvent.preventDefault(),v=null,g=null):v||(v=ionic.tap.pointerCoord(e.gesture.srcEvent))}function d(e){c.isDraggableTarget(e)&&"x"==p(e)&&(c._handleDrag(e),e.gesture.srcEvent.preventDefault())}function f(e){"x"==p(e)&&e.gesture.srcEvent.preventDefault()}function h(e){c._endDrag(e),v=null,g=null}function p(e){if(g)return g;if(e&&e.gesture){if(v){var t=ionic.tap.pointerCoord(e.gesture.srcEvent),n=Math.abs(t.x-v.x),i=Math.abs(t.y-v.y),o=i>n?"y":"x";return Math.max(n,i)>30&&(g=o),o}v=ionic.tap.pointerCoord(e.gesture.srcEvent)}return"y"}var v=null,g=null;u(o.dragContent)?r.$watch(o.dragContent,function(e){c.canDragContent(e)}):c.canDragContent(!0),u(o.edgeDragThreshold)&&r.$watch(o.edgeDragThreshold,function(e){c.edgeDragThreshold(e)});var m={element:i[0],onDrag:function(){},endDrag:function(){},getTranslateX:function(){return r.sideMenuContentTranslateX||0},setTranslateX:ionic.animationFrameThrottle(function(t){var n=m.offsetX+t;a[0].style[ionic.CSS.TRANSFORM]="translate3d("+n+"px,0,0)",e(function(){r.sideMenuContentTranslateX=t})}),setMarginLeft:ionic.animationFrameThrottle(function(e){e?(e=parseInt(e,10),a[0].style[ionic.CSS.TRANSFORM]="translate3d("+e+"px,0,0)",a[0].style.width=n.innerWidth-e+"px",m.offsetX=e):(a[0].style[ionic.CSS.TRANSFORM]="translate3d(0,0,0)",a[0].style.width="",m.offsetX=0)}),setMarginRight:ionic.animationFrameThrottle(function(e){e?(e=parseInt(e,10),a[0].style.width=n.innerWidth-e+"px",m.offsetX=e):(a[0].style.width="",m.offsetX=0),a[0].style[ionic.CSS.TRANSFORM]="translate3d(0,0,0)"}),enableAnimation:function(){r.animationEnabled=!0,a[0].classList.add("menu-animated")},disableAnimation:function(){r.animationEnabled=!1,a[0].classList.remove("menu-animated")},offsetX:0};c.setContent(m);var $={stop_browser_behavior:!1},w=t.on("tap",l,a,$),b=t.on("dragright",d,a,$),y=t.on("dragleft",d,a,$),S=t.on("dragup",f,a,$),k=t.on("dragdown",f,a,$),T=t.on("release",h,a,$);r.$on("$destroy",function(){m&&(m.element=null,m=null),t.off(y,"dragleft",d),t.off(b,"dragright",d),t.off(S,"dragup",f),t.off(k,"dragdown",f),t.off(T,"release",h),t.off(w,"tap",l)})}return i.addClass("menu-content pane"),{pre:r}}}}]),s.directive("ionSideMenus",["$ionicBody",function(e){return{restrict:"ECA",controller:"$ionicSideMenus",compile:function(t,n){function i(t,n,i,o){o.enableMenuWithBackViews(t.$eval(i.enableMenuWithBackViews)),t.$on("$ionicExposeAside",function(n,i){t.$exposeAside||(t.$exposeAside={}),t.$exposeAside.active=i,e.enableClass(i,"aside-open")}),t.$on("$ionicView.beforeEnter",function(e,n){n.historyId&&(t.$activeHistoryId=n.historyId)}),t.$on("$destroy",function(){e.removeClass("menu-open","aside-open")})}return n.$set("class",(n["class"]||"")+" view"),{pre:i}}}}]),s.directive("ionSlideBox",["$timeout","$compile","$ionicSlideBoxDelegate","$ionicHistory",function(e,t,n,i){return{restrict:"E",replace:!0,transclude:!0,scope:{autoPlay:"=",doesContinue:"@",slideInterval:"@",showPager:"@",pagerClick:"&",disableScroll:"@",onSlideChanged:"&",activeSlide:"=?"},controller:["$scope","$element","$attrs",function(t,o,r){var a=t.$eval(t.doesContinue)===!0,s=u(r.autoPlay)?!!t.autoPlay:!1,c=s?t.$eval(t.slideInterval)||4e3:0,l=new ionic.views.Slider({el:o[0],auto:c,continuous:a,startSlide:t.activeSlide,slidesChanged:function(){t.currentSlide=l.currentIndex(),e(function(){})},callback:function(n){t.currentSlide=n,t.onSlideChanged({index:t.currentSlide,$index:t.currentSlide}),t.$parent.$broadcast("slideBox.slideChanged",n),t.activeSlide=n,e(function(){})}});l.enableSlide(t.$eval(r.disableScroll)!==!0),t.$watch("activeSlide",function(e){angular.isDefined(e)&&l.slide(e)}),t.$on("slideBox.nextSlide",function(){l.next()}),t.$on("slideBox.prevSlide",function(){l.prev()}),t.$on("slideBox.setSlide",function(e,t){l.slide(t)}),this.__slider=l;var d=n._registerInstance(l,r.delegateHandle,function(){return i.isActiveScope(t)});t.$on("$destroy",d),this.slidesCount=function(){return l.slidesCount()},this.onPagerClick=function(e){t.pagerClick({index:e})},e(function(){l.load()})}],template:'<div class="slider"><div class="slider-slides" ng-transclude></div></div>',link:function(e,n){if(e.$eval(e.showPager)!==!1){var i=e.$new(),o=f("<ion-pager></ion-pager>");n.append(o),t(o)(i)}}}}]).directive("ionSlide",function(){return{restrict:"E",require:"^ionSlideBox",compile:function(e){return e.addClass("slider-slide"),function(){}}}}).directive("ionPager",function(){return{restrict:"E",replace:!0,require:"^ionSlideBox",template:'<div class="slider-pager"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span></div>',link:function(e,t,n,i){var o=function(e){for(var n=t[0].children,i=n.length,o=0;i>o;o++)o==e?n[o].classList.add("active"):n[o].classList.remove("active")};e.pagerClick=function(e){i.onPagerClick(e)},e.numSlides=function(){return new Array(i.slidesCount())},e.$watch("currentSlide",function(e){o(e)})}}}),s.directive("ionTab",["$compile","$ionicConfig","$ionicBind","$ionicViewSwitcher",function(e,t,n,i){function o(e,t){return angular.isDefined(t)?" "+e+'="'+t+'"':""}return{restrict:"E",require:["^ionTabs","ionTab"],controller:"$ionicTab",scope:!0,compile:function(r,a){for(var s="<ion-tab-nav"+o("ng-click",a.ngClick)+o("title",a.title)+o("icon",a.icon)+o("icon-on",a.iconOn)+o("icon-off",a.iconOff)+o("badge",a.badge)+o("badge-style",a.badgeStyle)+o("hidden",a.hidden)+o("class",a["class"])+"></ion-tab-nav>",c=document.createElement("div"),l=0;l<r[0].children.length;l++)c.appendChild(r[0].children[l].cloneNode(!0));var u=c.childElementCount;r.empty();var d,h;return u&&("ION-NAV-VIEW"===c.children[0].tagName&&(d=c.children[0].getAttribute("name"),c.children[0].classList.add("view-container"),h=!0),1===u&&(c=c.children[0]),h||c.classList.add("pane"),c.classList.add("tab-content")),function(o,r,a,l){function h(){w.tabMatchesState()&&$.select(o,!1)}function p(n){n&&u?(b||(g=o.$new(),m=f(c),i.viewEleIsActive(m,!0),$.$element.append(m),e(m)(g),b=!0),i.viewEleIsActive(m,!0)):b&&m&&(t.views.maxCache()>0?i.viewEleIsActive(m,!1):v())}function v(){g&&g.$destroy(),b&&m&&m.remove(),b=g=m=null}var g,m,$=l[0],w=l[1],b=!1;n(o,a,{onSelect:"&",onDeselect:"&",title:"@",uiSref:"@",href:"@"}),$.add(o),o.$on("$destroy",function(){o.$tabsDestroy||$.remove(o),y.isolateScope().$destroy(),y.remove(),y=c=m=null
}),r[0].removeAttribute("title"),d&&(w.navViewName=o.navViewName=d),o.$on("$stateChangeSuccess",h),h();var y=f(s);y.data("$ionTabsController",$),y.data("$ionTabController",w),$.$tabsElement.append(e(y)(o)),o.$watch("$tabSelected",p),o.$on("$ionicView.afterEnter",function(){i.viewEleIsActive(m,o.$tabSelected)}),o.$on("$ionicView.clearCache",function(){o.$tabSelected||v()})}}}}]),s.directive("ionTabNav",[function(){return{restrict:"E",replace:!0,require:["^ionTabs","^ionTab"],template:'<a ng-class="{\'tab-item-active\': isTabActive(), \'has-badge\':badge, \'tab-hidden\':isHidden()}"  class="tab-item"><span class="badge {{badgeStyle}}" ng-if="badge">{{badge}}</span><i class="icon {{getIconOn()}}" ng-if="getIconOn() && isTabActive()"></i><i class="icon {{getIconOff()}}" ng-if="getIconOff() && !isTabActive()"></i><span class="tab-title" ng-bind-html="title"></span></a>',scope:{title:"@",icon:"@",iconOn:"@",iconOff:"@",badge:"=",hidden:"@",badgeStyle:"@","class":"@"},compile:function(){return function(e,t,n,i){var o=i[0],r=i[1];t[0].removeAttribute("title"),e.selectTab=function(e){e.preventDefault(),o.select(r.$scope,!0)},n.ngClick||t.on("click",function(t){e.$apply(function(){e.selectTab(t)})}),e.isHidden=function(){return"true"===n.hidden||n.hidden===!0?!0:!1},e.getIconOn=function(){return e.iconOn||e.icon},e.getIconOff=function(){return e.iconOff||e.icon},e.isTabActive=function(){return o.selectedTab()===r.$scope}}}}}]),s.directive("ionTabs",["$ionicTabsDelegate","$ionicConfig","$ionicHistory",function(e,t){return{restrict:"E",scope:!0,controller:"$ionicTabs",compile:function(n){function i(t,n,i,o){var a=e._registerInstance(o,i.delegateHandle,o.hasActiveScope);o.$scope=t,o.$element=n,o.$tabsElement=f(n[0].querySelector(".tabs")),t.$watch(function(){return n[0].className},function(e){var n=-1!==e.indexOf("tabs-top"),i=-1!==e.indexOf("tabs-item-hide");t.$hasTabs=!n&&!i,t.$hasTabsTop=n&&!i}),t.$on("$destroy",function(){t.$tabsDestroy=!0,a(),o.$tabsElement=o.$element=o.$scope=r=null,delete t.$hasTabs,delete t.$hasTabsTop})}function o(e,t,n,i){i.selectedTab()||i.select(0)}var r=f('<div class="tab-nav tabs">');return r.append(n.contents()),n.append(r).addClass("tabs-"+t.tabs.position()+" tabs-"+t.tabs.style()),{pre:i,post:o}}}}]),s.directive("ionToggle",["$ionicGesture","$timeout",function(){return{restrict:"E",replace:!0,require:"?ngModel",transclude:!0,template:'<div class="item item-toggle"><div ng-transclude></div><label class="toggle"><input type="checkbox"><div class="track"><div class="handle"></div></div></label></div>',compile:function(e,t){var n=e.find("input");return l({name:t.name,"ng-value":t.ngValue,"ng-model":t.ngModel,"ng-checked":t.ngChecked,"ng-disabled":t.ngDisabled,"ng-true-value":t.ngTrueValue,"ng-false-value":t.ngFalseValue,"ng-change":t.ngChange},function(e,t){u(e)&&n.attr(t,e)}),t.toggleClass&&e[0].getElementsByTagName("label")[0].classList.add(t.toggleClass),function(e,t){var n,i,o,r;n=t[0].getElementsByTagName("label")[0],i=n.children[0],o=n.children[1],r=o.children[0];var a=f(i).controller("ngModel");e.toggle=new ionic.views.Toggle({el:n,track:o,checkbox:i,handle:r,onChange:function(){a.$setViewValue(i.checked?!0:!1),e.$apply()}}),e.$on("$destroy",function(){e.toggle.destroy()})}}}}]),s.directive("ionView",function(){return{restrict:"EA",priority:1e3,controller:"$ionicView",compile:function(e){return e.addClass("pane"),e[0].removeAttribute("title"),function(e,t,n,i){i.init()}}}})}();angular.module('ionic.services.core', [])

/**
 * A core Ionic account identity provider. 
 *
 * Usage:
 * angular.module('myApp', ['ionic', 'ionic.services.common'])
 * .config(['$ionicAppProvider', function($ionicAccountProvider) {
 *   $ionicAppProvider.identify({
 *     app_id: 'x34dfxjydi23dx'
 *   });
 * }]);
 */
.provider('$ionicApp', function() {
  var app = {};

  var settings = {
    'api_server': 'http://ionic.io'
  };

  this.identify = function(opts) {
    app = opts;
  };

  /**
   * Set a config property.
   */
  this.set = function(k, v) {
    settings[k] = v;
  };

  this.setApiServer = function(server) {
    settings.api_server = server;
  };

  this.$get = [function() {
    return {
      getValue: function(k) {
        return settings[k];
      },
      getApiWriteKey: function() {
        return app.api_write_key;
      },
      getApiReadKey: function() {
        return app.api_read_key;
      },
      getApiUrl: function() {
        return this.getValue('api_server');
      },

      getApiEndpoint: function(service) {
        var app = this.getApp();
        if(!app) return null;

        return this.getApiUrl() + '/api/v1/' + app.app_id + '/' + service;
      },

      /**
       * Get the registered app for all commands.
       */
      getApp: function() {
        return app;
      }
    }
  }];
});
angular.module('ionic.services.deploy', ['ionic.services.core'])

/**
 * @ngdoc service
 * @name $ionicDeploy
 * @module ionic.services.deploy
 * @description
 *
 * A simple way to push updates to your app.
 *
 * Initialize the service with your app id before calling other functions.
 * Then, use the check, download, extract and load functions to update and/or load
 * the updated version of your app.
 *
 * @usage
 * ```javascript
 * // Check for updates
 * $ionicDeploy.check().then(function(response) {
 *    // response will be true/false
 *    if (response) {
 *        // Download the updates
 *        $ionicDeploy.download().then(function() {
 *            // Extract the updates
 *            $ionicDeploy.extract().then(function() {
 *                // Load the updated version
 *                $ionicTrack.load();
 *            }, function(error) {
 *                // Error extracting
 *            }, function(progress) {
 *                // Do something with the zip extraction progress
 *                $scope.extraction_progress = progress;
 *            });
 *        }, function(error) {
 *            // Error downloading the updates
 *        }, function(progress) {
 *            // Do something with the download progress
 *            $scope.download_progress = progress;
 *        });
 *    }
 * } else {
 *    // No updates, load the most up to date version of the app
 *    $ionicDeploy.load();
 * }, function(error) {
 *    // Error checking for updates
 * })
 * ```
 */
.factory('$ionicDeploy', [
    '$q',
    '$ionicApp',
  function($q, $ionicApp) {
    return {
      check: function() {
        var deferred = $q.defer();

        if (typeof IonicDeploy != "undefined") {
          IonicDeploy.check($ionicApp.getApp().app_id, function(result) {
            deferred.resolve(result === 'true');
          }, function(error) {
            deferred.reject(error);
          });
        } else {
          deferred.reject("Plugin not loaded");
        }

        return deferred.promise;
      },

      download: function() {
        var deferred = $q.defer();

        if (typeof IonicDeploy != "undefined") {
          IonicDeploy.download($ionicApp.getApp().app_id, function(result) {
            if (result !== 'true' && result !== 'false') {
              deferred.notify(result);
            } else {
              deferred.resolve(result === 'true');
            }
          }, function(error) {
            deferred.reject(error);
          });
        } else {
          deferred.reject("Plugin not loaded");
        }

        return deferred.promise;
      },

      extract: function() {
        var deferred = $q.defer();

        if (typeof IonicDeploy != "undefined") {
          IonicDeploy.extract($ionicApp.getApp().app_id, function(result) {
            if (result !== 'done') {
              deferred.notify(result);
            } else {
              deferred.resolve(result);
            }
          }, function(error) {
            deferred.reject(error);
          });
        } else {
          deferred.reject("Plugin not loaded");
        }

        return deferred.promise;
      },

      load: function() {
        if (typeof IonicDeploy != "undefined") {
          IonicDeploy.redirect($ionicApp.getApp().app_id);
        }
      },

      initialize: function(app_id) {
        if (typeof IonicDeploy != "undefined") {
          IonicDeploy.initialize(app_id);
        }
      },

      update: function() {
        // This is an all-in-one function that's meant to do all of the update steps
        // in one shot.
        // NB: I think that the way to handle progress is to divide the provided progress result
        //     of each part by two (download and extract) and report that value.

        var deferred = $q.defer();

        if (typeof IonicDeploy != "undefined") {
          // Check for updates
          IonicDeploy.check($ionicApp.getApp().app_id, function(result) {
            if (result === 'true') {
              // There are updates, download them
              var progress = 0;
              IonicDeploy.download($ionicApp.getApp().app_id, function(result) {
                if (result !== 'true' && result !== 'false') {
                  // Download is only half of the reported progress
                  progress = progress + (result / 2);
                  deferred.notify(progress);
                } else {
                  // Download complete, now extract
                  IonicDeploy.extract($ionicApp.getApp().app_id, function(result) {
                    if (result !== 'done') {
                      // Extract is only half of the reported progress
                      progress = progress + (result / 2);
                      deferred.notify(progress);
                    } else {
                      // Extraction complete, now redirect
                      IonicDeploy.redirect($ionicApp.getApp().app_id);
                    }
                  }, function(error) {
                    // Error extracting updates
                    deferred.reject(error);
                  });
                }
              }, function(error) {
                // Error downloading updates
                deferred.reject(error);
              });
            } else {
              // There are no updates, redirect
              IonicDeploy.redirect($ionicApp.getApp().app_id);
            }
          }, function(error) {
            // Error checking for updates
            deferred.reject(error);
          });
        } else {
          deferred.reject("Plugin not loaded");
        }

        return deferred.promise;
      }
    }
}])
!function(){"use strict";var e=angular.module("pasvaz.bindonce",[]);e.directive("bindonce",function(){var e=function(e){if(e&&0!==e.length){var t=angular.lowercase(""+e);e=!("f"===t||"0"===t||"false"===t||"no"===t||"n"===t||"[]"===t)}else e=!1;return e},t=parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10);isNaN(t)&&(t=parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10));var r={restrict:"AM",controller:["$scope","$element","$attrs","$interpolate",function(r,a,i,n){var c=function(t,r,a){var i="show"===r?"":"none",n="hide"===r?"":"none";t.css("display",e(a)?i:n)},o=function(e,t){if(angular.isObject(t)&&!angular.isArray(t)){var r=[];angular.forEach(t,function(e,t){e&&r.push(t)}),t=r}t&&e.addClass(angular.isArray(t)?t.join(" "):t)},s=function(e,t){e.transclude(t,function(t){var r=e.element.parent(),a=e.element&&e.element[e.element.length-1],i=r&&r[0]||a&&a.parentNode,n=a&&a.nextSibling||null;angular.forEach(t,function(e){i.insertBefore(e,n)})})},l={watcherRemover:void 0,binders:[],group:i.boName,element:a,ran:!1,addBinder:function(e){this.binders.push(e),this.ran&&this.runBinders()},setupWatcher:function(e){var t=this;this.watcherRemover=r.$watch(e,function(e){void 0!==e&&(t.removeWatcher(),t.checkBindonce(e))},!0)},checkBindonce:function(e){var t=this,r=e.$promise?e.$promise.then:e.then;"function"==typeof r?r(function(){t.runBinders()}):t.runBinders()},removeWatcher:function(){void 0!==this.watcherRemover&&(this.watcherRemover(),this.watcherRemover=void 0)},runBinders:function(){for(;this.binders.length>0;){var r=this.binders.shift();if(!this.group||this.group==r.group){var a=r.scope.$eval(r.interpolate?n(r.value):r.value);switch(r.attr){case"boIf":e(a)&&s(r,r.scope.$new());break;case"boSwitch":var i,l=r.controller[0];(i=l.cases["!"+a]||l.cases["?"])&&(r.scope.$eval(r.attrs.change),angular.forEach(i,function(e){s(e,r.scope.$new())}));break;case"boSwitchWhen":var u=r.controller[0];u.cases["!"+r.attrs.boSwitchWhen]=u.cases["!"+r.attrs.boSwitchWhen]||[],u.cases["!"+r.attrs.boSwitchWhen].push({transclude:r.transclude,element:r.element});break;case"boSwitchDefault":var u=r.controller[0];u.cases["?"]=u.cases["?"]||[],u.cases["?"].push({transclude:r.transclude,element:r.element});break;case"hide":case"show":c(r.element,r.attr,a);break;case"class":o(r.element,a);break;case"text":r.element.text(a);break;case"html":r.element.html(a);break;case"style":r.element.css(a);break;case"disabled":r.element.prop("disabled",a);break;case"src":r.element.attr(r.attr,a),t&&r.element.prop("src",a);break;case"attr":angular.forEach(r.attrs,function(e,t){var a,i;t.match(/^boAttr./)&&r.attrs[t]&&(a=t.replace(/^boAttr/,"").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),i=r.scope.$eval(r.attrs[t]),r.element.attr(a,i))});break;case"href":case"alt":case"title":case"id":case"value":r.element.attr(r.attr,a)}}}this.ran=!0}};angular.extend(this,l)}],link:function(e,t,r,a){var i=r.bindonce&&e.$eval(r.bindonce);void 0!==i?a.checkBindonce(i):(a.setupWatcher(r.bindonce),t.bind("$destroy",a.removeWatcher))}};return r}),angular.forEach([{directiveName:"boShow",attribute:"show"},{directiveName:"boHide",attribute:"hide"},{directiveName:"boClass",attribute:"class"},{directiveName:"boText",attribute:"text"},{directiveName:"boBind",attribute:"text"},{directiveName:"boHtml",attribute:"html"},{directiveName:"boSrcI",attribute:"src",interpolate:!0},{directiveName:"boSrc",attribute:"src"},{directiveName:"boHrefI",attribute:"href",interpolate:!0},{directiveName:"boHref",attribute:"href"},{directiveName:"boAlt",attribute:"alt"},{directiveName:"boTitle",attribute:"title"},{directiveName:"boId",attribute:"id"},{directiveName:"boStyle",attribute:"style"},{directiveName:"boDisabled",attribute:"disabled"},{directiveName:"boValue",attribute:"value"},{directiveName:"boAttr",attribute:"attr"},{directiveName:"boIf",transclude:"element",terminal:!0,priority:1e3},{directiveName:"boSwitch",require:"boSwitch",controller:function(){this.cases={}}},{directiveName:"boSwitchWhen",transclude:"element",priority:800,require:"^boSwitch"},{directiveName:"boSwitchDefault",transclude:"element",priority:800,require:"^boSwitch"}],function(t){var r=200;return e.directive(t.directiveName,function(){var e={priority:t.priority||r,transclude:t.transclude||!1,terminal:t.terminal||!1,require:["^bindonce"].concat(t.require||[]),controller:t.controller,compile:function(e,r,a){return function(e,r,i,n){var c=n[0],o=i.boParent;if(o&&c.group!==o){var s=c.element.parent();c=void 0;for(var l;9!==s[0].nodeType&&s.length;){if((l=s.data("$bindonceController"))&&l.group===o){c=l;break}s=s.parent()}if(!c)throw new Error("No bindonce controller: "+o)}c.addBinder({element:r,attr:t.attribute||t.directiveName,attrs:i,value:i[t.directiveName],interpolate:t.interpolate,group:o,transclude:a,controller:n.slice(1),scope:e})}}};return e})})}();/**
 * An Angular module that gives you access to the browsers local storage
 * @version v0.1.5 - 2014-11-04
 * @link https://github.com/grevory/angular-local-storage
 * @author grevory <greg@gregpike.ca>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */!function(a,b){"use strict";function c(a){return/^-?\d+\.?\d*$/.test(a.replace(/["']/g,""))}var d=b.isDefined,e=b.isUndefined,f=b.isNumber,g=b.isObject,h=b.isArray,i=b.extend,j=b.toJson,k=b.fromJson,l=b.module("LocalStorageModule",[]);l.provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){return this.prefix=a,this},this.setStorageType=function(a){return this.storageType=a,this},this.setStorageCookie=function(a,b){return this.cookie={expiry:a,path:b},this},this.setStorageCookieDomain=function(a){return this.cookie.domain=a,this},this.setNotify=function(a,b){return this.notify={setItem:a,removeItem:b},this},this.$get=["$rootScope","$window","$document","$parse",function(a,b,l,m){var n,o=this,p=o.prefix,q=o.cookie,r=o.notify,s=o.storageType;l?l[0]&&(l=l[0]):l=document,"."!==p.substr(-1)&&(p=p?p+".":"");var t=function(a){return p+a},u=function(){try{var c=s in b&&null!==b[s],d=t("__"+Math.round(1e7*Math.random()));return c&&(n=b[s],n.setItem(d,""),n.removeItem(d)),c}catch(e){return s="cookie",a.$broadcast("LocalStorageModule.notification.error",e.message),!1}}(),v=function(b,c){if(e(c)?c=null:(g(c)||h(c)||f(+c||c))&&(c=j(c)),!u||"cookie"===o.storageType)return u||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),B(b,c);try{(g(c)||h(c))&&(c=j(c)),n&&n.setItem(t(b),c),r.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:o.storageType})}catch(d){return a.$broadcast("LocalStorageModule.notification.error",d.message),B(b,c)}return!0},w=function(b){if(!u||"cookie"===o.storageType)return u||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),C(b);var d=n?n.getItem(t(b)):null;return d&&"null"!==d?"{"===d.charAt(0)||"["===d.charAt(0)||c(d)?k(d):d:null},x=function(b){if(!u||"cookie"===o.storageType)return u||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:"cookie"}),D(b);try{n.removeItem(t(b)),r.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:o.storageType})}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),D(b)}return!0},y=function(){if(!u)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var b=p.length,c=[];for(var d in n)if(d.substr(0,b)===p)try{c.push(d.substr(b))}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.Description),[]}return c},z=function(b){b=b||"";var c=p.slice(0,-1),d=new RegExp(c+"."+b);if(!u||"cookie"===o.storageType)return u||a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),E();var e=p.length;for(var f in n)if(d.test(f))try{x(f.substr(e))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.message),E()}return!0},A=function(){try{return b.navigator.cookieEnabled||"cookie"in l&&(l.cookie.length>0||(l.cookie="test").indexOf.call(l.cookie,"test")>-1)}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),!1}}(),B=function(b,c){if(e(c))return!1;if((h(c)||g(c))&&(c=j(c)),!A)return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var d="",f=new Date,i="";if(null===c?(f.setTime(f.getTime()+-864e5),d="; expires="+f.toGMTString(),c=""):0!==q.expiry&&(f.setTime(f.getTime()+24*q.expiry*60*60*1e3),d="; expires="+f.toGMTString()),b){var k="; path="+q.path;q.domain&&(i="; domain="+q.domain),l.cookie=t(b)+"="+encodeURIComponent(c)+d+k+i}}catch(m){return a.$broadcast("LocalStorageModule.notification.error",m.message),!1}return!0},C=function(b){if(!A)return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var c=l.cookie&&l.cookie.split(";")||[],d=0;d<c.length;d++){for(var e=c[d];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(t(b)+"=")){var f=decodeURIComponent(e.substring(p.length+b.length+1,e.length));try{var g=JSON.parse(f);return k(g)}catch(h){return f}}}return null},D=function(a){B(a,null)},E=function(){for(var a=null,b=p.length,c=l.cookie.split(";"),d=0;d<c.length;d++){for(a=c[d];" "===a.charAt(0);)a=a.substring(1,a.length);var e=a.substring(b,a.indexOf("="));D(e)}},F=function(){return s},G=function(a,b,c,e){e=e||b;var f=w(e);return null===f&&d(c)?f=c:g(f)&&g(c)&&(f=i(c,f)),m(b).assign(a,f),a.$watch(b,function(a){v(e,a)},g(a[b]))},H=function(){for(var a=0,c=b[s],d=0;d<c.length;d++)0===c.key(d).indexOf(p)&&a++;return a};return{isSupported:u,getStorageType:F,set:v,add:v,get:w,keys:y,remove:x,clearAll:z,bind:G,deriveKey:t,length:H,cookie:{isSupported:A,set:B,add:B,get:C,remove:D,clearAll:E}}}]})}(window,window.angular);/*! ngStorage 0.3.0 | Copyright (c) 2013 Gias Kay Lee | MIT License */"use strict";!function(){function a(a){return["$rootScope","$window",function(b,c){for(var d,e,f,g=c[a]||(console.warn("This browser does not support Web Storage!"),{}),h={$default:function(a){for(var b in a)angular.isDefined(h[b])||(h[b]=a[b]);return h},$reset:function(a){for(var b in h)"$"===b[0]||delete h[b];return h.$default(a)}},i=0;i<g.length;i++)(f=g.key(i))&&"ngStorage-"===f.slice(0,10)&&(h[f.slice(10)]=angular.fromJson(g.getItem(f)));return d=angular.copy(h),b.$watch(function(){e||(e=setTimeout(function(){if(e=null,!angular.equals(h,d)){angular.forEach(h,function(a,b){angular.isDefined(a)&&"$"!==b[0]&&g.setItem("ngStorage-"+b,angular.toJson(a)),delete d[b]});for(var a in d)g.removeItem("ngStorage-"+a);d=angular.copy(h)}},100))}),"localStorage"===a&&c.addEventListener&&c.addEventListener("storage",function(a){"ngStorage-"===a.key.slice(0,10)&&(a.newValue?h[a.key.slice(10)]=angular.fromJson(a.newValue):delete h[a.key.slice(10)],d=angular.copy(h),b.$apply())}),h}]}angular.module("ngStorage",[]).factory("$localStorage",a("localStorage")).factory("$sessionStorage",a("sessionStorage"))}();/*!
 * pickadate.js v3.4.0, 2014/02/15
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */
!function(a){"function"==typeof define&&define.amd?define("picker",["angular"],a):this.Picker=a(angular)}(function(a){function b(a,d,e,g){function h(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",r.component.nodes(o.open),n.box),n.wrap),n.frame),n.holder)}function i(){p.data(d,r),p.addClass(n.input),p[0].value=p.attr("data-value")?r.get("select",m.format):a.value,angular.element(document.querySelectorAll("#"+o.id)).on("focus",l),angular.element(document.querySelectorAll("#"+o.id)).on("click",l),m.editable||angular.element(document.querySelectorAll("#"+o.id)).on("keydown",function(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(r.close(),!1):void((32==b||c||!o.open&&r.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?r.clear().close():r.open()))}),c(a,{haspopup:!0,expanded:!1,readonly:!1,owns:a.id+"_root"+(r._hidden?" "+r._hidden.id:"")})}function j(){function d(){angular.element(r.$root[0].querySelectorAll("[data-pick], [data-nav], [data-clear]")).on("click",function(){var c=angular.element(this),e=c.hasClass(n.navDisabled)||c.hasClass(n.disabled),f=document.activeElement;f=f&&(f.type||f.href)&&f,(e||f&&!r.$root[0].contains(f))&&a.focus(),c.attr("data-nav")&&!e?(r.set("highlight",r.component.item.highlight,{nav:parseInt(c.attr("data-nav"))}),d()):b._.isInteger(parseInt(c.attr("data-pick")))&&!e?(r.set("select",parseInt(c.attr("data-pick"))).close(!0),d()):c.attr("data-clear")&&(r.clear().close(!0),d())})}r.$root.on("focusin",function(a){r.$root.removeClass(n.focused),c(r.$root[0],"selected",!1),a.stopPropagation()}),r.$root.on("mousedown click",function(b){var c=b.target;c!=r.$root.children()[0]&&(b.stopPropagation(),"mousedown"==b.type&&"input"!==angular.element(c)[0].tagName&&"OPTION"!=c.nodeName&&(b.preventDefault(),a.focus()))}),d(),c(r.$root[0],"hidden",!0)}function k(){var b=["string"==typeof m.hiddenPrefix?m.hiddenPrefix:"","string"==typeof m.hiddenSuffix?m.hiddenSuffix:"_submit"];r._hidden=angular.element('<input type=hidden name="'+b[0]+a.name+b[1]+'"id="'+b[0]+a.id+b[1]+'"'+(p.attr("data-value")||a.value?' value="'+r.get("select",m.formatSubmit)+'"':"")+">")[0],p.on("change."+o.id,function(){r._hidden.value=a.value?r.get("select",m.formatSubmit):""}).after(r._hidden)}function l(a){a.stopPropagation(),"focus"==a.type&&(r.$root.addClass(n.focused),c(r.$root[0],"selected",!0)),r.open()}if(!a)return b;var m;e?(m=e.defaults,angular.extend(m,g)):m=g||{};var n=b.klasses();angular.extend(n,m.klass);var o={id:a.id||"P"+Math.abs(~~(Math.random()*new Date))},p=angular.element(a),q=function(){return this.start()},r=q.prototype={constructor:q,$node:p,start:function(){return o&&o.start?r:(o.methods={},o.start=!0,o.open=!1,o.type=a.type,a.autofocus=a==document.activeElement,a.type="text",a.readOnly=!m.editable,a.id=a.id||o.id,r.component=new e(r,m),r.$root=angular.element(b._.node("div",h(),n.picker,'id="'+a.id+'_root"')),j(),m.formatSubmit&&k(),i(),m.container?angular.element(m.container).append(r.$root):p.after(r.$root),r.on({start:r.component.onStart,render:r.component.onRender,stop:r.component.onStop,open:r.component.onOpen,close:r.component.onClose,set:r.component.onSet}).on({start:m.onStart,render:m.onRender,stop:m.onStop,open:m.onOpen,close:m.onClose,set:m.onSet}),a.autofocus&&r.open(),r.trigger("start").trigger("render"))},render:function(a){return a?r.$root.html(h()):angular.element(r.$root[0].querySelectorAll("."+n.box)).html(r.component.nodes(o.open)),r.trigger("render")},stop:function(){return o.start?(r.close(),r._hidden&&r._hidden.parentNode.removeChild(r._hidden),r.$root.remove(),p.removeClass(n.input).removeData(d),setTimeout(function(){p.off("."+o.id)},0),a.type=o.type,a.readOnly=!1,r.trigger("stop"),o.methods={},o.start=!1,r):r},open:function(d){return o.open?r:(p.addClass(n.active),c(a,"expanded",!0),r.$root.addClass(n.opened),c(r.$root[0],"hidden",!1),d!==!1&&(o.open=!0,p.triggerHandler("focus"),angular.element(document.querySelectorAll("#"+o.id)).on("click focusin",function(b){var c=b.target;c!=a&&c!=document&&3!=b.which&&r.close(c===r.$root.children()[0])}),angular.element(document.querySelectorAll("#"+o.id)).on("keydown",function(c){var d=c.keyCode,e=r.component.key[d],f=c.target;27==d?r.close(!0):f!=a||!e&&13!=d?r.$root[0].contains(f)&&13==d&&(c.preventDefault(),f.click()):(c.preventDefault(),e?b._.trigger(r.component.key.go,r,[b._.trigger(e)]):angular.element(r.$root[0].querySelectorAll("."+n.highlighted)).hasClass(n.disabled)||r.set("select",r.component.item.highlight).close())})),r.trigger("open"))},close:function(b){return b&&(p.off("focus."+o.id),p.triggerHandler("focus"),setTimeout(function(){angular.element(document.querySelectorAll("#"+o.id)).on("focus",l)},0)),p.removeClass(n.active),c(a,"expanded",!1),r.$root.removeClass(n.opened+" "+n.focused),c(r.$root[0],"hidden",!0),c(r.$root[0],"selected",!1),o.open?(setTimeout(function(){o.open=!1},1e3),f.off("."+o.id),r.trigger("close")):r},clear:function(){return r.set("clear")},set:function(a,b,c){var d,e,f=angular.isObject(a),g=f?a:{};if(c=f&&angular.isObject(b)?b:c||{},a){f||(g[a]=b);for(d in g)e=g[d],d in r.component.item&&r.component.set(d,e,c),("select"==d||"clear"==d)&&(p[0].value="clear"==d?"":r.get(d,m.format),p.triggerHandler("change"));r.render()}return c.muted?r:r.trigger("set",g)},get:function(c,d){return c=c||"value",null!=o[c]?o[c]:"value"==c?a.value:c in r.component.item?"string"==typeof d?b._.trigger(r.component.formats.toString,r.component,[d,r.component.get(c)]):r.component.get(c):void 0},on:function(a,b){var c,d,e=angular.isObject(a),f=e?a:{};if(a){e||(f[a]=b);for(c in f)d=f[c],o.methods[c]=o.methods[c]||[],o.methods[c].push(d)}return r},off:function(){var a,b,c=arguments;for(a=0,namesCount=c.length;namesCount>a;a+=1)b=c[a],b in o.methods&&delete o.methods[b];return r},trigger:function(a,c){var d=o.methods[a];return d&&d.map(function(a){b._.trigger(a,r,[c])}),r}};return new q}function c(a,b,c){if(angular.isObject(b))for(var e in b)d(a,e,b[e]);else d(a,b,c)}function d(a,b,c){angular.element(a).attr(("role"==b?"":"aria-")+b,c)}function e(a,b){angular.isObject(a)||(a={attribute:b}),b="";for(var c in a){var d=("role"==c?"":"aria-")+c,e=a[c];b+=null==e?"":d+'="'+a[c]+'"'}return b}var f=angular.element(document);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},b._={group:function(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i)c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);return d},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&a%1===0},ariaAttr:e},b.extend=function(a,c){angular.element.prototype[a]=function(d,e){var f=this.data(a);if("picker"==d)return f;if(f&&"string"==typeof d)return b._.trigger(f[d],f,[e]),this;for(var g=0;g<this.length;g++){var h=angular.element(this[g]);h.data(a)||new b(h[0],a,c,d)}},angular.element.prototype[a].defaults=c.defaults},b});
/*!
 * Date picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/date.htm
 */
!function(a){"function"==typeof define&&define.amd?define(["picker","angular"],a):a(Picker,angular)}(function(a,b){function c(a,c){var d=this,e=a.$node[0].value,f=a.$node.attr("data-value"),g=f||e,h=f?c.formatSubmit:c.format,i=function(){return"rtl"===getComputedStyle(a.$root[0]).direction};d.settings=c,d.$node=a.$node,d.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},d.item={},d.item.disable=(c.disable||[]).slice(0),d.item.enable=-function(a){return a[0]===!0?a.shift():-1}(d.item.disable),d.set("min",c.min).set("max",c.max).set("now"),g?d.set("select",g,{format:h,fromValue:!!e}):d.set("select",null).set("highlight",d.item.now),d.key={40:7,38:-7,39:function(){return i()?-1:1},37:function(){return i()?1:-1},go:function(a){var b=d.item.highlight,c=new Date(b.year,b.month,b.date+a);d.set("highlight",[c.getFullYear(),c.getMonth(),c.getDate()],{interval:a}),this.render()}},a.on("render",function(){b.element(a.$root[0].querySelectorAll("."+c.klass.selectMonth)).on("change",function(){var d=this.value;d&&(a.set("highlight",[a.get("view").year,d,a.get("highlight").date]),b.element(a.$root[0].querySelectorAll("."+c.klass.selectMonth)).triggerHandler("focus"))}),b.element(a.$root[0].querySelectorAll("."+c.klass.selectYear)).on("change",function(){var d=this.value;d&&(a.set("highlight",[d,a.get("view").month,a.get("highlight").date]),b.element(a.$root[0].querySelectorAll("."+c.klass.selectYear)).triggerHandler("focus"))})}).on("open",function(){b.element(a.$root[0].querySelectorAll("button, select")).attr("disabled",!1)}).on("close",function(){b.element(a.$root[0].querySelectorAll("button, select")).attr("disabled",!0)})}var d=7,e=6,f=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?(e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):a.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(a,c,d){var e,g=this;return c=void 0===c?a:c,c==-1/0||1/0==c?e=c:b.isObject(c)&&f.isInteger(c.pick)?c=c.obj:b.isArray(c)?(c=new Date(c[0],c[1],c[2]),c=f.isDate(c)?c:g.create().obj):c=f.isInteger(c)||f.isDate(c)?g.normalize(new Date(c),d):g.now(a,c,d),{year:e||c.getFullYear(),month:e||c.getMonth(),date:e||c.getDate(),day:e||c.getDay(),obj:e||c,pick:e||c.getTime()}},c.prototype.createRange=function(a,c){var d=this,e=function(a){return a===!0||b.isArray(a)||f.isDate(a)?d.create(a):a};return f.isInteger(a)||(a=e(a)),f.isInteger(c)||(c=e(c)),f.isInteger(a)&&b.isObject(c)?a=[c.year,c.month,c.date+a]:f.isInteger(c)&&b.isObject(a)&&(c=[a.year,a.month,a.date+c]),{from:e(a),to:e(c)}},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},c.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},c.prototype.navigate=function(a,c,d){var e,f,g,h,i=b.isArray(c),j=b.isObject(c),k=this.item.view;if(i||j){for(j?(f=c.year,g=c.month,h=c.date):(f=+c[0],g=+c[1],h=+c[2]),d&&d.nav&&k&&k.month!==g&&(f=k.year,g=k.month),e=new Date(f,g+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth();new Date(f,g,h).getMonth()!==g;)h-=1;c=[f,g,h]}return c},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},c.prototype.measure=function(a,b){var c=this;return b?f.isInteger(b)&&(b=c.now(a,b,{rel:b})):b="min"==a?-1/0:1/0,b},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},c.prototype.validate=function(a,c,d){var e,g,h,i,j=this,k=c,l=d&&d.interval?d.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(a){if(b.isArray(a)){var d=j.create(a).pick;d<c.pick?e=!0:d>c.pick&&(g=!0)}return f.isInteger(a)}).length;if((!d||!d.nav)&&(!m&&j.disabled(c)||m&&j.disabled(c)&&(p||e||g)||!m&&(c.pick<=n.pick||c.pick>=o.pick)))for(m&&!p&&(!g&&l>0||!e&&0>l)&&(l*=-1);j.disabled(c)&&(Math.abs(l)>1&&(c.month<k.month||c.month>k.month)&&(c=k,l=l>0?1:-1),c.pick<=n.pick?(h=!0,l=1,c=j.create([n.year,n.month,n.date-1])):c.pick>=o.pick&&(i=!0,l=-1,c=j.create([o.year,o.month,o.date+1])),!h||!i);)c=j.create([c.year,c.month,c.date+l]);return c},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return f.isInteger(d)?a.day===(c.settings.firstDay?d:d-1)%7:b.isArray(d)||f.isDate(d)?a.pick===c.create(d).pick:b.isObject(d)?c.withinRange(d,a):void 0});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[3]||b.isObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},c.prototype.parse=function(a,c,d){var e,g=this,h={};return!c||f.isInteger(c)||b.isArray(c)||f.isDate(c)||b.isObject(c)&&f.isInteger(c.pick)?c:(d&&d.format||(d=d||{},d.format=g.settings.format),e="string"!=typeof c||d.fromValue?0:1,g.formats.toArray(d.format).map(function(a){var b=g.formats[a],d=b?f.trigger(b,g,[c,h]):a.replace(/^!/,"").length;b&&(h[a]=c.substr(0,d)),c=c.substr(d)}),[h.yyyy||h.yy,+(h.mm||h.m)-e,h.dd||h.d])},c.prototype.formats=function(){function a(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)),d.length}function b(a){return a.match(/\w+/)[0].length}return{d:function(a,b){return a?f.digits(a):b.date},dd:function(a,b){return a?2:f.lead(b.date)},ddd:function(a,c){return a?b(a):this.settings.weekdaysShort[c.day]},dddd:function(a,c){return a?b(a):this.settings.weekdaysFull[c.day]},m:function(a,b){return a?f.digits(a):b.month+1},mm:function(a,b){return a?2:f.lead(b.month+1)},mmm:function(b,c){var d=this.settings.monthsShort;return b?a(b,d,c):d[c.month]},mmmm:function(b,c){var d=this.settings.monthsFull;return b?a(b,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return f.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}}}(),c.prototype.isDateExact=function(a,c){var d=this;return f.isInteger(a)&&f.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(f.isDate(a)||b.isArray(a))&&(f.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isObject(a)&&b.isObject(c)?d.isDateExact(a.from,c.from)&&d.isDateExact(a.to,c.to):!1},c.prototype.isDateOverlap=function(a,c){var d=this;return f.isInteger(a)&&(f.isDate(c)||b.isArray(c))?a===d.create(c).day+1:f.isInteger(c)&&(f.isDate(a)||b.isArray(a))?c===d.create(a).day+1:b.isObject(a)&&b.isObject(c)?d.overlapRanges(a,c):!1},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,g=0;g<e.length;g+=1)if(d.isDateExact(a,e[g])){c=!0;break}c||(f.isInteger(a)||f.isDate(a)||b.isArray(a)||b.isObject(a)&&a.from&&a.to)&&e.push(a)}),e},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,g=e.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,h,i,j;for(i=0;g>i;i+=1){if(h=e[i],d.isDateExact(h,a)){c=e[i]=null,j=!0;break}if(d.isDateOverlap(h,a)){b.isObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[3]||c.push("inverted")):f.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;g>i;i+=1)if(d.isDateExact(e[i],a)){e[i]=null;break}if(j)for(i=0;g>i;i+=1)if(d.isDateOverlap(e[i],a)){e[i]=null;break}c&&e.push(c)}),e.filter(function(a){return null!=a})},c.prototype.nodes=function(a){var b=this,c=b.settings,g=b.item,h=g.now,i=g.select,j=g.highlight,k=g.view,l=g.disable,m=g.min,n=g.max,o=function(a){return c.firstDay&&a.push(a.shift()),f.node("thead",f.node("tr",f.group({min:0,max:d-1,i:1,node:"th",item:function(b){return[a[b],c.klass.weekdays]}})))}((c.showWeekdaysFull?c.weekdaysFull:c.weekdaysShort).slice(0)),p=function(a){return f.node("div"," ",c.klass["nav"+(a?"Next":"Prev")]+(a&&k.year>=n.year&&k.month>=n.month||!a&&k.year<=m.year&&k.month<=m.month?" "+c.klass.navDisabled:""),"data-nav="+(a||-1))},q=function(b){return c.selectMonths?f.node("select",f.group({min:0,max:11,i:1,node:"option",item:function(a){return[b[a],0,"value="+a+(k.month==a?" selected":"")+(k.year==m.year&&a<m.month||k.year==n.year&&a>n.month?" disabled":"")]}}),c.klass.selectMonth,a?"":"disabled"):f.node("div",b[k.month],c.klass.month)},r=function(){var b=k.year,d=c.selectYears===!0?5:~~(c.selectYears/2);if(d){var e=m.year,g=n.year,h=b-d,i=b+d;if(e>h&&(i+=e-h,h=e),i>g){var j=h-e,l=i-g;h-=j>l?l:j,i=g}return f.node("select",f.group({min:h,max:i,i:1,node:"option",item:function(a){return[a,0,"value="+a+(b==a?" selected":"")]}}),c.klass.selectYear,a?"":"disabled")}return f.node("div",b,c.klass.year)};return f.node("div",p()+p(1)+q(c.showMonthsShort?c.monthsShort:c.monthsFull)+r(),c.klass.header)+f.node("table",o+f.node("tbody",f.group({min:0,max:e-1,i:1,node:"tr",item:function(a){var e=c.firstDay&&0===b.create([k.year,k.month,1]).day?-7:0;return[f.group({min:d*a-k.day+e+1,max:function(){return this.min+d-1},i:1,node:"td",item:function(a){a=b.create([k.year,k.month,a+(c.firstDay?1:0)]);var d=i&&i.pick==a.pick,e=j&&j.pick==a.pick,g=l&&b.disabled(a)||a.pick<m.pick||a.pick>n.pick;return[f.node("div",a.date,function(b){return b.push(k.month==a.month?c.klass.infocus:c.klass.outfocus),h.pick==a.pick&&b.push(c.klass.now),d&&b.push(c.klass.selected),e&&b.push(c.klass.highlighted),g&&b.push(c.klass.disabled),b.join(" ")}([c.klass.day]),"data-pick="+a.pick+" "+f.ariaAttr({role:"button",controls:b.$node[0].id,checked:d&&b.$node[0].value===f.trigger(b.formats.toString,b,[c.format,a])?!0:null,activedescendant:e?!0:null,disabled:g?!0:null}))]}})]}})),c.klass.table)+f.node("div",f.node("button",c.today,c.klass.buttonToday,"type=button data-pick="+h.pick+(a?"":" disabled"))+f.node("button",c.clear,c.klass.buttonClear,"type=button data-clear=1"+(a?"":" disabled")),c.klass.footer)},c.defaults=function(a){return{monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today"}}}(a.klasses().picker+"__"),a.extend("pickadate",c)});
/*!
 * Time picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/time.htm
 */
!function(a){"function"==typeof define&&define.amd?define(["picker","angular"],a):a(Picker,angular)}(function(a,b){function c(a,b){var c=this,d=a.$node[0].value,e=a.$node.data("value"),f=e||d,g=e?b.formatSubmit:b.format;c.settings=b,c.$node=a.$node,c.queue={interval:"i",min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse create validate",view:"parse create validate",disable:"deactivate",enable:"activate"},c.item={},c.item.interval=b.interval||30,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now"),f?c.set("select",f,{format:g,fromValue:!!d}):c.set("select",null).set("highlight",c.item.now),c.key={40:1,38:-1,39:1,37:-1,go:function(a){c.set("highlight",c.item.highlight.pick+a*c.item.interval,{interval:a*c.item.interval}),this.render()}},a.on("render",function(){var c=a.$root.children(),d=c.find("."+b.klass.viewset);d.length&&(c[0].scrollTop=~~d.position().top-2*d[0].clientHeight)}).on("open",function(){a.$root.find("button").attr("disable",!1)}).on("close",function(){a.$root.find("button").attr("disable",!0)})}var d=24,e=60,f=12,g=d*e,h=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?(e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):"interval"==a?d.set("min",e.min,c).set("max",e.max,c):a.match(/^(flip|min|max|disable|enable)$/)&&("min"==a&&d.set("max",e.max,c),e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(a,c,f){var i=this;return c=void 0===c?a:c,h.isDate(c)&&(c=[c.getHours(),c.getMinutes()]),b.isObject(c)&&h.isInteger(c.pick)?c=c.pick:b.isArray(c)?c=+c[0]*e+ +c[1]:h.isInteger(c)||(c=i.now(a,c,f)),"max"==a&&c<i.item.min.pick&&(c+=g),"min"!=a&&"max"!=a&&(c-i.item.min.pick)%i.item.interval!==0&&(c+=i.item.interval),c=i.normalize(a,c,f),{hour:~~(d+c/e)%d,mins:(e+c%e)%e,time:(g+c)%g,pick:c}},c.prototype.createRange=function(a,c){var d=this,e=function(a){return a===!0||b.isArray(a)||h.isDate(a)?d.create(a):a};return h.isInteger(a)||(a=e(a)),h.isInteger(c)||(c=e(c)),h.isInteger(a)&&b.isObject(c)?a=[c.hour,c.mins+a*d.settings.interval]:h.isInteger(c)&&b.isObject(a)&&(c=[a.hour,a.mins+c*d.settings.interval]),{from:e(a),to:e(c)}},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},c.prototype.now=function(a,b){var c,d=this.item.interval,f=new Date,g=f.getHours()*e+f.getMinutes(),i=h.isInteger(b);return g-=g%d,c=0>b&&-d>=d*b+g,g+="min"==a&&c?0:d,i&&(g+=d*(c&&"max"!=a?b+1:b)),g},c.prototype.normalize=function(a,b){var c=this.item.interval,d=this.item.min&&this.item.min.pick||0;return b-="min"==a?0:(b-d)%c},c.prototype.measure=function(a,c,f){var g=this;return c?c===!0||h.isInteger(c)?c=g.now(a,c,f):b.isObject(c)&&h.isInteger(c.pick)&&(c=g.normalize(a,c.pick,f)):c="min"==a?[0,0]:[d-1,e-1],c},c.prototype.validate=function(a,b,c){var d=this,e=c&&c.interval?c.interval:d.item.interval;return d.disabled(b)&&(b=d.shift(b,e)),b=d.scope(b),d.disabled(b)&&(b=d.shift(b,-1*e)),b},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return h.isInteger(d)?a.hour==d:b.isArray(d)||h.isDate(d)?a.pick==c.create(d).pick:b.isObject(d)?c.withinRange(d,a):void 0});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[2]||b.isObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},c.prototype.shift=function(a,b){var c=this,d=c.item.min.pick,e=c.item.max.pick;for(b=b||c.item.interval;c.disabled(a)&&(a=c.create(a.pick+=b),!(a.pick<=d||a.pick>=e)););return a},c.prototype.scope=function(a){var b=this.item.min.pick,c=this.item.max.pick;return this.create(a.pick>c?c:a.pick<b?b:a)},c.prototype.parse=function(a,c,d){var f,g,i,j,k,l=this,m={};if(!c||h.isInteger(c)||b.isArray(c)||h.isDate(c)||b.isObject(c)&&h.isInteger(c.pick))return c;d&&d.format||(d=d||{},d.format=l.settings.format),l.formats.toArray(d.format).map(function(a){var b,d=l.formats[a],e=d?h.trigger(d,l,[c,m]):a.replace(/^!/,"").length;d&&(b=c.substr(0,e),m[a]=b.match(/^\d+$/)?+b:b),c=c.substr(e)});for(j in m)k=m[j],h.isInteger(k)?j.match(/^(h|hh)$/i)?(f=k,("h"==j||"hh"==j)&&(f%=12)):"i"==j&&(g=k):j.match(/^a$/i)&&k.match(/^p/i)&&("h"in m||"hh"in m)&&(i=!0);return(i?f+12:f)*e+g},c.prototype.formats={h:function(a,b){return a?h.digits(a):b.hour%f||f},hh:function(a,b){return a?2:h.lead(b.hour%f||f)},H:function(a,b){return a?h.digits(a):""+b.hour%24},HH:function(a,b){return a?h.digits(a):h.lead(b.hour%24)},i:function(a,b){return a?2:h.lead(b.mins)},a:function(a,b){return a?4:g/2>b.time%g?"a.m.":"p.m."},A:function(a,b){return a?2:g/2>b.time%g?"AM":"PM"},toArray:function(a){return a.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return h.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}},c.prototype.isTimeExact=function(a,c){var d=this;return h.isInteger(a)&&h.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(h.isDate(a)||b.isArray(a))&&(h.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isObject(a)&&b.isObject(c)?d.isTimeExact(a.from,c.from)&&d.isTimeExact(a.to,c.to):!1},c.prototype.isTimeOverlap=function(a,c){var d=this;return h.isInteger(a)&&(h.isDate(c)||b.isArray(c))?a===d.create(c).hour:h.isInteger(c)&&(h.isDate(a)||b.isArray(a))?c===d.create(a).hour:b.isObject(a)&&b.isObject(c)?d.overlapRanges(a,c):!1},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,f=0;f<e.length;f+=1)if(d.isTimeExact(a,e[f])){c=!0;break}c||(h.isInteger(a)||h.isDate(a)||b.isArray(a)||b.isObject(a)&&a.from&&a.to)&&e.push(a)}),e},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,f=e.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,g,i,j;for(i=0;f>i;i+=1){if(g=e[i],d.isTimeExact(g,a)){c=e[i]=null,j=!0;break}if(d.isTimeOverlap(g,a)){b.isObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[2]||c.push("inverted")):h.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;f>i;i+=1)if(d.isTimeExact(e[i],a)){e[i]=null;break}if(j)for(i=0;f>i;i+=1)if(d.isTimeOverlap(e[i],a)){e[i]=null;break}c&&e.push(c)}),e.filter(function(a){return null!=a})},c.prototype.i=function(a,b){return h.isInteger(b)&&b>0?b:this.item.interval},c.prototype.nodes=function(a){var b=this,c=b.settings,d=b.item.select,e=b.item.highlight,f=b.item.view,g=b.item.disable;return h.node("ul",h.group({min:b.item.min.pick,max:b.item.max.pick,i:b.item.interval,node:"li",item:function(a){a=b.create(a);var i=a.pick,j=d&&d.pick==i,k=e&&e.pick==i,l=g&&b.disabled(a);return[h.trigger(b.formats.toString,b,[h.trigger(c.formatLabel,b,[a])||c.format,a]),function(a){return j&&a.push(c.klass.selected),k&&a.push(c.klass.highlighted),f&&f.pick==i&&a.push(c.klass.viewset),l&&a.push(c.klass.disabled),a.join(" ")}([c.klass.listItem]),"data-pick="+a.pick+" "+h.ariaAttr({role:"button",controls:b.$node[0].id,checked:j&&b.$node.val()===h.trigger(b.formats.toString,b,[c.format,a])?!0:null,activedescendant:k?!0:null,disabled:l?!0:null})]}})+h.node("li",h.node("button",c.clear,c.klass.buttonClear,"type=button data-clear=1"+(a?"":" disable"))),c.klass.list)},c.defaults=function(a){return{clear:"Clear",format:"h:i A",interval:30,klass:{picker:a+" "+a+"--time",holder:a+"__holder",list:a+"__list",listItem:a+"__list-item",disabled:a+"__list-item--disabled",selected:a+"__list-item--selected",highlighted:a+"__list-item--highlighted",viewset:a+"__list-item--viewset",now:a+"__list-item--now",buttonClear:a+"__button--clear"}}}(a.klasses().picker),a.extend("pickatime",c)});
/*!
 * Legacy browser support
 */
[].map||(Array.prototype.map=function(a,b){for(var c=this,d=c.length,e=new Array(d),f=0;d>f;f++)f in c&&(e[f]=a.call(b,c[f],f,c));return e}),[].filter||(Array.prototype.filter=function(a){if(null==this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=[],e=arguments[1],f=0;c>f;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),[].indexOf||(Array.prototype.indexOf=function(a){if(null==this)throw new TypeError;var b=Object(this),c=b.length>>>0;if(0===c)return-1;var d=0;if(arguments.length>1&&(d=Number(arguments[1]),d!=d?d=0:0!==d&&1/0!=d&&d!=-1/0&&(d=(d>0||-1)*Math.floor(Math.abs(d)))),d>=c)return-1;for(var e=d>=0?d:Math.max(c-Math.abs(d),0);c>e;e++)if(e in b&&b[e]===a)return e;return-1});/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * http://blog.stevenlevithan.com/archives/cross-browser-split
 */
var nativeSplit=String.prototype.split,compliantExecNpcg=void 0===/()??/.exec("")[1];String.prototype.split=function(a,b){var c=this;if("[object RegExp]"!==Object.prototype.toString.call(a))return nativeSplit.call(c,a,b);var d,e,f,g,h=[],i=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.extended?"x":"")+(a.sticky?"y":""),j=0;for(a=new RegExp(a.source,i+"g"),c+="",compliantExecNpcg||(d=new RegExp("^"+a.source+"$(?!\\s)",i)),b=void 0===b?-1>>>0:b>>>0;(e=a.exec(c))&&(f=e.index+e[0].length,!(f>j&&(h.push(c.slice(j,e.index)),!compliantExecNpcg&&e.length>1&&e[0].replace(d,function(){for(var a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(e[a]=void 0)}),e.length>1&&e.index<c.length&&Array.prototype.push.apply(h,e.slice(1)),g=e[0].length,j=f,h.length>=b)));)a.lastIndex===e.index&&a.lastIndex++;return j===c.length?(g||!a.test(""))&&h.push(""):h.push(c.slice(j)),h.length>b?h.slice(0,b):h};
angular.module("angular-datepicker",[]).directive("pickADate",function(){return{restrict:"A",scope:{pickADate:"=",pickADateOptions:"="},link:function(a,b){function c(c){if("function"==typeof f&&f.apply(this,arguments),!a.$$phase&&!a.$root.$$phase){var d=b.pickadate("picker").get("select");a.$apply(function(){return c.hasOwnProperty("clear")?void(a.pickADate=null):(a.pickADate&&"string"!=typeof a.pickADate||(a.pickADate=new Date(0)),a.pickADate.setYear(d.obj.getYear()+1900),a.pickADate.setMonth(d.obj.getMonth()),void a.pickADate.setDate(d.obj.getDate()))})}}function d(){if("function"==typeof g&&g.apply(this,arguments),"undefined"!=typeof cordova&&cordova.plugins&&cordova.plugins.Keyboard){var a=function(){cordova.plugins.Keyboard.close(),window.removeEventListener("native.keyboardshow",this)};window.addEventListener("native.keyboardshow",a),setTimeout(function(){window.removeEventListener("native.keyboardshow",a)},500)}}var e=a.pickADateOptions||{},f=e.onSet,g=e.onClose;b.pickadate(angular.extend(e,{onSet:c,onClose:d,container:document.body})),setTimeout(function(){a.pickADate&&b.pickadate("picker").set("select",a.pickADate)},1e3)}}}).directive("pickATime",function(){return{restrict:"A",scope:{pickATime:"=",pickATimeOptions:"="},link:function(a,b){function c(c){if("function"==typeof f&&f.apply(this,arguments),!a.$$phase&&!a.$root.$$phase){var d=b.pickatime("picker").get("select");a.$apply(function(){return c.hasOwnProperty("clear")?void(a.pickATime=null):(a.pickATime&&"string"!=typeof a.pickATime||(a.pickATime=new Date),a.pickATime.setHours(d.hour),a.pickATime.setMinutes(d.mins),a.pickATime.setSeconds(0),void a.pickATime.setMilliseconds(0))})}}function d(){if("function"==typeof g&&g.apply(this,arguments),"undefined"!=typeof cordova&&cordova.plugins&&cordova.plugins.Keyboard){var a=function(){cordova.plugins.Keyboard.close(),window.removeEventListener("native.keyboardshow",this)};window.addEventListener("native.keyboardshow",a),setTimeout(function(){window.removeEventListener("native.keyboardshow",a)},500)}}var e=a.pickATimeOptions||{},f=e.onSet,g=e.onClose;b.pickatime(angular.extend(e,{onSet:c,onClose:d,container:document.body})),setTimeout(function(){a.pickATime&&b.pickatime("picker").set("select",a.pickATime)},1e3)}}});angular.module('QuickList', []);

angular.module('QuickList').value('quickRepeatList', {});

angular.module('QuickList').directive('quickNgRepeat',
['$parse', '$animate', 'quickRepeatList', function($parse, $animate, quick_repeat_list) {
  var NG_REMOVED = '$$NG_REMOVED';
  var ngRepeatMinErr = 'err';
  var uid = ['0', '0', '0'];
  var list_id = window.list_id = (function(){
    var i = 0;
    return function(){
      return 'list_' + (++i);
    };
  }());

  function hashKey(obj) {
    var objType = typeof obj,
        key;

    if (objType == 'object' && obj !== null) {
      if (typeof (key = obj.$$hashKey) == 'function') {
        // must invoke on object to keep the right this
        key = obj.$$hashKey();
      } else if (key === undefined) {
        key = obj.$$hashKey = nextUid();
      }
    } else {
      key = obj;
    }

    return objType + ':' + key;
  };

  function isWindow(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  };

  function nextUid() {
    var index = uid.length;
    var digit;

    while(index) {
      index--;
      digit = uid[index].charCodeAt(0);
      if (digit == 57 /*'9'*/) {
        uid[index] = 'A';
        return uid.join('');
      }
      if (digit == 90  /*'Z'*/) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return uid.join('');
      }
    }
    uid.unshift('0');
    return uid.join('');
  };

  function isArrayLike(obj) {
    if (obj == null || isWindow(obj)) {
      return false;
    }

    var length = obj.length;

    if (obj.nodeType === 1 && length) {
      return true;
    }

    return angular.isArray(obj) || !angular.isFunction(obj) && (
      length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj
    );
  };


  return {
    transclude: 'element',
    priority: 1000,
    terminal: true,
    compile: function(element, attr, linker) {
      return function($scope, $element, $attr){
        var expression = $attr.quickNgRepeat;
        var match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
          trackByExp, trackByExpGetter, trackByIdFn, trackByIdArrayFn, trackByIdObjFn, lhs, rhs, valueIdentifier, keyIdentifier,
          hashFnLocals = {$id: hashKey};

        if (!match) {
          throw ngRepeatMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
            expression);
        }

        lhs = match[1];
        rhs = match[2];
        trackByExp = match[4];

        if (trackByExp) {
          trackByExpGetter = $parse(trackByExp);
          trackByIdFn = function(key, value, index) {
            // assign key, value, and $index to the locals so that they can be used in hash functions
            if (keyIdentifier) hashFnLocals[keyIdentifier] = key;
            hashFnLocals[valueIdentifier] = value;
            hashFnLocals.$index = index;
            return trackByExpGetter($scope, hashFnLocals);
          };
        } else {
          trackByIdArrayFn = function(key, value) {
            return hashKey(value);
          }
          trackByIdObjFn = function(key) {
            return key;
          }
        }

        match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
        if (!match) {
          throw ngRepeatMinErr('iidexp', "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",
                                                                    lhs);
        }
        valueIdentifier = match[3] || match[1];
        keyIdentifier = match[2];

        // Store a list of elements from previous run. This is a hash where key is the item from the
        // iterator, and the value is objects with following properties.
        //   - scope: bound scope
        //   - element: previous element.
        //   - index: position
        var lastBlockMap = {};

        var list_name = $attr.quickRepeatList || list_id();

        //watch props
        $scope.$watch(rhs, quick_repeat_list[list_name] = function(collection){
          var index, length,
              previousNode = $element[0],     // current position of the node
              nextNode,
              // Same as lastBlockMap but it has the current state. It will become the
              // lastBlockMap on the next iteration.
              nextBlockMap = {},
              arrayLength,
              childScope,
              key, value, // key/value of iteration
              trackById,
              collectionKeys,
              block,       // last object information {scope, element, id}
              nextBlockOrder = [];


          if (isArrayLike(collection)) {
            collectionKeys = collection;
            trackByIdFn = trackByIdFn || trackByIdArrayFn;
          } else {
            trackByIdFn = trackByIdFn || trackByIdObjFn;
            // if object, extract keys, sort them and use to determine order of iteration over obj props
            collectionKeys = [];
            for (key in collection) {
              if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                collectionKeys.push(key);
              }
            }
            collectionKeys.sort();
          }

          arrayLength = collectionKeys.length;

          // locate existing items
          length = nextBlockOrder.length = collectionKeys.length;
          for(index = 0; index < length; index++) {
           key = (collection === collectionKeys) ? index : collectionKeys[index];
           value = collection[key];
           trackById = trackByIdFn(key, value, index);
           if(lastBlockMap.hasOwnProperty(trackById)) {
             block = lastBlockMap[trackById]
             delete lastBlockMap[trackById];
             nextBlockMap[trackById] = block;
             nextBlockOrder[index] = block;
           } else if (nextBlockMap.hasOwnProperty(trackById)) {
             // restore lastBlockMap
             angular.forEach(nextBlockOrder, function(block) {
               if (block && block.startNode) lastBlockMap[block.id] = block;
             });
             // This is a duplicate and we need to throw an error
             throw ngRepeatMinErr('dupes', "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}",
                                                                                                                                                    expression,       trackById);
           } else {
             // new never before seen block
             nextBlockOrder[index] = { id: trackById };
             nextBlockMap[trackById] = false;
           }
         }

          // remove existing items
          for (key in lastBlockMap) {
            if (lastBlockMap.hasOwnProperty(key)) {
              block = lastBlockMap[key];
              $animate.leave(block.elements);
              angular.forEach(block.elements, function(element) { element[NG_REMOVED] = true});
              block.scope.$destroy();
            }
          }

          // we are not using forEach for perf reasons (trying to avoid #call)
          for (index = 0, length = collectionKeys.length; index < length; index++) {
            key = (collection === collectionKeys) ? index : collectionKeys[index];
            value = collection[key];
            block = nextBlockOrder[index];

            if (block.startNode) {
              // if we have already seen this object, then we need to reuse the
              // associated scope/element
              childScope = block.scope;

              nextNode = previousNode;
              do {
                nextNode = nextNode.nextSibling;
              } while(nextNode && nextNode[NG_REMOVED]);

              if (block.startNode == nextNode) {
                // do nothing
              } else {
                // existing item which got moved
                $animate.move(block.elements, null, angular.element(previousNode));
              }
              previousNode = block.endNode;
            } else {
              // new item which we don't know about
              childScope = $scope.$new();
            }

            childScope[valueIdentifier] = value;
            if (keyIdentifier) childScope[keyIdentifier] = key;
            childScope.$index = index;
            childScope.$first = (index === 0);
            childScope.$last = (index === (arrayLength - 1));
            childScope.$middle = !(childScope.$first || childScope.$last);
            childScope.$odd = !(childScope.$even = index%2==0);

            if (!block.startNode) {
              linker(childScope, function(clone) {
                $animate.enter(clone, null, angular.element(previousNode));
                previousNode = clone;
                block.scope = childScope;
                block.startNode = clone[0];
                block.elements = clone;
                block.endNode = clone[clone.length - 1];
                nextBlockMap[block.id] = block;
              });

              if (childScope.$$phase !== '$digest'){
                childScope.$digest();
              }
            }
          }
          lastBlockMap = nextBlockMap;
        });
      };
    }
  };
}]

);
/*!
 * ngCordova
 * v0.1.12-alpha
 * Copyright 2014 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
(function(){

angular.module('ngCordova', [
  'ngCordova.plugins'
]);

// install  :     cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-actionsheet.git
// link     :     https://github.com/EddyVerbruggen/cordova-plugin-actionsheet

angular.module('ngCordova.plugins.actionSheet', [])

  .factory('$cordovaActionSheet', ['$q', '$window', function ($q, $window) {

    return {
      show: function (options) {
        var q = $q.defer();

        $window.plugins.actionsheet.show(options, function (result) {
          q.resolve(result);
        });

        return q.promise;
      },

      hide: function () {
        return $window.plugins.actionsheet.hide();
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-admob.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-admob

angular.module('ngCordova.plugins.adMob', [])

  .factory('$cordovaAdMob', ['$q', '$window', function ($q, $window) {

    return {
      createBannerView: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.createBannerView(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createInterstitialView: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.createInterstitialView(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      requestAd: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.requestAd(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showAd: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.showAd(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      requestInterstitialAd: function (options) {
        var d = $q.defer();

        $window.plugins.AdMob.requestInterstitialAd(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/ohh2ahh/AppAvailability.git
// link     :     https://github.com/ohh2ahh/AppAvailability

angular.module('ngCordova.plugins.appAvailability', [])

  .factory('$cordovaAppAvailability', ['$q', function ($q) {

    return {
      check: function (urlScheme) {
        var q = $q.defer();

        appAvailability.check(urlScheme, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/pushandplay/cordova-plugin-apprate.git
// link     :     https://github.com/pushandplay/cordova-plugin-apprate

angular.module('ngCordova.plugins.appRate', [])

  .provider("$cordovaAppRate", [function () {


    this.setPreferences = function (defaults) {
      if (!defaults || !angular.isObject(defaults)) {
        return;
      }

      AppRate.preferences.useLanguage = defaults.language || null;
      AppRate.preferences.displayAppName = defaults.appName || "";
      AppRate.preferences.promptAgainForEachNewVersion = defaults.promptForNewVersion || true;
      AppRate.preferences.openStoreInApp = defaults.openStoreInApp || false;
      AppRate.preferences.usesUntilPrompt = defaults.usesUntilPrompt || 3;
      AppRate.preferences.useCustomRateDialog = defaults.useCustomRateDialog || false;
      AppRate.preferences.storeAppURL.ios = defaults.iosURL || null;
      AppRate.preferences.storeAppURL.android = defaults.androidURL || null;
      AppRate.preferences.storeAppURL.blackberry = defaults.blackberryURL || null;
      AppRate.preferences.storeAppURL.windows8 = defaults.windowsURL || null;
    };


    this.setCustomLocale = function (customObj) {
      var strings = {
        title: 'Rate %@',
        message: 'If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!',
        cancelButtonLabel: 'No, Thanks',
        laterButtonLabel: 'Remind Me Later',
        rateButtonLabel: 'Rate It Now'
      };

      strings = angular.extend(strings, customObj);

      AppRate.preferences.customLocale = strings;
    };

    this.$get = ['$q', function ($q) {
      return {
        promptForRating: function (immediate) {
          var q = $q.defer();
          var prompt = AppRate.promptForRating(immediate);
          q.resolve(prompt);

          return q.promise;
        },

        onButtonClicked: function (cb) {
          AppRate.onButtonClicked = function (buttonIndex) {
            cb.call(this, buttonIndex);
          };
        },

        onRateDialogShow: function (cb) {
          AppRate.onRateDialogShow = cb();
        }
      };
    }];
  }]);

// install   :     cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
// link      :     https://github.com/whiteoctober/cordova-plugin-app-version

angular.module('ngCordova.plugins.appVersion', [])

  .factory('$cordovaAppVersion', ['$q', function ($q) {

    return {
      getAppVersion: function () {
        var q = $q.defer();
        cordova.getAppVersion(function (version) {
          q.resolve(version);
        });

        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/christocracy/cordova-plugin-background-geolocation.git
// link      :     https://github.com/christocracy/cordova-plugin-background-geolocation

angular.module('ngCordova.plugins.backgroundGeolocation', [])

  .factory('$cordovaBackgroundGeolocation', ['$q', '$window', function ($q, $window) {

    return {

      init: function () {
        $window.navigator.geolocation.getCurrentPosition(function (location) {
          return location;
        });
      },

      configure: function (options) {

        this.init();
        var q = $q.defer();

        $window.plugins.backgroundGeoLocation.configure(
          function (result) {
            q.notify(result);
            $window.plugins.backgroundGeoLocation.finish();
          },
          function (err) {
            q.reject(err);
          }, options);

        this.start();

        return q.promise;
      },

      start: function () {
        var q = $q.defer();

        $window.plugins.backgroundGeoLocation.start(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });

        return q.promise;
      },

      stop: function () {
        var q = $q.defer();

        $window.plugins.backgroundGeoLocation.stop(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });

        return q.promise;
      }
    };
  }
  ]);

// install  :     cordova plugin add de.appplant.cordova.plugin.badge
// link     :     https://github.com/katzer/cordova-plugin-badge

angular.module('ngCordova.plugins.badge', [])

  .factory('$cordovaBadge', ['$q', function ($q) {

    return {
      hasPermission: function () {
        var q = $q.defer();
        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(true);
          }
          else {
            q.reject("You do not have permission");
          }
        });

        return q.promise;
      },

      promptForPermission: function () {
        return cordova.plugins.notification.badge.promptForPermission();
      },

      set: function (number) {
        var q = $q.defer();

        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(cordova.plugins.notification.badge.set(number));
          }
          else {
            q.reject("You do not have permission to set Badge");
          }
        });
        return q.promise;
      },

      get: function () {
        var q = $q.defer();
        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            cordova.plugins.notification.badge.get(function (badge) {
              q.resolve(badge);
            });
          } else {
            q.reject("You do not have permission to get Badge");
          }
        });

        return q.promise;
      },

      clear: function () {
        var q = $q.defer();

        cordova.plugins.notification.badge.hasPermission(function (permission) {
          if (permission) {
            q.resolve(cordova.plugins.notification.badge.clear());
          }
          else {
            q.reject("You do not have permission to clear Badge");
          }
        });
        return q.promise;
      },

      configure: function (config) {
        return cordova.plugins.notification.badge.configure(config);
      }
    };
  }]);

// install  :    cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
// link     :    https://github.com/wildabeast/BarcodeScanner/#using-the-plugin

angular.module('ngCordova.plugins.barcodeScanner', [])

  .factory('$cordovaBarcodeScanner', ['$q', function ($q) {

    return {
      scan: function () {
        var q = $q.defer();

        cordova.plugins.barcodeScanner.scan(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      encode: function (type, data) {
        var q = $q.defer();
        type = type || "TEXT_TYPE";

        cordova.plugins.barcodeScanner.encode(type, data, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

//  install   :   cordova plugin add org.apache.cordova.battery-status
//  link      :   https://github.com/apache/cordova-plugin-battery-status/blob/master/doc/index.md

angular.module('ngCordova.plugins.batteryStatus', [])

  .factory('$cordovaBatteryStatus', ['$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout) {

    var batteryStatus = function (status) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaBatteryStatus:status', status);
      });
    };

    var batteryCritical = function (status) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaBatteryStatus:critical', status);
      });
    };

    var batteryLow = function (status) {
      $timeout(function () {
        $rootScope.$broadcast('$cordovaBatteryStatus:low', status);
      });
    };

    document.addEventListener("deviceready", function () {
      if (navigator.battery) {
        $window.addEventListener('batterystatus', batteryStatus, false);
        $window.addEventListener('batterycritical', batteryCritical, false);
        $window.addEventListener('batterylow', batteryLow, false);

      }
    }, false);
    return true;
  }])
  .run(['$cordovaBatteryStatus', function ($cordovaBatteryStatus) {
  }]);

//  install   :   cordova plugin add https://github.com/don/cordova-plugin-ble-central#:/plugin
//  link      :   https://github.com/don/cordova-plugin-ble-central

angular.module('ngCordova.plugins.ble', [])

  .factory('$cordovaBLE', ['$q', function ($q) {

    return {
      scan: function (services, seconds) {
        var q = $q.defer();
        ble.scan(services, seconds, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      connect: function (deviceID) {
        var q = $q.defer();
        ble.connect(deviceID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      disconnect: function (deviceID) {
        var q = $q.defer();
        ble.disconnect(deviceID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      read: function (deviceID, serviceUUID, characteristicUUID) {
        var q = $q.defer();
        ble.read(deviceID, serviceUUID, characteristicUUID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      write: function (deviceID, serviceUUID, characteristicUUID, data) {
        var q = $q.defer();
        ble.write(deviceID, serviceUUID, characteristicUUID, data, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      writeCommand: function (deviceID, serviceUUID, characteristicUUID, data) {
        var q = $q.defer();
        ble.writeCommand(deviceID, serviceUUID, characteristicUUID, data, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      notify: function (deviceID, serviceUUID, characteristicUUID) {
        var q = $q.defer();
        ble.notify(deviceID, serviceUUID, characteristicUUID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      indicate: function (deviceID, serviceUUID, characteristicUUID) {
        var q = $q.defer();
        ble.indicate(deviceID, serviceUUID, characteristicUUID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      isConnected: function (deviceID) {
        var q = $q.defer();
        ble.isConnected(deviceID, function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      isEnabled: function () {
        var q = $q.defer();
        ble.isEnabled(function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add com.megster.cordova.bluetoothserial
// link      :     https://github.com/don/BluetoothSerial

angular.module('ngCordova.plugins.bluetoothSerial', [])

  .factory('$cordovaBluetoothSerial', ['$q', '$window', function ($q, $window) {

    return {
      connect: function (address) {
        var q = $q.defer();
        $window.bluetoothSerial.connect(address, function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      // not supported on iOS
      connectInsecure: function (address) {
        var q = $q.defer();
        $window.bluetoothSerial.connectInsecure(address, function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      disconnect: function () {
        var q = $q.defer();
        $window.bluetoothSerial.disconnect(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      list: function () {
        var q = $q.defer();
        $window.bluetoothSerial.list(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      isEnabled: function () {
        var q = $q.defer();
        $window.bluetoothSerial.isEnabled(function () {
          q.resolve();
        }, function () {
          q.reject();
        });
        return q.promise;
      },


      isConnected: function () {
        var q = $q.defer();
        $window.bluetoothSerial.isConnected(function () {
          q.resolve();
        }, function () {
          q.reject();
        });
        return q.promise;
      },


      available: function () {
        var q = $q.defer();
        $window.bluetoothSerial.available(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      read: function () {
        var q = $q.defer();
        $window.bluetoothSerial.read(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      readUntil: function (delimiter) {
        var q = $q.defer();
        $window.bluetoothSerial.readUntil(delimiter, function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      write: function (data) {
        var q = $q.defer();
        $window.bluetoothSerial.write(data, function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      subscribe: function (delimiter) {
        var q = $q.defer();
        $window.bluetoothSerial.subscribe(delimiter, function (data) {
          q.notify(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      subscribeRawData: function () {
        var q = $q.defer();
        $window.bluetoothSerial.subscribeRawData(function (data) {
          q.notify(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      unsubscribe: function () {
        var q = $q.defer();
        $window.bluetoothSerial.unsubscribe(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      unsubscribeRawData: function () {
        var q = $q.defer();
        $window.bluetoothSerial.unsubscribeRawData(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      clear: function () {
        var q = $q.defer();
        $window.bluetoothSerial.clear(function () {
          q.resolve();
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      readRSSI: function () {
        var q = $q.defer();
        $window.bluetoothSerial.readRSSI(function (data) {
          q.resolve(data);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      }
    };
  }]);

// install  :    cordova plugin add https://github.com/fiscal-cliff/phonegap-plugin-brightness.git
// link     :    https://github.com/fiscal-cliff/phonegap-plugin-brightness

angular.module('ngCordova.plugins.brightness', [])

  .factory('$cordovaBrightness', ['$q', '$window', function ($q, $window) {

    return {
      get: function () {
        var q = $q.defer();

        $window.cordova.plugins.brightness.getBrightness(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      set: function (data) {
        var q = $q.defer();

        $window.cordova.plugins.brightness.setBrightness(data, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      setKeepScreenOn: function (bool) {
        var q = $q.defer();

        $window.cordova.plugins.brightness.setKeepScreenOn(bool, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);




// install  :     cordova plugin add https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin.git
// link     :     https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin

angular.module('ngCordova.plugins.calendar', [])

  .factory('$cordovaCalendar', ['$q', '$window', function ($q, $window) {
    return {
      createCalendar: function (options) {
        var d = $q.defer(),
          createCalOptions = $window.plugins.calendar.getCreateCalendarOptions();

        if (typeof options === 'string') {
          createCalOptions.calendarName = options;
        } else {
          createCalOptions = angular.extend(createCalOptions, options);
        }

        $window.plugins.calendar.createCalendar(createCalOptions, function (message) {
          d.resolve(message);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      deleteCalendar: function (calendarName) {
        var d = $q.defer();

        $window.plugins.calendar.deleteCalendar(calendarName, function (message) {
          d.resolve(message);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      createEvent: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.createEvent(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      createEventWithOptions: function (options) {
        var d = $q.defer(),
          defaultOptionKeys = [],
          calOptions = window.plugins.calendar.getCalendarOptions(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptionKeys = Object.keys(defaultOptions);

        for (var key in options) {
          if (defaultOptionKeys.indexOf(key) === -1) {
            calOptions[key] = options[key];
          } else {
            defaultOptions[key] = options[key];
          }
        }

        $window.plugins.calendar.createEventWithOptions(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          calOptions,
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      createEventInteractively: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.createEventInteractively(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      createEventInNamedCalendar: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null,
            calendarName: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.createEventInNamedCalendar(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          defaultOptions.calendarName,
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      findEvent: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.findEvent(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          function (foundEvent) {
            d.resolve(foundEvent);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      listEventsInRange: function (startDate, endDate) {
        var d = $q.defer();

        $window.plugins.calendar.listEventsInRange(startDate, endDate, function (events) {
          d.resolve(events);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      listCalendars: function () {
        var d = $q.defer();

        $window.plugins.calendar.listCalendars(function (calendars) {
          d.resolve(calendars);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      findAllEventsInNamedCalendar: function (calendarName) {
        var d = $q.defer();

        $window.plugins.calendar.findAllEventsInNamedCalendar(calendarName, function (events) {
          d.resolve(events);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      modifyEvent: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            title: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null,
            newTitle: null,
            newLocation: null,
            newNotes: null,
            newStartDate: null,
            newEndDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.modifyEvent(
          defaultOptions.title,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          defaultOptions.newTitle,
          defaultOptions.newLocation,
          defaultOptions.newNotes,
          new Date(defaultOptions.newStartDate),
          new Date(defaultOptions.newEndDate),
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      },

      deleteEvent: function (options) {
        var d = $q.defer(),
          defaultOptions = {
            newTitle: null,
            location: null,
            notes: null,
            startDate: null,
            endDate: null
          };

        defaultOptions = angular.extend(defaultOptions, options);

        $window.plugins.calendar.deleteEvent(
          defaultOptions.newTitle,
          defaultOptions.location,
          defaultOptions.notes,
          new Date(defaultOptions.startDate),
          new Date(defaultOptions.endDate),
          function (message) {
            d.resolve(message);
          }, function (error) {
            d.reject(error);
          }
        );

        return d.promise;
      }
    };
  }]);

// install   :   cordova plugin add org.apache.cordova.camera
// link      :   https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md#orgapachecordovacamera

angular.module('ngCordova.plugins.camera', [])

  .factory('$cordovaCamera', ['$q', function ($q) {

    return {
      getPicture: function (options) {
        var q = $q.defer();

        if (!navigator.camera) {
          q.resolve(null);
          return q.promise;
        }

        navigator.camera.getPicture(function (imageData) {
          q.resolve(imageData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      cleanup: function () {
        var q = $q.defer();

        navigator.camera.cleanup(function () {
          q.resolve();
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

// install   :    cordova plugin add org.apache.cordova.media-capture
// link      :    https://github.com/apache/cordova-plugin-media-capture/blob/master/doc/index.md

angular.module('ngCordova.plugins.capture', [])

  .factory('$cordovaCapture', ['$q', function ($q) {

    return {
      captureAudio: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureAudio(function (audioData) {
          q.resolve(audioData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      captureImage: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureImage(function (imageData) {
          q.resolve(imageData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },
      captureVideo: function (options) {
        var q = $q.defer();

        if (!navigator.device.capture) {
          q.resolve(null);
          return q.promise;
        }

        navigator.device.capture.captureVideo(function (videoData) {
          q.resolve(videoData);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/VersoSolutions/CordovaClipboard
// link      :     https://github.com/VersoSolutions/CordovaClipboard

angular.module('ngCordova.plugins.clipboard', [])

  .factory('$cordovaClipboard', ['$q', '$window', function ($q, $window) {

    return {
      copy: function (text) {
        var q = $q.defer();

        $window.cordova.plugins.clipboard.copy(text,
          function () {
            q.resolve();
          }, function () {
            q.reject();
          });

        return q.promise;
      },

      paste: function () {
        var q = $q.defer();

        $window.cordova.plugins.clipboard.paste(function (text) {
          q.resolve(text);
        }, function () {
          q.reject();
        });

        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.contacts
// link      :     https://github.com/apache/cordova-plugin-contacts/blob/master/doc/index.md

angular.module('ngCordova.plugins.contacts', [])

  .factory('$cordovaContacts', ['$q', function ($q) {

    return {
      save: function (contact) {
        var q = $q.defer();
        var deviceContact = navigator.contacts.create(contact);

        deviceContact.save(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });
        return q.promise;
      },

      remove: function (contact) {
        var q = $q.defer();
        var deviceContact = navigator.contacts.create(contact);

        deviceContact.remove(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });
        return q.promise;
      },

      clone: function (contact) {
        var deviceContact = navigator.contacts.create(contact);
        return deviceContact.clone(contact);
      },

      find: function (options) {
        var q = $q.defer();
        var fields = options.fields || ['id', 'displayName'];
        delete options.fields;

        navigator.contacts.find(fields, function (results) {
          q.resolve(results);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      pickContact: function () {
        var q = $q.defer();

        navigator.contacts.pickContact(function (contact) {
          q.resolve(contact);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }

      // TODO: method to set / get ContactAddress
      // TODO: method to set / get ContactError
      // TODO: method to set / get ContactField
      // TODO: method to set / get ContactName
      // TODO: method to set / get ContactOrganization
    };
  }]);

// install   :      cordova plugin add https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git
// link      :      https://github.com/VitaliiBlagodir/cordova-plugin-datepicker

angular.module('ngCordova.plugins.datePicker', [])
  .factory('$cordovaDatePicker', ['$window', '$q', function ($window, $q) {
    return {
      show: function (options) {
        var q = $q.defer();
        options = options || {date: new Date(), mode: 'date'};
        $window.datePicker.show(options, function (date) {
          q.resolve(date);
        });
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.device
// link      :     https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md

angular.module('ngCordova.plugins.device', [])

  .factory('$cordovaDevice', [function () {

    return {
      /**
       * Returns the whole device object.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md
       * @returns {Object} The device object.
       */
      getDevice: function () {
        return device;
      },

      /**
       * Returns the Cordova version.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#devicecordova
       * @returns {String} The Cordova version.
       */
      getCordova: function () {
        return device.cordova;
      },

      /**
       * Returns the name of the device's model or product.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#devicemodel
       * @returns {String} The name of the device's model or product.
       */
      getModel: function () {
        return device.model;
      },

      /**
       * @deprecated device.name is deprecated as of version 2.3.0. Use device.model instead.
       * @returns {String}
       */
      getName: function () {
        return device.name;
      },

      /**
       * Returns the device's operating system name.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceplatform
       * @returns {String} The device's operating system name.
       */
      getPlatform: function () {
        return device.platform;
      },

      /**
       * Returns the device's Universally Unique Identifier.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceuuid
       * @returns {String} The device's Universally Unique Identifier
       */
      getUUID: function () {
        return device.uuid;
      },

      /**
       * Returns the operating system version.
       * @see https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md#deviceversion
       * @returns {String}
       */
      getVersion: function () {
        return device.version;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.device-motion
// link      :     https://github.com/apache/cordova-plugin-device-motion/blob/master/doc/index.md

angular.module('ngCordova.plugins.deviceMotion', [])

  .factory('$cordovaDeviceMotion', ['$q', function ($q) {

    return {
      getCurrentAcceleration: function () {
        var q = $q.defer();

        navigator.accelerometer.getCurrentAcceleration(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchAcceleration: function (options) {
        var q = $q.defer();

        var watchID = navigator.accelerometer.watchAcceleration(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        q.promise.cancel = function () {
          navigator.accelerometer.clearWatch(watchID);
        };

        q.promise.clearWatch = function (id) {
          navigator.accelerometer.clearWatch(id || watchID);
        };

        q.promise.watchID = watchID;

        return q.promise;
      },

      clearWatch: function (watchID) {
        return navigator.accelerometer.clearWatch(watchID);
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.device-orientation
// link      :     https://github.com/apache/cordova-plugin-device-orientation/blob/master/doc/index.md

angular.module('ngCordova.plugins.deviceOrientation', [])

  .factory('$cordovaDeviceOrientation', ['$q', function ($q) {

    return {
      getCurrentHeading: function () {
        var q = $q.defer();

        navigator.compass.getCurrentHeading(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      watchHeading: function (options) {
        var q = $q.defer();

        var watchID = navigator.compass.watchHeading(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        q.promise.cancel = function () {
          navigator.compass.clearWatch(watchID);
        };

        q.promise.clearWatch = function (id) {
          navigator.compass.clearWatch(id || watchID);
        };

        q.promise.watchID = watchID;

        return q.promise;
      },

      clearWatch: function (watchID) {
        return navigator.compass.clearWatch(watchID);
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.dialogs
// link      :     https://github.com/apache/cordova-plugin-dialogs/blob/master/doc/index.md

angular.module('ngCordova.plugins.dialogs', [])

  .factory('$cordovaDialogs', ['$q', '$window', function ($q, $window) {

    return {
      alert: function (message, title, buttonName) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          $window.alert(message);
          q.resolve();
        }
        else {
          navigator.notification.alert(message, function () {
            q.resolve();
          }, title, buttonName);
        }

        return q.promise;
      },

      confirm: function (message, title, buttonLabels) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          if ($window.confirm(message)) {
            q.resolve(1);
          }
          else {
            q.resolve(2);
          }
        }
        else {
          navigator.notification.confirm(message, function (buttonIndex) {
            q.resolve(buttonIndex);
          }, title, buttonLabels);
        }

        return q.promise;
      },

      prompt: function (message, title, buttonLabels, defaultText) {
        var q = $q.defer();

        if (!$window.navigator.notification) {
          var res = $window.prompt(message, defaultText);
          if (res !== null) {
            q.resolve({input1: res, buttonIndex: 1});
          }
          else {
            q.resolve({input1: res, buttonIndex: 2});
          }
        }
        else {
          navigator.notification.prompt(message, function (result) {
            q.resolve(result);
          }, title, buttonLabels, defaultText);
        }
        return q.promise;
      },

      beep: function (times) {
        return navigator.notification.beep(times);
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git@0.8.2
// link     :     https://github.com/katzer/cordova-plugin-email-composer

angular.module('ngCordova.plugins.emailComposer', [])

  .factory('$cordovaEmailComposer', ['$q', function ($q) {

    return {
      isAvailable: function () {
        var q = $q.defer();

        cordova.plugins.email.isAvailable(function (isAvailable) {
          isAvailable ? q.resolve() : q.reject();
        });

        return q.promise;
      },

      open: function (properties) {
        var q = $q.defer();

        cordova.plugins.email.open(properties, function () {
          q.reject(); // user closed email composer
        });

        return q.promise;
      },

      addAlias: function (app, schema) {
        cordova.plugins.email.addAlias(app, schema);
      }
    };
  }]);

// install   :   cordova -d plugin add /Users/your/path/here/phonegap-facebook-plugin --variable APP_ID="123456789" --variable APP_NAME="myApplication"
// link      :   https://github.com/Wizcorp/phonegap-facebook-plugin

angular.module('ngCordova.plugins.facebook', [])

  .provider('$cordovaFacebook', [function () {

    this.browserInit = function (id, version) {
      this.appID = id;
      this.appVersion = version || "v2.0";
      facebookConnectPlugin.browserInit(this.appID, this.appVersion);
    };

    this.$get = ['$q', function ($q) {
      return {
        login: function (permissions) {
          var q = $q.defer();
          facebookConnectPlugin.login(permissions, function (res) {
            q.resolve(res);
          }, function (res) {
            q.reject(res);
          });

          return q.promise;
        },

        showDialog: function (options) {
          var q = $q.defer();
          facebookConnectPlugin.showDialog(options, function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        },

        api: function (path, permissions) {
          var q = $q.defer();
          facebookConnectPlugin.api(path, permissions, function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        },

        getAccessToken: function () {
          var q = $q.defer();
          facebookConnectPlugin.getAccessToken(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        },

        getLoginStatus: function () {
          var q = $q.defer();
          facebookConnectPlugin.getLoginStatus(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        },

        logout: function () {
          var q = $q.defer();
          facebookConnectPlugin.logout(function (res) {
            q.resolve(res);
          }, function (err) {
            q.reject(err);
          });
          return q.promise;
        }
      };
    }];
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-facebookads.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-facebookads

angular.module('ngCordova.plugins.facebookAds', [])
  .factory('$cordovaFacebookAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.FacebookAds.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.FacebookAds.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.FacebookAds.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.FacebookAds.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.FacebookAds.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.FacebookAds.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.FacebookAds.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.FacebookAds.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.file
// link      :     https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md

// TODO: add functionality to define storage size in the getFilesystem() -> requestFileSystem() method
// TODO: add documentation for FileError types

angular.module('ngCordova.plugins.file', [])

  .factory('$cordovaFile', ['$q', '$window', '$log', '$timeout', function ($q, $window, $log, $timeout) {

    return {
      checkDir: function (dir) {
        return getDirectory(dir, {create: false});
      },

      createDir: function (dir, replaceBOOL) {
        return getDirectory(dir, {create: true, exclusive: replaceBOOL});
      },

      listDir: function (filePath) {
        var q = $q.defer();

        getDirectory(filePath, {create: false}).then(function (parent) {
          var reader = parent.createReader();
          reader.readEntries(
            function (entries) {
              q.resolve(entries);
            },
            function () {
              q.reject('DIR_READ_ERROR : ' + filePath);
            });
        }, function () {
          q.reject('DIR_NOT_FOUND : ' + filePath);
        });

        return q.promise;
      },

      checkFile: function (filePath) {
        // Backward compatibility for previous function checkFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        return getFileEntry(filePath, {create: false});
      },

      createFile: function (filePath, replaceBOOL) {
        // Backward compatibility for previous function createFile(filepath replaceBOOL)
        if (arguments.length == 3) {
          filePath = '/' + filePath + '/' + arguments[1];
          replaceBOOL = arguments[2];
        }

        return getFileEntry(filePath, {create: true, exclusive: replaceBOOL});
      },

      removeFile: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function removeFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFileEntry(filePath, {create: false}).then(function (fileEntry) {
          fileEntry.remove(q.resolve, q.reject);
        }, q.reject);

        return q.promise;
      },

      // options is a dict with possible keys :
      // - append : true/false (if true, append data on EOF)
      writeFile: function (filePath, data, options) {
        var q = $q.defer();

        getFileWriter(filePath, {create: true}).then(function (fileWriter) {
          if (options && options['append'] === true) {
            // Start write position at EOF.
            fileWriter.seek(fileWriter.length);
          }
          fileWriter.onwriteend = function (evt) {
            if (this.error)
              q.reject(this.error);
            else
              q.resolve(evt);
          };
          fileWriter.write(data);
        }, q.reject);

        return q.promise;
      },

      readFile: function (filePath) {  /// now deprecated in new ng-cordova version
        $log.log('readFile is now deprecated as of v0.1.4-alpha, use readAsText instead');
        return this.readAsText(filePath);
      },

      readAsText: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false}).then(function (file) {
          getPromisedFileReader(q).readAsText(file);
        }, q.reject);

        return q.promise;
      },


      readAsDataURL: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false}).then(function (file) {
          getPromisedFileReader(q).readAsDataURL(file);
        }, q.reject);

        return q.promise;
      },

      readAsBinaryString: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false}).then(function (file) {
          getPromisedFileReader(q).readAsBinaryString(file);
        }, q.reject);

        return q.promise;
      },

      readAsArrayBuffer: function (filePath) {
        var q = $q.defer();

        // Backward compatibility for previous function readFile(dir, file)
        if (arguments.length == 2) {
          filePath = '/' + filePath + '/' + arguments[1];
        }

        getFile(filePath, {create: false}).then(function (file) {
          getPromisedFileReader(q).readAsArrayBuffer(file);
        }, q.reject);

        return q.promise;
      },

      readFileMetadata: function (filePath) {
        return getFile(filePath, {create: false});
      },

      readFileAbsolute: function (filePath) {
        var q = $q.defer();
        getAbsoluteFile(filePath).then(function (file) {
          getPromisedFileReader(q).readAsText(file);
        }, q.reject);
        return q.promise;
      },

      readFileMetadataAbsolute: function (filePath) {
        return getAbsoluteFile(filePath);
      },

      downloadFile: function (source, filePath, options, trustAllHosts) {
        console.warn("This method is deprecated as of v0.1.11-alpha, please refer to $cordovaFileTransfer");
        var q = $q.defer();
        var ft = new FileTransfer();
        var uri = encodeURI(source);

        if (options && options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            ft.abort();
          }, options.timeout);
          options.timeout = null;
        }

        ft.onprogress = function (progress) {
          q.notify(progress);
        };

        ft.download(uri, filePath, q.resolve, q.reject, trustAllHosts, options);
        return q.promise;
      },

      uploadFile: function (server, filePath, options, trustAllHosts) {
        console.warn("This method is deprecated as of v0.1.11-alpha, please refer to $cordovaFileTransfer");
        var q = $q.defer();
        var ft = new FileTransfer();
        var uri = encodeURI(server);

        if (options && options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            ft.abort();
          }, options.timeout);
          options.timeout = null;
        }

        ft.onprogress = function (progress) {
          q.notify(progress);
        };

        q.promise.abort = function () {
          ft.abort();
        };

        ft.upload(filePath, uri, q.resolve, q.reject, options, trustAllHosts);
        return q.promise;
      }
    };

    /*
     * Returns a new FileReader that will resolve the provided Deferred with
     * the result of the next method called on the FileReader, or reject it
     * if an error occurs while attempting to complete that operation.
     */
    function getPromisedFileReader(deferred) {
      var reader = new FileReader();
      reader.onloadend = function () {
        if (this.error)
          deferred.reject(this.error);
        else
          deferred.resolve(this.result);
      };
      return reader;
    }

    /*
     * Returns a promise that will be resolved with the requested File object
     * or rejected if an error occurs attempting to retreive it.
     */
    function getFile(path, options) {
      var q = $q.defer();
      getFileEntry(path, options).then(function (fileEntry) {
        fileEntry.file(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with a FileWriter bound to the file identified
     * in the provided path or rejected if an error occurs while attempting to initialize
     * the writer.
     */
    function getFileWriter(path, options) {
      var q = $q.defer();
      getFileEntry(path, options).then(function (fileEntry) {
        fileEntry.createWriter(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the FileEntry instance that corresponds
     * to the provided path or rejected if an error occurs while attempting to retrieve the
     * FileEntry.
     */
    function getFileEntry(path, options) {
      var q = $q.defer();
      getFilesystem().then(function (filesystem) {
        filesystem.root.getFile(path, options, q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the File object associated with the requested
     * absolute path, or rejected if an error occurs while trying to initialize that File object.
     */
    function getAbsoluteFile(path) {
      var q = $q.defer();
      $window.resolveLocalFileSystemURL(path, function (fileEntry) {
        fileEntry.file(q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a promise that will either be resolved with the Directory object associated with
     * the requested directory or rejected if an error occurs while atempting to access that directory.
     */
    function getDirectory(dir, options) {
      var q = $q.defer();
      getFilesystem().then(function (filesystem) {
        filesystem.root.getDirectory(dir, options, q.resolve, q.reject);
      }, q.reject);
      return q.promise;
    }

    /*
     * Returns a Promise that will be either resolved with the FileSystem object associated
     * with the device's persistent file system and with 1MB of storage reserved for it,
     * or rejected if an error occurs while trying to accessing the FileSystem
     */
    function getFilesystem() {
      var q = $q.defer();
      try {
        $window.requestFileSystem($window.PERSISTENT, 1024 * 1024, q.resolve, q.reject);
      } catch (err) {
        q.reject(err);
      }
      return q.promise;
    }
  }]);

// install   :      cordova plugin add https://github.com/pwlin/cordova-plugin-file-opener2
// link      :      https://github.com/pwlin/cordova-plugin-file-opener2

angular.module('ngCordova.plugins.fileOpener2', [])

  .factory('$cordovaFileOpener2', ['$q', function ($q) {

    return {
      open: function (file, type) {
        var q = $q.defer();
        cordova.plugins.fileOpener2.open(file, type, {
          error: function (e) {
            q.reject(e);
          }, success: function () {
            q.resolve();
          }
        });
        return q.promise;
      },

      uninstall: function (pack) {
        var q = $q.defer();
        cordova.plugins.fileOpener2.uninstall(pack, {
          error: function (e) {
            q.reject(e);
          }, success: function () {
            q.resolve();
          }
        });
        return q.promise;
      },

      appIsInstalled: function (pack) {
        var q = $q.defer();
        cordova.plugins.fileOpener2.appIsInstalled(pack, {
          success: function (res) {
            q.resolve(res);
          }
        });
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.file-transfer
// link      :     https://github.com/apache/cordova-plugin-file-transfer/blob/master/doc/index.md

angular.module('ngCordova.plugins.fileTransfer', [])

  .factory('$cordovaFileTransfer', ['$q', '$timeout', function ($q, $timeout) {
    return {
      download: function (source, filePath, options, trustAllHosts) {
        var q = $q.defer();
        var ft = new FileTransfer();
        var uri = (options && options.encodeURI === false) ? source : encodeURI(source);

        if (options && options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            ft.abort();
          }, options.timeout);
          options.timeout = null;
        }

        ft.onprogress = function (progress) {
          q.notify(progress);
        };

        ft.download(uri, filePath, q.resolve, q.reject, trustAllHosts, options);
        return q.promise;
      },

      upload: function (server, filePath, options, trustAllHosts) {
        var q = $q.defer();
        var ft = new FileTransfer();
        var uri = (options && options.encodeURI === false) ? server : encodeURI(server);

        if (options && options.timeout !== undefined && options.timeout !== null) {
          $timeout(function () {
            ft.abort();
          }, options.timeout);
          options.timeout = null;
        }

        ft.onprogress = function (progress) {
          q.notify(progress);
        };

        q.promise.abort = function () {
          ft.abort();
        };

        ft.upload(filePath, uri, q.resolve, q.reject, options, trustAllHosts);
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git
// link      :     https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin

angular.module('ngCordova.plugins.flashlight', [])

  .factory('$cordovaFlashlight', ['$q', '$window', function ($q, $window) {

    return {
      available: function () {
        var q = $q.defer();
        $window.plugins.flashlight.available(function (isAvailable) {
          q.resolve(isAvailable);
        });
        return q.promise;
      },

      switchOn: function () {
        var q = $q.defer();
        $window.plugins.flashlight.switchOn(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      switchOff: function () {
        var q = $q.defer();
        $window.plugins.flashlight.switchOff(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      toggle: function () {
        var q = $q.defer();
        $window.plugins.flashlight.toggle(function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-flurry.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-flurry

angular.module('ngCordova.plugins.flurryAds', [])
  .factory('$cordovaFlurryAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.FlurryAds.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.FlurryAds.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.FlurryAds.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.FlurryAds.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.FlurryAds.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.FlurryAds.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.FlurryAds.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.FlurryAds.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/phonegap-build/GAPlugin.git
// link      :     https://github.com/phonegap-build/GAPlugin

angular.module('ngCordova.plugins.ga', [])

  .factory('$cordovaGA', ['$q', '$window', function ($q, $window) {

    return {
      init: function (id, mingap) {
        var q = $q.defer();
        mingap = (mingap >= 0) ? mingap : 10;
        $window.plugins.gaPlugin.init(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          id, mingap);
        return q.promise;
      },

      trackEvent: function (success, fail, category, eventAction, eventLabel, eventValue) {
        var q = $q.defer();
        $window.plugins.gaPlugin.trackEvent(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          category, eventAction, eventLabel, eventValue);
        return q.promise;
      },

      trackPage: function (success, fail, pageURL) {
        var q = $q.defer();
        $window.plugins.gaPlugin.trackPage(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          pageURL);
        return q.promise;
      },

      setVariable: function (success, fail, index, value) {
        var q = $q.defer();
        $window.plugins.gaPlugin.setVariable(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          },
          index, value);
        return q.promise;
      },

      exit: function (success, fail) {
        var q = $q.defer();
        $window.plugins.gaPlugin.exit(function (result) {
            q.resolve(result);
          },
          function (error) {
            q.reject(error);
          });
        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.geolocation
// link      :     https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md

angular.module('ngCordova.plugins.geolocation', [])

  .factory('$cordovaGeolocation', ['$q', function ($q) {

    return {
      getCurrentPosition: function (options) {
        var q = $q.defer();

        navigator.geolocation.getCurrentPosition(function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      },

      watchPosition: function (options) {
        var q = $q.defer();

        var watchID = navigator.geolocation.watchPosition(function (result) {
          q.notify(result);
        }, function (err) {
          q.reject(err);
        }, options);

        q.promise.cancel = function () {
          navigator.geolocation.clearWatch(watchID);
        };

        q.promise.clearWatch = function (id) {
          navigator.geolocation.clearWatch(id || watchID);
        };

        q.promise.watchID = watchID;

        return q.promise;
      },

      clearWatch: function (watchID) {
        return navigator.geolocation.clearWatch(watchID);
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.globalization
// link      :      https://github.com/apache/cordova-plugin-globalization/blob/master/doc/index.md

angular.module('ngCordova.plugins.globalization', [])

  .factory('$cordovaGlobalization', ['$q', function ($q) {

    return {
      getPreferredLanguage: function () {
        var q = $q.defer();

        navigator.globalization.getPreferredLanguage(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      getLocaleName: function () {
        var q = $q.defer();

        navigator.globalization.getLocaleName(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      getFirstDayOfWeek: function () {
        var q = $q.defer();

        navigator.globalization.getFirstDayOfWeek(function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      // "date" parameter must be a JavaScript Date Object.
      dateToString: function (date, options) {
        var q = $q.defer();

        navigator.globalization.dateToString(
          date,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      stringToDate: function (dateString, options) {
        var q = $q.defer();

        navigator.globalization.stringToDate(
          dateString,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getDatePattern: function (options) {
        var q = $q.defer();

        navigator.globalization.getDatePattern(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getDateNames: function (options) {
        var q = $q.defer();

        navigator.globalization.getDateNames(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      // "date" parameter must be a JavaScript Date Object.
      isDayLightSavingsTime: function (date) {
        var q = $q.defer();

        navigator.globalization.isDayLightSavingsTime(
          date,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      },

      numberToString: function (number, options) {
        var q = $q.defer();

        navigator.globalization.numberToString(
          number,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      stringToNumber: function (numberString, options) {
        var q = $q.defer();

        navigator.globalization.stringToNumber(
          numberString,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getNumberPattern: function (options) {
        var q = $q.defer();

        navigator.globalization.getNumberPattern(
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          },
          options);
        return q.promise;
      },

      getCurrencyPattern: function (currencyCode) {
        var q = $q.defer();

        navigator.globalization.getCurrencyPattern(
          currencyCode,
          function (result) {
            q.resolve(result);
          },
          function (err) {
            q.reject(err);
          });
        return q.promise;
      }

    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-admob-pro.git
// link     :     https://github.com/floatinghotpot/cordova-admob-pro

angular.module('ngCordova.plugins.googleAds', [])
  .factory('$cordovaGoogleAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.AdMob.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.AdMob.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.AdMob.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.AdMob.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.AdMob.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.AdMob.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.AdMob.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.AdMob.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   :     cordova plugin add https://github.com/danwilson/google-analytics-plugin.git
// link      :     https://github.com/danwilson/google-analytics-plugin

angular.module('ngCordova.plugins.googleAnalytics', [])

  .factory('$cordovaGoogleAnalytics', ['$q', '$window', function ($q, $window) {

    return {
      startTrackerWithId: function (id) {
        var d = $q.defer();

        $window.analytics.startTrackerWithId(id, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      setUserId: function (id) {
        var d = $q.defer();

        $window.analytics.setUserId(id, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      debugMode: function () {
        var d = $q.defer();

        $window.analytics.debugMode(function (response) {
          d.resolve(response);
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      trackView: function (screenName) {
        var d = $q.defer();

        $window.analytics.trackView(screenName, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      addCustomDimension: function (key, value) {
        var d = $q.defer();

        $window.analytics.addCustomDimension(key, value, function () {
          d.resolve();
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      trackEvent: function (category, action, label, value) {
        var d = $q.defer();

        $window.analytics.trackEvent(category, action, label, value, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      addTransaction: function (transactionId, affiliation, revenue, tax, shipping, currencyCode) {
        var d = $q.defer();

        $window.analytics.addTransaction(transactionId, affiliation, revenue, tax, shipping, currencyCode, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      },

      addTransactionItem: function (transactionId, name, sku, category, price, quantity, currencyCode) {
        var d = $q.defer();

        $window.analytics.addTransactionItem(transactionId, name, sku, category, price, quantity, currencyCode, function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      }
    };
  }]);

// install   :
// link      :

// Google Maps needs ALOT of work!
// Not for production use

angular.module('ngCordova.plugins.googleMap', [])

  .factory('$cordovaGoogleMap', ['$q', '$window', function ($q, $window) {

    var map = null;

    return {
      getMap: function (options) {
        var q = $q.defer();

        if (!$window.plugin.google.maps) {
          q.reject(null);
        }
        else {
          var div = document.getElementById("map_canvas");
          map = $window.plugin.google.maps.Map.getMap(options);
          map.setDiv(div);
          q.resolve(map);
        }
        return q.promise;
      },


      isMapLoaded: function () { // check if an instance of the map exists
        return !!map;
      },
      addMarker: function (markerOptions) { // add a marker to the map with given markerOptions
        var q = $q.defer();
        map.addMarker(markerOptions, function (marker) {
          q.resolve(marker);
        });

        return q.promise;
      },
      getMapTypeIds: function () {
        return $window.plugin.google.maps.mapTypeId;
      },
      setVisible: function (isVisible) {
        var q = $q.defer();
        map.setVisible(isVisible);
        return q.promise;
      },
      // I don't know how to deallocate te map and the google map plugin.
      cleanup: function () {
        map = null;
        // delete map;
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/Telerik-Verified-Plugins/HealthKit
// link      :      https://github.com/Telerik-Verified-Plugins/HealthKit

angular.module('ngCordova.plugins.healthKit', [])

  .factory('$cordovaHealthKit', ['$q', '$window', function ($q, $window) {

    return {
      isAvailable: function () {
        var q = $q.defer();

        $window.plugins.healthkit.available(function (success) {
          q.resolve(success);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      /**
       * Request authorization to access HealthKit data. See the full HealthKit constants
       * reference for possible read and write types:
       * https://developer.apple.com/library/ios/documentation/HealthKit/Reference/HealthKit_Constants/
       */
      requestAuthorization: function (readTypes, writeTypes) {
        var q = $q.defer();

        readTypes = readTypes || [
          'HKCharacteristicTypeIdentifierDateOfBirth', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierHeight'
        ];
        writeTypes = writeTypes || [
          'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierHeight', 'HKQuantityTypeIdentifierDistanceCycling'
        ];

        $window.plugins.healthkit.requestAuthorization({
          'readTypes': readTypes,
          'writeTypes': writeTypes
        }, function (success) {
          q.resolve(success);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      readDateOfBirth: function () {
        var q = $q.defer();
        $window.plugins.healthkit.readDateOfBirth(
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );

        return q.promise;
      },

      readGender: function () {
        var q = $q.defer();
        $window.plugins.healthkit.readGender(
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );

        return q.promise;
      },

      saveWeight: function (value, units, date) {
        var q = $q.defer();
        $window.plugins.healthkit.saveWeight({
            'unit': units || 'lb',
            'amount': value,
            'date': date || new Date()
          },
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      },

      readWeight: function (units) {
        var q = $q.defer();
        $window.plugins.healthkit.readWeight({
            'unit': units || 'lb'
          },
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );

        return q.promise;
      },
      saveHeight: function (value, units, date) {
        var q = $q.defer();
        $window.plugins.healthkit.saveHeight({
            'unit': units || 'in',
            'amount': value,
            'date': date || new Date()
          },
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      },
      readHeight: function (units) {
        var q = $q.defer();
        $window.plugins.healthkit.readHeight({
            'unit': units || 'in'
          },
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );

        return q.promise;
      },

      findWorkouts: function () {
        var q = $q.defer();
        $window.plugins.healthkit.findWorkouts({},
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      },

      /**
       * Save a workout.
       *
       * Workout param should be of the format:
       {
         'activityType': 'HKWorkoutActivityTypeCycling', // HKWorkoutActivityType constant (https://developer.apple.com/library/ios/documentation/HealthKit/Reference/HKWorkout_Class/#//apple_ref/c/tdef/HKWorkoutActivityType)
         'quantityType': 'HKQuantityTypeIdentifierDistanceCycling',
         'startDate': new Date(), // mandatory
         'endDate': null, // optional, use either this or duration
         'duration': 3600, // in seconds, optional, use either this or endDate
         'energy': 300, //
         'energyUnit': 'kcal', // J|cal|kcal
         'distance': 11, // optional
         'distanceUnit': 'km' // probably useful with the former param
         // 'extraData': "", // Not sure how necessary this is
       },
       */
      saveWorkout: function (workout) {
        var q = $q.defer();
        $window.plugins.healthkit.saveWorkout(workout,
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      },

      /**
       * Sample any kind of health data through a given date range.
       * sampleQuery of the format:
       {
									'startDate': yesterday, // mandatory
									'endDate': tomorrow, // mandatory
									'sampleType': 'HKQuantityTypeIdentifierHeight',
									'unit' : 'cm'
							},
       */
      querySampleType: function (sampleQuery) {
        var q = $q.defer();
        $window.plugins.healthkit.querySampleType(sampleQuery,
          function (success) {
            q.resolve(success);
          },
          function (err) {
            q.resolve(err);
          }
        );
        return q.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-httpd.git
// link     :     https://github.com/floatinghotpot/cordova-httpd

angular.module('ngCordova.plugins.httpd', [])
  .factory('$cordovaHttpd', ['$q', function ($q) {

    return {
      startServer: function (options) {
        var d = $q.defer();

        cordova.plugins.CorHttpd.startServer(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      stopServer: function () {
        var d = $q.defer();

        cordova.plugins.CorHttpd.stopServer(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      getURL: function () {
        var d = $q.defer();

        cordova.plugins.CorHttpd.getURL(function (url) {
          d.resolve(url);
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      getLocalPath: function () {
        var d = $q.defer();

        cordova.plugins.CorHttpd.getLocalPath(function (path) {
          d.resolve(path);
        }, function () {
          d.reject();
        });

        return d.promise;
      }

    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-iad.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-iad

angular.module('ngCordova.plugins.iAd', [])
  .factory('$cordovaiAd', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.iAd.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.iAd.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.iAd.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.iAd.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.iAd.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.iAd.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.iAd.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.iAd.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/wymsee/cordova-imagePicker.git
// link     :     https://github.com/wymsee/cordova-imagePicker

angular.module('ngCordova.plugins.imagePicker', [])

  .factory('$cordovaImagePicker', ['$q', '$window', function ($q, $window) {

    return {
      getPictures: function (options) {
        var q = $q.defer();

        $window.imagePicker.getPictures(function (results) {
          q.resolve(results);
        }, function (error) {
          q.reject(error);
        }, options);

        return q.promise;
      }
    };
  }]);

// install   :     cordova plugin add org.apache.cordova.inappbrowser
// link      :     https://github.com/apache/cordova-plugin-inappbrowser/blob/master/doc/index.md

angular.module('ngCordova.plugins.inAppBrowser', [])

  .provider('$cordovaInAppBrowser', [function () {

    var ref;
    var defaultOptions = this.defaultOptions = {};

    this.setDefaultOptions = function (config) {
      defaultOptions = angular.extend(defaultOptions, config);
    };

    this.$get = ['$rootScope', '$q', '$window', '$timeout', function ($rootScope, $q, $window, $timeout) {
      return {
        open: function (url, target, requestOptions) {
          var q = $q.defer();

          if (requestOptions && !angular.isObject(requestOptions)) {
            q.reject("options must be an object");
            return q.promise;
          }

          var options = angular.extend({}, defaultOptions, requestOptions);

          var opt = [];
          angular.forEach(options, function (value, key) {
            opt.push(key + '=' + value);
          });
          var optionsString = opt.join();

          ref = $window.open(url, target, optionsString);

          ref.addEventListener('loadstart', function (event) {
            $timeout(function () {
              $rootScope.$broadcast('$cordovaInAppBrowser:loadstart', event);
            });
          }, false);

          ref.addEventListener('loadstop', function (event) {
            q.resolve(event);
            $timeout(function () {
              $rootScope.$broadcast('$cordovaInAppBrowser:loadstop', event);
            });
          }, false);

          ref.addEventListener('loaderror', function (event) {
            q.reject(event);
            $timeout(function () {
              $rootScope.$broadcast('$cordovaInAppBrowser:loaderror', event);
            });
          }, false);

          ref.addEventListener('exit', function (event) {
            $timeout(function () {
              $rootScope.$broadcast('$cordovaInAppBrowser:exit', event);
            });
          }, false);

          return q.promise;
        },

        close: function () {
          ref.close();
          ref = null;
        },

        show: function () {
          ref.show();
        },

        executeScript: function (details) {
          var q = $q.defer();

          ref.executeScript(details, function (result) {
            q.resolve(result);
          });

          return q.promise;
        },

        insertCSS: function (details) {
          var q = $q.defer();

          ref.insertCSS(details, function (result) {
            q.resolve(result);
          });

          return q.promise;
        }
      };
    }];
  }]);

// install   :      cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git
// link      :      https://github.com/driftyco/ionic-plugins-keyboard

//TODO: add support for native.keyboardshow + native.keyboardhide

angular.module('ngCordova.plugins.keyboard', [])

  .factory('$cordovaKeyboard', [function () {

    return {
      hideAccessoryBar: function (bool) {
        return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(bool);
      },

      close: function () {
        return cordova.plugins.Keyboard.close();
      },

      disableScroll: function (bool) {
        return cordova.plugins.Keyboard.disableScroll(bool);
      },

      isVisible: function () {
        return cordova.plugins.Keyboard.isVisible;
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/shazron/KeychainPlugin.git
// link      :      https://github.com/shazron/KeychainPlugin

angular.module('ngCordova.plugins.keychain', [])

  .factory('$cordovaKeychain', ['$q', '$window', function ($q, $window) {

    if ('Keychain' in $window) {
      var kc = new Keychain();
    }

    return {
      getForKey: function (key, serviceName) {
        var defer = $q.defer();

        kc.getForKey(defer.resolve, defer.reject, key, serviceName);

        return defer.promise;
      },

      setForKey: function (key, serviceName, value) {
        var defer = $q.defer();

        kc.setForKey(defer.resolve, defer.reject, key, serviceName, value);

        return defer.promise;
      },

      removeForKey: function (key, serviceName) {
        var defer = $q.defer();

        kc.removeForKey(defer.resolve, defer.reject, key, serviceName);

        return defer.promise;
      }
    };
  }]);

// install   :  cordova plugin add de.appplant.cordova.plugin.local-notification
// link      :  https://github.com/katzer/cordova-plugin-local-notifications/

angular.module('ngCordova.plugins.localNotification', [])

  .factory('$cordovaLocalNotification', ['$q', '$window', '$rootScope', '$timeout', function ($q, $window, $rootScope, $timeout) {
    if ($window.plugin && $window.plugin.notification) {
      $window.plugin.notification.local.oncancel = function (id, state, json) {
        var notification = {
          id: id,
          state: state,
          json: json
        };
        $timeout(function () {
          $rootScope.$broadcast("$cordovaLocalNotification:canceled", notification);
        });
      };

      $window.plugin.notification.local.onclick = function (id, state, json) {
        var notification = {
          id: id,
          state: state,
          json: json
        };
        $timeout(function () {
          $rootScope.$broadcast("$cordovaLocalNotification:clicked", notification);
        });
      };

      $window.plugin.notification.local.ontrigger = function (id, state, json) {
        var notification = {
          id: id,
          state: state,
          json: json
        };
        $timeout(function () {
          $rootScope.$broadcast("$cordovaLocalNotification:triggered", notification);
        });
      };

      $window.plugin.notification.local.onadd = function (id, state, json) {
        var notification = {
          id: id,
          state: state,
          json: json
        };
        $timeout(function () {
          $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
        });
      };
    }
    return {
      add: function (options, scope) {
        var q = $q.defer();
        scope = scope || null;
        $window.plugin.notification.local.add(options, function (result) {
          q.resolve(result);
        }, scope);
        return q.promise;
      },

      cancel: function (id, scope) {
        var q = $q.defer();
        scope = scope || null;
        $window.plugin.notification.local.cancel(id, function (result) {
          q.resolve(result);
        }, scope);
        return q.promise;
      },

      cancelAll: function (scope) {
        var q = $q.defer();
        scope = scope || null;
        $window.plugin.notification.local.cancelAll(function (result) {
          q.resolve(result);
        }, scope);
        return q.promise;
      },

      isScheduled: function (id, scope) {
        var q = $q.defer();
        scope = scope || null;
        $window.plugin.notification.local.isScheduled(id, function (result) {
          q.resolve(result);
        }, scope);

        return q.promise;
      },

      hasPermission: function (scope) {
        var q = $q.defer();
        $window.plugin.notification.local.hasPermission(function (result) {
          result ? q.resolve() : q.reject();
        }, scope);
        return q.promise;
      },

      promptForPermission: function () {
        $window.plugin.notification.local.promptForPermission();
      },

      registerPermission: function () {
        var q = $q.defer();
        $window.plugin.notification.local.registerPermission(function (result) {
          result ? q.resolve() : q.reject();
        });
        return q.promise;
      },

      getScheduledIds: function (scope) {
        var q = $q.defer();
        $window.plugin.notification.local.getScheduledIds(function (result) {
          q.resolve(result);
        }, scope);
        return q.promise;
      },

      isTriggered: function (id, scope) {
        var q = $q.defer();
        $window.plugin.notification.local.isTriggered(id, function (result) {
          q.resolve(result);
        }, scope);
        return q.promise;
      },

      getTriggeredIds: function (scope) {
        var q = $q.defer();
        $window.plugin.notification.local.getTriggeredIds(function (result) {
          q.resolve(result);
        }, scope);
        return q.promise;
      },

      getDefaults: function () {
        return $window.plugin.notification.local.getDefaults();
      },

      setDefaults: function (Object) {
        $window.plugin.notification.local.setDefaults(Object);
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-mmedia.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-mmedia

angular.module('ngCordova.plugins.mMediaAds', [])
  .factory('$cordovaMMediaAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.mMedia.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.mMedia.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.mMedia.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.mMedia.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.mMedia.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.mMedia.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.mMedia.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.mMedia.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.media
// link      :      https://github.com/apache/cordova-plugin-media

angular.module('ngCordova.plugins.media', [])

  .factory('$cordovaMedia', ['$q', function ($q) {

    return {
      newMedia: function (src) {
        var q = $q.defer();
        var mediaStatus = null;
        var media;

        media = new Media(src,
          function (success) {
            q.resolve(success);
          }, function (error) {
            q.reject(error);
          }, function (status) {
            mediaStatus = status;
          });

        // getCurrentPosition NOT WORKING!
        q.promise.getCurrentPosition = function () {
          media.getCurrentPosition(function (success) {
          }, function (error) {
          });
        };

        q.promise.getDuration = function () {
          media.getDuration();
        };

        // iOS quirks :
        // -  myMedia.play({ numberOfLoops: 2 }) -> looping
        // -  myMedia.play({ playAudioWhenScreenIsLocked : false })
        q.promise.play = function (options) {
          if (typeof options !== "object") {
            options = {};
          }
          media.play(options);
        };

        q.promise.pause = function () {
          media.pause();
        };

        q.promise.stop = function () {
          media.stop();
        };

        q.promise.release = function () {
          media.release();
        };

        q.promise.seekTo = function (timing) {
          media.seekTo(timing);
        };

        q.promise.setVolume = function (volume) {
          media.setVolume(volume);
        };

        q.promise.startRecord = function () {
          media.startRecord();
        };

        q.promise.stopRecord = function () {
          media.stopRecord();
        };

        return q.promise;
      }
    };
  }]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-mobfox-pro.git
// link     :     https://github.com/floatinghotpot/cordova-mobfox-pro

angular.module('ngCordova.plugins.mobfoxAds', [])
  .factory('$cordovaMobFoxAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.MobFox.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.MobFox.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.MobFox.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.MobFox.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.MobFox.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.MobFox.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.MobFox.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.MobFox.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

angular.module('ngCordova.plugins', [
  'ngCordova.plugins.actionSheet',
  'ngCordova.plugins.adMob',
  'ngCordova.plugins.appAvailability',
  'ngCordova.plugins.appRate',
  'ngCordova.plugins.appVersion',
  'ngCordova.plugins.backgroundGeolocation',
  'ngCordova.plugins.badge',
  'ngCordova.plugins.barcodeScanner',
  'ngCordova.plugins.batteryStatus',
  'ngCordova.plugins.ble',
  'ngCordova.plugins.bluetoothSerial',
  'ngCordova.plugins.brightness',
  'ngCordova.plugins.calendar',
  'ngCordova.plugins.camera',
  'ngCordova.plugins.capture',
  'ngCordova.plugins.clipboard',
  'ngCordova.plugins.contacts',
  'ngCordova.plugins.datePicker',
  'ngCordova.plugins.device',
  'ngCordova.plugins.deviceMotion',
  'ngCordova.plugins.deviceOrientation',
  'ngCordova.plugins.dialogs',
  'ngCordova.plugins.emailComposer',
  'ngCordova.plugins.facebook',
  'ngCordova.plugins.facebookAds',
  'ngCordova.plugins.file',
  'ngCordova.plugins.fileTransfer',
  'ngCordova.plugins.fileOpener2',
  'ngCordova.plugins.flashlight',
  'ngCordova.plugins.flurryAds',
  'ngCordova.plugins.ga',
  'ngCordova.plugins.geolocation',
  'ngCordova.plugins.globalization',
  'ngCordova.plugins.googleAds',
  'ngCordova.plugins.googleAnalytics',
  'ngCordova.plugins.googleMap',
  'ngCordova.plugins.healthKit',
  'ngCordova.plugins.httpd',
  'ngCordova.plugins.iAd',
  'ngCordova.plugins.imagePicker',
  'ngCordova.plugins.inAppBrowser',
  'ngCordova.plugins.keyboard',
  'ngCordova.plugins.keychain',
  'ngCordova.plugins.localNotification',
  'ngCordova.plugins.media',
  'ngCordova.plugins.mMediaAds',
  'ngCordova.plugins.mobfoxAds',
  'ngCordova.plugins.mopubAds',
  'ngCordova.plugins.nativeAudio',
  'ngCordova.plugins.network',
  'ngCordova.plugins.oauth',
  'ngCordova.plugins.oauthUtility',
  'ngCordova.plugins.pinDialog',
  'ngCordova.plugins.prefs',
  'ngCordova.plugins.printer',
  'ngCordova.plugins.progressIndicator',
  'ngCordova.plugins.push',
  'ngCordova.plugins.sms',
  'ngCordova.plugins.socialSharing',
  'ngCordova.plugins.spinnerDialog',
  'ngCordova.plugins.splashscreen',
  'ngCordova.plugins.sqlite',
  'ngCordova.plugins.statusbar',
  'ngCordova.plugins.toast',
  'ngCordova.plugins.touchid',
  'ngCordova.plugins.vibration',
  'ngCordova.plugins.videoCapturePlus',
  'ngCordova.plugins.zip'
]);

// install  :     cordova plugin add https://github.com/floatinghotpot/cordova-plugin-mopub.git
// link     :     https://github.com/floatinghotpot/cordova-plugin-mopub

angular.module('ngCordova.plugins.mopubAds', [])
  .factory('$cordovaMoPubAds', ['$q', '$window', function ($q, $window) {

    return {
      setOptions: function (options) {
        var d = $q.defer();

        $window.MoPub.setOptions(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      createBanner: function (options) {
        var d = $q.defer();

        $window.MoPub.createBanner(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      removeBanner: function () {
        var d = $q.defer();

        $window.MoPub.removeBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBanner: function (position) {
        var d = $q.defer();

        $window.MoPub.showBanner(position, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showBannerAtXY: function (x, y) {
        var d = $q.defer();

        $window.MoPub.showBannerAtXY(x, y, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      hideBanner: function () {
        var d = $q.defer();

        $window.MoPub.hideBanner(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      prepareInterstitial: function (options) {
        var d = $q.defer();

        $window.MoPub.prepareInterstitial(options, function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      },

      showInterstitial: function () {
        var d = $q.defer();

        $window.MoPub.showInterstitial(function () {
          d.resolve();
        }, function () {
          d.reject();
        });

        return d.promise;
      }
    };
  }]);

// install   : cordova plugin add https://github.com/sidneys/cordova-plugin-nativeaudio.git
// link      : https://github.com/sidneys/cordova-plugin-nativeaudio

angular.module('ngCordova.plugins.nativeAudio', [])

  .factory('$cordovaNativeAudio', ['$q', '$window', function ($q, $window) {

    return {
      preloadSimple: function (id, assetPath) {
        var q = $q.defer();
        $window.plugins.NativeAudio.preloadSimple(id, assetPath, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      preloadComplex: function (id, assetPath, volume, voices) {
        var q = $q.defer();
        $window.plugins.NativeAudio.preloadComplex(id, assetPath, volume, voices, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      play: function (id, completeCallback) {
        var q = $q.defer();
        $window.plugins.NativeAudio.play(id, completeCallback, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      stop: function (id) {
        var q = $q.defer();
        $window.plugins.NativeAudio.stop(id, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });
        return q.promise;
      },

      loop: function (id) {
        var q = $q.defer();
        $window.plugins.NativeAudio.loop(id, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      unload: function (id) {
        var q = $q.defer();
        $window.plugins.NativeAudio.unload(id, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      setVolumeForComplexAsset: function (id, volume) {
        var q = $q.defer();
        $window.plugins.NativeAudio.setVolumeForComplexAsset(id, volume, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.network-information
// link      :      https://github.com/apache/cordova-plugin-network-information/blob/master/doc/index.md

angular.module('ngCordova.plugins.network', [])

  .factory('$cordovaNetwork', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

    var offlineEvent = function () {
      var networkState = navigator.connection.type;
      $timeout(function () {
        $rootScope.$broadcast('$cordovaNetwork:offline', networkState);
      });
    };

    var onlineEvent = function () {
      var networkState = navigator.connection.type;
      $timeout(function () {
        $rootScope.$broadcast('$cordovaNetwork:online', networkState);
      });
    };

    document.addEventListener("deviceready", function () {
      if (navigator.connection) {
        document.addEventListener("offline", offlineEvent, false);
        document.addEventListener("online", onlineEvent, false);
      }
    });

    return {
      getNetwork: function () {
        return navigator.connection.type;
      },

      isOnline: function () {
        var networkState = navigator.connection.type;
        return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
      },

      isOffline: function () {
        var networkState = navigator.connection.type;
        return networkState === Connection.UNKNOWN || networkState === Connection.NONE;
      },

      clearOfflineWatch: function () {
        document.removeEventListener("offline", offlineEvent);
        $rootScope.$$listeners["$cordovaNetwork:offline"] = [];
      },

      clearOnlineWatch: function () {
        document.removeEventListener("online", offlineEvent);
        $rootScope.$$listeners["$cordovaNetwork:online"] = [];
      }
    };
  }])
  .run(['$cordovaNetwork', function ($cordovaNetwork) {
  }]);

/* Created by Nic Raboy
 * http://www.nraboy.com
 *
 * DESCRIPTION: Use Oauth sign in for various web services.
 *
 * REQUIRES:  Apache Cordova 3.5+, Apache InAppBrowser Plugin, jsSHA (Twitter, Magento only)
 *
 * SUPPORTS:
 *    Dropbox
 *    Digital Ocean
 *    Google
 *    GitHub
 *    Facebook
 *    LinkedIn
 *    Instagram
 *    Box
 *    Reddit
 *    Twitter
 *    Meetup
 *    Foursquare
 *    Salesforce
 *    Strava
 *    Magento
 *    vkontakte
 *    ADFS
 */

angular.module("ngCordova.plugins.oauth", ["ngCordova.plugins.oauthUtility"])

  .factory('$cordovaOauth', ['$q', '$http', '$cordovaOauthUtility', function ($q, $http, $cordovaOauthUtility) {

    return {

        /*
        * Sign into the ADFS service (ADFS 3.0 onwards)
        *
        * @param    string clientId (client registered in ADFS, with redirect_uri configured to: http://localhost/callback)
        * @param	 string adfsServer (url of the ADFS Server)
        * @param	 string relyingPartyId (url of the Relying Party (resource relying on ADFS for authentication) configured in ADFS)
        * @return   promise
        */
        adfs: function(clientId, adfsServer, relyingPartyId) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open(adfsServer + '/adfs/oauth2/authorize?response_type=code&client_id=' + clientId +'&redirect_uri=http://localhost/callback&resource=' + relyingPartyId, '_blank', 'location=no');

                    browserRef.addEventListener("loadstart", function(event) {
                        if((event.url).indexOf('http://localhost/callback') === 0) {
                            var requestToken = (event.url).split("code=")[1];
                            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                            $http({method: "post", url: adfsServer + "/adfs/oauth2/token", data: "client_id=" + clientId + "&code=" + requestToken + "&redirect_uri=http://localhost/callback&grant_type=authorization_code"  })
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(data, status) {
                                deferred.reject("Problem authenticating");
                            })
                            .finally(function() {
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            });
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Dropbox service
        *
        * @param    string appKey
        * @return   promise
        */
        dropbox: function(appKey) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open("https://www.dropbox.com/1/oauth2/authorize?client_id=" + appKey + "&redirect_uri=http://localhost/callback" + "&response_type=token", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                    browserRef.addEventListener("loadstart", function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            var callbackResponse = (event.url).split("#")[1];
                            var responseParameters = (callbackResponse).split("&");
                            var parameterMap = [];
                            for(var i = 0; i < responseParameters.length; i++) {
                                parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                            }
                            if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                deferred.resolve({ access_token: parameterMap.access_token, token_type: parameterMap.token_type, uid: parameterMap.uid });
                            } else {
                                deferred.reject("Problem authenticating");
                            }
                            setTimeout(function() {
                                browserRef.close();
                            }, 10);
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Digital Ocean service
        *
        * @param    string clientId
        * @param    string clientSecret
        * @return   promise
        */
        digitalOcean: function(clientId, clientSecret) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open("https://cloud.digitalocean.com/v1/oauth/authorize?client_id=" + clientId + "&redirect_uri=http://localhost/callback&response_type=code&scope=read%20write", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                    browserRef.addEventListener("loadstart", function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            var requestToken = (event.url).split("code=")[1];
                            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                            $http({method: "post", url: "https://cloud.digitalocean.com/v1/oauth/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(data, status) {
                                deferred.reject("Problem authenticating");
                            })
                            .finally(function() {
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            });
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Google service
        *
        * @param    string clientId
        * @param    array appScope
        * @return   promise
        */
        google: function(clientId, appScope) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(" ") + '&approval_prompt=force&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener("loadstart", function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            var callbackResponse = (event.url).split("#")[1];
                            var responseParameters = (callbackResponse).split("&");
                            var parameterMap = [];
                            for(var i = 0; i < responseParameters.length; i++) {
                                parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                            }
                            if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                deferred.resolve({ access_token: parameterMap.access_token, token_type: parameterMap.token_type, expires_in: parameterMap.expires_in });
                            } else {
                                deferred.reject("Problem authenticating");
                            }
                            setTimeout(function() {
                                browserRef.close();
                            }, 10);
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the GitHub service
        *
        * @param    string clientId
        * @param    string clientSecret
        * @param    array appScope
        * @return   promise
        */
        github: function(clientId, clientSecret, appScope) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open('https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(","), '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener('loadstart', function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            requestToken = (event.url).split("code=")[1];
                            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                            $http.defaults.headers.post.accept = 'application/json';
                            $http({method: "post", url: "https://github.com/login/oauth/access_token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&code=" + requestToken })
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(data, status) {
                                deferred.reject("Problem authenticating");
                            })
                            .finally(function() {
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            });
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Facebook service
        *
        * @param    string clientId
        * @param    array appScope
        * @return   promise
        */
        facebook: function(clientId, appScope) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open('https://www.facebook.com/dialog/oauth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&response_type=token&scope=' + appScope.join(","), '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener('loadstart', function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            var callbackResponse = (event.url).split("#")[1];
                            var responseParameters = (callbackResponse).split("&");
                            var parameterMap = [];
                            for(var i = 0; i < responseParameters.length; i++) {
                                parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                            }
                            if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                deferred.resolve({ access_token: parameterMap.access_token, expires_in: parameterMap.expires_in });
                            } else {
                                deferred.reject("Problem authenticating");
                            }
                            setTimeout(function() {
                                browserRef.close();
                            }, 10);
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the LinkedIn service
        *
        * @param    string clientId
        * @param    string clientSecret
        * @param    array appScope
        * @param    string state
        * @return   promise
        */
        linkedin: function(clientId, clientSecret, appScope, state) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open('https://www.linkedin.com/uas/oauth2/authorization?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(" ") + '&response_type=code&state=' + state, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener('loadstart', function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            requestToken = (event.url).split("code=")[1];
                            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                            $http({method: "post", url: "https://www.linkedin.com/uas/oauth2/accessToken", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(data, status) {
                                deferred.reject("Problem authenticating");
                            })
                            .finally(function() {
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            });
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Instagram service
        *
        * @param    string clientId
        * @param    array appScope
        * @return   promise
        */
        instagram: function(clientId, appScope) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open('https://api.instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(" ") + '&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener('loadstart', function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            var callbackResponse = (event.url).split("#")[1];
                            var responseParameters = (callbackResponse).split("&");
                            var parameterMap = [];
                            for(var i = 0; i < responseParameters.length; i++) {
                                parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                            }
                            if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                deferred.resolve({ access_token: parameterMap.access_token });
                            } else {
                                deferred.reject("Problem authenticating");
                            }
                            setTimeout(function() {
                                browserRef.close();
                            }, 10);
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Box service
        *
        * @param    string clientId
        * @param    string clientSecret
        * @param    string appState
        * @return   promise
        */
        box: function(clientId, clientSecret, appState) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open('https://app.box.com/api/oauth2/authorize/?client_id=' + clientId + '&redirect_uri=http://localhost/callback&state=' + appState + '&response_type=code', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener('loadstart', function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            requestToken = (event.url).split("code=")[1];
                            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                            $http({method: "post", url: "https://app.box.com/api/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(data, status) {
                                deferred.reject("Problem authenticating");
                            })
                            .finally(function() {
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            });
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Reddit service
        *
        * @param    string clientId
        * @param    string clientSecret
        * @param    array appScope
        * @return   promise
        */
        reddit: function(clientId, clientSecret, appScope) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open('https://ssl.reddit.com/api/v1/authorize?client_id=' + clientId + '&redirect_uri=http://localhost/callback&duration=permanent&state=ngcordovaoauth&scope=' + appScope.join(",") + '&response_type=code', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener('loadstart', function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            requestToken = (event.url).split("code=")[1];
                            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                            $http.defaults.headers.post.Authorization = 'Basic ' + btoa(clientId + ":" + clientSecret);
                            $http({method: "post", url: "https://ssl.reddit.com/api/v1/access_token", data: "redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
                            .success(function(data) {
                                deferred.resolve(data);
                            })
                            .error(function(data, status) {
                                deferred.reject("Problem authenticating");
                            })
                            .finally(function() {
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            });
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Twitter service
        * Note that this service requires jsSHA for generating HMAC-SHA1 Oauth 1.0 signatures
        *
        * @param    string clientId
        * @param    string clientSecret
        * @return   promise
        */
        twitter: function(clientId, clientSecret) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    if(typeof jsSHA !== "undefined") {
                        var oauthObject = {
                            oauth_consumer_key: clientId,
                            oauth_nonce: $cordovaOauthUtility.createNonce(10),
                            oauth_signature_method: "HMAC-SHA1",
                            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
                            oauth_version: "1.0"
                        };
                        var signatureObj = $cordovaOauthUtility.createSignature("POST", "https://api.twitter.com/oauth/request_token", oauthObject,  { oauth_callback: "http://localhost/callback" }, clientSecret);
                        $http.defaults.headers.post.Authorization = signatureObj.authorization_header;
                        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                        $http({method: "post", url: "https://api.twitter.com/oauth/request_token", data: "oauth_callback=http://localhost/callback" })
                        .success(function(requestTokenResult) {
                            var requestTokenParameters = (requestTokenResult).split("&");
                            var parameterMap = {};
                            for(var i = 0; i < requestTokenParameters.length; i++) {
                                parameterMap[requestTokenParameters[i].split("=")[0]] = requestTokenParameters[i].split("=")[1];
                            }
                            if(parameterMap.hasOwnProperty("oauth_token") === false) {
                                deferred.reject("Oauth request token was not received");
                            }
                            var browserRef = window.open('https://api.twitter.com/oauth/authenticate?oauth_token=' + parameterMap.oauth_token, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                            browserRef.addEventListener('loadstart', function(event) {
                                if((event.url).indexOf("http://localhost/callback") === 0) {
                                    var callbackResponse = (event.url).split("?")[1];
                                    var responseParameters = (callbackResponse).split("&");
                                    var parameterMap = {};
                                    for(var i = 0; i < responseParameters.length; i++) {
                                        parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                                    }
                                    if(parameterMap.hasOwnProperty("oauth_verifier") === false) {
                                        deferred.reject("Browser authentication failed to complete.  No oauth_verifier was returned");
                                    }
                                    delete oauthObject.oauth_signature;
                                    oauthObject.oauth_token = parameterMap.oauth_token;
                                    var signatureObj = $cordovaOauthUtility.createSignature("POST", "https://api.twitter.com/oauth/access_token", oauthObject,  { oauth_verifier: parameterMap.oauth_verifier }, clientSecret);
                                    $http.defaults.headers.post.Authorization = signatureObj.authorization_header;
                                    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                                    $http({method: "post", url: "https://api.twitter.com/oauth/access_token", data: "oauth_verifier=" + parameterMap.oauth_verifier })
                                    .success(function(result) {
                                        var accessTokenParameters = result.split("&");
                                        var parameterMap = {};
                                        for(var i = 0; i < accessTokenParameters.length; i++) {
                                            parameterMap[accessTokenParameters[i].split("=")[0]] = accessTokenParameters[i].split("=")[1];
                                        }
                                        if(parameterMap.hasOwnProperty("oauth_token_secret") === false) {
                                            deferred.reject("Oauth access token was not received");
                                        }
                                        deferred.resolve(parameterMap);
                                    })
                                    .error(function(error) {
                                        deferred.reject(error);
                                    })
                                    .finally(function() {
                                        setTimeout(function() {
                                            browserRef.close();
                                        }, 10);
                                    });
                                }
                            });
                            browserRef.addEventListener('exit', function(event) {
                                deferred.reject("The sign in flow was canceled");
                            });
                        })
                        .error(function(error) {
                            deferred.reject(error);
                        });
                    } else {
                        deferred.reject("Missing jsSHA JavaScript library");
                    }
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Meetup service
        *
        * @param    string clientId
        * @return   promise
        */
        meetup: function(clientId) {
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open('https://secure.meetup.com/oauth2/authorize/?client_id=' + clientId + '&redirect_uri=http://localhost/callback&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                    browserRef.addEventListener('loadstart', function(event) {
                        if((event.url).indexOf("http://localhost/callback") === 0) {
                            var callbackResponse = (event.url).split("#")[1];
                            var responseParameters = (callbackResponse).split("&");
                            var parameterMap = {};
                            for(var i = 0; i < responseParameters.length; i++) {
                                parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                            }
                            if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                deferred.resolve(parameterMap);
                            } else {
                                deferred.reject("Problem authenticating");
                            }
                            setTimeout(function() {
                                browserRef.close();
                            }, 10);
                        }
                    });
                    browserRef.addEventListener('exit', function(event) {
                        deferred.reject("The sign in flow was canceled");
                    });
                } else {
                    deferred.reject("Could not find InAppBrowser plugin");
                }
            } else {
                deferred.reject("Cannot authenticate via a web browser");
            }
            return deferred.promise;
        },

        /*
        * Sign into the Salesforce service
        *
        * Suggestion: use salesforce oauth with forcetk.js(as SDK)
        *
        * @param    string loginUrl (such as: https://login.salesforce.com ; please notice community login)
        * @param    string clientId (copy from connection app info)
        * @param    string redirectUri (callback url in connection app info)
        * @return   promise
        */
        salesforce: function (loginUrl, clientId) {
            var redirectUri = 'http://localhost/callback';
            var getAuthorizeUrl = function (loginUrl, clientId, redirectUri) {
                return loginUrl+'services/oauth2/authorize?display=touch'+
                '&response_type=token&client_id='+escape(clientId)+
                '&redirect_uri='+escape(redirectUri);
            };
            var startWith = function(string, str) {
                return (string.substr(0, str.length) === str);
            };
            var deferred = $q.defer();
            if(window.cordova) {
                var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                    var browserRef = window.open(getAuthorizeUrl(loginUrl, clientId, redirectUri), "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
                    browserRef.addEventListener("loadstart", function(event) {
                        if(startWith(event.url, redirectUri)) {
                            var oauthResponse = {};

                            var fragment = (event.url).split('#')[1];

                            if (fragment) {
                                var nvps = fragment.split('&');
                                for (var nvp in nvps) {
                                    var parts = nvps[nvp].split('=');
                                    oauthResponse[parts[0]] = unescape(parts[1]);
                                }
                            }

                            if (typeof oauthResponse === 'undefined' ||
                                typeof oauthResponse.access_token === 'undefined') {
                                    deferred.reject("Problem authenticating");
                                } else {
                                    deferred.resolve(oauthResponse);
                                }
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            }
                        });
                        browserRef.addEventListener('exit', function(event) {
                            deferred.reject("The sign in flow was canceled");
                        });
                    } else {
                        deferred.reject("Could not find InAppBrowser plugin");
                    }
                } else {
                    deferred.reject("Cannot authenticate via a web browser");
                }
                return deferred.promise;
            },

            /*
            * Sign into the Strava service
            *
            * @param    string clientId
            * @param    string clientSecret
            * @param    array appScope
            * @return   promise
            */
            strava: function(clientId, clientSecret, appScope) {
                var deferred = $q.defer();
                if(window.cordova) {
                    var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                    if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                        var browserRef = window.open('https://www.strava.com/oauth/authorize?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=' + appScope.join(",") + '&response_type=code&approval_prompt=force', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                        browserRef.addEventListener('loadstart', function(event) {
                            if((event.url).indexOf("http://localhost/callback") === 0) {
                                requestToken = (event.url).split("code=")[1];
                                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                                $http({method: "post", url: "https://www.strava.com/oauth/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&code=" + requestToken })
                                .success(function(data) {
                                    deferred.resolve(data);
                                })
                                .error(function(data, status) {
                                    deferred.reject("Problem authenticating");
                                })
                                .finally(function() {
                                    setTimeout(function() {
                                        browserRef.close();
                                    }, 10);
                                });
                            }
                        });
                        browserRef.addEventListener('exit', function(event) {
                            deferred.reject("The sign in flow was canceled");
                        });
                    } else {
                        deferred.reject("Could not find InAppBrowser plugin");
                    }
                } else {
                    deferred.reject("Cannot authenticate via a web browser");
                }
                return deferred.promise;
            },

            /*
            * Sign into the Foursquare service
            *
            * @param    string clientId
            * @return   promise
            */
            foursquare: function(clientId) {
                var deferred = $q.defer();
                if (window.cordova) {
                    var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                    if (cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                        var browserRef = window.open('https://foursquare.com/oauth2/authenticate?client_id=' + clientId + '&redirect_uri=http://localhost/callback&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                        browserRef.addEventListener('loadstart', function (event) {
                            if ((event.url).indexOf("http://localhost/callback") === 0) {
                                var callbackResponse = (event.url).split("#")[1];
                                var responseParameters = (callbackResponse).split("&");
                                var parameterMap = [];
                                for (var i = 0; i < responseParameters.length; i++) {
                                    parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                                }
                                if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                    var promiseResponse = {
                                        access_token: parameterMap.access_token,
                                        expires_in: parameterMap.expires_in
                                    };
                                    deferred.resolve(promiseResponse);
                                } else {
                                    deferred.reject("Problem authenticating");
                                }
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            }
                        });
                        browserRef.addEventListener('exit', function(event) {
                            deferred.reject("The sign in flow was canceled");
                        });
                    } else {
                        deferred.reject("Could not find InAppBrowser plugin");
                    }
                } else {
                    deferred.reject("Cannot authenticate via a web browser");
                }
                return deferred.promise;
            },

            /*
            * Sign into the Magento service
            * Note that this service requires jsSHA for generating HMAC-SHA1 Oauth 1.0 signatures
            *
            * @param    string baseUrl
            * @param    string clientId
            * @param    string clientSecret
            * @return   promise
            */
            magento: function(baseUrl, clientId, clientSecret) {
                var deferred = $q.defer();
                if(window.cordova) {
                    var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                    if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                        if(typeof jsSHA !== "undefined") {
                            var oauthObject = {
                                oauth_callback: "http://localhost/callback",
                                oauth_consumer_key: clientId,
                                oauth_nonce: $cordovaOauthUtility.createNonce(5),
                                oauth_signature_method: "HMAC-SHA1",
                                oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
                                oauth_version: "1.0"
                            };
                            var signatureObj = $cordovaOauthUtility.createSignature("POST", baseUrl + "/oauth/initiate", oauthObject,  { oauth_callback: "http://localhost/callback" }, clientSecret);
                            $http.defaults.headers.post.Authorization = signatureObj.authorization_header;
                            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                            $http({method: "post", url: baseUrl + "/oauth/initiate", data: "oauth_callback=http://localhost/callback" })
                            .success(function(requestTokenResult) {
                                var requestTokenParameters = (requestTokenResult).split("&");
                                var parameterMap = {};
                                for(var i = 0; i < requestTokenParameters.length; i++) {
                                    parameterMap[requestTokenParameters[i].split("=")[0]] = requestTokenParameters[i].split("=")[1];
                                }
                                if(parameterMap.hasOwnProperty("oauth_token") === false) {
                                    deferred.reject("Oauth request token was not received");
                                }
                                var tokenSecret = parameterMap.oauth_token_secret;
                                var browserRef = window.open(baseUrl + '/oauth/authorize?oauth_token=' + parameterMap.oauth_token, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                                browserRef.addEventListener('loadstart', function(event) {
                                    if((event.url).indexOf("http://localhost/callback") === 0) {
                                        var callbackResponse = (event.url).split("?")[1];
                                        var responseParameters = (callbackResponse).split("&");
                                        var parameterMap = {};
                                        for(var i = 0; i < responseParameters.length; i++) {
                                            parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                                        }
                                        if(parameterMap.hasOwnProperty("oauth_verifier") === false) {
                                            deferred.reject("Browser authentication failed to complete.  No oauth_verifier was returned");
                                        }
                                        delete oauthObject.oauth_signature;
                                        delete oauthObject.oauth_callback;
                                        oauthObject.oauth_token = parameterMap.oauth_token;
                                        oauthObject.oauth_nonce = $cordovaOauthUtility.createNonce(5);
                                        oauthObject.oauth_verifier = parameterMap.oauth_verifier;
                                        var signatureObj = $cordovaOauthUtility.createSignature("POST", baseUrl + "/oauth/token", oauthObject,  {}, clientSecret, tokenSecret);
                                        $http.defaults.headers.post.Authorization = signatureObj.authorization_header;
                                        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                                        $http({method: "post", url: baseUrl + "/oauth/token" })
                                        .success(function(result) {
                                            var accessTokenParameters = result.split("&");
                                            var parameterMap = {};
                                            for(var i = 0; i < accessTokenParameters.length; i++) {
                                                parameterMap[accessTokenParameters[i].split("=")[0]] = accessTokenParameters[i].split("=")[1];
                                            }
                                            if(parameterMap.hasOwnProperty("oauth_token_secret") === false) {
                                                deferred.reject("Oauth access token was not received");
                                            }
                                            deferred.resolve(parameterMap);
                                        })
                                        .error(function(error) {
                                            deferred.reject(error);
                                        })
                                        .finally(function() {
                                            setTimeout(function() {
                                                browserRef.close();
                                            }, 10);
                                        });
                                    }
                                });
                                browserRef.addEventListener('exit', function(event) {
                                    deferred.reject("The sign in flow was canceled");
                                });
                            })
                            .error(function(error) {
                                deferred.reject(error);
                            });
                        } else {
                            deferred.reject("Missing jsSHA JavaScript library");
                        }
                    } else {
                        deferred.reject("Could not find InAppBrowser plugin");
                    }
                } else {
                    deferred.reject("Cannot authenticate via a web browser");
                }
                return deferred.promise;
            },

            /*
            * Sign into the Vkontakte service
            *
            * @param    string clientId
            * @param    array appScope (for example: "friends,wall,photos,messages")
            * @return   promise
            */
            vkontakte: function(clientId, appScope) {
                var deferred = $q.defer();
                if(window.cordova) {
                    var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                    if(cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                        var browserRef = window.open('https://oauth.vk.com/authorize?client_id=' + clientId + '&redirect_uri=http://oauth.vk.com/blank.html&response_type=token&scope=' + appScope.join(",") + '&display=touch&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                        browserRef.addEventListener('loadstart', function(event) {
                            var tmp = (event.url).split("#");
                            if (tmp[0] == 'https://oauth.vk.com/blank.html' || tmp[0] == 'http://oauth.vk.com/blank.html') {
                                var callbackResponse = (event.url).split("#")[1];
                                var responseParameters = (callbackResponse).split("&");
                                var parameterMap = [];
                                for(var i = 0; i < responseParameters.length; i++) {
                                    parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                                }
                                if(parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                    deferred.resolve({ access_token: parameterMap.access_token, expires_in: parameterMap.expires_in });
                                } else {
                                    deferred.reject("Problem authenticating");
                                }
                                setTimeout(function() {
                                    browserRef.close();
                                }, 10);
                            }
                        });
                        browserRef.addEventListener('exit', function(event) {
                            deferred.reject("The sign in flow was canceled");
                        });
                    } else {
                        deferred.reject("Could not find InAppBrowser plugin");
                    }
                } else {
                    deferred.reject("Cannot authenticate via a web browser");
                }
                return deferred.promise;
            }

    };
  }]);

angular.module("ngCordova.plugins.oauthUtility", [])

  .factory('$cordovaOauthUtility', ['$q', function ($q) {

    return {

      /*
       * Sign an Oauth 1.0 request
       *
       * @param    string method
       * @param    string endPoint
       * @param    object headerParameters
       * @param    object bodyParameters
       * @param    string secretKey
       * @return   object
       */
       createSignature: function(method, endPoint, headerParameters, bodyParameters, secretKey, tokenSecret) {
           if(typeof jsSHA !== "undefined") {
               var headerAndBodyParameters = angular.copy(headerParameters);
               var bodyParameterKeys = Object.keys(bodyParameters);
               for(var i = 0; i < bodyParameterKeys.length; i++) {
                   headerAndBodyParameters[bodyParameterKeys[i]] = encodeURIComponent(bodyParameters[bodyParameterKeys[i]]);
               }
               var signatureBaseString = method + "&" + encodeURIComponent(endPoint) + "&";
               var headerAndBodyParameterKeys = (Object.keys(headerAndBodyParameters)).sort();
               for(i = 0; i < headerAndBodyParameterKeys.length; i++) {
                   if(i == headerAndBodyParameterKeys.length - 1) {
                       signatureBaseString += encodeURIComponent(headerAndBodyParameterKeys[i] + "=" + headerAndBodyParameters[headerAndBodyParameterKeys[i]]);
                   } else {
                       signatureBaseString += encodeURIComponent(headerAndBodyParameterKeys[i] + "=" + headerAndBodyParameters[headerAndBodyParameterKeys[i]] + "&");
                   }
               }
               var oauthSignatureObject = new jsSHA(signatureBaseString, "TEXT");

               var encodedTokenSecret = '';
               if (tokenSecret) {
                   encodedTokenSecret = encodeURIComponent(tokenSecret);
               }

               headerParameters.oauth_signature = encodeURIComponent(oauthSignatureObject.getHMAC(encodeURIComponent(secretKey) + "&" + encodedTokenSecret, "TEXT", "SHA-1", "B64"));
               var headerParameterKeys = Object.keys(headerParameters);
               var authorizationHeader = 'OAuth ';
               for(i = 0; i < headerParameterKeys.length; i++) {
                   if(i == headerParameterKeys.length - 1) {
                       authorizationHeader += headerParameterKeys[i] + '="' + headerParameters[headerParameterKeys[i]] + '"';
                   } else {
                       authorizationHeader += headerParameterKeys[i] + '="' + headerParameters[headerParameterKeys[i]] + '",';
                   }
               }
               return { signature_base_string: signatureBaseString, authorization_header: authorizationHeader, signature: headerParameters.oauth_signature };
           } else {
               return "Missing jsSHA JavaScript library";
           }
       },

    /*
    * Create Random String Nonce
    *
    * @param    integer length
    * @return   string
    */
    createNonce: function(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    };

  }]);

// install   :      cordova plugin add https://github.com/Paldom/PinDialog.git
// link      :      https://github.com/Paldom/PinDialog

angular.module('ngCordova.plugins.pinDialog', [])

  .factory('$cordovaPinDialog', ['$q', '$window', function ($q, $window) {

    return {
      prompt: function (message, title, buttons) {
        var q = $q.defer();

        $window.plugins.pinDialog.prompt(message, function (res) {
          q.resolve(res);
        }, title, buttons);

        return q.promise;
      }
    };
  }]);

// install   :
// link      :

angular.module('ngCordova.plugins.prefs', [])

  .factory('$cordovaPreferences', ['$window', '$q', function ($window, $q) {

    return {

      set: function (key, value) {
        var q = $q.defer();

        $window.appgiraffe.plugins.applicationPreferences.set(key, value, function (result) {
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      },

      get: function (key) {
        var q = $q.defer();

        $window.appgiraffe.plugins.applicationPreferences.get(key, function (value) {
          q.resolve(value);
        }, function (err) {
          q.reject(err);
        });

        return q.promise;
      }
    };
  }]);

// install   : cordova plugin add de.appplant.cordova.plugin.printer
// link      : https://github.com/katzer/cordova-plugin-printer

angular.module('ngCordova.plugins.printer', [])

  .factory('$cordovaPrinter', ['$q', '$window', function ($q, $window) {

    return {
      isAvailable: function () {
        var q = $q.defer();

        $window.plugin.printer.isAvailable(function (isAvailable) {
          q.resolve(isAvailable);
        });

        return q.promise;
      },

      print: function (doc, options) {
        var q = $q.defer();
        $window.plugin.printer.print(doc, options, function () {
          q.resolve();
        });
        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.pbernasconi.progressindicator
// link      :      http://pbernasconi.github.io/cordova-progressIndicator/

angular.module('ngCordova.plugins.progressIndicator', [])

  .factory('$cordovaProgress', ['$q', function ($q) {

    return {
      show: function(_message) {
        var message = _message || "Please wait...";
        return ProgressIndicator.show(message);
      },

      showSimple: function (_dim) {
        var dim = _dim || false;
        return ProgressIndicator.showSimple(dim);
      },

      showSimpleWithLabel: function (_dim, _label) {
        var dim = _dim || false;
        var label = _label || "Loading...";
        return ProgressIndicator.showSimpleWithLabel(dim, label);
      },

      showSimpleWithLabelDetail: function (_dim, _label, _detail) {
        var dim = _dim || false;
        var label = _label || "Loading...";
        var detail = _detail || "Please wait";
        return ProgressIndicator.showSimpleWithLabelDetail(dim, label, detail);
      },

      showDeterminate: function (_dim, _timeout) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        return ProgressIndicator.showDeterminate(dim, timeout);
      },

      showDeterminateWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";

        return ProgressIndicator.showDeterminateWithLabel(dim, timeout, label);
      },

      showAnnular: function (_dim, _timeout) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        return ProgressIndicator.showAnnular(dim, timeout);
      },

      showAnnularWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";
        return ProgressIndicator.showAnnularWithLabel(dim, timeout, label);
      },

      showBar: function (_dim, _timeout) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        return ProgressIndicator.showBar(dim, timeout);
      },

      showBarWithLabel: function (_dim, _timeout, _label) {
        var dim = _dim || false;
        var timeout = _timeout || 50000;
        var label = _label || "Loading...";
        return ProgressIndicator.showBarWithLabel(dim, timeout, label);
      },

      showSuccess: function (_dim, _label) {
        var dim = _dim || false;
        var label = _label || "Success";
        return ProgressIndicator.showSuccess(dim, label);
      },

      showText: function (_dim, _text, _position) {
        var dim = _dim || false;
        var text = _text || "Warning";
        var position = _position || "center";
        return ProgressIndicator.showText(dim, text, position);
      },

      hide: function () {
        return ProgressIndicator.hide();
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/phonegap-build/PushPlugin.git
// link      :      https://github.com/phonegap-build/PushPlugin

angular.module('ngCordova.plugins.push', [])

  .factory('$cordovaPush', ['$q', '$window', '$rootScope', '$timeout', function ($q, $window, $rootScope, $timeout) {
    return {
      onNotification: function (notification) {
        $timeout(function () {
          $rootScope.$broadcast('$cordovaPush:notificationReceived', notification);
        });
      },

      register: function (config) {
        var q = $q.defer();
        var injector;
        if (config !== undefined && config.ecb === undefined) {
          if (document.querySelector('[ng-app]') == null) {
            injector = "document.body";
          }
          else {
            injector = "document.querySelector('[ng-app]')";
          }
          config.ecb = "angular.element(" + injector + ").injector().get('$cordovaPush').onNotification";
        }

        $window.plugins.pushNotification.register(function (token) {
          q.resolve(token);
        }, function (error) {
          q.reject(error);
        }, config);

        return q.promise;
      },

      unregister: function (options) {
        var q = $q.defer();
        $window.plugins.pushNotification.unregister(function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        }, options);

        return q.promise;
      },

      // iOS only
      setBadgeNumber: function (number) {
        var q = $q.defer();
        $window.plugins.pushNotification.setApplicationIconBadgeNumber(function (result) {
          q.resolve(result);
        }, function (error) {
          q.reject(error);
        }, number);
        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/aharris88/phonegap-sms-plugin.git
// link      :      https://github.com/aharris88/phonegap-sms-plugin

angular.module('ngCordova.plugins.sms', [])

  .factory('$cordovaSms', ['$q', function ($q) {

    return {
      send: function (number, message, intent) {
        var q = $q.defer();
        sms.send(number, message, intent, function (res) {
          q.resolve(res);
        }, function (err) {
          q.reject(err);
        });
        return q.promise;
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
// link      :      https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin

// NOTE: shareViaEmail -> if user cancels sharing email, success is still called
// TODO: add support for iPad

angular.module('ngCordova.plugins.socialSharing', [])

  .factory('$cordovaSocialSharing', ['$q', '$window', function ($q, $window) {

    return {
      share: function (message, subject, file, link) {
        var q = $q.defer();
        subject = subject || null;
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.share(message, subject, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaTwitter: function (message, file, link) {
        var q = $q.defer();
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareViaTwitter(message, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaWhatsApp: function (message, file, link) {
        var q = $q.defer();
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareViaWhatsApp(message, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaFacebook: function (message, file, link) {
        var q = $q.defer();
        message = message || null;
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareViaFacebook(message, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaFacebookWithPasteMessageHint: function (message, file, link, pasteMessageHint) {
        var q = $q.defer();
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(message, file, link, pasteMessageHint, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaSMS: function (message, commaSeparatedPhoneNumbers) {
        var q = $q.defer();
        $window.plugins.socialsharing.shareViaSMS(message, commaSeparatedPhoneNumbers, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareViaEmail: function (message, subject, toArr, ccArr, bccArr, fileArr) {
        var q = $q.defer();
        toArr = toArr || null;
        ccArr = ccArr || null;
        bccArr = bccArr || null;
        fileArr = fileArr || null;
        $window.plugins.socialsharing.shareViaEmail(message, subject, toArr, ccArr, bccArr, fileArr, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      shareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        message = message || null;
        subject = subject || null;
        file = file || null;
        link = link || null;
        $window.plugins.socialsharing.shareVia(via, message, subject, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      canShareViaEmail: function () {
        var q = $q.defer();
        $window.plugins.socialsharing.canShareViaEmail(function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
        return q.promise;
      },

      canShareVia: function (via, message, subject, file, link) {
        var q = $q.defer();
        $window.plugins.socialsharing.canShareVia(via, message, subject, file, link, function (success) {
          q.resolve(success);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      available: function () {
        var q = $q.defer();
        window.plugins.socialsharing.available(function (isAvailable) {
          if (isAvailable) {
            q.resolve();
          }
          else {
            q.reject();
          }
        });
      }
    };
  }]);

// install   :       cordova plugin add https://github.com/Paldom/SpinnerDialog.git
// link      :       https://github.com/Paldom/SpinnerDialog

angular.module('ngCordova.plugins.spinnerDialog', [])

  .factory('$cordovaSpinnerDialog', ['$window', function ($window) {

    return {
      show: function (title, message, fixed) {
        fixed = fixed || false;
        return $window.plugins.spinnerDialog.show(title, message, fixed);
      },
      hide: function () {
        return $window.plugins.spinnerDialog.hide();
      }
    };

  }]);

// install   :      cordova plugin add org.apache.cordova.splashscreen
// link      :      https://github.com/apache/cordova-plugin-splashscreen/blob/master/doc/index.md

angular.module('ngCordova.plugins.splashscreen', [])

  .factory('$cordovaSplashscreen', [function () {

    return {
      hide: function () {
        return navigator.splashscreen.hide();
      },

      show: function () {
        return navigator.splashscreen.show();
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
// link      :      https://github.com/brodysoft/Cordova-SQLitePlugin/blob/master/README.md

angular.module('ngCordova.plugins.sqlite', [])

  .factory('$cordovaSQLite', ['$q', '$window', function ($q, $window) {

    return {
      openDB: function (dbName, background) {

        if (typeof background === 'undefined') {
          background = 0;
        }

        return $window.sqlitePlugin.openDatabase({
          name: dbName,
          bgType: background
        });
      },

      execute: function (db, query, binding) {
        var q = $q.defer();
        db.transaction(function (tx) {
          tx.executeSql(query, binding, function (tx, result) {
              q.resolve(result);
            },
            function (transaction, error) {
              q.reject(error);
            });
        });
        return q.promise;
      },

      insertCollection: function (db, query, bindings) {
        var q = $q.defer();
        var coll = bindings.slice(0); // clone collection

        db.transaction(function (tx) {
          (function insertOne() {
            var record = coll.splice(0, 1)[0]; // get the first record of coll and reduce coll by one
            try {
              tx.executeSql(query, record, function (tx, result) {
                if (coll.length === 0) {
                  q.resolve(result);
                } else {
                  insertOne();
                }
              }, function (transaction, error) {
                q.reject(error);
                return;
              });
            } catch (exception) {
              q.reject(exception);
            }
          })();
        });
        return q.promise;
      },

      nestedExecute: function (db, query1, query2, binding1, binding2) {
        var q = $q.defer();

        db.transaction(function (tx) {
            tx.executeSql(query1, binding1, function (tx, result) {
              q.resolve(result);
              tx.executeSql(query2, binding2, function (tx, res) {
                q.resolve(res);
              });
            });
          },
          function (transaction, error) {
            q.reject(error);
          });

        return q.promise;
      },

      deleteDB: function (dbName) {
        var q = $q.defer();

        $window.sqlitePlugin.deleteDatabase(dbName, function (success) {
          q.resolve(success);
        }, function (error) {
          q.reject(error);
        });

        return q.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.statusbar
// link      :      https://github.com/apache/cordova-plugin-statusbar/blob/master/doc/index.md

angular.module('ngCordova.plugins.statusbar', [])

  .factory('$cordovaStatusbar', [function () {

    return {
      overlaysWebView: function (bool) {
        return StatusBar.overlaysWebView(!!bool);
      },

      style: function (style) {
        switch (style) {
          // Default
          case 0:
            return StatusBar.styleDefault();

          // LightContent
          case 1:
            return StatusBar.styleLightContent();

          // BlackTranslucent
          case 2:
            return StatusBar.styleBlackTranslucent();

          // BlackOpaque
          case 3:
            return StatusBar.styleBlackOpaque();

          default:
            return StatusBar.styleDefault();
        }
      },

      // supported names:
      // black, darkGray, lightGray, white, gray, red, green,
      // blue, cyan, yellow, magenta, orange, purple, brown
      styleColor: function (color) {
        return StatusBar.backgroundColorByName(color);
      },

      styleHex: function (colorHex) {
        return StatusBar.backgroundColorByHexString(colorHex);
      },

      hide: function () {
        return StatusBar.hide();
      },

      show: function () {
        return StatusBar.show();
      },

      isVisible: function () {
        return StatusBar.isVisible;
      }
    };
  }]);

// install   :      cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
// link      :      https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin

angular.module('ngCordova.plugins.toast', [])

  .factory('$cordovaToast', ['$q', '$window', function ($q, $window) {

    return {
      showShortTop: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showShortCenter: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showShortBottom: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showShortBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showLongTop: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongTop(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showLongCenter: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongCenter(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },

      showLongBottom: function (message) {
        var q = $q.defer();
        $window.plugins.toast.showLongBottom(message, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      },


      show: function (message, duration, position) {
        var q = $q.defer();
        $window.plugins.toast.show(message, duration, position, function (response) {
          q.resolve(response);
        }, function (error) {
          q.reject(error);
        });
        return q.promise;
      }
    };

  }]);

// install   :      cordova plugin add https://github.com/leecrossley/cordova-plugin-touchid.git
// link      :      https://github.com/leecrossley/cordova-plugin-touchid

angular.module('ngCordova.plugins.touchid', [])

  .factory('$cordovaTouchID', ['$q', function ($q) {

    return {
      checkSupport: function () {
        var defer = $q.defer();
        if (!window.cordova) {
          defer.reject("Not supported without cordova.js");
        } else {
          touchid.checkSupport(function (value) {
            defer.resolve(value);
          }, function (err) {
            defer.reject(err);
          });
        }

        return defer.promise;
      },

      authenticate: function (auth_reason_text) {
        var defer = $q.defer();
        if (!window.cordova) {
          defer.reject("Not supported without cordova.js");
        } else {
          touchid.authenticate(function (value) {
            defer.resolve(value);
          }, function (err) {
            defer.reject(err);
          }, auth_reason_text);
        }

        return defer.promise;
      }
    };
  }]);

// install   :      cordova plugin add org.apache.cordova.vibration
// link      :      https://github.com/apache/cordova-plugin-vibration/blob/master/doc/index.md

angular.module('ngCordova.plugins.vibration', [])

  .factory('$cordovaVibration', [function () {

    return {
      vibrate: function (times) {
        return navigator.notification.vibrate(times);
      },
      vibrateWithPattern: function (pattern, repeat) {
        return navigator.notification.vibrateWithPattern(pattern, repeat);
      },
      cancelVibration: function () {
        return navigator.notification.cancelVibration();
      }
    };
  }]);

// install   :    cordova plugin add https://github.com/EddyVerbruggen/VideoCapturePlus-PhoneGap-Plugin.git
// link      :    https://github.com/EddyVerbruggen/VideoCapturePlus-PhoneGap-Plugin

angular.module('ngCordova.plugins.videoCapturePlus', [])

  .provider('$cordovaVideoCapturePlus', [function () {

    var defaultOptions = {};


    /**
     * the nr of videos to record, default 1 (on iOS always 1)
     *
     * @param limit
     */
    this.setLimit = function setLimit(limit) {
      defaultOptions.limit = limit;
    };


    /**
     * max duration in seconds, default 0, which is 'forever'
     *
     * @param seconds
     */
    this.setMaxDuration = function setMaxDuration(seconds) {
      defaultOptions.duration = seconds;
    };


    /**
     * set to true to override the default low quality setting
     *
     * @param {Boolean} highquality
     */
    this.setHighQuality = function setHighQuality(highquality) {
      defaultOptions.highquality = highquality;
    };

    /**
     * you'll want to sniff the user-Agent/device and pass the best overlay based on that..
     * set to true to override the default backfacing camera setting. iOS: works fine, Android: YMMV (#18)
     *
     * @param {Boolean} frontcamera
     */
    this.useFrontCamera = function useFrontCamera(frontcamera) {
      defaultOptions.frontcamera = frontcamera;
    };


    /**
     * put the png in your www folder
     *
     * @param {String} imageUrl
     */
    this.setPortraitOverlay = function setPortraitOverlay(imageUrl) {
      defaultOptions.portraitOverlay = imageUrl;
    };


    /**
     *
     * @param {String} imageUrl
     */
    this.setLandscapeOverlay = function setLandscapeOverlay(imageUrl) {
      defaultOptions.landscapeOverlay = imageUrl;
    };


    /**
     * iOS only
     *
     * @param text
     */
    this.setOverlayText = function setOverlayText(text) {
      defaultOptions.overlayText = text;
    };


    this.$get = ['$q', '$window', function ($q, $window) {
      return {
        captureVideo: function (options) {
          var q = $q.defer();

          if (!$window.plugins.videocaptureplus) {
            q.resolve(null);
            return q.promise;
          }

          $window.plugins.videocaptureplus.captureVideo(q.resolve, q.reject,
            angular.extend({}, defaultOptions, options));

          return q.promise;
        }
      };
    }];
  }]);

// install  :     cordova plugin add https://github.com/MobileChromeApps/zip.git
// link     :     https://github.com/MobileChromeApps/zip

angular.module('ngCordova.plugins.zip', [])

  .factory('$cordovaZip', ['$q', '$window', function ($q, $window) {

    return {
      unzip: function (source, destination) {
        var q = $q.defer();

        $window.zip.unzip(source, destination, function (isError) {
          if (isError === 0) {
            q.resolve();
          } else {
            q.reject();
          }
        }, function (progressEvent) {
          q.notify(progressEvent);
        });

        return q.promise;
      }
    };
  }]);

})();ionic.Config=ionic.Config||{};ionic.Config.app_id="d7255abe";ionic.Config.api_write_key="d7255abe";angular.module("miaomiao.console",["ngAnimate","ionic","ngCordova","LocalStorageModule","ngStorage","pasvaz.bindonce","QuickList","angular-datepicker","miaomiao.console.controllers","miaomiao.console.services","miaomiao.console.directives","ionic.services.deploy"]).constant("serverInfo",{host:"http://www.mbianli.com:8088",context:"/console/api/"}).config(function($httpProvider,$provide){$httpProvider.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8";var param=function(obj){var query="",name,value,fullSubName,subName,subValue,innerObj,i;for(name in obj){value=obj[name];if(value instanceof Array){for(i=0;i<value.length;++i){subValue=value[i];fullSubName=name+"["+i+"]";innerObj={};innerObj[fullSubName]=subValue;query+=param(innerObj)+"&"}}else{if(value instanceof Object){for(subName in value){subValue=value[subName];fullSubName=name+"["+subName+"]";innerObj={};innerObj[fullSubName]=subValue;query+=param(innerObj)+"&"}}else{if(value!==undefined&&value!==null){query+=encodeURIComponent(name)+"="+encodeURIComponent(value)+"&"}}}}return query.length?query.substr(0,query.length-1):query};$httpProvider.defaults.transformRequest=[function(data){return angular.isObject(data)&&String(data)!=="[object File]"?param(data):data}]}).config(function($compileProvider){$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/)}).config(function($stateProvider,$urlRouterProvider,$ionicAppProvider,$compileProvider,$ionicConfigProvider){try{$ionicAppProvider.identify({app_id:ionic.Config.app_id})}catch(e){console.error("ionic.Config not set. Make sure config.js is loaded",e)}$compileProvider.debugInfoEnabled(false);$ionicConfigProvider.tabs.position("bottom");$ionicConfigProvider.tabs.style("standard");$stateProvider.state("signin",{url:"/sign-in",templateUrl:"templates/sign-in.html",controller:"SignInCtrl"}).state("forgotpassword",{url:"/forgot-password",templateUrl:"templates/forgot-password.html"}).state("changepassword",{url:"/change-password",templateUrl:"templates/change-password.html",controller:"ChangePwdCtrl"}).state("tab",{url:"/tab","abstract":true,templateUrl:function(){if(ionic.Platform.isAndroid()){return"templates/tabs-android.html"}return"templates/tabs.html"}}).state("tab.front-page",{url:"/front-page",views:{"tab-front-page":{templateUrl:"templates/tab-home.html",controller:"FrontPageCtrl"}}}).state("tab.shop-edit",{url:"/shop-edit",views:{"tab-front-page":{templateUrl:"templates/shop-edit.html",controller:"EditShopCtrl"}}}).state("tab.product",{url:"/product",views:{"tab-product":{templateUrl:"templates/tab-product.html",controller:"ProductCtrl"}}}).state("tab.order",{url:"/order",views:{"tab-order":{templateUrl:"templates/tab-order.html",controller:"OrderCtrl"}}}).state("tab.search",{url:"/search",views:{"tab-search":{templateUrl:"templates/tab-search.html",controller:"SearchCtrl"}}});$urlRouterProvider.otherwise("/sign-in")}).run(function($ionicPlatform,$http,$ionicDeploy,localStorageService,httpClient,$state){$ionicPlatform.ready(function(){if(window.StatusBar){StatusBar.styleLightContent()}if(window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard){cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);cordova.plugins.Keyboard.disableScroll(true)}$ionicDeploy.initialize(ionic.Config.app_id);$ionicDeploy.check().then(function(response){console.log("got a response",response);if(response){console.log("downloading updates");$ionicDeploy.download().then(function(){console.log("extracting updates");$ionicDeploy.extract().then(function(){console.log("update extracted, loading")},function(error){console.log("error extracting")},function(progress){console.log("extraction progress",progress)})},function(error){console.log("error downloading")},function(progress){console.log("progress downloading",progress)})}else{console.log("no update, loading");$ionicDeploy.load()}},function(error){console.log("[check for update] error: checking for update")});if(navigator.splashscreen){navigator.splashscreen.hide()}var user=localStorageService.get("MMCONSOLE_METADATA_USER")||{};if(!user||!user.token){return}httpClient.islogin(user.token,function(data,status){if(navigator.splashscreen){navigator.splashscreen.hide()}var code=data.code,dataDetail=data.data;if(code!=0){console.log("[check for login]check login status failed:"+code);$state.go("signin",null,{reload:true});return}localStorageService.set("MMCONSOLE_METADATA_SHOP_LIST",dataDetail.shop);localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",dataDetail.shop[0]);$state.go("tab.front-page",null,{reload:true})},function(data,status){if(navigator.splashscreen){navigator.splashscreen.hide()}console.log("[check for login]check login status failed");$state.go("signin",null,{reload:true})})})});angular.module("miaomiao.console.services",[]).factory("MMPushNotification",["$rootScope","httpClient","localStorageService","$cordovaToast","$timeout",function($rootScope,httpClient,localStorageService,$cordovaToast,$timeout){return{subscribe:function(){var token=localStorageService.get("MMCONSOLE_META_PUSH_DEVICE_TOKEN");var user=localStorageService.get("MMCONSOLE_METADATA_USER");if(token&&user&&user.phone){var chn="iOS";if(ionic.Platform.isAndroid()){chn="adr";}httpClient.subscribeForCurrentDevice(user.phone,chn,token,function(){console.log("注册通知成功，您将会在此应用中收到新订单通知~");},function(){});}},newOrderNotificationReceived:function(data){console.log("we have see new orders and sent broadcast");$timeout(function(){$rootScope.$broadcast("MMEVENT_NewOrderNotificationReceived",{data:data});});},onNewOrderNotificationReceived:function($scope,handler){console.log("we watch new orders and listening for notifications");$scope.$on("MMEVENT_NewOrderNotificationReceived",function(event,message){handler(message);});}};}]).factory("MMShopService",["$rootScope","httpClient","localStorageService","$timeout",function($rootScope,httpClient,localStorageService,$timeout){return{switchDefaultShopNotification:function(data){$timeout(function(){$rootScope.$broadcast("MMEVENT_switchDefaultShopNotification",{data:data});});},onSwitchDefaultShopNotification:function($scope,handler){$scope.$on("MMEVENT_switchDefaultShopNotification",function(event,message){handler(message);});}};}]).factory("MMProductService",["$rootScope","$timeout",function($rootScope,$timeout){var categorys=[],category_summary=[],inLoadingMoreProcess=false;return{initCategorysWithData:function(cates){var retCategoryls=cates;if(!retCategoryls||!retCategoryls.length){categorys.itemls=[];return;}var retCategorylNames=[];for(var idx=0;idx<retCategoryls.length;idx++){var curCategory=retCategoryls[idx];retCategorylNames.push({name:curCategory.name,category_id:curCategory.category_id});curCategory.selected=0;curCategory.scrollIndex=curCategory.itemls.length;curCategory.canLoadMore=true;curCategory.itemls=this.removeDuplicateItems(curCategory.itemls);}categorys=retCategoryls;category_summary=retCategorylNames;},removeDuplicateItems:function(source){var arr={};for(var i=0;i<source.length;i++){arr[source[i]["id"]]=source[i];}var result=new Array();for(var key in arr){result.push(arr[key]);}return result;},setCanLoadMoreFlagForIndex:function(index,canLoadMore){categorys[index].canLoadMore=canLoadMore;},getCanLoadMoreFlagForIndex:function(index){return categorys[index].canLoadMore;},setInLoadingMoreFlag:function(inLoading){inLoadingMoreProcess=inLoading;},getInLoadingMoreFlag:function(inLoading){return inLoadingMoreProcess;},getCategorySummary:function(){return category_summary;},getCategoryForIndex:function(index){if(index<0||index>categorys.length-1){return null;}return categorys[index];},setCategoryForIndex:function(index,category){if(index<0||index>categorys.length-1){return;}categorys[index]=category;},addMoreItemsForCategoryId:function(cateId,items){for(var idx=0;idx<categorys.length;idx++){if(cateId==categorys[idx].category_id){var currentCategory=categorys[idx];currentCategory.itemls=this.removeDuplicateItems(currentCategory.itemls.concat(items));currentCategory.scrollIndex+=items.length;currentCategory.totalCnt=0;break;}}},addProductItemToCategory:function(cateId,item){for(var idx=0;idx<categorys.length;idx++){if(cateId==categorys[idx].category_id){categorys[idx].itemls.push(item);break;}}},addProductToCategoryNotification:function(cateId,item){$timeout(function(){$rootScope.$broadcast("MMEVENT_addProductToCategoryNotification",{cateId:cateId,item:item});});},onAddProductToCategoryNotification:function($scope,handler){$scope.$on("MMEVENT_addProductToCategoryNotification",function(event,message){handler(message);});},switchCategoryNotification:function(data){$timeout(function(){$rootScope.$broadcast("MMEVENT_switchCategoryNotification",{data:data});});},onSwitchCategoryNotification:function($scope,handler){$scope.$on("MMEVENT_switchCategoryNotification",function(event,message){handler(message);});},renderDataNotification:function(data){$timeout(function(){$rootScope.$broadcast("MMEVENT_renderDataNotification",{data:data});});},onRenderDataNotification:function($scope,handler){$scope.$on("MMEVENT_renderDataNotification",function(event,message){handler(message);});}};}]).factory("Camera",["$q",function($q){return{getPicture:function(options){var q=$q.defer();navigator.camera.getPicture(function(result){q.resolve(result);},function(err){q.reject(err);},options);return q.promise;}};}]).factory(("ionPlatform"),function($q){var ready=$q.defer();ionic.Platform.ready(function(device){ready.resolve(device);});return{ready:ready.promise};});angular.module("miaomiao.console.services").factory("httpClient",["$http","serverInfo",function($http,serverInfo){var doGet=function(path,params,success,fail){$http({method:"GET",url:serverInfo.host+serverInfo.context+path+"?"+params}).success(function(data,status,headers,config){success(data,status,headers,config);}).error(function(data,status,headers,config){fail(data,status,headers,config);});};var doPost=function(path,params,success,fail){$http.post(serverInfo.host+serverInfo.context+path,params,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(data,status,headers,config){success(data,status,headers,config);}).error(function(data,status,headers,config){fail(data,status,headers,config);});};return{islogin:function(token,success,fail){doGet("login/islogin","token="+token,success,fail);},login:function(phone,pwd,success,fail){doPost("login/valid",{phone:phone,pwd:pwd},success,fail);},logOut:function(phone,success,fail){doGet("logout","phone="+phone,success,fail);},changePwd:function(phone,old_pwd,new_pwd,success,fail){doPost("login/change_pwd",{phone:phone,old_pwd:old_pwd,new_pwd:new_pwd},success,fail);},getSummary:function(shopId,beginDate,endDate,success,fail){doGet("order/summary","shop_id="+shopId+"&beginDate="+beginDate+"&endDate="+endDate,success,fail);},getProductList:function(shopId,success,fail){doGet("shop/category/get","shop_id="+shopId,success,fail);},getMoreProductList:function(shopId,cateId,from,offset,success,fail){doGet("shop/getitems","shop_id="+shopId+"&category_id="+cateId+"&from="+from+"&offset="+offset,success,fail);},getMyOrders:function(shopId,from,offset,success,fail){doGet("order/list","shop_id="+shopId+"&from="+from+"&offset="+offset,success,fail);},orderHasbeenRead:function(shopId,order_id,success,fail){doGet("order/read","shop_id="+shopId+"&order_id="+order_id,success,fail);},getMoreMyOrders:function(shopId,from,offset,success,fail){doGet("order/list","shop_id="+shopId+"&from="+from+"&offset="+offset,success,fail);},getSearchResults:function(shopId,key,success,fail){doGet("shopItem/query","shop_id="+shopId+"&query="+key,success,fail);},getItemInfo:function(serialNo,success,fail){doGet("product/get","serialNo="+serialNo,success,fail);},deleteItem:function(itemId,shopId,success,fail){doGet("shopItem/del","itemId="+itemId+"&shop_id="+shopId,success,fail);},stickItem:function(itemId,categoryId,shopId,success,fail){doGet("shopItem/sticky","itemId="+itemId+"&category_id="+categoryId+"&shop_id="+shopId,success,fail);},addItem:function(options,success,fail){doPost("shopItem/addItem",options,success,fail);},updateItem:function(options,shopId,success,fail){options.shop_id=shopId;doPost("shopItem/update",options,success,fail);},uploadPicForItem:function(serialNo,fileURI,shopId,success,fail){var options=new FileUploadOptions();options.fileKey="pic";options.fileName=fileURI.substr(fileURI.lastIndexOf("/")+1);options.mimeType="image/jpeg";options.params={serialNo:serialNo,pic:fileURI,shop_id:shopId};var ft=new FileTransfer();ft.upload(fileURI,encodeURI(serverInfo.host+serverInfo.context+"shopItem/ul_pic"),success,fail,options);},getShopList:function(from,offset,success,fail){doGet("shop/shopList","from="+from+"&offset="+offset,success,fail);},updateShopInfo:function(options,success,fail){doPost("shop/updateShopInfo",options,success,fail);},getShopInfo:function(shop_id,success,fail){doGet("shop","shop_id="+shop_id,success,fail);},getNearShopList:function(lat,lng,success,fail){doGet("near","lat="+lat+"&lng="+lng,success,fail);},subscribeForCurrentDevice:function(ower_phone,chn,device_token,success,fail){doGet("subscribe","ower_phone="+ower_phone+"&chn="+chn+"&device_token="+device_token,success,fail);}};}]);angular.module("miaomiao.console.services").filter("getTotolCount",function(){return function(input){input=input||[];var total=0;for(var item_idx=0;item_idx<input.length;item_idx++){total+=parseInt(input[item_idx].count||0);}return total;};}).filter("getTotolPrice",function(){return function(input){input=input||[];var total=0;for(var item_idx=0;item_idx<input.length;item_idx++){total+=parseFloat(input[item_idx].price||0)*parseInt(input[item_idx].count||0);}return total/100;};}).filter("removeAMPM",function(){return function(text){if(!text){return;}return text.replace(/AM/,"").replace(/PM/,"");};}).filter("getShopStatusString",function(){return function(input){return input==0?"营业中":"打烊了";};}).filter("getShopMinPrice",function(){return function(input){return input?input/100:20;};}).filter("getDisplayShoppingPrice",function(){return function(input){return input?input/100:0;};}).filter("timeAgo",function(){var cache=[];return function(date){if(typeof cache[date]==="string"){return cache[date];}var prettyDate=moment(date,"X").fromNow();cache[date]=prettyDate;return prettyDate;};});angular.module("miaomiao.console.services").factory("MMUtils",["$timeout","$ionicLoading","$ionicPopup",function($timeout,$ionicLoading,$ionicPopup){return{isEmptyObject:function(obj){if(obj==null){return true;}if(obj.length>0){return false;}if(obj.length===0){return true;}for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){return false;}}return true;},isValidTelNumber:function(number){var regPhone=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;var regMobile=/^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;return regPhone.test(number)||regMobile.test(number);},showLoadingIndicator:function(message,scope,tmpUrl){scope.LoadingMessage=message;$ionicLoading.show({templateUrl:tmpUrl||"templates/loadingIndicator.html",scope:scope});},showAlert:function(message,tmpUrl){$ionicPopup.alert({title:message,template:tmpUrl||""});}};}]);angular.module("miaomiao.console.directives",[]).directive("backImg",function(){return function(scope,element,attrs){var url=attrs.backImg;element.css({"background-image":"url("+url+")","background-size":"contain"});};}).directive("ngTimeSelector",function(){return{restrict:"EA",templateUrl:"templates/timepicker.html",scope:{hours:"=",minutes:"="},replace:true,link:function(scope,elem,attr){scope.period="上午";scope.increaseHours=function(){if(scope.hours<23){scope.hours=++scope.hours;}else{scope.hours=0;}};scope.decreaseHours=function(){scope.hours=scope.hours<=0?23:--scope.hours;};scope.increaseMinutes=function(){if(scope.minutes>=59){scope.minutes=0;}else{scope.minutes++;}};scope.decreaseMinutes=function(){if(scope.minutes<=0){scope.minutes=59;}else{scope.minutes=--scope.minutes;}};scope.displayHours=function(){var hoursToDisplay=scope.hours;if(scope.hours>12){hoursToDisplay=scope.hours-12;}if(hoursToDisplay==0){hoursToDisplay=12;}else{if(hoursToDisplay<=9){hoursToDisplay="0"+hoursToDisplay;}}return hoursToDisplay;};scope.displayMinutes=function(){return scope.minutes<=9?"0"+scope.minutes:scope.minutes;};scope.switchPeriod=function(){scope.hours=scope.hours>=12?scope.hours-12:scope.hours+12;};}};});angular.module("miaomiao.console.controllers",[]).controller("MainCtrl",function($scope,$state,$window,$cordovaPush,$timeout,$cordovaDialogs,$cordovaMedia,$cordovaToast,ionPlatform,$http,httpClient,localStorageService,MMPushNotification){$scope.open=function(url){var params="location=no,enableViewportScale=yes,toolbarposition=top,closebuttoncaption=Done";var iab=window.open(url,"_blank",params);iab.addEventListener("exit",function(){iab.removeEventListener("exit",argument.callee);iab.close();iab=null;});};var halfHeight=null;$scope.getHalfHeight=function(){if(ionic.Platform.isAndroid()){return 0;}if(!halfHeight){halfHeight=(document.documentElement.clientHeight/2)-200;}return halfHeight;};$scope.notifications=[];$scope.registerToken=undefined;ionPlatform.ready.then(function(device){$scope.register();});var onNotification=$window.onNotification=window.onNotification=function onNotification(notification){console.log(JSON.stringify(notification));if(ionic.Platform.isAndroid()){handleAndroid(notification);}else{if(ionic.Platform.isIOS()){handleIOS(notification);$scope.$apply(function(){$scope.notifications.push(JSON.stringify(notification.alert));});}}};$scope.register=function(){var config={};if(ionic.Platform.isAndroid()){config={senderID:"miaomiao-bconsole",ecb:"onNotification"};}else{if(ionic.Platform.isIOS()){config={badge:"true",sound:"true",alert:"true",ecb:"onNotification"};}else{return;}}$cordovaPush.register(config).then(function(result){console.log("Register success "+result);$scope.registerDisabled=true;$scope.registerToken=result;if(result!=null){localStorageService.set("MMCONSOLE_META_PUSH_DEVICE_TOKEN",result);MMPushNotification.subscribe();}},function(err){console.log("Register error "+err);});};function handleAndroid(notification){console.log("handle Android : In foreground "+notification.foreground+" Coldstart "+notification.coldstart);if(notification.event=="registered"){$scope.regId=notification.regid;localStorageService.set("MMCONSOLE_META_PUSH_DEVICE_TOKEN",notification.regid);MMPushNotification.subscribe();}else{if(notification.event=="message"){var title="喵喵商家推送",text="您有新的订单，请到我的订单下查看";if(notification.payload&&notification.payload.body&&notification.payload.body.body){text=notification.payload.body.body.text;title=notification.payload.body.body.title;}$cordovaDialogs.alert(text,title).then(function(){$state.go("tab.order",null,{reload:true});$timeout(function(){MMPushNotification.newOrderNotificationReceived({count:1});},100);});$scope.$apply(function(){$scope.notifications.push(JSON.stringify(notification.message));});}else{if(notification.event=="error"){$cordovaDialogs.alert(notification.msg,"Push notification error event");}else{$cordovaDialogs.alert(notification.event,"Push notification handler - Unprocessed Event");}}}}function handleIOS(notification){console.log("handle iOS : In foreground "+notification.foreground+" Coldstart "+notification.coldstart);console.log("handle iOS: the notification is:"+JSON.stringify(notification));var inappHanlder=function(){$state.go("tab.order",null,{reload:true});$timeout(function(){MMPushNotification.newOrderNotificationReceived({count:1});},100);};if(notification.foreground=="1"){if(notification.body&&notification.messageFrom){console.log("the notification body is:"+notification.body);$cordovaDialogs.alert(notification.body,notification.messageFrom).then(function(){inappHanlder();});}else{console.log("the notification body alert:"+notification.alert);$cordovaDialogs.alert(notification.alert,"喵喵商家推送","确定").then(function(){inappHanlder();});}if(notification.badge){console.log("we are in foreground badge");$cordovaPush.setBadgeNumber(notification.badge).then(function(result){console.log("Set badge success "+result);},function(err){console.log("Set badge error "+err);});}if(notification.sound){console.log("we are in foreground and have sound");var mediaSrc=$cordovaMedia.newMedia(notification.sound);mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));}}else{console.log("we are in background");if(notification.body&&notification.messageFrom){console.log("we are in background body");$cordovaDialogs.alert(notification.body,notification.messageFrom).then(function(){inappHanlder();});}else{console.log("we are in background alert");$cordovaDialogs.alert(notification.alert,"喵喵商家推送").then(function(){inappHanlder();});}if(notification.badge){console.log("we are in background mode");$cordovaPush.setBadgeNumber(notification.badge).then(function(result){console.log("Set badge success "+result);},function(err){console.log("Set badge error "+err);});}}}$scope.unregister=function(){console.log("Unregister called");$scope.registerDisabled=false;$cordovaPush.unregister({}).then(function(result){console.log("Unregister success "+result);},function(err){console.log("Unregister error "+err);});};});angular.module("miaomiao.console.controllers").controller("SignInCtrl",function($scope,$ionicLoading,$compile,$ionicPopup,$timeout,$ionicScrollDelegate,$http,$state,localStorageService,httpClient,MMUtils,MMPushNotification){$scope.user=localStorageService.get("MMCONSOLE_METADATA_USER")||{};$scope.signIn=function(user){if(!$scope.user.password||!$scope.user.name){MMUtils.showAlert("请输入用户名和密码");return;}if(!MMUtils.isValidTelNumber($scope.user.phone)){MMUtils.showAlert("电话号码格式不正确");return;}MMUtils.showLoadingIndicator("正在登陆,请稍候...",$scope);httpClient.login($scope.user.phone,$scope.user.password,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("登陆失败:"+data.msg);return;}localStorageService.set("MMCONSOLE_METADATA_USER",{name:$scope.user.name,phone:$scope.user.phone,identity:$scope.user.phone,token:dataDetail.token});localStorageService.set("MMCONSOLE_METADATA_SHOP_LIST",dataDetail.shop);localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",dataDetail.shop[0]);MMPushNotification.subscribe();$state.go("tab.front-page",null,{reload:true});},function(data,status){$ionicLoading.hide();MMUtils.showAlert("登陆失败");});};});angular.module("miaomiao.console.controllers").controller("ChangePwdCtrl",function($scope,$ionicLoading,$compile,$ionicPopup,$timeout,$ionicScrollDelegate,$http,$state,localStorageService,httpClient,MMUtils,MMPushNotification){$scope.user=localStorageService.get("MMCONSOLE_METADATA_USER")||{};$scope.changepwd=function(user){if(!$scope.user.old_password||!$scope.user.new_password||!$scope.user.new_password_confirm){MMUtils.showAlert("密码输入不能为空");return;}if($scope.user.old_password==$scope.user.new_password){MMUtils.showAlert("新密码不能与旧密码相同");return;}if($scope.user.new_password!=$scope.user.new_password_confirm){MMUtils.showAlert("新密码两次输入不一致");return;}MMUtils.showLoadingIndicator("正在修改密码,请稍候...",$scope);httpClient.changePwd($scope.user.phone,$scope.user.old_password,$scope.user.new_password,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("修改密码失败:"+data.msg);return;}$state.go("signin",null,{reload:true});},function(data,status){$ionicLoading.hide();MMUtils.showAlert("修改密码失败");});};});angular.module("miaomiao.console.controllers").controller("FrontPageCtrl",function($scope,$ionicLoading,$ionicActionSheet,$ionicPopup,$state,$timeout,localStorageService,$ionicScrollDelegate,httpClient,MMShopService,MMUtils){$scope.info={};$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};$scope.shopName=$scope.info.shop.name||"首页";$scope.getSummaryInfo=function(success,fail){httpClient.getSummary($scope.info.shop.id,"","",function(data,status){var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("加载数据失败:"+data.msg);return fail();}success(dataDetail);},function(data,status){fail();});};$timeout(function(){$scope.info.summary={};$ionicScrollDelegate.resize();MMUtils.showLoadingIndicator("正在加载,请稍候...",$scope);$scope.getSummaryInfo(function(dataDetail){$ionicLoading.hide();$scope.info.summary=dataDetail;},function(){$ionicLoading.hide();});});$scope.$on("$ionicView.afterEnter",function(){});$scope.doRefresh=function(){$scope.shopName=$scope.info.shop.name||"首页";$scope.getSummaryInfo(function(dataDetail){$ionicLoading.hide();$scope.$broadcast("scroll.refreshComplete");$scope.info.summary=dataDetail;},function(){$ionicLoading.hide();$scope.$broadcast("scroll.refreshComplete");});};$scope.doShopInfoRefresh=function(){$timeout(function(){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};$scope.shopName=$scope.info.shop.name||"首页";MMShopService.switchDefaultShopNotification({});});};$scope.showUserAction=function(){$ionicActionSheet.show({buttons:[{text:"更改密码"}],destructiveText:"退出登陆",cancelText:"取消",cancel:function(){},buttonClicked:function(index){if(index==0){$state.go("changepassword",null,{reload:true});}return true;},destructiveButtonClicked:function(){$scope.user=localStorageService.get("MMCONSOLE_METADATA_USER");httpClient.logOut($scope.user.phone,function(data,status){localStorageService.set("MMCONSOLE_METADATA_USER",{name:$scope.user.name,phone:$scope.user.phone});$state.go("signin",null,{reload:true});},function(data,status){$state.go("signin",null,{reload:true});});return true;}});};MMShopService.onSwitchDefaultShopNotification($scope,function(){$timeout(function(){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};$scope.doRefresh();});});});angular.module("miaomiao.console.controllers").controller("OrderCtrl",function($scope,$rootScope,$ionicModal,$ionicPopup,$ionicLoading,$state,$timeout,$ionicScrollDelegate,httpClient,localStorageService,MMPushNotification,MMShopService,MMUtils){$scope.info={};$scope.info.orders=[];$scope.info.notification_order_count=1;$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};function transformOrderData(orders){if(!orders){return;}for(var i=0;i<orders.length;i++){var order=orders[i];try{order.items=JSON.parse(order.info);}catch(e){}}}var canLoadMore=false;$scope.moreOrderCanBeLoaded=function(){return canLoadMore;};$scope.getOrdersInfo=function(from,offset,success,fail){httpClient.getMyOrders($scope.info.shop.id,from,offset,function(data,status){var code=data.code,dataDetail=data.data;if(!code==0){MMUtils.showAlert("加载数据失败");canLoadMore=false;return fail();}canLoadMore=false;if(dataDetail.orderls&&dataDetail.orderls.length>0){canLoadMore=true;}success(dataDetail);},function(data,status){MMUtils.showAlert("加载数据失败");canLoadMore=false;return fail();});};function initData(){var from=0,offset=20;MMUtils.showLoadingIndicator("正在加载,请稍候...",$scope);$scope.getOrdersInfo(from,offset,function(dataDetail){$ionicLoading.hide();$scope.info.orders=dataDetail.orderls;transformOrderData($scope.info.orders);},function(){$ionicLoading.hide();});}initData();$scope.addOrders=function(){if(!$scope.info.orders.length){return;}var from=$scope.info.orders.length,offset=20;$scope.getOrdersInfo(from,offset,function(dataDetail){$scope.info.orders=$scope.info.orders.concat(dataDetail.orderls);transformOrderData($scope.info.orders);$scope.$broadcast("scroll.infiniteScrollComplete");},function(){$scope.$broadcast("scroll.infiniteScrollComplete");});};$scope.doRefresh=function(){var from=0,offset=20;$scope.getOrdersInfo(from,offset,function(dataDetail){$scope.$broadcast("scroll.refreshComplete");transformOrderData(dataDetail.orderls);for(var i=0;i<dataDetail.orderls.length;i++){for(var j=0;j<$scope.info.orders.length;j++){if(dataDetail.orderls[i].order_id==$scope.info.orders[j].order_id){dataDetail.orderls[i].read=$scope.info.orders[j].read;}}}$scope.info.orders=dataDetail.orderls;$rootScope.$broadcast("orderScroll.refreshComplete");},function(){$scope.$broadcast("scroll.refreshComplete");$rootScope.$broadcast("orderScroll.refreshComplete");});};$ionicModal.fromTemplateUrl("templates/order-detail.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function(){$scope.modal.remove();};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){});$scope.$on("modal.removed",function(){});$scope.$on("modal.shown",function(){});$scope.callNumber=function(number){window.plugins.CallNumber.callNumber(function(){},function(){},number);};$scope.showOrderDetail=function(order){$scope.order=order;$ionicModal.fromTemplateUrl("templates/order-detail.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;$scope.openModal();});if($scope.order.readed==false){httpClient.orderHasbeenRead($scope.info.shop.id,order.order_id,function(data,status){$scope.order.readed=true;},function(data,status){});}};$scope.$on("$ionicView.afterEnter",function(){});MMShopService.onSwitchDefaultShopNotification($scope,function(){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};initData();});}).controller("orderTabCtrl",function($scope,$timeout,MMPushNotification,$cordovaPush){$scope.info={};$scope.info.notification_order_count=0;MMPushNotification.onNewOrderNotificationReceived($scope,function(message){console.log(message);var data=message.data;$timeout(function(){var count=data&&data.count||0;$scope.info.notification_order_count+=count;});});$scope.$on("orderScroll.refreshComplete",function(){$scope.info.notification_order_count=0;$cordovaPush.setBadgeNumber(0).then(function(result){console.log("Set badge success "+result);},function(err){console.log("Set badge error "+err);});});});angular.module("miaomiao.console.controllers").controller("ProductListCtrl",function($scope,$ionicPopup,$ionicLoading,$ionicModal,$state,$timeout,$ionicScrollDelegate,localStorageService,httpClient,MMShopService,Camera,MMProductService,MMUtils){$scope.info=$scope.info||{};$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};var hasData=false;MMProductService.onSwitchCategoryNotification($scope,function(message){var data=message.data;$scope.selectedIndex=data.index;$scope.category=MMProductService.getCategoryForIndex($scope.selectedIndex);hasData=true;$timeout(function(){$scope.items=$scope.category.itemls;$timeout(function(){$ionicScrollDelegate.resize();$ionicScrollDelegate.$getByHandle("productScroll").scrollTop();},500);});});MMProductService.onRenderDataNotification($scope,function(message){var data=message.data;$timeout(function(){$scope.items=data;$ionicScrollDelegate.resize();});});$scope.moreDataCanBeLoaded=function(){if(!hasData){return false;}return $scope.category&&$scope.category.canLoadMore;};$scope.addItems=function(idx){var idx=$scope.selectedIndex,cateId=$scope.category.category_id,from=$scope.category.scrollIndex,offset=20;MMProductService.setInLoadingMoreFlag(true);httpClient.getMoreProductList($scope.info.shop.id,cateId,from,offset,function(data,status){var code=data.code,dataDetail=data.data;if(!code==0||dataDetail.itemls.length==0){MMProductService.setInLoadingMoreFlag(false);MMProductService.setCanLoadMoreFlagForIndex(idx,false);$scope.$broadcast("scroll.infiniteScrollComplete");$ionicScrollDelegate.$getByHandle("productScroll").resize();return;}MMProductService.setInLoadingMoreFlag(false);MMProductService.addMoreItemsForCategoryId(cateId,dataDetail.itemls);$scope.category=MMProductService.getCategoryForIndex(idx);$timeout(function(){$scope.items=$scope.category.itemls;$scope.$broadcast("scroll.infiniteScrollComplete");$ionicScrollDelegate.resize();});},function(data,status){MMProductService.setInLoadingMoreFlag(false);MMProductService.setCanLoadMoreFlagForIndex(idx,false);$scope.$broadcast("scroll.infiniteScrollComplete");});};$scope.deleteItemFromCurrentCategory=function(item){var currentCategory=$scope.category;if(!currentCategory){return;}var index=currentCategory.itemls.indexOf(item);if(index>-1){$timeout(function(){currentCategory.itemls.splice(index,1);MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);});}};$scope.stickItemFromCurrentCategory=function(item){var currentCategory=$scope.category;if(!currentCategory){return;}var index=currentCategory.itemls.indexOf(item);if(index!=-1){$timeout(function(){currentCategory.itemls.splice(index,1);currentCategory.itemls.unshift(item);MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);});}};$scope.updateItemFromCurrentCategory=function(item){var currentCategory=$scope.category;if(!currentCategory){return;}var index=currentCategory.itemls.indexOf(item);if(index!=-1){$timeout(function(){if(item.new_pic_url&&item.new_pic_url!=item.pic_url){item.pic_url=item.new_pic_url;}currentCategory.itemls.splice(index,1,item);MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);});}};$scope.cancelEdit=function($event){if(window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard){cordova.plugins.Keyboard.close();}$scope.closeModal();};$scope.inputReadyKeyup=function($event){if($event.keyCode==13){$event.target.blur();}};$scope.info.editingItem={};$ionicModal.fromTemplateUrl("templates/product-edit.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function($event){$scope.modal.remove();$timeout(function(){closeKeyboard();});};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){$scope.refreshCurrentCategory();});$scope.EditItem=function(item){$scope.editingItem=item;$scope.editingItem.hasNewPicture=false;$ionicModal.fromTemplateUrl("templates/product-edit.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;$scope.openModal();});};$scope.StickItem=function(item){MMUtils.showLoadingIndicator("正在置顶,请稍候...",$scope);httpClient.stickItem(item.id,item.category_id,$scope.info.shop.id,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("置顶商品失败:"+data.msg);return;}$scope.closeModal();$scope.stickItemFromCurrentCategory(item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("置顶商品失败");$scope.closeModal();});};function closeKeyboard(){if(window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard){cordova.plugins.Keyboard.close();}}function _saveItemInfo(options,item){MMUtils.showLoadingIndicator("正在保存,请稍候...",$scope);httpClient.updateItem(options,$scope.info.shop.id,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("修改商品失败:"+data.msg);return;}$scope.closeModal();$scope.updateItemFromCurrentCategory(item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("修改商品失败");});}$scope.saveItem=function(item,$event){if($event){$event.target.parentElement.focus();}item.price=item.updated_price*100;item.name=item.updated_name;var options={itemName:item.name,itemId:item.id,serialNo:item.serialNo,category_id:item.category_id,count:item.count,score:item.score,price:item.price,saleStatus:item.onsell};if(item.hasNewPicture){MMUtils.showLoadingIndicator("正在上传图片,请稍候...",$scope);httpClient.uploadPicForItem(item.serialNo,item.new_pic_url,$scope.info.shop.id,function(data,status){$ionicLoading.hide();console.log("upload pic success:"+JSON.stringify(data));if(!data||!data.response){MMUtils.showAlert("上传图片失败:"+JSON.stringify(data));return;}console.log("upload pic success :"+JSON.stringify(data.response));if(typeof(data.response)=="string"){data.response=eval("("+data.response+")");}var code=data.response.code,dataDetail=data.response.data;console.log("upload pic success code is:"+code+" ,data :"+JSON.stringify(dataDetail));if(parseInt(code)!=0){MMUtils.showAlert("上传图片失败:"+data.response.msg);return;}options.pic_url=dataDetail.url;_saveItemInfo(options,item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("上传图片失败,请重试");});}else{_saveItemInfo(options,item);}};$scope.deleteItem=function(item){var confirmPopup=$ionicPopup.confirm({title:"删除商品",template:"确定要删除此商品？"});confirmPopup.then(function(res){if(res){MMUtils.showLoadingIndicator("正在删除,请稍候...",$scope);httpClient.deleteItem(item.id,$scope.info.shop.id,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("删除失败:"+data.msg);return;}$scope.closeModal();$scope.deleteItemFromCurrentCategory(item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("删除失败");$scope.closeModal();});}});};function clearCache(){navigator.camera.cleanup();}function onCapturePhoto(fileURI){$scope.editingItem.new_pic_url=fileURI;$scope.editingItem.hasNewPicture=true;}$scope.getPhoto=function(item,$event){$event.stopPropagation();Camera.getPicture().then(onCapturePhoto,function(err){console.err(err);},{quality:25,targetWidth:320,targetHeight:320,destinationType:navigator.camera.DestinationType.FILE_URI,saveToPhotoAlbum:false});};});angular.module("miaomiao.console.controllers").controller("ProductCtrl",function($scope,$ionicPopup,$ionicLoading,$ionicModal,$state,$timeout,$ionicScrollDelegate,localStorageService,httpClient,MMShopService,Camera,MMProductService,MMUtils){$scope.info={};$scope.pageName="商品";$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};function initData(){MMUtils.showLoadingIndicator("正在加载,请稍候...",$scope);httpClient.getProductList($scope.info.shop.id,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(!code==0){MMUtils.showAlert("加载数据失败");return;}MMProductService.initCategorysWithData(dataDetail.categoryls);$scope.info.categorySummary=MMProductService.getCategorySummary();var initIndex=0;$scope.selectedIndex=initIndex;$scope.selectCategory(initIndex);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("加载数据失败");});}initData();$scope.refreshAll=function(){initData();};$scope.selectCategory=function($index,timeout){if(MMProductService.getInLoadingMoreFlag()==true){return;}$scope.selectedIndex=$index;$timeout(function(){MMProductService.switchCategoryNotification({index:$scope.selectedIndex});},timeout||100);};$scope.refreshCurrentCategory=function(){$scope.selectCategory($scope.selectedIndex);};$scope.addProductForCategory=function(cateId,item){$timeout(function(){MMProductService.addProductItemToCategory(cateId,item);for(var idx=0;idx<$scope.info.categorySummary.length;idx++){if(cateId==$scope.info.categorySummary[idx].category_id){$scope.selectCategory(idx);break;}}});};MMShopService.onSwitchDefaultShopNotification($scope,function(){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};initData();});});angular.module("miaomiao.console.controllers").controller("ShopListCtrl",["$scope","$state","$filter","$ionicPopup","$ionicModal","localStorageService","$ionicLoading","httpClient","$ionicScrollDelegate","$timeout",function($scope,$state,$filter,$ionicPopup,$ionicModal,localStorageService,$ionicLoading,httpClient,$ionicScrollDelegate,$timeout){$ionicModal.fromTemplateUrl("templates/shop-list.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.info={};$scope.info.shoplist=localStorageService.get("MMCONSOLE_METADATA_SHOP_LIST")||[];$scope.info.defaultShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||($scope.info.shoplist&&$scope.info.shoplist[0]);$scope.info.shopName=$scope.info.defaultShop.name||"首页";$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function(){$scope.modal.hide();};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){});$scope.$on("modal.removed",function(){});$scope.$on("modal.shown",function(){});$scope.switchDefaultShop=function(shopInfo,$event){$event.stopPropagation();if(shopInfo.id==$scope.info.defaultShop.id){$scope.closeModal();return;}$scope.info.defaultShop=shopInfo;localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",shopInfo);$scope.closeModal();$scope.doShopInfoRefresh();};$scope.ShowShopList=function(){$timeout(function(){$scope.info.shoplist=localStorageService.get("MMCONSOLE_METADATA_SHOP_LIST")||[];$scope.info.defaultShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP");$scope.openModal();});};}]);angular.module("miaomiao.console.controllers").controller("EditShopCtrl",["$scope","$state","$filter","$ionicPopup","$ionicModal","localStorageService","$ionicLoading","httpClient","$ionicScrollDelegate","$timeout","MMShopService","MMUtils",function($scope,$state,$filter,$ionicPopup,$ionicModal,localStorageService,$ionicLoading,httpClient,$ionicScrollDelegate,$timeout,MMShopService,MMUtils){$scope.editingShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP");function _reformatHourMinutes(number){return(parseInt(number)<10?"0":"")+number;}function initData(){$scope.editingShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP");$scope.allHours=[];for(var i=1;i<=24;i++){$scope.allHours.push(i);}$scope.allMinutes=[];for(var i=0;i<60;i++){$scope.allMinutes.push(_reformatHourMinutes(i));}$scope.editingShop.new_base_price=$scope.editingShop.base_price/100;if(!$scope.editingShop.open_time&&!$scope.editingShop.close_time){$scope.editingShop.isFullTimeOpen=true;$scope.editingShop.new_open_time={hours:8,minutes:_reformatHourMinutes(0)};$scope.editingShop.new_close_time={hours:22,minutes:_reformatHourMinutes(0)};}else{var date=new Date($scope.editingShop.open_time);$scope.editingShop.new_open_time={hours:date.getHours(),minutes:_reformatHourMinutes(date.getMinutes())};date=new Date($scope.editingShop.close_time);$scope.editingShop.new_close_time={hours:date.getHours(),minutes:_reformatHourMinutes(date.getMinutes())};}}$scope.cancelEditShop=function(item){$state.go("tab.front-page",null,{reload:false});};$scope.saveShop=function(item){var options={shop_id:$scope.editingShop.id,name:$scope.editingShop.name,tel:$scope.editingShop.tel,shop_address:$scope.editingShop.shop_address,owner_phone:$scope.editingShop.owner_phone,base_price:$scope.editingShop.new_base_price*100,shopInfo:$scope.editingShop.shop_info,status:$scope.editingShop.status};if(item.isFullTimeOpen){options.open_time=null;options.close_time=null;}else{if(item.new_open_time){options.open_time=item.new_open_time.hours+":"+item.new_open_time.minutes;}if(item.new_close_time){options.close_time=item.new_close_time.hours+":"+item.new_close_time.minutes;}}MMUtils.showLoadingIndicator("正在保存,请稍候...",$scope);httpClient.updateShopInfo(options,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("修改店铺失败:"+data.msg);return;}$timeout(function(){$ionicScrollDelegate.resize();$ionicScrollDelegate.scrollTop();localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",dataDetail.shop);var shopList=localStorageService.get("MMCONSOLE_METADATA_SHOP_LIST")||[];for(var i=0;i<shopList.length;i++){if(shopList[i].id==dataDetail.shop.id){shopList[i]=dataDetail.shop;}}localStorageService.set("MMCONSOLE_METADATA_SHOP_LIST",shopList);$state.go("tab.front-page",null,{reload:true});MMShopService.switchDefaultShopNotification({});});},function(data,status){$ionicLoading.hide();MMUtils.showAlert("修改店铺失败");});};$scope.hasTimePickerPlugin=function(){return typeof(datePicker)=="undefined"?false:true;};$scope.showTimePicker=function(item,action){if(action=="open"){var options={date:item.open_time?new Date(item.open_time):new Date(),mode:"time"};datePicker.show(options,function(date){if(!date){return;}var res=new Date(date);$timeout(function(){item.new_open_time={hours:res.getHours(),minutes:_reformatHourMinutes(res.getMinutes())};console.log("get new open time:"+item.new_open_time.hours+":"+item.new_open_time.minutes);});});}else{if(action=="close"){var options={date:item.close_time?new Date(item.close_time):new Date(),mode:"time"};datePicker.show(options,function(date){if(!date){return;}var res=new Date(date);$timeout(function(){item.new_close_time={hours:res.getHours(),minutes:_reformatHourMinutes(res.getMinutes())};console.log("get new close time:"+item.new_close_time.hours+":"+item.new_close_time.minutes);});});}}};$scope.updateShopFullTimeOpen=function(){$timeout(function(){$ionicScrollDelegate.resize();});};$scope.$on("$ionicView.afterEnter",function(){$timeout(function(){initData();});});}]);angular.module("miaomiao.console.controllers").controller("AddProductCtrl",["$scope","$ionicPopup","$ionicModal","httpClient","localStorageService","$timeout","$ionicLoading","Camera","MMUtils",function($scope,$ionicPopup,$ionicModal,httpClient,localStorageService,$timeout,$ionicLoading,Camera,MMUtils){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||[];$scope.hasProductInfo=false;$scope.findItem=function(serialNo,$event){if($event){$event.target.blur();}if(!serialNo){MMUtils.showAlert("请输入条形码");return;}MMUtils.showLoadingIndicator("正在查找商品信息,请稍候...",$scope);httpClient.getItemInfo(serialNo,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("查找商品失败,请手动添加:"+data.msg);}$scope.hasProductInfo=true;var item=dataDetail.product;$timeout(function(){$scope.newitem=item;$scope.newitem.currentCateId=item.category_id;$scope.newitem.saleStatus=1;});},function(data,status){$ionicLoading.hide();$scope.hasProductInfo=true;MMUtils.showAlert("查找商品失败,请手动添加");});};$scope.newitem={};$scope.openQRScaner=function(){cordova.plugins.barcodeScanner.scan(function(result){$timeout(function(){$scope.newitem.serialNo=result.text;$scope.findItem($scope.newitem.serialNo);});},function(error){MMUtils.showAlert("查找商品失败,请手动添加");});};$scope.inputReadyKeyup=function($event){if($event.keyCode==13){$event.target.blur();}};$scope.AddItem=function(){$scope.newitem={};$scope.hasProductInfo=false;$scope.openModal();};$scope.saveItem=function(newitem){if(!newitem.currentCateId){MMUtils.showAlert("请选择商品分类");return;}if(!newitem.name){MMUtils.showAlert("请填写商品名称");return;}if(!newitem.price){MMUtils.showAlert("请填写商品价格");return;}var options={serialNo:newitem.serialNo,name:newitem.name,categoryId:newitem.currentCateId,count:newitem.count,score:newitem.score,price:newitem.price*100,saleStatus:newitem.saleStatus,shop_id:$scope.info.shop.id};function addItemInfo(options,newitem){MMUtils.showLoadingIndicator("正在添加,请稍候...",$scope);httpClient.addItem(options,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("添加商品失败:"+data.msg);return;}var item=dataDetail.item;$scope.closeModal();$scope.addProductForCategory(newitem.currentCateId,item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("添加商品失败");$scope.closeModal();});}if(newitem.hasNewPicture){MMUtils.showLoadingIndicator("正在上传图片,请稍候...",$scope);httpClient.uploadPicForItem(newitem.serialNo,newitem.new_pic_url,$scope.info.shop.id,function(data,status){$ionicLoading.hide();console.log("upload pic success:"+JSON.stringify(data));if(!data||!data.response){MMUtils.showAlert("上传图片失败:"+JSON.stringify(data));return;}if(typeof(data.response)=="string"){data.response=eval("("+data.response+")");}var code=data.response.code,dataDetail=data.response.data;console.log("upload pic success code is:"+code+" ,data :"+JSON.stringify(dataDetail));if(parseInt(code)!=0){MMUtils.showAlert("上传图片失败:"+data.response.msg);return;}options.pic_url=dataDetail.url;addItemInfo(options,newitem);},function(){$ionicLoading.hide();MMUtils.showAlert("上传图片失败,请重试");});}else{addItemInfo(options,newitem);}};$ionicModal.fromTemplateUrl("templates/product-addnew.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function(){$scope.modal.hide();};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){});$scope.$on("modal.removed",function(){});$scope.$on("modal.shown",function(){});function clearCache(){navigator.camera.cleanup();}function onCapturePhoto(fileURI){$scope.newitem.new_pic_url=fileURI;$scope.newitem.hasNewPicture=true;}$scope.getPhoto=function(){Camera.getPicture().then(onCapturePhoto,function(err){console.err(err);},{quality:25,targetWidth:320,destinationType:navigator.camera.DestinationType.FILE_URI,saveToPhotoAlbum:false});};}]);angular.module("miaomiao.console.controllers").controller("SearchCtrl",function($scope,$ionicLoading,$state,$timeout,httpClient,localStorageService,MMUtils,MMProductService){$scope.pageName="搜索商品";$scope.focused="centered";$scope.searchTerm="";$scope.info={};$scope.info.hasNoResults=false;$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};$scope.performSearch=function(key,$event){$event.target.blur();var KEY=key||$scope.info.key;MMUtils.showLoadingIndicator("正在搜索...",$scope);httpClient.getSearchResults($scope.info.shop.id,KEY,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(!code==0||dataDetail.itemls.length==0){$scope.info.searchResultsItems=[];$scope.info.hasNoResults=true;MMProductService.renderDataNotification($scope.info.searchResultsItems);return;}$scope.info.hasNoResults=false;$scope.info.searchResultsItems=dataDetail.itemls;MMProductService.renderDataNotification($scope.info.searchResultsItems);},function(data,status){$ionicLoading.hide();$scope.info.hasNoResults=true;});};$scope.clearSearch=function(){$scope.info.key="";};});