angular.module('miaomiao.shop').factory('ShoppingCart', ['$http', function ($http) {

    var _shoppingItems = [];

    return {

        addItemToCart: function (item) {

            var index = _shoppingItems.indexOf(item);
            if (index == -1) {
                _shoppingItems.push(item);
            }
        },

        removeItemFromCart: function (item) {

            var index = _shoppingItems.indexOf(item);
            if (index > -1) {
                _shoppingItems.splice(index, 1);
            }
        },

        getAllItems: function () {
            return _shoppingItems;
        },

        getTotalCount: function () {
            var totalCnt = 0;
            for (var item_idx = 0; item_idx < _shoppingItems.length; item_idx++) {
                totalCnt += parseInt(_shoppingItems[item_idx].count || 0);
            }

            return totalCnt;
        },

        getTotalPrice: function () {
            var totalPrice = 0.0;
            for (var item_idx = 0; item_idx < _shoppingItems.length; item_idx++) {
                totalPrice += parseFloat(_shoppingItems[item_idx].price || 0.0) * parseInt(_shoppingItems[item_idx].count || 0);
            }

            return totalPrice / 100.0;
        },

        cartReadyToShip: function () {

            return this.getTotalPrice() >= 20.0;
        }

    }
}]);

