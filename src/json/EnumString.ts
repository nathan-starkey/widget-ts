import { DisplayMode, HTMLWidget } from "../core/HTMLWidget.js";


export class EnumString<TRelatedNode extends HTMLWidget<any, any>> extends HTMLWidget<HTMLWidget<TRelatedNode, any>, string> {
  private select: HTMLSelectElement = document.createElement("select");
  private values: string[];

  constructor(values: string[]) {
    super();

    for (let value of values) {
      this.select.options.add(new Option(value));
    }
    
    this.values = values;
    this.select.selectedIndex = 0;
    this.select.addEventListener("change", () => this.bubble(false));
  }

  getElement(): HTMLElement {
    return this.select;
  }

  getDisplayMode(): DisplayMode {
    return "inline";
  }

  setValue(value: any): void {
    this.select.selectedIndex = Math.max(0, this.values.indexOf(value));
  }

  getValue(): string {
    return this.select.value;
  }

  exportsValue(): boolean {
    return true;
  }

  enable(): void {
    super.enable();
    
    this.select.disabled = false;
  }

  disable(): void {
    super.disable();

    this.select.disabled = true;
    this.select.selectedIndex = 0;
  }

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void {
    throw new Error("Widget does not support children");
  }
}