import * as React from 'react';
import { TUpdateViewRangeTimeFunction, ViewRange, ViewRangeTimeUpdate } from '../..';
import { Trace } from '../../types/trace';
export declare const TIMELINE_TICK_INTERVAL = 4;
export type SpanGraphProps = {
    height?: number;
    trace: Trace;
    viewRange: ViewRange;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    updateNextViewRangeTime: (nextUpdate: ViewRangeTimeUpdate) => void;
};
export default class SpanGraph extends React.PureComponent<SpanGraphProps> {
    static defaultProps: {
        height: number;
    };
    render(): JSX.Element;
}
