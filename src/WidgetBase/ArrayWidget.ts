/// <reference path="./Widget.ts" />

namespace WidgetBase {
  export class ArrayWidget extends Widget {
    #child: Widget;
    #values: Array<any>;
    #isDisabled: boolean;
    #selectedIndex: number;
  
    constructor(name: string, child: Widget) {
      super(name);
  
      this.#child = child;
      this.#values = [];
      this.#isDisabled = false;
      this.#selectedIndex = -1;
  
      child.setParent(this);
      child.setIsDisabled(true);
    }
  
    setSelectedIndex(selectedIndex: number): void {
      if (selectedIndex < -1 || selectedIndex >= this.#values.length) {
        throw new RangeError(`index ${selectedIndex} out of range`);
      }
  
      if (this.#selectedIndex != -1) {
        this.#values[this.#selectedIndex] = this.#child.getValue();
      }
  
      this.#selectedIndex = selectedIndex;
  
      if (this.#selectedIndex == -1) {
        this.#child.setIsDisabled(true);
        // Line removed because this action is
        // now implicit with setDisabled(true):
        // this.#child.setValue(undefined);
      } else {
        this.#child.setIsDisabled(false);
        this.#child.setValue(this.#values[this.#selectedIndex]);
      }
    }
  
    setValue(values: Array<any> | undefined): void {
      values ||= [];
  
      this.#values = Array.from(values);
      this.#selectedIndex = -1;
  
      for (let i = 0; i < this.#values.length; ++i) {
        this.setSelectedIndex(i);
        this.#values[i] = this.#child.getValue();
      }
    }
  
    setIsDisabled(isDisabled: boolean): void {
      this.#isDisabled = isDisabled;
  
      this.#child.setIsDisabled(isDisabled || this.#selectedIndex == -1);

      if (isDisabled) {
        this.#values = [];
        this.#selectedIndex = -1;
      }
    }
  
    getSelectedIndex(): number {
      return this.#selectedIndex;
    }
  
    getValue(): Array<any> {
      if (this.#selectedIndex != -1) {
        this.#values[this.#selectedIndex] = this.#child.getValue();
      }
  
      return Array.from(this.#values);
    }
  
    getIsDisabled(): boolean {
      return this.#isDisabled;
    }

    getChild(): Widget {
      return this.#child;
    }
  
    add(): void {
      this.#values.push(undefined);
      this.setSelectedIndex(this.#values.length - 1);
      this.valueChanged();
    }
  
    remove(): void {
      if (this.#selectedIndex == -1) {
        return;
      }
  
      let index = this.#selectedIndex;
      let isLastItem = this.#selectedIndex == this.#values.length - 1;
  
      if (isLastItem) {
        this.setSelectedIndex(index - 1);
      } else {
        this.setSelectedIndex(index + 1);
        --this.#selectedIndex;
      }
  
      this.#values.splice(index, 1);
  
      this.valueChanged();
    }
  
    move(offset: number): void {
      offset = Math.floor(offset);
  
      if (offset == 0) {
        return;
      }
  
      let index = this.#selectedIndex + offset;
  
      index = Math.min(index, this.#values.length);
      index = Math.max(index, 0);
      
      let a = this.#values[this.#selectedIndex];
      let b = this.#values[index];
  
      this.#values[this.#selectedIndex] = b;
      this.#values[index] = a;
      this.#selectedIndex = index;
  
      this.valueChanged();
    }
  }
}