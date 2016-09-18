'use strict';

function filter3() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    // ctx.strokeStyle = "#CCCC00";
    ctx.lineWidth = 20;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(20, 20, canvas.width - 40, canvas.height - 40);

    // var pixels = ctx.getImageData(20, 20, canvas.width - 40, canvas.height - 40);
    //
    // var d = pixels.data;
    // for (var i = 3, length = d.length; i < length; i += 4) {
    //     d[i] = 0;
    // }
    //
    // ctx.putImageData(pixels, 0, 0);
}
