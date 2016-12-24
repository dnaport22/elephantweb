elephant.controller('PostitemController_web', function($scope,$localStorage ,$ionicActionSheet, $timeout, $cordovaCamera, $cordovaFileTransfer, $window, UIfactory, elephantData_URL, elephantData_POSTITEM, $http) {
  var itemNameid = elephantData_POSTITEM.ITEM_NAME;
  var itemDescid = elephantData_POSTITEM.ITEM_DESC;
  var itemImageid = elephantData_POSTITEM.ITEM_IMAGE;

 /**
  * Description: triggers click() on the hidden file input element
  */
  $scope.webAppFile = function() {
    return document.getElementById('web_file_input').click();
  }

  /**
   * @var mixed
   */
  var imageToUpload = null;

  /**
   * Description: triggered when image is selected
   *              an event listener "load" listens
   *              to the new file input and enable the image container.
   */
  $scope.previewImage = function() {
    var file = document.querySelector('input[type=file]').files[0];
    var imageReader = new FileReader();
    imageReader.addEventListener("load", function(event) {
      var imageFile = event.target;
      var image = document.getElementById('upImage');
      imageToUpload = file;
      image.style.backgroundImage = "url('" + imageFile.result + "')";
      document.getElementById("upload-image-container").style.display = "block";
      document.getElementById("select-image-button").innerHTML= "Reselect Image";
    })
    imageReader.readAsDataURL(file);
  }

  /**
   * Description: triggered by the user when ready to upload item
   */
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
      //var imageSrc = $scope.getFileName(fileURL);
      var uploadData = new FormData();
      uploadData.append('itemName', itemName);
      uploadData.append('desc', itemDesc);
      uploadData.append('code', $localStorage.user_activation);
      uploadData.append('file', imageToUpload);

      var postItem = new Submitform('POST', serverURL, uploadData, false)
      postItem.ajaxFileSubmit(this);
    }
  }

  /**
   * Response callback from ajaxFileSubmit; method of Submitform Object
   */
  $scope.onSuccess = function(response) {
    var itemName = inputVal.getValue(itemNameid);
    UIfactory.hideSpinner();
    UIfactory.showAlert('Success', 'Your ' + itemName + ' will be posted on the elephant app soon after approval by our team within 24 hours.');
    reloadForm();
  }
  $scope.onError = function(error) {
    UIfactory.hideSpinner();
    UIfactory.showAlert('Alert', 'An error occured file uploading the item, please contact app admintrantion team if error presist');
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
