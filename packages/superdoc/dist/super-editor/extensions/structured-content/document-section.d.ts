/**
 * Document section creation options
 * @typedef {Object} SectionCreate
 * @property {number} [id] - Unique ID. Auto-increments from existing sections if omitted
 * @property {string} [title="Document section"] - Label shown in section header
 * @property {string} [description] - Metadata for tracking (stored in Word's w:tag)
 * @property {string} [sectionType] - Business classification
 * @property {boolean} [isLocked=false] - Prevent editing when true
 * @property {string} [html] - HTML content to insert
 * @property {Object} [json] - ProseMirror JSON (overrides html if both provided)
 */
/**
 * Update an existing section
 * @typedef {Object} SectionUpdate
 * @property {number} id - Target section ID (required)
 * @property {string} [html] - Replace content with HTML
 * @property {Object} [json] - Replace content with ProseMirror JSON (overrides html)
 * @property {Partial<DocumentSectionAttributes>} [attrs] - Update attributes only (preserves content)
 */
/**
 * Configuration options for DocumentSection
 * @typedef {Object} DocumentSectionOptions
 * @category Options
 * @property {Object} [htmlAttributes] - HTML attributes for document sections
 */
/**
 * Attributes for document section nodes
 * @typedef {Object} DocumentSectionAttributes
 * @category Attributes
 * @property {number} [id] - Unique section identifier
 * @property {string} [title] - Section display label (becomes w:alias in Word)
 * @property {string} [description] - Additional metadata stored in w:tag
 * @property {string} [sectionType] - Business type for filtering/logic (e.g., 'legal', 'pricing')
 * @property {boolean} [isLocked=false] - Lock state (maps to w:lock="sdtContentLocked")
 * @property {string} [sdBlockId] @internal - Internal block tracking
 */
/**
 * @module DocumentSection
 * @sidebarTitle Document Section
 * @snippetPath /snippets/extensions/document-section.mdx
 */
export const DocumentSection: Node<Record<string, never>, Record<string, never>, Record<string, unknown>>;
/**
 * Document section creation options
 */
export type SectionCreate = {
    /**
     * - Unique ID. Auto-increments from existing sections if omitted
     */
    id?: number;
    /**
     * - Label shown in section header
     */
    title?: string;
    /**
     * - Metadata for tracking (stored in Word's w:tag)
     */
    description?: string;
    /**
     * - Business classification
     */
    sectionType?: string;
    /**
     * - Prevent editing when true
     */
    isLocked?: boolean;
    /**
     * - HTML content to insert
     */
    html?: string;
    /**
     * - ProseMirror JSON (overrides html if both provided)
     */
    json?: any;
};
/**
 * Update an existing section
 */
export type SectionUpdate = {
    /**
     * - Target section ID (required)
     */
    id: number;
    /**
     * - Replace content with HTML
     */
    html?: string;
    /**
     * - Replace content with ProseMirror JSON (overrides html)
     */
    json?: any;
    /**
     * - Update attributes only (preserves content)
     */
    attrs?: Partial<DocumentSectionAttributes>;
};
/**
 * Configuration options for DocumentSection
 */
export type DocumentSectionOptions = any;
/**
 * Attributes for document section nodes
 */
export type DocumentSectionAttributes = any;
import { Node } from '@core/index.js';
//# sourceMappingURL=document-section.d.ts.map