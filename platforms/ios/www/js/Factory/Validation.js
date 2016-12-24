function Validation(email) {
  this._email = email;
  this.emailMatch = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  this._status = '';
}

Validation.prototype.removeJunk = function() {
  this._email = this._email.trim();
  return this._email;
}

Validation.prototype.emailValidate = function() {
  var emailMatching = this.emailMatch.test(this._email);
  var ext = this._email.split("@");
  if(emailMatching == false){
    this._status = 'invalid';
  }
  else if (ext[1] != 'lsbu.ac.uk') {
    this._status = 'formatError';
  }
  return this._status;
}
