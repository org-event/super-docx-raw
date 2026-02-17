import type { EditorState, Transaction, Plugin } from 'prosemirror-state';
import type { EditorView as PmEditorView } from 'prosemirror-view';
import type { Node as PmNode, Schema } from 'prosemirror-model';
import type { EditorOptions, User, FieldValue, DocxFileEntry } from './types/EditorConfig.js';
import type { EditorHelpers, ExtensionStorage, ProseMirrorJSON, PageStyles, Toolbar } from './types/EditorTypes.js';
import type { ChainableCommandObject, CanObject, EditorCommands } from './types/ChainedCommands.js';
import type { EditorEventMap, Comment } from './types/EditorEvents.js';
import type { SchemaSummaryJSON } from './types/EditorSchema.js';
import { EventEmitter } from './EventEmitter.js';
import { ExtensionService } from './ExtensionService.js';
import { SuperConverter } from '@core/super-converter/SuperConverter.js';
import { PresentationEditor } from './presentation-editor/index.js';
/**
 * Editor lifecycle state.
 *
 * State machine:
 * ```
 * initialized -> documentLoading -> ready <-> saving
 *                                     |
 *                                     v
 *                                  closed -> documentLoading -> ready
 *                                     |
 *                                     v
 *                                 destroyed
 * ```
 */
export type EditorLifecycleState = 'initialized' | 'documentLoading' | 'ready' | 'saving' | 'closed' | 'destroyed';
/**
 * Options for opening a document.
 */
export interface OpenOptions {
    /** Document mode ('docx', 'text', 'html') */
    mode?: 'docx' | 'text' | 'html';
    /** HTML content to initialize with (for text/html mode) */
    html?: string;
    /** Markdown content to initialize with */
    markdown?: string;
    /** JSON content to initialize with */
    json?: ProseMirrorJSON | null;
    /** Whether comments are enabled */
    isCommentsEnabled?: boolean;
    /** Prevent default styles from being applied in docx mode */
    suppressDefaultDocxStyles?: boolean;
    /** Document mode ('editing', 'viewing', 'suggesting') */
    documentMode?: 'editing' | 'viewing' | 'suggesting';
    /** Pre-parsed docx content (for when document is already loaded) */
    content?: unknown;
    /** Media files from docx */
    mediaFiles?: Record<string, unknown>;
    /** Font data from docx */
    fonts?: Record<string, unknown>;
}
/**
 * Options for saving a document.
 */
export interface SaveOptions {
    /** Whether this is the final document version */
    isFinalDoc?: boolean;
    /** Comment export type */
    commentsType?: string;
    /** Comments to include in export */
    comments?: Array<{
        id: string;
        [key: string]: unknown;
    }>;
    /** Highlight color for fields */
    fieldsHighlightColor?: string | null;
}
/**
 * Options for exporting a document.
 * Currently identical to SaveOptions, but may be extended in the future
 * with format-specific options (e.g., format?: 'docx' | 'json' | 'xml').
 */
export type ExportOptions = SaveOptions;
/**
 * Main editor class that manages document state, extensions, and user interactions
 */
