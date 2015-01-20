angular.module('miaomiao.shop').factory('ShoppingCart', ['$http', '$rootScope', 'localStorageService', '$localStorage',
    '$sessionStorage', function ($http, $rootScope, localStorageService, $localStorage, $sessionStorage) {


        return {

            _shoppingItems: function () {

                var shopItems = $sessionStorage.savedShoppingCartItems || [];
                return shopItems;

            },

            itemExistInCart: function (item, savedItems) {

                for (var idx = 0; idx < savedItems.length; idx++) {

                    if (item.id == savedItems[idx].id)return true;

                }
                return false;
            },

            addItemToCart: function (item) {

                var items = this._shoppingItems();

                var index = -1;
                for (var idx = 0; idx < items.length; idx++) {
                    if (item.id == items[idx].id) {
                        {
                            index = idx;
                            break;
                        }
                    }
                }

                if (index == -1) {
                    items.push(item);
                } else {
                    items[index].count = item.count;
                }

                $sessionStorage.savedShoppingCartItems = items;
            },

            removeItemFromCart: function (item) {

                var items = this._shoppingItems();

                var index = -1;
                for (var idx = 0; idx < items.length; idx++) {
                    if (item.id == items[idx].id) {
                        index = idx;
                        break;
                    }
                }
                //find the item
                if (index > -1) {
                    if (item.count <= 0) {
                        items.splice(index, 1);
                    } else {
                        items[index].count = item.count;
                    }
                }

                $sessionStorage.savedShoppingCartItems = items;

            },

            getAllItems: function () {

                return this._shoppingItems();
            },

            clearAll: function () {

                $sessionStorage.savedShoppingCartItems = [];

                this.itemChangeEventInShoppingCart();
            },

            getCountForItem: function (item) {

                var items = this._shoppingItems();
                for (var idx = 0; idx < items.length; idx++) {
                    if (item.id == items[idx].id)
                        return items[idx].count;
                }
                return 0;
            },

            getCountForCategroy: function (cateId) {

                var items = this._shoppingItems();
                var total = 0;
                for (var idx = 0; idx < items.length; idx++) {
                    if (cateId == items[idx].category_id)
                        total += items[idx].count;
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
            },

            itemChangeEventInShoppingCart: function (item) {
                $rootScope.$broadcast('itemSelectionChangedInShoppingCart', {
                    item: item
                });
            },
            onItemChangeEventInShoppingCart: function ($scope, handler) {
                $scope.$on('itemSelectionChangedInShoppingCart', function (event, message) {
                    handler(message);
                });
            },

            itemChangeEventInProductList: function (item) {
                $rootScope.$broadcast('itemSelectionChangedInProductList', {
                    item: item
                });
            },

            onItemChangeEventInProductList: function ($scope, handler) {
                $scope.$on('itemSelectionChangedInProductList', function (event, message) {
                    handler(message);
                });
            }
        }
    }]);

