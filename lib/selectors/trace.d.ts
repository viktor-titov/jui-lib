import { Trace, TraceData, TraceProcess, TraceResponse, TraceSpan, TraceSpanData } from '../types/trace';
import TreeNode from '../utils/TreeNode';
import { formatMillisecondTime, formatSecondTime } from '../utils/date';
export declare const getTraceId: (trace: TraceData) => string;
export declare const getTraceSpans: (trace: TraceResponse) => TraceSpanData[];
export declare const getTraceSpansAsMap: ((state: TraceData & {
    spans: TraceSpanData[];
}) => Map<any, any>) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanData[]) => Map<any, any>;
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[]) => Map<any, any>) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => Map<any, any>;
    dependencies: [(trace: TraceResponse) => TraceSpanData[]];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const TREE_ROOT_ID = "__root__";
/**
 * Build a tree of { value: spanID, children } items derived from the
 * `span.references` information. The tree represents the grouping of parent /
 * child relationships. The root-most node is nominal in that
 * `.value === TREE_ROOT_ID`. This is done because a root span (the main trace
 * span) is not always included with the trace data. Thus, there can be
 * multiple top-level spans, and the root node acts as their common parent.
 *
 * The children are sorted by `span.startTime` after the tree is built.
 *
 * @param  {Trace} trace The trace to build the tree of spanIDs.
 * @return {TreeNode}    A tree of spanIDs derived from the relationships
 *                       between spans in the trace.
 */
