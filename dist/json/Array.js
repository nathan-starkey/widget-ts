import { ArrayBase } from "../core/ArrayBase.js";
export class Array extends ArrayBase {
    outer = document.createElement("div");
    header = document.createElement("div");
    body = document.createElement("div");
    label = document.createElement("label");
    combo = document.createElement("select");
    buttonAdd = document.createElement("button");
    buttonRemove = document.createElement("button");
    buttonMoveUp = document.createElement("button");
    buttonMoveDown = document.createElement("button");
    constructor(child, nameValue) {
        super(child);
        if (nameValue) {
            this.nameValue = nameValue;
        }
        if (child.getDisplayMode() != "none") {
            this.body.append(child.getElement());
        }
        this.label.innerText = "array";
        this.buttonAdd.innerText = "Add";
        this.buttonRemove.innerText = "Delete";
        this.buttonMoveUp.innerHTML = "&#9650;";
        this.buttonMoveDown.innerHTML = "&#9660;";
        this.outer.classList.add("widget-array");
        this.header.classList.add("widget-array-header");
        this.body.classList.add("widget-array-body");
        this.combo.addEventListener("change", () => this.select(this.combo.selectedIndex));
        this.buttonAdd.addEventListener("click", () => this.add());
        this.buttonRemove.addEventListener("click", () => { this.remove(); this.buttonRemove.blur(); });
        this.buttonMoveUp.addEventListener("click", () => this.move(-1));
        this.buttonMoveDown.addEventListener("click", () => this.move(1));
        this.header.append(this.label, this.combo, this.buttonAdd, this.buttonRemove, this.buttonMoveUp, this.buttonMoveDown);
        this.outer.append(this.header, this.body);
        this.update();
    }
    nameValue(value, index) {
        return index.toString();
    }
    update() {
        this.updateCombo();
        this.updateButtons();
    }
    updateCombo() {
        this.storeValue();
        this.combo.innerHTML = "";
        this.combo.disabled = !this.isEnabled() || this.values.length == 0;
        let index = 0;
        for (let value of this.values) {
            let name = this.nameValue(value, index) || "(no name)";
            this.combo.options.add(new Option(name));
            ++index;
        }
        this.combo.selectedIndex = this.index;
    }
    updateButtons() {
        this.buttonAdd.disabled = !this.isEnabled();
        this.buttonRemove.disabled = !this.isEnabled() || this.index == -1;
        this.buttonMoveUp.disabled = !this.isEnabled() || this.index == -1 || this.index == 0;
        this.buttonMoveDown.disabled = !this.isEnabled() || this.index == -1 || this.index == this.values.length - 1;
    }
    bubble(clean) {
        super.bubble(clean);
        this.update();
    }
    enable() {
        super.enable();
        this.outer.classList.remove("disabled");
        this.update();
    }
    disable() {
        super.disable();
        this.outer.classList.add("disabled");
        this.update();
    }
    setValue(value) {
        super.setValue(value);
        this.update();
    }
    select(index) {
        super.select(index);
        this.update();
    }
    getElement() {
        this.label.innerText = this.getParent()?.nameOf(this) || "array";
        return this.outer;
    }
    getDisplayMode() {
        return "block";
    }
}
