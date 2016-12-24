elephant.factory('registerFactory', function(UIfactory, $ionicHistory, elephantData_URL, elephantData_AUTH) {

  var registerDataId = elephantData_AUTH;
  var registerBaseUrl = elephantData_URL;

  function registerFactory() {
    this.NameId = registerDataId.REGISTER_NAME;
    this.EmailId = registerDataId.REGISTER_EMAIL;
    this.PassId = registerDataId.REGISTER_PASS;
    this.Pass2Id = registerDataId.REGISTER_PASS_VALIDATE;
    this.name = null;
    this.email = null;
    this.pass = null;
    this.pass2 = null;
    this.checkbox = null;
    this.url = registerBaseUrl.REGISTER_USER_URL;
  }

  registerFactory.prototype.processInput = function(name, email, pass, pass2, checkbox) {
    this.name = name;
    this.email = email;
    this.pass = pass;
    this.pass2 = pass2;
    this.checkbox = checkbox;
    console.log(name, email)
    var nameMatching = name.match(this.nameMatch);
    if (this.name == ''  || this.email == '' || this.pass == '' || this.pass2 == '' ) {
      UIfactory.showAlert('Alert', 'Please fill all the fields');
    }
    else {
      return this.validateEmail();
    }
  }

  registerFactory.prototype.validateEmail = function() {
    var validate = new Validation(this.email);
    if (validate.emailValidate() == 'formatError') {
      UIfactory.showAlert('Alert', 'Please enter valid LSBU email address');
    }
    else if (validate.emailValidate() == 'invalid') {
      UIfactory.showAlert('Alert', 'Invalid email');
    }
    else {
      this.validatePassword();
    }
  }

  registerFactory.prototype.validatePassword = function() {
    if (this.pass != this.pass2){
      UIfactory.showAlert('Alert', 'Password does not match');
    }
    else {
      return this.validateTC();
    }
  }

  registerFactory.prototype.validateTC = function() {
    if (this.checkbox == false) {
      UIfactory.showAlert('Alert', 'Agree terms and conditions')
    }
    else {
      return this.submit();
    }
  }

  registerFactory.prototype.submit = function() {
    var dataString = 'name=' + this.name + '&email=' + this.email + '&pass=' + this.pass;
    var request = new Submitform('POST', this.url, dataString, false);
    request.ajaxSubmit(this);
    return false;
  }

  registerFactory.prototype.submitResponse = function(response) {
    if (response.status == 1) {
      UIfactory.showAlert('Registred successfully', 'A validation email has been sent to your LSBU email account. Please validate your email to start using your account.');
      this.reloadForm();
    }
    else if(response.status == 0) {
      UIfactory.showAlert('Alert', 'Email already registred');
    }
  }

  registerFactory.prototype.reloadForm = function() {
    inputVal.setValue(this.NameId, '');
    inputVal.setValue(this.EmailId, '');
    inputVal.setValue(this.PassId, '');
    inputVal.setValue(this.Pass2Id, '');
    return $ionicHistory.goBack();;
  }

  return registerFactory;
})
