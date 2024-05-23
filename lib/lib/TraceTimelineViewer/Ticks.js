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
import { formatDuration } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
var getStyles = function getStyles(theme) {
  return {
    Ticks: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: Ticks;\n      pointer-events: none;\n    "]))),
    TicksTick: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: TicksTick;\n      position: absolute;\n      height: 100%;\n      width: 1px;\n      background: ", ";\n      &:last-child {\n        width: 0;\n      }\n    "])), autoColor(theme, '#d8d8d8')),
    TicksTickLabel: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: TicksTickLabel;\n      left: 0.25rem;\n      position: absolute;\n    "]))),
    TicksTickLabelEndAnchor: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: TicksTickLabelEndAnchor;\n      left: initial;\n      right: 0.25rem;\n    "])))
  };
};
export default function Ticks(props) {
  var endTime = props.endTime,
    numTicks = props.numTicks,
    showLabels = props.showLabels,
    startTime = props.startTime;
  var labels;
  if (showLabels) {
    labels = [];
    var viewingDuration = (endTime || 0) - (startTime || 0);
    for (var i = 0; i < numTicks; i++) {
      var durationAtTick = (startTime || 0) + i / (numTicks - 1) * viewingDuration;
      labels.push(formatDuration(durationAtTick));
    }
  }
  var styles = useStyles2(getStyles);
  var ticks = [];
  for (var _i = 0; _i < numTicks; _i++) {
    var _cx;
    var portion = _i / (numTicks - 1);
    ticks.push( /*#__PURE__*/_jsx("div", {
      "data-testid": "TicksID",
      className: styles.TicksTick,
      style: {
        left: portion * 100 + "%"
      },
      children: labels && /*#__PURE__*/_jsx("span", {
        className: cx(styles.TicksTickLabel, (_cx = {}, _cx[styles.TicksTickLabelEndAnchor] = portion >= 1, _cx)),
        children: labels[_i]
      })
    }, portion));
  }
  return /*#__PURE__*/_jsx("div", {
    className: styles.Ticks,
    children: ticks
  });
}
Ticks.defaultProps = {
  endTime: null,
  showLabels: null,
  startTime: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImF1dG9Db2xvciIsImZvcm1hdER1cmF0aW9uIiwianN4IiwiX2pzeCIsImdldFN0eWxlcyIsInRoZW1lIiwiVGlja3MiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJUaWNrc1RpY2siLCJfdGVtcGxhdGVPYmplY3QyIiwiVGlja3NUaWNrTGFiZWwiLCJfdGVtcGxhdGVPYmplY3QzIiwiVGlja3NUaWNrTGFiZWxFbmRBbmNob3IiLCJfdGVtcGxhdGVPYmplY3Q0IiwicHJvcHMiLCJlbmRUaW1lIiwibnVtVGlja3MiLCJzaG93TGFiZWxzIiwic3RhcnRUaW1lIiwibGFiZWxzIiwidmlld2luZ0R1cmF0aW9uIiwiaSIsImR1cmF0aW9uQXRUaWNrIiwicHVzaCIsInN0eWxlcyIsInRpY2tzIiwiX2N4IiwicG9ydGlvbiIsImNsYXNzTmFtZSIsInN0eWxlIiwibGVmdCIsImNoaWxkcmVuIiwiZGVmYXVsdFByb3BzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVRpbWVsaW5lVmlld2VyL1RpY2tzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR3JhZmFuYVRoZW1lMiB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgdXNlU3R5bGVzMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgYXV0b0NvbG9yIH0gZnJvbSAnLi4vVGhlbWUnO1xuaW1wb3J0IHsgVE5pbCB9IGZyb20gJy4uL3R5cGVzJztcblxuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgVGlja3M6IGNzc2BcbiAgICAgIGxhYmVsOiBUaWNrcztcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIGAsXG4gICAgVGlja3NUaWNrOiBjc3NgXG4gICAgICBsYWJlbDogVGlja3NUaWNrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgd2lkdGg6IDFweDtcbiAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2Q4ZDhkOCcpfTtcbiAgICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgfVxuICAgIGAsXG4gICAgVGlja3NUaWNrTGFiZWw6IGNzc2BcbiAgICAgIGxhYmVsOiBUaWNrc1RpY2tMYWJlbDtcbiAgICAgIGxlZnQ6IDAuMjVyZW07XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYCxcbiAgICBUaWNrc1RpY2tMYWJlbEVuZEFuY2hvcjogY3NzYFxuICAgICAgbGFiZWw6IFRpY2tzVGlja0xhYmVsRW5kQW5jaG9yO1xuICAgICAgbGVmdDogaW5pdGlhbDtcbiAgICAgIHJpZ2h0OiAwLjI1cmVtO1xuICAgIGAsXG4gIH07XG59O1xuXG50eXBlIFRpY2tzUHJvcHMgPSB7XG4gIGVuZFRpbWU/OiBudW1iZXIgfCBUTmlsO1xuICBudW1UaWNrczogbnVtYmVyO1xuICBzaG93TGFiZWxzPzogYm9vbGVhbiB8IFROaWw7XG4gIHN0YXJ0VGltZT86IG51bWJlciB8IFROaWw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUaWNrcyhwcm9wczogVGlja3NQcm9wcykge1xuICBjb25zdCB7IGVuZFRpbWUsIG51bVRpY2tzLCBzaG93TGFiZWxzLCBzdGFydFRpbWUgfSA9IHByb3BzO1xuXG4gIGxldCBsYWJlbHM6IHVuZGVmaW5lZCB8IHN0cmluZ1tdO1xuICBpZiAoc2hvd0xhYmVscykge1xuICAgIGxhYmVscyA9IFtdO1xuICAgIGNvbnN0IHZpZXdpbmdEdXJhdGlvbiA9IChlbmRUaW1lIHx8IDApIC0gKHN0YXJ0VGltZSB8fCAwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRpY2tzOyBpKyspIHtcbiAgICAgIGNvbnN0IGR1cmF0aW9uQXRUaWNrID0gKHN0YXJ0VGltZSB8fCAwKSArIChpIC8gKG51bVRpY2tzIC0gMSkpICogdmlld2luZ0R1cmF0aW9uO1xuICAgICAgbGFiZWxzLnB1c2goZm9ybWF0RHVyYXRpb24oZHVyYXRpb25BdFRpY2spKTtcbiAgICB9XG4gIH1cbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICBjb25zdCB0aWNrczogUmVhY3QuUmVhY3ROb2RlW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UaWNrczsgaSsrKSB7XG4gICAgY29uc3QgcG9ydGlvbiA9IGkgLyAobnVtVGlja3MgLSAxKTtcbiAgICB0aWNrcy5wdXNoKFxuICAgICAgPGRpdlxuICAgICAgICBkYXRhLXRlc3RpZD1cIlRpY2tzSURcIlxuICAgICAgICBrZXk9e3BvcnRpb259XG4gICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLlRpY2tzVGlja31cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBsZWZ0OiBgJHtwb3J0aW9uICogMTAwfSVgLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7bGFiZWxzICYmIChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2N4KHN0eWxlcy5UaWNrc1RpY2tMYWJlbCwgeyBbc3R5bGVzLlRpY2tzVGlja0xhYmVsRW5kQW5jaG9yXTogcG9ydGlvbiA+PSAxIH0pfT5cbiAgICAgICAgICAgIHtsYWJlbHNbaV19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5UaWNrc30+e3RpY2tzfTwvZGl2Pjtcbn1cblxuVGlja3MuZGVmYXVsdFByb3BzID0ge1xuICBlbmRUaW1lOiBudWxsLFxuICBzaG93TGFiZWxzOiBudWxsLFxuICBzdGFydFRpbWU6IG51bGwsXG59O1xuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEVBQUUsTUFBTSxZQUFZO0FBQzNCLE9BQU8sS0FBS0MsS0FBSyxNQUFNLE9BQU87QUFHOUIsU0FBU0MsVUFBVSxR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