elephant.controller('RegisterController', function($scope, UIfactory, $ionicHistory, registerFactory, elephantData_AUTH) {
  $scope.isChecked = {
    checkbox: false
  }
  var registerDataId = elephantData_AUTH;

  var nameId = registerDataId.REGISTER_NAME;
  var emailId = registerDataId.REGISTER_EMAIL;
  var passId = registerDataId.REGISTER_PASS;
  var pass2Id = registerDataId.REGISTER_PASS_VALIDATE;

  $scope.registerUser = function() {
    var name = inputVal.getValue(nameId);
    var email = inputVal.getValue(emailId);
    var pass = inputVal.getValue(passId);
    var pass2 = inputVal.getValue(pass2Id);
    var register = new registerFactory;
    register.processInput(name, email, pass, pass2, $scope.isChecked.checkbox)
  }

})
