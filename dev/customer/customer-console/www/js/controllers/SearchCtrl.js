angular.module('miaomiao.console.controllers')

    .controller('SearchCtrl', function($scope, Algolia, $state, $timeout) {
        $scope.focused= 'centered';
        $scope.searchTerm = '';
        $scope.posts = [];
        $scope.$on('$ionicView.beforeEnter', function(){
            $scope.starting = true;
            $scope.searching = false;
            $timeout(function(){$scope.starting = false},500)
        });
        if(typeof localStorage.searchCache != 'undefined'){
            var sc = JSON.parse(localStorage.searchCache);
            $scope.searchTerm = sc.term;
            $scope.posts = sc.results;
            $scope.focused = 'left';
        }
        $scope.search = function(searchTerm){
            if(searchTerm === '')return;
            $scope.posts = [];
            $scope.searching = true;
            document.getElementById('searchInput').blur();
            Algolia.search(searchTerm).then(function(searchResults){
                $timeout(function(){$scope.posts = searchResults.hits;},500);
                localStorage.searchCache = JSON.stringify({term:searchTerm,results:searchResults.hits});
                $scope.searching = false;
                $scope.error = false;
            },function(){
                $scope.posts = [];
                $scope.searching = false;
                $scope.error = true;
            });
        };
        $scope.$on('fpSearchBar.clear', function(){
            $scope.posts = [];
            $scope.searchTerm = '';
            delete localStorage.searchCache;
        });
        $scope.loadComments = function(storyID){
            $state.go('tab.search-comments',{storyID:storyID});
        }
    });