/**
 * Represents a node in the SuperDoc document structure.
 */
export type SuperDocNode = any;
/**
 * Represents a node in the Open XML document structure.
 */
export type OpenXmlNode = {
    name: string;
    type?: string;
    attributes?: object;
    elements?: OpenXmlNode[];
    text?: string;
};
//# sourceMappingURL=index.d.ts.map