import { type PageGeometryHelper } from '@superdoc/layout-bridge';
import type { FlowBlock, Layout, Measure } from '@superdoc/contracts';
import type { Editor } from '../../Editor.js';
/**
 * Build an anchor map (bookmark name -> page index) using fragment PM ranges.
 * Mirrors layout-engine's buildAnchorMap to avoid an extra dependency here.
 */
export declare function computeAnchorMap(bookmarks: Map<string, number>, layout: Layout, blocks: FlowBlock[]): Map<string, number>;
export type GoToAnchorDeps = {
    anchor: string;
    layout: Layout | null;
    blocks: FlowBlock[];
    measures: Measure[];
    bookmarks: Map<string, number>;
    pageGeometryHelper?: PageGeometryHelper;
    painterHost: HTMLElement;
    scrollPageIntoView: (pageIndex: number) => void;
    waitForPageMount: (pageIndex: number, timeoutMs: number) => Promise<boolean>;
    getActiveEditor: () => Editor;
    timeoutMs: number;
};
export declare function goToAnchor({ anchor, layout, blocks, measures, bookmarks, pageGeometryHelper, painterHost, scrollPageIntoView, waitForPageMount, getActiveEditor, timeoutMs, }: GoToAnchorDeps): Promise<boolean>;
//# sourceMappingURL=AnchorNavigation.d.ts.map