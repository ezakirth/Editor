"use strict";

var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_Q = 81;
var KEY_D = 68;
var KEY_Z = 90;
var KEY_S = 83;


var Input = {
    origin: new Vector(),
    pos: new Vector(),
    real: new Vector(),
    delta: new Vector(),
    key: Array(256),

    viewPos: new Vector(),
    speed: 10,
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


    inputUp: function (e)
    {
        if (e.button == 0) Input.mouse.left = false;
        if (e.button == 1) Input.mouse.middle = false;
        if (e.button == 2) Input.mouse.right = false;

        Input.origin.x = Input.pos.x;
        Input.origin.y = Input.pos.y;
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

        Input.origin.x = Input.pos.x;
        Input.origin.y = Input.pos.y;
        Input.getPosition(Input.pos, e);
    },

    inputMove: function (e)
    {
        Input.origin.x = Input.pos.x;
        Input.origin.y = Input.pos.y;
        Input.getPosition(Input.pos, e);

        if (Input.mouse.right)
        {
            Input.delta.x = -(Input.origin.x - Input.pos.x) * Input.speed;
            Input.delta.y = -(Input.origin.y - Input.pos.y) * Input.speed;

            Input.viewPos.x -= Input.delta.x;
            Input.viewPos.y -= Input.delta.y;
        }
    },

    inputKeyDown: function (e)
    {
        Input.key[e.keyCode] = true;
    },

    inputKeyUp: function (e)
    {
        Input.key[e.keyCode] = false;
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
