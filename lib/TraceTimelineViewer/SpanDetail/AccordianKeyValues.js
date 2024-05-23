import _extends from "@babel/runtime/helpers/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
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
import * as React from 'react';
import IoIosArrowDown from 'react-icons/lib/io/ios-arrow-down';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';
import { useStyles2 } from '@grafana/ui';
import { autoColor } from '../../Theme';
import { uAlignIcon, uTxEllipsis } from '../../uberUtilityStyles';
import * as markers from './AccordianKeyValues.markers';
import KeyValuesTable from './KeyValuesTable';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var getStyles = function getStyles(theme) {
  return {
    header: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: header;\n      cursor: pointer;\n      overflow: hidden;\n      padding: 0.25em 0.1em;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      &:hover {\n        background: ", ";\n      }\n    "])), autoColor(theme, '#e8e8e8')),
    headerEmpty: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: headerEmpty;\n      background: none;\n      cursor: initial;\n    "]))),
    headerHighContrast: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: headerHighContrast;\n      &:hover {\n        background: ", ";\n      }\n    "])), autoColor(theme, '#ddd')),
    emptyIcon: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: emptyIcon;\n      color: ", ";\n    "])), autoColor(theme, '#aaa')),
    summary: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: summary;\n      display: inline;\n      list-style: none;\n      padding: 0;\n    "]))),
    summaryItem: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      label: summaryItem;\n      display: inline;\n      margin-left: 0.7em;\n      padding-right: 0.5rem;\n      border-right: 1px solid ", ";\n      &:last-child {\n        padding-right: 0;\n        border-right: none;\n      }\n    "])), autoColor(theme, '#ddd')),
    summaryLabel: css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n      label: summaryLabel;\n      color: ", ";\n    "])), autoColor(theme, '#777')),
    summaryDelim: css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n      label: summaryDelim;\n      color: ", ";\n      padding: 0 0.2em;\n    "])), autoColor(theme, '#bbb'))
  };
};
// export for tests
export function KeyValuesSummary(props) {
  var data = props.data;
  var styles = useStyles2(getStyles);
  if (!Array.isArray(data) || !data.length) {
    return null;
  }
  return /*#__PURE__*/_jsx("ul", {
    className: styles.summary,
    children: data.map(function (item, i) {
      return (
        /*#__PURE__*/
        // `i` is necessary in the key because item.key can repeat
        _jsxs("li", {
          className: styles.summaryItem,
          children: [/*#__PURE__*/_jsx("span", {
            className: styles.summaryLabel,
            children: item.key
          }), /*#__PURE__*/_jsx("span", {
            className: styles.summaryDelim,
            children: "="
          }), String(item.value)]
        }, item.key + "-" + i)
      );
    })
  });
}
KeyValuesSummary.defaultProps = {
  data: null
};
export default function AccordianKeyValues(props) {
  var _cx, _cx2;
  var className = props.className,
    data = props.data,
    highContrast = props.highContrast,
    interactive = props.interactive,
    isOpen = props.isOpen,
    label = props.label,
    linksGetter = props.linksGetter,
    onToggle = props.onToggle;
  var isEmpty = !Array.isArray(data) || !data.length;
  var styles = useStyles2(getStyles);
  var iconCls = cx(uAlignIcon, (_cx = {}, _cx[styles.emptyIcon] = isEmpty, _cx));
  var arrow = null;
  var headerProps = null;
  if (interactive) {
    arrow = isOpen ? /*#__PURE__*/_jsx(IoIosArrowDown, {
      className: iconCls
    }) : /*#__PURE__*/_jsx(IoIosArrowRight, {
      className: iconCls
    });
    headerProps = {
      'aria-checked': isOpen,
      onClick: isEmpty ? null : onToggle,
      role: 'switch'
    };
  }
  return /*#__PURE__*/_jsxs("div", {
    className: cx(className, uTxEllipsis),
    children: [/*#__PURE__*/_jsxs("div", _extends({
      className: cx(styles.header, (_cx2 = {}, _cx2[styles.headerEmpty] = isEmpty, _cx2[styles.headerHighContrast] = highContrast && !isEmpty, _cx2))
    }, headerProps, {
      "data-testid": "AccordianKeyValues--header",
      children: [arrow, /*#__PURE__*/_jsxs("strong", {
        "data-test": markers.LABEL,
        children: [label, isOpen || ':']
      }), !isOpen && /*#__PURE__*/_jsx(KeyValuesSummary, {
        data: data
      })]
    })), isOpen && /*#__PURE__*/_jsx(KeyValuesTable, {
      data: data,
      linksGetter: linksGetter
    })]
  });
}
AccordianKeyValues.defaultProps = {
  className: null,
  highContrast: false,
  interactive: true,
  onToggle: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwiSW9Jb3NBcnJvd0Rvd24iLCJJb0lvc0Fycm93UmlnaHQiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwidUFsaWduSWNvbiIsInVUeEVsbGlwc2lzIiwibWFya2VycyIsIktleVZhbHVlc1RhYmxlIiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsImdldFN0eWxlcyIsInRoZW1lIiwiaGVhZGVyIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiaGVhZGVyRW1wdHkiLCJfdGVtcGxhdGVPYmplY3QyIiwiaGVhZGVySGlnaENvbnRyYXN0IiwiX3RlbXBsYXRlT2JqZWN0MyIsImVtcHR5SWNvbiIsIl90ZW1wbGF0ZU9iamVjdDQiLCJzdW1tYXJ5IiwiX3RlbXBsYXRlT2JqZWN0NSIsInN1bW1hcnlJdGVtIiwiX3RlbXBsYXRlT2JqZWN0NiIsInN1bW1hcnlMYWJlbCIsIl90ZW1wbGF0ZU9iamVjdDciLCJzdW1tYXJ5RGVsaW0iLCJfdGVtcGxhdGVPYmplY3Q4IiwiS2V5VmFsdWVzU3VtbWFyeSIsInByb3BzIiwiZGF0YSIsInN0eWxlcyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwibWFwIiwiaXRlbSIsImkiLCJrZXkiLCJTdHJpbmciLCJ2YWx1ZSIsImRlZmF1bHRQcm9wcyIsIkFjY29yZGlhbktleVZhbHVlcyIsIl9jeCIsIl9jeDIiLCJoaWdoQ29udHJhc3QiLCJpbnRlcmFjdGl2ZSIsImlzT3BlbiIsImxhYmVsIiwibGlua3NHZXR0ZXIiLCJvblRvZ2dsZSIsImlzRW1wdHkiLCJpY29uQ2xzIiwiYXJyb3ciLCJoZWFkZXJQcm9wcyIsIm9uQ2xpY2siLCJyb2xlIiwiX2V4dGVuZHMiLCJMQUJFTCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5EZXRhaWwvQWNjb3JkaWFuS2V5VmFsdWVzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJb0lvc0Fycm93RG93biBmcm9tICdyZWFjdC1pY29ucy9saWIvaW8vaW9zLWFycm93LWRvd24nO1xuaW1wb3J0IElvSW9zQXJyb3dSaWdodCBmcm9tICdyZWFjdC1pY29ucy9saWIvaW8vaW9zLWFycm93LXJpZ2h0JztcblxuaW1wb3J0IHsgR3JhZmFuYVRoZW1lMiB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgYXV0b0NvbG9yIH0gZnJvbSAnLi4vLi4vVGhlbWUnO1xuaW1wb3J0IHsgVE5pbCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IFRyYWNlS2V5VmFsdWVQYWlyLCBUcmFjZUxpbmsgfSBmcm9tICcuLi8uLi90eXBlcy90cmFjZSc7XG5pbXBvcnQgeyB1QWxpZ25JY29uLCB1VHhFbGxpcHNpcyB9IGZyb20gJy4uLy4uL3ViZXJVdGlsaXR5U3R5bGVzJztcblxuaW1wb3J0ICogYXMgbWFya2VycyBmcm9tICcuL0FjY29yZGlhbktleVZhbHVlcy5tYXJrZXJzJztcbmltcG9ydCBLZXlWYWx1ZXNUYWJsZSBmcm9tICcuL0tleVZhbHVlc1RhYmxlJztcblxuZXhwb3J0IGNvbnN0IGdldFN0eWxlcyA9ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIGhlYWRlcjogY3NzYFxuICAgICAgbGFiZWw6IGhlYWRlcjtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBwYWRkaW5nOiAwLjI1ZW0gMC4xZW07XG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZThlOGU4Jyl9O1xuICAgICAgfVxuICAgIGAsXG4gICAgaGVhZGVyRW1wdHk6IGNzc2BcbiAgICAgIGxhYmVsOiBoZWFkZXJFbXB0eTtcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICBjdXJzb3I6IGluaXRpYWw7XG4gICAgYCxcbiAgICBoZWFkZXJIaWdoQ29udHJhc3Q6IGNzc2BcbiAgICAgIGxhYmVsOiBoZWFkZXJIaWdoQ29udHJhc3Q7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZGRkJyl9O1xuICAgICAgfVxuICAgIGAsXG4gICAgZW1wdHlJY29uOiBjc3NgXG4gICAgICBsYWJlbDogZW1wdHlJY29uO1xuICAgICAgY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2FhYScpfTtcbiAgICBgLFxuICAgIHN1bW1hcnk6IGNzc2BcbiAgICAgIGxhYmVsOiBzdW1tYXJ5O1xuICAgICAgZGlzcGxheTogaW5saW5lO1xuICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgYCxcbiAgICBzdW1tYXJ5SXRlbTogY3NzYFxuICAgICAgbGFiZWw6IHN1bW1hcnlJdGVtO1xuICAgICAgZGlzcGxheTogaW5saW5lO1xuICAgICAgbWFyZ2luLWxlZnQ6IDAuN2VtO1xuICAgICAgcGFkZGluZy1yaWdodDogMC41cmVtO1xuICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjZGRkJyl9O1xuICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgfVxuICAgIGAsXG4gICAgc3VtbWFyeUxhYmVsOiBjc3NgXG4gICAgICBsYWJlbDogc3VtbWFyeUxhYmVsO1xuICAgICAgY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnIzc3NycpfTtcbiAgICBgLFxuICAgIHN1bW1hcnlEZWxpbTogY3NzYFxuICAgICAgbGFiZWw6IHN1bW1hcnlEZWxpbTtcbiAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyNiYmInKX07XG4gICAgICBwYWRkaW5nOiAwIDAuMmVtO1xuICAgIGAsXG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBBY2NvcmRpYW5LZXlWYWx1ZXNQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nIHwgVE5pbDtcbiAgZGF0YTogVHJhY2VLZXlWYWx1ZVBhaXJbXTtcbiAgaGlnaENvbnRyYXN0PzogYm9vbGVhbjtcbiAgaW50ZXJhY3RpdmU/OiBib29sZWFuO1xuICBpc09wZW46IGJvb2xlYW47XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGxpbmtzR2V0dGVyOiAoKHBhaXJzOiBUcmFjZUtleVZhbHVlUGFpcltdLCBpbmRleDogbnVtYmVyKSA9PiBUcmFjZUxpbmtbXSkgfCBUTmlsO1xuICBvblRvZ2dsZT86IG51bGwgfCAoKCkgPT4gdm9pZCk7XG59O1xuXG4vLyBleHBvcnQgZm9yIHRlc3RzXG5leHBvcnQgZnVuY3Rpb24gS2V5VmFsdWVzU3VtbWFyeShwcm9wczogeyBkYXRhPzogVHJhY2VLZXlWYWx1ZVBhaXJbXSB9KSB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gcHJvcHM7XG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgfHwgIWRhdGEubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDx1bCBjbGFzc05hbWU9e3N0eWxlcy5zdW1tYXJ5fT5cbiAgICAgIHtkYXRhLm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICAvLyBgaWAgaXMgbmVjZXNzYXJ5IGluIHRoZSBrZXkgYmVjYXVzZSBpdGVtLmtleSBjYW4gcmVwZWF0XG4gICAgICAgIDxsaSBjbGFzc05hbWU9e3N0eWxlcy5zdW1tYXJ5SXRlbX0ga2V5PXtgJHtpdGVtLmtleX0tJHtpfWB9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLnN1bW1hcnlMYWJlbH0+e2l0ZW0ua2V5fTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5zdW1tYXJ5RGVsaW19Pj08L3NwYW4+XG4gICAgICAgICAge1N0cmluZyhpdGVtLnZhbHVlKX1cbiAgICAgICAgPC9saT5cbiAgICAgICkpfVxuICAgIDwvdWw+XG4gICk7XG59XG5cbktleVZhbHVlc1N1bW1hcnkuZGVmYXVsdFByb3BzID0ge1xuICBkYXRhOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWNjb3JkaWFuS2V5VmFsdWVzKHByb3BzOiBBY2NvcmRpYW5LZXlWYWx1ZXNQcm9wcykge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgZGF0YSwgaGlnaENvbnRyYXN0LCBpbnRlcmFjdGl2ZSwgaXNPcGVuLCBsYWJlbCwgbGlua3NHZXR0ZXIsIG9uVG9nZ2xlIH0gPSBwcm9wcztcbiAgY29uc3QgaXNFbXB0eSA9ICFBcnJheS5pc0FycmF5KGRhdGEpIHx8ICFkYXRhLmxlbmd0aDtcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICBjb25zdCBpY29uQ2xzID0gY3godUFsaWduSWNvbiwgeyBbc3R5bGVzLmVtcHR5SWNvbl06IGlzRW1wdHkgfSk7XG4gIGxldCBhcnJvdzogUmVhY3QuUmVhY3ROb2RlIHwgbnVsbCA9IG51bGw7XG4gIGxldCBoZWFkZXJQcm9wczoge30gfCBudWxsID0gbnVsbDtcbiAgaWYgKGludGVyYWN0aXZlKSB7XG4gICAgYXJyb3cgPSBpc09wZW4gPyA8SW9Jb3NBcnJvd0Rvd24gY2xhc3NOYW1lPXtpY29uQ2xzfSAvPiA6IDxJb0lvc0Fycm93UmlnaHQgY2xhc3NOYW1lPXtpY29uQ2xzfSAvPjtcbiAgICBoZWFkZXJQcm9wcyA9IHtcbiAgICAgICdhcmlhLWNoZWNrZWQnOiBpc09wZW4sXG4gICAgICBvbkNsaWNrOiBpc0VtcHR5ID8gbnVsbCA6IG9uVG9nZ2xlLFxuICAgICAgcm9sZTogJ3N3aXRjaCcsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2N4KGNsYXNzTmFtZSwgdVR4RWxsaXBzaXMpfT5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjeChzdHlsZXMuaGVhZGVyLCB7XG4gICAgICAgICAgW3N0eWxlcy5oZWFkZXJFbXB0eV06IGlzRW1wdHksXG4gICAgICAgICAgW3N0eWxlcy5oZWFkZXJIaWdoQ29udHJhc3RdOiBoaWdoQ29udHJhc3QgJiYgIWlzRW1wdHksXG4gICAgICAgIH0pfVxuICAgICAgICB7Li4uaGVhZGVyUHJvcHN9XG4gICAgICAgIGRhdGEtdGVzdGlkPVwiQWNjb3JkaWFuS2V5VmFsdWVzLS1oZWFkZXJcIlxuICAgICAgPlxuICAgICAgICB7YXJyb3d9XG4gICAgICAgIDxzdHJvbmcgZGF0YS10ZXN0PXttYXJrZXJzLkxBQkVMfT5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgICAge2lzT3BlbiB8fCAnOid9XG4gICAgICAgIDwvc3Ryb25nPlxuICAgICAgICB7IWlzT3BlbiAmJiA8S2V5VmFsdWVzU3VtbWFyeSBkYXRhPXtkYXRhfSAvPn1cbiAgICAgIDwvZGl2PlxuICAgICAge2lzT3BlbiAmJiA8S2V5VmFsdWVzVGFibGUgZGF0YT17ZGF0YX0gbGlua3NHZXR0ZXI9e2xpbmtzR2V0dGVyfSAvPn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuQWNjb3JkaWFuS2V5VmFsdWVzLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2xhc3NOYW1lOiBudWxsLFxuICBoaWdoQ29udHJhc3Q6IGZhbHNlLFxuICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgb25Ub2dnbGU6IG51bGwsXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixPQUFPLEtBQUtDLEtBQUssTUFBTSxPQUFPO0FBQzlCLE9BQU9DLGNBQWMsTUFBTSxtQ0FBbUM7QUFDOUQsT0FBT0MsZUFBZSxNQUFNLG9DQUFvQztBQUdoRSxTQUFTQyxVQUFVLFFBQVEsYUFBYTtBQUV4QyxTQUFTQyxTQUFTLFFBQVEsYUFBYTtBQUd2QyxTQUFTQyxVQUFVLEVBQUVDLFdBQVcsUUFBUSx5QkFBeUI7QUFFakUsT0FBTyxLQUFLQyxPQUFPLE1BQU0sOEJBQThCO0FBQ3ZELE9BQU9DLGNBQWMsTUFBTSxrQkFBa0I7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBRTlDLE9BQU8sSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUlDLEtBQW9CLEVBQUs7RUFDakQsT0FBTztJQUNMQyxNQUFNLEVBQUVqQixHQUFHLENBQUFrQixlQUFBLEtBQUFBLGVBQUEsR0FBQUMsMkJBQUEscU9BUU9iLFNBQVMsQ0FBQ1UsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUU1QztJQUNESSxXQUFXLEVBQUVwQixHQUFHLENBQUFxQixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBRiwyQkFBQSwwRkFJZjtJQUNERyxrQkFBa0IsRUFBRXRCLEdBQUcsQ0FBQXVCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFKLDJCQUFBLHNHQUdMYixTQUFTLENBQUNVLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FFekM7SUFDRFEsU0FBUyxFQUFFeEIsR0FBRyxDQUFBeUIsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQU4sMkJBQUEsNERBRUhiLFNBQVMsQ0FBQ1UsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUNsQztJQUNEVSxPQUFPLEVBQUUxQixHQUFHLENBQUEyQixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBUiwyQkFBQSx5R0FLWDtJQUNEUyxXQUFXLEVBQUU1QixHQUFHLENBQUE2QixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBViwyQkFBQSx1UEFLWWIsU0FBUyxDQUFDVSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBS25EO0lBQ0RjLFlBQVksRUFBRTlCLEdBQUcsQ0FBQStCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFaLDJCQUFBLCtEQUVOYixTQUFTLENBQUNVLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FDbEM7SUFDRGdCLFlBQVksRUFBRWhDLEdBQUcsQ0FBQWlDLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFkLDJCQUFBLHdGQUVOYixTQUFTLENBQUNVLEtBQUssRUFBRSxNQUFNLENBQUM7RUFHckMsQ0FBQztBQUNILENBQUM7QUFhRDtBQUNBLE9BQU8sU0FBU2tCLGdCQUFnQkEsQ0FBQ0MsS0FBcUMsRUFBRTtFQUN0RSxJQUFRQyxJQUFJLEdBQUtELEtBQUssQ0FBZEMsSUFBSTtFQUNaLElBQU1DLE1BQU0sR0FBR2hDLFVBQVUsQ0FBQ1UsU0FBUyxDQUFDO0VBRXBDLElBQUksQ0FBQ3VCLEtBQUssQ0FBQ0MsT0FBTyxDQUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDQSxJQUFJLENBQUNJLE1BQU0sRUFBRTtJQUN4QyxPQUFPLElBQUk7RUFDYjtFQUVBLG9CQUNFNUIsSUFBQTtJQUFJNkIsU0FBUyxFQUFFSixNQUFNLENBQUNYLE9BQVE7SUFBQWdCLFFBQUEsRUFDM0JOLElBQUksQ0FBQ08sR0FBRyxDQUFDLFVBQUNDLElBQUksRUFBRUMsQ0FBQztNQUFBO1FBQUE7UUFDaEI7UUFDQS9CLEtBQUE7VUFBSTJCLFNBQVMsRUFBRUosTUFBTSxDQUFDVCxXQUFZO1VBQUFjLFFBQUEsZ0JBQ2hDOUIsSUFBQTtZQUFNNkIsU0FBUyxFQUFFSixNQUFNLENBQUNQLFlBQWE7WUFBQVksUUFBQSxFQUFFRSxJQUFJLENBQUNFO1VBQUcsQ0FBTyxDQUFDLGVBQ3ZEbEMsSUFBQTtZQUFNNkIsU0FBUyxFQUFFSixNQUFNLENBQUNMLFlBQWE7WUFBQVUsUUFBQSxFQUFDO1VBQUMsQ0FBTSxDQUFDLEVBQzdDSyxNQUFNLENBQUNILElBQUksQ0FBQ0ksS0FBSyxDQUFDO1FBQUEsR0FIc0JKLElBQUksQ0FBQ0UsR0FBRyxTQUFJRCxDQUluRDtNQUFDO0lBQUEsQ0FDTjtFQUFDLENBQ0EsQ0FBQztBQUVUO0FBRUFYLGdCQUFnQixDQUFDZSxZQUFZLEdBQUc7RUFDOUJiLElBQUksRUFBRTtBQUNSLENBQUM7QUFFRCxlQUFlLFNBQVNjLGtCQUFrQkEsQ0FBQ2YsS0FBOEIsRUFBRTtFQUFBLElBQUFnQixHQUFBLEVBQUFDLElBQUE7RUFDekUsSUFBUVgsU0FBUyxHQUE0RU4sS0FBSyxDQUExRk0sU0FBUztJQUFFTCxJQUFJLEdBQXNFRCxLQUFLLENBQS9FQyxJQUFJO0lBQUVpQixZQUFZLEdBQXdEbEIsS0FBSyxDQUF6RWtCLFlBQVk7SUFBRUMsV0FBVyxHQUEyQ25CLEtBQUssQ0FBM0RtQixXQUFXO0lBQUVDLE1BQU0sR0FBbUNwQixLQUFLLENBQTlDb0IsTUFBTTtJQUFFQyxLQUFLLEdBQTRCckIsS0FBSyxDQUF0Q3FCLEtBQUs7SUFBRUMsV0FBVyxHQUFldEIsS0FBSyxDQUEvQnNCLFdBQVc7SUFBRUMsUUFBUSxHQUFLdkIsS0FBSyxDQUFsQnVCLFFBQVE7RUFDeEYsSUFBTUMsT0FBTyxHQUFHLENBQUNyQixLQUFLLENBQUNDLE9BQU8sQ0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQ0EsSUFBSSxDQUFDSSxNQUFNO0VBQ3BELElBQU1ILE1BQU0sR0FBR2hDLFVBQVUsQ0FBQ1UsU0FBUyxDQUFDO0VBQ3BDLElBQU02QyxPQUFPLEdBQUczRCxFQUFFLENBQUNNLFVBQVUsR0FBQTRDLEdBQUEsT0FBQUEsR0FBQSxDQUFLZCxNQUFNLENBQUNiLFNBQVMsSUFBR21DLE9BQU8sRUFBQVIsR0FBQSxDQUFFLENBQUM7RUFDL0QsSUFBSVUsS0FBNkIsR0FBRyxJQUFJO0VBQ3hDLElBQUlDLFdBQXNCLEdBQUcsSUFBSTtFQUNqQyxJQUFJUixXQUFXLEVBQUU7SUFDZk8sS0FBSyxHQUFHTixNQUFNLGdCQUFHM0MsSUFBQSxDQUFDVCxjQUFjO01BQUNzQyxTQUFTLEVBQUVtQjtJQUFRLENBQUUsQ0FBQyxnQkFBR2hELElBQUEsQ0FBQ1IsZUFBZTtNQUFDcUMsU0FBUyxFQUFFbUI7SUFBUSxDQUFFLENBQUM7SUFDakdFLFdBQVcsR0FBRztNQUNaLGNBQWMsRUFBRVAsTUFBTTtNQUN0QlEsT0FBTyxFQUFFSixPQUFPLEdBQUcsSUFBSSxHQUFHRCxRQUFRO01BQ2xDTSxJQUFJLEVBQUU7SUFDUixDQUFDO0VBQ0g7RUFFQSxvQkFDRWxELEtBQUE7SUFBSzJCLFNBQVMsRUFBRXhDLEVBQUUsQ0FBQ3dDLFNBQVMsRUFBRWpDLFdBQVcsQ0FBRTtJQUFBa0MsUUFBQSxnQkFDekM1QixLQUFBLFFBQUFtRCxRQUFBO01BQ0V4QixTQUFTLEVBQUV4QyxFQUFFLENBQUNvQyxNQUFNLENBQUNwQixNQUFNLEdBQUFtQyxJQUFBLE9BQUFBLElBQUEsQ0FDeEJmLE1BQU0sQ0FBQ2pCLFdBQVcsSUFBR3VDLE9BQU8sRUFBQVAsSUFBQSxDQUM1QmYsTUFBTSxDQUFDZixrQkFBa0IsSUFBRytCLFlBQVksSUFBSSxDQUFDTSxPQUFPLEVBQUFQLElBQUEsQ0FDdEQ7SUFBRSxHQUNDVSxXQUFXO01BQ2YsZUFBWSw0QkFBNEI7TUFBQXBCLFFBQUEsR0FFdkNtQixLQUFLLGVBQ04vQyxLQUFBO1FBQVEsYUFBV0wsT0FBTyxDQUFDeUQsS0FBTTtRQUFBeEIsUUFBQSxHQUM5QmMsS0FBSyxFQUNMRCxNQUFNLElBQUksR0FBRztNQUFBLENBQ1IsQ0FBQyxFQUNSLENBQUNBLE1BQU0saUJBQUkzQyxJQUFBLENBQUNzQixnQkFBZ0I7UUFBQ0UsSUFBSSxFQUFFQTtNQUFLLENBQUUsQ0FBQztJQUFBLEVBQ3pDLENBQUMsRUFDTG1CLE1BQU0saUJBQUkzQyxJQUFBLENBQUNGLGNBQWM7TUFBQzBCLElBQUksRUFBRUEsSUFBSztNQUFDcUIsV0FBVyxFQUFFQTtJQUFZLENBQUUsQ0FBQztFQUFBLENBQ2hFLENBQUM7QUFFVjtBQUVBUCxrQkFBa0IsQ0FBQ0QsWUFBWSxHQUFHO0VBQ2hDUixTQUFTLEVBQUUsSUFBSTtFQUNmWSxZQUFZLEVBQUUsS0FBSztFQUNuQkMsV0FBVyxFQUFFLElBQUk7RUFDakJJLFFBQVEsRUFBRTtBQUNaLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=