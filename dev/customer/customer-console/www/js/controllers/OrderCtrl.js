angular.module('miaomiao.console.controllers')

    .controller('OrderCtrl', function ($scope, $ionicPopup,$ionicLoading , $state, cfpLoadingBar, $timeout, $ionicScrollDelegate, httpClient,localStorageService) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose
        $scope.pageName = '订单';

        $scope.info = {};
        $scope.info.orders = [];
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};

        function transformOrderData(orders){
            if(!orders) return;
            for(var i=0;i< orders.length;i++){
                var order = orders[i];
                try{
                    order.items = JSON.parse(order.info);
                }catch (e){

                }
            }
        }

        $scope.moreOrderCanBeLoaded = false;

        $scope.getOrdersInfo = function( from, offset, success,fail){

            httpClient.getMyOrders($scope.info.shop.id, from, offset, function (data, status) {

               var code = data.code, dataDetail = data.data;
                if (!code == 0) {
                    $ionicPopup.alert({
                        title: '加载数据失败',
                        template: ''
                    });
                    $scope.moreOrderCanBeLoaded = false;
                    return;
                }
                $scope.moreOrderCanBeLoaded = true;
                success(dataDetail);

            }, function (data, status) {

                $ionicPopup.alert({
                    title: '加载数据失败',
                    template: ''
                });
                $scope.moreOrderCanBeLoaded = false;
                return fail();
            });
        }

        $timeout(function(){

            var from = 0, offset = 20;

            $scope.LoadingMessage = '正在加载,请稍候...';
            $ionicLoading.show({
                templateUrl: 'templates/loadingIndicator.html',
                scope: $scope
            });

            $scope.getOrdersInfo(from,offset,function(dataDetail){

                $ionicLoading.hide();

                $scope.info.orders = dataDetail.orders;
                transformOrderData($scope.info.orders);

            },function(){

                $ionicLoading.hide();

            })
        })



        $scope.addOrders = function () {

            if(!$scope.info.orders.length) return;
            var from = $scope.info.orders.length, offset = 20;

            $scope.getOrdersInfo(from,offset,function(dataDetail){

                $scope.info.orders.concat(dataDetail.orders);
                transformOrderData( $scope.info.orders);

                $scope.$broadcast('scroll.infiniteScrollComplete');

            },function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }

        $scope.doRefresh = function(){

            $scope.info.orders = $scope.info.orders || [];
            var from = 0, offset = 20;

            $scope.getOrdersInfo(from,offset,function(dataDetail){

                $scope.$broadcast('scroll.refreshComplete');

                $scope.info.orders = dataDetail.orders;
                transformOrderData($scope.info.orders);

            },function(){
                $scope.$broadcast('scroll.refreshComplete');

            })
        }

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

    })

