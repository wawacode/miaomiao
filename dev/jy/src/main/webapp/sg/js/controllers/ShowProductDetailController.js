;angular.module('miaomiao.shop').controller('ProductDetailCtrl', ['$scope', '$ionicModal',

    function ($scope, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/productPreview.html', {
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

        $scope.showImage = function(item) {
            $scope.imageSrc = item.pic_url;
            $scope.openModal();
        }
    }
]);