angular.module('miaomiao.console.controllers')

    .controller('ProductListCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicModal, $state,
                                             cfpLoadingBar, $timeout, $ionicScrollDelegate, localStorageService,
                                             httpClient,MMShopService, Camera,MMProductService,MMUtils) {

        $scope.info = $scope.info || {};
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};

        var hasData = false;
        // handler change category notification
        MMProductService.onSwitchCategoryNotification($scope,function(message){

            var data = message.data;
            $scope.selectedIndex = data.index;
            $scope.category = MMProductService.getCategoryForIndex($scope.selectedIndex);

            hasData = true;

            $timeout(function(){

                $scope.items = $scope.category.itemls;

                // wait for items to render
                $timeout(function(){
                    $ionicScrollDelegate.resize();
                    $ionicScrollDelegate.$getByHandle('productScroll').scrollTop();
                },500);

            });

        });

        // handler change category notification
        MMProductService.onRenderDataNotification($scope,function(message){

            var data = message.data;
            $timeout(function(){
                $scope.items = data;
                $ionicScrollDelegate.resize();
            });
        });

        $scope.moreDataCanBeLoaded = function () {
            if(!hasData)return false;
            return $scope.category && $scope.category.canLoadMore;
        }


        $scope.addItems = function (idx) {

            var idx = $scope.selectedIndex,
                cateId = $scope.category.category_id ,
                from = $scope.category.scrollIndex,  //$scope.info.currentDisplayCategory.itemls.length,
                offset = 20;

            MMProductService.setInLoadingMoreFlag(true);

            httpClient.getMoreProductList($scope.info.shop.id, cateId, from, offset, function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (!code == 0 || dataDetail.itemls.length == 0) {
                    // set flags
                    MMProductService.setInLoadingMoreFlag(false);
                    MMProductService.setCanLoadMoreFlagForIndex(idx,false);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $ionicScrollDelegate.$getByHandle('productScroll').resize();
                    return;
                }

                MMProductService.setInLoadingMoreFlag(false);

                MMProductService.addMoreItemsForCategoryId(cateId,dataDetail.itemls);

                $scope.category = MMProductService.getCategoryForIndex(idx);

                $timeout(function(){

                    $scope.items = $scope.category.itemls;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $ionicScrollDelegate.resize();
                });

            }, function (data, status) {

                MMProductService.setInLoadingMoreFlag(false);
                MMProductService.setCanLoadMoreFlagForIndex(idx,false);

                $scope.$broadcast('scroll.infiniteScrollComplete');

            });
        }

        $scope.deleteItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.category;
            if(!currentCategory)return;

            var index = currentCategory.itemls.indexOf(item);
            if (index > -1) {
                $timeout(function(){
                    currentCategory.itemls.splice(index, 1);
                    MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);
                });
            }
        }

        $scope.stickItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.category;
            if(!currentCategory)return;

            var index = currentCategory.itemls.indexOf(item);
            if (index != -1) {
                $timeout(function () {
                    currentCategory.itemls.splice(index, 1);
                    currentCategory.itemls.unshift(item);
                    MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);
                });
            }
        }

        $scope.updateItemFromCurrentCategory = function (item) {

            var currentCategory = $scope.category;
            if(!currentCategory)return;

            var index = currentCategory.itemls.indexOf(item);
            if (index != -1) {
                // do more update
                $timeout(function () {

                    // update pic if success, which means item has new pic
                    if(item.new_pic_url && item.new_pic_url != item.pic_url){
                        item.pic_url = item.new_pic_url;
                    }

                    currentCategory.itemls.splice(index, 1,item);

                    MMProductService.setCategoryForIndex($scope.selectedIndex,currentCategory);

                });
            }
        }

        $scope.cancelEdit =function($event){
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.close();
            }
            $scope.closeModal();
        }

        $scope.inputReadyKeyup = function($event){
//            console.log('keycode is:' + $event.keyCode);
            if($event.keyCode == 13)
            {
                $event.target.blur();
            }
        }

        $scope.info.editingItem = {};

        $ionicModal.fromTemplateUrl('templates/product-edit.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function($event) {
            $scope.modal.remove();

            $timeout(function(){
                closeKeyboard();
            })
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
            // Execute action
            $scope.refreshCurrentCategory();
        });

        $scope.EditItem = function(item) {

            // for product edit
            $scope.editingItem = item;
            $scope.editingItem.hasNewPicture = false; // reset to default

            $ionicModal.fromTemplateUrl('templates/product-edit.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                    $scope.modal = modal;
                    $scope.openModal();
            });
        }

        $scope.StickItem = function(item){

            MMUtils.showLoadingIndicator('正在置顶,请稍候...',$scope);

            httpClient.stickItem(item.id, item.category_id, $scope.info.shop.id, function (data, status) {
                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('置顶商品失败:' + data.msg);
                    return;
                }
                $scope.closeModal();

                $scope.stickItemFromCurrentCategory(item);

            }, function (data, status) {
                $ionicLoading.hide();
                MMUtils.showAlert('置顶商品失败');
                $scope.closeModal();
            });
        }

        function closeKeyboard(){
            // in case some input has focus
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.close();
            }
        }

        function _saveItemInfo(options,item){

            MMUtils.showLoadingIndicator('正在保存,请稍候...',$scope);

            httpClient.updateItem(options, $scope.info.shop.id, function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('修改商品失败:' + data.msg);
                    return;
                }

                $scope.closeModal();
                // update some fileds
                $scope.updateItemFromCurrentCategory(item);

            }, function (data, status) {
                $ionicLoading.hide();
                MMUtils.showAlert('修改商品失败');
            });
        }

        $scope.saveItem = function(item,$event){

            if($event){
                $event.target.parentElement.focus()
            }

            item.price = item.updated_price * 100;
            item.name = item.updated_name;

            var options = {'itemName': item.name,
                itemId: item.id,
                serialNo: item.serialNo,
                category_id: item.category_id,
                count: item.count,
                score: item.score,
                price: item.price,
                saleStatus: item.status
            }

            if(item.hasNewPicture){

                MMUtils.showLoadingIndicator('正在上传图片,请稍候...',$scope);

                // file transfer success
                httpClient.uploadPicForItem(item.serialNo,item.new_pic_url,$scope.info.shop.id, function (data, status) {
                    $ionicLoading.hide();
                    console.log('upload pic success:'+ data);

                    _saveItemInfo(options,item);

                }, function (data, status) {
                    $ionicLoading.hide();
                    MMUtils.showAlert('上传图片失败,请重试');
                });
            }else{
                _saveItemInfo(options,item);
            }
        }

        $scope.deleteItem = function(item){

            MMUtils.showLoadingIndicator('正在删除,请稍候...',$scope);

            httpClient.deleteItem(item.id, $scope.info.shop.id, function (data, status) {
                $ionicLoading.hide();
                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('删除失败:' + data.msg);
                    return;
                }

                $scope.closeModal();

                $scope.deleteItemFromCurrentCategory(item);

            }, function (data, status) {
                $ionicLoading.hide();
                MMUtils.showAlert('删除失败');
                $scope.closeModal();
            });
        }

        // for photo taking
        function clearCache() {
            navigator.camera.cleanup();
        }

        function onCapturePhoto(fileURI) {

            $scope.editingItem.new_pic_url = fileURI;
            $scope.editingItem.hasNewPicture = true;
        }

        $scope.getPhoto = function(item,$event) {

            $event.stopPropagation();

            Camera.getPicture().then(onCapturePhoto, function(err) {
                console.err(err);
            }, {
                quality: 25,
                targetWidth: 320,
                targetHeight: 320,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                saveToPhotoAlbum: false
            });
        }
    })
