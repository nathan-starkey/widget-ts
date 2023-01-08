import { INode, Node } from "./Node.js";


export interface IToggle {
  enable(): void;

  disable(): void;

  isEnabled(): boolean;
}


export class Toggle<TRelatedNode extends INode<TRelatedNode> & IToggle> implements IToggle {
  private node: Node<TRelatedNode>;
  private enabled: boolean = true;

  constructor(node: Node<TRelatedNode>) {
    this.node = node;
  }

  enable() {
    this.enabled = true;

    for (let child of this.node.getChildren()) {
      child.enable();
    }
  }

  disable() {
    this.enabled = false;

    for (let child of this.node.getChildren()) {
      child.disable();
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}