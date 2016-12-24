elephant.controller('RequestResetController', function($scope, UIfactory, UserFactory, elephantData_URL, elephantData_RESETPASS) {

  const BASE_URL = elephantData_URL.RESET_REQUEST_URL;
  var EmailId = elephantData_RESETPASS.RESET_REQUEST;

  $scope.requestReset = function() {
    UIfactory.showSpinner();
    var requestReset_data = {
      email: inputVal.getValue(EmailId)
    }
    var reset = new UserFactory;
    reset.requestResetCredentials(requestReset_data.email);
    var cleanEmail = reset.cleanEmail();
    if(reset.validateEmail(cleanEmail) == true) {
      var resetFormSubmit = new Submitform('POST', BASE_URL, reset.requestResetFormData(), false);
      resetFormSubmit.ajaxSubmit(this);
    }
  }

  $scope.onSuccess = function(response) {
    if (response.status == 0) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'The password could not be reset. Please try again in few minutes or contact elephant team.');
    }
    else if(response.status == 1) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Success', 'We have emailed you an activation link.')
    }
    else {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'The password could not be reset. Please try again in few minutes or contact elephant team.')
    }
    return reloadForm();
  }

  $scope.onError = function (response) {
    UIfactory.hideSpinner();
    UIfactory.showAlert('Alert', 'The password could not be reset. Please try again in few minutes or contact elephant team.')
  }

  var reloadForm = function() {
    inputVal.setValue(EmailId, '');
  }

})
