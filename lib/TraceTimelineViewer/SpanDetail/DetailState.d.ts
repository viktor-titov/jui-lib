import { TraceLog, TraceSpanReference } from '../../types/trace';
/**
 * Which items of a {@link SpanDetail} component are expanded.
 */
export default class DetailState {
    isTagsOpen: boolean;
    isProcessOpen: boolean;
    logs: {
        isOpen: boolean;
        openedItems: Set<TraceLog>;
    };
    references: {
        isOpen: boolean;
        openedItems: Set<TraceSpanReference>;
    };
    isWarningsOpen: boolean;
    isStackTracesOpen: boolean;
    isReferencesOpen: boolean;
    constructor(oldState?: DetailState);
    toggleTags(): DetailState;
    toggleProcess(): DetailState;
    toggleReferences(): DetailState;
    toggleReferenceItem(reference: TraceSpanReference): DetailState;
    toggleWarnings(): DetailState;
    toggleStackTraces(): DetailState;
    toggleLogs(): DetailState;
    toggleLogItem(logItem: TraceLog): DetailState;
}
