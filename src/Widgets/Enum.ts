/// <reference path="../WidgetBase/Widget.ts" />

namespace Widgets {
  export class Enum extends WidgetBase.Widget {
    #element: HTMLSelectElement;
    #options: string[];

    constructor(name: string, options: string[]) {
      super(name);

      this.#element = document.createElement("select");
      this.#element.addEventListener("change", () => this.valueChanged());
      this.#element.classList.add("te-form-control");
      this.#options = options;

      for (let option of options) {
        this.#element.options.add(new Option(option));
      }
    }

    setValue(value: string | undefined) {
      let index = this.#options.indexOf(value);

      index = Math.max(index, 0);
      this.#element.selectedIndex = index;
      this.valueChanged();
    }

    setIsDisabled(isDisabled: boolean): void {
      this.#element.disabled = isDisabled;

      if (isDisabled) {
        this.#element.selectedIndex = 0;
      }
    }

    getValue(): string {
      return this.#element.value;
    }

    getIsDisabled(): boolean {
      return this.#element.disabled;
    }

    getElement(): HTMLSelectElement {
      return this.#element;
    }
  }
}