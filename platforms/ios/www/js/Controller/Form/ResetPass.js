elephant.controller('ResetPassController', function($state, $stateParams, $scope){
  var key = $stateParams.key;
  $scope.resetPassword = function() {
    resetPass.processInput(key);
  }
});

// Class to register users
function ResetPass() {
  this.PassId = 'reset_pass';
  this.Pass2Id = 'reset_pass2';
  this._pass = '';
  this._pass2 = '';
  this._key = '';
  this._url = 'http://maddna.xyz/forgotpass_verify.php';
}

ResetPass.prototype.processInput = function(key) {
   this._key = key;
   this._pass = inputVal.getValue(this.PassId);
   this._pass2 = inputVal.getValue(this.Pass2Id);
   if (this._pass == '' || this._pass2 == '' ) {
     alert("Please Fill All Fields",'Alert');
   }
   else {
     return this.validatePassword();
   }
}

ResetPass.prototype.validatePassword = function() {
  if (this._pass != this._pass2){
    this.formError = true;
    alert("Password Doesn't Match",'Alert');
  }
  else {
    return this.submit();
  }
}

ResetPass.prototype.submit = function() {
  var dataString = 'pass=' + this._pass + '&key=' + this._key;
  console.log(dataString)
  var request = new Submitform('POST', this._url, dataString, false);
  request.ajaxSubmit(this);
  return false;
}

ResetPass.prototype.submitResponse = function(response) {
  console.log(response)
  if (response.status == 1) {
    alert("Successfully Changed pass");
    this.reloadForm();
  }
  else if(response.status == 0) {
    alert("Error Occured");
  }
}

ResetPass.prototype.reloadForm = function() {
  inputVal.setValue(this.PassId, '');
  inputVal.setValue(this.Pass2Id, '');
  return false;
}


resetPass = new ResetPass();
