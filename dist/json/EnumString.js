import { HTMLWidget } from "../core/HTMLWidget.js";
export class WEnumString extends HTMLWidget {
    select = document.createElement("select");
    values;
    constructor(values) {
        super();
        for (let value of values) {
            this.select.options.add(new Option(value));
        }
        this.values = values;
        this.select.selectedIndex = 0;
        this.select.addEventListener("change", () => this.bubble(false));
    }
    getElement() {
        return this.select;
    }
    getDisplayMode() {
        return "inline";
    }
    setValue(value) {
        this.select.selectedIndex = Math.max(0, this.values.indexOf(value));
    }
    getValue() {
        return this.select.value;
    }
    exportsValue() {
        return true;
    }
    enable() {
        super.enable();
        this.select.disabled = false;
    }
    disable() {
        super.disable();
        this.select.disabled = true;
        this.select.selectedIndex = 0;
    }
    setChildren(parent, children) {
        throw new Error("Widget does not support children");
    }
}
