import { TraceSpanReference } from '../types/trace';
export declare const followsFromRef: {
    processes: {
        p1: {
            serviceName: string;
            tags: any[];
        };
    };
    spans: {
        duration: number;
        flags: number;
        logs: any[];
        operationName: string;
        processID: string;
        references: TraceSpanReference[];
        spanID: string;
        startTime: number;
        tags: any[];
        traceID: string;
        warnings: any;
    }[];
    traceID: string;
    warnings: any;
};
