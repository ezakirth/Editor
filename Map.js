"use strict";
class Map
{
    constructor(w, h)
    {
        this.x = 0;
        this.y = 0;

        this.w = w;
        this.h = h;

        this.size = 96;

        this.data = JSON.parse(localStorage.getItem('tileData'));
        if (!this.data)
        {
            this.data = Array(this.w);
            for (var x = 0; x < this.w; x++)
            {
                this.data[x] = Array(this.h);
                for (var y = 0; y < this.h; y++)
                {
                    this.data[x][y] = new Tile();
                }
            }
        }
        this.w = this.data.length;
        this.h = this.data[0].length;

        $("#editor_Width_id").val(this.w);
        $("#editor_Height_id").val(this.h);
    }

    load(data)
    {
        this.data = data;
        this.w = this.data.length;
        this.h = this.data[0].length;
        $("#editor_Width_id").val(this.w);
        $("#editor_Height_id").val(this.h);

    }

    render()
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

        Graphics.pushMatrix();
        Graphics.translate(this.size / 2 - fx, this.size / 2 - fy);

        this.nb = 0;
        let maxX = ix + Math.ceil(Graphics.width / this.size) + 1;
        let maxY = iy + Math.ceil(Graphics.height / this.size) + 1;

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
                        Graphics.sprite(block.tex, px, py, this.size, this.size);
                    }
                    if (block.shadow)
                    {
                        Graphics.sprite(block.shadow, px, py, this.size, this.size);
                    }
                    if (block.decals)
                    {
                        for (var i = 0; i < block.decals.length; i++)
                        {
                            Graphics.sprite(block.decals[i], px, py, this.size, this.size);
                        }
                    }
                    if (block.portal)
                    {
                        if (block.portal.dx)
                        {
                            //                       tint(block.portal.r, block.portal.g, block.portal.b, 140);
                        }
                        Graphics.sprite("assets/portal", px, py, this.size);
                        //                    tint(255);
                    }
                    if (block.pickup)
                    {
                        Graphics.sprite("assets/light", px, py, this.size);
                        Graphics.sprite(block.pickup, px, py, this.size);
                    }
                    if (Editor.showGrid)
                    {
                        if (block.solid)
                        {
                            Graphics.fill(255, 0, 0, 30);
                        } else
                        {
                            Graphics.fill(0, 255, 0, 30);
                        }
                        Graphics.rect(px - this.size / 2, py - this.size / 2, this.size, this.size);
                    }
                }
                py = py + this.size;
            }
            px = px + this.size;
            py = 0;
        }

        Graphics.popMatrix();

    }



}
