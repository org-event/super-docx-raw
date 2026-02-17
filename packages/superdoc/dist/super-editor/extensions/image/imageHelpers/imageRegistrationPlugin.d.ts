export function needsImageRegistration(node: import("prosemirror-model").Node): boolean;
export function ImageRegistrationPlugin({ editor }: {
    editor: any;
}): Plugin<{
    set: DecorationSet;
}>;
export function handleNodePath(foundImages: any[], editor: any, state: import("prosemirror-state").EditorState): import("prosemirror-state").Transaction;
export function findPlaceholder(state: any, id: any): any;
export function removeImagePlaceholder(state: any, tr: any, id: any): any;
export function addImagePlaceholder(state: any, tr: any, id: any, pos: any): any;
export function getImageRegistrationMetaType(tr: any): any;
import { DecorationSet } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';
//# sourceMappingURL=imageRegistrationPlugin.d.ts.map