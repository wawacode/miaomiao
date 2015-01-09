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
            var myLatlng = new google.maps.LatLng(39.92,116.46);

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>定位!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Uluru (Ayers Rock)'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            $scope.map = map;
        }

        google.maps.event.addDomListener(window, 'load', initialize);

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function (pos) {

                $scope.info.shop_lat = pos.coords.latitude;
                $scope.info.shop_lng = pos.coords.longitude;

                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $ionicLoading.hide();

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

            $http.post('catstaff/commit',_info).
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