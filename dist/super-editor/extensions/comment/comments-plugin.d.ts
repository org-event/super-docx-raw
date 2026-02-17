export const CommentsPluginKey: PluginKey<any>;
export const CommentsPlugin: Extension<Record<string, never>, Record<string, never>>;
export namespace __test__ {
    export { getActiveCommentId };
    export { findTrackedMark };
    export { handleTrackedChangeTransaction };
    export { getTrackedChangeText };
    export { createOrUpdateTrackedChangeComment };
    export { findRangeById };
}
import { PluginKey } from 'prosemirror-state';
import { Extension } from '@core/Extension.js';
/**
 * This is run when a new selection is set (tr.selectionSet) to return the active comment ID, if any
 * If there are multiple, only return the first one
 *
 * @param {Object} doc The current document
 * @param {Selection} selection The current selection
 * @returns {String | null} The active comment ID, if any
 */
declare function getActiveCommentId(doc: any, selection: Selection): string | null;
declare function findTrackedMark({ doc, from, to, offset, }: {
    doc: any;
    from: any;
    to: any;
    offset?: number;
}): undefined;
declare function handleTrackedChangeTransaction(trackedChangeMeta: any, trackedChanges: any, newEditorState: any, editor: any): any;
declare function getTrackedChangeText({ nodes, mark, trackedChangeType, isDeletionInsertion, marks }: {
    nodes: any;
    mark: any;
    trackedChangeType: any;
    isDeletionInsertion: any;
    marks: any;
}): {
    deletionText: string;
    trackedChangeText: string;
};
declare function createOrUpdateTrackedChangeComment({ event, marks, deletionNodes, nodes, newEditorState, documentId }: {
    event: any;
    marks: any;
    deletionNodes: any;
    nodes: any;
    newEditorState: any;
    documentId: any;
}): {
    importedAuthor: {
        name: any;
    };
    date: any;
    authorImage: any;
    event: "add";
    type: string;
    documentId: any;
    changeId: any;
    trackedChangeType: any;
    trackedChangeText: string;
    deletedText: string;
    author: any;
    authorEmail: any;
};
declare function findRangeById(doc: any, id: any): {
    from: any;
    to: any;
};
export {};
//# sourceMappingURL=comments-plugin.d.ts.map