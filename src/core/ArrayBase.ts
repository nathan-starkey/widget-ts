import { DisplayMode, HTMLWidget } from "../core/HTMLWidget.js";


export abstract class ArrayBase<TRelatedNode extends HTMLWidget<any, any>, TValue> extends HTMLWidget<any, TValue[]> {
  protected values: TValue[] = [];
  protected index: number = -1;
  private child: TRelatedNode;

  constructor(child: TRelatedNode) {
    super();

    this.setChildren(this, [child]);
    this.child = child;
    child.disable();
  }

  protected storeValue() {
    if (this.index != -1) {
      this.values[this.index] = this.child.getValue();
    }
  }

  private restoreValue() {
    if (this.index == -1) {
      this.child.disable();
    } else {
      this.child.setValue(this.values[this.index]);
    }
  }

  getValue(): TValue[] {
    this.storeValue();

    return Array.from(this.values);
  }

  setValue(value: any): void {
    if (!Array.isArray(value)) {
      value = [];
    }

    this.values = Array.from(value);
    this.index = -1;
    this.select(value.length - 1);
  }

  exportsValue(): boolean {
    return true;
  }

  enable(): void {
    super.enable();

    if (this.index == -1) {
      this.child.disable();
    }
  }

  disable(): void {
    super.disable();

    this.index = -1;
    this.values = [];
  }

  add() {
    this.storeValue();
    this.child.enable();
    this.child.setValue(undefined);
    this.index = this.values.length;
    this.values.push(this.child.getValue());
    this.bubble(false);
  }

  remove() {
    if (this.index != -1) {
      this.values.splice(this.index, 1);
      this.index = Math.min(this.index, this.values.length - 1);
      this.restoreValue();
      this.bubble(false);
    }
  }

  move(offset: number) {
    let index = this.index + offset;

    if (Number.isInteger(offset) && offset != 0 && index >= 0 && index < this.values.length && this.index != -1) {
      let other = this.values[index];

      this.values[index] = this.values[this.index];
      this.values[this.index] = other;
      this.index = index;
      this.bubble(false);
    }
  }

  select(index: number) {
    this.storeValue();
    this.index = index;
    this.restoreValue();

    if (this.index == -1) {
      this.child.disable();
    } else {
      this.child.enable();
    }
  }
}