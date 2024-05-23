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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJSZWFjdCIsInVzZVN0eWxlczIiLCJqc3giLCJfanN4IiwiZ2V0U3R5bGVzIiwiR3JhcGhUaWNrIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiR3JhcGhUaWNrcyIsInByb3BzIiwibnVtVGlja3MiLCJzdHlsZXMiLCJ0aWNrcyIsImkiLCJ4IiwicHVzaCIsImNsYXNzTmFtZSIsIngxIiwieTEiLCJ4MiIsInkyIiwiY2hpbGRyZW4iXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhY2VQYWdlSGVhZGVyL1NwYW5HcmFwaC9HcmFwaFRpY2tzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBHcmFwaFRpY2s6IGNzc2BcbiAgICAgIGxhYmVsOiBHcmFwaFRpY2s7XG4gICAgICBzdHJva2U6ICNhYWE7XG4gICAgICBzdHJva2Utd2lkdGg6IDFweDtcbiAgICBgLFxuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgR3JhcGhUaWNrc1Byb3BzID0ge1xuICBudW1UaWNrczogbnVtYmVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR3JhcGhUaWNrcyhwcm9wczogR3JhcGhUaWNrc1Byb3BzKSB7XG4gIGNvbnN0IHsgbnVtVGlja3MgfSA9IHByb3BzO1xuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG4gIGNvbnN0IHRpY2tzID0gW107XG4gIC8vIGkgc3RhcnRzIGF0IDEsIGxpbWl0IGlzIGBpIDwgbnVtVGlja3NgIHNvIHRoZSBmaXJzdCBhbmQgbGFzdCB0aWNrcyBhcmVuJ3QgZHJhd25cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBudW1UaWNrczsgaSsrKSB7XG4gICAgY29uc3QgeCA9IGAkeyhpIC8gbnVtVGlja3MpICogMTAwfSVgO1xuICAgIHRpY2tzLnB1c2goPGxpbmUgY2xhc3NOYW1lPXtzdHlsZXMuR3JhcGhUaWNrfSB4MT17eH0geTE9XCIwJVwiIHgyPXt4fSB5Mj1cIjEwMCVcIiBrZXk9e2kgLyBudW1UaWNrc30gLz4pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZyBkYXRhLXRlc3RpZD1cInRpY2tzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICB7dGlja3N9XG4gICAgPC9nPlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBRXpCLFNBQVNDLFVBQVUsUUFBUSxhQUFhO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBO0FBRXpDLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFBLEVBQVM7RUFDdEIsT0FBTztJQUNMQyxTQUFTLEVBQUVOLEdBQUcsQ0FBQU8sZUFBQSxLQUFBQSxlQUFBLEdBQUFDLDJCQUFBO0VBS2hCLENBQUM7QUFDSCxDQUFDO0FBTUQsZUFBZSxTQUFTQyxVQUFVQSxDQUFDQyxLQUFzQixFQUFFO0VBQ3pELElBQVFDLFFBQVEsR0FBS0QsS0FBSyxDQUFsQkMsUUFBUTtFQUNoQixJQUFNQyxNQUFNLEdBQUdWLFVBQVUsQ0FBQ0csU0FBUyxDQUFDO0VBQ3BDLElBQU1RLEtBQUssR0FBRyxFQUFFO0VBQ2hCO0VBQ0EsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdILFFBQVEsRUFBRUcsQ0FBQyxFQUFFLEVBQUU7SUFDakMsSUFBTUMsQ0FBQyxHQUFPRCxDQUFDLEdBQUdILFFBQVEsR0FBSSxHQUFHLE1BQUc7SUFDcENFLEtBQUssQ0FBQ0csSUFBSSxlQUFDWixJQUFBO01BQU1hLFNBQVMsRUFBRUwsTUFBTSxDQUFDTixTQUFVO01BQUNZLEVBQUUsRUFBRUgsQ0FBRTtNQUFDSSxFQUFFLEVBQUMsSUFBSTtNQUFDQyxFQUFFLEVBQUVMLENBQUU7TUFBQ00sRUFBRSxFQUFDO0lBQU0sR0FBTVAsQ0FBQyxHQUFHSCxRQUFXLENBQUMsQ0FBQztFQUN0RztFQUVBLG9CQUNFUCxJQUFBO0lBQUcsZUFBWSxPQUFPO0lBQUMsZUFBWSxNQUFNO0lBQUFrQixRQUFBLEVBQ3RDVDtFQUFLLENBQ0wsQ0FBQztBQUVSIiwiaWdub3JlTGlzdCI6W119