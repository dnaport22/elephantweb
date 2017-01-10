elephant.controller('UseraccountController', function($scope, $stateParams, $http) {

  var BASE_URL = 'http://'+getUrl(window.location.host)+'/activation.php';
  var uniqueId = $stateParams.uniqueId;
  $scope.status = 0;
  $scope.message = null;

  $http({
    url: BASE_URL,
    method: 'GET',
    params: {
      uniqueId: uniqueId
    }}).success(function(response) {
      $scope.status = response.status;
      $scope.message = response.message;
    }).error(function(err) {
      $scope.status = 0
    })

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
  }


})