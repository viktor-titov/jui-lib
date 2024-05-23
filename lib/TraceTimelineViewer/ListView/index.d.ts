import * as React from 'react';
import { TNil } from '../../types';
import Positions from './Positions';
/**
 * @typedef
 */
export type TListViewProps = {
    /**
     * Number of elements in the list.
     */
    dataLength: number;
    /**
     * Convert item index (number) to the key (string). ListView uses both indexes
     * and keys to handle the addition of new rows.
     */
    getIndexFromKey: (key: string) => number;
    /**
     * Convert item key (string) to the index (number). ListView uses both indexes
     * and keys to handle the addition of new rows.
     */
    getKeyFromIndex: (index: number) => string;
    /**
     * Number of items to draw and add to the DOM, initially.
     */
    initialDraw?: number;
    /**
     * The parent provides fallback height measurements when there is not a
     * rendered element to measure.
     */
    itemHeightGetter: (index: number, key: string) => number;
    /**
     * Function that renders an item; rendered items are added directly to the
     * DOM, they are not wrapped in list item wrapper HTMLElement.
     */
    itemRenderer: (itemKey: string, style: Record<string, string | number>, index: number, attributes: Record<string, string>) => React.ReactNode;
    /**
     * `className` for the HTMLElement that holds the items.
     */
    itemsWrapperClassName?: string;
    /**
     * When adding new items to the DOM, this is the number of items to add above
     * and below the current view. E.g. if list is 100 items and is scrolled
     * halfway down (so items [46, 55] are in view), then when a new range of
     * items is rendered, it will render items `46 - viewBuffer` to
     * `55 + viewBuffer`.
     */
    viewBuffer: number;
    /**
     * The minimum number of items offscreen in either direction; e.g. at least
     * `viewBuffer` number of items must be off screen above and below the
     * current view, or more items will be rendered.
     */
    viewBufferMin: number;
    /**
     * When `true`, expect `_wrapperElm` to have `overflow: visible` and to,
     * essentially, be tall to the point the entire page will will end up
     * scrolling as a result of the ListView. Similar to react-virtualized
     * window scroller.
     *
     * - Ref: https://bvaughn.github.io/react-virtualized/#/components/WindowScroller
     * - Ref:https://github.com/bvaughn/react-virtualized/blob/497e2a1942529560681d65a9ef9f5e9c9c9a49ba/docs/WindowScroller.md
     */
    windowScroller?: boolean;
    /**
     * You need to pass in scrollElement when windowScroller is set to false.
     * This element is responsible for tracking scrolling for lazy loading.
     */
    scrollElement?: Element;
};
/**
 * Virtualized list view component, for the most part, only renders the window
 * of items that are in-view with some buffer before and after. Listens for
 * scroll events and updates which items are rendered. See react-virtualized
 * for a suite of components with similar, but generalized, functionality.
 * https://github.com/bvaughn/react-virtualized
 *
 * Note: Presently, ListView cannot be a PureComponent. This is because ListView
 * is sensitive to the underlying state that drives the list items, but it
 * doesn't actually receive that state. So, a render may still be required even
 * if ListView's props are unchanged.
 *
 * @export
 * @class ListView
 */
export default class ListView extends React.Component<TListViewProps> {
    /**
     * Keeps track of the height and y-value of items, by item index, in the
     * ListView.
     */
    _yPositions: Positions;
    /**
     * Keep track of the known / measured heights of the rendered items; populated
     * with values through observation and keyed on the item key, not the item
     * index.
     */
    _knownHeights: Map<string, number>;
    /**
     * The start index of the items currently drawn.
     */
    _startIndexDrawn: number;
    /**
     * The end index of the items currently drawn.
     */
    _endIndexDrawn: number;
    /**
     * The start index of the items currently in view.
     */
    _startIndex: number;
    /**
     * The end index of the items currently in view.
     */
    _endIndex: number;
    /**
     * Height of the visual window, e.g. height of the scroller element.
     */
    _viewHeight: number;
    /**
     * `scrollTop` of the current scroll position.
     */
    _scrollTop: number;
    /**
     * Used to keep track of whether or not a re-calculation of what should be
     * drawn / viewable has been scheduled.
     */
    _isScrolledOrResized: boolean;
    /**
     * If `windowScroller` is true, this notes how far down the page the scroller
     * is located. (Note: repositioning and below-the-fold views are untested)
     */
    _htmlTopOffset: number;
    _windowScrollListenerAdded: boolean;
    _htmlElm: HTMLElement;
    /**
     * Element holding the scroller.
     */
    _wrapperElm: Element | TNil;
    /**
     * HTMLElement holding the rendered items.
     */
    _itemHolderElm: HTMLElement | TNil;
    static defaultProps: {
        initialDraw: number;
        itemsWrapperClassName: string;
        windowScroller: boolean;
    };
    constructor(props: TListViewProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: TListViewProps): void;
    componentWillUnmount(): void;
    getViewHeight: () => number;
    /**
     * Get the index of the item at the bottom of the current view.
     */
    getBottomVisibleIndex: () => number;
    /**
     * Get the index of the item at the top of the current view.
     */
    getTopVisibleIndex: () => number;
    getRowPosition: (index: number) => {
        height: number;
        y: number;
    };
    scrollToIndex: (index: number) => void;
    /**
     * Scroll event listener that schedules a remeasuring of which items should be
     * rendered.
     */
    _onScroll: () => void;
    /**
     * Returns true is the view height (scroll window) or scroll position have
     * changed.
     */
    _isViewChanged(): boolean;
    /**
     * Recalculate _startIndex and _endIndex, e.g. which items are in view.
     */
    _calcViewIndexes(): void;
    /**
     * Checked to see if the currently rendered items are sufficient, if not,
     * force an update to trigger more items to be rendered.
     */
    _positionList: () => void;
    _initWrapper: (elm: HTMLElement | TNil) => void;
    _initItemHolder: (elm: HTMLElement | TNil) => void;
    /**
     * Go through all items that are rendered and save their height based on their
     * item-key (which is on a data-* attribute). If any new or adjusted heights
     * are found, re-measure the current known y-positions (via .yPositions).
     */
    _scanItemHeights: () => void;
    /**
     * Get the height of the element at index `i`; first check the known heights,
     * fallback to `.props.itemHeightGetter(...)`.
     */
    _getHeight: (i: number) => number;
    render(): JSX.Element;
}
