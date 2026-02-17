export class StructuredContentViewBase {
    constructor(props: any);
    node: any;
    view: any;
    getPos: any;
    decorations: any;
    innerDecorations: any;
    editor: any;
    extension: any;
    htmlAttributes: any;
    root: any;
    isDragging: boolean;
    mount(): void;
    get dom(): any;
    get contentDOM(): any;
    update(node: any, decorations: any, innerDecorations: any): boolean;
    stopEvent(event: any): boolean;
    ignoreMutation(mutation: any): boolean;
    destroy(): void;
    updateAttributes(attrs: any): any;
    updateHTMLAttributes(): void;
    createDragHandle(): HTMLSpanElement;
    onDragStart(event: any): void;
}
//# sourceMappingURL=StructuredContentViewBase.d.ts.map