export declare class Editor extends EventEmitter<EditorEventMap> {
    #private;
    /**
     * Service for managing extensions
     */
    extensionService: ExtensionService;
    /**
     * Storage for extension data
     */
    extensionStorage: ExtensionStorage;
    /**
     * ProseMirror schema for the editor
     */
    schema: Schema;
    /**
     * ProseMirror view instance.
     * Undefined in headless mode or before the editor is mounted.
     */
    view?: PmEditorView;
    /**
     * ProseMirror editor state (exists with or without a view)
     */
    private _state;
    /**
     * Active PresentationEditor instance when layout mode is enabled.
     * Set by PresentationEditor constructor to enable renderer-neutral helpers.
     */
    presentationEditor: PresentationEditor | null;
    /**
     * Whether the editor currently has focus
     */
    isFocused: boolean;
    /**
     * All the embedded fonts that were imported by the Editor
     */
    fontsImported: string[];
    /**
     * The document converter instance
     */
    converter: SuperConverter;
    /**
     * Toolbar instance (if attached)
     */
    toolbar?: Toolbar;
    /**
     * Original state for preview mode
     */
    originalState?: EditorState;
    /**
     * High contrast mode setter
     */
    setHighContrastMode?: (enabled: boolean) => void;
    options: EditorOptions;
    /**
     * Create a new Editor instance.
     *
     * **Legacy mode (backward compatible):**
     * When `content` or `fileSource` is provided, the editor initializes synchronously
     * with the document loaded immediately. This preserves existing behavior where
     * `editor.view` is available right after construction.
     *
     * **New mode (document lifecycle API):**
     * When no `content` or `fileSource` is provided, only core services (extensions,
     * commands, schema) are initialized. Call `editor.open()` to load a document.
     *
     * @param options - Editor configuration options
     *
     * @example
     * ```typescript
     * // Legacy mode (still works)
     * const editor = new Editor({ content: docx, element: el });
     * console.log(editor.view.state.doc); // Works immediately
     *
     * // New mode
     * const editor = new Editor({ element: el });
     * await editor.open('/path/to/doc.docx');
     * ```
     */
    constructor(options: Partial<EditorOptions>);
    /**
     * Getter which indicates if any changes happen in Editor
     */
    get docChanged(): boolean;
    mount(el: HTMLElement | null): void;
    unmount(): void;
    /**
     * Set the toolbar for this editor
     */
    setToolbar(toolbar: Toolbar): void;
    /**
     * Check if web layout mode is enabled (OOXML ST_View 'web')
     */
    isWebLayout(): boolean;
    /**
     * Focus the editor.
     */
    focus(): void;
    /**
     * Get the editor state
     */
    get state(): EditorState;
    /**
     * Get the current editor lifecycle state.
     *
     * @returns The current lifecycle state ('initialized', 'documentLoading', 'ready', 'saving', 'closed', 'destroyed')
     */
    get lifecycleState(): EditorLifecycleState;
    /**
     * Get the source path of the currently opened document.
     *
     * Returns the file path if the document was opened from a path (Node.js),
     * or null if opened from a Blob/Buffer or created as a blank document.
     *
     * In browsers, this is only a suggested filename, not an actual filesystem path.
     */
    get sourcePath(): string | null;
    /**
     * Replace the editor state entirely.
     *
     * Use this method when you need to set a completely new EditorState
     * (e.g., in tests or when loading a new document). For incremental
     * changes, prefer using transactions via `editor.dispatch()` or commands.
     *
     * **Important:** This method bypasses the transaction system entirely.
     * No transaction events will be emitted, no history entries will be created,
     * and plugins will not receive transaction metadata. Use `editor.dispatch()`
     * with transactions for changes that should be undoable or tracked.
     *
     * @param newState - The new EditorState to set
     *
     * @example
     * ```typescript
     * const newState = EditorState.create({
     *   schema: editor.schema,
     *   doc: newDoc,
     *   plugins: editor.state.plugins,
     * });
     * editor.setState(newState);
     * ```
     */
    setState(newState: EditorState): void;
    /**
     * Get the editor storage.
     */
    get storage(): ExtensionStorage;
    /**
     * Get object of registered commands.
     */
    get commands(): EditorCommands;
    /**
     * Get extension helpers.
     */
    get helpers(): EditorHelpers;
    /**
     * Check if the editor is editable.
     */
    get isEditable(): boolean;
    /**
     * Check if editor is destroyed.
     */
    get isDestroyed(): boolean;
    /**
     * Get the editor element
     */
    get element(): HTMLElement | null;
    /**
     * Get possible users of the editor.
     */
    get users(): User[];
    /**
     * Create a chain of commands to call multiple commands at once.
     */
    chain(): ChainableCommandObject;
    /**
     * Check if a command or a chain of commands can be executed. Without executing it.
     */
    can(): CanObject;
    /**
     * Set the document mode
     * @param documentMode - The document mode ('editing', 'viewing', 'suggesting')
     * @param _caller - Calling context (unused)
     */
    setDocumentMode(documentMode: string, _caller?: string): void;
    /**
     * Blur the editor.
     */
    blur(): void;
    /**
     * Check if editor has focus
     */
    hasFocus(): boolean;
    /**
     * Get viewport coordinates for a document position. Falls back to the PresentationEditor
     * when running without a ProseMirror view (layout mode).
     */
    coordsAtPos(pos: number): ReturnType<PmEditorView['coordsAtPos']> | null;
    /**
     * Get the DOM element for a document position.
     * In presentation mode, returns the painted element.
     */
    getElementAtPos(pos: number, options?: {
        forceRebuild?: boolean;
        fallbackToCoords?: boolean;
    }): HTMLElement | null;
    /**
     * Get position from client-space coordinates.
     * In layout/presentation mode, uses PresentationEditor hit testing for accurate coordinate mapping.
     * Falls back to ProseMirror view for standard editing mode.
     */
    posAtCoords(coords: Parameters<PmEditorView['posAtCoords']>[0]): ReturnType<PmEditorView['posAtCoords']>;
    /**
     * Export the yjs binary from the current state.
     */
    generateCollaborationUpdate(): Promise<Uint8Array>;
    /**
     * Initialize data for collaborative editing
     * If we are replacing data and have a valid provider, listen for synced event
     * so that we can initialize the data
     */
    initializeCollaborationData(): void;
    /**
     * Replace content of editor that was created with loadFromSchema option
     * Used to replace content of other header/footer when one of it was edited
     *
     * @param content - new editor content json (retrieved from editor.getUpdatedJson)
     */
    replaceContent(content: ProseMirrorJSON): void;
    /**
     * Set editor options and update state.
     */
    setOptions(options?: Partial<EditorOptions>): void;
    /**
     * Set whether the editor is editable.
     *
     * When setting to non-editable, this method:
     * - Forces ProseMirror to re-evaluate the editable prop from the Editable plugin
     * - Blurs the editor to remove the cursor
     *
     * @param editable - Whether the editor should accept user input (default: true)
     * @param emitUpdate - Whether to emit an update event after changing editability (default: true)
     */
    setEditable(editable?: boolean, emitUpdate?: boolean): void;
    /**
     * Register PM plugin.
     * @param plugin PM plugin.
     * @param handlePlugins Optional function for handling plugin merge.
     */
    registerPlugin(plugin: Plugin, handlePlugins?: (plugin: Plugin, plugins: Plugin[]) => Plugin[]): void;
    /**
     * Unregister a PM plugin
     */
    unregisterPlugin(nameOrPluginKey: string | {
        key?: string;
    }): void;
    /**
     * Load the data from DOCX to be used in the schema.
     * Expects a DOCX file.
     * @param fileSource - The DOCX file to load (File/Blob in browser, Buffer in Node.js)
     * @param isNode - Whether the method is being called in a Node.js environment
     * @returns A promise that resolves to an array containing:
     *   - [0] xmlFiles - Array of XML files extracted from the DOCX
     *   - [1] mediaFiles - Object containing media files with URLs (browser only)
     *   - [2] mediaFiles - Object containing media files with base64 data
     *   - [3] fonts - Object containing font files from the DOCX
     */
    static loadXmlData(fileSource: File | Blob | Buffer, isNode?: boolean): Promise<[DocxFileEntry[], Record<string, unknown>, Record<string, unknown>, Record<string, unknown>] | undefined>;
    /**
     * Get the document version
     */
    static getDocumentVersion(doc: DocxFileEntry[]): string;
    /**
     * Set the document version
     */
    static setDocumentVersion(doc: DocxFileEntry[], version: string): string;
    /**
     * Get the document GUID
     */
    static getDocumentGuid(doc: DocxFileEntry[]): string | null;
    /**
     * @deprecated use setDocumentVersion instead
     */
    static updateDocumentVersion(doc: DocxFileEntry[], version: string): string;
    /**
     * Generates a schema summary for the current runtime schema.
     */
    getSchemaSummaryJSON(): Promise<SchemaSummaryJSON>;
    /**
     * Validates a ProseMirror JSON document against the current schema.
     */
    validateJSON(doc: ProseMirrorJSON | ProseMirrorJSON[]): PmNode | PmNode[];
    /**
     * Creates all node views.
     */
    createNodeViews(): void;
    /**
     * Get the maximum content size based on page dimensions and margins
     * @returns Size object with width and height in pixels, or empty object if no page size
     * @note In web layout mode, returns empty object to skip content constraints.
     *       CSS max-width: 100% handles responsive display while preserving full resolution.
     */
    getMaxContentSize(): {
        width?: number;
        height?: number;
    };
    /**
     * Attach styles and attributes to the editor element
     */
    updateEditorStyles(element: HTMLElement, proseMirror: HTMLElement): void;
    /**
     * Initialize default styles for the editor container and ProseMirror.
     * Get page size and margins from the converter.
     * Set document default font and font size.
     *
     * @param element - The DOM element to apply styles to
     */
    initDefaultStyles(element?: HTMLElement | null): void;
    /**
     * Initializes responsive styles for mobile devices.
     * Sets up scaling based on viewport width and handles orientation changes.
     */
    initMobileStyles(element: HTMLElement | null): void;
    /**
     * Public dispatch method for transaction dispatching.
     *
     * Allows external callers (e.g., SuperDoc stores, headless workflows) to dispatch
     * transactions without accessing editor.view directly. This method works in both
     * mounted and headless modes.
     *
     * In headless mode, this is the primary way to apply state changes since there is
     * no ProseMirror view to dispatch through.
     *
     * @param tr - The ProseMirror transaction to dispatch
     *
     * @example
     * ```typescript
     * // Headless mode: insert text without a view
     * const editor = new Editor({ isHeadless: true, content: docx });
     * editor.dispatch(editor.state.tr.insertText('Hello'));
     * ```
     */
    dispatch(tr: Transaction): void;
    /**
     * Get document identifier (async - may generate hash)
     */
    getDocumentIdentifier(): Promise<string | null>;
    /**
     * Get permanent document GUID (sync - only for modified documents)
     */
    getDocumentGuid(): string | null;
    /**
     * Check if document has been modified
     */
    isDocumentModified(): boolean;
    /**
     * @deprecated use getDocumentGuid instead
     */
    getDocumentId(): string | null;
    /**
     * Get attrs of the currently selected node or mark.
     * @example
     * editor.getAttributes('textStyle').color
     */
    getAttributes(nameOrType: string): Record<string, unknown>;
    /**
     * Returns if the currently selected node or mark is active.
     * @param nameOrAttributes - The name of the node/mark or an attributes object
     * @param attributesOrUndefined - Optional attributes to check when first parameter is a name
     * @example
     * editor.isActive('bold')
     * editor.isActive('textStyle', { color: 'purple' })
     * editor.isActive({ textAlign: 'center' })
     */
    isActive(nameOrAttributes: string | Record<string, unknown>, attributesOrUndefined?: Record<string, unknown>): boolean;
    /**
     * Get the editor content as JSON
     */
    getJSON(): ProseMirrorJSON;
    /**
     * Get document metadata including GUID, modification status, and version
     */
    getMetadata(): {
        documentGuid: string | null;
        isModified: boolean;
        version: string | null;
    };
    /**
     * Get the editor content as HTML
     */
    getHTML({ unflattenLists }?: {
        unflattenLists?: boolean;
    }): string;
    /**
     * Get the editor content as Markdown
     */
    getMarkdown(): Promise<string>;
    /**
     * Get the document version from the converter
     */
    getDocumentVersion(): string | null;
    /**
     * Create a child editor linked to this editor.
     * This is useful for creating header/footer editors that are linked to the main editor.
     * Or paragraph fields that rely on the same underlying document and list defintions
     */
    createChildEditor(options: Partial<EditorOptions>): Editor;
    /**
     * Get page styles
     */
    getPageStyles(): PageStyles;
    /**
     * Update page styles
     */
    updatePageStyle({ pageMargins }: {
        pageMargins?: Record<string, unknown>;
    }): void;
    migrateListsToV2(): Array<{
        from: number;
        to: number;
        slice: unknown;
    }>;
    getUpdatedJson(): ProseMirrorJSON;
    /**
     * Export the editor document to DOCX.
     */
    exportDocx({ isFinalDoc, commentsType, exportJsonOnly, exportXmlOnly, comments, getUpdatedDocs, fieldsHighlightColor, }?: {
        isFinalDoc?: boolean;
        commentsType?: string;
        exportJsonOnly?: boolean;
        exportXmlOnly?: boolean;
        comments?: Comment[];
        getUpdatedDocs?: boolean;
        fieldsHighlightColor?: string | null;
    }): Promise<Blob | ArrayBuffer | Buffer | Record<string, string> | ProseMirrorJSON | string | undefined>;
    /**
     * Open a document in the editor.
     *
     * @param source - Document source:
     *   - `string` - File path (Node.js reads from disk, browser fetches URL)
     *   - `File | Blob` - Browser file object
     *   - `Buffer` - Node.js buffer
     *   - `undefined` - Creates a blank document
     * @param options - Document options (mode, comments, etc.)
     * @returns Promise that resolves when document is loaded
     *
     * @throws {InvalidStateError} If editor is not in 'initialized' or 'closed' state
     * @throws {DocumentLoadError} If document loading fails
     *
     * @example
     * ```typescript
     * const editor = new Editor({ element: myDiv });
     *
     * // Open from file path (Node.js)
     * await editor.open('/path/to/document.docx');
     *
     * // Open from File object (browser)
     * await editor.open(fileInput.files[0]);
     *
     * // Open blank document
     * await editor.open();
     *
     * // Open with options
     * await editor.open('/path/to/doc.docx', { isCommentsEnabled: true });
     * ```
     */
    open(source?: string | File | Blob | Buffer, options?: OpenOptions): Promise<void>;
    /**
     * Static factory method for one-liner document opening.
     * Creates an Editor instance and opens the document in one call.
     *
     * Smart defaults enable minimal configuration:
     * - No element/selector → headless mode
     * - No extensions → uses getStarterExtensions() for docx, getRichTextExtensions() for text/html
     * - No mode → defaults to 'docx'
     *
     * @param source - Document source (path, File, Blob, Buffer, or undefined for blank)
     * @param config - Combined editor and document options (all optional)
     * @returns Promise resolving to the ready Editor instance
     *
     * @example
     * ```typescript
     * // Minimal headless usage - just works!
     * const editor = await Editor.open('/path/to/doc.docx');
     *
     * // With options
     * const editor = await Editor.open('/path/to/doc.docx', {
     *   isCommentsEnabled: true,
     * });
     *
     * // With UI element (automatically not headless)
     * const editor = await Editor.open('/path/to/doc.docx', {
     *   element: document.getElementById('editor'),
     * });
     *
     * // Blank document
     * const editor = await Editor.open();
     * ```
     */
    static open(source?: string | File | Blob | Buffer, config?: Partial<EditorOptions> & OpenOptions): Promise<Editor>;
    /**
     * Close the current document.
     *
     * This unloads the document but keeps the editor instance alive.
     * The editor can be reused by calling `open()` again.
     *
     * This method is idempotent - calling it when already closed is a no-op.
     *
     * @example
     * ```typescript
     * await editor.open('/doc1.docx');
     * // ... work with document ...
     * editor.close();
     *
     * await editor.open('/doc2.docx');  // Reuse the same editor
     * ```
     */
    close(): void;
    /**
     * Save the document to the original source path.
     *
     * Only works if the document was opened from a file path.
     * If opened from Blob/Buffer or created blank, use `saveTo()` or `exportDocument()`.
     *
     * @param options - Save options (comments, final doc, etc.)
     * @throws {InvalidStateError} If editor is not in 'ready' state
     * @throws {NoSourcePathError} If no source path is available
     * @throws {FileSystemNotAvailableError} If file system access is not available
     *
     * @example
     * ```typescript
     * const editor = await Editor.open('/path/to/doc.docx');
     * // ... make changes ...
     * await editor.save();  // Saves back to /path/to/doc.docx
     * ```
     */
    save(options?: SaveOptions): Promise<void>;
    /**
     * Save the document to a specific path.
     *
     * Updates the source path to the new location after saving.
     *
     * @param path - File path to save to
     * @param options - Save options
     * @throws {InvalidStateError} If editor is not in 'ready' state
     * @throws {FileSystemNotAvailableError} If file system access is not available
     *
     * @example
     * ```typescript
     * const editor = await Editor.open(blobData);  // No source path
     * await editor.saveTo('/path/to/new-doc.docx');
     * await editor.save();  // Now saves to /path/to/new-doc.docx
     * ```
     */
    saveTo(path: string, options?: SaveOptions): Promise<void>;
    /**
     * Export the document as a Blob or Buffer.
     *
     * This is a convenience wrapper around `exportDocx()` that returns
     * the document data without writing to a file.
     *
     * @param options - Export options
     * @returns Promise resolving to Blob (browser) or Buffer (Node.js)
     * @throws {InvalidStateError} If editor is not in 'ready' state
     *
     * @example
     * ```typescript
     * const blob = await editor.exportDocument();
     *
     * // Create download link in browser
     * const url = URL.createObjectURL(blob);
     * const a = document.createElement('a');
     * a.href = url;
     * a.download = 'document.docx';
     * a.click();
     * ```
     */
    exportDocument(options?: ExportOptions): Promise<Blob | Buffer>;
    /**
     * Destroy the editor and clean up resources
     */
    destroy(): void;
    destroyHeaderFooterEditors(): void;
    /**
     * Check if migrations are needed for the data
     */
    static checkIfMigrationsNeeded(): boolean;
    /**
     * Process collaboration migrations
     */
    processCollaborationMigrations(): unknown | void;
    /**
     * Replace the current file
     */
    replaceFile(newFile: File | Blob | Buffer): Promise<void>;
    /**
     * Get internal docx file content
     * @param name - File name
     * @param type - type of result (json, string)
     */
    getInternalXmlFile(name: string, type?: 'json' | 'string'): unknown | string | null;
    /**
     * Update internal docx file content
     * @param name - File name
     * @param updatedContent - new file content
     */
    updateInternalXmlFile(name: string, updatedContent: string | unknown): void;
    /**
     * Get all nodes of a specific type
     */
    getNodesOfType(type: string): Array<{
        node: PmNode;
        pos: number;
    }>;
    /**
     * Replace a node with HTML content
     */
    replaceNodeWithHTML(targetNode: {
        node: PmNode;
        pos: number;
    }, html: string): void;
    /**
     * A command to prepare the editor to receive annotations. This will
     * pre-process the document as needed prior to running in the annotator.
     *
     * Currently this is only used for table generation but additional pre-processing can be done here.
     */
    prepareForAnnotations(annotationValues?: FieldValue[]): void;
    /**
     * Migrate paragraph fields to lists V2 structure if necessary.
     * @param annotationValues - List of field values to migrate.
     * @returns Returns a promise that resolves to the migrated values
     */
    migrateParagraphFields(annotationValues?: FieldValue[]): Promise<FieldValue[]>;
    /**
     * Annotate the document with the given annotation values.
     */
    annotate(annotationValues?: FieldValue[], hiddenIds?: string[], removeEmptyFields?: boolean): void;
    /**
     * Preview annotations in the editor. It stores a copy of the original state.
     * This can be reverted via closePreview()
     */
    previewAnnotations(annotationValues?: FieldValue[], hiddenIds?: string[]): void;
    /**
     * If there is a preview active, this will revert the editor to the original state.
     */
    closePreview(): void;
}
//# sourceMappingURL=Editor.d.ts.map