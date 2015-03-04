angular.module("miaomiao.shop").controller("SearchCtrl",function($scope,$rootScope,$ionicLoading,$ionicScrollDelegate,$ionicPopup,$http,$state,$timeout,localStorageService,httpClient,ShoppingCart){$scope.shop=localStorageService.get("MMMETA_shop")||{};$scope.info={};$scope.performSearch=function(key,$event){$event.target.blur();var KEY=key||$scope.info.key;$scope.LoadingMessage="正在搜索...";$ionicLoading.show({templateUrl:"/views/sg/templates/loadingIndicator.html",scope:$scope});$scope.info.showSearchSuggestion=false;$scope.info.showSearchResult=true;httpClient.getSearchResults($scope.shop.id,KEY,function(data,status){$ionicLoading.hide();var code=data.code,dataDetail=data.data;if(!code==0||dataDetail.length==0){$scope.searchResultsItems=[];$scope.info.hasNoResults=true;return;}$scope.info.hasNoResults=false;for(var item_idx=0;item_idx<dataDetail.length;item_idx++){var item=dataDetail[item_idx];item.count=ShoppingCart.getCountForItem(item);}$scope.searchResultsItems=dataDetail;$ionicScrollDelegate.$getByHandle("searchResultScroll").scrollTop();},function(data,status){$ionicLoading.hide();$scope.info.hasNoResults=true;});};$scope.getSearchSuggestions=function(){httpClient.getSearchSuggestion($scope.shop.id,$scope.info.key,function(data,status){var code=data.code,dataDetail=data.data;$timeout(function(){$scope.info.search_suggestions=dataDetail;});},function(data,status){});};$scope.goToSearchItem=function(item,$event){$scope.info.showSearchSuggestion=false;$scope.info.showSearchResult=true;$event.stopPropagation();$scope.performSearch(item.key,$event);};function updateShoppingCart(){$timeout(function(){$scope.info.shoppingCartItems=ShoppingCart.getAllItems();$scope.info.cartReadyToShip=ShoppingCart.cartReadyToShip();$scope.info.checkoutHintMessage=$scope.info.cartReadyToShip?"去结算":"差 "+ShoppingCart.cartNotReadyLeftPrice()+" 元起送";});}updateShoppingCart();$scope.selectItem=function(item){item.count+=1;ShoppingCart.addItemToCart(item);updateShoppingCart();ShoppingCart.itemChangeEventInProductList(item);};$scope.removeItem=function(item,removeUIElementWhenEmtpy){item.count-=1;item.count=item.count<=0?0:item.count;ShoppingCart.removeItemFromCart(item);updateShoppingCart();ShoppingCart.itemChangeEventInProductList(item);};$scope.startSearch=function(){$scope.info.showSearchSuggestion=true;$scope.info.showSearchResult=false;};$scope.clearSearch=function(){$scope.info.key="";$scope.info.showSearchSuggestion=true;$scope.info.showSearchResult=false;};$scope.checkout=function(){$state.go("checkout",null,{reload:true});};$scope.showShoppingCart=function(){$scope.info.showCart=!$scope.info.showCart;};ShoppingCart.onItemChangeEventInShoppingCart($scope,function(message){var item=message.item;updateShoppingCart();for(var item_idx=0;item_idx<$scope.searchResultsItems.length;item_idx++){var item=$scope.searchResultsItems[item_idx];item.count=ShoppingCart.getCountForItem(item);}});});