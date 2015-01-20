angular.module('miaomiao.shop')
    .controller('ShoppingCartCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService,ShoppingCart) {

        $scope.shoppingCartItems = ShoppingCart.getAllItems();

        $scope.selectItem = function (item) {

            item.count += 1;

            ShoppingCart.itemChangeEventTriggered(item);
        }

        $scope.removeItem = function (item, removeUIElementWhenEmtpy) {

            item.count -= 1;

            if (item.count <= 0) {
                item.count = 0;
                ShoppingCart.removeItemFromCart(item);
            }

            ShoppingCart.itemChangeEventTriggered(item);
        }
    });

