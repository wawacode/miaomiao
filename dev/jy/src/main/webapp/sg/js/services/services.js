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

            getOrderPrepayInfo: function (shopId, addressId, address, phone, remarks, items, orderId, success, fail) {

                return success({'data':{},'code': 0});

                doPost('order/save?shop_id=' + shopId,
                    {'items': JSON.stringify(items), 'address_id': addressId,
                        'address': address, 'phone': phone,
                        'remarks': remarks, 'order_id': orderId,'act':'wx'},
                    success, fail);
            },

            getJsapi_ticket:function(success, fail){

                doGet('/wx/wxpay/getjtk','', success, fail);
            },

            getPageConfig:function(url, success, fail){

                doGet('/wx/wxpay/getConfig','url=' + url, success, fail);
            },

            getHashFromServer:function(string,signType, success, fail){

                doGet('/wx/wxpay/getHash', 'package=' + string + '&signType=' + signType,success, fail);
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

                doGet('commy/query', 'q=' + query, success, fail);

            },

            getCommunityByName:function(query, success, fail){

                doGet('commy/search', 'key=' + query, success, fail);
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

//
        /*
         * Convert a raw string to a hex string
         */
        function rstr2hex(input) {
            try {
                hexcase
            } catch (e) {
                hexcase = 0;
            }
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                    + hex_tab.charAt(x & 0x0F);
            }
            return output;
        }

        /*
         * Convert a raw string to an array of little-endian words
         * Characters >255 have their high-byte silently ignored.
         */
        function rstr2binl(input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        }

        /*
         * Calculate the MD5 of an array of little-endian words, and a bit length.
         */
        function binl_md5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;

            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;

            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;

                a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

                a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

                a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return Array(a, b, c, d);
        }

        /*
         * These functions implement the four basic operations the algorithm uses.
         */
        function md5_cmn(q, a, b, x, s, t)
        {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
        }
        function md5_ff(a, b, c, d, x, s, t)
        {
            return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        function md5_gg(a, b, c, d, x, s, t)
        {
            return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        function md5_hh(a, b, c, d, x, s, t)
        {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5_ii(a, b, c, d, x, s, t)
        {
            return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y)
        {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        function bit_rol(num, cnt)
        {
            return (num << cnt) | (num >>> (32 - cnt));
        }
        /*
         * Convert an array of little-endian words to a string
         */
        function binl2rstr(input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        }


        function rstr_md5(s) {
            return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
        }
        /*
         * Encode a string as utf-8.
         * For efficiency, this assumes the input is valid utf-16.
         */
        function str2rstr_utf8(input) {
            var output = "";
            var i = -1;
            var x, y;

            while (++i < input.length) {
                /* Decode utf-16 surrogate pairs */
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }

                /* Encode output as utf-8 */
                if (x <= 0x7F)
                    output += String.fromCharCode(x);
                else if (x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                        0x80 | ( x & 0x3F));
                else if (x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                        0x80 | ((x >>> 6 ) & 0x3F),
                        0x80 | ( x & 0x3F));
                else if (x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                        0x80 | ((x >>> 12) & 0x3F),
                        0x80 | ((x >>> 6 ) & 0x3F),
                        0x80 | ( x & 0x3F));
            }
            return output;
        }

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
            },

            hex_md5:  function(s) {
                return rstr2hex(rstr_md5(str2rstr_utf8(s)));
            }

    }
    }]);

