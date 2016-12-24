function RequestReset() {
    this.EmailId = 'reset_email';
    this._email = '';
    this._url = 'http://maddna.xyz/forgotpass_request.php';
}

RequestReset.prototype.processInput = function() {
   this._email = inputVal.getValue(this.EmailId);
   if (this._email == '') {
     alert("Please Fill All Fields",'Alert');
   }
   else {
     return this.validateEmail();
   }
}

RequestReset.prototype.validateEmail = function() {
  var validate = new Validation(this._email);
  if (validate.emailValidate() == 'formatError') {
    alert('Plase enter valid lsbu email', "Alert");
  }
  else if (validate.emailValidate() == 'invalid') {
    alert("Invalid Email",'Alert');
  }
  else {
    this.submit();
  }
}

RequestReset.prototype.submit = function() {
  var dataString = 'email=' + this._email;
  var request = new Submitform('POST', this._url, dataString, false);
  request.ajaxSubmit(this);
  return false;
}

RequestReset.prototype.submitResponse = function(response) {
  if (response.status == 0) {
    alert("Error occured, please contant app administration team","Alert");
  }
  else if(response.status == 1) {
    alert("We have emailed you an activation link","Alert");
  }
  else {
    alert("Error occured, please contant app administration team","Alert");
  }
  return this.reloadForm();
}

RequestReset.prototype.reloadForm = function() {
  inputVal.setValue(this.EmailId, '');
  return false;
}

resetRequest = new RequestReset();
