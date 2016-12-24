elephant.controller('MainpageCtrl', function($scope, $http, $ionicPlatform,$ionicModal,$location, $timeout, $state, $localStorage, UIfactory, elephantData_URL, $ionicAnalytics) {

  UIfactory.showSpinner();

  $scope.items = [];
  var offset = 0;
  var limit = 10;
  var retrieved = 0;

  $scope.loadMore = function() {
    $http({ url: elephantData_URL.GET_ALL_ITEM_URL, method: elephantData_URL.GET_ALL_ITEM_TYPE,
      params: {
        offset: offset,
        limit: limit,
        filter: inputVal.getValue('search'),
      }}).success(function(response) {
        $scope.items = $scope.items.concat(response.items)
        retrieved = response.items.length
        offset += retrieved
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
        UIfactory.hideSpinner();
    }).error(function(error) {
      $scope.loadMore();
    });
  };

  $scope.search = function(filter) {
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

  $scope.pullToRefresh = function() {
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

  $scope.check = function() {
    return retrieved > 0
  }


  $scope.trafficLight = function(route, item_name, item_desc, item_date, item_uid, item_img) {
    if (route == 'getitem') {
      if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
      $location.path("/app/getitem/" + item_name + "/" + item_desc + "/" + item_date + "/" + item_uid + "/" + item_img )
    }
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });

  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false})
    $scope.$broadcast('scroll.refreshComplete');
  }

 });
