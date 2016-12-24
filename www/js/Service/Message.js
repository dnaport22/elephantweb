elephant.service('MessageService', function(UIfactory, elephantData_URL) {

  this.constructor = function(to_user, item_name, email, username) {
    this.msg = inputVal.getValue("user_message");
    this.item_name = item_name;
    this.toUserId = to_user;
    this.fromUser = email;
    this.fromUsername = username;
    this.itemid = null;
    this.url = elephantData_URL.REQUEST_ITEM_URL;
  }

  this.processInput = function() {
    if (this.msg == '') {
      UIfactory.showAlert('Alert', 'Please enter your message.');
    } else {
      return this.sendMessage();
    }
  }

  this.sendMessage = function() {
    var dataString = {
      msg: this.msg,
      toUser: this.toUserId,
      fromUser: this.fromUser,
      itemName: this.item_name,
      fromUsername: this.fromUsername
    }
    var request = new Submitform('POST', this.url, dataString, false);
    request.ajaxSubmit(this);
    return false;
  }

  this.onSuccess = function(response) {
    if (response == '1') {
      UIfactory.showAlert('Message Sent', 'Response will be sent to your LSBU email account.');
      this.reloadForm();
    }
    else {
      UIfactory.showAlert('Error occurred', 'Check if you internet is working');
    }
  }

  this.reloadForm = function() {
    inputVal.setValue('user_message', 'Hey, I am interested in your item.');
    return false;
  }

})
