angular.module('miaomiao.console.controllers')

    .controller('FrontPageCtrl', function($scope, HNFirebase, $state, cfpLoadingBar, $timeout, $ionicScrollDelegate) {
        $scope.pageName = 'Frontpage';
        cfpLoadingBar.start();
        HNFirebase.fetchTopStories();
        // just kicking the tires
        $scope.$on('$ionicView.afterEnter', function(){
            $timeout(function(){
                $scope.posts = HNFirebase.getTopStories();
                $ionicScrollDelegate.resize();
            },100);
        });

        $scope.$on('HNFirebase.topStoriesUpdated',function(){
            $scope.posts = HNFirebase.getTopStories();
        });

        $scope.$watch(function() {
            return HNFirebase.getTopStoriesPercentLoaded() ;
        }, function(percentComplete){
            if(percentComplete >= 1){
                $scope.$broadcast('scroll.refreshComplete');
                cfpLoadingBar.complete();
            }else{
                cfpLoadingBar.set(percentComplete);
            }
        });

        $timeout(function(){
            if($scope.posts.length < 1){
                cfpLoadingBar.complete();
                $scope.timesUp = true;
            }
        },5000);

        $scope.loadComments = function(storyID, commentNum, $event){
            $event.stopPropagation();
            if(commentNum) $state.go('tab.front-page-comments',{storyID:storyID});
        };
    });