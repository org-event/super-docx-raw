/**
 * Find the nearest ancestor element that creates a containing block for `position: fixed`.
 * This happens when any ancestor has: transform, filter, backdrop-filter, perspective,
 * will-change (transform/perspective), or contain (paint/layout/strict/content).
 *
 * Per CSS Containing Block specification (https://www.w3.org/TR/css-position-3/#containing-block-for-abspos):
 * A positioned element with `position: fixed` is normally positioned relative to the viewport.
 * However, if any ancestor has certain CSS properties, that ancestor becomes the containing
 * block instead, causing `position: fixed` to behave relative to that ancestor rather than
 * the viewport.
 *
 * @param {HTMLElement} element - Starting element to search from
 * @returns {HTMLElement|null} The containing block ancestor, or null if fixed is relative to viewport
 * @throws {Error} Never throws - errors from getComputedStyle are caught and logged
 */
export function findContainingBlockAncestor(element: HTMLElement): HTMLElement | null;
/**
 * Configuration options for SlashMenu
 * @typedef {Object} SlashMenuOptions
 * @property {boolean} [disabled] - Disable the slash menu entirely (inherited from editor.options.disableContextMenu)
 * @property {number} [cooldownMs=5000] - Cooldown duration in milliseconds to prevent rapid re-opening
 * @category Options
 */
/**
 * Plugin state structure for SlashMenu
 * @typedef {Object} SlashMenuState
 * @property {boolean} open - Whether the slash menu is currently visible
 * @property {string|null} selected - ID of the currently selected menu item
 * @property {number|null} anchorPos - Document position where the menu was anchored
 * @property {Object|null} menuPosition - CSS positioning {left: string, top: string}
 * @property {string} [menuPosition.left] - Left position in pixels (e.g., "100px")
 * @property {string} [menuPosition.top] - Top position in pixels (e.g., "28px")
 * @property {boolean} disabled - Whether the menu functionality is disabled
 */
/**
 * Transaction metadata for SlashMenu actions
 * @typedef {Object} SlashMenuMeta
 * @property {'open'|'select'|'close'|'updatePosition'} type - Action type
 * @property {number} [pos] - Document position (for 'open' action)
 * @property {number} [clientX] - X coordinate for context menu positioning (for 'open' action)
 * @property {number} [clientY] - Y coordinate for context menu positioning (for 'open' action)
 * @property {string} [id] - Menu item ID (for 'select' action)
 */
export const SlashMenuPluginKey: PluginKey<any>;
/**
 * @module SlashMenu
 * @sidebarTitle Slash Menu
 * @snippetPath /snippets/extensions/slash-menu.mdx
 *
 * @fires slashMenu:open - Emitted when menu opens, payload: {menuPosition: {left, top}}
 * @fires slashMenu:close - Emitted when menu closes, no payload
 */
export const SlashMenu: Extension<SlashMenuOptions, Record<string, never>>;
/**
 * Configuration options for SlashMenu
 */
export type SlashMenuOptions = {
    /**
     * - Disable the slash menu entirely (inherited from editor.options.disableContextMenu)
     */
    disabled?: boolean;
    /**
     * - Cooldown duration in milliseconds to prevent rapid re-opening
     */
    cooldownMs?: number;
};
/**
 * Plugin state structure for SlashMenu
 */
export type SlashMenuState = {
    /**
     * - Whether the slash menu is currently visible
     */
    open: boolean;
    /**
     * - ID of the currently selected menu item
     */
    selected: string | null;
    /**
     * - Document position where the menu was anchored
     */
    anchorPos: number | null;
    /**
     * - CSS positioning {left: string, top: string}
     */
    menuPosition: any | null;
    /**
     * - Left position in pixels (e.g., "100px")
     */
    left?: string;
    /**
     * - Top position in pixels (e.g., "28px")
     */
    top?: string;
    /**
     * - Whether the menu functionality is disabled
     */
    disabled: boolean;
};
/**
 * Transaction metadata for SlashMenu actions
 */
export type SlashMenuMeta = {
    /**
     * - Action type
     */
    type: "open" | "select" | "close" | "updatePosition";
    /**
     * - Document position (for 'open' action)
     */
    pos?: number;
    /**
     * - X coordinate for context menu positioning (for 'open' action)
     */
    clientX?: number;
    /**
     * - Y coordinate for context menu positioning (for 'open' action)
     */
    clientY?: number;
    /**
     * - Menu item ID (for 'select' action)
     */
    id?: string;
};
import { PluginKey } from 'prosemirror-state';
import { Extension } from '@core/Extension.js';
//# sourceMappingURL=slash-menu.d.ts.map