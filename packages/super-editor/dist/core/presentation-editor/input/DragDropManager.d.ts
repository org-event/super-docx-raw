/**
 * DragDropManager - Consolidated drag and drop handling for PresentationEditor.
 *
 * This manager handles all drag/drop events for field annotations:
 * - Internal drags (moving annotations within the document)
 * - External drags (inserting annotations from external sources like palettes)
 * - Window-level fallback for drops on overlay elements
 */
import type { Editor } from '../../Editor.js';
import type { PositionHit } from '@superdoc/layout-bridge';
/** MIME type for external field annotation drag operations (legacy compatibility) */
export declare const FIELD_ANNOTATION_DATA_TYPE: "fieldAnnotation";
/**
 * Attributes for a field annotation node.
 */
export interface FieldAnnotationAttributes {
    fieldId: string;
    fieldType: string;
    displayLabel: string;
    type: string;
    fieldColor?: string;
}
/**
 * Information about the source field being dragged.
 */
export interface SourceFieldInfo {
    fieldId: string;
    fieldType: string;
    annotationType: string;
}
/**
 * Payload structure for field annotation drag-and-drop data.
 */
export interface FieldAnnotationDragPayload {
    attributes?: FieldAnnotationAttributes;
    sourceField?: SourceFieldInfo;
}
/**
 * Data extracted from a draggable field annotation element.
 */
export interface FieldAnnotationDragData {
    fieldId?: string;
    fieldType?: string;
    variant?: string;
    displayLabel?: string;
    pmStart?: number;
    pmEnd?: number;
    attributes?: Record<string, string>;
}
/**
 * Dependencies injected from PresentationEditor.
 */
export type DragDropDependencies = {
    /** Get the active editor (body or header/footer) */
    getActiveEditor: () => Editor;
    /** Hit test to convert client coordinates to ProseMirror position */
    hitTest: (clientX: number, clientY: number) => PositionHit | null;
    /** Schedule selection overlay update */
    scheduleSelectionUpdate: () => void;
    /** The viewport host element (for event listeners) */
    getViewportHost: () => HTMLElement;
    /** The painter host element (for internal drag detection) */
    getPainterHost: () => HTMLElement;
};
/**
 * Type guard to validate field annotation attributes.
 */
export declare function isValidFieldAnnotationAttributes(attrs: unknown): attrs is FieldAnnotationAttributes;
export declare class DragDropManager {
    #private;
    setDependencies(deps: DragDropDependencies): void;
    bind(): void;
    unbind(): void;
    destroy(): void;
}
//# sourceMappingURL=DragDropManager.d.ts.map