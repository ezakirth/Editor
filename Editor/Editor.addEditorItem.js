Editor.addEditorItem = function (items)
{
    var div = document.createElement("div");
    div.className = "menuItem";

    for (var i = 0; i < items.length; i++)
    {
        var item = items[i];

        if (item.block)
        {
            var lib = document.createElement("label");
            lib.className = "menuItem";
            lib.textContent = item.block;
            div.appendChild(lib);

            if ($("#" + item.block_id).length === 0)
            {
                div.id = item.block_id;
                Editor.elem.appendChild(div);
            }
            else
                $("#" + item.block_id).append(div);

            if (item.linked)
            {
                $(div).addClass("linked");
                $(div).hide();
            }

            break;
        }

        if (item.label)
            item.id = "editor_" + item.label.split(' ').join('_') + "_id";

        var input;

        if (item.label)
        {
            var label = document.createElement("label");
            label.className = "itemLabel";
            label.textContent = item.label;
            label.setAttribute("for", item.id);
            if (item.type == "file") label.className += " file";
            div.appendChild(label);
        }



        if (item.type == "select")
        {
            input = document.createElement("select");

            for (var i = 0; i < item.list.length; i++)
            {
                var opt = document.createElement("option");
                var option = option = item.list[i].text;
                opt.value = option;
                opt.text = option;
                opt.selected = (opt.value == item.value);
                if (item.linkedList)
                {
                    var link = item.list[i].link;
                    opt.setAttribute("data-link", link);
                    input.setAttribute("onchange", "Editor.updateMenu('" + item.id + "')");
                }
                input.appendChild(opt);
                input.id = item.id;
            }
        }
        else
        {
            input = document.createElement("input");
            if (item.id)
                input.id = item.id;
            input.setAttribute("type", item.type);
            input.setAttribute("value", item.value);
        }

        if (item.accept)
        {
            input.setAttribute("accept", item.accept);
        }

        if (item.onclick)
        {
            input.setAttribute("onclick", item.onclick);
        }

        if (item.onchange)
        {
            input.setAttribute("onchange", item.onchange);
        }

        if (item.onkeyup)
        {
            input.setAttribute("onkeyup", item.onkeyup);
        }

        if (item.onchangeEvent)
        {
            input.onchange = item.onchangeEvent;
        }

        if (item.checked)
        {
            input.defaultChecked = item.checked;
        }

        if (item.disabled)
        {
            input.disabled = item.disabled;
        }

        if (item.type == "text" || item.type == "number")
            input.setAttribute("onclick", "this.select()");


        div.appendChild(input);
        $("#" + item.block_id).append(div);
    }
};

Editor.loadMap = function (e)
{
    if (e.target.files[0])
    {
        var tmppath = URL.createObjectURL(e.target.files[0]);
        $.getJSON(tmppath, function (data)
        {
            Game.map.load(data);
        });
    }
};

Editor.saveMap = function (e)
{
    Editor.saveData(Game.map.data, 'map.json');
};
