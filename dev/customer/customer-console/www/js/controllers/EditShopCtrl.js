angular.module('miaomiao.console.controllers').controller('EditShopCtrl', ['$scope','$filter', '$ionicPopup','$ionicModal','localStorageService','$ionicLoading','httpClient','$ionicScrollDelegate','$timeout',

    function ($scope,$filter, $ionicPopup, $ionicModal,localStorageService,$ionicLoading,httpClient,$ionicScrollDelegate,$timeout) {

        $ionicModal.fromTemplateUrl('templates/shop-list.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.modal = modal;
            });

        $scope.info = {};

        $scope.info.shoplist = localStorageService.get('MMCONSOLE_METADATA_SHOP_LIST') || [];
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || ($scope.info.shoplist && $scope.info.shoplist[0]);

        $scope.info.shopName = $scope.info.shop.name || "首页";

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

        $scope.switchDefaultShop = function(shopInfo,$event){

            $event.stopPropagation();

            localStorageService.set('MMCONSOLE_METADATA_DEFAULT_SHOP',shopInfo);

            $scope.closeModal();
            $scope.doShopInfoRefresh();

        }

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
                shop_id:$scope.editingShop.id,
                name: $scope.editingShop.name,
                tel:$scope.editingShop.tel,
                shop_address: $scope.editingShop.shop_address,
                owner_phone: $scope.editingShop.owner_phone,
                base_price:$scope.editingShop.new_base_price * 100,
                shopInfo:$scope.editingShop.shopInfo,
                status:$scope.editingShop.status
            }

            if($scope.editingShop.new_open_time){
                options.open_time = $scope.editingShop.new_open_time;
            }
            if($scope.editingShop.new_close_time){
                options.close_time = $scope.editingShop.new_close_time;
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

                $scope.info.shop = dataDetail.shop;
                localStorageService.set('MMCONSOLE_METADATA_DEFAULT_SHOP',dataDetail.shop);

                //success, just
                $scope.startEditShop = false;
                $timeout(function(){

                    $ionicScrollDelegate.resize();
                    $ionicScrollDelegate.scrollTop();

                });
            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '修改店铺信息失败:',
                    template: ''
                });
            });
        }

        $scope.editShop = function(item,$event){

            $event.stopPropagation();

            item.new_base_price = item.base_price/100.0;
            item.new_open_time = $filter('date')(item.open_time, 'shortTime');
            item.new_close_time = $filter('date')(item.close_time, 'shortTime');

            $scope.editingShop = item;
            $scope.startEditShop = true;
            $timeout(function(){

                $ionicScrollDelegate.resize();
            });
        }
    }
]);