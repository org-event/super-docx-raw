/**
 * Checks if a given font can be rendered on the browser.
 *
 * This function uses canvas text measurement to detect if a specific font is available
 * on the user's system. It compares the rendered width and height of a test string
 * using the specified font against a fallback font. If the dimensions differ, the
 * custom font is considered available.
 *
 * The function includes a secondary verification step that switches the fallback font
 * to handle edge cases where the browser's default font matches the font being tested
 * (e.g., testing for "Helvetica" when the browser uses Helvetica as the default
 * sans-serif font).
 *
 * @param {string} fontName - The name of the font to check for availability.
 *   This should be a valid CSS font-family name (e.g., 'Arial', 'Times New Roman', 'Roboto').
 * @param {string} [uiDisplayFallbackFont='sans-serif'] - The fallback font family to use
 *   for comparison. Typically 'sans-serif' or 'serif'. Defaults to 'sans-serif'.
 * @returns {boolean} True if the font can be rendered (is available on the system),
 *   false otherwise.
 *
 * @example
 * // Check if Arial is available
 * if (canRenderFont('Arial')) {
 *   console.log('Arial font is available');
 * }
 *
 * @example
 * // Check font availability with a custom fallback
 * if (canRenderFont('Times New Roman', 'serif')) {
 *   console.log('Times New Roman is available');
 * }
 */
export function canRenderFont(fontName: string, uiDisplayFallbackFont?: string): boolean;
//# sourceMappingURL=canRenderFont.d.ts.map