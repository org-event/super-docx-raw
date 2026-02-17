export function insertContentAt(position: import("prosemirror-model").ResolvedPos | number | {
    from: number;
    to: number;
}, value: string | Array<string | {
    text?: string;
}> | ProseMirrorNode | ProseMirrorFragment, options: {
    asText?: boolean;
    updateSelection?: boolean;
    applyInputRules?: boolean;
    applyPasteRules?: boolean;
    parseOptions?: any;
}): boolean;
export type ProseMirrorNode = import("prosemirror-model").Node;
export type ProseMirrorFragment = import("prosemirror-model").Fragment;
//# sourceMappingURL=insertContentAt.d.ts.map