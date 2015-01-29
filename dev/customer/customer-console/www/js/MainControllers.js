angular.module('miaomiao.console.controllers', ['ionic.services.analytics'])

.controller('MainCtrl', function($scope, $ionicTrack, cfpLoadingBar, $window){
  $scope.open = function(url){
    // Send event to analytics service
//    $ionicTrack.track('open', {
//      url: url
//    });

    // open the page in the inAppBrowser plugin. Falls back to a blank page if the plugin isn't installed
    var params = 'location=no,' +
      'enableViewportScale=yes,' +
      'toolbarposition=top,' +
      'closebuttoncaption=Done';
    var iab = window.open(url,'_blank',params);
    // cordova tends to keep these in memory after they're gone so we'll help it forget
    iab.addEventListener('exit', function() {
      iab.removeEventListener('exit', argument.callee);
      iab.close();
      iab = null;
    });
  };
  //make sure we always clear any existing loading bars before navigation
  $scope.$on('$ionicView.beforeLeave', function(){
    cfpLoadingBar.complete();
  });

  var halfHeight = null
  $scope.getHalfHeight = function(){
    if(ionic.Platform.isAndroid()) return 0;
    if(!halfHeight){
      halfHeight = (document.documentElement.clientHeight/2) - 200;
    }
    return halfHeight;
  }
});