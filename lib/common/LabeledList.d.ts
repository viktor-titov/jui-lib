import * as React from 'react';
type LabeledListProps = {
    className?: string;
    divider?: boolean;
    items: Array<{
        key: string;
        label: React.ReactNode;
        value: React.ReactNode;
    }>;
};
export default function LabeledList(props: LabeledListProps): JSX.Element;
export {};
