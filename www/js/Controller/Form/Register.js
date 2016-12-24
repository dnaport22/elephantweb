elephant.controller('RegisterController', function($scope, UIfactory, $ionicHistory, elephantData_AUTH, UserFactory, elephantData_URL) {
  $scope.isChecked = {
    checkbox: false
  }

  var nameId = elephantData_AUTH.REGISTER_NAME;
  var emailId = elephantData_AUTH.REGISTER_EMAIL;
  var passId = elephantData_AUTH.REGISTER_PASS;
  var pass2Id = elephantData_AUTH.REGISTER_PASS_VALIDATE;
  const BASE_URL = elephantData_URL.REGISTER_USER_URL;

  $scope.registerUser = function() {
    UIfactory.showSpinner();
    var register_data = {
      name: inputVal.getValue(nameId),
      email: inputVal.getValue(emailId),
      pass: inputVal.getValue(passId),
      pass2: inputVal.getValue(pass2Id)
    }
    var register = new UserFactory;
    register.registerCredentials(register_data.name, register_data.email, register_data.pass, register_data.pass2);
    var cleanEmail = register.cleanEmail();
    if(register.validateEmail(cleanEmail) == true) {
      if(register.validatePassword() == true) {
        if($scope.isChecked.checkbox == true) {
          var registerFormSubmit = new Submitform('POST', BASE_URL, register.registerFormData(), false);
          registerFormSubmit.ajaxSubmit(this);
        }
        else {
          UIfactory.hideSpinner();
          UIfactory.showAlert('Alert', 'Agree terms and conditions');
        }
      }
    }
  }

  $scope.onSuccess = function(response) {
    if (response.status == 1) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Registered successfully', 'A validation email has been sent to your LSBU email account. Please validate your email to start using your account.');
      reloadForm();
    }
    else if(response.status == 0) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'Email already registred');
    }
  }

  var reloadForm = function() {
    inputVal.setValue(nameId, '');
    inputVal.setValue(emailId, '');
    inputVal.setValue(passId, '');
    inputVal.setValue(pass2Id, '');
    return $ionicHistory.goBack();
  }

})
