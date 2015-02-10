angular.module('miaomiao.console.controllers').controller('OrderDetailCtrl',['$scope', '$ionicModal','httpClient',

    function ($scope, $ionicModal,httpClient) {

        $ionicModal.fromTemplateUrl('templates/order-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
                $scope.modal = modal;
            });

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        $scope.$on('modal.shown', function() {

        });

        $scope.callNumber = function(number){
            window.plugins.CallNumber.callNumber(function(){}, function(){}, number);
        }

        $scope.showOrderDetail = function(order) {
            $scope.order = order;

            // make api call
            if($scope.order.readed == false){
                httpClient.orderHasbeenRead($scope.info.shop.id, order.order_id, function (data, status) {
                    $scope.order.readed = true;
                }, function (data, status) {
                });
            }

            $scope.openModal();
        }
    }
]);