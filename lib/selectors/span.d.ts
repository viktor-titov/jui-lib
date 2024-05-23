import { TraceSpan, TraceSpanData, TraceSpanReference } from '../types/trace';
export declare const getSpanId: (span: TraceSpanData) => string;
export declare const getSpanName: (span: TraceSpanData) => string;
export declare const getSpanDuration: (span: TraceSpanData) => number;
export declare const getSpanTimestamp: (span: TraceSpanData) => number;
export declare const getSpanProcessId: (span: TraceSpanData) => string;
export declare const getSpanReferences: (span: TraceSpanData) => TraceSpanReference[];
export declare const getSpanReferenceByType: ((state: {
    span: TraceSpanData;
} & {
    type: string;
}) => TraceSpanReference) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanReference[], resultFuncArgs_1: string) => TraceSpanReference;
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanReference[], resultFuncArgs_1: string) => TraceSpanReference) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => TraceSpanReference;
    dependencies: [((state: {
        span: TraceSpanData;
    }) => TraceSpanReference[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceSpanData) => TraceSpanReference[];
        memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData) => TraceSpanReference[]) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => TraceSpanReference[];
        dependencies: [({ span }: {
            span: TraceSpanData;
        }) => TraceSpanData];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        argsMemoize: typeof import("reselect").weakMapMemoize;
        memoize: typeof import("reselect").weakMapMemoize;
    }, ({ type }: {
        type: string;
    }) => string];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const getSpanParentId: ((state: TraceSpanData) => string) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanReference) => string;
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanReference) => string) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => string;
    dependencies: [(span: TraceSpanData) => TraceSpanReference];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const getSpanProcess: (span: TraceSpan) => import("../types/trace").TraceProcess;
export declare const getSpanServiceName: ((state: TraceSpanData & {
    depth: number;
    hasChildren: boolean;
    childSpanCount: number;
    process: import("../types/trace").TraceProcess;
    relativeStartTime: number;
    tags: import("../types/trace").TraceKeyValuePair[];
    references: TraceSpanReference[];
    warnings: string[];
    subsidiarilyReferencedBy: TraceSpanReference[];
}) => string) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("../types/trace").TraceProcess) => string;
    memoizedResultFunc: ((resultFuncArgs_0: import("../types/trace").TraceProcess) => string) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => string;
    dependencies: [(span: TraceSpan) => import("../types/trace").TraceProcess];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const filterSpansForTimestamps: ((state: {
    spans: TraceSpanData[];
} & {
    leftBound: number;
} & {
    rightBound: number;
}) => TraceSpanData[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: number, resultFuncArgs_2: number) => TraceSpanData[];
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: number, resultFuncArgs_2: number) => TraceSpanData[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => TraceSpanData[];
    dependencies: [({ spans }: {
        spans: TraceSpanData[];
    }) => TraceSpanData[], ({ leftBound }: {
        leftBound: number;
    }) => number, ({ rightBound }: {
        rightBound: number;
    }) => number];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const filterSpansForText: ((state: {
    spans: TraceSpan[];
} & {
    text: string;
}) => TraceSpan[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpan[], resultFuncArgs_1: string) => TraceSpan[];
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpan[], resultFuncArgs_1: string) => TraceSpan[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => TraceSpan[];
    dependencies: [({ spans }: {
        spans: TraceSpan[];
    }) => TraceSpan[], ({ text }: {
        text: string;
    }) => string];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const highlightSpansForTextFilter: ((state: {
    spans: TraceSpanData[];
} & {
    spans: TraceSpan[];
} & {
    text: string;
}) => {
    muted: boolean;
    spanID: string;
    traceID: string;
    processID: string;
    operationName: string;
    startTime: number;
    duration: number;
    logs: import("../types/trace").TraceLog[];
    tags?: import("../types/trace").TraceKeyValuePair[];
    references?: TraceSpanReference[];
    warnings?: string[];
    stackTraces?: string[];
    flags: number;
    errorIconColor?: string;
    dataFrameRowIndex?: number;
}[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: any) => {
        muted: boolean;
        spanID: string;
        traceID: string;
        processID: string;
        operationName: string;
        startTime: number;
        duration: number;
        logs: import("../types/trace").TraceLog[];
        tags?: import("../types/trace").TraceKeyValuePair[];
        references?: TraceSpanReference[];
        warnings?: string[];
        stackTraces?: string[];
        flags: number;
        errorIconColor?: string;
        dataFrameRowIndex?: number;
    }[];
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: any) => {
        muted: boolean;
        spanID: string;
        traceID: string;
        processID: string;
        operationName: string;
        startTime: number;
        duration: number;
        logs: import("../types/trace").TraceLog[];
        tags?: import("../types/trace").TraceKeyValuePair[];
        references?: TraceSpanReference[];
        warnings?: string[];
        stackTraces?: string[];
        flags: number;
        errorIconColor?: string;
        dataFrameRowIndex?: number;
    }[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => {
        muted: boolean;
        spanID: string;
        traceID: string;
        processID: string;
        operationName: string;
        startTime: number;
        duration: number;
        logs: import("../types/trace").TraceLog[];
        tags?: import("../types/trace").TraceKeyValuePair[];
        references?: TraceSpanReference[];
        warnings?: string[];
        stackTraces?: string[];
        flags: number;
        errorIconColor?: string;
        dataFrameRowIndex?: number;
    }[];
    dependencies: [({ spans }: {
        spans: TraceSpanData[];
    }) => TraceSpanData[], ((state: {
        spans: TraceSpan[];
    } & {
        text: string;
    }) => {}) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceSpan[]) => {};
        memoizedResultFunc: ((resultFuncArgs_0: TraceSpan[]) => {}) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => {};
        dependencies: [((state: {
            spans: TraceSpan[];
        } & {
            text: string;
        }) => TraceSpan[]) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        } & {
            resultFunc: (resultFuncArgs_0: TraceSpan[], resultFuncArgs_1: string) => TraceSpan[];
            memoizedResultFunc: ((resultFuncArgs_0: TraceSpan[], resultFuncArgs_1: string) => TraceSpan[]) & {
                clearCache: () => void;
                resultsCount: () => number;
                resetResultsCount: () => void;
            };
            lastResult: () => TraceSpan[];
            dependencies: [({ spans }: {
                spans: TraceSpan[];
            }) => TraceSpan[], ({ text }: {
                text: string;
            }) => string];
            recomputations: () => number;
            resetRecomputations: () => void;
            dependencyRecomputations: () => number;
            resetDependencyRecomputations: () => void;
        } & {
            argsMemoize: typeof import("reselect").weakMapMemoize;
            memoize: typeof import("reselect").weakMapMemoize;
        }];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        argsMemoize: typeof import("reselect").weakMapMemoize;
        memoize: typeof import("reselect").weakMapMemoize;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
