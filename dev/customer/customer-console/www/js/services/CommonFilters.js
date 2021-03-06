;angular.module('miaomiao.console.services')
    .filter('getTotolCount',function () {
        return function (input) {
            input = input || [];

            var total = 0;
            for (var item_idx = 0; item_idx < input.length; item_idx++) {
                total += parseInt(input[item_idx].count || 0);
            }
            return total;
        };
    }).filter('getTotolPrice',function () {
        return function (input) {
            input = input || [];

            var total = 0.0;
            for (var item_idx = 0; item_idx < input.length; item_idx++) {
                total += parseFloat(input[item_idx].price || 0.0) * parseInt(input[item_idx].count || 0);
            }
            return total / 100.0;
        };
    }).filter('removeAMPM',function () {
        return function (text) {
            if (!text) return;
            return text.replace(/AM/, '').replace(/PM/, ''); // Characters after Colon
        };
    }).filter('getShopStatusString',function () {
        return function (input) {
            return input == 0 ? "营业中" : "打烊了";
        }
    }).filter('getShopMinPrice',function () {
        return function (input) {
            return input ? input / 100 : 20;
        }
    }).filter('getDisplayShoppingPrice', function () {
        return function (input) {
            return input ? input / 100 : 0;
        }
    }).filter('timeAgo', function () {
        var cache = [];
        return function (date) {
            if (typeof cache[date] === 'string')return cache[date];
            var prettyDate = moment(date, 'X').fromNow();
            cache[date] = prettyDate;
            return prettyDate;
        }
    });



