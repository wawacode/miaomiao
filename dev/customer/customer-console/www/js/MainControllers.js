angular.module('miaomiao.console.controllers', ['ionic.services.analytics'])

    .controller('MainCtrl', function ($scope, $ionicTrack, $state, cfpLoadingBar, $window, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, ionPlatform, $http) {
        $scope.open = function (url) {
            // Send event to analytics service
//    $ionicTrack.track('open', {
//      url: url
//    });

            // open the page in the inAppBrowser plugin. Falls back to a blank page if the plugin isn't installed
            var params = 'location=no,' +
                'enableViewportScale=yes,' +
                'toolbarposition=top,' +
                'closebuttoncaption=Done';
            var iab = window.open(url, '_blank', params);
            // cordova tends to keep these in memory after they're gone so we'll help it forget
            iab.addEventListener('exit', function () {
                iab.removeEventListener('exit', argument.callee);
                iab.close();
                iab = null;
            });
        };
        //make sure we always clear any existing loading bars before navigation
        $scope.$on('$ionicView.beforeLeave', function () {
            cfpLoadingBar.complete();
        });

        var halfHeight = null
        $scope.getHalfHeight = function () {
            if (ionic.Platform.isAndroid()) return 0;
            if (!halfHeight) {
                halfHeight = (document.documentElement.clientHeight / 2) - 200;
            }
            return halfHeight;
        }

        // for notifications

        $scope.notifications = [];
        $scope.registerToken = undefined;

        // call to register automatically upon device ready
        ionPlatform.ready.then(function (device) {
            $scope.register();
        });

        // Notification Received

        var onNotification = $window.onNotification = window.onNotification = function onNotification(notification){
            console.log(JSON.stringify(notification));
            if (ionic.Platform.isAndroid()) {
                handleAndroid(notification);
            }
            else if (ionic.Platform.isIOS()) {
                handleIOS(notification);
                $scope.$apply(function () {
                    $scope.notifications.push(JSON.stringify(notification.alert));
                })
            }
        }

        // Register
        $scope.register = function () {
            var config = null;

            if (ionic.Platform.isAndroid()) {
                config = {
                    "senderID": "miaomiao-bconsole", // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
                    "ecb":"onNotification"
                };
            }
            else if (ionic.Platform.isIOS()) {
                config = {
                    "badge": "true",
                    "sound": "true",
                    "alert": "true",
                    "ecb":"onNotification"
                }
            }

            $cordovaPush.register(config).then(function (result) {

                // get device id

                console.log("Register success " + result);
                $cordovaToast.showShortCenter('Registered for push notifications success:' + result );

                $scope.registerDisabled = true;
                $scope.registerToken = result;

                // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
                if (result != null) {
                    //TODO:  make API call to server to make sure we store the token and shop_ower's identity
                }

            }, function (err) {
                console.log("Register error " + err);
            });
        }

        // Android Notification Received Handler
        function handleAndroid(notification) {
            // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
            //             via the console fields as shown.
            console.log("handle Android : In foreground " + notification.foreground + " Coldstart " + notification.coldstart);
            if (notification.event == "registered") {
                $scope.regId = notification.regid;
                //TODO:  make API call to server to make sure we store the token and shop_ower's identity
            }
            else if (notification.event == "message") {

                var title = '喵喵商家推送',text='您有新的订单，请到我的订单下查看';
                if(notification.payload &&
                    notification.payload.body &&
                    notification.payload.body.body){
                    text = notification.payload.body.body.text
                    title = notification.payload.body.body.title;
                }

                $cordovaDialogs.alert(text, title).then(function() {
                    // callback success
                    //TODO: make order ui more nice ,show badge
                    $state.go('tab.order',null,{reload: true});
                });

                $scope.$apply(function () {
                    $scope.notifications.push(JSON.stringify(notification.message));
                })
            }
            else if (notification.event == "error")
                $cordovaDialogs.alert(notification.msg, "Push notification error event");
            else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
        }

        // IOS Notification Received Handler
        function handleIOS(notification) {

            // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
            // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
            // the notification when this code runs (weird).
            console.log("handle iOS : In foreground " + notification.foreground + " Coldstart " + notification.coldstart);

            if (notification.event == "registered") {
                $scope.regId = notification.regid;
                //TODO:  make API call to server to make sure we store the token and shop_ower's identity
            }

            if (notification.foreground == "1") {
                // Play custom audio if a sound specified.
                if (notification.sound) {
                    var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                    mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
                }

                if (notification.body && notification.messageFrom) {
                    $cordovaDialogs.alert(notification.body, notification.messageFrom);
                }
                else $cordovaDialogs.alert(notification.alert, "您有新的订单");

                if (notification.badge) {
                    $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                        console.log("Set badge success " + result)
                    }, function (err) {
                        console.log("Set badge error " + err)
                    });
                }
            }
            // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
            // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
            // the data in this situation.
            else {
                if (notification.body && notification.messageFrom) {
                    $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
                }
                else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
            }
        }

        // Unregister - Unregister your device token from APNS or GCM
        // Not recommended:  See http://developer.android.com/google/gcm/adv.html#unreg-why
        //                   and https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications
        //
        // ** Instead, just remove the device token from your db and stop sending notifications **
        $scope.unregister = function () {
            console.log("Unregister called");
            $scope.registerDisabled = false;
            //need to define options here, not sure what that needs to be but this is not recommended anyway
            $cordovaPush.unregister({}).then(function(result) {
                console.log("Unregister success " + result);//
            }, function(err) {
                console.log("Unregister error " + err)
            });
        }

    });