import React, { Dispatch, SetStateAction } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
export declare const getStyles: (theme: GrafanaTheme2) => {
    TracePageSearchBar: string;
    TracePageSearchBarBar: string;
    TracePageSearchBarSuffix: string;
    TracePageSearchBarBtn: string;
    TracePageSearchBarBtnDisabled: string;
    TracePageSearchBarLocateBtn: string;
};
export type TracePageSearchBarProps = {
    navigable: boolean;
    searchValue: string;
    setSearch: (value: string) => void;
    searchBarSuffix: string;
    spanFindMatches: Set<string> | undefined;
    focusedSpanIdForSearch: string;
    setSearchBarSuffix: Dispatch<SetStateAction<string>>;
    setFocusedSpanIdForSearch: Dispatch<SetStateAction<string>>;
    datasourceType: string;
};
declare const _default: React.NamedExoticComponent<TracePageSearchBarProps>;
export default _default;
