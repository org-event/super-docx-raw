/**
 * SearchIndex provides a lazily-built, cached index for searching across
 * the entire document including cross-paragraph matches.
 *
 * Uses ProseMirror's textBetween for flattening and maintains a segment
 * map for mapping string offsets back to document positions.
 */
export class SearchIndex {
    /**
     * Escape special regex characters in a string.
     *
     * @param {string} str - String to escape
     * @returns {string} Escaped string safe for use in RegExp
     */
    static escapeRegex(str: string): string;
    /**
     * Convert a plain search string to a whitespace-flexible regex pattern.
     * This allows matching across paragraph boundaries.
     *
     * @param {string} searchString - The search string
     * @returns {string} Regex pattern string
     */
    static toFlexiblePattern(searchString: string): string;
    /** @type {string} */
    text: string;
    /** @type {Segment[]} */
    segments: Segment[];
    /** @type {boolean} */
    valid: boolean;
    /** @type {number} */
    docSize: number;
    /**
     * Build the search index from a ProseMirror document.
     * Uses doc.textBetween for the flattened string and walks
     * the document to build the segment offset map.
     *
     * @param {import('prosemirror-model').Node} doc - The ProseMirror document
     */
    build(doc: import("prosemirror-model").Node): void;
    /**
     * Mark the index as stale. It will be rebuilt on next search.
     */
    invalidate(): void;
    /**
     * Check if the index needs rebuilding for the given document.
     *
     * @param {import('prosemirror-model').Node} doc - The document to check against
     * @returns {boolean} True if index is stale and needs rebuilding
     */
    isStale(doc: import("prosemirror-model").Node): boolean;
    /**
     * Ensure the index is valid for the given document.
     * Rebuilds if stale.
     *
     * @param {import('prosemirror-model').Node} doc - The document
     */
    ensureValid(doc: import("prosemirror-model").Node): void;
    /**
     * Convert an offset range in the flattened string to document ranges.
     * Skips separator/atom segments and returns only text ranges.
     *
     * @param {number} start - Start offset in flattened string
     * @param {number} end - End offset in flattened string
     * @returns {DocRange[]} Array of document ranges (text segments only)
     */
    offsetRangeToDocRanges(start: number, end: number): DocRange[];
    /**
     * Find the document position for a given offset in the flattened string.
     *
     * @param {number} offset - Offset in flattened string
     * @returns {number|null} Document position, or null if not found
     */
    offsetToDocPos(offset: number): number | null;
    /**
     * Search the index for matches.
     *
     * @param {string | RegExp} pattern - Search pattern (string or regex)
     * @param {Object} options - Search options
     * @param {boolean} [options.caseSensitive=false] - Case sensitive search
     * @param {number} [options.maxMatches=1000] - Maximum number of matches to return
     * @returns {Array<{start: number, end: number, text: string}>} Array of matches with offsets
     */
    search(pattern: string | RegExp, options?: {
        caseSensitive?: boolean;
        maxMatches?: number;
    }): Array<{
        start: number;
        end: number;
        text: string;
    }>;
    #private;
}
/**
 * Segment kinds in the flattened document
 */
export type SegmentKind = "text" | "blockSep" | "hardBreak" | "atom";
/**
 * A segment mapping offset range to document positions
 */
export type Segment = {
    /**
     * - Start offset in flattened string
     */
    offsetStart: number;
    /**
     * - End offset in flattened string
     */
    offsetEnd: number;
    /**
     * - Start position in document
     */
    docFrom: number;
    /**
     * - End position in document
     */
    docTo: number;
    /**
     * - Type of segment
     */
    kind: SegmentKind;
};
/**
 * A document range
 */
export type DocRange = {
    /**
     * - Start position in document
     */
    from: number;
    /**
     * - End position in document
     */
    to: number;
};
//# sourceMappingURL=SearchIndex.d.ts.map