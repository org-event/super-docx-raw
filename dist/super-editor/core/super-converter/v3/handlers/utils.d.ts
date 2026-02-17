/**
 * Helper to create simple property handlers with one-to-one mapping for properties with a single attribute (eg: 'w:val')
 * @param {string} xmlName The XML attribute name (with namespace).
 * @param {string|null} sdName The SuperDoc attribute name (without namespace). If null, it will be derived from xmlName.
 * @param {string} [attrName='w:val'] The specific attribute name to map to/from. Default is 'w:val'.
 * @param {function} [transformEncode=(v) => v] Optional transformation function to apply during encoding.
 * @param {function} [transformDecode=(v) => v] Optional transformation function to apply during decoding.
 * @returns {import('@translator').NodeTranslatorConfig} The attribute handler config with xmlName, sdName, encode, and decode functions.
 */
export function createSingleAttrPropertyHandler(xmlName: string, sdName?: string | null, attrName?: string, transformEncode?: Function, transformDecode?: Function): import("@translator").NodeTranslatorConfig;
/**
 * Helper to create property handlers for boolean attributes (CT_OnOff => w:val)
 * @param {string} xmlName The XML attribute name (with namespace).
 * @param {string|null} sdName The SuperDoc attribute name (without namespace). If null, it will be derived from xmlName.
 * @returns {import('@translator').NodeTranslatorConfig} The attribute handler config with xmlName, sdName, encode, and decode functions.
 */
export function createSingleBooleanPropertyHandler(xmlName: string, sdName?: string | null): import("@translator").NodeTranslatorConfig;
/**
 * Helper to create property handlers for track changes attributes (CT_TrackChange => w:id, w:author, w:date, w:original)
 * @param {string} xmlName The XML attribute name (with namespace).
 * @param {string|null} sdName The SuperDoc attribute name (without namespace). If null, it will be derived from xmlName.
 * @param {Array} extraAttrs Additional attribute handlers to include.
 * @returns {import('@translator').NodeTranslatorConfig} The attribute handler config with xmlName, sdName, encode, and decode functions.
 */
export function createTrackChangesPropertyHandler(xmlName: string, sdName?: string | null, extraAttrs?: any[]): import("@translator").NodeTranslatorConfig;
/**
 * Helper to create property handlers for measurement attributes (CT_TblWidth => w:w and w:type)
 * @param {string} xmlName The XML attribute name (with namespace).
 * @param {string|null} sdName The SuperDoc attribute name (without namespace). If null, it will be derived from xmlName.
 * @returns {import('@translator').NodeTranslatorConfig} The attribute handler config with xmlName, sdName, encode, and decode functions.
 */
export function createMeasurementPropertyHandler(xmlName: string, sdName?: string | null): import("@translator").NodeTranslatorConfig;
/**
 * Helper to create property handlers for border attributes (CT_Border xml type)
 * @param {string} [xmlName] The XML element name (with namespace).
 * @param {string|null} [sdName] The SuperDoc attribute name (without namespace). If null, it will be derived from xmlName.
 * @returns {import('@translator').NodeTranslatorConfig} The border property handler config with xmlName, sdName, encode, and decode functions.
 */
export function createBorderPropertyHandler(xmlName?: string, sdName?: string | null): import("@translator").NodeTranslatorConfig;
/**
 * Encodes properties of a node using provided translators and adds them to the attributes object.
 * @param {import('@translator').SCEncoderConfig} params The encoding parameters containing the nodes to process.
 * @param {object} [translatorsByXmlName] A mapping of XML names to their corresponding translators.
 * @param {boolean} [asArray=false] If true, encodes attributes as an array of objects; otherwise, as a single object.
 * @returns {object|Array} The encoded attributes as an object or array based on the asArray flag.
 */
export function encodeProperties(params: import("@translator").SCEncoderConfig, translatorsByXmlName?: object, asArray?: boolean): object | any[];
/** Decodes properties from a given properties object using provided translators and adds them to the elements array.
 * @param {import('@translator').SCDecoderConfig} params The decodeing parameters containing the node to process.
 * @param {object} [translatorsBySdName] A mapping of SuperDoc names to their corresponding translators.
 * @param {object} [properties] The properties object containing attributes to be decoded.
 * @returns {Array} An array of decoded elements.
 */
