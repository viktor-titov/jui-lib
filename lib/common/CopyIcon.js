import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject;
// Copyright (c) 2019 Uber Technologies, Inc.
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
import copy from 'copy-to-clipboard';
import React, { useState } from 'react';
import { Button, Tooltip, useStyles2 } from '@grafana/ui';
import { jsx as _jsx } from "react/jsx-runtime";
var getStyles = function getStyles() {
  return {
    CopyIcon: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      background-color: transparent;\n      border: none;\n      color: inherit;\n      height: 100%;\n      overflow: hidden;\n      &:focus {\n        background-color: rgba(255, 255, 255, 0.25);\n        color: inherit;\n      }\n    "])))
  };
};
export default function CopyIcon(props) {
  var styles = useStyles2(getStyles);
  var _useState = useState(false),
    hasCopied = _useState[0],
    setHasCopied = _useState[1];
  var handleClick = function handleClick() {
    copy(props.copyText);
    setHasCopied(true);
  };
  return /*#__PURE__*/_jsx(Tooltip, {
    content: hasCopied ? 'Copied' : props.tooltipTitle,
    children: /*#__PURE__*/_jsx(Button, {
      className: cx(styles.CopyIcon),
      type: "button",
      icon: props.icon,
      onClick: handleClick
    })
  });
}
CopyIcon.defaultProps = {
  icon: 'copy',
  className: undefined
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImNvcHkiLCJSZWFjdCIsInVzZVN0YXRlIiwiQnV0dG9uIiwiVG9vbHRpcCIsInVzZVN0eWxlczIiLCJqc3giLCJfanN4IiwiZ2V0U3R5bGVzIiwiQ29weUljb24iLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJwcm9wcyIsInN0eWxlcyIsIl91c2VTdGF0ZSIsImhhc0NvcGllZCIsInNldEhhc0NvcGllZCIsImhhbmRsZUNsaWNrIiwiY29weVRleHQiLCJjb250ZW50IiwidG9vbHRpcFRpdGxlIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJ0eXBlIiwiaWNvbiIsIm9uQ2xpY2siLCJkZWZhdWx0UHJvcHMiLCJ1bmRlZmluZWQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL0NvcHlJY29uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBjb3B5IGZyb20gJ2NvcHktdG8tY2xpcGJvYXJkJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQnV0dG9uLCBJY29uTmFtZSwgVG9vbHRpcCwgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIENvcHlJY29uOiBjc3NgXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICY6Zm9jdXMge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xuICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgIH1cbiAgICBgLFxuICB9O1xufTtcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgY29weVRleHQ6IHN0cmluZztcbiAgaWNvbj86IEljb25OYW1lO1xuICB0b29sdGlwVGl0bGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvcHlJY29uKHByb3BzOiBQcm9wc1R5cGUpIHtcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuXG4gIGNvbnN0IFtoYXNDb3BpZWQsIHNldEhhc0NvcGllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgY29weShwcm9wcy5jb3B5VGV4dCk7XG4gICAgc2V0SGFzQ29waWVkKHRydWUpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFRvb2x0aXAgY29udGVudD17aGFzQ29waWVkID8gJ0NvcGllZCcgOiBwcm9wcy50b29sdGlwVGl0bGV9PlxuICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9e2N4KHN0eWxlcy5Db3B5SWNvbil9IHR5cGU9XCJidXR0b25cIiBpY29uPXtwcm9wcy5pY29ufSBvbkNsaWNrPXtoYW5kbGVDbGlja30gLz5cbiAgICA8L1Rvb2x0aXA+XG4gICk7XG59XG5cbkNvcHlJY29uLmRlZmF1bHRQcm9wcyA9IHtcbiAgaWNvbjogJ2NvcHknLFxuICBjbGFzc05hbWU6IHVuZGVmaW5lZCxcbn07XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsRUFBRSxNQUFNLFlBQVk7QUFDM0IsT0FBT0MsSUFBSSxNQUFNLG1CQUFtQjtBQUNwQyxPQUFPQyxLQUFLLElBQUlDLFFBQVEsUUFBUSxPQUFPO0FBRXZDLFNBQVNDLE1BQU0sRUFBWUMsT0FBTyxFQUFFQyxVQUFVLFFBQVEsYUFBYTtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUVwRSxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBQSxFQUFTO0VBQ3RCLE9BQU87SUFDTEMsUUFBUSxFQUFFWCxHQUFHLENBQUFZLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQTtFQVdmLENBQUM7QUFDSCxDQUFDO0FBU0QsZUFBZSxTQUFTRixRQUFRQSxDQUFDRyxLQUFnQixFQUFFO0VBQ2pELElBQU1DLE1BQU0sR0FBR1IsVUFBVSxDQUFDRyxTQUFTLENBQUM7RUFFcEMsSUFBQU0sU0FBQSxHQUFrQ1osUUFBUSxDQUFDLEtBQUssQ0FBQztJQUExQ2EsU0FBUyxHQUFBRCxTQUFBO0lBQUVFLFlBQVksR0FBQUYsU0FBQTtFQUU5QixJQUFNRyxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBQSxFQUFTO0lBQ3hCakIsSUFBSSxDQUFDWSxLQUFLLENBQUNNLFFBQVEsQ0FBQztJQUNwQkYsWUFBWSxDQUFDLElBQUksQ0FBQztFQUNwQixDQUFDO0VBRUQsb0JBQ0VULElBQUEsQ0FBQ0gsT0FBTztJQUFDZSxPQUFPLEVBQUVKLFNBQVMsR0FBRyxRQUFRLEdBQUdILEtBQUssQ0FBQ1EsWUFBYTtJQUFBQyxRQUFBLGVBQzFEZCxJQUFBLENBQUNKLE1BQU07TUFBQ21CLFNBQVMsRUFBRXZCLEVBQUUsQ0FBQ2MsTUFBTSxDQUFDSixRQUFRLENBQUU7TUFBQ2MsSUFBSSxFQUFDLFFBQVE7TUFBQ0MsSUFBSSxFQUFFWixLQUFLLENBQUNZLElBQUs7TUFBQ0MsT0FBTyxFQUFFUjtJQUFZLENBQUU7RUFBQyxDQUN6RixDQUFDO0FBRWQ7QUFFQVIsUUFBUSxDQUFDaUIsWUFBWSxHQUFHO0VBQ3RCRixJQUFJLEVBQUUsTUFBTTtFQUNaRixTQUFTLEVBQUVLO0FBQ2IsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==