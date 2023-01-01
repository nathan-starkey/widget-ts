var TagEditor;
(function (TagEditor) {
    var Widgets;
    (function (Widgets) {
        class String extends WidgetBase.Widget {
            #element;
            constructor(name, multiline = false) {
                super(name);
                this.#element = document.createElement(multiline ? "textarea" : "input");
                this.#element.addEventListener("change", () => this.valueChanged());
                this.#element.classList.add("te-form-control");
            }
            setValue(value) {
                value = globalThis.String(value || "");
                this.#element.value = value;
                this.valueChanged();
            }
            setIsDisabled(isDisabled) {
                this.#element.disabled = isDisabled;
                if (isDisabled) {
                    this.#element.value = "";
                }
            }
            getValue() {
                return this.#element.value;
            }
            getIsDisabled() {
                return this.#element.disabled;
            }
            getElement() {
                return this.#element;
            }
        }
        Widgets.String = String;
    })(Widgets = TagEditor.Widgets || (TagEditor.Widgets = {}));
})(TagEditor || (TagEditor = {}));
var TagEditor;
(function (TagEditor) {
    var Widgets;
    (function (Widgets) {
        class Number extends WidgetBase.Widget {
            #element;
            constructor(name) {
                super(name);
                this.#element = document.createElement("input");
                this.#element.type = "number";
                this.#element.valueAsNumber = 0;
                this.#element.addEventListener("change", () => this.valueChanged());
                this.#element.classList.add("te-form-control");
            }
            setValue(value) {
                value = globalThis.Number(value) || 0;
                this.#element.valueAsNumber = value;
                this.valueChanged();
            }
            setIsDisabled(isDisabled) {
                this.#element.disabled = isDisabled;
                if (isDisabled) {
                    this.#element.valueAsNumber = 0;
                }
            }
            getValue() {
                return this.#element.valueAsNumber;
            }
            getIsDisabled() {
                return this.#element.disabled;
            }
            getElement() {
                return this.#element;
            }
        }
        Widgets.Number = Number;
    })(Widgets = TagEditor.Widgets || (TagEditor.Widgets = {}));
})(TagEditor || (TagEditor = {}));
var TagEditor;
(function (TagEditor) {
    var Widgets;
    (function (Widgets) {
        class Boolean extends WidgetBase.Widget {
            #element;
            constructor(name) {
                super(name);
                this.#element = document.createElement("input");
                this.#element.type = "checkbox";
                this.#element.addEventListener("change", () => this.valueChanged());
                this.#element.classList.add("te-form-control");
            }
            setValue(value) {
                value = globalThis.Boolean(value);
                this.#element.checked = value;
                this.valueChanged();
            }
            setIsDisabled(isDisabled) {
                this.#element.disabled = isDisabled;
                if (isDisabled) {
                    this.#element.checked = false;
                }
            }
            getValue() {
                return this.#element.checked;
            }
            getIsDisabled() {
                return this.#element.disabled;
            }
            getElement() {
                return this.#element;
            }
        }
        Widgets.Boolean = Boolean;
    })(Widgets = TagEditor.Widgets || (TagEditor.Widgets = {}));
})(TagEditor || (TagEditor = {}));
var TagEditor;
(function (TagEditor) {
    var Widgets;
    (function (Widgets) {
        class Enum extends WidgetBase.Widget {
            #element;
            #options;
            constructor(name, options) {
                super(name);
                this.#element = document.createElement("select");
                this.#element.addEventListener("change", () => this.valueChanged());
                this.#element.classList.add("te-form-control");
                this.#options = options;
                for (let option of options) {
                    this.#element.options.add(new Option(option));
                }
            }
            setValue(value) {
                let index = this.#options.indexOf(value);
                index = Math.max(index, 0);
                this.#element.selectedIndex = index;
                this.valueChanged();
            }
            setIsDisabled(isDisabled) {
                this.#element.disabled = isDisabled;
                if (isDisabled) {
                    this.#element.selectedIndex = 0;
                }
            }
            getValue() {
                return this.#element.value;
            }
            getIsDisabled() {
                return this.#element.disabled;
            }
            getElement() {
                return this.#element;
            }
        }
        Widgets.Enum = Enum;
    })(Widgets = TagEditor.Widgets || (TagEditor.Widgets = {}));
})(TagEditor || (TagEditor = {}));
var TagEditor;
(function (TagEditor) {
    var Widgets;
    (function (Widgets) {
        class Bitmask extends WidgetBase.Widget {
            #element;
            #inputs;
            #isDisabled;
            constructor(name, options) {
                super(name);
                let table = document.createElement("table");
                let tbody = document.createElement("tbody");
                let inputs = [];
                table.classList.add("te-form-control");
                table.classList.add("te-bitmask");
                for (let option of options) {
                    let tr = document.createElement("tr");
                    let td0 = document.createElement("td");
                    let td1 = document.createElement("td");
                    let input = document.createElement("input");
                    td0.innerText = option;
                    input.type = "checkbox";
                    inputs.push(input);
                    tr.addEventListener("click", () => input.click());
                    input.addEventListener("change", () => this.valueChanged());
                    td1.append(input);
                    tr.append(td0, td1);
                    tbody.append(tr);
                    table.append(tbody);
                }
                this.#element = table;
                this.#inputs = inputs;
            }
            setValue(value) {
                value = globalThis.Number(value) || 0;
                value = Math.floor(value);
                let flag = Math.pow(2, this.#inputs.length - 1);
                for (let i = this.#inputs.length - 1; i >= 0; --i) {
                    let input = this.#inputs[i];
                    let bit = value - flag >= 0;
                    input.checked = bit;
                    if (bit) {
                        value -= flag;
                    }
                    flag /= 2;
                }
                this.valueChanged();
            }
            setIsDisabled(isDisabled) {
                this.#isDisabled = isDisabled;
                for (let input of this.#inputs) {
                    input.disabled = isDisabled;
                    if (isDisabled) {
                        input.checked = false;
                    }
                }
                if (isDisabled) {
                    this.#element.classList.add("disabled");
                }
                else {
                    this.#element.classList.remove("disabled");
                }
            }
            getValue() {
                let value = 0;
                let flag = Math.pow(2, this.#inputs.length - 1);
                for (let i = this.#inputs.length - 1; i >= 0; --i) {
                    let input = this.#inputs[i];
                    let bit = input.checked;
                    if (bit) {
                        value += flag;
                    }
                    flag /= 2;
                }
                return value;
            }
            getIsDisabled() {
                return this.#isDisabled;
            }
            getElement() {
                return this.#element;
            }
        }
        Widgets.Bitmask = Bitmask;
    })(Widgets = TagEditor.Widgets || (TagEditor.Widgets = {}));
})(TagEditor || (TagEditor = {}));
var TagEditor;
(function (TagEditor) {
    var Widgets;
    (function (Widgets) {
        class Struct extends WidgetBase.StructWidget {
            #element;
            constructor(name, children) {
                super(name, children);
                let table = document.createElement("table");
                let caption = document.createElement("caption");
                let tbody = document.createElement("tbody");
                table.classList.add("te-struct-block");
                if (this.getId()) {
                    caption.classList.add("te-struct-block-caption");
                    caption.innerText = this.getId();
                    table.append(caption);
                }
                for (let widget of children) {
                    let tr = document.createElement("tr");
                    let td0 = document.createElement("td");
                    let td1 = document.createElement("td");
                    tr.classList.add("te-struct-block-row");
                    td0.classList.add("te-struct-block-label");
                    td1.classList.add("te-struct-block-child");
                    if (widget instanceof WidgetBase.ParentWidget || widget instanceof Widgets.Array) {
                        td1.colSpan = 2;
                    }
                    else {
                        td0.innerText = widget.getId();
                        tr.append(td0);
                    }
                    td1.append(widget.getElement());
                    tr.append(td1);
                    tbody.append(tr);
                }
                table.append(tbody);
                this.#element = table;
            }
            setIsDisabled(isDisabled) {
                super.setIsDisabled(isDisabled);
                if (isDisabled) {
                    this.#element.classList.add("disabled");
                }
                else {
                    this.#element.classList.remove("disabled");
                }
            }
            getElement() {
                return this.#element;
            }
        }
        Widgets.Struct = Struct;
    })(Widgets = TagEditor.Widgets || (TagEditor.Widgets = {}));
})(TagEditor || (TagEditor = {}));
var TagEditor;
(function (TagEditor) {
    var Widgets;
    (function (Widgets) {
        class Array extends WidgetBase.ArrayWidget {
            #element;
            #buttons;
            #select;
            #retrieveName;
            constructor(name, child, retrieveName) {
                super(name, child);
                let container = document.createElement("div");
                let header = document.createElement("div");
                let body = document.createElement("div");
                let label = document.createElement("label");
                let select = document.createElement("select");
                let buttons = {
                    add: document.createElement("button"),
                    remove: document.createElement("button"),
                    moveUp: document.createElement("button"),
                    moveDown: document.createElement("button")
                };
                container.classList.add("te-array-block");
                header.classList.add("te-array-block-header");
                body.classList.add("te-array-block-body");
                select.classList.add("te-form-control");
                buttons.add.classList.add("te-form-control");
                buttons.remove.classList.add("te-form-control");
                buttons.moveUp.classList.add("te-form-control");
                buttons.moveDown.classList.add("te-form-control");
                label.innerText = this.getId();
                buttons.add.innerText = "Add";
                buttons.remove.innerText = "Remove";
                buttons.moveUp.innerHTML = "&#9650;";
                buttons.moveDown.innerHTML = "&#9660;";
                label.addEventListener("click", () => container.classList.toggle("collapsed"));
                select.addEventListener("input", () => this.setSelectedIndex(select.selectedIndex));
                buttons.add.addEventListener("click", this.add.bind(this));
                buttons.remove.addEventListener("click", this.remove.bind(this));
                buttons.moveUp.addEventListener("click", this.move.bind(this, -1));
                buttons.moveDown.addEventListener("click", this.move.bind(this, 1));
                header.append(label, select, buttons.add, buttons.remove, buttons.moveUp, buttons.moveDown);
                body.append(child.getElement());
                container.append(header, body);
                this.#element = container;
                this.#buttons = buttons;
                this.#select = select;
                this.#retrieveName = retrieveName || ((value) => {
                    if (child instanceof WidgetBase.ParentWidget) {
                        value = Object.values(value)[0];
                    }
                    if (globalThis.Array.isArray(value)) {
                        return `array (${value.length})`;
                    }
                    else if (typeof value == "object") {
                        return "object";
                    }
                    else if (value == undefined) {
                        return "empty";
                    }
                    else {
                        return globalThis.String(value) || "(no name)";
                    }
                });
                this.#updateButtons();
                this.#updateSelect();
            }
            setValue(values) {
                super.setValue(values);
                this.#updateSelect();
                this.#updateButtons();
            }
            setSelectedIndex(selectedIndex) {
                super.setSelectedIndex(selectedIndex);
                this.#updateButtons();
            }
            setIsDisabled(isDisabled) {
                super.setIsDisabled(isDisabled);
                this.#updateButtons();
                if (isDisabled) {
                    this.#updateSelect();
                    this.#element.classList.add("disabled");
                }
                else {
                    this.#element.classList.remove("disabled");
                }
            }
            getElement() {
                return this.#element;
            }
            valueChanged(trace, direct) {
                super.valueChanged(trace, direct);
                this.#updateButtons();
                this.#updateSelect();
            }
            #updateSelect() {
                let values = this.getValue();
                this.#select.innerHTML = "";
                for (let i = 0; i < values.length; ++i) {
                    let name = this.#retrieveName.call(this, values[i], i);
                    this.#select.options.add(new Option(`${name}`));
                }
                if (this.getIsDisabled() || values.length == 0) {
                    this.getChild().setIsDisabled(true);
                }
                this.#select.selectedIndex = this.getSelectedIndex();
                this.#select.disabled = this.getIsDisabled() || values.length == 0;
            }
            #updateButtons() {
                let values = this.getValue();
                let selectedIndex = this.getSelectedIndex();
                let isDisabled = this.getIsDisabled();
                let isEmpty = selectedIndex == -1;
                let isFirst = selectedIndex == 0;
                let isLast = selectedIndex == values.length - 1;
                this.#buttons.add.disabled = isDisabled;
                this.#buttons.remove.disabled = isDisabled || isEmpty;
                this.#buttons.moveUp.disabled = isDisabled || isEmpty || isFirst;
                this.#buttons.moveDown.disabled = isDisabled || isEmpty || isLast;
            }
        }
        Widgets.Array = Array;
    })(Widgets = TagEditor.Widgets || (TagEditor.Widgets = {}));
})(TagEditor || (TagEditor = {}));
