var cachedImages = {};

function sprite(img, x, y, w, h)
{
    let image = cachedImages[img];

    if (!image)
    {
        cachedImages[img] = new Image(256, 256);
        image = cachedImages[img];
        image.src = img;
        image.onload = function ()
        {
            let width = w || this.naturalWidth;
            let height = h || this.naturalHeight;

            ctx.drawImage(this, x - width / 2, y - height / 2, width, height);
        }
    }
    else
    {
        let width = w || image.naturalWidth;
        let height = h || image.naturalHeight;

        ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
    }
}
