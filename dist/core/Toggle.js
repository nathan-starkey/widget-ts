export class Toggle {
    node;
    enabled = true;
    constructor(node) {
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
    isEnabled() {
        return this.enabled;
    }
}
