angular.module('ionic.tool', ['ionic'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('tool', {
                url: '/tool',
                templateUrl: 'templates/tool.html'
            })
            .state('newshop', {
                url: '/newshop',
                templateUrl: 'templates/newshop.html'
            });

        $urlRouterProvider.otherwise('/tool');
    })

    .controller('ToolCtrl', function ($scope, $ionicLoading, $compile,$http, $state) {

        $scope.info = $scope.info || {};

        function initialize() {

            var map = new BMap.Map(document.getElementById("map"));
            var point = new BMap.Point(116.46 , 39.92);  // 创建点坐标
            map.centerAndZoom(point, 15);

            $scope.map = map;
        }

        window.addEventListener('load', initialize , true);

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            function translateCallback(point1){
                var marker1 = new BMap.Marker(point1);
                $scope.map.addOverlay(marker1);
                var label = new BMap.Label("店在这儿",{offset:new BMap.Size(20,-10)});
                marker1.setLabel(label); //添加百度label
                $scope.map.setCenter(point1);
            }

            navigator.geolocation.getCurrentPosition(function (pos) {

                $ionicLoading.hide();

                $scope.info.shop_lat = pos.coords.latitude;
                $scope.info.shop_lng = pos.coords.longitude;

                var point = new BMap.Point(pos.coords.longitude , pos.coords.latitude);  // 创建点坐标
                $scope.map.centerAndZoom(point, 15);// 初始化地图，设置中心点坐标和地图级别
                var marker = new BMap.Marker(point);
                $scope.map.addOverlay(marker);
                BMap.Convertor.translate(point,0,translateCallback);     //真实经纬度转成百度坐标

            }, function (error) {
                alert('Unable to get location: ' + error.message);
                $ionicLoading.hide();
            });
        };

        $scope.submit = function (info) {

            var _info = {'staff_phone': $scope.info.staff_phone,
                'staff_name': $scope.info.staff_name,
                'staff_pwd': $scope.info.staff_pwd,
                'shop_tel': $scope.info.shop_tel,
                'shop_name': $scope.info.shop_name,
                'shop_address': $scope.info.shop_address,
                'shop_print': $scope.info.shop_print,
                'shop_lat': $scope.info.shop_lat,
                'shop_lng': $scope.info.shop_lng
            };

            $scope.submitHasError = false;
            for(var key in _info){
                if(!_info[key]){  // some value is empty
                    $scope.submitHasError = true;
                    $scope.error_message = '请查看确认信息是否填写完整(红色*必填)!';
                    return;
                }
            }

            $http.post('commit',_info).
                success(function (data, status, headers, config) {
                    $scope.newShopURL = data.url;
                    $scope.newShopStatus = data.code;
                    $state.go('newshop');
                }).
                error(function (data, status, headers, config) {
                    $scope.newShopURL = undefined;
                    $scope.newShopStatus = '创建店铺失败: '+ data;
                    $state.go('newshop');
                });
        }
    })