angular.module('miaomiao.console.controllers').controller('EditProductCtrl', ['$scope','$ionicPopup', '$ionicModal','httpClient','localStorageService','$ionicLoading','Camera',

    function ($scope, $ionicPopup, $ionicModal,httpClient,localStorageService,$ionicLoading,Camera) {

        $ionicModal.fromTemplateUrl('templates/product-edit.html', {
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


        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};

        $scope.editingItem = {};
        $scope.EditItem = function(item) {
            $scope.editingItem = item;
            $scope.openModal();
        }

        $scope.StickItem = function(item){

            $scope.LoadingMessage = '正在置顶,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.stickItem(item.id, item.category_id, $scope.info.shop.id, function (data, status) {
                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '置顶商品失败:' + data.msg,
                        template: ''
                    });
                    return;
                }
                $scope.closeModal();

                $scope.stickItemFromCurrentCategory(item);

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '置顶商品失败:',
                    template: ''
                });
                $scope.closeModal();
            });
        }

        function saveItemInfo(options,item){

            // update meta data
            $scope.LoadingMessage = '正在保存,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.updateItem(options, $scope.info.shop.id, function (data, status) {
                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '修改商品失败:' + data.msg,
                        template: ''
                    });
                    return;
                }
                $scope.closeModal();

                // update some fileds
                $scope.updateItemFromCurrentCategory(item);

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '修改商品失败:',
                    template: ''
                });
            });
        }

        $scope.saveItem = function(item){

            item.price = item.updated_price * 100;
            item.name = item.updated_name;

            var options = {'itemName': item.name,
                itemId: item.id,
                serialNo: item.serialNo,
                category_id: item.category_id,
                count: item.count,
                score: item.score,
                price: item.price,
                saleStatus: item.saleStatus
            }

            if(item.hasNewPicture){
                $scope.LoadingMessage = '正在上传图片,请稍候...';
                $ionicLoading.show({
                    templateUrl: 'templates/loadingIndicator.html',
                    scope: $scope
                });

                httpClient.uploadPicForItem(item.serialNo,item.pic_url,$scope.info.shop.id, function (data, status) {
                    $ionicLoading.hide();
                    var code = data.code, dataDetail = data.data;
                    if (code != 0) {
                        $ionicPopup.alert({
                            title: '上传图片失败,请重试:' + data.msg,
                            template: ''
                        });
                        return;
                    }
                    saveItemInfo(options,item);

                }, function (data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: '上传图片失败:',
                        template: ''
                    });
                });
            }else{
                saveItemInfo(options,item);
            }
        }

        $scope.deleteItem = function(item){

            $scope.LoadingMessage = '正在删除,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.deleteItem(item.id, $scope.info.shop.id, function (data, status) {
                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '删除失败:' + data.msg,
                        template: ''
                    });
                    return;
                }

                $scope.closeModal();

                $scope.deleteItemFromCurrentCategory(item);

            }, function (data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: '删除失败:',
                    template: ''
                });
                $scope.closeModal();
            });
        }

        var retries = 0;
        function clearCache() {
            navigator.camera.cleanup();
        }

        function onCapturePhoto(fileURI) {
            var win = function (r) {
                clearCache();
                retries = 0;
                alert('Done!');
            }

            var fail = function (error) {
                if (retries == 0) {
                    retries ++;
                    setTimeout(function() {
                        onCapturePhoto(fileURI)
                    }, 1000)
                } else {
                    retries = 0;
                    clearCache();
                    $ionicPopup.alert({
                        title: '上传照片失败:',
                        template: ''
                    });
                }
            }

            $scope.editingItem.pic_url = fileURI;
            $scope.editingItem.hasNewPicture = true;
        }

        $scope.getPhoto = function(item) {
            console.log('Getting camera');
            Camera.getPicture().then(onCapturePhoto, function(err) {
                console.err(err);
            }, {
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: false
            });
        }
    }
]);