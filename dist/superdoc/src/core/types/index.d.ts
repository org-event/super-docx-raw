/**
 * The current user of this superdoc
 */
export type User = {
    /**
     * The user's name
     */
    name: string;
    /**
     * The user's email
     */
    email: string;
    /**
     * The user's photo
     */
    image?: string | null | undefined;
};
export type Document = {
    /**
     * The ID of the document
     */
    id?: string | undefined;
    /**
     * The type of the document
     */
    type: string;
    /**
     * The initial data of the document (File, Blob, or null)
     */
    data?: File | Blob | null | undefined;
    /**
     * The name of the document
     */
    name?: string | undefined;
    /**
     * The URL of the document
     */
    url?: string | undefined;
    /**
     * Whether the document is a new file
     */
    isNewFile?: boolean | undefined;
    /**
     * The Yjs document for collaboration
     */
    ydoc?: import('yjs').Doc | undefined;
    /**
     * The provider for collaboration
     */
    provider?: import('@hocuspocus/provider').HocuspocusProvider | undefined;
};
/**
 * External collaboration provider interface
 * Accepts any Yjs-compatible provider (HocuspocusProvider, LiveblocksYjsProvider, TiptapCollabProvider, etc.)
 */
export type CollaborationProvider = {
    /**
     * The Yjs awareness instance (optional, may be null)
     */
    awareness?: Object | undefined;
    /**
     * Event listener
     */
    on?: ((event: string, handler: Function) => void) | undefined;
    /**
     * Event unsubscriber
     */
    off?: ((event: string, handler: Function) => void) | undefined;
    /**
     * Disconnect from the provider
     */
    disconnect?: (() => void) | undefined;
    /**
     * Destroy the provider
     */
    destroy?: (() => void) | undefined;
    /**
     * Whether the provider has synced
     */
    synced?: boolean | undefined;
    /**
     * Alternative sync property (used by some providers)
     */
    isSynced?: boolean | undefined;
};
/**
 * Collaboration module configuration
 */
export type CollaborationConfig = {
    /**
     * External Yjs document (provider-agnostic mode)
     */
    ydoc?: Object | undefined;
    /**
     * External collaboration provider (provider-agnostic mode)
     */
    provider?: CollaborationProvider | undefined;
    /**
     * Internal provider type (deprecated)
     */
    providerType?: "superdoc" | "hocuspocus" | undefined;
    /**
     * WebSocket URL for internal provider (deprecated)
     */
    url?: string | undefined;
    /**
     * Authentication token for internal provider (deprecated)
     */
    token?: string | undefined;
    /**
     * Additional params for internal provider (deprecated)
     */
    params?: Object | undefined;
};
export type Modules = {
    /**
     * Comments module configuration (false to disable)
     */
    comments?: false | Object | undefined;
    /**
     * Custom permission resolver for comment actions
     */
    permissionResolver?: ((params: {
        permission: string;
        role?: string;
        isInternal?: boolean;
        comment?: Object | null;
        trackedChange?: Object | null;
        currentUser?: User | null;
        superdoc?: SuperDoc | null;
    }) => boolean | undefined) | undefined;
    /**
     * Comment highlight colors (internal/external and active overrides)
     */
    highlightColors?: {
        /**
         * Base highlight color for internal comments
         */
        internal?: string | undefined;
        /**
         * Base highlight color for external comments
         */
        external?: string | undefined;
        /**
         * Active highlight color override for internal comments
         */
        activeInternal?: string | undefined;
        /**
         * Active highlight color override for external comments
         */
        activeExternal?: string | undefined;
    } | undefined;
    /**
     * Comment highlight opacity values (0-1)
     */
    highlightOpacity?: {
        /**
         * Opacity for active comment highlight
         */
        active?: number | undefined;
        /**
         * Opacity for inactive comment highlight
         */
        inactive?: number | undefined;
    } | undefined;
    /**
     * Hover highlight color for comment marks
     */
    highlightHoverColor?: string | undefined;
    /**
     * Track change highlight colors
     */
    trackChangeHighlightColors?: {
        /**
         * Border color for inserted text highlight
         */
        insertBorder?: string | undefined;
        /**
         * Background color for inserted text highlight
         */
        insertBackground?: string | undefined;
        /**
         * Border color for deleted text highlight
         */
        deleteBorder?: string | undefined;
        /**
         * Background color for deleted text highlight
         */
        deleteBackground?: string | undefined;
        /**
         * Border color for format change highlight
         */
        formatBorder?: string | undefined;
    } | undefined;
    /**
     * Active track change highlight colors (defaults to trackChangeHighlightColors)
     */
    trackChangeActiveHighlightColors?: {
        /**
         * Active border color for inserted text highlight
         */
        insertBorder?: string | undefined;
        /**
         * Active background color for inserted text highlight
         */
        insertBackground?: string | undefined;
        /**
         * Active border color for deleted text highlight
         */
        deleteBorder?: string | undefined;
        /**
         * Active background color for deleted text highlight
         */
        deleteBackground?: string | undefined;
        /**
         * Active border color for format change highlight
         */
        formatBorder?: string | undefined;
    } | undefined;
    /**
     * AI module configuration
     */
    ai?: {
        /**
         * Harbour API key for AI features
         */
        apiKey?: string | undefined;
        /**
         * Custom endpoint URL for AI services
         */
        endpoint?: string | undefined;
    } | undefined;
    /**
     * Collaboration module configuration
     */
    collaboration?: CollaborationConfig | undefined;
    /**
     * Toolbar module configuration
     */
    toolbar?: Object | undefined;
    /**
     * Slash menu module configuration
     */
    slashMenu?: {
        /**
         * Array of custom menu sections with items
         */
        customItems?: any[] | undefined;
        /**
         * Function to customize menu items
         */
        menuProvider?: Function | undefined;
        /**
         * Whether to include default menu items
         */
        includeDefaultItems?: boolean | undefined;
    } | undefined;
};
export type Editor = import('../../../../super-editor/src/index.js').Editor;
export type SuperDoc = import('../SuperDoc.js').SuperDoc;
export type DocumentMode = "editing" | "viewing" | "suggesting";
export type ExportType = "docx" | "pdf" | "html";
/**
 * - 'external': Include only external comments (default)
 * - 'clean': Export without any comments
 */
