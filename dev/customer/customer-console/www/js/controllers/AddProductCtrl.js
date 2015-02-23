angular.module('miaomiao.console.controllers').controller('AddProductCtrl', ['$scope', '$ionicPopup', '$ionicModal',
    'httpClient', 'localStorageService', '$timeout', '$ionicLoading', 'Camera','MMUtils',

    function ($scope, $ionicPopup, $ionicModal, httpClient, localStorageService, $timeout, $ionicLoading, Camera,MMUtils) {

        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || [];
        $scope.hasProductInfo = false;

        $scope.findItem = function (serialNo,$event) {

            if($event){
                $event.target.blur();
            }

            if (!serialNo) {
                MMUtils.showAlert('请输入条形码');
                return;
            }

            MMUtils.showLoadingIndicator('正在查找商品信息,请稍候...',$scope);

            httpClient.getItemInfo(serialNo, function (data, status) {

                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('查找商品失败,请手动添加:' + data.msg);
                }
                $scope.hasProductInfo = true;
                var item = dataDetail.product;
                $timeout(function () {
                    $scope.newitem = item;
                    $scope.newitem.currentCateId = item.category_id;
                    $scope.newitem.saleStatus = 1;
                })

            }, function (data, status) {
                $ionicLoading.hide();
                $scope.hasProductInfo = true;
                MMUtils.showAlert('查找商品失败,请手动添加');

            });
        }

        $scope.newitem = {};

        $scope.openQRScaner = function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $timeout(function () {
                        $scope.newitem.serialNo = result.text;
                        $scope.findItem($scope.newitem.serialNo);
                    })
                },
                function (error) {
                    MMUtils.showAlert('查找商品失败,请手动添加');
                }
            );
        }

        $scope.inputReadyKeyup = function($event){
            if($event.keyCode == 13)
            {
                $event.target.blur();
            }
        }


        $scope.AddItem = function () {

            $scope.newitem = {};
            $scope.hasProductInfo = false;

            $scope.openModal();
        }


        $scope.saveItem = function (newitem) {

            if (!newitem.currentCateId) {
                MMUtils.showAlert('请选择商品分类');
                return;
            }

            if (!newitem.name) {
                MMUtils.showAlert('请填写商品名称');
                return;
            }

            if (!newitem.price) {
                MMUtils.showAlert('请填写商品价格');
                return;
            }

            var options = {'serialNo': newitem.serialNo,
                name: newitem.name,
                categoryId: newitem.currentCateId,
                count: newitem.count,
                score: newitem.score,
                price: newitem.price * 100,
                saleStatus: newitem.saleStatus,
                shop_id: $scope.info.shop.id
            };

            function addItemInfo(options, newitem) {

                MMUtils.showLoadingIndicator('正在添加,请稍候...',$scope);

                httpClient.addItem(options, function (data, status) {

                    $ionicLoading.hide();
                    var code = data.code, dataDetail = data.data;
                    if (code != 0) {
                        MMUtils.showAlert('添加商品失败:' + data.msg);
                        return;
                    }
                    var item = dataDetail.item;

                    $scope.closeModal();

                    $scope.addProductForCategory(newitem.currentCateId, item);

                }, function (data, status) {
                    $ionicLoading.hide();
                    MMUtils.showAlert('添加商品失败');
                    $scope.closeModal();
                });
            }

            if(newitem.hasNewPicture){

                MMUtils.showLoadingIndicator('正在上传图片,请稍候...',$scope);
                httpClient.uploadPicForItem(newitem.serialNo, newitem.new_pic_url, $scope.info.shop.id, function (data, status) {
                    $ionicLoading.hide();
                    var code = data.code, dataDetail = data.data;
                    if (code != 0) {
                        MMUtils.showAlert('上传图片失败,请重试:' + data.msg);
                        return;
                    }
                    addItemInfo(options, newitem);
                },function(){
                    $ionicLoading.hide();
                    MMUtils.showAlert('上传图片失败,请重试');
                });
            }else{
                addItemInfo(options, newitem);
            }
        }

        $ionicModal.fromTemplateUrl('templates/product-addNew.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
                $scope.modal = modal;
            });

        $scope.openModal = function () {
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
        $scope.$on('modal.shown', function () {

        });

        function clearCache() {
            navigator.camera.cleanup();
        }

        function onCapturePhoto(fileURI) {

            $scope.newitem.new_pic_url = fileURI;
            $scope.newitem.hasNewPicture = true;
        }

        $scope.getPhoto = function () {

            Camera.getPicture().then(onCapturePhoto, function (err) {
                console.err(err);
            }, {
                quality: 25,
                targetWidth: 320,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: false
            });
        }
    }
]);