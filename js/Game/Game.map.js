"use strict";
Game.map = {

    init: function ()
    {
        this.x = 0;
        this.y = 0;

        this.tileSize = 128;

        this.data = JSON.parse(localStorage.getItem('tileData'));

        this.w = this.data.length;
        this.h = this.data[0].length;
    },

    render: function ()
    {
        this.x = Input.viewPos.x / this.tileSize;
        this.y = Input.viewPos.y / this.tileSize;
        var ix = Math.floor(this.x);
        var fx = this.x - ix;
        var fx = fx * this.tileSize;
        var iy = Math.floor(this.y);
        var fy = this.y - iy;
        var fy = fy * this.tileSize;
        var px = 0;
        var py = 0;

        Graphics.pushMatrix();
        Graphics.translate(this.tileSize / 2 - fx, this.tileSize / 2 - fy);

        this.nb = 0;
        let maxX = ix + Math.ceil(Graphics.width / this.tileSize) + 1;
        let maxY = iy + Math.ceil(Graphics.height / this.tileSize) + 1;

        for (var x = ix; x < maxX; x++)
        {
            for (var y = iy; y < maxY; y++)
            {
                if (x < this.w && y < this.h && x >= 0 && y >= 0)
                {
                    this.nb++;
                    var block = this.data[x][y];
                    if (block.tex)
                    {
                        Graphics.sprite(block.tex, px, py, this.tileSize, this.tileSize);
                    }
                    if (block.shadow)
                    {
                        Graphics.sprite(block.shadow, px, py, this.tileSize, this.tileSize);
                    }
                    if (block.decals)
                    {
                        for (var i = 0; i < block.decals.length; i++)
                        {
                            Graphics.sprite(block.decals[i], px, py, this.tileSize, this.tileSize);
                        }
                    }
                    if (block.portal)
                    {
                        if (block.portal.dx)
                        {
                            //                       tint(block.portal.r, block.portal.g, block.portal.b, 140);
                        }
                        Graphics.sprite("assets/portal", px, py, this.tileSize);
                        //                    tint(255);
                    }
                    if (block.pickup)
                    {
                        Graphics.sprite("light", px, py, this.tileSize, this.tileSize);
                        Graphics.sprite(block.pickup, px, py, this.tileSize, this.tileSize);
                    }

                }
                py = py + this.tileSize;
            }
            px = px + this.tileSize;
            py = 0;
        }

        Graphics.popMatrix();

    }

}
