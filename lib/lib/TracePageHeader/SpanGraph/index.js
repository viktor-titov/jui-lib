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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjeCIsIm1lbW9pemVPbmUiLCJSZWFjdCIsInViUGIyIiwidWJQeDIiLCJ1YlJlbGF0aXZlIiwiQ2FudmFzU3BhbkdyYXBoIiwiVGlja0xhYmVscyIsIlZpZXdpbmdMYXllciIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJERUZBVUxUX0hFSUdIVCIsIlRJTUVMSU5FX1RJQ0tfSU5URVJWQUwiLCJnZXRJdGVtIiwic3BhbiIsInZhbHVlT2Zmc2V0IiwicmVsYXRpdmVTdGFydFRpbWUiLCJ2YWx1ZVdpZHRoIiwiZHVyYXRpb24iLCJzZXJ2aWNlTmFtZSIsInByb2Nlc3MiLCJnZXRJdGVtcyIsInRyYWNlIiwic3BhbnMiLCJtYXAiLCJtZW1vaXplZEdldGl0ZW1zIiwiU3BhbkdyYXBoIiwiX1JlYWN0JFB1cmVDb21wb25lbnQiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwicmVuZGVyIiwiX3RoaXMkcHJvcHMiLCJwcm9wcyIsImhlaWdodCIsInZpZXdSYW5nZSIsInVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lIiwidXBkYXRlVmlld1JhbmdlVGltZSIsIml0ZW1zIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJudW1UaWNrcyIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVBhZ2VIZWFkZXIvU3BhbkdyYXBoL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG1lbW9pemVPbmUgZnJvbSAnbWVtb2l6ZS1vbmUnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBUVXBkYXRlVmlld1JhbmdlVGltZUZ1bmN0aW9uLCBWaWV3UmFuZ2UsIFZpZXdSYW5nZVRpbWVVcGRhdGUgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBUcmFjZVNwYW4sIFRyYWNlIH0gZnJvbSAnLi4vLi4vdHlwZXMvdHJhY2UnO1xuaW1wb3J0IHsgdWJQYjIsIHViUHgyLCB1YlJlbGF0aXZlIH0gZnJvbSAnLi4vLi4vdWJlclV0aWxpdHlTdHlsZXMnO1xuXG5pbXBvcnQgQ2FudmFzU3BhbkdyYXBoIGZyb20gJy4vQ2FudmFzU3BhbkdyYXBoJztcbmltcG9ydCBUaWNrTGFiZWxzIGZyb20gJy4vVGlja0xhYmVscyc7XG5pbXBvcnQgVmlld2luZ0xheWVyIGZyb20gJy4vVmlld2luZ0xheWVyJztcblxuY29uc3QgREVGQVVMVF9IRUlHSFQgPSA2MDtcbmV4cG9ydCBjb25zdCBUSU1FTElORV9USUNLX0lOVEVSVkFMID0gNDtcblxuZXhwb3J0IHR5cGUgU3BhbkdyYXBoUHJvcHMgPSB7XG4gIGhlaWdodD86IG51bWJlcjtcbiAgdHJhY2U6IFRyYWNlO1xuICB2aWV3UmFuZ2U6IFZpZXdSYW5nZTtcbiAgdXBkYXRlVmlld1JhbmdlVGltZTogVFVwZGF0ZVZpZXdSYW5nZVRpbWVGdW5jdGlvbjtcbiAgdXBkYXRlTmV4dFZpZXdSYW5nZVRpbWU6IChuZXh0VXBkYXRlOiBWaWV3UmFuZ2VUaW1lVXBkYXRlKSA9PiB2b2lkO1xufTtcblxudHlwZSBTcGFuSXRlbSA9IHtcbiAgdmFsdWVPZmZzZXQ6IG51bWJlcjtcbiAgdmFsdWVXaWR0aDogbnVtYmVyO1xuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gZ2V0SXRlbShzcGFuOiBUcmFjZVNwYW4pOiBTcGFuSXRlbSB7XG4gIHJldHVybiB7XG4gICAgdmFsdWVPZmZzZXQ6IHNwYW4ucmVsYXRpdmVTdGFydFRpbWUsXG4gICAgdmFsdWVXaWR0aDogc3Bhbi5kdXJhdGlvbixcbiAgICBzZXJ2aWNlTmFtZTogc3Bhbi5wcm9jZXNzLnNlcnZpY2VOYW1lLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRJdGVtcyh0cmFjZTogVHJhY2UpOiBTcGFuSXRlbVtdIHtcbiAgcmV0dXJuIHRyYWNlLnNwYW5zLm1hcChnZXRJdGVtKTtcbn1cblxuY29uc3QgbWVtb2l6ZWRHZXRpdGVtcyA9IG1lbW9pemVPbmUoZ2V0SXRlbXMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFuR3JhcGggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFNwYW5HcmFwaFByb3BzPiB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaGVpZ2h0OiBERUZBVUxUX0hFSUdIVCxcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoZWlnaHQsIHRyYWNlLCB2aWV3UmFuZ2UsIHVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lLCB1cGRhdGVWaWV3UmFuZ2VUaW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdHJhY2UpIHtcbiAgICAgIHJldHVybiA8ZGl2IC8+O1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gbWVtb2l6ZWRHZXRpdGVtcyh0cmFjZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCh1YlBiMiwgdWJQeDIpfT5cbiAgICAgICAgPFRpY2tMYWJlbHMgbnVtVGlja3M9e1RJTUVMSU5FX1RJQ0tfSU5URVJWQUx9IGR1cmF0aW9uPXt0cmFjZS5kdXJhdGlvbn0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3ViUmVsYXRpdmV9PlxuICAgICAgICAgIDxDYW52YXNTcGFuR3JhcGggdmFsdWVXaWR0aD17dHJhY2UuZHVyYXRpb259IGl0ZW1zPXtpdGVtc30gLz5cbiAgICAgICAgICA8Vmlld2luZ0xheWVyXG4gICAgICAgICAgICB2aWV3UmFuZ2U9e3ZpZXdSYW5nZX1cbiAgICAgICAgICAgIG51bVRpY2tzPXtUSU1FTElORV9USUNLX0lOVEVSVkFMfVxuICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHQgfHwgREVGQVVMVF9IRUlHSFR9XG4gICAgICAgICAgICB1cGRhdGVWaWV3UmFuZ2VUaW1lPXt1cGRhdGVWaWV3UmFuZ2VUaW1lfVxuICAgICAgICAgICAgdXBkYXRlTmV4dFZpZXdSYW5nZVRpbWU9e3VwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsRUFBRSxNQUFNLFlBQVk7QUFDM0IsT0FBT0MsVUFBVSxNQUFNLGFBQWE7QUFDcEMsT0FBTyxLQUFLQyxLQUFLLE1BQU0sT0FB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