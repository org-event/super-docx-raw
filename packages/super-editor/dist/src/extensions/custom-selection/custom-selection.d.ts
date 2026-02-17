/**
 * Selection state
 * @typedef {Object} SelectionState
 * @property {boolean} focused - Whether editor is focused
 * @property {Object|null} preservedSelection - Stored selection
 * @property {boolean} showVisualSelection - Whether to show selection decoration
 * @property {boolean} skipFocusReset - Whether to skip clearing selection on next focus
 */
/**
 * Configuration options for CustomSelection
 * @typedef {Object} CustomSelectionOptions
 * @category Options
 * @example
 * // CustomSelection works automatically
 * new SuperDoc({
 *   selector: '#editor',
 *   document: 'document.docx'
 *   // Selection handling is built-in
 * });
 */
/**
 * Plugin key for custom selection management
 * @private
 */
export const CustomSelectionPluginKey: PluginKey<any>;
/**
 * @module CustomSelection
 * @sidebarTitle Custom Selection
 * @snippetPath /snippets/extensions/custom-selection.mdx
 */
export const CustomSelection: Extension<Record<string, never>, Record<string, never>>;
/**
 * Selection state
 */
export type SelectionState = {
    /**
     * - Whether editor is focused
     */
    focused: boolean;
    /**
     * - Stored selection
     */
    preservedSelection: any | null;
    /**
     * - Whether to show selection decoration
     */
    showVisualSelection: boolean;
    /**
     * - Whether to skip clearing selection on next focus
     */
    skipFocusReset: boolean;
};
/**
 * Configuration options for CustomSelection
 */
export type CustomSelectionOptions = any;
import { PluginKey } from 'prosemirror-state';
import { Extension } from '@core/Extension.js';
//# sourceMappingURL=custom-selection.d.ts.map