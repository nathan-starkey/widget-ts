import { HTMLWidget } from "../core/HTMLWidget.js";
export class Object extends HTMLWidget {
    labels;
    table = document.createElement("table");
    constructor(children) {
        super();
        this.labels = children.map(child => child[0]);
        this.setChildren(this, children.map(child => child[1]));
        for (let [label, child] of children) {
            let displayMode = child.getDisplayMode();
            if (displayMode == "inline") {
                let tr = document.createElement("tr");
                let td0 = document.createElement("td");
                let td1 = document.createElement("td");
                td0.innerText = label;
                td1.append(child.getElement());
                tr.append(td0, td1);
                this.table.append(tr);
            }
            else if (displayMode == "block") {
                let tr = document.createElement("tr");
                let td = document.createElement("td");
                td.colSpan = 2;
                td.append(child.getElement());
                tr.append(td);
                this.table.append(tr);
            }
        }
    }
    nameOf(child) {
        return this.labels[this.getChildren().indexOf(child)] || "";
    }
    getElement() {
        return this.table;
    }
    getDisplayMode() {
        return "block";
    }
    setValue(value) {
        if (typeof value != "object" || value == null) {
            value = {};
        }
        for (let child of this.getChildren()) {
            if (child.exportsValue()) {
                let label = this.nameOf(child);
                let val = value[label];
                child.setValue(val);
            }
        }
    }
    getValue() {
        let value = {};
        for (let child of this.getChildren()) {
            if (child.exportsValue()) {
                let label = this.nameOf(child);
                let val = child.getValue();
                value[label] = val;
            }
        }
        return value;
    }
    exportsValue() {
        return true;
    }
    enable() {
        super.enable();
        this.table.classList.remove("disabled");
    }
    disable() {
        super.disable();
        this.table.classList.add("disabled");
    }
}
