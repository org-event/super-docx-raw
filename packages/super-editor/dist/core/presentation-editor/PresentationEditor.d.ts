import type { EditorState, Transaction } from 'prosemirror-state';
import { Editor } from '../Editor.js';
import { EventEmitter } from '../EventEmitter.js';
import type { PositionHit } from '@superdoc/layout-bridge';
import type { LayoutMode } from '@superdoc/painter-dom';
import type { FlowBlock, Layout, Measure, Page, SectionMetadata } from '@superdoc/contracts';
import type { RemoteCursorState, LayoutEngineOptions, TrackedChangesOverrides, PresentationEditorOptions, LayoutState, LayoutMetrics, LayoutError, RangeRect } from './types.js';
export type { PageSize, PageMargins, VirtualizationOptions, RemoteUserInfo, RemoteCursorState, PresenceOptions, LayoutEngineOptions, TrackedChangesOverrides, PresentationEditorOptions, RemoteCursorsRenderPayload, LayoutUpdatePayload, ImageSelectedEvent, ImageDeselectedEvent, TelemetryEvent, } from './types.js';
/**
 * PresentationEditor bootstraps the classic Editor instance in a hidden container
 * while layout-engine handles the visible rendering pipeline.
 */
export declare class PresentationEditor extends EventEmitter {
    #private;
    /**
     * Fallback color palette for remote cursors when user.color is not provided.
     * Colors are deterministically assigned based on clientId to maintain consistency.
     * @private
     */
    static readonly FALLBACK_COLORS: string[];
    /**
     * Constants for remote cursor rendering styles.
     * Centralized styling values for consistent cursor/label rendering across all methods.
     * @private
     */
    static readonly CURSOR_STYLES: {
        readonly CARET_WIDTH: 2;
        readonly LABEL_FONT_SIZE: 13;
        readonly LABEL_PADDING: "2px 6px";
        readonly LABEL_OFFSET: "-1.05em";
        readonly SELECTION_BORDER_RADIUS: "2px";
        readonly MAX_LABEL_LENGTH: 30;
    };
    /**
     * Get a PresentationEditor instance by document ID.
     */
    static getInstance(documentId: string): PresentationEditor | undefined;
    /**
     * Set zoom globally across all PresentationEditor instances.
     */
    static setGlobalZoom(zoom: number): void;
    constructor(options: PresentationEditorOptions);
    /**
     * Accessor for the underlying Editor so SuperDoc can reuse existing APIs.
     */
    get editor(): Editor;
    /**
     * Expose the visible host element for renderer-agnostic consumers.
     */
    get element(): HTMLElement;
    /**
     * Get the commands interface for the currently active editor (header/footer-aware).
     *
     * This property dynamically routes command execution to the appropriate editor instance:
     * - In body mode, returns the main editor's commands
     * - In header/footer mode, returns the active header/footer editor's commands
     *
     * This ensures that formatting commands (bold, italic, etc.) and other operations
     * execute in the correct editing context.
     *
     * @returns The CommandService instance for the active editor
     *
     * @example
     * ```typescript
     * // This will bold text in the active editor (body or header/footer)
     * presentationEditor.commands.bold();
     * ```
     */
    get commands(): import("../index.js").EditorCommands;
    /**
     * Get the ProseMirror editor state for the currently active editor (header/footer-aware).
     *
     * This property dynamically returns the state from the appropriate editor instance:
     * - In body mode, returns the main editor's state
     * - In header/footer mode, returns the active header/footer editor's state
     *
     * This enables components like SlashMenu and context menus to access document
     * state, selection, and schema information in the correct editing context.
     *
     * @returns The EditorState for the active editor
     *
     * @example
     * ```typescript
     * const { selection, doc } = presentationEditor.state;
     * const selectedText = doc.textBetween(selection.from, selection.to);
     * ```
     */
    get state(): EditorState;
    /**
     * Check if the editor is currently editable (header/footer-aware).
     *
     * This property checks the editable state of the currently active editor:
     * - In body mode, returns whether the main editor is editable
     * - In header/footer mode, returns whether the header/footer editor is editable
     *
     * The editor may be non-editable due to:
     * - Document mode set to 'viewing'
     * - Explicit `editable: false` option
     * - Editor not fully initialized
     *
     * @returns true if the active editor accepts input, false otherwise
     *
     * @example
     * ```typescript
     * if (presentationEditor.isEditable) {
     *   presentationEditor.commands.insertText('Hello');
     * }
     * ```
     */
    get isEditable(): boolean;
    /**
     * Get the editor options for the currently active editor (header/footer-aware).
     *
     * This property returns the options object from the appropriate editor instance,
     * providing access to configuration like document mode, AI settings, and custom
     * slash menu configuration.
     *
     * @returns The options object for the active editor
     *
     * @example
     * ```typescript
     * const { documentMode, isAiEnabled } = presentationEditor.options;
     * ```
     */
    get options(): import("../index.js").EditorOptions;
    /**
     * Dispatch a ProseMirror transaction to the currently active editor (header/footer-aware).
     *
     * This method routes transactions to the appropriate editor instance:
     * - In body mode, dispatches to the main editor
     * - In header/footer mode, dispatches to the active header/footer editor
     *
     * Use this for direct state manipulation when commands are insufficient.
     * For most use cases, prefer using `commands` or `dispatchInActiveEditor`.
     *
     * @param tr - The ProseMirror transaction to dispatch
     *
     * @example
     * ```typescript
     * const { state } = presentationEditor;
     * const tr = state.tr.insertText('Hello', state.selection.from);
     * presentationEditor.dispatch(tr);
     * ```
     */
    dispatch(tr: Transaction): void;
    /**
     * Focus the editor, routing focus to the appropriate editing surface.
     *
     * In PresentationEditor, the actual ProseMirror EditorView is hidden and input
     * is bridged from the visible layout surface. This method focuses the hidden
     * editor view to enable keyboard input while the visual focus remains on the
     * rendered presentation.
     *
     * @example
     * ```typescript
     * // After closing a modal, restore focus to the editor
     * presentationEditor.focus();
     * ```
     */
    focus(): void;
    /**
     * Returns the currently active editor (body or header/footer session).
     *
     * When editing headers or footers, this returns the header/footer editor instance.
     * Otherwise, returns the main document body editor.
     *
     * @returns The active Editor instance
     *
     * @example
     * ```typescript
     * const editor = presentation.getActiveEditor();
     * const selection = editor.state.selection;
     * ```
     */
    getActiveEditor(): Editor;
    /**
     * Undo the last action in the active editor.
     */
    undo(): boolean;
    /**
     * Redo the last undone action in the active editor.
     */
    redo(): boolean;
    /**
     * Runs a callback against the active editor (body or header/footer session).
     *
     * Use this method when you need to run commands or access state in the currently
     * active editing context (which may be the body or a header/footer region).
     *
     * @param callback - Function that receives the active editor instance
     *
     * @example
     * ```typescript
     * presentation.dispatchInActiveEditor((editor) => {
     *   editor.commands.insertText('Hello world');
     * });
     * ```
     */
    dispatchInActiveEditor(callback: (editor: Editor) => void): void;
    /**
     * Alias for the visible host container so callers can attach listeners explicitly.
     *
     * This is the main scrollable container that hosts the rendered pages.
     * Use this element to attach scroll listeners, measure viewport bounds, or
     * position floating UI elements relative to the editor.
     *
     * @returns The visible host HTMLElement
     *
     * @example
     * ```typescript
     * const host = presentation.visibleHost;
     * host.addEventListener('scroll', () => console.log('Scrolled!'));
     * ```
     */
    get visibleHost(): HTMLElement;
    /**
     * Selection overlay element used for caret + highlight rendering.
     *
     * This overlay is positioned absolutely over the rendered pages and contains
     * the visual selection indicators (caret, selection highlights, remote cursors).
     *
     * @returns The selection overlay element, or null if not yet initialized
     *
     * @example
     * ```typescript
     * const overlay = presentation.overlayElement;
     * if (overlay) {
     *   console.log('Overlay dimensions:', overlay.getBoundingClientRect());
     * }
     * ```
     */
    get overlayElement(): HTMLElement | null;
    /**
     * Get the current zoom level.
     *
     * The zoom level is a multiplier that controls the visual scale of the document.
     * Zoom is applied via CSS transform: scale() on the content elements (#painterHost
     * and #selectionOverlay), with the viewport dimensions (#viewportHost) set to the
     * scaled size to ensure proper scroll behavior.
     *
     * Relationship to Centralized Zoom Architecture:
     * - PresentationEditor is the SINGLE SOURCE OF TRUTH for zoom state
     * - Zoom is applied internally via transform: scale() on #painterHost and #selectionOverlay
     * - The #viewportHost dimensions are set to scaled values for proper scroll container behavior
     * - External components (toolbar, UI controls) should use setZoom() to modify zoom
     * - The zoom value is used throughout the system for coordinate transformations
     *
     * Coordinate Space Implications:
     * - Layout coordinates: Unscaled logical pixels used by the layout engine
     * - Screen coordinates: Physical pixels affected by CSS transform: scale()
     * - Conversion: screenCoord = layoutCoord * zoom
     *
     * Zoom Scale:
     * - 1 = 100% (default, no scaling)
     * - 0.5 = 50% (zoomed out, content appears smaller)
     * - 2 = 200% (zoomed in, content appears larger)
     *
     * @returns The current zoom level multiplier (default: 1 if not configured)
     *
     * @example
     * ```typescript
     * const zoom = presentation.zoom;
     * // Convert layout coordinates to screen coordinates
     * const screenX = layoutX * zoom;
     * const screenY = layoutY * zoom;
     *
     * // Convert screen coordinates back to layout coordinates
     * const layoutX = screenX / zoom;
     * const layoutY = screenY / zoom;
     * ```
     */
    get zoom(): number;
    /**
     * Set the document mode and update editor editability.
     *
     * This method updates both the PresentationEditor's internal mode state and the
     * underlying Editor's document mode. The hidden editor's editable state will
     * reflect the mode for plugin compatibility (editable in 'editing' and 'suggesting'
     * modes, non-editable in 'viewing' mode), while the presentation layer remains
     * visually inert (handled by hidden container CSS).
     *
     * @param mode - The document mode to set. Valid values:
     *   - 'editing': Full editing capabilities, no tracked changes
     *   - 'suggesting': Editing with tracked changes enabled
     *   - 'viewing': Read-only mode, shows original content without changes
     * @throws {TypeError} If mode is not a string or is not one of the valid modes
     *
     * @example
     * ```typescript
     * const presentation = PresentationEditor.getInstance('doc-123');
     * presentation.setDocumentMode('viewing'); // Switch to read-only
     * ```
     */
    setDocumentMode(mode: 'editing' | 'viewing' | 'suggesting'): void;
    /**
     * Override tracked-changes rendering preferences—for hosts without plugin state
     * or when forcing a specific viewing mode (e.g., PDF preview).
     *
     * @param overrides - Tracked changes overrides object with optional 'mode' and 'enabled' fields
     * @throws {TypeError} If overrides is provided but is not a plain object
     */
    setTrackedChangesOverrides(overrides?: TrackedChangesOverrides): void;
    /**
     * Update viewing-mode comment rendering behavior and re-render if needed.
     *
     * @param options - Viewing mode comment options.
     */
    setViewingCommentOptions(options?: {
        emitCommentPositionsInViewing?: boolean;
        enableCommentsInViewing?: boolean;
    }): void;
    /**
     * Toggle the custom context menu at runtime to respect host-level guardrails.
     */
    setContextMenuDisabled(disabled: boolean): void;
    /**
     * Subscribe to layout update events. Returns an unsubscribe function.
     */
    onLayoutUpdated(handler: (payload: LayoutState & {
        layout: Layout;
        metrics?: LayoutMetrics;
    }) => void): () => void;
    /**
     * Subscribe to layout error events. Returns an unsubscribe function.
     */
    onLayoutError(handler: (error: LayoutError) => void): () => void;
    /**
     * Surface pages for pagination UI consumers.
     */
    getPages(): Page[];
    /**
     * Surface the most recent layout error (if any).
     */
    getLayoutError(): LayoutError | null;
    /**
     * Returns the current health status of the layout engine.
     *
     * @returns Layout health status:
     *   - 'healthy': No errors, layout is functioning normally
     *   - 'degraded': Recovered from errors but may have stale state
     *   - 'failed': Critical error, layout cannot render
     *
     * @example
     * ```typescript
     * const editor = PresentationEditor.getInstance('doc-123');
     * if (!editor.isLayoutHealthy()) {
     *   console.error('Layout is unhealthy:', editor.getLayoutError());
     * }
     * ```
     */
    isLayoutHealthy(): boolean;
    /**
     * Returns the detailed layout health state.
     *
     * @returns One of: 'healthy', 'degraded', 'failed'
     */
    getLayoutHealthState(): 'healthy' | 'degraded' | 'failed';
    /**
     * Return layout-relative rects for the current document selection.
     */
    getSelectionRects(relativeTo?: HTMLElement): RangeRect[];
    /**
     * Convert an arbitrary document range into layout-based bounding rects.
     *
     * @param from - Start position in the ProseMirror document
     * @param to - End position in the ProseMirror document
     * @param relativeTo - Optional HTMLElement for coordinate reference. If provided, returns coordinates
     *                     relative to this element's bounding rect. If omitted, returns absolute viewport
     *                     coordinates relative to the selection overlay.
     * @returns Array of rects, each containing pageIndex and position data (left, top, right, bottom, width, height)
     */
    getRangeRects(from: number, to: number, relativeTo?: HTMLElement): RangeRect[];
    /**
     * Get selection bounds for a document range with aggregated bounding box.
     * Returns null if layout is unavailable or the range is invalid.
     *
     * @param from - Start position in the ProseMirror document
     * @param to - End position in the ProseMirror document
     * @param relativeTo - Optional HTMLElement to use as coordinate reference. If provided, returns coordinates
     *                     relative to this element's bounding rect (client coordinates). If omitted, returns
     *                     absolute viewport coordinates (relative to the selection overlay).
     * @returns Object containing aggregated bounds, individual rects, and pageIndex, or null if unavailable
     */
    getSelectionBounds(from: number, to: number, relativeTo?: HTMLElement): {
        bounds: {
            top: number;
            left: number;
            bottom: number;
            right: number;
            width: number;
            height: number;
        };
        rects: RangeRect[];
        pageIndex: number;
    } | null;
    /**
     * Remap comment positions to layout coordinates with bounds and rects.
     * Takes a positions object with threadIds as keys and position data as values.
     * Returns the same structure with added bounds, rects, and pageIndex for each comment.
     *
     * PERFORMANCE NOTE: This iterates all comment positions on every call. For documents with many comments
     * (>100), consider caching layout bounds per comment and invalidating on layout updates.
     *
     * @param positions - Map of threadId -> { start?, end?, pos?, ...otherFields }
     * @param relativeTo - Optional HTMLElement for coordinate reference
     * @returns Updated positions map with bounds, rects, and pageIndex added to each comment
     */
    getCommentBounds(positions: Record<string, {
        start?: number;
        end?: number;
        pos?: number;
        [key: string]: unknown;
    }>, relativeTo?: HTMLElement): Record<string, {
        start?: number;
        end?: number;
        pos?: number;
        bounds?: unknown;
        rects?: unknown;
        pageIndex?: number;
        [key: string]: unknown;
    }>;
    /**
     * Return a snapshot of the latest layout state.
     */
    getLayoutSnapshot(): {
        layout: Layout | null;
        blocks: FlowBlock[];
        measures: Measure[];
        sectionMetadata: SectionMetadata[];
    };
    /**
     * Expose the current layout engine options.
     */
    getLayoutOptions(): LayoutEngineOptions;
    /**
     * Get the page styles for the section containing the current caret position.
     *
     * In multi-section documents, different sections can have different page sizes,
     * margins, and orientations. This method returns the styles for the section
     * where the caret is currently located, enabling section-aware UI components
     * like rulers to display accurate information.
     *
     * @returns Object containing:
     *   - pageSize: { width, height } in inches
     *   - pageMargins: { left, right, top, bottom } in inches
     *   - sectionIndex: The current section index (0-based)
     *   - orientation: 'portrait' or 'landscape'
     *
     * Falls back to document-level defaults if section info is unavailable.
     *
     * @example
     * ```typescript
     * const sectionStyles = presentation.getCurrentSectionPageStyles();
     * console.log(`Section ${sectionStyles.sectionIndex}: ${sectionStyles.pageSize.width}" x ${sectionStyles.pageSize.height}"`);
     * ```
     */
    getCurrentSectionPageStyles(): {
        pageSize: {
            width: number;
            height: number;
        };
        pageMargins: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        sectionIndex: number;
        orientation: 'portrait' | 'landscape';
    };
    /**
     * Get current remote cursor states (normalized to absolute PM positions).
     * Returns an array of cursor states for all remote collaborators, excluding the local user.
     *
     * Exposes normalized awareness states for host consumption.
     * Hosts can use this to build custom presence UI (e.g., presence pills, sidebar lists).
     *
     * @returns Array of remote cursor states with PM positions and user metadata
     *
     * @example
     * ```typescript
     * const presentation = PresentationEditor.getInstance('doc-123');
     * const cursors = presentation.getRemoteCursors();
     * cursors.forEach(cursor => {
     *   console.log(`${cursor.user.name} at position ${cursor.head}`);
     * });
     * ```
     */
    getRemoteCursors(): RemoteCursorState[];
    /**
     * Adjust layout mode (vertical/book/horizontal) and rerender.
     *
     * Changes how pages are arranged visually:
     * - 'vertical': Pages stacked vertically (default)
     * - 'book': Two-page spread side-by-side
     * - 'horizontal': Pages arranged horizontally
     *
     * Note: Virtualization is automatically disabled for non-vertical modes.
     *
     * @param mode - The layout mode to set
     *
     * @example
     * ```typescript
     * presentation.setLayoutMode('book'); // Two-page spread
     * presentation.setLayoutMode('vertical'); // Back to single column
     * ```
     */
    setLayoutMode(mode: LayoutMode): void;
    /**
     * Convert a viewport coordinate into a document hit using the current layout.
     */
    hitTest(clientX: number, clientY: number): PositionHit | null;
    /**
     * Normalize viewport coordinates (clientX/clientY) into layout space while respecting zoom + scroll.
     */
    normalizeClientPoint(clientX: number, clientY: number): {
        x: number;
        y: number;
    } | null;
    /**
     * Get viewport coordinates for a document position (header/footer-aware).
     *
     * This method provides coordinate mapping that respects the current editing mode:
     * - In body mode, uses the main document layout
     * - In header/footer mode, maps positions within the header/footer layout and transforms
     *   coordinates to viewport space
     *
     * @param pos - Document position in the active editor
     * @returns Coordinate rectangle with top, bottom, left, right, width, height in viewport pixels,
     *          or null if the position cannot be mapped
     *
     * @example
     * ```typescript
     * const coords = presentationEditor.coordsAtPos(42);
     * if (coords) {
     *   console.log(`Position 42 is at viewport coordinates (${coords.left}, ${coords.top})`);
     * }
     * ```
     */
    coordsAtPos(pos: number): {
        top: number;
        bottom: number;
        left: number;
        right: number;
        width: number;
        height: number;
    } | null;
    /**
     * Get the painted DOM element that contains a document position (body only).
     *
     * Uses the DomPositionIndex which maps data-pm-start/end attributes to rendered
     * elements. Returns null when the position is not currently mounted (virtualization)
     * or when in header/footer mode.
     *
     * @param pos - Document position in the active editor
     * @param options.forceRebuild - Rebuild the index before lookup
     * @param options.fallbackToCoords - Use elementFromPoint with layout rects if index lookup fails
     * @returns The nearest painted DOM element for the position, or null if unavailable
     */
    getElementAtPos(pos: number, options?: {
        forceRebuild?: boolean;
        fallbackToCoords?: boolean;
    }): HTMLElement | null;
    /**
     * Scroll the visible host so a given document position is brought into view.
     *
     * This is primarily used by commands like search navigation when running in
     * PresentationEditor mode, where ProseMirror's `scrollIntoView()` operates on the
     * hidden editor and does not affect the rendered viewport.
     *
     * @param pos - Document position in the active editor to scroll to
     * @param options - Scrolling options
     * @param options.block - Alignment within the viewport ('start' | 'center' | 'end' | 'nearest')
     * @param options.behavior - Scroll behavior ('auto' | 'smooth')
     * @returns True if the position could be mapped and scrolling was applied
     */
    scrollToPosition(pos: number, options?: {
        block?: 'start' | 'center' | 'end' | 'nearest';
        behavior?: ScrollBehavior;
    }): boolean;
    /**
     * Get document position from viewport coordinates (header/footer-aware).
     *
     * This method maps viewport coordinates to document positions while respecting
     * the current editing mode:
     * - In body mode, performs hit testing on the main document layout
     * - In header/footer mode, hit tests within the active header/footer region
     * - Returns null if coordinates are outside the editable area
     *
     * @param coords - Viewport coordinates (clientX/clientY)
     * @returns Position result with pos and inside properties, or null if no match
     *
     * @example
     * ```typescript
     * const result = presentationEditor.posAtCoords({ clientX: 100, clientY: 200 });
     * if (result) {
     *   console.log(`Clicked at document position ${result.pos}`);
     * }
     * ```
     */
    posAtCoords(coords: {
        clientX?: number;
        clientY?: number;
        left?: number;
        top?: number;
    }): {
        pos: number;
        inside: number;
    } | null;
    /**
     * Update zoom level and re-render.
     *
     * @param zoom - Zoom level multiplier (1.0 = 100%). Must be a positive finite number.
     * @throws {TypeError} If zoom is not a number
     * @throws {RangeError} If zoom is not finite, is <= 0, or is NaN
     *
     * @example
     * ```typescript
     * editor.setZoom(1.5); // 150% zoom
     * editor.setZoom(0.75); // 75% zoom
     * ```
     */
    setZoom(zoom: number): void;
    /**
     * Clean up editor + DOM nodes.
     * Safe to call during partial initialization.
     */
    destroy(): void;
    /**
     * Timeout duration for anchor navigation when waiting for page mount (in milliseconds).
     * This allows sufficient time for virtualized pages to render before giving up.
     */
    private static readonly ANCHOR_NAV_TIMEOUT_MS;
    /**
     * Navigate to a bookmark/anchor in the current document (e.g., TOC links).
     *
     * This method performs asynchronous navigation to support virtualized page rendering:
     * 1. Normalizes the anchor by removing leading '#' if present
     * 2. Looks up the bookmark in the document's bookmark registry
     * 3. Determines which page contains the target position
     * 4. Scrolls the page into view (may be virtualized)
     * 5. Waits up to 2000ms for the page to mount in the DOM
     * 6. Moves the editor caret to the bookmark position
     *
     * @param anchor - Bookmark name or fragment identifier (with or without leading '#')
     * @returns Promise resolving to true if navigation succeeded, false otherwise
     *
     * @remarks
     * Navigation fails and returns false if:
     * - The anchor parameter is empty or becomes empty after normalization
     * - No layout has been computed yet
     * - The bookmark does not exist in the document
     * - The bookmark's page cannot be determined
     * - The page fails to mount within the timeout period (2000ms)
     *
     * Note: This method does not throw errors. All failures are logged and result in
     * a false return value. An 'error' event is emitted for unhandled exceptions.
     *
     * @throws Never throws directly - errors are caught, logged, and emitted as events
     */
    goToAnchor(anchor: string): Promise<boolean>;
}
//# sourceMappingURL=PresentationEditor.d.ts.map