/**
 * Create a document from HTML content
 * @param {string} content - HTML content
 * @param {Object} editor - Editor instance
 * @param {Object} [options={}] - Import options
 * @param {Document | null} [options.document] - Optional Document instance for Node environments (e.g. JSDOM)
 * @param {boolean} [options.isImport] - Whether this is an import operation
 * @returns {Object} Document node
 */
export function createDocFromHTML(content: string, editor: any, options?: {
    document?: Document | null;
    isImport?: boolean;
}): any;
//# sourceMappingURL=importHtml.d.ts.map