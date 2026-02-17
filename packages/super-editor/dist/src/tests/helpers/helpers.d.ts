export function getTestDataByFileName(name: string): Promise<any>;
export function getExtractedDocxData(folderName: any): Promise<{}>;
export function getTestDataAsFileBuffer(name: any): Promise<NonSharedBuffer>;
export function loadTestDataForEditorTests(filename: string): Promise<[any, any, any, any]>;
export function getMinimalTranslatedLinkedStyles(): {
    docDefaults: {
        runProperties: {};
        paragraphProperties: {};
    };
    latentStyles: {};
    styles: {
        Normal: {
            styleId: string;
            type: string;
            default: boolean;
            name: string;
            runProperties: {};
            paragraphProperties: {};
        };
    };
};
export function initTestEditor(options?: any): Promise<{
    editor: Editor;
    dispatch: Function;
}>;
export function getNewTransaction(editor: Editor): Transaction;
import { Editor } from '@core/Editor.js';
//# sourceMappingURL=helpers.d.ts.map