;angular.module('ionic.tool')
    .factory('httpClient', ['$http','serverInfo', function ($http, serverInfo) {

        var doGet = function (path, params, success, fail) {

            $http({
                method: 'GET',
                url: serverInfo.host + path + '?' + params
            }).
                success(function (data, status, headers, config) {
                    success(data, status, headers, config)
                }).
                error(function (data, status, headers, config) {
                    fail(data, status, headers, config)
                });
        };

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

        };

        return {

            islogin: function (token, success, fail) {

                doGet('/console/api/login/islogin', 'token=' + token, success, fail);
            },

            login: function (phone, pwd, success, fail) {

                doGet('/console/api/login/valid', 'phone='+ phone + '&pwd=' + pwd, success, fail);
            },

            logOut: function (phone,device_token,loginToken, success, fail) {

                doGet('/console/api/logout', 'phone=' + phone + "&device_token=" + device_token + "&token=" + loginToken, success, fail);
            },

            changePwd: function (phone, old_pwd, new_pwd, success, fail) {

                doGet('/console/api/login/change_pwd', 'phone='+ phone +  '&old_pwd='+  old_pwd +'&new_pwd='+ new_pwd, success, fail);
            }

        };
    }]);


