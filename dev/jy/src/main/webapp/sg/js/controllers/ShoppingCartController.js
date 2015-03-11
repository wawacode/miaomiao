;angular.module('miaomiao.shop')
    .controller('ShoppingCartCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService,ShoppingCart) {

        $scope.info = $scope.info || {};
        $scope.info.shoppingCartItems = ShoppingCart.getAllItems();

        $scope.selectItem = function (item) {

            item.count += 1;

            ShoppingCart.itemChangeEventInShoppingCart(item);
        };

        $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

            item.count -= 1;

            if (item.count <= 0) {
                item.count = 0;
                ShoppingCart.removeItemFromCart(item);
            }

            ShoppingCart.itemChangeEventInShoppingCart(item);
        };

        $scope.clearShoppingCart = function(){
            $scope.info.shoppingCartItems = [];
            ShoppingCart.clearAll();
        };

        ShoppingCart.onItemChangeEventInProductList($scope, function (message) {

            $scope.info.shoppingCartItems = ShoppingCart.getAllItems();

        });
    });

