class Tile
{

    constructor(tex)
    {
        this.tex = tex;
        this.solid = 0;
        this.pickup = null;
        this.decals = {}
        this.portal = null;
        // only used in editor;
        this.decal = null;
    }
}
