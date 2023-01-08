export interface INode<TRelatedNode extends INode<TRelatedNode>> {
  setParent(parent: TRelatedNode): void;

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void;

  getParent(): TRelatedNode | null;
  
  getChildren(): readonly TRelatedNode[];
}


export class Node<TRelatedNode extends INode<TRelatedNode>> implements INode<TRelatedNode> {
  private parent: TRelatedNode | null = null;
  private children: readonly TRelatedNode[] = [];

  setParent(parent: TRelatedNode): void {
    this.parent = parent;
  }

  setChildren(parent: TRelatedNode, children: TRelatedNode[]): void {
    this.children = children;

    for (let child of children) {
      child.setParent(parent);
    }
  }

  getParent(): TRelatedNode | null {
    return this.parent;
  }

  getChildren(): readonly TRelatedNode[] {
    return this.children;
  }
}