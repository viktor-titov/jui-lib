import * as React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { SpanBarOptions, SpanLinkFunc, TNil } from '../types';
import { TraceSpan } from '../types/trace';
import { ViewedBoundsFunctionType } from './utils';
export type SpanBarRowProps = {
    className?: string;
    theme: GrafanaTheme2;
    color: string;
    spanBarOptions: SpanBarOptions | undefined;
    columnDivision: number;
    isChildrenExpanded: boolean;
    isDetailExpanded: boolean;
    isMatchingFilter: boolean;
    isFocused: boolean;
    onDetailToggled: (spanID: string) => void;
    onChildrenToggled: (spanID: string) => void;
    numTicks: number;
    rpc?: {
        viewStart: number;
        viewEnd: number;
        color: string;
        operationName: string;
        serviceName: string;
    } | TNil;
    noInstrumentedServer?: {
        color: string;
        serviceName: string;
    } | TNil;
    showErrorIcon: boolean;
    getViewedBounds: ViewedBoundsFunctionType;
    traceStartTime: number;
    span: TraceSpan;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    clippingLeft?: boolean;
    clippingRight?: boolean;
    createSpanLink?: SpanLinkFunc;
    datasourceType: string;
};
/**
 * This was originally a stateless function, but changing to a PureComponent
 * reduced the render time of expanding a span row detail by ~50%. This is
 * even true in the case where the stateless function has the same prop types as
 * this class and arrow functions are created in the stateless function as
 * handlers to the onClick props. E.g. for now, the PureComponent is more
 * performance than the stateless function.
 */
export declare class UnthemedSpanBarRow extends React.PureComponent<SpanBarRowProps> {
    static displayName: string;
    static defaultProps: Partial<SpanBarRowProps>;
    _detailToggle: () => void;
    _childrenToggle: () => void;
    render(): JSX.Element;
    getSpanBarLabel: (span: TraceSpan, spanBarOptions: SpanBarOptions | undefined, duration: string) => string;
}
declare const _default: React.FunctionComponent<{
    span: TraceSpan;
    color: string;
    className?: string;
    numTicks: number;
    getViewedBounds: ViewedBoundsFunctionType;
    rpc?: {
        viewStart: number;
        viewEnd: number;
        color: string;
        operationName: string;
        serviceName: string;
    };
    traceStartTime: number;
    datasourceType: string;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    spanBarOptions: SpanBarOptions;
    columnDivision: number;
    isChildrenExpanded: boolean;
    isDetailExpanded: boolean;
    isMatchingFilter: boolean;
    isFocused: boolean;
    onDetailToggled: (spanID: string) => void;
    onChildrenToggled: (spanID: string) => void;
    noInstrumentedServer?: {
        color: string;
        serviceName: string;
    };
    showErrorIcon: boolean;
    clippingLeft?: boolean;
    clippingRight?: boolean;
    createSpanLink?: SpanLinkFunc;
}>;
export default _default;
