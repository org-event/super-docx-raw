/**
 * Get the current editor context for menu logic
 *
 * @param {Object} editor - The editor instance
 * @param {MouseEvent} [event] - Optional mouse event (for context menu)
 * @returns {Promise<Object>} context - Enhanced editor context with comprehensive state information
 */
export function getEditorContext(editor: any, event?: MouseEvent): Promise<any>;
export function getPropsByItemId(itemId: string, props: any): any;
declare function getStructureFromResolvedPos(state: any, pos: any): {
    isInTable: boolean;
    isInList: boolean;
    isInSectionNode: boolean;
};
declare function isCollaborationEnabled(editor: any): boolean;
export { getStructureFromResolvedPos as __getStructureFromResolvedPosForTest, isCollaborationEnabled as __isCollaborationEnabledForTest };
//# sourceMappingURL=utils.d.ts.map