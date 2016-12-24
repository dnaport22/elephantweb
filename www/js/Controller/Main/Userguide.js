elephant.controller('UserguideController', function($ionicHistory, $ionicModal, $scope, $ionicSideMenuDelegate, $localStorage, $state, UIfactory) {
  /**
   * Hides any ongoing spinners
   */
  UIfactory.hideSpinner();

  /**
   * Init localStorage app_launch_activity objectß
   */
  $scope.$storage = $localStorage.$default({
    app_launch_activity: 0
  });
  /**
   * Return back to home back
   */
  $scope.closeUserGuide = function() {
    $localStorage.app_launch_activity = 1
    $ionicHistory.goBack();
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.show_get = 0;
  $scope.show_post = 0;

  $scope.showDetail = function(view) {
    if(view == 'show_get') {
      if($scope.show_get == 0) {
        $scope.show_get = 1;
      }
      else if($scope.show_get == 1){
        $scope.show_get = 0;
      }
    }
    else if (view == 'show_post') {
      if($scope.show_post == 0) {
        $scope.show_post = 1;
      }
      else if($scope.show_post == 1) {
        $scope.show_post = 0;
      }
    }
  }


})
