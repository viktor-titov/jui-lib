import _extends from "@babel/runtime/helpers/extends";
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
import React from 'react';
import TimelineHeaderRow from './TimelineHeaderRow';
import { jsx as _jsx } from "react/jsx-runtime";
var nameColumnWidth = 0.25;
var setup = function setup() {
  var props = {
    nameColumnWidth: nameColumnWidth,
    duration: 1234,
    numTicks: 5,
    onCollapseAll: function onCollapseAll() {},
    onCollapseOne: function onCollapseOne() {},
    onColummWidthChange: function onColummWidthChange() {},
    onExpandAll: function onExpandAll() {},
    onExpandOne: function onExpandOne() {},
    updateNextViewRangeTime: function updateNextViewRangeTime() {},
    updateViewRangeTime: function updateViewRangeTime() {},
    viewRangeTime: {
      current: [0.1, 0.9]
    }
  };
  return render( /*#__PURE__*/_jsx(TimelineHeaderRow, _extends({}, props)));
};
describe('TimelineHeaderRow', function () {
  it('renders without exploding', function () {
    expect(function () {
      return setup();
    }).not.toThrow();
  });
  it('renders the title', function () {
    setup();
    expect(screen.getByRole('heading', {
      name: 'Service & Operation'
    }));
  });
  it('renders the collapser controls', function () {
    setup();
    expect(screen.getByRole('button', {
      name: 'Expand All'
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: 'Collapse All'
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: 'Expand +1'
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: 'Collapse +1'
    })).toBeInTheDocument();
  });
  it('renders the resizer controls', function () {
    setup();
    expect(screen.getByTestId('TimelineColumnResizer')).toBeInTheDocument();
    expect(screen.getByTestId('TimelineColumnResizer--dragger')).toBeInTheDocument();
    expect(screen.getByTestId('TimelineColumnResizer--gripIcon')).toBeInTheDocument();
  });
  it('propagates the name column width', function () {
    setup();
    var timelineCells = screen.queryAllByTestId('TimelineRowCell');
    expect(timelineCells).toHaveLength(2);
    expect(getComputedStyle(timelineCells[0]).maxWidth).toBe(nameColumnWidth * 100 + "%");
    expect(getComputedStyle(timelineCells[1]).maxWidth).toBe((1 - nameColumnWidth) * 100 + "%");
  });
  it('renders the TimelineViewingLayer', function () {
    setup();
    expect(screen.getByTestId('TimelineViewingLayer')).toBeInTheDocument();
  });
  it('renders the Ticks', function () {
    setup();
    expect(screen.getAllByTestId('TicksID')).toHaveLength(5);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIlRpbWVsaW5lSGVhZGVyUm93IiwianN4IiwiX2pzeCIsIm5hbWVDb2x1bW5XaWR0aCIsInNldHVwIiwicHJvcHMiLCJkdXJhdGlvbiIsIm51bVRpY2tzIiwib25Db2xsYXBzZUFsbCIsIm9uQ29sbGFwc2VPbmUiLCJvbkNvbHVtbVdpZHRoQ2hhbmdlIiwib25FeHBhbmRBbGwiLCJvbkV4cGFuZE9uZSIsInVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lIiwidXBkYXRlVmlld1JhbmdlVGltZSIsInZpZXdSYW5nZVRpbWUiLCJjdXJyZW50IiwiX2V4dGVuZHMiLCJkZXNjcmliZSIsIml0IiwiZXhwZWN0Iiwibm90IiwidG9UaHJvdyIsImdldEJ5Um9sZSIsIm5hbWUiLCJ0b0JlSW5UaGVEb2N1bWVudCIsImdldEJ5VGVzdElkIiwidGltZWxpbmVDZWxscyIsInF1ZXJ5QWxsQnlUZXN0SWQiLCJ0b0hhdmVMZW5ndGgiLCJnZXRDb21wdXRlZFN0eWxlIiwibWF4V2lkdGgiLCJ0b0JlIiwiZ2V0QWxsQnlUZXN0SWQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9UaW1lbGluZUhlYWRlclJvdy9UaW1lbGluZUhlYWRlclJvdy50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVyLCBzY3JlZW4gfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBUaW1lbGluZUhlYWRlclJvdywgeyBUaW1lbGluZUhlYWRlclJvd1Byb3BzIH0gZnJvbSAnLi9UaW1lbGluZUhlYWRlclJvdyc7XG5cbmNvbnN0IG5hbWVDb2x1bW5XaWR0aCA9IDAuMjU7XG5jb25zdCBzZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgbmFtZUNvbHVtbldpZHRoLFxuICAgIGR1cmF0aW9uOiAxMjM0LFxuICAgIG51bVRpY2tzOiA1LFxuICAgIG9uQ29sbGFwc2VBbGw6ICgpID0+IHt9LFxuICAgIG9uQ29sbGFwc2VPbmU6ICgpID0+IHt9LFxuICAgIG9uQ29sdW1tV2lkdGhDaGFuZ2U6ICgpID0+IHt9LFxuICAgIG9uRXhwYW5kQWxsOiAoKSA9PiB7fSxcbiAgICBvbkV4cGFuZE9uZTogKCkgPT4ge30sXG4gICAgdXBkYXRlTmV4dFZpZXdSYW5nZVRpbWU6ICgpID0+IHt9LFxuICAgIHVwZGF0ZVZpZXdSYW5nZVRpbWU6ICgpID0+IHt9LFxuICAgIHZpZXdSYW5nZVRpbWU6IHtcbiAgICAgIGN1cnJlbnQ6IFswLjEsIDAuOV0sXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gcmVuZGVyKDxUaW1lbGluZUhlYWRlclJvdyB7Li4uKHByb3BzIGFzIHVua25vd24gYXMgVGltZWxpbmVIZWFkZXJSb3dQcm9wcyl9IC8+KTtcbn07XG5cbmRlc2NyaWJlKCdUaW1lbGluZUhlYWRlclJvdycsICgpID0+IHtcbiAgaXQoJ3JlbmRlcnMgd2l0aG91dCBleHBsb2RpbmcnLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHNldHVwKCkpLm5vdC50b1Rocm93KCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRoZSB0aXRsZScsICgpID0+IHtcbiAgICBzZXR1cCgpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ2hlYWRpbmcnLCB7IG5hbWU6ICdTZXJ2aWNlICYgT3BlcmF0aW9uJyB9KSk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRoZSBjb2xsYXBzZXIgY29udHJvbHMnLCAoKSA9PiB7XG4gICAgc2V0dXAoKTtcblxuICAgIGV4cGVjdChzY3JlZW4uZ2V0QnlSb2xlKCdidXR0b24nLCB7IG5hbWU6ICdFeHBhbmQgQWxsJyB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5Um9sZSgnYnV0dG9uJywgeyBuYW1lOiAnQ29sbGFwc2UgQWxsJyB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5Um9sZSgnYnV0dG9uJywgeyBuYW1lOiAnRXhwYW5kICsxJyB9KSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5Um9sZSgnYnV0dG9uJywgeyBuYW1lOiAnQ29sbGFwc2UgKzEnIH0pKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB0aGUgcmVzaXplciBjb250cm9scycsICgpID0+IHtcbiAgICBzZXR1cCgpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgnVGltZWxpbmVDb2x1bW5SZXNpemVyJykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgnVGltZWxpbmVDb2x1bW5SZXNpemVyLS1kcmFnZ2VyJykpLnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgnVGltZWxpbmVDb2x1bW5SZXNpemVyLS1ncmlwSWNvbicpKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcblxuICBpdCgncHJvcGFnYXRlcyB0aGUgbmFtZSBjb2x1bW4gd2lkdGgnLCAoKSA9PiB7XG4gICAgc2V0dXAoKTtcblxuICAgIGNvbnN0IHRpbWVsaW5lQ2VsbHMgPSBzY3JlZW4ucXVlcnlBbGxCeVRlc3RJZCgnVGltZWxpbmVSb3dDZWxsJyk7XG4gICAgZXhwZWN0KHRpbWVsaW5lQ2VsbHMpLnRvSGF2ZUxlbmd0aCgyKTtcbiAgICBleHBlY3QoZ2V0Q29tcHV0ZWRTdHlsZSh0aW1lbGluZUNlbGxzWzBdKS5tYXhXaWR0aCkudG9CZShgJHtuYW1lQ29sdW1uV2lkdGggKiAxMDB9JWApO1xuICAgIGV4cGVjdChnZXRDb21wdXRlZFN0eWxlKHRpbWVsaW5lQ2VsbHNbMV0pLm1heFdpZHRoKS50b0JlKGAkeygxIC0gbmFtZUNvbHVtbldpZHRoKSAqIDEwMH0lYCk7XG4gIH0pO1xuXG4gIGl0KCdyZW5kZXJzIHRoZSBUaW1lbGluZVZpZXdpbmdMYXllcicsICgpID0+IHtcbiAgICBzZXR1cCgpO1xuXG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRlc3RJZCgnVGltZWxpbmVWaWV3aW5nTGF5ZXInKSkudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgfSk7XG5cbiAgaXQoJ3JlbmRlcnMgdGhlIFRpY2tzJywgKCkgPT4ge1xuICAgIHNldHVwKCk7XG5cbiAgICBleHBlY3Qoc2NyZWVuLmdldEFsbEJ5VGVzdElkKCdUaWNrc0lEJykpLnRvSGF2ZUxlbmd0aCg1KTtcbiAgfSk7XG59KTtcbiJdLCJt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