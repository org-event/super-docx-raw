export function translateStyleDefinitions(docx: any): any;
/**
 * Add default styles if missing. Default styles are:
 *
 * Normal, Title, Subtitle, Heading1, Heading2, Heading3
 *
 * Does not mutate the original docx object
 * @param {Object} styles The parsed docx styles [word/styles.xml]
 * @returns {Object | null} The updated styles object with default styles
 */
export function addDefaultStylesIfMissing(styles: any): any | null;
/**
 * Remove any nodes that belong to the inline group when they appear at the root.
 * ProseMirror's doc node only accepts block-level content; inline nodes here cause
 * Invalid content for node doc errors. This is a conservative filter that only
 * drops clearly inline node types if they somehow escape their paragraph.
 *
 * @param {Array<{type: string, content?: any, attrs?: any, marks?: any[]}>} content
 * @returns {Array}
 */
export function filterOutRootInlineNodes(content?: Array<{
    type: string;
    content?: any;
    attrs?: any;
    marks?: any[];
}>): any[];
/**
 * Inline passthrough nodes render as zero-width spans. If the text before ends
 * with a space and the text after starts with a space we will see a visible
 * double space once the passthrough is hidden. Collapse that edge to a single
 * trailing space on the left and trim the leading whitespace on the right.
 *
 * @param {Array} content
 */
export function collapseWhitespaceNextToInlinePassthrough(content?: any[]): void;
export function createDocumentJson(docx: any, converter: any, editor: any): {
    pmDoc: {
        type: string;
        content: any[];
        attrs: {
            bodySectPr?: any;
            attributes: any;
        };
    };
    savedTagsToRestore: any;
    pageStyles: any;
    comments: any[];
    footnotes: {
        id: string;
        content: any[];
    }[];
    inlineDocumentFonts: any[];
    linkedStyles: any[];
    translatedLinkedStyles: any;
    numbering: any;
    translatedNumbering: any;
    themeColors: {};
};
export function defaultNodeListHandler(): {
    handler: ({ nodes: elements, docx, insideTrackChange, converter, numbering, translatedNumbering, translatedLinkedStyles, editor, filename, parentStyleId, lists, inlineDocumentFonts, path, extraParams, }: {
        nodes: any;
        docx: any;
        insideTrackChange: any;
        converter: any;
        numbering: any;
        translatedNumbering: any;
        translatedLinkedStyles: any;
        editor: any;
        filename: any;
        parentStyleId: any;
        lists: any;
        inlineDocumentFonts: any;
        path?: any[];
        extraParams?: {};
    }) => any[];
    handlerEntities: any[];
};
export type XmlNode = import(any);
export type PmNodeJson = {
    type: string;
    content: any;
    text: any;
    marks: any;
    attrs: {};
};
export type PmMarkJson = {
    type: string;
    attrs: {};
};
export type NodeListHandlerFn = (nodes: XmlNode[], docx: ParsedDocx, insideTrackChange: boolean) => PmNodeJson[];
export type NodeListHandler = {
    handler: NodeListHandlerFn;
    handlerEntities: NodeHandlerEntry[];
};
export type NodeHandler = (nodes: XmlNode[], docx: ParsedDocx, nodeListHandler: NodeListHandler, insideTrackChange: boolean) => {
    nodes: PmNodeJson[];
    consumed: number;
};
export type NodeHandlerEntry = {
    handlerName: string;
    handler: NodeHandler;
};
//# sourceMappingURL=docxImporter.d.ts.map