'use strict';
(function() {
  var canvas = document.getElementById('main-frame');
  var context = canvas.getContext('2d');
  var uploadButton = document.getElementById('btn-upload');
  var downloadButton = document.getElementById('btn-download');
  var inputUpload = document.getElementById('input-upload');
  var image = new Image();

  function addEventsListener() {
    uploadButton.addEventListener('click', toggleOpenFileDialog, false);
    inputUpload.addEventListener('change', uploadImage, false);
    downloadButton.addEventListener('click', downloadImage, false);
  }

  function toggleOpenFileDialog() {
    inputUpload.click();
  }

  function uploadImage() {
    if (this.files && this.files[0]) {
        var fr = new FileReader();
        fr.onload = function(e) {
            img.onload = function() {
                context.drawImage(img, 0, 0);
            };
            img.src = e.target.result;
        };
        fr.readAsDataURL(this.files[0]);
    }
  }

  function downloadImage() {
    var image = canvas.toDataURL();
    var link = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click");
    link.download = 'image.png';
    link.href = image;
    link.dispatchEvent(evt);
  }

  function init() {
    addEventsListener();
  }

  document.addEventListener('DOMContentLoaded', function() {
   init();
  }, false);

})();
