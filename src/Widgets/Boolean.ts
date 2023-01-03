/// <reference path="../WidgetBase/Widget.ts" />

namespace Widgets {
  export class Boolean extends WidgetBase.Widget {
    #element: HTMLInputElement;

    constructor(name: string) {
      super(name);

      this.#element = document.createElement("input");
      this.#element.type = "checkbox";
      this.#element.addEventListener("change", () => this.valueChanged());
      this.#element.classList.add("te-form-control");
    }

    setValue(value: boolean | undefined) {
      value = globalThis.Boolean(value);

      this.#element.checked = value;
      this.valueChanged();
    }

    setIsDisabled(isDisabled: boolean): void {
      this.#element.disabled = isDisabled;

      if (isDisabled) {
        this.#element.checked = false;
      }
    }

    getValue(): boolean {
      return this.#element.checked;
    }

    getIsDisabled(): boolean {
      return this.#element.disabled;
    }

    getElement(): HTMLInputElement {
      return this.#element;
    }
  }
}