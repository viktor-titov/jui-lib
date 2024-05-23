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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpc1NwYW5IaWRkZW4iLCJzcGFuIiwiY2hpbGRyZW5BcmVIaWRkZW4iLCJzcGFuc01hcCIsInBhcmVudElEcyIsIlNldCIsInJlZmVyZW5jZXMiLCJwYXJlbnRJRCIsImNoZWNrUmVmIiwicmVmIiwicmVmVHlwZSIsInNwYW5JRCIsImFkZCIsImhhcyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImlzSGlkZGVuIiwic29tZSIsInBhcmVudCIsImdldCIsInVuZGVmaW5lZCIsIlNjcm9sbE1hbmFnZXIiLCJ0cmFjZSIsInNjcm9sbGVyIiwiX3RoaXMiLCJzZXRBY2Nlc3NvcnMiLCJhY2Nlc3NvcnMiLCJfYWNjZXNzb3JzIiwic2Nyb2xsUGFnZURvd24iLCJfc2Nyb2xsZXIiLCJzY3JvbGxCeSIsImdldFZpZXdIZWlnaHQiLCJzY3JvbGxQYWdlVXAiLCJzY3JvbGxUb05leHRWaXNpYmxlU3BhbiIsIl9zY3JvbGxUb1Zpc2libGVTcGFuIiwic2Nyb2xsVG9QcmV2VmlzaWJsZVNwYW4iLCJzY3JvbGxUb0ZpcnN0VmlzaWJsZVNwYW4iLCJfdHJhY2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJfc2Nyb2xsUGFzdCIsInJvd0luZGV4IiwiZGlyZWN0aW9uIiwiX3RoaXMkX3Njcm9sbGVyIiwieHJzIiwiRXJyb3IiLCJpc1VwIiwicG9zaXRpb24iLCJnZXRSb3dQb3NpdGlvbiIsImNvbnNvbGUiLCJ3YXJuIiwieSIsInZoIiwiaGVpZ2h0Iiwic2Nyb2xsVG8iLCJzdGFydFJvdyIsIl90aGlzJF90cmFjZSIsImR1cmF0aW9uIiwic3BhbnMiLCJ0cmFjZVN0YXJ0VGltZSIsInN0YXJ0VGltZSIsImJvdW5kYXJ5Um93IiwiZ2V0VG9wUm93SW5kZXhWaXNpYmxlIiwiZ2V0Qm90dG9tUm93SW5kZXhWaXNpYmxlIiwic3BhbkluZGV4IiwibWFwUm93SW5kZXhUb1NwYW5JbmRleCIsImZ1bGxWaWV3U3BhbkluZGV4IiwiX3hycyRnZXRWaWV3UmFuZ2UiLCJnZXRWaWV3UmFuZ2UiLCJ2aWV3U3RhcnQiLCJ2aWV3RW5kIiwiY2hlY2tWaXNpYmlsaXR5IiwiTmFOIiwiZW5kVGltZSIsImZpbmRNYXRjaGVzIiwiZ2V0U2VhcmNoZWRTcGFuSURzIiwiX2NvbGxhcHNlZCIsImdldENvbGxhcHNlZENoaWxkcmVuIiwiTWFwIiwibWFwIiwicyIsImJvdW5kYXJ5IiwibmV4dFNwYW5JbmRleCIsImkiLCJzcGFuRHVyYXRpb24iLCJzcGFuU3RhcnRUaW1lIiwic3BhbkVuZFRpbWUiLCJfaXNTcGFuSGlkZGVuIiwiZm9yRWFjaCIsImlkIiwiaXNGYWxsYmFja0hpZGRlbiIsIl9pc1NwYW5IaWRkZW4yIiwibmV4dFJvdyIsIm1hcFNwYW5JbmRleFRvUm93SW5kZXgiLCJzZXRUcmFjZSIsImRlc3Ryb3kiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vc3JjL1Njcm9sbE1hbmFnZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBUTmlsIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFjZVNwYW4sIFRyYWNlU3BhblJlZmVyZW5jZSwgVHJhY2UgfSBmcm9tICcuL3R5cGVzL3RyYWNlJztcblxuLyoqXG4gKiBgQWNjZXNzb3JzYCBpcyBuZWNlc3NhcnkgYmVjYXVzZSBgU2Nyb2xsTWFuYWdlcmAgbmVlZHMgdG8gYmUgY3JlYXRlZCBieVxuICogYFRyYWNlUGFnZWAgc28gaXQgY2FuIGJlIHBhc3NlZCBpbnRvIHRoZSBrZXlib2FyZCBzaG9ydGN1dCBtYW5hZ2VyLiBCdXQsXG4gKiBgU2Nyb2xsTWFuYWdlcmAgbmVlZHMgdG8ga25vdyBhYm91dCB0aGUgc3RhdGUgb2YgYExpc3RWaWV3YCBhbmQgYFBvc2l0aW9uc2AsXG4gKiB3aGljaCBhcmUgdmVyeSBsb3ctbGV2ZWwuIEFuZCwgc3RvcmluZyB0aGVpciBzdGF0ZSBpbmZvIGluIHJlZHV4IG9yXG4gKiBgVHJhY2VQYWdlI3N0YXRlYCB3b3VsZCBiZSBpbmVmZmljaWVudCBiZWNhdXNlIHRoZSBzdGF0ZSBpbmZvIG9ubHkgcmFyZWx5XG4gKiBuZWVkcyB0byBiZSBhY2Nlc3NlZCAod2hlbiBhIGtleWJvYXJkIHNob3J0Y3V0IGlzIHRyaWdnZXJlZCkuIGBBY2Nlc3NvcnNgXG4gKiBhbGxvd3MgdGhhdCBzdGF0ZSBpbmZvIHRvIGJlIGFjY2Vzc2VkIGluIGEgbG9vc2VseSBjb3VwbGVkIGZhc2hpb24gb24gYW5cbiAqIGFzLW5lZWRlZCBiYXNpcy5cbiAqL1xuZXhwb3J0IHR5cGUgQWNjZXNzb3JzID0ge1xuICBnZXRWaWV3UmFuZ2U6ICgpID0+IFtudW1iZXIsIG51bWJlcl07XG4gIGdldFNlYXJjaGVkU3BhbklEczogKCkgPT4gU2V0PHN0cmluZz4gfCBUTmlsO1xuICBnZXRDb2xsYXBzZWRDaGlsZHJlbjogKCkgPT4gU2V0PHN0cmluZz4gfCBUTmlsO1xuICBnZXRWaWV3SGVpZ2h0OiAoKSA9PiBudW1iZXI7XG4gIGdldEJvdHRvbVJvd0luZGV4VmlzaWJsZTogKCkgPT4gbnVtYmVyO1xuICBnZXRUb3BSb3dJbmRleFZpc2libGU6ICgpID0+IG51bWJlcjtcbiAgZ2V0Um93UG9zaXRpb246IChyb3dJbmRleDogbnVtYmVyKSA9PiB7IGhlaWdodDogbnVtYmVyOyB5OiBudW1iZXIgfTtcbiAgbWFwUm93SW5kZXhUb1NwYW5JbmRleDogKHJvd0luZGV4OiBudW1iZXIpID0+IG51bWJlcjtcbiAgbWFwU3BhbkluZGV4VG9Sb3dJbmRleDogKHNwYW5JbmRleDogbnVtYmVyKSA9PiBudW1iZXI7XG59O1xuXG5pbnRlcmZhY2UgU2Nyb2xsZXIge1xuICBzY3JvbGxUbzogKHJvd0luZGV4OiBudW1iZXIpID0+IHZvaWQ7XG4gIC8vIFRPRE8gYXJnIG5hbWVzIHRocm91Z2hvdXRcbiAgc2Nyb2xsQnk6IChyb3dJbmRleDogbnVtYmVyLCBvcHQ/OiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIFJldHVybnMgYHsgaXNIaWRkZW46IHRydWUsIC4uLiB9YCBpZiBvbmUgb2YgdGhlIHBhcmVudHMgb2YgYHNwYW5gIGlzXG4gKiBjb2xsYXBzZWQsIGUuZy4gaGFzIGNoaWxkcmVuIGhpZGRlbi5cbiAqXG4gKiBAcGFyYW0ge1RyYWNlU3Bhbn0gc3BhbiBUaGUgU3BhbiB0byBjaGVjayBmb3IuXG4gKiBAcGFyYW0ge1NldDxzdHJpbmc+fSBjaGlsZHJlbkFyZUhpZGRlbiBUaGUgc2V0IG9mIFNwYW5zIGtub3duIHRvIGhhdmUgaGlkZGVuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiwgZWl0aGVyIGJlY2F1c2UgaXQgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZCBvciBoYXMgYSBjb2xsYXBzZWQgcGFyZW50LlxuICogQHBhcmFtIHtNYXA8c3RyaW5nLCBUcmFjZVNwYW4gfCBUTmlsfSBzcGFuc01hcCBNYXBwaW5nIGZyb20gc3BhbklEIHRvIFNwYW4uXG4gKiBAcmV0dXJucyB7eyBpc0hpZGRlbjogYm9vbGVhbiwgcGFyZW50SWRzOiBTZXQ8c3RyaW5nPiB9fVxuICovXG5mdW5jdGlvbiBpc1NwYW5IaWRkZW4oc3BhbjogVHJhY2VTcGFuLCBjaGlsZHJlbkFyZUhpZGRlbjogU2V0PHN0cmluZz4sIHNwYW5zTWFwOiBNYXA8c3RyaW5nLCBUcmFjZVNwYW4gfCBUTmlsPikge1xuICBjb25zdCBwYXJlbnRJRHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgbGV0IHsgcmVmZXJlbmNlcyB9OiB7IHJlZmVyZW5jZXM6IFRyYWNlU3BhblJlZmVyZW5jZVtdIHwgVE5pbCB9ID0gc3BhbjtcbiAgbGV0IHBhcmVudElEOiB1bmRlZmluZWQgfCBzdHJpbmc7XG4gIGNvbnN0IGNoZWNrUmVmID0gKHJlZjogVHJhY2VTcGFuUmVmZXJlbmNlKSA9PiB7XG4gICAgaWYgKHJlZi5yZWZUeXBlID09PSAnQ0hJTERfT0YnIHx8IHJlZi5yZWZUeXBlID09PSAnRk9MTE9XU19GUk9NJykge1xuICAgICAgcGFyZW50SUQgPSByZWYuc3BhbklEO1xuICAgICAgcGFyZW50SURzLmFkZChwYXJlbnRJRCk7XG4gICAgICByZXR1cm4gY2hpbGRyZW5BcmVIaWRkZW4uaGFzKHBhcmVudElEKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICB3aGlsZSAoQXJyYXkuaXNBcnJheShyZWZlcmVuY2VzKSAmJiByZWZlcmVuY2VzLmxlbmd0aCkge1xuICAgIGNvbnN0IGlzSGlkZGVuID0gcmVmZXJlbmNlcy5zb21lKGNoZWNrUmVmKTtcbiAgICBpZiAoaXNIaWRkZW4pIHtcbiAgICAgIHJldHVybiB7IGlzSGlkZGVuLCBwYXJlbnRJRHMgfTtcbiAgICB9XG4gICAgaWYgKCFwYXJlbnRJRCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnN0IHBhcmVudCA9IHNwYW5zTWFwLmdldChwYXJlbnRJRCk7XG4gICAgcGFyZW50SUQgPSB1bmRlZmluZWQ7XG4gICAgcmVmZXJlbmNlcyA9IHBhcmVudCAmJiBwYXJlbnQucmVmZXJlbmNlcztcbiAgfVxuICByZXR1cm4geyBwYXJlbnRJRHMsIGlzSGlkZGVuOiBmYWxzZSB9O1xufVxuXG4vKipcbiAqIFNjcm9sbE1hbmFnZXIgaXMgaW50ZW5kZWQgZm9yIHNjcm9sbGluZyB0aGUgVHJhY2VQYWdlLiBIYXMgdHdvIG1vZGVzLCBwYWdpbmdcbiAqIGFuZCBzY3JvbGxpbmcgdG8gdGhlIHByZXZpb3VzIG9yIG5leHQgdmlzaWJsZSBzcGFuLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxNYW5hZ2VyIHtcbiAgX3RyYWNlOiBUcmFjZSB8IFROaWw7XG4gIF9zY3JvbGxlcjogU2Nyb2xsZXIgfCBUTmlsO1xuICBfYWNjZXNzb3JzOiBBY2Nlc3NvcnMgfCBUTmlsO1xuXG4gIGNvbnN0cnVjdG9yKHRyYWNlOiBUcmFjZSB8IFROaWwsIHNjcm9sbGVyOiBTY3JvbGxlcikge1xuICAgIHRoaXMuX3RyYWNlID0gdHJhY2U7XG4gICAgdGhpcy5fc2Nyb2xsZXIgPSBzY3JvbGxlcjtcbiAgICB0aGlzLl9hY2Nlc3NvcnMgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBfc2Nyb2xsUGFzdChyb3dJbmRleDogbnVtYmVyLCBkaXJlY3Rpb246IDEgfCAtMSkge1xuICAgIGNvbnN0IHhycyA9IHRoaXMuX2FjY2Vzc29ycztcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICgheHJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc2V0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGlzVXAgPSBkaXJlY3Rpb24gPCAwO1xuICAgIGNvbnN0IHBvc2l0aW9uID0geHJzLmdldFJvd1Bvc2l0aW9uKHJvd0luZGV4KTtcbiAgICBpZiAoIXBvc2l0aW9uKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKCdJbnZhbGlkIHJvdyBpbmRleCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgeyB5IH0gPSBwb3NpdGlvbjtcbiAgICBjb25zdCB2aCA9IHhycy5nZXRWaWV3SGVpZ2h0KCk7XG4gICAgaWYgKCFpc1VwKSB7XG4gICAgICB5ICs9IHBvc2l0aW9uLmhlaWdodDtcbiAgICAgIC8vIHNjcm9sbFRvcCBpcyBiYXNlZCBvbiB0aGUgdG9wIG9mIHRoZSB3aW5kb3dcbiAgICAgIHkgLT0gdmg7XG4gICAgfVxuICAgIHkgKz0gZGlyZWN0aW9uICogMC41ICogdmg7XG4gICAgdGhpcy5fc2Nyb2xsZXI/LnNjcm9sbFRvKHkpO1xuICB9XG5cbiAgX3Njcm9sbFRvVmlzaWJsZVNwYW4oZGlyZWN0aW9uOiAxIHwgLTEsIHN0YXJ0Um93PzogbnVtYmVyKSB7XG4gICAgY29uc3QgeHJzID0gdGhpcy5fYWNjZXNzb3JzO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKCF4cnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWNjZXNzb3JzIG5vdCBzZXQnKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl90cmFjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGR1cmF0aW9uLCBzcGFucywgc3RhcnRUaW1lOiB0cmFjZVN0YXJ0VGltZSB9ID0gdGhpcy5fdHJhY2U7XG4gICAgY29uc3QgaXNVcCA9IGRpcmVjdGlvbiA8IDA7XG4gICAgbGV0IGJvdW5kYXJ5Um93OiBudW1iZXI7XG4gICAgaWYgKHN0YXJ0Um93ICE9IG51bGwpIHtcbiAgICAgIGJvdW5kYXJ5Um93ID0gc3RhcnRSb3c7XG4gICAgfSBlbHNlIGlmIChpc1VwKSB7XG4gICAgICBib3VuZGFyeVJvdyA9IHhycy5nZXRUb3BSb3dJbmRleFZpc2libGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmRhcnlSb3cgPSB4cnMuZ2V0Qm90dG9tUm93SW5kZXhWaXNpYmxlKCk7XG4gICAgfVxuICAgIGNvbnN0IHNwYW5JbmRleCA9IHhycy5tYXBSb3dJbmRleFRvU3BhbkluZGV4KGJvdW5kYXJ5Um93KTtcbiAgICBpZiAoKHNwYW5JbmRleCA9PT0gMCAmJiBpc1VwKSB8fCAoc3BhbkluZGV4ID09PSBzcGFucy5sZW5ndGggLSAxICYmICFpc1VwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBmdWxsVmlld1NwYW5JbmRleCBpcyBvbmUgcm93IGluc2lkZSB0aGUgdmlldyB3aW5kb3cgdW5sZXNzIGFscmVhZHkgYXQgdGhlIHRvcCBvciBib3R0b21cbiAgICBsZXQgZnVsbFZpZXdTcGFuSW5kZXggPSBzcGFuSW5kZXg7XG4gICAgaWYgKHNwYW5JbmRleCAhPT0gMCAmJiBzcGFuSW5kZXggIT09IHNwYW5zLmxlbmd0aCAtIDEpIHtcbiAgICAgIGZ1bGxWaWV3U3BhbkluZGV4IC09IGRpcmVjdGlvbjtcbiAgICB9XG4gICAgY29uc3QgW3ZpZXdTdGFydCwgdmlld0VuZF0gPSB4cnMuZ2V0Vmlld1JhbmdlKCk7XG4gICAgY29uc3QgY2hlY2tWaXNpYmlsaXR5ID0gdmlld1N0YXJ0ICE9PSAwIHx8IHZpZXdFbmQgIT09IDE7XG4gICAgLy8gdXNlIE5hTiBhcyBmYWxsYmFjayB0byBtYWtlIGZsb3cgaGFwcHlcbiAgICBjb25zdCBzdGFydFRpbWUgPSBjaGVja1Zpc2liaWxpdHkgPyB0cmFjZVN0YXJ0VGltZSArIGR1cmF0aW9uICogdmlld1N0YXJ0IDogTmFOO1xuICAgIGNvbnN0IGVuZFRpbWUgPSBjaGVja1Zpc2liaWxpdHkgPyB0cmFjZVN0YXJ0VGltZSArIGR1cmF0aW9uICogdmlld0VuZCA6IE5hTjtcbiAgICBjb25zdCBmaW5kTWF0Y2hlcyA9IHhycy5nZXRTZWFyY2hlZFNwYW5JRHMoKTtcbiAgICBjb25zdCBfY29sbGFwc2VkID0geHJzLmdldENvbGxhcHNlZENoaWxkcmVuKCk7XG4gICAgY29uc3QgY2hpbGRyZW5BcmVIaWRkZW4gPSBfY29sbGFwc2VkID8gbmV3IFNldChfY29sbGFwc2VkKSA6IG51bGw7XG4gICAgLy8gdXNlIGVtcHR5IE1hcCBhcyBmYWxsYmFjayB0byBtYWtlIGZsb3cgaGFwcHlcbiAgICBjb25zdCBzcGFuc01hcDogTWFwPHN0cmluZywgVHJhY2VTcGFuPiA9IGNoaWxkcmVuQXJlSGlkZGVuXG4gICAgICA/IG5ldyBNYXAoc3BhbnMubWFwKChzKSA9PiBbcy5zcGFuSUQsIHNdIGFzIFtzdHJpbmcsIFRyYWNlU3Bhbl0pKVxuICAgICAgOiBuZXcgTWFwKCk7XG4gICAgY29uc3QgYm91bmRhcnkgPSBkaXJlY3Rpb24gPCAwID8gLTEgOiBzcGFucy5sZW5ndGg7XG4gICAgbGV0IG5leHRTcGFuSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICBmb3IgKGxldCBpID0gZnVsbFZpZXdTcGFuSW5kZXggKyBkaXJlY3Rpb247IGkgIT09IGJvdW5kYXJ5OyBpICs9IGRpcmVjdGlvbikge1xuICAgICAgY29uc3Qgc3BhbiA9IHNwYW5zW2ldO1xuICAgICAgY29uc3QgeyBkdXJhdGlvbjogc3BhbkR1cmF0aW9uLCBzcGFuSUQsIHN0YXJ0VGltZTogc3BhblN0YXJ0VGltZSB9ID0gc3BhbjtcbiAgICAgIGNvbnN0IHNwYW5FbmRUaW1lID0gc3BhblN0YXJ0VGltZSArIHNwYW5EdXJhdGlvbjtcbiAgICAgIGlmIChjaGVja1Zpc2liaWxpdHkgJiYgKHNwYW5TdGFydFRpbWUgPiBlbmRUaW1lIHx8IHNwYW5FbmRUaW1lIDwgc3RhcnRUaW1lKSkge1xuICAgICAgICAvLyBzcGFuIGlzIG5vdCB2aXNpYmxlIHdpdGhpbiB0aGUgdmlldyByYW5nZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChmaW5kTWF0Y2hlcyAmJiAhZmluZE1hdGNoZXMuaGFzKHNwYW5JRCkpIHtcbiAgICAgICAgLy8gc2tpcCB0byBzZWFyY2ggbWF0Y2hlcyAod2hlbiBzZWFyY2hpbmcpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGNoaWxkcmVuQXJlSGlkZGVuKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgc3BhbiBpcyBub3QgY29sbGFwc2VkXG4gICAgICAgIGNvbnN0IHsgaXNIaWRkZW4sIHBhcmVudElEcyB9ID0gaXNTcGFuSGlkZGVuKHNwYW4sIGNoaWxkcmVuQXJlSGlkZGVuLCBzcGFuc01hcCk7XG4gICAgICAgIGlmIChpc0hpZGRlbikge1xuICAgICAgICAgIHBhcmVudElEcy5mb3JFYWNoKChpZCkgPT4gY2hpbGRyZW5BcmVIaWRkZW4uYWRkKGlkKSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5leHRTcGFuSW5kZXggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICghbmV4dFNwYW5JbmRleCB8fCBuZXh0U3BhbkluZGV4ID09PSBib3VuZGFyeSkge1xuICAgICAgLy8gbWlnaHQgYXMgd2VsbCBzY3JvbGwgdG8gdGhlIHRvcCBvciBib3R0b21cbiAgICAgIG5leHRTcGFuSW5kZXggPSBib3VuZGFyeSAtIGRpcmVjdGlvbjtcblxuICAgICAgLy8gSWYgdGhlcmUgYXJlIGhpZGRlbiBjaGlsZHJlbiwgc2Nyb2xsIHRvIHRoZSBsYXN0IHZpc2libGUgc3BhblxuICAgICAgaWYgKGNoaWxkcmVuQXJlSGlkZGVuKSB7XG4gICAgICAgIGxldCBpc0ZhbGxiYWNrSGlkZGVuOiBib29sZWFuO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgY29uc3QgeyBpc0hpZGRlbiwgcGFyZW50SURzIH0gPSBpc1NwYW5IaWRkZW4oc3BhbnNbbmV4dFNwYW5JbmRleF0sIGNoaWxkcmVuQXJlSGlkZGVuLCBzcGFuc01hcCk7XG4gICAgICAgICAgaWYgKGlzSGlkZGVuKSB7XG4gICAgICAgICAgICBwYXJlbnRJRHMuZm9yRWFjaCgoaWQpID0+IGNoaWxkcmVuQXJlSGlkZGVuLmFkZChpZCkpO1xuICAgICAgICAgICAgbmV4dFNwYW5JbmRleC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc0ZhbGxiYWNrSGlkZGVuID0gaXNIaWRkZW47XG4gICAgICAgIH0gd2hpbGUgKGlzRmFsbGJhY2tIaWRkZW4pO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBuZXh0Um93ID0geHJzLm1hcFNwYW5JbmRleFRvUm93SW5kZXgobmV4dFNwYW5JbmRleCk7XG4gICAgdGhpcy5fc2Nyb2xsUGFzdChuZXh0Um93LCBkaXJlY3Rpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWV0aW1lcyB0aGUgU2Nyb2xsTWFuYWdlciBpcyBjcmVhdGVkIGJlZm9yZSB0aGUgdHJhY2UgaXMgbG9hZGVkLiBUaGlzXG4gICAqIHNldHRlciBhbGxvd3MgdGhlIHRyYWNlIHRvIGJlIHNldCBhc3luY2hyb25vdXNseS5cbiAgICovXG4gIHNldFRyYWNlKHRyYWNlOiBUcmFjZSB8IFROaWwpIHtcbiAgICB0aGlzLl90cmFjZSA9IHRyYWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIGBzZXRBY2Nlc3NvcnNgIGlzIGJvdW5kIGluIHRoZSBjdG9yLCBzbyBpdCBjYW4gYmUgcGFzc2VkIGFzIGEgcHJvcCB0b1xuICAgKiBjaGlsZHJlbiBjb21wb25lbnRzLlxuICAgKi9cbiAgc2V0QWNjZXNzb3JzID0gKGFjY2Vzc29yczogQWNjZXNzb3JzKSA9PiB7XG4gICAgdGhpcy5fYWNjZXNzb3JzID0gYWNjZXNzb3JzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTY3JvbGxzIGFyb3VuZCBvbmUgcGFnZSBkb3duICgwLjk1eCkuIEl0IGlzIGJvdW5kcyBpbiB0aGUgY3Rvciwgc28gaXQgY2FuXG4gICAqIGJlIHVzZWQgYXMgYSBrZXlib2FyZCBzaG9ydGN1dCBoYW5kbGVyLlxuICAgKi9cbiAgc2Nyb2xsUGFnZURvd24gPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLl9zY3JvbGxlciB8fCAhdGhpcy5fYWNjZXNzb3JzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Njcm9sbGVyLnNjcm9sbEJ5KDAuOTUgKiB0aGlzLl9hY2Nlc3NvcnMuZ2V0Vmlld0hlaWdodCgpLCB0cnVlKTtcbiAgfTtcblxuICAvKipcbiAgICogU2Nyb2xscyBhcm91bmQgb25lIHBhZ2UgdXAgKDAuOTV4KS4gSXQgaXMgYm91bmRzIGluIHRoZSBjdG9yLCBzbyBpdCBjYW5cbiAgICogYmUgdXNlZCBhcyBhIGtleWJvYXJkIHNob3J0Y3V0IGhhbmRsZXIuXG4gICAqL1xuICBzY3JvbGxQYWdlVXAgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLl9zY3JvbGxlciB8fCAhdGhpcy5fYWNjZXNzb3JzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Njcm9sbGVyLnNjcm9sbEJ5KC0wLjk1ICogdGhpcy5fYWNjZXNzb3JzLmdldFZpZXdIZWlnaHQoKSwgdHJ1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNjcm9sbHMgdG8gdGhlIG5leHQgdmlzaWJsZSBzcGFuLCBpZ25vcmluZyBzcGFucyB0aGF0IGRvIG5vdCBtYXRjaCB0aGVcbiAgICogdGV4dCBmaWx0ZXIsIGlmIHRoZXJlIGlzIG9uZS4gSXQgaXMgYm91bmRzIGluIHRoZSBjdG9yLCBzbyBpdCBjYW5cbiAgICogYmUgdXNlZCBhcyBhIGtleWJvYXJkIHNob3J0Y3V0IGhhbmRsZXIuXG4gICAqL1xuICBzY3JvbGxUb05leHRWaXNpYmxlU3BhbiA9ICgpID0+IHtcbiAgICB0aGlzLl9zY3JvbGxUb1Zpc2libGVTcGFuKDEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTY3JvbGxzIHRvIHRoZSBwcmV2aW91cyB2aXNpYmxlIHNwYW4sIGlnbm9yaW5nIHNwYW5zIHRoYXQgZG8gbm90IG1hdGNoIHRoZVxuICAgKiB0ZXh0IGZpbHRlciwgaWYgdGhlcmUgaXMgb25lLiBJdCBpcyBib3VuZHMgaW4gdGhlIGN0b3IsIHNvIGl0IGNhblxuICAgKiBiZSB1c2VkIGFzIGEga2V5Ym9hcmQgc2hvcnRjdXQgaGFuZGxlci5cbiAgICovXG4gIHNjcm9sbFRvUHJldlZpc2libGVTcGFuID0gKCkgPT4ge1xuICAgIHRoaXMuX3Njcm9sbFRvVmlzaWJsZVNwYW4oLTEpO1xuICB9O1xuXG4gIHNjcm9sbFRvRmlyc3RWaXNpYmxlU3BhbiA9ICgpID0+IHtcbiAgICB0aGlzLl9zY3JvbGxUb1Zpc2libGVTcGFuKDEsIDApO1xuICB9O1xuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5fdHJhY2UgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc2Nyb2xsZXIgPSB1bmRlZmluZWQgYXMgYW55O1xuICAgIHRoaXMuX2FjY2Vzc29ycyA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLFlBQVlBLENBQUNDLElBQWUsRUFBRUMsaUJBQThCLEVBQUVDLFFBQXVDLEVBQUU7RUFDOUcsSUFBTUMsU0FBUyxHQUFHLElBQUlDLEdBQUcsQ0FBUyxDQUFDO0VBQ25DLElBQU1DLFVBQVUsR0FBa0RMLElBQUksQ0FBaEVLLFVBQVU7RUFDaEIsSUFBSUMsUUFBNEI7RUFDaEMsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVFBLENBQUlDLEdBQXVCLEVBQUs7SUFDNUMsSUFBSUEsR0FBRyxDQUFDQyxPQUFPLEtBQUssVUFBVSxJQUFJRCxHQUFHLENBQUNDLE9BQU8sS0FBSyxjQUFjLEVBQUU7TUFDaEVILFFBQVEsR0FBR0UsR0FBRyxDQUFDRSxNQUFNO01BQ3JCUCxTQUFTLENBQUNRLEdBQUcsQ0FBQ0ws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