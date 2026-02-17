export function createState(doc: any): EditorState;
export function setSelection(state: any, pos: any, end?: any): any;
export function createDispatch(): {
    dispatch: (tr: any) => number;
    dispatched: any[];
};
import { EditorState } from 'prosemirror-state';
//# sourceMappingURL=commandTestUtils.d.ts.map