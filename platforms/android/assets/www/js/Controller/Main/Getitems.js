elephant.controller('MainpageCtrl', function($ionicHistory, $scope, $http, $ionicPlatform,$ionicModal,$location, $timeout, $state, $localStorage, UIfactory, elephantData_URL, $ionicAnalytics, $templateCache, $ionicScrollDelegate, $rootScope) {
  $rootScope.slideHeader = false;
  $rootScope.pixelLimit = 0;

  /**
   * Loading spinner
   */
  UIfactory.showSpinner();

  /**
   * Home page view list & grid
   */
  $scope.viewType = 'list';
  $scope.changeToGrid = function(type) {
    if(type == 'list') {
      $scope.viewType = 'grid';
    }
    else if (type == 'grid') {
      $scope.viewType = 'list';
    }
  }

  /**
   * Variables and array to store and retrieve items
   */
  $scope.items = [];
  var offset = 0;
  var limit = 10;
  var retrieved = 0;

  /**
   * Description: loadMore() function is used to retrieve items from the server.
   * Params: offset => last position of the items fetched,
   *         limit => number of items to be fetched (default = 10),
   *         filter => serach input
   * @return items from the server $scope.items[]
   */
  $scope.loadMore = function() {
    $http({ url: elephantData_URL.GET_ALL_ITEM_URL, method: elephantData_URL.GET_ALL_ITEM_TYPE, cache: $templateCache,
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

  /**
   * Description: search() function is called on ng-change in search input field,
   * it calls the loadMore() function and display clear button in the input field.
   */
  $scope.inputVal = false;
  $scope.search = function(filter) {
    $scope.inputVal = true;
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

  $scope.pullToRefresh = function() {
    $scope.items = [];
    offset = 0
    $templateCache.removeAll();
    $scope.loadMore();
  }

  /**
   * Description: check() function is called by infinite scroll to check if there
   * are items in the $scope.items array.
   */
  $scope.check = function() {
    return retrieved > 0
  }

  /**
   * Description: used for navigating user to getitem and login/post item page.
   */
  $scope.trafficLight = function(route, item_name, item_desc, item_date, item_uid, item_img) {
    if (route == 'getitem') {
      if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
      $location.path("/app/getitem/" + item_name + "/" + item_desc + "/" + item_date + "/" + item_uid + "/" + item_img )
    }
    else if (route == 'login') {
      $ionicHistory.nextViewOptions({disableBack: false});
      $location.path("app/login/postitem");
    }
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });

  $scope.reloadData = function() {
    $state.go($state.current, {reload: true, inherit: false})
    $scope.$broadcast('scroll.refreshComplete');
  }

  /**
   * Description: clears input field and hide clear button.
   */
  $scope.clearInput = function() {
    inputVal.setValue('search', '');
    $scope.inputVal = false;
    $scope.items = [];
    offset = 0
    $scope.loadMore();
  }

 });
