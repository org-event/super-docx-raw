/**
 * HeaderFooterSessionManager - Manages header/footer editing sessions in PresentationEditor.
 *
 * This class encapsulates all the state and logic for:
 * - Header/footer region tracking and hit testing
 * - Session state machine (body/header/footer modes)
 * - Editor overlay management for H/F editing
 * - Decoration providers for rendering
 * - Hover UI for edit affordances
 *
 * @module presentation-editor/header-footer/HeaderFooterSessionManager
 */
import type { Layout, FlowBlock, SectionMetadata } from '@superdoc/contracts';
import type { PageDecorationProvider } from '@superdoc/painter-dom';
import type { Editor } from '../../Editor.js';
import type { HeaderFooterMode, HeaderFooterSession, HeaderFooterRegion, HeaderFooterLayoutContext, LayoutRect } from '../types.js';
import { HeaderFooterEditorManager, HeaderFooterLayoutAdapter, type HeaderFooterDescriptor } from '../../header-footer/HeaderFooterRegistry.js';
import { EditorOverlayManager } from '../../header-footer/EditorOverlayManager.js';
import { type HeaderFooterIdentifier, type HeaderFooterLayoutResult, type MultiSectionHeaderFooterIdentifier } from '@superdoc/layout-bridge';
/**
 * Options for initializing the HeaderFooterSessionManager.
 */
export type HeaderFooterSessionManagerOptions = {
    /** The painter host element containing page renders */
    painterHost: HTMLElement;
    /** The visible scrolling container */
    visibleHost: HTMLElement;
    /** The selection overlay element (parent for hover UI) */
    selectionOverlay: HTMLElement;
    /** The main body editor instance */
    editor: Editor;
    /** Debug mode flag */
    isDebug?: boolean;
    /** Budget for header/footer initialization (ms) */
    initBudgetMs?: number;
    /** Default page size */
    defaultPageSize: {
        w: number;
        h: number;
    };
    /** Default margins */
    defaultMargins: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
        header?: number;
        footer?: number;
    };
};
/**
 * Layout options that the manager needs access to.
 */
export type HeaderFooterLayoutOptions = {
    pageSize?: {
        w: number;
        h: number;
    };
    margins?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
        header?: number;
        footer?: number;
    };
    zoom?: number;
};
/**
 * Input for header/footer layout computation.
 */
export type HeaderFooterInput = {
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
        overflowBaseHeight?: number;
    };
} | null;
/**
 * Dependencies provided by PresentationEditor for various operations.
 */
export type SessionManagerDependencies = {
    /** Get current layout options */
    getLayoutOptions: () => HeaderFooterLayoutOptions;
    /** Get page element by index */
    getPageElement: (pageIndex: number) => HTMLElement | null;
    /** Scroll page into view */
    scrollPageIntoView: (pageIndex: number) => void;
    /** Wait for page to mount (virtualization) */
    waitForPageMount: (pageIndex: number, options: {
        timeout: number;
    }) => Promise<boolean>;
    /** Convert page-local coordinates to overlay coordinates */
    convertPageLocalToOverlayCoords: (pageIndex: number, x: number, y: number) => {
        x: number;
        y: number;
    } | null;
    /** Check if view is locked (viewing mode) */
    isViewLocked: () => boolean;
    /** Get body page height */
    getBodyPageHeight: () => number;
    /** Notify input bridge of target change */
    notifyInputBridgeTargetChanged: () => void;
    /** Schedule re-render */
    scheduleRerender: () => void;
    /** Set pending doc change flag */
    setPendingDocChange: () => void;
};
/**
 * Callbacks for events that the manager emits.
 */
export type SessionManagerCallbacks = {
    /** Called when header/footer mode changes */
    onModeChanged?: (session: HeaderFooterSession) => void;
    /** Called with editing context when entering/exiting H/F mode */
    onEditingContext?: (data: {
        kind: HeaderFooterMode;
        editor: Editor;
        headerId?: string | null;
        sectionType?: string | null;
    }) => void;
    /** Called when H/F edit is blocked */
    onEditBlocked?: (reason: string) => void;
    /** Called on errors */
    onError?: (error: {
        error: unknown;
        context: string;
    }) => void;
    /** Called for announcements (a11y) */
    onAnnounce?: (message: string) => void;
    /** Called to update awareness session */
    onUpdateAwarenessSession?: (session: HeaderFooterSession) => void;
};
/**
 * Manages header/footer editing sessions for PresentationEditor.
 */
