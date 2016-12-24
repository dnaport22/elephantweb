elephant.constant('elephantData_URL', {
  GET_ALL_ITEM_URL: 'http://maddna.xyz/getitems.php',
  GET_ALL_ITEM_TYPE: 'GET',
  LOGIN_USER_URL: 'http://maddna.xyz/login.php',
  LOGIN_USER_TYPE: 'POST',
  REGISTER_USER_URL: 'http://maddna.xyz/register.php',
  REGISTER_USER_TYPE: 'POST',
  GET_USER_ITEM_URL: 'http://maddna.xyz/myitems.php',
  GET_USER_ITEM_TYPE:'GET',
  DELETE_USER_ITEM_URL: 'http://maddna.xyz/dismiss.php',
  DELETE_USER_ITEM_TYPE: 'POST',
  POST_ITEM_URL: 'http://maddna.xyz/postitem.php',
  POST_ITEM_TYPE: 'POST',
  REQUEST_ITEM_URL: 'http://maddna.xyz/message.php',
  REQUEST_ITEM_TYPE: 'POST'
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
