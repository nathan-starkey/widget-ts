import { Widget } from "./Widget.js";
export class HTMLWidget extends Widget {
    nameOf(child) {
        return this.getChildren().indexOf(child).toString();
    }
}
