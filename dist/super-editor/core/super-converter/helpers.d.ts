export const PIXELS_PER_INCH: 96;
export function inchesToTwips(inches: any): number;
export function twipsToInches(twips: any): number;
export function twipsToPixels(twips: any): number;
export function pixelsToTwips(pixels: any): number;
export function pixelsToInches(pixels: any): number;
export function pointsToLines(points: any): number;
export function inchesToPixels(inches: any): number;
export function twipsToLines(twips: any): number;
export function linesToTwips(lines: any): number;
export function halfPointToPixels(halfPoints: any): number;
export function emuToPixels(emu: any): number;
export function pixelsToEmu(px: any): number;
export function pixelsToHalfPoints(pixels: any): number;
export function halfPointToPoints(halfPoints: any): number;
export function eighthPointsToPixels(eighthPoints: any): number;
export function pixelsToEightPoints(pixels: any): number;
export function pointsToTwips(points: any): number;
export function rotToDegrees(rot: any): number;
export function degreesToRot(degrees: any): number;
/**
 * Converts an array of pixel coordinates to a DOCX polygon node.
 * Automatically adds a closing wp:lineTo element that connects back to the starting point,
 * ensuring the polygon is properly closed in the DOCX format.
 *
 * @param {Array<[number, number]>} points - Array of [x, y] pixel coordinate pairs
 * @returns {Object|null} DOCX polygon node with wp:start and wp:lineTo elements, or null if invalid input
 */
export function objToPolygon(points: Array<[number, number]>): any | null;
/**
 * Converts a DOCX polygon node to an array of pixel coordinates.
 * Automatically removes duplicate closing points that are the same as the starting point,
 * since polygons are assumed to be closed shapes.
 *
 * @param {Object} polygonNode - The polygon node from DOCX XML with wp:start and wp:lineTo elements
 * @returns {Array<[number, number]>|null} Array of [x, y] pixel coordinate pairs, or null if invalid input
 */
export function polygonToObj(polygonNode: any): Array<[number, number]> | null;
export function getArrayBufferFromUrl(input: any): Promise<ArrayBuffer | SharedArrayBuffer>;
export function getContentTypesFromXml(contentTypesXml: any): any;
export function getHexColorFromDocxSystem(docxColor: any): string;
export function getDocxHighlightKeywordFromHex(hexColor: any): any;
export function normalizeHexColor(hex: any): any;
export function isValidHexColor(color: any): boolean;
export function rgbToHex(rgb: any): string;
export function ptToTwips(pt: any): number;
export function twipsToPt(twips: any): number;
export function getLineHeightValueString(lineHeight: any, defaultUnit: any, lineRule?: string, isObject?: boolean): string | {
    "line-height"?: undefined;
} | {
    "line-height": string;
};
export function deobfuscateFont(arrayBuffer: any, guidHex: any): any;
export function hasSomeParentWithClass(element: any, classname: any): any;
/**
 * Get the export value for text indent
 * @param {string|number} indent - The text indent value to export
 * @returns {number} - The export value in twips
 */
export function getTextIndentExportValue(indent: string | number): number;
export function polygonUnitsToPixels(pu: any): number;
export function pixelsToPolygonUnits(pixels: any): number;
/**
 * @param {number | string} value Value (e.g. 5000 or "100%")
 * @param {"dxa" | "pct" | "nil" | "auto" | null} type Units: either "dxa" (or null/undefined) for absolute measurements in twips, "pct" for relative measurements (either as 1/50 of a percent, or as a percentage with a trailing "%"), "nil" (zero width, see 17.18.90 of ECMA-376-1:2016), or "auto" (
 *
 * @returns {string | null} CSS specification for size (e.g. `100%`, `25px`) or `null` if the type is `"auto"`
 */
export function convertSizeToCSS(value: number | string, type: "dxa" | "pct" | "nil" | "auto" | null): string | null;
export function resolveShadingFillColor(shading: any): any;
/**
 * Resolves an OPC relationship target URI to its ZIP entry path.
 *
 * Implements URI resolution per:
 * - ECMA-376 Part 2: Open Packaging Conventions (OPC)
 *   https://www.ecma-international.org/publications-and-standards/standards/ecma-376/
 * - RFC 3986 Section 5: Reference Resolution
 *   https://datatracker.ietf.org/doc/html/rfc3986#section-5
 *
 * Path resolution rules:
 * - Absolute paths (starting with '/') resolve from the package root
 * - Relative paths resolve from the relationship file's parent directory (baseDir)
 * - Supports '..' and '.' path segments per RFC 3986 Section 5.2.4
 *
 * @param {string} target - The relationship target URI from the XML
 * @param {string} [baseDir='word'] - The base directory for relative path resolution
 * @returns {string|null} The resolved ZIP entry path, or null if target is empty/external
 *
 * @example
 * resolveOpcTargetPath('styles.xml', 'word')             // → 'word/styles.xml'
 * resolveOpcTargetPath('./styles.xml', 'word')           // → 'word/styles.xml'
 * resolveOpcTargetPath('/word/styles.xml', 'word')       // → 'word/styles.xml'
 * resolveOpcTargetPath('../customXml/item.xml', 'word')  // → 'customXml/item.xml'
 * resolveOpcTargetPath('media/image.png', 'word')        // → 'word/media/image.png'
 */
export function resolveOpcTargetPath(target: string, baseDir?: string): string | null;
//# sourceMappingURL=helpers.d.ts.map