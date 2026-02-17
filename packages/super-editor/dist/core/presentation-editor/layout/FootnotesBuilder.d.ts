/**
 * FootnotesBuilder - Builds footnote layout input from editor state.
 *
 * No external side effects, no DOM access, no callbacks.
 * Note: Mutates the blocks passed to ensureFootnoteMarker internally.
 *
 * ## Key Concepts
 *
 * - `pmStart`/`pmEnd`: ProseMirror document positions that map layout elements
 *   back to their source positions in the editor. Used for selection, cursor
 *   placement, and click-to-position functionality.
 *
 * - `data-sd-footnote-number`: A data attribute marking the superscript number
 *   run (e.g., "¹") at the start of footnote content. Used to distinguish the
 *   marker from actual footnote text during rendering and selection.
 *
 * @module presentation-editor/layout/FootnotesBuilder
 */
import type { EditorState } from 'prosemirror-state';
import { type ConverterContext } from '@superdoc/pm-adapter';
import type { FootnoteReference, FootnotesLayoutInput } from '../types.js';
export type { FootnoteReference, FootnotesLayoutInput };
/** Minimal shape of a converter object containing footnote data. */
export type ConverterLike = {
    footnotes?: Array<{
        id?: unknown;
        content?: unknown[];
    }>;
};
/**
 * Builds footnote layout input from editor state and converter data.
 *
 * Traverses the document to find footnote references, then builds layout
 * blocks for each referenced footnote with superscript markers prepended.
 *
 * No external side effects, no DOM access, no callbacks.
 * Note: Mutates blocks internally when adding footnote markers.
 *
 * @param editorState - The ProseMirror editor state
 * @param converter - Converter with footnote data
 * @param converterContext - Context with footnote numbering info
 * @param themeColors - Theme colors for styling
 * @returns FootnotesLayoutInput if footnotes exist, null otherwise
 */
export declare function buildFootnotesInput(editorState: EditorState | null | undefined, converter: ConverterLike | null | undefined, converterContext: ConverterContext | undefined, themeColors: unknown): FootnotesLayoutInput | null;
//# sourceMappingURL=FootnotesBuilder.d.ts.map