'use strict';

//--listen to an url link
//when text change: if text has value, enable the button apply
var url_input = document.getElementById('cp-url');
url_input.addEventListener("input", function (e) {
    var cl = document.getElementById('cp-url-app').classList;
    var url = e.target.value;
    if (url.length != '') {
        show(cl);
        document.getElementById('cp-url-app').addEventListener('click',function()   {
            filterPattern('', url);
        })
    } else {
        hide(cl);
    }
});

function showOptionCp() {
    var cp_input_id = ["cp-url","cp-img"];
    cp_input_id.forEach(function(input)    {
        var cl = document.getElementById(input).classList;
        show(cl);
    });
}

// --- the filters
/**
 * Apply layer in front of the main image
 * @param {string} filterMode: equal to callback function's name that defined in children sections
 */
function filterLayer(filterMode) {

    //I need context from my canvas (we should build by a pattern that some one send me a canvas)
    var canvas = document.getElementById("main-frame");
    var context = canvas.getContext("2d");

    //get back my image from canvas
    var image = new Image();
    image.src = canvas.toDataURL();
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "soft-light"; //or lighter maybe?

    // apply filter
    window[filterMode](context, canvas);
}

/**
 * Load background layer (pattern) before loading main image
 * @param {string} patternMode: keyword defined in patternSrc associated array
 * @param {string} patternSource: defined by user or other function (for further development)
 */
function filterPattern(patternMode, patternSource) {
    var canvas = document.getElementById("main-frame");
    var context = canvas.getContext("2d");
    context.globalCompositeOperation = "multiple";

    //load my image source
    var image = new Image();
    image.src = canvas.toDataURL();

    var patternSrc = {
        'rainy': 'https://3.bp.blogspot.com/-W__wiaHUjwI/Vt3Grd8df0I/AAAAAAAAA78/7xqUNj8ujtY/s1600/image02.png',
        'forest': 'http://10steps.sg/wp-content/uploads//2012/04/fantasy-photoshop-tutorial-12.jpg'
    };

    //draw pattern first
    var pattern = new Image();
    pattern.src = (patternMode == '') ? patternSource : patternSrc[patternMode];
    pattern.onload = function () {
        context.drawImage(pattern, 0, 0, canvas.width, canvas.height);
    };
    context.globalCompositeOperation = "lighter";

    //then draw my image
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

//***** children section *****//

// filter
/**
 * rainbow filter
 * @param {CanvasRenderingContext2D} context
 * @param {Object} canvas
 */
function rainbowFilter(context, canvas) {

    //I paint my context by rainbow
    var gradient = context.createLinearGradient(0, canvas.height, canvas.width, canvas.height);
    gradient.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
    gradient.addColorStop(0.333, 'rgba(225, 255, 0, 1.000)');
    gradient.addColorStop(0.666, 'rgba(0, 255, 17, 1.000)');
    gradient.addColorStop(1.000, 'rgba(0, 55, 255, 1.000)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function show(classList) {
    if(classList.contains('hide'))  {
        classList.add('show');
        classList.remove('hide');
    }
}

function hide(classList) {
    if(classList.contains('show'))  {
        classList.add('hide');
        classList.remove('show');
    }
}
