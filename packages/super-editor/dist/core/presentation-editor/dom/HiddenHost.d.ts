/**
 * Creates a hidden host element for the ProseMirror editor.
 *
 * The hidden host contains the actual ProseMirror editor DOM, which provides semantic
 * document structure for accessibility (screen readers, keyboard navigation) while being
 * visually hidden off-screen. The visual presentation is rendered separately in the
 * viewport host using the layout engine.
 *
 * @param doc - The document object to create the element in
 * @param widthPx - The width of the hidden host in pixels (should match document width)
 * @returns A configured hidden host div element
 *
 * @remarks
 * - Uses position: fixed with left: -9999px to move off-screen without affecting scroll
 * - Uses opacity: 0 (NOT visibility: hidden) to keep content focusable
 * - Does NOT set aria-hidden="true" because the editor must remain accessible
 * - Sets pointer-events: none and z-index: -1 to prevent interaction
 * - Sets user-select: none to prevent text selection in the hidden editor
 * - Sets overflow-anchor: none to prevent scroll anchoring issues when content changes
 * - The viewport host is aria-hidden, but this host provides semantic structure
 */
export declare function createHiddenHost(doc: Document, widthPx: number): HTMLElement;
//# sourceMappingURL=HiddenHost.d.ts.map