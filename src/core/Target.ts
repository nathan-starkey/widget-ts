import { INode, Node } from "./Node.js";


export interface ITarget {
  bubble(clean: boolean): void;
}


export class Target<TRelatedNode extends INode<TRelatedNode> & ITarget> implements ITarget {
  private node: Node<TRelatedNode>;

  constructor(node: Node<TRelatedNode>) {
    this.node = node;
  }

  bubble(clean: boolean): void {
    this.node.getParent()?.bubble(clean);
  }
}