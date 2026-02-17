/**
 * Default style detector that checks run-level or paragraph-level styleId
 * @param {Object} params
 * @returns {boolean}
 */
export function defaultStyleDetector({ state, selectionMarks, markName, editor }: any): boolean;
/**
 * Determines the effective style ID for the current selection/cursor position
 * by checking multiple sources in priority order.
 *
 * Priority hierarchy:
 * 1. Run-level rStyle from selection marks (highest priority)
 * 2. Cursor-adjacent node marks (handles boundaries where selection marks omit run mark)
 * 3. TextStyle styleId mark from selection marks
 * 4. Paragraph ancestor styleId (lowest priority)
 *
 * @param {Object} state - The ProseMirror editor state
 * @param {Array} selectionMarks - Array of marks from the current selection
 * @returns {string|null} The effective style ID, or null if none found
 */
export function getEffectiveStyleId(state: any, selectionMarks: any[]): string | null;
/**
 * Get the style ID from an array of marks.
 * @param {import('prosemirror-model').Mark[]} marks
 * @returns {string|null}
 */
export function getStyleIdFromMarks(marks: import("prosemirror-model").Mark[]): string | null;
/**
 * Maps a mark name to its corresponding style key.
 * Special case: both 'textStyle' and 'color' marks map to the 'color' style key.
 * All other mark names map directly to themselves.
 *
 * @param {string} markName - The name of the mark to map
 * @returns {string} The corresponding style key
 */
export function mapMarkToStyleKey(markName: string): string;
export function isStyleTokenEnabled(val: any): boolean;
export function toggleMarkCascade(markName: string, options?: {}): ({ state, chain, editor }: {
    state: any;
    chain: any;
    editor: any;
}) => any;
//# sourceMappingURL=toggleMarkCascade.d.ts.map