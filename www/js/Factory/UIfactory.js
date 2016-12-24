elephant.factory('UIfactory', function($http, $ionicPopup, $ionicLoading) {
  return {
    showAlert: function(title, template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template,
      });
      return alertPopup;
    },
    showSpinner: function() {
      var ionicSpinner = $ionicLoading.show({
        content: 'Logging in',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      return ionicSpinner;
    },
    hideSpinner: function() {
      return $ionicLoading.hide();
    }
  }
})
