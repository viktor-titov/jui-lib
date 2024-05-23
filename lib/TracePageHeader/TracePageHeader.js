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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImdldCIsIl9nZXQiLCJtYXhCeSIsIl9tYXhCeSIsInZhbHVlcyIsIl92YWx1ZXMiLCJSZWFjdCIsIk1kS2V5Ym9hcmRBcnJvd1JpZ2h0IiwiZGF0ZVRpbWVGb3JtYXQiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiRXh0ZXJuYWxMaW5rcyIsIkxhYmVsZWRMaXN0IiwiVHJhY2VOYW1lIiwiZ2V0VHJhY2VMaW5rcyIsImdldFRyYWNlTmFtZSIsInVUeE11dGVkIiwiZm9ybWF0RHVyYXRpb24iLCJTcGFuR3JhcGgiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJUcmFjZVBhZ2VIZWFkZXIiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJUcmFjZVBhZ2VIZWFkZXJUaXRsZVJvdyIsIl90ZW1wbGF0ZU9iamVjdDIiLCJUcmFjZVBhZ2VIZWFkZXJCYWNrIiwiX3RlbXBsYXRlT2JqZWN0MyIsIlRyYWNlUGFnZUhlYWRlclRpdGxlTGluayIsIl90ZW1wbGF0ZU9iamVjdDQiLCJUcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGUiLCJfdGVtcGxhdGVPYmplY3Q1IiwiVHJhY2VQYWdlSGVhZGVyRGV0YWlsVG9nZ2xlRXhwYW5kZWQiLCJfdGVtcGxhdGVPYmplY3Q2IiwiVHJhY2VQYWdlSGVhZGVyVGl0bGUiLCJfdGVtcGxhdGVPYmplY3Q3IiwiVHJhY2VQYWdlSGVhZGVyVGl0bGVDb2xsYXBzaWJsZSIsIl90ZW1wbGF0ZU9iamVjdDgiLCJUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1zIiwiX3RlbXBsYXRlT2JqZWN0OSIsIlRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbVZhbHVlRGV0YWlsIiwiX3RlbXBsYXRlT2JqZWN0MTAiLCJUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1WYWx1ZSIsIl90ZW1wbGF0ZU9iamVjdDExIiwiVHJhY2VQYWdlSGVhZGVyQXJjaGl2ZUljb24iLCJfdGVtcGxhdGVPYmplY3QxMiIsIlRyYWNlUGFnZUhlYWRlclRyYWNlSWQiLCJfdGVtcGxhdGVPYmplY3QxMyIsIkhFQURFUl9JVEVNUyIsImtleSIsImxhYmVsIiwicmVuZGVyZXIiLCJ0cmFjZSIsInRpbWVab25lIiwic3R5bGVzIiwiZGF0ZVN0ciIsInN0YXJ0VGltZSIsImRlZmF1bHRXaXRoTVMiLCJtYXRjaCIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwiZHVyYXRpb24iLCJTZXQiLCJwcm9jZXNzZXMiLCJtYXAiLCJwIiwic2VydmljZU5hbWUiLCJzaXplIiwic3BhbnMiLCJsZW5ndGgiLCJwcm9wcyIsImNhbkNvbGxhcHNlIiwiaGlkZU1hcCIsImhpZGVTdW1tYXJ5Iiwib25TbGltVmlld0NsaWNrZWQiLCJzbGltVmlldyIsInVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lIiwidXBkYXRlVmlld1JhbmdlVGltZSIsInZpZXdSYW5nZSIsImxpbmtzIiwidXNlTWVtbyIsInN1bW1hcnlJdGVtcyIsIml0ZW0iLCJyZXN0IiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJfZXhjbHVkZWQiLCJfZXh0ZW5kcyIsInZhbHVlIiwidGl0bGUiLCJ0cmFjZU5hbWUiLCJ0cmFjZUlEIiwidHlwZSIsIm9uQ2xpY2siLCJyb2xlIiwiaXRlbXMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvVHJhY2VQYWdlSGVhZGVyL1RyYWNlUGFnZUhlYWRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBnZXQgYXMgX2dldCwgbWF4QnkgYXMgX21heEJ5LCB2YWx1ZXMgYXMgX3ZhbHVlcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTWRLZXlib2FyZEFycm93UmlnaHQgZnJvbSAncmVhY3QtaWNvbnMvbGliL21kL2tleWJvYXJkLWFycm93LXJpZ2h0JztcblxuaW1wb3J0IHsgZGF0ZVRpbWVGb3JtYXQsIEdyYWZhbmFUaGVtZTIsIFRpbWVab25lIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IsIFRVcGRhdGVWaWV3UmFuZ2VUaW1lRnVuY3Rpb24sIFZpZXdSYW5nZSwgVmlld1JhbmdlVGltZVVwZGF0ZSB9IGZyb20gJy4uJztcbmltcG9ydCBFeHRlcm5hbExpbmtzIGZyb20gJy4uL2NvbW1vbi9FeHRlcm5hbExpbmtzJztcbmltcG9ydCBMYWJlbGVkTGlzdCBmcm9tICcuLi9jb21tb24vTGFiZWxlZExpc3QnO1xuaW1wb3J0IFRyYWNlTmFtZSBmcm9tICcuLi9jb21tb24vVHJhY2VOYW1lJztcbmltcG9ydCB7IGdldFRyYWNlTGlua3MgfSBmcm9tICcuLi9tb2RlbC9saW5rLXBhdHRlcm5zJztcbmltcG9ydCB7IGdldFRyYWNlTmFtZSB9IGZyb20gJy4uL21vZGVsL3RyYWNlLXZpZXdlcic7XG5pbXBvcnQgeyBUcmFjZSB9IGZyb20gJy4uL3R5cGVzL3RyYWNlJztcbmltcG9ydCB7IHVUeE11dGVkIH0gZnJvbSAnLi4vdWJlclV0aWxpdHlTdHlsZXMnO1xuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24gfSBmcm9tICcuLi91dGlscy9kYXRlJztcblxuaW1wb3J0IFNwYW5HcmFwaCBmcm9tICcuL1NwYW5HcmFwaCc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIFRyYWNlUGFnZUhlYWRlcjogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlcjtcbiAgICAgICYgPiA6Zmlyc3QtY2hpbGQge1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjZThlOGU4Jyl9O1xuICAgICAgfVxuICAgICAgJiA+IDpudGgtY2hpbGQoMikge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyNlZWUnKX07XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNlNGU0ZTQnKX07XG4gICAgICB9XG4gICAgICAmID4gOmxhc3QtY2hpbGQge1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjY2NjJyl9O1xuICAgICAgfVxuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyVGl0bGVSb3c6IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJUaXRsZVJvdztcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyQmFjazogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlckJhY2s7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbiAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNkZGQ7XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206IC0xcHg7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjY2NjO1xuICAgICAgfVxuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyVGl0bGVMaW5rOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyVGl0bGVMaW5rO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4OiAxO1xuXG4gICAgICAmOmhvdmVyICoge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIH1cbiAgICAgICY6aG92ZXIgPiAqLFxuICAgICAgJjpob3ZlciBzbWFsbCB7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgIH1cbiAgICAgIC8qIEFkYXB0IHN0eWxlcyB3aGVuIGNoYW5naW5nIGZyb20gYSBlbGVtZW50IGludG8gYnV0dG9uICovXG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGU6IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGU7XG4gICAgICBmb250LXNpemU6IDIuNXJlbTtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjA3cyBlYXNlLW91dDtcbiAgICBgLFxuICAgIFRyYWNlUGFnZUhlYWRlckRldGFpbFRvZ2dsZUV4cGFuZGVkOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyRGV0YWlsVG9nZ2xlRXhwYW5kZWQ7XG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJUaXRsZTogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlclRpdGxlO1xuICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICBmbGV4OiAxO1xuICAgICAgZm9udC1zaXplOiAxLjdlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XG4gICAgICBtYXJnaW46IDAgMCAwIDAuNWVtO1xuICAgICAgcGFkZGluZy1ib3R0b206IDAuNWVtO1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyVGl0bGVDb2xsYXBzaWJsZTogY3NzYFxuICAgICAgbGFiZWw6IFRyYWNlUGFnZUhlYWRlclRpdGxlQ29sbGFwc2libGU7XG4gICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBgLFxuICAgIFRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbXM6IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1zO1xuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNGU0ZTQ7XG4gICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbSAhaW1wb3J0YW50O1xuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtVmFsdWVEZXRhaWw6IGN4KFxuICAgICAgY3NzYFxuICAgICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtVmFsdWVEZXRhaWw7XG4gICAgICAgIGNvbG9yOiAjYWFhO1xuICAgICAgYCxcbiAgICAgICd0cmFjZS1pdGVtLXZhbHVlLWRldGFpbCdcbiAgICApLFxuICAgIFRyYWNlUGFnZUhlYWRlck92ZXJ2aWV3SXRlbVZhbHVlOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtVmFsdWU7XG4gICAgICAmOmhvdmVyID4gLnRyYWNlLWl0ZW0tdmFsdWUtZGV0YWlsIHtcbiAgICAgICAgY29sb3I6IHVuc2V0O1xuICAgICAgfVxuICAgIGAsXG4gICAgVHJhY2VQYWdlSGVhZGVyQXJjaGl2ZUljb246IGNzc2BcbiAgICAgIGxhYmVsOiBUcmFjZVBhZ2VIZWFkZXJBcmNoaXZlSWNvbjtcbiAgICAgIGZvbnQtc2l6ZTogMS43OGVtO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwLjE1ZW07XG4gICAgYCxcbiAgICBUcmFjZVBhZ2VIZWFkZXJUcmFjZUlkOiBjc3NgXG4gICAgICBsYWJlbDogVHJhY2VQYWdlSGVhZGVyVHJhY2VJZDtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgYCxcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIFRyYWNlUGFnZUhlYWRlckVtYmVkUHJvcHMgPSB7XG4gIGNhbkNvbGxhcHNlOiBib29sZWFuO1xuICBoaWRlTWFwOiBib29sZWFuO1xuICBoaWRlU3VtbWFyeTogYm9vbGVhbjtcbiAgb25TbGltVmlld0NsaWNrZWQ6ICgpID0+IHZvaWQ7XG4gIG9uVHJhY2VHcmFwaFZpZXdDbGlja2VkOiAoKSA9PiB2b2lkO1xuICBzbGltVmlldzogYm9vbGVhbjtcbiAgdHJhY2U6IFRyYWNlIHwgbnVsbDtcbiAgdXBkYXRlTmV4dFZpZXdSYW5nZVRpbWU6ICh1cGRhdGU6IFZpZXdSYW5nZVRpbWVVcGRhdGUpID0+IHZvaWQ7XG4gIHVwZGF0ZVZpZXdSYW5nZVRpbWU6IFRVcGRhdGVWaWV3UmFuZ2VUaW1lRnVuY3Rpb247XG4gIHZpZXdSYW5nZTogVmlld1JhbmdlO1xuICB0aW1lWm9uZTogVGltZVpvbmU7XG59O1xuXG5leHBvcnQgY29uc3QgSEVBREVSX0lURU1TID0gW1xuICB7XG4gICAga2V5OiAndGltZXN0YW1wJyxcbiAgICBsYWJlbDogJ1RyYWNlIFN0YXJ0OicsXG4gICAgcmVuZGVyZXIodHJhY2U6IFRyYWNlLCB0aW1lWm9uZTogVGltZVpvbmUsIHN0eWxlczogUmV0dXJuVHlwZTx0eXBlb2YgZ2V0U3R5bGVzPikge1xuICAgICAgLy8gQ29udmVydCBkYXRlIGZyb20gbWljcm8gdG8gbWlsbGkgc2Vjb25kc1xuICAgICAgY29uc3QgZGF0ZVN0ciA9IGRhdGVUaW1lRm9ybWF0KHRyYWNlLnN0YXJ0VGltZSAvIDEwMDAsIHsgdGltZVpvbmUsIGRlZmF1bHRXaXRoTVM6IHRydWUgfSk7XG4gICAgICBjb25zdCBtYXRjaCA9IGRhdGVTdHIubWF0Y2goL14oLispKDpcXGRcXGRcXC5cXGQrKSQvKTtcbiAgICAgIHJldHVybiBtYXRjaCA/IChcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuVHJhY2VQYWdlSGVhZGVyT3ZlcnZpZXdJdGVtVmFsdWV9PlxuICAgICAgICAgIHttYXRjaFsxXX1cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1WYWx1ZURldGFpbH0+e21hdGNoWzJdfTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKSA6IChcbiAgICAgICAgZGF0ZVN0clxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuICB7XG4gICAga2V5OiAnZHVyYXRpb24nLFxuICAgIGxhYmVsOiAnRHVyYXRpb246JyxcbiAgICByZW5kZXJlcjogKHRyYWNlOiBUcmFjZSkgPT4gZm9ybWF0RHVyYXRpb24odHJhY2UuZHVyYXRpb24pLFxuICB9LFxuICB7XG4gICAga2V5OiAnc2VydmljZS1jb3VudCcsXG4gICAgbGFiZWw6ICdTZXJ2aWNlczonLFxuICAgIHJlbmRlcmVyOiAodHJhY2U6IFRyYWNlKSA9PiBuZXcgU2V0KF92YWx1ZXModHJhY2UucHJvY2Vzc2VzKS5tYXAoKHApID0+IHAuc2VydmljZU5hbWUpKS5zaXplLFxuICB9LFxuICB7XG4gICAga2V5OiAnZGVwdGgnLFxuICAgIGxhYmVsOiAnRGVwdGg6JyxcbiAgICByZW5kZXJlcjogKHRyYWNlOiBUcmFjZSkgPT4gX2dldChfbWF4QnkodHJhY2Uuc3BhbnMsICdkZXB0aCcpLCAnZGVwdGgnLCAwKSArIDEsXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdzcGFuLWNvdW50JyxcbiAgICBsYWJlbDogJ1RvdGFsIFNwYW5zOicsXG4gICAgcmVuZGVyZXI6ICh0cmFjZTogVHJhY2UpID0+IHRyYWNlLnNwYW5zLmxlbmd0aCxcbiAgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRyYWNlUGFnZUhlYWRlcihwcm9wczogVHJhY2VQYWdlSGVhZGVyRW1iZWRQcm9wcykge1xuICBjb25zdCB7XG4gICAgY2FuQ29sbGFwc2UsXG4gICAgaGlkZU1hcCxcbiAgICBoaWRlU3VtbWFyeSxcbiAgICBvblNsaW1WaWV3Q2xpY2tlZCxcbiAgICBzbGltVmlldyxcbiAgICB0cmFjZSxcbiAgICB1cGRhdGVOZXh0Vmlld1JhbmdlVGltZSxcbiAgICB1cGRhdGVWaWV3UmFuZ2VUaW1lLFxuICAgIHZpZXdSYW5nZSxcbiAgICB0aW1lWm9uZSxcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcbiAgY29uc3QgbGlua3MgPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXRyYWNlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBnZXRUcmFjZUxpbmtzKHRyYWNlKTtcbiAgfSwgW3RyYWNlXSk7XG5cbiAgaWYgKCF0cmFjZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgc3VtbWFyeUl0ZW1zID1cbiAgICAhaGlkZVN1bW1hcnkgJiZcbiAgICAhc2xpbVZpZXcgJiZcbiAgICBIRUFERVJfSVRFTVMubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCB7IHJlbmRlcmVyLCAuLi5yZXN0IH0gPSBpdGVtO1xuICAgICAgcmV0dXJuIHsgLi4ucmVzdCwgdmFsdWU6IHJlbmRlcmVyKHRyYWNlLCB0aW1lWm9uZSwgc3R5bGVzKSB9O1xuICAgIH0pO1xuXG4gIGNvbnN0IHRpdGxlID0gKFxuICAgIDxoMSBjbGFzc05hbWU9e2N4KHN0eWxlcy5UcmFjZVBhZ2VIZWFkZXJUaXRsZSwgY2FuQ29sbGFwc2UgJiYgc3R5bGVzLlRyYWNlUGFnZUhlYWRlclRpdGxlQ29sbGFwc2libGUpfT5cbiAgICAgIDxUcmFjZU5hbWUgdHJhY2VOYW1lPXtnZXRUcmFjZU5hbWUodHJhY2Uuc3BhbnMpfSAvPnsnICd9XG4gICAgICA8c21hbGwgY2xhc3NOYW1lPXtjeChzdHlsZXMuVHJhY2VQYWdlSGVhZGVyVHJhY2VJZCwgdVR4TXV0ZWQpfT57dHJhY2UudHJhY2VJRH08L3NtYWxsPlxuICAgIDwvaDE+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT17c3R5bGVzLlRyYWNlUGFnZUhlYWRlcn0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRyYWNlUGFnZUhlYWRlclRpdGxlUm93fT5cbiAgICAgICAge2xpbmtzICYmIGxpbmtzLmxlbmd0aCA+IDAgJiYgPEV4dGVybmFsTGlua3MgbGlua3M9e2xpbmtzfSBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJCYWNrfSAvPn1cbiAgICAgICAge2NhbkNvbGxhcHNlID8gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVHJhY2VQYWdlSGVhZGVyVGl0bGVMaW5rfVxuICAgICAgICAgICAgb25DbGljaz17b25TbGltVmlld0NsaWNrZWR9XG4gICAgICAgICAgICByb2xlPVwic3dpdGNoXCJcbiAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17IXNsaW1WaWV3fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNZEtleWJvYXJkQXJyb3dSaWdodFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICAgICAgICAgIHN0eWxlcy5UcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGUsXG4gICAgICAgICAgICAgICAgIXNsaW1WaWV3ICYmIHN0eWxlcy5UcmFjZVBhZ2VIZWFkZXJEZXRhaWxUb2dnbGVFeHBhbmRlZFxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICB0aXRsZVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICB7c3VtbWFyeUl0ZW1zICYmIDxMYWJlbGVkTGlzdCBjbGFzc05hbWU9e3N0eWxlcy5UcmFjZVBhZ2VIZWFkZXJPdmVydmlld0l0ZW1zfSBpdGVtcz17c3VtbWFyeUl0ZW1zfSAvPn1cbiAgICAgIHshaGlkZU1hcCAmJiAhc2xpbVZpZXcgJiYgKFxuICAgICAgICA8U3BhbkdyYXBoXG4gICAgICAgICAgdHJhY2U9e3RyYWNlfVxuICAgICAgICAgIHZpZXdSYW5nZT17dmlld1JhbmdlfVxuICAgICAgICAgIHVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lPXt1cGRhdGVOZXh0Vmlld1JhbmdlVGltZX1cbiAgICAgICAgICB1cGRhdGVWaWV3UmFuZ2VUaW1lPXt1cGRhdGVWaWV3UmFuZ2VUaW1lfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2hlYWRlcj5c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