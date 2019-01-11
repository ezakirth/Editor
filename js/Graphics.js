"use strict";
var Graphics = {
    width: 1920,
    height: 1080,
    offset: { x: 0, y: 0 },
    ratio: { x: 0, y: 0 },
    canvas: null,
    ctx: null,
    cachedImages: {},

    init: function ()
    {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;
        this.ratio.x = this.width / $(this.canvas).width();
        this.ratio.y = this.height / $(this.canvas).height();
        this.offset.y = (window.innerHeight - $("#canvas").height()) / 2;
        Graphics.ctx.imageSmoothingEnabled = false;
    },

    clear: function ()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    sprite: function (img, x, y, w, h)
    {
        img = '/assets/' + img + '.png';
        let image = Graphics.cachedImages[img];

        if (!image)
        {
            Graphics.cachedImages[img] = new Image(256, 256);
            image = Graphics.cachedImages[img];
            image.src = img;
            image.onload = function ()
            {
                let width = w || this.naturalWidth;
                let height = h || this.naturalHeight;

                Graphics.ctx.drawImage(this, x - width / 2, y - height / 2, width, height);
            }
        }
        else
        {
            let width = w || image.naturalWidth;
            let height = h || image.naturalHeight;

            Graphics.ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
        }
    },

    spriteSheet: function (img, sx, sy, sw, sh, dx, dy, dw, dh)
    {
        img = '/assets/' + img + '.png';
        let image = Graphics.cachedImages[img];

        if (!image)
        {
            Graphics.cachedImages[img] = new Image(256, 256);
            image = Graphics.cachedImages[img];
            image.src = img;
            image.onload = function ()
            {
                Graphics.ctx.drawImage(this, sx, sy, sw, sh, dx - dw / 2, dy - dh / 2, dw, dh);
            }
        }
        else
        {
            Graphics.ctx.drawImage(image, sx, sy, sw, sh, dx - dw / 2, dy - dh / 2, dw, dh);
        }
    },

    pushMatrix: function ()
    {
        this.ctx.save();
    },

    popMatrix: function ()
    {
        this.ctx.restore();
    },

    translate: function (x, y)
    {
        this.ctx.translate(x, y);
    },

    fill: function (r, g, b, a)
    {
        this.ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a / 100 + ')';;
    },

    rect: function (x, y, w, h)
    {
        this.ctx.strokeRect(x, y, w, h);
        this.ctx.fillRect(x, y, w, h);
    }

}
