angular.module('miaomiao.console.controllers').controller('AddProductCtrl', ['$scope','$ionicPopup', '$ionicModal','httpClient','localStorageService','$timeout',

    function ($scope, $ionicPopup ,$ionicModal,httpClient,localStorageService,$timeout) {

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

        $scope.newitem = {};

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

        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};

        $scope.saveItem = function(newitem){

            var options ={'serialNo': newitem.serialNo,
                name: newitem.name,
                categoryId: newitem.currentCateId,
                count: newitem.count,
                score: newitem.score,
                price: newitem.price * 100,
                pic: newitem.pic,
                saleStatus: newitem.saleStatus
            };

            httpClient.addItem(options, $scope.info.shop.id, function (data, status) {

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
                $ionicPopup.alert({
                    title: '添加商品失败:',
                    template: ''
                });
                return;
                $scope.closeModal();
            });
        }
    }
]);