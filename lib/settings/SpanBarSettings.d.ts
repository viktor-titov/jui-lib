/// <reference types="react" />
import { DataSourceJsonData, DataSourcePluginOptionsEditorProps } from '@grafana/data';
export interface SpanBarOptions {
    type?: string;
    tag?: string;
}
export interface SpanBarOptionsData extends DataSourceJsonData {
    spanBar?: SpanBarOptions;
}
export declare const NONE = "None";
export declare const DURATION = "Duration";
export declare const TAG = "Tag";
interface Props extends DataSourcePluginOptionsEditorProps<SpanBarOptionsData> {
}
export default function SpanBarSettings({ options, onOptionsChange }: Props): JSX.Element;
export {};
