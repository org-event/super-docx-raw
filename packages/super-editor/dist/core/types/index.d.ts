export type EditorNodeConfig = {
    /**
     * The node name.
     */
    name: string;
    /**
     * The node group.
     */
    group?: string;
    /**
     * The node options.
     */
    options?: any;
    /**
     * Whether the node is an atom node.
     */
    atom?: boolean;
    /**
     * Whether the node is draggable.
     */
    draggable?: boolean;
    /**
     * Whether the node is isolating.
     */
    isolating?: boolean;
    /**
     * Whether the node is defining.
     */
    defining?: boolean;
    /**
     * Whether the node is a top-level node.
     */
    topNode?: boolean;
    /**
     * The role of the node in a table.
     */
    tableRole?: string;
    /**
     * ProseMirror string for what content this node accepts.
     */
    content?: Function | string;
    /**
     * The marks applied to this node.
     */
    marks?: string;
    /**
     * Whether the node is an inline node.
     */
    inline?: boolean;
    /**
     * Whether the node is selectable.
     */
    selectable?: boolean;
    /**
     * The node type.
     */
    type?: import("prosemirror-model").NodeType;
    /**
     * The editor instance.
     */
    editor?: import("../Editor").Editor;
    /**
     * The DOM parsing rules.
     */
    parseDOM?: Function;
    /**
     * The DOM rendering function.
     */
    renderDOM?: Function;
    /**
     * Function or object to add options to the node.
     */
    addOptions?: Function;
    /**
     * Function or object to add storage to the node.
     */
    addStorage?: Function;
    /**
     * Function or object to add attributes to the node.
     */
    addAttributes?: Function;
    /**
     * Function or object to add commands to the node.
     */
    addCommands?: Function;
    /**
     * Function or object to add helpers to the node.
     */
    addHelpers?: Function;
    /**
     * Function or object to add shortcuts to the node.
     */
    addShortcuts?: Function;
    /**
     * Function or object to add input rules to the node.
     */
    addInputRules?: Function;
    /**
     * Function to add a custom node view to the node.
     */
    addNodeView?: Function;
    /**
     * Function to add ProseMirror plugins to the node.
     */
    addPmPlugins?: Function;
    /**
     * Function to extend the ProseMirror node schema.
     */
    extendNodeSchema?: Function;
};
export type EditorNodeOptions = any;
export type EditorNodeStorage = any;
/**
 * Config required to construct an OxmlNode
 * (extends EditorNodeConfig)
 */
export type OxmlNodeConfig = EditorNodeConfig & {
    oXmlName: string;
    childToAttributes: string[];
};
/**
 * Runtime shape of an OxmlNode instance
 * (extends EditorNode)
 */
export type OxmlNode = import("../Node").Node & {
    oXmlName: string;
    readonly validChildren: string[];
};
//# sourceMappingURL=index.d.ts.map