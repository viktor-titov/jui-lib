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

jest.mock('../utils');
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import traceGenerator from '../../demo/trace-generators';
import transformTraceData from '../../model/transform-trace-data';
import { formatDuration } from '../utils';
import DetailState from './DetailState';
import SpanDetail, { getAbsoluteTime } from './index';
import { jsx as _jsx } from "react/jsx-runtime";
describe('<SpanDetail>', function () {
  // use `transformTraceData` on a fake trace to get a fully processed span
  var span = transformTraceData(traceGenerator.trace({
    numberOfSpans: 1
  })).spans[0];
  var detailState = new DetailState().toggleLogs().toggleProcess().toggleReferences().toggleTags();
  var traceStartTime = 5;
  var topOfExploreViewRef = jest.fn();
  var props = {
    detailState: detailState,
    span: span,
    traceStartTime: traceStartTime,
    topOfExploreViewRef: topOfExploreViewRef,
    logItemToggle: jest.fn(),
    logsToggle: jest.fn(),
    processToggle: jest.fn(),
    tagsToggle: jest.fn(),
    warningsToggle: jest.fn(),
    referencesToggle: jest.fn(),
    createFocusSpanLink: jest.fn().mockReturnValue({}),
    topOfViewRefType: 'Explore'
  };
  span.logs = [{
    timestamp: 10,
    fields: [{
      key: 'message',
      value: 'oh the log message'
    }, {
      key: 'something',
      value: 'else'
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
  }];
  span.warnings = ['Warning 1', 'Warning 2'];
  span.references = [{
    refType: 'CHILD_OF',
    span: {
      spanID: 'span2',
      traceID: 'trace1',
      operationName: 'op1',
      process: {
        serviceName: 'service1'
      }
    },
    spanID: 'span1',
    traceID: 'trace1'
  }, {
    refType: 'CHILD_OF',
    span: {
      spanID: 'span3',
      traceID: 'trace1',
      operationName: 'op2',
      process: {
        serviceName: 'service2'
      }
    },
    spanID: 'span4',
    traceID: 'trace1'
  }, {
    refType: 'CHILD_OF',
    span: {
      spanID: 'span6',
      traceID: 'trace2',
      operationName: 'op2',
      process: {
        serviceName: 'service2'
      }
    },
    spanID: 'span5',
    traceID: 'trace2'
  }];
  beforeEach(function () {
    jest.mocked(formatDuration).mockReset();
    props.tagsToggle.mockReset();
    props.processToggle.mockReset();
    props.logsToggle.mockReset();
    props.logItemToggle.mockReset();
  });
  it('renders without exploding', function () {
    expect(function () {
      return render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
    }).not.toThrow();
  });
  it('shows the operation name', function () {
    render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
    expect(screen.getByRole('heading', {
      name: span.operationName
    })).toBeInTheDocument();
  });
  it('lists the service name, duration and start time', function () {
    render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
    expect(screen.getByText('Duration:')).toBeInTheDocument();
    expect(screen.getByText('Service:')).toBeInTheDocument();
    expect(screen.getByText('Start Time:')).toBeInTheDocument();
  });
  it('start time shows the absolute time', function () {
    render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
    var absoluteTime = getAbsoluteTime(span.startTime, 'browser');
    expect(screen.getByText(function (text) {
      return text.includes(absoluteTime);
    })).toBeInTheDocument();
  });
  it('renders the span tags', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
          _context.next = 3;
          return userEvent.click(screen.getByRole('switch', {
            name: /Attributes/
          }));
        case 3:
          expect(props.tagsToggle).toHaveBeenLastCalledWith(span.spanID);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it('renders the process tags', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
          _context2.next = 3;
          return userEvent.click(screen.getByRole('switch', {
            name: /Resource/
          }));
        case 3:
          expect(props.processToggle).toHaveBeenLastCalledWith(span.spanID);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  it('renders the logs', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
          _context3.next = 3;
          return userEvent.click(screen.getByRole('switch', {
            name: /Events/
          }));
        case 3:
          expect(props.logsToggle).toHaveBeenLastCalledWith(span.spanID);
          _context3.next = 6;
          return userEvent.click(screen.getByRole('switch', {
            name: /oh the log/
          }));
        case 6:
          expect(props.logItemToggle).toHaveBeenLastCalledWith(span.spanID, props.span.logs[0]);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  it('renders the warnings', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
          _context4.next = 3;
          return userEvent.click(screen.getByRole('switch', {
            name: /Warnings/
          }));
        case 3:
          expect(props.warningsToggle).toHaveBeenLastCalledWith(span.spanID);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  it('renders the references', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
          _context5.next = 3;
          return userEvent.click(screen.getByRole('switch', {
            name: /References/
          }));
        case 3:
          expect(props.referencesToggle).toHaveBeenLastCalledWith(span.spanID);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  it('renders deep link URL', function () {
    render( /*#__PURE__*/_jsx(SpanDetail, _extends({}, props)));
    expect(document.getElementsByTagName('a').length).toBeGreaterThan(1);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJqZXN0IiwibW9jayIsInJlbmRlciIsInNjcmVlbiIsInVzZXJFdmVudCIsIlJlYWN0IiwidHJhY2VHZW5lcmF0b3IiLCJ0cmFuc2Zvcm1UcmFjZURhdGEiLCJmb3JtYXREdXJhdGlvbiIsIkRldGFpbFN0YXRlIiwiU3BhbkRldGFpbCIsImdldEFic29sdXRlVGltZSIsImpzeCIsIl9qc3giLCJkZXNjcmliZSIsInNwYW4iLCJ0cmFjZSIsIm51bWJlck9mU3BhbnMiLCJzcGFucyIsImRldGFpbFN0YXRlIiwidG9nZ2xlTG9ncyIsInRvZ2dsZVByb2Nlc3MiLCJ0b2dnbGVSZWZlcmVuY2VzIiwidG9nZ2xlVGFncyIsInRyYWNlU3RhcnRUaW1lIiwidG9wT2ZFeHBsb3JlVmlld1JlZiIsImZuIiwicHJvcHMiLCJsb2dJdGVtVG9nZ2xlIiwibG9nc1RvZ2dsZSIsInByb2Nlc3NUb2dnbGUiLCJ0YWdzVG9nZ2xlIiwid2FybmluZ3NUb2dnbGUiLCJyZWZlcmVuY2VzVG9nZ2xlIiwiY3JlYXRlRm9jdXNTcGFuTGluayIsIm1vY2tSZXR1cm5WYWx1ZSIsInRvcE9mVmlld1JlZlR5cGUiLCJsb2dzIiwidGltZXN0YW1wIiwiZmllbGRzIiwia2V5IiwidmFsdWUiLCJ3YXJuaW5ncyIsInJlZmVyZW5jZXMiLCJyZWZUeXBlIiwic3BhbklEIiwidHJhY2VJRCIsIm9wZXJhdGlvbk5hbWUiLCJwcm9jZXNzIiwic2VydmljZU5hbWUiLCJiZWZvcmVFYWNoIiwibW9ja2VkIiwibW9ja1Jlc2V0IiwiaXQiLCJleHBlY3QiLCJfZXh0ZW5kcyIsIm5vdCIsInRvVGhyb3ciLCJnZXRCeVJvbGUiLCJuYW1lIiwidG9CZUluVGhlRG9jdW1lbnQiLCJnZXRCeVRleHQiLCJhYnNvbHV0ZVRpbWUiLCJzdGFydFRpbWUiLCJ0ZXh0IiwiaW5jbHVkZXMiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJjbGljayIsInRvSGF2ZUJlZW5MYXN0Q2FsbGVkV2l0aCIsInN0b3AiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsZW5ndGgiLCJ0b0JlR3JlYXRlclRoYW4iXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL2luZGV4LnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5qZXN0Lm1vY2soJy4uL3V0aWxzJyk7XG5cbmltcG9ydCB7IHJlbmRlciwgc2NyZWVuIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgdXNlckV2ZW50IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvdXNlci1ldmVudCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVHJhY2VTcGFuUmVmZXJlbmNlIH0gZnJvbSAnc3JjL3R5cGVzL3RyYWNlJztcblxuaW1wb3J0IHRyYWNlR2VuZXJhdG9yIGZyb20gJy4uLy4uL2RlbW8vdHJhY2UtZ2VuZXJhdG9ycyc7XG5pbXBvcnQgdHJhbnNmb3JtVHJhY2VEYXRhIGZyb20gJy4uLy4uL21vZGVsL3RyYW5zZm9ybS10cmFjZS1kYXRhJztcbmltcG9ydCB7IGZvcm1hdER1cmF0aW9uIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5pbXBvcnQgRGV0YWlsU3RhdGUgZnJvbSAnLi9EZXRhaWxTdGF0ZSc7XG5cbmltcG9ydCBTcGFuRGV0YWlsLCB7IGdldEFic29sdXRlVGltZSwgU3BhbkRldGFpbFByb3BzIH0gZnJvbSAnLi9pbmRleCc7XG5cbmRlc2NyaWJlKCc8U3BhbkRldGFpbD4nLCAoKSA9PiB7XG4gIC8vIHVzZSBgdHJhbnNmb3JtVHJhY2VEYXRhYCBvbiBhIGZha2UgdHJhY2UgdG8gZ2V0IGEgZnVsbHkgcHJvY2Vzc2VkIHNwYW5cbiAgY29uc3Qgc3BhbiA9IHRyYW5zZm9ybVRyYWNlRGF0YSh0cmFjZUdlbmVyYXRvci50cmFjZSh7IG51bWJlck9mU3BhbnM6IDEgfSkpIS5zcGFuc1swXTtcbiAgY29uc3QgZGV0YWlsU3RhdGUgPSBuZXcgRGV0YWlsU3RhdGUoKS50b2dnbGVMb2dzKCkudG9nZ2xlUHJvY2VzcygpLnRvZ2dsZVJlZmVyZW5jZXMoKS50b2dnbGVUYWdzKCk7XG4gIGNvbnN0IHRyYWNlU3RhcnRUaW1lID0gNTtcbiAgY29uc3QgdG9wT2ZFeHBsb3JlVmlld1JlZiA9IGplc3QuZm4oKTtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgZGV0YWlsU3RhdGUsXG4gICAgc3BhbixcbiAgICB0cmFjZVN0YXJ0VGltZSxcbiAgICB0b3BPZkV4cGxvcmVWaWV3UmVmLFxuICAgIGxvZ0l0ZW1Ub2dnbGU6IGplc3QuZm4oKSxcbiAgICBsb2dzVG9nZ2xlOiBqZXN0LmZuKCksXG4gICAgcHJvY2Vzc1RvZ2dsZTogamVzdC5mbigpLFxuICAgIHRhZ3NUb2dnbGU6IGplc3QuZm4oKSxcbiAgICB3YXJuaW5nc1RvZ2dsZTogamVzdC5mbigpLFxuICAgIHJlZmVyZW5jZXNUb2dnbGU6IGplc3QuZm4oKSxcbiAgICBjcmVhdGVGb2N1c1NwYW5MaW5rOiBqZXN0LmZuKCkubW9ja1JldHVyblZhbHVlKHt9KSxcbiAgICB0b3BPZlZpZXdSZWZUeXBlOiAnRXhwbG9yZScsXG4gIH07XG4gIHNwYW4ubG9ncyA9IFtcbiAgICB7XG4gICAgICB0aW1lc3RhbXA6IDEwLFxuICAgICAgZmllbGRzOiBbXG4gICAgICAgIHsga2V5OiAnbWVzc2FnZScsIHZhbHVlOiAnb2ggdGhlIGxvZyBtZXNzYWdlJyB9LFxuICAgICAgICB7IGtleTogJ3NvbWV0aGluZycsIHZhbHVlOiAnZWxzZScgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0aW1lc3RhbXA6IDIwLFxuICAgICAgZmllbGRzOiBbXG4gICAgICAgIHsga2V5OiAnbWVzc2FnZScsIHZhbHVlOiAnb2ggdGhlIG5leHQgbG9nIG1lc3NhZ2UnIH0sXG4gICAgICAgIHsga2V5OiAnbW9yZScsIHZhbHVlOiAnc3R1ZmYnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF07XG5cbiAgc3Bhbi53YXJuaW5ncyA9IFsnV2FybmluZyAxJywgJ1dhcm5pbmcgMiddO1xuXG4gIHNwYW4ucmVmZXJlbmNlcyA9IFtcbiAgICB7XG4gICAgICByZWZUeXBlOiAnQ0hJTERfT0YnLFxuICAgICAgc3Bhbjoge1xuICAgICAgICBzcGFuSUQ6ICdzcGFuMicsXG4gICAgICAgIHRyYWNlSUQ6ICd0cmFjZTEnLFxuICAgICAgICBvcGVyYXRpb25OYW1lOiAnb3AxJyxcbiAgICAgICAgcHJvY2Vzczoge1xuICAgICAgICAgIHNlcnZpY2VOYW1lOiAnc2VydmljZTEnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHNwYW5JRDogJ3NwYW4xJyxcbiAgICAgIHRyYWNlSUQ6ICd0cmFjZTEnLFxuICAgIH0gYXMgVHJhY2VTcGFuUmVmZXJlbmNlLFxuICAgIHtcbiAgICAgIHJlZlR5cGU6ICdDSElMRF9PRicsXG4gICAgICBzcGFuOiB7XG4gICAgICAgIHNwYW5JRDogJ3NwYW4zJyxcbiAgICAgICAgdHJhY2VJRDogJ3RyYWNlMScsXG4gICAgICAgIG9wZXJhdGlvbk5hbWU6ICdvcDInLFxuICAgICAgICBwcm9jZXNzOiB7XG4gICAgICAgICAgc2VydmljZU5hbWU6ICdzZXJ2aWNlMicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgc3BhbklEOiAnc3BhbjQnLFxuICAgICAgdHJhY2VJRDogJ3RyYWNlMScsXG4gICAgfSBhcyBUcmFjZVNwYW5SZWZlcmVuY2UsXG4gICAge1xuICAgICAgcmVmVHlwZTogJ0NISUxEX09GJyxcbiAgICAgIHNwYW46IHtcbiAgICAgICAgc3BhbklEOiAnc3BhbjYnLFxuICAgICAgICB0cmFjZUlEOiAndHJhY2UyJyxcbiAgICAgICAgb3BlcmF0aW9uTmFtZTogJ29wMicsXG4gICAgICAgIHByb2Nlc3M6IHtcbiAgICAgICAgICBzZXJ2aWNlTmFtZTogJ3NlcnZpY2UyJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBzcGFuSUQ6ICdzcGFuNScsXG4gICAgICB0cmFjZUlEOiAndHJhY2UyJyxcbiAgICB9IGFzIFRyYWNlU3BhblJlZmVyZW5jZSxcbiAgXTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBqZXN0Lm1vY2tlZChmb3JtYXREdXJhdGlvbikubW9ja1Jlc2V0KCk7XG4gICAgcHJvcHMudGFnc1RvZ2dsZS5tb2NrUmVzZXQoKTtcbiAgICBwcm9wcy5wcm9jZXNzVG9nZ2xlLm1vY2tSZXNldCgpO1xuICAgIHByb3BzLmxvZ3NUb2dnbGUubW9ja1Jlc2V0KCk7XG4gICAgcHJvcHMubG9nSXRlbVRvZ2dsZS5tb2NrUmVzZXQoKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgd2l0aG91dCBleHBsb2RpbmcnLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHJlbmRlcig8U3BhbkRldGFpbCB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgU3BhbkRldGFpbFByb3BzKX0gLz4pKS5ub3QudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgnc2hvd3MgdGhlIG9wZXJhdGlvbiBuYW1lJywgKCkgPT4ge1xuICAgIHJlbmRlcig8U3BhbkRldGFpbCB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgU3BhbkRldGFpbFByb3BzKX0gLz4pO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlSb2xlKCdoZWFkaW5nJywgeyBuYW1lOiBzcGFuLm9wZXJhdGlvbk5hbWUgfSkpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gIH0pO1xuXG4gIGl0KCdsaXN0cyB0aGUgc2VydmljZSBuYW1lLCBkdXJhdGlvbiBhbmQgc3RhcnQgdGltZScsICgpID0+IHtcbiAgICByZW5kZXIoPFNwYW5EZXRhaWwgey4uLihwcm9wcyBhcyB1bmtub3duIGFzIFNwYW5EZXRhaWxQcm9wcyl9IC8+KTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGV4dCgnRHVyYXRpb246JykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoJ1NlcnZpY2U6JykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoJ1N0YXJ0IFRpbWU6JykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gIH0pO1xuXG4gIGl0KCdzdGFydCB0aW1lIHNob3dzIHRoZSBhYnNvbHV0ZSB0aW1lJywgKCkgPT4ge1xuICAgIHJlbmRlcig8U3BhbkRldGFpbCB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgU3BhbkRldGFpbFByb3BzKX0gLz4pO1xuICAgIGNvbnN0IGFic29sdXRlVGltZSA9IGdldEFic29sdXRlVGltZShzcGFuLnN0YXJ0VGltZSwgJ2Jyb3dzZXInKTtcbiAgICBleHBlY3QoXG4gICAgICBzY3JlZW4uZ2V0QnlUZXh0KCh0ZXh0KSA9PiB7XG4gICAgICAgIHJldHVybiB0ZXh0LmluY2x1ZGVzKGFic29sdXRlVGltZSk7XG4gICAgICB9KVxuICAgICkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgdGhlIHNwYW4gdGFncycsIGFzeW5jICgpID0+IHtcbiAgICByZW5kZXIoPFNwYW5EZXRhaWwgey4uLihwcm9wcyBhcyB1bmtub3duIGFzIFNwYW5EZXRhaWxQcm9wcyl9IC8+KTtcbiAgICBhd2FpdCB1c2VyRXZlbnQuY2xpY2soc2NyZWVuLmdldEJ5Um9sZSgnc3dpdGNoJywgeyBuYW1lOiAvQXR0cmlidXRlcy8gfSkpO1xuICAgIGV4cGVjdChwcm9wcy50YWdzVG9nZ2xlKS50b0hhdmVCZWVuTGFzdENhbGxlZFdpdGgoc3Bhbi5zcGFuSUQpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB0aGUgcHJvY2VzcyB0YWdzJywgYXN5bmMgKCkgPT4ge1xuICAgIHJlbmRlcig8U3BhbkRldGFpbCB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgU3BhbkRldGFpbFByb3BzKX0gLz4pO1xuICAgIGF3YWl0IHVzZXJFdmVudC5jbGljayhzY3JlZW4uZ2V0QnlSb2xlKCdzd2l0Y2gnLCB7IG5hbWU6IC9SZXNvdXJjZS8gfSkpO1xuICAgIGV4cGVjdChwcm9wcy5wcm9jZXNzVG9nZ2xlKS50b0hhdmVCZWVuTGFzdENhbGxlZFdpdGgoc3Bhbi5zcGFuSUQpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB0aGUgbG9ncycsIGFzeW5jICgpID0+IHtcbiAgICByZW5kZXIoPFNwYW5EZXRhaWwgey4uLihwcm9wcyBhcyB1bmtub3duIGFzIFNwYW5EZXRhaWxQcm9wcyl9IC8+KTtcbiAgICBhd2FpdCB1c2VyRXZlbnQuY2xpY2soc2NyZWVuLmdldEJ5Um9sZSgnc3dpdGNoJywgeyBuYW1lOiAvRXZlbnRzLyB9KSk7XG4gICAgZXhwZWN0KHByb3BzLmxvZ3NUb2dnbGUpLnRvSGF2ZUJlZW5MYXN0Q2FsbGVkV2l0aChzcGFuLnNwYW5JRCk7XG4gICAgYXdhaXQgdXNlckV2ZW50LmNsaWNrKHNjcmVlbi5nZXRCeVJvbGUoJ3N3aXRjaCcsIHsgbmFtZTogL29oIHRoZSBsb2cvIH0pKTtcbiAgICBleHBlY3QocHJvcHMubG9nSXRlbVRvZ2dsZSkudG9IYXZlQmVlbkxhc3RDYWxsZWRXaXRoKHNwYW4uc3BhbklELCBwcm9wcy5zcGFuLmxvZ3NbMF0pO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB0aGUgd2FybmluZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgcmVuZGVyKDxTcGFuRGV0YWlsIHsuLi4ocHJvcHMgYXMgdW5rbm93biBhcyBTcGFuRGV0YWlsUHJvcHMpfSAvPik7XG4gICAgYXdhaXQgdXNlckV2ZW50LmNsaWNrKHNjcmVlbi5nZXRCeVJvbGUoJ3N3aXRjaCcsIHsgbmFtZTogL1dhcm5pbmdzLyB9KSk7XG4gICAgZXhwZWN0KHByb3BzLndhcm5pbmdzVG9nZ2xlKS50b0hhdmVCZWVuTGFzdENhbGxlZFdpdGgoc3Bhbi5zcGFuSUQpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB0aGUgcmVmZXJlbmNlcycsIGFzeW5jICgpID0+IHtcbiAgICByZW5kZXIoPFNwYW5EZXRhaWwgey4uLihwcm9wcyBhcyB1bmtub3duIGFzIFNwYW5EZXRhaWxQcm9wcyl9IC8+KTtcbiAgICBhd2FpdCB1c2VyRXZlbnQuY2xpY2soc2NyZWVuLmdldEJ5Um9sZSgnc3dpdGNoJywgeyBuYW1lOiAvUmVmZXJlbmNlcy8gfSkpO1xuICAgIGV4cGVjdChwcm9wcy5yZWZlcmVuY2VzVG9nZ2xlKS50b0hhdmVCZWVuTGFzdENhbGxlZFdpdGgoc3Bhbi5zcGFuSUQpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyBkZWVwIGxpbmsgVVJMJywgKCkgPT4ge1xuICAgIHJlbmRlcig8U3BhbkRldGFpbCB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgU3BhbkRldGFpbFByb3BzKX0gLz4pO1xuICAgIGV4cGVjdChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpLmxlbmd0aCkudG9CZUdyZWF0ZXJUaGFuKDEpO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQUEsSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBRXJCLFNBQVNDLE1BQU0sRUFBRUMsTUFBTSxRQUFRLHdCQUF3QjtBQUN2RCxPQUFPQyxTQUFTLE1BQU0sNkJBQTZCO0FBQ25ELE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBR3pCLE9BQU9DLGNBQWMsTUFBTSw2QkFBNkI7QUFDeEQsT0FBT0Msa0JBQWtCLE1BQU0sa0NBQWtDO0FBQ2pFLFNBQVNDLGNBQWMsUUFBUSxVQUFVO0FBRXpDLE9BQU9DLFdBQVcsTUFBTSxlQUFlO0FBRXZDLE9BQU9DLFVBQVUsSUFBSUMsZUFBZSxRQUF5QixTQUFTO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBO0FBRXZFQyxRQUFRLENBQUMsY0FBYyxFQUFFLFlBQU07RUFDN0I7RUFDQSxJQUFNQyxJQUFJLEdBQUdSLGtCQUFrQixDQUFDRCxjQUFjLENBQUNVLEtBQUssQ0FBQztJQUFFQyxhQUFhLEVBQUU7RUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFFQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ3JGLElBQU1DLFdBQVcsR0FBRyxJQUFJVixXQUFXLENBQUMsQ0FBQyxDQUFDVyxVQUFVLENBQUMsQ0FBQyxDQUFD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