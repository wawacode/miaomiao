angular.module('ionic.tool', ['ionic', 'LocalStorageModule'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('signin', {
                url: '/sign-in',
                templateUrl: 'templates/sign-in.html',
                controller: 'SignInCtrl'
            })
            .state('forgotpassword', {
                url: '/forgot-password',
                templateUrl: 'templates/forgot-password.html'
            })
            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.tool', {
                url: '/tool',
                views: {
                    'tool-tab': {
                        templateUrl: 'templates/tool.html',
                        controller: 'ToolTabCtrl'
                    }
                }
            })
            .state('tabs.my', {
                url: '/my',
                views: {
                    'my-tab': {
                        templateUrl: 'templates/my.html',
                        controller: 'MyTabCtrl'
                    }
                }
            })
            .state('newshop', {
                url: '/newshop',
                templateUrl: 'templates/newshop.html'
            });


        $urlRouterProvider.otherwise('/sign-in');

    }).controller('SignInCtrl', function ($scope, $ionicLoading, $compile, $http, $state, localStorageService) {

        $scope.user = localStorageService.get('user') || {};

        $scope.signIn = function (user) {

            // verity
            $ionicLoading.show({
                template: 'Sign-In...'
            });

            $scope.signStatasMessage = undefined;

            $http.get('query', {params: {staff_name: $scope.user.name, staff_phone: $scope.user.phone, staff_pwd: $scope.user.password ,from:0 , offset:100}}).
                success(function (data, status, headers, config) {

                    $ionicLoading.hide();
                    if (data && data.code != 0) {
                        $scope.signStatasMessage = '无法验证您的身份，请联系管理员';
                        return;
                    }

                    // save code
                    localStorageService.set('user', $scope.user);
                    localStorageService.set('customersInfo', data.data);

                    $state.go('tabs.my');

                }).
                error(function (data, status, headers, config) {

                    $ionicLoading.hide();
                    $scope.signStatasMessage = "Can't verify your invite code, please contact AA team";

                });
        };
    })

    .controller('ToolTabCtrl',function ($scope, $ionicLoading, $compile, $http, $state, $timeout, localStorageService) {

        $scope.info = localStorageService.get('info') || {};
        $scope.user = $scope.info.user = localStorageService.get('user') || {};

        $scope.signStatasMessage = undefined;

        $scope.info.shop_lat = undefined;
        $scope.info.shop_lng = undefined;

        function initialize() {

            var map = new BMap.Map(document.getElementById("map"));
            var point = new BMap.Point(116.46, 39.92);  // 创建点坐标
            map.centerAndZoom(point, 15);

            $scope.map = map;

        }

        $timeout(function(){
            initialize();
        },1000);

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
            }

            navigator.geolocation.getCurrentPosition(function (pos) {

                    $ionicLoading.hide();

                    $scope.info.shop_lat = pos.coords.latitude;
                    $scope.info.shop_lng = pos.coords.longitude;

                    var point = new BMap.Point(pos.coords.longitude, pos.coords.latitude);  // 创建点坐标
                    $scope.map.centerAndZoom(point, 15);// 初始化地图，设置中心点坐标和地图级别
                    var marker = new BMap.Marker(point);
                    $scope.map.addOverlay(marker);
                    BMap.Convertor.translate(point, 0, translateCallback);     //真实经纬度转成百度坐标

                }, function (error) {
                    alert('Unable to get location: ' + error.message);
                    $ionicLoading.hide();
                },
                {timeout: 10000});
        };

        $scope.submit = function (info) {

            var _info = {'staff_phone': $scope.user.phone,
                'staff_name': $scope.user.name,
                'staff_pwd': $scope.user.password,
                'shop_tel': $scope.info.shop_tel,
                'shop_owner_phone': $scope.info.shop_owner_phone,
                'shop_name': $scope.info.shop_name,
                'shop_address': $scope.info.shop_address,
                'shop_print': $scope.info.shop_print,
                'shop_lat': $scope.info.shop_lat,
                'shop_lng': $scope.info.shop_lng
            };

            $scope.submitHasError = false;
            // check empty
            for (var key in _info) {
                if (!_info[key]) {  // some value is empty
                    $scope.submitHasError = true;
                    $scope.error_message = '请查看确认信息是否填写完整(红色*必填)!';
                    return;
                }
            }
            // check speical not empty

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

            localStorageService.set('info', $scope.info);

            $http.get('commit', {params: _info}).
                success(function (data, status, headers, config) {

                    if(data.code != 0){
                        $scope.newShopURL = undefined;
                        $scope.newShopStatus = '创建店铺失败: ' + data.msg;
                    }else{
                        $scope.newShopURL = data.url;
                        $scope.newShopStatus = '创建店铺成功';
                    }
                    $state.go('newshop');
                }).
                error(function (data, status, headers, config) {
                    $scope.newShopURL = undefined;
                    $scope.newShopStatus = '创建店铺失败: ' + data;
                    $state.go('newshop');
                });
        }
    }).controller('MyTabCtrl', function ($scope, $ionicLoading, $compile, $http, $state, localStorageService) {

        $scope.user = localStorageService.get('user') || {};
        $scope.myCustomersInfo = localStorageService.get('customersInfo') || {};
        $scope.doRefresh = function(){

        }
    });

