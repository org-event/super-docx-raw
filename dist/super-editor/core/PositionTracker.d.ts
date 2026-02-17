import { Plugin, PluginKey } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
import type { Editor } from './Editor.js';
export type TrackedRangeSpec = {
    id: string;
    type: string;
    metadata?: Record<string, unknown>;
    kind?: 'range' | 'point';
    inclusiveStart?: boolean;
    inclusiveEnd?: boolean;
};
export type ResolvedRange = {
    id: string;
    from: number;
    to: number;
    spec: TrackedRangeSpec;
};
export type PositionTrackerState = {
    decorations: DecorationSet;
    generation: number;
};
export declare const positionTrackerKey: PluginKey<PositionTrackerState>;
export declare function createPositionTrackerPlugin(): Plugin<PositionTrackerState>;
export declare class PositionTracker {
    #private;
    constructor(editor: Editor);
    track(from: number, to: number, spec: Omit<TrackedRangeSpec, 'id'>): string;
    trackMany(ranges: Array<{
        from: number;
        to: number;
        spec: Omit<TrackedRangeSpec, 'id'>;
    }>): string[];
    untrack(id: string): void;
    untrackMany(ids: string[]): void;
    untrackByType(type: string): void;
    resolve(id: string): ResolvedRange | null;
    resolveMany(ids: string[]): Map<string, ResolvedRange | null>;
    findByType(type: string): ResolvedRange[];
    get generation(): number;
}
//# sourceMappingURL=PositionTracker.d.ts.map