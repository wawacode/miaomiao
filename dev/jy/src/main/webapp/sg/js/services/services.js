var miaomiao = angular.module('miaomiao.shop');

miaomiao.factory('httpClient', ['$http', function ($http) {

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

        setDefaultAddress: function (shopId, addr , success, fail) {

            doPost('address/default?shop_id=' + shopId,
                {'address_id': addr.id,
                    'address': addr.address, 'phone': addr.phone},
                success, fail);

        },

        addAddress: function (shopId, addr , success, fail) {

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
        }

    };
}]);

