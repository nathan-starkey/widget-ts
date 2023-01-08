import { DisplayMode, HTMLWidget } from "../core/HTMLWidget";
import { ArrayBase } from "../core/ArrayBase.js";


export class Array<TRelatedNode extends HTMLWidget<any, any>, TValue> extends ArrayBase<TRelatedNode, TValue> {
  private outer = document.createElement("div");
  private header = document.createElement("div");
  private body = document.createElement("div");
  private label = document.createElement("label");
  private combo = document.createElement("select");
  private buttonAdd = document.createElement("button");
  private buttonRemove = document.createElement("button");
  private buttonMoveUp = document.createElement("button");
  private buttonMoveDown = document.createElement("button");

  constructor(child: TRelatedNode, nameValue?: (value: TValue, index: number) => string) {
    super(child);

    if (nameValue) {
      this.nameValue = nameValue;
    }
    
    if (child.getDisplayMode() != "none") {
      this.body.append(child.getElement());
    }

    this.label.innerText = "array";
    this.buttonAdd.innerText = "Add";
    this.buttonRemove.innerText = "Delete";
    this.buttonMoveUp.innerHTML = "&#9650;";
    this.buttonMoveDown.innerHTML = "&#9660;";

    this.outer.classList.add("widget-array");
    this.header.classList.add("widget-array-header");
    this.body.classList.add("widget-array-body");

    this.combo.addEventListener("change", () => this.select(this.combo.selectedIndex));
    this.buttonAdd.addEventListener("click", () => this.add());
    this.buttonRemove.addEventListener("click", () => { this.remove(); this.buttonRemove.blur(); });
    this.buttonMoveUp.addEventListener("click", () => this.move(-1));
    this.buttonMoveDown.addEventListener("click", () => this.move(1));

    this.header.append(this.label, this.combo, this.buttonAdd, this.buttonRemove, this.buttonMoveUp, this.buttonMoveDown);
    this.outer.append(this.header, this.body);
    this.update();
  }

  private nameValue(value: TValue, index: number): string {
    return index.toString();
  }

  private update(): void {
    this.updateCombo();
    this.updateButtons();
  }

  private updateCombo(): void {
    this.storeValue();
    
    this.combo.innerHTML = "";
    this.combo.disabled = !this.isEnabled() || this.values.length == 0;

    let index = 0;

    for (let value of this.values) {
      let name = this.nameValue(value, index) || "(no name)";

      this.combo.options.add(new Option(name));
      ++index;
    }

    this.combo.selectedIndex = this.index;
  }

  private updateButtons(): void {
    this.buttonAdd.disabled = !this.isEnabled();
    this.buttonRemove.disabled = !this.isEnabled() || this.index == -1;
    this.buttonMoveUp.disabled = !this.isEnabled() || this.index == -1 || this.index == 0;
    this.buttonMoveDown.disabled = !this.isEnabled() || this.index == -1 || this.index == this.values.length - 1;
  }

  bubble(clean: boolean): void {
    super.bubble(clean);

    this.update();
  }

  enable(): void {
    super.enable();

    this.outer.classList.remove("disabled");
    this.update();
  }

  disable(): void {
    super.disable();

    this.outer.classList.add("disabled");
    this.update();
  }

  setValue(value: any): void {
    super.setValue(value);
    
    this.update();
  }

  select(index: number) {
    super.select(index);

    this.update();
  }
  
  getElement(): HTMLElement {
    this.label.innerText = this.getParent()?.nameOf(this) || "array";

    return this.outer;
  }

  getDisplayMode(): DisplayMode {
    return "block";
  }
}