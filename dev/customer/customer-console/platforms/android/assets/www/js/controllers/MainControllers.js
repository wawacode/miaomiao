;angular.module('miaomiao.console.controllers', [])
    .controller('MainCtrl', function ($scope, $state, $window, $cordovaPush, $timeout, $cordovaDialogs,
                                      $cordovaMedia, $cordovaToast, ionPlatform, $http, httpClient, localStorageService,
                                      MMPushNotification) {
        $scope.open = function (url) {

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
        var onNotification = $window.onNotification = window.onNotification = function onNotification(notification) {
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
        };

        // Register
        $scope.register = function () {
            var config = {};
            if (ionic.Platform.isAndroid()) {
                config = {
                    "senderID": "miaomiao-bconsole",
                    "ecb": "onNotification"
                };
            }
            else if (ionic.Platform.isIOS()) {
                config = {
                    "badge": "true",
                    "sound": "true",
                    "alert": "true",
                    "ecb": "onNotification"
                }
            } else {
                return;
            }

            $cordovaPush.register(config).then(function (result) {
                // get device id
                console.log("Register success " + result);
                $scope.registerDisabled = true;
                $scope.registerToken = result;
                if (result != null) {
                    localStorageService.set('MMCONSOLE_META_PUSH_DEVICE_TOKEN', result);
                    MMPushNotification.subscribe();
                }
            }, function (err) {
                console.log("Register error " + err);
            });
        };

        // Android Notification Received Handler
        function handleAndroid(notification) {
            // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
            //             via the console fields as shown.
            console.log("handle Android : In foreground " + notification.foreground + " Coldstart " + notification.coldstart);
            if (notification.event == "registered") {
                $scope.regId = notification.regid;
                localStorageService.set('MMCONSOLE_META_PUSH_DEVICE_TOKEN', notification.regid);
                MMPushNotification.subscribe();
            }
            else if (notification.event == "message") {

                var title = '喵喵商家推送', text = '您有新的订单，请到我的订单下查看';
                if (notification.payload &&
                    notification.payload.body &&
                    notification.payload.body.body) {
                    text = notification.payload.body.body.text
                    title = notification.payload.body.body.title;
                }

                $cordovaDialogs.alert(text, title).then(function () {
                    // callback success
                    $state.go('tab.order', null, {reload: true});
                    $timeout(function () {
                        MMPushNotification.newOrderNotificationReceived({count: 1});
                    }, 100);
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
            console.log("handle iOS: the notification is:" + JSON.stringify(notification));

            var inappHanlder = function () {
                $state.go('tab.order', null, {reload: true});
                $timeout(function () {
                    MMPushNotification.newOrderNotificationReceived({count: 1});
                }, 100);
            }

            if (notification.foreground == "1") {
                // Play custom audio if a sound specified.

                if (notification.body && notification.messageFrom) {
                    console.log("the notification body is:" + notification.body);
                    $cordovaDialogs.alert(notification.body, notification.messageFrom).then(function () {
                        inappHanlder();
                    });
                } else {
                    console.log("the notification body alert:" + notification.alert);
                    $cordovaDialogs.alert(notification.alert, "喵喵商家推送", "确定").then(function () {
                        inappHanlder();
                    });
                }

                if (notification.badge) {
                    console.log('we are in foreground badge');
                    $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                        console.log("Set badge success " + result)
                    }, function (err) {
                        console.log("Set badge error " + err)
                    });
                }

                if (notification.sound) {
                    console.log('we are in foreground and have sound');
                    var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                    mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
                }
            }
            // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
            // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
            // the data in this situation.
            else {
                console.log('we are in background');
                if (notification.body && notification.messageFrom) {
                    console.log('we are in background body');
                    $cordovaDialogs.alert(notification.body, notification.messageFrom).then(function () {
                        inappHanlder();
                    });
                } else {
                    console.log('we are in background alert');
                    $cordovaDialogs.alert(notification.alert, '喵喵商家推送').then(function () {
                        inappHanlder();
                    });
                }

                if (notification.badge) {
                    console.log('we are in background mode');
                    $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                        console.log("Set badge success " + result)
                    }, function (err) {
                        console.log("Set badge error " + err)
                    });
                }
            }
        }

        // ** Instead, just remove the device token from your db and stop sending notifications **
        $scope.unregister = function () {
            console.log("Unregister called");
            $scope.registerDisabled = false;
            //need to define options here, not sure what that needs to be but this is not recommended anyway
            $cordovaPush.unregister({}).then(function (result) {
                console.log("Unregister success " + result);//
            }, function (err) {
                console.log("Unregister error " + err)
            });
        }

    });