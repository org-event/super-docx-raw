/**
 * Translate a field annotation node
 * @param {Object} params - The parameters for translation.
 * @returns {Object} The XML representation.
 */
export function translateFieldAnnotation(params: any): any;
/**
 * Returns node handler based on annotation type
 *
 * @param {String} annotationType
 * @returns {Function} handler for provided annotation type
 */
export function getTranslationByAnnotationType(annotationType: string, annotationFieldType: any): Function;
/**
 * Translates text annotations
 * @param {Object} params
 * @returns {Object}
 */
export function prepareTextAnnotation(params: any): any;
/**
 * Translates image annotations
 * @param {Object} params
 * @param {Object} imageSize Object contains width and height for image in EMU
 * @returns {Object} The translated image node
 */
export function prepareImageAnnotation(params: any, imageSize: any): any;
/**
 * Translates checkbox annotations
 * @param {Object} params
 * @returns {Object} The translated checkbox node
 */
export function prepareCheckboxAnnotation(params: any): any;
/**
 * Translates html annotations
 * @param {Object} params
 * @returns {Object} The translated html node
 */
export function prepareHtmlAnnotation(params: any): any;
/**
 * Translates URL annotations
 * @param {Object} params
 * @returns {Object} The translated URL node
 */
export function prepareUrlAnnotation(params: any): any;
export function translateFieldAttrsToMarks(attrs?: {}): ({
    type: string;
    attrs: {
        fontFamily: any;
        fontSize?: undefined;
        color?: undefined;
    };
} | {
    type: string;
    attrs: {
        fontSize: any;
        fontFamily?: undefined;
        color?: undefined;
    };
} | {
    type: string;
    attrs: {
        fontFamily?: undefined;
        fontSize?: undefined;
        color?: undefined;
    };
} | {
    type: string;
    attrs: {
        color: any;
        fontFamily?: undefined;
        fontSize?: undefined;
    };
})[];
export function applyMarksToHtmlAnnotation(state: any, marks: any): any;
/**
 * Get the JSON representation of the field highlight
 * @param {string} fieldsHighlightColor - The highlight color for the field. Must be valid HEX.
 * @returns {Object} The JSON representation of the field highlight
 */
export function getFieldHighlightJson(fieldsHighlightColor: string): any;
//# sourceMappingURL=translate-field-annotation.d.ts.map