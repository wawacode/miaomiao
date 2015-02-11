/**
 * Created by perry on 7/31/14.
 */

angular.module('miaomiao.console.directives', [])
    .directive('fpSearchBar', function ($rootScope, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            scope: {
                searchModel: '=?',
                focused: '=?',
                submit: '&'
            },
            template: function () {
                if (ionic.Platform.isAndroid()) {
                    return '<form class="bar bar-header bar-balanced item-input-inset" ng-submit="submit()">' +
                        '<div class="item-input-wrapper light-bg" ng-class="alignment" ng-click="focus()">' +
                        '<i class="icon ion-android-search placeholder-icon assertive"></i>' +
                        '<input type="search"' +
                        'id="searchInput"' +
                        'placeholder="Search HN"' +
                        'ng-model="searchModel"' +
                        'ng-focus="alignment = \'text-left\'"' +
                        'ng-blur="alignment = searchModel.length?\'left\':\'centered\'">' +
                        '</div>' +
                        '<i class="icon ion-ios7-close dark" ng-show="searchModel.length" ng-click="clear()"></i>' +
                        '</form>'
                }
                return '<form class="bar bar-header bar-balanced item-input-inset" ng-submit="submit()">' +
                    '<div class="item-input-wrapper light-bg" ng-class="alignment" ng-click="focus()">' +
                    '<i class="icon ion-ios7-search placeholder-icon assertive"></i>' +
                    '<input type="search"' +
                    'id="searchInput"' +
                    'placeholder="Search"' +
                    'ng-model="searchModel"' +
                    'ng-focus="alignment = \'left\'"' +
                    'ng-blur="alignment = searchModel.length?\'left\':\'centered\'">' +
                    '</div>' +
                    '<i class="icon ion-ios7-close dark ng-hide" ng-show="searchModel.length" ng-click="clear()"></i>' +
                    '</form>'
            },
            link: function (scope, elem) {
                var input = elem[0].querySelector('#searchInput');
                scope.focus = function () {
                    input.focus()
                    $timeout(function () {
                        input.focus()
                    }, 200);

                };
                scope.alignment = scope.searchModel.length ? 'left' : 'centered';
                // grab the cached search term when the user re-enters the page
                $rootScope.$on('$ionicView.beforeEnter', function () {
                    if (typeof localStorage.searchCache != 'undefined') {
                        var sc = JSON.parse(localStorage.searchCache);
                        scope.searchModel = sc.term;
                    }
                });
                scope.clear = function () {
                    scope.searchModel = '';
                    scope.alignment = 'centered';
                    input.blur();

                    scope.$emit('fpSearchBar.clear');
                };
            }
        };
    })
// custom directive to bind to hold events and trigger the sharing plugin
// expects the parent scope to contain a post item from the HNAPI service
    .directive('fpShare', function ($ionicGesture) {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                $ionicGesture.on('hold', share, elem);

                function share() {
                    if (typeof window.plugins === 'undefined' || typeof window.plugins.socialsharing === 'undefined') {
                        console.error("Social Sharing Cordova Plugin not found. Disregard if on a desktop browser.");
                        return;
                    }
                    window.plugins
                        .socialsharing
                        .share(
                            scope.$parent.post.title,
                            null,
                            null,
                            scope.$parent.post.url
                        )
                }
            }
        }
    })
    .directive('backImg', function () {
        return function (scope, element, attrs) {
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url + ')',
                'background-size': 'contain'
            });
        };

    })
    .directive("ngTimeSelector", function () {
        return {
            restrict: 'EA',
            templateUrl:'templates/timepicker.html',
            scope: {
                hours: "=",
                minutes: "="
            },
            replace: true,
            link: function (scope, elem, attr) {

                //Create vars
                scope.period = "上午";

                /* Increases hours by one */
                scope.increaseHours = function () {

                    //Check whether hours have reached max
                    if (scope.hours < 23) {
                        scope.hours = ++scope.hours;
                    }
                    else {
                        scope.hours = 0;
                    }
                }

                /* Decreases hours by one */
                scope.decreaseHours = function () {

                    //Check whether hours have reached min
                    scope.hours = scope.hours <= 0 ? 23 : --scope.hours;
                }

                /* Increases minutes by one */
                scope.increaseMinutes = function () {

                    //Check whether to reset
                    if (scope.minutes >= 59) {
                        scope.minutes = 0;
                    }
                    else {
                        scope.minutes++;
                    }
                }

                /* Decreases minutes by one */
                scope.decreaseMinutes = function () {

                    //Check whether to reset
                    if (scope.minutes <= 0) {
                        scope.minutes = 59;
                    }
                    else {
                        scope.minutes = --scope.minutes;
                    }
                }


                /* Displays hours - what the user sees */
                scope.displayHours = function () {

                    //Create vars
                    var hoursToDisplay = scope.hours;

                    //Check whether to reset etc
                    if (scope.hours > 12) {
                        hoursToDisplay = scope.hours - 12;
                    }

                    //Check for 12 AM etc
                    if (hoursToDisplay == 0) {

                        //Set to am and display 12
                        hoursToDisplay = 12;
                    }
                    else {

                        //Check whether to prepend 0
                        if (hoursToDisplay <= 9) {
                            hoursToDisplay = "0" + hoursToDisplay;
                        }
                    }

                    return hoursToDisplay;
                }

                /* Displays minutes */
                scope.displayMinutes = function () {
                    return scope.minutes <= 9 ? "0" + scope.minutes : scope.minutes;
                }

                /* Switches the current period by ammending hours */
                scope.switchPeriod = function () {
                    scope.hours = scope.hours >= 12 ? scope.hours - 12 : scope.hours + 12;
                }
            }
        }
    });