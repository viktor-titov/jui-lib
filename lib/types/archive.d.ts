import { ApiError } from './api-error';
export type TraceArchive = {
    isLoading?: boolean;
    isArchived?: boolean;
    isError?: boolean;
    error?: ApiError;
    isAcknowledged?: boolean;
};
export type TracesArchive = Record<string, TraceArchive>;
