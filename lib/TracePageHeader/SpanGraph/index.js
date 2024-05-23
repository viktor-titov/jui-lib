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

import cx from 'classnames';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import { ubPb2, ubPx2, ubRelative } from '../../uberUtilityStyles';
import CanvasSpanGraph from './CanvasSpanGraph';
import TickLabels from './TickLabels';
import ViewingLayer from './ViewingLayer';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var DEFAULT_HEIGHT = 60;
export var TIMELINE_TICK_INTERVAL = 4;
function getItem(span) {
  return {
    valueOffset: span.relativeStartTime,
    valueWidth: span.duration,
    serviceName: span.process.serviceName
  };
}
function getItems(trace) {
  return trace.spans.map(getItem);
}
var memoizedGetitems = memoizeOne(getItems);
var SpanGraph = /*#__PURE__*/function (_React$PureComponent) {
  function SpanGraph() {
    return _React$PureComponent.apply(this, arguments) || this;
  }
  _inheritsLoose(SpanGraph, _React$PureComponent);
  var _proto = SpanGraph.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      height = _this$props.height,
      trace = _this$props.trace,
      viewRange = _this$props.viewRange,
      updateNextViewRangeTime = _this$props.updateNextViewRangeTime,
      updateViewRangeTime = _this$props.updateViewRangeTime;
    if (!trace) {
      return /*#__PURE__*/_jsx("div", {});
    }
    var items = memoizedGetitems(trace);
    return /*#__PURE__*/_jsxs("div", {
      className: cx(ubPb2, ubPx2),
      children: [/*#__PURE__*/_jsx(TickLabels, {
        numTicks: TIMELINE_TICK_INTERVAL,
        duration: trace.duration
      }), /*#__PURE__*/_jsxs("div", {
        className: ubRelative,
        children: [/*#__PURE__*/_jsx(CanvasSpanGraph, {
          valueWidth: trace.duration,
          items: items
        }), /*#__PURE__*/_jsx(ViewingLayer, {
          viewRange: viewRange,
          numTicks: TIMELINE_TICK_INTERVAL,
          height: height || DEFAULT_HEIGHT,
          updateViewRangeTime: updateViewRangeTime,
          updateNextViewRangeTime: updateNextViewRangeTime
        })]
      })]
    });
  };
  return SpanGraph;
}(React.PureComponent);
SpanGraph.defaultProps = {
  height: DEFAULT_HEIGHT
};
export { SpanGraph as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjeCIsIm1lbW9pemVPbmUiLCJSZWFjdCIsInViUGIyIiwidWJQeDIiLCJ1YlJlbGF0aXZlIiwiQ2FudmFzU3BhbkdyYXBoIiwiVGlja0xhYmVscyIsIlZpZXdpbmdMYXllciIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJERUZBVUxUX0hFSUdIVCIsIlRJTUVMSU5FX1RJQ0tfSU5URVJWQUwiLCJnZXRJdGVtIiwic3BhbiIsInZhbHVlT2Zmc2V0IiwicmVsYXRpdmVTdGFydFRpbWUiLCJ2YWx1ZVdpZHRoIiwiZHVyYXRpb24iLCJzZXJ2aWNlTmFtZSIsInByb2Nlc3MiLCJnZXRJdGVtcyIsInRyYWNlIiwic3BhbnMiLCJtYXAiLCJtZW1vaXplZEdldGl0ZW1zIiwiU3BhbkdyYXBoIiwiX1JlYWN0JFB1cmVDb21wb25lbnQiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwicmVuZGVyIiwiX3RoaXMkcHJvcHMiLCJwcm9wcyIsImhlaWdodCIsInZpZXdSYW5nZSIsInVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lIiwidXBkYXRlVmlld1JhbmdlVGltZSIsIml0ZW1zIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJudW1UaWNrcyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1RyYWNlUGFnZUhlYWRlci9TcGFuR3JhcGgvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgbWVtb2l6ZU9uZSBmcm9tICdtZW1vaXplLW9uZSc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFRVcGRhdGVWaWV3UmFuZ2VUaW1lRnVuY3Rpb24sIFZpZXdSYW5nZSwgVmlld1JhbmdlVGltZVVwZGF0ZSB9IGZyb20gJy4uLy4uJztcbmltcG9ydCB7IFRyYWNlU3BhbiwgVHJhY2UgfSBmcm9tICcuLi8uLi90eXBlcy90cmFjZSc7XG5pbXBvcnQgeyB1YlBiMiwgdWJQeDIsIHViUmVsYXRpdmUgfSBmcm9tICcuLi8uLi91YmVyVXRpbGl0eVN0eWxlcyc7XG5cbmltcG9ydCBDYW52YXNTcGFuR3JhcGggZnJvbSAnLi9DYW52YXNTcGFuR3JhcGgnO1xuaW1wb3J0IFRpY2tMYWJlbHMgZnJvbSAnLi9UaWNrTGFiZWxzJztcbmltcG9ydCBWaWV3aW5nTGF5ZXIgZnJvbSAnLi9WaWV3aW5nTGF5ZXInO1xuXG5jb25zdCBERUZBVUxUX0hFSUdIVCA9IDYwO1xuZXhwb3J0IGNvbnN0IFRJTUVMSU5FX1RJQ0tfSU5URVJWQUwgPSA0O1xuXG5leHBvcnQgdHlwZSBTcGFuR3JhcGhQcm9wcyA9IHtcbiAgaGVpZ2h0PzogbnVtYmVyO1xuICB0cmFjZTogVHJhY2U7XG4gIHZpZXdSYW5nZTogVmlld1JhbmdlO1xuICB1cGRhdGVWaWV3UmFuZ2VUaW1lOiBUVXBkYXRlVmlld1JhbmdlVGltZUZ1bmN0aW9uO1xuICB1cGRhdGVOZXh0Vmlld1JhbmdlVGltZTogKG5leHRVcGRhdGU6IFZpZXdSYW5nZVRpbWVVcGRhdGUpID0+IHZvaWQ7XG59O1xuXG50eXBlIFNwYW5JdGVtID0ge1xuICB2YWx1ZU9mZnNldDogbnVtYmVyO1xuICB2YWx1ZVdpZHRoOiBudW1iZXI7XG4gIHNlcnZpY2VOYW1lOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiBnZXRJdGVtKHNwYW46IFRyYWNlU3Bhbik6IFNwYW5JdGVtIHtcbiAgcmV0dXJuIHtcbiAgICB2YWx1ZU9mZnNldDogc3Bhbi5yZWxhdGl2ZVN0YXJ0VGltZSxcbiAgICB2YWx1ZVdpZHRoOiBzcGFuLmR1cmF0aW9uLFxuICAgIHNlcnZpY2VOYW1lOiBzcGFuLnByb2Nlc3Muc2VydmljZU5hbWUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEl0ZW1zKHRyYWNlOiBUcmFjZSk6IFNwYW5JdGVtW10ge1xuICByZXR1cm4gdHJhY2Uuc3BhbnMubWFwKGdldEl0ZW0pO1xufVxuXG5jb25zdCBtZW1vaXplZEdldGl0ZW1zID0gbWVtb2l6ZU9uZShnZXRJdGVtcyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwYW5HcmFwaCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8U3BhbkdyYXBoUHJvcHM+IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBoZWlnaHQ6IERFRkFVTFRfSEVJR0hULFxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGhlaWdodCwgdHJhY2UsIHZpZXdSYW5nZSwgdXBkYXRlTmV4dFZpZXdSYW5nZVRpbWUsIHVwZGF0ZVZpZXdSYW5nZVRpbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0cmFjZSkge1xuICAgICAgcmV0dXJuIDxkaXYgLz47XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBtZW1vaXplZEdldGl0ZW1zKHRyYWNlKTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KHViUGIyLCB1YlB4Mil9PlxuICAgICAgICA8VGlja0xhYmVscyBudW1UaWNrcz17VElNRUxJTkVfVElDS19JTlRFUlZBTH0gZHVyYXRpb249e3RyYWNlLmR1cmF0aW9ufSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dWJSZWxhdGl2ZX0+XG4gICAgICAgICAgPENhbnZhc1NwYW5HcmFwaCB2YWx1ZVdpZHRoPXt0cmFjZS5kdXJhdGlvbn0gaXRlbXM9e2l0ZW1zfSAvPlxuICAgICAgICAgIDxWaWV3aW5nTGF5ZXJcbiAgICAgICAgICAgIHZpZXdSYW5nZT17dmlld1JhbmdlfVxuICAgICAgICAgICAgbnVtVGlja3M9e1RJTUVMSU5FX1RJQ0tfSU5URVJWQUx9XG4gICAgICAgICAgICBoZWlnaHQ9e2hlaWdodCB8fCBERUZBVUxUX0hFSUdIVH1cbiAgICAgICAgICAgIHVwZGF0ZVZpZXdSYW5nZVRpbWU9e3VwZGF0ZVZpZXdSYW5nZVRpbWV9XG4gICAgICAgICAgICB1cGRhdGVOZXh0Vmlld1JhbmdlVGltZT17dXBkYXRlTmV4dFZpZXdSYW5nZVRpbWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxFQUFFLE1BQU0sWUFBWTtBQUMzQixPQUFPQyxVQUFVLE1BQU0sYUFBYTtBQUNwQyxPQUFPLEtBQUtDLEtBQUssTUFBTSxPQUFPO0FBSTlC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