angular.module('miaomiao.console.controllers').controller('EditShopCtrl', ['$scope', '$ionicModal','localStorageService',

    function ($scope, $ionicModal,localStorageService) {

        $ionicModal.fromTemplateUrl('templates/shop-list.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.modal = modal;
            });

        $scope.info = {};
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};
        $scope.info.shoplist = [$scope.info.shop];

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