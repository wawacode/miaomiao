angular.module('miaomiao.shop').filter('getTotolCount', function() {
        return function(input) {
            input = input || [];

            var total = 0;
            for (var item_idx = 0; item_idx < input.length; item_idx++) {
                total += parseInt(input[item_idx].selectedCnt || 0);
            }
            return total;
        };
    }).filter('getTotolPrice', function() {
        return function(input) {
            input = input || [];

            var total = 0.0;
            for (var item_idx = 0; item_idx < input.length; item_idx++) {
                total += parseFloat(input[item_idx].price || 0.0) * parseInt(input[item_idx].selectedCnt || 0);
            }
            return total/100.0;
        };
    });

