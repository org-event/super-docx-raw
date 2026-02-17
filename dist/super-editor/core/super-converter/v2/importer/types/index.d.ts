export type NodeHandlerParams = {
    /**
     * - The array of nodes to process.
     */
    nodes: any[];
    /**
     * - The parsed DOCX object.
     */
    docx: any;
    /**
     * - Numbering definitions extracted from numbering.xml.
     */
    numbering?: {
        definitions?: Record<string, any>;
        abstracts?: Record<string, any>;
    };
    /**
     * - Indicates if the processing is inside a track change.
     */
    insideTrackChange: boolean;
    /**
     * - The node list handler.
     */
    nodeListHandler: NodeListHandler;
    /**
     * - The converter object.
     */
    converter: any;
    /**
     * - The editor object.
     */
    editor: import("../../../../Editor").Editor;
    /**
     * - The name of the file being processed.
     */
    filename?: string;
    /**
     * - The ID of the parent style.
     */
    parentStyleId?: string;
    /**
     * - The imported lists object
     */
    lists?: any;
    /**
     * - The inline fonts found in the document
     */
    inlineDocumentFonts?: string[];
    /**
     * - The path of nodes leading to the current node.
     */
    path?: any[];
    /**
     * - The extra params.
     */
    extraParams?: Record<string, any>;
};
export type XmlNode = any;
export type PmNodeJson = {
    type: string;
    content: any;
    text: any;
    attrs: {};
    marks: any;
    sdNodeOrKeyName: string;
};
export type PmMarkJson = {
    type: string;
    attrs: {};
};
export type ParsedDocx = any;
export type NodeListHandler = {
    handler: NodeListHandlerFn;
    handlerEntities: NodeHandlerEntry[];
};
export type NodeListHandlerFn = (params: NodeHandlerParams) => PmNodeJson[];
export type NodeHandler = (params: NodeHandlerParams) => {
    nodes: PmNodeJson[];
    consumed: number;
};
export type NodeHandlerEntry = {
    handlerName: string;
    handler: NodeHandler;
};
export type SuperConverter = any;
export type Editor = any;
//# sourceMappingURL=index.d.ts.map