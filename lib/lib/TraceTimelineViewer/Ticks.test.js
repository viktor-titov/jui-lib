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

import { render } from '@testing-library/react';
import React from 'react';
import Ticks from './Ticks';
import { jsx as _jsx } from "react/jsx-runtime";
describe('<Ticks>', function () {
  it('renders without exploding', function () {
    expect(function () {
      return render( /*#__PURE__*/_jsx(Ticks, {
        endTime: 200,
        numTicks: 5,
        showLabels: true,
        startTime: 100
      }));
    }).not.toThrow();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJSZWFjdCIsIlRpY2tzIiwianN4IiwiX2pzeCIsImRlc2NyaWJlIiwiaXQiLCJleHBlY3QiLCJlbmRUaW1lIiwibnVtVGlja3MiLCJzaG93TGFiZWxzIiwic3RhcnRUaW1lIiwibm90IiwidG9UaHJvdyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9UaWNrcy50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgVGlja3MgZnJvbSAnLi9UaWNrcyc7XG5cbmRlc2NyaWJlKCc8VGlja3M+JywgKCkgPT4ge1xuICBpdCgncmVuZGVycyB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT4gcmVuZGVyKDxUaWNrcyBlbmRUaW1lPXsyMDB9IG51bVRpY2tzPXs1fSBzaG93TGFiZWxzIHN0YXJ0VGltZT17MTAwfSAvPikpLm5vdC50b1Rocm93KCk7XG4gIH0pO1xufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLE1BQU0sUUFBUSx3QkFBd0I7QUFDL0MsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsT0FBT0MsS0FBSyxNQUFNLFNBQVM7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFNUJDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBTTtFQUN4QkMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLFlBQU07SUFDcENDLE1BQU0sQ0FBQztNQUFBLE9BQU1QLE1BQU0sZUFBQ0ksSUFBQSxDQUFDRixLQUFLO1FBQUNNLE9BQU8sRUFBRSxHQUFJO1FBQUNDLFFBQVEsRUFBRSxDQUFFO1FBQUNDLFVBQVU7UUFBQ0MsU0FBUyxFQUFFO01BQUksQ0FBRSxDQUFDLENBQUM7SUFBQSxFQUFDLENBQUNDLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDLENBQUM7RUFDckcsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119