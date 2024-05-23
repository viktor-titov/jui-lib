/// <reference types="react" />
import { GrafanaTheme2, TimeZone } from '@grafana/data';
import { TUpdateViewRangeTimeFunction, ViewRange, ViewRangeTimeUpdate } from '..';
import { Trace } from '../types/trace';
declare const getStyles: (theme: GrafanaTheme2) => {
    TracePageHeader: string;
    TracePageHeaderTitleRow: string;
    TracePageHeaderBack: string;
    TracePageHeaderTitleLink: string;
    TracePageHeaderDetailToggle: string;
    TracePageHeaderDetailToggleExpanded: string;
    TracePageHeaderTitle: string;
    TracePageHeaderTitleCollapsible: string;
    TracePageHeaderOverviewItems: string;
    TracePageHeaderOverviewItemValueDetail: string;
    TracePageHeaderOverviewItemValue: string;
    TracePageHeaderArchiveIcon: string;
    TracePageHeaderTraceId: string;
};
export type TracePageHeaderEmbedProps = {
    canCollapse: boolean;
    hideMap: boolean;
    hideSummary: boolean;
    onSlimViewClicked: () => void;
    onTraceGraphViewClicked: () => void;
    slimView: boolean;
    trace: Trace | null;
    updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
    updateViewRangeTime: TUpdateViewRangeTimeFunction;
    viewRange: ViewRange;
    timeZone: TimeZone;
};
export declare const HEADER_ITEMS: ({
    key: string;
    label: string;
    renderer(trace: Trace, timeZone: TimeZone, styles: ReturnType<typeof getStyles>): string | JSX.Element;
} | {
    key: string;
    label: string;
    renderer: (trace: Trace) => number;
})[];
export default function TracePageHeader(props: TracePageHeaderEmbedProps): JSX.Element;
export {};
