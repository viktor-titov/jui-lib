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
import KeyValuesTable, { LinkValue } from './KeyValuesTable';
import { jsx as _jsx } from "react/jsx-runtime";
var data = [{
  key: 'span.kind',
  value: 'client'
}, {
  key: 'omg',
  value: 'mos-def'
}, {
  key: 'numericString',
  value: '12345678901234567890'
}, {
  key: 'jsonkey',
  value: JSON.stringify({
    hello: 'world'
  })
}];
var setup = function setup(propOverrides) {
  var props = _extends({
    data: data
  }, propOverrides);
  return render( /*#__PURE__*/_jsx(KeyValuesTable, _extends({}, props)));
};
describe('LinkValue', function () {
  it('renders as expected', function () {
    var title = 'titleValue';
    var href = 'hrefValue';
    var childrenText = 'childrenTextValue';
    render( /*#__PURE__*/_jsx(LinkValue, {
      href: href,
      title: title,
      children: childrenText
    }));
    expect(screen.getByRole('link', {
      name: 'titleValue'
    })).toBeInTheDocument();
    expect(screen.getByText(/^childrenTextValue$/)).toBeInTheDocument();
  });
});
describe('KeyValuesTable tests', function () {
  it('renders without exploding', function () {
    expect(function () {
      return setup();
    }).not.toThrow();
  });
  it('renders a table', function () {
    setup();
    expect(screen.getByTestId('KeyValueTable')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('renders a table row for each data element', function () {
    setup();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(12);
    expect(screen.getAllByTestId('KeyValueTable--keyColumn')).toHaveLength(4);
    expect(screen.getByRole('row', {
      name: 'span.kind "client"'
    })).toBeInTheDocument();
    expect(screen.getByRole('row', {
      name: 'jsonkey { "hello": "world" }'
    })).toBeInTheDocument();
  });
  it('renders a single link correctly', function () {
    setup({
      linksGetter: function linksGetter(array, i) {
        return array[i].key === 'span.kind' ? [{
          url: "http://example.com/?kind=" + encodeURIComponent(array[i].value),
          text: "More info about " + array[i].value
        }] : [];
      }
    });
    expect(screen.getByRole('row', {
      name: 'span.kind More info about client'
    })).toBeInTheDocument();
  });
  it('renders a <CopyIcon /> for each data element', function () {
    setup();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIktleVZhbHVlc1RhYmxlIiwiTGlua1ZhbHVlIiwianN4IiwiX2pzeCIsImRhdGEiLCJrZXkiLCJ2YWx1ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWxsbyIsInNldHVwIiwicHJvcE92ZXJyaWRlcyIsInByb3BzIiwiX2V4dGVuZHMiLCJkZXNjcmliZSIsIml0IiwidGl0bGUiLCJocmVmIiwiY2hpbGRyZW5UZXh0IiwiY2hpbGRyZW4iLCJleHBlY3QiLCJnZXRCeVJvbGUiLCJuYW1lIiwidG9CZUluVGhlRG9jdW1lbnQiLCJnZXRCeVRleHQiLCJub3QiLCJ0b1Rocm93IiwiZ2V0QnlUZXN0SWQiLCJnZXRBbGxCeVJvbGUiLCJ0b0hhdmVMZW5ndGgiLCJnZXRBbGxCeVRlc3RJZCIsImxpbmtzR2V0dGVyIiwiYXJyYXkiLCJpIiwidXJsIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidGV4dCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL0tleVZhbHVlc1RhYmxlLnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIsIHNjcmVlbiB9IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IEtleVZhbHVlc1RhYmxlLCB7IExpbmtWYWx1ZSwgS2V5VmFsdWVzVGFibGVQcm9wcyB9IGZyb20gJy4vS2V5VmFsdWVzVGFibGUnO1xuXG5jb25zdCBkYXRhID0gW1xuICB7IGtleTogJ3NwYW4ua2luZCcsIHZhbHVlOiAnY2xpZW50JyB9LFxuICB7IGtleTogJ29tZycsIHZhbHVlOiAnbW9zLWRlZicgfSxcbiAgeyBrZXk6ICdudW1lcmljU3RyaW5nJywgdmFsdWU6ICcxMjM0NTY3ODkwMTIzNDU2Nzg5MCcgfSxcbiAgeyBrZXk6ICdqc29ua2V5JywgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHsgaGVsbG86ICd3b3JsZCcgfSkgfSxcbl07XG5cbmNvbnN0IHNldHVwID0gKHByb3BPdmVycmlkZXM/OiBLZXlWYWx1ZXNUYWJsZVByb3BzKSA9PiB7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGRhdGE6IGRhdGEsXG4gICAgLi4ucHJvcE92ZXJyaWRlcyxcbiAgfTtcbiAgcmV0dXJuIHJlbmRlcig8S2V5VmFsdWVzVGFibGUgey4uLihwcm9wcyBhcyBLZXlWYWx1ZXNUYWJsZVByb3BzKX0gLz4pO1xufTtcblxuZGVzY3JpYmUoJ0xpbmtWYWx1ZScsICgpID0+IHtcbiAgaXQoJ3JlbmRlcnMgYXMgZXhwZWN0ZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSAndGl0bGVWYWx1ZSc7XG4gICAgY29uc3QgaHJlZiA9ICdocmVmVmFsdWUnO1xuICAgIGNvbnN0IGNoaWxkcmVuVGV4dCA9ICdjaGlsZHJlblRleHRWYWx1ZSc7XG4gICAgcmVuZGVyKFxuICAgICAgPExpbmtWYWx1ZSBocmVmPXtocmVmfSB0aXRsZT17dGl0bGV9PlxuICAgICAgICB7Y2hpbGRyZW5UZXh0fVxuICAgICAgPC9MaW5rVmFsdWU+XG4gICAgKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5Um9sZSgnbGluaycsIHsgbmFtZTogJ3RpdGxlVmFsdWUnIH0pKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXh0KC9eY2hpbGRyZW5UZXh0VmFsdWUkLykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdLZXlWYWx1ZXNUYWJsZSB0ZXN0cycsICgpID0+IHtcbiAgaXQoJ3JlbmRlcnMgd2l0aG91dCBleHBsb2RpbmcnLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHNldHVwKCkpLm5vdC50b1Rocm93KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIGEgdGFibGUnLCAoKSA9PiB7XG4gICAgc2V0dXAoKTtcblxuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ0tleVZhbHVlVGFibGUnKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5Um9sZSgndGFibGUnKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgfSk7XG4gIGl0KCdyZW5kZXJzIGEgdGFibGUgcm93IGZvciBlYWNoIGRhdGEgZWxlbWVudCcsICgpID0+IHtcbiAgICBzZXR1cCgpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ3RhYmxlJykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRBbGxCeVJvbGUoJ2NlbGwnKSkudG9IYXZlTGVuZ3RoKDEyKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEFsbEJ5VGVzdElkKCdLZXlWYWx1ZVRhYmxlLS1rZXlDb2x1bW4nKSkudG9IYXZlTGVuZ3RoKDQpO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlSb2xlKCdyb3cnLCB7IG5hbWU6ICdzcGFuLmtpbmQgXCJjbGllbnRcIicgfSkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ3JvdycsIHsgbmFtZTogJ2pzb25rZXkgeyBcImhlbGxvXCI6IFwid29ybGRcIiB9JyB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgYSBzaW5nbGUgbGluayBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgc2V0dXAoe1xuICAgICAgbGlua3NHZXR0ZXI6IChhcnJheSwgaSkgPT5cbiAgICAgICAgYXJyYXlbaV0ua2V5ID09PSAnc3Bhbi5raW5kJ1xuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdXJsOiBgaHR0cDovL2V4YW1wbGUuY29tLz9raW5kPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFycmF5W2ldLnZhbHVlKX1gLFxuICAgICAgICAgICAgICAgIHRleHQ6IGBNb3JlIGluZm8gYWJvdXQgJHthcnJheVtpXS52YWx1ZX1gLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogW10sXG4gICAgfSBhcyBLZXlWYWx1ZXNUYWJsZVByb3BzKTtcblxuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlSb2xlKCdyb3cnLCB7IG5hbWU6ICdzcGFuLmtpbmQgTW9yZSBpbmZvIGFib3V0IGNsaWVudCcgfSkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIGEgPENvcHlJY29uIC8+IGZvciBlYWNoIGRhdGEgZWxlbWVudCcsICgpID0+IHtcbiAgICBzZXR1cCgpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5nZXRBbGxCeVJvbGUoJ2J1dHRvbicpKS50b0hhdmVMZW5ndGgoNCk7XG4gIH0pO1xufSk7XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSx3QkFBd0I7QUFDdkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsT0FBT0MsY0FBYyxJQUFJQyxTQUFTLFFBQTZCLGtCQUFrQjtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUVsRixJQUFNQyxJQUFJLEdBQUcsQ0FDWDtFQUFFQyxHQUFHLEVBQUUsV0FBVztFQUFFQyxLQUFLLEVBQUU7QUFBUyxDQUFDLEVBQ3JDO0VBQUVELEdBQUcsRUFBRSxLQUFLO0VBQUVDLEtBQUssRUFBRTtBQUFVLENBQUMsRUFDaEM7RUFBRUQsR0FBRyxFQUFFLGVBQWU7RUFBRUMsS0FBSyxFQUFFO0FBQXVCLENBQUMsRUFDdkQ7RUFBRUQsR0FBRyxFQUFFLFNBQVM7RUFBRUMsS0FBSyxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQztJQUFFQyxLQUFLLEVBQUU7RUFBUSxDQUFDO0FBQUUsQ0FBQyxDQUM5RDtBQUVELElBQU1DLEtBQUssR0FBRyxTQUFSQSxLQUFLQSxDQUFJQyxhQUFtQyxFQUFLO0VBQ3JELElBQU1DLEtBQUssR0FBQUMsUUFBQTtJQUNUVCxJQUFJLEVBQUVBO0VBQUksR0FDUE8sYUFBYSxDQUNqQjtFQUNELE9BQU9kLE1BQU0sZUFBQ00sSUFBQSxDQUFDSCxjQUFjLEVBQUFhLFFBQUEsS0FBTUQsS0FBSyxDQUEyQixDQUFDLENBQUM7QUFDdkUsQ0FBQztBQUVERSxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQU07RUFDMUJDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFNO0lBQzlCLElBQU1DLEtBQUssR0FBRyxZQUFZO0lBQzFCLElBQU1D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