angular.module('miaomiao.shop')
    .controller('AddAddressCtrl', function ($scope, $ionicLoading,$ionicPopup, $http, $state, localStorageService,httpClient,AddressService,MMUtils) {

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

                $state.go('checkout',null, { reload: true });

                AddressService.addressChangeEventAddNew($scope.address);


            },function(data, status){

                $ionicLoading.hide();

                $ionicPopup.alert({
                    title: '添加新地址失败,请刷新',
                    template: ''
                });

                $state.go('addressList');
            })
        }

        $scope.addNewAddressCancel = function(){

            $state.go('checkout', null, { reload: false });

        }

        $scope.$on("$ionicView.enter", function () {
            $scope.address.address = '';
            $scope.address.phone = '';
        });


    });

