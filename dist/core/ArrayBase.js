import { HTMLWidget } from "../core/HTMLWidget.js";
export class ArrayBase extends HTMLWidget {
    values = [];
    index = -1;
    child;
    constructor(child) {
        super();
        this.setChildren(this, [child]);
        this.child = child;
        child.disable();
    }
    storeValue() {
        if (this.index != -1) {
            this.values[this.index] = this.child.getValue();
        }
    }
    restoreValue() {
        if (this.index == -1) {
            this.child.disable();
        }
        else {
            this.child.setValue(this.values[this.index]);
        }
    }
    getValue() {
        this.storeValue();
        return Array.from(this.values);
    }
    setValue(value) {
        if (!Array.isArray(value)) {
            value = [];
        }
        this.values = Array.from(value);
        this.index = -1;
        this.select(value.length - 1);
    }
    exportsValue() {
        return true;
    }
    enable() {
        super.enable();
        if (this.index == -1) {
            this.child.disable();
        }
    }
    disable() {
        super.disable();
        this.index = -1;
        this.values = [];
    }
    add() {
        this.storeValue();
        this.child.enable();
        this.child.setValue(undefined);
        this.index = this.values.length;
        this.values.push(this.child.getValue());
        this.bubble(false);
    }
    remove() {
        if (this.index != -1) {
            this.values.splice(this.index, 1);
            this.index = Math.min(this.index, this.values.length - 1);
            this.restoreValue();
            this.bubble(false);
        }
    }
    move(offset) {
        let index = this.index + offset;
        if (Number.isInteger(offset) && offset != 0 && index >= 0 && index < this.values.length && this.index != -1) {
            let other = this.values[index];
            this.values[index] = this.values[this.index];
            this.values[this.index] = other;
            this.index = index;
            this.bubble(false);
        }
    }
    select(index) {
        this.storeValue();
        this.index = index;
        this.restoreValue();
        if (this.index == -1) {
            this.child.disable();
        }
        else {
            this.child.enable();
        }
    }
}
