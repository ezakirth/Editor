class Player
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    render()
    {
        Graphics.pushMatrix();
        Graphics.translate(Graphics.width / 2, Graphics.height / 2);

        Graphics.sprite("shadow", 0, 0, Game.map.tileSize * ((320 / 3) / 210), Game.map.tileSize);
        Graphics.spriteSheet("Toon", 0, 0, 320 / 3, 210, 0, 0, Game.map.tileSize * ((320 / 3) / 210), Game.map.tileSize);
        Graphics.popMatrix();
    }

}
