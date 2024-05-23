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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJSZWFjdCIsIkljb25CdXR0b24iLCJ1c2VTdHlsZXMyIiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsImdldFN0eWxlcyIsIlRpbWVsaW5lQ29sbGFwc2VyIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwicHJvcHMiLCJvbkV4cGFuZEFsbCIsIm9uRXhwYW5kT25lIiwib25Db2xsYXBzZUFsbCIsIm9uQ29sbGFwc2VPbmUiLCJzdHlsZXMiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsInRvb2x0aXAiLCJzaXplIiwidG9vbHRpcFBsYWNlbWVudCIsIm5hbWUiLCJvbkNsaWNrIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVRpbWVsaW5lVmlld2VyL1RpbWVsaW5lSGVhZGVyUm93L1RpbWVsaW5lQ29sbGFwc2VyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEljb25CdXR0b24sIHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBUaW1lbGluZUNvbGxhcHNlcjogY3NzYFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4OiBub25lO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgICBgLFxuICB9O1xufTtcblxudHlwZSBDb2xsYXBzZXJQcm9wcyA9IHtcbiAgb25Db2xsYXBzZUFsbDogKCkgPT4gdm9pZDtcbiAgb25Db2xsYXBzZU9uZTogKCkgPT4gdm9pZDtcbiAgb25FeHBhbmRPbmU6ICgpID0+IHZvaWQ7XG4gIG9uRXhwYW5kQWxsOiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFRpbWVsaW5lQ29sbGFwc2VyKHByb3BzOiBDb2xsYXBzZXJQcm9wcykge1xuICBjb25zdCB7IG9uRXhwYW5kQWxsLCBvbkV4cGFuZE9uZSwgb25Db2xsYXBzZUFsbCwgb25Db2xsYXBzZU9uZSB9ID0gcHJvcHM7XG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRpbWVsaW5lQ29sbGFwc2VyfSBkYXRhLXRlc3RpZD1cIlRpbWVsaW5lQ29sbGFwc2VyXCI+XG4gICAgICA8SWNvbkJ1dHRvbiB0b29sdGlwPVwiRXhwYW5kICsxXCIgc2l6ZT1cInhsXCIgdG9vbHRpcFBsYWNlbWVudD1cInRvcFwiIG5hbWU9XCJhbmdsZS1kb3duXCIgb25DbGljaz17b25FeHBhbmRPbmV9IC8+XG4gICAgICA8SWNvbkJ1dHRvbiB0b29sdGlwPVwiQ29sbGFwc2UgKzFcIiBzaXplPVwieGxcIiB0b29sdGlwUGxhY2VtZW50PVwidG9wXCIgbmFtZT1cImFuZ2xlLXJpZ2h0XCIgb25DbGljaz17b25Db2xsYXBzZU9uZX0gLz5cbiAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgIHRvb2x0aXA9XCJFeHBhbmQgQWxsXCJcbiAgICAgICAgc2l6ZT1cInhsXCJcbiAgICAgICAgdG9vbHRpcFBsYWNlbWVudD1cInRvcFwiXG4gICAgICAgIG5hbWU9XCJhbmdsZS1kb3VibGUtZG93blwiXG4gICAgICAgIG9uQ2xpY2s9e29uRXhwYW5kQWxsfVxuICAgICAgLz5cbiAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgIHRvb2x0aXA9XCJDb2xsYXBzZSBBbGxcIlxuICAgICAgICBzaXplPVwieGxcIlxuICAgICAgICB0b29sdGlwUGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgbmFtZT1cImFuZ2xlLWRvdWJsZS1yaWdodFwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ29sbGFwc2VBbGx9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBRXpCLFNBQVNDLFVBQVUsRUFBRUMsVUFBVSxRQUFRLGFBQWE7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBRXJELElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFBLEVBQVM7RUFDdEIsT0FBTztJQUNMQyxpQkFBaUIsRUFBRVQsR0FBRyxDQUFBVSxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsMkJBQUE7RUFPeEIsQ0FBQztBQUNILENBQUM7QUFTRCxPQUFPLFNBQVNGLGlCQUFpQkEsQ0FBQ0csS0FBcUIsRUFBRTtFQUN2RCxJQUFRQyxXQUFXLEdBQWdERCxLQUFLLENBQWhFQyxXQUFXO0lBQUVDLFdBQVcsR0FBbUNGLEtBQUssQ0FBbkRFLFdBQVc7SUFBRUMsYUFBYSxHQUFvQkgsS0FBSyxDQUF0Q0csYUFBYTtJQUFFQyxhQUFhLEdBQUtKLEtBQUssQ0FBdkJJLGFBQWE7RUFDOUQsSUFBTUMsTUFBTSxHQUFHZCxVQUFVLENBQUNLLFNBQVMsQ0FBQztFQUNwQyxvQkFDRUQsS0FBQTtJQUFLVyxTQUFTLEVBQUVELE1BQU0sQ0FBQ1IsaUJBQWtCO0lBQUMsZUFBWSxtQkFBbUI7SUFBQVUsUUFBQSxnQkFDdkVkLElBQUEsQ0FBQ0gsVUFBVTtNQUFDa0IsT0FBTyxFQUFDLFdBQVc7TUFBQ0MsSUFBSSxFQUFDLElBQUk7TUFBQ0MsZ0JBQWdCLEVBQUMsS0FBSztNQUFDQyxJQUFJLEVBQUMsWUFBWTtNQUFDQyxPQUFPLEVBQUVWO0lBQVksQ0FBRSxDQUFDLGVBQzNHVCxJQUFBLENBQUNILFVBQVU7TUFBQ2tCLE9BQU8sRUFBQyxhQUFhO01BQUNDLElBQUksRUFBQyxJQUFJO01BQUNDLGdCQUFnQixFQUFDLEtBQUs7TUFBQ0MsSUFBSSxFQUFDLGFBQWE7TUFBQ0MsT0FBTyxFQUFFUjtJQUFjLENBQUUsQ0FBQyxlQUNoSFgsSUFBQSxDQUFDSCxVQUFVO01BQ1RrQixPQUFPLEVBQUMsWUFBWTtNQUNwQkMsSUFBSSxFQUFDLElBQUk7TUFDVEMsZ0JBQWdCLEVBQUMsS0FBSztNQUN0QkMsSUFBSSxFQUFDLG1CQUFtQjtNQUN4QkMsT0FBTyxFQUFFWDtJQUFZLENBQ3RCLENBQUMsZUFDRlIsSUFBQSxDQUFDSCxVQUFVO01BQ1RrQixPQUFPLEVBQUMsY0FBYztNQUN0QkMsSUFBSSxFQUFDLElBQUk7TUFDVEMsZ0JBQWdCLEVBQUMsS0FBSztNQUN0QkMsSUFBSSxFQUFDLG9CQUFvQjtNQUN6QkMsT0FBTyxFQUFFVDtJQUFjLENBQ3hCLENBQUM7RUFBQSxDQUNDLENBQUM7QUFFViIsImlnbm9yZUxpc3QiOltdfQ==