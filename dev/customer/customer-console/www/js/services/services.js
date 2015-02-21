angular.module('miaomiao.console.services', [])
    .factory('Camera', ['$q', function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])
    .factory('MMPushNotification', ['$rootScope', 'httpClient', 'localStorageService', '$cordovaToast', '$timeout', function ($rootScope, httpClient, localStorageService, $cordovaToast, $timeout) {
        return {
            subscribe: function () {

                var token = localStorageService.get('MMCONSOLE_META_PUSH_DEVICE_TOKEN');
                var user = localStorageService.get('MMCONSOLE_METADATA_USER');

                if (token && user && user.phone) {
                    var chn = 'iOS';
                    if (ionic.Platform.isAndroid()) {
                        chn = 'adr'
                    }
                    httpClient.subscribeForCurrentDevice(user.phone, chn, token, function () {
                        console.log('注册通知成功，您将会在此应用中收到新订单通知~');

                    }, function () {

                    });
                }
            },
            newOrderNotificationReceived: function (data) {
                console.log('we have see new orders and sent broadcast');
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_NewOrderNotificationReceived', {
                        data: data
                    });
                });
            },

            onNewOrderNotificationReceived: function ($scope, handler) {
                console.log('we watch new orders and listening for notifications');
                $scope.$on('MMEVENT_NewOrderNotificationReceived', function (event, message) {
                    handler(message);
                });
            }
        }
    }]).factory('MMShopService', ['$rootScope', 'httpClient', 'localStorageService', '$timeout', function ($rootScope, httpClient, localStorageService, $timeout) {
        return {

            switchDefaultShopNotification: function (data) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_switchDefaultShopNotification', {
                        data: data
                    });
                });
            },

            onSwitchDefaultShopNotification: function ($scope, handler) {
                $scope.$on('MMEVENT_switchDefaultShopNotification', function (event, message) {
                    handler(message);
                });
            }
        }
    }]).factory('MMProductService', ['$rootScope','$timeout', function ($rootScope, $timeout) {

        var categorys,category_summary,inLoadingMoreProcess=false;

        return {

            initCategorysWithData:function(cates){

                var retCategoryls = cates;

                // extend for use
                /*
                 {"category_id":15,"category_sub_id":0,"id":0,
                 "itemls":[{"category_id":15,"category_sub_id":0,"count":956,"create_time":1419821656000,"ext":0,"id":28062,"name":"哈哈镜鸭爪买一赠一",
                 "pic_url":"http://www.mbianli.com/cat/images/lelin/HHJ001.jpg","price":1600,"price_new":0,
                 "score":99999,"serialNo":"HHJ001","shop_id":1,"status":0}
                 * */
                if (!retCategoryls || !retCategoryls.length)return;
                var retCategorylNames = [];
                for (var idx = 0; idx < retCategoryls.length; idx++) {

                    var curCategory = retCategoryls[idx];
                    retCategorylNames.push({name:curCategory.name,category_id:curCategory.category_id});

                    curCategory.selected = 0;
                    curCategory.scrollIndex = curCategory.itemls.length;
                    curCategory.canLoadMore = true;

                    curCategory.itemls = this.removeDuplicateItems(curCategory.itemls);

                }
                categorys = retCategoryls;
                category_summary = retCategorylNames;
            },

            removeDuplicateItems:function(source){
                var arr = {};
                for ( var i=0; i < source.length; i++ )
                    arr[source[i]['id']] = source[i];

                var result = new Array();
                for ( var key in arr )
                    result.push(arr[key]);

                return result;
            },

            setCanLoadMoreFlagForIndex:function(index,canLoadMore){
                categorys[index].canLoadMore = canLoadMore;
            },

            getCanLoadMoreFlagForIndex:function(index){
                return categorys[index].canLoadMore;
            },

            setInLoadingMoreFlag:function(inLoading){
                inLoadingMoreProcess = inLoading;
            },

            getInLoadingMoreFlag:function(inLoading){
                return inLoadingMoreProcess;
            },

            getCategorySummary:function(){
                return category_summary;
            },

            getCategoryForIndex:function(index){
                if(index < 0 || index > categorys.length - 1)return null;
                return categorys[index];
            },

            setCategoryForIndex:function(index,category){
                if(index < 0 || index > categorys.length - 1)return;
                categorys[index] = category;
            },

            addMoreItemsForCategoryId:function(cateId,items){
                for (var idx = 0; idx < categorys.length; idx++) {
                    if(cateId == categorys[idx].category_id){
                        var currentCategory = categorys[idx];
                        currentCategory.itemls = this.removeDuplicateItems(currentCategory.itemls.concat(items));
                        currentCategory.scrollIndex += items.length;
                        currentCategory.totalCnt = 0;
                        break;
                    }
                }
            },

            addProductItemToCategory:function(cateId,item){
                for (var idx = 0; idx < categorys.length; idx++) {
                    if(cateId == categorys[idx].category_id){
                        categorys[idx].itemls.push(item);
                        break;
                    }
                }
            },

            addProductToCategoryNotification: function (cateId,item) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_addProductToCategoryNotification', {
                        cateId:cateId,
                        item:item
                    });
                });
            },

            onAddProductToCategoryNotification: function ($scope, handler) {
                $scope.$on('MMEVENT_addProductToCategoryNotification', function (event, message) {
                    handler(message);
                });
            },

            switchCategoryNotification: function (data) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_switchCategoryNotification', {
                        data: data
                    });
                });
            },

            onSwitchCategoryNotification: function ($scope, handler) {
                $scope.$on('MMEVENT_switchCategoryNotification', function (event, message) {
                    handler(message);
                });
            }
        }
    }]);
