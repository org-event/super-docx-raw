export namespace ICONS {
    export { AddRowTopIcon as addRowBefore };
    export { AddRowBottomIcon as addRowAfter };
    export { AddColLeftIcon as addColumnBefore };
    export { AddColRightIcon as addColumnAfter };
    export { RemoveRowIcon as deleteRow };
    export { RemoveColIcon as deleteColumn };
    export { TrashIcon as deleteTable };
    export { BorderNoneIcon as deleteBorders };
    export { TableCellMergeIcon as mergeCells };
    export { TableCellSplitIcon as splitCell };
    export { Wrench as fixTables };
    export { AiSparklesIcon as ai };
    export { LinkIcon as link };
    export { TableIcon as table };
    export { ScissorsIcon as cut };
    export { CopyIcon as copy };
    export { ClipboardIcon as paste };
    export { PlusIcon as addDocumentSection };
    export { TrashIcon as removeDocumentSection };
    export { CheckIcon as trackChangesAccept };
    export { XIcon as trackChangesReject };
}
export namespace TEXTS {
    let addRowBefore: string;
    let addRowAfter: string;
    let addColumnBefore: string;
    let addColumnAfter: string;
    let deleteRow: string;
    let deleteColumn: string;
    let deleteTable: string;
    let removeBorders: string;
    let mergeCells: string;
    let splitCell: string;
    let fixTables: string;
    let insertText: string;
    let replaceText: string;
    let insertLink: string;
    let insertTable: string;
    let editTable: string;
    let cut: string;
    let copy: string;
    let paste: string;
    let removeDocumentSection: string;
    let createDocumentSection: string;
    let trackChangesAccept: string;
    let trackChangesReject: string;
}
export const tableActionsOptions: ({
    label: string;
    command: string;
    icon: any;
    props: {
        'data-item': string;
        ariaLabel: string;
    };
    bottomBorder?: undefined;
} | {
    label: string;
    command: string;
    icon: any;
    bottomBorder: boolean;
    props: {
        'data-item': string;
        ariaLabel: string;
    };
})[];
export namespace TRIGGERS {
    let slash: string;
    let click: string;
}
//# sourceMappingURL=constants.d.ts.map