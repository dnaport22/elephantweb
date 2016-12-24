elephant.controller('UserguideController', function($ionicModal, $scope, $ionicSlideBoxDelegate) {

  $scope.index = false;
  $scope.lastSlide = false;
  $scope.progress = 'Next';

  $scope.closeModal = function() {
    //Set app_launch_activity = 1
    $scope.modal.hide();
  };

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }

  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous();
  }

  $scope.slideIndex = function(index) {
    console.log(index)
    if(index > 0) {
      $scope.index = true;
    }
    else if(index == 2) {
      $scope.progress = 'Start app';
      $scope.lastSlide = true;
    }
  }
  //Destroy cache
})
