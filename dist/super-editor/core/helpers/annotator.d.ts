export function getFieldAttrs(field: any, value: any, input: any): any;
export function processTables({ state, tr, annotationValues }: {
    state: import("prosemirror-state").EditorState;
    tr: import("prosemirror-state").Transaction;
    annotationValues: any[];
}): import("prosemirror-state").Transaction;
export function getAllHeaderFooterEditors(): any[];
export function annotateDocument({ annotationValues, hiddenFieldIds, removeEmptyFields, schema, tr, }: {
    annotationValues?: any[];
    hiddenFieldIds?: any[];
    removeEmptyFields?: boolean;
    schema: any;
    tr: any;
}): any;
export namespace AnnotatorHelpers {
    export { getFieldAttrs };
    export { processTables };
    export { annotateDocument };
    export { annotateHeadersAndFooters };
    export { getAllHeaderFooterEditors };
}
/**
 * Annotate headers and footers in the document
 *
 * @param {Object} param0
 * @param {Object} param0.editor The editor instance
 * @param {Array} param0.annotationValues The annotation values to apply
 * @param {Array} param0.hiddenFieldIds List of field IDs to hide
 * @returns {void}
 */
declare function annotateHeadersAndFooters(): void;
export {};
//# sourceMappingURL=annotator.d.ts.map