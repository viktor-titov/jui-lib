import * as React from 'react';
import { RefObject } from 'react';
import { GrafanaTheme2, LinkModel, TimeZone } from '@grafana/data';
import { Accessors } from '../ScrollManager';
import { SpanBarOptions, SpanLinkFunc, TNil } from '../types';
import TTraceTimeline from '../types/TTraceTimeline';
import { TraceLog, TraceSpan, Trace, TraceKeyValuePair, TraceLink, TraceSpanReference } from '../types/trace';
import ListView from './ListView';
import DetailState from './SpanDetail/DetailState';
import { ViewedBoundsFunctionType } from './utils';
type TExtractUiFindFromStateReturn = {
    uiFind: string | undefined;
};
type RowState = {
    isDetail: boolean;
    span: TraceSpan;
    spanIndex: number;
};
export declare enum TopOfViewRefType {
    Explore = "Explore",
    Panel = "Panel"
}
type TVirtualizedTraceViewOwnProps = {
    currentViewRangeTime: [number, number];
    timeZone: TimeZone;
    findMatchesIDs: Set<string> | TNil;
    scrollToFirstVisibleSpan: () => void;
    registerAccessors: (accesors: Accessors) => void;
    trace: Trace;
    spanBarOptions: SpanBarOptions | undefined;
    linksGetter: (span: TraceSpan, items: TraceKeyValuePair[], itemIndex: number) => TraceLink[];
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
    setTrace: (trace: Trace | TNil, uiFind: string | TNil) => void;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    theme: GrafanaTheme2;
    createSpanLink?: SpanLinkFunc;
    scrollElement?: Element;
    focusedSpanId?: string;
    focusedSpanIdForSearch: string;
    createFocusSpanLink: (traceId: string, spanId: string) => LinkModel;
    topOfViewRef?: RefObject<HTMLDivElement>;
    topOfViewRefType?: TopOfViewRefType;
    datasourceType: string;
};
export type VirtualizedTraceViewProps = TVirtualizedTraceViewOwnProps & TExtractUiFindFromStateReturn & TTraceTimeline;
export declare const DEFAULT_HEIGHTS: {
    bar: number;
    detail: number;
    detailWithLogs: number;
};
export declare class UnthemedVirtualizedTraceView extends React.Component<VirtualizedTraceViewProps> {
    listView: ListView | TNil;
    topTraceViewRef: React.RefObject<HTMLDivElement>;
    constructor(props: VirtualizedTraceViewProps);
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: VirtualizedTraceViewProps): boolean;
    componentDidUpdate(prevProps: Readonly<VirtualizedTraceViewProps>): void;
    getRowStates(): RowState[];
    getClipping(): {
        left: boolean;
        right: boolean;
    };
    getViewedBounds(): ViewedBoundsFunctionType;
    getAccessors(): {
        getViewRange: () => [number, number];
        getSearchedSpanIDs: () => Set<string>;
        getCollapsedChildren: () => Set<string>;
        getViewHeight: () => number;
        getBottomRowIndexVisible: () => number;
        getTopRowIndexVisible: () => number;
        getRowPosition: (index: number) => {
            height: number;
            y: number;
        };
        mapRowIndexToSpanIndex: (index: number) => number;
        mapSpanIndexToRowIndex: (index: number) => number;
    };
    getViewRange: () => [number, number];
    getSearchedSpanIDs: () => Set<string>;
    getCollapsedChildren: () => Set<string>;
    mapRowIndexToSpanIndex: (index: number) => number;
    mapSpanIndexToRowIndex: (index: number) => number;
    setListView: (listView: ListView | TNil) => void;
    getKeyFromIndex: (index: number) => string;
    getIndexFromKey: (key: string) => number;
    getRowHeight: (index: number) => number;
    renderRow: (key: string, style: React.CSSProperties, index: number, attrs: {}) => JSX.Element;
    scrollToSpan: (spanID?: string) => void;
    renderSpanBarRow(span: TraceSpan, spanIndex: number, key: string, style: React.CSSProperties, attrs: {}): JSX.Element;
    renderSpanDetailRow(span: TraceSpan, key: string, style: React.CSSProperties, attrs: {}): JSX.Element;
    scrollToTop: () => void;
    render(): JSX.Element;
}
declare const _default: React.FunctionComponent<{
    scrollElement?: Element;
    linksGetter: (span: TraceSpan, items: TraceKeyValuePair[], itemIndex: number) => TraceLink[];
    datasourceType: string;
    trace: Trace;
    traceID: string;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    spanBarOptions: SpanBarOptions;
    createSpanLink?: SpanLinkFunc;
    createFocusSpanLink: (traceId: string, spanId: string) => LinkModel<any>;
    topOfViewRefType?: TopOfViewRefType;
    timeZone: string;
    focusedSpanId?: string;
    currentViewRangeTime: [number, number];
    findMatchesIDs: Set<string>;
    scrollToFirstVisibleSpan: () => void;
    registerAccessors: (accesors: Accessors) => void;
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
    childrenHiddenIDs: Set<string>;
    detailStates: Map<string, DetailState>;
    shouldScrollToFirstUiFindMatch: boolean;
    spanNameColumnWidth: number;
}>;
export default _default;
