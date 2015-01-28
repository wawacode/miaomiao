angular.module('miaomiao.console.controllers')

    .controller('OrderCtrl', function($scope, $ionicPopup, $state, cfpLoadingBar, $timeout, $ionicScrollDelegate,httpClient) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose
        $scope.pageName = '订单';
        cfpLoadingBar.start();
        $scope.info = {};
        function transformOrderData(orders){
            if(!orders) return;
            for(var i=0;i< orders.length;i++){
                var order = orders[i];
                try{
                    order.items = JSON.parse(order.snapshot);
                }catch (e){

                }
            }
        }

        $scope.info.shopid = 1;
        httpClient.getMyOrders($scope.info.shopid || 1, function (data, status) {

            var code = data.code, dataDetail = data.data;
            if (!code == 0) {
                $ionicPopup.alert({
                    title: '加载数据失败',
                    template: ''
                });
                return;
            }

            $scope.info.orders = dataDetail.orders;
            transformOrderData($scope.info.orders);

        }, function (data, status) {
            $ionicPopup.alert({
                title: '加载数据失败',
                template: ''
            });
            return;
        });

        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function(){
            $timeout(function(){
                $scope.posts = [];
                $ionicScrollDelegate.resize();
            },100);
        });


        var percentComplete = 1;
        if(percentComplete >= 1){
            $scope.$broadcast('scroll.refreshComplete');
            cfpLoadingBar.complete();
        }else{
            cfpLoadingBar.set(percentComplete);
        }

        $timeout(function(){
            if($scope.posts.length < 1){
                cfpLoadingBar.complete();
                $scope.timesUp = true;
            }
        },5000);
    })

