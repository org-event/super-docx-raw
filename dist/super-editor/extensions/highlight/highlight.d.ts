/**
 * Configuration options for Highlight
 * @typedef {Object} HighlightOptions
 * @category Options
 * @property {Object} [htmlAttributes={}] - HTML attributes for highlight elements
 */
/**
 * Attributes for highlight marks
 * @typedef {Object} HighlightAttributes
 * @category Attributes
 * @property {string} [color] - Background color (CSS color value)
 */
/**
 * @module Highlight
 * @sidebarTitle Highlight
 * @snippetPath /snippets/extensions/highlight.mdx
 * @shortcut Mod-Shift-h | toggleHighlight | Toggle highlighted formatting
 */
export const Highlight: Mark<{
    htmlAttributes: {};
}, Record<string, never>, {
    color: unknown;
}>;
/**
 * Configuration options for Highlight
 */
export type HighlightOptions = any;
/**
 * Attributes for highlight marks
 */
export type HighlightAttributes = any;
import { Mark } from '@core/index.js';
//# sourceMappingURL=highlight.d.ts.map