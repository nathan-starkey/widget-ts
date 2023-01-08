import { HTMLWidget } from "../core/HTMLWidget.js";
export class Button extends HTMLWidget {
    button = document.createElement("button");
    constructor(label, callback) {
        super();
        this.button.innerText = label;
        this.button.addEventListener("click", () => callback());
    }
    getElement() {
        return this.button;
    }
    getDisplayMode() {
        return "inline";
    }
    setValue(value) {
        // throw new Error("Widget does not export a value");
    }
    getValue() {
        throw new Error("Widget does not export a value");
    }
    exportsValue() {
        return false;
    }
    enable() {
        super.enable();
        this.button.disabled = false;
    }
    disable() {
        super.disable();
        this.button.disabled = true;
    }
    setChildren(parent, children) {
        throw new Error("Widget does not support children");
    }
}
