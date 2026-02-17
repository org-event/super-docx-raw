export const PaginationPluginKey: PluginKey<any>;
export function initPaginationData(editor: SuperEditor): any;
export function createHeaderFooterEditor({ editor, data, editorContainer, editorHost, sectionId, type, availableWidth, availableHeight, currentPageNumber, totalPageCount, }: {
    editor: Editor;
    data: any;
    editorContainer: HTMLElement;
    editorHost?: HTMLElement;
    sectionId?: string;
    type?: ("header" | "footer");
    availableWidth?: number;
    availableHeight?: number;
    currentPageNumber?: number;
    totalPageCount?: number;
}): Editor;
export function broadcastEditorEvents(editor: any, sectionEditor: any): void;
export function toggleHeaderFooterEditMode({ editor, focusedSectionEditor, isEditMode, documentMode }: {
    editor: any;
    focusedSectionEditor: any;
    isEditMode: any;
    documentMode: any;
}): void;
export function onHeaderFooterDataUpdate({ editor, transaction }: {
    editor: any;
    transaction: any;
}, mainEditor: any, sectionId: any, type: any): Promise<void>;
import { PluginKey } from 'prosemirror-state';
import { Editor as SuperEditor } from '@core/Editor.js';
//# sourceMappingURL=pagination-helpers.d.ts.map