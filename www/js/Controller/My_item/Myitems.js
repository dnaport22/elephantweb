elephant.controller('MyitemsController', function($scope, $http, $timeout, $localStorage, $ionicActionSheet, elephantData_URL, UIfactory, $templateCache) {
  $scope.myitems = [];
  var offset = 0;
  var limit = 10;
  var retrieved = 0;

  $scope.itemOptions = function(itemid, item) {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: 'Delete'},
      ],
      buttonClicked: function(index) {
        if (index == 0) {
          var dataString = {
            code: $localStorage.user_activation,
            itemId: itemid
          }
          $.ajax({
            type: elephantData_URL.DELETE_USER_ITEM_TYPE,
            url: elephantData_URL.DELETE_USER_ITEM_URL,
            data: dataString,
            success:function(response) {
              console.log(dataString)
              hideSheet();
              var index = $scope.myitems.indexOf(item);
              $scope.myitems.splice(index, 1);
            },
            error: function(error) {
              UIfactory.showAlert('Error occured', 'An error occured while deleting your item')
            }
          })
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 60000);
  };

  $scope.loadMore = function() {
    UIfactory.showSpinner();
    $http({ url: elephantData_URL.GET_USER_ITEM_URL, method: elephantData_URL.GET_USER_ITEM_TYPE, cache: $templateCache,
      params: {
        code: $localStorage.user_activation,
        offset: offset,
        limit: limit
      }}).success(function(response) {
        //$scope.myitems = $scope.myitems.concat(response.items)
        $scope.processData(response.items)
        retrieved = response.items.length
        offset += retrieved
        $scope.$broadcast('scroll.infiniteScrollComplete');
        UIfactory.hideSpinner();
    });
  };

  $scope.processData = function(data) {
      for (i = 0; i < data.length; i++) {
        data[i]['image_url'] = 'http://'+getUrl(window.location.hostname)+'/'+'images/'+data[i]['image']
        $scope.myitems = $scope.myitems.concat(data[i])
      }
    }

  $scope.check = function() {
    return retrieved > 0
  }

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.loadMore();
  });

 });
