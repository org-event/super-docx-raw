/**
 * Converts a theme color name to its corresponding hex color value.
 * Uses the default Office theme color palette.
 * @param {string} name - The theme color name
 * @returns {string} Hex color value
 */
export function getThemeColor(name: string): string;
/**
 * Applies a color modifier to a hex color.
 * Used to transform Office theme colors according to DrawingML specifications.
 * @param {string} hexColor - The hex color to modify
 * @param {'shade'|'tint'|'lumMod'|'lumOff'} modifier - The type of color modification to apply
 * @param {string|number} value - The modifier value in Office format
 * @returns {string} The modified hex color
 */
export function applyColorModifier(hexColor: string, modifier: "shade" | "tint" | "lumMod" | "lumOff", value: string | number): string;
/**
 * Extracts the stroke width from a shape's properties (spPr).
 * @param {Object} spPr - The shape properties element
 * @returns {number} The stroke width in pixels, or 1 if not found
 */
export function extractStrokeWidth(spPr: any): number;
/**
 * Extracts line end marker configuration (arrowheads) from a shape's properties.
 * @param {Object} spPr - The shape properties element
 * @returns {{ head?: { type?: string, width?: string, length?: string }, tail?: { type?: string, width?: string, length?: string } }|null}
 *   Line end configuration, or null when not present.
 */
export function extractLineEnds(spPr: any): {
    head?: {
        type?: string;
        width?: string;
        length?: string;
    };
    tail?: {
        type?: string;
        width?: string;
        length?: string;
    };
} | null;
/**
 * Extracts the stroke color from a shape's properties.
 * Checks direct stroke definition in spPr first, then falls back to style reference.
 * @param {Object} spPr - The shape properties element
 * @param {Object} style - The shape style element (wps:style)
 * @returns {string|null} Hex color value
 */
export function extractStrokeColor(spPr: any, style: any): string | null;
/**
 * Extracts the fill color from a shape's properties.
 * Checks direct fill definition in spPr first, then falls back to style reference.
 * @param {Object} spPr - The shape properties element
 * @param {Object} style - The shape style element (wps:style)
 * @returns {string|null} Hex color value
 */
export function extractFillColor(spPr: any, style: any): string | null;
//# sourceMappingURL=vector-shape-helpers.d.ts.map