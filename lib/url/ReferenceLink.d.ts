import React from 'react';
import { Field, LinkModel } from '@grafana/data';
import { TraceSpanReference } from '../types/trace';
type ReferenceLinkProps = {
    reference: TraceSpanReference;
    children: React.ReactNode;
    createFocusSpanLink: (traceId: string, spanId: string) => LinkModel<Field>;
};
export default function ReferenceLink(props: ReferenceLinkProps): JSX.Element;
export {};
