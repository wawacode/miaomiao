;angular.module('miaomiao.console.services', [])
    .factory('MMPushNotification', ['$rootScope', 'httpClient', 'localStorageService', '$cordovaToast', '$timeout','MMUtils',
        function ($rootScope, httpClient, localStorageService, $cordovaToast, $timeout,MMUtils) {
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
                        MMUtils.showAlert('注册通知成功，您将会在此应用中收到新订单通知~');

                    }, function () {
                        MMUtils.showAlert('注册通知失败，暂不能收到新订单通知，请重新登录~');
                    });
                }else{
                    MMUtils.showAlert('注册通知失败,条件不满足:' + 'token is:' + token + ' and phone is:' + user.phone);
                }
            },
            getDeviceToken:function(){
                return localStorageService.get('MMCONSOLE_META_PUSH_DEVICE_TOKEN');
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
            },

            remindOrderNotificationReceived:function (data) {
                console.log('we have seen remind orders and sent broadcast');
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_RemindOrderNotificationReceived', {
                        data: data
                    });
                });
            },

            onRemindOrderNotificationReceived: function ($scope, handler) {
                console.log('we watch remind orders and listening for notifications');
                $scope.$on('MMEVENT_RemindOrderNotificationReceived', function (event, message) {
                    handler(message);
                });
            },

            orderStatusChangeNotificationReceived:function (data) {
                console.log('we have seen orders status change and sent broadcast');
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_OrderStatusChangeNotificationReceived', {
                        data: data
                    });
                });
            },

            onOrderStatusChangeNotificationReceived: function ($scope, handler) {
                console.log('we watch orders status change and listening for notifications');
                $scope.$on('MMEVENT_OrderStatusChangeNotificationReceived', function (event, message) {
                    handler(message);
                });
            }
        }
    }]).factory('MMShopService', ['$rootScope', 'httpClient', 'localStorageService', '$timeout',
        function ($rootScope, httpClient, localStorageService, $timeout) {
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
    }]).factory('MMProductService', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

        var categorys = [], category_summary = [], inLoadingMoreProcess = false;

        //TODO: performance is not good
        Array.prototype.unique = function (){
            var r = new Array();
            o:for(var i = 0, n = this.length; i < n; i++){
                for(var x = 0, y = r.length; x < y; x++){
                    if(r[x]==this[i]) continue o;}
                r[r.length] = this[i];
            }
            return r;
        };

        return {

            initCategorysWithData: function (cates) {

                var retCategoryls = cates;

                if (!retCategoryls || !retCategoryls.length) {
                    categorys.itemls = [];
                    return;
                }
                var retCategorylNames = [];
                for (var idx = 0; idx < retCategoryls.length; idx++) {

                    var curCategory = retCategoryls[idx];
                    retCategorylNames.push({name: curCategory.name, category_id: curCategory.category_id});

                    curCategory.selected = 0;
                    curCategory.scrollIndex = curCategory.itemls.length;
                    curCategory.canLoadMore = true;

                    curCategory.itemls = this.removeDuplicateItems(curCategory.itemls);

                }
                categorys = retCategoryls;
                category_summary = retCategorylNames;
            },

            removeDuplicateItems: function (source) {
                return source.unique();
            },

            setCanLoadMoreFlagForIndex: function (index, canLoadMore) {
                categorys[index].canLoadMore = canLoadMore;
            },

            getCanLoadMoreFlagForIndex: function (index) {
                return categorys[index].canLoadMore;
            },

            setInLoadingMoreFlag: function (inLoading) {
                inLoadingMoreProcess = inLoading;
            },

            getInLoadingMoreFlag: function (inLoading) {
                return inLoadingMoreProcess;
            },

            getCategorySummary: function () {
                return category_summary;
            },

            getCategoryForIndex: function (index) {
                if (index < 0 || index > categorys.length - 1)return null;
                return categorys[index];
            },

            setCategoryForIndex: function (index, category) {
                if (index < 0 || index > categorys.length - 1)return;
                categorys[index] = category;
            },

            addMoreItemsForCategoryId: function (cateId, items) {
                for (var idx = 0; idx < categorys.length; idx++) {
                    if (cateId == categorys[idx].category_id) {

                        var currentCategory = categorys[idx],
                            newitems = currentCategory.itemls.concat(items);
                        currentCategory.itemls = this.removeDuplicateItems(newitems);
                        currentCategory.scrollIndex += items.length;
                        currentCategory.totalCnt = 0;

                        break;
                    }
                }
            },

            addProductItemToCategory: function (cateId, item) {
                for (var idx = 0; idx < categorys.length; idx++) {
                    if (cateId == categorys[idx].category_id) {
                        categorys[idx].itemls.push(item);
                        categorys[idx].itemls = this.removeDuplicateItems(categorys[idx].itemls);
                        break;
                    }
                }
            },

            addProductToCategoryNotification: function (cateId, item) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_addProductToCategoryNotification', {
                        cateId: cateId,
                        item: item
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
            },

            renderDataNotification: function (data) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_renderDataNotification', {
                        data: data
                    });
                });
            },

            onRenderDataNotification: function ($scope, handler) {
                $scope.$on('MMEVENT_renderDataNotification', function (event, message) {
                    handler(message);
                });
            }
        }
    }])
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
    .factory(("ionPlatform"), function ($q) {
        var ready = $q.defer();

        ionic.Platform.ready(function (device) {
            ready.resolve(device);
        });

        return {
            ready: ready.promise
        }
    });