export declare function getTraceSpanIdsAsTree(trace: TraceResponse): TreeNode;
export declare const hydrateSpansWithProcesses: (trace: TraceResponse) => {
    spans: {
        process: TraceProcess;
        spanID: string;
        traceID: string;
        processID: string;
        operationName: string;
        startTime: number;
        duration: number;
        logs: import("../types/trace").TraceLog[];
        tags?: import("../types/trace").TraceKeyValuePair[];
        references?: import("../types/trace").TraceSpanReference[];
        warnings?: string[];
        stackTraces?: string[];
        flags: number;
        errorIconColor?: string;
        dataFrameRowIndex?: number;
    }[];
    processes: Record<string, TraceProcess>;
    traceID: string;
    warnings?: string[];
};
export declare const getTraceSpanCount: ((state: TraceData & {
    spans: TraceSpanData[];
}) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanData[]) => number;
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[]) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [(trace: TraceResponse) => TraceSpanData[]];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const getTraceTimestamp: ((state: TraceData & {
    spans: TraceSpanData[];
}) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanData[]) => number;
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[]) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [(trace: TraceResponse) => TraceSpanData[]];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const getTraceDuration: ((state: TraceData & {
    spans: TraceSpanData[];
}) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: number) => number;
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: number) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [(trace: TraceResponse) => TraceSpanData[], ((state: TraceData & {
        spans: TraceSpanData[];
    }) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceSpanData[]) => number;
        memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[]) => number) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => number;
        dependencies: [(trace: TraceResponse) => TraceSpanData[]];
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
export declare const getTraceEndTimestamp: ((state: TraceData & {
    spans: TraceSpanData[];
}) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: number, resultFuncArgs_1: number) => number;
    memoizedResultFunc: ((resultFuncArgs_0: number, resultFuncArgs_1: number) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [((state: TraceData & {
        spans: TraceSpanData[];
    }) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceSpanData[]) => number;
        memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[]) => number) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => number;
        dependencies: [(trace: TraceResponse) => TraceSpanData[]];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        argsMemoize: typeof import("reselect").weakMapMemoize;
        memoize: typeof import("reselect").weakMapMemoize;
    }, ((state: TraceData & {
        spans: TraceSpanData[];
    }) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: number) => number;
        memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: number) => number) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => number;
        dependencies: [(trace: TraceResponse) => TraceSpanData[], ((state: TraceData & {
            spans: TraceSpanData[];
        }) => number) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        } & {
            resultFunc: (resultFuncArgs_0: TraceSpanData[]) => number;
            memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[]) => number) & {
                clearCache: () => void;
                resultsCount: () => number;
                resetResultsCount: () => void;
            };
            lastResult: () => number;
            dependencies: [(trace: TraceResponse) => TraceSpanData[]];
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
export declare const getParentSpan: ((state: TraceData & {
    spans: TraceSpanData[];
}) => any) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TreeNode, resultFuncArgs_1: Map<any, any>) => any;
    memoizedResultFunc: ((resultFuncArgs_0: TreeNode, resultFuncArgs_1: Map<any, any>) => any) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => any;
    dependencies: [typeof getTraceSpanIdsAsTree, ((state: TraceData & {
        spans: TraceSpanData[];
    }) => Map<any, any>) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceSpanData[]) => Map<any, any>;
        memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[]) => Map<any, any>) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => Map<any, any>;
        dependencies: [(trace: TraceResponse) => TraceSpanData[]];
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
export declare const getTraceDepth: ((state: TraceData & {
    spans: TraceSpanData[];
}) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TreeNode) => number;
    memoizedResultFunc: ((resultFuncArgs_0: TreeNode) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [typeof getTraceSpanIdsAsTree];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const getSpanDepthForTrace: ((state: {
    trace: TraceResponse;
} & {
    span: TraceSpanData;
}) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TreeNode, resultFuncArgs_1: string) => number;
    memoizedResultFunc: ((resultFuncArgs_0: TreeNode, resultFuncArgs_1: string) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [((state: {
        trace: TraceResponse;
    }) => TreeNode) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceResponse) => TreeNode;
        memoizedResultFunc: ((resultFuncArgs_0: TraceResponse) => TreeNode) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => TreeNode;
        dependencies: [(state: {
            trace: TraceResponse;
        }) => TraceResponse];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        argsMemoize: typeof import("reselect").weakMapMemoize;
        memoize: typeof import("reselect").weakMapMemoize;
    }, ((state: {
        span: TraceSpanData;
    }) => string) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceSpanData) => string;
        memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData) => string) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => string;
        dependencies: [(state: {
            span: TraceSpanData;
        }) => TraceSpanData];
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
export declare const getTraceServices: ((state: TraceData | Trace) => Set<unknown>) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: Record<string, TraceProcess>) => Set<unknown>;
    memoizedResultFunc: ((resultFuncArgs_0: Record<string, TraceProcess>) => Set<unknown>) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => Set<unknown>;
    dependencies: [(trace: TraceData | Trace) => Record<string, TraceProcess>];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const getTraceServiceCount: ((state: TraceData | Trace) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: Set<unknown>) => number;
    memoizedResultFunc: ((resultFuncArgs_0: Set<unknown>) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [((state: TraceData | Trace) => Set<unknown>) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: Record<string, TraceProcess>) => Set<unknown>;
        memoizedResultFunc: ((resultFuncArgs_0: Record<string, TraceProcess>) => Set<unknown>) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => Set<unknown>;
        dependencies: [(trace: TraceData | Trace) => Record<string, TraceProcess>];
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
export declare const DURATION_FORMATTERS: {
    ms: typeof formatMillisecondTime;
    s: typeof formatSecondTime;
};
export declare const formatDurationForUnit: ((state: {
    duration: number;
} & {
    unit: 'ms' | 's';
}) => string) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: number, resultFuncArgs_1: typeof formatMillisecondTime | typeof formatSecondTime) => string;
    memoizedResultFunc: ((resultFuncArgs_0: number, resultFuncArgs_1: typeof formatMillisecondTime | typeof formatSecondTime) => string) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => string;
    dependencies: [({ duration }: {
        duration: number;
    }) => number, ({ unit }: {
        unit: 'ms' | 's';
    }) => typeof formatMillisecondTime | typeof formatSecondTime];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const formatDurationForTrace: ((state: {
    duration: number;
} & {
    trace: TraceResponse;
}) => string) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: number, resultFuncArgs_1: typeof formatMillisecondTime) => string;
    memoizedResultFunc: ((resultFuncArgs_0: number, resultFuncArgs_1: typeof formatMillisecondTime) => string) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => string;
    dependencies: [({ duration }: {
        duration: number;
    }) => number, ((state: {
        trace: TraceResponse;
    }) => typeof formatMillisecondTime) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceResponse) => typeof formatMillisecondTime;
        memoizedResultFunc: ((resultFuncArgs_0: TraceResponse) => typeof formatMillisecondTime) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => typeof formatMillisecondTime;
        dependencies: [({ trace }: {
            trace: TraceResponse;
        }) => TraceResponse];
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
export declare const getSortedSpans: ((state: {
    trace: TraceResponse;
} & {
    spans: TraceSpanData[];
} & {
    sort: {
        dir: number;
        comparator: (itemA: number, itemB: number) => number;
        selector: (itemA: TraceSpanData, itemB: TraceResponse) => number;
    };
}) => TraceSpanData[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceResponse, resultFuncArgs_1: TraceSpanData[], resultFuncArgs_2: {
        dir: number;
        comparator: (itemA: number, itemB: number) => number;
        selector: (itemA: TraceSpanData, itemB: TraceResponse) => number;
    }) => TraceSpanData[];
    memoizedResultFunc: ((resultFuncArgs_0: TraceResponse, resultFuncArgs_1: TraceSpanData[], resultFuncArgs_2: {
        dir: number;
        comparator: (itemA: number, itemB: number) => number;
        selector: (itemA: TraceSpanData, itemB: TraceResponse) => number;
    }) => TraceSpanData[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => TraceSpanData[];
    dependencies: [({ trace }: {
        trace: TraceResponse;
    }) => TraceResponse, ({ spans }: {
        spans: TraceSpanData[];
    }) => TraceSpanData[], ({ sort, }: {
        sort: {
            dir: number;
            comparator: (itemA: number, itemB: number) => number;
            selector: (itemA: TraceSpanData, itemB: TraceResponse) => number;
        };
    }) => {
        dir: number;
        comparator: (itemA: number, itemB: number) => number;
        selector: (itemA: TraceSpanData, itemB: TraceResponse) => number;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const getTreeSizeForTraceSpan: ((state: {
    trace: TraceResponse;
} & {
    span: TraceSpanData;
}) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TreeNode, resultFuncArgs_1: string) => number;
    memoizedResultFunc: ((resultFuncArgs_0: TreeNode, resultFuncArgs_1: string) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [((state: {
        trace: TraceResponse;
    }) => TreeNode) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceResponse) => TreeNode;
        memoizedResultFunc: ((resultFuncArgs_0: TraceResponse) => TreeNode) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => TreeNode;
        dependencies: [(state: {
            trace: TraceResponse;
        }) => TraceResponse];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        argsMemoize: typeof import("reselect").weakMapMemoize;
        memoize: typeof import("reselect").weakMapMemoize;
    }, ((state: {
        span: TraceSpanData;
    }) => string) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceSpanData) => string;
        memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData) => string) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => string;
        dependencies: [(state: {
            span: TraceSpanData;
        }) => TraceSpanData];
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
export declare const getSpanHierarchySortPositionForTrace: ((state: {
    trace: Trace;
} & {
    span: TraceSpan;
}) => any) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: Map<any, any>, resultFuncArgs_1: TraceSpan) => any;
    memoizedResultFunc: ((resultFuncArgs_0: Map<any, any>, resultFuncArgs_1: TraceSpan) => any) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => any;
    dependencies: [((state: {
        trace: Trace;
    }) => Map<any, any>) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: Trace) => Map<any, any>;
        memoizedResultFunc: ((resultFuncArgs_0: Trace) => Map<any, any>) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => Map<any, any>;
        dependencies: [({ trace }: {
            trace: Trace;
        }) => Trace];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        argsMemoize: typeof import("reselect").weakMapMemoize;
        memoize: typeof import("reselect").weakMapMemoize;
    }, ({ span }: {
        span: TraceSpan;
    }) => TraceSpan];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const getTraceName: ((state: TraceData & {
    spans: TraceSpanData[];
}) => string) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: {
        name: string;
        serviceName: string;
    }) => string;
    memoizedResultFunc: ((resultFuncArgs_0: {
        name: string;
        serviceName: string;
    }) => string) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => string;
    dependencies: [((state: TraceData & {
        spans: TraceSpanData[];
    }) => {
        name: string;
        serviceName: string;
    }) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: any) => {
            name: string;
            serviceName: string;
        };
        memoizedResultFunc: ((resultFuncArgs_0: any) => {
            name: string;
            serviceName: string;
        }) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => {
            name: string;
            serviceName: string;
        };
        dependencies: [((state: TraceData & {
            spans: TraceSpanData[];
        }) => any) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        } & {
            resultFunc: (resultFuncArgs_0: {
                spans: {
                    process: TraceProcess;
                    spanID: string;
                    traceID: string;
                    processID: string;
                    operationName: string;
                    startTime: number;
                    duration: number;
                    logs: import("../types/trace").TraceLog[];
                    tags?: import("../types/trace").TraceKeyValuePair[];
                    references?: import("../types/trace").TraceSpanReference[];
                    warnings?: string[];
                    stackTraces?: string[];
                    flags: number;
                    errorIconColor?: string;
                    dataFrameRowIndex?: number;
                }[];
                processes: Record<string, TraceProcess>;
                traceID: string;
                warnings?: string[];
            }) => any;
            memoizedResultFunc: ((resultFuncArgs_0: {
                spans: {
                    process: TraceProcess;
                    spanID: string;
                    traceID: string;
                    processID: string;
                    operationName: string;
                    startTime: number;
                    duration: number;
                    logs: import("../types/trace").TraceLog[];
                    tags?: import("../types/trace").TraceKeyValuePair[];
                    references?: import("../types/trace").TraceSpanReference[];
                    warnings?: string[];
                    stackTraces?: string[];
                    flags: number;
                    errorIconColor?: string;
                    dataFrameRowIndex?: number;
                }[];
                processes: Record<string, TraceProcess>;
                traceID: string;
                warnings?: string[];
            }) => any) & {
                clearCache: () => void;
                resultsCount: () => number;
                resetResultsCount: () => void;
            };
            lastResult: () => any;
            dependencies: [(trace: TraceResponse) => {
                spans: {
                    process: TraceProcess;
                    spanID: string;
                    traceID: string;
                    processID: string;
                    operationName: string;
                    startTime: number;
                    duration: number;
                    logs: import("../types/trace").TraceLog[];
                    tags?: import("../types/trace").TraceKeyValuePair[];
                    references?: import("../types/trace").TraceSpanReference[];
                    warnings?: string[];
                    stackTraces?: string[];
                    flags: number;
                    errorIconColor?: string;
                    dataFrameRowIndex?: number;
                }[];
                processes: Record<string, TraceProcess>;
                traceID: string;
                warnings?: string[];
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
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const omitCollapsedSpans: ((state: {
    spans: TraceSpanData[];
} & {
    trace: TraceResponse;
} & {
    collapsed: string[];
}) => TraceSpanData[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: TreeNode, resultFuncArgs_2: string[]) => TraceSpanData[];
    memoizedResultFunc: ((resultFuncArgs_0: TraceSpanData[], resultFuncArgs_1: TreeNode, resultFuncArgs_2: string[]) => TraceSpanData[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => TraceSpanData[];
    dependencies: [({ spans }: {
        spans: TraceSpanData[];
    }) => TraceSpanData[], ((state: {
        trace: TraceResponse;
    }) => TreeNode) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: TraceResponse) => TreeNode;
        memoizedResultFunc: ((resultFuncArgs_0: TraceResponse) => TreeNode) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => TreeNode;
        dependencies: [({ trace }: {
            trace: TraceResponse;
        }) => TraceResponse];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        argsMemoize: typeof import("reselect").weakMapMemoize;
        memoize: typeof import("reselect").weakMapMemoize;
    }, ({ collapsed }: {
        collapsed: string[];
    }) => string[]];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const DEFAULT_TICK_INTERVAL = 4;
export declare const DEFAULT_TICK_WIDTH = 3;
export declare const getTicksForTrace: ((state: {
    trace: TraceResponse;
} & {
    interval?: number;
} & {
    width?: number;
}) => {
    timestamp: number;
    width: number;
}[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: TraceResponse, resultFuncArgs_1: number, resultFuncArgs_2: number) => {
        timestamp: number;
        width: number;
    }[];
    memoizedResultFunc: ((resultFuncArgs_0: TraceResponse, resultFuncArgs_1: number, resultFuncArgs_2: number) => {
        timestamp: number;
        width: number;
    }[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => {
        timestamp: number;
        width: number;
    }[];
    dependencies: [({ trace }: {
        trace: TraceResponse;
    }) => TraceResponse, ({ interval }: {
        interval?: number;
    }) => number, ({ width }: {
        width?: number;
    }) => number];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const enforceUniqueSpanIds: ((state: TraceData & {
    duration: number;
    endTime: number;
    spans: TraceSpan[];
    startTime: number;
    traceName: string;
    services: {
        name: string;
        numberOfSpans: number;
    }[];
} & {
    spans: TraceSpanData[];
}) => {
    spans: TraceSpanData[];
    processes: Record<string, TraceProcess>;
    traceID: string;
    warnings?: string[];
    duration: number;
    endTime: number;
    startTime: number;
    traceName: string;
    services: {
        name: string;
        numberOfSpans: number;
    }[];
}) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: Trace, resultFuncArgs_1: TraceSpanData[]) => {
        spans: TraceSpanData[];
        processes: Record<string, TraceProcess>;
        traceID: string;
        warnings?: string[];
        duration: number;
        endTime: number;
        startTime: number;
        traceName: string;
        services: {
            name: string;
            numberOfSpans: number;
        }[];
    };
    memoizedResultFunc: ((resultFuncArgs_0: Trace, resultFuncArgs_1: TraceSpanData[]) => {
        spans: TraceSpanData[];
        processes: Record<string, TraceProcess>;
        traceID: string;
        warnings?: string[];
        duration: number;
        endTime: number;
        startTime: number;
        traceName: string;
        services: {
            name: string;
            numberOfSpans: number;
        }[];
    }) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => {
        spans: TraceSpanData[];
        processes: Record<string, TraceProcess>;
        traceID: string;
        warnings?: string[];
        duration: number;
        endTime: number;
        startTime: number;
        traceName: string;
        services: {
            name: string;
            numberOfSpans: number;
        }[];
    };
    dependencies: [(trace: Trace) => Trace, (trace: TraceResponse) => TraceSpanData[]];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const dropEmptyStartTimeSpans: ((state: TraceData & {
    duration: number;
    endTime: number;
    spans: TraceSpan[];
    startTime: number;
    traceName: string;
    services: {
        name: string;
        numberOfSpans: number;
    }[];
} & {
    spans: TraceSpanData[];
}) => {
    spans: TraceSpanData[];
    processes: Record<string, TraceProcess>;
    traceID: string;
    warnings?: string[];
    duration: number;
    endTime: number;
    startTime: number;
    traceName: string;
    services: {
        name: string;
        numberOfSpans: number;
    }[];
}) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: Trace, resultFuncArgs_1: TraceSpanData[]) => {
        spans: TraceSpanData[];
        processes: Record<string, TraceProcess>;
        traceID: string;
        warnings?: string[];
        duration: number;
        endTime: number;
        startTime: number;
        traceName: string;
        services: {
            name: string;
            numberOfSpans: number;
        }[];
    };
    memoizedResultFunc: ((resultFuncArgs_0: Trace, resultFuncArgs_1: TraceSpanData[]) => {
        spans: TraceSpanData[];
        processes: Record<string, TraceProcess>;
        traceID: string;
        warnings?: string[];
        duration: number;
        endTime: number;
        startTime: number;
        traceName: string;
        services: {
            name: string;
            numberOfSpans: number;
        }[];
    }) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => {
        spans: TraceSpanData[];
        processes: Record<string, TraceProcess>;
        traceID: string;
        warnings?: string[];
        duration: number;
        endTime: number;
        startTime: number;
        traceName: string;
        services: {
            name: string;
            numberOfSpans: number;
        }[];
    };
    dependencies: [(trace: Trace) => Trace, (trace: TraceResponse) => TraceSpanData[]];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
