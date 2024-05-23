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
import { polyfill as polyfillAnimationFrame } from '../../utils/test/requestAnimationFrame';
import ViewingLayer from './ViewingLayer';
import { jsx as _jsx } from "react/jsx-runtime";
function getViewRange(viewStart, viewEnd) {
  return {
    time: {
      current: [viewStart, viewEnd]
    }
  };
}
describe('<UnthemedViewingLayer>', function () {
  polyfillAnimationFrame(window);
  var props;
  beforeEach(function () {
    props = {
      height: 60,
      numTicks: 5,
      updateNextViewRangeTime: jest.fn(),
      updateViewRangeTime: jest.fn(),
      viewRange: getViewRange(0, 1)
    };
  });
  it('does not render ViewingLayerCursorGuide if the cursor position is not defined', function () {
    render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
    expect(screen.queryByTestId('ViewingLayerCursorGuide')).toBeNull();
  });
  it('renders ViewingLayerCursorGuide when the cursor position is defined', function () {
    props = _extends({}, props, {
      viewRange: {
        time: {
          current: [0.1, 1],
          cursor: 0.5
        }
      }
    });
    render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
    expect(screen.getByTestId('ViewingLayerCursorGuide')).toBeTruthy();
  });
  it('renders <GraphTicks />', function () {
    render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
    expect(screen.getByTestId('ticks')).toBeTruthy();
  });
  it('renders the scrubber component lines in the correct locations when an area of the minimap is selected', function () {
    props = _extends({}, props, {
      viewRange: {
        time: {
          current: [0.3, 0.7]
        }
      }
    });
    render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
    expect(screen.getAllByTestId('scrubber-component-line')[0]).toHaveAttribute('x1', '30%');
    expect(screen.getAllByTestId('scrubber-component-line')[1]).toHaveAttribute('x1', '70%');
  });
  it('renders the scrubbers', function () {
    render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
    expect(screen.getAllByTestId('scrubber-component')).toBeTruthy();
  });
  it('renders a filtering box if leftBound exists', function () {
    props = _extends({}, props, {
      viewRange: {
        time: {
          current: [0.1, 0.9]
        }
      }
    });
    render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
    expect(screen.getByTestId('left-ViewingLayerInactive')).toHaveAttribute('width', '10%');
    expect(screen.getByTestId('left-ViewingLayerInactive')).toHaveAttribute('x', '0');
  });
  it('renders a filtering box if rightBound exists', function () {
    props = _extends({}, props, {
      viewRange: {
        time: {
          current: [0, 0.8]
        }
      }
    });
    render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
    expect(screen.getByTestId('right-ViewingLayerInactive')).toHaveAttribute('width', '20%');
    expect(screen.getByTestId('right-ViewingLayerInactive')).toHaveAttribute('x', '80%');
  });
  describe('reset selection button', function () {
    it('should not render the reset selection button if props.viewRange.time.current = [0,1]', function () {
      render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
      expect(screen.queryByRole('button', {
        hidden: true
      })).toBeNull();
    });
    it('should render the reset selection button if props.viewRange.time.current[0] !== 0', function () {
      props = _extends({}, props, {
        viewRange: {
          time: {
            current: [0.1, 1]
          }
        }
      });
      render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
      expect(screen.queryByRole('button', {
        hidden: true
      })).toBeInTheDocument();
    });
    it('should render the reset selection button if props.viewRange.time.current[1] !== 1', function () {
      props = _extends({}, props, {
        viewRange: {
          time: {
            current: [0, 0.9]
          }
        }
      });
      render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
      expect(screen.queryByRole('button', {
        hidden: true
      })).toBeInTheDocument();
    });
    it('should call props.updateViewRangeTime when clicked', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var button;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            props = _extends({}, props, {
              viewRange: {
                time: {
                  current: [0.1, 0.9]
                }
              }
            });
            render( /*#__PURE__*/_jsx(ViewingLayer, _extends({}, props)));
            button = screen.queryByRole('button', {
              hidden: true
            });
            _context.next = 5;
            return userEvent.click(button);
          case 5:
            expect(props.updateViewRangeTime).toHaveBeenCalledWith(0, 1);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ1c2VyRXZlbnQiLCJSZWFjdCIsInBvbHlmaWxsIiwicG9seWZpbGxBbmltYXRpb25GcmFtZSIsIlZpZXdpbmdMYXllciIsImpzeCIsIl9qc3giLCJnZXRWaWV3UmFuZ2UiLCJ2aWV3U3RhcnQiLCJ2aWV3RW5kIiwidGltZSIsImN1cnJlbnQiLCJkZXNjcmliZSIsIndpbmRvdyIsInByb3BzIiwiYmVmb3JlRWFjaCIsImhlaWdodCIsIm51bVRpY2tzIiwidXBkYXRlTmV4dFZpZXdSYW5nZVRpbWUiLCJqZXN0IiwiZm4iLCJ1cGRhdGVWaWV3UmFuZ2VUaW1lIiwidmlld1JhbmdlIiwiaXQiLCJfZXh0ZW5kcyIsImV4cGVjdCIsInF1ZXJ5QnlUZXN0SWQiLCJ0b0JlTnVsbCIsImN1cnNvciIsImdldEJ5VGVzdElkIiwidG9CZVRydXRoeSIsImdldEFsbEJ5VGVzdElkIiwidG9IYXZlQXR0cmlidXRlIiwicXVlcnlCeVJvbGUiLCJoaWRkZW4iLCJ0b0JlSW5UaGVEb2N1bWVudCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwiYnV0dG9uIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImNsaWNrIiwidG9IYXZlQmVlbkNhbGxlZFdpdGgiLCJzdG9wIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1RyYWNlUGFnZUhlYWRlci9TcGFuR3JhcGgvVmlld2luZ0xheWVyLnRlc3QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyByZW5kZXIsIHNjcmVlbiB9IGZyb20gJ0B0ZXN0aW5nLWxpYnJhcnkvcmVhY3QnO1xuaW1wb3J0IHVzZXJFdmVudCBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3VzZXItZXZlbnQnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgcG9seWZpbGwgYXMgcG9seWZpbGxBbmltYXRpb25GcmFtZSB9IGZyb20gJy4uLy4uL3V0aWxzL3Rlc3QvcmVxdWVzdEFuaW1hdGlvbkZyYW1lJztcblxuaW1wb3J0IFZpZXdpbmdMYXllciwgeyBWaWV3aW5nTGF5ZXJQcm9wcyB9IGZyb20gJy4vVmlld2luZ0xheWVyJztcblxuZnVuY3Rpb24gZ2V0Vmlld1JhbmdlKHZpZXdTdGFydDogbnVtYmVyLCB2aWV3RW5kOiBudW1iZXIpIHtcbiAgcmV0dXJuIHtcbiAgICB0aW1lOiB7XG4gICAgICBjdXJyZW50OiBbdmlld1N0YXJ0LCB2aWV3RW5kXSBhcyBbbnVtYmVyLCBudW1iZXJdLFxuICAgIH0sXG4gIH07XG59XG5cbmRlc2NyaWJlKCc8VW50aGVtZWRWaWV3aW5nTGF5ZXI+JywgKCkgPT4ge1xuICBwb2x5ZmlsbEFuaW1hdGlvbkZyYW1lKHdpbmRvdyk7XG5cbiAgbGV0IHByb3BzOiBWaWV3aW5nTGF5ZXJQcm9wcztcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGhlaWdodDogNjAsXG4gICAgICBudW1UaWNrczogNSxcbiAgICAgIHVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lOiBqZXN0LmZuKCksXG4gICAgICB1cGRhdGVWaWV3UmFuZ2VUaW1lOiBqZXN0LmZuKCksXG4gICAgICB2aWV3UmFuZ2U6IGdldFZpZXdSYW5nZSgwLCAxKSxcbiAgICB9IGFzIHVua25vd24gYXMgVmlld2luZ0xheWVyUHJvcHM7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdCByZW5kZXIgVmlld2luZ0xheWVyQ3Vyc29yR3VpZGUgaWYgdGhlIGN1cnNvciBwb3NpdGlvbiBpcyBub3QgZGVmaW5lZCcsICgpID0+IHtcbiAgICByZW5kZXIoPFZpZXdpbmdMYXllciB7Li4ucHJvcHN9IC8+KTtcbiAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QnlUZXN0SWQoJ1ZpZXdpbmdMYXllckN1cnNvckd1aWRlJykpLnRvQmVOdWxsKCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIFZpZXdpbmdMYXllckN1cnNvckd1aWRlIHdoZW4gdGhlIGN1cnNvciBwb3NpdGlvbiBpcyBkZWZpbmVkJywgKCkgPT4ge1xuICAgIHByb3BzID0geyAuLi5wcm9wcywgdmlld1JhbmdlOiB7IHRpbWU6IHsgY3VycmVudDogWzAuMSwgMV0sIGN1cnNvcjogMC41IH0gfSB9O1xuICAgIHJlbmRlcig8Vmlld2luZ0xheWVyIHsuLi5wcm9wc30gLz4pO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ1ZpZXdpbmdMYXllckN1cnNvckd1aWRlJykpLnRvQmVUcnV0aHkoKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgPEdyYXBoVGlja3MgLz4nLCAoKSA9PiB7XG4gICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgndGlja3MnKSkudG9CZVRydXRoeSgpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB0aGUgc2NydWJiZXIgY29tcG9uZW50IGxpbmVzIGluIHRoZSBjb3JyZWN0IGxvY2F0aW9ucyB3aGVuIGFuIGFyZWEgb2YgdGhlIG1pbmltYXAgaXMgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgcHJvcHMgPSB7IC4uLnByb3BzLCB2aWV3UmFuZ2U6IHsgdGltZTogeyBjdXJyZW50OiBbMC4zLCAwLjddIH0gfSB9O1xuICAgIHJlbmRlcig8Vmlld2luZ0xheWVyIHsuLi5wcm9wc30gLz4pO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QWxsQnlUZXN0SWQoJ3NjcnViYmVyLWNvbXBvbmVudC1saW5lJylbMF0pLnRvSGF2ZUF0dHJpYnV0ZSgneDEnLCAnMzAlJyk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRBbGxCeVRlc3RJZCgnc2NydWJiZXItY29tcG9uZW50LWxpbmUnKVsxXSkudG9IYXZlQXR0cmlidXRlKCd4MScsICc3MCUnKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgdGhlIHNjcnViYmVycycsICgpID0+IHtcbiAgICByZW5kZXIoPFZpZXdpbmdMYXllciB7Li4ucHJvcHN9IC8+KTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEFsbEJ5VGVzdElkKCdzY3J1YmJlci1jb21wb25lbnQnKSkudG9CZVRydXRoeSgpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyBhIGZpbHRlcmluZyBib3ggaWYgbGVmdEJvdW5kIGV4aXN0cycsICgpID0+IHtcbiAgICBwcm9wcyA9IHsgLi4ucHJvcHMsIHZpZXdSYW5nZTogeyB0aW1lOiB7IGN1cnJlbnQ6IFswLjEsIDAuOV0gfSB9IH07XG4gICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgnbGVmdC1WaWV3aW5nTGF5ZXJJbmFjdGl2ZScpKS50b0hhdmVBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwJScpO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ2xlZnQtVmlld2luZ0xheWVySW5hY3RpdmUnKSkudG9IYXZlQXR0cmlidXRlKCd4JywgJzAnKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgYSBmaWx0ZXJpbmcgYm94IGlmIHJpZ2h0Qm91bmQgZXhpc3RzJywgKCkgPT4ge1xuICAgIHByb3BzID0geyAuLi5wcm9wcywgdmlld1JhbmdlOiB7IHRpbWU6IHsgY3VycmVudDogWzAsIDAuOF0gfSB9IH07XG4gICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgncmlnaHQtVmlld2luZ0xheWVySW5hY3RpdmUnKSkudG9IYXZlQXR0cmlidXRlKCd3aWR0aCcsICcyMCUnKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGVzdElkKCdyaWdodC1WaWV3aW5nTGF5ZXJJbmFjdGl2ZScpKS50b0hhdmVBdHRyaWJ1dGUoJ3gnLCAnODAlJyk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZXNldCBzZWxlY3Rpb24gYnV0dG9uJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgbm90IHJlbmRlciB0aGUgcmVzZXQgc2VsZWN0aW9uIGJ1dHRvbiBpZiBwcm9wcy52aWV3UmFuZ2UudGltZS5jdXJyZW50ID0gWzAsMV0nLCAoKSA9PiB7XG4gICAgICByZW5kZXIoPFZpZXdpbmdMYXllciB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGV4cGVjdChzY3JlZW4ucXVlcnlCeVJvbGUoJ2J1dHRvbicsIHsgaGlkZGVuOiB0cnVlIH0pKS50b0JlTnVsbCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgdGhlIHJlc2V0IHNlbGVjdGlvbiBidXR0b24gaWYgcHJvcHMudmlld1JhbmdlLnRpbWUuY3VycmVudFswXSAhPT0gMCcsICgpID0+IHtcbiAgICAgIHByb3BzID0geyAuLi5wcm9wcywgdmlld1JhbmdlOiB7IHRpbWU6IHsgY3VycmVudDogWzAuMSwgMV0gfSB9IH07XG4gICAgICByZW5kZXIoPFZpZXdpbmdMYXllciB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGV4cGVjdChzY3JlZW4ucXVlcnlCeVJvbGUoJ2J1dHRvbicsIHsgaGlkZGVuOiB0cnVlIH0pKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW5kZXIgdGhlIHJlc2V0IHNlbGVjdGlvbiBidXR0b24gaWYgcHJvcHMudmlld1JhbmdlLnRpbWUuY3VycmVudFsxXSAhPT0gMScsICgpID0+IHtcbiAgICAgIHByb3BzID0geyAuLi5wcm9wcywgdmlld1JhbmdlOiB7IHRpbWU6IHsgY3VycmVudDogWzAsIDAuOV0gfSB9IH07XG4gICAgICByZW5kZXIoPFZpZXdpbmdMYXllciB7Li4ucHJvcHN9IC8+KTtcbiAgICAgIGV4cGVjdChzY3JlZW4ucXVlcnlCeVJvbGUoJ2J1dHRvbicsIHsgaGlkZGVuOiB0cnVlIH0pKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHByb3BzLnVwZGF0ZVZpZXdSYW5nZVRpbWUgd2hlbiBjbGlja2VkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgcHJvcHMgPSB7IC4uLnByb3BzLCB2aWV3UmFuZ2U6IHsgdGltZTogeyBjdXJyZW50OiBbMC4xLCAwLjldIH0gfSB9O1xuICAgICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgICBjb25zdCBidXR0b24gPSBzY3JlZW4ucXVlcnlCeVJvbGUoJ2J1dHRvbicsIHsgaGlkZGVuOiB0cnVlIH0pITtcbiAgICAgIGF3YWl0IHVzZXJFdmVudC5jbGljayhidXR0b24pO1xuICAgICAgZXhwZWN0KHByb3BzLnVwZGF0ZVZpZXdSYW5n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