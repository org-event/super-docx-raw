/**
 * Underline style configuration
 * @typedef {Object} UnderlineConfig
 * @property {'single'|'double'|'thick'|'dotted'|'dashed'|'wavy'} value - Style variant
 */
/**
 * Configuration options for Underline
 * @typedef {Object} UnderlineOptions
 * @category Options
 * @property {Object} [htmlAttributes={}] - HTML attributes for underline elements
 */
/**
 * Attributes for underline marks
 * @typedef {Object} UnderlineAttributes
 * @category Attributes
 * @property {UnderlineConfig} [underlineType='single'] - Style of underline
 */
/**
 * @module Underline
 * @sidebarTitle Underline
 * @snippetPath /snippets/extensions/underline.mdx
 * @shortcut Mod-u | toggleUnderline | Toggle underline formatting
 * @shortcut Mod-U | toggleUnderline | Toggle underline formatting (uppercase)
 */
export const Underline: Mark<{
    htmlAttributes: {};
}, Record<string, never>, {
    underlineType: unknown;
    underlineColor: unknown;
}>;
/**
 * Underline style configuration
 */
export type UnderlineConfig = {
    /**
     * - Style variant
     */
    value: "single" | "double" | "thick" | "dotted" | "dashed" | "wavy";
};
/**
 * Configuration options for Underline
 */
export type UnderlineOptions = any;
/**
 * Attributes for underline marks
 */
export type UnderlineAttributes = any;
import { Mark } from '@core/index.js';
//# sourceMappingURL=underline.d.ts.map