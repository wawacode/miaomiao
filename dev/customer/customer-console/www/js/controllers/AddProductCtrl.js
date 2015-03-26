;angular.module('miaomiao.console.controllers')
    .controller('AddProductCtrl', ['$scope', '$ionicPopup', '$ionicModal',
        'httpClient', 'localStorageService', '$timeout', '$ionicLoading', 'Camera', 'MMUtils',

        function ($scope, $ionicPopup, $ionicModal, httpClient, localStorageService, $timeout, $ionicLoading, Camera, MMUtils) {

            $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || [];
            $scope.info.hasProductInfo = false;
            $scope.info.newitem = {};

            $scope.findItem = function (serialNo, $event) {

                if ($event) {
                    $event.target.blur();
                }

                if (!serialNo) {
                    MMUtils.showAlert('请输入条形码');
                    return;
                }

                MMUtils.showLoadingIndicator('正在查找商品信息,请稍候...', $scope);

                httpClient.getItemInfo(serialNo, function (data, status) {

                    $ionicLoading.hide();
                    var code = data.code, dataDetail = data.data;
                    if (code != 0) {
                        MMUtils.showAlert('查找商品失败,请手动添加:' + data.msg);
                    }
                    $scope.info.hasProductInfo = true;
                    var item = dataDetail.product;
                    $timeout(function () {
                        $scope.info.newitem = item;
                        $scope.info.newitem.currentCateId = item.category_id;
                        $scope.info.newitem.saleStatus = 1;
                        $scope.info.newitem.new_pic_url = item.pic_url;
                        $scope.info.newitem.pic_url = item.pic_url;
                    });

                }, function (data, status) {
                    $ionicLoading.hide();
                    $scope.info.hasProductInfo = true;
                    MMUtils.showAlert('查找商品失败,请手动添加');

                });
            };

            $scope.openQRScaner = function () {
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $timeout(function () {
                            $scope.info.newitem.serialNo = result.text;
                            $scope.findItem($scope.info.newitem.serialNo);
                        })
                    },
                    function (error) {
                        MMUtils.showAlert('查找商品失败,请手动添加');
                    }
                );
            };

            $scope.inputReadyKeyup = function ($event) {
                if ($event.keyCode == 13) {
                    $event.target.blur();
                }
            };


            $scope.AddItem = function () {

                $scope.info.newitem = {};
                $scope.info.hasProductInfo = false;

                $ionicModal.fromTemplateUrl('templates/product-addnew.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                        $scope.modal = modal;
                        $scope.openModal();
                    });
            };


            $scope.saveItem = function () {

                var newitem = $scope.info.newitem;

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

                if (!newitem.new_pic_url && !newitem.pic_url) {
                    MMUtils.showAlert('请添加图片');
                    return;
                }

                var options = {'serialNo': newitem.serialNo,
                    name: newitem.name,
                    categoryId: newitem.currentCateId,
                    count: newitem.count,
                    score: newitem.score,
                    price: newitem.price * 100,
                    saleStatus: newitem.saleStatus,
                    pic_url: newitem.pic_url,
                    shop_id: $scope.info.shop.id
                };

                function addItemInfo(options, newitem) {

                    MMUtils.showLoadingIndicator('正在添加,请稍候...', $scope);

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

                if (newitem.hasNewPicture) {

                    MMUtils.showLoadingIndicator('正在上传图片,请稍候...', $scope);
                    httpClient.uploadPicForItem(newitem.serialNo, newitem.new_pic_url, $scope.info.shop.id, function (data, status) {
                        $ionicLoading.hide();
                        console.log('upload pic success:' + JSON.stringify(data));
                        /*
                         {"responseCode":200,"response":"{\"code\":0,\"data\":{\"url\":\"http://www.mbianli.com/cat/images/shop_1/6921355231922.jpg\"}}",
                         "bytesSent":4941747,"headers":{"Access-Control-Allow-Origin":"*","Server":"nginx/1.0.15",
                         "Content-Length":"86","Content-Type":"application/json;charset=UTF-8","Connection":"keep-alive",
                         "Date":"Mon, 23 Feb 2015 01:48:00 GMT"}}
                         * */
                        if (!data || !data.response) {
                            MMUtils.showAlert('上传图片失败:' + JSON.stringify(data));
                            return;
                        }

                        if (typeof(data.response) == 'string') {
                            data.response = eval("(" + data.response + ")");
                        }

                        var code = data.response.code, dataDetail = data.response.data;

                        console.log('upload pic success code is:' + code + " ,data :" + JSON.stringify(dataDetail));

                        if (parseInt(code) != 0) {
                            MMUtils.showAlert('上传图片失败:' + data.response.msg);
                            return;
                        }

                        options.pic_url = dataDetail.url;

                        addItemInfo(options, newitem);
                    }, function () {
                        $ionicLoading.hide();
                        MMUtils.showAlert('上传图片失败,请重试');
                    });
                } else {
                    addItemInfo(options, newitem);
                }
            };

            $ionicModal.fromTemplateUrl('templates/product-addnew.html', {
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

                $scope.info.newitem.new_pic_url = fileURI;
                $scope.info.newitem.hasNewPicture = true;
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