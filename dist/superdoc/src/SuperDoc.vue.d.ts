declare const _default: import('vue').DefineComponent<{}, {
    $emit: (event: "selection-update", ...args: any[]) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    layers: HTMLDivElement;
    selectionLayer: HTMLDivElement;
    hrbrFieldsLayer: any;
    commentsLayer: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, {
        addCommentEntry: (selection: any) => void;
        activateComment: (comment: any, e: any) => void;
        setFloatingCommentOffset: (conversation: any) => void;
        $emit: (event: "highlight-click", ...args: any[]) => void;
        user: Record<string, any>;
        parent: Record<string, any>;
        $props: {
            readonly user?: Record<string, any> | undefined;
            readonly parent?: Record<string, any> | undefined;
        };
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<{}> & Readonly<{}>, {
        addCommentEntry: (selection: any) => void;
        activateComment: (comment: any, e: any) => void;
        setFloatingCommentOffset: (conversation: any) => void;
        $emit: (event: "highlight-click", ...args: any[]) => void;
        user: Record<string, any>;
        parent: Record<string, any>;
        $props: {
            readonly user?: Record<string, any> | undefined;
            readonly parent?: Record<string, any> | undefined;
        };
    }, {}, {}, {}, {}> | null;
    aiLayer: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, {
        addAiHighlight: () => void;
        removeAiHighlight: () => void;
        updateAiHighlight: () => void;
        editor: Record<string, any>;
        $props: {
            readonly editor?: Record<string, any> | undefined;
        };
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        highlightLayer: HTMLDivElement;
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<{}> & Readonly<{}>, {
        addAiHighlight: () => void;
        removeAiHighlight: () => void;
        updateAiHighlight: () => void;
        editor: Record<string, any>;
        $props: {
            readonly editor?: Record<string, any> | undefined;
        };
    }, {}, {}, {}, {}> | null;
}, any>;
export default _default;
//# sourceMappingURL=SuperDoc.vue.d.ts.map