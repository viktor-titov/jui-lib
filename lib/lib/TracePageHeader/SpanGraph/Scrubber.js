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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJTY3J1YmJlckhhbmRsZUV4cGFuc2lvbiIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsIlNjcnViYmVySGFuZGxlIiwiX3RlbXBsYXRlT2JqZWN0MiIsIlNjcnViYmVyTGluZSIsIl90ZW1wbGF0ZU9iamVjdDMiLCJTY3J1YmJlckRyYWdnaW5nIiwiX3RlbXBsYXRlT2JqZWN0NCIsIlNjcnViYmVySGFuZGxlcyIsIl90ZW1wbGF0ZU9iamVjdDUiLCJTY3J1YmJlciIsIl9yZWYiLCJfY3giLCJpc0RyYWdnaW5nIiwib25Nb3VzZURvd24iLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJwb3NpdGlvbiIsInhQZXJjZW50Iiwic3R5bGVzIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJ4Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJ3aWR0aCIsImhlaWdodCIsInkyIiwieDEiLCJ4MiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VQYWdlSGVhZGVyL1NwYW5HcmFwaC9TY3J1YmJlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5leHBvcnQgY29uc3QgZ2V0U3R5bGVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIFNjcnViYmVySGFuZGxlRXhwYW5zaW9uOiBjeChcbiAgICAgIGNzc2BcbiAgICAgICAgbGFiZWw6IFNjcnViYmVySGFuZGxlRXhwYW5zaW9uO1xuICAgICAgICBjdXJzb3I6IGNvbC1yZXNpemU7XG4gICAgICAgIGZpbGwtb3BhY2l0eTogMDtcbiAgICAgICAgZmlsbDogIzQ0ZjtcbiAgICAgIGAsXG4gICAgICAnc2NydWJiZXItaGFuZGxlLWV4cGFuc2lvbidcbiAgICApLFxuICAgIFNjcnViYmVySGFuZGxlOiBjeChcbiAgICAgIGNzc2BcbiAgICAgICAgbGFiZWw6IFNjcnViYmVySGFuZGxlO1xuICAgICAgICBjdXJzb3I6IGNvbC1yZXNpemU7XG4gICAgICAgIGZpbGw6ICM1NTU7XG4gICAgICBgLFxuICAgICAgJ3NjcnViYmVyLWhhbmRsZSdcbiAgICApLFxuICAgIFNjcnViYmVyTGluZTogY3goXG4gICAgICBjc3NgXG4gICAgICAgIGxhYmVsOiBTY3J1YmJlckxpbmU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICBzdHJva2U6ICM1NTU7XG4gICAgICBgLFxuICAgICAgJ3NjcnViYmVyLWxpbmUnXG4gICAgKSxcbiAgICBTY3J1YmJlckRyYWdnaW5nOiBjc3NgXG4gICAgICBsYWJlbDogU2NydWJiZXJEcmFnZ2luZztcbiAgICAgICYgLnNjcnViYmVyLWhhbmRsZS1leHBhbnNpb24ge1xuICAgICAgICBmaWxsLW9wYWNpdHk6IDE7XG4gICAgICB9XG4gICAgICAmIC5zY3J1YmJlci1oYW5kbGUge1xuICAgICAgICBmaWxsOiAjNDRmO1xuICAgICAgfVxuICAgICAgJiA+IC5zY3J1YmJlci1saW5lIHtcbiAgICAgICAgc3Ryb2tlOiAjNDRmO1xuICAgICAgfVxuICAgIGAsXG4gICAgU2NydWJiZXJIYW5kbGVzOiBjc3NgXG4gICAgICBsYWJlbDogU2NydWJiZXJIYW5kbGVzO1xuICAgICAgJjpob3ZlciA+IC5zY3J1YmJlci1oYW5kbGUtZXhwYW5zaW9uIHtcbiAgICAgICAgZmlsbC1vcGFjaXR5OiAxO1xuICAgICAgfVxuICAgICAgJjpob3ZlciA+IC5zY3J1YmJlci1oYW5kbGUge1xuICAgICAgICBmaWxsOiAjNDRmO1xuICAgICAgfVxuICAgICAgJjpob3ZlciArIC5zY3J1YmJlci5saW5lIHtcbiAgICAgICAgc3Ryb2tlOiAjNDRmO1xuICAgICAgfVxuICAgIGAsXG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBTY3J1YmJlclByb3BzID0ge1xuICBpc0RyYWdnaW5nOiBib29sZWFuO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBvbk1vdXNlRG93bjogKGV2dDogUmVhY3QuTW91c2VFdmVudDxhbnk+KSA9PiB2b2lkO1xuICBvbk1vdXNlRW50ZXI6IChldnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8YW55PikgPT4gdm9pZDtcbiAgb25Nb3VzZUxlYXZlOiAoZXZ0OiBSZWFjdC5Nb3VzZUV2ZW50PGFueT4pID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTY3J1YmJlcih7IGlzRHJhZ2dpbmcsIG9uTW91c2VEb3duLCBvbk1vdXNlRW50ZXIsIG9uTW91c2VMZWF2ZSwgcG9zaXRpb24gfTogU2NydWJiZXJQcm9wcykge1xuICBjb25zdCB4UGVyY2VudCA9IGAke3Bvc2l0aW9uICogMTAwfSVgO1xuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG4gIGNvbnN0IGNsYXNzTmFtZSA9IGN4KHsgW3N0eWxlcy5TY3J1YmJlckRyYWdnaW5nXTogaXNEcmFnZ2luZyB9KTtcbiAgcmV0dXJuIChcbiAgICA8ZyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gZGF0YS10ZXN0aWQ9XCJzY3J1YmJlci1jb21wb25lbnRcIj5cbiAgICAgIDxnXG4gICAgICAgIGRhdGEtdGVzdGlkPVwic2NydWJiZXItY29tcG9uZW50LWdcIlxuICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5TY3J1YmJlckhhbmRsZXN9XG4gICAgICAgIG9uTW91c2VEb3duPXtvbk1vdXNlRG93bn1cbiAgICAgICAgb25Nb3VzZUVudGVyPXtvbk1vdXNlRW50ZXJ9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17b25Nb3VzZUxlYXZlfVxuICAgICAgPlxuICAgICAgICB7LyogaGFuZGxlRXhwYW5zaW9uIGlzIG9ubHkgdmlzaWJsZSB3aGVuIGBpc0RyYWdnaW5nYCBpcyB0cnVlICovfVxuICAgICAgICA8cmVjdFxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwic2NydWJiZXItY29tcG9uZW50LXJlY3QtMVwiXG4gICAgICAgICAgeD17eFBlcmNlbnR9XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuU2NydWJiZXJIYW5kbGVFeHBhbnNpb259XG4gICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKC00LjVweClgIH19XG4gICAgICAgICAgd2lkdGg9XCI5XCJcbiAgICAgICAgICBoZWlnaHQ9XCIyMFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxyZWN0XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJzY3J1YmJlci1jb21wb25lbnQtcmVjdC0yXCJcbiAgICAgICAgICB4PXt4UGVyY2VudH1cbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5TY3J1YmJlckhhbmRsZX1cbiAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoLTEuNXB4KWAgfX1cbiAgICAgICAgICB3aWR0aD1cIjNcIlxuICAgICAgICAgIGhlaWdodD1cIjIwXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZz5cbiAgICAgIDxsaW5lXG4gICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLlNjcnViYmVyTGluZX1cbiAgICAgICAgeTI9XCIxMDAlXCJcbiAgICAgICAgeDE9e3hQZXJjZW50fVxuICAgICAgICB4Mj17eFBlcmNlbnR9XG4gICAgICAgIGRhdGEtdGVzdGlkPVwic2NydWJiZXItY29tcG9uZW50LWxpbmVcIlxuICAgICAgLz5cbiAgICA8L2c+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsRUFBRSxNQUFNLFlBQVk7QUFDM0IsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsU0FBU0MsVUFBVSxRQUFRLGFBQWE7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBRXpDLE9BQU8sSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUEsRUFBUztFQUM3QixPQUFPO0lBQ0xDLHVCQUF1QixFQUFFUixFQUFFLENBQ3pCRCxHQUFHLENBQUFVLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQSx1SUFNSCwyQkFDRixDQUFDO0lBQ0RDLGNBQWMsRUFB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