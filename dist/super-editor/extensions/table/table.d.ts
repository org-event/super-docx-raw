/**
 * Table configuration options
 * @typedef {Object} TableConfig
 * @property {number} [rows=3] - Number of rows to create
 * @property {number} [cols=3] - Number of columns to create
 * @property {boolean} [withHeaderRow=false] - Create first row as header row
 */
/**
 * Table indentation configuration
 * @typedef {Object} TableIndent
 * @property {number} width - Indent width in pixels
 * @property {string} [type='dxa'] - Indent type
 */
/**
 * Cell selection position
 * @typedef {Object} CellSelectionPosition
 * @property {number} anchorCell - Starting cell position
 * @property {number} headCell - Ending cell position
 */
/**
 * Configuration options for Table
 * @typedef {Object} TableOptions
 * @category Options
 * @property {Object} [htmlAttributes={'aria-label': 'Table node'}] - Default HTML attributes for all tables
 * @property {boolean} [resizable=true] - Enable column resizing functionality
 * @property {number} [handleWidth=5] - Width of resize handles in pixels
 * @property {number} [cellMinWidth=10] - Minimum cell width constraint in pixels
 * @property {boolean} [lastColumnResizable=true] - Allow resizing of the last column
 * @property {boolean} [allowTableNodeSelection=false] - Enable selecting the entire table node
 */
/**
 * Attributes for table nodes
 * @typedef {Object} TableAttributes
 * @category Attributes
 * @property {TableIndent} [tableIndent] - Table indentation configuration
 * @property {import("./tableHelpers/createTableBorders.js").TableBorders} [borders] - Border styling for this table
 * @property {string} [borderCollapse='collapse'] - CSS border-collapse property
 * @property {string} [justification] - Table alignment ('left', 'center', 'right')
 * @property {number} [tableCellSpacing] - Cell spacing in pixels for this table
 * @property {string} [sdBlockId] @internal - Internal block tracking ID
 * @property {string} [tableStyleId] @internal - Internal reference to table style
 * @property {string} [tableLayout] @internal - CSS table-layout property (advanced usage)
 */
/**
 * Current cell information
 * @typedef {Object} CurrentCellInfo
 * @property {Object} rect - Selected rectangle information
 * @property {import('prosemirror-model').Node} cell - The cell node
 * @property {Object} attrs - Cell attributes
 */
/**
 * @typedef {Object} TableNodeAttributes
 * @property {TableProperties} tableProperties
 * @property {TableGrid} grid
 */
/**
 * @typedef {Node} TableNode
 * @property {TableNodeAttributes} attrs
 */
/**
 * @module Table
 * @sidebarTitle Table
 * @snippetPath /snippets/extensions/table.mdx
 * @shortcut Tab | goToNextCell/addRowAfter | Navigate to next cell or add row
 * @shortcut Shift-Tab | goToPreviousCell | Navigate to previous cell
 * @shortcut Backspace | deleteTableWhenSelected | Delete table when all cells selected
 * @shortcut Delete | deleteTableWhenSelected | Delete table when all cells selected
 */
export const Table: Node<Record<string, never>, Record<string, never>, Record<string, unknown>>;
/**
 * Theme color options
 */
export type ThemeColor = "dark1" | "light1" | "dark2" | "light2" | "accent1" | "accent2" | "accent3" | "accent4" | "accent5" | "accent6" | "hyperlink" | "followedHyperlink" | "none" | "background1" | "text1" | "background2" | "text2";
/**
 * Shading pattern options
 */
export type ShadingPattern = "nil" | "clear" | "solid" | "horzStripe" | "vertStripe" | "reverseDiagStripe" | "diagStripe" | "horzCross" | "diagCross" | "thinHorzStripe" | "thinVertStripe" | "thinReverseDiagStripe" | "thinDiagStripe" | "thinHorzCross" | "thinDiagCross";
/**
 * Shading properties
 */
export type ShadingProperties = {
    /**
     * - Shading color (hex without # or "auto" for automatic)
     */
    color?: string | "auto";
    /**
     * - Shading fill color (hex without # or "auto" for automatic)
     */
    fill?: string | "auto";
    /**
     * - Theme color name
     */
    themeColor?: ThemeColor;
    /**
     * - Theme fill name
     */
    themeFill?: ThemeColor;
    /**
     * - Theme fill shade (0-255 in hex format without #)
     */
    themeFillShade?: string;
    /**
     * - Theme fill tint (0-255 in hex format without #)
     */
    themeFillTint?: string;
    /**
     * - Theme shade (0-255 in hex format without #)
     */
    themeShade?: string;
    /**
     * - Theme tint (0-255 in hex format without #)
     */
    themeTint?: string;
    /**
     * - Shading pattern
     */
    val?: ShadingPattern;
};
/**
 * Table width options
 */
export type TableMeasurement = {
    /**
     * - Width value in twips
     */
    value: number;
    /**
     * - Table width type (dxa=twips, pct=percentage, auto=automatic)
     */
    type?: "dxa" | "pct" | "auto";
};
/**
 * Table look options
 */
