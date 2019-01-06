Editor.init = function ()
{
    Editor.elem = document.getElementById("Editor");

    Editor.addEditorItem([{ block: "Terrain", block_id: "block_terrain" }]);
    Editor.addEditorItem([{ block_id: "block_terrain", type: "number", label: "Width", value: 10 }]);
    Editor.addEditorItem([{ block_id: "block_terrain", type: "number", label: "Height", value: 10 }]);
    Editor.addEditorItem([{ block_id: "block_terrain", type: "button", value: "Create New", onclick: "Editor.resetMap()" }]);




    Editor.addEditorItem([{ block: "General", block_id: "block_general" }]);
    Editor.addEditorItem([{ block_id: "block_general", type: "checkbox", label: "Show grid", onchange: "Editor.showGrid = this.checked;", checked: Editor.showGrid }]);
    Editor.addEditorItem([{
        block_id: "block_general", type: "select", label: "Brush type", linkedList: true, list: [
            { text: "Smart Paint", link: 'block_paint' },
            { text: "Smart Clear", link: 'block_paint' },
            { text: "Add Spawn", link: 'block_spawn' },
            { text: "Add Weapons", link: 'block_weapons' },
            { text: "Add Pickups", link: 'block_pickups' },
            { text: "Add Portals", link: 'block_portals' },
            { text: "Add Flag (CTF)", link: 'block_flags' },
            { text: "Delete Items" }
        ]
    }]);
    Editor.addEditorItem([{ block: "Paint", block_id: "block_paint", linked: true }]);
    Editor.addEditorItem([{ block_id: "block_paint", type: "button", value: "Randomize floor", onclick: "Editor.randomFloor()" }]);

    Editor.addEditorItem([{ block: "Weapons", block_id: "block_weapons", linked: true }]);
    Editor.addEditorItem([{
        block_id: "block_weapons", type: "select", label: "Weapon", list: [
            { text: "minigun" }, { text: "blastgun" }, { text: "shotgun" }, { text: "railgun" }, { text: "rpg" }
        ]
    }]);

    Editor.addEditorItem([{ block: "Pickups", block_id: "block_pickups", linked: true }]);
    Editor.addEditorItem([{
        block_id: "block_pickups", type: "select", label: "Pickup", list: [
            { text: "medkit" }, { text: "shield" }, { text: "speed" },
        ]
    }]);

    Editor.addEditorItem([{ block: "Portals", block_id: "block_portals", linked: true }]);
    Editor.addEditorItem([{
        block_id: "block_portals", type: "select", label: "Portal", list: [
            { text: "Red" }, { text: "Blue" }, { text: "Green" }, { text: "Tellow" }
        ]
    }]);

    Editor.addEditorItem([{ block: "Flags", block_id: "block_flags", linked: true }]);
    Editor.addEditorItem([{
        block_id: "block_flags", type: "select", label: "Flag team", list: [
            { text: "blue" }, { text: "green" }
        ]
    }]);

    Editor.addEditorItem([{ block: "Spawn", block_id: "block_spawn", linked: true }]);
    Editor.addEditorItem([{
        block_id: "block_spawn", type: "select", label: "Spawn team", list: [
            { text: "blue" }, { text: "green" }
        ]
    }]);


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

