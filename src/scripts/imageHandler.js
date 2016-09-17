'use strict';
(function() {
  var canvas = document.getElementById('main-frame');
  var context = canvas.getContext('2d');
  var uploadButton = document.getElementById('btn-upload');
  var downloadButton = document.getElementById('btn-download');
  var undoButton = document.getElementById('btn-undo');
  var inputUpload = document.getElementById('input-upload');
  var filterButtons = document.getElementsByClassName('filter');
  var undoData = {};

  function addEventsListener() {
    uploadButton.addEventListener('click', toggleOpenFileDialog, false);
    inputUpload.addEventListener('change', uploadImage, false);
    downloadButton.addEventListener('click', downloadImage, false);
    undoButton.addEventListener('click', undoChange, false);
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', filters, false);
    }
  }

  function filters(e) {
    var filter = e.target.id;
    var imageData = {};
    if (canvas.width > 0 && canvas.height > 0) {
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      undoData = context.getImageData(0, 0, canvas.width, canvas.height);
    }
    switch (filter) {
      case 'grayscale':
        grayScale(imageData);
        break;
      case 'sepia':
        sepia(imageData);
        break;
      case 'brightness':
        brightness(imageData);
        break;
      default:

    }
  }

  function grayScale(imageData) {
    var d = imageData.data;
    var len = d.length;
    for (var i = 0; i < len; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
    }
    updateCanvas(imageData);
  }

  function sepia(imageData) {
    var d = imageData.data;
    var len = d.length;
    for (var i = 0; i < len; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
      d[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
      d[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
    }
    updateCanvas(imageData);
  }

  function brightness(imageData) {
    var d = imageData.data;
    var len = d.length;
    for (var i = 0; i < len; i += 4) {
          d[i] += 50;     // red
          d[i + 1] += 50; // green
          d[i + 2] += 50; // blue
        }
    updateCanvas(imageData);
  }

  function undoChange() {
    updateCanvas(undoData);
  }

  function updateCanvas(imageData) {
    context.putImageData(imageData, 0, 0);
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
