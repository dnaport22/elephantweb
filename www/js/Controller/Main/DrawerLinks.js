elephant.controller('DrawerController', function($state, $scope, $location, $localStorage, UIfactory, $ionicPopover, $ionicHistory) {

  $scope.username = $localStorage.user_username;
  $scope.$storage = $localStorage.$default({
    user_login_id: 0,
    user_username: null,
    user_activation: null,
    user_email: null,
    expiry: 0,
    app_launch_activity: 0
  });

  $scope.drawerLinks_loggedOut = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 0},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/aboutus', id: 0},
    {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/terms', id: 0},
    {title: 'User guide', class: 'icon ion-ios-book', href: '#/app/userguide', id: 0}
  ];

  $scope.drawerLinks_loggedIn = [
    {title: 'Home', class: 'icon ion-home', href: '#/app/main', id: 1},
    {title: 'Post items', class: 'icon ion-upload', href: '#/app/postitem', id: 1},
    {title: 'My items', class: 'icon ion-folder', href: '#/app/myitems', id: 1},
    {title: 'About us', class: 'icon ion-information-circled', href: '#/app/aboutus', id: 1},
    {title: 'Terms and conditions', class: 'icon ion-document-text', href: '#/app/terms', id: 1},
    {title: 'User guide', class: 'icon ion-ios-book', href: '#/app/userguide', id: 0},
    {title: 'Recycling guide', class: 'icon ion-trash-a', href: '#/app/recyclingguide', id:1}
  ];

  $scope.logout = function() {
    UIfactory.showSpinner();
    $localStorage.user_username = null;
    $localStorage.user_email = null;
    $localStorage.user_activation = null;
    $localStorage.user_login_id = 0;
    $localStorage.expiry = 0;
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('app.main');

    UIfactory.hideSpinner();
  }
  $scope.loginMainuser = function() {
    $location.path("/app/login/main")
  }

//This is to check logged in time interval (this code needs to be moved to a structred area)
  function loginexpiryCheck() {
    var two_weeks = 672; //to be tested *****************************************
    var now = new Date().getTime();
    if(now - $localStorage.expiry > two_weeks*60*60*1000) {
      $localStorage.expiry = 0;
      $localStorage.user_login_id = 0;
      $localStorage.user_email = null;
      $localStorage.user_username = null;
      $localStorage.user_activation = null;
    }
  }
  loginexpiryCheck();

  $scope.goToPP = function() {
    $state.go('app.pp')
  }
  $scope.goToEULA = function() {
    $state.go('app.eula')
  }

});
