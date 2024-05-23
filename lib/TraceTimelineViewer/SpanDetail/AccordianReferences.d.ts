import * as React from 'react';
import { Field, LinkModel } from '@grafana/data';
import { TraceSpanReference } from '../../types/trace';
export type AccordianReferencesProps = {
    data: TraceSpanReference[];
    highContrast?: boolean;
    interactive?: boolean;
    isOpen: boolean;
    openedItems?: Set<TraceSpanReference>;
    onItemToggle?: (reference: TraceSpanReference) => void;
    onToggle?: null | (() => void);
    createFocusSpanLink: (traceId: string, spanId: string) => LinkModel<Field>;
};
type ReferenceItemProps = {
    data: TraceSpanReference[];
    interactive?: boolean;
    openedItems?: Set<TraceSpanReference>;
    onItemToggle?: (reference: TraceSpanReference) => void;
    createFocusSpanLink: (traceId: string, spanId: string) => LinkModel<Field>;
};
export declare function References(props: ReferenceItemProps): JSX.Element;
declare const _default: React.NamedExoticComponent<AccordianReferencesProps>;
export default _default;
