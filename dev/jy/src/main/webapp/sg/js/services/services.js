;
angular.module('miaomiao.shop').factory('httpClient', ['$http', function ($http) {

        var doGet = function (path, params, success, fail) {
            $http({
                method: 'GET',
                url: path + '?' + params
            }).
                success(function (data, status, headers, config) {
                    success(data, status, headers, config)
                }).
                error(function (data, status, headers, config) {
                    fail(data, status, headers, config)
                });
        }

        var doPost = function (path, params, success, fail) {


            $http.post(path, params,
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).
                success(function (data, status, headers, config) {
                    success(data, status, headers, config)
                }).
                error(function (data, status, headers, config) {
                    fail(data, status, headers, config)
                });

        }

        return {

            getProductList: function (shopId, success, fail) {
                doGet('shop/category/get', 'shop_id=' + shopId, success, fail);
            },
            getMoreProductList: function (shopId, cateId, from, offset, success, fail) {

                doGet('shop/getitems', "shop_id=" + shopId +
                    "&category_id=" + cateId + "&from=" + from +
                    "&offset=" + offset, success, fail);
            },
            getAddressList: function (shopId, success, fail) {
                doGet('address', 'shop_id=' + shopId, success, fail);
            },

            setDefaultAddress: function (shopId, addr, success, fail) {

                doPost('address/default?shop_id=' + shopId,
                    {'address_id': addr.id,
                        'address': addr.address, 'phone': addr.phone},
                    success, fail);

            },

            addAddress: function (shopId, addr, success, fail) {

                doPost('address/add?shop_id=' + shopId,
                    { 'address': addr.address, 'phone': addr.phone },
                    success, fail);

            },

            getConfirmCartList: function (shopId, items, success, fail) {
                doPost('shopCar/confirm?shop_id=' + shopId, {'items': JSON.stringify(items)}, success, fail);
            },
            getOrderSave: function (shopId, addressId, address, phone, remarks, items, orderId, success, fail) {
                doPost('order/save?shop_id=' + shopId,
                    {'items': JSON.stringify(items), 'address_id': addressId,
                        'address': address, 'phone': phone,
                        'remarks': remarks, 'order_id': orderId},
                    success, fail);
            },

            getMyOrders: function (shopId, success, fail) {
                doGet('user/profile', 'shop_id=' + shopId, success, fail);
            },

            getSearchResults: function (shopId, key, success, fail) {
                doGet('search/query', 'shop_id=' + shopId + '&key=' + key, success, fail);
            },

            getSearchSuggestion: function (shopId, key, success, fail) {

                doGet('/suggestion/query', 'shop_id=' + shopId + '&q=' + key, success, fail);

            },
            getShopByGEOLocation: function (lat, lng, success, fail) {

                doGet('f', 'lat=' + lat + '&lng=' + lng, success, fail);

            },
            getShopList: function (from, offset, success, fail) {

                doGet('shop/shopList', 'from=' + from + '&offset=' + offset, success, fail);

            },
            getShopInfo: function (shop_id, success, fail) {

                doGet('shop', 'shop_id=' + shop_id, success, fail);

            },

            getDefaultShopInfo: function (success, fail) {

                doGet('storage/get', '', success, fail);

            },

            setDefaultShopInfo: function (shop_id, success, fail) {

                doGet('storage/set', 'shop_id=' + shop_id, success, fail);

            },

            getNearShopList: function (lat, lng, success, fail) {

                doGet('near', 'lat=' + lat + '&lng=' + lng, success, fail);

            },

            getNearCommunityList: function (lat, lng, success, fail) {

                doGet('commy/near', 'lat=' + lat + '&lng=' + lng, success, fail);

            },

            getShopsByCommunityId: function (c_id, success, fail) {

                doGet('commy/getshop', 'c_id=' + c_id, success, fail);

            },

            getCommunitySuggestions: function (query, success, fail) {

                return success({"code":0,"data":{"communitys":[{"id":110738,"key":"王府温馨公寓","shops":[{id:1,name:'测试店铺','shop_address':'上地街道可是大厦123',rate:5,maxRate:5},
                    {id:2,name:'测试昂铺222','shop_address':'上地街道嘉华大厦',rate:5,maxRate:5}]},{"id":110828,"key":"苇子地","shops":[{id:1,name:'测试店铺','shop_address':'上地街道可是大厦123',rate:5,maxRate:5},
                    ]},{"id":110915,"key":"万盛北里","shops":[]},{"id":110922,"key":"望京东园","shops":[]},{"id":111002,"key":"万寿寺甲4号院","shops":[]},{"id":111113,"key":"梧桐公寓","shops":[]},{"id":111198,"key":"五方联智商贸中心","shops":[]},{"id":111232,"key":"五里店","shops":[]},{"id":111271,"key":"万科蓝","shops":[]},{"id":111280,"key":"苇子坑144号","shops":[]},{"id":111290,"key":"万宁小区","shops":[]},{"id":111291,"key":"万宁新区","shops":[]},{"id":111320,"key":"武警第二家属院","shops":[]},{"id":111373,"key":"瓦窑","shops":[]},{"id":111440,"key":"万宁桥小区","shops":[]},{"id":111445,"key":"万宁小区北门","shops":[]},{"id":111466,"key":"万明园小区西南门","shops":[]},{"id":111505,"key":"万福家园","shops":[]},{"id":111532,"key":"五里店第二社区","shops":[]},{"id":111534,"key":"万科中粮假日风景","shops":[]}]}});

                doGet('commy/query', 'q=' + query, success, fail);

            },

            getCommunityByName:function(query, success, fail){

                return success({"code":0,"data":{"communitys":[{"id":110738,"key":"王府温馨公寓","shops":[{id:1,name:'测试店铺','shop_address':'上地街道可是大厦123',rate:5,maxRate:5},
                    {id:2,name:'测试昂铺222','shop_address':'上地街道嘉华大厦',rate:5,maxRate:5}]},{"id":110828,"key":"苇子地","shops":[{id:1,name:'测试店铺','shop_address':'上地街道可是大厦123',rate:5,maxRate:5},
                ]},{"id":110915,"key":"万盛北里","shops":[]},{"id":110922,"key":"望京东园","shops":[]},{"id":111002,"key":"万寿寺甲4号院","shops":[]},{"id":111113,"key":"梧桐公寓","shops":[]},{"id":111198,"key":"五方联智商贸中心","shops":[]},{"id":111232,"key":"五里店","shops":[]},{"id":111271,"key":"万科蓝","shops":[]},{"id":111280,"key":"苇子坑144号","shops":[]},{"id":111290,"key":"万宁小区","shops":[]},{"id":111291,"key":"万宁新区","shops":[]},{"id":111320,"key":"武警第二家属院","shops":[]},{"id":111373,"key":"瓦窑","shops":[]},{"id":111440,"key":"万宁桥小区","shops":[]},{"id":111445,"key":"万宁小区北门","shops":[]},{"id":111466,"key":"万明园小区西南门","shops":[]},{"id":111505,"key":"万福家园","shops":[]},{"id":111532,"key":"五里店第二社区","shops":[]},{"id":111534,"key":"万科中粮假日风景","shops":[]}]}});

                doGet('commy/query', 'q=' + query, success, fail);
            }

        };
    }]).factory('GEOLocationService', ['$timeout', function ($timeout) {

        return {

            GEOLocationSupported: function (obj) {
                return  navigator.geolocation
            }
        }
    }])
    .factory('AddressService', ['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {

        return {

            addressChangeEventSwitchDefault: function (item) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_AddressChangeEventSwitchDefault', {
                        item: item
                    });
                });

            },

            onAddressChangeEventSwitchDefault: function ($scope, handler) {
                $scope.$on('MMEVENT_AddressChangeEventSwitchDefault', function (event, message) {
                    handler(message);
                });
            },

            addressChangeEventAddNew: function (item) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_AddressChangeEventAddNew', {
                        item: item
                    });
                });
            },

            onAddressChangeEventAddNew: function ($scope, handler) {
                $scope.$on('MMEVENT_AddressChangeEventAddNew', function (event, message) {
                    handler(message);
                });
            }
        }
    }])
    .factory('OrderService', ['$http', '$rootScope', '$timeout', function ($http, $rootScope, $timeout) {

        return {

            orderChangeEventSuccess: function (item) {
                $timeout(function () {
                    $rootScope.$broadcast('MMEVENT_OrderChangeEventSuccess', {
                        item: item
                    });
                });

            },

            onOrderChangeEventSuccess: function ($scope, handler) {
                $scope.$on('MMEVENT_OrderChangeEventSuccess', function (event, message) {
                    handler(message);
                });
            }
        }
    }])
    .factory('ShopService', ['$http', '$rootScope', '$timeout','httpClient','localStorageService',
        function ($http, $rootScope, $timeout,httpClient,localStorageService) {

        var _defaultShop = null;
        return {

            setDefaultShop: function (shop) {
                _defaultShop = shop;
                localStorageService.set('MMMETA_shop',shop);
            },

            setDefaultShopAndSync: function (shop) {
                _defaultShop = shop;
                localStorageService.set('MMMETA_shop',shop);
                this.setDefaultShopToServer(shop.id,function(){},function(){});
            },

            getDefaultShop: function () {
               return _defaultShop || localStorageService.get('MMMETA_shop');
            },

            getDefaultShopFromServer: function (success, fail) {
                var self = this;
                httpClient.getDefaultShopInfo(function(data, status){
                    var code = data.code, dataDetail = data.data;
                    if (code == 0 && dataDetail && dataDetail.shop) {
                        self.setDefaultShop(dataDetail.shop);
                        return success(dataDetail.shop);
                    }
                    return fail(null);
                },function(data, status){
                    fail(null);
                })
            },

            setDefaultShopToServer: function (shop_id,success, fail) {

                httpClient.setDefaultShopInfo(shop_id, function(data, status){
                    var code = data.code, dataDetail = data.data;
                    if (code == 0) {
                        success();
                        return;
                    }
                    fail(null);
                },function(data, status){
                    fail(null);
                })
            }
        }
    }]).factory('MMUtils', ['$timeout', '$ionicLoading', '$ionicPopup', function ($timeout,$ionicLoading, $ionicPopup) {

        return {

            isEmptyObject: function (obj) {


                // null and undefined are "empty"
                if (obj == null) return true;

                // Assume if it has a length property with a non-zero value
                // that that property is correct.
                if (obj.length > 0)    return false;
                if (obj.length === 0)  return true;

                // Otherwise, does it have any properties of its own?
                // Note that this doesn't handle
                // toString and valueOf enumeration bugs in IE < 9
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
                }

                return true;

            },

            isValidTelNumber: function (number) {
                var regPhone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
                var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
                return regPhone.test(number) || regMobile.test(number);
            },

            showLoadingIndicator: function (message, scope, tmpUrl) {

                scope.LoadingMessage = message;
                $ionicLoading.show({
                    templateUrl: tmpUrl || 'templates/loadingIndicator.html',
                    scope: scope
                });
            },

            showAlert: function (message, tmpUrl) {
                $ionicPopup.alert({
                    title: message,
                    template: tmpUrl || ''
                });
            }
        }
    }]);

