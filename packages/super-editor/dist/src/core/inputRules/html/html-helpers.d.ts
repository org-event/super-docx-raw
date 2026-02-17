/**
 * Flattens ALL lists to ensure each list contains exactly ONE list item.
 * Handles both multi-item lists and nested lists.
 */
export function flattenListsInHtml(html: any, editor: any, domDocument: any): any;
/**
 * Creates a single-item list from an <li> element
 */
export function createSingleItemList({ li, rootNumId, level, listNumberingType }: {
    li: any;
    rootNumId: any;
    level: any;
    listNumberingType: any;
}): any;
/**
 * Converts flatten lists back to normal list structure.
 */
export function unflattenListsInHtml(html: any, domDocument: any): any;
//# sourceMappingURL=html-helpers.d.ts.map