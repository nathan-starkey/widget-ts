var WidgetBase;
(function (WidgetBase) {
    class Widget {
        #id;
        #parent;
        constructor(id) {
            this.#id = id;
            this.#parent = null;
        }
        setParent(parent) {
            this.#parent = parent;
        }
        setValue(value) {
            throw new Error("abstract method not implemented");
        }
        setIsDisabled(isDisabled) {
            throw new Error("abstract method not implemented");
        }
        getId() {
            return this.#id;
        }
        getParent() {
            return this.#parent;
        }
        getValue() {
            throw new Error("abstract method not implemented");
        }
        getIsDisabled() {
            throw new Error("abstract method not implemented");
        }
        getElement() {
            throw new Error("abstract method not implemented");
        }
        valueChanged(trace = [this.#id], direct = true) {
            if (this.#parent) {
                trace.push(this.#parent.getId());
                this.#parent.valueChanged(trace, false);
            }
        }
    }
    WidgetBase.Widget = Widget;
})(WidgetBase || (WidgetBase = {}));
var WidgetBase;
(function (WidgetBase) {
    class ParentWidget extends WidgetBase.Widget {
        #children;
        constructor(name, children) {
            super(name);
            this.#children = children;
            for (let widget of children) {
                widget.setParent(this);
            }
        }
        getChildren() {
            return Array.from(this.#children);
        }
    }
    WidgetBase.ParentWidget = ParentWidget;
})(WidgetBase || (WidgetBase = {}));
var WidgetBase;
(function (WidgetBase) {
    class StructWidget extends WidgetBase.ParentWidget {
        #isDisabled;
        constructor(name, children) {
            super(name, children);
            this.#isDisabled = false;
        }
        setValue(value) {
            value ||= {};
            for (let widget of this.getChildren()) {
                widget.setValue(value[widget.getId()]);
            }
        }
        setIsDisabled(isDisabled) {
            this.#isDisabled = isDisabled;
            for (let widget of this.getChildren()) {
                widget.setIsDisabled(isDisabled);
            }
        }
        getValue() {
            let value = {};
            for (let widget of this.getChildren()) {
                value[widget.getId()] = widget.getValue();
            }
            return value;
        }
        getIsDisabled() {
            return this.#isDisabled;
        }
    }
    WidgetBase.StructWidget = StructWidget;
})(WidgetBase || (WidgetBase = {}));
var WidgetBase;
(function (WidgetBase) {
    class ArrayWidget extends WidgetBase.Widget {
        #child;
        #values;
        #isDisabled;
        #selectedIndex;
        constructor(name, child) {
            super(name);
            this.#child = child;
            this.#values = [];
            this.#isDisabled = false;
            this.#selectedIndex = -1;
            child.setParent(this);
            child.setIsDisabled(true);
        }
        setSelectedIndex(selectedIndex) {
            if (selectedIndex < -1 || selectedIndex >= this.#values.length) {
                throw new RangeError(`index ${selectedIndex} out of range`);
            }
            if (this.#selectedIndex != -1) {
                this.#values[this.#selectedIndex] = this.#child.getValue();
            }
            this.#selectedIndex = selectedIndex;
            if (this.#selectedIndex == -1) {
                this.#child.setIsDisabled(true);
            }
            else {
                this.#child.setIsDisabled(false);
                this.#child.setValue(this.#values[this.#selectedIndex]);
            }
        }
        setValue(values) {
            values ||= [];
            this.#values = Array.from(values);
            this.#selectedIndex = -1;
            for (let i = 0; i < this.#values.length; ++i) {
                this.setSelectedIndex(i);
                this.#values[i] = this.#child.getValue();
            }
        }
        setIsDisabled(isDisabled) {
            this.#isDisabled = isDisabled;
            this.#child.setIsDisabled(isDisabled || this.#selectedIndex == -1);
            if (isDisabled) {
                this.#values = [];
                this.#selectedIndex = -1;
            }
        }
        getSelectedIndex() {
            return this.#selectedIndex;
        }
        getValue() {
            if (this.#selectedIndex != -1) {
                this.#values[this.#selectedIndex] = this.#child.getValue();
            }
            return Array.from(this.#values);
        }
        getIsDisabled() {
            return this.#isDisabled;
        }
        getChild() {
            return this.#child;
        }
        add() {
            this.#values.push(undefined);
            this.setSelectedIndex(this.#values.length - 1);
            this.valueChanged();
        }
        remove() {
            if (this.#selectedIndex == -1) {
                return;
            }
            let index = this.#selectedIndex;
            let isLastItem = this.#selectedIndex == this.#values.length - 1;
            if (isLastItem) {
                this.setSelectedIndex(index - 1);
            }
            else {
                this.setSelectedIndex(index + 1);
                --this.#selectedIndex;
            }
            this.#values.splice(index, 1);
            this.valueChanged();
        }
        move(offset) {
            offset = Math.floor(offset);
            if (offset == 0) {
                return;
            }
            let index = this.#selectedIndex + offset;
            index = Math.min(index, this.#values.length);
            index = Math.max(index, 0);
            let a = this.#values[this.#selectedIndex];
            let b = this.#values[index];
            this.#values[this.#selectedIndex] = b;
            this.#values[index] = a;
            this.#selectedIndex = index;
            this.valueChanged();
        }
    }
    WidgetBase.ArrayWidget = ArrayWidget;
})(WidgetBase || (WidgetBase = {}));
