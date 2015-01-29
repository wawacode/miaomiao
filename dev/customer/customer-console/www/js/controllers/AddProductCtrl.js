angular.module('miaomiao.console.controllers').controller('AddProductCtrl', ['$scope','$ionicPopup', '$ionicModal','httpClient','localStorageService',

    function ($scope, $ionicPopup ,$ionicModal,httpClient,localStorageService) {

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

        $scope.AddItem = function(cateId) {
            $scope.currentCateId = cateId;
            $scope.openModal();
        }

        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};

        $scope.saveItem = function(item){

            var options ={'serialNo': item.serialNo,
                name: item.name,
                categoryId: $scope.currentCateId,
                count: item.count,
                score: item.score,
                price_new: item.price * 100,
                pic: item.pic
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
                $scope.closeModal();

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