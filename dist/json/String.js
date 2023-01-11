import { HTMLWidget } from "../core/HTMLWidget.js";
export class WString extends HTMLWidget {
    input = document.createElement("input");
    constructor() {
        super();
        this.input.addEventListener("change", () => this.bubble(false));
    }
    getElement() {
        return this.input;
    }
    getDisplayMode() {
        return "inline";
    }
    setValue(value) {
        this.input.value = value || "";
    }
    getValue() {
        return this.input.value;
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
        this.input.value = "";
    }
    setChildren(parent, children) {
        throw new Error("Widget does not support children");
    }
}
