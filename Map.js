class Map
{
    constructor(w, h)
    {
        this.x = 0;
        this.y = 0;

        this.w = w;
        this.h = h;
        this.maxW = w * 3;
        this.maxH = h * 3;
        this.size = Math.floor(1920 / w);

        this.map = Array(this.maxW);
        for (var x = 0; x < this.maxW; x++)
        {
            this.map[x] = Array(this.maxH);
            for (var y = 0; y < this.maxH; y++)
            {
                let tile = '/assets/floor_1.png';
                if (Math.random() > .8)
                    tile = '/assets/floor_' + Math.floor(Math.random() * 6 + 1) + '.png';
                this.map[x][y] = new Tile(tile);
            }
        }

    }

    draw()
    {
        this.x = Input.viewPos.x / this.size;
        this.y = Input.viewPos.y / this.size;
        var ix = Math.floor(this.x);
        var fx = this.x - ix;
        var fx = fx * this.size;
        var iy = Math.floor(this.y);
        var fy = this.y - iy;
        var fy = fy * this.size;
        var px = 0;
        var py = 0;

        ctx.save();
        ctx.translate(this.size / 2 - fx, this.size / 2 - fy);

        for (var x = ix; x < ix + this.w + 1; x++)
        {
            for (var y = iy; y < iy + this.h; y++)
            {
                if (x < this.maxW && y < this.maxH && x >= 0 && y >= 0)
                {
                    var block = this.map[x][y];
                    if (block.tex)
                    {
                        sprite(block.tex, px, py, this.size, this.size);
                    }
                    if (block.decals)
                    {
                        for (var i = 0; i < block.decals.length; i++)
                        {
                            sprite(block.decals[i], px, py, this.size);
                        }
                    }
                    if (block.portal)
                    {
                        if (block.portal.dx)
                        {
                            //                       tint(block.portal.r, block.portal.g, block.portal.b, 140);
                        }
                        sprite("assets/portal", px, py, this.size);
                        //                    tint(255);
                    }
                    if (block.pickup)
                    {
                        sprite("assets/light", px, py, this.size);
                        sprite(block.pickup, px, py, this.size);
                    }
                    //                    if (editor.showGrid)
                    {
                        if (block.solid)
                        {
                            //                   fill(255, 0, 0, 30);
                        } else
                        {
                            //                    fill(0, 255, 0, 30);
                        }
                        //               rect(px - this.size / 2, py - this.size / 2, this.size, this.size);
                    }
                }
                py = py + this.size;
            }
            px = px + this.size;
            py = 0;
        }

        ctx.restore();

    }
}