export type TableLook = {
    /**
     * - Specifies that the first column conditional formatting should be applied
     */
    firstColumn?: boolean;
    /**
     * - Specifies that the first row conditional formatting should be applied
     */
    firstRow?: boolean;
    /**
     * - Specifies that the last column conditional formatting should be applied
     */
    lastColumn?: boolean;
    /**
     * - Specifies that the last row conditional formatting should be applied
     */
    lastRow?: boolean;
    /**
     * - Specifies that no horizontal banding conditional formatting should be applied
     */
    noHBand?: boolean;
    /**
     * - Specifies that no vertical banding conditional formatting should be applied
     */
    noVBand?: boolean;
};
/**
 * Floating table properties
 */
export type FloatingTableProperties = {
    /**
     * - Specifies the minimum distance in twips which shall be maintained between the current floating table and the edge of text in the paragraph which is to the left of this floating table.
     */
    leftFromText?: number;
    /**
     * - Specifies the minimum distance in twips which shall be maintained between the current floating table and the edge of text in the paragraph which is to the right of this floating table.
     */
    rightFromText?: number;
    /**
     * - Specifies the minimum distance in twips which shall be maintained between the current floating table and the bottom edge of text in the paragraph which is above this floating table.
     */
    topFromText?: number;
    /**
     * - Specifies the minimum distance in twips which shall be maintained between the current floating table and the top edge of text in the paragraph which is below this floating table.
     */
    bottomFromText?: number;
    /**
     * - Specifies and absolute horizontal position for the floating table. The position is measured from the horizontal anchor point (horzAnchor) in twips.
     */
    tblpX?: number;
    /**
     * - Specifies and absolute vertical position for the floating table. The position is measured from the vertical anchor point (vertAnchor) in twips.
     */
    tblpY?: number;
    /**
     * - Horizontal anchor point for tblpX
     */
    horzAnchor?: "margin" | "page" | "text";
    /**
     * - Vertical anchor point for tblpY
     */
    vertAnchor?: "margin" | "page" | "text";
    /**
     * - Specifies a relative horizontal position for the floating table. Supercedes tblpX if both are specified.
     */
    tblpXSpec?: "left" | "center" | "right" | "inside" | "outside";
    /**
     * - Specifies a relative vertical position for the floating table. Supercedes tblpY if both are specified.
     */
    tblpYSpec?: "inline" | "top" | "center" | "bottom" | "inside" | "outside";
};
/**
 * Table border specification
 */
export type TableBorderSpec = {
    /**
     * - Border style (e.g., 'single', 'double', 'dashed', etc.)
     */
    val?: string;
    /**
     * - Border color (hex without #, e.g., 'FF0000' for red)
     */
    color?: string;
    /**
     * - Theme color name
     */
    themeColor?: ThemeColor;
    /**
     * - Theme tint (0-255 in hex format without #)
     */
    themeTint?: string;
    /**
     * - Theme shade (0-255 in hex format without #)
     */
    themeShade?: string;
    /**
     * - Border size in eighths of a point (e.g., 8 = 1pt, 16 = 2pt)
     */
    size?: number;
    /**
     * - Space in points between border and text
     */
    space?: number;
    /**
     * - Whether the border has a shadow
     */
    shadow?: boolean;
    /**
     * - Whether the border is a frame
     */
    frame?: boolean;
};
/**
 * Table borders properties
 */
export type TableBorders = {
    /**
     * - Bottom border specification
     */
    bottom?: TableBorderSpec;
    /**
     * - End (right in LTR, left in RTL) border specification
     */
    end?: TableBorderSpec;
    /**
     * - Inside horizontal border specification
     */
    insideH?: TableBorderSpec;
    /**
     * - Inside vertical border specification
     */
    insideV?: TableBorderSpec;
    /**
     * - Left border specification
     */
    left?: TableBorderSpec;
    /**
     * - Right border specification
     */
    right?: TableBorderSpec;
    /**
     * - Start (left in LTR, right in RTL) border specification
     */
    start?: TableBorderSpec;
    /**
     * - Top border specification
     */
    top?: TableBorderSpec;
};
/**
 * Table cell margin properties
 */
export type TableCellMargins = {
    /**
     * - Top cell margin
     */
    top?: TableMeasurement;
    /**
     * - Left cell margin
     */
    left?: TableMeasurement;
    /**
     * - Bottom cell margin
     */
    bottom?: TableMeasurement;
    /**
     * - Start cell margin (left in LTR, right in RTL)
     */
    start?: TableMeasurement;
    /**
     * - End cell margin (right in LTR, left in RTL)
     */
    end?: TableMeasurement;
    /**
     * - Right cell margin
     */
    right?: TableMeasurement;
};
/**
 * Table properties
 */
