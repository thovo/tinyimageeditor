'use strict';

function grayscale() {
    var pixels = getImageData();

    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        d[i] = d[i + 1] = d[i + 2] = (r + g + b) / 3;
    }

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    context.putImageData(pixels, 0, 0);
};
