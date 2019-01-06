"use strict";
var Game = {


    map: null,


    init: function ()
    {
        Editor.init();

        this.map = new Map(20, 20);

    },

    update: function ()
    {
        Editor.update();

    },

    render: function ()
    {
        Graphics.clear();

        Graphics.sprite("bg", Graphics.width / 2, Graphics.height / 2, Graphics.width, Graphics.height);

        this.map.render();

        Graphics.sprite("vignette", Graphics.width / 2, Graphics.height / 2, Graphics.width, Graphics.height);


    },



}