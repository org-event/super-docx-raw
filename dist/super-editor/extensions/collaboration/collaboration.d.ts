export const CollaborationPluginKey: PluginKey<any>;
export const Collaboration: Extension<{
    ydoc: any;
    field: string;
    fragment: any;
    isReady: boolean;
}, Record<string, never>>;
export function createSyncPlugin(ydoc: any, editor: any): any[];
export function initializeMetaMap(ydoc: any, editor: any): void;
export function generateCollaborationData(editor: any): Promise<Uint8Array<ArrayBufferLike>>;
import { PluginKey } from 'prosemirror-state';
import { Extension } from '@core/index.js';
//# sourceMappingURL=collaboration.d.ts.map