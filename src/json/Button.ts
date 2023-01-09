import { DisplayMode, HTMLWidget } from "../core/HTMLWidget.js";


export class Button<TRelatedNode extends HTMLWidget<any, any>> extends HTMLWidget<TRelatedNode, never> {
  private button: HTMLButtonElement = document.createElement("button");

  constructor(label: string, callback: () => void) {
    super();

    this.button.innerText = label;
    this.button.addEventListener("click", () => callback());
  }

  getElement(): HTMLElement {
    return this.button;
  }

  getDisplayMode(): DisplayMode {
    return "inline";
  }

  setValue(value: any): void {
    // throw new Error("Widget does not export a value");
  }

  getValue(): never {
    throw new Error("Widget does not export a value");
  }

  exportsValue(): boolean {
    return false;
  }

  enable(): void {
    super.enable();
    
    this.button.disabled = false;
  }

  disable(): void {
    super.disable();

    this.button.disabled = true;
  }

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void {
    throw new Error("Widget does not support children");
  }
}