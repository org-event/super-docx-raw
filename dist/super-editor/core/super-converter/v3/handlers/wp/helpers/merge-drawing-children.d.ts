/**
 * Merge drawing children while ensuring:
 * - wp:extent always comes from generated nodes
 * - originals are preferred at their recorded index for other names
 * - remaining generated nodes are appended
 *
 * @param {Object} params
 * @param {string[]} [params.order] - Original child order
 * @param {Object[]} [params.generated] - Generated children (extent, docPr, etc.)
 * @param {{index: number, xml: Object}[]} [params.original] - Original children keyed by index (excluding extent)
 * @returns {Object[]} merged children
 */
export function mergeDrawingChildren({ order, generated, original }: {
    order?: string[];
    generated?: any[];
    original?: {
        index: number;
        xml: any;
    }[];
}): any[];
//# sourceMappingURL=merge-drawing-children.d.ts.map