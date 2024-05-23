import * as React from 'react';
import { TNil } from '../../types';
import DraggableManager, { DraggableBounds, DraggingUpdate } from '../../utils/DraggableManager';
export declare const getStyles: import("memoize-one").MemoizedFn<() => {
    TimelineColumnResizer: string;
    wrapper: string;
    dragger: string;
    draggerDragging: string;
    draggerDraggingLeft: string;
    draggerDraggingRight: string;
    gripIcon: string;
    gripIconDragging: string;
}>;
export type TimelineColumnResizerProps = {
    min: number;
    max: number;
    onChange: (newSize: number) => void;
    position: number;
    columnResizeHandleHeight: number;
};
type TimelineColumnResizerState = {
    dragPosition: number | TNil;
};
export default class TimelineColumnResizer extends React.PureComponent<TimelineColumnResizerProps, TimelineColumnResizerState> {
    state: TimelineColumnResizerState;
    _dragManager: DraggableManager;
    _rootElm: Element | TNil;
    constructor(props: TimelineColumnResizerProps);
    componentWillUnmount(): void;
    _setRootElm: (elm: Element | TNil) => void;
    _getDraggingBounds: () => DraggableBounds;
    _handleDragUpdate: ({ value }: DraggingUpdate) => void;
    _handleDragEnd: ({ manager, value }: DraggingUpdate) => void;
    render(): JSX.Element;
}
export {};
