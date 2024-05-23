import * as React from 'react';
import { TNil } from '../../types';
import DraggableManager, { DraggableBounds, DraggingUpdate } from '../../utils/DraggableManager';
import { TUpdateViewRangeTimeFunction, ViewRangeTime, ViewRangeTimeUpdate } from '../types';
export declare const getStyles: import("memoize-one").MemoizedFn<() => {
    TimelineViewingLayer: string;
    TimelineViewingLayerCursorGuide: string;
    TimelineViewingLayerDragged: string;
    TimelineViewingLayerDraggedDraggingLeft: string;
    TimelineViewingLayerDraggedDraggingRight: string;
    TimelineViewingLayerDraggedShiftDrag: string;
    TimelineViewingLayerDraggedReframeDrag: string;
    TimelineViewingLayerFullOverlay: string;
}>;
export type TimelineViewingLayerProps = {
    /**
     * `boundsInvalidator` is an arbitrary prop that lets the component know the
     * bounds for dragging need to be recalculated. In practice, the name column
     * width serves fine for this.
     */
    boundsInvalidator: any | null | undefined;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRangeTime: ViewRangeTime;
};
/**
 * `TimelineViewingLayer` is rendered on top of the TimelineHeaderRow time
 * labels; it handles showing the current view range and handles mouse UX for
 * modifying it.
 */
export default class TimelineViewingLayer extends React.PureComponent<TimelineViewingLayerProps> {
    _draggerReframe: DraggableManager;
    _root: Element | TNil;
    constructor(props: TimelineViewingLayerProps);
    UNSAFE_componentWillReceiveProps(nextProps: TimelineViewingLayerProps): void;
    componentWillUnmount(): void;
    _setRoot: (elm: Element | TNil) => void;
    _getDraggingBounds: () => DraggableBounds;
    _handleReframeMouseMove: ({ value }: DraggingUpdate) => void;
    _handleReframeMouseLeave: () => void;
    _handleReframeDragUpdate: ({ value }: DraggingUpdate) => void;
    _handleReframeDragEnd: ({ manager, value }: DraggingUpdate) => void;
    render(): JSX.Element;
}
