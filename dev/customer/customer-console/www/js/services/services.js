angular.module('miaomiao.console.services', [])
    .factory('Camera', ['$q', function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])
    .factory('MMPushNotification', ['$rootScope', 'httpClient', 'localStorageService', '$cordovaToast', '$timeout', function ($rootScope, httpClient, localStorageService, $cordovaToast, $timeout) {
        return {
            subscribe: function () {

                var token = localStorageService.get('MMCONSOLE_META_PUSH_DEVICE_TOKEN');
                var user = localStorageService.get('MMCONSOLE_METADATA_USER');

                if (token && user && user.phone) {
                    var chn = 'iOS';
                    if (ionic.Platform.isAndroid()) {
                        chn = 'adr'
                    }
                    httpClient.subscribeForCurrentDevice(user.phone, chn, token, function () {
                        console.log('注册通知成功，您将会在此应用中收到新订单通知~');

                    }, function () {

                    });
                }
            },
            newOrderNotificationReceived: function (data) {
                console.log('we have see new orders and sent broadcast');
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_NewOrderNotificationReceived', {
                        data: data
                    });
                });
            },

            onNewOrderNotificationReceived: function ($scope, handler) {
                console.log('we watch new orders and listening for notifications');
                $scope.$on('MMEVENT_NewOrderNotificationReceived', function (event, message) {
                    handler(message);
                });
            }
        }
    }]).factory('MMShopService', ['$rootScope', 'httpClient', 'localStorageService', '$timeout', function ($rootScope, httpClient, localStorageService, $timeout) {
        return {

            switchDefaultShopNotification: function (data) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_switchDefaultShopNotification', {
                        data: data
                    });
                });
            },

            onSwitchDefaultShopNotification: function ($scope, handler) {
                $scope.$on('MMEVENT_switchDefaultShopNotification', function (event, message) {
                    handler(message);
                });
            }
        }
    }]);
