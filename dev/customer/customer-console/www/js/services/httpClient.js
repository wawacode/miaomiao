var miaomiao = angular.module('miaomiao.console.services');

miaomiao.factory('httpClient', ['$http', 'serverInfo', function ($http, serverInfo) {

    var doGet = function (path, params, success, fail) {

        $http({
            method: 'GET',
            url: serverInfo.host + serverInfo.context + path + '?' + params
        }).
            success(function (data, status, headers, config) {
                success(data, status, headers, config)
            }).
            error(function (data, status, headers, config) {
                fail(data, status, headers, config)
            });
    }

    var doPost = function (path, params, success, fail) {


        $http.post(serverInfo.host + serverInfo.context + path, params,
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

    var development = false;
    return {

        login: function (phone, pwd, success, fail) {

            doPost('login/valid', {'phone': phone, pwd: pwd}, success, fail);
        },

        getSummary: function (shopId, beginDate, endDate, success, fail) {

//            if (development)return success(testdata.summary);

            doGet('order/summary', 'shop_id=' + shopId + '&beginDate=' + beginDate + "&endDate=" + endDate, success, fail);
        },

        getProductList: function (shopId, success, fail) {

//            if (development)return success(testdata.productInfo);

            doGet('shop/category/get', 'shop_id=' + shopId, success, fail);
        },

        getMoreProductList: function (shopId, cateId, from, offset, success, fail) {

//            if (development)return success(testdata.moreProductInfo);

            doGet('shop/getitems', "shop_id=" + shopId +
                "&category_id=" + cateId + "&from=" + from +
                "&offset=" + offset, success, fail);
        },


        getMyOrders: function (shopId, from, offset, success, fail) {

//            if (development)return success(testdata.orderInfo);

            doGet('order/list', 'shop_id=' + shopId + '&from=' + from + "&offset=" + offset, success, fail);
        },

        getMoreMyOrders: function (shopId, from, offset, success, fail) {

//            if (development)return success(testdata.moreOrderInfo);

            doGet('order/list', 'shop_id=' + shopId + '&from=' + from + "&offset=" + offset, success, fail);
        },

        getSearchResults: function (shopId, key, success, fail) {
            doGet('shopItem/query', 'shop_id=' + shopId + '&query=' + key, success, fail);
        },


        getItemInfo: function (serialNo, success, fail) {
            doGet('product/get', 'serialNo=' + serialNo, success, fail);
        },

        deleteItem: function (itemId, shopId, success, fail) {
            doGet('shopItem/del', 'itemId=' + itemId + '&shop_id=' + shopId, success, fail);
        },

        stickItem: function (itemId,categoryId, shopId, success, fail) {
            doGet('shopItem/sticky', 'itemId=' + itemId + '&category_id='+ categoryId + '&shop_id=' + shopId, success, fail);
        },

        addItem: function (options, success, fail) {

            doPost('shopItem/addItem',

               options, success, fail);

        },

        updateItem: function (options, shopId, success, fail) {

            doPost('shopItem/update',

                {'itemName': options.itemName,
                    itemId: options.itemId,
                    serialNo: options.serialNo,
                    category_id: options.category_id,
                    count: options.count,
                    score: options.score,
                    price: options.price,
                    pic: options.pic,
                    shop_id:shopId
                },

                success, fail);

        },


        getShopList: function (from, offset, success, fail) {

            doGet('shop/shopList', 'from=' + from + '&offset=' + offset, success, fail);

        },

        updateShopInfo: function (options, success, fail) {

            doPost('shop/updateShopInfo', options, success, fail);

        },

        getShopInfo: function (shop_id, success, fail) {

            doGet('shop', 'shop_id=' + shop_id, success, fail);

        },
        getNearShopList: function (lat, lng, success, fail) {

            doGet('near', 'lat=' + lat + '&lng=' + lng, success, fail);

        }

    };
}]);

