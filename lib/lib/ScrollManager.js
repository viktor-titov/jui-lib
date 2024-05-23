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

/**
 * `Accessors` is necessary because `ScrollManager` needs to be created by
 * `TracePage` so it can be passed into the keyboard shortcut manager. But,
 * `ScrollManager` needs to know about the state of `ListView` and `Positions`,
 * which are very low-level. And, storing their state info in redux or
 * `TracePage#state` would be inefficient because the state info only rarely
 * needs to be accessed (when a keyboard shortcut is triggered). `Accessors`
 * allows that state info to be accessed in a loosely coupled fashion on an
 * as-needed basis.
 */

/**
 * Returns `{ isHidden: true, ... }` if one of the parents of `span` is
 * collapsed, e.g. has children hidden.
 *
 * @param {TraceSpan} span The Span to check for.
 * @param {Set<string>} childrenAreHidden The set of Spans known to have hidden
 *                                        children, either because it is
 *                                        collapsed or has a collapsed parent.
 * @param {Map<string, TraceSpan | TNil} spansMap Mapping from spanID to Span.
 * @returns {{ isHidden: boolean, parentIds: Set<string> }}
 */
function isSpanHidden(span, childrenAreHidden, spansMap) {
  var parentIDs = new Set();
  var references = span.references;
  var parentID;
  var checkRef = function checkRef(ref) {
    if (ref.refType === 'CHILD_OF' || ref.refType === 'FOLLOWS_FROM') {
      parentID = ref.spanID;
      parentIDs.add(parentID);
      return childrenAreHidden.has(parentID);
    }
    return false;
  };
  while (Array.isArray(references) && references.length) {
    var isHidden = references.some(checkRef);
    if (isHidden) {
      return {
        isHidden: isHidden,
        parentIDs: parentIDs
      };
    }
    if (!parentID) {
      break;
    }
    var parent = spansMap.get(parentID);
    parentID = undefined;
    references = parent && parent.references;
  }
  return {
    parentIDs: parentIDs,
    isHidden: false
  };
}

/**
 * ScrollManager is intended for scrolling the TracePage. Has two modes, paging
 * and scrolling to the previous or next visible span.
 */
