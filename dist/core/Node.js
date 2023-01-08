export class Node {
    parent = null;
    children = [];
    setParent(parent) {
        this.parent = parent;
    }
    setChildren(parent, children) {
        this.children = children;
        for (let child of children) {
            child.setParent(parent);
        }
    }
    getParent() {
        return this.parent;
    }
    getChildren() {
        return this.children;
    }
}
