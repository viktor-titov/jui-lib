import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
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
import React from 'react';
import { useStyles2 } from '@grafana/ui';
import { jsx as _jsx } from "react/jsx-runtime";
var getStyles = function getStyles() {
  return {
    GraphTick: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: GraphTick;\n      stroke: #aaa;\n      stroke-width: 1px;\n    "])))
  };
};
export default function GraphTicks(props) {
  var numTicks = props.numTicks;
  var styles = useStyles2(getStyles);
  var ticks = [];
  // i starts at 1, limit is `i < numTicks` so the first and last ticks aren't drawn
  for (var i = 1; i < numTicks; i++) {
    var x = i / numTicks * 100 + "%";
    ticks.push( /*#__PURE__*/_jsx("line", {
      className: styles.GraphTick,
      x1: x,
      y1: "0%",
      x2: x,
      y2: "100%"
    }, i / numTicks));
  }
  return /*#__PURE__*/_jsx("g", {
    "data-testid": "ticks",
    "aria-hidden": "true",
    children: ticks
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJSZWFjdCIsInVzZVN0eWxlczIiLCJqc3giLCJfanN4IiwiZ2V0U3R5bGVzIiwiR3JhcGhUaWNrIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiR3JhcGhUaWNrcyIsInByb3BzIiwibnVtVGlja3MiLCJzdHlsZXMiLCJ0aWNrcyIsImkiLCJ4IiwicHVzaCIsImNsYXNzTmFtZSIsIngxIiwieTEiLCJ4MiIsInkyIiwiY2hpbGRyZW4iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1RyYWNlUGFnZUhlYWRlci9TcGFuR3JhcGgvR3JhcGhUaWNrcy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5jb25zdCBnZXRTdHlsZXMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgR3JhcGhUaWNrOiBjc3NgXG4gICAgICBsYWJlbDogR3JhcGhUaWNrO1xuICAgICAgc3Ryb2tlOiAjYWFhO1xuICAgICAgc3Ryb2tlLXdpZHRoOiAxcHg7XG4gICAgYCxcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIEdyYXBoVGlja3NQcm9wcyA9IHtcbiAgbnVtVGlja3M6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdyYXBoVGlja3MocHJvcHM6IEdyYXBoVGlja3NQcm9wcykge1xuICBjb25zdCB7IG51bVRpY2tzIH0gPSBwcm9wcztcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICBjb25zdCB0aWNrcyA9IFtdO1xuICAvLyBpIHN0YXJ0cyBhdCAxLCBsaW1pdCBpcyBgaSA8IG51bVRpY2tzYCBzbyB0aGUgZmlyc3QgYW5kIGxhc3QgdGlja3MgYXJlbid0IGRyYXduXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbnVtVGlja3M7IGkrKykge1xuICAgIGNvbnN0IHggPSBgJHsoaSAvIG51bVRpY2tzKSAqIDEwMH0lYDtcbiAgICB0aWNrcy5wdXNoKDxsaW5lIGNsYXNzTmFtZT17c3R5bGVzLkdyYXBoVGlja30geDE9e3h9IHkxPVwiMCVcIiB4Mj17eH0geTI9XCIxMDAlXCIga2V5PXtpIC8gbnVtVGlja3N9IC8+KTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGcgZGF0YS10ZXN0aWQ9XCJ0aWNrc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAge3RpY2tzfVxuICAgIDwvZz5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixTQUFTQyxVQUFVLFFBQVEsYUFBYTtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUV6QyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBQSxFQUFTO0VBQ3RCLE9BQU87SUFDTEMsU0FBUyxFQUFFTixHQUFHLENBQUFPLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQTtFQUtoQixDQUFDO0FBQ0gsQ0FBQztBQU1ELGVBQWUsU0FBU0MsVUFBVUEsQ0FBQ0MsS0FBc0IsRUFBRTtFQUN6RCxJQUFRQyxRQUFRLEdBQUtELEtBQUssQ0FBbEJDLFFBQVE7RUFDaEIsSUFBTUMsTUFBTSxHQUFHVixVQUFVLENBQUNHLFNBQVMsQ0FBQztFQUNwQyxJQUFNUSxLQUFLLEdBQUcsRUFBRTtFQUNoQjtFQUNBLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHSCxRQUFRLEVBQUVHLENBQUMsRUFBRSxFQUFFO0lBQ2pDLElBQU1DLENBQUMsR0FBT0QsQ0FBQyxHQUFHSCxRQUFRLEdBQUksR0FBRyxNQUFHO0lBQ3BDRSxLQUFLLENBQUNHLElBQUksZUFBQ1osSUFBQTtNQUFNYSxTQUFTLEVBQUVMLE1BQU0sQ0FBQ04sU0FBVTtNQUFDWSxFQUFFLEVBQUVILENBQUU7TUFBQ0ksRUFBRSxFQUFDLElBQUk7TUFBQ0MsRUFBRSxFQUFFTCxDQUFFO01BQUNNLEVBQUUsRUFBQztJQUFNLEdBQU1QLENBQUMsR0FBR0gsUUFBVyxDQUFDLENBQUM7RUFDdEc7RUFFQSxvQkFDRVAsSUFBQTtJQUFHLGVBQVksT0FBTztJQUFDLGVBQVksTUFBTTtJQUFBa0IsUUFBQSxFQUN0Q1Q7RUFBSyxDQUNMLENBQUM7QUFFUiIsImlnbm9yZUxpc3QiOltdfQ==