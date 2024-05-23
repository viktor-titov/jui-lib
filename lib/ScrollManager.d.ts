import { TNil } from './types';
import { Trace } from './types/trace';
/**
 * `Accessors` is necessary because `ScrollManager` needs to be created by
 * `TracePage` so it can be passed into the keyboard shortcut manager. But,
 * `ScrollManager` needs to know about the state of `ListView` and `Positions`,
 * which are very low-level. And, storing their state info in redux or
 * `TracePage#state` would be inefficient because the state info only rarely
 * needs to be accessed (when a keyboard shortcut is triggered). `Accessors`
 * allows that state info to be accessed in a loosely coupled fashion on an
 * as-needed basis.
 */
export type Accessors = {
    getViewRange: () => [number, number];
    getSearchedSpanIDs: () => Set<string> | TNil;
    getCollapsedChildren: () => Set<string> | TNil;
    getViewHeight: () => number;
    getBottomRowIndexVisible: () => number;
    getTopRowIndexVisible: () => number;
    getRowPosition: (rowIndex: number) => {
        height: number;
        y: number;
    };
    mapRowIndexToSpanIndex: (rowIndex: number) => number;
    mapSpanIndexToRowIndex: (spanIndex: number) => number;
};
interface Scroller {
    scrollTo: (rowIndex: number) => void;
    scrollBy: (rowIndex: number, opt?: boolean) => void;
}
/**
 * ScrollManager is intended for scrolling the TracePage. Has two modes, paging
 * and scrolling to the previous or next visible span.
 */
export default class ScrollManager {
    _trace: Trace | TNil;
    _scroller: Scroller | TNil;
    _accessors: Accessors | TNil;
    constructor(trace: Trace | TNil, scroller: Scroller);
    _scrollPast(rowIndex: number, direction: 1 | -1): void;
    _scrollToVisibleSpan(direction: 1 | -1, startRow?: number): void;
    /**
     * Sometimes the ScrollManager is created before the trace is loaded. This
     * setter allows the trace to be set asynchronously.
     */
    setTrace(trace: Trace | TNil): void;
    /**
     * `setAccessors` is bound in the ctor, so it can be passed as a prop to
     * children components.
     */
    setAccessors: (accessors: Accessors) => void;
    /**
     * Scrolls around one page down (0.95x). It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    scrollPageDown: () => void;
    /**
     * Scrolls around one page up (0.95x). It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    scrollPageUp: () => void;
    /**
     * Scrolls to the next visible span, ignoring spans that do not match the
     * text filter, if there is one. It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    scrollToNextVisibleSpan: () => void;
    /**
     * Scrolls to the previous visible span, ignoring spans that do not match the
     * text filter, if there is one. It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    scrollToPrevVisibleSpan: () => void;
    scrollToFirstVisibleSpan: () => void;
    destroy(): void;
}
export {};
