elephant.factory('UserFactory', function(UIfactory) {

  const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * Class to handle user login and registration
   */
  function UserFactory() {

    /**
     * User properties;
     * @var string|int;
     */

    this.name = null;
    this.email = null;
    this.pass_orig = null;
    this.pass_valid = null;
  }

  UserFactory.prototype.loginCredentials = function(email, pass) {
    if(email == '' || pass == '') {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', "Please fill all fields");
    }
    else {
      this.setEmail(email);
      this.setPass_orig(pass);
    }
  }

  UserFactory.prototype.registerCredentials = function(name, email, pass_orig, pass_valid) {
    if(name == '' || email == '' || pass_orig == '' || pass_valid == '') {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', "Please fill all fields");
    }
    else {
      this.setName(name);
      this.setEmail(email);
      this.setPass_orig(pass_orig);
      this.setPass_valid(pass_valid);
    }
  }

  /**
   * @return array registerData
   */
  UserFactory.prototype.registerFormData = function() {
    return registerData = {
      name: this.getName(),
      email: this.getEmail(),
      pass: this.getPass_orig(),
    }
  }

  /**
   * @return array loginData
   */
  UserFactory.prototype.loginFormData = function() {
    return loginData = {
      email: this.getEmail(),
      pass: this.getPass_orig(),
    }
  }

  /**
   * @return array requestResetData
   */
   UserFactory.prototype.requestResetFormData = function() {
    return requestResetData = {
      email: this.getEmail(),
    }
   }

  UserFactory.prototype.requestResetCredentials = function(email) {
    if(email == '') {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', "Please fill your email address");
    }
    else {
      this.setEmail(email);
    }
  }

  UserFactory.prototype.resetPasswordCredentials = function(pass_orig, pass_valid) {
    if(pass_orig == '' || pass_valid == '') {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', "Please fill all fields");
    }
    else {
      this.setPass_orig(pass_orig);
      this.setPass_valid(pass_valid);
    }
  }

  /**
   * @param string cleanEmail;
   * @return boolean;
   */
  UserFactory.prototype.validateEmail = function(cleanEmail) {
    var emailMatching = emailFormat.test(cleanEmail);
    var ext = cleanEmail.split("@");
    if(emailMatching == false){
      UIfactory.hideSpinner();
      return UIfactory.showAlert('Alert', 'Invalid Email');
    }
    else if (ext[1] != 'lsbu.ac.uk') {
      UIfactory.hideSpinner();
      return UIfactory.showAlert('Alert', 'Plase enter valid lsbu email');
    }
    else {
      return true;
    }
  }

  /**
   * @return string;
   */
  UserFactory.prototype.cleanEmail = function() {
    var userEmail = this.getEmail().trim().toLowerCase();
    userEmail = userEmail.replace(/\s+/g, '');
    this.setEmail(userEmail);
    return this.getEmail();
  }

  /**
   * @return boolean;
   */
  UserFactory.prototype.validatePassword = function() {
    if(this.getPass_orig() != this.getPass_valid()) {
      UIfactory.hideSpinner();
      return UIfactory.showAlert('Alert', 'Password does not match');
    }
    else if(this.getPass_orig().length < 8) {
      UIfactory.hideSpinner();
      return UIfactory.showAlert('Alert', 'Password should be atleast 8 characters long.')
    }
    else if(this.getPass_orig().search(/[0-9]/) < 0){
      UIfactory.hideSpinner();
      return UIfactory.showAlert('Alert', 'Password should contain atleast one digit.')
    }
    // else if(this.getPass_orig().search(/a-z/i) < 0) {
    //   return UIfactory.showAlert('Alert', 'Password should contain atleast one letter.')
    // }
    else {
      return true;
    }
  }


  /**
   * @param array data;
   * @param mixed url;
   *
   * @return jsonResponse;
   */
  UserFactory.prototype.submit = function(data, url) {
    var formRequest = new Submitform('POST', url, data, false);
    return formRequest.ajaxSubmit(this)
  }

  /**
   * @param jsonResponse response;
   *
   * @return jsonResponse;
   */
  UserFactory.prototype.submitResponse = function(response) {
    return response;
  }

  /**
   * @param mixed pass_valid;
   */
  UserFactory.prototype.setPass_valid = function(pass_valid) {
    this.pass_valid = pass_valid;
  }

  /**
   * @param mixed pas_orig;
   */
  UserFactory.prototype.setPass_orig = function(pass_orig) {
    this.pass_orig = pass_orig;
  }

  /**
   * @param mixed email;
   */
  UserFactory.prototype.setEmail = function(email) {
    this.email = email;
  }

  /**
   * @param mixed name;
   */
  UserFactory.prototype.setName = function(name) {
    return this.name = name;
  }

  /**
   * @return mixed;
   */
  UserFactory.prototype.getEmail = function() {
    return this.email;
  }

  /**
   * @return mixed;
   */
  UserFactory.prototype.getPass_orig = function() {
    return this.pass_orig;
  }

  /**
   * @return mixed;
   */
  UserFactory.prototype.getPass_valid = function() {
    return this.pass_valid;
  }

  /**
   * @return mixed;
   */
  UserFactory.prototype.getName = function() {
    return this.name;
  }

  return UserFactory;

});
