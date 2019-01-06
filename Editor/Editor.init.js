Editor.init = function ()
{
    Editor.elem = document.getElementById("Editor");

    Editor.addEditorItem([{ block: "Terrain", block_id: "block_terrain" }]);
    Editor.addEditorItem([{ block_id: "block_terrain", type: "number", label: "Width", value: 10 }]);
    Editor.addEditorItem([{ block_id: "block_terrain", type: "number", label: "Height", value: 10 }]);
    Editor.addEditorItem([{ block_id: "block_terrain", type: "button", value: "Create New", onclick: "Editor.resetMap()" }]);




    Editor.addEditorItem([{ block: "General", block_id: "block_general" }]);
    Editor.addEditorItem([{ block_id: "block_general", type: "checkbox", label: "Show grid", onchange: "Editor.showGrid = this.checked;", checked: Editor.showGrid }]);
    Editor.addEditorItem([{ block_id: "block_general", type: "select", label: "Brush type", list: ["PAINT", "CLEAR", "Add Weapons", "Add Pickups", "Add Portals", "Add Flag (CTF)", "Clear items"] }]);
    Editor.addEditorItem([{ block_id: "block_general", type: "button", value: "Randomize floor", onclick: "Editor.randomFloor()" }]);

    Editor.addEditorItem([{ block: "Weapons", block_id: "block_weapons" }]);
    Editor.addEditorItem([{ block_id: "block_weapons", type: "select", label: "Type", list: ["Shotgun", "Blaster", "Sniper"] }]);

    Editor.addEditorItem([{ block: "Pickups", block_id: "block_pickups" }]);
    Editor.addEditorItem([{ block_id: "block_pickups", type: "select", label: "Type", list: ["Medkit", "Armor", "Speed"] }]);

    Editor.addEditorItem([{ block: "Portals", block_id: "block_portals" }]);
    Editor.addEditorItem([{ block_id: "block_portals", type: "select", label: "Type", list: ["Red", "Blue", "Green", "Tellow"] }]);

    Editor.addEditorItem([{ block: "Flags", block_id: "block_flags" }]);
    Editor.addEditorItem([{ block_id: "block_flags", type: "select", label: "Type", list: ["Blue Flag", "Red Flag"] }]);



    Editor.addEditorItem([{ block: "Blood", block_id: "block_blood" }]);
    Editor.addEditorItem([
        { block_id: "block_blood", type: "button", value: "+", onclick: "Editor.addDecal('blood')" },
        { block_id: "block_blood", type: "button", value: "-", onclick: "Editor.removeDecal('blood')" }
    ]);

    Editor.addEditorItem([{ block: "Decals", block_id: "block_decals" }]);
    Editor.addEditorItem([
        { block_id: "block_decals", type: "button", value: "+", onclick: "Editor.addDecal('dirt')" },
        { block_id: "block_decals", type: "button", value: "-", onclick: "Editor.removeDecal('dirt')" }
    ]);




    Editor.addEditorItem([{ block: "File", block_id: "block_file" }]);
    Editor.addEditorItem([
        { block_id: "block_file", type: "file", label: "Load", accept: ".json", onchangeEvent: Editor.loadMap },
        { block_id: "block_file", type: "button", value: "Save", onclick: "Editor.saveMap()" }
    ]);


    $("label.menuItem").click(function ()
    {
        if ($(this).hasClass("hiding"))
        {
            $(this).removeClass("hiding");
            $(this).parent().find("div").show();
        }
        else
        {
            $(this).addClass("hiding");
            $(this).parent().find("div").hide();
        }
    });

};

Editor.loadObjectInfo = function (sprite)
{
    Editor.selected = sprite;

    $("#block_info").empty();

    Editor.addEditorItem([{ block: "Object Information (" + sprite.type + ")", block_id: "block_info" }]);

    Editor.addEditorItem([{ block_id: "block_info", type: "button", value: "Delete sprite", onclick: "Editor.deleteItem()", disabled: sprite.locked }]);
    Editor.addEditorItem([{ block_id: "block_info", type: "checkbox", label: "locked", checked: sprite.locked }]);
    if (sprite.type != "terrain")
        Editor.addEditorItem([{ block_id: "block_info", type: "checkbox", label: "mirrorX", disabled: sprite.locked }]);
    Editor.addEditorItem([{ block_id: "block_info", type: "text", label: "x", disabled: sprite.locked }]);
    Editor.addEditorItem([{ block_id: "block_info", type: "text", label: "y", disabled: sprite.locked }]);
    Editor.addEditorItem([{ block_id: "block_info", type: "number", label: "z", disabled: sprite.locked }]);
    if (sprite.type == "static")
        Editor.addEditorItem([{ block_id: "block_info", type: "number", label: "r", disabled: sprite.locked }]);

    if (sprite.type != "terrain")
    {
        Editor.addEditorItem([{ block_id: "block_info", type: "text", label: "w", disabled: sprite.locked }]);
        Editor.addEditorItem([{ block_id: "block_info", type: "text", label: "h", disabled: sprite.locked }]);
        if (sprite.type == "layer")
            Editor.addEditorItem([{ block_id: "block_info", type: "number", label: "distance", disabled: sprite.locked }]);
        if (Game.world.texturesInfos[sprite.texture].wrapS == gl.REPEAT)
            Editor.addEditorItem([{ block_id: "block_info", type: "text", label: "wrapX", disabled: sprite.locked }]);
        if (Game.world.texturesInfos[sprite.texture].wrapT == gl.REPEAT)
            Editor.addEditorItem([{ block_id: "block_info", type: "text", label: "wrapY", disabled: sprite.locked }]);
    }
    Editor.addEditorItem([{ block_id: "block_info", type: "color", label: "tint", disabled: sprite.locked }]);
};
