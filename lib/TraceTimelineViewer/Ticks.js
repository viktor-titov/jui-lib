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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwidXNlU3R5bGVzMiIsImF1dG9Db2xvciIsImZvcm1hdER1cmF0aW9uIiwianN4IiwiX2pzeCIsImdldFN0eWxlcyIsInRoZW1lIiwiVGlja3MiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJUaWNrc1RpY2siLCJfdGVtcGxhdGVPYmplY3QyIiwiVGlja3NUaWNrTGFiZWwiLCJfdGVtcGxhdGVPYmplY3QzIiwiVGlja3NUaWNrTGFiZWxFbmRBbmNob3IiLCJfdGVtcGxhdGVPYmplY3Q0IiwicHJvcHMiLCJlbmRUaW1lIiwibnVtVGlja3MiLCJzaG93TGFiZWxzIiwic3RhcnRUaW1lIiwibGFiZWxzIiwidmlld2luZ0R1cmF0aW9uIiwiaSIsImR1cmF0aW9uQXRUaWNrIiwicHVzaCIsInN0eWxlcyIsInRpY2tzIiwiX2N4IiwicG9ydGlvbiIsImNsYXNzTmFtZSIsInN0eWxlIiwibGVmdCIsImNoaWxkcmVuIiwiZGVmYXVsdFByb3BzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL1RyYWNlVGltZWxpbmVWaWV3ZXIvVGlja3MudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBHcmFmYW5hVGhlbWUyIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi9UaGVtZSc7XG5pbXBvcnQgeyBUTmlsIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQgeyBmb3JtYXREdXJhdGlvbiB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBnZXRTdHlsZXMgPSAodGhlbWU6IEdyYWZhbmFUaGVtZTIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBUaWNrczogY3NzYFxuICAgICAgbGFiZWw6IFRpY2tzO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgYCxcbiAgICBUaWNrc1RpY2s6IGNzc2BcbiAgICAgIGxhYmVsOiBUaWNrc1RpY2s7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB3aWR0aDogMXB4O1xuICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZDhkOGQ4Jyl9O1xuICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICB9XG4gICAgYCxcbiAgICBUaWNrc1RpY2tMYWJlbDogY3NzYFxuICAgICAgbGFiZWw6IFRpY2tzVGlja0xhYmVsO1xuICAgICAgbGVmdDogMC4yNXJlbTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBgLFxuICAgIFRpY2tzVGlja0xhYmVsRW5kQW5jaG9yOiBjc3NgXG4gICAgICBsYWJlbDogVGlja3NUaWNrTGFiZWxFbmRBbmNob3I7XG4gICAgICBsZWZ0OiBpbml0aWFsO1xuICAgICAgcmlnaHQ6IDAuMjVyZW07XG4gICAgYCxcbiAgfTtcbn07XG5cbnR5cGUgVGlja3NQcm9wcyA9IHtcbiAgZW5kVGltZT86IG51bWJlciB8IFROaWw7XG4gIG51bVRpY2tzOiBudW1iZXI7XG4gIHNob3dMYWJlbHM/OiBib29sZWFuIHwgVE5pbDtcbiAgc3RhcnRUaW1lPzogbnVtYmVyIHwgVE5pbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRpY2tzKHByb3BzOiBUaWNrc1Byb3BzKSB7XG4gIGNvbnN0IHsgZW5kVGltZSwgbnVtVGlja3MsIHNob3dMYWJlbHMsIHN0YXJ0VGltZSB9ID0gcHJvcHM7XG5cbiAgbGV0IGxhYmVsczogdW5kZWZpbmVkIHwgc3RyaW5nW107XG4gIGlmIChzaG93TGFiZWxzKSB7XG4gICAgbGFiZWxzID0gW107XG4gICAgY29uc3Qgdmlld2luZ0R1cmF0aW9uID0gKGVuZFRpbWUgfHwgMCkgLSAoc3RhcnRUaW1lIHx8IDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtVGlja3M7IGkrKykge1xuICAgICAgY29uc3QgZHVyYXRpb25BdFRpY2sgPSAoc3RhcnRUaW1lIHx8IDApICsgKGkgLyAobnVtVGlja3MgLSAxKSkgKiB2aWV3aW5nRHVyYXRpb247XG4gICAgICBsYWJlbHMucHVzaChmb3JtYXREdXJhdGlvbihkdXJhdGlvbkF0VGljaykpO1xuICAgIH1cbiAgfVxuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG4gIGNvbnN0IHRpY2tzOiBSZWFjdC5SZWFjdE5vZGVbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVRpY2tzOyBpKyspIHtcbiAgICBjb25zdCBwb3J0aW9uID0gaSAvIChudW1UaWNrcyAtIDEpO1xuICAgIHRpY2tzLnB1c2goXG4gICAgICA8ZGl2XG4gICAgICAgIGRhdGEtdGVzdGlkPVwiVGlja3NJRFwiXG4gICAgICAgIGtleT17cG9ydGlvbn1cbiAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVGlja3NUaWNrfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGxlZnQ6IGAke3BvcnRpb24gKiAxMDB9JWAsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtsYWJlbHMgJiYgKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y3goc3R5bGVzLlRpY2tzVGlja0xhYmVsLCB7IFtzdHlsZXMuVGlja3NUaWNrTGFiZWxFbmRBbmNob3JdOiBwb3J0aW9uID49IDEgfSl9PlxuICAgICAgICAgICAge2xhYmVsc1tpXX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRpY2tzfT57dGlja3N9PC9kaXY+O1xufVxuXG5UaWNrcy5kZWZhdWx0UHJvcHMgPSB7XG4gIGVuZFRpbWU6IG51bGwsXG4gIHNob3dMYWJlbHM6IG51bGwsXG4gIHN0YXJ0VGltZTogbnVsbCxcbn07XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsRUFBRSxNQUFNLFlBQVk7QUFDM0IsT0FBTyxLQUFLQyxLQUFLLE1BQU0sT0FBTztBQUc5QixTQUFTQyxVQUFVLFFBQVEsYUFB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