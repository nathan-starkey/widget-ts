/// <reference path="./ParentWidget.ts" />

namespace WidgetBase {
  export class StructWidget extends ParentWidget {
    #isDisabled: boolean;
  
    constructor(name: string, children: Array<Widget>) {
      super(name, children);
  
      this.#isDisabled = false;
    }
  
    setValue(value: Object | undefined): void {
      value ||= {};
  
      for (let widget of this.getChildren()) {
        widget.setValue(value[widget.getId()]);
      }
    }
  
    setIsDisabled(isDisabled: boolean): void {
      this.#isDisabled = isDisabled;
  
      for (let widget of this.getChildren()) {
        widget.setIsDisabled(isDisabled);
      }
    }
  
    getValue(): Object {
      let value = {};
  
      for (let widget of this.getChildren()) {
        value[widget.getId()] = widget.getValue();
      }
  
      return value;
    }
  
    getIsDisabled(): boolean {
      return this.#isDisabled;
    }
  }
}