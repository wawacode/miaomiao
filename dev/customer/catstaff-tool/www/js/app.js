// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionic.tool', ['ionic', 'LocalStorageModule'])

    .constant('serverInfo', {host: 'http://www.mbianli.com', context: '/console/api/'})
//    .constant('serverInfo', {host: 'http://127.0.0.1:8010', context: '/catstaff/'})

    .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

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
            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.tool', {
                url: '/tool',
                views: {
                    'tool-tab': {
                        templateUrl: 'templates/tool.html',
                        controller: 'ToolTabCtrl'
                    }
                }
            })
            .state('tabs.my', {
                url: '/my',
                views: {
                    'my-tab': {
                        templateUrl: 'templates/my.html',
                        controller: 'MyTabCtrl'
                    }
                }
            })
            .state('tabs.newshop', {
                url: '/newshop',
                views: {
                    'tool-tab': {
                        templateUrl: 'templates/newshop.html',
                        controller: 'NewShopCtrl'
                    }
                }
            });


        $urlRouterProvider.otherwise('/sign-in');

    })
    .run(function ($ionicPlatform, localStorageService, httpClient, $state) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            // check login status
            var user = localStorageService.get('MMTOOL_METADATA_USER') || {};
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
                    return;
                }

                $state.go('tabs.my', null, {reload: true})

            }, function (data, status) {
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                }
                console.log('[check for login]check login status failed');
            });
        });
    })
