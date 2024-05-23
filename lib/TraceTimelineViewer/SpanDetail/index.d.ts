/// <reference types="react" />
import { LinkModel, TimeZone } from '@grafana/data';
import { SpanLinkFunc, TNil } from '../../types';
import { TraceKeyValuePair, TraceLink, TraceLog, TraceSpan, TraceSpanReference } from '../../types/trace';
import { TopOfViewRefType } from '../VirtualizedTraceView';
import DetailState from './DetailState';
export type SpanDetailProps = {
    detailState: DetailState;
    linksGetter: ((links: TraceKeyValuePair[], index: number) => TraceLink[]) | TNil;
    logItemToggle: (spanID: string, log: TraceLog) => void;
    logsToggle: (spanID: string) => void;
    processToggle: (spanID: string) => void;
    span: TraceSpan;
    timeZone: TimeZone;
    tagsToggle: (spanID: string) => void;
    traceStartTime: number;
    warningsToggle: (spanID: string) => void;
    stackTracesToggle: (spanID: string) => void;
    referenceItemToggle: (spanID: string, reference: TraceSpanReference) => void;
    referencesToggle: (spanID: string) => void;
    createSpanLink?: SpanLinkFunc;
    focusedSpanId?: string;
    createFocusSpanLink: (traceId: string, spanId: string) => LinkModel;
    topOfViewRefType?: TopOfViewRefType;
    datasourceType: string;
};
export default function SpanDetail(props: SpanDetailProps): JSX.Element;
export declare const getAbsoluteTime: (startTime: number, timeZone: TimeZone) => string;
