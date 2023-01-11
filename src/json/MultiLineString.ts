import { DisplayMode, HTMLWidget } from "../core/HTMLWidget.js";


export class WMultiLineString<TRelatedNode extends HTMLWidget<TRelatedNode, any>> extends HTMLWidget<TRelatedNode, string> {
  private input: HTMLTextAreaElement = document.createElement("textarea");

  constructor() {
    super();

    this.input.addEventListener("change", () => this.bubble(false));
  }

  getElement(): HTMLElement {
    return this.input;
  }

  getDisplayMode(): DisplayMode {
    return "inline";
  }

  setValue(value: any): void {
    this.input.value = value || "";
  }

  getValue(): string {
    return this.input.value;
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
    this.input.value = "";
  }

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void {
    throw new Error("Widget does not support children");
  }
}