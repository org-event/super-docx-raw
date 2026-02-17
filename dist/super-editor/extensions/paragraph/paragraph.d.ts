/**
 * Configuration options for Paragraph
 * @typedef {Object} ParagraphOptions
 * @category Options
 * @property {number[]} [headingLevels=[1,2,3,4,5,6]] - Supported heading levels
 * @property {Object} [htmlAttributes={}] - HTML attributes for paragraph elements
 */
/**
 * Attributes for paragraph nodes
 * @typedef {Object} ParagraphAttributes
 * @category Attributes
 * @property {Object} [extraAttrs={}] - Additional HTML attributes
 * @property {string} [class] - CSS class name
 * @property {string} [sdBlockId] @internal - Internal block tracking ID
 * @property {string} [paraId] @internal - Paragraph identifier
 * @property {string} [textId] @internal - Text identifier
 * @property {string} [rsidR] @internal - Revision save ID
 * @property {string} [rsidRDefault] @internal - Default revision save ID
 * @property {string} [rsidP] @internal - Paragraph revision save ID
 * @property {string} [rsidRPr] @internal - Run properties revision save ID
 * @property {string} [rsidDel] @internal - Deletion revision save ID
 * @property {Object} [attributes] @internal - Internal attributes storage
 * @property {string} [filename] @internal - Associated filename
 * @property {Object} [paragraphProperties] @internal - Internal paragraph properties
 * @property {Object} [dropcap] @internal - Drop cap configuration
 * @property {string} [pageBreakSource] @internal - Page break source
 * @property {Object} [sectionMargins] @internal - Section-specific header/footer margins in inches
 */
/**
 * @module Paragraph
 * @sidebarTitle Paragraph
 * @snippetPath /snippets/extensions/paragraph.mdx
 */
export const Paragraph: OxmlNode<Record<string, never>, Record<string, never>, Record<string, unknown>>;
/**
 * Configuration options for Paragraph
 */
export type ParagraphOptions = any;
/**
 * Attributes for paragraph nodes
 */
export type ParagraphAttributes = any;
import { OxmlNode } from '@core/index.js';
//# sourceMappingURL=paragraph.d.ts.map