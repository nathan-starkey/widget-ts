const Widgets = TagEditor.Widgets;

const root = new Widgets.Array("objects", new Widgets.Struct("", [
  new Widgets.String("id"),
  new Widgets.String("name"),
  new Widgets.String("description", true),
  new Widgets.Number("width"),
  new Widgets.Number("height"),
  new Widgets.Boolean("hasCollision"),
  new Widgets.Enum("renderStyle", ["solid", "gradient", "texture", "none"]),
  new Widgets.Bitmask("flags", ["indestructible", "noGravity", "hasTransparency"]),
  new Widgets.Array("textures", new Widgets.String(""), value => "res/" + value)
]));

document.body.append(root.getElement());