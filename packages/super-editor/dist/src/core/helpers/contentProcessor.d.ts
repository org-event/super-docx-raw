/**
 * Unified content processor that handles all content types.
 *
 * This function validates inputs and converts various content formats
 * (HTML, Markdown, plain text, ProseMirror JSON) into ProseMirror documents.
 *
 * @param {Object} params - Processing parameters
 * @param {string} params.content - The content to process (required, must not be null/undefined)
 * @param {string} params.type - Content type: 'html', 'markdown', 'text', or 'schema'
 * @param {Object} params.editor - The editor instance (required, must have schema)
 * @returns {Object} Processed ProseMirror document node
 * @throws {Error} If editor is missing or invalid
 * @throws {Error} If content is null/undefined
 * @throws {Error} If DOM is required but not available (for HTML/markdown/text types)
 * @throws {Error} If content type is unknown
 */
export function processContent({ content, type, editor }: {
    content: string;
    type: string;
    editor: any;
}): any;
//# sourceMappingURL=contentProcessor.d.ts.map