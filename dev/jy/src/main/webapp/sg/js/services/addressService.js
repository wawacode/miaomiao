angular.module('miaomiao.shop').factory('AddressService', ['$http','$rootScope','$timeout', function ($http, $rootScope,$timeout) {

        return {

            addressChangeEventSwitchDefault: function (item) {
                $timeout(function(){
                    $rootScope.$broadcast('MMEVENT_AddressChangeEventSwitchDefault', {
                        item: item
                    });
                });

            },

            onAddressChangeEventSwitchDefault: function ($scope, handler) {
                $scope.$on('MMEVENT_AddressChangeEventSwitchDefault', function (event, message) {
                    handler(message);
                });
            },

            addressChangeEventAddNew: function (item) {
                $timeout(function(){
                    $rootScope.$broadcast('MMEVENT_AddressChangeEventAddNew', {
                        item: item
                    });
                });
            },

            onAddressChangeEventAddNew: function ($scope, handler) {
                $scope.$on('MMEVENT_AddressChangeEventAddNew', function (event, message) {
                    handler(message);
                });
            }
        }
    }]);

