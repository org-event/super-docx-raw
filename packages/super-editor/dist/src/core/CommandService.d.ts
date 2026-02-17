/**
 * @typedef {import('prosemirror-state').Transaction} Transaction
 * @typedef {import('./commands/types/index.js').ChainableCommandObject} ChainableCommandObject
 */
/**
 * CommandService is the main class to work with commands.
 */
export class CommandService {
    /**
     * Static method for creating a service.
     * @param {import('./commands/types/index.js').CommandServiceOptions} params for the constructor.
     * @returns {CommandService} New instance of CommandService
     */
    static create(params: import("./commands/types/index.js").CommandServiceOptions): CommandService;
    /**
     * @param {import('./commands/types/index.js').CommandServiceOptions} props
     */
    constructor(props: import("./commands/types/index.js").CommandServiceOptions);
    editor: import("./Editor.js").Editor;
    rawCommands: any;
    /**
     * Get editor state.
     * @returns {import("prosemirror-state").EditorState} Editor state
     */
    get state(): import("prosemirror-state").EditorState;
    /**
     * Get all editor commands. Commands are executable methods that modify the editor state
     * via transactions. In headless mode (when view is unavailable), commands automatically
     * fall back to using editor.dispatch instead of view.dispatch.
     *
     * @returns {import('./commands/types/index.js').EditorCommands} Commands object containing all registered commands
     *
     * @example
     * // In mounted mode (with view)
     * editor.commands.insertText('hello'); // uses view.dispatch
     *
     * @example
     * // In headless mode (no view)
     * editor.commands.insertText('hello'); // falls back to editor.dispatch
     */
    get commands(): import("./commands/types/index.js").EditorCommands;
    /**
     * Create a chain of commands to call multiple commands at once.
     * @returns {(startTr?: Transaction, shouldDispatch?: boolean) => ChainableCommandObject} Function that creates a command chain
     */
    get chain(): (startTr?: Transaction, shouldDispatch?: boolean) => ChainableCommandObject;
    /**
     * Check if a command or a chain of commands can be executed. Without executing it.
     * @returns {() => import('./commands/types/index.js').CanObject} Function that creates a can object
     */
    get can(): () => import("./commands/types/index.js").CanObject;
    /**
     * Creates a chain of commands. Allows multiple commands to be executed in sequence
     * on the same transaction, with a single dispatch at the end. In headless mode,
     * the chain automatically falls back to using editor.dispatch instead of view.dispatch.
     *
     * @param {import("prosemirror-state").Transaction} [startTr] - Optional transaction to use as the starting point. If not provided, uses state.tr.
     * @param {boolean} [shouldDispatch=true] - Whether to dispatch the transaction when run() is called.
     * @returns {import('./commands/types/index.js').ChainableCommandObject} The command chain object with all commands and a run() method.
     *
     * @example
     * // Chain multiple commands in mounted mode
     * editor.chain()
     *   .insertText('hello')
     *   .selectAll()
     *   .run(); // dispatches once via view.dispatch
     *
     * @example
     * // Chain in headless mode
     * headlessEditor.chain()
     *   .insertText('hello')
     *   .run(); // falls back to editor.dispatch
     *
     * @example
     * // Chain without dispatching (for testing/validation)
     * const canExecute = editor.chain()
     *   .insertText('test')
     *   .run(); // returns boolean but doesn't dispatch
     */
    createChain(startTr?: import("prosemirror-state").Transaction, shouldDispatch?: boolean): import("./commands/types/index.js").ChainableCommandObject;
    /**
     * Creates a can check for commands.
     * @param {import("prosemirror-state").Transaction} [startTr] - Start transaction.
     * @returns {import('./commands/types/index.js').CanObject} The can object.
     */
    createCan(startTr?: import("prosemirror-state").Transaction): import("./commands/types/index.js").CanObject;
    /**
     * Creates default props for the command method.
     * @param {import("prosemirror-state").Transaction} tr Transaction.
     * @param {boolean} shouldDispatch Check if should dispatch.
     * @returns {Object} Props object.
     */
    createProps(tr: import("prosemirror-state").Transaction, shouldDispatch?: boolean): any;
    #private;
}
export type Transaction = import("prosemirror-state").Transaction;
export type ChainableCommandObject = import("./commands/types/index.js").ChainableCommandObject;
//# sourceMappingURL=CommandService.d.ts.map