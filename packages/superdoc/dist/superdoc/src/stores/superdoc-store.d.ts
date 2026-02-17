export const useSuperdocStore: import('pinia').StoreDefinition<"superdoc", Pick<{
    commentsStore: import('pinia').Store<"comments", Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "suppressInternalExternal" | "activeComment" | "floatingCommentsOffset" | "pendingComment" | "currentCommentText" | "isDebugging" | "editingCommentId" | "editorCommentPositions" | "isCommentHighlighted" | "COMMENT_EVENTS" | "hasInitializedComments" | "hasSyncedCollaborationComments" | "commentDialogs" | "overlappingComments" | "overlappedIds" | "commentsList" | "isCommentsListVisible" | "generalCommentIds" | "editorCommentIds" | "commentsParentElement" | "hasInitializedLocations" | "sortedConversations" | "visibleConversations" | "skipSelectionUpdate" | "isFloatingCommentsReady">, Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "getConfig" | "documentsWithConverations" | "getGroupedComments" | "getCommentsByPosition" | "getFloatingComments">, Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "cancelComment" | "getCommentPosition" | "getCommentAnchoredText" | "getCommentAnchorData" | "init" | "setViewingVisibility" | "getComment" | "setActiveComment" | "getCommentLocation" | "hasOverlapId" | "getPendingComment" | "showAddComment" | "addComment" | "deleteComment" | "removePendingComment" | "processLoadedDocxComments" | "translateCommentsForExport" | "handleEditorLocationsUpdate" | "clearEditorCommentPositions" | "handleTrackedChangeUpdate">>;
    documents: import('vue').Ref<never[], never[]>;
    documentBounds: import('vue').Ref<never[], never[]>;
    pages: {};
    documentUsers: import('vue').Ref<never[], never[]>;
    users: import('vue').Ref<never[], never[]>;
    activeZoom: import('vue').Ref<number, number>;
    documentScroll: {
        scrollTop: number;
        scrollLeft: number;
    };
    isInternal: import('vue').Ref<boolean, boolean>;
    selectionPosition: import('vue').Ref<{
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    }, {
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    } | {
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    }>;
    activeSelection: import('vue').Ref<null, null>;
    isReady: import('vue').Ref<boolean, boolean>;
    user: {
        name: null;
        email: null;
    };
    modules: {};
    areDocumentsReady: import('vue').ComputedRef<boolean>;
    init: (config: any) => Promise<void>;
    setExceptionHandler: (handler: any) => void;
    reset: () => void;
    handlePageReady: (documentId: any, index: any, containerBounds: any) => void;
    getDocument: (documentId: any) => undefined;
    getPageBounds: (documentId: any, page: any) => {
        top: number;
    } | undefined;
}, "user" | "users" | "commentsStore" | "documents" | "documentBounds" | "pages" | "documentUsers" | "activeZoom" | "documentScroll" | "isInternal" | "selectionPosition" | "activeSelection" | "isReady" | "modules">, Pick<{
    commentsStore: import('pinia').Store<"comments", Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "suppressInternalExternal" | "activeComment" | "floatingCommentsOffset" | "pendingComment" | "currentCommentText" | "isDebugging" | "editingCommentId" | "editorCommentPositions" | "isCommentHighlighted" | "COMMENT_EVENTS" | "hasInitializedComments" | "hasSyncedCollaborationComments" | "commentDialogs" | "overlappingComments" | "overlappedIds" | "commentsList" | "isCommentsListVisible" | "generalCommentIds" | "editorCommentIds" | "commentsParentElement" | "hasInitializedLocations" | "sortedConversations" | "visibleConversations" | "skipSelectionUpdate" | "isFloatingCommentsReady">, Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "getConfig" | "documentsWithConverations" | "getGroupedComments" | "getCommentsByPosition" | "getFloatingComments">, Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "cancelComment" | "getCommentPosition" | "getCommentAnchoredText" | "getCommentAnchorData" | "init" | "setViewingVisibility" | "getComment" | "setActiveComment" | "getCommentLocation" | "hasOverlapId" | "getPendingComment" | "showAddComment" | "addComment" | "deleteComment" | "removePendingComment" | "processLoadedDocxComments" | "translateCommentsForExport" | "handleEditorLocationsUpdate" | "clearEditorCommentPositions" | "handleTrackedChangeUpdate">>;
    documents: import('vue').Ref<never[], never[]>;
    documentBounds: import('vue').Ref<never[], never[]>;
    pages: {};
    documentUsers: import('vue').Ref<never[], never[]>;
    users: import('vue').Ref<never[], never[]>;
    activeZoom: import('vue').Ref<number, number>;
    documentScroll: {
        scrollTop: number;
        scrollLeft: number;
    };
    isInternal: import('vue').Ref<boolean, boolean>;
    selectionPosition: import('vue').Ref<{
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    }, {
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    } | {
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    }>;
    activeSelection: import('vue').Ref<null, null>;
    isReady: import('vue').Ref<boolean, boolean>;
    user: {
        name: null;
        email: null;
    };
    modules: {};
    areDocumentsReady: import('vue').ComputedRef<boolean>;
    init: (config: any) => Promise<void>;
    setExceptionHandler: (handler: any) => void;
    reset: () => void;
    handlePageReady: (documentId: any, index: any, containerBounds: any) => void;
    getDocument: (documentId: any) => undefined;
    getPageBounds: (documentId: any, page: any) => {
        top: number;
    } | undefined;
}, "areDocumentsReady">, Pick<{
    commentsStore: import('pinia').Store<"comments", Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "suppressInternalExternal" | "activeComment" | "floatingCommentsOffset" | "pendingComment" | "currentCommentText" | "isDebugging" | "editingCommentId" | "editorCommentPositions" | "isCommentHighlighted" | "COMMENT_EVENTS" | "hasInitializedComments" | "hasSyncedCollaborationComments" | "commentDialogs" | "overlappingComments" | "overlappedIds" | "commentsList" | "isCommentsListVisible" | "generalCommentIds" | "editorCommentIds" | "commentsParentElement" | "hasInitializedLocations" | "sortedConversations" | "visibleConversations" | "skipSelectionUpdate" | "isFloatingCommentsReady">, Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "getConfig" | "documentsWithConverations" | "getGroupedComments" | "getCommentsByPosition" | "getFloatingComments">, Pick<{
        COMMENT_EVENTS: {
            readonly RESOLVED: "resolved";
            readonly NEW: "new";
            readonly ADD: "add";
            readonly UPDATE: "update";
            readonly DELETED: "deleted";
            readonly PENDING: "pending";
            readonly SELECTED: "selected";
            readonly COMMENTS_LIST: "comments-list";
            readonly CHANGE_ACCEPTED: "change-accepted";
            readonly CHANGE_REJECTED: "change-rejected";
        };
        isDebugging: boolean;
        hasInitializedComments: import('vue').Ref<boolean, boolean>;
        hasSyncedCollaborationComments: import('vue').Ref<boolean, boolean>;
        editingCommentId: import('vue').Ref<null, null>;
        activeComment: import('vue').Ref<null, null>;
        commentDialogs: import('vue').Ref<never[], never[]>;
        overlappingComments: import('vue').Ref<never[], never[]>;
        overlappedIds: Set<never>;
        suppressInternalExternal: import('vue').Ref<boolean, boolean>;
        pendingComment: import('vue').Ref<null, null>;
        currentCommentText: import('vue').Ref<string, string>;
        commentsList: import('vue').Ref<never[], never[]>;
        isCommentsListVisible: import('vue').Ref<boolean, boolean>;
        generalCommentIds: import('vue').Ref<never[], never[]>;
        editorCommentIds: import('vue').Ref<never[], never[]>;
        commentsParentElement: import('vue').Ref<null, null>;
        editorCommentPositions: import('vue').Ref<{}, {}>;
        hasInitializedLocations: import('vue').Ref<boolean, boolean>;
        isCommentHighlighted: import('vue').Ref<boolean, boolean>;
        floatingCommentsOffset: import('vue').Ref<number, number>;
        sortedConversations: import('vue').Ref<never[], never[]>;
        visibleConversations: import('vue').Ref<never[], never[]>;
        skipSelectionUpdate: import('vue').Ref<boolean, boolean>;
        isFloatingCommentsReady: import('vue').Ref<boolean, boolean>;
        getConfig: import('vue').ComputedRef<{
            name: string;
            readOnly: boolean;
            allowResolve: boolean;
            showResolved: boolean;
        }>;
        documentsWithConverations: import('vue').ComputedRef<any>;
        getGroupedComments: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getCommentsByPosition: import('vue').ComputedRef<{
            parentComments: any[];
            resolvedComments: any[];
        }>;
        getFloatingComments: import('vue').ComputedRef<any[]>;
        getCommentPosition: (commentOrId: Object | string) => Object | null;
        getCommentAnchoredText: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => string | null;
        getCommentAnchorData: (commentOrId: Object | string, options?: {
            separator?: string | undefined;
            trim?: boolean | undefined;
        }) => {
            position: Object;
            anchoredText: string | null;
        } | null;
        init: (config?: Object) => void;
        setViewingVisibility: ({ documentMode, commentsVisible, trackChangesVisible }?: {}) => void;
        getComment: (id: string) => Object;
        setActiveComment: (superdoc: any, id: string | undefined | null) => void;
        getCommentLocation: (selection: any, parent: any) => {
            top: any;
            left: any;
        };
        hasOverlapId: (id: any) => any;
        getPendingComment: ({ selection, documentId, parentCommentId, ...options }: {
            selection: Object;
            documentId: string;
            parentCommentId: string;
        }) => Object;
        showAddComment: (superdoc: any) => void;
        addComment: ({ superdoc, comment, skipEditorUpdate }: {
            superdoc: Object;
        }) => void;
        cancelComment: (superdoc: any) => void;
        deleteComment: ({ commentId: commentIdToDelete, superdoc }: {
            commentId: any;
            superdoc: any;
        }) => void;
        removePendingComment: (superdoc: any) => void;
        processLoadedDocxComments: ({ superdoc, editor, comments, documentId }: {
            comments: any[];
            documentId: string;
        }) => void;
        translateCommentsForExport: () => any[];
        handleEditorLocationsUpdate: (allCommentPositions: any) => void;
        clearEditorCommentPositions: () => void;
        handleTrackedChangeUpdate: ({ superdoc, params }: {
            superdoc: Object;
            params: Object;
        }) => void;
    }, "cancelComment" | "getCommentPosition" | "getCommentAnchoredText" | "getCommentAnchorData" | "init" | "setViewingVisibility" | "getComment" | "setActiveComment" | "getCommentLocation" | "hasOverlapId" | "getPendingComment" | "showAddComment" | "addComment" | "deleteComment" | "removePendingComment" | "processLoadedDocxComments" | "translateCommentsForExport" | "handleEditorLocationsUpdate" | "clearEditorCommentPositions" | "handleTrackedChangeUpdate">>;
    documents: import('vue').Ref<never[], never[]>;
    documentBounds: import('vue').Ref<never[], never[]>;
    pages: {};
    documentUsers: import('vue').Ref<never[], never[]>;
    users: import('vue').Ref<never[], never[]>;
    activeZoom: import('vue').Ref<number, number>;
    documentScroll: {
        scrollTop: number;
        scrollLeft: number;
    };
    isInternal: import('vue').Ref<boolean, boolean>;
    selectionPosition: import('vue').Ref<{
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    }, {
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    } | {
        left: number;
        top: number;
        width: number;
        height: number;
        source: null;
    }>;
    activeSelection: import('vue').Ref<null, null>;
    isReady: import('vue').Ref<boolean, boolean>;
    user: {
        name: null;
        email: null;
    };
    modules: {};
    areDocumentsReady: import('vue').ComputedRef<boolean>;
    init: (config: any) => Promise<void>;
    setExceptionHandler: (handler: any) => void;
    reset: () => void;
    handlePageReady: (documentId: any, index: any, containerBounds: any) => void;
    getDocument: (documentId: any) => undefined;
    getPageBounds: (documentId: any, page: any) => {
        top: number;
    } | undefined;
}, "reset" | "init" | "setExceptionHandler" | "handlePageReady" | "getDocument" | "getPageBounds">>;
//# sourceMappingURL=superdoc-store.d.ts.map