var ScrollManager = /*#__PURE__*/function () {
  function ScrollManager(trace, scroller) {
    var _this = this;
    /**
     * `setAccessors` is bound in the ctor, so it can be passed as a prop to
     * children components.
     */
    this.setAccessors = function (accessors) {
      _this._accessors = accessors;
    };
    /**
     * Scrolls around one page down (0.95x). It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    this.scrollPageDown = function () {
      if (!_this._scroller || !_this._accessors) {
        return;
      }
      _this._scroller.scrollBy(0.95 * _this._accessors.getViewHeight(), true);
    };
    /**
     * Scrolls around one page up (0.95x). It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    this.scrollPageUp = function () {
      if (!_this._scroller || !_this._accessors) {
        return;
      }
      _this._scroller.scrollBy(-0.95 * _this._accessors.getViewHeight(), true);
    };
    /**
     * Scrolls to the next visible span, ignoring spans that do not match the
     * text filter, if there is one. It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    this.scrollToNextVisibleSpan = function () {
      _this._scrollToVisibleSpan(1);
    };
    /**
     * Scrolls to the previous visible span, ignoring spans that do not match the
     * text filter, if there is one. It is bounds in the ctor, so it can
     * be used as a keyboard shortcut handler.
     */
    this.scrollToPrevVisibleSpan = function () {
      _this._scrollToVisibleSpan(-1);
    };
    this.scrollToFirstVisibleSpan = function () {
      _this._scrollToVisibleSpan(1, 0);
    };
    this._trace = trace;
    this._scroller = scroller;
    this._accessors = undefined;
  }
  var _proto = ScrollManager.prototype;
  _proto._scrollPast = function _scrollPast(rowIndex, direction) {
    var _this$_scroller;
    var xrs = this._accessors;
    /* istanbul ignore next */
    if (!xrs) {
      throw new Error('Accessors not set');
    }
    var isUp = direction < 0;
    var position = xrs.getRowPosition(rowIndex);
    if (!position) {
      // eslint-disable-next-line no-console
      console.warn('Invalid row index');
      return;
    }
    var y = position.y;
    var vh = xrs.getViewHeight();
    if (!isUp) {
      y += position.height;
      // scrollTop is based on the top of the window
      y -= vh;
    }
    y += direction * 0.5 * vh;
    (_this$_scroller = this._scroller) == null || _this$_scroller.scrollTo(y);
  };
  _proto._scrollToVisibleSpan = function _scrollToVisibleSpan(direction, startRow) {
    var xrs = this._accessors;
    /* istanbul ignore next */
    if (!xrs) {
      throw new Error('Accessors not set');
    }
    if (!this._trace) {
      return;
    }
    var _this$_trace = this._trace,
      duration = _this$_trace.duration,
      spans = _this$_trace.spans,
      traceStartTime = _this$_trace.startTime;
    var isUp = direction < 0;
    var boundaryRow;
    if (startRow != null) {
      boundaryRow = startRow;
    } else if (isUp) {
      boundaryRow = xrs.getTopRowIndexVisible();
    } else {
      boundaryRow = xrs.getBottomRowIndexVisible();
    }
    var spanIndex = xrs.mapRowIndexToSpanIndex(boundaryRow);
    if (spanIndex === 0 && isUp || spanIndex === spans.length - 1 && !isUp) {
      return;
    }
    // fullViewSpanIndex is one row inside the view window unless already at the top or bottom
    var fullViewSpanIndex = spanIndex;
    if (spanIndex !== 0 && spanIndex !== spans.length - 1) {
      fullViewSpanIndex -= direction;
    }
    var _xrs$getViewRange = xrs.getViewRange(),
      viewStart = _xrs$getViewRange[0],
      viewEnd = _xrs$getViewRange[1];
    var checkVisibility = viewStart !== 0 || viewEnd !== 1;
    // use NaN as fallback to make flow happy
    var startTime = checkVisibility ? traceStartTime + duration * viewStart : NaN;
    var endTime = checkVisibility ? traceStartTime + duration * viewEnd : NaN;
    var findMatches = xrs.getSearchedSpanIDs();
    var _collapsed = xrs.getCollapsedChildren();
    var childrenAreHidden = _collapsed ? new Set(_collapsed) : null;
    // use empty Map as fallback to make flow happy
    var spansMap = childrenAreHidden ? new Map(spans.map(function (s) {
      return [s.spanID, s];
    })) : new Map();
    var boundary = direction < 0 ? -1 : spans.length;
    var nextSpanIndex;
    for (var i = fullViewSpanIndex + direction; i !== boundary; i += direction) {
      var span = spans[i];
      var spanDuration = span.duration,
        spanID = span.spanID,
        spanStartTime = span.startTime;
      var spanEndTime = spanStartTime + spanDuration;
      if (checkVisibility && (spanStartTime > endTime || spanEndTime < startTime)) {
        // span is not visible within the view range
        continue;
      }
      if (findMatches && !findMatches.has(spanID)) {
        // skip to search matches (when searching)
        continue;
      }
      if (childrenAreHidden) {
        // make sure the span is not collapsed
        var _isSpanHidden = isSpanHidden(span, childrenAreHidden, spansMap),
          isHidden = _isSpanHidden.isHidden,
          parentIDs = _isSpanHidden.parentIDs;
        if (isHidden) {
          parentIDs.forEach(function (id) {
            return childrenAreHidden.add(id);
          });
          continue;
        }
      }
      nextSpanIndex = i;
      break;
    }
    if (!nextSpanIndex || nextSpanIndex === boundary) {
      // might as well scroll to the top or bottom
      nextSpanIndex = boundary - direction;

      // If there are hidden children, scroll to the last visible span
      if (childrenAreHidden) {
        var isFallbackHidden;
        do {
          var _isSpanHidden2 = isSpanHidden(spans[nextSpanIndex], childrenAreHidden, spansMap),
            _isHidden = _isSpanHidden2.isHidden,
            _parentIDs = _isSpanHidden2.parentIDs;
          if (_isHidden) {
            _parentIDs.forEach(function (id) {
              return childrenAreHidden.add(id);
            });
            nextSpanIndex--;
          }
          isFallbackHidden = _isHidden;
        } while (isFallbackHidden);
      }
    }
    var nextRow = xrs.mapSpanIndexToRowIndex(nextSpanIndex);
    this._scrollPast(nextRow, direction);
  }

  /**
   * Sometimes the ScrollManager is created before the trace is loaded. This
   * setter allows the trace to be set asynchronously.
   */;
  _proto.setTrace = function setTrace(trace) {
    this._trace = trace;
  };
  _proto.destroy = function destroy() {
    this._trace = undefined;
    this._scroller = undefined;
    this._accessors = undefined;
  };
  return ScrollManager;
}();
export { ScrollManager as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpc1NwYW5IaWRkZW4iLCJzcGFuIiwiY2hpbGRyZW5BcmVIaWRkZW4iLCJzcGFuc01hcCIsInBhcmVudElEcyIsIlNldCIsInJlZmVyZW5jZXMiLCJwYXJlbnRJRCIsImNoZWNrUmVmIiwicmVmIiwicmVmVHlwZSIsInNwYW5JRCIsImFkZCIsImhhcyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImlzSGlkZGVuIiwic29tZSIsInBhcmVudCIsImdldCIsInVuZGVmaW5lZCIsIlNjcm9sbE1hbmFnZXIiLCJ0cmFjZSIsInNjcm9sbGVyIiwiX3RoaXMiLCJzZXRBY2Nlc3NvcnMiLCJhY2Nlc3NvcnMiLCJfYWNjZXNzb3JzIiwic2Nyb2xsUGFnZURvd24iLCJfc2Nyb2xsZXIiLCJzY3JvbGxCeSIsImdldFZpZXdIZWlnaHQiLCJzY3JvbGxQYWdlVXAiLCJzY3JvbGxUb05leHRWaXNpYmxlU3BhbiIsIl9zY3JvbGxUb1Zpc2libGVTcGFuIiwic2Nyb2xsVG9QcmV2VmlzaWJsZVNwYW4iLCJzY3JvbGxUb0ZpcnN0VmlzaWJsZVNwYW4iLCJfdHJhY2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJfc2Nyb2xsUGFzdCIsInJvd0luZGV4IiwiZGlyZWN0aW9uIiwiX3RoaXMkX3Njcm9sbGVyIiwieHJzIiwiRXJyb3IiLCJpc1VwIiwicG9zaXRpb24iLCJnZXRSb3dQb3NpdGlvbiIsImNvbnNvbGUiLCJ3YXJuIiwieSIsInZoIiwiaGVpZ2h0Iiwic2Nyb2xsVG8iLCJzdGFydFJvdyIsIl90aGlzJF90cmFjZSIsImR1cmF0aW9uIiwic3BhbnMiLCJ0cmFjZVN0YXJ0VGltZSIsInN0YXJ0VGltZSIsImJvdW5kYXJ5Um93IiwiZ2V0VG9wUm93SW5kZXhWaXNpYmxlIiwiZ2V0Qm90dG9tUm93SW5kZXhWaXNpYmxlIiwic3BhbkluZGV4IiwibWFwUm93SW5kZXhUb1NwYW5JbmRleCIsImZ1bGxWaWV3U3BhbkluZGV4IiwiX3hycyRnZXRWaWV3UmFuZ2UiLCJnZXRWaWV3UmFuZ2UiLCJ2aWV3U3RhcnQiLCJ2aWV3RW5kIiwiY2hlY2tWaXNpYmlsaXR5IiwiTmFOIiwiZW5kVGltZSIsImZpbmRNYXRjaGVzIiwiZ2V0U2VhcmNoZWRTcGFuSURzIiwiX2NvbGxhcHNlZCIsImdldENvbGxhcHNlZENoaWxkcmVuIiwiTWFwIiwibWFwIiwicyIsImJvdW5kYXJ5IiwibmV4dFNwYW5JbmRleCIsImkiLCJzcGFuRHVyYXRpb24iLCJzcGFuU3RhcnRUaW1lIiwic3BhbkVuZFRpbWUiLCJfaXNTcGFuSGlkZGVuIiwiZm9yRWFjaCIsImlkIiwiaXNGYWxsYmFja0hpZGRlbiIsIl9pc1NwYW5IaWRkZW4yIiwibmV4dFJvdyIsIm1hcFNwYW5JbmRleFRvUm93SW5kZXgiLCJzZXRUcmFjZSIsImRlc3Ryb3kiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9TY3JvbGxNYW5hZ2VyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgVE5pbCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgVHJhY2VTcGFuLCBUcmFjZVNwYW5SZWZlcmVuY2UsIFRyYWNlIH0gZnJvbSAnLi90eXBlcy90cmFjZSc7XG5cbi8qKlxuICogYEFjY2Vzc29yc2AgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYFNjcm9sbE1hbmFnZXJgIG5lZWRzIHRvIGJlIGNyZWF0ZWQgYnlcbiAqIGBUcmFjZVBhZ2VgIHNvIGl0IGNhbiBiZSBwYXNzZWQgaW50byB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgbWFuYWdlci4gQnV0LFxuICogYFNjcm9sbE1hbmFnZXJgIG5lZWRzIHRvIGtub3cgYWJvdXQgdGhlIHN0YXRlIG9mIGBMaXN0Vmlld2AgYW5kIGBQb3NpdGlvbnNgLFxuICogd2hpY2ggYXJlIHZlcnkgbG93LWxldmVsLiBBbmQsIHN0b3JpbmcgdGhlaXIgc3RhdGUgaW5mbyBpbiByZWR1eCBvclxuICogYFRyYWNlUGFnZSNzdGF0ZWAgd291bGQgYmUgaW5lZmZpY2llbnQgYmVjYXVzZSB0aGUgc3RhdGUgaW5mbyBvbmx5IHJhcmVseVxuICogbmVlZHMgdG8gYmUgYWNjZXNzZWQgKHdoZW4gYSBrZXlib2FyZCBzaG9ydGN1dCBpcyB0cmlnZ2VyZWQpLiBgQWNjZXNzb3JzYFxuICogYWxsb3dzIHRoYXQgc3RhdGUgaW5mbyB0byBiZSBhY2Nlc3NlZCBpbiBhIGxvb3NlbHkgY291cGxlZCBmYXNoaW9uIG9uIGFuXG4gKiBhcy1uZWVkZWQgYmFzaXMuXG4gKi9cbmV4cG9ydCB0eXBlIEFjY2Vzc29ycyA9IHtcbiAgZ2V0Vmlld1JhbmdlOiAoKSA9PiBbbnVtYmVyLCBudW1iZXJdO1xuICBnZXRTZWFyY2hlZFNwYW5JRHM6ICgpID0+IFNldDxzdHJpbmc+IHwgVE5pbDtcbiAgZ2V0Q29sbGFwc2VkQ2hpbGRyZW46ICgpID0+IFNldDxzdHJpbmc+IHwgVE5pbDtcbiAgZ2V0Vmlld0hlaWdodDogKCkgPT4gbnVtYmVyO1xuICBnZXRCb3R0b21Sb3dJbmRleFZpc2libGU6ICgpID0+IG51bWJlcjtcbiAgZ2V0VG9wUm93SW5kZXhWaXNpYmxlOiAoKSA9PiBudW1iZXI7XG4gIGdldFJvd1Bvc2l0aW9uOiAocm93SW5kZXg6IG51bWJlcikgPT4geyBoZWlnaHQ6IG51bWJlcjsgeTogbnVtYmVyIH07XG4gIG1hcFJvd0luZGV4VG9TcGFuSW5kZXg6IChyb3dJbmRleDogbnVtYmVyKSA9PiBudW1iZXI7XG4gIG1hcFNwYW5JbmRleFRvUm93SW5kZXg6IChzcGFuSW5kZXg6IG51bWJlcikgPT4gbnVtYmVyO1xufTtcblxuaW50ZXJmYWNlIFNjcm9sbGVyIHtcbiAgc2Nyb2xsVG86IChyb3dJbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuICAvLyBUT0RPIGFyZyBuYW1lcyB0aHJvdWdob3V0XG4gIHNjcm9sbEJ5OiAocm93SW5kZXg6IG51bWJlciwgb3B0PzogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGB7IGlzSGlkZGVuOiB0cnVlLCAuLi4gfWAgaWYgb25lIG9mIHRoZSBwYXJlbnRzIG9mIGBzcGFuYCBpc1xuICogY29sbGFwc2VkLCBlLmcuIGhhcyBjaGlsZHJlbiBoaWRkZW4uXG4gKlxuICogQHBhcmFtIHtUcmFjZVNwYW59IHNwYW4gVGhlIFNwYW4gdG8gY2hlY2sgZm9yLlxuICogQHBhcmFtIHtTZXQ8c3RyaW5nPn0gY2hpbGRyZW5BcmVIaWRkZW4gVGhlIHNldCBvZiBTcGFucyBrbm93biB0byBoYXZlIGhpZGRlblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sIGVpdGhlciBiZWNhdXNlIGl0IGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsYXBzZWQgb3IgaGFzIGEgY29sbGFwc2VkIHBhcmVudC5cbiAqIEBwYXJhbSB7TWFwPHN0cmluZywgVHJhY2VTcGFuIHwgVE5pbH0gc3BhbnNNYXAgTWFwcGluZyBmcm9tIHNwYW5JRCB0byBTcGFuLlxuICogQHJldHVybnMge3sgaXNIaWRkZW46IGJvb2xlYW4sIHBhcmVudElkczogU2V0PHN0cmluZz4gfX1cbiAqL1xuZnVuY3Rpb24gaXNTcGFuSGlkZGVuKHNwYW46IFRyYWNlU3BhbiwgY2hpbGRyZW5BcmVIaWRkZW46IFNldDxzdHJpbmc+LCBzcGFuc01hcDogTWFwPHN0cmluZywgVHJhY2VTcGFuIHwgVE5pbD4pIHtcbiAgY29uc3QgcGFyZW50SURzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGxldCB7IHJlZmVyZW5jZXMgfTogeyByZWZlcmVuY2VzOiBUcmFjZVNwYW5SZWZlcmVuY2VbXSB8IFROaWwgfSA9IHNwYW47XG4gIGxldCBwYXJlbnRJRDogdW5kZWZpbmVkIHwgc3RyaW5nO1xuICBjb25zdCBjaGVja1JlZiA9IChyZWY6IFRyYWNlU3BhblJlZmVyZW5jZSkgPT4ge1xuICAgIGlmIChyZWYucmVmVHlwZSA9PT0gJ0NISUxEX09GJyB8fCByZWYucmVmVHlwZSA9PT0gJ0ZPTExPV1NfRlJPTScpIHtcbiAgICAgIHBhcmVudElEID0gcmVmLnNwYW5JRDtcbiAgICAgIHBhcmVudElEcy5hZGQocGFyZW50SUQpO1xuICAgICAgcmV0dXJuIGNoaWxkcmVuQXJlSGlkZGVuLmhhcyhwYXJlbnRJRCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgd2hpbGUgKEFycmF5LmlzQXJyYXkocmVmZXJlbmNlcykgJiYgcmVmZXJlbmNlcy5sZW5ndGgpIHtcbiAgICBjb25zdCBpc0hpZGRlbiA9IHJlZmVyZW5jZXMuc29tZShjaGVja1JlZik7XG4gICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICByZXR1cm4geyBpc0hpZGRlbiwgcGFyZW50SURzIH07XG4gICAgfVxuICAgIGlmICghcGFyZW50SUQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnQgPSBzcGFuc01hcC5nZXQocGFyZW50SUQpO1xuICAgIHBhcmVudElEID0gdW5kZWZpbmVkO1xuICAgIHJlZmVyZW5jZXMgPSBwYXJlbnQgJiYgcGFyZW50LnJlZmVyZW5jZXM7XG4gIH1cbiAgcmV0dXJuIHsgcGFyZW50SURzLCBpc0hpZGRlbjogZmFsc2UgfTtcbn1cblxuLyoqXG4gKiBTY3JvbGxNYW5hZ2VyIGlzIGludGVuZGVkIGZvciBzY3JvbGxpbmcgdGhlIFRyYWNlUGFnZS4gSGFzIHR3byBtb2RlcywgcGFnaW5nXG4gKiBhbmQgc2Nyb2xsaW5nIHRvIHRoZSBwcmV2aW91cyBvciBuZXh0IHZpc2libGUgc3Bhbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsTWFuYWdlciB7XG4gIF90cmFjZTogVHJhY2UgfCBUTmlsO1xuICBfc2Nyb2xsZXI6IFNjcm9sbGVyIHwgVE5pbDtcbiAgX2FjY2Vzc29yczogQWNjZXNzb3JzIHwgVE5pbDtcblxuICBjb25zdHJ1Y3Rvcih0cmFjZTogVHJhY2UgfCBUTmlsLCBzY3JvbGxlcjogU2Nyb2xsZXIpIHtcbiAgICB0aGlzLl90cmFjZSA9IHRyYWNlO1xuICAgIHRoaXMuX3Njcm9sbGVyID0gc2Nyb2xsZXI7XG4gICAgdGhpcy5fYWNjZXNzb3JzID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgX3Njcm9sbFBhc3Qocm93SW5kZXg6IG51bWJlciwgZGlyZWN0aW9uOiAxIHwgLTEpIHtcbiAgICBjb25zdCB4cnMgPSB0aGlzLl9hY2Nlc3NvcnM7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoIXhycykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY2Nlc3NvcnMgbm90IHNldCcpO1xuICAgIH1cbiAgICBjb25zdCBpc1VwID0gZGlyZWN0aW9uIDwgMDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHhycy5nZXRSb3dQb3NpdGlvbihyb3dJbmRleCk7XG4gICAgaWYgKCFwb3NpdGlvbikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybignSW52YWxpZCByb3cgaW5kZXgnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHsgeSB9ID0gcG9zaXRpb247XG4gICAgY29uc3QgdmggPSB4cnMuZ2V0Vmlld0hlaWdodCgpO1xuICAgIGlmICghaXNVcCkge1xuICAgICAgeSArPSBwb3NpdGlvbi5oZWlnaHQ7XG4gICAgICAvLyBzY3JvbGxUb3AgaXMgYmFzZWQgb24gdGhlIHRvcCBvZiB0aGUgd2luZG93XG4gICAgICB5IC09IHZoO1xuICAgIH1cbiAgICB5ICs9IGRpcmVjdGlvbiAqIDAuNSAqIHZoO1xuICAgIHRoaXMuX3Njcm9sbGVyPy5zY3JvbGxUbyh5KTtcbiAgfVxuXG4gIF9zY3JvbGxUb1Zpc2libGVTcGFuKGRpcmVjdGlvbjogMSB8IC0xLCBzdGFydFJvdz86IG51bWJlcikge1xuICAgIGNvbnN0IHhycyA9IHRoaXMuX2FjY2Vzc29ycztcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICgheHJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc2V0Jyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5fdHJhY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBkdXJhdGlvbiwgc3BhbnMsIHN0YXJ0VGltZTogdHJhY2VTdGFydFRpbWUgfSA9IHRoaXMuX3RyYWNlO1xuICAgIGNvbnN0IGlzVXAgPSBkaXJlY3Rpb24gPCAwO1xuICAgIGxldCBib3VuZGFyeVJvdzogbnVtYmVyO1xuICAgIGlmIChzdGFydFJvdyAhPSBudWxsKSB7XG4gICAgICBib3VuZGFyeVJvdyA9IHN0YXJ0Um93O1xuICAgIH0gZWxzZSBpZiAoaXNVcCkge1xuICAgICAgYm91bmRhcnlSb3cgPSB4cnMuZ2V0VG9wUm93SW5kZXhWaXNpYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvdW5kYXJ5Um93ID0geHJzLmdldEJvdHRvbVJvd0luZGV4VmlzaWJsZSgpO1xuICAgIH1cbiAgICBjb25zdCBzcGFuSW5kZXggPSB4cnMubWFwUm93SW5kZXhUb1NwYW5JbmRleChib3VuZGFyeVJvdyk7XG4gICAgaWYgKChzcGFuSW5kZXggPT09IDAgJiYgaXNVcCkgfHwgKHNwYW5JbmRleCA9PT0gc3BhbnMubGVuZ3RoIC0gMSAmJiAhaXNVcCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gZnVsbFZpZXdTcGFuSW5kZXggaXMgb25lIHJvdyBpbnNpZGUgdGhlIHZpZXcgd2luZG93IHVubGVzcyBhbHJlYWR5IGF0IHRoZSB0b3Agb3IgYm90dG9tXG4gICAgbGV0IGZ1bGxWaWV3U3BhbkluZGV4ID0gc3BhbkluZGV4O1xuICAgIGlmIChzcGFuSW5kZXggIT09IDAgJiYgc3BhbkluZGV4ICE9PSBzcGFucy5sZW5ndGggLSAxKSB7XG4gICAgICBmdWxsVmlld1NwYW5JbmRleCAtPSBkaXJlY3Rpb247XG4gICAgfVxuICAgIGNvbnN0IFt2aWV3U3RhcnQsIHZpZXdFbmRdID0geHJzLmdldFZpZXdSYW5nZSgpO1xuICAgIGNvbnN0IGNoZWNrVmlzaWJpbGl0eSA9IHZpZXdTdGFydCAhPT0gMCB8fCB2aWV3RW5kICE9PSAxO1xuICAgIC8vIHVzZSBOYU4gYXMgZmFsbGJhY2sgdG8gbWFrZSBmbG93IGhhcHB5XG4gICAgY29uc3Qgc3RhcnRUaW1lID0gY2hlY2tWaXNpYmlsaXR5ID8gdHJhY2VTdGFydFRpbWUgKyBkdXJhdGlvbiAqIHZpZXdTdGFydCA6IE5hTjtcbiAgICBjb25zdCBlbmRUaW1lID0gY2hlY2tWaXNpYmlsaXR5ID8gdHJhY2VTdGFydFRpbWUgKyBkdXJhdGlvbiAqIHZpZXdFbmQgOiBOYU47XG4gICAgY29uc3QgZmluZE1hdGNoZXMgPSB4cnMuZ2V0U2VhcmNoZWRTcGFuSURzKCk7XG4gICAgY29uc3QgX2NvbGxhcHNlZCA9IHhycy5nZXRDb2xsYXBzZWRDaGlsZHJlbigpO1xuICAgIGNvbnN0IGNoaWxkcmVuQXJlSGlkZGVuID0gX2NvbGxhcHNlZCA/IG5ldyBTZXQoX2NvbGxhcHNlZCkgOiBudWxsO1xuICAgIC8vIHVzZSBlbXB0eSBNYXAgYXMgZmFsbGJhY2sgdG8gbWFrZSBmbG93IGhhcHB5XG4gICAgY29uc3Qgc3BhbnNNYXA6IE1hcDxzdHJpbmcsIFRyYWNlU3Bhbj4gPSBjaGlsZHJlbkFyZUhpZGRlblxuICAgICAgPyBuZXcgTWFwKHNwYW5zLm1hcCgocykgPT4gW3Muc3BhbklELCBzXSBhcyBbc3RyaW5nLCBUcmFjZVNwYW5dKSlcbiAgICAgIDogbmV3IE1hcCgpO1xuICAgIGNvbnN0IGJvdW5kYXJ5ID0gZGlyZWN0aW9uIDwgMCA/IC0xIDogc3BhbnMubGVuZ3RoO1xuICAgIGxldCBuZXh0U3BhbkluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgZm9yIChsZXQgaSA9IGZ1bGxWaWV3U3BhbkluZGV4ICsgZGlyZWN0aW9uOyBpICE9PSBib3VuZGFyeTsgaSArPSBkaXJlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNwYW4gPSBzcGFuc1tpXTtcbiAgICAgIGNvbnN0IHsgZHVyYXRpb246IHNwYW5EdXJhdGlvbiwgc3BhbklELCBzdGFydFRpbWU6IHNwYW5TdGFydFRpbWUgfSA9IHNwYW47XG4gICAgICBjb25zdCBzcGFuRW5kVGltZSA9IHNwYW5TdGFydFRpbWUgKyBzcGFuRHVyYXRpb247XG4gICAgICBpZiAoY2hlY2tWaXNpYmlsaXR5ICYmIChzcGFuU3RhcnRUaW1lID4gZW5kVGltZSB8fCBzcGFuRW5kVGltZSA8IHN0YXJ0VGltZSkpIHtcbiAgICAgICAgLy8gc3BhbiBpcyBub3QgdmlzaWJsZSB3aXRoaW4gdGhlIHZpZXcgcmFuZ2VcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoZmluZE1hdGNoZXMgJiYgIWZpbmRNYXRjaGVzLmhhcyhzcGFuSUQpKSB7XG4gICAgICAgIC8vIHNraXAgdG8gc2VhcmNoIG1hdGNoZXMgKHdoZW4gc2VhcmNoaW5nKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGlsZHJlbkFyZUhpZGRlbikge1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHNwYW4gaXMgbm90IGNvbGxhcHNlZFxuICAgICAgICBjb25zdCB7IGlzSGlkZGVuLCBwYXJlbnRJRHMgfSA9IGlzU3BhbkhpZGRlbihzcGFuLCBjaGlsZHJlbkFyZUhpZGRlbiwgc3BhbnNNYXApO1xuICAgICAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgICAgICBwYXJlbnRJRHMuZm9yRWFjaCgoaWQpID0+IGNoaWxkcmVuQXJlSGlkZGVuLmFkZChpZCkpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuZXh0U3BhbkluZGV4ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIW5leHRTcGFuSW5kZXggfHwgbmV4dFNwYW5JbmRleCA9PT0gYm91bmRhcnkpIHtcbiAgICAgIC8vIG1pZ2h0IGFzIHdlbGwgc2Nyb2xsIHRvIHRoZSB0b3Agb3IgYm90dG9tXG4gICAgICBuZXh0U3BhbkluZGV4ID0gYm91bmRhcnkgLSBkaXJlY3Rpb247XG5cbiAgICAgIC8vIElmIHRoZXJlIGFyZSBoaWRkZW4gY2hpbGRyZW4sIHNjcm9sbCB0byB0aGUgbGFzdCB2aXNpYmxlIHNwYW5cbiAgICAgIGlmIChjaGlsZHJlbkFyZUhpZGRlbikge1xuICAgICAgICBsZXQgaXNGYWxsYmFja0hpZGRlbjogYm9vbGVhbjtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGNvbnN0IHsgaXNIaWRkZW4sIHBhcmVudElEcyB9ID0gaXNTcGFuSGlkZGVuKHNwYW5zW25leHRTcGFuSW5kZXhdLCBjaGlsZHJlbkFyZUhpZGRlbiwgc3BhbnNNYXApO1xuICAgICAgICAgIGlmIChpc0hpZGRlbikge1xuICAgICAgICAgICAgcGFyZW50SURzLmZvckVhY2goKGlkKSA9PiBjaGlsZHJlbkFyZUhpZGRlbi5hZGQoaWQpKTtcbiAgICAgICAgICAgIG5leHRTcGFuSW5kZXgtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXNGYWxsYmFja0hpZGRlbiA9IGlzSGlkZGVuO1xuICAgICAgICB9IHdoaWxlIChpc0ZhbGxiYWNrSGlkZGVuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbmV4dFJvdyA9IHhycy5tYXBTcGFuSW5kZXhUb1Jvd0luZGV4KG5leHRTcGFuSW5kZXgpO1xuICAgIHRoaXMuX3Njcm9sbFBhc3QobmV4dFJvdywgZGlyZWN0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb21ldGltZXMgdGhlIFNjcm9sbE1hbmFnZXIgaXMgY3JlYXRlZCBiZWZvcmUgdGhlIHRyYWNlIGlzIGxvYWRlZC4gVGhpc1xuICAgKiBzZXR0ZXIgYWxsb3dzIHRoZSB0cmFjZSB0byBiZSBzZXQgYXN5bmNocm9ub3VzbHkuXG4gICAqL1xuICBzZXRUcmFjZSh0cmFjZTogVHJhY2UgfCBUTmlsKSB7XG4gICAgdGhpcy5fdHJhY2UgPSB0cmFjZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBgc2V0QWNjZXNzb3JzYCBpcyBib3VuZCBpbiB0aGUgY3Rvciwgc28gaXQgY2FuIGJlIHBhc3NlZCBhcyBhIHByb3AgdG9cbiAgICogY2hpbGRyZW4gY29tcG9uZW50cy5cbiAgICovXG4gIHNldEFjY2Vzc29ycyA9IChhY2Nlc3NvcnM6IEFjY2Vzc29ycykgPT4ge1xuICAgIHRoaXMuX2FjY2Vzc29ycyA9IGFjY2Vzc29ycztcbiAgfTtcblxuICAvKipcbiAgICogU2Nyb2xscyBhcm91bmQgb25lIHBhZ2UgZG93biAoMC45NXgpLiBJdCBpcyBib3VuZHMgaW4gdGhlIGN0b3IsIHNvIGl0IGNhblxuICAgKiBiZSB1c2VkIGFzIGEga2V5Ym9hcmQgc2hvcnRjdXQgaGFuZGxlci5cbiAgICovXG4gIHNjcm9sbFBhZ2VEb3duID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5fc2Nyb2xsZXIgfHwgIXRoaXMuX2FjY2Vzc29ycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zY3JvbGxlci5zY3JvbGxCeSgwLjk1ICogdGhpcy5fYWNjZXNzb3JzLmdldFZpZXdIZWlnaHQoKSwgdHJ1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgYXJvdW5kIG9uZSBwYWdlIHVwICgwLjk1eCkuIEl0IGlzIGJvdW5kcyBpbiB0aGUgY3Rvciwgc28gaXQgY2FuXG4gICAqIGJlIHVzZWQgYXMgYSBrZXlib2FyZCBzaG9ydGN1dCBoYW5kbGVyLlxuICAgKi9cbiAgc2Nyb2xsUGFnZVVwID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5fc2Nyb2xsZXIgfHwgIXRoaXMuX2FjY2Vzc29ycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zY3JvbGxlci5zY3JvbGxCeSgtMC45NSAqIHRoaXMuX2FjY2Vzc29ycy5nZXRWaWV3SGVpZ2h0KCksIHRydWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRvIHRoZSBuZXh0IHZpc2libGUgc3BhbiwgaWdub3Jpbmcgc3BhbnMgdGhhdCBkbyBub3QgbWF0Y2ggdGhlXG4gICAqIHRleHQgZmlsdGVyLCBpZiB0aGVyZSBpcyBvbmUuIEl0IGlzIGJvdW5kcyBpbiB0aGUgY3Rvciwgc28gaXQgY2FuXG4gICAqIGJlIHVzZWQgYXMgYSBrZXlib2FyZCBzaG9ydGN1dCBoYW5kbGVyLlxuICAgKi9cbiAgc2Nyb2xsVG9OZXh0VmlzaWJsZVNwYW4gPSAoKSA9PiB7XG4gICAgdGhpcy5fc2Nyb2xsVG9WaXNpYmxlU3BhbigxKTtcbiAgfTtcblxuICAvKipcbiAgICogU2Nyb2xscyB0byB0aGUgcHJldmlvdXMgdmlzaWJsZSBzcGFuLCBpZ25vcmluZyBzcGFucyB0aGF0IGRvIG5vdCBtYXRjaCB0aGVcbiAgICogdGV4dCBmaWx0ZXIsIGlmIHRoZXJlIGlzIG9uZS4gSXQgaXMgYm91bmRzIGluIHRoZSBjdG9yLCBzbyBpdCBjYW5cbiAgICogYmUgdXNlZCBhcyBhIGtleWJvYXJkIHNob3J0Y3V0IGhhbmRsZXIuXG4gICAqL1xuICBzY3JvbGxUb1ByZXZWaXNpYmxlU3BhbiA9ICgpID0+IHtcbiAgICB0aGlzLl9zY3JvbGxUb1Zpc2libGVTcGFuKC0xKTtcbiAgfTtcblxuICBzY3JvbGxUb0ZpcnN0VmlzaWJsZVNwYW4gPSAoKSA9PiB7XG4gICAgdGhpcy5fc2Nyb2xsVG9WaXNpYmxlU3BhbigxLCAwKTtcbiAgfTtcblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX3RyYWNlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3Njcm9sbGVyID0gdW5kZWZpbmVkIGFzIGFueTtcbiAgICB0aGlzLl9hY2Nlc3NvcnMgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBbUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxZQUFZQSxDQUFDQyxJQUFlLEVBQUVDLGlCQUE4QixFQUFFQyxRQUF1QyxFQUFFO0VBQzlHLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxHQUFHLENBQVMsQ0FBQztFQUNuQyxJQUFNQyxVQUFVLEdBQWtETCxJQUFJLENBQWhFSyxVQUFVO0VBQ2hCLElBQUlDLFFBQTRCO0VBQ2hDLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFRQSxDQUFJQyxHQUF1QixFQUFLO0lBQzVDLElBQUlBLEdBQUcsQ0FBQ0MsT0FBTyxLQUFLLFVBQVUsSUFBSUQsR0FBRyxDQUFDQyxPQUFPLEtBQUssY0FBYyxFQUFFO01BQ2hFSCxRQUFRLEdBQUdFLEdBQUcsQ0FBQ0UsTUFBTTtNQUNyQlAsU0FBUyxDQUFDUSxHQUFHLENBQUNMLFFBQVEsQ0FBQztNQUN2QixPQUFPTCxpQkFBaUIsQ0FBQ1csR0FBRyxDQUFDTixRQUFRLENBQUM7SUFDeEM7SUFDQSxPQUFPLEtBQUs7RUFDZCxDQUFDO0VBQ0QsT0FBT08sS0FBSyxDQUFDQyxPQUFPLENBQUNULFVBQVUsQ0FBQyxJQUFJQSxVQUFVLENBQUNVLE1BQU0sRUFBRTtJQUNyRCxJQUFNQyxRQUFRLEdBQUdYLFVBQVUsQ0FBQ1ksSUFBSSxDQUFDVixRQUFRLENBQUM7SUFDMUMsSUFBSVMsUUFBUSxFQUFFO01BQ1osT0FBTztRQUFFQSxRQUFRLEVBQVJBLFFBQVE7UUFBRWIsU0FBUyxFQUFUQTtNQUFVLENBQUM7SUFDaEM7SUFDQSxJQUFJLENBQUNHLFFBQVEsRUFBRTtNQUNiO0lBQ0Y7SUFDQSxJQUFNWSxNQUFNLEdBQUdoQixRQUFRLENBQUNpQixHQUFHLENBQUNiLFFBQVEsQ0FBQztJQUNyQ0EsUUFBUSxHQUFHYyxTQUFTO0lBQ3BCZixVQUFVLEdBQUdhLE1BQU0sSUFBSUEsTUFBTSxDQUFDYixVQUFVO0VBQzFDO0VBQ0EsT0FBTztJQUFFRixTQUFTLEVBQVRBLFNBQVM7SUFBRWEsUUFBUSxFQUFFO0VBQU0sQ0FBQztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBLElBSXFCSyxhQUFhO0VBS2hDLFNBQUFBLGNBQVlDLEtBQW1CLEVBQUVDLFFBQWtCLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBNEhyRDtBQUNGO0FBQ0E7QUFDQTtJQUhFLEtBSUFDLFlBQVksR0FBRyxVQUFDQyxTQUFvQixFQUFLO01BQ3ZDRixLQUFJLENBQUNHLFVBQVUsR0FBR0QsU0FBUztJQUM3QixDQUFDO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7SUFIRSxLQUlBRSxjQUFjLEdBQUcsWUFBTTtNQUNyQixJQUFJLENBQUNKLEtBQUksQ0FBQ0ssU0FBUyxJQUFJLENBQUNMLEtBQUksQ0FBQ0csVUFBVSxFQUFFO1FBQ3ZDO01BQ0Y7TUFDQUgsS0FBSSxDQUFDSyxTQUFTLENBQUNDLFFBQVEsQ0FBQyxJQUFJLEdBQUdOLEtBQUksQ0FBQ0csVUFBVSxDQUFDSSxhQUFhLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUN2RSxDQUFDO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7SUFIRSxLQUlBQyxZQUFZLEdBQUcsWUFBTTtNQUNuQixJQUFJLENBQUNSLEtBQUksQ0FBQ0ssU0FBUyxJQUFJLENBQUNMLEtBQUksQ0FBQ0csVUFBVSxFQUFFO1FBQ3ZDO01BQ0Y7TUFDQUgsS0FBSSxDQUFDSyxTQUFTLENBQUNDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBR04sS0FBSSxDQUFDRyxVQUFVLENBQUNJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ3hFLENBQUM7SUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0lBSkUsS0FLQUUsdUJBQXVCLEdBQUcsWUFBTTtNQUM5QlQsS0FBSSxDQUFDVSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7SUFKRSxLQUtBQyx1QkFBdUIsR0FBRyxZQUFNO01BQzlCWCxLQUFJLENBQUNVLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFBQSxLQUVERSx3QkFBd0IsR0FBRyxZQUFNO01BQy9CWixLQUFJLENBQUNVLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQTdLQyxJQUFJLENBQUNHLE1BQU0sR0FBR2YsS0FBSztJQUNuQixJQUFJLENBQUNPLFNBQVMsR0FBR04sUUFBUTtJQUN6QixJQUFJLENBQUNJLFVBQVUsR0FBR1AsU0FBUztFQUM3QjtFQUFDLElBQUFrQixNQUFBLEdBQUFqQixhQUFBLENBQUFrQixTQUFBO0VBQUFELE1BQUEsQ0FFREUsV0FBVyxHQUFYLFNBQUFBLFlBQVlDLFFBQWdCLEVBQUVDLFNBQWlCLEVBQUU7SUFBQSxJQUFBQyxlQUFBO0lBQy9DLElBQU1DLEdBQUcsR0FBRyxJQUFJLENBQUNqQixVQUFVO0lBQzNCO0lBQ0EsSUFBSSxDQUFDaUIsR0FBRyxFQUFFO01BQ1IsTUFBTSxJQUFJQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7SUFDdEM7SUFDQSxJQUFNQyxJQUFJLEdBQUdKLFNBQVMsR0FBRyxDQUFDO0lBQzFCLElBQU1LLFFBQVEsR0FBR0gsR0FBRyxDQUFDSSxjQUFjLENBQUNQLFFBQVEsQ0FBQztJQUM3QyxJQUFJLENBQUNNLFFBQVEsRUFBRTtNQUNiO01BQ0FFLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDO01BQ2pDO0lBQ0Y7SUFDQSxJQUFNQyxDQUFDLEdBQUtKLFFBQVEsQ0FBZEksQ0FBQztJQUNQLElBQU1DLEVBQUUsR0FBR1IsR0FBRyxDQUFDYixhQUFhLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUNlLElBQUksRUFBRTtNQUNUSyxDQUFDLElBQUlKLFFBQVEsQ0FBQ00sTUFBTTtNQUNwQjtNQUNBRixDQUFDLElBQUlDLEVBQUU7SUFDVDtJQUNBRCxDQUFDLElBQUlULFNBQVMsR0FBRyxHQUFHLEdBQUdVLEVBQUU7SUFDekIsQ0FBQVQsZUFBQSxPQUFJLENBQUNkLFNBQVMsYUFBZGMsZUFBQSxDQUFnQlcsUUFBUSxDQUFDSCxDQUFDLENBQUM7RUFDN0IsQ0FBQztFQUFBYixNQUFBLENBRURKLG9CQUFvQixHQUFwQixTQUFBQSxxQkFBcUJRLFNBQWlCLEVBQUVhLFFBQWlCLEVBQUU7SUFDekQsSUFBTVgsR0FBRyxHQUFHLElBQUksQ0FBQ2pCLFVBQVU7SUFDM0I7SUFDQSxJQUFJLENBQUNpQixHQUFHLEVBQUU7TUFDUixNQUFNLElBQUlDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztJQUN0QztJQUNBLElBQUksQ0FBQyxJQUFJLENBQUNSLE1BQU0sRUFBRTtNQUNoQjtJQUNGO0lBQ0EsSUFBQW1CLFlBQUEsR0FBdUQsSUFBSSxDQUFDbkIsTUFBTTtNQUExRG9CLFFBQVEsR0FBQUQsWUFBQSxDQUFSQyxRQUFRO01BQUVDLEtBQUssR0FBQUYsWUFBQSxDQUFMRSxLQUFLO01BQWFDLGNBQWMsR0FBQUgsWUFBQSxDQUF6QkksU0FBUztJQUNsQyxJQUFNZCxJQUFJLEdBQUdKLFNBQVMsR0FBRyxDQUFDO0lBQzFCLElBQUltQixXQUFtQjtJQUN2QixJQUFJTixRQUFRLElBQUksSUFBSSxFQUFFO01BQ3BCTSxXQUFXLEdBQUdOLFFBQVE7SUFDeEIsQ0FBQyxNQUFNLElBQUlULElBQUksRUFBRTtNQUNmZSxXQUFXLEdBQUdqQixHQUFHLENBQUNrQixxQkFBcUIsQ0FBQyxDQUFDO0lBQzNDLENBQUMsTUFBTTtNQUNMRCxXQUFXLEdBQUdqQixHQUFHLENBQUNtQix3QkFBd0IsQ0FBQyxDQUFDO0lBQzlDO0lBQ0EsSUFBTUMsU0FBUyxHQUFHcEIsR0FBRyxDQUFDcUIsc0JBQXNCLENBQUNKLFdBQVcsQ0FBQztJQUN6RCxJQUFLRyxTQUFTLEtBQUssQ0FBQyxJQUFJbEIsSUFBSSxJQUFNa0IsU0FBUyxLQUFLTixLQUFLLENBQUMzQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMrQixJQUFLLEVBQUU7TUFDMUU7SUFDRjtJQUNBO0lBQ0EsSUFBSW9CLGlCQUFpQixHQUFHRixTQUFTO0lBQ2pDLElBQUlBLFNBQVMsS0FBSyxDQUFDLElBQUlBLFNBQVMsS0FBS04sS0FBSyxDQUFDM0MsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNyRG1ELGlCQUFpQixJQUFJeEIsU0FBUztJQUNoQztJQUNBLElBQUF5QixpQkFBQSxHQUE2QnZCLEdBQUcsQ0FBQ3dCLFlBQVksQ0FBQyxDQUFDO01BQXhDQyxTQUFTLEdBQUFGLGlCQUFBO01BQUVHLE9BQU8sR0FBQUgsaUJBQUE7SUFDekIsSUFBTUksZUFBZSxHQUFHRixTQUFTLEtBQUssQ0FBQyxJQUFJQyxPQUFPLEtBQUssQ0FBQztJQUN4RDtJQUNBLElBQU1WLFNBQVMsR0FBR1csZUFBZSxHQUFHWixjQUFjLEdBQUdGLFFBQVEsR0FBR1ksU0FBUyxHQUFHRyxHQUFHO0lBQy9FLElBQU1DLE9BQU8sR0FBR0YsZUFBZSxHQUFHWixjQUFjLEdBQUdGLFFBQVEsR0FBR2EsT0FBTyxHQUFHRSxHQUFHO0lBQzNFLElBQU1FLFdBQVcsR0FBRzlCLEdBQUcsQ0FBQytCLGtCQUFrQixDQUFDLENBQUM7SUFDNUMsSUFBTUMsVUFBVSxHQUFHaEMsR0FBRyxDQUFDaUMsb0JBQW9CLENBQUMsQ0FBQztJQUM3QyxJQUFNNUUsaUJBQWlCLEdBQUcyRSxVQUFVLEdBQUcsSUFBSXhFLEdBQUcsQ0FBQ3dFLFVBQVUsQ0FBQyxHQUFHLElBQUk7SUFDakU7SUFDQSxJQUFNMUUsUUFBZ0MsR0FBR0QsaUJBQWlCLEdBQ3RELElBQUk2RSxHQUFHLENBQUNwQixLQUFLLENBQUNxQixHQUFHLENBQUMsVUFBQ0MsQ0FBQztNQUFBLE9BQUssQ0FBQ0EsQ0FBQyxDQUFDdEUsTUFBTSxFQUFFc0UsQ0FBQyxDQUFDO0lBQUEsQ0FBdUIsQ0FBQyxDQUFDLEdBQy9ELElBQUlGLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsSUFBTUcsUUFBUSxHQUFHdkMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBR2dCLEtBQUssQ0FBQzNDLE1BQU07SUFDbEQsSUFBSW1FLGFBQWlDO0lBQ3JDLEtBQUssSUFBSUMsQ0FBQyxHQUFHakIsaUJBQWlCLEdBQUd4QixTQUFTLEVBQUV5QyxDQUFDLEtBQUtGLFFBQVEsRUFBRUUsQ0FBQyxJQUFJekMsU0FBUyxFQUFFO01BQzFFLElBQU0xQyxJQUFJLEdBQUcwRCxLQUFLLENBQUN5QixDQUFDLENBQUM7TUFDckIsSUFBa0JDLFlBQVksR0FBdUNwRixJQUFJLENBQWpFeUQsUUFBUTtRQUFnQi9DLE1BQU0sR0FBK0JWLElBQUksQ0FBekNVLE1BQU07UUFBYTJFLGFBQWEsR0FBS3JGLElBQUksQ0FBakM0RCxTQUFTO01BQ2pELElBQU0wQixXQUFXLEdBQUdELGFBQWEsR0FBR0QsWUFBWTtNQUNoRCxJQUFJYixlQUFlLEtBQUtjLGFBQWEsR0FBR1osT0FBTyxJQUFJYSxXQUFXLEdBQUcxQixTQUFTLENBQUMsRUFBRTtRQUMzRTtRQUNBO01BQ0Y7TUFDQSxJQUFJYyxXQUFXLElBQUksQ0FBQ0EsV0FBVyxDQUFDOUQsR0FBRyxDQUFDRixNQUFNLENBQUMsRUFBRTtRQUMzQztRQUNBO01BQ0Y7TUFDQSxJQUFJVCxpQkFBaUIsRUFBRTtRQUNyQjtRQUNBLElBQUFzRixhQUFBLEdBQWdDeEYsWUFBWSxDQUFDQyxJQUFJLEVBQUVDLGlCQUFpQixFQUFFQyxRQUFRLENBQUM7VUFBdkVjLFFBQVEsR0FBQXVFLGFBQUEsQ0FBUnZFLFFBQVE7VUFBRWIsU0FBUyxHQUFBb0YsYUFBQSxDQUFUcEYsU0FBUztRQUMzQixJQUFJYSxRQUFRLEVBQUU7VUFDWmIsU0FBUyxDQUFDcUYsT0FBTyxDQUFDLFVBQUNDLEVBQUU7WUFBQSxPQUFLeEYsaUJBQWlCLENBQUNVLEdBQUcsQ0FBQzhFLEVBQUUsQ0FBQztVQUFBLEVBQUM7VUFDcEQ7UUFDRjtNQUNGO01BQ0FQLGFBQWEsR0FBR0MsQ0FBQztNQUNqQjtJQUNGO0lBQ0EsSUFBSSxDQUFDRCxhQUFhLElBQUlBLGFBQWEsS0FBS0QsUUFBUSxFQUFFO01BQ2hEO01BQ0FDLGFBQWEsR0FBR0QsUUFBUSxHQUFHdkMsU0FBUzs7TUFFcEM7TUFDQSxJQUFJekMsaUJBQWlCLEVBQUU7UUFDckIsSUFBSXlGLGdCQUF5QjtRQUM3QixHQUFHO1VBQ0QsSUFBQUMsY0FBQSxHQUFnQzVGLFlBQVksQ0FBQzJELEtBQUssQ0FBQ3dCLGFBQWEsQ0FBQyxFQUFFakYsaUJBQWlCLEVBQUVDLFFBQVEsQ0FBQztZQUF2RmMsU0FBUSxHQUFBMkUsY0FBQSxDQUFSM0UsUUFBUTtZQUFFYixVQUFTLEdBQUF3RixjQUFBLENBQVR4RixTQUFTO1VBQzNCLElBQUlhLFNBQVEsRUFBRTtZQUNaYixVQUFTLENBQUNxRixPQUFPLENBQUMsVUFBQ0MsRUFBRTtjQUFBLE9BQUt4RixpQkFBaUIsQ0FBQ1UsR0FBRyxDQUFDOEUsRUFBRSxDQUFDO1lBQUEsRUFBQztZQUNwRFAsYUFBYSxFQUFFO1VBQ2pCO1VBQ0FRLGdCQUFnQixHQUFHMUUsU0FBUTtRQUM3QixDQUFDLFFBQVEwRSxnQkFBZ0I7TUFDM0I7SUFDRjtJQUNBLElBQU1FLE9BQU8sR0FBR2hELEdBQUcsQ0FBQ2lELHNCQUFzQixDQUFDWCxhQUFhLENBQUM7SUFDekQsSUFBSSxDQUFDMUMsV0FBVyxDQUFDb0QsT0FBTyxFQUFFbEQsU0FBUyxDQUFDO0VBQ3RDOztFQUVBO0FBQ0Y7QUFDQTtBQUNBLEtBSEU7RUFBQUosTUFBQSxDQUlBd0QsUUFBUSxHQUFSLFNBQUFBLFNBQVN4RSxLQUFtQixFQUFFO0lBQzVCLElBQUksQ0FBQ2UsTUFBTSxHQUFHZixLQUFLO0VBQ3JCLENBQUM7RUFBQWdCLE1BQUEsQ0FzRER5RCxPQUFPLEdBQVAsU0FBQUEsUUFBQSxFQUFVO0lBQ1IsSUFBSSxDQUFDMUQsTUFBTSxHQUFHakIsU0FBUztJQUN2QixJQUFJLENBQUNTLFNBQVMsR0FBR1QsU0FBZ0I7SUFDakMsSUFBSSxDQUFDTyxVQUFVLEdBQUdQLFNBQVM7RUFDN0IsQ0FBQztFQUFBLE9BQUFDLGFBQUE7QUFBQTtBQUFBLFNBekxrQkEsYUFBYSxJQUFBMkUsT0FBQSIsImlnbm9yZUxpc3QiOltdfQ==