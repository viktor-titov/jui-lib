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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImF1dG9Db2xvciIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJkaXZpZGVyIiwidGhlbWUiLCJMYWJlbGVkTGlzdCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsIkxhYmVsZWRMaXN0SXRlbSIsIl90ZW1wbGF0ZU9iamVjdDIiLCJMYWJlbGVkTGlzdExhYmVsIiwiX3RlbXBsYXRlT2JqZWN0MyIsImlzTGlnaHQiLCJMYWJlbGVkTGlzdFZhbHVlIiwiX3RlbXBsYXRlT2JqZWN0NCIsInByb3BzIiwiY2xhc3NOYW1lIiwiX3Byb3BzJGRpdmlkZXIiLCJpdGVtcyIsInN0eWxlcyIsImNoaWxkcmVuIiwibWFwIiwiX3JlZiIsImtleSIsImxhYmVsIiwidmFsdWUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbW1vbi9MYWJlbGVkTGlzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEdyYWZhbmFUaGVtZTIgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmltcG9ydCB7IGF1dG9Db2xvciB9IGZyb20gJy4uL1RoZW1lJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKGRpdmlkZXI6IGJvb2xlYW4pID0+ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIExhYmVsZWRMaXN0OiBjc3NgXG4gICAgICBsYWJlbDogTGFiZWxlZExpc3Q7XG4gICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgICR7ZGl2aWRlciA9PT0gdHJ1ZSAmJlxuICAgICAgYFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IC04cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgIGB9XG4gICAgYCxcbiAgICBMYWJlbGVkTGlzdEl0ZW06IGNzc2BcbiAgICAgIGxhYmVsOiBMYWJlbGVkTGlzdEl0ZW07XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAke2RpdmlkZXIgPT09IHRydWUgJiZcbiAgICAgIGBcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjZGRkJyl9O1xuICAgICAgICBwYWRkaW5nOiAwIDhweDtcbiAgICAgIGB9XG4gICAgYCxcbiAgICBMYWJlbGVkTGlzdExhYmVsOiBjc3NgXG4gICAgICBsYWJlbDogTGFiZWxlZExpc3RMYWJlbDtcbiAgICAgIGNvbG9yOiAke3RoZW1lLmlzTGlnaHQgPyAnIzk5OScgOiAnIzY2Nid9O1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwLjI1cmVtO1xuICAgIGAsXG4gICAgTGFiZWxlZExpc3RWYWx1ZTogY3NzYFxuICAgICAgbGFiZWw6IExhYmVsZWRMaXN0VmFsdWU7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDAuNTVyZW07XG4gICAgYCxcbiAgfTtcbn07XG5cbnR5cGUgTGFiZWxlZExpc3RQcm9wcyA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBkaXZpZGVyPzogYm9vbGVhbjtcbiAgaXRlbXM6IEFycmF5PHsga2V5OiBzdHJpbmc7IGxhYmVsOiBSZWFjdC5SZWFjdE5vZGU7IHZhbHVlOiBSZWFjdC5SZWFjdE5vZGUgfT47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYWJlbGVkTGlzdChwcm9wczogTGFiZWxlZExpc3RQcm9wcykge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgZGl2aWRlciA9IGZhbHNlLCBpdGVtcyB9ID0gcHJvcHM7XG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKGRpdmlkZXIpKTtcblxuICByZXR1cm4gKFxuICAgIDx1bCBjbGFzc05hbWU9e2N4KHN0eWxlcy5MYWJlbGVkTGlzdCwgY2xhc3NOYW1lKX0+XG4gICAgICB7aXRlbXMubWFwKCh7IGtleSwgbGFiZWwsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtzdHlsZXMuTGFiZWxlZExpc3RJdGVtfSBrZXk9e2Ake2tleX1gfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLkxhYmVsZWRMaXN0TGFiZWx9PntsYWJlbH08L3NwYW4+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT17c3R5bGVzLkxhYmVsZWRMaXN0VmFsdWV9Pnt2YWx1ZX08L3N0cm9uZz5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC91bD5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixPQUFPLEtBQUtDLEtBQUssTUFBTSxPQUFPO0FBRzlCLFNBQVNDLFVBQVUsUUFBUSxhQUFhO0FBRXhDLFNBQVNDLFNBQVMsUUFBUSxVQUFVO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBLEVBQUFDLElBQUEsSUFBQUMsS0FBQTtBQUVyQyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBSUMsT0FBZ0I7RUFBQSxPQUFLLFVBQUNDLEtBQW9CLEVBQUs7SUFDaEUsT0FBTztNQUNMQyxXQUFXLEVBQUVaLEdBQUcsQ0FBQWEsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLDJCQUFBLG9IQUtaSixPQUFPLEtBQUssSUFBSSxpSUFNakIsQ0FDRjtNQUNESyxlQUFlLEVBQUVmLEdBQUcsQ0FBQWdCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFGLDJCQUFBLHdGQUdoQkosT0FBTyxLQUFLLElBQUksMkNBRVVOLFNBQVMsQ0FBQ08sS0FBSyxFQUFFLE1BQU0sQ0FBQyx1Q0FFbkQsQ0FDRjtNQUNETSxnQkFBZ0IsRUFBRWpCLEdBQUcsQ0FBQWtCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFKLDJCQUFBLGlHQUVWSCxLQUFLLENBQUNRLE9BQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUV6QztNQUNEQyxnQkFBZ0IsRUFBRXBCLEdBQUcsQ0FBQXFCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFQLDJCQUFBO0lBSXZCLENBQUM7RUFDSCxDQUFDO0FBQUE7QUFRRCxlQUFlLFNBQVNGLFdBQVdBLENBQUNVLEtBQXVCLEVBQUU7RUFDM0QsSUFBUUMsU0FBUyxHQUE2QkQsS0FBSyxDQUEzQ0MsU0FBUztJQUFBQyxjQUFBLEdBQTZCRixLQUFLLENBQWhDWixPQUFPO0lBQVBBLE9BQU8sR0FBQWMsY0FBQSxjQUFHLEtBQUssR0FBQUEsY0FBQTtJQUFFQyxLQUFLLEdBQUtILEtBQUssQ0FBZkcsS0FBSztFQUN6QyxJQUFNQyxNQUFNLEdBQUd2QixVQUFVLENBQUNNLFNBQVMsQ0FBQ0MsT0FBTyxDQUFDLENBQUM7RUFFN0Msb0JBQ0VKLElBQUE7SUFBSWlCLFNBQVMsRUFBRXRCLEVBQUUsQ0FBQ3lCLE1BQU0sQ0FBQ2QsV0FBVyxFQUFFVyxTQUFTLENBQUU7SUFBQUksUUFBQSxFQUM5Q0YsS0FBSyxDQUFDRyxHQUFHLENBQUMsVUFBQUMsSUFBQSxFQUEyQjtNQUFBLElBQXhCQyxHQUFHLEdBQUFELElBQUEsQ0FBSEMsR0FBRztRQUFFQyxLQUFLLEdBQUFGLElBQUEsQ0FBTEUsS0FBSztRQUFFQyxLQUFLLEdBQUFILElBQUEsQ0FBTEcsS0FBSztNQUM3QixvQkFDRXhCLEtBQUE7UUFBSWUsU0FBUyxFQUFFRyxNQUFNLENBQUNYLGVBQWdCO1FBQUFZLFFBQUEsZ0JBQ3BDckIsSUFBQTtVQUFNaUIsU0FBUyxFQUFFRyxNQUFNLENBQUNULGdCQUFpQjtVQUFBVSxRQUFBLEVBQUVJO1FBQUssQ0FBTyxDQUFDLGVBQ3hEekIsSUFBQTtVQUFRaUIsU0FBUyxFQUFFRyxNQUFNLENBQUNOLGdCQUFpQjtVQUFBTyxRQUFBLEVBQUVLO1FBQUssQ0FBUyxDQUFDO01BQUEsUUFGZkYsR0FHM0MsQ0FBQztJQUVULENBQUM7RUFBQyxDQUNBLENBQUM7QUFFVCIsImlnbm9yZUxpc3QiOltdfQ==