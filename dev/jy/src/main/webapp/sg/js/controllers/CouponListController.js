;
angular.module('miaomiao.shop')
    .controller('CouponListCtrl', function ($scope, $ionicLoading, $http, $state, $ionicPopup, httpClient, ShopService,MMUtils) {

        $scope.shop = ShopService.getDefaultShop() || {};

        function updateCouponList() {

            MMUtils.showLoadingIndicator('正在加载优惠券...',$scope);
            var from = 0, offset = 100;
            httpClient.getAvailableCouponForUser(from, offset, function (data, status) {

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('加载数据失败:' + data.msg);
                    return;
                }

                $ionicLoading.hide();

                $scope.couponList = dataDetail.coupons;

                // todo: remove this
                $scope.couponList = [{'name':'coupon','validDate':'2015-5-2','value':20},
                    {'name':'coupon2','validDate':'2015-5-2','value':40}]

            }, function (data, status) {
                $scope.couponList = [];
                MMUtils.showAlert('加载数据失败,请刷新');
            })
        }

        $scope.$on("$ionicView.enter", function () {
            updateCouponList();
        });
    });

