angular.module('miaomiao.console.controllers')

    .controller('OrderCtrl', function($scope, HNFirebase, $state, cfpLoadingBar, $timeout, $ionicScrollDelegate) {
        // This is nearly identical to FrontPageCtrl and should be refactored so the pages share a controller,
        // but the purpose of this app is to be an example to people getting started with angular and ionic.
        // Therefore we err on repeating logic and being verbose
        $scope.pageName = '订单';
        cfpLoadingBar.start();

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

