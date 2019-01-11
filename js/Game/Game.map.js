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
        this.x = Game.players.x / this.tileSize;
        this.y = Game.players.y / this.tileSize;
        var ix = Math.floor(this.x);
        var fx = this.x - ix;
        var fx = fx * this.tileSize;
        var iy = Math.floor(this.y);
        var fy = this.y - iy;
        var fy = fy * this.tileSize;
        var px = 0;
        var py = 0;

        Graphics.pushMatrix();
        Graphics.translate(Graphics.width / 2 + this.tileSize / 2 - fx, Graphics.height / 2 + this.tileSize / 2 - fy);

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

    },

    draw: function (player)
    {
        var block = null;
        //   strokeWidth(1);

        var bigfastmorph = this.tileSize - Math.abs(Math.sin(ElapsedTime * 5) * 20);
        var bigslowmorph = this.tileSize - Math.abs(Math.sin(ElapsedTime * 2) * 20);
        var smallfastmorph = this.tileSize - Math.abs(Math.sin(ElapsedTime * 5) * 10);
        var smallslowmorph = this.tileSize - Math.abs(Math.sin(ElapsedTime * 2) * 10);

        var mx = player.x / this.tileSize;
        var my = player.y / this.tileSize;
        var ix = Math.floor(mx);
        var fx = (mx - ix) * this.tileSize;
        var iy = Math.floor(my);
        var fy = (my - iy) * this.tileSize;

        Graphics.pushMatrix();
        var w = Math.ceil(Graphics.width / this.tileSize / 2);
        var h = Math.ceil(Graphics.height / this.tileSize / 2);
        Graphics.translate(Graphics.width / 2 + this.tileSize / 2 - fx, Graphics.height / 2 + this.tileSize / 2 - fy);

        var px = -w * this.tileSize;
        var py = -h * this.tileSize;


        for (var x = ix - w; x <= ix + w; x++)
        {
            for (var y = iy - h; y <= iy + h; y++)
            {
                if (x < this.w && y < this.h && x >= 0 && y >= 0)
                {
                    block = this.data[x][y];
                    // read && display tile content;
                    if (block.tex)
                    {
                        Graphics.sprite(block.tex, px, py, this.tileSize, this.tileSize);
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
                        tint(block.portal.r, block.portal.g, block.portal.b, 140);
                        pushMatrix();
                        translate(px, py);
                        rotate(ElapsedTime * 300);
                        sprite("portal", 0, 0, bigslowmorph);
                        popMatrix();
                        tint(255);
                    }
                    if (block.pickup)
                    {
                        Graphics.sprite("light", px, py, bigfastmorph, bigfastmorph);
                        Graphics.sprite(block.pickup, px, py, smallslowmorph, smallslowmorph);
                    }
                }
                py = py + this.tileSize;
            }
            px = px + this.tileSize;
            py = -h * this.tileSize;
        }


        Graphics.popMatrix();
    }



}
