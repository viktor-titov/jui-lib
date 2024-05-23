import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject;
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
import React from 'react';
import { IconButton, useStyles2 } from '@grafana/ui';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = function getStyles() {
  return {
    TimelineCollapser: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      align-items: center;\n      display: flex;\n      flex: none;\n      justify-content: center;\n      margin-right: 0.5rem;\n    "])))
  };
};
export function TimelineCollapser(props) {
  var onExpandAll = props.onExpandAll,
    onExpandOne = props.onExpandOne,
    onCollapseAll = props.onCollapseAll,
    onCollapseOne = props.onCollapseOne;
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsxs("div", {
    className: styles.TimelineCollapser,
    "data-testid": "TimelineCollapser",
    children: [/*#__PURE__*/_jsx(IconButton, {
      tooltip: "Expand +1",
      size: "xl",
      tooltipPlacement: "top",
      name: "angle-down",
      onClick: onExpandOne
    }), /*#__PURE__*/_jsx(IconButton, {
      tooltip: "Collapse +1",
      size: "xl",
      tooltipPlacement: "top",
      name: "angle-right",
      onClick: onCollapseOne
    }), /*#__PURE__*/_jsx(IconButton, {
      tooltip: "Expand All",
      size: "xl",
      tooltipPlacement: "top",
      name: "angle-double-down",
      onClick: onExpandAll
    }), /*#__PURE__*/_jsx(IconButton, {
      tooltip: "Collapse All",
      size: "xl",
      tooltipPlacement: "top",
      name: "angle-double-right",
      onClick: onCollapseAll
    })]
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJSZWFjdCIsIkljb25CdXR0b24iLCJ1c2VTdHlsZXMyIiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsImdldFN0eWxlcyIsIlRpbWVsaW5lQ29sbGFwc2VyIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwicHJvcHMiLCJvbkV4cGFuZEFsbCIsIm9uRXhwYW5kT25lIiwib25Db2xsYXBzZUFsbCIsIm9uQ29sbGFwc2VPbmUiLCJzdHlsZXMiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsInRvb2x0aXAiLCJzaXplIiwidG9vbHRpcFBsYWNlbWVudCIsIm5hbWUiLCJvbkNsaWNrIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1RyYWNlVGltZWxpbmVWaWV3ZXIvVGltZWxpbmVIZWFkZXJSb3cvVGltZWxpbmVDb2xsYXBzZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgSWNvbkJ1dHRvbiwgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIFRpbWVsaW5lQ29sbGFwc2VyOiBjc3NgXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXg6IG5vbmU7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xuICAgIGAsXG4gIH07XG59O1xuXG50eXBlIENvbGxhcHNlclByb3BzID0ge1xuICBvbkNvbGxhcHNlQWxsOiAoKSA9PiB2b2lkO1xuICBvbkNvbGxhcHNlT25lOiAoKSA9PiB2b2lkO1xuICBvbkV4cGFuZE9uZTogKCkgPT4gdm9pZDtcbiAgb25FeHBhbmRBbGw6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gVGltZWxpbmVDb2xsYXBzZXIocHJvcHM6IENvbGxhcHNlclByb3BzKSB7XG4gIGNvbnN0IHsgb25FeHBhbmRBbGwsIG9uRXhwYW5kT25lLCBvbkNvbGxhcHNlQWxsLCBvbkNvbGxhcHNlT25lIH0gPSBwcm9wcztcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGltZWxpbmVDb2xsYXBzZXJ9IGRhdGEtdGVzdGlkPVwiVGltZWxpbmVDb2xsYXBzZXJcIj5cbiAgICAgIDxJY29uQnV0dG9uIHRvb2x0aXA9XCJFeHBhbmQgKzFcIiBzaXplPVwieGxcIiB0b29sdGlwUGxhY2VtZW50PVwidG9wXCIgbmFtZT1cImFuZ2xlLWRvd25cIiBvbkNsaWNrPXtvbkV4cGFuZE9uZX0gLz5cbiAgICAgIDxJY29uQnV0dG9uIHRvb2x0aXA9XCJDb2xsYXBzZSArMVwiIHNpemU9XCJ4bFwiIHRvb2x0aXBQbGFjZW1lbnQ9XCJ0b3BcIiBuYW1lPVwiYW5nbGUtcmlnaHRcIiBvbkNsaWNrPXtvbkNvbGxhcHNlT25lfSAvPlxuICAgICAgPEljb25CdXR0b25cbiAgICAgICAgdG9vbHRpcD1cIkV4cGFuZCBBbGxcIlxuICAgICAgICBzaXplPVwieGxcIlxuICAgICAgICB0b29sdGlwUGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgbmFtZT1cImFuZ2xlLWRvdWJsZS1kb3duXCJcbiAgICAgICAgb25DbGljaz17b25FeHBhbmRBbGx9XG4gICAgICAvPlxuICAgICAgPEljb25CdXR0b25cbiAgICAgICAgdG9vbHRpcD1cIkNvbGxhcHNlIEFsbFwiXG4gICAgICAgIHNpemU9XCJ4bFwiXG4gICAgICAgIHRvb2x0aXBQbGFjZW1lbnQ9XCJ0b3BcIlxuICAgICAgICBuYW1lPVwiYW5nbGUtZG91YmxlLXJpZ2h0XCJcbiAgICAgICAgb25DbGljaz17b25Db2xsYXBzZUFsbH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsU0FBU0MsVUFBVSxFQUFFQyxVQUFVLFFBQVEsYUFBYTtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQSxFQUFBQyxJQUFBLElBQUFDLEtBQUE7QUFFckQsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUEsRUFBUztFQUN0QixPQUFPO0lBQ0xDLGlCQUFpQixFQUFFVCxHQUFHLENBQUFVLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQTtFQU94QixDQUFDO0FBQ0gsQ0FBQztBQVNELE9BQU8sU0FBU0YsaUJBQWlCQSxDQUFDRyxLQUFxQixFQUFFO0VBQ3ZELElBQVFDLFdBQVcsR0FBZ0RELEtBQUssQ0FBaEVDLFdBQVc7SUFBRUMsV0FBVyxHQUFtQ0YsS0FBSyxDQUFuREUsV0FBVztJQUFFQyxhQUFhLEdBQW9CSCxLQUFLLENBQXRDRyxhQUFhO0lBQUVDLGFBQWEsR0FBS0osS0FBSyxDQUF2QkksYUFBYTtFQUM5RCxJQUFNQyxNQUFNLEdBQUdkLFVBQVUsQ0FBQ0ssU0FBUyxDQUFDO0VBQ3BDLG9CQUNFRCxLQUFBO0lBQUtXLFNBQVMsRUFBRUQsTUFBTSxDQUFDUixpQkFBa0I7SUFBQyxlQUFZLG1CQUFtQjtJQUFBVSxRQUFBLGdCQUN2RWQsSUFBQSxDQUFDSCxVQUFVO01BQUNrQixPQUFPLEVBQUMsV0FBVztNQUFDQyxJQUFJLEVBQUMsSUFBSTtNQUFDQyxnQkFBZ0IsRUFBQyxLQUFLO01BQUNDLElBQUksRUFBQyxZQUFZO01BQUNDLE9BQU8sRUFBRVY7SUFBWSxDQUFFLENBQUMsZUFDM0dULElBQUEsQ0FBQ0gsVUFBVTtNQUFDa0IsT0FBTyxFQUFDLGFBQWE7TUFBQ0MsSUFBSSxFQUFDLElBQUk7TUFBQ0MsZ0JBQWdCLEVBQUMsS0FBSztNQUFDQyxJQUFJLEVBQUMsYUFBYTtNQUFDQyxPQUFPLEVBQUVSO0lBQWMsQ0FBRSxDQUFDLGVBQ2hIWCxJQUFBLENBQUNILFVBQVU7TUFDVGtCLE9BQU8sRUFBQyxZQUFZO01BQ3BCQyxJQUFJLEVBQUMsSUFBSTtNQUNUQyxnQkFBZ0IsRUFBQyxLQUFLO01BQ3RCQyxJQUFJLEVBQUMsbUJBQW1CO01BQ3hCQyxPQUFPLEVBQUVYO0lBQVksQ0FDdEIsQ0FBQyxlQUNGUixJQUFBLENBQUNILFVBQVU7TUFDVGtCLE9BQU8sRUFBQyxjQUFjO01BQ3RCQyxJQUFJLEVBQUMsSUFBSTtNQUNUQyxnQkFBZ0IsRUFBQyxLQUFLO01BQ3RCQyxJQUFJLEVBQUMsb0JBQW9CO01BQ3pCQyxPQUFPLEVBQUVUO0lBQWMsQ0FDeEIsQ0FBQztFQUFBLENBQ0MsQ0FBQztBQUVWIiwiaWdub3JlTGlzdCI6W119