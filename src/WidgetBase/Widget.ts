namespace WidgetBase {
  export class Widget {
    #id: string;
    #parent: Widget | null;
  
    constructor(id: string) {
      this.#id = id;
      this.#parent = null;
    }
  
    setParent(parent: Widget): void  {
      this.#parent = parent;
    }
  
    setValue(value: undefined): void {
      throw new Error("abstract method not implemented");
    }
  
    setIsDisabled(isDisabled: boolean): void {
      throw new Error("abstract method not implemented");
    }
  
    getId(): string {
      return this.#id;
    }
  
    getParent(): Widget | null {
      return this.#parent;
    }
  
    getValue(): any {
      throw new Error("abstract method not implemented");
    }
  
    getIsDisabled(): boolean {
      throw new Error("abstract method not implemented");
    }
  
    getElement(): HTMLElement {
      throw new Error("abstract method not implemented");
    }
  
    valueChanged(trace: Array<string> = [this.#id], direct: boolean = true): void {
      if (this.#parent) {
        trace.push(this.#parent.getId());
        
        this.#parent.valueChanged(trace, false);
      }
    }
  }
}