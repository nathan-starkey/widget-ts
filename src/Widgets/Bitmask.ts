/// <reference path="../WidgetBase/Widget.ts" />

namespace Widgets {
  export class Bitmask extends WidgetBase.Widget {
    #element: HTMLTableElement;
    #inputs: HTMLInputElement[];
    #isDisabled: boolean;

    constructor(name: string, options: string[]) {
      super(name);

      let table = document.createElement("table");
      let tbody = document.createElement("tbody");
      let inputs = [];
      
      table.classList.add("te-form-control");
      table.classList.add("te-bitmask-widget");

      for (let option of options) {
        let tr = document.createElement("tr");
        let td0 = document.createElement("td");
        let td1 = document.createElement("td");
        let input = document.createElement("input");

        td0.innerText = option;
        input.type = "checkbox";
        inputs.push(input);

        tr.addEventListener("click", () => input.click());
        input.addEventListener("click", ev => ev.stopImmediatePropagation());
        input.addEventListener("change", () => this.valueChanged());

        td1.append(input);
        tr.append(td0, td1);
        tbody.append(tr);
        table.append(tbody);
      }

      this.#element = table;
      this.#inputs = inputs;
    }

    setValue(value: number | undefined) {
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

    setIsDisabled(isDisabled: boolean): void {
      this.#isDisabled = isDisabled;

      for (let input of this.#inputs) {
        input.disabled = isDisabled;

        if (isDisabled) {
          input.checked = false;
        }
      }

      if (isDisabled) {
        this.#element.classList.add("disabled");
      } else {
        this.#element.classList.remove("disabled");
      }
    }

    getValue(): number {
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

    getIsDisabled(): boolean {
      return this.#isDisabled;
    }

    getElement(): HTMLTableElement {
      return this.#element;
    }
  }
}