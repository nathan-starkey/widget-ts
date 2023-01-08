import { HTMLWidget } from "../core/HTMLWidget.js";
export class Observer extends HTMLWidget {
    child;
    callback;
    constructor(child, callback) {
        super();
        this.child = child;
        this.setChildren(this, [child]);
        if (callback) {
            this.callback = callback;
        }
    }
    getElement() {
        return this.child.getElement();
    }
    getDisplayMode() {
        return this.child.getDisplayMode();
    }
    bubble(clean) {
        if (!clean && this.callback) {
            this.callback(this.child);
        }
    }
    setValue(value) {
        return this.child.setValue(value);
    }
    getValue() {
        return this.child.getValue();
    }
    exportsValue() {
        return this.child.exportsValue();
    }
}
