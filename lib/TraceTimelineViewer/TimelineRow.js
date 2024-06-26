import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _excluded = ["children", "className"],
  _excluded2 = ["children", "className", "width", "style"];
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
import cx from 'classnames';
import * as React from 'react';
import { useStyles2 } from '@grafana/ui';
import { ubRelative } from '../uberUtilityStyles';
import { jsx as _jsx } from "react/jsx-runtime";
var getStyles = function getStyles() {
  return {
    flexRow: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      display: flex;\n      flex: 0 1 auto;\n      flex-direction: row;\n    "])))
  };
};
export default function TimelineRow(props) {
  var children = props.children,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsx("div", _extends({
    className: cx(styles.flexRow, className)
  }, rest, {
    children: children
  }));
}
TimelineRow.defaultProps = {
  className: ''
};
export function TimelineRowCell(props) {
  var children = props.children,
    _props$className2 = props.className,
    className = _props$className2 === void 0 ? '' : _props$className2,
    width = props.width,
    style = props.style,
    rest = _objectWithoutPropertiesLoose(props, _excluded2);
  var widthPercent = width * 100 + "%";
  var mergedStyle = _extends({}, style, {
    flexBasis: widthPercent,
    maxWidth: widthPercent
  });
  return /*#__PURE__*/_jsx("div", _extends({
    className: cx(ubRelative, className),
    style: mergedStyle,
    "data-testid": "TimelineRowCell"
  }, rest, {
    children: children
  }));
}
TimelineRowCell.defaultProps = {
  className: '',
  style: {}
};
TimelineRow.Cell = TimelineRowCell;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsInViUmVsYXRpdmUiLCJqc3giLCJfanN4IiwiZ2V0U3R5bGVzIiwiZmxleFJvdyIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsIlRpbWVsaW5lUm93IiwicHJvcHMiLCJjaGlsZHJlbiIsIl9wcm9wcyRjbGFzc05hbWUiLCJjbGFzc05hbWUiLCJyZXN0IiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJfZXhjbHVkZWQiLCJzdHlsZXMiLCJfZXh0ZW5kcyIsImRlZmF1bHRQcm9wcyIsIlRpbWVsaW5lUm93Q2VsbCIsIl9wcm9wcyRjbGFzc05hbWUyIiwid2lkdGgiLCJzdHlsZSIsIl9leGNsdWRlZDIiLCJ3aWR0aFBlcmNlbnQiLCJtZXJnZWRTdHlsZSIsImZsZXhCYXNpcyIsIm1heFdpZHRoIiwiQ2VsbCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1RpbWVsaW5lUm93LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgdWJSZWxhdGl2ZSB9IGZyb20gJy4uL3ViZXJVdGlsaXR5U3R5bGVzJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZsZXhSb3c6IGNzc2BcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4OiAwIDEgYXV0bztcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgYCxcbiAgfTtcbn07XG5cbnR5cGUgVFRpbWVsaW5lUm93UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbmludGVyZmFjZSBUaW1lbGluZVJvd0NlbGxQcm9wcyBleHRlbmRzIFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PiB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgd2lkdGg6IG51bWJlcjtcbiAgc3R5bGU/OiB7fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGltZWxpbmVSb3cocHJvcHM6IFRUaW1lbGluZVJvd1Byb3BzKSB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSA9ICcnLCAuLi5yZXN0IH0gPSBwcm9wcztcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjeChzdHlsZXMuZmxleFJvdywgY2xhc3NOYW1lKX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5UaW1lbGluZVJvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNsYXNzTmFtZTogJycsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gVGltZWxpbmVSb3dDZWxsKHByb3BzOiBUaW1lbGluZVJvd0NlbGxQcm9wcykge1xuICBjb25zdCB7IGNoaWxkcmVuLCBjbGFzc05hbWUgPSAnJywgd2lkdGgsIHN0eWxlLCAuLi5yZXN0IH0gPSBwcm9wcztcbiAgY29uc3Qgd2lkdGhQZXJjZW50ID0gYCR7d2lkdGggKiAxMDB9JWA7XG4gIGNvbnN0IG1lcmdlZFN0eWxlID0geyAuLi5zdHlsZSwgZmxleEJhc2lzOiB3aWR0aFBlcmNlbnQsIG1heFdpZHRoOiB3aWR0aFBlcmNlbnQgfTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y3godWJSZWxhdGl2ZSwgY2xhc3NOYW1lKX0gc3R5bGU9e21lcmdlZFN0eWxlfSBkYXRhLXRlc3RpZD1cIlRpbWVsaW5lUm93Q2VsbFwiIHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuVGltZWxpbmVSb3dDZWxsLmRlZmF1bHRQcm9wcyA9IHsgY2xhc3NOYW1lOiAnJywgc3R5bGU6IHt9IH07XG5cblRpbWVsaW5lUm93LkNlbGwgPSBUaW1lbGluZVJvd0NlbGw7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEVBQUUsTUFBTSxZQUFZO0FBQzNCLE9BQU8sS0FBS0MsS0FBSyxNQUFNLE9BQU87QUFFOUIsU0FBU0MsVUFBVSxRQUFRLGFBQWE7QUFFeEMsU0FBU0MsVUFBVSxRQUFRLHNCQUFzQjtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUVsRCxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBQSxFQUFTO0VBQ3RCLE9BQU87SUFDTEMsT0FBTyxFQUFFUixHQUFHLENBQUFTLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQTtFQUtkLENBQUM7QUFDSCxDQUFDO0FBY0QsZUFBZSxTQUFTQyxXQUFXQSxDQUFDQyxLQUF3QixFQUFFO0VBQzVELElBQVFDLFFBQVEsR0FBOEJELEtBQUssQ0FBM0NDLFFBQVE7SUFBQUMsZ0JBQUEsR0FBOEJGLEtBQUssQ0FBakNHLFNBQVM7SUFBVEEsU0FBUyxHQUFBRCxnQkFBQSxjQUFHLEVBQUUsR0FBQUEsZ0JBQUE7SUFBS0UsSUFBSSxHQUFBQyw2QkFBQSxDQUFLTCxLQUFLLEVBQUFNLFNBQUE7RUFDbkQsSUFBTUMsTUFBTSxHQUFHaEIsVUFBVSxDQUFDSSxTQUFTLENBQUM7RUFDcEMsb0JBQ0VELElBQUEsUUFBQWMsUUFBQTtJQUFLTCxTQUFTLEVBQUVkLEVBQUUsQ0FBQ2tCLE1BQU0sQ0FBQ1gsT0FBTyxFQUFFTyxTQUFTO0VBQUUsR0FBS0MsSUFBSTtJQUFBSCxRQUFBLEVBQ3BEQTtFQUFRLEVBQ04sQ0FBQztBQUVWO0FBRUFGLFdBQVcsQ0FBQ1UsWUFBWSxHQUFHO0VBQ3pCTixTQUFTLEVBQUU7QUFDYixDQUFDO0FBRUQsT0FBTyxTQUFTTyxlQUFlQSxDQUFDVixLQUEyQixFQUFFO0VBQzNELElBQVFDLFFBQVEsR0FBNENELEtBQUssQ0FBekRDLFFBQVE7SUFBQVUsaUJBQUEsR0FBNENYLEtBQUssQ0FBL0NHLFNBQVM7SUFBVEEsU0FBUyxHQUFBUSxpQkFBQSxjQUFHLEVBQUUsR0FBQUEsaUJBQUE7SUFBRUMsS0FBSyxHQUFxQlosS0FBSyxDQUEvQlksS0FBSztJQUFFQyxLQUFLLEdBQWNiLEtBQUssQ0FBeEJhLEtBQUs7SUFBS1QsSUFBSSxHQUFBQyw2QkFBQSxDQUFLTCxLQUFLLEVBQUFjLFVBQUE7RUFDakUsSUFBTUMsWUFBWSxHQUFNSCxLQUFLLEdBQUcsR0FBRyxNQUFHO0VBQ3RDLElBQU1JLFdBQVcsR0FBQVIsUUFBQSxLQUFRSyxLQUFLO0lBQUVJLFNBQVMsRUFBRUYsWUFBWTtJQUFFRyxRQUFRLEVBQUVIO0VBQVksRUFBRTtFQUNqRixvQkFDRXJCLElBQUEsUUFBQWMsUUFBQTtJQUFLTCxTQUFTLEVBQUVkLEVBQUUsQ0FBQ0csVUFBVSxFQUFFVyxTQUFTLENBQUU7SUFBQ1UsS0FBSyxFQUFFRyxXQUFZO0lBQUMsZUFBWTtFQUFpQixHQUFLWixJQUFJO0lBQUFILFFBQUEsRUFDbEdBO0VBQVEsRUFDTixDQUFDO0FBRVY7QUFFQVMsZUFBZSxDQUFDRCxZQUFZLEdBQUc7RUFBRU4sU0FBUyxFQUFFLEVBQUU7RUFBRVUsS0FBSyxFQUFFLENBQUM7QUFBRSxDQUFDO0FBRTNEZCxXQUFXLENBQUNvQixJQUFJLEdBQUdULGVBQWUiLCJpZ25vcmVMaXN0IjpbXX0=