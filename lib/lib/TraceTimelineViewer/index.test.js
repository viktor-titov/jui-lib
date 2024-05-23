import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _extends from "@babel/runtime/helpers/extends";
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
import { createTheme } from '@grafana/data';
import traceGenerator from '../demo/trace-generators';
import transformTraceData from '../model/transform-trace-data';
import TraceTimelineViewer from './index';
import { jsx as _jsx } from "react/jsx-runtime";
jest.mock('@grafana/runtime', function () {
  return _extends({}, jest.requireActual('@grafana/runtime'), {
    reportInteraction: jest.fn()
  });
});
describe('<TraceTimelineViewer>', function () {
  var trace = transformTraceData(traceGenerator.trace({}));
  var props = {
    trace: trace,
    textFilter: null,
    viewRange: {
      time: {
        current: [0, 1]
      }
    },
    traceTimeline: {
      childrenHiddenIDs: new Set(),
      hoverIndentGuideIds: new Set(),
      spanNameColumnWidth: 0.5,
      detailStates: new Map()
    },
    expandAll: jest.fn(),
    collapseAll: jest.fn(),
    expandOne: jest.fn(),
    registerAccessors: jest.fn(),
    collapseOne: jest.fn(),
    setTrace: jest.fn(),
    theme: createTheme(),
    history: {
      replace: function replace() {}
    },
    location: {
      search: null
    }
  };
  it('it does not explode', function () {
    expect(function () {
      return render( /*#__PURE__*/_jsx(TraceTimelineViewer, _extends({}, props)));
    }).not.toThrow();
  });
  it('it sets up actions', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var expandOne, collapseOne, expandAll, collapseAll;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          render( /*#__PURE__*/_jsx(TraceTimelineViewer, _extends({}, props)));
          expandOne = screen.getByRole('button', {
            name: 'Expand +1'
          });
          collapseOne = screen.getByRole('button', {
            name: 'Collapse +1'
          });
          expandAll = screen.getByRole('button', {
            name: 'Expand All'
          });
          collapseAll = screen.getByRole('button', {
            name: 'Collapse All'
          });
          expect(expandOne).toBeInTheDocument();
          expect(collapseOne).toBeInTheDocument();
          expect(expandAll).toBeInTheDocument();
          expect(collapseAll).toBeInTheDocument();
          _context.next = 11;
          return userEvent.click(expandOne);
        case 11:
          expect(props.expandOne).toHaveBeenCalled();
          _context.next = 14;
          return userEvent.click(collapseOne);
        case 14:
          expect(props.collapseOne).toHaveBeenCalled();
          _context.next = 17;
          return userEvent.click(expandAll);
        case 17:
          expect(props.expandAll).toHaveBeenCalled();
          _context.next = 20;
          return userEvent.click(collapseAll);
        case 20:
          expect(props.collapseAll).toHaveBeenCalled();
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ1c2VyRXZlbnQiLCJSZWFjdCIsImNyZWF0ZVRoZW1lIiwidHJhY2VHZW5lcmF0b3IiLCJ0cmFuc2Zvcm1UcmFjZURhdGEiLCJUcmFjZVRpbWVsaW5lVmlld2VyIiwianN4IiwiX2pzeCIsImplc3QiLCJtb2NrIiwiX2V4dGVuZHMiLCJyZXF1aXJlQWN0dWFsIiwicmVwb3J0SW50ZXJhY3Rpb24iLCJmbiIsImRlc2NyaWJlIiwidHJhY2UiLCJwcm9wcyIsInRleHRGaWx0ZXIiLCJ2aWV3UmFuZ2UiLCJ0aW1lIiwiY3VycmVudCIsInRyYWNlVGltZWxpbmUiLCJjaGlsZHJlbkhpZGRlbklEcyIsIlNldCIsImhvdmVySW5kZW50R3VpZGVJZHMiLCJzcGFuTmFtZUNvbHVtbldpZHRoIiwiZGV0YWlsU3RhdGVzIiwiTWFwIiwiZXhwYW5kQWxsIiwiY29sbGFwc2VBbGwiLCJleHBhbmRPbmUiLCJyZWdpc3RlckFjY2Vzc29ycyIsImNvbGxhcHNlT25lIiwic2V0VHJhY2UiLCJ0aGVtZSIsImhpc3RvcnkiLCJyZXBsYWNlIiwibG9jYXRpb24iLCJzZWFyY2giLCJpdCIsImV4cGVjdCIsIm5vdCIsInRvVGhyb3ciLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJnZXRCeVJvbGUiLCJuYW1lIiwidG9CZUluVGhlRG9jdW1lbnQiLCJjbGljayIsInRvSGF2ZUJlZW5DYWxsZWQiLCJzdG9wIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVRpbWVsaW5lVmlld2VyL2luZGV4LnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIsIHNjcmVlbiB9IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvcmVhY3QnO1xuaW1wb3J0IHVzZXJFdmVudCBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3VzZXItZXZlbnQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgY3JlYXRlVGhlbWUgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcblxuaW1wb3J0IHRyYWNlR2VuZXJhdG9yIGZyb20gJy4uL2RlbW8vdHJhY2UtZ2VuZXJhdG9ycyc7XG5pbXBvcnQgdHJhbnNmb3JtVHJhY2VEYXRhIGZyb20gJy4uL21vZGVsL3RyYW5zZm9ybS10cmFjZS1kYXRhJztcblxuaW1wb3J0IFRyYWNlVGltZWxpbmVWaWV3ZXIsIHsgVFByb3BzIH0gZnJvbSAnLi9pbmRleCc7XG5cbmplc3QubW9jaygnQGdyYWZhbmEvcnVudGltZScsICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5qZXN0LnJlcXVpcmVBY3R1YWwoJ0BncmFmYW5hL3J1bnRpbWUnKSxcbiAgICByZXBvcnRJbnRlcmFjdGlvbjogamVzdC5mbigpLFxuICB9O1xufSk7XG5cbmRlc2NyaWJlKCc8VHJhY2VUaW1lbGluZVZpZXdlcj4nLCAoKSA9PiB7XG4gIGNvbnN0IHRyYWNlID0gdHJhbnNmb3JtVHJhY2VEYXRhKHRyYWNlR2VuZXJhdG9yLnRyYWNlKHt9KSk7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIHRyYWNlLFxuICAgIHRleHRGaWx0ZXI6IG51bGwsXG4gICAgdmlld1JhbmdlOiB7XG4gICAgICB0aW1lOiB7XG4gICAgICAgIGN1cnJlbnQ6IFswLCAxXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0cmFjZVRpbWVsaW5lOiB7XG4gICAgICBjaGlsZHJlbkhpZGRlbklEczogbmV3IFNldCgpLFxuICAgICAgaG92ZXJJbmRlbnRHdWlkZUlkczogbmV3IFNldCgpLFxuICAgICAgc3Bhbk5hbWVDb2x1bW5XaWR0aDogMC41LFxuICAgICAgZGV0YWlsU3RhdGVzOiBuZXcgTWFwKCksXG4gICAgfSxcbiAgICBleHBhbmRBbGw6IGplc3QuZm4oKSxcbiAgICBjb2xsYXBzZUFsbDogamVzdC5mbigpLFxuICAgIGV4cGFuZE9uZTogamVzdC5mbigpLFxuICAgIHJlZ2lzdGVyQWNjZXNzb3JzOiBqZXN0LmZuKCksXG4gICAgY29sbGFwc2VPbmU6IGplc3QuZm4oKSxcbiAgICBzZXRUcmFjZTogamVzdC5mbigpLFxuICAgIHRoZW1lOiBjcmVhdGVUaGVtZSgpLFxuICAgIGhpc3Rvcnk6IHtcbiAgICAgIHJlcGxhY2U6ICgpID0+IHt9LFxuICAgIH0sXG4gICAgbG9jYXRpb246IHtcbiAgICAgIHNlYXJjaDogbnVsbCxcbiAgICB9LFxuICB9O1xuXG4gIGl0KCdpdCBkb2VzIG5vdCBleHBsb2RlJywgKCkgPT4ge1xuICAgIGV4cGVjdCgoKSA9PiByZW5kZXIoPFRyYWNlVGltZWxpbmVWaWV3ZXIgey4uLihwcm9wcyBhcyB1bmtub3duIGFzIFRQcm9wcyl9IC8+KSkubm90LnRvVGhyb3coKTtcbiAgfSk7XG5cbiAgaXQoJ2l0IHNldHMgdXAgYWN0aW9ucycsIGFzeW5jICgpID0+IHtcbiAgICByZW5kZXIoPFRyYWNlVGltZWxpbmVWaWV3ZXIgey4uLihwcm9wcyBhcyB1bmtub3duIGFzIFRQcm9wcyl9IC8+KTtcblxuICAgIGNvbnN0IGV4cGFuZE9uZSA9IHNjcmVlbi5nZXRCeVJvbGUoJ2J1dHRvbicsIHsgbmFtZTogJ0V4cGFuZCArMScgfSk7XG4gICAgY29uc3QgY29sbGFwc2VPbmUgPSBzY3JlZW4uZ2V0QnlSb2xlKCdidXR0b24nLCB7IG5hbWU6ICdDb2xsYXBzZSArMScgfSk7XG4gICAgY29uc3QgZXhwYW5kQWxsID0gc2NyZWVuLmdldEJ5Um9sZSgnYnV0dG9uJywgeyBuYW1lOiAnRXhwYW5kIEFsbCcgfSk7XG4gICAgY29uc3QgY29sbGFwc2VBbGwgPSBzY3JlZW4uZ2V0QnlSb2xlKCdidXR0b24nLCB7IG5hbWU6ICdDb2xsYXBzZSBBbGwnIH0pO1xuXG4gICAgZXhwZWN0KGV4cGFuZE9uZSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3QoY29sbGFwc2VPbmUpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KGV4cGFuZEFsbCkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3QoY29sbGFwc2VBbGwpLnRvQmVJblRoZURvY3VtZW50KCk7XG5cbiAgICBhd2FpdCB1c2VyRXZlbnQuY2xpY2soZXhwYW5kT25lKTtcbiAgICBleHBlY3QocHJvcHMuZXhwYW5kT25lKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICBhd2FpdCB1c2VyRXZlbnQuY2xpY2soY29sbGFwc2VPbmUpO1xuICAgIGV4cGVjdChwcm9wcy5jb2xsYXBzZU9uZSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgYXdhaXQgdXNlckV2ZW50LmNsaWNrKGV4cGFuZEFsbCk7XG4gICAgZXhwZWN0KHByb3BzLmV4cGFuZEFsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgYXdhaXQgdXNlckV2ZW50LmNsaWNrKGNvbGxhcHNlQWxsKTtcbiAgICBleHBlY3QocHJvcHMuY29sbGFwc2VBbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsTUFBTSxFQUFFQyxNQUFNLFFBQVEsd0JBQXdCO0FBQ3ZELE9BQU9DLFNBQVMsTUFBTSw2QkFBNkI7QUFDbkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsU0FBU0MsV0FBVyxRQUFRLGVBQWU7QUFFM0MsT0FBT0MsY0FBYyxNQUFNLDBCQUEwQjtBQUNyRCxPQUFPQyxrQkFBa0IsTUFBTSwrQkFBK0I7QUFFOUQsT0FBT0MsbUJBQW1CLE1BQWtCLFNBQVM7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFdERDLElBQUksQ0FBQ0MsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDbEMsT0FBQUMsUUFBQSxLQUNLRixJQUFJLENBQUNHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztJQUN6Q0MsaUJBQWlCLEVBQUVKLElBQUksQ0FBQ0ssRUFBRSxDQUFDO0VBQUM7QUFFaEMsQ0FBQyxDQUFDO0FBRUZDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxZQUFNO0VBQ3RDLElBQU1DLEtBQUssR0FBR1gsa0JBQWtCLENBQUNELGNBQWMsQ0FBQ1ksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsSUFBTUMsS0FBSyxHQUFHO0lBQ1pELEtBQUssRUFBTEEsS0FBSztJQUNMRSxVQUFVLEVBQUUsSUFBSTtJQUNoQkMsU0FBUyxFQUFFO01BQ1RDLElBQUksRUFBRTtRQUNKQyxPQUFPLEVBQUUs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