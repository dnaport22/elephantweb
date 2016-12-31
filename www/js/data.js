elephant.constant('elephantData_URL', {
  GET_ALL_ITEM_URL: 'http://'+getUrl(window.location.hostname)+'/getitems.php',
  GET_ALL_ITEM_TYPE: 'GET',
  LOGIN_USER_URL: 'http://'+getUrl(window.location.hostname)+'/login.php',
  LOGIN_USER_TYPE: 'POST',
  REGISTER_USER_URL: 'http://'+getUrl(window.location.hostname)+'/register.php',
  REGISTER_USER_TYPE: 'POST',
  GET_USER_ITEM_URL: 'http://'+getUrl(window.location.hostname)+'/myitems.php',
  GET_USER_ITEM_TYPE:'GET',
  DELETE_USER_ITEM_URL: 'http://'+getUrl(window.location.hostname)+'/dismiss.php',
  DELETE_USER_ITEM_TYPE: 'POST',
  POST_ITEM_URL: 'http://'+getUrl(window.location.hostname)+'/postitem.php',
  POST_ITEM_TYPE: 'POST',
  REQUEST_ITEM_URL: 'http://'+getUrl(window.location.hostname)+'/message.php',
  REQUEST_ITEM_TYPE: 'POST',
  RESET_REQUEST_URL: 'http://'+getUrl(window.location.hostname)+'/forgotpass_request.php',
  RESET_REQUEST_TYPE: 'POST',
  RESET_VERIFY_URL: 'http://'+getUrl(window.location.hostname)+'/forgotpass_verify.php',
  RESET_VERIFY_TYPE: 'POST'
})

elephant.constant('elephantData_AUTH', {
  LOGIN_EMAIL: 'login_email',
  LOGIN_PASS: 'login_pass',
  REGISTER_NAME: 'set_name',
  REGISTER_EMAIL: 'set_email',
  REGISTER_PASS: 'set_pass',
  REGISTER_PASS_VALIDATE: 'set_pass2',
})

elephant.constant('elephantData_POSTITEM', {
  ITEM_NAME: 'name',
  ITEM_DESC: 'desc',
  ITEM_IMAGE: 'upImage',
})

elephant.constant('elephantData_REQUESTITEM', {
  USER_MESSAGE: 'user_message',
})

elephant.constant('elephantData_RESETPASS', {
  RESET_REQUEST: 'reset_email',
  RESET_PASS: 'reset_pass',
  RESET_PASS_VALIDATE: 'reset_pass2'
})

/**
 * Return backend dns based on the current server of the user.
 *
 * @param location string
 *
 * @return dns string 
 */
function getUrl(location) {
  if (location == "developweb.myelephant.xyz") {
    return 'develop.myelephant.xyz';
  }
  else if (location == "testweb.myelephant.xyz") {
    return 'test.myelephant.xyz';
  }
  else if (location == "myelephant.xyz") {
    return 'service.myelephant.xyz';
  }
  else if (location == "localhost") {
    return 'elephant.local';
  }
}