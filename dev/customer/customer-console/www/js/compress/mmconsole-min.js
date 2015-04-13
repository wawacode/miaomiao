angular.module('ionic.services.core', [])

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

})();ionic.Config=ionic.Config||{};ionic.Config.app_id="d7255abe";ionic.Config.api_write_key="d7255abe";angular.module("miaomiao.console",["ngAnimate","ionic","ngCordova","LocalStorageModule","ngStorage","pasvaz.bindonce","QuickList","angular-datepicker","miaomiao.console.controllers","miaomiao.console.services","miaomiao.console.directives","ionic.services.deploy"]).constant("serverInfo",{host:"http://www.mbianli.com",context:"/console/api/"}).config(function($httpProvider,$provide){$httpProvider.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8";var param=function(obj){var query="",name,value,fullSubName,subName,subValue,innerObj,i;for(name in obj){value=obj[name];if(value instanceof Array){for(i=0;i<value.length;++i){subValue=value[i];fullSubName=name+"["+i+"]";innerObj={};innerObj[fullSubName]=subValue;query+=param(innerObj)+"&";}}else{if(value instanceof Object){for(subName in value){subValue=value[subName];fullSubName=name+"["+subName+"]";innerObj={};innerObj[fullSubName]=subValue;query+=param(innerObj)+"&";}}else{if(value!==undefined&&value!==null){query+=encodeURIComponent(name)+"="+encodeURIComponent(value)+"&";}}}}return query.length?query.substr(0,query.length-1):query;};$httpProvider.defaults.transformRequest=[function(data){return angular.isObject(data)&&String(data)!=="[object File]"?param(data):data;}];}).config(function($compileProvider){$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);}).config(function($stateProvider,$urlRouterProvider,$ionicAppProvider,$compileProvider,$ionicConfigProvider){try{$ionicAppProvider.identify({app_id:ionic.Config.app_id});}catch(e){console.error("ionic.Config not set. Make sure config.js is loaded",e);}$compileProvider.debugInfoEnabled(false);$ionicConfigProvider.tabs.position("bottom");$ionicConfigProvider.tabs.style("standard");$stateProvider.state("signin",{url:"/sign-in",templateUrl:"templates/sign-in.html",controller:"SignInCtrl"}).state("forgotpassword",{url:"/forgot-password",templateUrl:"templates/forgot-password.html"}).state("changepassword",{url:"/change-password",templateUrl:"templates/change-password.html",controller:"ChangePwdCtrl"}).state("tab",{url:"/tab","abstract":true,templateUrl:function(){if(ionic.Platform.isAndroid()){return"templates/tabs-android.html";}return"templates/tabs.html";}}).state("tab.front-page",{url:"/front-page",views:{"tab-front-page":{templateUrl:"templates/tab-home.html",controller:"FrontPageCtrl"}}}).state("tab.shop-edit",{url:"/shop-edit",views:{"tab-front-page":{templateUrl:"templates/shop-edit.html",controller:"EditShopCtrl"}}}).state("tab.community-edit",{url:"/community-edit",views:{"tab-front-page":{templateUrl:"templates/community-edit.html",controller:"EditCommunityCtrl"}}}).state("tab.product",{url:"/product",views:{"tab-product":{templateUrl:"templates/tab-product.html",controller:"ProductCtrl"}}}).state("tab.order",{url:"/order",views:{"tab-order":{templateUrl:"templates/tab-order.html",controller:"OrderCtrl"}}}).state("tab.search",{url:"/search",views:{"tab-search":{templateUrl:"templates/tab-search.html",controller:"SearchCtrl"}}});$urlRouterProvider.otherwise("/sign-in");}).run(function($ionicPlatform,$http,$ionicDeploy,localStorageService,httpClient,$state){$ionicPlatform.ready(function(){if(window.StatusBar){StatusBar.styleLightContent();}if(window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard){cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);cordova.plugins.Keyboard.disableScroll(true);}$ionicDeploy.initialize(ionic.Config.app_id);$ionicDeploy.check().then(function(response){console.log("got a response",response);if(response){console.log("downloading updates");$ionicDeploy.download().then(function(){console.log("extracting updates");$ionicDeploy.extract().then(function(){console.log("update extracted, loading");},function(error){console.log("error extracting");},function(progress){console.log("extraction progress",progress);});},function(error){console.log("error downloading");},function(progress){console.log("progress downloading",progress);});}else{console.log("no update, loading");$ionicDeploy.load();}},function(error){console.log("[check for update] error: checking for update");});if(navigator.splashscreen){navigator.splashscreen.hide();}var user=localStorageService.get("MMCONSOLE_METADATA_USER")||{};if(!user||!user.token){return;}httpClient.islogin(user.token,function(data,status){if(navigator.splashscreen){navigator.splashscreen.hide();}var code=data.code,dataDetail=data.data;if(code!=0){console.log("[check for login]check login status failed:"+code);$state.go("signin",null,{reload:true});return;}localStorageService.set("MMCONSOLE_METADATA_SHOP_LIST",dataDetail.shop);localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",dataDetail.shop[0]);$state.go("tab.front-page",null,{reload:true});},function(data,status){if(navigator.splashscreen){navigator.splashscreen.hide();}console.log("[check for login]check login status failed");$state.go("signin",null,{reload:true});});});});angular.module("miaomiao.console.services",[]).factory("MMPushNotification",["$rootScope","httpClient","localStorageService","$cordovaToast","$timeout","MMUtils",function($rootScope,httpClient,localStorageService,$cordovaToast,$timeout,MMUtils){return{subscribe:function(){var token=localStorageService.get("MMCONSOLE_META_PUSH_DEVICE_TOKEN");var user=localStorageService.get("MMCONSOLE_METADATA_USER");if(token&&user&&user.phone){var chn="iOS";if(ionic.Platform.isAndroid()){chn="adr";}httpClient.subscribeForCurrentDevice(user.phone,chn,token,function(){MMUtils.showAlert("注册通知成功，您将会在此应用中收到新订单通知~");},function(){MMUtils.showAlert("注册通知失败，暂不能收到新订单通知，请重新登录~");});}else{MMUtils.showAlert("注册通知失败,条件不满足:token is:"+token+" and phone is:"+user.phone);}},getDeviceToken:function(){return localStorageService.get("MMCONSOLE_META_PUSH_DEVICE_TOKEN");},newOrderNotificationReceived:function(data){console.log("we have see new orders and sent broadcast");$timeout(function(){$rootScope.$broadcast("MMEVENT_NewOrderNotificationReceived",{data:data});});},onNewOrderNotificationReceived:function($scope,handler){console.log("we watch new orders and listening for notifications");$scope.$on("MMEVENT_NewOrderNotificationReceived",function(event,message){handler(message);});}};}]).factory("MMShopService",["$rootScope","httpClient","localStorageService","$timeout",function($rootScope,httpClient,localStorageService,$timeout){return{switchDefaultShopNotification:function(data){$timeout(function(){$rootScope.$broadcast("MMEVENT_switchDefaultShopNotification",{data:data});});},onSwitchDefaultShopNotification:function($scope,handler){$scope.$on("MMEVENT_switchDefaultShopNotification",function(event,message){handler(message);});}};}]).factory("MMProductService",["$rootScope","$timeout",function($rootScope,$timeout){var categorys=[],category_summary=[],inLoadingMoreProcess=false;Array.prototype.unique=function(){var r=new Array();o:for(var i=0,n=this.length;i<n;i++){for(var x=0,y=r.length;x<y;x++){if(r[x]==this[i]){continue o;}}r[r.length]=this[i];}return r;};return{initCategorysWithData:function(cates){var retCategoryls=cates;if(!retCategoryls||!retCategoryls.length){categorys.itemls=[];return;}var retCategorylNames=[];for(var idx=0;idx<retCategoryls.length;idx++){var curCategory=retCategoryls[idx];retCategorylNames.push({name:curCategory.name,category_id:curCategory.category_id});curCategory.selected=0;curCategory.scrollIndex=curCategory.itemls.length;curCategory.canLoadMore=true;curCategory.itemls=this.removeDuplicateItems(curCategory.itemls);}categorys=retCategoryls;category_summary=retCategorylNames;},removeDuplicateItems:function(source){return source.unique();},setCanLoadMoreFlagForIndex:function(index,canLoadMore){categorys[index].canLoadMore=canLoadMore;},getCanLoadMoreFlagForIndex:function(index){return categorys[index].canLoadMore;},setInLoadingMoreFlag:function(inLoading){inLoadingMoreProcess=inLoading;},getInLoadingMoreFlag:function(inLoading){return inLoadingMoreProcess;},getCategorySummary:function(){return category_summary;},getCategoryForIndex:function(index){if(index<0||index>categorys.length-1){return null;}return categorys[index];},setCategoryForIndex:function(index,category){if(index<0||index>categorys.length-1){return;}categorys[index]=category;},addMoreItemsForCategoryId:function(cateId,items){for(var idx=0;idx<categorys.length;idx++){if(cateId==categorys[idx].category_id){var currentCategory=categorys[idx],newitems=currentCategory.itemls.concat(items);currentCategory.itemls=this.removeDuplicateItems(newitems);currentCategory.scrollIndex+=items.length;currentCategory.totalCnt=0;break;}}},addProductItemToCategory:function(cateId,item){for(var idx=0;idx<categorys.length;idx++){if(cateId==categorys[idx].category_id){categorys[idx].itemls.push(item);categorys[idx].itemls=this.removeDuplicateItems(categorys[idx].itemls);break;}}},addProductToCategoryNotification:function(cateId,item){$timeout(function(){$rootScope.$broadcast("MMEVENT_addProductToCategoryNotification",{cateId:cateId,item:item});});},onAddProductToCategoryNotification:function($scope,handler){$scope.$on("MMEVENT_addProductToCategoryNotification",function(event,message){handler(message);});},switchCategoryNotification:function(data){$timeout(function(){$rootScope.$broadcast("MMEVENT_switchCategoryNotification",{data:data});});},onSwitchCategoryNotification:function($scope,handler){$scope.$on("MMEVENT_switchCategoryNotification",function(event,message){handler(message);});},renderDataNotification:function(data){$timeout(function(){$rootScope.$broadcast("MMEVENT_renderDataNotification",{data:data});});},onRenderDataNotification:function($scope,handler){$scope.$on("MMEVENT_renderDataNotification",function(event,message){handler(message);});}};}]).factory("Camera",["$q",function($q){return{getPicture:function(options){var q=$q.defer();navigator.camera.getPicture(function(result){q.resolve(result);},function(err){q.reject(err);},options);return q.promise;}};}]).factory(("ionPlatform"),function($q){var ready=$q.defer();ionic.Platform.ready(function(device){ready.resolve(device);});return{ready:ready.promise};});angular.module("miaomiao.console.services").factory("httpClient",["$http","serverInfo",function($http,serverInfo){var doGet=function(path,params,success,fail){$http({method:"GET",url:serverInfo.host+serverInfo.context+path+"?"+params}).success(function(data,status,headers,config){success(data,status,headers,config);}).error(function(data,status,headers,config){fail(data,status,headers,config);});};var doPost=function(path,params,success,fail){$http.post(serverInfo.host+serverInfo.context+path,params,{headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(data,status,headers,config){success(data,status,headers,config);}).error(function(data,status,headers,config){fail(data,status,headers,config);});};return{islogin:function(token,success,fail){doGet("login/islogin","token="+token,success,fail);},login:function(phone,pwd,success,fail){doPost("login/valid",{phone:phone,pwd:pwd},success,fail);},logOut:function(phone,device_token,loginToken,success,fail){doGet("logout","phone="+phone+"&device_token="+device_token+"&token="+loginToken,success,fail);},changePwd:function(phone,old_pwd,new_pwd,success,fail){doPost("login/change_pwd",{phone:phone,old_pwd:old_pwd,new_pwd:new_pwd},success,fail);},getSummary:function(shopId,beginDate,endDate,success,fail){doGet("order/summary","shop_id="+shopId+"&beginDate="+beginDate+"&endDate="+endDate,success,fail);},getProductList:function(shopId,success,fail){doGet("shop/category/get","shop_id="+shopId,success,fail);},getMoreProductList:function(shopId,cateId,from,offset,success,fail){doGet("shop/getitems","shop_id="+shopId+"&category_id="+cateId+"&from="+from+"&offset="+offset,success,fail);},getMyOrders:function(shopId,from,offset,success,fail){doGet("order/list","shop_id="+shopId+"&from="+from+"&offset="+offset,success,fail);},orderHasbeenRead:function(shopId,order_id,success,fail){doGet("order/read","shop_id="+shopId+"&order_id="+order_id,success,fail);},orderCanbeShipByShop:function(shopId,order_id,success,fail){doGet("order/order_confirm","shop_id="+shopId+"&order_id="+order_id+"&confirm=done",success,fail);},orderCanNotbeShipByShop:function(shopId,order_id,success,fail){doGet("order/order_cancel","shop_id="+shopId+"&order_id="+order_id+"&confirm=done",success,fail);},getMoreMyOrders:function(shopId,from,offset,success,fail){doGet("order/list","shop_id="+shopId+"&from="+from+"&offset="+offset,success,fail);},getSearchResults:function(shopId,key,success,fail){doGet("shopItem/query","shop_id="+shopId+"&query="+key,success,fail);},getItemInfo:function(serialNo,success,fail){doGet("product/get","serialNo="+serialNo,success,fail);},deleteItem:function(itemId,shopId,success,fail){doGet("shopItem/del","itemId="+itemId+"&shop_id="+shopId,success,fail);},stickItem:function(itemId,categoryId,shopId,success,fail){doGet("shopItem/sticky","itemId="+itemId+"&category_id="+categoryId+"&shop_id="+shopId,success,fail);},addItem:function(options,success,fail){doPost("shopItem/addItem",options,success,fail);},updateItem:function(options,shopId,success,fail){options.shop_id=shopId;doPost("shopItem/update",options,success,fail);},uploadPicForItem:function(serialNo,fileURI,shopId,success,fail){var options=new FileUploadOptions();options.fileKey="pic";options.fileName=fileURI.substr(fileURI.lastIndexOf("/")+1);options.mimeType="image/jpeg";options.params={serialNo:serialNo,pic:fileURI,shop_id:shopId};var ft=new FileTransfer();ft.upload(fileURI,encodeURI(serverInfo.host+serverInfo.context+"shopItem/ul_pic"),success,fail,options);},getShopList:function(from,offset,success,fail){doGet("shop/shopList","from="+from+"&offset="+offset,success,fail);},updateShopInfo:function(options,success,fail){doPost("shop/updateShopInfo",options,success,fail);},getShopInfo:function(shop_id,success,fail){doGet("shop","shop_id="+shop_id,success,fail);},getNearShopList:function(lat,lng,success,fail){doGet("near","lat="+lat+"&lng="+lng,success,fail);},subscribeForCurrentDevice:function(ower_phone,chn,device_token,success,fail){doGet("subscribe","ower_phone="+ower_phone+"&chn="+chn+"&device_token="+device_token,success,fail);},getCommunityList:function(shop_id,success,fail){doGet("commy/get_links","shop_id="+shop_id,success,fail);},addCommunity:function(shop_id,c_id,success,fail){doGet("commy/add_link","shop_id="+shop_id+"&c_id="+c_id,success,fail);},deleteCommunity:function(shop_id,c_id,success,fail){doGet("commy/del_link","shop_id="+shop_id+"&c_id="+c_id,success,fail);}};}]);angular.module("miaomiao.console.services").filter("getTotolCount",function(){return function(input){input=input||[];var total=0;for(var item_idx=0;item_idx<input.length;item_idx++){total+=parseInt(input[item_idx].count||0);}return total;};}).filter("getTotolPrice",function(){return function(input){input=input||[];var total=0;for(var item_idx=0;item_idx<input.length;item_idx++){total+=parseFloat(input[item_idx].price||0)*parseInt(input[item_idx].count||0);}return total/100;};}).filter("removeAMPM",function(){return function(text){if(!text){return;}return text.replace(/AM/,"").replace(/PM/,"");};}).filter("getShopStatusString",function(){return function(input){return input==0?"营业中":"打烊了";};}).filter("getShopMinPrice",function(){return function(input){return input?input/100:20;};}).filter("getDisplayShoppingPrice",function(){return function(input){return input?input/100:0;};}).filter("timeAgo",function(){var cache=[];return function(date){if(typeof cache[date]==="string"){return cache[date];}var prettyDate=moment(date,"X").fromNow();cache[date]=prettyDate;return prettyDate;};});angular.module("miaomiao.console.services").factory("MMUtils",["$timeout","$ionicLoading","$ionicPopup",function($timeout,$ionicLoading,$ionicPopup){return{isEmptyObject:function(obj){if(obj==null){return true;}if(obj.length>0){return false;}if(obj.length===0){return true;}for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){return false;}}return true;},isValidTelNumber:function(number){var regPhone=/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;var regMobile=/^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;return regPhone.test(number)||regMobile.test(number);},showLoadingIndicator:function(message,scope,tmpUrl){scope.LoadingMessage=message;$ionicLoading.show({templateUrl:tmpUrl||"templates/loadingIndicator.html",scope:scope});},showAlert:function(message,tmpUrl){$ionicPopup.alert({title:message,template:tmpUrl||""});}};}]);angular.module("miaomiao.console.directives",[]).directive("backImg",function(){return function(scope,element,attrs){var url=attrs.backImg;element.css({"background-image":"url("+url+")","background-size":"contain"});};}).directive("ngTimeSelector",function(){return{restrict:"EA",templateUrl:"templates/timepicker.html",scope:{hours:"=",minutes:"="},replace:true,link:function(scope,elem,attr){scope.period="上午";scope.increaseHours=function(){if(scope.hours<23){scope.hours=++scope.hours;}else{scope.hours=0;}};scope.decreaseHours=function(){scope.hours=scope.hours<=0?23:--scope.hours;};scope.increaseMinutes=function(){if(scope.minutes>=59){scope.minutes=0;}else{scope.minutes++;}};scope.decreaseMinutes=function(){if(scope.minutes<=0){scope.minutes=59;}else{scope.minutes=--scope.minutes;}};scope.displayHours=function(){var hoursToDisplay=scope.hours;if(scope.hours>12){hoursToDisplay=scope.hours-12;}if(hoursToDisplay==0){hoursToDisplay=12;}else{if(hoursToDisplay<=9){hoursToDisplay="0"+hoursToDisplay;}}return hoursToDisplay;};scope.displayMinutes=function(){return scope.minutes<=9?"0"+scope.minutes:scope.minutes;};scope.switchPeriod=function(){scope.hours=scope.hours>=12?scope.hours-12:scope.hours+12;};}};});angular.module("miaomiao.console.controllers",[]).controller("MainCtrl",function($scope,$state,$window,$cordovaPush,$timeout,$cordovaDialogs,$cordovaMedia,$cordovaToast,ionPlatform,$http,httpClient,localStorageService,MMPushNotification){$scope.open=function(url){var params="location=no,enableViewportScale=yes,toolbarposition=top,closebuttoncaption=Done";var iab=window.open(url,"_blank",params);iab.addEventListener("exit",function(){iab.removeEventListener("exit",argument.callee);iab.close();iab=null;});};var halfHeight=null;$scope.getHalfHeight=function(){if(ionic.Platform.isAndroid()){return 0;}if(!halfHeight){halfHeight=(document.documentElement.clientHeight/2)-200;}return halfHeight;};$scope.notifications=[];$scope.registerToken=undefined;ionPlatform.ready.then(function(device){$scope.register();});var onNotification=$window.onNotification=window.onNotification=function onNotification(notification){console.log(JSON.stringify(notification));if(ionic.Platform.isAndroid()){handleAndroid(notification);}else{if(ionic.Platform.isIOS()){handleIOS(notification);$scope.$apply(function(){$scope.notifications.push(JSON.stringify(notification.alert));});}}};$scope.register=function(){var config={};if(ionic.Platform.isAndroid()){config={senderID:"miaomiao-bconsole",ecb:"onNotification"};}else{if(ionic.Platform.isIOS()){config={badge:"true",sound:"true",alert:"true",ecb:"onNotification"};}else{return;}}$cordovaPush.register(config).then(function(result){console.log("Register success "+result);$scope.registerDisabled=true;$scope.registerToken=result;if(result!=null){localStorageService.set("MMCONSOLE_META_PUSH_DEVICE_TOKEN",result);MMPushNotification.subscribe();}},function(err){console.log("Register error "+err);});};function handleAndroid(notification){console.log("handle Android : In foreground "+notification.foreground+" Coldstart "+notification.coldstart);if(notification.event=="registered"){$scope.regId=notification.regid;localStorageService.set("MMCONSOLE_META_PUSH_DEVICE_TOKEN",notification.regid);MMPushNotification.subscribe();}else{if(notification.event=="message"){var title="喵喵商家推送",text="您有新的订单，请到我的订单下查看";if(notification.payload&&notification.payload.body&&notification.payload.body.body){text=notification.payload.body.body.text;title=notification.payload.body.body.title;}$cordovaDialogs.alert(text,title).then(function(){$state.go("tab.order",null,{reload:true});$timeout(function(){MMPushNotification.newOrderNotificationReceived({count:1});},100);});$scope.$apply(function(){$scope.notifications.push(JSON.stringify(notification.message));});}else{if(notification.event=="error"){$cordovaDialogs.alert(notification.msg,"Push notification error event");}else{$cordovaDialogs.alert(notification.event,"Push notification handler - Unprocessed Event");}}}}function handleIOS(notification){console.log("handle iOS : In foreground "+notification.foreground+" Coldstart "+notification.coldstart);console.log("handle iOS: the notification is:"+JSON.stringify(notification));var inappHanlder=function(){$state.go("tab.order",null,{reload:true});$timeout(function(){MMPushNotification.newOrderNotificationReceived({count:1});},100);};if(notification.foreground=="1"){if(notification.body&&notification.messageFrom){console.log("the notification body is:"+notification.body);$cordovaDialogs.alert(notification.body,notification.messageFrom).then(function(){inappHanlder();});}else{console.log("the notification body alert:"+notification.alert);$cordovaDialogs.alert(notification.alert,"喵喵商家推送","确定").then(function(){inappHanlder();});}if(notification.badge){console.log("we are in foreground badge");$cordovaPush.setBadgeNumber(notification.badge).then(function(result){console.log("Set badge success "+result);},function(err){console.log("Set badge error "+err);});}if(notification.sound){console.log("we are in foreground and have sound");var mediaSrc=$cordovaMedia.newMedia(notification.sound);mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));}}else{console.log("we are in background");if(notification.body&&notification.messageFrom){console.log("we are in background body");$cordovaDialogs.alert(notification.body,notification.messageFrom).then(function(){inappHanlder();});}else{console.log("we are in background alert");$cordovaDialogs.alert(notification.alert,"喵喵商家推送").then(function(){inappHanlder();});}if(notification.badge){console.log("we are in background mode");$cordovaPush.setBadgeNumber(notification.badge).then(function(result){console.log("Set badge success "+result);},function(err){console.log("Set badge error "+err);});}}}$scope.unregister=function(){console.log("Unregister called");$scope.registerDisabled=false;$cordovaPush.unregister({}).then(function(result){console.log("Unregister success "+result);},function(err){console.log("Unregister error "+err);});};});angular.module("miaomiao.console.controllers").controller("SignInCtrl",function($scope,$ionicLoading,$compile,$ionicPopup,$timeout,$ionicScrollDelegate,$http,$state,localStorageService,httpClient,MMUtils,MMPushNotification,MMShopService){$scope.user=localStorageService.get("MMCONSOLE_METADATA_USER")||{};$scope.signIn=function(user){if(!$scope.user.password||!$scope.user.name){MMUtils.showAlert("请输入用户名和密码");return;}if(!MMUtils.isValidTelNumber($scope.user.phone)){MMUtils.showAlert("电话号码格式不正确");return;}MMUtils.showLoadingIndicator("正在登陆,请稍候...",$scope);httpClient.login($scope.user.phone,$scope.user.password,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("登陆失败:"+data.msg);return;}localStorageService.set("MMCONSOLE_METADATA_USER",{name:$scope.user.name,phone:$scope.user.phone,identity:$scope.user.phone,token:dataDetail.token});localStorageService.set("MMCONSOLE_METADATA_SHOP_LIST",dataDetail.shop);localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",dataDetail.shop[0]);MMPushNotification.subscribe();MMShopService.switchDefaultShopNotification();$state.go("tab.front-page",null,{reload:true});},function(data,status){$ionicLoading.hide();MMUtils.showAlert("登陆失败");});};});angular.module("miaomiao.console.controllers").controller("ChangePwdCtrl",function($scope,$ionicLoading,$compile,$ionicPopup,$timeout,$ionicScrollDelegate,$http,$state,localStorageService,httpClient,MMUtils,MMPushNotification){$scope.user=localStorageService.get("MMCONSOLE_METADATA_USER")||{};$scope.changepwd=function(user){if(!$scope.user.old_password||!$scope.user.new_password||!$scope.user.new_password_confirm){MMUtils.showAlert("密码输入不能为空");return;}if($scope.user.old_password==$scope.user.new_password){MMUtils.showAlert("新密码不能与旧密码相同");return;}if($scope.user.new_password!=$scope.user.new_password_confirm){MMUtils.showAlert("新密码两次输入不一致");return;}MMUtils.showLoadingIndicator("正在修改密码,请稍候...",$scope);httpClient.changePwd($scope.user.phone,$scope.user.old_password,$scope.user.new_password,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("修改密码失败:"+data.msg);return;}$state.go("signin",null,{reload:true});},function(data,status){$ionicLoading.hide();MMUtils.showAlert("修改密码失败");});};});angular.module("miaomiao.console.controllers").controller("FrontPageCtrl",function($scope,$ionicLoading,$ionicActionSheet,$ionicPopup,$state,$timeout,localStorageService,$ionicScrollDelegate,httpClient,MMPushNotification,MMShopService,MMUtils){$scope.info={};$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};$scope.shopName=$scope.info.shop.name||"首页";$scope.getSummaryInfo=function(success,fail){httpClient.getSummary($scope.info.shop.id,"","",function(data,status){var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("加载数据失败:"+data.msg);return fail();}success(dataDetail);},function(data,status){fail();});};$timeout(function(){$scope.info.summary={};$ionicScrollDelegate.resize();MMUtils.showLoadingIndicator("正在加载,请稍候...",$scope);$scope.getSummaryInfo(function(dataDetail){$ionicLoading.hide();$scope.info.summary=dataDetail;},function(){$ionicLoading.hide();});});$scope.$on("$ionicView.afterEnter",function(){});$scope.doRefresh=function(){$scope.shopName=$scope.info.shop.name||"首页";$scope.getSummaryInfo(function(dataDetail){$ionicLoading.hide();$scope.$broadcast("scroll.refreshComplete");$scope.info.summary=dataDetail;},function(){$ionicLoading.hide();$scope.$broadcast("scroll.refreshComplete");});};$scope.doShopInfoRefresh=function(){$timeout(function(){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};$scope.shopName=$scope.info.shop.name||"首页";MMShopService.switchDefaultShopNotification({});});};$scope.showUserAction=function(){$ionicActionSheet.show({buttons:[{text:"更改密码"}],destructiveText:"退出登陆",cancelText:"取消",cancel:function(){},buttonClicked:function(index){if(index==0){$state.go("changepassword",null,{reload:true});}return true;},destructiveButtonClicked:function(){$scope.user=localStorageService.get("MMCONSOLE_METADATA_USER");var userPhone=$scope.user.phone,deviceToken=MMPushNotification.getDeviceToken(),loginToken=$scope.user.token;httpClient.logOut(userPhone,deviceToken,loginToken,function(data,status){localStorageService.set("MMCONSOLE_METADATA_USER",{name:$scope.user.name,phone:$scope.user.phone});$state.go("signin",null,{reload:true});},function(data,status){$state.go("signin",null,{reload:true});});return true;}});};MMShopService.onSwitchDefaultShopNotification($scope,function(){$timeout(function(){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};$scope.doRefresh();});});});angular.module("miaomiao.console.controllers").controller("OrderCtrl",function($scope,$rootScope,$ionicModal,$ionicPopup,$ionicLoading,$state,$timeout,$ionicScrollDelegate,httpClient,localStorageService,MMPushNotification,MMShopService,MMUtils){$scope.info={};$scope.info.orders=[];$scope.info.notification_order_count=1;$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};function transformOrderData(orders){if(!orders){return;}for(var i=0;i<orders.length;i++){var order=orders[i];try{order.items=JSON.parse(order.info);}catch(e){}}}var canLoadMore=false;$scope.moreOrderCanBeLoaded=function(){return canLoadMore;};$scope.getOrdersInfo=function(from,offset,success,fail){httpClient.getMyOrders($scope.info.shop.id,from,offset,function(data,status){var code=data.code,dataDetail=data.data;if(!code==0){MMUtils.showAlert("加载数据失败");canLoadMore=false;return fail();}canLoadMore=false;if(dataDetail.orderls&&dataDetail.orderls.length>0){canLoadMore=true;}success(dataDetail);},function(data,status){MMUtils.showAlert("加载数据失败");if(!localStorageService.get("MMCONSOLE_METADATA_USER")){$state.go("signin",null,{reload:true});}canLoadMore=false;return fail();});};function initData(){var from=0,offset=20;MMUtils.showLoadingIndicator("正在加载,请稍候...",$scope);$scope.getOrdersInfo(from,offset,function(dataDetail){$ionicLoading.hide();$scope.info.orders=dataDetail.orderls;transformOrderData($scope.info.orders);},function(){$ionicLoading.hide();});}initData();$scope.addOrders=function(){if(!$scope.info.orders.length){return;}var from=$scope.info.orders.length,offset=20;$scope.getOrdersInfo(from,offset,function(dataDetail){$scope.info.orders=$scope.info.orders.concat(dataDetail.orderls);transformOrderData($scope.info.orders);$scope.$broadcast("scroll.infiniteScrollComplete");},function(){$scope.$broadcast("scroll.infiniteScrollComplete");});};$scope.doRefresh=function(){var from=0,offset=20;$scope.getOrdersInfo(from,offset,function(dataDetail){$scope.$broadcast("scroll.refreshComplete");transformOrderData(dataDetail.orderls);for(var i=0;i<dataDetail.orderls.length;i++){for(var j=0;j<$scope.info.orders.length;j++){if(dataDetail.orderls[i].order_id==$scope.info.orders[j].order_id){dataDetail.orderls[i].read=$scope.info.orders[j].read;}}}$scope.info.orders=dataDetail.orderls;$rootScope.$broadcast("orderScroll.refreshComplete");},function(){$scope.$broadcast("scroll.refreshComplete");$rootScope.$broadcast("orderScroll.refreshComplete");});};$ionicModal.fromTemplateUrl("templates/order-detail.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function(){$scope.modal.remove();};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){});$scope.$on("modal.removed",function(){});$scope.$on("modal.shown",function(){});$scope.callNumber=function(number){window.plugins.CallNumber.callNumber(function(){},function(){},number);};$scope.confirmShip=function(order){httpClient.orderCanbeShipByShop($scope.info.shop.id,order.order_id,function(data,status){var code=data.code,dataDetail=data.data;if(!code==0){MMUtils.showAlert("确认配送失败");}MMUtils.showAlert("客户已经收到您的消息，请您及时配送");},function(data,status){MMUtils.showAlert("确认配送失败");});};$scope.cannotShip=function(order){var confirmPopup=$ionicPopup.confirm({title:"无法配送",template:"您确定无法配送此单？您需要跟客户电话联系"});confirmPopup.then(function(res){if(res){window.plugins.CallNumber.callNumber(function(){httpClient.orderCanNotbeShipByShop($scope.info.shop.id,order.order_id,function(data,status){var code=data.code,dataDetail=data.data;if(!code==0){MMUtils.showAlert("取消配送失败, 请联系客服");}MMUtils.showAlert("取消配送成功");},function(data,status){MMUtils.showAlert("取消配送失败, 请联系客服");});},function(){MMUtils.showAlert("您没有拨打电话，不能为您取消配送，如有疑问请联系客服");},order.phone);}});};$scope.showOrderDetail=function(order){$scope.order=order;$ionicModal.fromTemplateUrl("templates/order-detail.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;$scope.openModal();});if($scope.order.readed==false){httpClient.orderHasbeenRead($scope.info.shop.id,order.order_id,function(data,status){$scope.order.readed=true;},function(data,status){});}};$scope.$on("$ionicView.afterEnter",function(){});MMShopService.onSwitchDefaultShopNotification($scope,function(){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};initData();});}).controller("orderTabCtrl",function($scope,$timeout,MMPushNotification,$cordovaPush){$scope.info={};$scope.info.notification_order_count=0;MMPushNotification.onNewOrderNotificationReceived($scope,function(message){console.log(message);var data=message.data;$timeout(function(){var count=data&&data.count||0;$scope.info.notification_order_count+=count;});});$scope.$on("orderScroll.refreshComplete",function(){$scope.info.notification_order_count=0;$cordovaPush.setBadgeNumber(0).then(function(result){console.log("Set badge success "+result);},function(err){console.log("Set badge error "+err);});});});angular.module("miaomiao.console.controllers").controller("ProductListCtrl",function($scope,$ionicPopup,$ionicLoading,$ionicModal,$state,$timeout,$ionicScrollDelegate,localStorageService,httpClient,MMShopService,Camera,MMProductService,MMUtils){$scope.info=$scope.info||{};$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};var hasData=false;MMProductService.onSwitchCategoryNotification($scope,function(message){var data=message.data;$scope.selectedIndex=data.index;$scope.category=MMProductService.getCategoryForIndex($scope.selectedIndex);hasData=true;$timeout(function(){$scope.items=$scope.category.itemls;$timeout(function(){$ionicScrollDelegate.resize();$ionicScrollDelegate.$getByHandle("productScroll").scrollTop();},500);});});MMProductService.onRenderDataNotification($scope,function(message){var data=message.data;$timeout(function(){$scope.items=data;$ionicScrollDelegate.resize();});});$scope.moreDataCanBeLoaded=function(){if(!hasData){return false;}return $scope.category&&$scope.category.canLoadMore;};$scope.addItems=function(idx){var idx=$scope.selectedIndex,cateId=$scope.category.category_id,from=$scope.category.scrollIndex,offset=20;MMProductService.setInLoadingMoreFlag(true);httpClient.getMoreProductList($scope.info.shop.id,cateId,from,offset,function(data,status){var code=data.code,dataDetail=data.data;if(!code==0||dataDetail.itemls.length==0){MMProductService.setInLoadingMoreFlag(false);MMProductService.setCanLoadMoreFlagForIndex(idx,false);$scope.$broadcast("scroll.infiniteScrollComplete");$ionicScrollDelegate.$getByHandle("productScroll").resize();return;}MMProductService.setInLoadingMoreFlag(false);MMProductService.addMoreItemsForCategoryId(cateId,dataDetail.itemls);$scope.category=MMProductService.getCategoryForIndex(idx);$timeout(function(){$scope.items=$scope.category.itemls;$scope.$broadcast("scroll.infiniteScrollComplete");$ionicScrollDelegate.resize();});},function(data,status){MMProductService.setInLoadingMoreFlag(false);MMProductService.setCanLoadMoreFlagForIndex(idx,false);$scope.$broadcast("scroll.infiniteScrollComplete");});};$scope.deleteItemFromCurrentCategory=function(item){var currentCategory=$scope.category;if(!currentCategory){return;}var index=currentCategory.itemls.indexOf(item);if(index>-1){$timeout(function(){currentCategory.itemls.splice(index,1);MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);});}};$scope.stickItemFromCurrentCategory=function(item){var currentCategory=$scope.category;if(!currentCategory){return;}var index=currentCategory.itemls.indexOf(item);if(index!=-1){$timeout(function(){currentCategory.itemls.splice(index,1);currentCategory.itemls.unshift(item);MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);});}};$scope.updateItemFromCurrentCategory=function(item){var currentCategory=$scope.category;if(!currentCategory){return;}var index=currentCategory.itemls.indexOf(item);if(index!=-1){$timeout(function(){if(item.new_pic_url&&item.new_pic_url!=item.pic_url){item.pic_url=item.new_pic_url;}currentCategory.itemls.splice(index,1,item);MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);});}};$scope.cancelEdit=function($event){if(window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard){cordova.plugins.Keyboard.close();}$scope.closeModal();};$scope.inputReadyKeyup=function($event){if($event.keyCode==13){$event.target.blur();}};$scope.info.editingItem={};$ionicModal.fromTemplateUrl("templates/product-edit.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function($event){$scope.modal.remove();$timeout(function(){closeKeyboard();});};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){$scope.refreshCurrentCategory();});$scope.EditItem=function(item){$scope.editingItem=item;$scope.editingItem.hasNewPicture=false;$ionicModal.fromTemplateUrl("templates/product-edit.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;$scope.openModal();});};$scope.StickItem=function(item){MMUtils.showLoadingIndicator("正在置顶,请稍候...",$scope);httpClient.stickItem(item.id,item.category_id,$scope.info.shop.id,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("置顶商品失败:"+data.msg);return;}$scope.closeModal();$scope.stickItemFromCurrentCategory(item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("置顶商品失败");$scope.closeModal();});};function closeKeyboard(){if(window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard){cordova.plugins.Keyboard.close();}}function _saveItemInfo(options,item){MMUtils.showLoadingIndicator("正在保存,请稍候...",$scope);httpClient.updateItem(options,$scope.info.shop.id,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("修改商品失败:"+data.msg);return;}$scope.closeModal();$scope.updateItemFromCurrentCategory(item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("修改商品失败");});}$scope.saveItem=function(item,$event){if($event){$event.target.parentElement.focus();}var options={itemName:item.updated_name,itemId:item.id,serialNo:item.serialNo,category_id:item.category_id,count:item.count,score:item.score,price:item.updated_price*100,saleStatus:item.onsell};if(item.hasNewPicture){MMUtils.showLoadingIndicator("正在上传图片,请稍候...",$scope);httpClient.uploadPicForItem(item.serialNo,item.new_pic_url,$scope.info.shop.id,function(data,status){$ionicLoading.hide();console.log("upload pic success:"+JSON.stringify(data));if(!data||!data.response){MMUtils.showAlert("上传图片失败:"+JSON.stringify(data));return;}console.log("upload pic success :"+JSON.stringify(data.response));if(typeof(data.response)=="string"){data.response=eval("("+data.response+")");}var code=data.response.code,dataDetail=data.response.data;console.log("upload pic success code is:"+code+" ,data :"+JSON.stringify(dataDetail));if(parseInt(code)!=0){MMUtils.showAlert("上传图片失败:"+data.response.msg);return;}options.pic_url=dataDetail.url;_saveItemInfo(options,item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("上传图片失败,请重试");});}else{_saveItemInfo(options,item);}};$scope.deleteItem=function(item){var confirmPopup=$ionicPopup.confirm({title:"删除商品",template:"确定要删除此商品？"});confirmPopup.then(function(res){if(res){MMUtils.showLoadingIndicator("正在删除,请稍候...",$scope);httpClient.deleteItem(item.id,$scope.info.shop.id,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("删除失败:"+data.msg);return;}$scope.closeModal();$scope.deleteItemFromCurrentCategory(item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("删除失败");$scope.closeModal();});}});};function clearCache(){navigator.camera.cleanup();}function onCapturePhoto(fileURI){$scope.editingItem.new_pic_url=fileURI;$scope.editingItem.hasNewPicture=true;}$scope.getPhoto=function(item,$event){$event.stopPropagation();Camera.getPicture().then(onCapturePhoto,function(err){console.err(err);},{quality:25,targetWidth:320,targetHeight:320,destinationType:navigator.camera.DestinationType.FILE_URI,saveToPhotoAlbum:false});};});angular.module("miaomiao.console.controllers").controller("ProductCtrl",function($scope,$ionicPopup,$ionicLoading,$ionicModal,$state,$timeout,$ionicScrollDelegate,localStorageService,httpClient,MMShopService,Camera,MMProductService,MMUtils){$scope.info={};$scope.pageName="商品";$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};function initData(){MMUtils.showLoadingIndicator("正在加载,请稍候...",$scope);httpClient.getProductList($scope.info.shop.id,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(!code==0){MMUtils.showAlert("加载数据失败");return;}MMProductService.initCategorysWithData(dataDetail.categoryls);$scope.info.categorySummary=MMProductService.getCategorySummary();var initIndex=0;$scope.selectedIndex=initIndex;$scope.selectCategory(initIndex);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("加载数据失败");});}initData();$scope.refreshAll=function(){initData();};$scope.selectCategory=function($index,timeout){if(MMProductService.getInLoadingMoreFlag()==true){return;}$scope.selectedIndex=$index;$timeout(function(){MMProductService.switchCategoryNotification({index:$scope.selectedIndex});},timeout||100);};$scope.refreshCurrentCategory=function(){$scope.selectCategory($scope.selectedIndex);};$scope.addProductForCategory=function(cateId,item){$timeout(function(){MMProductService.addProductItemToCategory(cateId,item);for(var idx=0;idx<$scope.info.categorySummary.length;idx++){if(cateId==$scope.info.categorySummary[idx].category_id){$scope.selectCategory(idx);break;}}});};MMShopService.onSwitchDefaultShopNotification($scope,function(){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};initData();});});angular.module("miaomiao.console.controllers").controller("ShopListCtrl",["$scope","$state","$filter","$ionicPopup","$ionicModal","localStorageService","$ionicLoading","httpClient","$ionicScrollDelegate","$timeout",function($scope,$state,$filter,$ionicPopup,$ionicModal,localStorageService,$ionicLoading,httpClient,$ionicScrollDelegate,$timeout){$ionicModal.fromTemplateUrl("templates/shop-list.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.info={};$scope.info.shoplist=localStorageService.get("MMCONSOLE_METADATA_SHOP_LIST")||[];$scope.info.defaultShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||($scope.info.shoplist&&$scope.info.shoplist[0]);$scope.info.shopName=$scope.info.defaultShop.name||"首页";$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function(){$scope.modal.hide();};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){});$scope.$on("modal.removed",function(){});$scope.$on("modal.shown",function(){});$scope.switchDefaultShop=function(shopInfo,$event){$event.stopPropagation();if(shopInfo.id==$scope.info.defaultShop.id){$scope.closeModal();return;}$scope.info.defaultShop=shopInfo;localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",shopInfo);$scope.closeModal();$scope.doShopInfoRefresh();};$scope.ShowShopList=function(){$timeout(function(){$scope.info.shoplist=localStorageService.get("MMCONSOLE_METADATA_SHOP_LIST")||[];$scope.info.defaultShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP");$scope.openModal();});};}]);angular.module("miaomiao.console.controllers").controller("EditShopCtrl",["$scope","$state","$filter","$ionicPopup","$ionicModal","localStorageService","$ionicLoading","httpClient","$ionicScrollDelegate","$timeout","MMShopService","MMUtils",function($scope,$state,$filter,$ionicPopup,$ionicModal,localStorageService,$ionicLoading,httpClient,$ionicScrollDelegate,$timeout,MMShopService,MMUtils){$scope.editingShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP");function _reformatHourMinutes(number){return(parseInt(number)<10?"0":"")+number;}function initData(){$scope.editingShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP");$scope.allHours=[];for(var i=1;i<=24;i++){$scope.allHours.push(i);}$scope.allMinutes=[];for(var i=0;i<60;i++){$scope.allMinutes.push(_reformatHourMinutes(i));}$scope.editingShop.new_base_price=$scope.editingShop.base_price/100;if(!$scope.editingShop.open_time&&!$scope.editingShop.close_time){$scope.editingShop.isFullTimeOpen=true;$scope.editingShop.new_open_time={hours:8,minutes:_reformatHourMinutes(0)};$scope.editingShop.new_close_time={hours:22,minutes:_reformatHourMinutes(0)};}else{var date=new Date($scope.editingShop.open_time);$scope.editingShop.new_open_time={hours:date.getHours(),minutes:_reformatHourMinutes(date.getMinutes())};date=new Date($scope.editingShop.close_time);$scope.editingShop.new_close_time={hours:date.getHours(),minutes:_reformatHourMinutes(date.getMinutes())};}}$scope.cancelEditShop=function(item){$state.go("tab.front-page",null,{reload:false});};$scope.saveShop=function(item){var options={shop_id:$scope.editingShop.id,name:$scope.editingShop.name,tel:$scope.editingShop.tel,shop_address:$scope.editingShop.shop_address,owner_phone:$scope.editingShop.owner_phone,base_price:$scope.editingShop.new_base_price*100,shopInfo:$scope.editingShop.shop_info,status:$scope.editingShop.status};if(item.isFullTimeOpen){options.open_time=null;options.close_time=null;}else{if(item.new_open_time){options.open_time=item.new_open_time.hours+":"+item.new_open_time.minutes;}if(item.new_close_time){options.close_time=item.new_close_time.hours+":"+item.new_close_time.minutes;}}MMUtils.showLoadingIndicator("正在保存,请稍候...",$scope);httpClient.updateShopInfo(options,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("修改店铺失败:"+data.msg);return;}$timeout(function(){$ionicScrollDelegate.resize();$ionicScrollDelegate.scrollTop();localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",dataDetail.shop);var shopList=localStorageService.get("MMCONSOLE_METADATA_SHOP_LIST")||[];for(var i=0;i<shopList.length;i++){if(shopList[i].id==dataDetail.shop.id){shopList[i]=dataDetail.shop;}}localStorageService.set("MMCONSOLE_METADATA_SHOP_LIST",shopList);$state.go("tab.front-page",null,{reload:true});MMShopService.switchDefaultShopNotification({});});},function(data,status){$ionicLoading.hide();MMUtils.showAlert("修改店铺失败");});};$scope.hasTimePickerPlugin=function(){return typeof(datePicker)=="undefined"?false:true;};$scope.showTimePicker=function(item,action){if(action=="open"){var options={date:item.open_time?new Date(item.open_time):new Date(),mode:"time"};datePicker.show(options,function(date){if(!date){return;}var res=new Date(date);$timeout(function(){item.new_open_time={hours:res.getHours(),minutes:_reformatHourMinutes(res.getMinutes())};console.log("get new open time:"+item.new_open_time.hours+":"+item.new_open_time.minutes);});});}else{if(action=="close"){var options={date:item.close_time?new Date(item.close_time):new Date(),mode:"time"};datePicker.show(options,function(date){if(!date){return;}var res=new Date(date);$timeout(function(){item.new_close_time={hours:res.getHours(),minutes:_reformatHourMinutes(res.getMinutes())};console.log("get new close time:"+item.new_close_time.hours+":"+item.new_close_time.minutes);});});}}};$scope.updateShopFullTimeOpen=function(){$timeout(function(){$ionicScrollDelegate.resize();});};$scope.$on("$ionicView.afterEnter",function(){$timeout(function(){initData();});});}]);angular.module("miaomiao.console.controllers").controller("AddProductCtrl",["$scope","$ionicPopup","$ionicModal","httpClient","localStorageService","$timeout","$ionicLoading","Camera","MMUtils",function($scope,$ionicPopup,$ionicModal,httpClient,localStorageService,$timeout,$ionicLoading,Camera,MMUtils){$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||[];$scope.info.hasProductInfo=false;$scope.info.newitem={};$scope.findItem=function(serialNo,$event){if($event){$event.target.blur();}if(!serialNo){MMUtils.showAlert("请输入条形码");return;}MMUtils.showLoadingIndicator("正在查找商品信息,请稍候...",$scope);httpClient.getItemInfo(serialNo,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("查找商品失败,请手动添加:"+data.msg);}$scope.info.hasProductInfo=true;var item=dataDetail.product;$timeout(function(){$scope.info.newitem=item;$scope.info.newitem.currentCateId=item.category_id;$scope.info.newitem.saleStatus=1;$scope.info.newitem.new_pic_url=item.pic_url;$scope.info.newitem.pic_url=item.pic_url;$scope.info.newitem.price=item.price/100;});},function(data,status){$ionicLoading.hide();$scope.info.hasProductInfo=true;MMUtils.showAlert("查找商品失败,请手动添加");});};$scope.openQRScaner=function(){cordova.plugins.barcodeScanner.scan(function(result){$timeout(function(){$scope.info.newitem.serialNo=result.text;$scope.findItem($scope.info.newitem.serialNo);});},function(error){MMUtils.showAlert("查找商品失败,请手动添加");});};$scope.inputReadyKeyup=function($event){if($event.keyCode==13){$event.target.blur();}};$scope.AddItem=function(){$scope.info.newitem={};$scope.info.hasProductInfo=false;$ionicModal.fromTemplateUrl("templates/product-addnew.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;$scope.openModal();});};$scope.saveItem=function(){var newitem=$scope.info.newitem;if(!newitem.currentCateId){MMUtils.showAlert("请选择商品分类");return;}if(!newitem.name){MMUtils.showAlert("请填写商品名称");return;}if(!newitem.price){MMUtils.showAlert("请填写商品价格");return;}var options={serialNo:newitem.serialNo,name:newitem.name,categoryId:newitem.currentCateId,count:newitem.count,score:newitem.score,price:newitem.price*100,saleStatus:newitem.saleStatus,pic_url:newitem.pic_url||"",shop_id:$scope.info.shop.id};function addItemInfo(options,newitem){MMUtils.showLoadingIndicator("正在添加,请稍候...",$scope);httpClient.addItem(options,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(code!=0){MMUtils.showAlert("添加商品失败:"+data.msg);return;}var item=dataDetail.item;$scope.closeModal();$scope.addProductForCategory(newitem.currentCateId,item);},function(data,status){$ionicLoading.hide();MMUtils.showAlert("添加商品失败");$scope.closeModal();});}if(newitem.hasNewPicture==true){if(!newitem.new_pic_url){MMUtils.showAlert("暂不能上传图片，您可以在添加完商品后继续编辑图片");addItemInfo(options,newitem);return;}MMUtils.showLoadingIndicator("正在上传图片,请稍候...",$scope);httpClient.uploadPicForItem(newitem.serialNo,newitem.new_pic_url,$scope.info.shop.id,function(data,status){$ionicLoading.hide();console.log("upload pic success:"+JSON.stringify(data));if(!data||!data.response){MMUtils.showAlert("上传图片失败:"+JSON.stringify(data));return;}if(typeof(data.response)=="string"){data.response=eval("("+data.response+")");}var code=data.response.code,dataDetail=data.response.data;console.log("upload pic success code is:"+code+" ,data :"+JSON.stringify(dataDetail));if(parseInt(code)!=0){MMUtils.showAlert("上传图片失败:"+data.response.msg);return;}options.pic_url=dataDetail.url;addItemInfo(options,newitem);},function(){$ionicLoading.hide();MMUtils.showAlert("上传图片失败,请重试");});}else{addItemInfo(options,newitem);}};$ionicModal.fromTemplateUrl("templates/product-addnew.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function(){$scope.modal.hide();};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){});$scope.$on("modal.removed",function(){});$scope.$on("modal.shown",function(){});function clearCache(){navigator.camera.cleanup();}function onCapturePhoto(fileURI){$timeout(function(){$scope.info.newitem.new_pic_url=fileURI;$scope.info.newitem.hasNewPicture=true;});}$scope.getPhoto=function(){Camera.getPicture().then(onCapturePhoto,function(err){console.err(err);},{quality:25,targetWidth:320,destinationType:navigator.camera.DestinationType.FILE_URI,saveToPhotoAlbum:false});};}]);angular.module("miaomiao.console.controllers").controller("SearchCtrl",function($scope,$ionicLoading,$state,$timeout,httpClient,localStorageService,MMUtils,MMProductService){$scope.pageName="搜索商品";$scope.focused="centered";$scope.searchTerm="";$scope.info={};$scope.info.hasNoResults=false;$scope.info.shop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||{};$scope.performSearch=function(key,$event){$event.target.blur();var KEY=key||$scope.info.key;MMUtils.showLoadingIndicator("正在搜索...",$scope);httpClient.getSearchResults($scope.info.shop.id,KEY,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(!code==0||dataDetail.itemls.length==0){$scope.info.searchResultsItems=[];$scope.info.hasNoResults=true;MMProductService.renderDataNotification($scope.info.searchResultsItems);return;}$scope.info.hasNoResults=false;$scope.info.searchResultsItems=dataDetail.itemls;MMProductService.renderDataNotification($scope.info.searchResultsItems);},function(data,status){$ionicLoading.hide();$scope.info.hasNoResults=true;});};$scope.clearSearch=function(){$scope.info.key="";};});