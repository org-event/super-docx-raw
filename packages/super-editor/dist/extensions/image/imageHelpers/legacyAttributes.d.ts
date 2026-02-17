export function normalizeWrap(attrs?: any): {
    type: string;
    attrs: Record<string, any>;
};
export function normalizeMarginOffset(marginOffset?: any): {
    horizontal?: number;
    top?: number;
    right?: number;
    bottom?: number;
};
export function getNormalizedImageAttrs(attrs?: any): {
    wrap: {
        type: string;
        attrs: Record<string, any>;
    };
    marginOffset: Record<string, any>;
};
//# sourceMappingURL=legacyAttributes.d.ts.map