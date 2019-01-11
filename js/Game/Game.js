var Game = {
    map: null,

    init: function ()
    {
        this.map.init();

        this.players = new Player(3 * this.map.tileSize, 3 * this.map.tileSize);
    },

    update: function ()
    {
        this.players.x = Input.viewPos.x;
        this.players.y = Input.viewPos.y;
    },

    render: function ()
    {
        Graphics.clear();

        Graphics.sprite("bg", Graphics.width / 2, Graphics.height / 2, Graphics.width, Graphics.height);

        //        this.map.render();
        this.map.draw(this.players);

        this.players.render();

        Graphics.sprite("vignette", Graphics.width / 2, Graphics.height / 2, Graphics.width, Graphics.height);


    }
};
