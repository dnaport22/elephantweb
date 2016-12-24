elephant.controller('PostitemController', function($scope,$localStorage ,$ionicActionSheet, $timeout, $cordovaCamera, $cordovaFileTransfer, $window, UIfactory, elephantData_URL, elephantData_POSTITEM) {
  var itemNameid = elephantData_POSTITEM.ITEM_NAME;
  var itemDescid = elephantData_POSTITEM.ITEM_DESC;
  var itemImageid = elephantData_POSTITEM.ITEM_IMAGE;

  $scope.imageOptions = function() {
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-camera"></i>Capture using camera'},
        { text: '<i class="icon ion-images"></i>Select from gallery' }
      ],
      titleText: 'How would you like to select picture?',
      buttonClicked: function(index) {
        if (index == 0) {
          $scope.takePicture(Camera.PictureSourceType.CAMERA);
        }
        else if (index == 1) {
          $scope.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
        }
        else if (index == 2) {
          hideSheet();
        }
      }
    });
    $timeout(function() {
      hideSheet();
    }, 60000);
  };

  var imageToUpload = null;

  $scope.takePicture = function(source) {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 720,
      targetHeight: 720,
      popoverOption: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      MediaType: 0
    };

    $cordovaCamera.getPicture(options)
    .then(function(imageURI){
      var image = document.getElementById('upImage');
      var photo = 'data:image/jpeg;base64,' + imageURI;
      image.style.backgroundImage = "url('" + imageURI + "')";
      imageToUpload = imageURI;
      document.getElementById("upload-image-container").style.display = "block";
      document.getElementById("select-image-button").innerHTML= "Reselect Image";
    }, function(err) {
      //Show an event or run analytics functions if required...
    });


  }

  $scope.uploadItem = function() {
    UIfactory.showSpinner();
    var fileURL = imageToUpload;
    var serverURL = elephantData_URL.POST_ITEM_URL;
    var itemName = inputVal.getValue(itemNameid);
    var itemDesc = inputVal.getValue(itemDescid);
    if(itemName === "" || itemDesc === "" || fileURL == null) {
      UIfactory.hideSpinner();
      UIfactory.showAlert('Alert', 'Please fill all fields and select an image');
    }
    else {
      var imageSrc = $scope.getFileName(fileURL);
      var options = new FileUploadOptions();
      options.fileKey = 'file';
      options.fileName = imageSrc;
      options.mimeType = "image/jpeg";

      var params = new Object();
      params.itemName = itemName;
      params.desc = itemDesc;
      params.code = $localStorage.user_activation;
      options.params = params;

      $cordovaFileTransfer.upload(serverURL, fileURL, options)
        .then(function(result) {
          UIfactory.hideSpinner();
          UIfactory.showAlert('Success', 'Your ' + itemName + ' will be posted on the elephant app soon after approval by our team within 24 hours.');
          $cordovaCamera.cleanup();
          reloadForm();
        }, function(err) {
          UIfactory.hideSpinner();
          UIfactory.showAlert('Alert', 'An error occured file uploading the item, please contact app admintrantion team if error presist');
          $cordovaCamera.cleanup();
        }
      )
    }
  }

  var reloadForm = function() {
    inputVal.setValue(itemNameid, '');
    inputVal.setValue(itemDescid, '');
    imageToUpload = null;
    document.getElementById("upload-image-container").style.display = "none";
    document.getElementById("select-image-button").innerHTML= "Select Image";
  }

  $scope.getFileName = function(fileName) {
    file = fileName.substr(fileName.lastIndexOf('/')+1);
    finalName = null;
    fileCheck = file.split('.jpg');
    if (fileCheck[1] == '') {
      return file;
    }
    else {
      return fileCheck[0]+'.jpg';
    }
  }

  $scope.checkMaxLength = function() {
    var itemName = document.getElementById("name");
    var itemNameMaxLength = document.getElementById("name").maxLength;
    var itemNameWarning = document.getElementById("name-warning");
    var itemDesc = document.getElementById("desc");
    var itemDescMaxLength = document.getElementById("desc").maxLength;
    var itemDescWarning = document.getElementById("desc-warning");

    if (itemName.value.length == itemNameMaxLength) {
      itemName.style.color = "red";
      itemNameWarning.style.display = "block";
    } else {
      itemName.style.color = "black";
      itemNameWarning.style.display = "none";
    }

    if (itemDesc.value.length == itemDescMaxLength) {
      itemDesc.style.color = "red";
      itemDescWarning.style.display = "block";
    } else {
      itemDesc.style.color = "black";
      itemDescWarning.style.display = "none";
    }
  }

});
