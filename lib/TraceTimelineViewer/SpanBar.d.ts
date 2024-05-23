import React from 'react';
import { TNil } from '../types';
import { TraceSpan } from '../types/trace';
import { ViewedBoundsFunctionType } from './utils';
export type Props = {
    color: string;
    onClick?: (evt: React.MouseEvent<any>) => void;
    viewEnd: number;
    viewStart: number;
    getViewedBounds: ViewedBoundsFunctionType;
    rpc: {
        viewStart: number;
        viewEnd: number;
        color: string;
    } | TNil;
    traceStartTime: number;
    span: TraceSpan;
    className?: string;
    labelClassName?: string;
    longLabel: string;
    shortLabel: string;
};
declare function SpanBar({ viewEnd, viewStart, getViewedBounds, color, shortLabel, longLabel, onClick, rpc, traceStartTime, span, className, labelClassName, }: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof SpanBar>;
export default _default;
