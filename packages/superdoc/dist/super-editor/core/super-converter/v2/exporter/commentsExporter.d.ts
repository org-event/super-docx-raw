export function prepareCommentParaIds(comment: any): any;
export function getCommentDefinition(comment: any, commentId: string, allComments: any, editor: any): any;
export function getInitials(name: string): string | null;
export function toIsoNoFractional(unixMillis: number): string;
export function updateCommentsXml(commentDefs: any[], commentsXml: any): any;
export function determineExportStrategy(comments: any): "word" | "google-docs" | "unknown";
export function updateCommentsExtendedXml(comments: any, commentsExtendedXml: any, threadingProfile?: import("@superdoc/common").CommentThreadingProfile | "word" | "google-docs" | "unknown"): any | null;
export function updateCommentsIdsAndExtensible(comments: any, commentsIds: any, extensible: any): any;
export function updateDocumentRels(): any;
export function generateConvertedXmlWithCommentFiles(convertedXml: any, fileSet?: any): any;
export function getCommentsFilesConverted(converter: any, convertedXml: any): any;
export function removeCommentsFilesFromConvertedXml(convertedXml: any): any;
export function generateRelationship(target: string): any;
export function prepareCommentsXmlFilesForExport({ convertedXml, defs, commentsWithParaIds, exportType, threadingProfile, }: any): {
    documentXml: any;
    relationships: any[];
};
//# sourceMappingURL=commentsExporter.d.ts.map