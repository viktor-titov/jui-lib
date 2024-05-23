import { TraceSpan } from '../types/trace';
export type ViewedBoundsFunctionType = (start: number, end: number) => {
    start: number;
    end: number;
};
/**
 * Given a range (`min`, `max`) and factoring in a zoom (`viewStart`, `viewEnd`)
 * a function is created that will find the position of a sub-range (`start`, `end`).
 * The calling the generated method will return the result as a `{ start, end }`
 * object with values ranging in [0, 1].
 *
 * @param  {number} min       The start of the outer range.
 * @param  {number} max       The end of the outer range.
 * @param  {number} viewStart The start of the zoom, on a range of [0, 1],
 *                            relative to the `min`, `max`.
 * @param  {number} viewEnd   The end of the zoom, on a range of [0, 1],
 *                            relative to the `min`, `max`.
 * @returns {(number, number) => Object} Created view bounds function
 */
export declare function createViewedBoundsFunc(viewRange: {
    min: number;
    max: number;
    viewStart: number;
    viewEnd: number;
}): (start: number, end: number) => {
    start: number;
    end: number;
};
/**
 * Returns `true` if the `span` has a tag matching `key` = `value`.
 *
 * @param  {string} key   The tag key to match on.
 * @param  {any}    value The tag value to match.
 * @param  {{tags}} span  An object with a `tags` property of { key, value }
 *                        items.
 * @returns {boolean}      True if a match was found.
 */
export declare function spanHasTag(key: string, value: any, span: TraceSpan): boolean;
export declare const isClientSpan: any;
export declare const isServerSpan: any;
export declare const isErrorSpan: (span: TraceSpan) => any;
/**
 * Returns `true` if at least one of the descendants of the `parentSpanIndex`
 * span contains an error tag.
 *
 * @param      {TraceSpan[]}   spans            The spans for a trace - should be
 *                                         sorted with children following parents.
 * @param      {number}   parentSpanIndex  The index of the parent span - only
 *                                         subsequent spans with depth less than
 *                                         the parent span will be checked.
 * @returns     {boolean}  Returns `true` if a descendant contains an error tag.
 */
export declare function spanContainsErredSpan(spans: TraceSpan[], parentSpanIndex: number): boolean;
/**
 * Expects the first span to be the parent span.
 */
export declare function findServerChildSpan(spans: TraceSpan[]): false | TraceSpan;
export declare const isKindClient: (span: TraceSpan) => Boolean;
export { formatDuration } from '../utils/date';
