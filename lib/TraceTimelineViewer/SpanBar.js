import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
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

import { css } from '@emotion/css';
import cx from 'classnames';
import { groupBy as _groupBy } from 'lodash';
import React, { useState } from 'react';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2 } from '@grafana/ui';
import { autoColor } from '../Theme';
import { Popover } from '../common/Popover';
import AccordianLogs from './SpanDetail/AccordianLogs';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = function getStyles(theme) {
  return {
    wrapper: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: wrapper;\n      bottom: 0;\n      left: 0;\n      position: absolute;\n      right: 0;\n      top: 0;\n      overflow: hidden;\n      z-index: 0;\n    "]))),
    bar: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: bar;\n      border-radius: 3px;\n      min-width: 2px;\n      position: absolute;\n      height: 36%;\n      top: 32%;\n    "]))),
    rpc: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: rpc;\n      position: absolute;\n      top: 35%;\n      bottom: 35%;\n      z-index: 1;\n    "]))),
    label: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: label;\n      color: #aaa;\n      font-size: 12px;\n      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n      line-height: 1em;\n      white-space: nowrap;\n      padding: 0 0.5em;\n      position: absolute;\n    "]))),
    logMarker: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: logMarker;\n      background-color: ", ";\n      cursor: pointer;\n      height: 60%;\n      min-width: 1px;\n      position: absolute;\n      top: 20%;\n      &:hover {\n        background-color: ", ";\n      }\n      &::before,\n      &::after {\n        content: '';\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        right: 0;\n        border: 1px solid transparent;\n      }\n      &::after {\n        left: 0;\n      }\n    "])), autoColor(theme, '#2c3235'), autoColor(theme, '#464c54'))
  };
};
function toPercent(value) {
  return (value * 100).toFixed(1) + "%";
}
function SpanBar(_ref) {
  var viewEnd = _ref.viewEnd,
    viewStart = _ref.viewStart,
    getViewedBounds = _ref.getViewedBounds,
    color = _ref.color,
    shortLabel = _ref.shortLabel,
    longLabel = _ref.longLabel,
    onClick = _ref.onClick,
    rpc = _ref.rpc,
    traceStartTime = _ref.traceStartTime,
    span = _ref.span,
    className = _ref.className,
    labelClassName = _ref.labelClassName;
  var _useState = useState(shortLabel),
    label = _useState[0],
    setLabel = _useState[1];
  var setShortLabel = function setShortLabel() {
    return setLabel(shortLabel);
  };
  var setLongLabel = function setLongLabel() {
    return setLabel(longLabel);
  };

  // group logs based on timestamps
  var logGroups = _groupBy(span.logs, function (log) {
    var posPercent = getViewedBounds(log.timestamp, log.timestamp).start;
    // round to the nearest 0.2%
    return toPercent(Math.round(posPercent * 500) / 500);
  });
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsxs("div", {
    className: cx(styles.wrapper, className),
    onBlur: setShortLabel,
    onClick: onClick,
    onFocus: setLongLabel,
    onMouseOut: setShortLabel,
    onMouseOver: setLongLabel,
    "aria-hidden": true,
    "data-testid": selectors.components.TraceViewer.spanBar,
    children: [/*#__PURE__*/_jsx("div", {
      "aria-label": label,
      className: styles.bar,
      style: {
        background: color,
        left: toPercent(viewStart),
        width: toPercent(viewEnd - viewStart)
      },
      children: /*#__PURE__*/_jsx("div", {
        className: cx(styles.label, labelClassName),
        "data-testid": "SpanBar--label",
        children: label
      })
    }), /*#__PURE__*/_jsx("div", {
      children: Object.keys(logGroups).map(function (positionKey) {
        return /*#__PURE__*/_jsx(Popover, {
          content: /*#__PURE__*/_jsx(AccordianLogs, {
            interactive: false,
            isOpen: true,
            logs: logGroups[positionKey],
            timestamp: traceStartTime
          }),
          children: /*#__PURE__*/_jsx("div", {
            "data-testid": "SpanBar--logMarker",
            className: styles.logMarker,
            style: {
              left: positionKey
            }
          })
        }, positionKey);
      })
    }), rpc && /*#__PURE__*/_jsx("div", {
      className: styles.rpc,
      style: {
        background: rpc.color,
        left: toPercent(rpc.viewStart),
        width: toPercent(rpc.viewEnd - rpc.viewStart)
      }
    })]
  });
}
export default /*#__PURE__*/React.memo(SpanBar);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImdyb3VwQnkiLCJfZ3JvdXBCeSIsIlJlYWN0IiwidXNlU3RhdGUiLCJzZWxlY3RvcnMiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiUG9wb3ZlciIsIkFjY29yZGlhbkxvZ3MiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJ3cmFwcGVyIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiYmFyIiwiX3RlbXBsYXRlT2JqZWN0MiIsInJwYyIsIl90ZW1wbGF0ZU9iamVjdDMiLCJsYWJlbCIsIl90ZW1wbGF0ZU9iamVjdDQiLCJsb2dNYXJrZXIiLCJfdGVtcGxhdGVPYmplY3Q1IiwidG9QZXJjZW50IiwidmFsdWUiLCJ0b0ZpeGVkIiwiU3BhbkJhciIsIl9yZWYiLCJ2aWV3RW5kIiwidmlld1N0YXJ0IiwiZ2V0Vmlld2VkQm91bmRzIiwiY29sb3IiLCJzaG9ydExhYmVsIiwibG9uZ0xhYmVsIiwib25DbGljayIsInRyYWNlU3RhcnRUaW1lIiwic3BhbiIsImNsYXNzTmFtZSIsImxhYmVsQ2xhc3NOYW1lIiwiX3VzZVN0YXRlIiwic2V0TGFiZWwiLCJzZXRTaG9ydExhYmVsIiwic2V0TG9uZ0xhYmVsIiwibG9nR3JvdXBzIiwibG9ncyIsImxvZyIsInBvc1BlcmNlbnQiLCJ0aW1lc3RhbXAiLCJzdGFydCIsIk1hdGgiLCJyb3VuZCIsInN0eWxlcyIsIm9uQmx1ciIsIm9uRm9jdXMiLCJvbk1vdXNlT3V0Iiwib25Nb3VzZU92ZXIiLCJjb21wb25lbnRzIiwiVHJhY2VWaWV3ZXIiLCJzcGFuQmFyIiwiY2hpbGRyZW4iLCJzdHlsZSIsImJhY2tncm91bmQiLCJsZWZ0Iiwid2lkdGgiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwicG9zaXRpb25LZXkiLCJjb250ZW50IiwiaW50ZXJhY3RpdmUiLCJpc09wZW4iLCJtZW1vIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL1RyYWNlVGltZWxpbmVWaWV3ZXIvU3BhbkJhci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBncm91cEJ5IGFzIF9ncm91cEJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR3JhZmFuYVRoZW1lMiB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgc2VsZWN0b3JzIH0gZnJvbSAnQGdyYWZhbmEvZTJlLXNlbGVjdG9ycyc7XG5pbXBvcnQgeyB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi9UaGVtZSc7XG5pbXBvcnQgeyBQb3BvdmVyIH0gZnJvbSAnLi4vY29tbW9uL1BvcG92ZXInO1xuaW1wb3J0IHsgVE5pbCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFRyYWNlU3BhbiB9IGZyb20gJy4uL3R5cGVzL3RyYWNlJztcblxuaW1wb3J0IEFjY29yZGlhbkxvZ3MgZnJvbSAnLi9TcGFuRGV0YWlsL0FjY29yZGlhbkxvZ3MnO1xuaW1wb3J0IHsgVmlld2VkQm91bmRzRnVuY3Rpb25UeXBlIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIHdyYXBwZXI6IGNzc2BcbiAgICAgIGxhYmVsOiB3cmFwcGVyO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgdG9wOiAwO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHotaW5kZXg6IDA7XG4gICAgYCxcbiAgICBiYXI6IGNzc2BcbiAgICAgIGxhYmVsOiBiYXI7XG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICBtaW4td2lkdGg6IDJweDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGhlaWdodDogMzYlO1xuICAgICAgdG9wOiAzMiU7XG4gICAgYCxcbiAgICBycGM6IGNzc2BcbiAgICAgIGxhYmVsOiBycGM7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDM1JTtcbiAgICAgIGJvdHRvbTogMzUlO1xuICAgICAgei1pbmRleDogMTtcbiAgICBgLFxuICAgIGxhYmVsOiBjc3NgXG4gICAgICBsYWJlbDogbGFiZWw7XG4gICAgICBjb2xvcjogI2FhYTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICAgICAgbGluZS1oZWlnaHQ6IDFlbTtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICBwYWRkaW5nOiAwIDAuNWVtO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGAsXG4gICAgbG9nTWFya2VyOiBjc3NgXG4gICAgICBsYWJlbDogbG9nTWFya2VyO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICcjMmMzMjM1Jyl9O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgaGVpZ2h0OiA2MCU7XG4gICAgICBtaW4td2lkdGg6IDFweDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMjAlO1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnIzQ2NGM1NCcpfTtcbiAgICAgIH1cbiAgICAgICY6OmJlZm9yZSxcbiAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIH1cbiAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgIH1cbiAgICBgLFxuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIG9uQ2xpY2s/OiAoZXZ0OiBSZWFjdC5Nb3VzZUV2ZW50PGFueT4pID0+IHZvaWQ7XG4gIHZpZXdFbmQ6IG51bWJlcjtcbiAgdmlld1N0YXJ0OiBudW1iZXI7XG4gIGdldFZpZXdlZEJvdW5kczogVmlld2VkQm91bmRzRnVuY3Rpb25UeXBlO1xuICBycGM6XG4gICAgfCB7XG4gICAgICAgIHZpZXdTdGFydDogbnVtYmVyO1xuICAgICAgICB2aWV3RW5kOiBudW1iZXI7XG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgICB9XG4gICAgfCBUTmlsO1xuICB0cmFjZVN0YXJ0VGltZTogbnVtYmVyO1xuICBzcGFuOiBUcmFjZVNwYW47XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgbGFiZWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxvbmdMYWJlbDogc3RyaW5nO1xuICBzaG9ydExhYmVsOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiB0b1BlcmNlbnQodmFsdWU6IG51bWJlcikge1xuICByZXR1cm4gYCR7KHZhbHVlICogMTAwKS50b0ZpeGVkKDEpfSVgO1xufVxuXG5mdW5jdGlvbiBTcGFuQmFyKHtcbiAgdmlld0VuZCxcbiAgdmlld1N0YXJ0LFxuICBnZXRWaWV3ZWRCb3VuZHMsXG4gIGNvbG9yLFxuICBzaG9ydExhYmVsLFxuICBsb25nTGFiZWwsXG4gIG9uQ2xpY2ssXG4gIHJwYyxcbiAgdHJhY2VTdGFydFRpbWUsXG4gIHNwYW4sXG4gIGNsYXNzTmFtZSxcbiAgbGFiZWxDbGFzc05hbWUsXG59OiBQcm9wcykge1xuICBjb25zdCBbbGFiZWwsIHNldExhYmVsXSA9IHVzZVN0YXRlKHNob3J0TGFiZWwpO1xuICBjb25zdCBzZXRTaG9ydExhYmVsID0gKCkgPT4gc2V0TGFiZWwoc2hvcnRMYWJlbCk7XG4gIGNvbnN0IHNldExvbmdMYWJlbCA9ICgpID0+IHNldExhYmVsKGxvbmdMYWJlbCk7XG5cbiAgLy8gZ3JvdXAgbG9ncyBiYXNlZCBvbiB0aW1lc3RhbXBzXG4gIGNvbnN0IGxvZ0dyb3VwcyA9IF9ncm91cEJ5KHNwYW4ubG9ncywgKGxvZykgPT4ge1xuICAgIGNvbnN0IHBvc1BlcmNlbnQgPSBnZXRWaWV3ZWRCb3VuZHMobG9nLnRpbWVzdGFtcCwgbG9nLnRpbWVzdGFtcCkuc3RhcnQ7XG4gICAgLy8gcm91bmQgdG8gdGhlIG5lYXJlc3QgMC4yJVxuICAgIHJldHVybiB0b1BlcmNlbnQoTWF0aC5yb3VuZChwb3NQZXJjZW50ICogNTAwKSAvIDUwMCk7XG4gIH0pO1xuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2N4KHN0eWxlcy53cmFwcGVyLCBjbGFzc05hbWUpfVxuICAgICAgb25CbHVyPXtzZXRTaG9ydExhYmVsfVxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIG9uRm9jdXM9e3NldExvbmdMYWJlbH1cbiAgICAgIG9uTW91c2VPdXQ9e3NldFNob3J0TGFiZWx9XG4gICAgICBvbk1vdXNlT3Zlcj17c2V0TG9uZ0xhYmVsfVxuICAgICAgYXJpYS1oaWRkZW5cbiAgICAgIGRhdGEtdGVzdGlkPXtzZWxlY3RvcnMuY29tcG9uZW50cy5UcmFjZVZpZXdlci5zcGFuQmFyfVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLmJhcn1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvcixcbiAgICAgICAgICBsZWZ0OiB0b1BlcmNlbnQodmlld1N0YXJ0KSxcbiAgICAgICAgICB3aWR0aDogdG9QZXJjZW50KHZpZXdFbmQgLSB2aWV3U3RhcnQpLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goc3R5bGVzLmxhYmVsLCBsYWJlbENsYXNzTmFtZSl9IGRhdGEtdGVzdGlkPVwiU3BhbkJhci0tbGFiZWxcIj5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICB7T2JqZWN0LmtleXMobG9nR3JvdXBzKS5tYXAoKHBvc2l0aW9uS2V5KSA9PiAoXG4gICAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICAgIGtleT17cG9zaXRpb25LZXl9XG4gICAgICAgICAgICBjb250ZW50PXtcbiAgICAgICAgICAgICAgPEFjY29yZGlhbkxvZ3MgaW50ZXJhY3RpdmU9e2ZhbHNlfSBpc09wZW4gbG9ncz17bG9nR3JvdXBzW3Bvc2l0aW9uS2V5XX0gdGltZXN0YW1wPXt0cmFjZVN0YXJ0VGltZX0gLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtdGVzdGlkPVwiU3BhbkJhci0tbG9nTWFya2VyXCIgY2xhc3NOYW1lPXtzdHlsZXMubG9nTWFya2VyfSBzdHlsZT17eyBsZWZ0OiBwb3NpdGlvbktleSB9fSAvPlxuICAgICAgICAgIDwvUG9wb3Zlcj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICAgIHtycGMgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMucnBjfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBycGMuY29sb3IsXG4gICAgICAgICAgICBsZWZ0OiB0b1BlcmNlbnQocnBjLnZpZXdTdGFydCksXG4gICAgICAgICAgICB3aWR0aDogdG9QZXJjZW50KHJwYy52aWV3RW5kIC0gcnBjLnZpZXdTdGFydCksXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0Lm1lbW8oU3BhbkJhcik7XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsRUFBRSxNQUFNLFlBQVk7QUFDM0IsU0FBU0MsT0FB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