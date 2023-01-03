/// <reference path="../WidgetBase/Widget.ts" />

namespace Widgets {
  export class Vector extends WidgetBase.Widget {
    #element: HTMLDivElement;
    #inputs: HTMLInputElement[];
    #isDisabled: boolean;

    constructor(name: string, size: number, labels: (string | undefined)[]) {
      super(name);

      let container = document.createElement("div");
      let inputs = [];

      container.classList.add("te-vector-widget");

      for (let i = 0; i < size; ++i) {
        let input = document.createElement("input");

        input.type = "number";
        input.valueAsNumber = 0;
        input.classList.add("te-form-control");
        input.addEventListener("change", () => this.valueChanged());
        
        inputs.push(input);

        if (labels[i] != undefined) {
          container.append(labels[i]);
        }

        container.append(input);
      }
      
      if (labels[inputs.length] != undefined) {
        container.append(labels[inputs.length]);
      }

      this.#element = container;
      this.#inputs = inputs;
      this.#isDisabled = false;
    }

    setValue(value: number[] | undefined) {
      value ||= [];

      for (let i = 0; i < this.#inputs.length; ++i) {
        let input = this.#inputs[i];
        let val = globalThis.Number(value[i]) || 0;

        input.valueAsNumber = val;
      }
      
      this.valueChanged();
    }

    setIsDisabled(isDisabled: boolean): void {
      this.#isDisabled = isDisabled;
      
      for (let input of this.#inputs) {
        input.disabled = isDisabled;
      }
      
      if (isDisabled) {
        for (let input of this.#inputs) {
          input.valueAsNumber = 0;
        }

        this.#element.classList.add("disabled");
      } else {
        this.#element.classList.remove("disabled");
      }
    }

    getValue(): number[] {
      return this.#inputs.map(input => input.valueAsNumber);
    }

    getIsDisabled(): boolean {
      return this.#isDisabled;
    }

    getElement(): HTMLDivElement {
      return this.#element;
    }
  }
}