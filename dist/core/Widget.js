import { Node } from "./Node.js";
import { Target } from "./Target.js";
import { Toggle } from "./Toggle.js";
export class Widget {
    node = new Node();
    target = new Target(this.node);
    toggle = new Toggle(this.node);
    setParent(parent) {
        this.node.setParent(parent);
    }
    setChildren(parent, children) {
        this.node.setChildren(parent, children);
    }
    getParent() {
        return this.node.getParent();
    }
    getChildren() {
        return this.node.getChildren();
    }
    bubble(clean) {
        this.target.bubble(clean);
    }
    enable() {
        this.toggle.enable();
    }
    disable() {
        this.toggle.disable();
    }
    isEnabled() {
        return this.toggle.isEnabled();
    }
}
