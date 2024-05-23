type THeightGetter = (index: number) => number;
/**
 * Keeps track of the height and y-position for anything sequenctial where
 * y-positions follow one-after-another and can be derived from the height of
 * the prior entries. The height is known from an accessor function parameter
 * to the methods that require new knowledge the heights.
 *
 * @export
 * @class Positions
 */
export default class Positions {
    /**
     * Indicates how far past the explicitly required height or y-values should
     * checked.
     */
    bufferLen: number;
    dataLen: number;
    heights: number[];
    /**
     * `lastI` keeps track of which values have already been visited. In many
     * scenarios, values do not need to be revisited. But, revisiting is required
     * when heights have changed, so `lastI` can be forced.
     */
    lastI: number;
    ys: number[];
    constructor(bufferLen: number);
    /**
     * Used to make sure the length of y-values and heights is consistent with
     * the context; in particular `lastI` needs to remain valid.
     */
    profileData(dataLength: number): void;
    /**
     * Calculate and save the heights and y-values, based on `heightGetter`, from
     * `lastI` until the`max` index; the starting point (`lastI`) can be forced
     * via the `forcedLastI` parameter.
     * @param {number=} forcedLastI
     */
    calcHeights(max: number, heightGetter: THeightGetter, forcedLastI?: number): void;
    /**
     * Verify the height and y-values from `lastI` up to `yValue`.
     */
    calcYs(yValue: number, heightGetter: THeightGetter): void;
    /**
     * Get the latest height for index `_i`. If it's in new terretory
     * (_i > lastI), find the heights (and y-values) leading up to it. If it's in
     * known territory (_i <= lastI) and the height is different than what is
     * known, recalculate subsequent y values, but don't confirm the heights of
     * those items, just update based on the difference.
     */
    confirmHeight(_i: number, heightGetter: THeightGetter): void;
    /**
     * Given a target y-value (`yValue`), find the closest index (in the `.ys`
     * array) that is prior to the y-value; e.g. map from y-value to index in
     * `.ys`.
     */
    findFloorIndex(yValue: number, heightGetter: THeightGetter): number;
    /**
     * Get the `y` and `height` for a given row.
     *
     * @returns {{ height: number, y: number }}
     */
    getRowPosition(index: number, heightGetter: THeightGetter): {
        height: number;
        y: number;
    };
    /**
     * Get the estimated height of the whole shebang by extrapolating based on
     * the average known height.
     */
    getEstimatedHeight(): number;
}
export {};
