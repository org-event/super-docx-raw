/**
 * @param {Object} params
 * @returns {Array|null}
 */
export function handleDocPartObj(params: any): any[] | null;
export function tableOfContentsHandler(params: {
    nodes: any[];
    nodeListHandler: any;
    extraParams: {
        sdtPr: any;
    };
    path?: any[];
}): any;
export function genericDocPartHandler(params: {
    nodes: any[];
    nodeListHandler: any;
    extraParams: {
        sdtPr: any;
        docPartGalleryType: string;
    };
    path?: any[];
}): any;
export function normalizeDocPartContent(nodes?: any[]): any[];
//# sourceMappingURL=handle-doc-part-obj.d.ts.map