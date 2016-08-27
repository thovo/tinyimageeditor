'use strict';

function filter1() {
    var pixels = createImageData();

    var output = filterImage(convolute, pixels, [0, -1, 0, -1, 5, -1,
        0, -1, 0
    ]);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    context.putImageData(output, 0, 0);

};
