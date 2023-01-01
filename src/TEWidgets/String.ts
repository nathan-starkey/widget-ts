/// <reference path="../WidgetBase/Widget.ts" />

namespace TagEditor.Widgets {
  export class String extends WidgetBase.Widget {
    #element: HTMLInputElement | HTMLTextAreaElement;

    constructor(name: string, multiline: boolean = false) {
      super(name);

      this.#element = document.createElement(multiline ? "textarea" : "input");
      this.#element.addEventListener("change", () => this.valueChanged());
      this.#element.classList.add("te-form-control");
    }

    setValue(value: string | undefined) {
      value = globalThis.String(value || "");

      this.#element.value = value;
      this.valueChanged();
    }

    setIsDisabled(isDisabled: boolean): void {
      this.#element.disabled = isDisabled;

      if (isDisabled) {
        this.#element.value = "";
      }
    }

    getValue(): string {
      return this.#element.value;
    }

    getIsDisabled(): boolean {
      return this.#element.disabled;
    }

    getElement(): HTMLInputElement | HTMLTextAreaElement {
      return this.#element;
    }
  }
}