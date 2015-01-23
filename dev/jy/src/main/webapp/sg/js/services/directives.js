angular.module('miaomiao.shop').directive('backImg',function () {
        return function (scope, element, attrs) {
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url + ')',
                'background-size': 'contain'
            });
        };

    }).directive('slideable', function () {
        return {
            restrict:'C',
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
   .directive('slideToggle', function() {
        return {
            restrict: 'A',
            scope:{
                isOpen: "=slideToggle" // 'data-slide-toggle' in our html
            },
            link: function(scope, element, attr) {
                var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;

                // Watch for when the value bound to isOpen changes
                // When it changes trigger a slideToggle
                scope.$watch('isOpen', function(newIsOpenVal, oldIsOpenVal){
                    if(newIsOpenVal !== oldIsOpenVal){
                        element.stop().slideToggle(slideDuration);
                    }
                });

            }
        };
    });

