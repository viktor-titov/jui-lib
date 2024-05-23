import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as React from 'react';
import Positions from './Positions';

/**
 * @typedef
 */
import { jsx as _jsx } from "react/jsx-runtime";
var DEFAULT_INITIAL_DRAW = 100;

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
var ListView = /*#__PURE__*/function (_React$Component) {
  function ListView(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.getViewHeight = function () {
      return _this._viewHeight;
    };
    /**
     * Get the index of the item at the bottom of the current view.
     */
    _this.getBottomVisibleIndex = function () {
      var bottomY = _this._scrollTop + _this._viewHeight;
      return _this._yPositions.findFloorIndex(bottomY, _this._getHeight);
    };
    /**
     * Get the index of the item at the top of the current view.
     */
    _this.getTopVisibleIndex = function () {
      return _this._yPositions.findFloorIndex(_this._scrollTop, _this._getHeight);
    };
    _this.getRowPosition = function (index) {
      return _this._yPositions.getRowPosition(index, _this._getHeight);
    };
    _this.scrollToIndex = function (index) {
      var _this$_itemHolderElm, _this$props$scrollEle;
      // calculate the position of the list view relative to the scroll parent
      var scrollElement = _this.props.scrollElement;
      var scrollElementTop = (scrollElement == null ? void 0 : scrollElement.getBoundingClientRect().top) || 0;
      var listViewTop = ((scrollElement == null ? void 0 : scrollElement.scrollTop) || 0) + (((_this$_itemHolderElm = _this._itemHolderElm) == null ? void 0 : _this$_itemHolderElm.getBoundingClientRect().top) || 0);
      var listViewOffset = listViewTop - scrollElementTop;
      var itemOffset = _this.getRowPosition(index).y;

      // hard code a small offset to leave a little bit of space above the focused span, so it is visually clear
      // that there is content above
      (_this$props$scrollEle = _this.props.scrollElement) == null || _this$props$scrollEle.scrollTo({
        top: itemOffset + listViewOffset - 80
      });
    };
    /**
     * Scroll event listener that schedules a remeasuring of which items should be
     * rendered.
     */
    _this._onScroll = function () {
      if (!_this._isScrolledOrResized) {
        _this._isScrolledOrResized = true;
        window.requestAnimationFrame(_this._positionList);
      }
    };
    /**
     * Checked to see if the currently rendered items are sufficient, if not,
     * force an update to trigger more items to be rendered.
     */
    _this._positionList = function () {
      _this._isScrolledOrResized = false;
      if (!_this._wrapperElm) {
        return;
      }
      _this._calcViewIndexes();
      // indexes drawn should be padded by at least props.viewBufferMin
      var maxStart = _this.props.viewBufferMin > _this._startIndex ? 0 : _this._startIndex - _this.props.viewBufferMin;
      var minEnd = _this.props.viewBufferMin < _this.props.dataLength - _this._endIndex ? _this._endIndex + _this.props.viewBufferMin : _this.props.dataLength - 1;
      if (maxStart < _this._startIndexDrawn || minEnd > _this._endIndexDrawn) {
        _this.forceUpdate();
      }
    };
    _this._initWrapper = function (elm) {
      if (!_this.props.windowScroller) {
        return;
      }
      _this._wrapperElm = elm;
      if (elm) {
        _this._viewHeight = elm.clientHeight;
      }
    };
    _this._initItemHolder = function (elm) {
      _this._itemHolderElm = elm;
      _this._scanItemHeights();
    };
    /**
     * Go through all items that are rendered and save their height based on their
     * item-key (which is on a data-* attribute). If any new or adjusted heights
     * are found, re-measure the current known y-positions (via .yPositions).
     */
    _this._scanItemHeights = function () {
      var getIndexFromKey = _this.props.getIndexFromKey;
      if (!_this._itemHolderElm) {
        return;
      }
      // note the keys for the first and last altered heights, the `yPositions`
      // needs to be updated
      var lowDirtyKey = null;
      var highDirtyKey = null;
      var isDirty = false;
      // iterating childNodes is faster than children
      // https://jsperf.com/large-htmlcollection-vs-large-nodelist
      var nodes = _this._itemHolderElm.childNodes;
      var max = nodes.length;
      for (var i = 0; i < max; i++) {
        var node = nodes[i];
        // use `.getAttribute(...)` instead of `.dataset` for jest / JSDOM
        var itemKey = node.getAttribute('data-item-key');
        if (!itemKey) {
          // eslint-disable-next-line no-console
          console.warn('itemKey not found');
          continue;
        }
        // measure the first child, if it's available, otherwise the node itself
        // (likely not transferable to other contexts, and instead is specific to
        // how we have the items rendered)
        var measureSrc = node.firstElementChild || node;
        var observed = measureSrc.clientHeight;
        var known = _this._knownHeights.get(itemKey);
        if (observed !== known) {
          _this._knownHeights.set(itemKey, observed);
          if (!isDirty) {
            isDirty = true;
            // eslint-disable-next-line no-multi-assign
            lowDirtyKey = highDirtyKey = itemKey;
          } else {
            highDirtyKey = itemKey;
          }
        }
      }
      if (lowDirtyKey != null && highDirtyKey != null) {
        // update yPositions, then redraw
        var imin = getIndexFromKey(lowDirtyKey);
        var imax = highDirtyKey === lowDirtyKey ? imin : getIndexFromKey(highDirtyKey);
        _this._yPositions.calcHeights(imax, _this._getHeight, imin);
        _this.forceUpdate();
      }
    };
    /**
     * Get the height of the element at index `i`; first check the known heights,
     * fallback to `.props.itemHeightGetter(...)`.
     */
    _this._getHeight = function (i) {
      var key = _this.props.getKeyFromIndex(i);
      var known = _this._knownHeights.get(key);
      // known !== known iff known is NaN
      // eslint-disable-next-line no-self-compare
      if (known != null && known === known) {
        return known;
      }
      return _this.props.itemHeightGetter(i, key);
    };
    _this._yPositions = new Positions(200);
    // _knownHeights is (item-key -> observed height) of list items
    _this._knownHeights = new Map();
    _this._startIndexDrawn = Math.pow(2, 20);
    _this._endIndexDrawn = -Math.pow(2, 20);
    _this._startIndex = 0;
    _this._endIndex = 0;
    _this._viewHeight = -1;
    _this._scrollTop = -1;
    _this._isScrolledOrResized = false;
    _this._htmlTopOffset = -1;
    _this._windowScrollListenerAdded = false;
    // _htmlElm is only relevant if props.windowScroller is true
    _this._htmlElm = document.documentElement;
    _this._wrapperElm = undefined;
    _this._itemHolderElm = undefined;
    return _this;
  }
  _inheritsLoose(ListView, _React$Component);
  var _proto = ListView.prototype;
  _proto.componentDidMount = function componentDidMount() {
    if (this.props.windowScroller) {
      if (this._wrapperElm) {
        var _this$_wrapperElm$get = this._wrapperElm.getBoundingClientRect(),
          top = _this$_wrapperElm$get.top;
        this._htmlTopOffset = top + this._htmlElm.scrollTop;
      }
      window.addEventListener('scroll', this._onScroll);
      this._windowScrollListenerAdded = true;
    } else {
      var _this$_wrapperElm;
      // The wrapper element should be the one that handles the scrolling. Once we are not using scroll-canvas we can remove this.
      this._wrapperElm = this.props.scrollElement;
      (_this$_wrapperElm = this._wrapperElm) == null || _this$_wrapperElm.addEventListener('scroll', this._onScroll);
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this._itemHolderElm) {
      this._scanItemHeights();
    }
    // When windowScroller is set to false, we can continue to handle scrollElement
    if (this.props.windowScroller) {
      return;
    }
    // check if the scrollElement changes and update its scroll listener
    if (prevProps.scrollElement !== this.props.scrollElement) {
      var _prevProps$scrollElem, _this$_wrapperElm2;
      (_prevProps$scrollElem = prevProps.scrollElement) == null || _prevProps$scrollElem.removeEventListener('scroll', this._onScroll);
      this._wrapperElm = this.props.scrollElement;
      (_this$_wrapperElm2 = this._wrapperElm) == null || _this$_wrapperElm2.addEventListener('scroll', this._onScroll);
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this._windowScrollListenerAdded) {
      window.removeEventListener('scroll', this._onScroll);
    } else {
      var _this$_wrapperElm3;
      (_this$_wrapperElm3 = this._wrapperElm) == null || _this$_wrapperElm3.removeEventListener('scroll', this._onScroll);
    }
  };
  /**
   * Returns true is the view height (scroll window) or scroll position have
   * changed.
   */
  _proto._isViewChanged = function _isViewChanged() {
    if (!this._wrapperElm) {
      return false;
    }
    var useRoot = this.props.windowScroller;
    var clientHeight = useRoot ? this._htmlElm.clientHeight : this._wrapperElm.clientHeight;
    var scrollTop = useRoot ? this._htmlElm.scrollTop : this._wrapperElm.scrollTop;
    return clientHeight !== this._viewHeight || scrollTop !== this._scrollTop;
  }

  /**
   * Recalculate _startIndex and _endIndex, e.g. which items are in view.
   */;
  _proto._calcViewIndexes = function _calcViewIndexes() {
    var useRoot = this.props.windowScroller;
    // funky if statement is to satisfy flow
    if (!useRoot) {
      /* istanbul ignore next */
      if (!this._wrapperElm) {
        this._viewHeight = -1;
        this._startIndex = 0;
        this._endIndex = 0;
        return;
      }
      this._viewHeight = this._wrapperElm.clientHeight;
      this._scrollTop = this._wrapperElm.scrollTop;
    } else {
      this._viewHeight = window.innerHeight - this._htmlTopOffset;
      this._scrollTop = window.scrollY;
    }
    var yStart = this._scrollTop;
    var yEnd = this._scrollTop + this._viewHeight;
    this._startIndex = this._yPositions.findFloorIndex(yStart, this._getHeight);
    this._endIndex = this._yPositions.findFloorIndex(yEnd, this._getHeight);
  };
  _proto.render = function render() {
    var _this$props = this.props,
      dataLength = _this$props.dataLength,
      getKeyFromIndex = _this$props.getKeyFromIndex,
      _this$props$initialDr = _this$props.initialDraw,
      initialDraw = _this$props$initialDr === void 0 ? DEFAULT_INITIAL_DRAW : _this$props$initialDr,
      itemRenderer = _this$props.itemRenderer,
      viewBuffer = _this$props.viewBuffer,
      viewBufferMin = _this$props.viewBufferMin;
    var heightGetter = this._getHeight;
    var items = [];
    var start;
    var end;
    this._yPositions.profileData(dataLength);
    if (!this._wrapperElm) {
      start = 0;
      end = (initialDraw < dataLength ? initialDraw : dataLength) - 1;
    } else {
      if (this._isViewChanged()) {
        this._calcViewIndexes();
      }
      var maxStart = viewBufferMin > this._startIndex ? 0 : this._startIndex - viewBufferMin;
      var minEnd = viewBufferMin < dataLength - this._endIndex ? this._endIndex + viewBufferMin : dataLength - 1;
      if (maxStart < this._startIndexDrawn || minEnd > this._endIndexDrawn) {
        start = viewBuffer > this._startIndex ? 0 : this._startIndex - viewBuffer;
        end = this._endIndex + viewBuffer;
        if (end >= dataLength) {
          end = dataLength - 1;
        }
      } else {
        start = this._startIndexDrawn;
        end = this._endIndexDrawn > dataLength - 1 ? dataLength - 1 : this._endIndexDrawn;
      }
    }
    this._yPositions.calcHeights(end, heightGetter, start || -1);
    this._startIndexDrawn = start;
    this._endIndexDrawn = end;
    items.length = end - start + 1;
    for (var i = start; i <= end; i++) {
      var _this$_yPositions$get = this._yPositions.getRowPosition(i, heightGetter),
        top = _this$_yPositions$get.y,
        height = _this$_yPositions$get.height;
      var style = {
        height: height,
        top: top,
        position: 'absolute'
      };
      var itemKey = getKeyFromIndex(i);
      var attrs = {
        'data-item-key': itemKey
      };
      items.push(itemRenderer(itemKey, style, i, attrs));
    }
    var wrapperProps = {
      style: {
        position: 'relative'
      },
      ref: this._initWrapper
    };
    if (!this.props.windowScroller) {
      wrapperProps.onScroll = this._onScroll;
      wrapperProps.style.height = '100%';
      wrapperProps.style.overflowY = 'auto';
    }
    var scrollerStyle = {
      position: 'relative',
      height: this._yPositions.getEstimatedHeight()
    };
    return /*#__PURE__*/_jsx("div", _extends({}, wrapperProps, {
      "data-testid": "ListView",
      children: /*#__PURE__*/_jsx("div", {
        style: scrollerStyle,
        children: /*#__PURE__*/_jsx("div", {
          style: {
            position: 'absolute',
            top: 0,
            margin: 0,
            padding: 0
          },
          className: this.props.itemsWrapperClassName,
          ref: this._initItemHolder,
          children: items
        })
      })
    }));
  };
  return ListView;
}(React.Component);
/**
 * Keeps track of the height and y-value of items, by item index, in the
 * ListView.
 */
