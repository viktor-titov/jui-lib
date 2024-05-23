import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { TraceSpan } from '../types/trace';
export declare const getStyles: import("memoize-one").MemoizedFn<(theme: GrafanaTheme2) => {
    SpanTreeOffset: string;
    SpanTreeOffsetParent: string;
    indentGuide: string;
    indentGuideActive: string;
    iconWrapper: string;
}>;
export type TProps = {
    childrenVisible?: boolean;
    onClick?: () => void;
    span: TraceSpan;
    showChildrenIcon?: boolean;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
    theme: GrafanaTheme2;
};
export declare class UnthemedSpanTreeOffset extends React.PureComponent<TProps> {
    static displayName: string;
    ancestorIds: string[];
    static defaultProps: {
        childrenVisible: boolean;
        showChildrenIcon: boolean;
    };
    constructor(props: TProps);
    /**
     * If the mouse leaves to anywhere except another span with the same ancestor id, this span's ancestor id is
     * removed from the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseleave. Includes the related target which is
     *     the element the user is now hovering.
     * @param {string} ancestorId - The span id that the user was hovering over.
     */
    handleMouseLeave: (event: React.MouseEvent<HTMLSpanElement>, ancestorId: string) => void;
    /**
     * If the mouse entered this span from anywhere except another span with the same ancestor id, this span's
     * ancestorId is added to the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseenter. Includes the related target which is
     *     the last element the user was hovering.
     * @param {string} ancestorId - The span id that the user is now hovering over.
     */
    handleMouseEnter: (event: React.MouseEvent<HTMLSpanElement>, ancestorId: string) => void;
    render(): JSX.Element;
}
declare const _default: React.FunctionComponent<{
    span: TraceSpan;
    onClick?: () => void;
    childrenVisible?: boolean;
    showChildrenIcon?: boolean;
    hoverIndentGuideIds: Set<string>;
    addHoverIndentGuideId: (spanID: string) => void;
    removeHoverIndentGuideId: (spanID: string) => void;
}>;
export default _default;
