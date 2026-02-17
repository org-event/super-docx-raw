/**
 * Get the style tag from the style ID
 *
 * @param {string} styleId The style ID to search for
 * @param {Object} docx The docx data
 * @returns {Object} The style tag
 */
export function getStyleTagFromStyleId(styleId: string, docx: any): any;
export function getDefinitionForLevel(data: any, level: any): any;
export function getAbstractDefinition(numId: any, docx: any, converter: any): import("./numberingCache.js").DocxXmlElement;
export function generateListPath(level: any, numId: any, styleId: any, levels: any, docx: any): any[];
export function getListLevelDefinitionTag(numId: string, level: string, pStyleId: any, docx: any): any;
export namespace docxNumberingHelpers {
    export { generateListPath };
    export { normalizeLvlTextChar };
}
export { normalizeLvlTextChar };
import { normalizeLvlTextChar } from '@superdoc/common/list-numbering';
//# sourceMappingURL=listImporter.d.ts.map