/**
 * Translates a vectorShape node back to XML.
 * @param {Object} params - Translation parameters
 * @returns {Object} XML node
 */
export function translateVectorShape(params: any): any;
/**
 * Translates a shapeGroup node back to XML.
 * @param {Object} params - Translation parameters
 * @returns {Object} XML node
 */
export function translateShapeGroup(params: any): any;
export function translateImageNode(params: any): any;
/**
 * Decodes image into export XML
 */
export type ExportParams = {
    /**
     * JSON node to translate (from PM schema)
     */
    node: any;
    /**
     * The stored body node to restore, if available
     */
    bodyNode: any;
    /**
     * The relationships to add to the document
     */
    relationships: any[];
};
//# sourceMappingURL=decode-image-node-helpers.d.ts.map