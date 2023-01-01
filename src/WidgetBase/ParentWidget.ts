/// <reference path="./Widget.ts" />

namespace WidgetBase {
  export class ParentWidget extends Widget {
    #children: Array<Widget>;
  
    constructor(name: string, children: Array<Widget>) {
      super(name);
  
      this.#children = children;
  
      for (let widget of children) {
        widget.setParent(this);
      }
    }
  
    getChildren() {
      return Array.from(this.#children);
    }
  }
}