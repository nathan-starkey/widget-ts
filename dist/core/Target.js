export class Target {
    node;
    constructor(node) {
        this.node = node;
    }
    bubble(clean) {
        this.node.getParent()?.bubble(clean);
    }
}
