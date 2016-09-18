'use strict';

function filter2() {
    var pixels = getImageData();

    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // red
        d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // green
        d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // blue
    }

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    context.putImageData(pixels, 0, 0);
}
