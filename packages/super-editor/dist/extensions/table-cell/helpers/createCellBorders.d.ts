export function createCellBorders(borderSpec?: {}): CellBorders;
/**
 * Cell border configuration
 */
export type CellBorder = {
    /**
     * - Border width in pixels
     */
    size?: number;
    /**
     * - Border color
     */
    color?: string;
    /**
     * - Border style
     */
    style?: string;
};
/**
 * Cell borders object
 */
export type CellBorders = {
    /**
     * - Top border
     */
    top?: CellBorder;
    /**
     * - Right border
     */
    right?: CellBorder;
    /**
     * - Bottom border
     */
    bottom?: CellBorder;
    /**
     * - Left border
     */
    left?: CellBorder;
};
//# sourceMappingURL=createCellBorders.d.ts.map