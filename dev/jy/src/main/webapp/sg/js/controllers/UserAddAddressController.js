angular.module('miaomiao.shop')
    .controller('UserAddAddressCtrl', function ($scope, $ionicPopup,$ionicLoading, $http, $state, localStorageService,httpClient,$sessionStorage,AddressService) {

        $scope.shop = localStorageService.get('MMMETA_shop');
        $scope.address = {};

        function isValidTelNumber(number) {
            var regPhone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
            var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
            return regPhone.test(number) || regMobile.test(number);
        }

        $scope.addNewAddressConfirm = function(){

            if(!$scope.address.address || !$scope.address.phone || !isValidTelNumber($scope.address.phone)){

                $ionicPopup.alert({
                    title: '请填写正确的地址电话',
                    template: ''
                });

                return;
            }

            $ionicLoading.show({
                template: '正在添加新地址...'
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

                AddressService.addressChangeEventAddNew($scope.address);

                $state.go('myOrders',null, { reload: true });


            },function(data, status){

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

