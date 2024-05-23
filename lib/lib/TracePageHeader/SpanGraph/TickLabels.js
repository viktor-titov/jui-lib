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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJSZWFjdCIsInVzZVN0eWxlczIiLCJmb3JtYXREdXJhdGlvbiIsImpzeCIsIl9qc3giLCJnZXRTdHlsZXMiLCJUaWNrTGFiZWxzIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiVGlja0xhYmVsc0xhYmVsIiwiX3RlbXBsYXRlT2JqZWN0MiIsInByb3BzIiwibnVtVGlja3MiLCJkdXJhdGlvbiIsInN0eWxlcyIsInRpY2tzIiwiaSIsInBvcnRpb24iLCJzdHlsZSIsInJpZ2h0IiwibGVmdCIsInB1c2giLCJjbGFzc05hbWUiLCJjaGlsZHJlbiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VQYWdlSGVhZGVyL1NwYW5HcmFwaC9UaWNrTGFiZWxzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmltcG9ydCB7IGZvcm1hdER1cmF0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvZGF0ZSc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBUaWNrTGFiZWxzOiBjc3NgXG4gICAgICBsYWJlbDogVGlja0xhYmVscztcbiAgICAgIGhlaWdodDogMXJlbTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBgLFxuICAgIFRpY2tMYWJlbHNMYWJlbDogY3NzYFxuICAgICAgbGFiZWw6IFRpY2tMYWJlbHNMYWJlbDtcbiAgICAgIGNvbG9yOiAjNzE3MTcxO1xuICAgICAgZm9udC1zaXplOiAwLjdyZW07XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBgLFxuICB9O1xufTtcblxudHlwZSBUaWNrTGFiZWxzUHJvcHMgPSB7XG4gIG51bVRpY2tzOiBudW1iZXI7XG4gIGR1cmF0aW9uOiBudW1iZXI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUaWNrTGFiZWxzKHByb3BzOiBUaWNrTGFiZWxzUHJvcHMpIHtcbiAgY29uc3QgeyBudW1UaWNrcywgZHVyYXRpb24gfSA9IHByb3BzO1xuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG5cbiAgY29uc3QgdGlja3MgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1UaWNrcyArIDE7IGkrKykge1xuICAgIGNvbnN0IHBvcnRpb24gPSBpIC8gbnVtVGlja3M7XG4gICAgY29uc3Qgc3R5bGUgPSBwb3J0aW9uID09PSAxID8geyByaWdodDogJzAlJyB9IDogeyBsZWZ0OiBgJHtwb3J0aW9uICogMTAwfSVgIH07XG4gICAgdGlja3MucHVzaChcbiAgICAgIDxkaXYga2V5PXtwb3J0aW9ufSBjbGFzc05hbWU9e3N0eWxlcy5UaWNrTGFiZWxzTGFiZWx9IHN0eWxlPXtzdHlsZX0gZGF0YS10ZXN0aWQ9XCJ0aWNrXCI+XG4gICAgICAgIHtmb3JtYXREdXJhdGlvbihkdXJhdGlvbiAqIHBvcnRpb24pfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5UaWNrTGFiZWxzfSBkYXRhLXRlc3RpZD1cIlRpY2tMYWJlbHNcIj5cbiAgICAgIHt0aWNrc31cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixTQUFTQyxVQUFVLFFBQVEsYUFBYTtBQUV4QyxTQUFTQyxjQUFjLFFBQVEsa0JBQWtCO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBO0FBRWxELElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFBLEVBQVM7RUFDdEIsT0FBTztJQUNMQyxVQUFVLEVBQUVQLEdBQUcsQ0FBQVEsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLDJCQUFBLHdGQUlkO0lBQ0RDLGVBQWUsRUFBRVYsR0FBRyxDQUFBVyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBRiwyQkFBQTtFQU90QixDQUFDO0FBQ0gsQ0FBQztBQU9ELGVBQWUsU0FBU0YsVUFBVUEsQ0FBQ0ssS0FBc0IsRUFBRTtFQUN6RCxJQUFRQyxRQUFRLEdBQWVELEtBQUssQ0FBNUJDLFFBQVE7SUFBRUMsUUFBUSxHQUFLRixLQUFLLENBQWxCRSxRQUFRO0VBQzFCLElBQU1DLE1BQU0sR0FBR2IsVUFBVSxDQUFDSSxTQUFTLENBQUM7RUFFcEMsSUFBTVUsS0FBSyxHQUFHLEVBQUU7RUFDaEIsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdKLFFBQVEsR0FBRyxDQUFDLEVBQUVJLENBQUMsRUFBRSxFQUFFO0lBQ3JDLElBQU1DLE9BQU8sR0FBR0QsQ0FBQyxHQUFHSixRQUFRO0lBQzVCLElBQU1NLEtBQUssR0FBR0QsT0FBTyxLQUFLLENBQUMsR0FBRztNQUFFRSxLQUFLLEVBQUU7SUFBSyxDQUFDLEdBQUc7TUFBRUMsSUFBSSxFQUFLSCxPQUFPLEdBQUcsR0FBRztJQUFJLENBQUM7SUFDN0VGLEtBQUssQ0FBQ00sSUFBSSxlQUNSakIsSUFBQTtNQUFtQmtCLFNBQVMsRUFBRVIsTUFBTSxDQUFDTCxlQUFnQjtNQUFDUyxLQUFLLEVBQUVBLEtBQU07TUFBQyxlQUFZLE1BQU07TUFBQUssUUFBQSxFQUNuRnJCLGNBQWMsQ0FBQ1csUUFBUSxHQUFHSSxPQUFPO0lBQUMsR0FEM0JBLE9BRUwsQ0FDUCxDQUFDO0VBQ0g7RUFFQSxvQkFDRWIsSUFBQTtJQUFLa0IsU0FBUyxFQUFFUixNQUFNLENBQUNSLFVBQVc7SUFBQyxlQUFZLFlBQVk7SUFBQWlCLFFBQUEsRUFDeERSO0VBQUssQ0FDSCxDQUFDO0FBRVYiLCJpZ25vcmVMaXN0IjpbXX0=