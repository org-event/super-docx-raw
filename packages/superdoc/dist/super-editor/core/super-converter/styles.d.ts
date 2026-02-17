/**
 * Encodes run property objects into mark definitions for the editor schema.
 * @param {Object} runProperties - Run properties extracted from DOCX.
 * @param {Object} docx - Parsed DOCX structure used for theme lookups.
 * @returns {Array<Object>} Mark definitions representing the run styling.
 */
export function encodeMarksFromRPr(runProperties: any, docx: any): Array<any>;
/**
 * Converts paragraph properties into a CSS declaration map.
 * @param {Object} paragraphProperties - Paragraph properties after resolution.
 * @param {boolean} hasPreviousParagraph - Whether there is a preceding paragraph.
 * @param {Object | null} nextParagraphProps - Resolved properties of the next paragraph.
 * @returns {Object} CSS properties keyed by CSS property name.
 */
export function encodeCSSFromPPr(paragraphProperties: any, hasPreviousParagraph: boolean, nextParagraphProps: any | null): any;
/**
 * Converts run properties into a CSS declaration map.
 * @param {Object} runProperties - Run properties after resolution.
 * @param {Object} docx - Parsed DOCX content used for theme lookups.
 * @returns {Object} CSS properties keyed by CSS property name.
 */
export function encodeCSSFromRPr(runProperties: any, docx: any): any;
/**
 * Decodes mark definitions back into run property objects.
 * @param {Array<Object>} marks - Mark array from the editor schema.
 * @returns {Object} Run property object.
 */
export function decodeRPrFromMarks(marks: Array<any>): any;
export function getSpacingStyle(spacing: any, isListItem?: boolean): any;
import { resolveRunProperties } from '@superdoc/style-engine/ooxml';
import { resolveParagraphProperties } from '@superdoc/style-engine/ooxml';
import { combineRunProperties } from '@superdoc/style-engine/ooxml';
export { resolveRunProperties, resolveParagraphProperties, combineRunProperties };
//# sourceMappingURL=styles.d.ts.map