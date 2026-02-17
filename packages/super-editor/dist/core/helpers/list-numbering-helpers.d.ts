export function generateNewListDefinition({ numId, listType, level, start, text, fmt, editor, markerFontFamily }: {
    numId: number;
    listType: any;
    level?: number;
    start?: number;
    text?: string;
    fmt?: string;
    markerFontFamily?: string;
    editor: import("../Editor").Editor;
}): any;
export function hasListDefinition(editor: any, numId: any, ilvl: any): boolean;
export function changeNumIdSameAbstract(numId: number, level: number, listType: import("prosemirror-model").NodeType, editor: import("../Editor").Editor): number;
export function getBasicNumIdTag(numId: number, abstractId: number): any;
export function getNewListId(editor: import("../Editor").Editor, grouping?: string): number;
export function getListDefinitionDetails({ numId, level, listType, editor, tries }: {
    numId: number;
    level: number;
    listType?: import("prosemirror-model").NodeType;
    editor: any;
    tries?: number;
}): any;
export function getAllListDefinitions(editor: import("../Editor").Editor): Record<string, Record<string, {
    start: string | null;
    numFmt: string | null;
    lvlText: string | null;
    suffix: string | null;
    listNumberingType: string | null;
    customFormat: string | null;
    abstract: any | null;
    abstractId: string | undefined;
}>>;
export function removeListDefinitions(listId: string, editor: import("../Editor").Editor): void;
export function createListItemNodeJSON({ level, numId, contentNode }: {
    level: number;
    numId: number;
    contentNode: any;
}): any;
export function createSchemaOrderedListNode({ level, numId, editor, contentNode }: {
    level: number;
    numId: number;
    editor: import("../Editor").Editor;
    contentNode: any;
}): any;
export function createNewList({ listType, tr, editor }: {
    listType: string | any;
    editor: import("../Editor").Editor;
    tr: import("prosemirror-state").Transaction;
}): boolean;
export function replaceListWithNode({ tr, from, to, newNode }: {
    tr: any;
    from: number;
    to: number;
    newNode: Node;
}): void;
export namespace ListHelpers {
    export { replaceListWithNode };
    export { getListDefinitionDetails };
    export { getAllListDefinitions };
    export { generateNewListDefinition };
    export { getBasicNumIdTag };
    export { getNewListId };
    export { hasListDefinition };
    export { removeListDefinitions };
    export { createNewList };
    export { createSchemaOrderedListNode };
    export { createListItemNodeJSON };
    export { changeNumIdSameAbstract };
    export { baseOrderedListDef };
    export { baseBulletList };
}
import { baseOrderedListDef } from './baseListDefinitions';
import { baseBulletList } from './baseListDefinitions';
//# sourceMappingURL=list-numbering-helpers.d.ts.map