"use strict";

var Input = {
    active: false,
    last: { x: 0, y: 0 },
    origin: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    real: { x: 0, y: 0 },
    delta: 0,
    inertia: { x: 0, y: 0 },
    keyLeft: false,
    keyRight: false,
    keyUp: false,
    keyDown: false,
    viewPos: { x: 0, y: 0 },
    update: function ()
    {

        if (Input.keyLeft)
        {
            Input.inertia.x += speed;
            Input.viewPos.x -= 5 * speed;
        }
        if (Input.keyRight)
        {
            Input.inertia.x -= speed;
            Input.viewPos.x += 5 * speed;
        }

        if (Input.keyUp)
        {
            Input.inertia.y += speed;
            Input.viewPos.y -= 5 * speed;
        }
        if (Input.keyDown)
        {
            Input.inertia.y -= speed;
            Input.viewPos.y += 5 * speed;
        }
        Input.viewPos.y -= Input.inertia.y * speed;
        Input.inertia.y -= (Input.inertia.y / 20) * speed;

        Input.viewPos.x -= Input.inertia.x * speed;
        Input.inertia.x -= (Input.inertia.x / 20) * speed;

    },

    inputUp: function (e)
    {
        Input.active = false;
        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        //        Game.selected = null;
    },

    inputDown: function (e)
    {
        Input.active = true;
        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        Input.origin.x = Input.pos.x;
        Input.origin.y = Input.pos.y;
        Input.getPosition(Input.pos, e);
        //        if (!Editor.active || Input.real.x > 276)
        //           Game.touch(Input.pos.x, Game.height - Input.pos.y);
    },

    inputMove: function (e)
    {
        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        Input.getPosition(Input.pos, e);

        if (Input.active)
        {
            var deltaX = (Input.last.x - Input.pos.x) * speed;
            var deltaY = (Input.last.y - Input.pos.y) * speed;
            Input.viewPos.x += deltaX;
            Input.viewPos.y += deltaY;
            Input.inertia.x = deltaX;
            Input.inertia.y = deltaY;
        }
    },

    inputKeyDown: function (e)
    {
        if (e.keyCode == 37)
        { // left
            Input.keyLeft = true;
        }
        if (e.keyCode == 39)
        { // right
            Input.keyRight = true;
        }
        if (e.keyCode == 38)
        { // up
            Input.keyUp = true;
        }
        if (e.keyCode == 40)
        { // down
            Input.keyDown = true;
        }
    },

    inputKeyUp: function (e)
    {
        if (e.keyCode == 37)
        { // left
            Input.keyLeft = false;
        }
        if (e.keyCode == 39)
        { // right
            Input.keyRight = false;
        }
        if (e.keyCode == 38)
        { // up
            Input.keyUp = false;
        }
        if (e.keyCode == 40)
        { // down
            Input.keyDown = false;
        }
    },

    getPosition: function (point, event)
    {
        if (event.touches)
        {
            Input.real.x = event.touches[0].pageX;
            Input.real.y = event.touches[0].pageY;
        }
        else
        {
            Input.real.x = event.pageX;
            Input.real.y = event.pageY;
        }

        point.x = Input.real.x;
        point.y = Input.real.y;
    },
};

document.addEventListener('touchstart', Input.inputDown);
document.addEventListener('touchend', Input.inputUp);
document.addEventListener('touchmove', Input.inputMove);

document.addEventListener('mousedown', Input.inputDown);
document.addEventListener('mouseup', Input.inputUp);
document.addEventListener('mousemove', Input.inputMove);

document.addEventListener('keyup', Input.inputKeyUp);
document.addEventListener('keydown', Input.inputKeyDown);
