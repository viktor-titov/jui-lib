import React, { RefObject } from 'react';
import { GrafanaTheme2, LinkModel, TimeZone } from '@grafana/data';
import { Accessors } from '../ScrollManager';
import { SpanBarOptions } from '../settings/SpanBarSettings';
import { SpanLinkFunc, TNil } from '../types';
import TTraceTimeline from '../types/TTraceTimeline';
import { TraceSpan, Trace, TraceLog, TraceKeyValuePair, TraceLink, TraceSpanReference } from '../types/trace';
import { TopOfViewRefType } from './VirtualizedTraceView';
import { TUpdateViewRangeTimeFunction, ViewRange, ViewRangeTimeUpdate } from './types';
type TExtractUiFindFromStateReturn = {
    uiFind: string | undefined;
};
export type TProps = TExtractUiFindFromStateReturn & {
    registerAccessors: (accessors: Accessors) => void;
    findMatchesIDs: Set<string> | TNil;
    scrollToFirstVisibleSpan: () => void;
    traceTimeline: TTraceTimeline;
    trace: Trace;
    datasourceType: string;
    spanBarOptions: SpanBarOptions | undefined;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRange: ViewRange;
    timeZone: TimeZone;
    setSpanNameColumnWidth: (width: number) => void;
    collapseAll: (spans: TraceSpan[]) => void;
    collapseOne: (spans: TraceSpan[]) => void;
    expandAll: () => void;
    expandOne: (spans: TraceSpan[]) => void;
    childrenToggle: (spanID: string) => void;
    clearShouldScrollToFirstUiFindMatch: () => void;
    detailLogItemToggle: (spanID: string, log: TraceLog) => void;
    detailLogsToggle: (spanID: string) => void;
    detailWarningsToggle: (spanID: string) => void;
    detailStackTracesToggle: (spanID: string) => void;
    detailReferencesToggle: (spanID: string) => void;
    detailReferenceItemToggle: (spanID: string, reference: TraceSpanReference) => void;
    detailProcessToggle: (spanID: string) => void;
    detailTagsToggle: (spanID: string) => void;
    detailToggle: (spanID: string) => void;
    setTrace: (trace: Trace | TNil, uiFind: string | TNil) => void;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    linksGetter: (span: TraceSpan, items: TraceKeyValuePair[], itemIndex: number) => TraceLink[];
    theme: GrafanaTheme2;
    createSpanLink?: SpanLinkFunc;
    scrollElement?: Element;
    focusedSpanId?: string;
    focusedSpanIdForSearch: string;
    createFocusSpanLink: (traceId: string, spanId: string) => LinkModel;
    topOfViewRef?: RefObject<HTMLDivElement>;
    topOfViewRefType?: TopOfViewRefType;
};
type State = {
    height: number;
};
/**
 * `TraceTimelineViewer` now renders the header row because it is sensitive to
 * `props.viewRange.time.cursor`. If `VirtualizedTraceView` renders it, it will
 * re-render the ListView every time the cursor is moved on the trace minimap
 * or `TimelineHeaderRow`.
 */
export declare class UnthemedTraceTimelineViewer extends React.PureComponent<TProps, State> {
    constructor(props: TProps);
    componentDidMount(): void;
    collapseAll: () => void;
    collapseOne: () => void;
    expandAll: () => void;
    expandOne: () => void;
    render(): JSX.Element;
}
declare const _default: React.FunctionComponent<{
    collapseAll: (spans: TraceSpan[]) => void;
    expandAll: () => void;
    collapseOne: (spans: TraceSpan[]) => void;
    expandOne: (spans: TraceSpan[]) => void;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    scrollElement?: Element;
    linksGetter: (span: TraceSpan, items: TraceKeyValuePair[], itemIndex: number) => TraceLink[];
    datasourceType: string;
    trace: Trace;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    spanBarOptions: SpanBarOptions;
    createSpanLink?: SpanLinkFunc;
    createFocusSpanLink: (traceId: string, spanId: string) => LinkModel<any>;
    topOfViewRefType?: TopOfViewRefType;
    timeZone: string;
    focusedSpanId?: string;
    findMatchesIDs: Set<string>;
    scrollToFirstVisibleSpan: () => void;
    registerAccessors: (accessors: Accessors) => void;
    childrenToggle: (spanID: string) => void;
    clearShouldScrollToFirstUiFindMatch: () => void;
    detailLogItemToggle: (spanID: string, log: TraceLog) => void;
    detailLogsToggle: (spanID: string) => void;
    detailWarningsToggle: (spanID: string) => void;
    detailStackTracesToggle: (spanID: string) => void;
    detailReferencesToggle: (spanID: string) => void;
    detailReferenceItemToggle: (spanID: string, reference: TraceSpanReference) => void;
    detailProcessToggle: (spanID: string) => void;
    detailTagsToggle: (spanID: string) => void;
    detailToggle: (spanID: string) => void;
    setSpanNameColumnWidth: (width: number) => void;
    setTrace: (trace: Trace, uiFind: string) => void;
    focusedSpanIdForSearch: string;
    topOfViewRef?: React.RefObject<HTMLDivElement>;
    uiFind: string;
    traceTimeline: TTraceTimeline;
    viewRange: ViewRange;
}>;
export default _default;
