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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWFjdCIsIlBvc2l0aW9ucyIsImpzeCIsIl9qc3giLCJERUZBVUxUX0lOSVRJQUxfRFJBVyIsIkxpc3RWaWV3IiwiX1JlYWN0JENvbXBvbmVudCIsInByb3BzIiwiX3RoaXMiLCJjYWxsIiwiZ2V0Vmlld0hlaWdodCIsIl92aWV3SGVpZ2h0IiwiZ2V0Qm90dG9tVmlzaWJsZUluZGV4IiwiYm90dG9tWSIsIl9zY3JvbGxUb3AiLCJfeVBvc2l0aW9ucyIsImZpbmRGbG9vckluZGV4IiwiX2dldEhlaWdodCIsImdldFRvcFZpc2libGVJbmRleCIsImdldFJvd1Bvc2l0aW9uIiwiaW5kZXgiLCJzY3JvbGxUb0luZGV4IiwiX3RoaXMkX2l0ZW1Ib2xkZXJFbG0iLCJfdGhpcyRwcm9wcyRzY3JvbGxFbGUiLCJzY3JvbGxFbGVtZW50Iiwic2Nyb2xsRWxlbWVudFRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImxpc3RWaWV3VG9wIiwic2Nyb2xsVG9wIiwiX2l0ZW1Ib2xkZXJFbG0iLCJsaXN0Vmlld09mZnNldCIsIml0ZW1PZmZzZXQiLCJ5Iiwic2Nyb2xsVG8iLCJfb25TY3JvbGwiLCJfaXNTY3JvbGxlZE9yUmVzaXplZCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9wb3NpdGlvbkxpc3QiLCJfd3JhcHBlckVsbSIsIl9jYWxjVmlld0luZGV4ZXMiLCJtYXhTdGFydCIsInZpZXdCdWZmZXJNaW4iLCJfc3RhcnRJbmRleCIsIm1pbkVuZCIsImRhdGFMZW5ndGgiLCJfZW5kSW5kZXgiLCJfc3RhcnRJbmRleERyYXduIiwiX2VuZEluZGV4RHJhd24iLCJmb3JjZVVwZGF0ZSIsIl9pbml0V3JhcHBlciIsImVsbSIsIndpbmRvd1Njcm9sbGVyIiwiY2xpZW50SGVpZ2h0IiwiX2luaXRJdGVtSG9sZGVyIiwiX3NjYW5JdGVtSGVpZ2h0cyIsImdldEluZGV4RnJvbUtleSIsImxvd0RpcnR5S2V5IiwiaGlnaERpcnR5S2V5IiwiaXNEaXJ0eSIsIm5vZGVzIiwiY2hpbGROb2RlcyIsIm1heCIsImxlbmd0aCIsImkiLCJub2RlIiwiaXRlbUtleSIsImdldEF0dHJpYnV0ZSIsImNvbnNvbGUiLCJ3YXJuIiwibWVhc3VyZVNyYyIsImZpcnN0RWxlbWVudENoaWxkIiwib2JzZXJ2ZWQiLCJrbm93biIsIl9rbm93bkhlaWdodHMiLCJnZXQiLCJzZXQiLCJpbWluIiwiaW1heCIsImNhbGNIZWlnaHRzIiwia2V5IiwiZ2V0S2V5RnJvbUluZGV4IiwiaXRlbUhlaWdodEdldHRlciIsIk1hcCIsIk1hdGgiLCJwb3ciLCJfaHRtbFRvcE9mZnNldCIsIl93aW5kb3dTY3JvbGxMaXN0ZW5lckFkZGVkIiwiX2h0bWxFbG0iLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsInVuZGVmaW5lZCIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwiY29tcG9uZW50RGlkTW91bnQiLCJfdGhpcyRfd3JhcHBlckVsbSRnZXQiLCJhZGRFdmVudExpc3RlbmVyIiwiX3RoaXMkX3dyYXBwZXJFbG0iLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJfcHJldlByb3BzJHNjcm9sbEVsZW0iLCJfdGhpcyRfd3JhcHBlckVsbTIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJfdGhpcyRfd3JhcHBlckVsbTMiLCJfaXNWaWV3Q2hhbmdlZCIsInVzZVJvb3QiLCJpbm5lckhlaWdodCIsInNjcm9sbFkiLCJ5U3RhcnQiLCJ5RW5kIiwicmVuZGVyIiwiX3RoaXMkcHJvcHMiLCJfdGhpcyRwcm9wcyRpbml0aWFsRHIiLCJpbml0aWFsRHJhdyIsIml0ZW1SZW5kZXJlciIsInZpZXdCdWZmZXIiLCJoZWlnaHRHZXR0ZXIiLCJpdGVtcyIsInN0YXJ0IiwiZW5kIiwicHJvZmlsZURhdGEiLCJfdGhpcyRfeVBvc2l0aW9ucyRnZXQiLCJoZWlnaHQiLCJzdHlsZSIsInBvc2l0aW9uIiwiYXR0cnMiLCJwdXNoIiwid3JhcHBlclByb3BzIiwicmVmIiwib25TY3JvbGwiLCJvdmVyZmxvd1kiLCJzY3JvbGxlclN0eWxlIiwiZ2V0RXN0aW1hdGVkSGVpZ2h0IiwiX2V4dGVuZHMiLCJjaGlsZHJlbiIsIm1hcmdpbiIsInBhZGRpbmciLCJjbGFzc05hbWUiLCJpdGVtc1dyYXBwZXJDbGFzc05hbWUiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1RyYWNlVGltZWxpbmVWaWV3ZXIvTGlzdFZpZXcvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFROaWwgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5cbmltcG9ydCBQb3NpdGlvbnMgZnJvbSAnLi9Qb3NpdGlvbnMnO1xuXG50eXBlIFRXcmFwcGVyUHJvcHMgPSB7XG4gIHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xuICByZWY6IChlbG06IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkO1xuICBvblNjcm9sbD86ICgpID0+IHZvaWQ7XG59O1xuXG4vKipcbiAqIEB0eXBlZGVmXG4gKi9cbmV4cG9ydCB0eXBlIFRMaXN0Vmlld1Byb3BzID0ge1xuICAvKipcbiAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0LlxuICAgKi9cbiAgZGF0YUxlbmd0aDogbnVtYmVyO1xuICAvKipcbiAgICogQ29udmVydCBpdGVtIGluZGV4IChudW1iZXIpIHRvIHRoZSBrZXkgKHN0cmluZykuIExpc3RWaWV3IHVzZXMgYm90aCBpbmRleGVzXG4gICAqIGFuZCBrZXlzIHRvIGhhbmRsZSB0aGUgYWRkaXRpb24gb2YgbmV3IHJvd3MuXG4gICAqL1xuICBnZXRJbmRleEZyb21LZXk6IChrZXk6IHN0cmluZykgPT4gbnVtYmVyO1xuICAvKipcbiAgICogQ29udmVydCBpdGVtIGtleSAoc3RyaW5nKSB0byB0aGUgaW5kZXggKG51bWJlcikuIExpc3RWaWV3IHVzZXMgYm90aCBpbmRleGVzXG4gICAqIGFuZCBrZXlzIHRvIGhhbmRsZSB0aGUgYWRkaXRpb24gb2YgbmV3IHJvd3MuXG4gICAqL1xuICBnZXRLZXlGcm9tSW5kZXg6IChpbmRleDogbnVtYmVyKSA9PiBzdHJpbmc7XG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgaXRlbXMgdG8gZHJhdyBhbmQgYWRkIHRvIHRoZSBET00sIGluaXRpYWxseS5cbiAgICovXG4gIGluaXRpYWxEcmF3PzogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHBhcmVudCBwcm92aWRlcyBmYWxsYmFjayBoZWlnaHQgbWVhc3VyZW1lbnRzIHdoZW4gdGhlcmUgaXMgbm90IGFcbiAgICogcmVuZGVyZWQgZWxlbWVudCB0byBtZWFzdXJlLlxuICAgKi9cbiAgaXRlbUhlaWdodEdldHRlcjogKGluZGV4OiBudW1iZXIsIGtleTogc3RyaW5nKSA9PiBudW1iZXI7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHJlbmRlcnMgYW4gaXRlbTsgcmVuZGVyZWQgaXRlbXMgYXJlIGFkZGVkIGRpcmVjdGx5IHRvIHRoZVxuICAgKiBET00sIHRoZXkgYXJlIG5vdCB3cmFwcGVkIGluIGxpc3QgaXRlbSB3cmFwcGVyIEhUTUxFbGVtZW50LlxuICAgKi9cbiAgLy8gaXRlbVJlbmRlcmVyKGl0ZW1LZXksIHN0eWxlLCBpLCBhdHRycylcbiAgaXRlbVJlbmRlcmVyOiAoXG4gICAgaXRlbUtleTogc3RyaW5nLFxuICAgIHN0eWxlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXI+LFxuICAgIGluZGV4OiBudW1iZXIsXG4gICAgYXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuICApID0+IFJlYWN0LlJlYWN0Tm9kZTtcbiAgLyoqXG4gICAqIGBjbGFzc05hbWVgIGZvciB0aGUgSFRNTEVsZW1lbnQgdGhhdCBob2xkcyB0aGUgaXRlbXMuXG4gICAqL1xuICBpdGVtc1dyYXBwZXJDbGFzc05hbWU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaGVuIGFkZGluZyBuZXcgaXRlbXMgdG8gdGhlIERPTSwgdGhpcyBpcyB0aGUgbnVtYmVyIG9mIGl0ZW1zIHRvIGFkZCBhYm92ZVxuICAgKiBhbmQgYmVsb3cgdGhlIGN1cnJlbnQgdmlldy4gRS5nLiBpZiBsaXN0IGlzIDEwMCBpdGVtcyBhbmQgaXMgc2Nyb2xsZWRcbiAgICogaGFsZndheSBkb3duIChzbyBpdGVtcyBbNDYsIDU1XSBhcmUgaW4gdmlldyksIHRoZW4gd2hlbiBhIG5ldyByYW5nZSBvZlxuICAgKiBpdGVtcyBpcyByZW5kZXJlZCwgaXQgd2lsbCByZW5kZXIgaXRlbXMgYDQ2IC0gdmlld0J1ZmZlcmAgdG9cbiAgICogYDU1ICsgdmlld0J1ZmZlcmAuXG4gICAqL1xuICB2aWV3QnVmZmVyOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBudW1iZXIgb2YgaXRlbXMgb2Zmc2NyZWVuIGluIGVpdGhlciBkaXJlY3Rpb247IGUuZy4gYXQgbGVhc3RcbiAgICogYHZpZXdCdWZmZXJgIG51bWJlciBvZiBpdGVtcyBtdXN0IGJlIG9mZiBzY3JlZW4gYWJvdmUgYW5kIGJlbG93IHRoZVxuICAgKiBjdXJyZW50IHZpZXcsIG9yIG1vcmUgaXRlbXMgd2lsbCBiZSByZW5kZXJlZC5cbiAgICovXG4gIHZpZXdCdWZmZXJNaW46IG51bWJlcjtcbiAgLyoqXG4gICAqIFdoZW4gYHRydWVgLCBleHBlY3QgYF93cmFwcGVyRWxtYCB0byBoYXZlIGBvdmVyZmxvdzogdmlzaWJsZWAgYW5kIHRvLFxuICAgKiBlc3NlbnRpYWxseSwgYmUgdGFsbCB0byB0aGUgcG9pbnQgdGhlIGVudGlyZSBwYWdlIHdpbGwgd2lsbCBlbmQgdXBcbiAgICogc2Nyb2xsaW5nIGFzIGEgcmVzdWx0IG9mIHRoZSBMaXN0Vmlldy4gU2ltaWxhciB0byByZWFjdC12aXJ0dWFsaXplZFxuICAgKiB3aW5kb3cgc2Nyb2xsZXIuXG4gICAqXG4gICAqIC0gUmVmOiBodHRwczovL2J2YXVnaG4uZ2l0aHViLmlvL3JlYWN0LXZpcnR1YWxpemVkLyMvY29tcG9uZW50cy9XaW5kb3dTY3JvbGxlclxuICAgKiAtIFJlZjpodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZC9ibG9iLzQ5N2UyYTE5NDI1Mjk1NjA2ODFkNjVhOWVmOWY1ZTljOWM5YTQ5YmEvZG9jcy9XaW5kb3dTY3JvbGxlci5tZFxuICAgKi9cbiAgd2luZG93U2Nyb2xsZXI/OiBib29sZWFuO1xuICAvKipcbiAgICogWW91IG5lZWQgdG8gcGFzcyBpbiBzY3JvbGxFbGVtZW50IHdoZW4gd2luZG93U2Nyb2xsZXIgaXMgc2V0IHRvIGZhbHNlLlxuICAgKiBUaGlzIGVsZW1lbnQgaXMgcmVzcG9uc2libGUgZm9yIHRyYWNraW5nIHNjcm9sbGluZyBmb3IgbGF6eSBsb2FkaW5nLlxuICAgKi9cbiAgc2Nyb2xsRWxlbWVudD86IEVsZW1lbnQ7XG59O1xuXG5jb25zdCBERUZBVUxUX0lOSVRJQUxfRFJBVyA9IDEwMDtcblxuLyoqXG4gKiBWaXJ0dWFsaXplZCBsaXN0IHZpZXcgY29tcG9uZW50LCBmb3IgdGhlIG1vc3QgcGFydCwgb25seSByZW5kZXJzIHRoZSB3aW5kb3dcbiAqIG9mIGl0ZW1zIHRoYXQgYXJlIGluLXZpZXcgd2l0aCBzb21lIGJ1ZmZlciBiZWZvcmUgYW5kIGFmdGVyLiBMaXN0ZW5zIGZvclxuICogc2Nyb2xsIGV2ZW50cyBhbmQgdXBkYXRlcyB3aGljaCBpdGVtcyBhcmUgcmVuZGVyZWQuIFNlZSByZWFjdC12aXJ0dWFsaXplZFxuICogZm9yIGEgc3VpdGUgb2YgY29tcG9uZW50cyB3aXRoIHNpbWlsYXIsIGJ1dCBnZW5lcmFsaXplZCwgZnVuY3Rpb25hbGl0eS5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9idmF1Z2huL3JlYWN0LXZpcnR1YWxpemVkXG4gKlxuICogTm90ZTogUHJlc2VudGx5LCBMaXN0VmlldyBjYW5ub3QgYmUgYSBQdXJlQ29tcG9uZW50LiBUaGlzIGlzIGJlY2F1c2UgTGlzdFZpZXdcbiAqIGlzIHNlbnNpdGl2ZSB0byB0aGUgdW5kZXJseWluZyBzdGF0ZSB0aGF0IGRyaXZlcyB0aGUgbGlzdCBpdGVtcywgYnV0IGl0XG4gKiBkb2Vzbid0IGFjdHVhbGx5IHJlY2VpdmUgdGhhdCBzdGF0ZS4gU28sIGEgcmVuZGVyIG1heSBzdGlsbCBiZSByZXF1aXJlZCBldmVuXG4gKiBpZiBMaXN0VmlldydzIHByb3BzIGFyZSB1bmNoYW5nZWQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIExpc3RWaWV3XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFRMaXN0Vmlld1Byb3BzPiB7XG4gIC8qKlxuICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgaGVpZ2h0IGFuZCB5LXZhbHVlIG9mIGl0ZW1zLCBieSBpdGVtIGluZGV4LCBpbiB0aGVcbiAgICogTGlzdFZpZXcuXG4gICAqL1xuICBfeVBvc2l0aW9uczogUG9zaXRpb25zO1xuICAvKipcbiAgICogS2VlcCB0cmFjayBvZiB0aGUga25vd24gLyBtZWFzdXJlZCBoZWlnaHRzIG9mIHRoZSByZW5kZXJlZCBpdGVtczsgcG9wdWxhdGVkXG4gICAqIHdpdGggdmFsdWVzIHRocm91Z2ggb2JzZXJ2YXRpb24gYW5kIGtleWVkIG9uIHRoZSBpdGVtIGtleSwgbm90IHRoZSBpdGVtXG4gICAqIGluZGV4LlxuICAgKi9cbiAgX2tub3duSGVpZ2h0czogTWFwPHN0cmluZywgbnVtYmVyPjtcbiAgLyoqXG4gICAqIFRoZSBzdGFydCBpbmRleCBvZiB0aGUgaXRlbXMgY3VycmVudGx5IGRyYXduLlxuICAgKi9cbiAgX3N0YXJ0SW5kZXhEcmF3bjogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGVuZCBpbmRleCBvZiB0aGUgaXRlbXMgY3VycmVudGx5IGRyYXduLlxuICAgKi9cbiAgX2VuZEluZGV4RHJhd246IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSBzdGFydCBpbmRleCBvZiB0aGUgaXRlbXMgY3VycmVudGx5IGluIHZpZXcuXG4gICAqL1xuICBfc3RhcnRJbmRleDogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIGVuZCBpbmRleCBvZiB0aGUgaXRlbXMgY3VycmVudGx5IGluIHZpZXcuXG4gICAqL1xuICBfZW5kSW5kZXg6IG51bWJlcjtcbiAgLyoqXG4gICAqIEhlaWdodCBvZiB0aGUgdmlzdWFsIHdpbmRvdywgZS5nLiBoZWlnaHQgb2YgdGhlIHNjcm9sbGVyIGVsZW1lbnQuXG4gICAqL1xuICBfdmlld0hlaWdodDogbnVtYmVyO1xuICAvKipcbiAgICogYHNjcm9sbFRvcGAgb2YgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uLlxuICAgKi9cbiAgX3Njcm9sbFRvcDogbnVtYmVyO1xuICAvKipcbiAgICogVXNlZCB0byBrZWVwIHRyYWNrIG9mIHdoZXRoZXIgb3Igbm90IGEgcmUtY2FsY3VsYXRpb24gb2Ygd2hhdCBzaG91bGQgYmVcbiAgICogZHJhd24gLyB2aWV3YWJsZSBoYXMgYmVlbiBzY2hlZHVsZWQuXG4gICAqL1xuICBfaXNTY3JvbGxlZE9yUmVzaXplZDogYm9vbGVhbjtcbiAgLyoqXG4gICAqIElmIGB3aW5kb3dTY3JvbGxlcmAgaXMgdHJ1ZSwgdGhpcyBub3RlcyBob3cgZmFyIGRvd24gdGhlIHBhZ2UgdGhlIHNjcm9sbGVyXG4gICAqIGlzIGxvY2F0ZWQuIChOb3RlOiByZXBvc2l0aW9uaW5nIGFuZCBiZWxvdy10aGUtZm9sZCB2aWV3cyBhcmUgdW50ZXN0ZWQpXG4gICAqL1xuICBfaHRtbFRvcE9mZnNldDogbnVtYmVyO1xuICBfd2luZG93U2Nyb2xsTGlzdGVuZXJBZGRlZDogYm9vbGVhbjtcbiAgX2h0bWxFbG06IEhUTUxFbGVtZW50O1xuICAvKipcbiAgICogRWxlbWVudCBob2xkaW5nIHRoZSBzY3JvbGxlci5cbiAgICovXG4gIF93cmFwcGVyRWxtOiBFbGVtZW50IHwgVE5pbDtcbiAgLyoqXG4gICAqIEhUTUxFbGVtZW50IGhvbGRpbmcgdGhlIHJlbmRlcmVkIGl0ZW1zLlxuICAgKi9cbiAgX2l0ZW1Ib2xkZXJFbG06IEhUTUxFbGVtZW50IHwgVE5pbDtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGluaXRpYWxEcmF3OiBERUZBVUxUX0lOSVRJQUxfRFJBVyxcbiAgICBpdGVtc1dyYXBwZXJDbGFzc05hbWU6ICcnLFxuICAgIHdpbmRvd1Njcm9sbGVyOiBmYWxzZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogVExpc3RWaWV3UHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLl95UG9zaXRpb25zID0gbmV3IFBvc2l0aW9ucygyMDApO1xuICAgIC8vIF9rbm93bkhlaWdodHMgaXMgKGl0ZW0ta2V5IC0+IG9ic2VydmVkIGhlaWdodCkgb2YgbGlzdCBpdGVtc1xuICAgIHRoaXMuX2tub3duSGVpZ2h0cyA9IG5ldyBNYXAoKTtcblxuICAgIHRoaXMuX3N0YXJ0SW5kZXhEcmF3biA9IDIgKiogMjA7XG4gICAgdGhpcy5fZW5kSW5kZXhEcmF3biA9IC0oMiAqKiAyMCk7XG4gICAgdGhpcy5fc3RhcnRJbmRleCA9IDA7XG4gICAgdGhpcy5fZW5kSW5kZXggPSAwO1xuICAgIHRoaXMuX3ZpZXdIZWlnaHQgPSAtMTtcbiAgICB0aGlzLl9zY3JvbGxUb3AgPSAtMTtcbiAgICB0aGlzLl9pc1Njcm9sbGVkT3JSZXNpemVkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9odG1sVG9wT2Zmc2V0ID0gLTE7XG4gICAgdGhpcy5fd2luZG93U2Nyb2xsTGlzdGVuZXJBZGRlZCA9IGZhbHNlO1xuICAgIC8vIF9odG1sRWxtIGlzIG9ubHkgcmVsZXZhbnQgaWYgcHJvcHMud2luZG93U2Nyb2xsZXIgaXMgdHJ1ZVxuICAgIHRoaXMuX2h0bWxFbG0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgYXMgYW55O1xuICAgIHRoaXMuX3dyYXBwZXJFbG0gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5faXRlbUhvbGRlckVsbSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLndpbmRvd1Njcm9sbGVyKSB7XG4gICAgICBpZiAodGhpcy5fd3JhcHBlckVsbSkge1xuICAgICAgICBjb25zdCB7IHRvcCB9ID0gdGhpcy5fd3JhcHBlckVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5faHRtbFRvcE9mZnNldCA9IHRvcCArIHRoaXMuX2h0bWxFbG0uc2Nyb2xsVG9wO1xuICAgICAgfVxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX29uU2Nyb2xsKTtcbiAgICAgIHRoaXMuX3dpbmRvd1Njcm9sbExpc3RlbmVyQWRkZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgd3JhcHBlciBlbGVtZW50IHNob3VsZCBiZSB0aGUgb25lIHRoYXQgaGFuZGxlcyB0aGUgc2Nyb2xsaW5nLiBPbmNlIHdlIGFyZSBub3QgdXNpbmcgc2Nyb2xsLWNhbnZhcyB3ZSBjYW4gcmVtb3ZlIHRoaXMuXG4gICAgICB0aGlzLl93cmFwcGVyRWxtID0gdGhpcy5wcm9wcy5zY3JvbGxFbGVtZW50O1xuICAgICAgdGhpcy5fd3JhcHBlckVsbT8uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IFRMaXN0Vmlld1Byb3BzKSB7XG4gICAgaWYgKHRoaXMuX2l0ZW1Ib2xkZXJFbG0pIHtcbiAgICAgIHRoaXMuX3NjYW5JdGVtSGVpZ2h0cygpO1xuICAgIH1cbiAgICAvLyBXaGVuIHdpbmRvd1Njcm9sbGVyIGlzIHNldCB0byBmYWxzZSwgd2UgY2FuIGNvbnRpbnVlIHRvIGhhbmRsZSBzY3JvbGxFbGVtZW50XG4gICAgaWYgKHRoaXMucHJvcHMud2luZG93U2Nyb2xsZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY2hlY2sgaWYgdGhlIHNjcm9sbEVsZW1lbnQgY2hhbmdlcyBhbmQgdXBkYXRlIGl0cyBzY3JvbGwgbGlzdGVuZXJcbiAgICBpZiAocHJldlByb3BzLnNjcm9sbEVsZW1lbnQgIT09IHRoaXMucHJvcHMuc2Nyb2xsRWxlbWVudCkge1xuICAgICAgcHJldlByb3BzLnNjcm9sbEVsZW1lbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX29uU2Nyb2xsKTtcbiAgICAgIHRoaXMuX3dyYXBwZXJFbG0gPSB0aGlzLnByb3BzLnNjcm9sbEVsZW1lbnQ7XG4gICAgICB0aGlzLl93cmFwcGVyRWxtPy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMuX3dpbmRvd1Njcm9sbExpc3RlbmVyQWRkZWQpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9vblNjcm9sbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3dyYXBwZXJFbG0/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX29uU2Nyb2xsKTtcbiAgICB9XG4gIH1cblxuICBnZXRWaWV3SGVpZ2h0ID0gKCkgPT4gdGhpcy5fdmlld0hlaWdodDtcblxuICAvKipcbiAgICogR2V0IHRoZSBpbmRleCBvZiB0aGUgaXRlbSBhdCB0aGUgYm90dG9tIG9mIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqL1xuICBnZXRCb3R0b21WaXNpYmxlSW5kZXggPSAoKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBib3R0b21ZID0gdGhpcy5fc2Nyb2xsVG9wICsgdGhpcy5fdmlld0hlaWdodDtcbiAgICByZXR1cm4gdGhpcy5feVBvc2l0aW9ucy5maW5kRmxvb3JJbmRleChib3R0b21ZLCB0aGlzLl9nZXRIZWlnaHQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGluZGV4IG9mIHRoZSBpdGVtIGF0IHRoZSB0b3Agb2YgdGhlIGN1cnJlbnQgdmlldy5cbiAgICovXG4gIGdldFRvcFZpc2libGVJbmRleCA9ICgpOiBudW1iZXIgPT4gdGhpcy5feVBvc2l0aW9ucy5maW5kRmxvb3JJbmRleCh0aGlzLl9zY3JvbGxUb3AsIHRoaXMuX2dldEhlaWdodCk7XG5cbiAgZ2V0Um93UG9zaXRpb24gPSAoaW5kZXg6IG51bWJlcik6IHsgaGVpZ2h0OiBudW1iZXI7IHk6IG51bWJlciB9ID0+XG4gICAgdGhpcy5feVBvc2l0aW9ucy5nZXRSb3dQb3NpdGlvbihpbmRleCwgdGhpcy5fZ2V0SGVpZ2h0KTtcblxuICBzY3JvbGxUb0luZGV4ID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBsaXN0IHZpZXcgcmVsYXRpdmUgdG8gdGhlIHNjcm9sbCBwYXJlbnRcbiAgICBjb25zdCB7IHNjcm9sbEVsZW1lbnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2Nyb2xsRWxlbWVudFRvcCA9IHNjcm9sbEVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCB8fCAwO1xuICAgIGNvbnN0IGxpc3RWaWV3VG9wID0gKHNjcm9sbEVsZW1lbnQ/LnNjcm9sbFRvcCB8fCAwKSArICh0aGlzLl9pdGVtSG9sZGVyRWxtPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgfHwgMCk7XG4gICAgY29uc3QgbGlzdFZpZXdPZmZzZXQgPSBsaXN0Vmlld1RvcCAtIHNjcm9sbEVsZW1lbnRUb3A7XG5cbiAgICBjb25zdCBpdGVtT2Zmc2V0ID0gdGhpcy5nZXRSb3dQb3NpdGlvbihpbmRleCkueTtcblxuICAgIC8vIGhhcmQgY29kZSBhIHNtYWxsIG9mZnNldCB0byBsZWF2ZSBhIGxpdHRsZSBiaXQgb2Ygc3BhY2UgYWJvdmUgdGhlIGZvY3VzZWQgc3Bhbiwgc28gaXQgaXMgdmlzdWFsbHkgY2xlYXJcbiAgICAvLyB0aGF0IHRoZXJlIGlzIGNvbnRlbnQgYWJvdmVcbiAgICB0aGlzLnByb3BzLnNjcm9sbEVsZW1lbnQ/LnNjcm9sbFRvKHsgdG9wOiBpdGVtT2Zmc2V0ICsgbGlzdFZpZXdPZmZzZXQgLSA4MCB9KTtcbiAgfTtcblxuICAvKipcbiAgICogU2Nyb2xsIGV2ZW50IGxpc3RlbmVyIHRoYXQgc2NoZWR1bGVzIGEgcmVtZWFzdXJpbmcgb2Ygd2hpY2ggaXRlbXMgc2hvdWxkIGJlXG4gICAqIHJlbmRlcmVkLlxuICAgKi9cbiAgX29uU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5faXNTY3JvbGxlZE9yUmVzaXplZCkge1xuICAgICAgdGhpcy5faXNTY3JvbGxlZE9yUmVzaXplZCA9IHRydWU7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3Bvc2l0aW9uTGlzdCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaXMgdGhlIHZpZXcgaGVpZ2h0IChzY3JvbGwgd2luZG93KSBvciBzY3JvbGwgcG9zaXRpb24gaGF2ZVxuICAgKiBjaGFuZ2VkLlxuICAgKi9cbiAgX2lzVmlld0NoYW5nZWQoKSB7XG4gICAgaWYgKCF0aGlzLl93cmFwcGVyRWxtKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHVzZVJvb3QgPSB0aGlzLnByb3BzLndpbmRvd1Njcm9sbGVyO1xuICAgIGNvbnN0IGNsaWVudEhlaWdodCA9IHVzZVJvb3QgPyB0aGlzLl9odG1sRWxtLmNsaWVudEhlaWdodCA6IHRoaXMuX3dyYXBwZXJFbG0uY2xpZW50SGVpZ2h0O1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHVzZVJvb3QgPyB0aGlzLl9odG1sRWxtLnNjcm9sbFRvcCA6IHRoaXMuX3dyYXBwZXJFbG0uc2Nyb2xsVG9wO1xuICAgIHJldHVybiBjbGllbnRIZWlnaHQgIT09IHRoaXMuX3ZpZXdIZWlnaHQgfHwgc2Nyb2xsVG9wICE9PSB0aGlzLl9zY3JvbGxUb3A7XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGUgX3N0YXJ0SW5kZXggYW5kIF9lbmRJbmRleCwgZS5nLiB3aGljaCBpdGVtcyBhcmUgaW4gdmlldy5cbiAgICovXG4gIF9jYWxjVmlld0luZGV4ZXMoKSB7XG4gICAgY29uc3QgdXNlUm9vdCA9IHRoaXMucHJvcHMud2luZG93U2Nyb2xsZXI7XG4gICAgLy8gZnVua3kgaWYgc3RhdGVtZW50IGlzIHRvIHNhdGlzZnkgZmxvd1xuICAgIGlmICghdXNlUm9vdCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGlmICghdGhpcy5fd3JhcHBlckVsbSkge1xuICAgICAgICB0aGlzLl92aWV3SGVpZ2h0ID0gLTE7XG4gICAgICAgIHRoaXMuX3N0YXJ0SW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9lbmRJbmRleCA9IDA7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3ZpZXdIZWlnaHQgPSB0aGlzLl93cmFwcGVyRWxtLmNsaWVudEhlaWdodDtcbiAgICAgIHRoaXMuX3Njcm9sbFRvcCA9IHRoaXMuX3dyYXBwZXJFbG0uc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92aWV3SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5faHRtbFRvcE9mZnNldDtcbiAgICAgIHRoaXMuX3Njcm9sbFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIH1cbiAgICBjb25zdCB5U3RhcnQgPSB0aGlzLl9zY3JvbGxUb3A7XG4gICAgY29uc3QgeUVuZCA9IHRoaXMuX3Njcm9sbFRvcCArIHRoaXMuX3ZpZXdIZWlnaHQ7XG4gICAgdGhpcy5fc3RhcnRJbmRleCA9IHRoaXMuX3lQb3NpdGlvbnMuZmluZEZsb29ySW5kZXgoeVN0YXJ0LCB0aGlzLl9nZXRIZWlnaHQpO1xuICAgIHRoaXMuX2VuZEluZGV4ID0gdGhpcy5feVBvc2l0aW9ucy5maW5kRmxvb3JJbmRleCh5RW5kLCB0aGlzLl9nZXRIZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrZWQgdG8gc2VlIGlmIHRoZSBjdXJyZW50bHkgcmVuZGVyZWQgaXRlbXMgYXJlIHN1ZmZpY2llbnQsIGlmIG5vdCxcbiAgICogZm9yY2UgYW4gdXBkYXRlIHRvIHRyaWdnZXIgbW9yZSBpdGVtcyB0byBiZSByZW5kZXJlZC5cbiAgICovXG4gIF9wb3NpdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgdGhpcy5faXNTY3JvbGxlZE9yUmVzaXplZCA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5fd3JhcHBlckVsbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jYWxjVmlld0luZGV4ZXMoKTtcbiAgICAvLyBpbmRleGVzIGRyYXduIHNob3VsZCBiZSBwYWRkZWQgYnkgYXQgbGVhc3QgcHJvcHMudmlld0J1ZmZlck1pblxuICAgIGNvbnN0IG1heFN0YXJ0ID0gdGhpcy5wcm9wcy52aWV3QnVmZmVyTWluID4gdGhpcy5fc3RhcnRJbmRleCA/IDAgOiB0aGlzLl9zdGFydEluZGV4IC0gdGhpcy5wcm9wcy52aWV3QnVmZmVyTWluO1xuICAgIGNvbnN0IG1pbkVuZCA9XG4gICAgICB0aGlzLnByb3BzLnZpZXdCdWZmZXJNaW4gPCB0aGlzLnByb3BzLmRhdGFMZW5ndGggLSB0aGlzLl9lbmRJbmRleFxuICAgICAgICA/IHRoaXMuX2VuZEluZGV4ICsgdGhpcy5wcm9wcy52aWV3QnVmZmVyTWluXG4gICAgICAgIDogdGhpcy5wcm9wcy5kYXRhTGVuZ3RoIC0gMTtcbiAgICBpZiAobWF4U3RhcnQgPCB0aGlzLl9zdGFydEluZGV4RHJhd24gfHwgbWluRW5kID4gdGhpcy5fZW5kSW5kZXhEcmF3bikge1xuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBfaW5pdFdyYXBwZXIgPSAoZWxtOiBIVE1MRWxlbWVudCB8IFROaWwpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMud2luZG93U2Nyb2xsZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fd3JhcHBlckVsbSA9IGVsbTtcbiAgICBpZiAoZWxtKSB7XG4gICAgICB0aGlzLl92aWV3SGVpZ2h0ID0gZWxtLmNsaWVudEhlaWdodDtcbiAgICB9XG4gIH07XG5cbiAgX2luaXRJdGVtSG9sZGVyID0gKGVsbTogSFRNTEVsZW1lbnQgfCBUTmlsKSA9PiB7XG4gICAgdGhpcy5faXRlbUhvbGRlckVsbSA9IGVsbTtcbiAgICB0aGlzLl9zY2FuSXRlbUhlaWdodHMoKTtcbiAgfTtcblxuICAvKipcbiAgICogR28gdGhyb3VnaCBhbGwgaXRlbXMgdGhhdCBhcmUgcmVuZGVyZWQgYW5kIHNhdmUgdGhlaXIgaGVpZ2h0IGJhc2VkIG9uIHRoZWlyXG4gICAqIGl0ZW0ta2V5ICh3aGljaCBpcyBvbiBhIGRhdGEtKiBhdHRyaWJ1dGUpLiBJZiBhbnkgbmV3IG9yIGFkanVzdGVkIGhlaWdodHNcbiAgICogYXJlIGZvdW5kLCByZS1tZWFzdXJlIHRoZSBjdXJyZW50IGtub3duIHktcG9zaXRpb25zICh2aWEgLnlQb3NpdGlvbnMpLlxuICAgKi9cbiAgX3NjYW5JdGVtSGVpZ2h0cyA9ICgpID0+IHtcbiAgICBjb25zdCBnZXRJbmRleEZyb21LZXkgPSB0aGlzLnByb3BzLmdldEluZGV4RnJvbUtleTtcbiAgICBpZiAoIXRoaXMuX2l0ZW1Ib2xkZXJFbG0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gbm90ZSB0aGUga2V5cyBmb3IgdGhlIGZpcnN0IGFuZCBsYXN0IGFsdGVyZWQgaGVpZ2h0cywgdGhlIGB5UG9zaXRpb25zYFxuICAgIC8vIG5lZWRzIHRvIGJlIHVwZGF0ZWRcbiAgICBsZXQgbG93RGlydHlLZXkgPSBudWxsO1xuICAgIGxldCBoaWdoRGlydHlLZXkgPSBudWxsO1xuICAgIGxldCBpc0RpcnR5ID0gZmFsc2U7XG4gICAgLy8gaXRlcmF0aW5nIGNoaWxkTm9kZXMgaXMgZmFzdGVyIHRoYW4gY2hpbGRyZW5cbiAgICAvLyBodHRwczovL2pzcGVyZi5jb20vbGFyZ2UtaHRtbGNvbGxlY3Rpb24tdnMtbGFyZ2Utbm9kZWxpc3RcbiAgICBjb25zdCBub2RlcyA9IHRoaXMuX2l0ZW1Ib2xkZXJFbG0uY2hpbGROb2RlcztcbiAgICBjb25zdCBtYXggPSBub2Rlcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZTogSFRNTEVsZW1lbnQgPSBub2Rlc1tpXSBhcyBhbnk7XG4gICAgICAvLyB1c2UgYC5nZXRBdHRyaWJ1dGUoLi4uKWAgaW5zdGVhZCBvZiBgLmRhdGFzZXRgIGZvciBqZXN0IC8gSlNET01cbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pdGVtLWtleScpO1xuICAgICAgaWYgKCFpdGVtS2V5KSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybignaXRlbUtleSBub3QgZm91bmQnKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyBtZWFzdXJlIHRoZSBmaXJzdCBjaGlsZCwgaWYgaXQncyBhdmFpbGFibGUsIG90aGVyd2lzZSB0aGUgbm9kZSBpdHNlbGZcbiAgICAgIC8vIChsaWtlbHkgbm90IHRyYW5zZmVyYWJsZSB0byBvdGhlciBjb250ZXh0cywgYW5kIGluc3RlYWQgaXMgc3BlY2lmaWMgdG9cbiAgICAgIC8vIGhvdyB3ZSBoYXZlIHRoZSBpdGVtcyByZW5kZXJlZClcbiAgICAgIGNvbnN0IG1lYXN1cmVTcmM6IEVsZW1lbnQgPSBub2RlLmZpcnN0RWxlbWVudENoaWxkIHx8IG5vZGU7XG4gICAgICBjb25zdCBvYnNlcnZlZCA9IG1lYXN1cmVTcmMuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3Qga25vd24gPSB0aGlzLl9rbm93bkhlaWdodHMuZ2V0KGl0ZW1LZXkpO1xuICAgICAgaWYgKG9ic2VydmVkICE9PSBrbm93bikge1xuICAgICAgICB0aGlzLl9rbm93bkhlaWdodHMuc2V0KGl0ZW1LZXksIG9ic2VydmVkKTtcbiAgICAgICAgaWYgKCFpc0RpcnR5KSB7XG4gICAgICAgICAgaXNEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW11bHRpLWFzc2lnblxuICAgICAgICAgIGxvd0RpcnR5S2V5ID0gaGlnaERpcnR5S2V5ID0gaXRlbUtleTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaWdoRGlydHlLZXkgPSBpdGVtS2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsb3dEaXJ0eUtleSAhPSBudWxsICYmIGhpZ2hEaXJ0eUtleSAhPSBudWxsKSB7XG4gICAgICAvLyB1cGRhdGUgeVBvc2l0aW9ucywgdGhlbiByZWRyYXdcbiAgICAgIGNvbnN0IGltaW4gPSBnZXRJbmRleEZyb21LZXkobG93RGlydHlLZXkpO1xuICAgICAgY29uc3QgaW1heCA9IGhpZ2hEaXJ0eUtleSA9PT0gbG93RGlydHlLZXkgPyBpbWluIDogZ2V0SW5kZXhGcm9tS2V5KGhpZ2hEaXJ0eUtleSk7XG4gICAgICB0aGlzLl95UG9zaXRpb25zLmNhbGNIZWlnaHRzKGltYXgsIHRoaXMuX2dldEhlaWdodCwgaW1pbik7XG4gICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCBhdCBpbmRleCBgaWA7IGZpcnN0IGNoZWNrIHRoZSBrbm93biBoZWlnaHRzLFxuICAgKiBmYWxsYmFjayB0byBgLnByb3BzLml0ZW1IZWlnaHRHZXR0ZXIoLi4uKWAuXG4gICAqL1xuICBfZ2V0SGVpZ2h0ID0gKGk6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGtleSA9IHRoaXMucHJvcHMuZ2V0S2V5RnJvbUluZGV4KGkpO1xuICAgIGNvbnN0IGtub3duID0gdGhpcy5fa25vd25IZWlnaHRzLmdldChrZXkpO1xuICAgIC8vIGtub3duICE9PSBrbm93biBpZmYga25vd24gaXMgTmFOXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChrbm93biAhPSBudWxsICYmIGtub3duID09PSBrbm93bikge1xuICAgICAgcmV0dXJuIGtub3duO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtSGVpZ2h0R2V0dGVyKGksIGtleSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGFMZW5ndGgsXG4gICAgICBnZXRLZXlGcm9tSW5kZXgsXG4gICAgICBpbml0aWFsRHJhdyA9IERFRkFVTFRfSU5JVElBTF9EUkFXLFxuICAgICAgaXRlbVJlbmRlcmVyLFxuICAgICAgdmlld0J1ZmZlcixcbiAgICAgIHZpZXdCdWZmZXJNaW4sXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaGVpZ2h0R2V0dGVyID0gdGhpcy5fZ2V0SGVpZ2h0O1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgbGV0IHN0YXJ0O1xuICAgIGxldCBlbmQ7XG5cbiAgICB0aGlzLl95UG9zaXRpb25zLnByb2ZpbGVEYXRhKGRhdGFMZW5ndGgpO1xuXG4gICAgaWYgKCF0aGlzLl93cmFwcGVyRWxtKSB7XG4gICAgICBzdGFydCA9IDA7XG4gICAgICBlbmQgPSAoaW5pdGlhbERyYXcgPCBkYXRhTGVuZ3RoID8gaW5pdGlhbERyYXcgOiBkYXRhTGVuZ3RoKSAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9pc1ZpZXdDaGFuZ2VkKCkpIHtcbiAgICAgICAgdGhpcy5fY2FsY1ZpZXdJbmRleGVzKCk7XG4gICAgICB9XG4gICAgICBjb25zdCBtYXhTdGFydCA9IHZpZXdCdWZmZXJNaW4gPiB0aGlzLl9zdGFydEluZGV4ID8gMCA6IHRoaXMuX3N0YXJ0SW5kZXggLSB2aWV3QnVmZmVyTWluO1xuICAgICAgY29uc3QgbWluRW5kID0gdmlld0J1ZmZlck1pbiA8IGRhdGFMZW5ndGggLSB0aGlzLl9lbmRJbmRleCA/IHRoaXMuX2VuZEluZGV4ICsgdmlld0J1ZmZlck1pbiA6IGRhdGFMZW5ndGggLSAxO1xuICAgICAgaWYgKG1heFN0YXJ0IDwgdGhpcy5fc3RhcnRJbmRleERyYXduIHx8IG1pbkVuZCA+IHRoaXMuX2VuZEluZGV4RHJhd24pIHtcbiAgICAgICAgc3RhcnQgPSB2aWV3QnVmZmVyID4gdGhpcy5fc3RhcnRJbmRleCA/IDAgOiB0aGlzLl9zdGFydEluZGV4IC0gdmlld0J1ZmZlcjtcbiAgICAgICAgZW5kID0gdGhpcy5fZW5kSW5kZXggKyB2aWV3QnVmZmVyO1xuICAgICAgICBpZiAoZW5kID49IGRhdGFMZW5ndGgpIHtcbiAgICAgICAgICBlbmQgPSBkYXRhTGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnQgPSB0aGlzLl9zdGFydEluZGV4RHJhd247XG4gICAgICAgIGVuZCA9IHRoaXMuX2VuZEluZGV4RHJhd24gPiBkYXRhTGVuZ3RoIC0gMSA/IGRhdGFMZW5ndGggLSAxIDogdGhpcy5fZW5kSW5kZXhEcmF3bjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl95UG9zaXRpb25zLmNhbGNIZWlnaHRzKGVuZCwgaGVpZ2h0R2V0dGVyLCBzdGFydCB8fCAtMSk7XG4gICAgdGhpcy5fc3RhcnRJbmRleERyYXduID0gc3RhcnQ7XG4gICAgdGhpcy5fZW5kSW5kZXhEcmF3biA9IGVuZDtcblxuICAgIGl0ZW1zLmxlbmd0aCA9IGVuZCAtIHN0YXJ0ICsgMTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgIGNvbnN0IHsgeTogdG9wLCBoZWlnaHQgfSA9IHRoaXMuX3lQb3NpdGlvbnMuZ2V0Um93UG9zaXRpb24oaSwgaGVpZ2h0R2V0dGVyKTtcbiAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHRvcCxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB9O1xuICAgICAgY29uc3QgaXRlbUtleSA9IGdldEtleUZyb21JbmRleChpKTtcbiAgICAgIGNvbnN0IGF0dHJzID0geyAnZGF0YS1pdGVtLWtleSc6IGl0ZW1LZXkgfTtcbiAgICAgIGl0ZW1zLnB1c2goaXRlbVJlbmRlcmVyKGl0ZW1LZXksIHN0eWxlLCBpLCBhdHRycykpO1xuICAgIH1cbiAgICBjb25zdCB3cmFwcGVyUHJvcHM6IFRXcmFwcGVyUHJvcHMgPSB7XG4gICAgICBzdHlsZTogeyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9LFxuICAgICAgcmVmOiB0aGlzLl9pbml0V3JhcHBlcixcbiAgICB9O1xuICAgIGlmICghdGhpcy5wcm9wcy53aW5kb3dTY3JvbGxlcikge1xuICAgICAgd3JhcHBlclByb3BzLm9uU2Nyb2xsID0gdGhpcy5fb25TY3JvbGw7XG4gICAgICB3cmFwcGVyUHJvcHMuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgd3JhcHBlclByb3BzLnN0eWxlLm92ZXJmbG93WSA9ICdhdXRvJztcbiAgICB9XG4gICAgY29uc3Qgc2Nyb2xsZXJTdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnIGFzICdyZWxhdGl2ZScsXG4gICAgICBoZWlnaHQ6IHRoaXMuX3lQb3NpdGlvbnMuZ2V0RXN0aW1hdGVkSGVpZ2h0KCksXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiB7Li4ud3JhcHBlclByb3BzfSBkYXRhLXRlc3RpZD1cIkxpc3RWaWV3XCI+XG4gICAgICAgIDxkaXYgc3R5bGU9e3Njcm9sbGVyU3R5bGV9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuaXRlbXNXcmFwcGVyQ2xhc3NOYW1lfVxuICAgICAgICAgICAgcmVmPXt0aGlzLl9pbml0SXRlbUhvbGRlcn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aXRlbXN9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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