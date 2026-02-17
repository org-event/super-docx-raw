/**
 * Editable extension controls whether the editor accepts user input.
 *
 * When editable is false, all user interactions are blocked:
 * - Text input via beforeinput events
 * - Mouse interactions via mousedown
 * - Focus via automatic blur
 * - Click, double-click, and triple-click events
 * - Keyboard shortcuts via handleKeyDown
 * - Paste and drop events
 */
export const Editable: Extension<Record<string, never>, Record<string, never>>;
import { Extension } from '../Extension.js';
//# sourceMappingURL=editable.d.ts.map