/**
 * Keep track of the known / measured heights of the rendered items; populated
 * with values through observation and keyed on the item key, not the item
 * index.
 */
/**
 * The start index of the items currently drawn.
 */
/**
 * The end index of the items currently drawn.
 */
/**
 * The start index of the items currently in view.
 */
/**
 * The end index of the items currently in view.
 */
/**
 * Height of the visual window, e.g. height of the scroller element.
 */
/**
 * `scrollTop` of the current scroll position.
 */
/**
 * Used to keep track of whether or not a re-calculation of what should be
 * drawn / viewable has been scheduled.
 */
/**
 * If `windowScroller` is true, this notes how far down the page the scroller
 * is located. (Note: repositioning and below-the-fold views are untested)
 */
/**
 * Element holding the scroller.
 */
/**
 * HTMLElement holding the rendered items.
 */
ListView.defaultProps = {
  initialDraw: DEFAULT_INITIAL_DRAW,
  itemsWrapperClassName: '',
  windowScroller: false
};
export { ListView as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWFjdCIsIlBvc2l0aW9ucyIsImpzeCIsIl9qc3giLCJERUZBVUxUX0lOSVRJQUxfRFJBVyIsIkxpc3RWaWV3IiwiX1JlYWN0JENvbXBvbmVudCIsInByb3BzIiwiX3RoaXMiLCJjYWxsIiwiZ2V0Vmlld0hlaWdodCIsIl92aWV3SGVpZ2h0IiwiZ2V0Qm90dG9tVmlzaWJsZUluZGV4IiwiYm90dG9tWSIsIl9zY3JvbGxUb3AiLCJfeVBvc2l0aW9ucyIsImZpbmRGbG9vckluZGV4IiwiX2dldEhlaWdodCIsImdldFRvcFZpc2libGVJbmRleCIsImdldFJvd1Bvc2l0aW9uIiwiaW5kZXgiLCJzY3JvbGxUb0luZGV4IiwiX3RoaXMkX2l0ZW1Ib2xkZXJFbG0iLCJfdGhpcyRwcm9wcyRzY3JvbGxFbGUiLCJzY3JvbGxFbGVtZW50Iiwic2Nyb2xsRWxlbWVudFRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImxpc3RWaWV3VG9wIiwic2Nyb2xsVG9wIiwiX2l0ZW1Ib2xkZXJFbG0iLCJsaXN0Vmlld09mZnNldCIsIml0ZW1PZmZzZXQiLCJ5Iiwic2Nyb2xsVG8iLCJfb25TY3JvbGwiLCJfaXNTY3JvbGxlZE9yUmVzaXplZCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9wb3NpdGlvbkxpc3QiLCJfd3JhcHBlckVsbSIsIl9jYWxjVmlld0luZGV4ZXMiLCJtYXhTdGFydCIsInZpZXdCdWZmZXJNaW4iLCJfc3RhcnRJbmRleCIsIm1pbkVuZCIsImRhdGFMZW5ndGgiLCJfZW5kSW5kZXgiLCJfc3RhcnRJbmRleERyYXduIiwiX2VuZEluZGV4RHJhd24iLCJmb3JjZVVwZGF0ZSIsIl9pbml0V3JhcHBlciIsImVsbSIsIndpbmRvd1Njcm9sbGVyIiwiY2xpZW50SGVpZ2h0IiwiX2luaXRJdGVtSG9sZGVyIiwiX3NjYW5JdGVtSGVpZ2h0cyIsImdldEluZGV4RnJvbUtleSIsImxvd0RpcnR5S2V5IiwiaGlnaERpcnR5S2V5IiwiaXNEaXJ0eSIsIm5vZGVzIiwiY2hpbGROb2RlcyIsIm1heCIsImxlbmd0aCIsImkiLCJub2RlIiwiaXRlbUtleSIsImdldEF0dHJpYnV0ZSIsImNvbnNvbGUiLCJ3YXJuIiwibWVhc3VyZVNyYyIsImZpcnN0RWxlbWVudENoaWxkIiwib2JzZXJ2ZWQiLCJrbm93biIsIl9rbm93bkhlaWdodHMiLCJnZXQiLCJzZXQiLCJpbWluIiwiaW1heCIsImNhbGNIZWlnaHRzIiwia2V5IiwiZ2V0S2V5RnJvbUluZGV4IiwiaXRlbUhlaWdodEdldHRlciIsIk1hcCIsIk1hdGgiLCJwb3ciLCJfaHRtbFRvcE9mZnNldCIsIl93aW5kb3dTY3JvbGxMaXN0ZW5lckFkZGVkIiwiX2h0bWxFbG0iLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsInVuZGVmaW5lZCIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwiY29tcG9uZW50RGlkTW91bnQiLCJfdGhpcyRfd3JhcHBlckVsbSRnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwiX3RoaXMkX3dyYXBwZXJFbG0iLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJfcHJldlByb3BzJHNjcm9sbEVsZW0iLCJfdGhpcyRfd3JhcHBlckVsbTIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJfdGhpcyRfd3JhcHBlckVsbTMiLCJfaXNWaWV3Q2hhbmdlZCIsInVzZVJvb3QiLCJpbm5lckhlaWdodCIsInNjcm9sbFkiLCJ5U3RhcnQiLCJ5RW5kIiwicmVuZGVyIiwiX3RoaXMkcHJvcHMiLCJfdGhpcyRwcm9wcyRpbml0aWFsRHIiLCJpbml0aWFsRHJhdyIsIml0ZW1SZW5kZXJlciIsInZpZXdCdWZmZXIiLCJoZWlnaHRHZXR0ZXIiLCJpdGVtcyIsInN0YXJ0IiwiZW5kIiwicHJvZmlsZURhdGEiLCJfdGhpcyRfeVBvc2l0aW9ucyRnZXQiLCJoZWlnaHQiLCJzdHlsZSIsInBvc2l0aW9uIiwiYXR0cnMiLCJwdXNoIiwid3JhcHBlclByb3BzIiwicmVmIiwib25TY3JvbGwiLCJvdmVyZmxvd1kiLCJzY3JvbGxlclN0eWxlIiwiZ2V0RXN0aW1hdGVkSGVpZ2h0IiwiX2V4dGVuZHMiLCJjaGlsZHJlbiIsIm1hcmdpbiIsInBhZGRpbmciLCJjbGFzc05hbWUiLCJpdGVtc1dyYXBwZXJDbGFzc05hbWUiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVRpbWVsaW5lVmlld2VyL0xpc3RWaWV3L2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBUTmlsIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5pbXBvcnQgUG9zaXRpb25zIGZyb20gJy4vUG9zaXRpb25zJztcblxudHlwZSBUV3JhcHBlclByb3BzID0ge1xuICBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgcmVmOiAoZWxtOiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZDtcbiAgb25TY3JvbGw/OiAoKSA9PiB2b2lkO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZlxuICovXG5leHBvcnQgdHlwZSBUTGlzdFZpZXdQcm9wcyA9IHtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbGlzdC5cbiAgICovXG4gIGRhdGFMZW5ndGg6IG51bWJlcjtcbiAgLyoqXG4gICAqIENvbnZlcnQgaXRlbSBpbmRleCAobnVtYmVyKSB0byB0aGUga2V5IChzdHJpbmcpLiBMaXN0VmlldyB1c2VzIGJvdGggaW5kZXhlc1xuICAgKiBhbmQga2V5cyB0byBoYW5kbGUgdGhlIGFkZGl0aW9uIG9mIG5ldyByb3dzLlxuICAgKi9cbiAgZ2V0SW5kZXhGcm9tS2V5OiAoa2V5OiBzdHJpbmcpID0+IG51bWJlcjtcbiAgLyoqXG4gICAqIENvbnZlcnQgaXRlbSBrZXkgKHN0cmluZykgdG8gdGhlIGluZGV4IChudW1iZXIpLiBMaXN0VmlldyB1c2VzIGJvdGggaW5kZXhlc1xuICAgKiBhbmQga2V5cyB0byBoYW5kbGUgdGhlIGFkZGl0aW9uIG9mIG5ldyByb3dzLlxuICAgKi9cbiAgZ2V0S2V5RnJvbUluZGV4OiAoaW5kZXg6IG51bWJlcikgPT4gc3RyaW5nO1xuICAvKipcbiAgICogTnVtYmVyIG9mIGl0ZW1zIHRvIGRyYXcgYW5kIGFkZCB0byB0aGUgRE9NLCBpbml0aWFsbHkuXG4gICAqL1xuICBpbml0aWFsRHJhdz86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBwYXJlbnQgcHJvdmlkZXMgZmFsbGJhY2sgaGVpZ2h0IG1lYXN1cmVtZW50cyB3aGVuIHRoZXJlIGlzIG5vdCBhXG4gICAqIHJlbmRlcmVkIGVsZW1lbnQgdG8gbWVhc3VyZS5cbiAgICovXG4gIGl0ZW1IZWlnaHRHZXR0ZXI6IChpbmRleDogbnVtYmVyLCBrZXk6IHN0cmluZykgPT4gbnVtYmVyO1xuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCByZW5kZXJzIGFuIGl0ZW07IHJlbmRlcmVkIGl0ZW1zIGFyZSBhZGRlZCBkaXJlY3RseSB0byB0aGVcbiAgICogRE9NLCB0aGV5IGFyZSBub3Qgd3JhcHBlZCBpbiBsaXN0IGl0ZW0gd3JhcHBlciBIVE1MRWxlbWVudC5cbiAgICovXG4gIC8vIGl0ZW1SZW5kZXJlcihpdGVtS2V5LCBzdHlsZSwgaSwgYXR0cnMpXG4gIGl0ZW1SZW5kZXJlcjogKFxuICAgIGl0ZW1LZXk6IHN0cmluZyxcbiAgICBzdHlsZTogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPixcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGF0dHJpYnV0ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgKSA9PiBSZWFjdC5SZWFjdE5vZGU7XG4gIC8qKlxuICAgKiBgY2xhc3NOYW1lYCBmb3IgdGhlIEhUTUxFbGVtZW50IHRoYXQgaG9sZHMgdGhlIGl0ZW1zLlxuICAgKi9cbiAgaXRlbXNXcmFwcGVyQ2xhc3NOYW1lPzogc3RyaW5nO1xuICAvKipcbiAgICogV2hlbiBhZGRpbmcgbmV3IGl0ZW1zIHRvIHRoZSBET00sIHRoaXMgaXMgdGhlIG51bWJlciBvZiBpdGVtcyB0byBhZGQgYWJvdmVcbiAgICogYW5kIGJlbG93IHRoZSBjdXJyZW50IHZpZXcuIEUuZy4gaWYgbGlzdCBpcyAxMDAgaXRlbXMgYW5kIGlzIHNjcm9sbGVkXG4gICAqIGhhbGZ3YXkgZG93biAoc28gaXRlbXMgWzQ2LCA1NV0gYXJlIGluIHZpZXcpLCB0aGVuIHdoZW4gYSBuZXcgcmFuZ2Ugb2ZcbiAgICogaXRlbXMgaXMgcmVuZGVyZWQsIGl0IHdpbGwgcmVuZGVyIGl0ZW1zIGA0NiAtIHZpZXdCdWZmZXJgIHRvXG4gICAqIGA1NSArIHZpZXdCdWZmZXJgLlxuICAgKi9cbiAgdmlld0J1ZmZlcjogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIG1pbmltdW0gbnVtYmVyIG9mIGl0ZW1zIG9mZnNjcmVlbiBpbiBlaXRoZXIgZGlyZWN0aW9uOyBlLmcuIGF0IGxlYXN0XG4gICAqIGB2aWV3QnVmZmVyYCBudW1iZXIgb2YgaXRlbXMgbXVzdCBiZSBvZmYgc2NyZWVuIGFib3ZlIGFuZCBiZWxvdyB0aGVcbiAgICogY3VycmVudCB2aWV3LCBvciBtb3JlIGl0ZW1zIHdpbGwgYmUgcmVuZGVyZWQuXG4gICAqL1xuICB2aWV3QnVmZmVyTWluOiBudW1iZXI7XG4gIC8qKlxuICAgKiBXaGVuIGB0cnVlYCwgZXhwZWN0IGBfd3JhcHBlckVsbWAgdG8gaGF2ZSBgb3ZlcmZsb3c6IHZpc2libGVgIGFuZCB0byxcbiAgICogZXNzZW50aWFsbHksIGJlIHRhbGwgdG8gdGhlIHBvaW50IHRoZSBlbnRpcmUgcGFnZSB3aWxsIHdpbGwgZW5kIHVwXG4gICAqIHNjcm9sbGluZyBhcyBhIHJlc3VsdCBvZiB0aGUgTGlzdFZpZXcuIFNpbWlsYXIgdG8gcmVhY3QtdmlydHVhbGl6ZWRcbiAgICogd2luZG93IHNjcm9sbGVyLlxuICAgKlxuICAgKiAtIFJlZjogaHR0cHM6Ly9idmF1Z2huLmdpdGh1Yi5pby9yZWFjdC12aXJ0dWFsaXplZC8jL2NvbXBvbmVudHMvV2luZG93U2Nyb2xsZXJcbiAgICogLSBSZWY6aHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3QtdmlydHVhbGl6ZWQvYmxvYi80OTdlMmExOTQyNTI5NTYwNjgxZDY1YTllZjlmNWU5YzljOWE0OWJhL2RvY3MvV2luZG93U2Nyb2xsZXIubWRcbiAgICovXG4gIHdpbmRvd1Njcm9sbGVyPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFlvdSBuZWVkIHRvIHBhc3MgaW4gc2Nyb2xsRWxlbWVudCB3aGVuIHdpbmRvd1Njcm9sbGVyIGlzIHNldCB0byBmYWxzZS5cbiAgICogVGhpcyBlbGVtZW50IGlzIHJlc3BvbnNpYmxlIGZvciB0cmFja2luZyBzY3JvbGxpbmcgZm9yIGxhenkgbG9hZGluZy5cbiAgICovXG4gIHNjcm9sbEVsZW1lbnQ/OiBFbGVtZW50O1xufTtcblxuY29uc3QgREVGQVVMVF9JTklUSUFMX0RSQVcgPSAxMDA7XG5cbi8qKlxuICogVmlydHVhbGl6ZWQgbGlzdCB2aWV3IGNvbXBvbmVudCwgZm9yIHRoZSBtb3N0IHBhcnQsIG9ubHkgcmVuZGVycyB0aGUgd2luZG93XG4gKiBvZiBpdGVtcyB0aGF0IGFyZSBpbi12aWV3IHdpdGggc29tZSBidWZmZXIgYmVmb3JlIGFuZCBhZnRlci4gTGlzdGVucyBmb3JcbiAqIHNjcm9sbCBldmVudHMgYW5kIHVwZGF0ZXMgd2hpY2ggaXRlbXMgYXJlIHJlbmRlcmVkLiBTZWUgcmVhY3QtdmlydHVhbGl6ZWRcbiAqIGZvciBhIHN1aXRlIG9mIGNvbXBvbmVudHMgd2l0aCBzaW1pbGFyLCBidXQgZ2VuZXJhbGl6ZWQsIGZ1bmN0aW9uYWxpdHkuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZFxuICpcbiAqIE5vdGU6IFByZXNlbnRseSwgTGlzdFZpZXcgY2Fubm90IGJlIGEgUHVyZUNvbXBvbmVudC4gVGhpcyBpcyBiZWNhdXNlIExpc3RWaWV3XG4gKiBpcyBzZW5zaXRpdmUgdG8gdGhlIHVuZGVybHlpbmcgc3RhdGUgdGhhdCBkcml2ZXMgdGhlIGxpc3QgaXRlbXMsIGJ1dCBpdFxuICogZG9lc24ndCBhY3R1YWxseSByZWNlaXZlIHRoYXQgc3RhdGUuIFNvLCBhIHJlbmRlciBtYXkgc3RpbGwgYmUgcmVxdWlyZWQgZXZlblxuICogaWYgTGlzdFZpZXcncyBwcm9wcyBhcmUgdW5jaGFuZ2VkLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBMaXN0Vmlld1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUTGlzdFZpZXdQcm9wcz4ge1xuICAvKipcbiAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGhlaWdodCBhbmQgeS12YWx1ZSBvZiBpdGVtcywgYnkgaXRlbSBpbmRleCwgaW4gdGhlXG4gICAqIExpc3RWaWV3LlxuICAgKi9cbiAgX3lQb3NpdGlvbnM6IFBvc2l0aW9ucztcbiAgLyoqXG4gICAqIEtlZXAgdHJhY2sgb2YgdGhlIGtub3duIC8gbWVhc3VyZWQgaGVpZ2h0cyBvZiB0aGUgcmVuZGVyZWQgaXRlbXM7IHBvcHVsYXRlZFxuICAgKiB3aXRoIHZhbHVlcyB0aHJvdWdoIG9ic2VydmF0aW9uIGFuZCBrZXllZCBvbiB0aGUgaXRlbSBrZXksIG5vdCB0aGUgaXRlbVxuICAgKiBpbmRleC5cbiAgICovXG4gIF9rbm93bkhlaWdodHM6IE1hcDxzdHJpbmcsIG51bWJlcj47XG4gIC8qKlxuICAgKiBUaGUgc3RhcnQgaW5kZXggb2YgdGhlIGl0ZW1zIGN1cnJlbnRseSBkcmF3bi5cbiAgICovXG4gIF9zdGFydEluZGV4RHJhd246IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBlbmQgaW5kZXggb2YgdGhlIGl0ZW1zIGN1cnJlbnRseSBkcmF3bi5cbiAgICovXG4gIF9lbmRJbmRleERyYXduOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgc3RhcnQgaW5kZXggb2YgdGhlIGl0ZW1zIGN1cnJlbnRseSBpbiB2aWV3LlxuICAgKi9cbiAgX3N0YXJ0SW5kZXg6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBlbmQgaW5kZXggb2YgdGhlIGl0ZW1zIGN1cnJlbnRseSBpbiB2aWV3LlxuICAgKi9cbiAgX2VuZEluZGV4OiBudW1iZXI7XG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgdGhlIHZpc3VhbCB3aW5kb3csIGUuZy4gaGVpZ2h0IG9mIHRoZSBzY3JvbGxlciBlbGVtZW50LlxuICAgKi9cbiAgX3ZpZXdIZWlnaHQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIGBzY3JvbGxUb3BgIG9mIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbi5cbiAgICovXG4gIF9zY3JvbGxUb3A6IG51bWJlcjtcbiAgLyoqXG4gICAqIFVzZWQgdG8ga2VlcCB0cmFjayBvZiB3aGV0aGVyIG9yIG5vdCBhIHJlLWNhbGN1bGF0aW9uIG9mIHdoYXQgc2hvdWxkIGJlXG4gICAqIGRyYXduIC8gdmlld2FibGUgaGFzIGJlZW4gc2NoZWR1bGVkLlxuICAgKi9cbiAgX2lzU2Nyb2xsZWRPclJlc2l6ZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZiBgd2luZG93U2Nyb2xsZXJgIGlzIHRydWUsIHRoaXMgbm90ZXMgaG93IGZhciBkb3duIHRoZSBwYWdlIHRoZSBzY3JvbGxlclxuICAgKiBpcyBsb2NhdGVkLiAoTm90ZTogcmVwb3NpdGlvbmluZyBhbmQgYmVsb3ctdGhlLWZvbGQgdmlld3MgYXJlIHVudGVzdGVkKVxuICAgKi9cbiAgX2h0bWxUb3BPZmZzZXQ6IG51bWJlcjtcbiAgX3dpbmRvd1Njcm9sbExpc3RlbmVyQWRkZWQ6IGJvb2xlYW47XG4gIF9odG1sRWxtOiBIVE1MRWxlbWVudDtcbiAgLyoqXG4gICAqIEVsZW1lbnQgaG9sZGluZyB0aGUgc2Nyb2xsZXIuXG4gICAqL1xuICBfd3JhcHBlckVsbTogRWxlbWVudCB8IFROaWw7XG4gIC8qKlxuICAgKiBIVE1MRWxlbWVudCBob2xkaW5nIHRoZSByZW5kZXJlZCBpdGVtcy5cbiAgICovXG4gIF9pdGVtSG9sZGVyRWxtOiBIVE1MRWxlbWVudCB8IFROaWw7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbml0aWFsRHJhdzogREVGQVVMVF9JTklUSUFMX0RSQVcsXG4gICAgaXRlbXNXcmFwcGVyQ2xhc3NOYW1lOiAnJyxcbiAgICB3aW5kb3dTY3JvbGxlcjogZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFRMaXN0Vmlld1Byb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5feVBvc2l0aW9ucyA9IG5ldyBQb3NpdGlvbnMoMjAwKTtcbiAgICAvLyBfa25vd25IZWlnaHRzIGlzIChpdGVtLWtleSAtPiBvYnNlcnZlZCBoZWlnaHQpIG9mIGxpc3QgaXRlbXNcbiAgICB0aGlzLl9rbm93bkhlaWdodHMgPSBuZXcgTWFwKCk7XG5cbiAgICB0aGlzLl9zdGFydEluZGV4RHJhd24gPSAyICoqIDIwO1xuICAgIHRoaXMuX2VuZEluZGV4RHJhd24gPSAtKDIgKiogMjApO1xuICAgIHRoaXMuX3N0YXJ0SW5kZXggPSAwO1xuICAgIHRoaXMuX2VuZEluZGV4ID0gMDtcbiAgICB0aGlzLl92aWV3SGVpZ2h0ID0gLTE7XG4gICAgdGhpcy5fc2Nyb2xsVG9wID0gLTE7XG4gICAgdGhpcy5faXNTY3JvbGxlZE9yUmVzaXplZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5faHRtbFRvcE9mZnNldCA9IC0xO1xuICAgIHRoaXMuX3dpbmRvd1Njcm9sbExpc3RlbmVyQWRkZWQgPSBmYWxzZTtcbiAgICAvLyBfaHRtbEVsbSBpcyBvbmx5IHJlbGV2YW50IGlmIHByb3BzLndpbmRvd1Njcm9sbGVyIGlzIHRydWVcbiAgICB0aGlzLl9odG1sRWxtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IGFzIGFueTtcbiAgICB0aGlzLl93cmFwcGVyRWxtID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2l0ZW1Ib2xkZXJFbG0gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy53aW5kb3dTY3JvbGxlcikge1xuICAgICAgaWYgKHRoaXMuX3dyYXBwZXJFbG0pIHtcbiAgICAgICAgY29uc3QgeyB0b3AgfSA9IHRoaXMuX3dyYXBwZXJFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuX2h0bWxUb3BPZmZzZXQgPSB0b3AgKyB0aGlzLl9odG1sRWxtLnNjcm9sbFRvcDtcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCk7XG4gICAgICB0aGlzLl93aW5kb3dTY3JvbGxMaXN0ZW5lckFkZGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlIHdyYXBwZXIgZWxlbWVudCBzaG91bGQgYmUgdGhlIG9uZSB0aGF0IGhhbmRsZXMgdGhlIHNjcm9sbGluZy4gT25jZSB3ZSBhcmUgbm90IHVzaW5nIHNjcm9sbC1jYW52YXMgd2UgY2FuIHJlbW92ZSB0aGlzLlxuICAgICAgdGhpcy5fd3JhcHBlckVsbSA9IHRoaXMucHJvcHMuc2Nyb2xsRWxlbWVudDtcbiAgICAgIHRoaXMuX3dyYXBwZXJFbG0/LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX29uU2Nyb2xsKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBUTGlzdFZpZXdQcm9wcykge1xuICAgIGlmICh0aGlzLl9pdGVtSG9sZGVyRWxtKSB7XG4gICAgICB0aGlzLl9zY2FuSXRlbUhlaWdodHMoKTtcbiAgICB9XG4gICAgLy8gV2hlbiB3aW5kb3dTY3JvbGxlciBpcyBzZXQgdG8gZmFsc2UsIHdlIGNhbiBjb250aW51ZSB0byBoYW5kbGUgc2Nyb2xsRWxlbWVudFxuICAgIGlmICh0aGlzLnByb3BzLndpbmRvd1Njcm9sbGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNoZWNrIGlmIHRoZSBzY3JvbGxFbGVtZW50IGNoYW5nZXMgYW5kIHVwZGF0ZSBpdHMgc2Nyb2xsIGxpc3RlbmVyXG4gICAgaWYgKHByZXZQcm9wcy5zY3JvbGxFbGVtZW50ICE9PSB0aGlzLnByb3BzLnNjcm9sbEVsZW1lbnQpIHtcbiAgICAgIHByZXZQcm9wcy5zY3JvbGxFbGVtZW50Py5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCk7XG4gICAgICB0aGlzLl93cmFwcGVyRWxtID0gdGhpcy5wcm9wcy5zY3JvbGxFbGVtZW50O1xuICAgICAgdGhpcy5fd3JhcHBlckVsbT8uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLl93aW5kb3dTY3JvbGxMaXN0ZW5lckFkZGVkKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93cmFwcGVyRWxtPy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Vmlld0hlaWdodCA9ICgpID0+IHRoaXMuX3ZpZXdIZWlnaHQ7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW5kZXggb2YgdGhlIGl0ZW0gYXQgdGhlIGJvdHRvbSBvZiB0aGUgY3VycmVudCB2aWV3LlxuICAgKi9cbiAgZ2V0Qm90dG9tVmlzaWJsZUluZGV4ID0gKCk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgYm90dG9tWSA9IHRoaXMuX3Njcm9sbFRvcCArIHRoaXMuX3ZpZXdIZWlnaHQ7XG4gICAgcmV0dXJuIHRoaXMuX3lQb3NpdGlvbnMuZmluZEZsb29ySW5kZXgoYm90dG9tWSwgdGhpcy5fZ2V0SGVpZ2h0KTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IHRoZSBpbmRleCBvZiB0aGUgaXRlbSBhdCB0aGUgdG9wIG9mIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqL1xuICBnZXRUb3BWaXNpYmxlSW5kZXggPSAoKTogbnVtYmVyID0+IHRoaXMuX3lQb3NpdGlvbnMuZmluZEZsb29ySW5kZXgodGhpcy5fc2Nyb2xsVG9wLCB0aGlzLl9nZXRIZWlnaHQpO1xuXG4gIGdldFJvd1Bvc2l0aW9uID0gKGluZGV4OiBudW1iZXIpOiB7IGhlaWdodDogbnVtYmVyOyB5OiBudW1iZXIgfSA9PlxuICAgIHRoaXMuX3lQb3NpdGlvbnMuZ2V0Um93UG9zaXRpb24oaW5kZXgsIHRoaXMuX2dldEhlaWdodCk7XG5cbiAgc2Nyb2xsVG9JbmRleCA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGlzdCB2aWV3IHJlbGF0aXZlIHRvIHRoZSBzY3JvbGwgcGFyZW50XG4gICAgY29uc3QgeyBzY3JvbGxFbGVtZW50IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNjcm9sbEVsZW1lbnRUb3AgPSBzY3JvbGxFbGVtZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgfHwgMDtcbiAgICBjb25zdCBsaXN0Vmlld1RvcCA9IChzY3JvbGxFbGVtZW50Py5zY3JvbGxUb3AgfHwgMCkgKyAodGhpcy5faXRlbUhvbGRlckVsbT8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIHx8IDApO1xuICAgIGNvbnN0IGxpc3RWaWV3T2Zmc2V0ID0gbGlzdFZpZXdUb3AgLSBzY3JvbGxFbGVtZW50VG9wO1xuXG4gICAgY29uc3QgaXRlbU9mZnNldCA9IHRoaXMuZ2V0Um93UG9zaXRpb24oaW5kZXgpLnk7XG5cbiAgICAvLyBoYXJkIGNvZGUgYSBzbWFsbCBvZmZzZXQgdG8gbGVhdmUgYSBsaXR0bGUgYml0IG9mIHNwYWNlIGFib3ZlIHRoZSBmb2N1c2VkIHNwYW4sIHNvIGl0IGlzIHZpc3VhbGx5IGNsZWFyXG4gICAgLy8gdGhhdCB0aGVyZSBpcyBjb250ZW50IGFib3ZlXG4gICAgdGhpcy5wcm9wcy5zY3JvbGxFbGVtZW50Py5zY3JvbGxUbyh7IHRvcDogaXRlbU9mZnNldCArIGxpc3RWaWV3T2Zmc2V0IC0gODAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNjcm9sbCBldmVudCBsaXN0ZW5lciB0aGF0IHNjaGVkdWxlcyBhIHJlbWVhc3VyaW5nIG9mIHdoaWNoIGl0ZW1zIHNob3VsZCBiZVxuICAgKiByZW5kZXJlZC5cbiAgICovXG4gIF9vblNjcm9sbCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuX2lzU2Nyb2xsZWRPclJlc2l6ZWQpIHtcbiAgICAgIHRoaXMuX2lzU2Nyb2xsZWRPclJlc2l6ZWQgPSB0cnVlO1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9wb3NpdGlvbkxpc3QpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlzIHRoZSB2aWV3IGhlaWdodCAoc2Nyb2xsIHdpbmRvdykgb3Igc2Nyb2xsIHBvc2l0aW9uIGhhdmVcbiAgICogY2hhbmdlZC5cbiAgICovXG4gIF9pc1ZpZXdDaGFuZ2VkKCkge1xuICAgIGlmICghdGhpcy5fd3JhcHBlckVsbSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB1c2VSb290ID0gdGhpcy5wcm9wcy53aW5kb3dTY3JvbGxlcjtcbiAgICBjb25zdCBjbGllbnRIZWlnaHQgPSB1c2VSb290ID8gdGhpcy5faHRtbEVsbS5jbGllbnRIZWlnaHQgOiB0aGlzLl93cmFwcGVyRWxtLmNsaWVudEhlaWdodDtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB1c2VSb290ID8gdGhpcy5faHRtbEVsbS5zY3JvbGxUb3AgOiB0aGlzLl93cmFwcGVyRWxtLnNjcm9sbFRvcDtcbiAgICByZXR1cm4gY2xpZW50SGVpZ2h0ICE9PSB0aGlzLl92aWV3SGVpZ2h0IHx8IHNjcm9sbFRvcCAhPT0gdGhpcy5fc2Nyb2xsVG9wO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2FsY3VsYXRlIF9zdGFydEluZGV4IGFuZCBfZW5kSW5kZXgsIGUuZy4gd2hpY2ggaXRlbXMgYXJlIGluIHZpZXcuXG4gICAqL1xuICBfY2FsY1ZpZXdJbmRleGVzKCkge1xuICAgIGNvbnN0IHVzZVJvb3QgPSB0aGlzLnByb3BzLndpbmRvd1Njcm9sbGVyO1xuICAgIC8vIGZ1bmt5IGlmIHN0YXRlbWVudCBpcyB0byBzYXRpc2Z5IGZsb3dcbiAgICBpZiAoIXVzZVJvb3QpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoIXRoaXMuX3dyYXBwZXJFbG0pIHtcbiAgICAgICAgdGhpcy5fdmlld0hlaWdodCA9IC0xO1xuICAgICAgICB0aGlzLl9zdGFydEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fZW5kSW5kZXggPSAwO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl92aWV3SGVpZ2h0ID0gdGhpcy5fd3JhcHBlckVsbS5jbGllbnRIZWlnaHQ7XG4gICAgICB0aGlzLl9zY3JvbGxUb3AgPSB0aGlzLl93cmFwcGVyRWxtLnNjcm9sbFRvcDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdmlld0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMuX2h0bWxUb3BPZmZzZXQ7XG4gICAgICB0aGlzLl9zY3JvbGxUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICB9XG4gICAgY29uc3QgeVN0YXJ0ID0gdGhpcy5fc2Nyb2xsVG9wO1xuICAgIGNvbnN0IHlFbmQgPSB0aGlzLl9zY3JvbGxUb3AgKyB0aGlzLl92aWV3SGVpZ2h0O1xuICAgIHRoaXMuX3N0YXJ0SW5kZXggPSB0aGlzLl95UG9zaXRpb25zLmZpbmRGbG9vckluZGV4KHlTdGFydCwgdGhpcy5fZ2V0SGVpZ2h0KTtcbiAgICB0aGlzLl9lbmRJbmRleCA9IHRoaXMuX3lQb3NpdGlvbnMuZmluZEZsb29ySW5kZXgoeUVuZCwgdGhpcy5fZ2V0SGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja2VkIHRvIHNlZSBpZiB0aGUgY3VycmVudGx5IHJlbmRlcmVkIGl0ZW1zIGFyZSBzdWZmaWNpZW50LCBpZiBub3QsXG4gICAqIGZvcmNlIGFuIHVwZGF0ZSB0byB0cmlnZ2VyIG1vcmUgaXRlbXMgdG8gYmUgcmVuZGVyZWQuXG4gICAqL1xuICBfcG9zaXRpb25MaXN0ID0gKCkgPT4ge1xuICAgIHRoaXMuX2lzU2Nyb2xsZWRPclJlc2l6ZWQgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuX3dyYXBwZXJFbG0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY2FsY1ZpZXdJbmRleGVzKCk7XG4gICAgLy8gaW5kZXhlcyBkcmF3biBzaG91bGQgYmUgcGFkZGVkIGJ5IGF0IGxlYXN0IHByb3BzLnZpZXdCdWZmZXJNaW5cbiAgICBjb25zdCBtYXhTdGFydCA9IHRoaXMucHJvcHMudmlld0J1ZmZlck1pbiA+IHRoaXMuX3N0YXJ0SW5kZXggPyAwIDogdGhpcy5fc3RhcnRJbmRleCAtIHRoaXMucHJvcHMudmlld0J1ZmZlck1pbjtcbiAgICBjb25zdCBtaW5FbmQgPVxuICAgICAgdGhpcy5wcm9wcy52aWV3QnVmZmVyTWluIDwgdGhpcy5wcm9wcy5kYXRhTGVuZ3RoIC0gdGhpcy5fZW5kSW5kZXhcbiAgICAgICAgPyB0aGlzLl9lbmRJbmRleCArIHRoaXMucHJvcHMudmlld0J1ZmZlck1pblxuICAgICAgICA6IHRoaXMucHJvcHMuZGF0YUxlbmd0aCAtIDE7XG4gICAgaWYgKG1heFN0YXJ0IDwgdGhpcy5fc3RhcnRJbmRleERyYXduIHx8IG1pbkVuZCA+IHRoaXMuX2VuZEluZGV4RHJhd24pIHtcbiAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICB9XG4gIH07XG5cbiAgX2luaXRXcmFwcGVyID0gKGVsbTogSFRNTEVsZW1lbnQgfCBUTmlsKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLndpbmRvd1Njcm9sbGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3dyYXBwZXJFbG0gPSBlbG07XG4gICAgaWYgKGVsbSkge1xuICAgICAgdGhpcy5fdmlld0hlaWdodCA9IGVsbS5jbGllbnRIZWlnaHQ7XG4gICAgfVxuICB9O1xuXG4gIF9pbml0SXRlbUhvbGRlciA9IChlbG06IEhUTUxFbGVtZW50IHwgVE5pbCkgPT4ge1xuICAgIHRoaXMuX2l0ZW1Ib2xkZXJFbG0gPSBlbG07XG4gICAgdGhpcy5fc2Nhbkl0ZW1IZWlnaHRzKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdvIHRocm91Z2ggYWxsIGl0ZW1zIHRoYXQgYXJlIHJlbmRlcmVkIGFuZCBzYXZlIHRoZWlyIGhlaWdodCBiYXNlZCBvbiB0aGVpclxuICAgKiBpdGVtLWtleSAod2hpY2ggaXMgb24gYSBkYXRhLSogYXR0cmlidXRlKS4gSWYgYW55IG5ldyBvciBhZGp1c3RlZCBoZWlnaHRzXG4gICAqIGFyZSBmb3VuZCwgcmUtbWVhc3VyZSB0aGUgY3VycmVudCBrbm93biB5LXBvc2l0aW9ucyAodmlhIC55UG9zaXRpb25zKS5cbiAgICovXG4gIF9zY2FuSXRlbUhlaWdodHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2V0SW5kZXhGcm9tS2V5ID0gdGhpcy5wcm9wcy5nZXRJbmRleEZyb21LZXk7XG4gICAgaWYgKCF0aGlzLl9pdGVtSG9sZGVyRWxtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIG5vdGUgdGhlIGtleXMgZm9yIHRoZSBmaXJzdCBhbmQgbGFzdCBhbHRlcmVkIGhlaWdodHMsIHRoZSBgeVBvc2l0aW9uc2BcbiAgICAvLyBuZWVkcyB0byBiZSB1cGRhdGVkXG4gICAgbGV0IGxvd0RpcnR5S2V5ID0gbnVsbDtcbiAgICBsZXQgaGlnaERpcnR5S2V5ID0gbnVsbDtcbiAgICBsZXQgaXNEaXJ0eSA9IGZhbHNlO1xuICAgIC8vIGl0ZXJhdGluZyBjaGlsZE5vZGVzIGlzIGZhc3RlciB0aGFuIGNoaWxkcmVuXG4gICAgLy8gaHR0cHM6Ly9qc3BlcmYuY29tL2xhcmdlLWh0bWxjb2xsZWN0aW9uLXZzLWxhcmdlLW5vZGVsaXN0XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLl9pdGVtSG9sZGVyRWxtLmNoaWxkTm9kZXM7XG4gICAgY29uc3QgbWF4ID0gbm9kZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIGNvbnN0IG5vZGU6IEhUTUxFbGVtZW50ID0gbm9kZXNbaV0gYXMgYW55O1xuICAgICAgLy8gdXNlIGAuZ2V0QXR0cmlidXRlKC4uLilgIGluc3RlYWQgb2YgYC5kYXRhc2V0YCBmb3IgamVzdCAvIEpTRE9NXG4gICAgICBjb25zdCBpdGVtS2V5ID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXRlbS1rZXknKTtcbiAgICAgIGlmICghaXRlbUtleSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oJ2l0ZW1LZXkgbm90IGZvdW5kJyk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgLy8gbWVhc3VyZSB0aGUgZmlyc3QgY2hpbGQsIGlmIGl0J3MgYXZhaWxhYmxlLCBvdGhlcndpc2UgdGhlIG5vZGUgaXRzZWxmXG4gICAgICAvLyAobGlrZWx5IG5vdCB0cmFuc2ZlcmFibGUgdG8gb3RoZXIgY29udGV4dHMsIGFuZCBpbnN0ZWFkIGlzIHNwZWNpZmljIHRvXG4gICAgICAvLyBob3cgd2UgaGF2ZSB0aGUgaXRlbXMgcmVuZGVyZWQpXG4gICAgICBjb25zdCBtZWFzdXJlU3JjOiBFbGVtZW50ID0gbm9kZS5maXJzdEVsZW1lbnRDaGlsZCB8fCBub2RlO1xuICAgICAgY29uc3Qgb2JzZXJ2ZWQgPSBtZWFzdXJlU3JjLmNsaWVudEhlaWdodDtcbiAgICAgIGNvbnN0IGtub3duID0gdGhpcy5fa25vd25IZWlnaHRzLmdldChpdGVtS2V5KTtcbiAgICAgIGlmIChvYnNlcnZlZCAhPT0ga25vd24pIHtcbiAgICAgICAgdGhpcy5fa25vd25IZWlnaHRzLnNldChpdGVtS2V5LCBvYnNlcnZlZCk7XG4gICAgICAgIGlmICghaXNEaXJ0eSkge1xuICAgICAgICAgIGlzRGlydHkgPSB0cnVlO1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1tdWx0aS1hc3NpZ25cbiAgICAgICAgICBsb3dEaXJ0eUtleSA9IGhpZ2hEaXJ0eUtleSA9IGl0ZW1LZXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGlnaERpcnR5S2V5ID0gaXRlbUtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobG93RGlydHlLZXkgIT0gbnVsbCAmJiBoaWdoRGlydHlLZXkgIT0gbnVsbCkge1xuICAgICAgLy8gdXBkYXRlIHlQb3NpdGlvbnMsIHRoZW4gcmVkcmF3XG4gICAgICBjb25zdCBpbWluID0gZ2V0SW5kZXhGcm9tS2V5KGxvd0RpcnR5S2V5KTtcbiAgICAgIGNvbnN0IGltYXggPSBoaWdoRGlydHlLZXkgPT09IGxvd0RpcnR5S2V5ID8gaW1pbiA6IGdldEluZGV4RnJvbUtleShoaWdoRGlydHlLZXkpO1xuICAgICAgdGhpcy5feVBvc2l0aW9ucy5jYWxjSGVpZ2h0cyhpbWF4LCB0aGlzLl9nZXRIZWlnaHQsIGltaW4pO1xuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2V0IHRoZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgYXQgaW5kZXggYGlgOyBmaXJzdCBjaGVjayB0aGUga25vd24gaGVpZ2h0cyxcbiAgICogZmFsbGJhY2sgdG8gYC5wcm9wcy5pdGVtSGVpZ2h0R2V0dGVyKC4uLilgLlxuICAgKi9cbiAgX2dldEhlaWdodCA9IChpOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLnByb3BzLmdldEtleUZyb21JbmRleChpKTtcbiAgICBjb25zdCBrbm93biA9IHRoaXMuX2tub3duSGVpZ2h0cy5nZXQoa2V5KTtcbiAgICAvLyBrbm93biAhPT0ga25vd24gaWZmIGtub3duIGlzIE5hTlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoa25vd24gIT0gbnVsbCAmJiBrbm93biA9PT0ga25vd24pIHtcbiAgICAgIHJldHVybiBrbm93bjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbUhlaWdodEdldHRlcihpLCBrZXkpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhTGVuZ3RoLFxuICAgICAgZ2V0S2V5RnJvbUluZGV4LFxuICAgICAgaW5pdGlhbERyYXcgPSBERUZBVUxUX0lOSVRJQUxfRFJBVyxcbiAgICAgIGl0ZW1SZW5kZXJlcixcbiAgICAgIHZpZXdCdWZmZXIsXG4gICAgICB2aWV3QnVmZmVyTWluLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGhlaWdodEdldHRlciA9IHRoaXMuX2dldEhlaWdodDtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGxldCBzdGFydDtcbiAgICBsZXQgZW5kO1xuXG4gICAgdGhpcy5feVBvc2l0aW9ucy5wcm9maWxlRGF0YShkYXRhTGVuZ3RoKTtcblxuICAgIGlmICghdGhpcy5fd3JhcHBlckVsbSkge1xuICAgICAgc3RhcnQgPSAwO1xuICAgICAgZW5kID0gKGluaXRpYWxEcmF3IDwgZGF0YUxlbmd0aCA/IGluaXRpYWxEcmF3IDogZGF0YUxlbmd0aCkgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5faXNWaWV3Q2hhbmdlZCgpKSB7XG4gICAgICAgIHRoaXMuX2NhbGNWaWV3SW5kZXhlcygpO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF4U3RhcnQgPSB2aWV3QnVmZmVyTWluID4gdGhpcy5fc3RhcnRJbmRleCA/IDAgOiB0aGlzLl9zdGFydEluZGV4IC0gdmlld0J1ZmZlck1pbjtcbiAgICAgIGNvbnN0IG1pbkVuZCA9IHZpZXdCdWZmZXJNaW4gPCBkYXRhTGVuZ3RoIC0gdGhpcy5fZW5kSW5kZXggPyB0aGlzLl9lbmRJbmRleCArIHZpZXdCdWZmZXJNaW4gOiBkYXRhTGVuZ3RoIC0gMTtcbiAgICAgIGlmIChtYXhTdGFydCA8IHRoaXMuX3N0YXJ0SW5kZXhEcmF3biB8fCBtaW5FbmQgPiB0aGlzLl9lbmRJbmRleERyYXduKSB7XG4gICAgICAgIHN0YXJ0ID0gdmlld0J1ZmZlciA+IHRoaXMuX3N0YXJ0SW5kZXggPyAwIDogdGhpcy5fc3RhcnRJbmRleCAtIHZpZXdCdWZmZXI7XG4gICAgICAgIGVuZCA9IHRoaXMuX2VuZEluZGV4ICsgdmlld0J1ZmZlcjtcbiAgICAgICAgaWYgKGVuZCA+PSBkYXRhTGVuZ3RoKSB7XG4gICAgICAgICAgZW5kID0gZGF0YUxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fc3RhcnRJbmRleERyYXduO1xuICAgICAgICBlbmQgPSB0aGlzLl9lbmRJbmRleERyYXduID4gZGF0YUxlbmd0aCAtIDEgPyBkYXRhTGVuZ3RoIC0gMSA6IHRoaXMuX2VuZEluZGV4RHJhd247XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5feVBvc2l0aW9ucy5jYWxjSGVpZ2h0cyhlbmQsIGhlaWdodEdldHRlciwgc3RhcnQgfHwgLTEpO1xuICAgIHRoaXMuX3N0YXJ0SW5kZXhEcmF3biA9IHN0YXJ0O1xuICAgIHRoaXMuX2VuZEluZGV4RHJhd24gPSBlbmQ7XG5cbiAgICBpdGVtcy5sZW5ndGggPSBlbmQgLSBzdGFydCArIDE7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgICBjb25zdCB7IHk6IHRvcCwgaGVpZ2h0IH0gPSB0aGlzLl95UG9zaXRpb25zLmdldFJvd1Bvc2l0aW9uKGksIGhlaWdodEdldHRlcik7XG4gICAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB0b3AsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBnZXRLZXlGcm9tSW5kZXgoaSk7XG4gICAgICBjb25zdCBhdHRycyA9IHsgJ2RhdGEtaXRlbS1rZXknOiBpdGVtS2V5IH07XG4gICAgICBpdGVtcy5wdXNoKGl0ZW1SZW5kZXJlcihpdGVtS2V5LCBzdHlsZSwgaSwgYXR0cnMpKTtcbiAgICB9XG4gICAgY29uc3Qgd3JhcHBlclByb3BzOiBUV3JhcHBlclByb3BzID0ge1xuICAgICAgc3R5bGU6IHsgcG9zaXRpb246ICdyZWxhdGl2ZScgfSxcbiAgICAgIHJlZjogdGhpcy5faW5pdFdyYXBwZXIsXG4gICAgfTtcbiAgICBpZiAoIXRoaXMucHJvcHMud2luZG93U2Nyb2xsZXIpIHtcbiAgICAgIHdyYXBwZXJQcm9wcy5vblNjcm9sbCA9IHRoaXMuX29uU2Nyb2xsO1xuICAgICAgd3JhcHBlclByb3BzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgIHdyYXBwZXJQcm9wcy5zdHlsZS5vdmVyZmxvd1kgPSAnYXV0byc7XG4gICAgfVxuICAgIGNvbnN0IHNjcm9sbGVyU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyBhcyAncmVsYXRpdmUnLFxuICAgICAgaGVpZ2h0OiB0aGlzLl95UG9zaXRpb25zLmdldEVzdGltYXRlZEhlaWdodCgpLFxuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgey4uLndyYXBwZXJQcm9wc30gZGF0YS10ZXN0aWQ9XCJMaXN0Vmlld1wiPlxuICAgICAgICA8ZGl2IHN0eWxlPXtzY3JvbGxlclN0eWxlfT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLml0ZW1zV3JhcHBlckNsYXNzTmFtZX1cbiAgICAgICAgICAgIHJlZj17dGhpcy5faW5pdEl0ZW1Ib2xkZXJ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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