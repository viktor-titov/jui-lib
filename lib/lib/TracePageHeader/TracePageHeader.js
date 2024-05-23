import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _excluded = ["renderer"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13;
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
import { get as _get, maxBy as _maxBy, values as _values } from 'lodash';
import * as React from 'react';
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import { dateTimeFormat } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { autoColor } from '..';
import ExternalLinks from '../common/ExternalLinks';
import LabeledList from '../common/LabeledList';
import TraceName from '../common/TraceName';
import { getTraceLinks } from '../model/link-patterns';
import { getTraceName } from '../model/trace-viewer';
import { uTxMuted } from '../uberUtilityStyles';
import { formatDuration } from '../utils/date';
import SpanGraph from './SpanGraph';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = function getStyles(theme) {
  return {
    TracePageHeader: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: TracePageHeader;\n      & > :first-child {\n        border-bottom: 1px solid ", ";\n      }\n      & > :nth-child(2) {\n        background-color: ", ";\n        border-bottom: 1px solid ", ";\n      }\n      & > :last-child {\n        border-bottom: 1px solid ", ";\n      }\n    "])), autoColor(theme, '#e8e8e8'), autoColor(theme, '#eee'), autoColor(theme, '#e4e4e4'), autoColor(theme, '#ccc')),
    TracePageHeaderTitleRow: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderTitleRow;\n      align-items: center;\n      display: flex;\n    "]))),
    TracePageHeaderBack: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderBack;\n      align-items: center;\n      align-self: stretch;\n      background-color: #fafafa;\n      border-bottom: 1px solid #ddd;\n      border-right: 1px solid #ddd;\n      color: inherit;\n      display: flex;\n      font-size: 1.4rem;\n      padding: 0 1rem;\n      margin-bottom: -1px;\n      &:hover {\n        background-color: #f0f0f0;\n        border-color: #ccc;\n      }\n    "]))),
    TracePageHeaderTitleLink: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderTitleLink;\n      align-items: center;\n      display: flex;\n      flex: 1;\n\n      &:hover * {\n        text-decoration: underline;\n      }\n      &:hover > *,\n      &:hover small {\n        text-decoration: none;\n      }\n      /* Adapt styles when changing from a element into button */\n      background: transparent;\n      text-align: left;\n      border: none;\n    "]))),
    TracePageHeaderDetailToggle: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderDetailToggle;\n      font-size: 2.5rem;\n      transition: transform 0.07s ease-out;\n    "]))),
    TracePageHeaderDetailToggleExpanded: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderDetailToggleExpanded;\n      transform: rotate(90deg);\n    "]))),
    TracePageHeaderTitle: css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderTitle;\n      color: inherit;\n      flex: 1;\n      font-size: 1.7em;\n      line-height: 1em;\n      margin: 0 0 0 0.5em;\n      padding-bottom: 0.5em;\n    "]))),
    TracePageHeaderTitleCollapsible: css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderTitleCollapsible;\n      margin-left: 0;\n    "]))),
    TracePageHeaderOverviewItems: css(_templateObject9 || (_templateObject9 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderOverviewItems;\n      border-bottom: 1px solid #e4e4e4;\n      padding: 0.25rem 0.5rem !important;\n    "]))),
    TracePageHeaderOverviewItemValueDetail: cx(css(_templateObject10 || (_templateObject10 = _taggedTemplateLiteralLoose(["\n        label: TracePageHeaderOverviewItemValueDetail;\n        color: #aaa;\n      "]))), 'trace-item-value-detail'),
    TracePageHeaderOverviewItemValue: css(_templateObject11 || (_templateObject11 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderOverviewItemValue;\n      &:hover > .trace-item-value-detail {\n        color: unset;\n      }\n    "]))),
    TracePageHeaderArchiveIcon: css(_templateObject12 || (_templateObject12 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderArchiveIcon;\n      font-size: 1.78em;\n      margin-right: 0.15em;\n    "]))),
    TracePageHeaderTraceId: css(_templateObject13 || (_templateObject13 = _taggedTemplateLiteralLoose(["\n      label: TracePageHeaderTraceId;\n      white-space: nowrap;\n    "])))
  };
};
export var HEADER_ITEMS = [{
  key: 'timestamp',
  label: 'Trace Start:',
  renderer: function renderer(trace, timeZone, styles) {
    // Convert date from micro to milli seconds
    var dateStr = dateTimeFormat(trace.startTime / 1000, {
      timeZone: timeZone,
      defaultWithMS: true
    });
    var match = dateStr.match(/^(.+)(:\d\d\.\d+)$/);
    return match ? /*#__PURE__*/_jsxs("span", {
      className: styles.TracePageHeaderOverviewItemValue,
      children: [match[1], /*#__PURE__*/_jsx("span", {
        className: styles.TracePageHeaderOverviewItemValueDetail,
        children: match[2]
      })]
    }) : dateStr;
  }
}, {
  key: 'duration',
  label: 'Duration:',
  renderer: function renderer(trace) {
    return formatDuration(trace.duration);
  }
}, {
  key: 'service-count',
  label: 'Services:',
  renderer: function renderer(trace) {
    return new Set(_values(trace.processes).map(function (p) {
      return p.serviceName;
    })).size;
  }
}, {
  key: 'depth',
  label: 'Depth:',
  renderer: function renderer(trace) {
    return _get(_maxBy(trace.spans, 'depth'), 'depth', 0) + 1;
  }
}, {
  key: 'span-count',
  label: 'Total Spans:',
  renderer: function renderer(trace) {
    return trace.spans.length;
  }
}];
export default function TracePageHeader(props) {
  var canCollapse = props.canCollapse,
    hideMap = props.hideMap,
    hideSummary = props.hideSummary,
    onSlimViewClicked = props.onSlimViewClicked,
    slimView = props.slimView,
    trace = props.trace,
    updateNextViewRangeTime = props.updateNextViewRangeTime,
    updateViewRangeTime = props.updateViewRangeTime,
    viewRange = props.viewRange,
    timeZone = props.timeZone;
  var styles = useStyles2(getStyles);
  var links = React.useMemo(function () {
    if (!trace) {
      return [];
    }
    return getTraceLinks(trace);
  }, [trace]);
  if (!trace) {
    return null;
  }
  var summaryItems = !hideSummary && !slimView && HEADER_ITEMS.map(function (item) {
    var renderer = item.renderer,
      rest = _objectWithoutPropertiesLoose(item, _excluded);
    return _extends({}, rest, {
      value: renderer(trace, timeZone, styles)
    });
  });
  var title = /*#__PURE__*/_jsxs("h1", {
    className: cx(styles.TracePageHeaderTitle, canCollapse && styles.TracePageHeaderTitleCollapsible),
    children: [/*#__PURE__*/_jsx(TraceName, {
      traceName: getTraceName(trace.spans)
    }), ' ', /*#__PURE__*/_jsx("small", {
      className: cx(styles.TracePageHeaderTraceId, uTxMuted),
      children: trace.traceID
    })]
  });
  return /*#__PURE__*/_jsxs("header", {
    className: styles.TracePageHeader,
    children: [/*#__PURE__*/_jsxs("div", {
      className: styles.TracePageHeaderTitleRow,
      children: [links && links.length > 0 && /*#__PURE__*/_jsx(ExternalLinks, {
        links: links,
        className: styles.TracePageHeaderBack
      }), canCollapse ? /*#__PURE__*/_jsxs("button", {
        type: "button",
        className: styles.TracePageHeaderTitleLink,
        onClick: onSlimViewClicked,
        role: "switch",
        "aria-checked": !slimView,
        children: [/*#__PURE__*/_jsx(MdKeyboardArrowRight, {
          className: cx(styles.TracePageHeaderDetailToggle, !slimView && styles.TracePageHeaderDetailToggleExpanded)
        }), title]
      }) : title]
    }), summaryItems && /*#__PURE__*/_jsx(LabeledList, {
      className: styles.TracePageHeaderOverviewItems,
      items: summaryItems
    }), !hideMap && !slimView && /*#__PURE__*/_jsx(SpanGraph, {
      trace: trace,
      viewRange: viewRange,
      updateNextViewRangeTime: updateNextViewRangeTime,
      updateViewRangeTime: updateViewRangeTime
    })]
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImdldCIsIl9nZXQiLCJtYXhCeSIsIl9tYXhCeSIsInZhbHVlcyIsIl92YWx1ZXMiLCJSZWFjdCIsIk1kS2V5Ym9hcmRBcnJvd1JpZ2h0IiwiZGF0ZVRpbWVGb3JtYXQiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiRXh0ZXJuYWxMaW5rcyIsIkxhYmVsZWRMaXN0IiwiVHJhY2VOYW1lIiwiZ2V0VHJhY2VMaW5rcyIsImdldFRyYWNlTmFtZSIsInVUeE11dGVkIiwiZm9ybWF0RHVyYXRpb24iLCJTcGFuR3JhcGgiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJUcmFjZVBhZ2VIZWFkZXIiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJUcmFjZVBhZ2VIZWFkZXJUaXRsZVJvdyIsIl90ZW1wbGF0ZU9iamVjdDIiLCJUcmFjZVBhZ2VIZWFkZXJCYWNrIiwiX3RlbXBsYXRlT2JqZWN0MyIsIlRyYWNlUGFnZUhlYWRlclRpdGxlTGluayIsIl90ZW1wbGF0ZU9iamVjdDQiLCJUcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGUiLCJfdGVtcGxhdGVPYmplY3Q1IiwiVHJhY2VQYWdlSGVhZGVyRGV0YWlsVG9nZ2xlRXhwYW5kZWQiLCJfdGVtcGxhdGVPYmplY3Q2IiwiVHJhY2VQYWdlSGVhZGVyVGl0bGUiLCJfdGVtcGxhdGVPYmplY3Q3IiwiVHJhY2VQYWdlSGVhZGVyVGl0bGVDb2xsYXBzaWJsZSIsIl90ZW1wbGF0ZU9iamVjdDgiLCJUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1zIiwiX3RlbXBsYXRlT2JqZWN0OSIsIlRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbVZhbHVlRGV0YWlsIiwiX3RlbXBsYXRlT2JqZWN0MTAiLCJUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1WYWx1ZSIsIl90ZW1wbGF0ZU9iamVjdDExIiwiVHJhY2VQYWdlSGVhZGVyQXJjaGl2ZUljb24iLCJfdGVtcGxhdGVPYmplY3QxMiIsIlRyYWNlUGFnZUhlYWRlclRyYWNlSWQiLCJfdGVtcGxhdGVPYmplY3QxMyIsIkhFQURFUl9JVEVNUyIsImtleSIsImxhYmVsIiwicmVuZGVyZXIiLCJ0cmFjZSIsInRpbWVab25lIiwic3R5bGVzIiwiZGF0ZVN0ciIsInN0YXJ0VGltZSIsImRlZmF1bHRXaXRoTVMiLCJtYXRjaCIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwiZHVyYXRpb24iLCJTZXQiLCJwcm9jZXNzZXMiLCJtYXAiLCJwIiwic2VydmljZU5hbWUiLCJzaXplIiwic3BhbnMiLCJsZW5ndGgiLCJwcm9wcyIsImNhbkNvbGxhcHNlIiwiaGlkZU1hcCIsImhpZGVTdW1tYXJ5Iiwib25TbGltVmlld0NsaWNrZWQiLCJzbGltVmlldyIsInVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lIiwidXBkYXRlVmlld1JhbmdlVGltZSIsInZpZXdSYW5nZSIsImxpbmtzIiwidXNlTWVtbyIsInN1bW1hcnlJdGVtcyIsIml0ZW0iLCJyZXN0IiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJfZXhjbHVkZWQiLCJfZXh0ZW5kcyIsInZhbHVlIiwidGl0bGUiLCJ0cmFjZU5hbWUiLCJ0cmFjZUlEIiwidHlwZSIsIm9uQ2xpY2siLCJyb2xlIiwiaXRlbXMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL1RyYWNlUGFnZUhlYWRlci9UcmFjZVBhZ2VIZWFkZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZ2V0IGFzIF9nZXQsIG1heEJ5IGFzIF9tYXhCeSwgdmFsdWVzIGFzIF92YWx1ZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE1kS2V5Ym9hcmRBcnJvd1JpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9tZC9rZXlib2FyZC1hcnJvdy1yaWdodCc7XG5cbmltcG9ydCB7IGRhdGVUaW1lRm9ybWF0LCBHcmFmYW5hVGhlbWUyLCBUaW1lWm9uZSB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHtcbiAgYXV0b0NvbG9yLFxuICBUVXBkYXRlVmlld1JhbmdlVGltZUZ1bmN0aW9uLFxuICBWaWV3UmFuZ2UsXG4gIFZpZXdSYW5nZVRpbWVVcGRhdGUsXG59IGZyb20gJy4uJztcbmltcG9ydCBFeHRlcm5hbExpbmtzIGZyb20gJy4uL2NvbW1vbi9FeHRlcm5hbExpbmtzJztcbmltcG9ydCBMYWJlbGVkTGlzdCBmcm9tICcuLi9jb21tb24vTGFiZWxlZExpc3QnO1xuaW1wb3J0IFRyYWNlTmFtZSBmcm9tICcuLi9jb21tb24vVHJhY2VOYW1lJztcbmltcG9ydCB7IGdldFRyYWNlTGlua3MgfSBmcm9tICcuLi9tb2RlbC9saW5rLXBhdHRlcm5zJztcbmltcG9ydCB7IGdldFRyYWNlTmFtZSB9IGZyb20gJy4uL21vZGVsL3RyYWNlLXZpZXdlcic7XG5pbXBvcnQgeyBUcmFjZSB9IGZyb20gJy4uL3R5cGVzL3RyYWNlJztcbmltcG9ydCB7IHVUeE11dGVkIH0gZnJvbSAnLi4vdWJlclV0aWxpdHlTdHlsZXMnO1xuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24gfSBmcm9tICcuLi91dGlscy9kYXRlJztcblxuaW1wb3J0IFNwYW5HcmFwaCBmcm9tICcuL1NwYW5HcmFwaCc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIFRyYWNlUGFnZUhlYWRlcjogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlcjtcbiAgICAgICYgPiA6Zmlyc3QtY2hpbGQge1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjZThlOGU4Jyl9O1xuICAgICAgfVxuICAgICAgJiA+IDpudGgtY2hpbGQoMikge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyNlZWUnKX07XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNlNGU0ZTQnKX07XG4gICAgICB9XG4gICAgICAmID4gOmxhc3QtY2hpbGQge1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjY2NjJyl9O1xuICAgICAgfVxuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyVGl0bGVSb3c6IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJUaXRsZVJvdztcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyQmFjazogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlckJhY2s7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbiAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZGQ7XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206IC0xcHg7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjY2NjO1xuICAgICAgfVxuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyVGl0bGVMaW5rOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyVGl0bGVMaW5rO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4OiAxO1xuXG4gICAgICAmOmhvdmVyICoge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIH1cbiAgICAgICY6aG92ZXIgPiAqLFxuICAgICAgJjpob3ZlciBzbWFsbCB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cbiAgICAgIC8qIEFkYXB0IHN0eWxlcyB3aGVuIGNoYW5naW5nIGZyb20gYSBlbGVtZW50IGludG8gYnV0dG9uICovXG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGU6IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGU7XG4gICAgICBmb250LXNpemU6IDIuNXJlbTtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjA3cyBlYXNlLW91dDtcbiAgICBgLFxuICAgIFRyYWNlUGFnZUhlYWRlckRldGFpbFRvZ2dsZUV4cGFuZGVkOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyRGV0YWlsVG9nZ2xlRXhwYW5kZWQ7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJUaXRsZTogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlclRpdGxlO1xuICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICBmbGV4OiAxO1xuICAgICAgZm9udC1zaXplOiAxLjdlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XG4gICAgICBtYXJnaW46IDAgMCAwIDAuNWVtO1xuICAgICAgcGFkZGluZy1ib3R0b206IDAuNWVtO1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyVGl0bGVDb2xsYXBzaWJsZTogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlclRpdGxlQ29sbGFwc2libGU7XG4gICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBgLFxuICAgIFRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbXM6IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1zO1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNGU0ZTQ7XG4gICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbSAhaW1wb3J0YW50O1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtVmFsdWVEZXRhaWw6IGN4KFxuICAgICAgY3NzYFxuICAgICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtVmFsdWVEZXRhaWw7XG4gICAgICAgIGNvbG9yOiAjYWFhO1xuICAgICAgYCxcbiAgICAgICd0cmFjZS1pdGVtLXZhbHVlLWRldGFpbCcsXG4gICAgKSxcbiAgICBUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1WYWx1ZTogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbVZhbHVlO1xuICAgICAgJjpob3ZlciA+IC50cmFjZS1pdGVtLXZhbHVlLWRldGFpbCB7XG4gICAgICAgIGNvbG9yOiB1bnNldDtcbiAgICAgIH1cbiAgICBgLFxuICAgIFRyYWNlUGFnZUhlYWRlckFyY2hpdmVJY29uOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyQXJjaGl2ZUljb247XG4gICAgICBmb250LXNpemU6IDEuNzhlbTtcbiAgICAgIG1hcmdpbi1yaWdodDogMC4xNWVtO1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyVHJhY2VJZDogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlclRyYWNlSWQ7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIGAsXG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBUcmFjZVBhZ2VIZWFkZXJFbWJlZFByb3BzID0ge1xuICBjYW5Db2xsYXBzZTogYm9vbGVhbjtcbiAgaGlkZU1hcDogYm9vbGVhbjtcbiAgaGlkZVN1bW1hcnk6IGJvb2xlYW47XG4gIG9uU2xpbVZpZXdDbGlja2VkOiAoKSA9PiB2b2lkO1xuICBvblRyYWNlR3JhcGhWaWV3Q2xpY2tlZDogKCkgPT4gdm9pZDtcbiAgc2xpbVZpZXc6IGJvb2xlYW47XG4gIHRyYWNlOiBUcmFjZSB8IG51bGw7XG4gIHVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lOiAodXBkYXRlOiBWaWV3UmFuZ2VUaW1lVXBkYXRlKSA9PiB2b2lkO1xuICB1cGRhdGVWaWV3UmFuZ2VUaW1lOiBUVXBkYXRlVmlld1JhbmdlVGltZUZ1bmN0aW9uO1xuICB2aWV3UmFuZ2U6IFZpZXdSYW5nZTtcbiAgdGltZVpvbmU6IFRpbWVab25lO1xufTtcblxuZXhwb3J0IGNvbnN0IEhFQURFUl9JVEVNUyA9IFtcbiAge1xuICAgIGtleTogJ3RpbWVzdGFtcCcsXG4gICAgbGFiZWw6ICdUcmFjZSBTdGFydDonLFxuICAgIHJlbmRlcmVyKFxuICAgICAgdHJhY2U6IFRyYWNlLFxuICAgICAgdGltZVpvbmU6IFRpbWVab25lLFxuICAgICAgc3R5bGVzOiBSZXR1cm5UeXBlPHR5cGVvZiBnZXRTdHlsZXM+LFxuICAgICkge1xuICAgICAgLy8gQ29udmVydCBkYXRlIGZyb20gbWljcm8gdG8gbWlsbGkgc2Vjb25kc1xuICAgICAgY29uc3QgZGF0ZVN0ciA9IGRhdGVUaW1lRm9ybWF0KHRyYWNlLnN0YXJ0VGltZSAvIDEwMDAsIHtcbiAgICAgICAgdGltZVpvbmUsXG4gICAgICAgIGRlZmF1bHRXaXRoTVM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG1hdGNoID0gZGF0ZVN0ci5tYXRjaCgvXiguKykoOlxcZFxcZFxcLlxcZCspJC8pO1xuICAgICAgcmV0dXJuIG1hdGNoID8gKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1WYWx1ZX0+XG4gICAgICAgICAge21hdGNoWzFdfVxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLlRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbVZhbHVlRGV0YWlsfT5cbiAgICAgICAgICAgIHttYXRjaFsyXX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICkgOiAoXG4gICAgICAgIGRhdGVTdHJcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGtleTogJ2R1cmF0aW9uJyxcbiAgICBsYWJlbDogJ0R1cmF0aW9uOicsXG4gICAgcmVuZGVyZXI6ICh0cmFjZTogVHJhY2UpID0+IGZvcm1hdER1cmF0aW9uKHRyYWNlLmR1cmF0aW9uKSxcbiAgfSxcbiAge1xuICAgIGtleTogJ3NlcnZpY2UtY291bnQnLFxuICAgIGxhYmVsOiAnU2VydmljZXM6JyxcbiAgICByZW5kZXJlcjogKHRyYWNlOiBUcmFjZSkgPT5cbiAgICAgIG5ldyBTZXQoX3ZhbHVlcyh0cmFjZS5wcm9jZXNzZXMpLm1hcCgocCkgPT4gcC5zZXJ2aWNlTmFtZSkpLnNpemUsXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdkZXB0aCcsXG4gICAgbGFiZWw6ICdEZXB0aDonLFxuICAgIHJlbmRlcmVyOiAodHJhY2U6IFRyYWNlKSA9PlxuICAgICAgX2dldChfbWF4QnkodHJhY2Uuc3BhbnMsICdkZXB0aCcpLCAnZGVwdGgnLCAwKSArIDEsXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdzcGFuLWNvdW50JyxcbiAgICBsYWJlbDogJ1RvdGFsIFNwYW5zOicsXG4gICAgcmVuZGVyZXI6ICh0cmFjZTogVHJhY2UpID0+IHRyYWNlLnNwYW5zLmxlbmd0aCxcbiAgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRyYWNlUGFnZUhlYWRlcihwcm9wczogVHJhY2VQYWdlSGVhZGVyRW1iZWRQcm9wcykge1xuICBjb25zdCB7XG4gICAgY2FuQ29sbGFwc2UsXG4gICAgaGlkZU1hcCxcbiAgICBoaWRlU3VtbWFyeSxcbiAgICBvblNsaW1WaWV3Q2xpY2tlZCxcbiAgICBzbGltVmlldyxcbiAgICB0cmFjZSxcbiAgICB1cGRhdGVOZXh0Vmlld1JhbmdlVGltZSxcbiAgICB1cGRhdGVWaWV3UmFuZ2VUaW1lLFxuICAgIHZpZXdSYW5nZSxcbiAgICB0aW1lWm9uZSxcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcbiAgY29uc3QgbGlua3MgPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXRyYWNlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBnZXRUcmFjZUxpbmtzKHRyYWNlKTtcbiAgfSwgW3RyYWNlXSk7XG5cbiAgaWYgKCF0cmFjZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID1cbiAgICAhaGlkZVN1bW1hcnkgJiZcbiAgICAhc2xpbVZpZXcgJiZcbiAgICBIRUFERVJfSVRFTVMubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCB7IHJlbmRlcmVyLCAuLi5yZXN0IH0gPSBpdGVtO1xuICAgICAgcmV0dXJuIHsgLi4ucmVzdCwgdmFsdWU6IHJlbmRlcmVyKHRyYWNlLCB0aW1lWm9uZSwgc3R5bGVzKSB9O1xuICAgIH0pO1xuXG4gIGNvbnN0IHRpdGxlID0gKFxuICAgIDxoMVxuICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAgc3R5bGVzLlRyYWNlUGFnZUhlYWRlclRpdGxlLFxuICAgICAgICBjYW5Db2xsYXBzZSAmJiBzdHlsZXMuVHJhY2VQYWdlSGVhZGVyVGl0bGVDb2xsYXBzaWJsZSxcbiAgICAgICl9XG4gICAgPlxuICAgICAgPFRyYWNlTmFtZSB0cmFjZU5hbWU9e2dldFRyYWNlTmFtZSh0cmFjZS5zcGFucyl9IC8+eycgJ31cbiAgICAgIDxzbWFsbCBjbGFzc05hbWU9e2N4KHN0eWxlcy5UcmFjZVBhZ2VIZWFkZXJUcmFjZUlkLCB1VHhNdXRlZCl9PlxuICAgICAgICB7dHJhY2UudHJhY2VJRH1cbiAgICAgIDwvc21hbGw+XG4gICAgPC9oMT5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtzdHlsZXMuVHJhY2VQYWdlSGVhZGVyfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVHJhY2VQYWdlSGVhZGVyVGl0bGVSb3d9PlxuICAgICAgICB7bGlua3MgJiYgbGlua3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgPEV4dGVybmFsTGlua3MgbGlua3M9e2xpbmtzfSBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJCYWNrfSAvPlxuICAgICAgICApfVxuICAgICAgICB7Y2FuQ29sbGFwc2UgPyAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJUaXRsZUxpbmt9XG4gICAgICAgICAgICBvbkNsaWNrPXtvblNsaW1WaWV3Q2xpY2tlZH1cbiAgICAgICAgICAgIHJvbGU9XCJzd2l0Y2hcIlxuICAgICAgICAgICAgYXJpYS1jaGVja2VkPXshc2xpbVZpZXd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1kS2V5Ym9hcmRBcnJvd1JpZ2h0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICAgc3R5bGVzLlRyYWNlUGFnZUhlYWRlckRldGFpbFRvZ2dsZSxcbiAgICAgICAgICAgICAgICAhc2xpbVZpZXcgJiYgc3R5bGVzLlRyYWNlUGFnZUhlYWRlckRldGFpbFRvZ2dsZUV4cGFuZGVkLFxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICB0aXRsZVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICB7c3VtbWFyeUl0ZW1zICYmIChcbiAgICAgICAgPExhYmVsZWRMaXN0XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtc31cbiAgICAgICAgICBpdGVtcz17c3VtbWFyeUl0ZW1zfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHshaGlkZU1hcCAmJiAhc2xpbVZpZXcgJiYgKFxuICAgICAgICA8U3BhbkdyYXBoXG4gICAgICAgICAgdHJhY2U9e3RyYWNlfVxuICAgICAgICAgIHZpZXdSYW5nZT17dmlld1JhbmdlfVxuICAgICAgICAgIHVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lPXt1cGRhdGVOZXh0Vmlld1JhbmdlVGltZX1cbiAgICAgICAgICB1cGRhdGVWaWV3UmFuZ2VUaW1lPXt1cGRhdGVWaWV3UmFuZ2VUaW1lfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2hlYWRlcj5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixTQUFTQyxHQUFHLElBQUlDLElBQUksRUFBRUMsS0FBSyxJQUFJQyxNQUFNLEVBQUVDLE1BQU0sSUFBSUMsT0FBTyxRQUFRLFFBQVE7QUFDeEUsT0FBTyxLQUFLQyxLQUFLLE1BQU0sT0FBTztBQUM5QixPQUFPQyxvQkFBb0IsTUFBTSx5Q0FBeUM7QUFFMUUsU0FBU0MsY0FBYyxRQUFpQyxlQUFlO0FBQ3ZFLFNBQVNDLFVBQVUsUUFBUSxhQUFhO0FBRXhDLFNBQ0VDLFNBQVMsUUFJSixJQUFJO0FBQ1gsT0FBT0MsYUFBYSxNQUFNLHlCQUF5QjtBQUNuRCxPQUFPQyxXQUFXLE1BQU0sdUJBQXVCO0FBQy9DLE9BQU9DLFNBQVMsTUFBTSxxQkFBcUI7QUFDM0MsU0FBU0MsYUFBYSxRQUFRLHdCQUF3QjtBQUN0RCxTQUFTQyxZQUFZLFFBQVEsdUJBQXVCO0FBRXBELFNBQVNDLFFBQVEsUUFBUSxzQkFBc0I7QUFDL0MsU0FBU0MsY0FBYyxRQUFRLGVBQWU7QUFFOUMsT0FBT0MsU0FBUyxNQUFNLGFBQWE7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxL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QUFLO0lBQUUsQ0FBRSxDQUFDLEVBQUMsR0FBRyxlQUN2RHBELElBQUE7TUFBTzJDLFNBQVMsRUFBRWhFLEVBQUUsQ0FBQzJELE1BQU0sQ0FBQ1Isc0JBQXNCLEVBQUVsQyxRQUFRLENBQUU7TUFBQWdELFFBQUEsRUFDM0RSLEtBQUssQ0FBQ3NDO0lBQU8sQ0FDVCxDQUFDO0VBQUEsQ0FDTixDQUNMO0VBRUQsb0JBQ0V4RSxLQUFBO0lBQVF5QyxTQUFTLEVBQUVMLE1BQU0sQ0FBQ2pDLGVBQWdCO0lBQUF1QyxRQUFBLGdCQUN4QzFDLEtBQUE7TUFBS3lDLFNBQVMsRUFBRUwsTUFBTSxDQUFDOUIsdUJBQXdCO01BQUFvQyxRQUFBLEdBQzVDbUIsS0FBSyxJQUFJQSxLQUFLLENBQUNWLE1BQU0sR0FBRyxDQUFDLGlCQUN4QnJELElBQUEsQ0FBQ1QsYUFBYTtRQUFDd0UsS0FBSyxFQUFFQSxLQUFNO1FBQUNwQixTQUFTLEVBQUVMLE1BQU0sQ0FBQzVCO01BQW9CLENBQUUsQ0FDdEUsRUFDQTZDLFdBQVcsZ0JBQ1ZyRCxLQUFBO1FBQ0V5RSxJQUFJLEVBQUMsUUFBUTtRQUNiaEMsU0FBUyxFQUFFTCxNQUFNLENBQUMxQix3QkFBeUI7UUFDM0NnRSxPQUFPLEVBQUVsQixpQkFBa0I7UUFDM0JtQixJQUFJLEVBQUMsUUFBUTtRQUNiLGdCQUFjLENBQUNsQixRQUFTO1FBQUFmLFFBQUEsZ0JBRXhCNUMsSUFBQSxDQUFDYixvQkFBb0I7VUFDbkJ3RCxTQUFTLEVBQUVoRSxFQUFFLENBQ1gyRCxNQUFNLENBQUN4QiwyQkFBMkIsRUFDbEMsQ0FBQzZDLFFBQVEsSUFBSXJCLE1BQU0sQ0FBQ3RCLG1DQUN0QjtRQUFFLENBQ0gsQ0FBQyxFQUNEd0QsS0FBSztNQUFBLENBQ0EsQ0FBQyxHQUVUQSxLQUNEO0lBQUEsQ0FDRSxDQUFDLEVBQ0xQLFlBQVksaUJBQ1hqRSxJQUFBLENBQUNSLFdBQVc7TUFDVm1ELFNBQVMsRUFBRUwsTUFBTSxDQUFDaEIsNEJBQTZCO01BQy9Dd0QsS0FBSyxFQUFFYjtJQUFhLENBQ3JCLENBQ0YsRUFDQSxDQUFDVCxPQUFPLElBQUksQ0FBQ0csUUFBUSxpQkFDcEIzRCxJQUFBLENBQUNGLFNBQVM7TUFDUnNDLEtBQUssRUFBRUEsS0FBTTtNQUNiMEIsU0FBUyxFQUFFQSxTQUFVO01BQ3JCRix1QkFBdUIsRUFBRUEsdUJBQXdCO01BQ2pEQyxtQkFBbUIsRUFBRUE7SUFBb0IsQ0FDMUMsQ0FDRjtFQUFBLENBQ0ssQ0FBQztBQUViIiwiaWdub3JlTGlzdCI6W119