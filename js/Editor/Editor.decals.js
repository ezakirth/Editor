/**
 * remove decals
 */
Editor.removeDecal = function (type)
{
    for (var x = 0; x < this.map.w; x++)
    {
        for (var y = 0; y < this.map.h; y++)
        {
            var tile = this.map.data[x][y];

            if (tile.tex && tile.tex.startsWith('floor'))
            {
                for (var i = tile.decals.length - 1; i >= 0; i--)
                {
                    if (Math.random() > .5 && tile.decals[i].startsWith(type))
                    {
                        tile.decals.splice(i, 1);
                    }
                }
            }
        }
    }
}

/**
 * add decals
 */
Editor.addDecal = function (type)
{
    for (var x = 0; x < this.map.w; x++)
    {
        for (var y = 0; y < this.map.h; y++)
        {
            var tile = this.map.data[x][y];

            if (tile.tex && tile.tex.startsWith('floor'))
            {
                if (Math.random() > .95)
                {
                    tile.decals.push(type + '_' + Math.floor(Math.random() * 6 + 1));
                }
            }
        }
    }
}

/**
 * paint shadows
 */
Editor.calculateShadows = function ()
{
    for (var x = 0; x < this.map.w; x++)
    {
        for (var y = 0; y < this.map.h; y++)
        {
            var tile = this.map.data[x][y];
            if (tile.tex && tile.tex.startsWith('floor'))
            {
                tile.shadow = null;
                var pCL = { x: (x - 1).clamp(0, this.map.w - 1), y: y };
                var pBL = { x: (x - 1).clamp(0, this.map.w - 1), y: (y + 1).clamp(0, this.map.h - 1) };
                var pBC = { x: x, y: (y + 1).clamp(0, this.map.h - 1) };

                var CL = this.map.data[pCL.x][pCL.y];
                var BL = this.map.data[pBL.x][pBL.y];
                var BC = this.map.data[pBC.x][pBC.y];

                if (CL.solid && BC.solid) tile.shadow = 'shadow_1';
                if (!BL.solid && BC.solid) tile.shadow = 'shadow_2';
                if (!BL.solid && !BC.solid && CL.solid) tile.shadow = 'shadow_3';
                if (BL.solid && BC.solid && !CL.solid) tile.shadow = 'shadow_4';
                if (CL.solid && BL.solid && !BC.solid) tile.shadow = 'shadow_5';
                if (BL.solid && !CL.solid && !BC.solid) tile.shadow = 'shadow_6';

            }
        }
    }
}
