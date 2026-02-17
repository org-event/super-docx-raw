/**
 * Parse footnotes.xml into SuperDoc-ready footnote entries.
 *
 * These will be available on converter.footnotes and are used by PresentationEditor
 * to build a footnotes panel.
 *
 * @param {Object} params
 * @param {ParsedDocx} params.docx The parsed docx object
 * @param {NodeListHandler} [params.nodeListHandler] Optional node list handler (defaults to docxImporter default)
 * @param {SuperConverter} params.converter The super converter instance
 * @param {Editor} params.editor The editor instance
 * @param {Object} [params.numbering] Numbering definitions (optional)
 * @returns {Array<{id: string, content: any[]}>}
 */
export function importFootnoteData({ docx, editor, converter, nodeListHandler, numbering }?: {
    docx: ParsedDocx;
    nodeListHandler?: NodeListHandler;
    converter: SuperConverter;
    editor: Editor;
    numbering?: any;
}): Array<{
    id: string;
    content: any[];
}>;
//# sourceMappingURL=documentFootnotesImporter.d.ts.map