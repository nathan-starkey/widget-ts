import { DisplayMode, HTMLWidget } from "../core/HTMLWidget.js";


export class Boolean<TRelatedNode extends HTMLWidget<TRelatedNode, any>> extends HTMLWidget<TRelatedNode, boolean> {
  private input: HTMLInputElement = document.createElement("input");

  constructor() {
    super();

    this.input.type = "checkbox";
    this.input.addEventListener("change", () => this.bubble(false));
  }

  getElement(): HTMLElement {
    return this.input;
  }

  getDisplayMode(): DisplayMode {
    return "inline";
  }

  setValue(value: any): void {
    this.input.checked = value;
  }

  getValue(): boolean {
    return this.input.checked;
  }

  exportsValue(): boolean {
    return true;
  }

  enable(): void {
    super.enable();
    
    this.input.disabled = false;
  }

  disable(): void {
    super.disable();

    this.input.disabled = true;
    this.input.checked = false;
  }

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void {
    throw new Error("Widget does not support children");
  }
}