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
    speed: 1,
    mouse: { left: false, middle: false, right: false },

    init: function ()
    {
        window.addEventListener('touchstart', Input.inputDown);
        window.addEventListener('touchend', Input.inputUp);
        window.addEventListener('touchmove', Input.inputMove);

        window.addEventListener('mousedown', Input.inputDown);
        window.addEventListener('mouseup', Input.inputUp);
        window.addEventListener('mousemove', Input.inputMove);

        window.addEventListener('keyup', Input.inputKeyUp);
        window.addEventListener('keydown', Input.inputKeyDown);

        window.addEventListener('contextmenu', Input.rightClick);
        window.addEventListener('wheel', Input.wheelAction);

    },

    wheelAction: function (e)
    {
        if (Editor) Editor.map.tileSize += (e.deltaY / Math.abs(e.deltaY)) * 2;
    },

    rightClick: function (e)
    {
        e.preventDefault();
        return false;
    },

    update: function ()
    {

        if (Input.keyLeft)
        {
            Input.inertia.x += Input.speed;
            Input.viewPos.x -= Input.speed;
        }
        if (Input.keyRight)
        {
            Input.inertia.x -= Input.speed;
            Input.viewPos.x += Input.speed;
        }

        if (Input.keyUp)
        {
            Input.inertia.y += Input.speed;
            Input.viewPos.y -= Input.speed;
        }
        if (Input.keyDown)
        {
            Input.inertia.y -= Input.speed;
            Input.viewPos.y += Input.speed;
        }
        Input.viewPos.y -= Input.inertia.y * Input.speed;
        Input.inertia.y -= (Input.inertia.y / 20) * Input.speed;

        Input.viewPos.x -= Input.inertia.x * Input.speed;
        Input.inertia.x -= (Input.inertia.x / 20) * Input.speed;

    },

    inputUp: function (e)
    {
        if (e.button == 0) Input.mouse.left = false;
        if (e.button == 1) Input.mouse.middle = false;
        if (e.button == 2) Input.mouse.right = false;

        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        if (Editor && e.button == 0)
        {
            Editor.calculateShadows();
        }
    },

    inputDown: function (e)
    {
        Input.mouse.left = (e.button == 0);
        Input.mouse.middle = (e.button == 1);
        Input.mouse.right = (e.button == 2);

        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        Input.origin.x = Input.pos.x;
        Input.origin.y = Input.pos.y;
        Input.getPosition(Input.pos, e);
        //        if (!Editor.active || Input.real.x > 276)
        //           Editor.touch(Input.pos.x, Editor.height - Input.pos.y);
    },

    inputMove: function (e)
    {
        Input.last.x = Input.pos.x;
        Input.last.y = Input.pos.y;
        Input.getPosition(Input.pos, e);

        if (Input.mouse.right)
        {
            var deltaX = -(Input.last.x - Input.pos.x) * Input.speed;
            var deltaY = -(Input.last.y - Input.pos.y) * Input.speed;

            Input.viewPos.x -= deltaX;
            Input.viewPos.y -= deltaY;
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

        point.x = Input.real.x * Graphics.ratio.x;
        point.y = (Input.real.y - Graphics.offset.y) * Graphics.ratio.y;
    },
};
