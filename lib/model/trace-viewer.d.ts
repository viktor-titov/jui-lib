/// <reference types="lodash" />
import { TraceSpan } from '../types/trace';
export declare function _getTraceNameImpl(spans: TraceSpan[]): string;
export declare const getTraceName: typeof _getTraceNameImpl & import("lodash").MemoizedFunction;
