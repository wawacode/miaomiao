angular.module('miaomiao.console.controllers')

    .controller('OrderCtrl', function ($scope, $rootScope, $ionicPopup,$ionicLoading , $state, cfpLoadingBar, $timeout, $ionicScrollDelegate, httpClient,localStorageService,MMPushNotification) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose
        $scope.pageName = '订单';

        $scope.info = {};
        $scope.info.orders = [];
        $scope.info.notification_order_count = 1;
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_SHOP') || {};

        function transformOrderData(orders){
            if(!orders) return;
            for(var i=0;i< orders.length;i++){
                var order = orders[i];
                order.read = false;
                try{
                    order.items = JSON.parse(order.info);
                }catch (e){

                }
            }
        }

        var canLoadMore = false;
        $scope.moreOrderCanBeLoaded = function(){
            return canLoadMore;
        };

        $scope.getOrdersInfo = function( from, offset, success,fail){

            httpClient.getMyOrders($scope.info.shop.id, from, offset, function (data, status) {

               var code = data.code, dataDetail = data.data;
                if (!code == 0) {
                    $ionicPopup.alert({
                        title: '加载数据失败',
                        template: ''
                    });
                    canLoadMore = false;
                    return fail();
                }
                canLoadMore = true;
                success(dataDetail);

            }, function (data, status) {

                $ionicPopup.alert({
                    title: '加载数据失败',
                    template: ''
                });
                canLoadMore = false;
                return fail();
            });
        }

        var from = 0, offset = 20;

        $scope.LoadingMessage = '正在加载,请稍候...';
        $ionicLoading.show({
            templateUrl: 'templates/loadingIndicator.html',
            scope: $scope
        });

        $scope.getOrdersInfo(from,offset,function(dataDetail){

            $ionicLoading.hide();

            $scope.info.orders = dataDetail.orderls;
            transformOrderData($scope.info.orders);

        },function(){

            $ionicLoading.hide();

        });


        $scope.addOrders = function () {

            if(!$scope.info.orders.length) return;
            var from = $scope.info.orders.length, offset = 20;

            $scope.getOrdersInfo(from,offset,function(dataDetail){

                $scope.info.orders = $scope.info.orders.concat(dataDetail.orderls);
                transformOrderData( $scope.info.orders);

                $scope.$broadcast('scroll.infiniteScrollComplete');

            },function(){
                $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        }

        $scope.doRefresh = function(){

            var from = 0, offset = 20;

            $scope.getOrdersInfo(from,offset,function(dataDetail){

                $scope.$broadcast('scroll.refreshComplete');

                transformOrderData(dataDetail.orderls);

                // flat which ones are read
                for(var i=0;i< dataDetail.orderls.length;i++){
                    for(var j =0; j< $scope.info.orders.length;j++){
                            if(dataDetail.orderls[i].order_id == $scope.info.orders[j].order_id){
                                dataDetail.orderls[i].read = $scope.info.orders[j].read;
                            }
                     }
                }
                $scope.info.orders = dataDetail.orderls;
                $rootScope.$broadcast('orderScroll.refreshComplete');

            },function(){
                $scope.$broadcast('scroll.refreshComplete');
                $rootScope.$broadcast('orderScroll.refreshComplete');
            })
        }

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

    }).controller('orderTabCtrl', function($scope, $timeout , MMPushNotification,$cordovaPush) {

        $scope.info = {};
        $scope.info.notification_order_count = 0;

        MMPushNotification.onNewOrderNotificationReceived($scope,function(message){
            console.log(message);
            var data = message.data;
            $timeout(function(){
                var count = data && data.count || 0;
                $scope.info.notification_order_count += count;
            });
        });

        $scope.$on('orderScroll.refreshComplete',function(){
            // should see all the lastest, so clear all nofitcaiton number
            console.log('after refresh we reset count');
            $scope.info.notification_order_count = 0;

            console.log('we are in setting badge');
            $cordovaPush.setBadgeNumber(0).then(function (result) {
                console.log("Set badge success " + result)
            }, function (err) {
                console.log("Set badge error " + err)
            });
        })
    })

