;angular.module('miaomiao.shop').directive('backImg',function () {
    return function (scope, element, attrs) {
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'contain'
        });
    };

}).directive('slideable', function () {
        return {
            restrict: 'C',
            compile: function (element, attr) {
                // wrap tag
                var contents = element.html();
                element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

                return function postLink(scope, element, attrs) {
                    // default properties
                    attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                    attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                    element.css({
                        'overflow': 'hidden',
                        'display': 'none',
                        'transitionProperty': 'height',
                        'transitionDuration': attrs.duration,
                        'transitionTimingFunction': attrs.easing
                    });
                };
            }
        };
    })
    .directive('slideToggle', function () {
        return {
            restrict: 'A',
            scope: {
                isOpen: "=slideToggle" // 'data-slide-toggle' in our html
            },
            link: function (scope, element, attr) {
                var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;

                // Watch for when the value bound to isOpen changes
                // When it changes trigger a slideToggle
                scope.$watch('isOpen', function (newIsOpenVal, oldIsOpenVal) {
                    if (newIsOpenVal !== oldIsOpenVal) {
                        element.stop().slideToggle(slideDuration);
                    }
                });

            }
        };
    })
    .directive(
    "bnSlideShow",
    function () {

        // I allow an instance of the directive to be hooked
        // into the user-interaction model outside of the
        // AngularJS context.
        function link($scope, element, attributes) {

            // I am the TRUTHY expression to watch.
            var expression = attributes.bnSlideShow;

            // I am the optional slide duration.
            var duration = ( attributes.slideShowDuration || "fast" );


            // I check to see the default display of the
            // element based on the link-time value of the
            // model we are watching.
            if (!$scope.$eval(expression)) {

                $(element).hide();

            }


            // I watch the expression in $scope context to
            // see when it changes - and adjust the visibility
            // of the element accordingly.
            $scope.$watch(
                expression,
                function (newValue, oldValue) {

                    // Ignore first-run values since we've
                    // already defaulted the element state.
                    if (newValue === oldValue) {

                        return;

                    }

                    // Show element.
                    if (newValue) {

                        $(element)
                            .stop(true, true)
                            .slideDown(duration)
                        ;

                        // Hide element.
                    } else {

                        $(element)
                            .stop(true, true)
                            .slideUp(duration)
                        ;

                    }

                }
            );

        }


        // Return the directive configuration.
        return({
            link: link,
            restrict: "A"
        });

    }).directive(
    "bnCommonShow",
    function () {

        // I allow an instance of the directive to be hooked
        // into the user-interaction model outside of the
        // AngularJS context.
        function link($scope, element, attributes) {

            // I am the TRUTHY expression to watch.
            var expression = attributes.bnCommonShow;

            // I check to see the default display of the
            // element based on the link-time value of the
            // model we are watching.
            if (!$scope.$eval(expression)) {

                $(element).hide();

            }

            // I watch the expression in $scope context to
            // see when it changes - and adjust the visibility
            // of the element accordingly.
            $scope.$watch(
                expression,
                function (newValue, oldValue) {

                    // Ignore first-run values since we've
                    // already defaulted the element state.
                    if (newValue === oldValue) {

                        return;

                    }

                    // Show element.
                    if (newValue) {

                        $(element).show();

                        // Hide element.
                    } else {

                        $(element).hide();
                    }

                }
            );

        }


        // Return the directive configuration.
        return({
            link: link,
            restrict: "A"
        });

    });

