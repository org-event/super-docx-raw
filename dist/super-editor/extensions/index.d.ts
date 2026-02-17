import { History } from './history/index.js';
import { Heading } from './heading/index.js';
import { Document } from './document/index.js';
import { Text } from './text/index.js';
import { Run } from './run/index.js';
import { Paragraph } from './paragraph/index.js';
import { CommentRangeStart } from './comment/index.js';
import { CommentRangeEnd } from './comment/index.js';
import { CommentReference } from './comment/index.js';
import { FootnoteReference } from './footnote/index.js';
import { TabNode } from './tab/index.js';
import { LineBreak } from './line-break/index.js';
import { HardBreak } from './line-break/index.js';
import { Bold } from './bold/index.js';
import { Italic } from './italic/index.js';
import { Underline } from './underline/index.js';
import { Highlight } from './highlight/index.js';
import { Strike } from './strike/index.js';
import { Color } from './color/index.js';
import { FontFamily } from './font-family/index.js';
import { FontSize } from './font-size/index.js';
import { TextAlign } from './text-align/index.js';
import { TextStyle } from './text-style/text-style.js';
import { FormatCommands } from './format-commands/index.js';
import { Gapcursor } from './gapcursor/index.js';
import { Table } from './table/index.js';
import { TableRow } from './table-row/index.js';
import { TableCell } from './table-cell/index.js';
import { TableHeader } from './table-header/index.js';
import { DocumentIndex } from './document-index/index.js';
import { IndexEntry } from './index-entry/index.js';
import { Placeholder } from './placeholder/index.js';
import { DropCursor } from './dropcursor/index.js';
import { BlockNode } from './block-node/index.js';
import { FieldAnnotation } from './field-annotation/index.js';
import { fieldAnnotationHelpers } from './field-annotation/index.js';
import { Image } from './image/index.js';
import { BookmarkStart } from './bookmarks/index.js';
import { BookmarkEnd } from './bookmarks/index.js';
import { PopoverPlugin } from './popover-plugin/index.js';
import { Mention } from './mention/index.js';
import { CollaborationCursor } from './collaboration-cursor/index.js';
import { TrackChanges } from './track-changes/index.js';
import { TrackInsert } from './track-changes/index.js';
import { TrackDelete } from './track-changes/index.js';
import { TrackFormat } from './track-changes/index.js';
import { CommentsMark } from './comment/index.js';
import { trackChangesHelpers } from './track-changes/index.js';
export function getStarterExtensions(): any[];
export function getRichTextExtensions(): (import("../core/Extension.js").Extension<{}, {
    storedStyle: import("./format-commands/format-commands.js").StoredStyle[] | null;
}> | import("../core/Node.js").Node<{}, Record<string, never>, Record<string, unknown>> | import("../core/Mark.js").Mark<{
    htmlAttributes: {};
}, Record<string, never>, {
    styleId: unknown;
    vertAlign: unknown;
    position: unknown;
}> | import("../core/Mark.js").Mark<{
    htmlAttributes: {};
}, Record<string, never>, {
    value: unknown;
}> | import("../core/Mark.js").Mark<{
    htmlAttributes: {};
}, Record<string, never>, {
    underlineType: unknown;
    underlineColor: unknown;
}> | import("../core/Mark.js").Mark<{
    htmlAttributes: {};
}, Record<string, never>, {
    color: unknown;
}> | import("../core/Mark.js").Mark<{
    protocols: string[];
    htmlAttributes: {
        target: any;
        rel: string;
        class: any;
        title: any;
    };
}, Record<string, never>, {
    href: unknown;
    target: unknown;
    rel: unknown;
    rId: unknown;
    text: unknown;
    name: unknown;
    history: unknown;
    anchor: unknown;
    docLocation: unknown;
    tooltip: unknown;
}> | import("../core/Mark.js").Mark<{
    htmlAttributes: {
        class: string;
    };
}, Record<string, never>, {
    id: unknown;
    author: unknown;
    authorEmail: unknown;
    authorImage: unknown;
    date: unknown;
    importedAuthor: unknown;
}> | import("../core/Extension.js").Extension<{}, Record<string, never>>)[];
import { AiMark } from './ai/index.js';
import { AiAnimationMark } from './ai/index.js';
import { AiLoaderNode } from './ai/index.js';
import { AiPlugin } from './ai/index.js';
import { Search } from './search/index.js';
import { StructuredContent } from './structured-content/index.js';
import { StructuredContentBlock } from './structured-content/index.js';
import { StructuredContentCommands } from './structured-content/index.js';
import { DocumentSection } from './structured-content/index.js';
import { NodeResizer } from './noderesizer/index.js';
import { CustomSelection } from './custom-selection/index.js';
import { TextTransform } from './text-transform/index.js';
import { VectorShape } from './vector-shape/index.js';
import { ShapeGroup } from './shape-group/index.js';
import { PassthroughInline } from '@extensions/passthrough/index.js';
import { PassthroughBlock } from '@extensions/passthrough/index.js';
import { PermissionRanges } from './permission-ranges/index.js';
export { History, Heading, Document, Text, Run, Paragraph, CommentRangeStart, CommentRangeEnd, CommentReference, FootnoteReference, TabNode, LineBreak, HardBreak, Bold, Italic, Underline, Highlight, Strike, Color, FontFamily, FontSize, TextAlign, TextStyle, FormatCommands, CommentsPlugin, Gapcursor, Table, TableRow, TableCell, TableHeader, DocumentIndex, IndexEntry, Placeholder, DropCursor, BlockNode, FieldAnnotation, fieldAnnotationHelpers, Image, BookmarkStart, BookmarkEnd, PopoverPlugin, Mention, Collaboration, CollaborationCursor, TrackChanges, TrackInsert, TrackDelete, TrackFormat, CommentsMark, trackChangesHelpers, AiMark, AiAnimationMark, AiLoaderNode, AiPlugin, Search, StructuredContent, StructuredContentBlock, StructuredContentCommands, DocumentSection, NodeResizer, CustomSelection, TextTransform, VectorShape, ShapeGroup, PassthroughInline, PassthroughBlock, PermissionRanges };
//# sourceMappingURL=index.d.ts.map