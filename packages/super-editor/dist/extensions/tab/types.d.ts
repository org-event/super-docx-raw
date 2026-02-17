type TabStopInput = {
    /**
     * - Position in pixels from paragraph start.
     */
    pos: number;
    val: "start" | "end" | "center" | "decimal" | "bar" | "clear";
    leader?: "none" | "dot" | "hyphen" | "underscore" | "heavy" | "middleDot";
    decimalChar?: string;
};
type LayoutRequest = {
    paragraphId: string;
    revision: number;
    paragraphWidth: number;
    defaultTabDistance: number;
    defaultLineLength: number;
    indents: {
        left: number;
        right: number;
        firstLine: number;
        hanging: number;
    };
    tabStops: TabStopInput[];
    spans: Array<TextSpan | TabSpan>;
    indentWidth?: number;
    paragraphNode?: import("prosemirror-model").Node;
};
type TextSpan = {
    type: "text";
    spanId: string;
    text: string;
    style: any;
    from: number;
    to: number;
};
type TabSpan = {
    type: "tab";
    spanId: string;
    tabId: string;
    pos: number;
    nodeSize: number;
};
type LayoutResult = {
    paragraphId: string;
    revision: number;
    tabs: {
        [x: string]: TabLayout;
    };
};
type TabLayout = {
    width: number;
    height: number;
    alignment: "start" | "center" | "end" | "decimal" | "bar" | "default";
    tabStopPosUsed: number | string;
    leader?: "none" | "dot" | "hyphen" | "underscore" | "heavy" | "middleDot";
};
//# sourceMappingURL=types.d.ts.map