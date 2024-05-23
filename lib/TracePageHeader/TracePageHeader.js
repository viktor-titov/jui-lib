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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImdldCIsIl9nZXQiLCJtYXhCeSIsIl9tYXhCeSIsInZhbHVlcyIsIl92YWx1ZXMiLCJSZWFjdCIsIk1kS2V5Ym9hcmRBcnJvd1JpZ2h0IiwiZGF0ZVRpbWVGb3JtYXQiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiRXh0ZXJuYWxMaW5rcyIsIkxhYmVsZWRMaXN0IiwiVHJhY2VOYW1lIiwiZ2V0VHJhY2VMaW5rcyIsImdldFRyYWNlTmFtZSIsInVUeE11dGVkIiwiZm9ybWF0RHVyYXRpb24iLCJTcGFuR3JhcGgiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJUcmFjZVBhZ2VIZWFkZXIiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJUcmFjZVBhZ2VIZWFkZXJUaXRsZVJvdyIsIl90ZW1wbGF0ZU9iamVjdDIiLCJUcmFjZVBhZ2VIZWFkZXJCYWNrIiwiX3RlbXBsYXRlT2JqZWN0MyIsIlRyYWNlUGFnZUhlYWRlclRpdGxlTGluayIsIl90ZW1wbGF0ZU9iamVjdDQiLCJUcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGUiLCJfdGVtcGxhdGVPYmplY3Q1IiwiVHJhY2VQYWdlSGVhZGVyRGV0YWlsVG9nZ2xlRXhwYW5kZWQiLCJfdGVtcGxhdGVPYmplY3Q2IiwiVHJhY2VQYWdlSGVhZGVyVGl0bGUiLCJfdGVtcGxhdGVPYmplY3Q3IiwiVHJhY2VQYWdlSGVhZGVyVGl0bGVDb2xsYXBzaWJsZSIsIl90ZW1wbGF0ZU9iamVjdDgiLCJUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1zIiwiX3RlbXBsYXRlT2JqZWN0OSIsIlRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbVZhbHVlRGV0YWlsIiwiX3RlbXBsYXRlT2JqZWN0MTAiLCJUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1WYWx1ZSIsIl90ZW1wbGF0ZU9iamVjdDExIiwiVHJhY2VQYWdlSGVhZGVyQXJjaGl2ZUljb24iLCJfdGVtcGxhdGVPYmplY3QxMiIsIlRyYWNlUGFnZUhlYWRlclRyYWNlSWQiLCJfdGVtcGxhdGVPYmplY3QxMyIsIkhFQURFUl9JVEVNUyIsImtleSIsImxhYmVsIiwicmVuZGVyZXIiLCJ0cmFjZSIsInRpbWVab25lIiwic3R5bGVzIiwiZGF0ZVN0ciIsInN0YXJ0VGltZSIsImRlZmF1bHRXaXRoTVMiLCJtYXRjaCIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwiZHVyYXRpb24iLCJTZXQiLCJwcm9jZXNzZXMiLCJtYXAiLCJwIiwic2VydmljZU5hbWUiLCJzaXplIiwic3BhbnMiLCJsZW5ndGgiLCJwcm9wcyIsImNhbkNvbGxhcHNlIiwiaGlkZU1hcCIsImhpZGVTdW1tYXJ5Iiwib25TbGltVmlld0NsaWNrZWQiLCJzbGltVmlldyIsInVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lIiwidXBkYXRlVmlld1JhbmdlVGltZSIsInZpZXdSYW5nZSIsImxpbmtzIiwidXNlTWVtbyIsInN1bW1hcnlJdGVtcyIsIml0ZW0iLCJyZXN0IiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJfZXhjbHVkZWQiLCJfZXh0ZW5kcyIsInZhbHVlIiwidGl0bGUiLCJ0cmFjZU5hbWUiLCJ0cmFjZUlEIiwidHlwZSIsIm9uQ2xpY2siLCJyb2xlIiwiaXRlbXMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvVHJhY2VQYWdlSGVhZGVyL1RyYWNlUGFnZUhlYWRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBnZXQgYXMgX2dldCwgbWF4QnkgYXMgX21heEJ5LCB2YWx1ZXMgYXMgX3ZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTWRLZXlib2FyZEFycm93UmlnaHQgZnJvbSAncmVhY3QtaWNvbnMvbGliL21kL2tleWJvYXJkLWFycm93LXJpZ2h0JztcblxuaW1wb3J0IHsgZGF0ZVRpbWVGb3JtYXQsIEdyYWZhbmFUaGVtZTIsIFRpbWVab25lIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQge1xuICBhdXRvQ29sb3IsXG4gIFRVcGRhdGVWaWV3UmFuZ2VUaW1lRnVuY3Rpb24sXG4gIFZpZXdSYW5nZSxcbiAgVmlld1JhbmdlVGltZVVwZGF0ZSxcbn0gZnJvbSAnLi4nO1xuaW1wb3J0IEV4dGVybmFsTGlua3MgZnJvbSAnLi4vY29tbW9uL0V4dGVybmFsTGlua3MnO1xuaW1wb3J0IExhYmVsZWRMaXN0IGZyb20gJy4uL2NvbW1vbi9MYWJlbGVkTGlzdCc7XG5pbXBvcnQgVHJhY2VOYW1lIGZyb20gJy4uL2NvbW1vbi9UcmFjZU5hbWUnO1xuaW1wb3J0IHsgZ2V0VHJhY2VMaW5rcyB9IGZyb20gJy4uL21vZGVsL2xpbmstcGF0dGVybnMnO1xuaW1wb3J0IHsgZ2V0VHJhY2VOYW1lIH0gZnJvbSAnLi4vbW9kZWwvdHJhY2Utdmlld2VyJztcbmltcG9ydCB7IFRyYWNlIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuaW1wb3J0IHsgdVR4TXV0ZWQgfSBmcm9tICcuLi91YmVyVXRpbGl0eVN0eWxlcyc7XG5pbXBvcnQgeyBmb3JtYXREdXJhdGlvbiB9IGZyb20gJy4uL3V0aWxzL2RhdGUnO1xuXG5pbXBvcnQgU3BhbkdyYXBoIGZyb20gJy4vU3BhbkdyYXBoJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgVHJhY2VQYWdlSGVhZGVyOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyO1xuICAgICAgJiA+IDpmaXJzdC1jaGlsZCB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNlOGU4ZTgnKX07XG4gICAgICB9XG4gICAgICAmID4gOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2VlZScpfTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2U0ZTRlNCcpfTtcbiAgICAgIH1cbiAgICAgICYgPiA6bGFzdC1jaGlsZCB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNjY2MnKX07XG4gICAgICB9XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJUaXRsZVJvdzogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlclRpdGxlUm93O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJCYWNrOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyQmFjaztcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xuICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2RkZDtcbiAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZvbnQtc2l6ZTogMS40cmVtO1xuICAgICAgcGFkZGluZzogMCAxcmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogLTFweDtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjBmMGYwO1xuICAgICAgICBib3JkZXItY29sb3I6ICNjY2M7XG4gICAgICB9XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJUaXRsZUxpbms6IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJUaXRsZUxpbms7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXg6IDE7XG5cbiAgICAgICY6aG92ZXIgKiB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgfVxuICAgICAgJjpob3ZlciA+ICosXG4gICAgICAmOmhvdmVyIHNtYWxsIHtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgfVxuICAgICAgLyogQWRhcHQgc3R5bGVzIHdoZW4gY2hhbmdpbmcgZnJvbSBhIGVsZW1lbnQgaW50byBidXR0b24gKi9cbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICBgLFxuICAgIFRyYWNlUGFnZUhlYWRlckRldGFpbFRvZ2dsZTogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlckRldGFpbFRvZ2dsZTtcbiAgICAgIGZvbnQtc2l6ZTogMi41cmVtO1xuICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMDdzIGVhc2Utb3V0O1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyRGV0YWlsVG9nZ2xlRXhwYW5kZWQ6IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGVFeHBhbmRlZDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcbiAgICBgLFxuICAgIFRyYWNlUGFnZUhlYWRlclRpdGxlOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyVGl0bGU7XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBmb250LXNpemU6IDEuN2VtO1xuICAgICAgbGluZS1oZWlnaHQ6IDFlbTtcbiAgICAgIG1hcmdpbjogMCAwIDAgMC41ZW07XG4gICAgICBwYWRkaW5nLWJvdHRvbTogMC41ZW07XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJUaXRsZUNvbGxhcHNpYmxlOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyVGl0bGVDb2xsYXBzaWJsZTtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtczogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbXM7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2U0ZTRlNDtcbiAgICAgIHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtICFpbXBvcnRhbnQ7XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1WYWx1ZURldGFpbDogY3goXG4gICAgICBjc3NgXG4gICAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1WYWx1ZURldGFpbDtcbiAgICAgICAgY29sb3I6ICNhYWE7XG4gICAgICBgLFxuICAgICAgJ3RyYWNlLWl0ZW0tdmFsdWUtZGV0YWlsJyxcbiAgICApLFxuICAgIFRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbVZhbHVlOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtVmFsdWU7XG4gICAgICAmOmhvdmVyID4gLnRyYWNlLWl0ZW0tdmFsdWUtZGV0YWlsIHtcbiAgICAgICAgY29sb3I6IHVuc2V0O1xuICAgICAgfVxuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyQXJjaGl2ZUljb246IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJBcmNoaXZlSWNvbjtcbiAgICAgIGZvbnQtc2l6ZTogMS43OGVtO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwLjE1ZW07XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJUcmFjZUlkOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyVHJhY2VJZDtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgYCxcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIFRyYWNlUGFnZUhlYWRlckVtYmVkUHJvcHMgPSB7XG4gIGNhbkNvbGxhcHNlOiBib29sZWFuO1xuICBoaWRlTWFwOiBib29sZWFuO1xuICBoaWRlU3VtbWFyeTogYm9vbGVhbjtcbiAgb25TbGltVmlld0NsaWNrZWQ6ICgpID0+IHZvaWQ7XG4gIG9uVHJhY2VHcmFwaFZpZXdDbGlja2VkOiAoKSA9PiB2b2lkO1xuICBzbGltVmlldzogYm9vbGVhbjtcbiAgdHJhY2U6IFRyYWNlIHwgbnVsbDtcbiAgdXBkYXRlTmV4dFZpZXdSYW5nZVRpbWU6ICh1cGRhdGU6IFZpZXdSYW5nZVRpbWVVcGRhdGUpID0+IHZvaWQ7XG4gIHVwZGF0ZVZpZXdSYW5nZVRpbWU6IFRVcGRhdGVWaWV3UmFuZ2VUaW1lRnVuY3Rpb247XG4gIHZpZXdSYW5nZTogVmlld1JhbmdlO1xuICB0aW1lWm9uZTogVGltZVpvbmU7XG59O1xuXG5leHBvcnQgY29uc3QgSEVBREVSX0lURU1TID0gW1xuICB7XG4gICAga2V5OiAndGltZXN0YW1wJyxcbiAgICBsYWJlbDogJ1RyYWNlIFN0YXJ0OicsXG4gICAgcmVuZGVyZXIoXG4gICAgICB0cmFjZTogVHJhY2UsXG4gICAgICB0aW1lWm9uZTogVGltZVpvbmUsXG4gICAgICBzdHlsZXM6IFJldHVyblR5cGU8dHlwZW9mIGdldFN0eWxlcz4sXG4gICAgKSB7XG4gICAgICAvLyBDb252ZXJ0IGRhdGUgZnJvbSBtaWNybyB0byBtaWxsaSBzZWNvbmRzXG4gICAgICBjb25zdCBkYXRlU3RyID0gZGF0ZVRpbWVGb3JtYXQodHJhY2Uuc3RhcnRUaW1lIC8gMTAwMCwge1xuICAgICAgICB0aW1lWm9uZSxcbiAgICAgICAgZGVmYXVsdFdpdGhNUzogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbWF0Y2ggPSBkYXRlU3RyLm1hdGNoKC9eKC4rKSg6XFxkXFxkXFwuXFxkKykkLyk7XG4gICAgICByZXR1cm4gbWF0Y2ggPyAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLlRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbVZhbHVlfT5cbiAgICAgICAgICB7bWF0Y2hbMV19XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtVmFsdWVEZXRhaWx9PlxuICAgICAgICAgICAge21hdGNoWzJdfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKSA6IChcbiAgICAgICAgZGF0ZVN0clxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICB7XG4gICAga2V5OiAnZHVyYXRpb24nLFxuICAgIGxhYmVsOiAnRHVyYXRpb246JyxcbiAgICByZW5kZXJlcjogKHRyYWNlOiBUcmFjZSkgPT4gZm9ybWF0RHVyYXRpb24odHJhY2UuZHVyYXRpb24pLFxuICB9LFxuICB7XG4gICAga2V5OiAnc2VydmljZS1jb3VudCcsXG4gICAgbGFiZWw6ICdTZXJ2aWNlczonLFxuICAgIHJlbmRlcmVyOiAodHJhY2U6IFRyYWNlKSA9PlxuICAgICAgbmV3IFNldChfdmFsdWVzKHRyYWNlLnByb2Nlc3NlcykubWFwKChwKSA9PiBwLnNlcnZpY2VOYW1lKSkuc2l6ZSxcbiAgfSxcbiAge1xuICAgIGtleTogJ2RlcHRoJyxcbiAgICBsYWJlbDogJ0RlcHRoOicsXG4gICAgcmVuZGVyZXI6ICh0cmFjZTogVHJhY2UpID0+XG4gICAgICBfZ2V0KF9tYXhCeSh0cmFjZS5zcGFucywgJ2RlcHRoJyksICdkZXB0aCcsIDApICsgMSxcbiAgfSxcbiAge1xuICAgIGtleTogJ3NwYW4tY291bnQnLFxuICAgIGxhYmVsOiAnVG90YWwgU3BhbnM6JyxcbiAgICByZW5kZXJlcjogKHRyYWNlOiBUcmFjZSkgPT4gdHJhY2Uuc3BhbnMubGVuZ3RoLFxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVHJhY2VQYWdlSGVhZGVyKHByb3BzOiBUcmFjZVBhZ2VIZWFkZXJFbWJlZFByb3BzKSB7XG4gIGNvbnN0IHtcbiAgICBjYW5Db2xsYXBzZSxcbiAgICBoaWRlTWFwLFxuICAgIGhpZGVTdW1tYXJ5LFxuICAgIG9uU2xpbVZpZXdDbGlja2VkLFxuICAgIHNsaW1WaWV3LFxuICAgIHRyYWNlLFxuICAgIHVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lLFxuICAgIHVwZGF0ZVZpZXdSYW5nZVRpbWUsXG4gICAgdmlld1JhbmdlLFxuICAgIHRpbWVab25lLFxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICBjb25zdCBsaW5rcyA9IFJlYWN0LnVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghdHJhY2UpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFRyYWNlTGlua3ModHJhY2UpO1xuICB9LCBbdHJhY2VdKTtcblxuICBpZiAoIXRyYWNlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBzdW1tYXJ5SXRlbXMgPVxuICAgICFoaWRlU3VtbWFyeSAmJlxuICAgICFzbGltVmlldyAmJlxuICAgIEhFQURFUl9JVEVNUy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHsgcmVuZGVyZXIsIC4uLnJlc3QgfSA9IGl0ZW07XG4gICAgICByZXR1cm4geyAuLi5yZXN0LCB2YWx1ZTogcmVuZGVyZXIodHJhY2UsIHRpbWVab25lLCBzdHlsZXMpIH07XG4gICAgfSk7XG5cbiAgY29uc3QgdGl0bGUgPSAoXG4gICAgPGgxXG4gICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICBzdHlsZXMuVHJhY2VQYWdlSGVhZGVyVGl0bGUsXG4gICAgICAgIGNhbkNvbGxhcHNlICYmIHN0eWxlcy5UcmFjZVBhZ2VIZWFkZXJUaXRsZUNvbGxhcHNpYmxlLFxuICAgICAgKX1cbiAgICA+XG4gICAgICA8VHJhY2VOYW1lIHRyYWNlTmFtZT17Z2V0VHJhY2VOYW1lKHRyYWNlLnNwYW5zKX0gLz57JyAnfVxuICAgICAgPHNtYWxsIGNsYXNzTmFtZT17Y3goc3R5bGVzLlRyYWNlUGFnZUhlYWRlclRyYWNlSWQsIHVUeE11dGVkKX0+XG4gICAgICAgIHt0cmFjZS50cmFjZUlEfVxuICAgICAgPC9zbWFsbD5cbiAgICA8L2gxPlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGhlYWRlciBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJ9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJUaXRsZVJvd30+XG4gICAgICAgIHtsaW5rcyAmJiBsaW5rcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICA8RXh0ZXJuYWxMaW5rcyBsaW5rcz17bGlua3N9IGNsYXNzTmFtZT17c3R5bGVzLlRyYWNlUGFnZUhlYWRlckJhY2t9IC8+XG4gICAgICAgICl9XG4gICAgICAgIHtjYW5Db2xsYXBzZSA/IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLlRyYWNlUGFnZUhlYWRlclRpdGxlTGlua31cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uU2xpbVZpZXdDbGlja2VkfVxuICAgICAgICAgICAgcm9sZT1cInN3aXRjaFwiXG4gICAgICAgICAgICBhcmlhLWNoZWNrZWQ9eyFzbGltVmlld31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TWRLZXlib2FyZEFycm93UmlnaHRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAgICAgICAgICBzdHlsZXMuVHJhY2VQYWdlSGVhZGVyRGV0YWlsVG9nZ2xlLFxuICAgICAgICAgICAgICAgICFzbGltVmlldyAmJiBzdHlsZXMuVHJhY2VQYWdlSGVhZGVyRGV0YWlsVG9nZ2xlRXhwYW5kZWQsXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3RpdGxlfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApIDogKFxuICAgICAgICAgIHRpdGxlXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICAgIHtzdW1tYXJ5SXRlbXMgJiYgKFxuICAgICAgICA8TGFiZWxlZExpc3RcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1zfVxuICAgICAgICAgIGl0ZW1zPXtzdW1tYXJ5SXRlbXN9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAgeyFoaWRlTWFwICYmICFzbGltVmlldyAmJiAoXG4gICAgICAgIDxTcGFuR3JhcGhcbiAgICAgICAgICB0cmFjZT17dHJhY2V9XG4gICAgICAgICAgdmlld1JhbmdlPXt2aWV3UmFuZ2V9XG4gICAgICAgICAgdXBkYXRlTmV4dFZpZXdSYW5nZVRpbWU9e3VwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lfVxuICAgICAgICAgIHVwZGF0ZVZpZXdSYW5nZVRpbWU9e3VwZGF0ZVZpZXdSYW5nZVRpbWV9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvaGVhZGVyPlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEVBQUUsTUFBTSxZQUFZO0FBQzNCLFNBQVNDLEdBQUcsSUFBSUMsSUFBSSxFQUFFQyxLQUFLLElBQUlDLE1BQU0sRUFBRUMsTUFBTSxJQUFJQyxPQUFPLFFBQVEsUUFBUTtBQUN4RSxPQUFPLEtBQUtDLEtBQUssTUFBTSxPQUFPO0FBQzlCLE9BQU9DLG9CQUFvQixNQUFNLHlDQUF5QztBQUUxRSxTQUFTQyxjQUFjLFFBQWlDLGVBQWU7QUFDdkUsU0FBU0MsVUFBVSxRQUFRLGFBQWE7QUFFeEMsU0FDRUMsU0FBUyxRQUlKLElBQUk7QUFDWCxPQUFPQyxhQUFhLE1BQU0seUJBQXlCO0FBQ25ELE9BQU9DLFdBQVcsTUFBTSx1QkFBdUI7QUFDL0MsT0FBT0MsU0FBUyxNQUFNLHFCQUFxQjtBQUMzQyxTQUFTQyxhQUFhLFFBQVEsd0JBQXdCO0FBQ3RELFNBQVNDLFlBQVksUUFBUSx1QkFBdUI7QUFFcEQsU0FBU0MsUUFBUSxRQUFRLHNCQUFzQjtBQUMvQyxTQUFTQyxjQUFjLFFBQVEsZUFBZTtBQUU5QyxPQUFPQyxTQUFTLE1BQU0sYUFBYTtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQSxFQUFBQyxJQUFBLElBQUFDLEtBQUE7QUFF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RSxDQUFFLENBQUMsRUFBQyxHQUFHLGVBQ3ZEcEQsSUFBQTtNQUFPMkMsU0FBUyxFQUFFaEUsRUFBRSxDQUFDMkQsTUFBTSxDQUFDUixzQkFBc0IsRUFBRWxDLFFBQVEsQ0FBRTtNQUFBZ0QsUUFBQSxFQUMzRFIsS0FBSyxDQUFDc0M7SUFBTyxDQUNULENBQUM7RUFBQSxDQUNOLENBQ0w7RUFFRCxvQkFDRXhFLEtBQUE7SUFBUXlDLFNBQVMsRUFBRUwsTUFBTSxDQUFDakMsZUFBZ0I7SUFBQXVDLFFBQUEsZ0JBQ3hDMUMsS0FBQTtNQUFLeUMsU0FBUyxFQUFFTCxNQUFNLENBQUM5Qix1QkFBd0I7TUFBQW9DLFFBQUEsR0FDNUNtQixLQUFLLElBQUlBLEtBQUssQ0FBQ1YsTUFBTSxHQUFHLENBQUMsaUJBQ3hCckQsSUFBQSxDQUFDVCxhQUFhO1FBQUN3RSxLQUFLLEVBQUVBLEtBQU07UUFBQ3BCLFNBQVMsRUFBRUwsTUFBTSxDQUFDNUI7TUFBb0IsQ0FBRSxDQUN0RSxFQUNBNkMsV0FBVyxnQkFDVnJELEtBQUE7UUFDRXlFLElBQUksRUFBQyxRQUFRO1FBQ2JoQyxTQUFTLEVBQUVMLE1BQU0sQ0FBQzFCLHdCQUF5QjtRQUMzQ2dFLE9BQU8sRUFBRWxCLGlCQUFrQjtRQUMzQm1CLElBQUksRUFBQyxRQUFRO1FBQ2IsZ0JBQWMsQ0FBQ2xCLFFBQVM7UUFBQWYsUUFBQSxnQkFFeEI1QyxJQUFBLENBQUNiLG9CQUFvQjtVQUNuQndELFNBQVMsRUFBRWhFLEVBQUUsQ0FDWDJELE1BQU0sQ0FBQ3hCLDJCQUEyQixFQUNsQyxDQUFDNkMsUUFBUSxJQUFJckIsTUFBTSxDQUFDdEIsbUNBQ3RCO1FBQUUsQ0FDSCxDQUFDLEVBQ0R3RCxLQUFLO01BQUEsQ0FDQSxDQUFDLEdBRVRBLEtBQ0Q7SUFBQSxDQUNFLENBQUMsRUFDTFAsWUFBWSxpQkFDWGpFLElBQUEsQ0FBQ1IsV0FBVztNQUNWbUQsU0FBUyxFQUFFTCxNQUFNLENBQUNoQiw0QkFBNkI7TUFDL0N3RCxLQUFLLEVBQUViO0lBQWEsQ0FDckIsQ0FDRixFQUNBLENBQUNULE9BQU8sSUFBSSxDQUFDRyxRQUFRLGlCQUNwQjNELElBQUEsQ0FBQ0YsU0FBUztNQUNSc0MsS0FBSyxFQUFFQSxLQUFNO01BQ2IwQixTQUFTLEVBQUVBLFNBQVU7TUFDckJGLHVCQUF1QixFQUFFQSx1QkFBd0I7TUFDakRDLG1CQUFtQixFQUFFQTtJQUFvQixDQUMxQyxDQUNGO0VBQUEsQ0FDSyxDQUFDO0FBRWIiLCJpZ25vcmVMaXN0IjpbXX0=