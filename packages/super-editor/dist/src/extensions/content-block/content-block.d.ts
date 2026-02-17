/**
 * Size configuration for content blocks
 * @typedef {Object} ContentBlockSize
 * @property {number} [top] - Top position in pixels
 * @property {number} [left] - Left position in pixels
 * @property {number|string} [width] - Width in pixels or percentage (e.g., "50%")
 * @property {number|string} [height] - Height in pixels or percentage
 */
/**
 * Content block configuration
 * @typedef {Object} ContentBlockConfig
 * @property {boolean} [horizontalRule] - Whether this is a horizontal rule
 * @property {ContentBlockSize} [size] - Size and position configuration
 * @property {string} [background] - Background color (hex, rgb, or named color)
 */
/**
 * Configuration options for ContentBlock
 * @typedef {Object} ContentBlockOptions
 * @category Options
 * @property {Object} [htmlAttributes] HTML attributes for the block element
 */
/**
 * Attributes for content blocks
 * @typedef {Object} ContentBlockAttributes
 * @category Attributes
 * @property {boolean} [horizontalRule=false] Whether this block is a horizontal rule
 * @property {ContentBlockSize} [size] Size and position of the content block
 * @property {string} [background] Background color for the block
 * @property {Object} [drawingContent] @internal Internal drawing data
 * @property {Object} [attributes] @internal Additional internal attributes
 * @example
 * // Insert a custom content block
 * editor.commands.insertContentBlock({
 *   size: { width: '100%', height: 2 },
 *   background: '#e5e7eb'
 * })
 */
/**
 * @module ContentBlock
 * @sidebarTitle Content Block
 * @snippetPath /snippets/extensions/content-block.mdx
 */
export const ContentBlock: Node<Record<string, never>, Record<string, never>, Record<string, unknown>>;
/**
 * Size configuration for content blocks
 */
export type ContentBlockSize = {
    /**
     * - Top position in pixels
     */
    top?: number;
    /**
     * - Left position in pixels
     */
    left?: number;
    /**
     * - Width in pixels or percentage (e.g., "50%")
     */
    width?: number | string;
    /**
     * - Height in pixels or percentage
     */
    height?: number | string;
};
/**
 * Content block configuration
 */
export type ContentBlockConfig = {
    /**
     * - Whether this is a horizontal rule
     */
    horizontalRule?: boolean;
    /**
     * - Size and position configuration
     */
    size?: ContentBlockSize;
    /**
     * - Background color (hex, rgb, or named color)
     */
    background?: string;
};
/**
 * Configuration options for ContentBlock
 */
export type ContentBlockOptions = any;
/**
 * Attributes for content blocks
 */
export type ContentBlockAttributes = any;
import { Node } from '@core/index.js';
//# sourceMappingURL=content-block.d.ts.map