elephant.factory('loginFactory', function(UIfactory, $ionicHistory, elephantData_URL, elephantData_AUTH, $localStorage, $timeout, $state, $ionicSideMenuDelegate) {

  var loginDataId = elephantData_AUTH;
  var loginBaseUrl = elephantData_URL;

  function loginFactory() {
    this.EmailId = loginDataId.LOGIN_EMAIL;
    this.PassId = loginDataId.LOGIN_PASS;
    this.email = null;
    this.pass = null;
    this.path = null;
    this.BASE_URL = loginBaseUrl.LOGIN_USER_URL;
  }

  loginFactory.prototype.processInput = function(email, pass, path) {
    this.path = path;
    this.email = email;
    this.pass = pass;
    if (this.email == ''  || this.pass == '') {
      UIfactory.showAlert('Alert', 'Please fill all the fields');
    }
    else {
      return this.validateEmail();
    }
  }

  loginFactory.prototype.validateEmail = function() {
    var validate = new Validation(this.email);
    this.email = validate.removeJunk();
    if (validate.emailValidate() == 'formatError') {
      UIfactory.showAlert('Alert', 'Plase enter valid lsbu email');
    }
    else if (validate.emailValidate() == 'invalid') {
      UIfactory.showAlert('Alert', 'Invalid Email');
    }
    else {
      return this.submitLogin();
    }
  }

  loginFactory.prototype.submitLogin = function() {
    var dataString = 'email=' + this.email + '&pass=' + this.pass;
    var request = new Submitform('POST', this.BASE_URL, dataString, false);
    return request.ajaxSubmit(this);
  }

  loginFactory.prototype.submitResponse = function(response) {
    if (response.status == 0) {
      UIfactory.showAlert('Alert', 'Invalid account');
    }
    else if(response.status == 1) {
      if(response.user.status == 0) {
        UIfactory.showAlert('Alert', 'Please activate your account');
      }
      else {
        this.userStorage(response.user);
      }
    }
  }

  loginFactory.prototype.userStorage = function(data) {
    $localStorage.user_login_id = 1;
    $localStorage.user_username = data.name;
    $localStorage.user_email = data.email;
    $localStorage.user_activation = data.activation;
    $localStorage.expiry = new Date().getTime();
    return this.reloadForm();
  }

  loginFactory.prototype.reloadForm = function() {
    inputVal.setValue(this.EmailId, '');
    inputVal.setValue(this.PassId, '');
    return this.redirectUser();
  }

  loginFactory.prototype.redirectUser = function() {
    UIfactory.showSpinner();
    if (this.path == 'getitem') {
      $timeout(function () {
        UIfactory.hideSpinner();
        $ionicHistory.goBack();
      }, 1000);
    }
    else if (this.path == 'main') {

      $timeout(function () {
        UIfactory.hideSpinner();
        $state.go('app.main');
        $ionicSideMenuDelegate.toggleLeft();
      }, 1000);

    }
    else if (this.path == 'postitem') {

      $timeout(function () {
        UIfactory.hideSpinner();
        $ionicHistory.goBack();
      }, 1000);
    }
  }
  return loginFactory;
})
