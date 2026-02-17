/**
 * Thin adapter that reuses the shared numbering manager implementation.
 * Provides a minimal compatibility alias for `_clearCache`.
 */
export function NumberingManager(): {
    _clearCache: () => void;
    setStartSettings: (numId: string | number, level: number, startValue: number, restartValue?: number) => void;
    setCounter: (numId: string | number, level: number, pos: number, value: number, abstractId?: string | number) => void;
    getCounter: (numId: string | number, level: number, pos: number) => number | null;
    calculateCounter: (numId: string | number, level: number, pos: number, abstractId?: string | number) => number;
    getAncestorsPath: (numId: string | number, level: number, pos: number) => number[];
    calculatePath: (numId: string | number, level: number, pos: number) => number[];
    getCountersMap: () => {
        [x: string]: {
            [x: number]: Record<number, number>;
        };
    };
    clearAllState: () => void;
    enableCache: () => void;
    disableCache: () => void;
};
//# sourceMappingURL=NumberingManager.d.ts.map