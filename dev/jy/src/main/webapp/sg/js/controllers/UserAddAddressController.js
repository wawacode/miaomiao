angular.module('miaomiao.shop')
    .controller('UserAddAddressCtrl', function ($scope, $ionicPopup,$ionicLoading, $http, $state,
                                                localStorageService,httpClient,$sessionStorage,AddressService,MMUtils) {

        $scope.shop = localStorageService.get('MMMETA_shop');
        $scope.address = {};

        $scope.addNewAddressConfirm = function(){

            if(!$scope.address.address || !$scope.address.phone || !MMUtils.isValidTelNumber($scope.address.phone)){

                $ionicPopup.alert({
                    title: '请填写正确的地址电话',
                    template: ''
                });

                return;
            }

            $scope.LoadingMessage = '正在添加新地址...';
            $ionicLoading.show({
                templateUrl: '/views/sg/templates/loadingIndicator.html',
                scope: $scope
            });

            httpClient.addAddress($scope.shop.id, $scope.address, function(data, status){

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '添加新地址失败:' + data.msg,
                        template: ''
                    });
                    return;
                }

                $ionicLoading.hide();

                AddressService.addressChangeEventAddNew($scope.address);

                $state.go('myOrders',null, { reload: true });


            },function(data, status){

                $ionicLoading.hide();

                $ionicPopup.alert({
                    title: '添加新地址失败,请刷新',
                    template: ''
                });

                $state.go('userAddressList');
            })
        }

        $scope.addNewAddressCancel = function(){

            $state.go('myOrders', null, { reload: false });

        }
    });

