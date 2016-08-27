'use strict';
var img = new Image();


function readImage() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function(e) {
            img.onload = function() {
                context.drawImage(img, 0, 0);
            };
            img.src = e.target.result;
        };
        FR.readAsDataURL(this.files[0]);
    }
}

function onLoad() {
    document.getElementById("fileUpload").addEventListener("change", readImage, false);
}

function filterImage(filter, image, var_args) {
    var args = [image];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
};

function createImageData() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

function convolute(pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = createImageData();
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r = 0,
                g = 0,
                b = 0,
                a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy * sw + scx) * 4;
                        var wt = weights[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a += src[srcOff + 3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    return output;
};
