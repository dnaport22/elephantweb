elephant.controller('LoginController', function($scope, loginFactory,$stateParams, elephantData_AUTH, elephantData_URL) {
  $scope.loginMessage = null;

  var path = $stateParams.path;
  var loginDataId = elephantData_AUTH;
  var EmailId = loginDataId.LOGIN_EMAIL;
  var PassId = loginDataId.LOGIN_PASS;


  $scope.loginUser = function() {
    var email = inputVal.getValue(EmailId);
    var pass = inputVal.getValue(PassId);
    var login = new loginFactory;
    login.processInput(email, pass, path);
  }

  //Login intent message
  if (path == 'main') {
    $scope.loginMessage = 'Log in to get or post items';
  }
  else if(path == 'postitem') {
    $scope.loginMessage = 'Log in to post items';
  }
  else if (path == 'getitem') {
    $scope.loginMessage = 'Log in to send message';
  }

});
