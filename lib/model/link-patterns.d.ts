import { TNil } from '../types';
import { TraceSpan, TraceLink, TraceKeyValuePair, Trace } from '../types/trace';
type ProcessedTemplate = {
    parameters: string[];
    template: (template: {
        [key: string]: any;
    }) => string;
};
export type ProcessedLinkPattern = {
    object: any;
    type: (link: string) => boolean;
    key: (link: string) => boolean;
    value: (value: any) => boolean;
    url: ProcessedTemplate;
    text: ProcessedTemplate;
    parameters: string[];
};
type TLinksRV = Array<{
    url: string;
    text: string;
}>;
export declare function processTemplate(template: unknown, encodeFn: (unencoded: any) => string): ProcessedTemplate;
export declare function createTestFunction(entry?: any): (arg: unknown) => boolean;
export declare function processLinkPattern(pattern: any): ProcessedLinkPattern | null;
export declare function getParameterInArray(name: string, array?: TraceKeyValuePair[] | TNil): TraceKeyValuePair;
export declare function getParameterInAncestor(name: string, span: TraceSpan): TraceKeyValuePair;
export declare function computeTraceLink(linkPatterns: ProcessedLinkPattern[], trace: Trace): TLinksRV;
export declare function computeLinks(linkPatterns: ProcessedLinkPattern[], span: TraceSpan, items: TraceKeyValuePair[], itemIndex: number): {
    url: string;
    text: string;
}[];
export declare function createGetLinks(linkPatterns: ProcessedLinkPattern[], cache: WeakMap<TraceKeyValuePair, TraceLink[]>): (span: TraceSpan, items: TraceKeyValuePair[], itemIndex: number) => TraceLink[];
export declare const getTraceLinks: (trace: Trace | undefined) => TLinksRV;
declare const _default: (span: TraceSpan, items: TraceKeyValuePair[], itemIndex: number) => TraceLink[];
export default _default;
