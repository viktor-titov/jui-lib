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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImdyb3VwQnkiLCJfZ3JvdXBCeSIsIlJlYWN0IiwidXNlU3RhdGUiLCJzZWxlY3RvcnMiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiUG9wb3ZlciIsIkFjY29yZGlhbkxvZ3MiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJ3cmFwcGVyIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiYmFyIiwiX3RlbXBsYXRlT2JqZWN0MiIsInJwYyIsIl90ZW1wbGF0ZU9iamVjdDMiLCJsYWJlbCIsIl90ZW1wbGF0ZU9iamVjdDQiLCJsb2dNYXJrZXIiLCJfdGVtcGxhdGVPYmplY3Q1IiwidG9QZXJjZW50IiwidmFsdWUiLCJ0b0ZpeGVkIiwiU3BhbkJhciIsIl9yZWYiLCJ2aWV3RW5kIiwidmlld1N0YXJ0IiwiZ2V0Vmlld2VkQm91bmRzIiwiY29sb3IiLCJzaG9ydExhYmVsIiwibG9uZ0xhYmVsIiwib25DbGljayIsInRyYWNlU3RhcnRUaW1lIiwic3BhbiIsImNsYXNzTmFtZSIsImxhYmVsQ2xhc3NOYW1lIiwiX3VzZVN0YXRlIiwic2V0TGFiZWwiLCJzZXRTaG9ydExhYmVsIiwic2V0TG9uZ0xhYmVsIiwibG9nR3JvdXBzIiwibG9ncyIsImxvZyIsInBvc1BlcmNlbnQiLCJ0aW1lc3RhbXAiLCJzdGFydCIsIk1hdGgiLCJyb3VuZCIsInN0eWxlcyIsIm9uQmx1ciIsIm9uRm9jdXMiLCJvbk1vdXNlT3V0Iiwib25Nb3VzZU92ZXIiLCJjb21wb25lbnRzIiwiVHJhY2VWaWV3ZXIiLCJzcGFuQmFyIiwiY2hpbGRyZW4iLCJzdHlsZSIsImJhY2tncm91bmQiLCJsZWZ0Iiwid2lkdGgiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwicG9zaXRpb25LZXkiLCJjb250ZW50IiwiaW50ZXJhY3RpdmUiLCJpc09wZW4iLCJtZW1vIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5CYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZ3JvdXBCeSBhcyBfZ3JvdXBCeSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEdyYWZhbmFUaGVtZTIgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IHNlbGVjdG9ycyB9IGZyb20gJ0BncmFmYW5hL2UyZS1zZWxlY3RvcnMnO1xuaW1wb3J0IHsgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgYXV0b0NvbG9yIH0gZnJvbSAnLi4vVGhlbWUnO1xuaW1wb3J0IHsgUG9wb3ZlciB9IGZyb20gJy4uL2NvbW1vbi9Qb3BvdmVyJztcbmltcG9ydCB7IFROaWwgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFjZVNwYW4gfSBmcm9tICcuLi90eXBlcy90cmFjZSc7XG5cbmltcG9ydCBBY2NvcmRpYW5Mb2dzIGZyb20gJy4vU3BhbkRldGFpbC9BY2NvcmRpYW5Mb2dzJztcbmltcG9ydCB7IFZpZXdlZEJvdW5kc0Z1bmN0aW9uVHlwZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBnZXRTdHlsZXMgPSAodGhlbWU6IEdyYWZhbmFUaGVtZTIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB3cmFwcGVyOiBjc3NgXG4gICAgICBsYWJlbDogd3JhcHBlcjtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICByaWdodDogMDtcbiAgICAgIHRvcDogMDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB6LWluZGV4OiAwO1xuICAgIGAsXG4gICAgYmFyOiBjc3NgXG4gICAgICBsYWJlbDogYmFyO1xuICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgbWluLXdpZHRoOiAycHg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBoZWlnaHQ6IDM2JTtcbiAgICAgIHRvcDogMzIlO1xuICAgIGAsXG4gICAgcnBjOiBjc3NgXG4gICAgICBsYWJlbDogcnBjO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAzNSU7XG4gICAgICBib3R0b206IDM1JTtcbiAgICAgIHotaW5kZXg6IDE7XG4gICAgYCxcbiAgICBsYWJlbDogY3NzYFxuICAgICAgbGFiZWw6IGxhYmVsO1xuICAgICAgY29sb3I6ICNhYWE7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgcGFkZGluZzogMCAwLjVlbTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBgLFxuICAgIGxvZ01hcmtlcjogY3NzYFxuICAgICAgbGFiZWw6IGxvZ01hcmtlcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnIzJjMzIzNScpfTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGhlaWdodDogNjAlO1xuICAgICAgbWluLXdpZHRoOiAxcHg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDIwJTtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyM0NjRjNTQnKX07XG4gICAgICB9XG4gICAgICAmOjpiZWZvcmUsXG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICB9XG4gICAgYCxcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBjb2xvcjogc3RyaW5nO1xuICBvbkNsaWNrPzogKGV2dDogUmVhY3QuTW91c2VFdmVudDxhbnk+KSA9PiB2b2lkO1xuICB2aWV3RW5kOiBudW1iZXI7XG4gIHZpZXdTdGFydDogbnVtYmVyO1xuICBnZXRWaWV3ZWRCb3VuZHM6IFZpZXdlZEJvdW5kc0Z1bmN0aW9uVHlwZTtcbiAgcnBjOlxuICAgIHwge1xuICAgICAgICB2aWV3U3RhcnQ6IG51bWJlcjtcbiAgICAgICAgdmlld0VuZDogbnVtYmVyO1xuICAgICAgICBjb2xvcjogc3RyaW5nO1xuICAgICAgfVxuICAgIHwgVE5pbDtcbiAgdHJhY2VTdGFydFRpbWU6IG51bWJlcjtcbiAgc3BhbjogVHJhY2VTcGFuO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxhYmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBsb25nTGFiZWw6IHN0cmluZztcbiAgc2hvcnRMYWJlbDogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gdG9QZXJjZW50KHZhbHVlOiBudW1iZXIpIHtcbiAgcmV0dXJuIGAkeyh2YWx1ZSAqIDEwMCkudG9GaXhlZCgxKX0lYDtcbn1cblxuZnVuY3Rpb24gU3BhbkJhcih7XG4gIHZpZXdFbmQsXG4gIHZpZXdTdGFydCxcbiAgZ2V0Vmlld2VkQm91bmRzLFxuICBjb2xvcixcbiAgc2hvcnRMYWJlbCxcbiAgbG9uZ0xhYmVsLFxuICBvbkNsaWNrLFxuICBycGMsXG4gIHRyYWNlU3RhcnRUaW1lLFxuICBzcGFuLFxuICBjbGFzc05hbWUsXG4gIGxhYmVsQ2xhc3NOYW1lLFxufTogUHJvcHMpIHtcbiAgY29uc3QgW2xhYmVsLCBzZXRMYWJlbF0gPSB1c2VTdGF0ZShzaG9ydExhYmVsKTtcbiAgY29uc3Qgc2V0U2hvcnRMYWJlbCA9ICgpID0+IHNldExhYmVsKHNob3J0TGFiZWwpO1xuICBjb25zdCBzZXRMb25nTGFiZWwgPSAoKSA9PiBzZXRMYWJlbChsb25nTGFiZWwpO1xuXG4gIC8vIGdyb3VwIGxvZ3MgYmFzZWQgb24gdGltZXN0YW1wc1xuICBjb25zdCBsb2dHcm91cHMgPSBfZ3JvdXBCeShzcGFuLmxvZ3MsIChsb2cpID0+IHtcbiAgICBjb25zdCBwb3NQZXJjZW50ID0gZ2V0Vmlld2VkQm91bmRzKGxvZy50aW1lc3RhbXAsIGxvZy50aW1lc3RhbXApLnN0YXJ0O1xuICAgIC8vIHJvdW5kIHRvIHRoZSBuZWFyZXN0IDAuMiVcbiAgICByZXR1cm4gdG9QZXJjZW50KE1hdGgucm91bmQocG9zUGVyY2VudCAqIDUwMCkgLyA1MDApO1xuICB9KTtcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjeChzdHlsZXMud3JhcHBlciwgY2xhc3NOYW1lKX1cbiAgICAgIG9uQmx1cj17c2V0U2hvcnRMYWJlbH1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBvbkZvY3VzPXtzZXRMb25nTGFiZWx9XG4gICAgICBvbk1vdXNlT3V0PXtzZXRTaG9ydExhYmVsfVxuICAgICAgb25Nb3VzZU92ZXI9e3NldExvbmdMYWJlbH1cbiAgICAgIGFyaWEtaGlkZGVuXG4gICAgICBkYXRhLXRlc3RpZD17c2VsZWN0b3JzLmNvbXBvbmVudHMuVHJhY2VWaWV3ZXIuc3BhbkJhcn1cbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5iYXJ9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogY29sb3IsXG4gICAgICAgICAgbGVmdDogdG9QZXJjZW50KHZpZXdTdGFydCksXG4gICAgICAgICAgd2lkdGg6IHRvUGVyY2VudCh2aWV3RW5kIC0gdmlld1N0YXJ0KSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KHN0eWxlcy5sYWJlbCwgbGFiZWxDbGFzc05hbWUpfSBkYXRhLXRlc3RpZD1cIlNwYW5CYXItLWxhYmVsXCI+XG4gICAgICAgICAge2xhYmVsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAge09iamVjdC5rZXlzKGxvZ0dyb3VwcykubWFwKChwb3NpdGlvbktleSkgPT4gKFxuICAgICAgICAgIDxQb3BvdmVyXG4gICAgICAgICAgICBrZXk9e3Bvc2l0aW9uS2V5fVxuICAgICAgICAgICAgY29udGVudD17XG4gICAgICAgICAgICAgIDxBY2NvcmRpYW5Mb2dzIGludGVyYWN0aXZlPXtmYWxzZX0gaXNPcGVuIGxvZ3M9e2xvZ0dyb3Vwc1twb3NpdGlvbktleV19IHRpbWVzdGFtcD17dHJhY2VTdGFydFRpbWV9IC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXRlc3RpZD1cIlNwYW5CYXItLWxvZ01hcmtlclwiIGNsYXNzTmFtZT17c3R5bGVzLmxvZ01hcmtlcn0gc3R5bGU9e3sgbGVmdDogcG9zaXRpb25LZXkgfX0gLz5cbiAgICAgICAgICA8L1BvcG92ZXI+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICB7cnBjICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnJwY31cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcnBjLmNvbG9yLFxuICAgICAgICAgICAgbGVmdDogdG9QZXJjZW50KHJwYy52aWV3U3RhcnQpLFxuICAgICAgICAgICAgd2lkdGg6IHRvUGVyY2VudChycGMudmlld0VuZCAtIHJwYy52aWV3U3RhcnQpLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5tZW1vKFNwYW5CYXIpO1xuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEVBQUUsTUFBTSxZQUFZO0FBQzNCLFNB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