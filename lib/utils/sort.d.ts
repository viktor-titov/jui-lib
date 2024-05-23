import sinon from 'sinon';
export declare function localeStringComparator(itemA: string, itemB: string): number;
export declare function numberSortComparator(itemA: number, itemB: number): number;
export declare function classNameForSortDir(dir: number): string;
export declare function getNewSortForClick(prevSort: {
    key: string;
    dir: number;
}, column: {
    name: string;
    defaultDir?: number;
}): {
    key: string;
    dir: number;
};
export declare function createSortClickHandler(column: {
    name: string;
}, currentSortKey: string, currentSortDir: number, updateSort: sinon.SinonSpy): () => void;
