// miaomiao console main app
angular.module('miaomiao.console', [
        'ngAnimate',
        'ionic',
        'ngCordova',
        'LocalStorageModule',
        'ngStorage',
        'pasvaz.bindonce',

        'QuickList',
        'angular-datepicker',
        'miaomiao.console.controllers',
        'miaomiao.console.services',
        'miaomiao.console.directives',
        'ionic.services.deploy'
    ])

    // for server config
    .constant('serverInfo', {host: 'http://www.mbianli.com', context: '/console/api/'})

    // for http post requests
    .config(function ($httpProvider, $provide) {
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

    // for image render
    .config(function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })

    // for app route
    .config(function ($stateProvider, $urlRouterProvider, $ionicAppProvider, $compileProvider, $ionicConfigProvider) {
        try {
            $ionicAppProvider.identify({
                "app_id": ionic.Config.app_id
            });
        } catch (e) {
            console.error('ionic.Config not set. Make sure config.js is loaded', e)
        }

        $compileProvider.debugInfoEnabled(false);

        $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
        $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

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
                controller: 'ChangePwdCtrl'
            })

            .state('tab', {
                url: "/tab",
                'abstract': true,
                templateUrl: function () {
                    if (ionic.Platform.isAndroid()) {
                        return "templates/tabs-android.html";
                    }
                    return "templates/tabs.html";
                }
            })

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
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/sign-in');

    }).run(function ($ionicPlatform, $http, $ionicDeploy, localStorageService, httpClient, $state) {

        $ionicPlatform.ready(function () {
            // for ios7 style header bars
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
            // hide the prev/next buttons on the keyboard input
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);
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
                console.log('[check for update] error: checking for update');
                // Error checking for updates
            });

            // hide the splash screen only after everything's ready (avoid flicker)
            // requires keyboard plugin and confix.xml entry telling the splash screen to stay until explicitly told
            if (navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            // check login status
            var user = localStorageService.get('MMCONSOLE_METADATA_USER') || {};
            if (!user || !user.token)return;
            // validate user login
            httpClient.islogin(user.token, function (data, status) {

                // hide the splash screen only after everything's ready (avoid flicker)
                // requires keyboard plugin and confix.xml entry telling the splash screen to stay until explicitly told
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                }
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    console.log('[check for login]check login status failed:' + code);
                    $state.go('signin', null, {reload: true});
                    return;
                }
                //success
                localStorageService.set('MMCONSOLE_METADATA_SHOP_LIST', dataDetail.shop);
                localStorageService.set('MMCONSOLE_METADATA_DEFAULT_SHOP', dataDetail.shop[0]);

                $state.go('tab.front-page', null, {reload: true})

            }, function (data, status) {
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                }
                console.log('[check for login]check login status failed');
                $state.go('signin', null, {reload: true});
            });
        });
    });