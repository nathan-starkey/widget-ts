import { DisplayMode, HTMLWidget } from "../core/HTMLWidget.js";


export class Observer<TRelatedNode extends HTMLWidget<any, any>, TValue> extends HTMLWidget<any, TValue> {
  private child: TRelatedNode;
  private callback: (child: TRelatedNode) => void;

  constructor(child: TRelatedNode, callback?: (child: TRelatedNode) => void) {
    super();

    this.child = child;
    this.setChildren(this, [child]);

    if (callback) {
      this.callback = callback;
    }
  }

  getElement(): HTMLElement {
    return this.child.getElement();
  }

  getDisplayMode(): DisplayMode {
    return this.child.getDisplayMode();
  }

  bubble(clean: boolean): void {
    if (!clean && this.callback) {
      this.callback(this.child);
    }
  }

  setValue(value: any): void {
    return this.child.setValue(value)
  }

  getValue(): TValue {
    return this.child.getValue();
  }

  exportsValue(): boolean {
    return this.child.exportsValue();
  }
}