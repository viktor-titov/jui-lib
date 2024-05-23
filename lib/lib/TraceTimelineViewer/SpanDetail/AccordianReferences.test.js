import _extends from "@babel/runtime/helpers/extends";
// Copyright (c) 2019 The Jaeger Authors.
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
import AccordianReferences from './AccordianReferences';
import { jsx as _jsx } from "react/jsx-runtime";
var traceID = 'trace1';
var references = [{
  refType: 'CHILD_OF',
  span: {
    spanID: 'span1',
    traceID: traceID,
    operationName: 'op1',
    process: {
      serviceName: 'service1'
    }
  },
  spanID: 'span1',
  traceID: traceID
}, {
  refType: 'CHILD_OF',
  span: {
    spanID: 'span3',
    traceID: traceID,
    operationName: 'op2',
    process: {
      serviceName: 'service2'
    }
  },
  spanID: 'span3',
  traceID: traceID
}, {
  refType: 'CHILD_OF',
  spanID: 'span5',
  traceID: 'trace2'
}];
var link = {
  href: 'link'
};
var setup = function setup(propOverrides) {
  var props = _extends({
    compact: false,
    data: references,
    highContrast: false,
    isOpen: false,
    onToggle: jest.fn(),
    createFocusSpanLink: function createFocusSpanLink() {
      return link;
    }
  }, propOverrides);
  return render( /*#__PURE__*/_jsx(AccordianReferences, _extends({}, props)));
};
describe('AccordianReferences tests', function () {
  it('renders without exploding', function () {
    expect(function () {
      return setup();
    }).not.toThrow();
  });
  it('renders the correct number of references', function () {
    setup();
    expect(screen.getByRole('switch', {
      name: 'References (3)'
    })).toBeInTheDocument();
  });
  it('content doesnt show when not expanded', function () {
    setup({
      isOpen: false
    });
    expect(screen.queryByRole('link', {
      name: /^View\sLinked/
    })).not.toBeInTheDocument();
    expect(screen.queryAllByRole('link', {
      name: /^service\d\sop\d/
    })).toHaveLength(0);
  });
  it('renders the content when it is expanded', function () {
    setup({
      isOpen: true
    });
    expect(screen.getByRole('switch', {
      name: 'References (3)'
    })).toBeInTheDocument();
    expect(screen.getAllByRole('link', {
      name: /^service\d\sop\d/
    })).toHaveLength(2);
    expect(screen.getByRole('link', {
      name: /^View\sLinked/
    })).toBeInTheDocument();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIkFjY29yZGlhblJlZmVyZW5jZXMiLCJqc3giLCJfanN4IiwidHJhY2VJRCIsInJlZmVyZW5jZXMiLCJyZWZUeXBlIiwic3BhbiIsInNwYW5JRCIsIm9wZXJhdGlvbk5hbWUiLCJwcm9jZXNzIiwic2VydmljZU5hbWUiLCJsaW5rIiwiaHJlZiIsInNldHVwIiwicHJvcE92ZXJyaWRlcyIsInByb3BzIiwiX2V4dGVuZHMiLCJjb21wYWN0IiwiZGF0YSIsImhpZ2hDb250cmFzdCIsImlzT3BlbiIsIm9uVG9nZ2xlIiwiamVzdCIsImZuIiwiY3JlYXRlRm9jdXNTcGFuTGluayIsImRlc2NyaWJlIiwiaXQiLCJleHBlY3QiLCJub3QiLCJ0b1Rocm93IiwiZ2V0QnlSb2xlIiwibmFtZSIsInRvQmVJblRoZURvY3VtZW50IiwicXVlcnlCeVJvbGUiLCJxdWVyeUFsbEJ5Um9sZSIsInRvSGF2ZUxlbmd0aCIsImdldEFsbEJ5Um9sZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL0FjY29yZGlhblJlZmVyZW5jZXMudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFRoZSBKYWVnZXIgQXV0aG9ycy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVyLCBzY3JlZW4gfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBBY2NvcmRpYW5SZWZlcmVuY2VzLCB7IEFjY29yZGlhblJlZmVyZW5jZXNQcm9wcyB9IGZyb20gJy4vQWNjb3JkaWFuUmVmZXJlbmNlcyc7XG5cbmNvbnN0IHRyYWNlSUQgPSAndHJhY2UxJztcbmNvbnN0IHJlZmVyZW5jZXMgPSBbXG4gIHtcbiAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgIHNwYW46IHtcbiAgICAgIHNwYW5JRDogJ3NwYW4xJyxcbiAgICAgIHRyYWNlSUQsXG4gICAgICBvcGVyYXRpb25OYW1lOiAnb3AxJyxcbiAgICAgIHByb2Nlc3M6IHtcbiAgICAgICAgc2VydmljZU5hbWU6ICdzZXJ2aWNlMScsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc3BhbklEOiAnc3BhbjEnLFxuICAgIHRyYWNlSUQsXG4gIH0sXG4gIHtcbiAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgIHNwYW46IHtcbiAgICAgIHNwYW5JRDogJ3NwYW4zJyxcbiAgICAgIHRyYWNlSUQsXG4gICAgICBvcGVyYXRpb25OYW1lOiAnb3AyJyxcbiAgICAgIHByb2Nlc3M6IHtcbiAgICAgICAgc2VydmljZU5hbWU6ICdzZXJ2aWNlMicsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc3BhbklEOiAnc3BhbjMnLFxuICAgIHRyYWNlSUQsXG4gIH0sXG4gIHtcbiAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgIHNwYW5JRDogJ3NwYW41JyxcbiAgICB0cmFjZUlEOiAndHJhY2UyJyxcbiAgfSxcbl07XG5cbmNvbnN0IGxpbmsgPSB7IGhyZWY6ICdsaW5rJyB9O1xuXG5jb25zdCBzZXR1cCA9IChwcm9wT3ZlcnJpZGVzPzogQWNjb3JkaWFuUmVmZXJlbmNlc1Byb3BzKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGNvbXBhY3Q6IGZhbHNlLFxuICAgIGRhdGE6IHJlZmVyZW5jZXMsXG4gICAgaGlnaENvbnRyYXN0OiBmYWxzZSxcbiAgICBpc09wZW46IGZhbHNlLFxuICAgIG9uVG9nZ2xlOiBqZXN0LmZuKCksXG4gICAgY3JlYXRlRm9jdXNTcGFuTGluazogKCkgPT4gbGluayxcbiAgICAuLi5wcm9wT3ZlcnJpZGVzLFxuICB9O1xuXG4gIHJldHVybiByZW5kZXIoPEFjY29yZGlhblJlZmVyZW5jZXMgey4uLihwcm9wcyBhcyBBY2NvcmRpYW5SZWZlcmVuY2VzUHJvcHMpfSAvPik7XG59O1xuXG5kZXNjcmliZSgnQWNjb3JkaWFuUmVmZXJlbmNlcyB0ZXN0cycsICgpID0+IHtcbiAgaXQoJ3JlbmRlcnMgd2l0aG91dCBleHBsb2RpbmcnLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHNldHVwKCkpLm5vdC50b1Rocm93KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRoZSBjb3JyZWN0IG51bWJlciBvZiByZWZlcmVuY2VzJywgKCkgPT4ge1xuICAgIHNldHVwKCk7XG5cbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5Um9sZSgnc3dpdGNoJywgeyBuYW1lOiAnUmVmZXJlbmNlcyAoMyknIH0pKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcblxuICBpdCgnY29udGVudCBkb2VzbnQgc2hvdyB3aGVuIG5vdCBleHBhbmRlZCcsICgpID0+IHtcbiAgICBzZXR1cCh7IGlzT3BlbjogZmFsc2UgfSBhcyBBY2NvcmRpYW5SZWZlcmVuY2VzUHJvcHMpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5Um9sZSgnbGluaycsIHsgbmFtZTogL15WaWV3XFxzTGlua2VkLyB9KSkubm90LnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUFsbEJ5Um9sZSgnbGluaycsIHsgbmFtZTogL15zZXJ2aWNlXFxkXFxzb3BcXGQvIH0pKS50b0hhdmVMZW5ndGgoMCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRoZSBjb250ZW50IHdoZW4gaXQgaXMgZXhwYW5kZWQnLCAoKSA9PiB7XG4gICAgc2V0dXAoeyBpc09wZW46IHRydWUgfSBhcyBBY2NvcmRpYW5SZWZlcmVuY2VzUHJvcHMpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ3N3aXRjaCcsIHsgbmFtZTogJ1JlZmVyZW5jZXMgKDMpJyB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEFsbEJ5Um9sZSgnbGluaycsIHsgbmFtZTogL15zZXJ2aWNlXFxkXFxzb3BcXGQvIH0pKS50b0hhdmVMZW5ndGgoMik7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ2xpbmsnLCB7IG5hbWU6IC9eVmlld1xcc0xpbmtlZC8gfSkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gIH0pO1xufSk7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSx3QkFBd0I7QUFDdkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsT0FBT0MsbUJBQW1CLE1BQW9DLHVCQUF1QjtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUV0RixJQUFNQyxPQUFPLEdBQUcsUUFBUTtBQUN4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