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
    .factory('ShopService', ['$http', '$rootScope', '$timeout','httpClient', function ($http, $rootScope, $timeout,httpClient) {

        var _defaultShop = {};
        return {

            setDefaultShop: function (shop) {
                _defaultShop = shop;
                this.setDefaultShopToServer(shop.id,function(){},function(){});
            },

            getDefaultShop: function () {
               return _defaultShop;
            },

            getDefaultShopFromServer: function (success, fail) {
                var self = this;
                httpClient.getDefaultShopInfo(function(data, status){
                    var code = data.code, dataDetail = data.data;
                    if (dataDetail.shop) {
                        self.setDefaultShop(dataDetail.shop);
                        return success(dataDetail.shop);
                    }
                    fail(null);
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
    }]).factory('MMUtils', ['$timeout', function ($timeout) {

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
            }
        }
    }]);

