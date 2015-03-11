;
angular.module('miaomiao.shop')
    .controller('AddressListCtrl', function ($scope, $ionicLoading, $http, $state, $ionicPopup, localStorageService, httpClient, AddressService, ShopService,MMUtils) {

        $scope.shop = ShopService.getDefaultShop() || {};

        function updateAddress() {

            MMUtils.showLoadingIndicator('正在加载地址列表...',$scope);

            httpClient.getAddressList($scope.shop.id, function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('加载数据失败:' + data.msg);
                    return;
                }

                $ionicLoading.hide();

                $scope.shop = dataDetail.shop;
                $scope.addressls = dataDetail.addressls || [];

                if ($scope.addressls && $scope.addressls.length) {
                    $scope.addressls[0].isDefault = true;
                }

            }, function (data, status) {
                $scope.addressls = [];
                MMUtils.showAlert('加载数据失败,请刷新');
            })
        }

        $scope.goToAddNewAddress = function () {
            $state.go('addAddress');
        };

        $scope.setDefaultAddress = function (addr) {

            for (var i = 0; i < $scope.addressls.length; i++) {
                $scope.addressls[i].isDefault = false;
            }
            addr.isDefault = true;

            MMUtils.showLoadingIndicator('正在切换默认地址...',$scope);

            httpClient.setDefaultAddress($scope.shop.id, addr, function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('切换默认地址失败:' + data.msg);
                    return;
                }

                $ionicLoading.hide();

                $state.go('checkout', null, { reload: true });

                AddressService.addressChangeEventSwitchDefault(addr);


            }, function (data, status) {

                $ionicLoading.hide();

                MMUtils.showAlert('切换默认地址失败');
            })
        };

        $scope.addNewAddressConfirm = function () {

            if (!$scope.newAddress.address || !$scope.newAddress.phone || !MMUtils.isValidTelNumber($scope.newAddress.phone)) {
                MMUtils.showAlert('请填写正确的地址电话');
                return;
            }
            MMUtils.showLoadingIndicator('正在添加新地址...',$scope);

            httpClient.addAddress($scope.shop.id, $scope.newAddress, function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('添加新地址失败:' + data.msg);
                    return;
                }

                $ionicLoading.hide();

                $state.go('checkout', null, { reload: true });

                AddressService.addressChangeEventAddNew($scope.newAddress);


            }, function (data, status) {

                $ionicLoading.hide();
                MMUtils.showAlert('添加新地址失败,请刷新');
            })
        };

        $scope.$on("$ionicView.enter", function () {
            $scope.newAddress = {};
            updateAddress();
        });


    });

