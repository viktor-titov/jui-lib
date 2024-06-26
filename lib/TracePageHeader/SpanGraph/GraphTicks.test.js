import _extends from "@babel/runtime/helpers/extends";
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

import { render, screen } from '@testing-library/react';
import React from 'react';
import GraphTicks from './GraphTicks';
import { jsx as _jsx } from "react/jsx-runtime";
var setup = function setup(propOverrides) {
  var defaultProps = _extends({
    items: [{
      valueWidth: 100,
      valueOffset: 25,
      serviceName: 'a'
    }, {
      valueWidth: 100,
      valueOffset: 50,
      serviceName: 'b'
    }],
    valueWidth: 200,
    numTicks: 4
  }, propOverrides);
  return render( /*#__PURE__*/_jsx("svg", {
    children: /*#__PURE__*/_jsx(GraphTicks, _extends({}, defaultProps))
  }));
};
describe('GraphTicks tests', function () {
  it('creates a <g> for ticks', function () {
    setup();
    expect(screen.getByTestId('ticks')).toBeInTheDocument();
  });
  it('creates a line for each ticks excluding the first and last', function () {
    setup({
      numTicks: 6
    });

    // defaultProps.numTicks - 1 === expect
    expect(screen.getByTestId('ticks').children).toHaveLength(5);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIkdyYXBoVGlja3MiLCJqc3giLCJfanN4Iiwic2V0dXAiLCJwcm9wT3ZlcnJpZGVzIiwiZGVmYXVsdFByb3BzIiwiX2V4dGVuZHMiLCJpdGVtcyIsInZhbHVlV2lkdGgiLCJ2YWx1ZU9mZnNldCIsInNlcnZpY2VOYW1lIiwibnVtVGlja3MiLCJjaGlsZHJlbiIsImRlc2NyaWJlIiwiaXQiLCJleHBlY3QiLCJnZXRCeVRlc3RJZCIsInRvQmVJblRoZURvY3VtZW50IiwidG9IYXZlTGVuZ3RoIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1RyYWNlUGFnZUhlYWRlci9TcGFuR3JhcGgvR3JhcGhUaWNrcy50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVyLCBzY3JlZW4gfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBHcmFwaFRpY2tzLCB7IEdyYXBoVGlja3NQcm9wcyB9IGZyb20gJy4vR3JhcGhUaWNrcyc7XG5cbmNvbnN0IHNldHVwID0gKHByb3BPdmVycmlkZXM/OiBHcmFwaFRpY2tzUHJvcHMpID0+IHtcbiAgY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICAgIGl0ZW1zOiBbXG4gICAgICB7IHZhbHVlV2lkdGg6IDEwMCwgdmFsdWVPZmZzZXQ6IDI1LCBzZXJ2aWNlTmFtZTogJ2EnIH0sXG4gICAgICB7IHZhbHVlV2lkdGg6IDEwMCwgdmFsdWVPZmZzZXQ6IDUwLCBzZXJ2aWNlTmFtZTogJ2InIH0sXG4gICAgXSxcbiAgICB2YWx1ZVdpZHRoOiAyMDAsXG4gICAgbnVtVGlja3M6IDQsXG4gICAgLi4ucHJvcE92ZXJyaWRlcyxcbiAgfTtcblxuICByZXR1cm4gcmVuZGVyKFxuICAgIDxzdmc+XG4gICAgICA8R3JhcGhUaWNrcyB7Li4uZGVmYXVsdFByb3BzfSAvPlxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuZGVzY3JpYmUoJ0dyYXBoVGlja3MgdGVzdHMnLCAoKSA9PiB7XG4gIGl0KCdjcmVhdGVzIGEgPGc+IGZvciB0aWNrcycsICgpID0+IHtcbiAgICBzZXR1cCgpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgndGlja3MnKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgfSk7XG5cbiAgaXQoJ2NyZWF0ZXMgYSBsaW5lIGZvciBlYWNoIHRpY2tzIGV4Y2x1ZGluZyB0aGUgZmlyc3QgYW5kIGxhc3QnLCAoKSA9PiB7XG4gICAgc2V0dXAoeyBudW1UaWNrczogNiB9KTtcblxuICAgIC8vIGRlZmF1bHRQcm9wcy5udW1UaWNrcyAtIDEgPT09IGV4cGVjdFxuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ3RpY2tzJykuY2hpbGRyZW4pLnRvSGF2ZUxlbmd0aCg1KTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLE1BQU0sRUFBRUMsTUFBTSxRQUFRLHdCQUF3QjtBQUN2RCxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixPQUFPQyxVQUFVLE1BQTJCLGNBQWM7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFM0QsSUFBTUMsS0FBSyxHQUFHLFNBQVJBLEtBQUtBLENBQUlDLGFBQStCLEVBQUs7RUFDakQsSUFBTUMsWUFBWSxHQUFBQyxRQUFBO0lBQ2hCQyxLQUFLLEVBQUUsQ0FDTDtNQUFFQyxVQUFVLEVBQUUsR0FBRztNQUFFQyxXQUFXLEVBQUUsRUFBRTtNQUFFQyxXQUFXLEVBQUU7SUFBSSxDQUFDLEVBQ3REO01BQUVGLFVBQVUsRUFBRSxHQUFHO01BQUVDLFdBQVcsRUFBRSxFQUFFO01BQUVDLFdBQVcsRUFBRTtJQUFJLENBQUMsQ0FDdkQ7SUFDREYsVUFBVSxFQUFFLEdBQUc7SUFDZkcsUUFBUSxFQUFFO0VBQUMsR0FDUlAsYUFBYSxDQUNqQjtFQUVELE9BQU9QLE1BQU0sZUFDWEssSUFBQTtJQUFBVSxRQUFBLGVBQ0VWLElBQUEsQ0FBQ0YsVUFBVSxFQUFBTSxRQUFBLEtBQUtELFlBQVksQ0FBRztFQUFDLENBQzdCLENBQ1AsQ0FBQztBQUNILENBQUM7QUFFRFEsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDakNDLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxZQUFNO0lBQ2xDWCxLQUFLLENBQUMsQ0FBQztJQUVQWSxNQUFNLENBQUNqQixNQUFNLENBQUNrQixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQ0MsaUJBQWlCLENBQUMsQ0FBQztFQUN6RCxDQUFDLENBQUM7RUFFRkgsRUFBRSxDQUFDLDREQUE0RCxFQUFFLFlBQU07SUFDckVYLEtBQUssQ0FBQztNQUFFUSxRQUFRLEVBQUU7SUFBRSxDQUFDLENBQUM7O0lBRXRCO0lBQ0FJLE1BQU0sQ0FBQ2pCLE1BQU0sQ0FBQ2tCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQ0osUUFBUSxDQUFDLENBQUNNLFlBQVksQ0FBQyxDQUFDLENBQUM7RUFDOUQsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119