import * as React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { TNil } from '../../types';
type CanvasSpanGraphProps = {
    items: Array<{
        valueWidth: number;
        valueOffset: number;
        serviceName: string;
    }>;
    valueWidth: number;
    theme: GrafanaTheme2;
};
export declare class UnthemedCanvasSpanGraph extends React.PureComponent<CanvasSpanGraphProps> {
    _canvasElm: HTMLCanvasElement | TNil;
    constructor(props: CanvasSpanGraphProps);
    getColor: (key: string) => [number, number, number];
    componentDidMount(): void;
    componentDidUpdate(): void;
    _setCanvasRef: (elm: HTMLCanvasElement | TNil) => void;
    _draw(): void;
    render(): JSX.Element;
}
declare const _default: React.FunctionComponent<{
    items: {
        valueWidth: number;
        valueOffset: number;
        serviceName: string;
    }[];
    valueWidth: number;
}>;
export default _default;
