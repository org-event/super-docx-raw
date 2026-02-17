/**
 * Selects the best-fit mc:AlternateContent branch, mirroring the legacy importer logic.
 * @param {import('@translator').SCExtraParams['node']} node
 * @returns {{ branch: import('@translator').XmlNode|null, elements: import('@translator').XmlNode[]|null }}
 */
export function selectAlternateContentElements(node: import("@translator").SCExtraParams["node"]): {
    branch: import("@translator").XmlNode | null;
    elements: import("@translator").XmlNode[] | null;
};
/** @type {Set<string>} */
export const SUPPORTED_ALTERNATE_CONTENT_REQUIRES: Set<string>;
/** @type {import('@translator').NodeTranslatorConfig} */
export const config: import("@translator").NodeTranslatorConfig;
/**
 * @type {import('@translator').NodeTranslator}
 */
export const translator: import("@translator").NodeTranslator;
//# sourceMappingURL=alternate-content-translator.d.ts.map