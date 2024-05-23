import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
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
import { useStyles2 } from '@grafana/ui';
import { autoColor } from '../Theme';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = function getStyles(divider) {
  return function (theme) {
    return {
      LabeledList: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: LabeledList;\n      list-style: none;\n      margin: 0;\n      padding: 0;\n      ", "\n    "])), divider === true && "\n        margin-right: -8px;\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: flex-end;\n      "),
      LabeledListItem: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: LabeledListItem;\n      display: inline-block;\n      ", "\n    "])), divider === true && "\n        border-right: 1px solid " + autoColor(theme, '#ddd') + ";\n        padding: 0 8px;\n      "),
      LabeledListLabel: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: LabeledListLabel;\n      color: ", ";\n      margin-right: 0.25rem;\n    "])), theme.isLight ? '#999' : '#666'),
      LabeledListValue: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: LabeledListValue;\n      margin-right: 0.55rem;\n    "])))
    };
  };
};
export default function LabeledList(props) {
  var className = props.className,
    _props$divider = props.divider,
    divider = _props$divider === void 0 ? false : _props$divider,
    items = props.items;
  var styles = useStyles2(getStyles(divider));
  return /*#__PURE__*/_jsx("ul", {
    className: cx(styles.LabeledList, className),
    children: items.map(function (_ref) {
      var key = _ref.key,
        label = _ref.label,
        value = _ref.value;
      return /*#__PURE__*/_jsxs("li", {
        className: styles.LabeledListItem,
        children: [/*#__PURE__*/_jsx("span", {
          className: styles.LabeledListLabel,
          children: label
        }), /*#__PURE__*/_jsx("strong", {
          className: styles.LabeledListValue,
          children: value
        })]
      }, "" + key);
    })
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImF1dG9Db2xvciIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJkaXZpZGVyIiwidGhlbWUiLCJMYWJlbGVkTGlzdCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsIkxhYmVsZWRMaXN0SXRlbSIsIl90ZW1wbGF0ZU9iamVjdDIiLCJMYWJlbGVkTGlzdExhYmVsIiwiX3RlbXBsYXRlT2JqZWN0MyIsImlzTGlnaHQiLCJMYWJlbGVkTGlzdFZhbHVlIiwiX3RlbXBsYXRlT2JqZWN0NCIsInByb3BzIiwiY2xhc3NOYW1lIiwiX3Byb3BzJGRpdmlkZXIiLCJpdGVtcyIsInN0eWxlcyIsImNoaWxkcmVuIiwibWFwIiwiX3JlZiIsImtleSIsImxhYmVsIiwidmFsdWUiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL0xhYmVsZWRMaXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR3JhZmFuYVRoZW1lMiB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgYXV0b0NvbG9yIH0gZnJvbSAnLi4vVGhlbWUnO1xuXG5jb25zdCBnZXRTdHlsZXMgPSAoZGl2aWRlcjogYm9vbGVhbikgPT4gKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgTGFiZWxlZExpc3Q6IGNzc2BcbiAgICAgIGxhYmVsOiBMYWJlbGVkTGlzdDtcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgJHtkaXZpZGVyID09PSB0cnVlICYmXG4gICAgICBgXG4gICAgICAgIG1hcmdpbi1yaWdodDogLThweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgYH1cbiAgICBgLFxuICAgIExhYmVsZWRMaXN0SXRlbTogY3NzYFxuICAgICAgbGFiZWw6IExhYmVsZWRMaXN0SXRlbTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICR7ZGl2aWRlciA9PT0gdHJ1ZSAmJlxuICAgICAgYFxuICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNkZGQnKX07XG4gICAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgICAgYH1cbiAgICBgLFxuICAgIExhYmVsZWRMaXN0TGFiZWw6IGNzc2BcbiAgICAgIGxhYmVsOiBMYWJlbGVkTGlzdExhYmVsO1xuICAgICAgY29sb3I6ICR7dGhlbWUuaXNMaWdodCA/ICcjOTk5JyA6ICcjNjY2J307XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuMjVyZW07XG4gICAgYCxcbiAgICBMYWJlbGVkTGlzdFZhbHVlOiBjc3NgXG4gICAgICBsYWJlbDogTGFiZWxlZExpc3RWYWx1ZTtcbiAgICAgIG1hcmdpbi1yaWdodDogMC41NXJlbTtcbiAgICBgLFxuICB9O1xufTtcblxudHlwZSBMYWJlbGVkTGlzdFByb3BzID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGRpdmlkZXI/OiBib29sZWFuO1xuICBpdGVtczogQXJyYXk8eyBrZXk6IHN0cmluZzsgbGFiZWw6IFJlYWN0LlJlYWN0Tm9kZTsgdmFsdWU6IFJlYWN0LlJlYWN0Tm9kZSB9Pjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExhYmVsZWRMaXN0KHByb3BzOiBMYWJlbGVkTGlzdFByb3BzKSB7XG4gIGNvbnN0IHsgY2xhc3NOYW1lLCBkaXZpZGVyID0gZmFsc2UsIGl0ZW1zIH0gPSBwcm9wcztcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMoZGl2aWRlcikpO1xuXG4gIHJldHVybiAoXG4gICAgPHVsIGNsYXNzTmFtZT17Y3goc3R5bGVzLkxhYmVsZWRMaXN0LCBjbGFzc05hbWUpfT5cbiAgICAgIHtpdGVtcy5tYXAoKHsga2V5LCBsYWJlbCwgdmFsdWUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxsaSBjbGFzc05hbWU9e3N0eWxlcy5MYWJlbGVkTGlzdEl0ZW19IGtleT17YCR7a2V5fWB9PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuTGFiZWxlZExpc3RMYWJlbH0+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPXtzdHlsZXMuTGFiZWxlZExpc3RWYWx1ZX0+e3ZhbHVlfTwvc3Ryb25nPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L3VsPlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEVBQUUsTUFBTSxZQUFZO0FBQzNCLE9BQU8sS0FBS0MsS0FBSyxNQUFNLE9BQU87QUFHOUIsU0FBU0MsVUFBVSxRQUFRLGFBQWE7QUFFeEMsU0FBU0MsU0FBUyxRQUFRLFVBQVU7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBRXJDLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJQyxPQUFnQjtFQUFBLE9BQUssVUFBQ0MsS0FBb0IsRUFBSztJQUNoRSxPQUFPO01BQ0xDLFdBQVcsRUFBRVosR0FBRyxDQUFBYSxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsMkJBQUEsb0hBS1pKLE9BQU8sS0FBSyxJQUFJLGlJQU1qQixDQUNGO01BQ0RLLGVBQWUsRUFBRWYsR0FBRyxDQUFBZ0IsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUYsMkJBQUEsd0ZBR2hCSixPQUFPLEtBQUssSUFBSSwyQ0FFVU4sU0FBUyxDQUFDTyxLQUFLLEVBQUUsTUFBTSxDQUFDLHVDQUVuRCxDQUNGO01BQ0RNLGdCQUFnQixFQUFFakIsR0FBRyxDQUFBa0IsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUosMkJBQUEsaUdBRVZILEtBQUssQ0FBQ1EsT0FBTyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBRXpDO01BQ0RDLGdCQUFnQixFQUFFcEIsR0FBRyxDQUFBcUIsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQVAsMkJBQUE7SUFJdkIsQ0FBQztFQUNILENBQUM7QUFBQTtBQVFELGVBQWUsU0FBU0YsV0FBV0EsQ0FBQ1UsS0FBdUIsRUFBRTtFQUMzRCxJQUFRQyxTQUFTLEdBQTZCRCxLQUFLLENBQTNDQyxTQUFTO0lBQUFDLGNBQUEsR0FBNkJGLEtBQUssQ0FBaENaLE9BQU87SUFBUEEsT0FBTyxHQUFBYyxjQUFBLGNBQUcsS0FBSyxHQUFBQSxjQUFBO0lBQUVDLEtBQUssR0FBS0gsS0FBSyxDQUFmRyxLQUFLO0VBQ3pDLElBQU1DLE1BQU0sR0FBR3ZCLFVBQVUsQ0FBQ00sU0FBUyxDQUFDQyxPQUFPLENBQUMsQ0FBQztFQUU3QyxvQkFDRUosSUFBQTtJQUFJaUIsU0FBUyxFQUFFdEIsRUFBRSxDQUFDeUIsTUFBTSxDQUFDZCxXQUFXLEVBQUVXLFNBQVMsQ0FBRTtJQUFBSSxRQUFBLEVBQzlDRixLQUFLLENBQUNHLEdBQUcsQ0FBQyxVQUFBQyxJQUFBLEVBQTJCO01BQUEsSUFBeEJDLEdBQUcsR0FBQUQsSUFBQSxDQUFIQyxHQUFHO1FBQUVDLEtBQUssR0FBQUYsSUFBQSxDQUFMRSxLQUFLO1FBQUVDLEtBQUssR0FBQUgsSUFBQSxDQUFMRyxLQUFLO01BQzdCLG9CQUNFeEIsS0FBQTtRQUFJZSxTQUFTLEVBQUVHLE1BQU0sQ0FBQ1gsZUFBZ0I7UUFBQVksUUFBQSxnQkFDcENyQixJQUFBO1VBQU1pQixTQUFTLEVBQUVHLE1BQU0sQ0FBQ1QsZ0JBQWlCO1VBQUFVLFFBQUEsRUFBRUk7UUFBSyxDQUFPLENBQUMsZUFDeER6QixJQUFBO1VBQVFpQixTQUFTLEVBQUVHLE1BQU0sQ0FBQ04sZ0JBQWlCO1VBQUFPLFFBQUEsRUFBRUs7UUFBSyxDQUFTLENBQUM7TUFBQSxRQUZmRixHQUczQyxDQUFDO0lBRVQsQ0FBQztFQUFDLENBQ0EsQ0FBQztBQUVUIiwiaWdub3JlTGlzdCI6W119