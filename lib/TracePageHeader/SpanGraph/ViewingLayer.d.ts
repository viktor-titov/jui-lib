import * as React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { TUpdateViewRangeTimeFunction, ViewRange, ViewRangeTimeUpdate, TNil } from '../..';
import DraggableManager, { DraggableBounds, DraggingUpdate } from '../../utils/DraggableManager';
export declare const getStyles: import("memoize-one").MemoizedFn<(theme: GrafanaTheme2) => {
    ViewingLayer: string;
    ViewingLayerGraph: string;
    ViewingLayerInactive: string;
    ViewingLayerCursorGuide: string;
    ViewingLayerDraggedShift: string;
    ViewingLayerDrag: string;
    ViewingLayerFullOverlay: string;
    ViewingLayerResetZoom: string;
    ViewingLayerResetZoomHoverClassName: string;
}>;
export type ViewingLayerProps = {
    height: number;
    numTicks: number;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    viewRange: ViewRange;
    theme: GrafanaTheme2;
};
type ViewingLayerState = {
    /**
     * Cursor line should not be drawn when the mouse is over the scrubber handle.
     */
    preventCursorLine: boolean;
};
/**
 * Designate the tags for the different dragging managers. Exported for tests.
 */
export declare const dragTypes: {
    /**
     * Tag for dragging the right scrubber, e.g. end of the current view range.
     */
    SHIFT_END: string;
    /**
     * Tag for dragging the left scrubber, e.g. start of the current view range.
     */
    SHIFT_START: string;
    /**
     * Tag for dragging a new view range.
     */
    REFRAME: string;
};
/**
 * `ViewingLayer` is rendered on top of the Canvas rendering of the minimap and
 * handles showing the current view range and handles mouse UX for modifying it.
 */
export declare class UnthemedViewingLayer extends React.PureComponent<ViewingLayerProps, ViewingLayerState> {
    state: ViewingLayerState;
    _root: Element | TNil;
    /**
     * `_draggerReframe` handles clicking and dragging on the `ViewingLayer` to
     * redefined the view range.
     */
    _draggerReframe: DraggableManager;
    /**
     * `_draggerStart` handles dragging the left scrubber to adjust the start of
     * the view range.
     */
    _draggerStart: DraggableManager;
    /**
     * `_draggerEnd` handles dragging the right scrubber to adjust the end of
     * the view range.
     */
    _draggerEnd: DraggableManager;
    constructor(props: ViewingLayerProps);
    componentWillUnmount(): void;
    _setRoot: (elm: SVGElement | TNil) => void;
    _getDraggingBounds: (tag: string | TNil) => DraggableBounds;
    _handleReframeMouseMove: ({ value }: DraggingUpdate) => void;
    _handleReframeMouseLeave: () => void;
    _handleReframeDragUpdate: ({ value }: DraggingUpdate) => void;
    _handleReframeDragEnd: ({ manager, value }: DraggingUpdate) => void;
    _handleScrubberEnterLeave: ({ type }: DraggingUpdate) => void;
    _handleScrubberDragUpdate: ({ event, tag, type, value }: DraggingUpdate) => void;
    _handleScrubberDragEnd: ({ manager, tag, value }: DraggingUpdate) => void;
    /**
     * Resets the zoom to fully zoomed out.
     */
    _resetTimeZoomClickHandler: () => void;
    /**
     * Renders the difference between where the drag started and the current
     * position, e.g. the red or blue highlight.
     *
     * @returns React.Node[]
     */
    _getMarkers(from: number, to: number): JSX.Element[];
    render(): JSX.Element;
}
declare const _default: React.FunctionComponent<{
    height: number;
    numTicks: number;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRange: ViewRange;
}>;
export default _default;
