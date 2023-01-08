import { HTMLWidget } from "../core/HTMLWidget.js";
export class Number extends HTMLWidget {
    input = document.createElement("input");
    constructor() {
        super();
        this.input.type = "number";
        this.input.valueAsNumber = 0;
        this.input.addEventListener("change", () => this.bubble(false));
    }
    getElement() {
        return this.input;
    }
    getDisplayMode() {
        return "inline";
    }
    setValue(value) {
        this.input.valueAsNumber = globalThis.Number(value) || 0;
    }
    getValue() {
        return this.input.valueAsNumber;
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
        this.input.valueAsNumber = 0;
    }
    setChildren(parent, children) {
        throw new Error("Widget does not support children");
    }
}
