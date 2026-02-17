/**
 * Configuration options for LineBreak
 * @typedef {Object} LineBreakOptions
 * @category Options
 */
/**
 * Attributes for line break nodes
 * @typedef {Object} LineBreakAttributes
 * @category Attributes
 * @property {string} [lineBreakType] @internal Type of line break - passthrough in this node
 * @property {string} [clear] @internal Clear attribute - passthrough in this node
 */
/**
 * @module LineBreak
 * @sidebarTitle Line Break
 * @snippetPath /snippets/extensions/line-break.mdx
 */
export const LineBreak: Node<Record<string, never>, Record<string, never>, Record<string, unknown>>;
/**
 * Configuration options for HardBreak
 * @typedef {Object} HardBreakOptions
 * @category Options
 * @property {Object} [htmlAttributes] - HTML attributes for the break element
 */
/**
 * Attributes for hard break nodes
 * @typedef {Object} HardBreakAttributes
 * @category Attributes
 * @property {string} [pageBreakSource] @internal Source of the page break
 * @property {string} [pageBreakType] @internal Type of page break
 * @property {string} [lineBreakType] @internal Type of line break - passthrough in this node
 * @property {string} [clear] @internal Clear attribute - passthrough in this node
 */
/**
 * @module HardBreak
 * @sidebarTitle Hard Break
 * @snippetPath /snippets/extensions/hard-break.mdx
 */
export const HardBreak: Node<Record<string, never>, Record<string, never>, Record<string, unknown>>;
/**
 * Configuration options for LineBreak
 */
export type LineBreakOptions = any;
/**
 * Attributes for line break nodes
 */
export type LineBreakAttributes = any;
/**
 * Configuration options for HardBreak
 */
export type HardBreakOptions = any;
/**
 * Attributes for hard break nodes
 */
export type HardBreakAttributes = any;
import { Node } from '@core/index.js';
//# sourceMappingURL=line-break.d.ts.map