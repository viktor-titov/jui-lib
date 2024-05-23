import _extends from "@babel/runtime/helpers/extends";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
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
import userEvent from '@testing-library/user-event';
import React from 'react';
import { selectors } from '@grafana/e2e-selectors';
import SpanBar from './SpanBar';
import { jsx as _jsx } from "react/jsx-runtime";
describe('<SpanBar>', function () {
  var shortLabel = 'omg-so-awesome';
  var longLabel = 'omg-awesome-long-label';
  var props = {
    longLabel: longLabel,
    shortLabel: shortLabel,
    color: '#fff',
    hintSide: 'right',
    viewEnd: 1,
    viewStart: 0,
    theme: {},
    getViewedBounds: function getViewedBounds(s) {
      // Log entries
      if (s === 10) {
        return {
          start: 0.1,
          end: 0.1
        };
      }
      if (s === 20) {
        return {
          start: 0.2,
          end: 0.2
        };
      }
      return {
        error: 'error'
      };
    },
    rpc: {
      viewStart: 0.25,
      viewEnd: 0.75,
      color: '#000'
    },
    traceStartTime: 0,
    span: {
      logs: [{
        timestamp: 10,
        fields: [{
          key: 'message',
          value: 'oh the log message'
        }, {
          key: 'something',
          value: 'else'
        }]
      }, {
        timestamp: 10,
        fields: [{
          key: 'message',
          value: 'oh the second log message'
        }, {
          key: 'something',
          value: 'different'
        }]
      }, {
        timestamp: 20,
        fields: [{
          key: 'message',
          value: 'oh the next log message'
        }, {
          key: 'more',
          value: 'stuff'
        }]
      }]
    }
  };
  it('renders without exploding', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          render( /*#__PURE__*/_jsx(SpanBar, _extends({}, props)));
          expect(screen.getByText(shortLabel)).toBeInTheDocument();
          expect(screen.queryByText(longLabel)).not.toBeInTheDocument();
          _context.next = 5;
          return userEvent.hover(screen.getByTestId(selectors.components.TraceViewer.spanBar));
        case 5:
          expect(screen.queryByText(shortLabel)).not.toBeInTheDocument();
          expect(screen.getByText(longLabel)).toBeInTheDocument();
          _context.next = 9;
          return userEvent.unhover(screen.getByTestId(selectors.components.TraceViewer.spanBar));
        case 9:
          expect(screen.getByText(shortLabel)).toBeInTheDocument();
          expect(screen.queryByText(longLabel)).not.toBeInTheDocument();
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it('log markers count', function () {
    // 3 log entries, two grouped together with the same timestamp
    render( /*#__PURE__*/_jsx(SpanBar, _extends({}, props)));
    expect(screen.getAllByTestId('SpanBar--logMarker')).toHaveLength(2);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ1c2VyRXZlbnQiLCJSZWFjdCIsInNlbGVjdG9ycyIsIlNwYW5CYXIiLCJqc3giLCJfanN4IiwiZGVzY3JpYmUiLCJzaG9ydExhYmVsIiwibG9uZ0xhYmVsIiwicHJvcHMiLCJjb2xvciIsImhpbnRTaWRlIiwidmlld0VuZCIsInZpZXdTdGFydCIsInRoZW1lIiwiZ2V0Vmlld2VkQm91bmRzIiwicyIsInN0YXJ0IiwiZW5kIiwiZXJyb3IiLCJycGMiLCJ0cmFjZVN0YXJ0VGltZSIsInNwYW4iLCJsb2dzIiwidGltZXN0YW1wIiwiZmllbGRzIiwia2V5IiwidmFsdWUiLCJpdCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsIl9leHRlbmRzIiwiZXhwZWN0IiwiZ2V0QnlUZXh0IiwidG9CZUluVGhlRG9jdW1lbnQiLCJxdWVyeUJ5VGV4dCIsIm5vdCIsImhvdmVyIiwiZ2V0QnlUZXN0SWQiLCJjb21wb25lbnRzIiwiVHJhY2VWaWV3ZXIiLCJzcGFuQmFyIiwidW5ob3ZlciIsInN0b3AiLCJnZXRBbGxCeVRlc3RJZCIsInRvSGF2ZUxlbmd0aCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuQmFyLnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIsIHNjcmVlbiB9IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvcmVhY3QnO1xuaW1wb3J0IHVzZXJFdmVudCBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3VzZXItZXZlbnQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc2VsZWN0b3JzIH0gZnJvbSAnQGdyYWZhbmEvZTJlLXNlbGVjdG9ycyc7XG5cbmltcG9ydCBTcGFuQmFyLCB7IFByb3BzIH0gZnJvbSAnLi9TcGFuQmFyJztcblxuZGVzY3JpYmUoJzxTcGFuQmFyPicsICgpID0+IHtcbiAgY29uc3Qgc2hvcnRMYWJlbCA9ICdvbWctc28tYXdlc29tZSc7XG4gIGNvbnN0IGxvbmdMYWJlbCA9ICdvbWctYXdlc29tZS1sb25nLWxhYmVsJztcblxuICBjb25zdCBwcm9wcyA9IHtcbiAgICBsb25nTGFiZWwsXG4gICAgc2hvcnRMYWJlbCxcbiAgICBjb2xvcjogJyNmZmYnLFxuICAgIGhpbnRTaWRlOiAncmlnaHQnLFxuICAgIHZpZXdFbmQ6IDEsXG4gICAgdmlld1N0YXJ0OiAwLFxuICAgIHRoZW1lOiB7fSxcbiAgICBnZXRWaWV3ZWRCb3VuZHM6IChzOiBudW1iZXIpID0+IHtcbiAgICAgIC8vIExvZyBlbnRyaWVzXG4gICAgICBpZiAocyA9PT0gMTApIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IDAuMSwgZW5kOiAwLjEgfTtcbiAgICAgIH1cbiAgICAgIGlmIChzID09PSAyMCkge1xuICAgICAgICByZXR1cm4geyBzdGFydDogMC4yLCBlbmQ6IDAuMiB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZXJyb3I6ICdlcnJvcicgfTtcbiAgICB9LFxuICAgIHJwYzoge1xuICAgICAgdmlld1N0YXJ0OiAwLjI1LFxuICAgICAgdmlld0VuZDogMC43NSxcbiAgICAgIGNvbG9yOiAnIzAwMCcsXG4gICAgfSxcbiAgICB0cmFjZVN0YXJ0VGltZTogMCxcbiAgICBzcGFuOiB7XG4gICAgICBsb2dzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0aW1lc3RhbXA6IDEwLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBrZXk6ICdtZXNzYWdlJywgdmFsdWU6ICdvaCB0aGUgbG9nIG1lc3NhZ2UnIH0sXG4gICAgICAgICAgICB7IGtleTogJ3NvbWV0aGluZycsIHZhbHVlOiAnZWxzZScgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGltZXN0YW1wOiAxMCxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsga2V5OiAnbWVzc2FnZScsIHZhbHVlOiAnb2ggdGhlIHNlY29uZCBsb2cgbWVzc2FnZScgfSxcbiAgICAgICAgICAgIHsga2V5OiAnc29tZXRoaW5nJywgdmFsdWU6ICdkaWZmZXJlbnQnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRpbWVzdGFtcDogMjAsXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IGtleTogJ21lc3NhZ2UnLCB2YWx1ZTogJ29oIHRoZSBuZXh0IGxvZyBtZXNzYWdlJyB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtb3JlJywgdmFsdWU6ICdzdHVmZicgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9O1xuXG4gIGl0KCdyZW5kZXJzIHdpdGhvdXQgZXhwbG9kaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlbmRlcig8U3BhbkJhciB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgUHJvcHMpfSAvPik7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoc2hvcnRMYWJlbCkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5VGV4dChsb25nTGFiZWwpKS5ub3QudG9CZUluVGhlRG9jdW1lbnQoKTtcblxuICAgIGF3YWl0IHVzZXJFdmVudC5ob3ZlcihzY3JlZW4uZ2V0QnlUZXN0SWQoc2VsZWN0b3JzLmNvbXBvbmVudHMuVHJhY2VWaWV3ZXIuc3BhbkJhcikpO1xuICAgIGV4cGVjdChzY3JlZW4ucXVlcnlCeVRleHQoc2hvcnRMYWJlbCkpLm5vdC50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXh0KGxvbmdMYWJlbCkpLnRvQmVJblRoZURvY3VtZW50KCk7XG5cbiAgICBhd2FpdCB1c2VyRXZlbnQudW5ob3ZlcihzY3JlZW4uZ2V0QnlUZXN0SWQoc2VsZWN0b3JzLmNvbXBvbmVudHMuVHJhY2VWaWV3ZXIuc3BhbkJhcikpO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXh0KHNob3J0TGFiZWwpKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIGV4cGVjdChzY3JlZW4ucXVlcnlCeVRleHQobG9uZ0xhYmVsKSkubm90LnRvQmVJblRoZURvY3VtZW50KCk7XG4gIH0pO1xuXG4gIGl0KCdsb2cgbWFya2VycyBjb3VudCcsICgpID0+IHtcbiAgICAvLyAzIGxvZyBlbnRyaWVzLCB0d28gZ3JvdXBlZCB0b2dldGhlciB3aXRoIHRoZSBzYW1lIHRpbWVzdGFtcFxuICAgIHJlbmRlcig8U3BhbkJhciB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgUHJvcHMpfSAvPik7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRBbGxCeVRlc3RJZCgnU3BhbkJhci0tbG9nTWFya2VyJykpLnRvSGF2ZUxlbmd0aCgyKTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsTUFBTSxFQUFFQyxNQUFNLFFBQVEsd0JBQXdCO0FBQ3ZELE9BQU9DLFNBQVMsTUFBTSw2QkFBNkI7QUFDbkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsU0FBU0MsU0FBUyxRQUFRLHdCQUF3QjtBQUVsRCxPQUFPQyxPQUFPLE1BQWlCLFdBQVc7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFM0NDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBTTtFQUMxQixJQUFNQyxVQUFVLEdBQUcsZ0JBQWdCO0VBQ25DLElBQU1DLFNBQVMsR0FBRyx3QkFBd0I7RUFFMUMsSUFBTUMsS0FBSyxHQUFHO0lBQ1pELFNBQVMsRUFBVEEsU0FBUztJQUNURCxVQUFVLEVBQVZBLFVBQVU7SUFDVkcsS0FBSyxFQUFFLE1BQU07SUFDYkMsUUFBUSxFQUFFLE9BQU87SUFDakJDLE9BQU8sRUFBRSxDQUFDO0lBQ1ZDLFNBQVMsRUFBRSxDQUFDO0lBQ1pDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDVEMsZUFBZSxFQUFFLFNBQUFBLGdCQUFDQyxDQUFTLEVBQUs7TUFDOUI7TUFDQSxJQUFJQSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1osT0FBTztVQUFFQyxLQUFLLEVBQUUsR0FBRztVQUFFQyxHQUFHLEVBQUU7UUFBSSxDQUFDO01BQ2pDO01BQ0EsSUFBSUYsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNaLE9BQU87VUFBRUMsS0FBSyxFQUFFLEdB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