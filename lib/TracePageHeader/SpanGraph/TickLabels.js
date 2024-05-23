import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2;
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
import { useStyles2 } from '@grafana/ui';
import { formatDuration } from '../../utils/date';
import { jsx as _jsx } from "react/jsx-runtime";
var getStyles = function getStyles() {
  return {
    TickLabels: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: TickLabels;\n      height: 1rem;\n      position: relative;\n    "]))),
    TickLabelsLabel: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: TickLabelsLabel;\n      color: #717171;\n      font-size: 0.7rem;\n      position: absolute;\n      user-select: none;\n    "])))
  };
};
export default function TickLabels(props) {
  var numTicks = props.numTicks,
    duration = props.duration;
  var styles = useStyles2(getStyles);
  var ticks = [];
  for (var i = 0; i < numTicks + 1; i++) {
    var portion = i / numTicks;
    var style = portion === 1 ? {
      right: '0%'
    } : {
      left: portion * 100 + "%"
    };
    ticks.push( /*#__PURE__*/_jsx("div", {
      className: styles.TickLabelsLabel,
      style: style,
      "data-testid": "tick",
      children: formatDuration(duration * portion)
    }, portion));
  }
  return /*#__PURE__*/_jsx("div", {
    className: styles.TickLabels,
    "data-testid": "TickLabels",
    children: ticks
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJSZWFjdCIsInVzZVN0eWxlczIiLCJmb3JtYXREdXJhdGlvbiIsImpzeCIsIl9qc3giLCJnZXRTdHlsZXMiLCJUaWNrTGFiZWxzIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiVGlja0xhYmVsc0xhYmVsIiwiX3RlbXBsYXRlT2JqZWN0MiIsInByb3BzIiwibnVtVGlja3MiLCJkdXJhdGlvbiIsInN0eWxlcyIsInRpY2tzIiwiaSIsInBvcnRpb24iLCJzdHlsZSIsInJpZ2h0IiwibGVmdCIsInB1c2giLCJjbGFzc05hbWUiLCJjaGlsZHJlbiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFjZVBhZ2VIZWFkZXIvU3BhbkdyYXBoL1RpY2tMYWJlbHMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24gfSBmcm9tICcuLi8uLi91dGlscy9kYXRlJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIFRpY2tMYWJlbHM6IGNzc2BcbiAgICAgIGxhYmVsOiBUaWNrTGFiZWxzO1xuICAgICAgaGVpZ2h0OiAxcmVtO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGAsXG4gICAgVGlja0xhYmVsc0xhYmVsOiBjc3NgXG4gICAgICBsYWJlbDogVGlja0xhYmVsc0xhYmVsO1xuICAgICAgY29sb3I6ICM3MTcxNzE7XG4gICAgICBmb250LXNpemU6IDAuN3JlbTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGAsXG4gIH07XG59O1xuXG50eXBlIFRpY2tMYWJlbHNQcm9wcyA9IHtcbiAgbnVtVGlja3M6IG51bWJlcjtcbiAgZHVyYXRpb246IG51bWJlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRpY2tMYWJlbHMocHJvcHM6IFRpY2tMYWJlbHNQcm9wcykge1xuICBjb25zdCB7IG51bVRpY2tzLCBkdXJhdGlvbiB9ID0gcHJvcHM7XG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcblxuICBjb25zdCB0aWNrcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRpY2tzICsgMTsgaSsrKSB7XG4gICAgY29uc3QgcG9ydGlvbiA9IGkgLyBudW1UaWNrcztcbiAgICBjb25zdCBzdHlsZSA9IHBvcnRpb24gPT09IDEgPyB7IHJpZ2h0OiAnMCUnIH0gOiB7IGxlZnQ6IGAke3BvcnRpb24gKiAxMDB9JWAgfTtcbiAgICB0aWNrcy5wdXNoKFxuICAgICAgPGRpdiBrZXk9e3BvcnRpb259IGNsYXNzTmFtZT17c3R5bGVzLlRpY2tMYWJlbHNMYWJlbH0gc3R5bGU9e3N0eWxlfSBkYXRhLXRlc3RpZD1cInRpY2tcIj5cbiAgICAgICAge2Zvcm1hdER1cmF0aW9uKGR1cmF0aW9uICogcG9ydGlvbil9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRpY2tMYWJlbHN9IGRhdGEtdGVzdGlkPVwiVGlja0xhYmVsc1wiPlxuICAgICAge3RpY2tzfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBRXpCLFNBQVNDLFVBQVUsUUFBUSxhQUFhO0FBRXhDLFNBQVNDLGNBQWMsUUFBUSxrQkFBa0I7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFbEQsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUEsRUFBUztFQUN0QixPQUFPO0lBQ0xDLFVBQVUsRUFBRVAsR0FBRyxDQUFBUSxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsMkJBQUEsd0ZBSWQ7SUFDREMsZUFBZSxFQUFFVixHQUFHLENBQUFXLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFGLDJCQUFBO0VBT3RCLENBQUM7QUFDSCxDQUFDO0FBT0QsZUFBZSxTQUFTRixVQUFVQSxDQUFDSyxLQUFzQixFQUFFO0VBQ3pELElBQVFDLFFBQVEsR0FBZUQsS0FBSyxDQUE1QkMsUUFBUTtJQUFFQyxRQUFRLEdBQUtGLEtBQUssQ0FBbEJFLFFBQVE7RUFDMUIsSUFBTUMsTUFBTSxHQUFHYixVQUFVLENBQUNJLFNBQVMsQ0FBQztFQUVwQyxJQUFNVSxLQUFLLEdBQUcsRUFBRTtFQUNoQixLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0osUUFBUSxHQUFHLENBQUMsRUFBRUksQ0FBQyxFQUFFLEVBQUU7SUFDckMsSUFBTUMsT0FBTyxHQUFHRCxDQUFDLEdBQUdKLFFBQVE7SUFDNUIsSUFBTU0sS0FBSyxHQUFHRCxPQUFPLEtBQUssQ0FBQyxHQUFHO01BQUVFLEtBQUssRUFBRTtJQUFLLENBQUMsR0FBRztNQUFFQyxJQUFJLEVBQUtILE9BQU8sR0FBRyxHQUFHO0lBQUksQ0FBQztJQUM3RUYsS0FBSyxDQUFDTSxJQUFJLGVBQ1JqQixJQUFBO01BQW1Ca0IsU0FBUyxFQUFFUixNQUFNLENBQUNMLGVBQWdCO01BQUNTLEtBQUssRUFBRUEsS0FBTTtNQUFDLGVBQVksTUFBTTtNQUFBSyxRQUFBLEVBQ25GckIsY0FBYyxDQUFDVyxRQUFRLEdBQUdJLE9BQU87SUFBQyxHQUQzQkEsT0FFTCxDQUNQLENBQUM7RUFDSDtFQUVBLG9CQUNFYixJQUFBO0lBQUtrQixTQUFTLEVBQUVSLE1BQU0sQ0FBQ1IsVUFBVztJQUFDLGVBQVksWUFBWTtJQUFBaUIsUUFBQSxFQUN4RFI7RUFBSyxDQUNILENBQUM7QUFFViIsImlnbm9yZUxpc3QiOltdfQ==