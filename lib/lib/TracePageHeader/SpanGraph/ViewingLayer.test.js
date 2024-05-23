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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJ1c2VyRXZlbnQiLCJSZWFjdCIsInBvbHlmaWxsIiwicG9seWZpbGxBbmltYXRpb25GcmFtZSIsIlZpZXdpbmdMYXllciIsImpzeCIsIl9qc3giLCJnZXRWaWV3UmFuZ2UiLCJ2aWV3U3RhcnQiLCJ2aWV3RW5kIiwidGltZSIsImN1cnJlbnQiLCJkZXNjcmliZSIsIndpbmRvdyIsInByb3BzIiwiYmVmb3JlRWFjaCIsImhlaWdodCIsIm51bVRpY2tzIiwidXBkYXRlTmV4dFZpZXdSYW5nZVRpbWUiLCJqZXN0IiwiZm4iLCJ1cGRhdGVWaWV3UmFuZ2VUaW1lIiwidmlld1JhbmdlIiwiaXQiLCJfZXh0ZW5kcyIsImV4cGVjdCIsInF1ZXJ5QnlUZXN0SWQiLCJ0b0JlTnVsbCIsImN1cnNvciIsImdldEJ5VGVzdElkIiwidG9CZVRydXRoeSIsImdldEFsbEJ5VGVzdElkIiwidG9IYXZlQXR0cmlidXRlIiwicXVlcnlCeVJvbGUiLCJoaWRkZW4iLCJ0b0JlSW5UaGVEb2N1bWVudCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwiYnV0dG9uIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImNsaWNrIiwidG9IYXZlQmVlbkNhbGxlZFdpdGgiLCJzdG9wIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVBhZ2VIZWFkZXIvU3BhbkdyYXBoL1ZpZXdpbmdMYXllci50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVyLCBzY3JlZW4gfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCB1c2VyRXZlbnQgZnJvbSAnQHRlc3RpbmctbGlicmFyeS91c2VyLWV2ZW50JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHBvbHlmaWxsIGFzIHBvbHlmaWxsQW5pbWF0aW9uRnJhbWUgfSBmcm9tICcuLi8uLi91dGlscy90ZXN0L3JlcXVlc3RBbmltYXRpb25GcmFtZSc7XG5cbmltcG9ydCBWaWV3aW5nTGF5ZXIsIHsgVmlld2luZ0xheWVyUHJvcHMgfSBmcm9tICcuL1ZpZXdpbmdMYXllcic7XG5cbmZ1bmN0aW9uIGdldFZpZXdSYW5nZSh2aWV3U3RhcnQ6IG51bWJlciwgdmlld0VuZDogbnVtYmVyKSB7XG4gIHJldHVybiB7XG4gICAgdGltZToge1xuICAgICAgY3VycmVudDogW3ZpZXdTdGFydCwgdmlld0VuZF0gYXMgW251bWJlciwgbnVtYmVyXSxcbiAgICB9LFxuICB9O1xufVxuXG5kZXNjcmliZSgnPFVudGhlbWVkVmlld2luZ0xheWVyPicsICgpID0+IHtcbiAgcG9seWZpbGxBbmltYXRpb25GcmFtZSh3aW5kb3cpO1xuXG4gIGxldCBwcm9wczogVmlld2luZ0xheWVyUHJvcHM7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBoZWlnaHQ6IDYwLFxuICAgICAgbnVtVGlja3M6IDUsXG4gICAgICB1cGRhdGVOZXh0Vmlld1JhbmdlVGltZTogamVzdC5mbigpLFxuICAgICAgdXBkYXRlVmlld1JhbmdlVGltZTogamVzdC5mbigpLFxuICAgICAgdmlld1JhbmdlOiBnZXRWaWV3UmFuZ2UoMCwgMSksXG4gICAgfSBhcyB1bmtub3duIGFzIFZpZXdpbmdMYXllclByb3BzO1xuICB9KTtcblxuICBpdCgnZG9lcyBub3QgcmVuZGVyIFZpZXdpbmdMYXllckN1cnNvckd1aWRlIGlmIHRoZSBjdXJzb3IgcG9zaXRpb24gaXMgbm90IGRlZmluZWQnLCAoKSA9PiB7XG4gICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5VGVzdElkKCdWaWV3aW5nTGF5ZXJDdXJzb3JHdWlkZScpKS50b0JlTnVsbCgpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyBWaWV3aW5nTGF5ZXJDdXJzb3JHdWlkZSB3aGVuIHRoZSBjdXJzb3IgcG9zaXRpb24gaXMgZGVmaW5lZCcsICgpID0+IHtcbiAgICBwcm9wcyA9IHsgLi4ucHJvcHMsIHZpZXdSYW5nZTogeyB0aW1lOiB7IGN1cnJlbnQ6IFswLjEsIDFdLCBjdXJzb3I6IDAuNSB9IH0gfTtcbiAgICByZW5kZXIoPFZpZXdpbmdMYXllciB7Li4ucHJvcHN9IC8+KTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGVzdElkKCdWaWV3aW5nTGF5ZXJDdXJzb3JHdWlkZScpKS50b0JlVHJ1dGh5KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIDxHcmFwaFRpY2tzIC8+JywgKCkgPT4ge1xuICAgIHJlbmRlcig8Vmlld2luZ0xheWVyIHsuLi5wcm9wc30gLz4pO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ3RpY2tzJykpLnRvQmVUcnV0aHkoKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgdGhlIHNjcnViYmVyIGNvbXBvbmVudCBsaW5lcyBpbiB0aGUgY29ycmVjdCBsb2NhdGlvbnMgd2hlbiBhbiBhcmVhIG9mIHRoZSBtaW5pbWFwIGlzIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgIHByb3BzID0geyAuLi5wcm9wcywgdmlld1JhbmdlOiB7IHRpbWU6IHsgY3VycmVudDogWzAuMywgMC43XSB9IH0gfTtcbiAgICByZW5kZXIoPFZpZXdpbmdMYXllciB7Li4ucHJvcHN9IC8+KTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEFsbEJ5VGVzdElkKCdzY3J1YmJlci1jb21wb25lbnQtbGluZScpWzBdKS50b0hhdmVBdHRyaWJ1dGUoJ3gxJywgJzMwJScpO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QWxsQnlUZXN0SWQoJ3NjcnViYmVyLWNvbXBvbmVudC1saW5lJylbMV0pLnRvSGF2ZUF0dHJpYnV0ZSgneDEnLCAnNzAlJyk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRoZSBzY3J1YmJlcnMnLCAoKSA9PiB7XG4gICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRBbGxCeVRlc3RJZCgnc2NydWJiZXItY29tcG9uZW50JykpLnRvQmVUcnV0aHkoKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgYSBmaWx0ZXJpbmcgYm94IGlmIGxlZnRCb3VuZCBleGlzdHMnLCAoKSA9PiB7XG4gICAgcHJvcHMgPSB7IC4uLnByb3BzLCB2aWV3UmFuZ2U6IHsgdGltZTogeyBjdXJyZW50OiBbMC4xLCAwLjldIH0gfSB9O1xuICAgIHJlbmRlcig8Vmlld2luZ0xheWVyIHsuLi5wcm9wc30gLz4pO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ2xlZnQtVmlld2luZ0xheWVySW5hY3RpdmUnKSkudG9IYXZlQXR0cmlidXRlKCd3aWR0aCcsICcxMCUnKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGVzdElkKCdsZWZ0LVZpZXdpbmdMYXllckluYWN0aXZlJykpLnRvSGF2ZUF0dHJpYnV0ZSgneCcsICcwJyk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIGEgZmlsdGVyaW5nIGJveCBpZiByaWdodEJvdW5kIGV4aXN0cycsICgpID0+IHtcbiAgICBwcm9wcyA9IHsgLi4ucHJvcHMsIHZpZXdSYW5nZTogeyB0aW1lOiB7IGN1cnJlbnQ6IFswLCAwLjhdIH0gfSB9O1xuICAgIHJlbmRlcig8Vmlld2luZ0xheWVyIHsuLi5wcm9wc30gLz4pO1xuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlUZXN0SWQoJ3JpZ2h0LVZpZXdpbmdMYXllckluYWN0aXZlJykpLnRvSGF2ZUF0dHJpYnV0ZSgnd2lkdGgnLCAnMjAlJyk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgncmlnaHQtVmlld2luZ0xheWVySW5hY3RpdmUnKSkudG9IYXZlQXR0cmlidXRlKCd4JywgJzgwJScpO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVzZXQgc2VsZWN0aW9uIGJ1dHRvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIG5vdCByZW5kZXIgdGhlIHJlc2V0IHNlbGVjdGlvbiBidXR0b24gaWYgcHJvcHMudmlld1JhbmdlLnRpbWUuY3VycmVudCA9IFswLDFdJywgKCkgPT4ge1xuICAgICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QnlSb2xlKCdidXR0b24nLCB7IGhpZGRlbjogdHJ1ZSB9KSkudG9CZU51bGwoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIHRoZSByZXNldCBzZWxlY3Rpb24gYnV0dG9uIGlmIHByb3BzLnZpZXdSYW5nZS50aW1lLmN1cnJlbnRbMF0gIT09IDAnLCAoKSA9PiB7XG4gICAgICBwcm9wcyA9IHsgLi4ucHJvcHMsIHZpZXdSYW5nZTogeyB0aW1lOiB7IGN1cnJlbnQ6IFswLjEsIDFdIH0gfSB9O1xuICAgICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QnlSb2xlKCdidXR0b24nLCB7IGhpZGRlbjogdHJ1ZSB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVuZGVyIHRoZSByZXNldCBzZWxlY3Rpb24gYnV0dG9uIGlmIHByb3BzLnZpZXdSYW5nZS50aW1lLmN1cnJlbnRbMV0gIT09IDEnLCAoKSA9PiB7XG4gICAgICBwcm9wcyA9IHsgLi4ucHJvcHMsIHZpZXdSYW5nZTogeyB0aW1lOiB7IGN1cnJlbnQ6IFswLCAwLjldIH0gfSB9O1xuICAgICAgcmVuZGVyKDxWaWV3aW5nTGF5ZXIgey4uLnByb3BzfSAvPik7XG4gICAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QnlSb2xlKCdidXR0b24nLCB7IGhpZGRlbjogdHJ1ZSB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgY2FsbCBwcm9wcy51cGRhdGVWaWV3UmFuZ2VUaW1lIHdoZW4gY2xpY2tlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIHByb3BzID0geyAuLi5wcm9wcywgdmlld1JhbmdlOiB7IHRpbWU6IHsgY3VycmVudDogWzAuMSwgMC45XSB9IH0gfTtcbiAgICAgIHJlbmRlcig8Vmlld2luZ0xheWVyIHsuLi5wcm9wc30gLz4pO1xuICAgICAgY29uc3QgYnV0dG9uID0gc2NyZWVuLnF1ZXJ5QnlSb2xlKCdidXR0b24nLCB7IGhpZGRlbjogdHJ1ZSB9KSE7XG4gICAgICBhd2FpdCB1c2VyRXZlbnQuY2xpY2soYnV0dG9uKTtcbiAgICAgIGV4cGVjdChwcm9wcy51cGRhdGVWaWV3UmFuZ2VUaW1lKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgwLCAxKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsTUFBTSxFQUFFQyxNQUFNLFFBQVEsd0JBQXdCO0FBQ3ZELE9BQU9DLFNBQVMsTUFBTSw2QkFBNkI7QUFDbkQsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFFekIsU0FBU0MsUUFBUSxJQUFJQyxzQkFBc0IsUUFBUSx3Q0FBd0M7QUFFM0YsT0FBT0MsWUFBWSxNQUE2QixnQkFBZ0I7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFakUsU0FBU0MsWUFBWUEsQ0FBQ0MsU0FBaUIsRUFBRUMsT0FBZSxFQUFFO0VBQ3hELE9BQU87SUFDTEMsSUFBSSxFQUFFO01BQ0pDLE9BQU8sRUFBRSxDQUFDSCxTQUFTLEVBQUVDLE9BQU87SUFDOUI7RUFDRixDQUFDO0FBQ0g7QUFFQUcsUUFBUSxDQUFDLHdCQUF3QixFQUFFLFlBQU07RUFDdkNULHNCQUFzQixDQUFDVSxNQUFNLENBQUM7RUFFOUIsSUFBSUMsS0FBd0I7RUFFNUJDLFVBQVUsQ0FBQyxZQUFNO0lBQ2ZELEtBQUssR0FBRztNQUNORSxNQUFNLEVBQUUsRUFBRTtNQUNWQyxRQUFRLEVBQUUsQ0FBQztNQUNYQyx1QkFBdUIsRUFBRUMsSUFBSSxDQUFDQyxFQUFFLENBQUMsQ0FBQztNQUNsQ0MsbUJBQW1CLEVBQUVGLElBQUksQ0FBQ0MsRUFBRSxDQUFDLENBQUM7TUFDOUJFLFNBQVMsRUFBRWYsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlCLENBQWlDO0VBQ25DLENBQUMsQ0FBQztFQUVGZ0IsRUFBRSxDQUFDLCtFQUErRSxFQUFFLFlBQU07SUFDeEZ6QixNQUFNLGVBQUNRLElBQUEsQ0FBQ0YsWUFBWSxFQUFBb0IsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO0lBQ25DVyxNQUFNLENBQUMxQixNQUFNLENBQUMyQixhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQztFQUNwRSxDQUFDLENBQUM7RUFFRkosRUFBRSxDQUFDLHFFQUFxRSxFQUFFLFlBQU07SUFDOUVULEtBQUssR0FBQVUsUUFBQSxLQUFRVixLQUFLO01BQUVRLFNBQVMsRUFBRTtRQUFFWixJQUFJLEVBQUU7VUFBRUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztVQUFFaUIsTUFBTSxFQUFFO1FBQUk7TUFBRTtJQUFDLEVBQUU7SUFDN0U5QixNQUFNLGVBQUNRLElBQUEsQ0FBQ0YsWUFBWSxFQUFBb0IsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO0lBQ25DVyxNQUFNLENBQUMxQixNQUFNLENBQUM4QixXQUFXLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDQyxVQUFVLENBQUMsQ0FBQztFQUNwRSxDQUFDLENBQUM7RUFFRlAsRUFBRSxDQUFDLHdCQUF3QixFQUFFLFlBQU07SUFDakN6QixNQUFNLGVBQUNRLElBQUEsQ0FBQ0YsWUFBWSxFQUFBb0IsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO0lBQ25DVyxNQUFNLENBQUMxQixNQUFNLENBQUM4QixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQ0MsVUFBVSxDQUFDLENBQUM7RUFDbEQsQ0FBQyxDQUFDO0VBRUZQLEVBQUUsQ0FBQyx1R0FBdUcsRUFBRSxZQUFNO0lBQ2hIVCxLQUFLLEdBQUFVLFFBQUEsS0FBUVYsS0FBSztNQUFFUSxTQUFTLEVBQUU7UUFBRVosSUFBSSxFQUFFO1VBQUVDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO1FBQUU7TUFBRTtJQUFDLEVBQUU7SUFDbEViLE1BQU0sZUFBQ1EsSUFBQSxDQUFDRixZQUFZLEVBQUFvQixRQUFBLEtBQUtWLEtBQUssQ0FBRyxDQUFDLENBQUM7SUFDbkNXLE1BQU0sQ0FBQzFCLE1BQU0sQ0FBQ2dDLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO0lBQ3hGUCxNQUFNLENBQUMxQixNQUFNLENBQUNnQyxjQUFjLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztFQUMxRixDQUFDLENBQUM7RUFFRlQsRUFBRSxDQUFDLHVCQUF1QixFQUFFLFlBQU07SUFDaEN6QixNQUFNLGVBQUNRLElBQUEsQ0FBQ0YsWUFBWSxFQUFBb0IsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO0lBQ25DVyxNQUFNLENBQUMxQixNQUFNLENBQUNnQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDRCxVQUFVLENBQUMsQ0FBQztFQUNsRSxDQUFDLENBQUM7RUFFRlAsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLFlBQU07SUFDdERULEtBQUssR0FBQVUsUUFBQSxLQUFRVixLQUFLO01BQUVRLFNBQVMsRUFBRTtRQUFFWixJQUFJLEVBQUU7VUFBRUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUc7UUFBRTtNQUFFO0lBQUMsRUFBRTtJQUNsRWIsTUFBTSxlQUFDUSxJQUFBLENBQUNGLFlBQVksRUFBQW9CLFFBQUEsS0FBS1YsS0FBSyxDQUFHLENBQUMsQ0FBQztJQUNuQ1csTUFBTSxDQUFDMUIsTUFBTSxDQUFDOEIsV0FBVyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQ0csZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDdkZQLE1BQU0sQ0FBQzFCLE1BQU0sQ0FBQzhCLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUNHLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO0VBQ25GLENBQUMsQ0FBQztFQUVGVCxFQUFFLENBQUMsOENBQThDLEVBQUUsWUFBTTtJQUN2RFQsS0FBSyxHQUFBVSxRQUFBLEtBQVFWLEtBQUs7TUFBRVEsU0FBUyxFQUFFO1FBQUVaLElBQUksRUFBRTtVQUFFQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRztRQUFFO01BQUU7SUFBQyxFQUFFO0lBQ2hFYixNQUFNLGVBQUNRLElBQUEsQ0FBQ0YsWUFBWSxFQUFBb0IsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO0lBQ25DVyxNQUFNLENBQUMxQixNQUFNLENBQUM4QixXQUFXLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDRyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztJQUN4RlAsTUFBTSxDQUFDMUIsTUFBTSxDQUFDOEIsV0FBVyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQ0csZUFBZSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7RUFDdEYsQ0FBQyxDQUFDO0VBRUZwQixRQUFRLENBQUMsd0JBQXdCLEVBQUUsWUFBTTtJQUN2Q1csRUFBRSxDQUFDLHNGQUFzRixFQUFFLFlBQU07TUFDL0Z6QixNQUFNLGVBQUNRLElBQUEsQ0FBQ0YsWUFBWSxFQUFBb0IsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO01BQ25DVyxNQUFNLENBQUMxQixNQUFNLENBQUNrQyxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQUVDLE1BQU0sRUFBRTtNQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNQLFFBQVEsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQztJQUVGSixFQUFFLENBQUMsbUZBQW1GLEVBQUUsWUFBTTtNQUM1RlQsS0FBSyxHQUFBVSxRQUFBLEtBQVFWLEtBQUs7UUFBRVEsU0FBUyxFQUFFO1VBQUVaLElBQUksRUFBRTtZQUFFQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztVQUFFO1FBQUU7TUFBQyxFQUFFO01BQ2hFYixNQUFNLGVBQUNRLElBQUEsQ0FBQ0YsWUFBWSxFQUFBb0IsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO01BQ25DVyxNQUFNLENBQUMxQixNQUFNLENBQUNrQyxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQUVDLE1BQU0sRUFBRTtNQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNDLGlCQUFpQixDQUFDLENBQUM7SUFDNUUsQ0FBQyxDQUFDO0lBRUZaLEVBQUUsQ0FBQyxtRkFBbUYsRUFBRSxZQUFNO01BQzVGVCxLQUFLLEdBQUFVLFFBQUEsS0FBUVYsS0FBSztRQUFFUSxTQUFTLEVBQUU7VUFBRVosSUFBSSxFQUFFO1lBQUVDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHO1VBQUU7UUFBRTtNQUFDLEVBQUU7TUFDaEViLE1BQU0sZUFBQ1EsSUFBQSxDQUFDRixZQUFZLEVBQUFvQixRQUFBLEtBQUtWLEtBQUssQ0FBRyxDQUFDLENBQUM7TUFDbkNXLE1BQU0sQ0FBQzFCLE1BQU0sQ0FBQ2tDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFBRUMsTUFBTSxFQUFFO01BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsaUJBQWlCLENBQUMsQ0FBQztJQUM1RSxDQUFDLENBQUM7SUFFRlosRUFBRSxDQUFDLG9EQUFvRCxlQUFBYSxpQkFBQSxlQUFBQyxtQkFBQSxDQUFBQyxJQUFBLENBQUUsU0FBQUMsUUFBQTtNQUFBLElBQUFDLE1BQUE7TUFBQSxPQUFBSCxtQkFBQSxDQUFBSSxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7UUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtVQUFBO1lBQ3ZEL0IsS0FBSyxHQUFBVSxRQUFBLEtBQVFWLEtBQUs7Y0FBRVEsU0FBUyxFQUFFO2dCQUFFWixJQUFJLEVBQUU7a0JBQUVDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUFFO2NBQUU7WUFBQyxFQUFFO1lBQ2xFYixNQUFNLGVBQUNRLElBQUEsQ0FBQ0YsWUFBWSxFQUFBb0IsUUFBQSxLQUFLVixLQUFLLENBQUcsQ0FBQyxDQUFDO1lBQzdCMEIsTUFBTSxHQUFHekMsTUFBTSxDQUFDa0MsV0FBVyxDQUFDLFFBQVEsRUFBRTtjQUFFQyxNQUFNLEVBQUU7WUFBSyxDQUFDLENBQUM7WUFBQVMsUUFBQSxDQUFBRSxJQUFBO1lBQUEsT0FDdkQ3QyxTQUFTLENBQUM4QyxLQUFLLENBQUNOLE1BQU0sQ0FBQztVQUFBO1lBQzdCZixNQUFNLENBQUNYLEtBQUssQ0FBQ08sbUJBQW1CLENBQUMsQ0FBQzBCLG9CQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7VUFBQztVQUFBO1lBQUEsT0FBQUosUUFBQSxDQUFBSyxJQUFBO1FBQUE7TUFBQSxHQUFBVCxPQUFBO0lBQUEsQ0FDOUQsR0FBQztFQUNKLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==