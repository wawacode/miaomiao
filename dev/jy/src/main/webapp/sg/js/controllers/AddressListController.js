angular.module('miaomiao.shop')
    .controller('AddressListCtrl', function ($scope, $ionicLoading, $http, $state, localStorageService,httpClient,AddressService,MMUtils) {

        $scope.shop = localStorageService.get('MMMETA_shop');

        function updateAddress(){
            $scope.LoadingMessage = '正在加载地址列表...';
            $ionicLoading.show({
                templateUrl: '/views/sg/templates/loadingIndicator.html',
                scope: $scope
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
        }

        $scope.goToAddNewAddress = function(){
            $state.go('addAddress');
        }

        $scope.setDefaultAddress = function(addr){

            for(var i=0;i< $scope.addressls.length;i++){
                $scope.addressls[i].isDefault = false;
            }
            addr.isDefault = true;

            $scope.LoadingMessage = '正在切换默认地址...';
            $ionicLoading.show({
                templateUrl: '/views/sg/templates/loadingIndicator.html',
                scope: $scope
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

                $state.go('checkout',null, { reload: true });

                AddressService.addressChangeEventSwitchDefault(addr);


            },function(data, status){

                $ionicLoading.hide();

                $ionicPopup.alert({
                    title: '加载数据失败,请刷新',
                    template: ''
                });
            })
        }

        $scope.addNewAddressConfirm = function(){

            if(!$scope.newAddress.address || !$scope.newAddress.phone || !MMUtils.isValidTelNumber($scope.newAddress.phone)){

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

            httpClient.addAddress($scope.shop.id, $scope.newAddress, function(data, status){

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

                AddressService.addressChangeEventAddNew($scope.newAddress);


            },function(data, status){

                $ionicLoading.hide();

                $ionicPopup.alert({
                    title: '添加新地址失败,请刷新',
                    template: ''
                });
            })
        }

        $scope.$on("$ionicView.enter", function () {
            $scope.newAddress = {};
            updateAddress();
        });


    });

