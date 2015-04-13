angular.module('ionic.tool')
    .controller('SignInCtrl', function ($scope, $ionicLoading, $compile, $http, $state,
                                          localStorageService,httpClient,MMUtils,serverInfo) {

        $scope.user = localStorageService.get('MMTOOL_METADATA_USER') || {};

        $scope.signIn = function (user) {

            if (!$scope.user.password || !$scope.user.name) {
                MMUtils.showAlert('请输入用户名和密码');
                return;
            }

            if (!MMUtils.isValidTelNumber($scope.user.phone)) {
                MMUtils.showAlert('电话号码格式不正确');
                return;
            }

            MMUtils.showLoadingIndicator('正在登陆,请稍候...', $scope);

            httpClient.login($scope.user.phone, $scope.user.password, function (data, status) {

                $ionicLoading.hide();

                var code = data.code, dataDetail = data.data;
                if (code != 0) {
                    MMUtils.showAlert('登陆失败:' + data.msg);
                    return;
                }

                //success
                localStorageService.set('MMTOOL_METADATA_USER', {'name': $scope.user.name,
                    'phone': $scope.user.phone,'password': $scope.user.password, 'token': dataDetail.token});

                $scope.signStatasMessage = undefined;

                MMUtils.showLoadingIndicator('正在获取用户信息,请稍候...', $scope);

                $http.get(serverInfo.host + '/catstaff/query', {params: {staff_name: $scope.user.name, staff_phone: $scope.user.phone, staff_pwd: $scope.user.password, from: 0, offset: 100}}).
                    success(function (data, status, headers, config) {

                        $ionicLoading.hide();
                        if (data && data.code != 0) {
                            $scope.signStatasMessage = '无法获取您的数据，请联系管理员';
                            return;
                        }
                        // update online shop url

                        var customInfo = data.data;
                        for (var item_idx = 0; item_idx < customInfo.length; item_idx++) {
                            var item = customInfo[item_idx];
                            item.shop_online_url = serverInfo.host + '/sg/loading#/shop?shop_id=' + item.shop_id;
                        }
                        // save code
                        localStorageService.set('MMTOOL_METADATA_customersInfo', customInfo);

                        $state.go('tabs.my');

                    }).
                    error(function (data, status, headers, config) {

                        $ionicLoading.hide();
                        $scope.signStatasMessage = "无法获取您的数据，请联系管理员";

                    });

            }, function (data, status) {
                $ionicLoading.hide();
                MMUtils.showAlert('登陆失败');
            });
        };
    })

    .controller('ToolTabCtrl',function ($scope, $ionicLoading, $compile, $http, $state, $timeout, localStorageService,$ionicPopup,MMUtils,serverInfo) {

        $scope.info = localStorageService.get('MMTOOL_METADATA_info') || {};
        $scope.user = $scope.info.user = localStorageService.get('MMTOOL_METADATA_USER') || {};

        $scope.signStatasMessage = undefined;

        $scope.info.shop_lat = undefined;
        $scope.info.shop_lng = undefined;

        $scope.allHours = [];
        for (var i = 1; i <= 24; i++) {
            $scope.allHours.push(i);
        }
        $scope.allMinutes = [];
        for (var i = 0; i < 60; i++) {
            $scope.allMinutes.push(_reformatHourMinutes(i));
        }

        function _reformatHourMinutes(number) {
            return (parseInt(number) < 10 ? '0' : '') + number;
        }

        $scope.info.isFullTimeOpen = false;
        $scope.info.new_open_time = {'hours': 8, 'minutes': _reformatHourMinutes(0)}; // place holder value
        $scope.info.new_close_time = {'hours': 22, 'minutes': _reformatHourMinutes(0)};

        function initialize() {

            var map = new BMap.Map(document.getElementById("map"));
            var point = new BMap.Point(116.46, 39.92);  // 创建点坐标
            map.centerAndZoom(point, 15);

            $scope.map = map;

        }

        $timeout(function () {
            initialize();
        }, 1000);

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            function translateCallback(point1) {

                var marker1 = new BMap.Marker(point1);
                $scope.map.addOverlay(marker1);
                var label = new BMap.Label("店在这儿", {offset: new BMap.Size(20, -10)});
                marker1.setLabel(label); //添加百度label
                $scope.map.setCenter(point1);

                // save translated point
                $timeout(function(){
                    $scope.info.shop_lat = point1.lat;
                    $scope.info.shop_lng = point1.lng;
                })
            }


            navigator.geolocation.getCurrentPosition(function (pos) {

                    $ionicLoading.hide();

                    var point = new BMap.Point(pos.coords.longitude, pos.coords.latitude);  // 创建点坐标
                    $scope.map.centerAndZoom(point, 15);// 初始化地图，设置中心点坐标和地图级别
                    var marker = new BMap.Marker(point);
                    $scope.map.addOverlay(marker);
                    BMap.Convertor.translate(point, 0, translateCallback);     //真实经纬度转成百度坐标

                }, function (error) {
                    MMUtils.showAlert('获取坐标失败: ' + error.message);
                    $ionicLoading.hide();
                },
                {timeout: 10000});
        };

        $scope.submit = function (info) {

            // all necessary info
            var _info = {'staff_phone': $scope.user.phone,
                'staff_name': $scope.user.name,
                'staff_pwd': $scope.user.password,
                'shop_tel': $scope.info.shop_tel,
                'shop_owner_phone': $scope.info.shop_owner_phone,
                'shop_name': $scope.info.shop_name,
                'shop_address': $scope.info.shop_address,
                'shop_serveArea':$scope.info.shop_serveArea,
                'shop_lat': $scope.info.shop_lat,
                'shop_lng': $scope.info.shop_lng,
                'shop_basePrice': $scope.info.shop_basePrice
            };

            if ($scope.info.isFullTimeOpen) {
                _info.shop_openTime = null;
                _info.shop_closeTime = null;
            } else {
                if ($scope.info.new_open_time) {
                    _info.shop_openTime = $scope.info.new_open_time.hours + ':' + $scope.info.new_open_time.minutes;
                }
                if ($scope.info.new_close_time) {
                    _info.shop_closeTime = $scope.info.new_close_time.hours + ':' + $scope.info.new_close_time.minutes;
                }
            }

            $scope.submitHasError = false;

            function showAlert(message, tmpUrl) {

                $scope.error_message = '请查看确认信息是否填写完整(红色*必填)!';
                $ionicPopup.alert({
                    title: message,
                    template: tmpUrl || ''
                });
            }

            if(!_info['staff_phone'] || !_info['staff_name'] || !_info['staff_pwd']){

                showAlert("请重新登陆");
                $state.go('signin',null, {reload:true});
                return;
            }

            if(!_info['shop_name']){showAlert("请填写正确的店铺名称");return;}
            if(!_info['shop_tel']){showAlert("请填写正确的店铺电话");return;}
            if(!_info['shop_owner_phone']){showAlert("请填写正确的店铺老板电话");return;}
            if(!_info['shop_address']){showAlert("请填写正确的店铺地址");return;}
            if(!_info['shop_serveArea']){showAlert("请填写正确的服务小区列表");return;}
            if(!_info['shop_basePrice']){showAlert("请填写正确的起送价格");return;}
            if(!_info['shop_lat']){showAlert("请填写正确的纬度");return;}
            if(!_info['shop_lng']){showAlert("请填写正确的经度");return;}

            // optional keys
            _info.shop_print =  $scope.info.shop_print || null;

            // check special keys not empty
            function isValidTelNumber(number) {
                var regPhone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
                var regMobile = /^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$/;
                return regPhone.test(number) || regMobile.test(number);
            }

            if (!isValidTelNumber(_info['staff_phone'])) {
                $scope.submitHasError = true;
                $scope.error_message = '请确认工作人员电话号码格式正确';
                return;
            }

            if (!isValidTelNumber(_info['shop_tel'])) {
                $scope.submitHasError = true;
                $scope.error_message = '请确认店家电话号码格式正确';
                return;
            }

            localStorageService.set('MMTOOL_METADATA_info', $scope.info);

            $ionicLoading.show({
                template: '正在提交...'
            });

            $http.get(serverInfo.host + '/catstaff/commit', {params: _info}).
                success(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    if (data.code != 0) {
                        $scope.newShopStatus = '创建店铺失败: ' + data.msg;
                        localStorageService.set('MMMETA_shopInfo', {'status': $scope.newShopStatus});
                    } else {
                        $scope.newShopURL = data.url;
                        $scope.newShopStatus = '创建店铺成功';
                        localStorageService.set('MMMETA_shopInfo', {'url': $scope.newShopURL, 'status': $scope.newShopStatus});
                    }
                    $state.go('tabs.newshop');
                }).
                error(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    $scope.newShopStatus = '创建店铺失败: ' + data;
                    localStorageService.set('MMMETA_shopInfo', {'status': $scope.newShopStatus});
                    $state.go('tabs.newshop');
                });
        }
    }).controller('MyTabCtrl',function ($scope, $ionicLoading, $compile, $http, $state, localStorageService,MMUtils,serverInfo) {

        $scope.user = localStorageService.get('MMTOOL_METADATA_USER') || {};
        $scope.myCustomersInfo = localStorageService.get('MMTOOL_METADATA_customersInfo') || {};
        $scope.doRefresh = function () {

            $http.get(serverInfo.host + '/catstaff/query', {params: {staff_name: $scope.user.name,
                staff_phone: $scope.user.phone,
                staff_pwd: $scope.user.password,
                from: 0, offset: 500}}).
                success(function (data, status, headers, config) {

                    $ionicLoading.hide();
                    if (data && data.code != 0) {
                        MMUtils.showAlert('无法获取您的数据，请联系管理员');
                        return;
                    }
                    // update online shop url

                    var customInfo = data.data;
                    for (var item_idx = 0; item_idx < customInfo.length; item_idx++) {
                        var item = customInfo[item_idx];
                        item.shop_online_url = serverInfo.host + '/sg/loading#/shop?shop_id=' + item.shop_id;
                    }
                    // save code
                    $scope.myCustomersInfo = customInfo;
                    localStorageService.set('MMTOOL_METADATA_customersInfo', customInfo);

                    $scope.$broadcast('scroll.refreshComplete');

                }).
                error(function (data, status, headers, config) {

                    $ionicLoading.hide();
                    MMUtils.showAlert('无法获取您的数据，请联系管理员');

                    $scope.$broadcast('scroll.refreshComplete');

                });

        }

    }).controller('NewShopCtrl', function ($scope, $ionicLoading, $compile, $http, $state, localStorageService,$timeout,serverInfo) {

        $scope.shopInfo = localStorageService.get('MMMETA_shopInfo') || {};

        $scope.info = {};
        $scope.info.newShopURL = location.origin + $scope.shopInfo.url;
        $scope.info.newShopStatus = $scope.shopInfo.status;

        $scope.$on('$ionicView.afterEnter', function () {
            $timeout(function () {

                $scope.shopInfo = localStorageService.get('MMMETA_shopInfo') || {};
                $scope.info.newShopSuccess = $scope.shopInfo.url;

                $scope.info.newShopURL = serverInfo.host + $scope.shopInfo.url;
                $scope.info.newShopStatus = $scope.shopInfo.status;

            }, 100);
        });

    });

