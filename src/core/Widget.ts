import { INode, Node } from "./Node.js";
import { ITarget, Target } from "./Target.js";
import { IToggle, Toggle } from "./Toggle.js";


export interface IWidget<TRelatedNode extends INode<TRelatedNode>, TValue> {
  setValue(value: any): void;

  getValue(): TValue;

  exportsValue(): boolean;
}


export abstract class Widget<TRelatedNode extends Widget<TRelatedNode, any>, TValue> implements INode<TRelatedNode>, ITarget, IToggle, IWidget<TRelatedNode, TValue> {
  private node: Node<TRelatedNode> = new Node<TRelatedNode>();
  private target: Target<TRelatedNode> = new Target<TRelatedNode>(this.node);
  private toggle: Toggle<TRelatedNode> = new Toggle<TRelatedNode>(this.node);

  setParent(parent: TRelatedNode): void {
    this.node.setParent(parent);
  }

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void {
    this.node.setChildren(parent, children);
  }

  getParent(): TRelatedNode | null {
    return this.node.getParent();
  }

  getChildren(): readonly TRelatedNode[] {
    return this.node.getChildren();
  }

  bubble(clean: boolean): void {
    this.target.bubble(clean);
  }

  enable(): void {
    this.toggle.enable();
  }

  disable(): void {
    this.toggle.disable();
  }

  isEnabled(): boolean {
    return this.toggle.isEnabled();
  }

  abstract setValue(value: any): void;

  abstract getValue(): TValue;

  abstract exportsValue(): boolean;
}