"use strict";

var canvas, ctx;
var map, speed = 2;

function setup()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;


    Editor.init();

    map = new Map(20, 20);

    render();
}

function render()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sprite("/assets/bg.png", 1920 / 2, 1080 / 2, 1920, 1080);

    map.draw();

    sprite("/assets/vignette.png", 1920 / 2, 1080 / 2, 1920, 1080);

    Input.update();
    requestAnimationFrame(render);
}













(function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = 'lib/stats.js'; document.head.appendChild(script); })()
