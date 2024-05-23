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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIlJlZmVyZW5jZUxpbmsiLCJqc3giLCJfanN4IiwiZGVzY3JpYmUiLCJjcmVhdGVGb2N1c1NwYW5MaW5rTW9jayIsImplc3QiLCJmbiIsInRyYWNlSWQiLCJzcGFuSWQiLCJtb2RlbCIsImhyZWYiLCJ0aXRsZSIsIm9yaWdpbiIsInRhcmdldCIsInJlZiIsInJlZlR5cGUiLCJ0cmFjZUlEIiwic3BhbklEIiwiaXQiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsImxpbmsiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwicmVmZXJlbmNlIiwiY3JlYXRlRm9jdXNTcGFuTGluayIsImNoaWxkcmVuIiwiZmluZEJ5VGV4dCIsInNlbnQiLCJleHBlY3QiLCJ0b0JlSW5UaGVEb2N1bWVudCIsInRvSGF2ZUF0dHJpYnV0ZSIsInN0b3AiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3VybC9SZWZlcmVuY2VMaW5rLnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIsIHNjcmVlbiB9IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvcmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgTGlua01vZGVsIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5cbmltcG9ydCB7IFRyYWNlU3BhblJlZmVyZW5jZSB9IGZyb20gJy4uL3R5cGVzL3RyYWNlJztcblxuaW1wb3J0IFJlZmVyZW5jZUxpbmsgZnJvbSAnLi9SZWZlcmVuY2VMaW5rJztcblxuZGVzY3JpYmUoUmVmZXJlbmNlTGluaywgKCkgPT4ge1xuICBjb25zdCBjcmVhdGVGb2N1c1NwYW5MaW5rTW9jayA9IGplc3QuZm4oKHRyYWNlSWQsIHNwYW5JZCkgPT4ge1xuICAgIGNvbnN0IG1vZGVsOiBMaW5rTW9kZWwgPSB7XG4gICAgICBocmVmOiBgJHt0cmFjZUlkfS0ke3NwYW5JZH1gLFxuICAgICAgdGl0bGU6ICdsaW5rJyxcbiAgICAgIG9yaWdpbjogJ29yaWdpbicsXG4gICAgICB0YXJnZXQ6ICdfYmxhbmsnLFxuICAgIH07XG4gICAgcmV0dXJuIG1vZGVsO1xuICB9KTtcblxuICBjb25zdCByZWY6IFRyYWNlU3BhblJlZmVyZW5jZSA9IHtcbiAgICByZWZUeXBlOiAnRk9MTE9XU19GUk9NJyxcbiAgICB0cmFjZUlEOiAndHJhY2UxJyxcbiAgICBzcGFuSUQ6ICdzcGFuMScsXG4gIH07XG5cbiAgZGVzY3JpYmUoJ3JlbmRlcmluZycsICgpID0+IHtcbiAgICBpdCgncmVuZGVycyByZWZlcmVuY2Ugd2l0aCBjb3JyZWN0IGhyZWYnLCBhc3luYyAoKSA9PiB7XG4gICAgICByZW5kZXIoXG4gICAgICAgIDxSZWZlcmVuY2VMaW5rIHJlZmVyZW5jZT17cmVmfSBjcmVhdGVGb2N1c1NwYW5MaW5rPXtjcmVhdGVGb2N1c1NwYW5MaW5rTW9ja30+XG4gICAgICAgICAgbGlua1xuICAgICAgICA8L1JlZmVyZW5jZUxpbms+XG4gICAgICApO1xuXG4gICAgICBjb25zdCBsaW5rID0gYXdhaXQgc2NyZWVuLmZpbmRCeVRleHQoJ2xpbmsnKTtcbiAgICAgIGV4cGVjdChsaW5rKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgICAgZXhwZWN0KGxpbmspLnRvSGF2ZUF0dHJpYnV0ZSgnaHJlZicsICd0cmFjZTEtc3BhbjEnKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSx3QkFBd0I7QUFDdkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFNekIsT0FBT0MsYUFBYSxNQUFNLGlCQUFpQjtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUU1Q0MsUUFBUSxDQUFDSCxhQUFhLEVBQUUsWUFBTTtFQUM1QixJQUFNSSx1QkFBdUIsR0FBR0MsSUFBSSxDQUFDQyxFQUFFLENBQUMsVUFBQ0MsT0FBTyxFQUFFQyxNQUFNLEVBQUs7SUFDM0QsSUFBTUMsS0FBZ0IsR0FBRztNQUN2QkMsSUFBSSxFQUFLSCxPQUFPLFNBQUlDLE1BQVE7TUFDNUJHLEtBQUssRUFBRSxNQUFNO01BQ2JDLE1BQU0sRUFBRSxRQUFRO01BQ2hCQyxNQUFNLEVBQUU7SUFDVixDQUFDO0lBQ0QsT0FBT0osS0FBSztFQUNkLENBQUMsQ0FBQztFQUVGLElBQU1LLEdBQXVCLEdBQUc7SUFDOUJDLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCQyxPQUFPLEVBQUUsUUFBUTtJQUNqQkMsTUFBTSxFQUFFO0VBQ1YsQ0FBQztFQUVEZCxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQU07SUFDMUJlLEVBQUUsQ0FBQyxxQ0FBcUMsZUFBQUMsaUJBQUEsZUFBQUMsbUJBQUEsQ0FBQUMsSUFBQSxDQUFFLFNBQUFDLFFBQUE7TUFBQSxJQUFBQyxJQUFBO01BQUEsT0FBQUgsbUJBQUEsQ0FBQUksSUFBQSxVQUFBQyxTQUFBQyxRQUFBO1FBQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7VUFBQTtZQUN4Qy9CLE1BQU0sZUFDSkssSUFBQSxDQUFDRixhQUFhO2NBQUM2QixTQUFTLEVBQUVmLEdBQUk7Y0FBQ2dCLG1CQUFtQixFQUFFMUIsdUJBQXdCO2NBQUEyQixRQUFBLEVBQUM7WUFFN0UsQ0FBZSxDQUNqQixDQUFDO1lBQUNMLFFBQUEsQ0FBQUUsSUFBQTtZQUFBLE9BRWlCOUIsTUFBTSxDQUFDa0MsVUFBVSxDQUFDLE1BQU0sQ0FBQztVQUFBO1lBQXRDVCxJQUFJLEdBQUFHLFFBQUEsQ0FBQU8sSUFBQTtZQUNWQyxNQUFNLENBQUNYLElBQUksQ0FBQyxDQUFDWSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hDRCxNQUFNLENBQUNYLElBQUksQ0FBQyxDQUFDYSxlQUFlLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQztVQUFDO1VBQUE7WUFBQSxPQUFBVixRQUFBLENBQUFXLElBQUE7UUFBQTtNQUFBLEdBQUFmLE9BQUE7SUFBQSxDQUN0RCxHQUFDO0VBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119