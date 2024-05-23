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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ1c2VyRXZlbnQiLCJSZWFjdCIsInNlbGVjdG9ycyIsIlNwYW5CYXIiLCJqc3giLCJfanN4IiwiZGVzY3JpYmUiLCJzaG9ydExhYmVsIiwibG9uZ0xhYmVsIiwicHJvcHMiLCJjb2xvciIsImhpbnRTaWRlIiwidmlld0VuZCIsInZpZXdTdGFydCIsInRoZW1lIiwiZ2V0Vmlld2VkQm91bmRzIiwicyIsInN0YXJ0IiwiZW5kIiwiZXJyb3IiLCJycGMiLCJ0cmFjZVN0YXJ0VGltZSIsInNwYW4iLCJsb2dzIiwidGltZXN0YW1wIiwiZmllbGRzIiwia2V5IiwidmFsdWUiLCJpdCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsIl9leHRlbmRzIiwiZXhwZWN0IiwiZ2V0QnlUZXh0IiwidG9CZUluVGhlRG9jdW1lbnQiLCJxdWVyeUJ5VGV4dCIsIm5vdCIsImhvdmVyIiwiZ2V0QnlUZXN0SWQiLCJjb21wb25lbnRzIiwiVHJhY2VWaWV3ZXIiLCJzcGFuQmFyIiwidW5ob3ZlciIsInN0b3AiLCJnZXRBbGxCeVRlc3RJZCIsInRvSGF2ZUxlbmd0aCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5CYXIudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlbmRlciwgc2NyZWVuIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgdXNlckV2ZW50IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvdXNlci1ldmVudCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBzZWxlY3RvcnMgfSBmcm9tICdAZ3JhZmFuYS9lMmUtc2VsZWN0b3JzJztcblxuaW1wb3J0IFNwYW5CYXIsIHsgUHJvcHMgfSBmcm9tICcuL1NwYW5CYXInO1xuXG5kZXNjcmliZSgnPFNwYW5CYXI+JywgKCkgPT4ge1xuICBjb25zdCBzaG9ydExhYmVsID0gJ29tZy1zby1hd2Vzb21lJztcbiAgY29uc3QgbG9uZ0xhYmVsID0gJ29tZy1hd2Vzb21lLWxvbmctbGFiZWwnO1xuXG4gIGNvbnN0IHByb3BzID0ge1xuICAgIGxvbmdMYWJlbCxcbiAgICBzaG9ydExhYmVsLFxuICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgaGludFNpZGU6ICdyaWdodCcsXG4gICAgdmlld0VuZDogMSxcbiAgICB2aWV3U3RhcnQ6IDAsXG4gICAgdGhlbWU6IHt9LFxuICAgIGdldFZpZXdlZEJvdW5kczogKHM6IG51bWJlcikgPT4ge1xuICAgICAgLy8gTG9nIGVudHJpZXNcbiAgICAgIGlmIChzID09PSAxMCkge1xuICAgICAgICByZXR1cm4geyBzdGFydDogMC4xLCBlbmQ6IDAuMSB9O1xuICAgICAgfVxuICAgICAgaWYgKHMgPT09IDIwKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiAwLjIsIGVuZDogMC4yIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBlcnJvcjogJ2Vycm9yJyB9O1xuICAgIH0sXG4gICAgcnBjOiB7XG4gICAgICB2aWV3U3RhcnQ6IDAuMjUsXG4gICAgICB2aWV3RW5kOiAwLjc1LFxuICAgICAgY29sb3I6ICcjMDAwJyxcbiAgICB9LFxuICAgIHRyYWNlU3RhcnRUaW1lOiAwLFxuICAgIHNwYW46IHtcbiAgICAgIGxvZ3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpbWVzdGFtcDogMTAsXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IGtleTogJ21lc3NhZ2UnLCB2YWx1ZTogJ29oIHRoZSBsb2cgbWVzc2FnZScgfSxcbiAgICAgICAgICAgIHsga2V5OiAnc29tZXRoaW5nJywgdmFsdWU6ICdlbHNlJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aW1lc3RhbXA6IDEwLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBrZXk6ICdtZXNzYWdlJywgdmFsdWU6ICdvaCB0aGUgc2Vjb25kIGxvZyBtZXNzYWdlJyB9LFxuICAgICAgICAgICAgeyBrZXk6ICdzb21ldGhpbmcnLCB2YWx1ZTogJ2RpZmZlcmVudCcgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGltZXN0YW1wOiAyMCxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsga2V5OiAnbWVzc2FnZScsIHZhbHVlOiAnb2ggdGhlIG5leHQgbG9nIG1lc3NhZ2UnIH0sXG4gICAgICAgICAgICB7IGtleTogJ21vcmUnLCB2YWx1ZTogJ3N0dWZmJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH07XG5cbiAgaXQoJ3JlbmRlcnMgd2l0aG91dCBleHBsb2RpbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVuZGVyKDxTcGFuQmFyIHsuLi4ocHJvcHMgYXMgdW5rbm93biBhcyBQcm9wcyl9IC8+KTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGV4dChzaG9ydExhYmVsKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QnlUZXh0KGxvbmdMYWJlbCkpLm5vdC50b0JlSW5UaGVEb2N1bWVudCgpO1xuXG4gICAgYXdhaXQgdXNlckV2ZW50LmhvdmVyKHNjcmVlbi5nZXRCeVRlc3RJZChzZWxlY3RvcnMuY29tcG9uZW50cy5UcmFjZVZpZXdlci5zcGFuQmFyKSk7XG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5VGV4dChzaG9ydExhYmVsKSkubm90LnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQobG9uZ0xhYmVsKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcblxuICAgIGF3YWl0IHVzZXJFdmVudC51bmhvdmVyKHNjcmVlbi5nZXRCeVRlc3RJZChzZWxlY3RvcnMuY29tcG9uZW50cy5UcmFjZVZpZXdlci5zcGFuQmFyKSk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoc2hvcnRMYWJlbCkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5VGV4dChsb25nTGFiZWwpKS5ub3QudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgfSk7XG5cbiAgaXQoJ2xvZyBtYXJrZXJzIGNvdW50JywgKCkgPT4ge1xuICAgIC8vIDMgbG9nIGVudHJpZXMsIHR3byBncm91cGVkIHRvZ2V0aGVyIHdpdGggdGhlIHNhbWUgdGltZXN0YW1wXG4gICAgcmVuZGVyKDxTcGFuQmFyIHsuLi4ocHJvcHMgYXMgdW5rbm93biBhcyBQcm9wcyl9IC8+KTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEFsbEJ5VGVzdElkKCdTcGFuQmFyLS1sb2dNYXJrZXInKSkudG9IYXZlTGVuZ3RoKDIpO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSx3QkFBd0I7QUFDdkQsT0FBT0MsU0FBUyxNQUFNLDZCQUE2QjtBQUNuRCxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixTQUFTQyxTQUFTLFFBQVEsd0JBQXdCO0FBRWxELE9BQU9DLE9BQU8sTUFBaUIsV0FBVztBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUUzQ0MsUUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFNO0VBQzFCLElBQU1DLFVBQVUsR0FBRyxnQkFBZ0I7RUFDbkMsSUFBTUMsU0FBUyxHQUFHLHdCQUF3QjtFQUUxQyxJQUFNQyxLQUFLLEdBQUc7SUFDWkQsU0FBUyxFQUFUQSxTQUFTO0lBQ1RELFVBQVUsRUFBVkEsVUFBVTtJQUNWRyxLQUFLLEVBQUUsTUFBTTtJQUNiQyxRQUFRLEVBQUUsT0FBTztJQUNqQkMsT0FBTyxFQUFFLENBQUM7SUFDVkMsU0FBUyxFQUFFLENBQUM7SUFDWkMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNUQyxlQUFlLEVBQUUsU0FBQUEsZ0JBQUNDLENBQVMsRUFBSztNQUM5QjtNQUNBLElBQUlBLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWixPQUFPO1VBQUVDLEtBQUssRUFBRSxHQUFHO1VBQUVDLEdBQUcsRUFBRTtRQUFJLENBQUM7TUFDakM7TUFDQSxJQUFJRixDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1osT0FBTztVQUFFQyxLQUFLLEVBQUUsR0FBRztVQUFF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