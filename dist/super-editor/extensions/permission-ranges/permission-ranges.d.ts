/**
 * @module PermissionRanges
 * A helper extension that ensures content wrapped with w:permStart/w:permEnd and `edGrp="everyone"`
 * stays editable even when the document is in viewing mode.
 */
export const PermissionRanges: Extension<Record<string, never>, {
    ranges: any[];
    hasAllowedRanges: boolean;
}>;
import { Extension } from '@core/Extension.js';
//# sourceMappingURL=permission-ranges.d.ts.map