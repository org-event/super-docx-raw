/**
 * Cell margins configuration
 * @typedef {Object} CellMargins
 * @property {number} [top] - Top margin in pixels
 * @property {number} [right] - Right margin in pixels
 * @property {number} [bottom] - Bottom margin in pixels
 * @property {number} [left] - Left margin in pixels
 */
/**
 * Cell background configuration
 * @typedef {Object} CellBackground
 * @property {string} color - Background color (hex without #)
 */
/**
 * Configuration options for TableCell
 * @typedef {Object} TableCellOptions
 * @category Options
 * @property {Object} [htmlAttributes={'aria-label': 'Table cell node'}] - HTML attributes for table cells
 */
/**
 * Attributes for table cell nodes
 * @typedef {Object} TableCellAttributes
 * @category Attributes
 * @property {number} [colspan=1] - Number of columns this cell spans
 * @property {number} [rowspan=1] - Number of rows this cell spans
 * @property {number[]} [colwidth=[100]] - Column widths array in pixels
 * @property {CellBackground} [background] - Cell background color configuration
 * @property {string} [verticalAlign] - Vertical content alignment (top, middle, bottom)
 * @property {CellMargins} [cellMargins] - Internal cell padding
 * @property {import('./helpers/createCellBorders.js').CellBorders} [borders] - Cell border configuration
 * @property {string} [widthType='auto'] @internal - Internal width type
 * @property {string} [widthUnit='px'] @internal - Internal width unit
 */
/**
 * @module TableCell
 * @sidebarTitle Table Cell
 * @snippetPath /snippets/extensions/table-cell.mdx
 */
export const TableCell: Node<Record<string, never>, Record<string, never>, Record<string, unknown>>;
/**
 * Conditional formatting properties
 */
export type CnfStyle = {
    /**
     * - Specifies that the first row conditional formatting should be applied
     */
    firstRow?: boolean;
    /**
     * - Specifies that the last row conditional formatting should be applied
     */
    lastRow?: boolean;
    /**
     * - Specifies that the first column conditional formatting should be applied
     */
    firstColumn?: boolean;
    /**
     * - Specifies that the last column conditional formatting should be applied
     */
    lastColumn?: boolean;
    /**
     * - Specifies that odd vertical banding conditional formatting should be applied
     */
    oddVBand?: boolean;
    /**
     * - Specifies that even vertical banding conditional formatting should be applied
     */
    evenVBand?: boolean;
    /**
     * - Specifies that odd horizontal banding conditional formatting should be applied
     */
    oddHBand?: boolean;
    /**
     * - Specifies that even horizontal banding conditional formatting should be applied
     */
    evenHBand?: boolean;
    /**
     * - Specifies that the top-left corner cell conditional formatting should be applied
     */
    firstRowFirstColumn?: boolean;
    /**
     * - Specifies that the top-right corner cell conditional formatting should be applied
     */
    firstRowLastColumn?: boolean;
    /**
     * - Specifies that the bottom-left corner cell conditional formatting should be applied
     */
    lastRowFirstColumn?: boolean;
    /**
     * - Specifies that the bottom-right corner cell conditional formatting should be applied
     */
    lastRowLastColumn?: boolean;
};
/**
 * Table Cell Properties
 */
export type TableCellProperties = {
    /**
     * - Conditional formatting properties
     */
    cnfStyle?: CnfStyle;
    /**
     * - Cell width
     */
    cellWidth?: import("../table/table.js").TableMeasurement;
    /**
     * - Number of grid columns spanned by the cell
     */
    gridSpan?: number;
    /**
     * - Vertical merge setting
     */
    vMerge?: "restart" | "continue";
    /**
     * - Cell border properties
     */
    borders?: import("../table/table.js").TableBorders;
    /**
     * - Cell shading properties
     */
    shading?: import("../table/table.js").ShadingProperties;
    /**
     * - Specifies that the cell content should not wrap
     */
    noWrap?: boolean;
    /**
     * - Cell margin properties
     */
    cellMargins?: import("../table/table.js").TableCellMargins;
    /**
     * - Text direction
     */
    textDirection?: "btLr" | "tbRl";
    /**
     * - Specifies that the cell content should be fit to the cell
     */
    tcFitText?: boolean;
    /**
     * - Vertical alignment
     */
    vAlign?: "top" | "center" | "bottom";
    /**
     * - Specifies that the cell mark should be hidden
     */
    hideMark?: boolean;
    /**
     * - This element specifies a list of references, using a unique identifier, to a table header cell that is associated with the current table cell
     */
    headers?: {
        header: string;
    }[];
};
/**
 * Cell margins configuration
 */
export type CellMargins = {
    /**
     * - Top margin in pixels
     */
    top?: number;
    /**
     * - Right margin in pixels
     */
    right?: number;
    /**
     * - Bottom margin in pixels
     */
    bottom?: number;
    /**
     * - Left margin in pixels
     */
    left?: number;
};
/**
 * Cell background configuration
 */
export type CellBackground = {
    /**
     * - Background color (hex without #)
     */
    color: string;
};
/**
 * Configuration options for TableCell
 */
export type TableCellOptions = any;
/**
 * Attributes for table cell nodes
 */
export type TableCellAttributes = any;
import { Node } from '@core/index.js';
//# sourceMappingURL=table-cell.d.ts.map