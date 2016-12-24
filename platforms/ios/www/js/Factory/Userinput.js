function Userinput() {
  type: 'Get and Set';
}

Userinput.prototype.getValue = function(key) {
  return document.getElementById(key).value || '';
}

Userinput.prototype.setValue = function(key, val) {
  return document.getElementById(key).value = val;
}

Userinput.prototype.getImage = function(key) {
  return document.getElementById(key).src || '';
}

Userinput.prototype.setImage = function(key, src) {
  return document.getElementById(key).src = src;
}

Userinput.prototype.getElembyId = function(key) {
  return document.getElementbyId(key);
}

Userinput.prototype.setElembyId = function(key, input, val) {
  return document.getElementbyId(key).input = val;
}

inputVal = new Userinput();
