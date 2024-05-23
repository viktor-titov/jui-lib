/// <reference types="react" />
import { TNil } from '../../types';
import { TraceLog, TraceKeyValuePair, TraceLink } from '../../types/trace';
export type AccordianLogsProps = {
    interactive?: boolean;
    isOpen: boolean;
    linksGetter: ((pairs: TraceKeyValuePair[], index: number) => TraceLink[]) | TNil;
    logs: TraceLog[];
    onItemToggle?: (log: TraceLog) => void;
    onToggle?: () => void;
    openedItems?: Set<TraceLog>;
    timestamp: number;
};
declare function AccordianLogs(props: AccordianLogsProps): JSX.Element;
declare namespace AccordianLogs {
    var defaultProps: {
        interactive: boolean;
        linksGetter: any;
        onItemToggle: any;
        onToggle: any;
        openedItems: any;
    };
}
export default AccordianLogs;
