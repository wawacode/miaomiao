angular.module('miaomiao.console.controllers').controller('EditShopCtrl', ['$scope', '$ionicModal',

    function ($scope, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/shop-list.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.modal = modal;
            });

        $scope.info = {};
        $scope.info.shoplist = [{"audit":1,"base_price":3000,"close_time":1422021600000,"create_time":1422005982000,"head_url":"","id":10030,"lat":0,"lng":0,"name":"利泰便利","open_time":1421978400000,"owner":"","owner_phone":"18501378526","owner_user_id":34,"shop_address":"湖中园312号楼105","shop_url":"","status":0,"status4V":"营业中","tel":"64300136","rate":5,"maxRate":5}];
        $scope.info.shop = $scope.info.shoplist[0];

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        $scope.$on('modal.shown', function() {

        });

        $scope.ShowShopList = function() {
            $scope.openModal();
        }

        $scope.cancelEditShop = function(item){
            // TODO: compare and save
            $scope.editingShop = null;
        }

        $scope.saveShop = function(item){
            // TODO: compare and save
            $scope.editingShop = null;
        }

        $scope.editShop = function(item){
            $scope.editingShop = item;
        }
    }
]);