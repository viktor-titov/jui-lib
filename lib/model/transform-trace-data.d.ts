import { TraceKeyValuePair, Trace, TraceResponse } from '../types/trace';
export declare function deduplicateTags(spanTags: TraceKeyValuePair[]): {
    tags: TraceKeyValuePair[];
    warnings: string[];
};
export declare function orderTags(spanTags: TraceKeyValuePair[], topPrefixes?: string[]): TraceKeyValuePair[];
/**
 * NOTE: Mutates `data` - Transform the HTTP response data into the form the app
 * generally requires.
 */
export default function transformTraceData(data: TraceResponse | undefined): Trace | null;
