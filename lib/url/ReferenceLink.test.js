import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
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

import { render, screen } from '@testing-library/react';
import React from 'react';
import ReferenceLink from './ReferenceLink';
import { jsx as _jsx } from "react/jsx-runtime";
describe(ReferenceLink, function () {
  var createFocusSpanLinkMock = jest.fn(function (traceId, spanId) {
    var model = {
      href: traceId + "-" + spanId,
      title: 'link',
      origin: 'origin',
      target: '_blank'
    };
    return model;
  });
  var ref = {
    refType: 'FOLLOWS_FROM',
    traceID: 'trace1',
    spanID: 'span1'
  };
  describe('rendering', function () {
    it('renders reference with correct href', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var link;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            render( /*#__PURE__*/_jsx(ReferenceLink, {
              reference: ref,
              createFocusSpanLink: createFocusSpanLinkMock,
              children: "link"
            }));
            _context.next = 3;
            return screen.findByText('link');
          case 3:
            link = _context.sent;
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', 'trace1-span1');
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIlJlZmVyZW5jZUxpbmsiLCJqc3giLCJfanN4IiwiZGVzY3JpYmUiLCJjcmVhdGVGb2N1c1NwYW5MaW5rTW9jayIsImplc3QiLCJmbiIsInRyYWNlSWQiLCJzcGFuSWQiLCJtb2RlbCIsImhyZWYiLCJ0aXRsZSIsIm9yaWdpbiIsInRhcmdldCIsInJlZiIsInJlZlR5cGUiLCJ0cmFjZUlEIiwic3BhbklEIiwiaXQiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsImxpbmsiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicmVmZXJlbmNlIiwiY3JlYXRlRm9jdXNTcGFuTGluayIsImNoaWxkcmVuIiwiZmluZEJ5VGV4dCIsInNlbnQiLCJleHBlY3QiLCJ0b0JlSW5UaGVEb2N1bWVudCIsInRvSGF2ZUF0dHJpYnV0ZSIsInN0b3AiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdXJsL1JlZmVyZW5jZUxpbmsudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlbmRlciwgc2NyZWVuIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBMaW5rTW9kZWwgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcblxuaW1wb3J0IHsgVHJhY2VTcGFuUmVmZXJlbmNlIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuXG5pbXBvcnQgUmVmZXJlbmNlTGluayBmcm9tICcuL1JlZmVyZW5jZUxpbmsnO1xuXG5kZXNjcmliZShSZWZlcmVuY2VMaW5rLCAoKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZUZvY3VzU3BhbkxpbmtNb2NrID0gamVzdC5mbigodHJhY2VJZCwgc3BhbklkKSA9PiB7XG4gICAgY29uc3QgbW9kZWw6IExpbmtNb2RlbCA9IHtcbiAgICAgIGhyZWY6IGAke3RyYWNlSWR9LSR7c3BhbklkfWAsXG4gICAgICB0aXRsZTogJ2xpbmsnLFxuICAgICAgb3JpZ2luOiAnb3JpZ2luJyxcbiAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgfTtcbiAgICByZXR1cm4gbW9kZWw7XG4gIH0pO1xuXG4gIGNvbnN0IHJlZjogVHJhY2VTcGFuUmVmZXJlbmNlID0ge1xuICAgIHJlZlR5cGU6ICdGT0xMT1dTX0ZST00nLFxuICAgIHRyYWNlSUQ6ICd0cmFjZTEnLFxuICAgIHNwYW5JRDogJ3NwYW4xJyxcbiAgfTtcblxuICBkZXNjcmliZSgncmVuZGVyaW5nJywgKCkgPT4ge1xuICAgIGl0KCdyZW5kZXJzIHJlZmVyZW5jZSB3aXRoIGNvcnJlY3QgaHJlZicsIGFzeW5jICgpID0+IHtcbiAgICAgIHJlbmRlcihcbiAgICAgICAgPFJlZmVyZW5jZUxpbmsgcmVmZXJlbmNlPXtyZWZ9IGNyZWF0ZUZvY3VzU3Bhbkxpbms9e2NyZWF0ZUZvY3VzU3BhbkxpbmtNb2NrfT5cbiAgICAgICAgICBsaW5rXG4gICAgICAgIDwvUmVmZXJlbmNlTGluaz5cbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGxpbmsgPSBhd2FpdCBzY3JlZW4uZmluZEJ5VGV4dCgnbGluaycpO1xuICAgICAgZXhwZWN0KGxpbmspLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgICBleHBlY3QobGluaykudG9IYXZlQXR0cmlidXRlKCdocmVmJywgJ3RyYWNlMS1zcGFuMScpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLE1BQU0sRUFBRUMsTUFBTSxRQUFRLHdCQUF3QjtBQUN2RCxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQU16QixPQUFPQyxhQUFhLE1BQU0saUJBQWlCO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBO0FBRTVDQyxRQUFRLENBQUNILGFBQWEsRUFBRSxZQUFNO0VBQzVCLElBQU1JLHVCQUF1QixHQUFHQyxJQUFJLENBQUNDLEVBQUUsQ0FBQyxVQUFDQyxPQUFPLEVBQUVDLE1BQU0sRUFBSztJQUMzRCxJQUFNQyxLQUFnQixHQUFHO01BQ3ZCQyxJQUFJLEVBQUtILE9BQU8sU0FBSUMsTUFBUTtNQUM1QkcsS0FBSyxFQUFFLE1BQU07TUFDYkMsTUFBTSxFQUFFLFFBQVE7TUFDaEJDLE1BQU0sRUFBRTtJQUNWLENBQUM7SUFDRCxPQUFPSixLQUFLO0VBQ2QsQ0FBQyxDQUFDO0VBRUYsSUFBTUssR0FBdUIsR0FBRztJQUM5QkMsT0FBTyxFQUFFLGNBQWM7SUFDdkJDLE9BQU8sRUFBRSxRQUFRO0lBQ2pCQyxNQUFNLEVBQUU7RUFDVixDQUFDO0VBRURkLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBTTtJQUMxQmUsRUFBRSxDQUFDLHFDQUFxQyxlQUFBQyxpQkFBQSxlQUFBQyxtQkFBQSxDQUFBQyxJQUFBLENBQUUsU0FBQUMsUUFBQTtNQUFBLElBQUFDLElBQUE7TUFBQSxPQUFBSCxtQkFBQSxDQUFBSSxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7UUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtVQUFBO1lBQ3hDL0IsTUFBTSxlQUNKSyxJQUFBLENBQUNGLGFBQWE7Y0FBQzZCLFNBQVMsRUFBRWYsR0FBSTtjQUFDZ0IsbUJBQW1CLEVBQUUxQix1QkFBd0I7Y0FBQTJCLFFBQUEsRUFBQztZQUU3RSxDQUFlLENBQ2pCLENBQUM7WUFBQ0wsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FFaUI5QixNQUFNLENBQUNrQyxVQUFVLENBQUMsTUFBTSxDQUFDO1VBQUE7WUFBdENULElBQUksR0FBQUcsUUFBQSxDQUFBTyxJQUFBO1lBQ1ZDLE1BQU0sQ0FBQ1gsSUFBSSxDQUFDLENBQUNZLGlCQUFpQixDQUFDLENBQUM7WUFDaENELE1BQU0sQ0FBQ1gsSUFBSSxDQUFDLENBQUNhLGVBQWUsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDO1VBQUM7VUFBQTtZQUFBLE9BQUFWLFFBQUEsQ0FBQVcsSUFBQTtRQUFBO01BQUEsR0FBQWYsT0FBQTtJQUFBLENBQ3RELEdBQUM7RUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=