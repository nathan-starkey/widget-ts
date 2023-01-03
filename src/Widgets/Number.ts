/// <reference path="../WidgetBase/Widget.ts" />

namespace Widgets {
  export class Number extends WidgetBase.Widget {
    #element: HTMLInputElement;

    constructor(name: string) {
      super(name);

      this.#element = document.createElement("input");
      this.#element.type = "number";
      this.#element.valueAsNumber = 0;
      this.#element.addEventListener("change", () => this.valueChanged());
      this.#element.classList.add("te-form-control");
    }

    setValue(value: number | undefined) {
      value = globalThis.Number(value) || 0;

      this.#element.valueAsNumber = value;
      this.valueChanged();
    }

    setIsDisabled(isDisabled: boolean): void {
      this.#element.disabled = isDisabled;

      if (isDisabled) {
        this.#element.valueAsNumber = 0;
      }
    }

    getValue(): number {
      return this.#element.valueAsNumber;
    }

    getIsDisabled(): boolean {
      return this.#element.disabled;
    }

    getElement(): HTMLInputElement {
      return this.#element;
    }
  }
}