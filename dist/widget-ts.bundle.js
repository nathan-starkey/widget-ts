var WidgetTS = (function () {
    'use strict';

    class Node {
        parent = null;
        children = [];
        setParent(parent) {
            this.parent = parent;
        }
        setChildren(parent, children) {
            this.children = children;
            for (let child of children) {
                child.setParent(parent);
            }
        }
        getParent() {
            return this.parent;
        }
        getChildren() {
            return this.children;
        }
    }

    class Target {
        node;
        constructor(node) {
            this.node = node;
        }
        bubble(clean) {
            this.node.getParent()?.bubble(clean);
        }
    }

    class Toggle {
        node;
        enabled = true;
        constructor(node) {
            this.node = node;
        }
        enable() {
            this.enabled = true;
            for (let child of this.node.getChildren()) {
                child.enable();
            }
        }
        disable() {
            this.enabled = false;
            for (let child of this.node.getChildren()) {
                child.disable();
            }
        }
        isEnabled() {
            return this.enabled;
        }
    }

    class Widget {
        node = new Node();
        target = new Target(this.node);
        toggle = new Toggle(this.node);
        setParent(parent) {
            this.node.setParent(parent);
        }
        setChildren(parent, children) {
            this.node.setChildren(parent, children);
        }
        getParent() {
            return this.node.getParent();
        }
        getChildren() {
            return this.node.getChildren();
        }
        bubble(clean) {
            this.target.bubble(clean);
        }
        enable() {
            this.toggle.enable();
        }
        disable() {
            this.toggle.disable();
        }
        isEnabled() {
            return this.toggle.isEnabled();
        }
    }

    class HTMLWidget extends Widget {
        nameOf(child) {
            return this.getChildren().indexOf(child).toString();
        }
    }

    class WString extends HTMLWidget {
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

    class WEnumString extends HTMLWidget {
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

    class WMultiLineString extends HTMLWidget {
        input = document.createElement("textarea");
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

    class WNumber extends HTMLWidget {
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
            this.input.valueAsNumber = Number(value) || 0;
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

    class WBoolean extends HTMLWidget {
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

    class WButton extends HTMLWidget {
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

    class WOutput extends HTMLWidget {
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

    class WObserver extends HTMLWidget {
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

    class ArrayBase extends HTMLWidget {
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

    class WArray extends ArrayBase {
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

    class WObject extends HTMLWidget {
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

    var WidgetTS = {
        json: {
            String: WString,
            EnumString: WEnumString,
            MultiLineString: WMultiLineString,
            Number: WNumber,
            Boolean: WBoolean,
            Button: WButton,
            Output: WOutput,
            Observer: WObserver,
            Array: WArray,
            Object: WObject
        }
    };

    return WidgetTS;

})();
