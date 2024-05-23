import { TNil } from '.';
export type SearchQuery = {
    end: number | string;
    limit: number | string;
    lookback: string;
    maxDuration: null | string;
    minDuration: null | string;
    operation: string | TNil;
    service: string;
    start: number | string;
    tags: string | TNil;
};
/**
 * Type used to summarize traces for the search page.
 */
export type TraceSummary = {
    /**
     * Duration of trace in milliseconds.
     */
    duration: number;
    /**
     * Start time of trace in milliseconds.
     */
    timestamp: number;
    traceName: string;
    traceID: string;
    numberOfErredSpans: number;
    numberOfSpans: number;
    services: Array<{
        name: string;
        numberOfSpans: number;
    }>;
};
export type TraceSummaries = {
    /**
     * Duration of longest trace in `traces` in milliseconds.
     */
    maxDuration: number;
    traces: TraceSummary[];
};
