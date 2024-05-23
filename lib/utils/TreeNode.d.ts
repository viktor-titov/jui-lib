type SearchFn = (value: string | number | undefined, node: TreeNode, depth?: number) => boolean;
export default class TreeNode {
    value: string | number | undefined;
    children: TreeNode[];
    static iterFunction(fn: SearchFn, depth?: number): (node: TreeNode) => boolean;
    static searchFunction(search: TreeNode | number | SearchFn | string): SearchFn;
    constructor(value?: string | number, children?: TreeNode[]);
    get depth(): number;
    get size(): number;
    addChild(child: string | number | TreeNode): this;
    find(search: TreeNode | number | SearchFn | string): TreeNode | null;
    getPath(search: TreeNode | string): TreeNode[];
    walk(fn: (value: string | number | undefined, node: TreeNode, depth?: number) => void, depth?: number): void;
}
export {};