export declare class HeaderFooterSessionManager {
    #private;
    constructor(options: HeaderFooterSessionManagerOptions);
    /** Current session mode */
    get mode(): HeaderFooterMode;
    /** Full session state */
    get session(): HeaderFooterSession;
    /** Whether currently editing a header/footer */
    get isEditing(): boolean;
    /** The active header/footer editor (null if in body mode) */
    get activeEditor(): Editor | null;
    /** Set the editor reference (used when editor is created after session manager) */
    setEditor(editor: Editor): void;
    /** Header decoration provider */
    get headerDecorationProvider(): PageDecorationProvider | undefined;
    /** Set header decoration provider */
    set headerDecorationProvider(provider: PageDecorationProvider | undefined);
    /** Footer decoration provider */
    get footerDecorationProvider(): PageDecorationProvider | undefined;
    /** Set footer decoration provider */
    set footerDecorationProvider(provider: PageDecorationProvider | undefined);
    /** Header/footer adapter for layout */
    get adapter(): HeaderFooterLayoutAdapter | null;
    /** Header/footer manager */
    get manager(): HeaderFooterEditorManager | null;
    /** Editor overlay manager */
    get overlayManager(): EditorOverlayManager | null;
    /** Header layout results */
    get headerLayoutResults(): HeaderFooterLayoutResult[] | null;
    /** Set header layout results */
    set headerLayoutResults(results: HeaderFooterLayoutResult[] | null);
    /** Footer layout results */
    get footerLayoutResults(): HeaderFooterLayoutResult[] | null;
    /** Set footer layout results */
    set footerLayoutResults(results: HeaderFooterLayoutResult[] | null);
    /** Header layouts by rId */
    get headerLayoutsByRId(): Map<string, HeaderFooterLayoutResult>;
    /** Footer layouts by rId */
    get footerLayoutsByRId(): Map<string, HeaderFooterLayoutResult>;
    /** Multi-section identifier */
    get multiSectionIdentifier(): MultiSectionHeaderFooterIdentifier | null;
    /** Set multi-section identifier */
    set multiSectionIdentifier(identifier: MultiSectionHeaderFooterIdentifier | null);
    /** Legacy header/footer identifier */
    get headerFooterIdentifier(): HeaderFooterIdentifier | null;
    /** Set legacy header/footer identifier */
    set headerFooterIdentifier(identifier: HeaderFooterIdentifier | null);
    /** Header regions map (pageIndex -> region) */
    get headerRegions(): Map<number, HeaderFooterRegion>;
    /** Footer regions map (pageIndex -> region) */
    get footerRegions(): Map<number, HeaderFooterRegion>;
    /**
     * Set dependencies from PresentationEditor.
     * Must be called before using the manager.
     */
    setDependencies(deps: SessionManagerDependencies): void;
    /**
     * Set callbacks for event emission.
     */
    setCallbacks(callbacks: SessionManagerCallbacks): void;
    /**
     * Set hover UI elements.
     */
    setHoverElements(elements: {
        hoverOverlay: HTMLElement | null;
        hoverTooltip: HTMLElement | null;
        modeBanner: HTMLElement | null;
    }): void;
    /**
     * Update document mode.
     */
    setDocumentMode(mode: 'editing' | 'viewing' | 'suggesting'): void;
    /**
     * Set layout results from external layout computation.
     */
    setLayoutResults(headerResults: HeaderFooterLayoutResult[] | null, footerResults: HeaderFooterLayoutResult[] | null): void;
    /**
     * Initialize the header/footer registry.
     * Called after the editor is ready.
     */
    initialize(): void;
    /**
     * Rebuild header/footer regions from layout.
     */
    rebuildRegions(layout: Layout): void;
    /**
     * Hit test for header/footer regions.
     */
    hitTestRegion(x: number, y: number, layout: Layout | null): HeaderFooterRegion | null;
    /**
     * Get region for a specific page.
     */
    getRegionForPage(kind: 'header' | 'footer', pageIndex: number): HeaderFooterRegion | null;
    /**
     * Find a region for a page, with fallback to first available region.
     * Used when we need any region of the given kind, even if not for the specific page.
     */
    findRegionForPage(kind: 'header' | 'footer', pageIndex: number): HeaderFooterRegion | null;
    /**
     * Resolve the header/footer descriptor for a given region.
     * Looks up by headerId first, then by sectionType, then falls back to first descriptor.
     */
    resolveDescriptorForRegion(region: HeaderFooterRegion): HeaderFooterDescriptor | null;
    /**
     * Activate a header/footer region for editing.
     */
    activateRegion(region: HeaderFooterRegion): void;
    /**
     * Exit header/footer editing mode.
     */
    exitMode(): void;
    /**
     * Focus header/footer via keyboard shortcut.
     */
    focusShortcut(kind: 'header' | 'footer'): void;
    /**
     * Render hover highlight for a region.
     */
    renderHover(region: HeaderFooterRegion): void;
    /**
     * Clear hover highlight.
     */
    clearHover(): void;
    /** Get current hover region */
    get hoverRegion(): HeaderFooterRegion | null;
    /**
     * Build input for header/footer layout computation.
     */
    buildLayoutInput(): HeaderFooterInput;
    /**
     * Layout per-rId header/footers for multi-section documents.
     */
    layoutPerRId(headerFooterInput: HeaderFooterInput, layout: Layout, sectionMetadata: SectionMetadata[]): Promise<void>;
    /**
     * Compute selection rectangles in header/footer mode.
     */
    computeSelectionRects(from: number, to: number): LayoutRect[];
    /**
     * Get the current header/footer layout context.
     */
    getContext(): HeaderFooterLayoutContext | null;
    /**
     * Get the page height for header/footer mode.
     */
    getPageHeight(): number;
    /**
     * Create a default header/footer when none exists.
     */
    createDefault(region: HeaderFooterRegion): void;
    /**
     * Update the header/footer identifier from converter.
     */
    updateIdentifierFromConverter(): void;
    /**
     * Set the multi-section identifier.
     */
    setMultiSectionIdentifier(identifier: MultiSectionHeaderFooterIdentifier | null): void;
    /**
     * Update decoration providers for header and footer.
     * Creates new providers based on layout results and sets them on this manager.
     */
    updateDecorationProviders(layout: Layout): void;
    /**
     * Create a decoration provider for header or footer rendering.
     */
    createDecorationProvider(kind: 'header' | 'footer', layout: Layout): PageDecorationProvider | undefined;
    /**
     * Clean up all resources.
     */
    destroy(): void;
}
//# sourceMappingURL=HeaderFooterSessionManager.d.ts.map