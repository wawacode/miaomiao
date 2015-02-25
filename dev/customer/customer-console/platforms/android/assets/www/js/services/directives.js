angular.module('miaomiao.console.directives', [])
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
            templateUrl: 'templates/timepicker.html',
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
                };

                /* Decreases hours by one */
                scope.decreaseHours = function () {

                    //Check whether hours have reached min
                    scope.hours = scope.hours <= 0 ? 23 : --scope.hours;
                };

                /* Increases minutes by one */
                scope.increaseMinutes = function () {

                    //Check whether to reset
                    if (scope.minutes >= 59) {
                        scope.minutes = 0;
                    }
                    else {
                        scope.minutes++;
                    }
                };

                /* Decreases minutes by one */
                scope.decreaseMinutes = function () {

                    //Check whether to reset
                    if (scope.minutes <= 0) {
                        scope.minutes = 59;
                    }
                    else {
                        scope.minutes = --scope.minutes;
                    }
                };


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
                };

                /* Displays minutes */
                scope.displayMinutes = function () {
                    return scope.minutes <= 9 ? "0" + scope.minutes : scope.minutes;
                };

                /* Switches the current period by ammending hours */
                scope.switchPeriod = function () {
                    scope.hours = scope.hours >= 12 ? scope.hours - 12 : scope.hours + 12;
                }
            }
        }
    });