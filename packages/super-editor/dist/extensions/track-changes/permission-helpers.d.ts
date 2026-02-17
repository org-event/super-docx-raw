export function collectTrackedChanges({ state, from, to }: {
    state: import("prosemirror-state").EditorState;
    from: number;
    to: number;
}): Array<any>;
export function isTrackedChangeActionAllowed({ editor, action, trackedChanges }: {
    editor: import("../../core/Editor.ts").Editor;
    action: "accept" | "reject";
    trackedChanges: Array<any>;
}): boolean;
export function collectTrackedChangesForContext({ state, pos, trackedChangeId }: {
    state: import("prosemirror-state").EditorState;
    pos: number | null;
    trackedChangeId: string | null;
}): Array<any>;
//# sourceMappingURL=permission-helpers.d.ts.map