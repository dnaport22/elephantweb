//ES5 Class to perform ajax calls
function Submitform(type, url, datastring, cache) {
    this.type = type;
    this.dataString = datastring;
    this.url = url;
    this.cache = cache;
    this.feedback = null;
    this.error = null;
    this.handshake = false;
    this.response = '';
}

Submitform.prototype.ajaxSubmit = function(callback) {
  var that = this;
  $.ajax({
    type: this.type,
    url: this.url,
    cache: this.cache,
    data: this.dataString,
    success: function(response) {
      callback.submitResponse(response);
    },
    error: function(error) {
      callback.submitResponse(error);
    }
  });
}
