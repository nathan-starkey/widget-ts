import { Widget } from "./Widget.js";


export type DisplayMode = "none" | "inline" | "block";


export interface IHTMLWidget {
  nameOf(child: IHTMLWidget): string;

  getElement(): HTMLElement;

  getDisplayMode(): DisplayMode;
}


export abstract class HTMLWidget<TRelatedNode extends HTMLWidget<TRelatedNode, any>, TValue> extends Widget<TRelatedNode, TValue> implements IHTMLWidget {
  nameOf(child: TRelatedNode): string {
    return this.getChildren().indexOf(child).toString();
  }

  abstract getElement(): HTMLElement;

  abstract getDisplayMode(): DisplayMode;
}