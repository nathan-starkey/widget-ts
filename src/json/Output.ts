import { DisplayMode, HTMLWidget } from "../core/HTMLWidget.js";


export class Output<TRelatedNode extends HTMLWidget<any, any>> extends HTMLWidget<TRelatedNode, never> {
  private output: HTMLOutputElement = document.createElement("output");

  constructor() {
    super();
  }

  getElement(): HTMLElement {
    return this.output;
  }

  getDisplayMode(): DisplayMode {
    return "inline";
  }

  setValue(value: any): void {
    this.output.value = value || "";
  }

  getValue(): never {
    throw new Error("Widget does not export a value");
  }

  exportsValue(): boolean {
    return false;
  }

  enable(): void {
    super.enable();
    
    this.output.classList.remove("disabled");
  }

  disable(): void {
    super.disable();

    this.output.value = "";
    this.output.classList.add("disabled");
  }

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void {
    throw new Error("Widget does not support children");
  }
}