angular.module("miaomiao.console.controllers").controller("ShopListCtrl",["$scope","$state","$filter","$ionicPopup","$ionicModal","localStorageService","$ionicLoading","httpClient","$ionicScrollDelegate","$timeout",function($scope,$state,$filter,$ionicPopup,$ionicModal,localStorageService,$ionicLoading,httpClient,$ionicScrollDelegate,$timeout){$ionicModal.fromTemplateUrl("templates/shop-list.html",{scope:$scope,animation:"slide-in-up"}).then(function(modal){$scope.modal=modal;});$scope.info={};$scope.info.shoplist=localStorageService.get("MMCONSOLE_METADATA_SHOP_LIST")||[];$scope.info.defaultShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP")||($scope.info.shoplist&&$scope.info.shoplist[0]);$scope.info.shopName=$scope.info.defaultShop.name||"首页";$scope.openModal=function(){$scope.modal.show();};$scope.closeModal=function(){$scope.modal.hide();};$scope.$on("$destroy",function(){$scope.modal.remove();});$scope.$on("modal.hide",function(){});$scope.$on("modal.removed",function(){});$scope.$on("modal.shown",function(){});$scope.switchDefaultShop=function(shopInfo,$event){$event.stopPropagation();if(shopInfo.id==$scope.info.defaultShop.id){$scope.closeModal();return;}$scope.info.defaultShop=shopInfo;localStorageService.set("MMCONSOLE_METADATA_DEFAULT_SHOP",shopInfo);$scope.closeModal();$scope.doShopInfoRefresh();};$scope.ShowShopList=function(){$timeout(function(){$scope.info.shoplist=localStorageService.get("MMCONSOLE_METADATA_SHOP_LIST")||[];$scope.info.defaultShop=localStorageService.get("MMCONSOLE_METADATA_DEFAULT_SHOP");$scope.openModal();});};}]);