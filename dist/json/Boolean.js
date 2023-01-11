import { HTMLWidget } from "../core/HTMLWidget.js";
export class WBoolean extends HTMLWidget {
    input = document.createElement("input");
    constructor() {
        super();
        this.input.type = "checkbox";
        this.input.addEventListener("change", () => this.bubble(false));
    }
    getElement() {
        return this.input;
    }
    getDisplayMode() {
        return "inline";
    }
    setValue(value) {
        this.input.checked = value;
    }
    getValue() {
        return this.input.checked;
    }
    exportsValue() {
        return true;
    }
    enable() {
        super.enable();
        this.input.disabled = false;
    }
    disable() {
        super.disable();
        this.input.disabled = true;
        this.input.checked = false;
    }
    setChildren(parent, children) {
        throw new Error("Widget does not support children");
    }
}
