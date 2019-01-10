"use strict";

var Editor, Game;
function init(editMode)
{

    Input.init();

    if (editMode)
    {
        Graphics.width = 1920;
        Graphics.height = 1080;
        Graphics.init();
        $(Graphics.canvas).css({ width: '100%' });

        Editor.init();
        loopEditor();
    }
    else
    {
        Graphics.width = 1920 / 2;
        Graphics.height = 1080 / 2;
        Graphics.init();
        Graphics.offset.y = 0;
        $('body').css({ display: 'block' });
        $(Graphics.canvas).css({ width: '50%' });

        Game.init();
        loopGame();
    }
}

function loopEditor()
{
    // logic
    Input.update();
    Editor.update();

    // graphics
    Editor.render();

    requestAnimationFrame(loopEditor);
}

function loopGame()
{
    // logic
    Input.update();
    Game.update();

    // graphics
    Game.render();

    requestAnimationFrame(loopGame);
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