export type TableProperties = {
    /**
     * - Specifies that the cells with this table shall be visually represented in a right to left direction
     */
    rightToLeft?: boolean;
    /**
     * - The alignment of the set of rows which are part of the current table.
     */
    justification?: "center" | "end" | "left" | "right" | "start";
    /**
     * - Shading properties for the table
     */
    shading?: ShadingProperties;
    /**
     * - Caption text for the table
     */
    caption?: string;
    /**
     * - Description text for the table
     */
    description?: string;
    /**
     * - Cell spacing
     */
    tableCellSpacing?: TableMeasurement;
    /**
     * - Table indentation
     */
    tableIndent?: TableMeasurement;
    /**
     * - Table layout algorithm
     */
    tableLayout?: "fixed" | "autofit";
    /**
     * - Various boolean flags that affect the rendering of the table
     */
    tableLook?: TableLook;
    /**
     * - Specifies whether the current table should allow other floating tables to overlap its extents when the tables are displayed in a document
     */
    overlap?: "never" | "overlap";
    /**
     * - Reference to table style ID
     */
    tableStyleId?: string;
    /**
     * - Number of columns for which the table style is applied
     */
    tableStyleColBandSize?: number;
    /**
     * - Number of rows for which the table style is applied
     */
    tableStyleRowBandSize?: number;
    /**
     * - Table width
     */
    tableWidth?: TableMeasurement;
    /**
     * - Floating table properties
     */
    floatingTableProperties?: FloatingTableProperties;
    /**
     * - Table border configuration
     */
    borders?: TableBorders;
    /**
     * - Cell margin configuration
     */
    cellMargins?: TableCellMargins;
};
/**
 * Column width definition
 */
export type ColWidth = {
    /**
     * - Column width in twips
     */
    col: number;
};
/**
 * Table grid definition
 */
export type TableGrid = {
    /**
     * - Array of column widths in twips
     */
    colWidths?: ColWidth[];
};
/**
 * Row template formatting
 */
export type RowTemplateFormatting = {
    /**
     * - Node type used when building cell content
     */
    blockType: import("prosemirror-model").NodeType;
    /**
     * - Attributes to apply to the created block node
     */
    blockAttrs: any | null;
    /**
     * - Marks copied from the template text node
     */
    textMarks: Array<import("prosemirror-model").Mark>;
};
/**
 * Build row from template row parameters
 */
export type BuildRowFromTemplateRowParams = {
    /**
     * - Editor schema
     */
    schema: import("prosemirror-model").Schema;
    /**
     * - Table node used for column map lookup
     */
    tableNode: import("prosemirror-model").Node;
    /**
     * - Row providing structure and formatting
     */
    templateRow: import("prosemirror-model").Node;
    /**
     * - Values to populate each table cell
     */
    values: any[];
    /**
     * - Clone template marks and block attrs when true
     */
    copyRowStyle?: boolean;
};
/**
 * Append rows to the end of a table in a single transaction.
 */
export type appendRowsWithContentOptions = {
    /**
     * - Absolute position of the target table; required when `tableNode` is not provided
     */
    tablePos?: number;
    /**
     * - Table node reference; required when `tablePos` is not provided
     */
    tableNode?: import("prosemirror-model").Node;
    /**
     * - Cell values for each appended row
     */
    valueRows: string[][];
    /**
     * - Clone template styling when true
     */
    copyRowStyle?: boolean;
};
/**
 * Insert rows at table end parameters
 */
export type InsertRowsAtTableEndParams = {
    /**
     * - Transaction to mutate
     */
    tr: import("prosemirror-state").Transaction;
    /**
     * - Absolute position of the target table
     */
    tablePos: number;
    /**
     * - Table node receiving new rows
     */
    tableNode: import("prosemirror-model").Node;
    /**
     * - Row nodes to append
     */
    rows: import("prosemirror-model").Node[];
};
/**
 * Table configuration options
 */
export type TableConfig = {
    /**
     * - Number of rows to create
     */
    rows?: number;
    /**
     * - Number of columns to create
     */
    cols?: number;
    /**
     * - Create first row as header row
     */
    withHeaderRow?: boolean;
};
/**
 * Table indentation configuration
 */
export type TableIndent = {
    /**
     * - Indent width in pixels
     */
    width: number;
    /**
     * - Indent type
     */
    type?: string;
};
/**
 * Cell selection position
 */
export type CellSelectionPosition = {
    /**
     * - Starting cell position
     */
    anchorCell: number;
    /**
     * - Ending cell position
     */
    headCell: number;
};
/**
 * Configuration options for Table
 */
export type TableOptions = any;
/**
 * Attributes for table nodes
 */
export type TableAttributes = any;
/**
 * Current cell information
 */
export type CurrentCellInfo = {
    /**
     * - Selected rectangle information
     */
    rect: any;
    /**
     * - The cell node
     */
    cell: import("prosemirror-model").Node;
    /**
     * - Cell attributes
     */
    attrs: any;
};
export type TableNodeAttributes = {
    tableProperties: TableProperties;
    grid: TableGrid;
};
export type TableNode = Node;
import { Node } from '@core/index.js';
//# sourceMappingURL=table.d.ts.map