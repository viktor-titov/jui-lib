import PathElem from './PathElem';
export { default as PathElem } from './PathElem';
export type TDdgService = {
    name: string;
    operations: Map<string, TDdgOperation>;
};
export type TDdgOperation = {
    name: string;
    pathElems: PathElem[];
    service: TDdgService;
};
export type TDdgServiceMap = Map<string, TDdgService>;
export type TDdgPath = {
    focalIdx: number;
    members: PathElem[];
    traceIDs: string[];
};
export type TDdgDistanceToPathElems = Map<number, PathElem[]>;
export type TDdgModel = {
    distanceToPathElems: TDdgDistanceToPathElems;
    hash: string;
    paths: TDdgPath[];
    services: TDdgServiceMap;
    visIdxToPathElem: PathElem[];
};
