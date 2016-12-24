elephant.factory('messageFactory', function(UIfactory, elephantData_URL, elephantData_REQUESTITEM) {

  function messageFactory() {
    this.msg = inputVal.getValue("user_message");
    this.item_name = null;
    this.toUserId = null;
    this.fromUser = null;
    this.fromUsername = null;
    this.itemid = null;
    this.url = elephantData_URL.REQUEST_ITEM_URL;
  }

  messageFactory.prototype.processInput = function(msg, to_user, item_name, email, username) {
    this.msg = msg;
    this.item_name = item_name;
    this.toUserId = to_user;
    this.fromUser = email;
    this.fromUsername = username;
    if (this.msg == '') {
      UIfactory.showAlert('Alert', 'Please enter you message');
    } else {
      return this.sendMessage();
    }
  }

  messageFactory.prototype.sendMessage = function() {
    var dataString = 'msg='+this.msg+'&toUser='+this.toUserId+'&fromUser='+this.fromUser+'&itemName='+this.item_name+'&fromUsername='+this.fromUsername;
    var request = new Submitform('POST', this.url, dataString, false);
    request.ajaxSubmit(this);
    return false;
  }

  messageFactory.prototype.submitResponse = function(response) {
    if (response == '1') {
      UIfactory.showAlert('Message Sent', 'Please keep an eye on your LSBU email account');
      this.reloadForm();
    }
    else {
      UIfactory.showAlert('Error occurred', 'Check if you internet is working');
    }
  }

  messageFactory.prototype.reloadForm = function() {
    inputVal.setValue('user_message', 'Hey, I am interested in your item.');
    return false;
  }

  return messageFactory;
})
