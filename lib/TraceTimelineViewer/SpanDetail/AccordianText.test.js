import _extends from "@babel/runtime/helpers/extends";
// Copyright (c) 2019 Uber Technologies, Inc.
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

import { render, screen, within } from '@testing-library/react';
import React from 'react';
import AccordianText from './AccordianText';
import { jsx as _jsx } from "react/jsx-runtime";
var warnings = ['Duplicated tag', 'Duplicated spanId'];
describe('<AccordianText>', function () {
  var props = {
    compact: false,
    data: warnings,
    highContrast: false,
    isOpen: false,
    label: 'le-label',
    onToggle: jest.fn()
  };
  it('renders without exploding', function () {
    render( /*#__PURE__*/_jsx(AccordianText, _extends({}, props)));
    expect(function () {
      return render( /*#__PURE__*/_jsx(AccordianText, _extends({}, props)));
    }).not.toThrow();
  });
  it('renders the label', function () {
    render( /*#__PURE__*/_jsx(AccordianText, _extends({}, props)));
    var _within = within(screen.getByTestId('AccordianText--header')),
      getByText = _within.getByText;
    expect(getByText(props.label)).toBeInTheDocument();
  });
  it('renders the content when it is expanded', function () {
    props.isOpen = true;
    render( /*#__PURE__*/_jsx(AccordianText, _extends({}, props)));
    warnings.forEach(function (warning) {
      expect(screen.getByText(warning)).toBeInTheDocument();
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ3aXRoaW4iLCJSZWFjdCIsIkFjY29yZGlhblRleHQiLCJqc3giLCJfanN4Iiwid2FybmluZ3MiLCJkZXNjcmliZSIsInByb3BzIiwiY29tcGFjdCIsImRhdGEiLCJoaWdoQ29udHJhc3QiLCJpc09wZW4iLCJsYWJlbCIsIm9uVG9nZ2xlIiwiamVzdCIsImZuIiwiaXQiLCJfZXh0ZW5kcyIsImV4cGVjdCIsIm5vdCIsInRvVGhyb3ciLCJfd2l0aGluIiwiZ2V0QnlUZXN0SWQiLCJnZXRCeVRleHQiLCJ0b0JlSW5UaGVEb2N1bWVudCIsImZvckVhY2giLCJ3YXJuaW5nIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1RyYWNlVGltZWxpbmVWaWV3ZXIvU3BhbkRldGFpbC9BY2NvcmRpYW5UZXh0LnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIsIHNjcmVlbiwgd2l0aGluIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgQWNjb3JkaWFuVGV4dCBmcm9tICcuL0FjY29yZGlhblRleHQnO1xuXG5jb25zdCB3YXJuaW5ncyA9IFsnRHVwbGljYXRlZCB0YWcnLCAnRHVwbGljYXRlZCBzcGFuSWQnXTtcblxuZGVzY3JpYmUoJzxBY2NvcmRpYW5UZXh0PicsICgpID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgY29tcGFjdDogZmFsc2UsXG4gICAgZGF0YTogd2FybmluZ3MsXG4gICAgaGlnaENvbnRyYXN0OiBmYWxzZSxcbiAgICBpc09wZW46IGZhbHNlLFxuICAgIGxhYmVsOiAnbGUtbGFiZWwnLFxuICAgIG9uVG9nZ2xlOiBqZXN0LmZuKCksXG4gIH07XG5cbiAgaXQoJ3JlbmRlcnMgd2l0aG91dCBleHBsb2RpbmcnLCAoKSA9PiB7XG4gICAgcmVuZGVyKDxBY2NvcmRpYW5UZXh0IHsuLi5wcm9wc30gLz4pO1xuICAgIGV4cGVjdCgoKSA9PiByZW5kZXIoPEFjY29yZGlhblRleHQgey4uLnByb3BzfSAvPikpLm5vdC50b1Rocm93KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRoZSBsYWJlbCcsICgpID0+IHtcbiAgICByZW5kZXIoPEFjY29yZGlhblRleHQgey4uLnByb3BzfSAvPik7XG4gICAgY29uc3QgeyBnZXRCeVRleHQgfSA9IHdpdGhpbihzY3JlZW4uZ2V0QnlUZXN0SWQoJ0FjY29yZGlhblRleHQtLWhlYWRlcicpKTtcbiAgICBleHBlY3QoZ2V0QnlUZXh0KHByb3BzLmxhYmVsKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgdGhlIGNvbnRlbnQgd2hlbiBpdCBpcyBleHBhbmRlZCcsICgpID0+IHtcbiAgICBwcm9wcy5pc09wZW4gPSB0cnVlO1xuICAgIHJlbmRlcig8QWNjb3JkaWFuVGV4dCB7Li4ucHJvcHN9IC8+KTtcbiAgICB3YXJuaW5ncy5mb3JFYWNoKCh3YXJuaW5nKSA9PiB7XG4gICAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGV4dCh3YXJuaW5nKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLE1BQU0sRUFBRUMsTUFBTSxFQUFFQyxNQUFNLFFBQVEsd0JBQXdCO0FBQy9ELE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBRXpCLE9BQU9DLGFBQWEsTUFBTSxpQkFBaUI7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFNUMsSUFBTUMsUUFBUSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLENBQUM7QUFFeERDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxZQUFNO0VBQ2hDLElBQU1DLEtBQUssR0FBRztJQUNaQyxPQUFPLEVBQUUsS0FBSztJQUNkQyxJQUFJLEVBQUVKLFFBQVE7SUFDZEssWUFBWSxFQUFFLEtBQUs7SUFDbkJDLE1BQU0sRUFBRSxLQUFLO0lBQ2JDLEtBQUssRUFBRSxVQUFVO0lBQ2pCQyxRQUFRLEVBQUVDLElBQUksQ0FBQ0MsRUFBRSxDQUFDO0VBQ3BCLENBQUM7RUFFREMsRUFBRSxDQUFDLDJCQUEyQixFQUFFLFlBQU07SUFDcENsQixNQUFNLGVBQUNNLElBQUEsQ0FBQ0YsYUFBYSxFQUFBZSxRQUFBLEtBQUtWLEtBQUssQ0FBRyxDQUFDLENBQUM7SUFDcENXLE1BQU0sQ0FBQztNQUFBLE9BQU1wQixNQUFNLGVBQUNNLElBQUEsQ0FBQ0YsYUFBYSxFQUFBZSxRQUFBLEtBQUtWLEtBQUssQ0FBRyxDQUFDLENBQUM7SUFBQSxFQUFDLENBQUNZLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDLENBQUM7RUFDbEUsQ0FBQyxDQUFDO0VBRUZKLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0lBQzVCbEIsTUFBTSxlQUFDTSxJQUFBLENBQUNGLGFBQWEsRUFBQWUsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO0lBQ3BDLElBQUFjLE9BQUEsR0FBc0JyQixNQUFNLENBQUNELE1BQU0sQ0FBQ3VCLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO01BQWpFQyxTQUFTLEdBQUFGLE9BQUEsQ0FBVEUsU0FBUztJQUNqQkwsTUFBTSxDQUFDSyxTQUFTLENBQUNoQixLQUFLLENBQUNLLEtBQUssQ0FBQyxDQUFDLENBQUNZLGlCQUFpQixDQUFDLENBQUM7RUFDcEQsQ0FBQyxDQUFDO0VBRUZSLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxZQUFNO0lBQ2xEVCxLQUFLLENBQUNJLE1BQU0sR0FBRyxJQUFJO0lBQ25CYixNQUFNLGVBQUNNLElBQUEsQ0FBQ0YsYUFBYSxFQUFBZSxRQUFBLEtBQUtWLEtBQUssQ0FBRyxDQUFDLENBQUM7SUFDcENGLFFBQVEsQ0FBQ29CLE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUs7TUFDNUJSLE1BQU0sQ0FBQ25CLE1BQU0sQ0FBQ3dCLFNBQVMsQ0FBQ0csT0FBTyxDQUFDLENBQUMsQ0FBQ0YsaUJBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=