export type CommentsType = "external" | "clean";
/**
 * Document view layout values - mirrors OOXML ST_View (ECMA-376 §17.18.102)
 * - 'print': Print Layout View - displays document as it prints (default)
 * - 'web': Web Page View - content reflows to fit container (mobile/accessibility)
 */
export type ViewLayout = "print" | "web";
/**
 * Document view options for controlling how the document is displayed.
 * Mirrors OOXML document view settings.
 */
export type ViewOptions = {
    /**
     * Document view layout (OOXML ST_View compatible)
     */
    layout?: ViewLayout | undefined;
};
export type ExportParams = {
    /**
     * - File formats to export
     */
    exportType?: ExportType[] | undefined;
    /**
     * - How to handle comments
     */
    commentsType?: CommentsType | undefined;
    /**
     * - Custom filename (without extension)
     */
    exportedName?: string | undefined;
    /**
     * - Auto-download or return blob
     */
    triggerDownload?: boolean | undefined;
    /**
     * - Color for field highlights
     */
    fieldsHighlightColor?: string | undefined;
};
export type Config = {
    /**
     * The ID of the SuperDoc
     */
    superdocId?: string | undefined;
    /**
     * The selector or element to mount the SuperDoc into
     */
    selector: string | HTMLElement;
    /**
     * The mode of the document
     */
    documentMode: DocumentMode;
    /**
     * The role of the user in this SuperDoc
     */
    role?: "editor" | "viewer" | "suggester" | undefined;
    /**
     * The document to load. If a string, it will be treated as a URL. If a File or Blob, it will be used directly.
     */
    document?: string | Object | File | Blob | undefined;
    /**
     * The documents to load -> Soon to be deprecated
     */
    documents?: Document[] | undefined;
    /**
     * The current user of this SuperDoc
     */
    user?: User | undefined;
    /**
     * All users of this SuperDoc (can be used for "@"-mentions)
     */
    users?: User[] | undefined;
    /**
     * Colors to use for user awareness
     */
    colors?: string[] | undefined;
    /**
     * Modules to load
     */
    modules?: Modules | undefined;
    /**
     * Top-level override for permission checks
     */
    permissionResolver?: ((params: {
        permission: string;
        role?: string;
        isInternal?: boolean;
        comment?: Object | null;
        trackedChange?: Object | null;
        currentUser?: User | null;
        superdoc?: SuperDoc | null;
    }) => boolean | undefined) | undefined;
    /**
     * Optional DOM element to render the toolbar in
     */
    toolbar?: string | undefined;
    /**
     * Toolbar groups to show
     */
    toolbarGroups?: string[] | undefined;
    /**
     * Icons to show in the toolbar
     */
    toolbarIcons?: Object | undefined;
    /**
     * Texts to override in the toolbar
     */
    toolbarTexts?: Object | undefined;
    /**
     * The font-family to use for all SuperDoc UI surfaces
     * (toolbar, comments UI, dropdowns, tooltips, etc.). This ensures consistent typography across the entire application
     * and helps match your application's design system. The value should be a valid CSS font-family string.
     * Example (system fonts):
     * uiDisplayFallbackFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
     * Example (custom font):
     * uiDisplayFallbackFont: '"Inter", Arial, sans-serif'
     */
    uiDisplayFallbackFont?: string | undefined;
    /**
     * Whether the SuperDoc is in development mode
     */
    isDev?: boolean | undefined;
    /**
     * Layout engine overrides passed through to PresentationEditor (page size, margins, virtualization, zoom, debug label, etc.)
     */
    layoutEngineOptions?: {
        /**
         * Optional override for paginated track-changes rendering (e.g., `{ mode: 'final' }` to force final view or `{ enabled: false }` to strip metadata entirely)
         */
        trackedChanges?: Object | undefined;
    } | undefined;
    /**
     * Callback before an editor is created
     */
    onEditorBeforeCreate?: ((editor: Editor) => void) | undefined;
    /**
     * Callback after an editor is created
     */
    onEditorCreate?: ((editor: Editor) => void) | undefined;
    /**
     * Callback when a transaction is made
     */
    onTransaction?: ((params: {
        editor: Editor;
        transaction: any;
        duration: number;
    }) => void) | undefined;
    /**
     * Callback after an editor is destroyed
     */
    onEditorDestroy?: (() => void) | undefined;
    /**
     * Callback when there is an error in the content
     */
    onContentError?: ((params: {
        error: object;
        editor: Editor;
        documentId: string;
        file: File;
    }) => void) | undefined;
    /**
     * Callback when the SuperDoc is ready
     */
    onReady?: ((editor: {
        superdoc: SuperDoc;
    }) => void) | undefined;
    /**
     * Callback when comments are updated
     */
    onCommentsUpdate?: ((params: {
        type: string;
        data: object;
    }) => void) | undefined;
    /**
     * Callback when awareness is updated
     */
    onAwarenessUpdate?: ((params: {
        context: SuperDoc;
        states: any[];
    }) => void) | undefined;
    /**
     * Callback when the SuperDoc is locked
     */
    onLocked?: ((params: {
        isLocked: boolean;
        lockedBy: User;
    }) => void) | undefined;
    /**
     * Callback when the PDF document is ready
     */
    onPdfDocumentReady?: (() => void) | undefined;
    /**
     * Callback when the sidebar is toggled
     */
    onSidebarToggle?: ((isOpened: boolean) => void) | undefined;
    /**
     * Callback when collaboration is ready
     */
    onCollaborationReady?: ((params: {
        editor: Editor;
    }) => void) | undefined;
    /**
     * Callback when document is updated
     */
    onEditorUpdate?: ((params: {
        editor: Editor;
    }) => void) | undefined;
    /**
     * Callback when an exception is thrown
     */
    onException?: ((params: {
        error: Error;
    }) => void) | undefined;
    /**
     * Callback when the comments list is rendered
     */
    onCommentsListChange?: ((params: {
        isRendered: boolean;
    }) => void) | undefined;
    /**
     * Callback when the list definitions change
     */
    onListDefinitionsChange?: ((params: {}) => any) | undefined;
    /**
     * The format of the document (docx, pdf, html)
     */
    format?: string | undefined;
    /**
     * The extensions to load for the editor
     */
    editorExtensions?: Object[] | undefined;
    /**
     * Whether the SuperDoc is internal
     */
    isInternal?: boolean | undefined;
    /**
     * The title of the SuperDoc
     */
    title?: string | undefined;
    /**
     * The conversations to load
     */
    conversations?: Object[] | undefined;
    /**
     * Toggle comment visibility when `documentMode` is `viewing` (default: false)
     */
    comments?: {
        visible?: boolean;
    } | undefined;
    /**
     * Toggle tracked-change visibility when `documentMode` is `viewing` (default: false)
     */
    trackChanges?: {
        visible?: boolean;
    } | undefined;
    /**
     * Whether the SuperDoc is locked
     */
    isLocked?: boolean | undefined;
    /**
     * The function to handle image uploads
     */
    handleImageUpload?: ((arg0: File) => Promise<string>) | undefined;
    /**
     * The user who locked the SuperDoc
     */
    lockedBy?: User | undefined;
    /**
     * Whether to show the ruler in the editor
     */
    rulers?: boolean | undefined;
    /**
     * Whether to suppress default styles in docx mode
     */
    suppressDefaultDocxStyles?: boolean | undefined;
    /**
     * Provided JSON to override content with
     */
    jsonOverride?: Object | undefined;
    /**
     * Whether to disable slash / right-click custom context menu
     */
    disableContextMenu?: boolean | undefined;
    /**
     * HTML content to initialize the editor with
     */
    html?: string | undefined;
    /**
     * Markdown content to initialize the editor with
     */
    markdown?: string | undefined;
    /**
     * Whether to enable debug mode
     */
    isDebug?: boolean | undefined;
    /**
     * Document view options (OOXML ST_View compatible)
     */
    viewOptions?: ViewOptions | undefined;
};
//# sourceMappingURL=index.d.ts.map