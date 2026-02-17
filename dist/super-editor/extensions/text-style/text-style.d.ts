/**
 * Configuration options for TextStyle
 * @typedef {Object} TextStyleOptions
 * @category Options
 * @property {Object} [htmlAttributes={}] - Custom HTML attributes to apply to text style spans
 */
/**
 * Attributes for text style marks
 * @typedef {Object} TextStyleAttributes
 * @category Attributes
 * @property {string} [styleId] - Style identifier for referencing predefined styles
 */
/**
 * @module TextStyle
 * @sidebarTitle Text Style
 * @snippetPath /snippets/extensions/text-style.mdx
 */
export const TextStyle: Mark<{
    htmlAttributes: {};
}, Record<string, never>, {
    styleId: unknown;
    vertAlign: unknown;
    position: unknown;
}>;
/**
 * Configuration options for TextStyle
 */
export type TextStyleOptions = any;
/**
 * Attributes for text style marks
 */
export type TextStyleAttributes = any;
import { Mark } from '@core/index.js';
//# sourceMappingURL=text-style.d.ts.map