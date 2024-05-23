import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _extends from "@babel/runtime/helpers/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
// Copyright (c) 2018 Uber Technologies, Inc.
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
import spanAncestorIdsSpy from '../utils/span-ancestor-ids';
import SpanTreeOffset, { getStyles } from './SpanTreeOffset';
import { jsx as _jsx } from "react/jsx-runtime";
jest.mock('../utils/span-ancestor-ids');
describe('SpanTreeOffset', function () {
  var ownSpanID = 'ownSpanID';
  var parentSpanID = 'parentSpanID';
  var rootSpanID = 'rootSpanID';
  var specialRootID = 'root';
  var props;
  beforeEach(function () {
    // Mock implementation instead of Mock return value so that each call returns a new array (like normal)
    jest.mocked(spanAncestorIdsSpy).mockImplementation(function () {
      return [parentSpanID, rootSpanID];
    });
    props = {
      addHoverIndentGuideId: jest.fn(),
      hoverIndentGuideIds: new Set(),
      removeHoverIndentGuideId: jest.fn(),
      span: {
        hasChildren: false,
        spanID: ownSpanID
      }
    };
  });
  describe('.SpanTreeOffset--indentGuide', function () {
    it('renders only one SpanTreeOffset--indentGuide for entire trace if span has no ancestors', function () {
      jest.mocked(spanAncestorIdsSpy).mockReturnValue([]);
      render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
      var indentGuide = screen.getByTestId('SpanTreeOffset--indentGuide');
      expect(indentGuide).toBeInTheDocument();
      expect(indentGuide).toHaveAttribute('data-ancestor-id', specialRootID);
    });
    it('renders one SpanTreeOffset--indentGuide per ancestor span, plus one for entire trace', function () {
      render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
      var indentGuides = screen.getAllByTestId('SpanTreeOffset--indentGuide');
      expect(indentGuides.length).toBe(3);
      expect(indentGuides[0]).toHaveAttribute('data-ancestor-id', specialRootID);
      expect(indentGuides[1]).toHaveAttribute('data-ancestor-id', rootSpanID);
      expect(indentGuides[2]).toHaveAttribute('data-ancestor-id', parentSpanID);
    });
    it('adds .is-active to correct indentGuide', function () {
      props.hoverIndentGuideIds = new Set([parentSpanID]);
      render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
      var styles = getStyles(createTheme());
      var activeIndentGuide = document.querySelector("." + styles.indentGuideActive);
      expect(activeIndentGuide).toBeInTheDocument();
      expect(activeIndentGuide).toHaveAttribute('data-ancestor-id', parentSpanID);
    });
    it('calls props.addHoverIndentGuideId on mouse enter', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var span;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
            span = document.querySelector("[data-ancestor-id=" + parentSpanID + "]");
            _context.next = 4;
            return userEvent.hover(span);
          case 4:
            expect(props.addHoverIndentGuideId).toHaveBeenCalledTimes(1);
            expect(props.addHoverIndentGuideId).toHaveBeenCalledWith(parentSpanID);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    it('calls props.removeHoverIndentGuideId on mouse leave', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var span;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
            span = document.querySelector("[data-ancestor-id=" + parentSpanID + "]");
            _context2.next = 4;
            return userEvent.unhover(span);
          case 4:
            expect(props.removeHoverIndentGuideId).toHaveBeenCalledTimes(1);
            expect(props.removeHoverIndentGuideId).toHaveBeenCalledWith(parentSpanID);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
  });
  describe('icon', function () {
    beforeEach(function () {
      props = _extends({}, props, {
        span: _extends({}, props.span, {
          hasChildren: true
        })
      });
    });
    it('does not render icon if props.span.hasChildren is false', function () {
      props.span.hasChildren = false;
      render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
      expect(screen.queryByTestId('icon-wrapper')).not.toBeInTheDocument();
    });
    it('does not render icon if props.span.hasChildren is true and showChildrenIcon is false', function () {
      props.showChildrenIcon = false;
      render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
      expect(screen.queryByTestId('icon-wrapper')).not.toBeInTheDocument();
    });
    it('renders arrow-right if props.span.hasChildren is true and props.childrenVisible is false', function () {
      render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
      expect(screen.getByTestId('icon-arrow-right')).toBeInTheDocument();
    });
    it('renders arrow-down if props.span.hasChildren is true and props.childrenVisible is true', function () {
      props.childrenVisible = true;
      render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
      expect(screen.getByTestId('icon-arrow-down')).toBeInTheDocument();
    });
    it('calls props.addHoverIndentGuideId on mouse enter', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var icon;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
            icon = screen.getByTestId('icon-wrapper');
            _context3.next = 4;
            return userEvent.hover(icon);
          case 4:
            expect(props.addHoverIndentGuideId).toHaveBeenCalledTimes(1);
            expect(props.addHoverIndentGuideId).toHaveBeenCalledWith(ownSpanID);
          case 6:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    it('calls props.removeHoverIndentGuideId on mouse leave', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var icon;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            render( /*#__PURE__*/_jsx(SpanTreeOffset, _extends({}, props)));
            icon = screen.getByTestId('icon-wrapper');
            _context4.next = 4;
            return userEvent.unhover(icon);
          case 4:
            expect(props.removeHoverIndentGuideId).toHaveBeenCalledTimes(1);
            expect(props.removeHoverIndentGuideId).toHaveBeenCalledWith(ownSpanID);
          case 6:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ1c2VyRXZlbnQiLCJSZWFjdCIsImNyZWF0ZVRoZW1lIiwic3BhbkFuY2VzdG9ySWRzU3B5IiwiU3BhblRyZWVPZmZzZXQiLCJnZXRTdHlsZXMiLCJqc3giLCJfanN4IiwiamVzdCIsIm1vY2siLCJkZXNjcmliZSIsIm93blNwYW5JRCIsInBhcmVudFNwYW5JRCIsInJvb3RTcGFuSUQiLCJzcGVjaWFsUm9vdElEIiwicHJvcHMiLCJiZWZvcmVFYWNoIiwibW9ja2VkIiwibW9ja0ltcGxlbWVudGF0aW9uIiwiYWRkSG92ZXJJbmRlbnRHdWlkZUlkIiwiZm4iLCJob3ZlckluZGVudEd1aWRlSWRzIiwiU2V0IiwicmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkIiwic3BhbiIsImhhc0NoaWxkcmVuIiwic3BhbklEIiwiaXQiLCJtb2NrUmV0dXJuVmFsdWUiLCJfZXh0ZW5kcyIsImluZGVudEd1aWRlIiwiZ2V0QnlUZXN0SWQiLCJleHBlY3QiLCJ0b0JlSW5UaGVEb2N1bWVudCIsInRvSGF2ZUF0dHJpYnV0ZSIsImluZGVudEd1aWRlcyIsImdldEFsbEJ5VGVzdElkIiwibGVuZ3RoIiwidG9CZSIsInN0eWxlcyIsImFjdGl2ZUluZGVudEd1aWRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5kZW50R3VpZGVBY3RpdmUiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJob3ZlciIsInRvSGF2ZUJlZW5DYWxsZWRUaW1lcyIsInRvSGF2ZUJlZW5DYWxsZWRXaXRoIiwic3RvcCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwidW5ob3ZlciIsInF1ZXJ5QnlUZXN0SWQiLCJub3QiLCJzaG93Q2hpbGRyZW5JY29uIiwiY2hpbGRyZW5WaXNpYmxlIiwiX2NhbGxlZTMiLCJpY29uIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL1RyYWNlVGltZWxpbmVWaWV3ZXIvU3BhblRyZWVPZmZzZXQudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IHJlbmRlciwgc2NyZWVuIH0gZnJvbSAnQHRlc3RpbmctbGlicmFyeS9yZWFjdCc7XG5pbXBvcnQgdXNlckV2ZW50IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvdXNlci1ldmVudCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVHJhY2VTcGFuIH0gZnJvbSAnc3JjL3R5cGVzL3RyYWNlJztcblxuaW1wb3J0IHsgY3JlYXRlVGhlbWUgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcblxuaW1wb3J0IHNwYW5BbmNlc3Rvcklkc1NweSBmcm9tICcuLi91dGlscy9zcGFuLWFuY2VzdG9yLWlkcyc7XG5cbmltcG9ydCBTcGFuVHJlZU9mZnNldCwgeyBnZXRTdHlsZXMsIFRQcm9wcyB9IGZyb20gJy4vU3BhblRyZWVPZmZzZXQnO1xuXG5qZXN0Lm1vY2soJy4uL3V0aWxzL3NwYW4tYW5jZXN0b3ItaWRzJyk7XG5cbmRlc2NyaWJlKCdTcGFuVHJlZU9mZnNldCcsICgpID0+IHtcbiAgY29uc3Qgb3duU3BhbklEID0gJ293blNwYW5JRCc7XG4gIGNvbnN0IHBhcmVudFNwYW5JRCA9ICdwYXJlbnRTcGFuSUQnO1xuICBjb25zdCByb290U3BhbklEID0gJ3Jvb3RTcGFuSUQnO1xuICBjb25zdCBzcGVjaWFsUm9vdElEID0gJ3Jvb3QnO1xuICBsZXQgcHJvcHM6IFRQcm9wcztcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAvLyBNb2NrIGltcGxlbWVudGF0aW9uIGluc3RlYWQgb2YgTW9jayByZXR1cm4gdmFsdWUgc28gdGhhdCBlYWNoIGNhbGwgcmV0dXJucyBhIG5ldyBhcnJheSAobGlrZSBub3JtYWwpXG4gICAgamVzdC5tb2NrZWQoc3BhbkFuY2VzdG9ySWRzU3B5KS5tb2NrSW1wbGVtZW50YXRpb24oKCkgPT4gW3BhcmVudFNwYW5JRCwgcm9vdFNwYW5JRF0pO1xuICAgIHByb3BzID0ge1xuICAgICAgYWRkSG92ZXJJbmRlbnRHdWlkZUlkOiBqZXN0LmZuKCksXG4gICAgICBob3ZlckluZGVudEd1aWRlSWRzOiBuZXcgU2V0KCksXG4gICAgICByZW1vdmVIb3ZlckluZGVudEd1aWRlSWQ6IGplc3QuZm4oKSxcbiAgICAgIHNwYW46IHtcbiAgICAgICAgaGFzQ2hpbGRyZW46IGZhbHNlLFxuICAgICAgICBzcGFuSUQ6IG93blNwYW5JRCxcbiAgICAgIH0gYXMgVHJhY2VTcGFuLFxuICAgIH0gYXMgdW5rbm93biBhcyBUUHJvcHM7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcuU3BhblRyZWVPZmZzZXQtLWluZGVudEd1aWRlJywgKCkgPT4ge1xuICAgIGl0KCdyZW5kZXJzIG9ubHkgb25lIFNwYW5UcmVlT2Zmc2V0LS1pbmRlbnRHdWlkZSBmb3IgZW50aXJlIHRyYWNlIGlmIHNwYW4gaGFzIG5vIGFuY2VzdG9ycycsICgpID0+IHtcbiAgICAgIGplc3QubW9ja2VkKHNwYW5BbmNlc3Rvcklkc1NweSkubW9ja1JldHVyblZhbHVlKFtdKTtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBjb25zdCBpbmRlbnRHdWlkZSA9IHNjcmVlbi5nZXRCeVRlc3RJZCgnU3BhblRyZWVPZmZzZXQtLWluZGVudEd1aWRlJyk7XG4gICAgICBleHBlY3QoaW5kZW50R3VpZGUpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgICBleHBlY3QoaW5kZW50R3VpZGUpLnRvSGF2ZUF0dHJpYnV0ZSgnZGF0YS1hbmNlc3Rvci1pZCcsIHNwZWNpYWxSb290SUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbmRlcnMgb25lIFNwYW5UcmVlT2Zmc2V0LS1pbmRlbnRHdWlkZSBwZXIgYW5jZXN0b3Igc3BhbiwgcGx1cyBvbmUgZm9yIGVudGlyZSB0cmFjZScsICgpID0+IHtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBjb25zdCBpbmRlbnRHdWlkZXMgPSBzY3JlZW4uZ2V0QWxsQnlUZXN0SWQoJ1NwYW5UcmVlT2Zmc2V0LS1pbmRlbnRHdWlkZScpO1xuICAgICAgZXhwZWN0KGluZGVudEd1aWRlcy5sZW5ndGgpLnRvQmUoMyk7XG4gICAgICBleHBlY3QoaW5kZW50R3VpZGVzWzBdKS50b0hhdmVBdHRyaWJ1dGUoJ2RhdGEtYW5jZXN0b3ItaWQnLCBzcGVjaWFsUm9vdElEKTtcbiAgICAgIGV4cGVjdChpbmRlbnRHdWlkZXNbMV0pLnRvSGF2ZUF0dHJpYnV0ZSgnZGF0YS1hbmNlc3Rvci1pZCcsIHJvb3RTcGFuSUQpO1xuICAgICAgZXhwZWN0KGluZGVudEd1aWRlc1syXSkudG9IYXZlQXR0cmlidXRlKCdkYXRhLWFuY2VzdG9yLWlkJywgcGFyZW50U3BhbklEKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIC5pcy1hY3RpdmUgdG8gY29ycmVjdCBpbmRlbnRHdWlkZScsICgpID0+IHtcbiAgICAgIHByb3BzLmhvdmVySW5kZW50R3VpZGVJZHMgPSBuZXcgU2V0KFtwYXJlbnRTcGFuSURdKTtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXMoY3JlYXRlVGhlbWUoKSk7XG4gICAgICBjb25zdCBhY3RpdmVJbmRlbnRHdWlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0eWxlcy5pbmRlbnRHdWlkZUFjdGl2ZX1gKTtcbiAgICAgIGV4cGVjdChhY3RpdmVJbmRlbnRHdWlkZSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICAgIGV4cGVjdChhY3RpdmVJbmRlbnRHdWlkZSkudG9IYXZlQXR0cmlidXRlKCdkYXRhLWFuY2VzdG9yLWlkJywgcGFyZW50U3BhbklEKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYWxscyBwcm9wcy5hZGRIb3ZlckluZGVudEd1aWRlSWQgb24gbW91c2UgZW50ZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICByZW5kZXIoPFNwYW5UcmVlT2Zmc2V0IHsuLi5wcm9wc30gLz4pO1xuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFuY2VzdG9yLWlkPSR7cGFyZW50U3BhbklEfV1gKTtcbiAgICAgIGF3YWl0IHVzZXJFdmVudC5ob3ZlcihzcGFuISk7XG4gICAgICBleHBlY3QocHJvcHMuYWRkSG92ZXJJbmRlbnRHdWlkZUlkKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICBleHBlY3QocHJvcHMuYWRkSG92ZXJJbmRlbnRHdWlkZUlkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChwYXJlbnRTcGFuSUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIHByb3BzLnJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCBvbiBtb3VzZSBsZWF2ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYW5jZXN0b3ItaWQ9JHtwYXJlbnRTcGFuSUR9XWApO1xuICAgICAgYXdhaXQgdXNlckV2ZW50LnVuaG92ZXIoc3BhbiEpO1xuICAgICAgZXhwZWN0KHByb3BzLnJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgICAgZXhwZWN0KHByb3BzLnJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgocGFyZW50U3BhbklEKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2ljb24nLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBwcm9wcyA9IHsgLi4ucHJvcHMsIHNwYW46IHsgLi4ucHJvcHMuc3BhbiwgaGFzQ2hpbGRyZW46IHRydWUgfSB9O1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXMgbm90IHJlbmRlciBpY29uIGlmIHByb3BzLnNwYW4uaGFzQ2hpbGRyZW4gaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICBwcm9wcy5zcGFuLmhhc0NoaWxkcmVuID0gZmFsc2U7XG4gICAgICByZW5kZXIoPFNwYW5UcmVlT2Zmc2V0IHsuLi5wcm9wc30gLz4pO1xuICAgICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5VGVzdElkKCdpY29uLXdyYXBwZXInKSkubm90LnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3QgcmVuZGVyIGljb24gaWYgcHJvcHMuc3Bhbi5oYXNDaGlsZHJlbiBpcyB0cnVlIGFuZCBzaG93Q2hpbGRyZW5JY29uIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgcHJvcHMuc2hvd0NoaWxkcmVuSWNvbiA9IGZhbHNlO1xuICAgICAgcmVuZGVyKDxTcGFuVHJlZU9mZnNldCB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGV4cGVjdChzY3JlZW4ucXVlcnlCeVRlc3RJZCgnaWNvbi13cmFwcGVyJykpLm5vdC50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbmRlcnMgYXJyb3ctcmlnaHQgaWYgcHJvcHMuc3Bhbi5oYXNDaGlsZHJlbiBpcyB0cnVlIGFuZCBwcm9wcy5jaGlsZHJlblZpc2libGUgaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICByZW5kZXIoPFNwYW5UcmVlT2Zmc2V0IHsuLi5wcm9wc30gLz4pO1xuICAgICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgnaWNvbi1hcnJvdy1yaWdodCcpKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbmRlcnMgYXJyb3ctZG93biBpZiBwcm9wcy5zcGFuLmhhc0NoaWxkcmVuIGlzIHRydWUgYW5kIHByb3BzLmNoaWxkcmVuVmlzaWJsZSBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgcHJvcHMuY2hpbGRyZW5WaXNpYmxlID0gdHJ1ZTtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGVzdElkKCdpY29uLWFycm93LWRvd24nKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYWxscyBwcm9wcy5hZGRIb3ZlckluZGVudEd1aWRlSWQgb24gbW91c2UgZW50ZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICByZW5kZXIoPFNwYW5UcmVlT2Zmc2V0IHsuLi5wcm9wc30gLz4pO1xuICAgICAgY29uc3QgaWNvbiA9IHNjcmVlbi5nZXRCeVRlc3RJZCgnaWNvbi13cmFwcGVyJyk7XG4gICAgICBhd2FpdCB1c2VyRXZlbnQuaG92ZXIoaWNvbik7XG4gICAgICBleHBlY3QocHJvcHMuYWRkSG92ZXJJbmRlbnRHdWlkZUlkKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICBleHBlY3QocHJvcHMuYWRkSG92ZXJJbmRlbnRHdWlkZUlkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChvd25TcGFuSUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIHByb3BzLnJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCBvbiBtb3VzZSBsZWF2ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBjb25zdCBpY29uID0gc2NyZWVuLmdldEJ5VGVzdElkKCdpY29uLXdyYXBwZXInKTtcbiAgICAgIGF3YWl0IHVzZXJFdmVudC51bmhvdmVyKGljb24pO1xuICAgICAgZXhwZWN0KHByb3BzLnJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCkudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgICAgZXhwZWN0KHByb3BzLnJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgob3duU3BhbklEKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsTUFBTSxFQUFFQyxNQUFNLFFBQVEsd0JBQXdCO0FBQ3ZELE9BQU9DLFNBQVMsTUFBTSw2QkFBNkI7QUFDbkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFHekIsU0FBU0MsV0FBVyxRQUFRLGVB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