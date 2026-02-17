import { Editor } from '../../../super-editor/src/index.js';
export function getSchemaIntrospection(options?: SchemaIntrospectionOptions): Promise<import('../../../super-editor/src/index.js').SchemaSummaryJSON>;
export type SchemaIntrospectionOptions = {
    /**
     * - Existing Editor instance to introspect.
     */
    editor?: Editor | undefined;
    /**
     * - Extension list to build a schema from.
     */
    extensions?: any[] | undefined;
    /**
     * - Editor mode when building a schema. Defaults to 'docx'.
     */
    mode?: "docx" | "text" | "html" | undefined;
};
//# sourceMappingURL=schema-introspection.d.ts.map