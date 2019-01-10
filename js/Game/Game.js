var Game = {
    map: null,

    init: function ()
    {
        this.map.init();
    },

    update: function ()
    {

    },

    render: function ()
    {
        Graphics.clear();

        Graphics.sprite("bg", Graphics.width / 2, Graphics.height / 2, Graphics.width, Graphics.height);

        this.map.render();

        Graphics.sprite("vignette", Graphics.width / 2, Graphics.height / 2, Graphics.width, Graphics.height);


    }
};
