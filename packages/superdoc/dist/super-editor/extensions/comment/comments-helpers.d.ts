export function removeCommentsById({ commentId, state, tr, dispatch }: {
    commentId: string;
}): void;
export function getCommentPositionsById(commentId: string, doc: import("prosemirror-model").Node): any[];
export function resolveCommentById({ commentId, state, tr, dispatch }: {
    commentId: string;
    state: import("prosemirror-state").EditorState;
    tr: import("prosemirror-state").Transaction;
    dispatch: Function;
}): boolean;
export function prepareCommentsForExport(doc: import("prosemirror-model").Node, tr: import("prosemirror-state").Transaction, schema: import("prosemirror-model").Schema, comments?: any): void;
export function getPreparedComment(attrs: any): any;
export function prepareCommentsForImport(doc: import("prosemirror-model").Node, tr: import("prosemirror-state").Transaction, schema: import("prosemirror-model").Schema, converter: any): void;
export function translateFormatChangesToEnglish(attrs?: any): string;
export function clampOpacity(value: number): number | null;
export function applyAlphaToHex(color: string, opacity: number): string;
export function getHighlightColor({ activeThreadId, threadId, isInternal, editor }: {
    activeThreadId: any;
    threadId: any;
    isInternal: any;
    editor: any;
}): any;
//# sourceMappingURL=comments-helpers.d.ts.map