import { GrafanaTheme2 } from '@grafana/data';
export declare function clear(theme: GrafanaTheme2): void;
export declare function getColorByKey(key: string, theme: GrafanaTheme2): string;
export declare function getRgbColorByKey(key: string, theme: GrafanaTheme2): [number, number, number];
export declare function getFilteredColors(colorsHex: string[], theme: GrafanaTheme2): any[];
