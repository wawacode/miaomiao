angular.module('miaomiao.console.controllers').controller('EditProductCtrl', ['$scope','$ionicPopup', '$ionicModal','httpClient','localStorageService',

    function ($scope, $ionicPopup, $ionicModal,httpClient,localStorageService) {

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


        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};

        $scope.EditItem = function(item) {
            $scope.openModal();
        }

        $scope.StickItem = function(item){

            httpClient.stickItem(item.id, item.category_id, $scope.info.shop.id, function (data, status) {

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
                $ionicPopup.alert({
                    title: '置顶商品失败:',
                    template: ''
                });
                return;
                $scope.closeModal();
            });
        }

        $scope.saveItem = function(item){

            item.price = item.updated_price*100;
            item.name = item.updated_name;

            var options = {'itemName': item.name,
                itemId: item.id,
                serialNo: item.serialNo,
                category_id: item.category_id,
                count: item.count,
                score: item.score,
                price: item.price,
                pic: item.pic_url,
                saleStatus: item.saleStatus
            }

            httpClient.updateItem(options, $scope.info.shop.id, function (data, status) {

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
                $ionicPopup.alert({
                    title: '修改商品失败:',
                    template: ''
                });
                return;
                $scope.closeModal();
            });
        }

        $scope.deleteItem = function(item){

            httpClient.deleteItem(item.id, $scope.info.shop.id, function (data, status) {

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
                $ionicPopup.alert({
                    title: '删除失败:',
                    template: ''
                });
                $scope.closeModal();
                return;
            });
        }
    }
]);