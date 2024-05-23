import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
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
import React from 'react';
import { useStyles2 } from '@grafana/ui';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var getStyles = function getStyles() {
  return {
    ScrubberHandleExpansion: cx(css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n        label: ScrubberHandleExpansion;\n        cursor: col-resize;\n        fill-opacity: 0;\n        fill: #44f;\n      "]))), 'scrubber-handle-expansion'),
    ScrubberHandle: cx(css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n        label: ScrubberHandle;\n        cursor: col-resize;\n        fill: #555;\n      "]))), 'scrubber-handle'),
    ScrubberLine: cx(css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n        label: ScrubberLine;\n        pointer-events: none;\n        stroke: #555;\n      "]))), 'scrubber-line'),
    ScrubberDragging: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: ScrubberDragging;\n      & .scrubber-handle-expansion {\n        fill-opacity: 1;\n      }\n      & .scrubber-handle {\n        fill: #44f;\n      }\n      & > .scrubber-line {\n        stroke: #44f;\n      }\n    "]))),
    ScrubberHandles: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: ScrubberHandles;\n      &:hover > .scrubber-handle-expansion {\n        fill-opacity: 1;\n      }\n      &:hover > .scrubber-handle {\n        fill: #44f;\n      }\n      &:hover + .scrubber.line {\n        stroke: #44f;\n      }\n    "])))
  };
};
export default function Scrubber(_ref) {
  var _cx;
  var isDragging = _ref.isDragging,
    onMouseDown = _ref.onMouseDown,
    onMouseEnter = _ref.onMouseEnter,
    onMouseLeave = _ref.onMouseLeave,
    position = _ref.position;
  var xPercent = position * 100 + "%";
  var styles = useStyles2(getStyles);
  var className = cx((_cx = {}, _cx[styles.ScrubberDragging] = isDragging, _cx));
  return /*#__PURE__*/_jsxs("g", {
    className: className,
    "data-testid": "scrubber-component",
    children: [/*#__PURE__*/_jsxs("g", {
      "data-testid": "scrubber-component-g",
      className: styles.ScrubberHandles,
      onMouseDown: onMouseDown,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      children: [/*#__PURE__*/_jsx("rect", {
        "data-testid": "scrubber-component-rect-1",
        x: xPercent,
        className: styles.ScrubberHandleExpansion,
        style: {
          transform: "translate(-4.5px)"
        },
        width: "9",
        height: "20"
      }), /*#__PURE__*/_jsx("rect", {
        "data-testid": "scrubber-component-rect-2",
        x: xPercent,
        className: styles.ScrubberHandle,
        style: {
          transform: "translate(-1.5px)"
        },
        width: "3",
        height: "20"
      })]
    }), /*#__PURE__*/_jsx("line", {
      className: styles.ScrubberLine,
      y2: "100%",
      x1: xPercent,
      x2: xPercent,
      "data-testid": "scrubber-component-line"
    })]
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJTY3J1YmJlckhhbmRsZUV4cGFuc2lvbiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsIlNjcnViYmVySGFuZGxlIiwiX3RlbXBsYXRlT2JqZWN0MiIsIlNjcnViYmVyTGluZSIsIl90ZW1wbGF0ZU9iamVjdDMiLCJTY3J1YmJlckRyYWdnaW5nIiwiX3RlbXBsYXRlT2JqZWN0NCIsIlNjcnViYmVySGFuZGxlcyIsIl90ZW1wbGF0ZU9iamVjdDUiLCJTY3J1YmJlciIsIl9yZWYiLCJfY3giLCJpc0RyYWdnaW5nIiwib25Nb3VzZURvd24iLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJwb3NpdGlvbiIsInhQZXJjZW50Iiwic3R5bGVzIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJ4Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJ3aWR0aCIsImhlaWdodCIsInkyIiwieDEiLCJ4MiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFjZVBhZ2VIZWFkZXIvU3BhbkdyYXBoL1NjcnViYmVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmV4cG9ydCBjb25zdCBnZXRTdHlsZXMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgU2NydWJiZXJIYW5kbGVFeHBhbnNpb246IGN4KFxuICAgICAgY3NzYFxuICAgICAgICBsYWJlbDogU2NydWJiZXJIYW5kbGVFeHBhbnNpb247XG4gICAgICAgIGN1cnNvcjogY29sLXJlc2l6ZTtcbiAgICAgICAgZmlsbC1vcGFjaXR5OiAwO1xuICAgICAgICBmaWxsOiAjNDRmO1xuICAgICAgYCxcbiAgICAgICdzY3J1YmJlci1oYW5kbGUtZXhwYW5zaW9uJ1xuICAgICksXG4gICAgU2NydWJiZXJIYW5kbGU6IGN4KFxuICAgICAgY3NzYFxuICAgICAgICBsYWJlbDogU2NydWJiZXJIYW5kbGU7XG4gICAgICAgIGN1cnNvcjogY29sLXJlc2l6ZTtcbiAgICAgICAgZmlsbDogIzU1NTtcbiAgICAgIGAsXG4gICAgICAnc2NydWJiZXItaGFuZGxlJ1xuICAgICksXG4gICAgU2NydWJiZXJMaW5lOiBjeChcbiAgICAgIGNzc2BcbiAgICAgICAgbGFiZWw6IFNjcnViYmVyTGluZTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHN0cm9rZTogIzU1NTtcbiAgICAgIGAsXG4gICAgICAnc2NydWJiZXItbGluZSdcbiAgICApLFxuICAgIFNjcnViYmVyRHJhZ2dpbmc6IGNzc2BcbiAgICAgIGxhYmVsOiBTY3J1YmJlckRyYWdnaW5nO1xuICAgICAgJiAuc2NydWJiZXItaGFuZGxlLWV4cGFuc2lvbiB7XG4gICAgICAgIGZpbGwtb3BhY2l0eTogMTtcbiAgICAgIH1cbiAgICAgICYgLnNjcnViYmVyLWhhbmRsZSB7XG4gICAgICAgIGZpbGw6ICM0NGY7XG4gICAgICB9XG4gICAgICAmID4gLnNjcnViYmVyLWxpbmUge1xuICAgICAgICBzdHJva2U6ICM0NGY7XG4gICAgICB9XG4gICAgYCxcbiAgICBTY3J1YmJlckhhbmRsZXM6IGNzc2BcbiAgICAgIGxhYmVsOiBTY3J1YmJlckhhbmRsZXM7XG4gICAgICAmOmhvdmVyID4gLnNjcnViYmVyLWhhbmRsZS1leHBhbnNpb24ge1xuICAgICAgICBmaWxsLW9wYWNpdHk6IDE7XG4gICAgICB9XG4gICAgICAmOmhvdmVyID4gLnNjcnViYmVyLWhhbmRsZSB7XG4gICAgICAgIGZpbGw6ICM0NGY7XG4gICAgICB9XG4gICAgICAmOmhvdmVyICsgLnNjcnViYmVyLmxpbmUge1xuICAgICAgICBzdHJva2U6ICM0NGY7XG4gICAgICB9XG4gICAgYCxcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIFNjcnViYmVyUHJvcHMgPSB7XG4gIGlzRHJhZ2dpbmc6IGJvb2xlYW47XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIG9uTW91c2VEb3duOiAoZXZ0OiBSZWFjdC5Nb3VzZUV2ZW50PGFueT4pID0+IHZvaWQ7XG4gIG9uTW91c2VFbnRlcjogKGV2dDogUmVhY3QuTW91c2VFdmVudDxhbnk+KSA9PiB2b2lkO1xuICBvbk1vdXNlTGVhdmU6IChldnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8YW55PikgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNjcnViYmVyKHsgaXNEcmFnZ2luZywgb25Nb3VzZURvd24sIG9uTW91c2VFbnRlciwgb25Nb3VzZUxlYXZlLCBwb3NpdGlvbiB9OiBTY3J1YmJlclByb3BzKSB7XG4gIGNvbnN0IHhQZXJjZW50ID0gYCR7cG9zaXRpb24gKiAxMDB9JWA7XG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcbiAgY29uc3QgY2xhc3NOYW1lID0gY3goeyBbc3R5bGVzLlNjcnViYmVyRHJhZ2dpbmddOiBpc0RyYWdnaW5nIH0pO1xuICByZXR1cm4gKFxuICAgIDxnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBkYXRhLXRlc3RpZD1cInNjcnViYmVyLWNvbXBvbmVudFwiPlxuICAgICAgPGdcbiAgICAgICAgZGF0YS10ZXN0aWQ9XCJzY3J1YmJlci1jb21wb25lbnQtZ1wiXG4gICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLlNjcnViYmVySGFuZGxlc31cbiAgICAgICAgb25Nb3VzZURvd249e29uTW91c2VEb3dufVxuICAgICAgICBvbk1vdXNlRW50ZXI9e29uTW91c2VFbnRlcn1cbiAgICAgICAgb25Nb3VzZUxlYXZlPXtvbk1vdXNlTGVhdmV9XG4gICAgICA+XG4gICAgICAgIHsvKiBoYW5kbGVFeHBhbnNpb24gaXMgb25seSB2aXNpYmxlIHdoZW4gYGlzRHJhZ2dpbmdgIGlzIHRydWUgKi99XG4gICAgICAgIDxyZWN0XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJzY3J1YmJlci1jb21wb25lbnQtcmVjdC0xXCJcbiAgICAgICAgICB4PXt4UGVyY2VudH1cbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5TY3J1YmJlckhhbmRsZUV4cGFuc2lvbn1cbiAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoLTQuNXB4KWAgfX1cbiAgICAgICAgICB3aWR0aD1cIjlcIlxuICAgICAgICAgIGhlaWdodD1cIjIwXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHJlY3RcbiAgICAgICAgICBkYXRhLXRlc3RpZD1cInNjcnViYmVyLWNvbXBvbmVudC1yZWN0LTJcIlxuICAgICAgICAgIHg9e3hQZXJjZW50fVxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLlNjcnViYmVySGFuZGxlfVxuICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgtMS41cHgpYCB9fVxuICAgICAgICAgIHdpZHRoPVwiM1wiXG4gICAgICAgICAgaGVpZ2h0PVwiMjBcIlxuICAgICAgICAvPlxuICAgICAgPC9nPlxuICAgICAgPGxpbmVcbiAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuU2NydWJiZXJMaW5lfVxuICAgICAgICB5Mj1cIjEwMCVcIlxuICAgICAgICB4MT17eFBlcmNlbnR9XG4gICAgICAgIHgyPXt4UGVyY2VudH1cbiAgICAgICAgZGF0YS10ZXN0aWQ9XCJzY3J1YmJlci1jb21wb25lbnQtbGluZVwiXG4gICAgICAvPlxuICAgIDwvZz5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixTQUFTQyxVQUFVLFFBQVEsYUFBYTtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQSxFQUFBQyxJQUFBLElBQUFDLEtBQUE7QUFFekMsT0FBTyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBQSxFQUFTO0VBQzdCLE9BQU87SUFDTEMsdUJBQXVCLEVBQUVSLEVBQUUsQ0FDekJELEdBQUcsQ0FBQVUsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLDJCQUFBLHVJQU1ILDJCQUNGLENBQUM7SUFDREMsY0FBYyxFQUFFWCxFQUFFLENBQ2hCRCxHQUFHLENBQUFhLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFGLDJCQUFBLG9HQUtILGlCQUNGLENBQUM7SUFDREcsWUFBWSxFQUFFYixFQUFFLENBQ2RELEdBQUcsQ0FBQWUsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUosMkJBQUEsc0dBS0gsZUFDRixDQUFDO0lBQ0RLLGdCQUFnQixFQUFFaEIsR0FBRyxDQUFBaUIsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQU4sMkJBQUEsNk9BV3BCO0lBQ0RPLGVBQWUsRUFBRWxCLEdBQUcsQ0FBQW1CLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFSLDJCQUFBO0VBWXRCLENBQUM7QUFDSCxDQUFDO0FBVUQsZUFBZSxTQUFTUyxRQUFRQSxDQUFBQyxJQUFBLEVBQW1GO0VBQUEsSUFBQUMsR0FBQTtFQUFBLElBQWhGQyxVQUFVLEdBQUFGLElBQUEsQ0FBVkUsVUFBVTtJQUFFQyxXQUFXLEdBQUFILElBQUEsQ0FBWEcsV0FBVztJQUFFQyxZQUFZLEdBQUFKLElBQUEsQ0FBWkksWUFBWTtJQUFFQyxZQUFZLEdBQUFMLElBQUEsQ0FBWkssWUFBWTtJQUFFQyxRQUFRLEdBQUFOLElBQUEsQ0FBUk0sUUFBUTtFQUM5RixJQUFNQyxRQUFRLEdBQU1ELFFBQVEsR0FBRyxHQUFHLE1BQUc7RUFDckMsSUFBTUUsTUFBTSxHQUFHMUIsVUFBVSxDQUFDSyxTQUFTLENBQUM7RUFDcEMsSUFBTXNCLFNBQVMsR0FBRzdCLEVBQUUsRUFBQXFCLEdBQUEsT0FBQUEsR0FBQSxDQUFJTyxNQUFNLENBQUNiLGdCQUFnQixJQUFHTyxVQUFVLEVBQUFELEdBQUEsQ0FBRSxDQUFDO0VBQy9ELG9CQUNFZixLQUFBO0lBQUd1QixTQUFTLEVBQUVBLFNBQVU7SUFBQyxlQUFZLG9CQUFvQjtJQUFBQyxRQUFBLGdCQUN2RHhCLEtBQUE7TUFDRSxlQUFZLHNCQUFzQjtNQUNsQ3VCLFNBQVMsRUFBRUQsTUFBTSxDQUFDWCxlQUFnQjtNQUNsQ00sV0FBVyxFQUFFQSxXQUFZO01BQ3pCQyxZQUFZLEVBQUVBLFlBQWE7TUFDM0JDLFlBQVksRUFBRUEsWUFBYTtNQUFBSyxRQUFBLGdCQUczQjFCLElBQUE7UUFDRSxlQUFZLDJCQUEyQjtRQUN2QzJCLENBQUMsRUFBRUosUUFBUztRQUNaRSxTQUFTLEVBQUVELE1BQU0sQ0FBQ3BCLHVCQUF3QjtRQUMxQ3dCLEtBQUssRUFBRTtVQUFFQyxTQUFTO1FBQXNCLENBQUU7UUFDMUNDLEtBQUssRUFBQyxHQUFHO1FBQ1RDLE1BQU0sRUFBQztNQUFJLENBQ1osQ0FBQyxlQUNGL0IsSUFBQTtRQUNFLGVBQVksMkJBQTJCO1FBQ3ZDMkIsQ0FBQyxFQUFFSixRQUFTO1FBQ1pFLFNBQVMsRUFBRUQsTUFBTSxDQUFDakIsY0FBZTtRQUNqQ3FCLEtBQUssRUFBRTtVQUFFQyxTQUFTO1FBQXNCLENBQUU7UUFDMUNDLEtBQUssRUFBQyxHQUFHO1FBQ1RDLE1BQU0sRUFBQztNQUFJLENBQ1osQ0FBQztJQUFBLENBQ0QsQ0FBQyxlQUNKL0IsSUFBQTtNQUNFeUIsU0FBUyxFQUFFRCxNQUFNLENBQUNmLFlBQWE7TUFDL0J1QixFQUFFLEVBQUMsTUFBTTtNQUNUQyxFQUFFLEVBQUVWLFFBQVM7TUFDYlcsRUFBRSxFQUFFWCxRQUFTO01BQ2IsZUFBWTtJQUF5QixDQUN0QyxDQUFDO0VBQUEsQ0FDRCxDQUFDO0FBRVIiLCJpZ25vcmVMaXN0IjpbXX0=