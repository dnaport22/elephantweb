elephant.controller('UseraccountController', function($scope, $stateParams, $http) {

  var BASE_URL = 'http://maddna.xyz/activation.php';
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



})
