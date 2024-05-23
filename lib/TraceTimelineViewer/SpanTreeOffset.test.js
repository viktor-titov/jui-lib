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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ1c2VyRXZlbnQiLCJSZWFjdCIsImNyZWF0ZVRoZW1lIiwic3BhbkFuY2VzdG9ySWRzU3B5IiwiU3BhblRyZWVPZmZzZXQiLCJnZXRTdHlsZXMiLCJqc3giLCJfanN4IiwiamVzdCIsIm1vY2siLCJkZXNjcmliZSIsIm93blNwYW5JRCIsInBhcmVudFNwYW5JRCIsInJvb3RTcGFuSUQiLCJzcGVjaWFsUm9vdElEIiwicHJvcHMiLCJiZWZvcmVFYWNoIiwibW9ja2VkIiwibW9ja0ltcGxlbWVudGF0aW9uIiwiYWRkSG92ZXJJbmRlbnRHdWlkZUlkIiwiZm4iLCJob3ZlckluZGVudEd1aWRlSWRzIiwiU2V0IiwicmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkIiwic3BhbiIsImhhc0NoaWxkcmVuIiwic3BhbklEIiwiaXQiLCJtb2NrUmV0dXJuVmFsdWUiLCJfZXh0ZW5kcyIsImluZGVudEd1aWRlIiwiZ2V0QnlUZXN0SWQiLCJleHBlY3QiLCJ0b0JlSW5UaGVEb2N1bWVudCIsInRvSGF2ZUF0dHJpYnV0ZSIsImluZGVudEd1aWRlcyIsImdldEFsbEJ5VGVzdElkIiwibGVuZ3RoIiwidG9CZSIsInN0eWxlcyIsImFjdGl2ZUluZGVudEd1aWRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5kZW50R3VpZGVBY3RpdmUiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJob3ZlciIsInRvSGF2ZUJlZW5DYWxsZWRUaW1lcyIsInRvSGF2ZUJlZW5DYWxsZWRXaXRoIiwic3RvcCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwidW5ob3ZlciIsInF1ZXJ5QnlUZXN0SWQiLCJub3QiLCJzaG93Q2hpbGRyZW5JY29uIiwiY2hpbGRyZW5WaXNpYmxlIiwiX2NhbGxlZTMiLCJpY29uIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuVHJlZU9mZnNldC50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVyLCBzY3JlZW4gfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCB1c2VyRXZlbnQgZnJvbSAnQHRlc3RpbmctbGlicmFyeS91c2VyLWV2ZW50JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUcmFjZVNwYW4gfSBmcm9tICdzcmMvdHlwZXMvdHJhY2UnO1xuXG5pbXBvcnQgeyBjcmVhdGVUaGVtZSB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuXG5pbXBvcnQgc3BhbkFuY2VzdG9ySWRzU3B5IGZyb20gJy4uL3V0aWxzL3NwYW4tYW5jZXN0b3ItaWRzJztcblxuaW1wb3J0IFNwYW5UcmVlT2Zmc2V0LCB7IGdldFN0eWxlcywgVFByb3BzIH0gZnJvbSAnLi9TcGFuVHJlZU9mZnNldCc7XG5cbmplc3QubW9jaygnLi4vdXRpbHMvc3Bhbi1hbmNlc3Rvci1pZHMnKTtcblxuZGVzY3JpYmUoJ1NwYW5UcmVlT2Zmc2V0JywgKCkgPT4ge1xuICBjb25zdCBvd25TcGFuSUQgPSAnb3duU3BhbklEJztcbiAgY29uc3QgcGFyZW50U3BhbklEID0gJ3BhcmVudFNwYW5JRCc7XG4gIGNvbnN0IHJvb3RTcGFuSUQgPSAncm9vdFNwYW5JRCc7XG4gIGNvbnN0IHNwZWNpYWxSb290SUQgPSAncm9vdCc7XG4gIGxldCBwcm9wczogVFByb3BzO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIC8vIE1vY2sgaW1wbGVtZW50YXRpb24gaW5zdGVhZCBvZiBNb2NrIHJldHVybiB2YWx1ZSBzbyB0aGF0IGVhY2ggY2FsbCByZXR1cm5zIGEgbmV3IGFycmF5IChsaWtlIG5vcm1hbClcbiAgICBqZXN0Lm1vY2tlZChzcGFuQW5jZXN0b3JJZHNTcHkpLm1vY2tJbXBsZW1lbnRhdGlvbigoKSA9PiBbcGFyZW50U3BhbklELCByb290U3BhbklEXSk7XG4gICAgcHJvcHMgPSB7XG4gICAgICBhZGRIb3ZlckluZGVudEd1aWRlSWQ6IGplc3QuZm4oKSxcbiAgICAgIGhvdmVySW5kZW50R3VpZGVJZHM6IG5ldyBTZXQoKSxcbiAgICAgIHJlbW92ZUhvdmVySW5kZW50R3VpZGVJZDogamVzdC5mbigpLFxuICAgICAgc3Bhbjoge1xuICAgICAgICBoYXNDaGlsZHJlbjogZmFsc2UsXG4gICAgICAgIHNwYW5JRDogb3duU3BhbklELFxuICAgICAgfSBhcyBUcmFjZVNwYW4sXG4gICAgfSBhcyB1bmtub3duIGFzIFRQcm9wcztcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJy5TcGFuVHJlZU9mZnNldC0taW5kZW50R3VpZGUnLCAoKSA9PiB7XG4gICAgaXQoJ3JlbmRlcnMgb25seSBvbmUgU3BhblRyZWVPZmZzZXQtLWluZGVudEd1aWRlIGZvciBlbnRpcmUgdHJhY2UgaWYgc3BhbiBoYXMgbm8gYW5jZXN0b3JzJywgKCkgPT4ge1xuICAgICAgamVzdC5tb2NrZWQoc3BhbkFuY2VzdG9ySWRzU3B5KS5tb2NrUmV0dXJuVmFsdWUoW10pO1xuICAgICAgcmVuZGVyKDxTcGFuVHJlZU9mZnNldCB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGNvbnN0IGluZGVudEd1aWRlID0gc2NyZWVuLmdldEJ5VGVzdElkKCdTcGFuVHJlZU9mZnNldC0taW5kZW50R3VpZGUnKTtcbiAgICAgIGV4cGVjdChpbmRlbnRHdWlkZSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICAgIGV4cGVjdChpbmRlbnRHdWlkZSkudG9IYXZlQXR0cmlidXRlKCdkYXRhLWFuY2VzdG9yLWlkJywgc3BlY2lhbFJvb3RJRCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVuZGVycyBvbmUgU3BhblRyZWVPZmZzZXQtLWluZGVudEd1aWRlIHBlciBhbmNlc3RvciBzcGFuLCBwbHVzIG9uZSBmb3IgZW50aXJlIHRyYWNlJywgKCkgPT4ge1xuICAgICAgcmVuZGVyKDxTcGFuVHJlZU9mZnNldCB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGNvbnN0IGluZGVudEd1aWRlcyA9IHNjcmVlbi5nZXRBbGxCeVRlc3RJZCgnU3BhblRyZWVPZmZzZXQtLWluZGVudEd1aWRlJyk7XG4gICAgICBleHBlY3QoaW5kZW50R3VpZGVzLmxlbmd0aCkudG9CZSgzKTtcbiAgICAgIGV4cGVjdChpbmRlbnRHdWlkZXNbMF0pLnRvSGF2ZUF0dHJpYnV0ZSgnZGF0YS1hbmNlc3Rvci1pZCcsIHNwZWNpYWxSb290SUQpO1xuICAgICAgZXhwZWN0KGluZGVudEd1aWRlc1sxXSkudG9IYXZlQXR0cmlidXRlKCdkYXRhLWFuY2VzdG9yLWlkJywgcm9vdFNwYW5JRCk7XG4gICAgICBleHBlY3QoaW5kZW50R3VpZGVzWzJdKS50b0hhdmVBdHRyaWJ1dGUoJ2RhdGEtYW5jZXN0b3ItaWQnLCBwYXJlbnRTcGFuSUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgLmlzLWFjdGl2ZSB0byBjb3JyZWN0IGluZGVudEd1aWRlJywgKCkgPT4ge1xuICAgICAgcHJvcHMuaG92ZXJJbmRlbnRHdWlkZUlkcyA9IG5ldyBTZXQoW3BhcmVudFNwYW5JRF0pO1xuICAgICAgcmVuZGVyKDxTcGFuVHJlZU9mZnNldCB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlcyhjcmVhdGVUaGVtZSgpKTtcbiAgICAgIGNvbnN0IGFjdGl2ZUluZGVudEd1aWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3R5bGVzLmluZGVudEd1aWRlQWN0aXZlfWApO1xuICAgICAgZXhwZWN0KGFjdGl2ZUluZGVudEd1aWRlKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgICAgZXhwZWN0KGFjdGl2ZUluZGVudEd1aWRlKS50b0hhdmVBdHRyaWJ1dGUoJ2RhdGEtYW5jZXN0b3ItaWQnLCBwYXJlbnRTcGFuSUQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIHByb3BzLmFkZEhvdmVySW5kZW50R3VpZGVJZCBvbiBtb3VzZSBlbnRlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtYW5jZXN0b3ItaWQ9JHtwYXJlbnRTcGFuSUR9XWApO1xuICAgICAgYXdhaXQgdXNlckV2ZW50LmhvdmVyKHNwYW4hKTtcbiAgICAgIGV4cGVjdChwcm9wcy5hZGRIb3ZlckluZGVudEd1aWRlSWQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgIGV4cGVjdChwcm9wcy5hZGRIb3ZlckluZGVudEd1aWRlSWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHBhcmVudFNwYW5JRCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FsbHMgcHJvcHMucmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkIG9uIG1vdXNlIGxlYXZlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgcmVuZGVyKDxTcGFuVHJlZU9mZnNldCB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hbmNlc3Rvci1pZD0ke3BhcmVudFNwYW5JRH1dYCk7XG4gICAgICBhd2FpdCB1c2VyRXZlbnQudW5ob3ZlcihzcGFuISk7XG4gICAgICBleHBlY3QocHJvcHMucmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICBleHBlY3QocHJvcHMucmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChwYXJlbnRTcGFuSUQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaWNvbicsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIHByb3BzID0geyAuLi5wcm9wcywgc3BhbjogeyAuLi5wcm9wcy5zcGFuLCBoYXNDaGlsZHJlbjogdHJ1ZSB9IH07XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3QgcmVuZGVyIGljb24gaWYgcHJvcHMuc3Bhbi5oYXNDaGlsZHJlbiBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgIHByb3BzLnNwYW4uaGFzQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QnlUZXN0SWQoJ2ljb24td3JhcHBlcicpKS5ub3QudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCByZW5kZXIgaWNvbiBpZiBwcm9wcy5zcGFuLmhhc0NoaWxkcmVuIGlzIHRydWUgYW5kIHNob3dDaGlsZHJlbkljb24gaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICBwcm9wcy5zaG93Q2hpbGRyZW5JY29uID0gZmFsc2U7XG4gICAgICByZW5kZXIoPFNwYW5UcmVlT2Zmc2V0IHsuLi5wcm9wc30gLz4pO1xuICAgICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5VGVzdElkKCdpY29uLXdyYXBwZXInKSkubm90LnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVuZGVycyBhcnJvdy1yaWdodCBpZiBwcm9wcy5zcGFuLmhhc0NoaWxkcmVuIGlzIHRydWUgYW5kIHByb3BzLmNoaWxkcmVuVmlzaWJsZSBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGVzdElkKCdpY29uLWFycm93LXJpZ2h0JykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVuZGVycyBhcnJvdy1kb3duIGlmIHByb3BzLnNwYW4uaGFzQ2hpbGRyZW4gaXMgdHJ1ZSBhbmQgcHJvcHMuY2hpbGRyZW5WaXNpYmxlIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICBwcm9wcy5jaGlsZHJlblZpc2libGUgPSB0cnVlO1xuICAgICAgcmVuZGVyKDxTcGFuVHJlZU9mZnNldCB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ2ljb24tYXJyb3ctZG93bicpKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGxzIHByb3BzLmFkZEhvdmVySW5kZW50R3VpZGVJZCBvbiBtb3VzZSBlbnRlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIHJlbmRlcig8U3BhblRyZWVPZmZzZXQgey4uLnByb3BzfSAvPik7XG4gICAgICBjb25zdCBpY29uID0gc2NyZWVuLmdldEJ5VGVzdElkKCdpY29uLXdyYXBwZXInKTtcbiAgICAgIGF3YWl0IHVzZXJFdmVudC5ob3ZlcihpY29uKTtcbiAgICAgIGV4cGVjdChwcm9wcy5hZGRIb3ZlckluZGVudEd1aWRlSWQpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICAgIGV4cGVjdChwcm9wcy5hZGRIb3ZlckluZGVudEd1aWRlSWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG93blNwYW5JRCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FsbHMgcHJvcHMucmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkIG9uIG1vdXNlIGxlYXZlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgcmVuZGVyKDxTcGFuVHJlZU9mZnNldCB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGNvbnN0IGljb24gPSBzY3JlZW4uZ2V0QnlUZXN0SWQoJ2ljb24td3JhcHBlcicpO1xuICAgICAgYXdhaXQgdXNlckV2ZW50LnVuaG92ZXIoaWNvbik7XG4gICAgICBleHBlY3QocHJvcHMucmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICBleHBlY3QocHJvcHMucmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChvd25TcGFuSUQpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSx3QkFBd0I7QUFDdkQsT0FBT0MsU0FBUyxNQUFNLDZCQUE2QjtBQUNuRCxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUd6QixTQUFTQyxXQUFXLFFBQVEsZUFBZTtBQUUz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