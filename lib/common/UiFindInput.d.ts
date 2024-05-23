import * as React from 'react';
import { TNil } from '../types/index';
type Props = {
    allowClear?: boolean;
    inputProps: Record<string, any>;
    location: Location;
    match: any;
    trackFindFunction?: (str: string | TNil) => void;
    value: string | undefined;
    onChange: (value: string) => void;
};
export default class UiFindInput extends React.PureComponent<Props> {
    static defaultProps: Partial<Props>;
    clearUiFind: () => void;
    render(): JSX.Element;
}
export {};
