angular.module("miaomiao.shop").controller("ProductDetailCtrl",["$scope","$ionicModal",function($scope,$ionicModal){$ionicModal.fromTemplateUrl("/views/sg/templates/productPreview.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function(){$scope.modal.hide();};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){});$scope.$on("modal.removed",function(){});$scope.$on("modal.shown",function(){});$scope.imageSrc="http://ionicframework.com/img/ionic-logo-blog.png";$scope.showImage=function(item){$scope.imageSrc=item.pic_url;$scope.openModal();};}]);