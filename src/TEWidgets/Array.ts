/// <reference path="../WidgetBase/ParentWidget.ts" />
/// <reference path="../WidgetBase/ArrayWidget.ts" />

namespace TagEditor.Widgets {
  export class Array extends WidgetBase.ArrayWidget {
    #element: HTMLDivElement;
    #buttons: {add: HTMLButtonElement, remove: HTMLButtonElement, moveUp: HTMLButtonElement, moveDown: HTMLButtonElement};
    #select: HTMLSelectElement;
    #retrieveName: Function;

    constructor(name: string, child: WidgetBase.Widget, retrieveName?: Function) {
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

      this.#retrieveName = retrieveName || ((value: string) => {
        if (child instanceof WidgetBase.ParentWidget) {
          value = Object.values(value)[0];
        }
  
        if (globalThis.Array.isArray(value)) {
          return `array (${value.length})`;
        } else if (typeof value == "object") {
          return "object";
        } else if (value == undefined) {
          return "empty";
        } else {
          return globalThis.String(value) || "(no name)";
        }
      });
      
      this.#updateButtons();
      this.#updateSelect();
    }

    setValue(values: any[]): void {
      super.setValue(values);

      this.#updateSelect();
      this.#updateButtons();
    }

    setSelectedIndex(selectedIndex: number): void {
      super.setSelectedIndex(selectedIndex);
      
      this.#updateButtons();
    }

    setIsDisabled(isDisabled: boolean): void {
      super.setIsDisabled(isDisabled);

      this.#updateButtons();

      if (isDisabled) {
        this.#updateSelect();
        this.#element.classList.add("disabled")
      } else {
        this.#element.classList.remove("disabled")
      }
    }
  
    getElement(): HTMLDivElement {
      return this.#element;
    }

    valueChanged(trace?: string[], direct?: boolean): void {
      super.valueChanged(trace, direct);

      this.#updateButtons();
      this.#updateSelect();
    }

    #updateSelect(): void {
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

    #updateButtons(): void {
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
}