import { TraceSpan } from '../types/trace';
/**
 * Searches the span.references to find 'CHILD_OF' reference type or returns null.
 * @param  {TraceSpan} span The span whose parent is to be returned.
 * @returns {TraceSpan|null} The parent span if there is one, null otherwise.
 */
export declare function getParent(span: TraceSpan): TraceSpan;
