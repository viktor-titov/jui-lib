import * as React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { TNil } from '../../types';
import { TraceKeyValuePair, TraceLink } from '../../types/trace';
export declare const getStyles: (theme: GrafanaTheme2) => {
    KeyValueTable: string;
    body: string;
    row: string;
    keyColumn: string;
    copyColumn: string;
    linkIcon: string;
};
export declare const LinkValue: {
    (props: {
        href: string;
        title?: string;
        children: React.ReactNode;
    }): JSX.Element;
    defaultProps: {
        title: string;
    };
};
export type KeyValuesTableProps = {
    data: TraceKeyValuePair[];
    linksGetter: ((pairs: TraceKeyValuePair[], index: number) => TraceLink[]) | TNil;
};
export default function KeyValuesTable(props: KeyValuesTableProps): JSX.Element;
