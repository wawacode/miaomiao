angular.module('miaomiao.console.controllers')

    .controller('SearchCtrl', function($scope, Algolia, $state, $timeout) {

        $scope.pageName = '搜索商品或者订单';

        $scope.focused= 'centered';
        $scope.searchTerm = '';
        $scope.posts = [];
        $scope.$on('$ionicView.beforeEnter', function(){
            $scope.starting = true;
            $scope.searching = false;
            $timeout(function(){$scope.starting = false},500)
        });

        $scope.search = function(searchTerm){
            if(searchTerm === '')return;
            $scope.posts = [];
            $scope.searching = true;
            document.getElementById('searchInput').blur();
        };
        $scope.$on('fpSearchBar.clear', function(){
            $scope.posts = [];
            $scope.searchTerm = '';
        });
    });