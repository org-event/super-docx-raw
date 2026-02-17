/**
 * Process the table borders
 * @param {Object[]} [rawBorders] The raw border properties from the `tableProperties` attribute
 * @returns {Record<string,unknown>}
 */
export function _processTableBorders(rawBorders?: any[]): Record<string, unknown>;
/**
 * @typedef {{borders?: {}, name?: *, justification?: *, fonts?: {}, fontSize?: *, rowBorders?: {}, cellMargins?: {}}} TableStyles
 */
/**
 *
 * @param {string|null} tableStyleReference
 * @param {import('@translator').SCEncoderConfig} [params]
 * @returns {TableStyles|null}
 */
export function _getReferencedTableStyles(tableStyleReference: string | null, params?: import("@translator").SCEncoderConfig): TableStyles | null;
/**
 * Restore vertically merged cells from a table
 * @param {Object} table The table node
 * @param {Object} editorSchema The editor schema
 * @returns {Object} The table node with merged cells restored
 */
/** @type {import('@translator').NodeTranslatorConfig} */
export const config: import("@translator").NodeTranslatorConfig;
/**
 * The NodeTranslator instance for the passthrough element.
 * @type {import('@translator').NodeTranslator}
 */
export const translator: import("@translator").NodeTranslator;
export type TableStyles = {
    borders?: {};
    name?: any;
    justification?: any;
    fonts?: {};
    fontSize?: any;
    rowBorders?: {};
    cellMargins?: {};
};
//# sourceMappingURL=tbl-translator.d.ts.map