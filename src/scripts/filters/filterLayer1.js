'use strict';

function filterLayer1() {

    //now I need context from my canvas (we should build by a pattern that some one send me a canvas)
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    //get back my image from canvas (a little redundancy)
    var image = new Image();
    image.src = canvas.toDataURL();
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "soft-light";    //hoặc mình hòa nhập filter mạnh hơn bằng value "lighter"

    //I paint my context by rainbow
    var gradient = context.createLinearGradient(0, canvas.height, canvas.width, canvas.height);

    gradient.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
    gradient.addColorStop(0.333, 'rgba(225, 255, 0, 1.000)');
    gradient.addColorStop(0.666, 'rgba(0, 255, 17, 1.000)');
    gradient.addColorStop(1.000, 'rgba(0, 55, 255, 1.000)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
