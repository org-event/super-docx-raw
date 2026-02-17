/**
 * Main types entrypoint for @pdfme/super-editor.
 *
 * Importing this file (or the package) automatically loads all type augmentations
 * for commands and node/mark attributes.
 *
 * @example
 * ```typescript
 * import { Editor } from '@pdfme/super-editor';
 * import { isNodeType, type NodeAttrs, type ParagraphAttrs } from '@pdfme/super-editor';
 *
 * const editor = new Editor({ ... });
 *
 * // Commands are fully typed
 * editor.commands.toggleBold();           // ✅ Autocomplete
 * editor.commands.setFontSize('14pt');    // ✅ Type-checked
 *
 * // Node attributes are typed
 * editor.state.doc.descendants((node) => {
 *   if (isNodeType(node, 'paragraph')) {
 *     // node.attrs is typed as ParagraphAttrs
 *     const styleId = node.attrs.paragraphProperties?.styleId;
 *   }
 * });
 *
 * // Direct type usage
 * function processParagraph(attrs: NodeAttrs<'paragraph'>) {
 *   // attrs is ParagraphAttrs
 * }
 * ```
 *
 * @module Types
 */
import './super-editor/extensions/types/index.js';
export type { EditorCommands, CommandProps, Command, ChainedCommand, ChainableCommandObject, CanCommand, CanObject, CoreCommands, ExtensionCommands, CoreCommandMap, ExtensionCommandMap, } from './super-editor/core/types/ChainedCommands.js';
export type { NodeAttributesMap, NodeName, NodeAttrs, TypedNode } from './super-editor/core/types/NodeAttributesMap.js';
export { isNodeType, assertNodeType } from './super-editor/core/types/NodeAttributesMap.js';
export type { MarkAttributesMap, MarkName, MarkAttrs, TypedMark } from './super-editor/core/types/MarkAttributesMap.js';
export { isMarkType } from './super-editor/core/types/MarkAttributesMap.js';
export type { BlockNodeAttributes, OxmlNodeAttributes, TableNodeAttributes, TextContainerAttributes, InlineNodeAttributes, ShapeNodeAttributes, } from './super-editor/core/types/NodeCategories.js';
export type { ParagraphAttrs, ParagraphProperties, NumberingProperties, IndentationProperties, SpacingProperties, ListRendering, SectionMargins, } from './super-editor/extensions/types/node-attributes.js';
export type { TableAttrs, TableRowAttrs, TableCellAttrs, TableHeaderAttrs, TableProperties, TableRowProperties, TableCellProperties, TableMeasurement, TableBorders, TableLook, TableGrid, CellMargins, BorderSpec, ShadingProperties, ThemeColor, } from './super-editor/extensions/types/node-attributes.js';
export type { ImageAttrs, ImageSize, ImagePadding, ImageWrap, ImageTransformData, } from './super-editor/extensions/types/node-attributes.js';
export type { RunAttrs, RunProperties } from './super-editor/extensions/types/node-attributes.js';
export type { DocumentAttrs, TextAttrs, LineBreakAttrs, HardBreakAttrs, StructuredContentAttrs, DocumentSectionAttrs, } from './super-editor/extensions/types/node-attributes.js';
export type { TabAttrs, BookmarkStartAttrs, BookmarkEndAttrs } from './super-editor/extensions/types/node-attributes.js';
export type { ShapeContainerAttrs, ShapeGroupAttrs, ShapeGroupSize, ShapeGroupPadding, ShapeGroupMarginOffset, ShapeTextboxAttrs, VectorShapeAttrs, VectorShapeTextInsets, } from './super-editor/extensions/types/node-attributes.js';
export type { MentionAttrs, PageReferenceAttrs, PageNumberAttrs, TotalPageCountAttrs, } from './super-editor/extensions/types/node-attributes.js';
export type { FieldAnnotationAttrs, FieldAnnotationSize } from './super-editor/extensions/types/node-attributes.js';
export type { ContentBlockAttrs, ContentBlockSize, ContentBlockMarginOffset, TableOfContentsAttrs, StructuredContentBlockAttrs, DocumentPartObjectAttrs, } from './super-editor/extensions/types/node-attributes.js';
export type { PassthroughBlockAttrs, PassthroughInlineAttrs } from './super-editor/extensions/types/node-attributes.js';
export type { PermStartAttrs, PermEndAttrs } from './super-editor/extensions/types/node-attributes.js';
export type { CommentRangeStartAttrs, CommentRangeEndAttrs, CommentReferenceAttrs, } from './super-editor/extensions/types/node-attributes.js';
export type { BoldAttrs, ItalicAttrs, UnderlineAttrs, UnderlineStyle, StrikeAttrs, LinkAttrs, TargetFrameOption, HighlightAttrs, HighlightColor, TextStyleAttrs, TrackInsertAttrs, TrackDeleteAttrs, TrackFormatEntry, TrackFormatAttrs, CommentMarkAttrs, } from './super-editor/extensions/types/mark-attributes.js';
export { defineNode } from './super-editor/core/defineNode.js';
export { defineMark } from './super-editor/core/defineMark.js';
export type { NodeConfig } from './super-editor/core/Node.js';
export type { MarkConfig } from './super-editor/core/Mark.js';
export type { OxmlNodeConfig } from './super-editor/core/OxmlNode.js';
export type { ProseMirrorJSON, ProseMirrorJSONNode, ProseMirrorJSONMark } from './super-editor/core/types/EditorTypes.js';
//# sourceMappingURL=types.d.ts.map