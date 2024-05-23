import { TNil } from '.';
export type ConfigMenuItem = {
    label: string;
    url: string;
    anchorTarget?: '_self' | '_blank' | '_parent' | '_top';
};
export type ConfigMenuGroup = {
    label: string;
    items: ConfigMenuItem[];
};
export type TScript = {
    text: string;
    type: 'inline';
};
export type LinkPatternsConfig = {
    type: 'process' | 'tags' | 'logs' | 'traces';
    key?: string;
    url: string;
    text: string;
};
export type Config = {
    archiveEnabled?: boolean;
    deepDependencies?: {
        menuEnabled?: boolean;
    };
    dependencies?: {
        dagMaxServicesLen?: number;
        menuEnabled?: boolean;
    };
    menu: Array<ConfigMenuGroup | ConfigMenuItem>;
    search?: {
        maxLookback: {
            label: string;
            value: string;
        };
        maxLimit: number;
    };
    scripts?: TScript[];
    topTagPrefixes?: string[];
    tracking?: {
        cookieToDimension?: Array<{
            cookie: string;
            dimension: string;
        }>;
        gaID: string | TNil;
        trackErrors: boolean | TNil;
    };
    linkPatterns?: LinkPatternsConfig;
};
