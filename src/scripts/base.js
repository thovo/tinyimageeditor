'use strict';
var img = new Image();

/**
 * Add onChange evenement into input[file]
 * @return {[type]} [description]
 */
function onLoad() {
    document.getElementById("fileUpload").addEventListener("change", readImage, false);
}

/**
 * Read image and scan it into canvas
 * @return {[type]} [description]
 */
function readImage() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function(e) {
            img.onload = function() {

                //wrap canvas by image to that we can apply filter as we want to
                canvas.height = img.height;
                canvas.width = img.width;

                context.drawImage(img, 0, 0);
            };
            img.src = e.target.result;
        };
        FR.readAsDataURL(this.files[0]);
    }
}

function filterImage(filter, image, var_args) {
    var args = [image];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
};

/**
 * Get image data
 * @return {imagedata} [Data like pixels, width, height]
 */
function getImageData() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    return context.getImageData(0, 0, canvas.width, canvas.height);
}