export function decodeProperties(params: import("@translator").SCDecoderConfig, translatorsBySdName?: object, properties?: object): any[];
/**
 * Helper to encode properties by key (eg: w:style elements by styleId)
 * @param {string} xmlName The XML element name (with namespace).
 * @param {string} sdName The SuperDoc attribute name (without namespace).
 * @param {import('@translator').NodeTranslator} translator The node translator to use for encoding.
 * @param {import('@translator').SCEncoderConfig} params The encoding parameters containing the nodes to process.
 * @param {object} node The XML node containing the elements to encode.
 * @param {string} keyAttr The attribute name to use as the key in the resulting object.
 * @returns {object} The encoded properties as an object keyed by the specified attribute.
 */
export function encodePropertiesByKey(xmlName: string, sdName: string, translator: import("@translator").NodeTranslator, params: import("@translator").SCEncoderConfig, node: object, keyAttr: string): object;
/**
 * Helper to decode properties by key (eg: w:style elements by styleId)
 * @param {string} xmlName The XML element name (with namespace).
 * @param {string} sdName The SuperDoc attribute name (without namespace).
 * @param {import('@translator').NodeTranslator} translator The node translator to use for decoding.
 * @param {import('@translator').SCDecoderConfig} params The decoding parameters containing the node to process.
 * @param {object} attrs The attributes object containing the properties to decode.
 * @param {string} keyAttr The attribute name to use as the key in the resulting object.
 * @returns {Array} An array of decoded elements.
 */
export function decodePropertiesByKey(xmlName: string, sdName: string, translator: import("@translator").NodeTranslator, params: import("@translator").SCDecoderConfig, attrs: object): any[];
/**
 * Helper to create property handlers for nested properties (eg: w:tcBorders => borders)
 * @param {string} xmlName The XML element name (with namespace).
 * @param {string} sdName The SuperDoc attribute name (without namespace).
 * @param {import('@translator').NodeTranslator[]} propertyTranslators An array of property translators to handle nested properties.
 * @param {object} [defaultEncodedAttrs={}] Optional default attributes to include during encoding.
 * @param {import('@translator').AttrConfig[]} [attributeHandlers=[]] Optional additional attribute handlers for the nested element.
 * @returns {import('@translator').NodeTranslatorConfig} The nested property handler config with xmlName, sdName, encode, and decode functions.
 */
export function createNestedPropertiesTranslator(xmlName: string, sdName: string, propertyTranslators: import("@translator").NodeTranslator[], defaultEncodedAttrs?: object, attributeHandlers?: import("@translator").AttrConfig[]): import("@translator").NodeTranslatorConfig;
/**
 * Helper to create property handlers for nested array properties (eg: w:tabs => w:tab)
 * @param {string} xmlName The XML element name (with namespace).
 * @param {string|null} sdName The SuperDoc attribute name (without namespace). If null, it will be derived from xmlName.
 * @param {import('@translator').NodeTranslatorConfig[]} propertyTranslators An array of property translators to handle nested properties.
 * @returns {import('@translator').NodeTranslatorConfig} The nested array property handler config with xmlName, sdName, encode, and decode functions.
 */
export function createNestedArrayPropertyHandler(xmlName: string, sdName: string | null, propertyTranslators: import("@translator").NodeTranslatorConfig[], extraParamsForDecode?: {}): import("@translator").NodeTranslatorConfig;
export function generateV2HandlerEntity(handlerName: string, translator: import("../node-translator/").NodeTranslator): import("../../v2/importer/docxImporter").NodeHandlerEntry;
export function createSingleIntegerPropertyHandler(xmlName: string, sdName?: string | null): import("@translator").NodeTranslatorConfig;
export function createAttributeHandler(xmlName?: string, sdName?: string | null, transformEncode?: any, transformDecode?: any): import("@translator").AttrConfig;
export function createIntegerAttributeHandler(xmlName: string, sdName?: string | null): import("@translator").AttrConfig;
export function createBooleanAttributeHandler(xmlName: string, sdName?: string | null): import("@translator").AttrConfig;
export function parseBoolean(value: string): boolean | undefined;
export function booleanToString(value: boolean): string | undefined;
export function parseInteger(value: any): number | undefined;
export function integerToString(value: any): string | undefined;
//# sourceMappingURL=utils.d.ts.map