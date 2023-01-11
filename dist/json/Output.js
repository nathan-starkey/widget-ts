import { HTMLWidget } from "../core/HTMLWidget.js";
export class WOutput extends HTMLWidget {
    output = document.createElement("output");
    constructor() {
        super();
    }
    getElement() {
        return this.output;
    }
    getDisplayMode() {
        return "inline";
    }
    setValue(value) {
        this.output.value = value || "";
    }
    getValue() {
        throw new Error("Widget does not export a value");
    }
    exportsValue() {
        return false;
    }
    enable() {
        super.enable();
        this.output.classList.remove("disabled");
    }
    disable() {
        super.disable();
        this.output.value = "";
        this.output.classList.add("disabled");
    }
    setChildren(parent, children) {
        throw new Error("Widget does not support children");
    }
}
