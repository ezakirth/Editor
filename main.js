"use strict";

function init()
{
    Graphics.init();
    Input.init();

    Editor.init();

    loop();
}

function loop()
{
    // logic
    Input.update();
    Editor.update();

    // graphics
    Editor.render();







    requestAnimationFrame(loop);
}





(function ()
{
    var script = document.createElement('script');
    script.onload = function ()
    {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop()
        {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = 'lib/stats.js';
    document.head.appendChild(script);
})()
