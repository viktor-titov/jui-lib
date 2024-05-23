/// <reference types="react" />
type CollapserProps = {
    onCollapseAll: () => void;
    onCollapseOne: () => void;
    onExpandOne: () => void;
    onExpandAll: () => void;
};
export declare function TimelineCollapser(props: CollapserProps): JSX.Element;
export {};
