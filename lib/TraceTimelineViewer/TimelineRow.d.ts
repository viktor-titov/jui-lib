import * as React from 'react';
type TTimelineRowProps = {
    children: React.ReactNode;
    className?: string;
};
interface TimelineRowCellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    width: number;
    style?: {};
}
declare function TimelineRow(props: TTimelineRowProps): JSX.Element;
declare namespace TimelineRow {
    var defaultProps: {
        className: string;
    };
    var Cell: typeof TimelineRowCell;
}
export default TimelineRow;
export declare function TimelineRowCell(props: TimelineRowCellProps): JSX.Element;
export declare namespace TimelineRowCell {
    var defaultProps: {
        className: string;
        style: {};
    };
}
