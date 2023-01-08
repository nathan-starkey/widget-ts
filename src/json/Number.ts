import { DisplayMode, HTMLWidget } from "../core/HTMLWidget.js";


export class Number<TRelatedNode extends HTMLWidget<TRelatedNode, any>> extends HTMLWidget<TRelatedNode, number> {
  private input: HTMLInputElement = document.createElement("input");

  constructor() {
    super();

    this.input.type = "number";
    this.input.valueAsNumber = 0;
    this.input.addEventListener("change", () => this.bubble(false));
  }

  getElement(): HTMLElement {
    return this.input;
  }

  getDisplayMode(): DisplayMode {
    return "inline";
  }

  setValue(value: any): void {
    this.input.valueAsNumber = globalThis.Number(value) || 0;
  }

  getValue(): number {
    return this.input.valueAsNumber;
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
    this.input.valueAsNumber = 0;
  }

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void {
    throw new Error("Widget does not support children");
  }
}