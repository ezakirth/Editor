"use strict";

var solo = true;
var Editor, Game;
function init(editMode) {
    Graphics.init();

    if (editMode) {
        Editor.init();
        Editor.input.init();
        loopEditor();
    }
    else {
        Game.init();
        Game.input.init();
        loopGame();
    }
}

function loopEditor() {
    // logic
    Editor.input.update();
    Editor.update();

    // graphics
    Editor.render();

    requestAnimationFrame(loopEditor);
}

function loopGame() {
    // logic
    Game.update();

    // graphics
    Game.render();

    requestAnimationFrame(loopGame);
}




(function () {
    var script = document.createElement('script');
    script.onload = function () {
        var stats = new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop() {
            stats.update();
            requestAnimationFrame(loop)
        });
    };
    script.src = 'lib/stats.js';
    document.head.appendChild(script);
})()
