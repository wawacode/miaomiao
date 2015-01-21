angular.module('miaomiao.shop')
    .controller('AddressListCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService,httpClient,AddressService) {

        $scope.shop = localStorageService.get('MMMETA_shop');

        $ionicLoading.show({
            template: '正在加载地址列表...'
        });

        httpClient.getAddressList($scope.shop.id ,function(data, status){

            var code = data.code, dataDetail = data.data;
            if (code != 0) {
                $ionicPopup.alert({
                    title: '加载数据失败:' + data.msg,
                    template: ''
                });
                return;
            }

            $ionicLoading.hide();

            $scope.shop = dataDetail.shop;
            $scope.addressls = dataDetail.addressls || [];

            if($scope.addressls && $scope.addressls.length){
                $scope.addressls[0].isDefault = true;
            }

        },function(data, status){
            $scope.addressls = [];
            $ionicPopup.alert({
                title: '加载数据失败,请刷新',
                template: ''
            });
        })

        $scope.goToAddNewAddress = function(){
            $state.go('addAddress');
        }

        $scope.setDefaultAddress = function(addr){

            for(var i=0;i< $scope.addressls.length;i++){
                $scope.addressls[i].isDefault = false;
            }
            addr.isDefault = true;

            $ionicLoading.show({
                template: '正在切换默认地址...'
            });

            httpClient.setDefaultAddress($scope.shop.id, addr, function(data, status){

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    $ionicPopup.alert({
                        title: '切换默认地址:' + data.msg,
                        template: ''
                    });
                    return;
                }

                $ionicLoading.hide();

                AddressService.addressChangeEventSwitchDefault(addr);

                $state.go('checkout',null, { reload: true });


            },function(data, status){

                $ionicPopup.alert({
                    title: '加载数据失败,请刷新',
                    template: ''
                });
            })
        }


    });

