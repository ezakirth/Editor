"use strict";
Editor.input = Input;


Editor.input.update = function ()
{
    if (Input.key[KEY_LEFT])
    {
        Input.delta.x += Input.speed;
        Input.viewPos.x -= Input.speed;
    }
    if (Input.key[KEY_RIGHT])
    {
        Input.delta.x -= Input.speed;
        Input.viewPos.x += Input.speed;
    }

    if (Input.key[KEY_UP])
    {
        Input.delta.y += Input.speed;
        Input.viewPos.y -= Input.speed;
    }
    if (Input.key[KEY_DOWN])
    {
        Input.delta.y -= Input.speed;
        Input.viewPos.y += Input.speed;
    }

    Input.viewPos.x -= Input.delta.x * Input.speed;
    Input.delta.x -= (Input.delta.x / 20) * Input.speed;

    Input.viewPos.y -= Input.delta.y * Input.speed;
    Input.delta.y -= (Input.delta.y / 20) * Input.speed;
}
