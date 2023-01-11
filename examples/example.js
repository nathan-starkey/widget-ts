const Widgets = WidgetTS.json;

let widget = new Widgets.Array(new Widgets.Object([
  ["id", new Widgets.String()],
  ["name", new Widgets.String()],
  ["description", new Widgets.MultiLineString()],
  ["width", new Widgets.Number()],
  ["height", new Widgets.Number()],
  ["canFly", new Widgets.Boolean()],
  ["healthMin", new Widgets.Number()],
  ["healthMax", new Widgets.Number()],
  ["damageMin", new Widgets.Number()],
  ["damageMax", new Widgets.Number()],
  ["sprites", new Widgets.Array(new Widgets.String(), s => s)]
]), o => o.id);

document.getElementById("page").append(widget.getElement());