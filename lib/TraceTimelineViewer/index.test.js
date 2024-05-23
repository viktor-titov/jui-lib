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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ1c2VyRXZlbnQiLCJSZWFjdCIsImNyZWF0ZVRoZW1lIiwidHJhY2VHZW5lcmF0b3IiLCJ0cmFuc2Zvcm1UcmFjZURhdGEiLCJUcmFjZVRpbWVsaW5lVmlld2VyIiwianN4IiwiX2pzeCIsImplc3QiLCJtb2NrIiwiX2V4dGVuZHMiLCJyZXF1aXJlQWN0dWFsIiwicmVwb3J0SW50ZXJhY3Rpb24iLCJmbiIsImRlc2NyaWJlIiwidHJhY2UiLCJwcm9wcyIsInRleHRGaWx0ZXIiLCJ2aWV3UmFuZ2UiLCJ0aW1lIiwiY3VycmVudCIsInRyYWNlVGltZWxpbmUiLCJjaGlsZHJlbkhpZGRlbklEcyIsIlNldCIsImhvdmVySW5kZW50R3VpZGVJZHMiLCJzcGFuTmFtZUNvbHVtbldpZHRoIiwiZGV0YWlsU3RhdGVzIiwiTWFwIiwiZXhwYW5kQWxsIiwiY29sbGFwc2VBbGwiLCJleHBhbmRPbmUiLCJyZWdpc3RlckFjY2Vzc29ycyIsImNvbGxhcHNlT25lIiwic2V0VHJhY2UiLCJ0aGVtZSIsImhpc3RvcnkiLCJyZXBsYWNlIiwibG9jYXRpb24iLCJzZWFyY2giLCJpdCIsImV4cGVjdCIsIm5vdCIsInRvVGhyb3ciLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJnZXRCeVJvbGUiLCJuYW1lIiwidG9CZUluVGhlRG9jdW1lbnQiLCJjbGljayIsInRvSGF2ZUJlZW5DYWxsZWQiLCJzdG9wIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL1RyYWNlVGltZWxpbmVWaWV3ZXIvaW5kZXgudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlbmRlciwgc2NyZWVuIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgdXNlckV2ZW50IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvdXNlci1ldmVudCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBjcmVhdGVUaGVtZSB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuXG5pbXBvcnQgdHJhY2VHZW5lcmF0b3IgZnJvbSAnLi4vZGVtby90cmFjZS1nZW5lcmF0b3JzJztcbmltcG9ydCB0cmFuc2Zvcm1UcmFjZURhdGEgZnJvbSAnLi4vbW9kZWwvdHJhbnNmb3JtLXRyYWNlLWRhdGEnO1xuXG5pbXBvcnQgVHJhY2VUaW1lbGluZVZpZXdlciwgeyBUUHJvcHMgfSBmcm9tICcuL2luZGV4JztcblxuamVzdC5tb2NrKCdAZ3JhZmFuYS9ydW50aW1lJywgKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLmplc3QucmVxdWlyZUFjdHVhbCgnQGdyYWZhbmEvcnVudGltZScpLFxuICAgIHJlcG9ydEludGVyYWN0aW9uOiBqZXN0LmZuKCksXG4gIH07XG59KTtcblxuZGVzY3JpYmUoJzxUcmFjZVRpbWVsaW5lVmlld2VyPicsICgpID0+IHtcbiAgY29uc3QgdHJhY2UgPSB0cmFuc2Zvcm1UcmFjZURhdGEodHJhY2VHZW5lcmF0b3IudHJhY2Uoe30pKTtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgdHJhY2UsXG4gICAgdGV4dEZpbHRlcjogbnVsbCxcbiAgICB2aWV3UmFuZ2U6IHtcbiAgICAgIHRpbWU6IHtcbiAgICAgICAgY3VycmVudDogWzAsIDFdLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHRyYWNlVGltZWxpbmU6IHtcbiAgICAgIGNoaWxkcmVuSGlkZGVuSURzOiBuZXcgU2V0KCksXG4gICAgICBob3ZlckluZGVudEd1aWRlSWRzOiBuZXcgU2V0KCksXG4gICAgICBzcGFuTmFtZUNvbHVtbldpZHRoOiAwLjUsXG4gICAgICBkZXRhaWxTdGF0ZXM6IG5ldyBNYXAoKSxcbiAgICB9LFxuICAgIGV4cGFuZEFsbDogamVzdC5mbigpLFxuICAgIGNvbGxhcHNlQWxsOiBqZXN0LmZuKCksXG4gICAgZXhwYW5kT25lOiBqZXN0LmZuKCksXG4gICAgcmVnaXN0ZXJBY2Nlc3NvcnM6IGplc3QuZm4oKSxcbiAgICBjb2xsYXBzZU9uZTogamVzdC5mbigpLFxuICAgIHNldFRyYWNlOiBqZXN0LmZuKCksXG4gICAgdGhlbWU6IGNyZWF0ZVRoZW1lKCksXG4gICAgaGlzdG9yeToge1xuICAgICAgcmVwbGFjZTogKCkgPT4ge30sXG4gICAgfSxcbiAgICBsb2NhdGlvbjoge1xuICAgICAgc2VhcmNoOiBudWxsLFxuICAgIH0sXG4gIH07XG5cbiAgaXQoJ2l0IGRvZXMgbm90IGV4cGxvZGUnLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHJlbmRlcig8VHJhY2VUaW1lbGluZVZpZXdlciB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgVFByb3BzKX0gLz4pKS5ub3QudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgnaXQgc2V0cyB1cCBhY3Rpb25zJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlbmRlcig8VHJhY2VUaW1lbGluZVZpZXdlciB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgVFByb3BzKX0gLz4pO1xuXG4gICAgY29uc3QgZXhwYW5kT25lID0gc2NyZWVuLmdldEJ5Um9sZSgnYnV0dG9uJywgeyBuYW1lOiAnRXhwYW5kICsxJyB9KTtcbiAgICBjb25zdCBjb2xsYXBzZU9uZSA9IHNjcmVlbi5nZXRCeVJvbGUoJ2J1dHRvbicsIHsgbmFtZTogJ0NvbGxhcHNlICsxJyB9KTtcbiAgICBjb25zdCBleHBhbmRBbGwgPSBzY3JlZW4uZ2V0QnlSb2xlKCdidXR0b24nLCB7IG5hbWU6ICdFeHBhbmQgQWxsJyB9KTtcbiAgICBjb25zdCBjb2xsYXBzZUFsbCA9IHNjcmVlbi5nZXRCeVJvbGUoJ2J1dHRvbicsIHsgbmFtZTogJ0NvbGxhcHNlIEFsbCcgfSk7XG5cbiAgICBleHBlY3QoZXhwYW5kT25lKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIGV4cGVjdChjb2xsYXBzZU9uZSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3QoZXhwYW5kQWxsKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIGV4cGVjdChjb2xsYXBzZUFsbCkudG9CZUluVGhlRG9jdW1lbnQoKTtcblxuICAgIGF3YWl0IHVzZXJFdmVudC5jbGljayhleHBhbmRPbmUpO1xuICAgIGV4cGVjdChwcm9wcy5leHBhbmRPbmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgIGF3YWl0IHVzZXJFdmVudC5jbGljayhjb2xsYXBzZU9uZSk7XG4gICAgZXhwZWN0KHByb3BzLmNvbGxhcHNlT25lKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICBhd2FpdCB1c2VyRXZlbnQuY2xpY2soZXhwYW5kQWxsKTtcbiAgICBleHBlY3QocHJvcHMuZXhwYW5kQWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cbiAgICBhd2FpdCB1c2VyRXZlbnQuY2xpY2soY29sbGFwc2VBbGwpO1xuICAgIGV4cGVjdChwcm9wcy5jb2xsYXBzZUFsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSx3QkFBd0I7QUFDdkQsT0FBT0MsU0FBUyxNQUFNLDZCQUE2QjtBQUNuRCxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixTQUFTQyxXQUFXLFFBQVEsZUFBZTtBQUUzQyxPQUFPQyxjQUFjLE1BQU0sMEJBQTBCO0FBQ3JELE9BQU9DLGtCQUFrQixNQUFNLCtCQUErQjtBQUU5RCxPQUFPQyxtQkFBbUIsTUFBa0IsU0FBUztBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQTtBQUV0REMsSUFBSSxDQUFDQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUNsQyxPQUFBQyxRQUFBLEtBQ0tGLElBQUksQ0FBQ0csYUFBYSxDQUFDLGtCQUFrQixDQUFDO0lBQ3pDQyxpQkFBaUIsRUFBRUosSUFBSSxDQUFDSyxFQUFFLENBQUM7RUFBQztBQUVoQyxDQUFDLENBQUM7QUFFRkMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLFlBQU07RUFDdEMsSUFBTUMsS0FBSyxHQUFHWCxrQkFBa0IsQ0FBQ0QsY0FBYyxDQUFDWSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxJQUFNQyxLQUFLLEdBQUc7SUFDWkQsS0FBSyxFQUFMQSxLQUFLO0lBQ0xFLFVBQVUsRUFBRSxJQUFJO0lBQ2hCQyxTQUFTLEVBQUU7TUFDVEMsSUFBSSxFQUFFO1FBQ0pDLE9BQU8sRUFBRSxDQUFDLENB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