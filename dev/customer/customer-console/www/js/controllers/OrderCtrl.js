angular.module('miaomiao.console.controllers')

    .controller('OrderCtrl', function ($scope, $rootScope,$ionicModal, $ionicPopup,$ionicLoading , $state
        , $timeout, $ionicScrollDelegate, httpClient,localStorageService,MMPushNotification,MMShopService, MMUtils) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose

        $scope.info = {};
        $scope.info.orders = [];
        $scope.info.notification_order_count = 1;
        $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};

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

        var canLoadMore = false;
        $scope.moreOrderCanBeLoaded = function(){
            return canLoadMore;
        };

        $scope.getOrdersInfo = function( from, offset, success,fail){

            httpClient.getMyOrders($scope.info.shop.id, from, offset, function (data, status) {

               var code = data.code, dataDetail = data.data;
                if (!code == 0) {
                    MMUtils.showAlert('加载数据失败');
                    canLoadMore = false;
                    return fail();
                }

                canLoadMore = false;
                if(dataDetail.orderls && dataDetail.orderls.length > 0 ){
                    canLoadMore = true;
                }

                success(dataDetail);

            }, function (data, status) {

                MMUtils.showAlert('加载数据失败');

                canLoadMore = false;
                return fail();
            });
        }



        function initData(){
            var from = 0, offset = 20;

            MMUtils.showLoadingIndicator('正在加载,请稍候...',$scope);

            $scope.getOrdersInfo(from,offset,function(dataDetail){

                $ionicLoading.hide();

                $scope.info.orders = dataDetail.orderls;
                transformOrderData($scope.info.orders);


            },function(){

                $ionicLoading.hide();

            });
        }

        initData();

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

        $ionicModal.fromTemplateUrl('templates/order-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.modal = modal;
            });

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.remove();
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

        $scope.callNumber = function(number){
            window.plugins.CallNumber.callNumber(function(){}, function(){}, number);
        }

        $scope.showOrderDetail = function(order) {

            $scope.order = order;
            $ionicModal.fromTemplateUrl('templates/order-detail.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                    $scope.modal = modal;
                    $scope.openModal();
                });

            // make api call
            if($scope.order.readed == false){
                httpClient.orderHasbeenRead($scope.info.shop.id, order.order_id, function (data, status) {
                    $scope.order.readed = true;
                }, function (data, status) {
                });
            }
        }

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function () {

        });

        MMShopService.onSwitchDefaultShopNotification($scope,function(){

            $scope.info.shop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP') || {};
            initData();

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
            $scope.info.notification_order_count = 0;

            $cordovaPush.setBadgeNumber(0).then(function (result) {
                console.log("Set badge success " + result)
            }, function (err) {
                console.log("Set badge error " + err)
            });
        })

    })

