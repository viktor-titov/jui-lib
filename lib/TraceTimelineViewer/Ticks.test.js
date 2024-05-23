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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJSZWFjdCIsIlRpY2tzIiwianN4IiwiX2pzeCIsImRlc2NyaWJlIiwiaXQiLCJleHBlY3QiLCJlbmRUaW1lIiwibnVtVGlja3MiLCJzaG93TGFiZWxzIiwic3RhcnRUaW1lIiwibm90IiwidG9UaHJvdyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1RpY2tzLnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBUaWNrcyBmcm9tICcuL1RpY2tzJztcblxuZGVzY3JpYmUoJzxUaWNrcz4nLCAoKSA9PiB7XG4gIGl0KCdyZW5kZXJzIHdpdGhvdXQgZXhwbG9kaW5nJywgKCkgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiByZW5kZXIoPFRpY2tzIGVuZFRpbWU9ezIwMH0gbnVtVGlja3M9ezV9IHNob3dMYWJlbHMgc3RhcnRUaW1lPXsxMDB9IC8+KSkubm90LnRvVGhyb3coKTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsTUFBTSxRQUFRLHdCQUF3QjtBQUMvQyxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixPQUFPQyxLQUFLLE1BQU0sU0FBUztBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUU1QkMsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFNO0VBQ3hCQyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsWUFBTTtJQUNwQ0MsTUFBTSxDQUFDO01BQUEsT0FBTVAsTUFBTSxlQUFDSSxJQUFBLENBQUNGLEtBQUs7UUFBQ00sT0FBTyxFQUFFLEdBQUk7UUFBQ0MsUUFBUSxFQUFFLENBQUU7UUFBQ0MsVUFBVTtRQUFDQyxTQUFTLEVBQUU7TUFBSSxDQUFFLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FBQ0MsR0FBRyxDQUFDQyxPQUFPLENBQUMsQ0FBQztFQUNyRyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=