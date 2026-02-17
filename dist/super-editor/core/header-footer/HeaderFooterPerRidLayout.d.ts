import type { FlowBlock, Layout, SectionMetadata } from '@superdoc/contracts';
import type { HeaderFooterLayoutResult } from '@superdoc/layout-bridge';
export type HeaderFooterPerRidLayoutInput = {
    headerBlocks?: unknown;
    footerBlocks?: unknown;
    headerBlocksByRId: Map<string, FlowBlock[]> | undefined;
    footerBlocksByRId: Map<string, FlowBlock[]> | undefined;
    constraints: {
        width: number;
        height: number;
        pageWidth: number;
        margins: {
            left: number;
            right: number;
        };
    };
};
export declare function layoutPerRIdHeaderFooters(headerFooterInput: HeaderFooterPerRidLayoutInput | null, layout: Layout, sectionMetadata: SectionMetadata[], deps: {
    headerLayoutsByRId: Map<string, HeaderFooterLayoutResult>;
    footerLayoutsByRId: Map<string, HeaderFooterLayoutResult>;
}): Promise<void>;
//# sourceMappingURL=HeaderFooterPerRidLayout.d.ts.map