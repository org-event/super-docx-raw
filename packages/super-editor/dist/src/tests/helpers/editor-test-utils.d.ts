export function createTestEditor(options?: {
    extensions: any[];
    content: any;
    editorOptions: any;
}): Editor;
export function createMinimalTestEditor(extensions?: any[], options?: any): Editor;
export function createDocxTestEditor(options?: any): Editor;
export function getNodeFromEditor(editor: Editor, nodeType: string, pos?: number): Node | null;
export function insertText(editor: Editor, text: string, pos?: number): void;
export function createTransaction(editor: Editor): Transaction;
export function applyTransaction(editor: Editor, tr: Transaction): void;
export function getEditorJSON(editor: Editor): any;
export function setEditorContent(editor: Editor, content: any): void;
import { Editor } from '@core/Editor.js';
//# sourceMappingURL=editor-test-utils.d.ts.map