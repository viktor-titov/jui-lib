/// <reference types="react" />
import { GrafanaTheme2 } from '@grafana/data';
import { TNil } from '../../types';
import { TraceKeyValuePair, TraceLink } from '../../types/trace';
export declare const getStyles: (theme: GrafanaTheme2) => {
    header: string;
    headerEmpty: string;
    headerHighContrast: string;
    emptyIcon: string;
    summary: string;
    summaryItem: string;
    summaryLabel: string;
    summaryDelim: string;
};
export type AccordianKeyValuesProps = {
    className?: string | TNil;
    data: TraceKeyValuePair[];
    highContrast?: boolean;
    interactive?: boolean;
    isOpen: boolean;
    label: string;
    linksGetter: ((pairs: TraceKeyValuePair[], index: number) => TraceLink[]) | TNil;
    onToggle?: null | (() => void);
};
export declare function KeyValuesSummary(props: {
    data?: TraceKeyValuePair[];
}): JSX.Element;
export declare namespace KeyValuesSummary {
    var defaultProps: {
        data: any;
    };
}
declare function AccordianKeyValues(props: AccordianKeyValuesProps): JSX.Element;
declare namespace AccordianKeyValues {
    var defaultProps: {
        className: any;
        highContrast: boolean;
        interactive: boolean;
        onToggle: any;
    };
}
export default AccordianKeyValues;
