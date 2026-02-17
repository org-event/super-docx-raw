/**
 * Configuration options for Bold
 * @typedef {Object} BoldOptions
 * @category Options
 * @property {Object} [htmlAttributes] HTML attributes for the strong element
 */
/**
 * Attributes for bold marks
 * @typedef {Object} BoldAttributes
 * @category Attributes
 * @property {string} [value] Bold weight value ('0' renders as normal)
 */
/**
 * @module Bold
 * @sidebarTitle Bold
 * @snippetPath /snippets/extensions/bold.mdx
 * @shortcut Mod-b | toggleBold | Toggle bold formatting
 * @shortcut Mod-B | toggleBold | Toggle bold formatting (uppercase)
 */
export const Bold: Mark<{
    htmlAttributes: {};
}, Record<string, never>, {
    value: unknown;
}>;
/**
 * Configuration options for Bold
 */
export type BoldOptions = any;
/**
 * Attributes for bold marks
 */
export type BoldAttributes = any;
import { Mark } from '@core/index.js';
//# sourceMappingURL=bold.d.ts.map