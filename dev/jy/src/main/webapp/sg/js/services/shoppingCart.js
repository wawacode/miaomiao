angular.module('miaomiao.shop').factory('ShoppingCart', ['$http','localStorageService','$localStorage',
    '$sessionStorage', function ($http,localStorageService,$localStorage,$sessionStorage) {


    return {

        _shoppingItems:function(){

            var shopItems = $sessionStorage.savedShoppingCartItems || [];
            return shopItems;

        },

        itemExistInCart : function(item, savedItems){

            for (var idx=0;idx < savedItems.length ;idx ++) {

                if (item.id == savedItems[idx].id)return true;

            }
            return false;
        },

        addItemToCart: function (item) {

            var items = this._shoppingItems();

            if(!this.itemExistInCart(item, items)){
                items.push(item);
            }

            $sessionStorage.savedShoppingCartItems = items;
        },

        removeItemFromCart: function (item) {

            var items = this._shoppingItems();

            var index = -1;
            for (var idx=0;idx < items.length ;idx ++) {
                if (item.id == items[idx].id)
                {index = idx; break;}
            }
            if (index > -1) {
                items.splice(index, 1);
            }
            $sessionStorage.savedShoppingCartItems = items;

        },

        getAllItems: function () {

            return this._shoppingItems();
        },

        getCountForItem: function (item) {

            var items = this._shoppingItems();
            for (var idx=0;idx < items.length ;idx ++) {
                if (item.id == items[idx].id)
                return items[idx].count;
            }
            return 0;
        },

        getCountForCategroy: function (cateId) {

            var items = this._shoppingItems();
            var total = 0;
            for (var idx=0;idx < items.length ;idx ++) {
                if (cateId == items[idx].category_id)
                    total += items[idx].count ;
            }
            return total;
        },

        getTotalCount: function () {
            var items = this._shoppingItems();
            var totalCnt = 0;
            for (var item_idx = 0; item_idx < items.length; item_idx++) {
                totalCnt += parseInt(items[item_idx].count || 0);
            }

            return totalCnt;
        },

        getTotalPrice: function () {
            var totalPrice = 0.0;
            var items = this._shoppingItems();
            for (var item_idx = 0; item_idx < items.length; item_idx++) {
                totalPrice += parseFloat(items[item_idx].price || 0.0) * parseInt(items[item_idx].count || 0);
            }

            return totalPrice / 100.0;
        },

        cartReadyToShip: function () {

            return this.getTotalPrice() >= 20.0;
        }

    }
}]);

