/**
 * Calculates the horizontal offset of a page element within the viewport.
 *
 * Pages are horizontally centered within the painter host container. When the viewport
 * is wider than the page, this offset must be included in overlay coordinate calculations
 * to prevent selections from appearing shifted left of the actual content.
 *
 * @param options - Configuration object containing DOM elements and page information
 * @returns The horizontal offset in layout-space units, or null if calculation fails
 *
 * @remarks
 * Coordinate spaces:
 * - getBoundingClientRect returns values in screen space (includes zoom transform)
 * - Return value is in layout space (divided by zoom to normalize)
 * - Layout space matches the coordinate system used for overlay positioning
 *
 * The function accounts for:
 * - Horizontal centering of pages within the painter container
 * - Zoom transformation applied to the viewport
 * - Variable page widths (narrower than viewport)
 *
 * Returns null if:
 * - painterHost or viewportHost is null
 * - Page element with matching data-page-index is not found
 *
 * This offset is critical for accurate overlay positioning when the viewport is wider
 * than the page content, which commonly occurs on large displays or at low zoom levels.
 *
 * @example
 * ```typescript
 * const offsetX = getPageOffsetX({
 *   painterHost,
 *   viewportHost,
 *   zoom: 1.5,
 *   pageIndex: 2
 * });
 *
 * if (offsetX !== null) {
 *   // Use offsetX when converting page-local coordinates to overlay coordinates
 *   const overlayX = pageLocalX + offsetX;
 * }
 * ```
 */
export declare function getPageOffsetX(options: {
    painterHost: HTMLElement | null;
    viewportHost: HTMLElement | null;
    zoom: number;
    pageIndex: number;
}): number | null;
/**
 * Converts page-local coordinates to overlay-absolute coordinates.
 *
 * This function transforms coordinates from page-relative layout space to the absolute
 * positioning system used by the selection overlay. It handles multi-page layouts,
 * horizontal centering, and validates all input parameters for safety.
 *
 * @param options - Configuration object containing coordinate system parameters
 * @returns Overlay coordinates as {x, y}, or null if validation fails
 *
 * @remarks
 * Coordinate transformation process:
 * 1. Validate input parameters (pageIndex, pageLocalX, pageLocalY must be finite)
 * 2. Calculate horizontal offset for page centering (via getPageOffsetX)
 * 3. Add page stacking offset for multi-page layout (pageIndex * (pageHeight + pageGap))
 * 4. Return final overlay coordinates in layout space
 *
 * Coordinate spaces explained:
 * - Page-local space: Coordinates relative to the top-left corner of a single page
 * - Overlay space: Absolute coordinates within the selection overlay container
 * - Both spaces use layout units (not screen pixels)
 * - Zoom transform is applied to the viewport container (not to coordinate values)
 *
 * Input validation:
 * - pageIndex must be finite and non-negative (warns and returns null otherwise)
 * - pageLocalX must be finite (warns and returns null otherwise)
 * - pageLocalY must be finite (warns and returns null otherwise)
 * - Warnings include diagnostic information for debugging
 *
 * Multi-page layout:
 * - Pages are stacked vertically with gaps between them
 * - Y coordinate includes offset for all pages above the target page
 * - Page stacking formula: pageIndex * (pageHeight + pageGap)
 *
 * Horizontal centering:
 * - Pages are centered within the painter host container
 * - getPageOffsetX calculates the centering offset dynamically
 * - Falls back to 0 offset if calculation fails
 *
 * The zoom transform is applied via CSS transform: scale() on the viewport container,
 * so coordinate calculations remain in layout space rather than screen space.
 *
 * @example
 * ```typescript
 * // Convert a caret position to overlay coordinates
 * const overlayCoords = convertPageLocalToOverlayCoords({
 *   painterHost,
 *   viewportHost,
 *   zoom: 1.0,
 *   pageIndex: 0,
 *   pageLocalX: 100,
 *   pageLocalY: 200,
 *   pageHeight: 792,
 *   pageGap: 20
 * });
 *
 * if (overlayCoords) {
 *   caretElement.style.left = `${overlayCoords.x}px`;
 *   caretElement.style.top = `${overlayCoords.y}px`;
 * }
 * ```
 */
export declare function convertPageLocalToOverlayCoords(options: {
    painterHost: HTMLElement | null;
    viewportHost: HTMLElement | null;
    zoom: number;
    pageIndex: number;
    pageLocalX: number;
    pageLocalY: number;
    pageHeight: number;
    pageGap: number;
}): {
    x: number;
    y: number;
} | null;
//# sourceMappingURL=CoordinateTransform.d.ts.map