// Use an alias for TagEditor.Widgets
const Widgets = TagEditor.Widgets;

// Create a hierarchical widget structure
const root = new Widgets.Array("creatures", new Widgets.Struct("", [
  new Widgets.String("id"),
  new Widgets.String("name"),
  new Widgets.String("description", true),
  new Widgets.Number("width"),
  new Widgets.Number("height"),
  new Widgets.Boolean("canFly"),
  new Widgets.Enum("type", ["creature", "npc", "player"]),
  new Widgets.Range("health"),
  new Widgets.Range("damage"),
  new Widgets.Bitmask("flags", ["doesNotMove", "doesNotInteract", "indestructible"]),
  new Widgets.Array("sprites", new Widgets.String(""))
]));

// Append the widget to the body
document.getElementById("container").append(root.getElement());

function generate() {
  document.getElementById("output").value = JSON.stringify(root.getValue(), undefined, " ");
}

function importData() {
  let value;

  try {
    value = JSON.parse(document.getElementById("output").value);
    root.setValue(value);
  } catch (e) {
    alert("Error: " + e);
  }
}