/**
 * All timestamps are in microseconds
 */
export type TraceKeyValuePair = {
    key: string;
    type?: string;
    value: any;
};
export type TraceLink = {
    url: string;
    text: string;
};
export type TraceLog = {
    timestamp: number;
    fields: TraceKeyValuePair[];
};
export type TraceProcess = {
    serviceName: string;
    tags: TraceKeyValuePair[];
};
export type TraceSpanReference = {
    refType: 'CHILD_OF' | 'FOLLOWS_FROM';
    span?: TraceSpan | null | undefined;
    spanID: string;
    traceID: string;
    tags?: TraceKeyValuePair[];
};
export type TraceSpanData = {
    spanID: string;
    traceID: string;
    processID: string;
    operationName: string;
    startTime: number;
    duration: number;
    logs: TraceLog[];
    tags?: TraceKeyValuePair[];
    references?: TraceSpanReference[];
    warnings?: string[] | null;
    stackTraces?: string[];
    flags: number;
    errorIconColor?: string;
    dataFrameRowIndex?: number;
};
export type TraceSpan = TraceSpanData & {
    depth: number;
    hasChildren: boolean;
    childSpanCount: number;
    process: TraceProcess;
    relativeStartTime: number;
    tags: NonNullable<TraceSpanData['tags']>;
    references: NonNullable<TraceSpanData['references']>;
    warnings: NonNullable<TraceSpanData['warnings']>;
    subsidiarilyReferencedBy: TraceSpanReference[];
};
export type TraceData = {
    processes: Record<string, TraceProcess>;
    traceID: string;
    warnings?: string[] | null;
};
export type TraceResponse = TraceData & {
    spans: TraceSpanData[];
};
export type Trace = TraceData & {
    duration: number;
    endTime: number;
    spans: TraceSpan[];
    startTime: number;
    traceName: string;
    services: Array<{
        name: string;
        numberOfSpans: number;
    }>;
};
