var Editor = {
    active: true,
    elem: null,
    showGrid: true,
    map: null,

    init: function ()
    {

        this.map = new Map(20, 20);

        this.menuSetup();
    },

    update: function ()
    {
        if (Input.mouse.left && Input.real.x > 276)
        {
            let ix = Math.floor(this.map.x);
            let fx = this.map.x - ix;
            let iy = Math.floor(this.map.y);
            let fy = this.map.y - iy;
            let x = Math.floor(Input.pos.x / this.map.tileSize + fx);
            let y = Math.floor(Input.pos.y / this.map.tileSize + fy);

            let px = (x + ix).clamp(0, this.map.w - 1);
            let py = (y + iy).clamp(0, this.map.h - 1);

            let selected = $("#editor_Brush_type_id").val();

            if (selected == "Smart Paint") this.paint(px, py);
            if (selected == "Smart Clear") this.clear(px, py);
            if (selected == "Add Spawn") this.addItem("spawn_" + $("#editor_Spawn_team_id").val(), px, py);
            if (selected == "Add Weapons") this.addItem($("#editor_Weapon_id").val(), px, py);
            if (selected == "Add Pickups") this.addItem($("#editor_Pickup_id").val(), px, py);
            if (selected == "Add Portals") this.addItem($("#editor_Portal_id").val(), px, py);
            if (selected == "Add Flag (CTF)") this.addItem("flag_" + $("#editor_Flag_team_id").val(), px, py);
            if (selected == "Delete Items") this.clearItem(px, py);
        }

        //       this.overlay.update();
    },

    render: function ()
    {
        Graphics.clear();

        Graphics.sprite("bg", Graphics.width / 2, Graphics.height / 2, Graphics.width, Graphics.height);

        this.map.render();

        Graphics.sprite("vignette", Graphics.width / 2, Graphics.height / 2, Graphics.width, Graphics.height);


    },

    resetMap: function ()
    {
        let w = parseInt($("#editor_Width_id").val());
        let h = parseInt($("#editor_Height_id").val());
        Editor.map = new Map(w, h, true);
    }

};
