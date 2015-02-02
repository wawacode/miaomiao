angular.module('miaomiao.console.controllers').controller('EditShopCtrl', ['$scope', '$ionicModal','localStorageService','$ionicLoading','httpClient','$ionicScrollDelegate','$timeout',

    function ($scope, $ionicModal,localStorageService,$ionicLoading,httpClient,$ionicScrollDelegate,$timeout) {

        $ionicModal.fromTemplateUrl('templates/shop-list.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.modal = modal;
            });

        $scope.info = {};
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};
        $scope.info.shopName = $scope.info.shop.name || "首页";
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
            $scope.startEditShop = false;
            $timeout(function(){
                $ionicScrollDelegate.resize();
                $ionicScrollDelegate.scrollTop();
            });
        }

        $scope.saveShop = function(item){
            // TODO: compare and save

            var options = {
                shop_id:$scope.editingShop.shop_id,
                name: $scope.editingShop.name,
                shop_address: $scope.editingShop.shop_address,
                audit: $scope.editingShop.audit,
                owner_phone: $scope.editingShop.owner_phone,
                create_time: $scope.editingShop.create_time,
                lng: $scope.editingShop.lng,
                lat: $scope.editingShop.lat,
                open_time: $scope.editingShop.open_time,
                close_time: $scope.editingShop.close_time
            }

            $scope.LoadingMessage = '正在保存,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.updateShopInfo(options, function (data, status) {
                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '修改店铺失败:' + data.msg,
                        template: ''
                    });
                    return;
                }

                //success, just
                $scope.startEditShop = false;

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '修改店铺信息失败:',
                    template: ''
                });
            });
        }

        $scope.editShop = function(item){
            $scope.editingShop = item;
            $scope.startEditShop = true;
            $timeout(function(){
                $ionicScrollDelegate.resize();
            });
        }
    }
]);