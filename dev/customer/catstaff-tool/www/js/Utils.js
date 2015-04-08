;angular.module('ionic.tool')
    .factory('MMUtils', ['$timeout', '$ionicLoading', '$ionicPopup', function ($timeout, $ionicLoading, $ionicPopup) {

        return {

            isEmptyObject: function (obj) {

                // null and undefined are "empty"
                if (obj == null) return true;

                // Assume if it has a length property with a non-zero value
                // that that property is correct.
                if (obj.length > 0)    return false;
                if (obj.length === 0)  return true;

                // Otherwise, does it have any properties of its own?
                // Note that this doesn't handle
                // toString and valueOf enumeration bugs in IE < 9
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
                }

                return true;

            },

            isValidTelNumber: function (number) {
                var regPhone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
                var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
                return regPhone.test(number) || regMobile.test(number);
            },

            showLoadingIndicator: function (message, scope, tmpUrl) {

                scope.LoadingMessage = message;
                $ionicLoading.show({
                    templateUrl: tmpUrl || 'templates/loadingIndicator.html',
                    scope: scope
                });
            },
            showAlert: function (message, tmpUrl) {
                $ionicPopup.alert({
                    title: message,
                    template: tmpUrl || ''
                });
            }

        }
    }])