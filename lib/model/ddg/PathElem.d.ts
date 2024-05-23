import { TDdgOperation, TDdgPath } from './types';
export default class PathElem {
    memberIdx: number;
    memberOf: TDdgPath;
    operation: TDdgOperation;
    private _visibilityIdx?;
    constructor({ path, operation, memberIdx }: {
        path: TDdgPath;
        operation: TDdgOperation;
        memberIdx: number;
    });
    get distance(): number;
    get externalPath(): PathElem[];
    get externalSideNeighbor(): PathElem | null | undefined;
    get focalPath(): PathElem[];
    get focalSideNeighbor(): PathElem | null;
    get isExternal(): boolean;
    set visibilityIdx(visibilityIdx: number);
    get visibilityIdx(): number;
    private toJSONHelper;
    toJSON(): {
        memberOf: {
            focalIdx: number;
            members: {
                memberIdx: number;
                operation: string;
                service: string;
                visibilityIdx: number;
            }[];
        };
        memberIdx: number;
        operation: string;
        service: string;
        visibilityIdx: number;
    };
    toString(): string;
    get [Symbol.toStringTag](): string;
}
