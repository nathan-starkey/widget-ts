/// <reference path="../WidgetBase/StructWidget.ts" />

namespace Widgets {
  export class Struct extends WidgetBase.StructWidget {
    #element: HTMLTableElement;

    constructor(name: string, children: globalThis.Array<WidgetBase.Widget>) {
      super(name, children);

      let table = document.createElement("table");
      let caption = document.createElement("caption");
      let tbody = document.createElement("tbody");

      table.classList.add("te-struct-block");
      
      if (this.getId()) {
        caption.classList.add("te-struct-block-caption");
        caption.innerText = this.getId();
        table.append(caption);
      }

      for (let widget of children) {
        let tr = document.createElement("tr");
        let td0 = document.createElement("td");
        let td1 = document.createElement("td");
        
        tr.classList.add("te-struct-block-row");
        td0.classList.add("te-struct-block-label");
        td1.classList.add("te-struct-block-child");

        if (widget instanceof WidgetBase.ParentWidget || widget instanceof Array) {
          td1.colSpan = 2;
        } else {
          td0.innerText = widget.getId();
          tr.append(td0);
        }
        
        td1.append(widget.getElement());
        tr.append(td1);
        tbody.append(tr);
      }

      table.append(tbody);

      this.#element = table;
    }

    setIsDisabled(isDisabled: boolean): void {
      super.setIsDisabled(isDisabled);

      if (isDisabled) {
        this.#element.classList.add("disabled");
      } else {
        this.#element.classList.remove("disabled");
      }
    }
  
    getElement(): HTMLTableElement {
      return this.#element;
    }
  }
}