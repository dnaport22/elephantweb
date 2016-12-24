elephant.factory('Update', function() {
  var deploy = new Ionic.Deploy();
  return {
    doUpdate: function() {
      deploy.Update().then(function(res) {
        console.log('Ionic Deploy: Update', res);
      }, function(err) {
        console.log('Ionic Deploy: Update error! ', err);
      }, function(prog) {
        console.log('Ionic Deploy: Progress... ', prog);
      });
    },

    checkForUpdates: function() {
      console.log('Ionic Deploy: Checking for updates');
      deploy.check().then(function(hasUpdate) {
        this.doUpdate();
        console.log('Ionic Deploy: Update available: ' + hasUpdate);
        $scope.hasUpdate = hasUpdate;
      }, function(err) {
        console.error('Ionic Deploy: Unable to check for updates', err);
      });
    }
  }
})
