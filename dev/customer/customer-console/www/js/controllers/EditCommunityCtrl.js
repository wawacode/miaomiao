;angular.module('miaomiao.console.controllers')
    .controller('EditCommunityCtrl', ['$scope', '$state', '$http','$filter', '$ionicPopup', '$ionicModal', 'localStorageService',
        '$ionicLoading', 'httpClient', '$ionicScrollDelegate', '$timeout', 'MMShopService', 'MMUtils','serverInfo',

        function ($scope, $state,$http, $filter, $ionicPopup, $ionicModal, localStorageService, $ionicLoading, httpClient, $ionicScrollDelegate, $timeout, MMShopService, MMUtils,serverInfo) {

            $scope.editingShop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP');
            $scope.action = {};
            $scope.info = {};

            $scope.getCommunityList = function (success, fail) {

                httpClient.getCommunityList($scope.editingShop.id, function (data, status) {

                    var dataDetail = data;
                    success(dataDetail);

                }, function (data, status) {
                    fail();
                });
            };

            $timeout(function () {

                MMUtils.showLoadingIndicator('正在加载,请稍候...', $scope);

                $scope.getCommunityList(function (dataDetail) {

                    $ionicLoading.hide();
                    $scope.info.communityList = dataDetail;

                    $ionicScrollDelegate.resize();

                }, function () {
                    $ionicLoading.hide();
                })

            });

            $scope.removeCommunity = function(index){
                // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                    title: '删除本店铺服务的小区',
                    template: '确定要删除此小区？'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        MMUtils.showLoadingIndicator('正在删除,请稍候...',$scope);

                        var community = $scope.info.communityList[index];
                        httpClient.deleteCommunity($scope.editingShop.id, community.id,  function (data, status) {
                            $ionicLoading.hide();
                            var code = data.code, dataDetail = data.data;
                            if (code != 0) {
                                MMUtils.showAlert('删除失败:' + data.msg);
                                return;
                            }

                            $timeout(function(){
                                $scope.info.communityList.splice(index,1);
                            });


                        }, function (data, status) {
                            $ionicLoading.hide();
                            MMUtils.showAlert('删除失败');
                        });
                    }
                });
            };


            $scope.action.getCommSuggestions = function(key){

                $http({
                    method: 'GET',
                    url: serverInfo.host + '/sg/commy/search?key=' + key
                }).
                    success(function (data, status, headers, config) {
                        $scope.info.commSuggestions = data.data.communitys;
                    }).
                    error(function (data, status, headers, config) {
                    });

            };

            $scope.action.selectCommunity = function(com){
                // A confirm dialog
                var confirmPopup = $ionicPopup.confirm({
                    title: '添加本店铺服务的小区',
                    template: '确定要添加此小区？'
                });
                confirmPopup.then(function(res) {
                    if(res) {

                        $timeout(function(){
                            com.sel = !com.sel;
                        });

                        MMUtils.showLoadingIndicator('正在添加,请稍候...',$scope);

                        var community = com;

                        httpClient.addCommunity($scope.editingShop.id, community.id,  function (data, status) {
                            $ionicLoading.hide();
                            var code = data.code, dataDetail = data.data;
                            if (code != 0) {
                                MMUtils.showAlert('添加失败:' + data.msg);
                                return;
                            }

                            $timeout(function(){
                                $scope.info.communityList.push(com);
                            });

                        }, function (data, status) {
                            $ionicLoading.hide();
                            MMUtils.showAlert('添加失败');
                        });
                    }
                });
            };

            $ionicModal.fromTemplateUrl('templates/add-community.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                    $scope.modal = modal;
                });

            $scope.openModal = function() {
                $scope.modal.show();
            };

            $scope.closeModal = function($event) {
                $scope.modal.hide();
            };

            // Execute action on hide modal
            $scope.$on('modal.hide', function() {
                // Execute action

            });

            $scope.addNewCommunity = function(){

                $ionicModal.fromTemplateUrl('templates/add-community.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                        $scope.modal = modal;
                        $scope.openModal();
                    });
            };

            // just kicking the tires
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.editingShop = localStorageService.get('MMCONSOLE_METADATA_DEFAULT_SHOP');
            });
        }
    ]);