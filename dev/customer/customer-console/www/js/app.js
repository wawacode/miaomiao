// Ionic FrontPage App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'frontpage' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// 'frontpage.services' is found in services.js
angular.module('miaomiao.console', [
    'ngAnimate',
    'ionic',
    'ngCordova',
    'LocalStorageModule',
    'ngStorage',
    'ngDropdowns',
    'angular-datepicker',
    'miaomiao.console.controllers',
    'miaomiao.console.services',
    'miaomiao.console.directives',
    'ionic.services.analytics',
    'ionic.services.deploy',
    'cfp.loadingBar'
], function ($httpProvider, $provide) {

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
})
    .run(function ($ionicPlatform, $http, $ionicTrack, $ionicDeploy) {
        $ionicPlatform.ready(function () {
            // for ios7 style header bars
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
            // hide the prev/next buttons on the keyboard input
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            $ionicDeploy.initialize(ionic.Config.app_id);
            $ionicDeploy.check().then(function (response) {
                console.log('got a response', response);
                // response will be true/false
                if (response) {
                    // Download the updates
                    console.log('downloading updates');
                    $ionicDeploy.download().then(function () {
                        // Extract the updates
                        console.log('extracting updates');
                        $ionicDeploy.extract().then(function () {
                            console.log('update extracted, loading');
                            // Load the updated version
//                            $ionicTrack.load();
                        }, function (error) {
                            console.log('error extracting');
                            // Error extracting
                        }, function (progress) {
                            // Do something with the zip extraction progress
                            console.log('extraction progress', progress);
                        });
                    }, function (error) {
                        console.log('error downloading');
                        // Error downloading the updates
                    }, function (progress) {
                        // Do something with the download progress
                        console.log('progress downloading', progress);
                    });
                } else {
                    // No updates, load the most up to date version of the app
                    console.log('no update, loading');
                    $ionicDeploy.load();
                }
            }, function (error) {
                console.log('error checking for update');
                // Error checking for updates
            });

            // hide the splash screen only after everything's ready (avoid flicker)
            // requires keyboard plugin and confix.xml entry telling the splash screen to stay until explicitly told
            if (navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
        });
    })

//    .constant('serverInfo', {host: 'http://www.mbianli.com:8088', context: '/console/api/'})
    .constant('serverInfo', {host: 'http://192.168.1.113:8010', context: '/console/api/'})

    .config(function($compileProvider){
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(function ($stateProvider, $urlRouterProvider, $ionicAppProvider, $compileProvider) {
        try {
            $ionicAppProvider.identify({
                "app_id": ionic.Config.app_id
            });
        } catch (e) {
            console.error('ionic.Config not set. Make sure config.js is loaded', e)
        }

        $compileProvider.debugInfoEnabled(false);

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('signin', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'SignInCtrl'
            })

            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
            })

            .state('changepassword', {
                url: '/change-password',
                templateUrl: 'templates/change-password.html',
                controller:'ChangePwdCtrl'
            })


            // setup an abstract state for the tabs directive
            // the tab state isn't an actual page we navigate to, but a necessary state for ionic tabs
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: function () {
                    if (ionic.Platform.isAndroid()) {
                        return "templates/tabs-android.html";
                    }
                    return "templates/tabs.html";
                }
            })

            // Each tab has its own nav history stack:
            // Font page and Newest are nearly identical and could probably share a template and possibly even a controller
            // It's reasonable to expect they'll diverge as the app matures though, so we'll keep them separate
            // Check the comments page to see an example of how to reuse a template/controller
            .state('tab.front-page', {
                url: '/front-page',
                views: {
                    'tab-front-page': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'FrontPageCtrl'
                    }
                }
            })

            .state('tab.shop-edit', {
                url: '/shop-edit',
                views: {
                    'tab-front-page': {
                        templateUrl: 'templates/shop-edit.html',
                        controller: 'EditShopCtrl'
                    }
                }
            })

            .state('tab.product', {
                url: '/product',
                views: {
                    'tab-product': {
                        templateUrl: 'templates/tab-product.html',
                        controller: 'ProductCtrl'
                    }
                }
            })

            .state('tab.order', {
                url: '/order',
                views: {
                    'tab-order': {
                        templateUrl: 'templates/tab-order.html',
                        controller: 'OrderCtrl'
                    }
                }
            })
            .state('tab.search', {
                url: '/search',
                views: {
                    'tab-search': {
                        templateUrl: 'templates/tab-search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/sign-in');

    })
    .factory(("ionPlatform"), function( $q ){
        var ready = $q.defer();

        ionic.Platform.ready(function( device ){
            ready.resolve( device );
        });

        return {
            ready: ready.promise
        }
    })

    .filter('timeAgo', function () {
        var cache = [];
        return function (date) {
            if (typeof cache[date] === 'string')return cache[date];
            var prettyDate = moment(date, 'X').fromNow();
            cache[date] = prettyDate;
            return prettyDate;
        }
    })

;