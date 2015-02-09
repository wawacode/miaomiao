angular.module('miaomiao.console.controllers').controller('AddProductCtrl', ['$scope','$ionicPopup', '$ionicModal','httpClient','localStorageService','$timeout','$ionicLoading',

    function ($scope, $ionicPopup ,$ionicModal,httpClient,localStorageService,$timeout,$ionicLoading) {

        $scope.info.shoplist = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};
        $scope.info.shop = $scope.info.shoplist && $scope.info.shoplist[0];
        $scope.hasProductInfo = false;

        $scope.findItem = function(serialNo){

            if(!serialNo){
                $ionicPopup.alert({
                    title: '请输入条形码',
                    template: ''
                });
                return;
            }
            $scope.LoadingMessage = '正在查找商品信息,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.getItemInfo(serialNo,  function (data, status) {

                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '查找商品失败,请手动添加:' + data.msg,
                        template: ''
                    });
                }
                $scope.hasProductInfo = true;
                var item = dataDetail.product;
                $timeout(function(){
                    $scope.newitem = item;
                    $scope.newitem.currentCateId = item.category_id;
                    $scope.newitem.saleStatus = 1;
                })

            }, function (data, status) {
                $ionicLoading.hide();
                $scope.hasProductInfo = true;
                $ionicPopup.alert({
                    title: '查找商品失败,请手动添加',
                    template: ''
                });
            });
        }

        $scope.newitem = {};

        $scope.openQRScaner = function(){
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $timeout(function(){
                        $scope.newitem.serialNo = result.text;
                    })
                },
                function (error) {
                    $ionicPopup.alert({
                        title: '查找商品失败,请手动添加',
                        template: ''
                    });
                }
            );
        }

        $scope.changeCategroy = function(currentCateId){
            $scope.newitem.currentCateId = currentCateId;
            for (var idx = 0; idx < $scope.info.categoryls.length; idx++) {
                if($scope.newitem.currentCateId == $scope.info.categoryls[idx].category_id){
                    $scope.selectCategory($scope.info.categoryls[idx]);
                    break;
                }
            }
        }


        $scope.AddItem = function() {

            $scope.newitem = {};
            $scope.hasProductInfo = false;
            if($scope.info.categoryls && $scope.info.categoryls.length){
                $timeout(function(){
                    $scope.newitem.currentCateId = $scope.info.categoryls[0].category_id;
                });
            }else{
                $timeout(function(){
                    $scope.newitem.currentCateId = 0;
                });
            }
            $scope.openModal();
        }



        $scope.saveItem = function(newitem){


            if(!newitem.currentCateId){
                $ionicPopup.alert({
                    title: '请选择商品分类',
                    template: ''
                });
                return;
            }

            if(!newitem.name){
                $ionicPopup.alert({
                    title: '请填写商品名称',
                    template: ''
                });
                return;
            }

            if(!newitem.price){
                $ionicPopup.alert({
                    title: '请填写商品价格',
                    template: ''
                });
                return;
            }

            var options ={'serialNo': newitem.serialNo,
                name: newitem.name,
                categoryId: newitem.currentCateId,
                count: newitem.count,
                score: newitem.score,
                price: newitem.price * 100,
                pic: newitem.pic,
                pic_url: newitem.pic_url,
                saleStatus: newitem.saleStatus,
                shop_id:$scope.info.shop.id
            };

            $scope.LoadingMessage = '正在添加,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.addItem(options,  function (data, status) {

                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '添加商品失败:' + data.msg,
                        template: ''
                    });
                    return;
                }
                var item = dataDetail.item;
                $scope.closeModal();
                $scope.addProducteForCurrentCategory(newitem.currentCateId,item);

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '添加商品失败:',
                    template: ''
                });
                $scope.closeModal();
            });
        }

        $ionicModal.fromTemplateUrl('templates/product-addNew.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.modal = modal;
            });

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


    }
]);