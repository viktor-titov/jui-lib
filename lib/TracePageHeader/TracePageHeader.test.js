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
import traceGenerator from '../demo/trace-generators';
import { getTraceName } from '../model/trace-viewer';
import transformTraceData from '../model/transform-trace-data';
import TracePageHeader from './TracePageHeader';
import { jsx as _jsx } from "react/jsx-runtime";
var trace = transformTraceData(traceGenerator.trace({}));
var setup = function setup(propOverrides) {
  var defaultProps = _extends({
    canCollapse: false,
    hideSummary: false,
    onSlimViewClicked: function onSlimViewClicked() {},
    onTraceGraphViewClicked: function onTraceGraphViewClicked() {},
    slimView: false,
    trace: trace,
    hideMap: false,
    timeZone: '',
    viewRange: {
      time: {
        current: [10, 20]
      }
    },
    updateNextViewRangeTime: function updateNextViewRangeTime() {},
    updateViewRangeTime: function updateViewRangeTime() {}
  }, propOverrides);
  return render( /*#__PURE__*/_jsx(TracePageHeader, _extends({}, defaultProps)));
};
describe('TracePageHeader test', function () {
  it('should render a header ', function () {
    setup();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  it('should render nothing if a trace is not present', function () {
    setup({
      trace: null
    });
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByText(/Reset Selection/)).not.toBeInTheDocument();
  });
  it('should render the trace title', function () {
    setup();
    expect(screen.getByRole('heading', {
      name: function name(content) {
        return content.replace(/ /g, '').startsWith(getTraceName(trace.spans).replace(/ /g, ''));
      }
    })).toBeInTheDocument();
  });
  it('should render the header items', function () {
    var _headerItems$0$textCo, _headerItems$1$textCo, _headerItems$2$textCo, _headerItems$3$textCo, _headerItems$4$textCo;
    setup();
    var headerItems = screen.queryAllByRole('listitem');
    expect(headerItems).toHaveLength(5);
    //                                                        Year-month-day hour-minute-second
    expect((_headerItems$0$textCo = headerItems[0].textContent) == null ? void 0 : _headerItems$0$textCo.match(/Trace Start:\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}/g)).toBeTruthy();
    expect((_headerItems$1$textCo = headerItems[1].textContent) == null ? void 0 : _headerItems$1$textCo.match(/Duration:[\d|\.][\.|\d|s][\.|\d|s]?[\d]?/)).toBeTruthy();
    expect((_headerItems$2$textCo = headerItems[2].textContent) == null ? void 0 : _headerItems$2$textCo.match(/Services:\d\d?/g)).toBeTruthy();
    expect((_headerItems$3$textCo = headerItems[3].textContent) == null ? void 0 : _headerItems$3$textCo.match(/Depth:\d\d?/)).toBeTruthy();
    expect((_headerItems$4$textCo = headerItems[4].textContent) == null ? void 0 : _headerItems$4$textCo.match(/Total Spans:\d\d?\d?\d?/)).toBeTruthy();
  });
  it('should render a <SpanGraph>', function () {
    setup();
    expect(screen.getByText(/Reset Selection/)).toBeInTheDocument();
  });
  describe('observes the visibility toggles for various UX elements', function () {
    it('hides the minimap when hideMap === true', function () {
      setup({
        hideMap: true
      });
      expect(screen.queryByText(/Reset Selection/)).not.toBeInTheDocument();
    });
    it('hides the summary when hideSummary === true', function () {
      var _setup = setup({
          hideSummary: false
        }),
        rerender = _setup.rerender;
      expect(screen.queryAllByRole('listitem')).toHaveLength(5);
      rerender( /*#__PURE__*/_jsx(TracePageHeader, {
        hideSummary: false,
        trace: null
      }));
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      rerender( /*#__PURE__*/_jsx(TracePageHeader, {
        trace: trace,
        hideSummary: true,
        hideMap: false,
        viewRange: {
          time: {
            current: [10, 20]
          }
        }
      }));
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      rerender( /*#__PURE__*/_jsx(TracePageHeader, {
        trace: trace,
        hideSummary: false,
        hideMap: false,
        viewRange: {
          time: {
            current: [10, 20]
          }
        }
      }));
      expect(screen.queryAllByRole('listitem')).toHaveLength(5);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsInRyYWNlR2VuZXJhdG9yIiwiZ2V0VHJhY2VOYW1lIiwidHJhbnNmb3JtVHJhY2VEYXRhIiwiVHJhY2VQYWdlSGVhZGVyIiwianN4IiwiX2pzeCIsInRyYWNlIiwic2V0dXAiLCJwcm9wT3ZlcnJpZGVzIiwiZGVmYXVsdFByb3BzIiwiX2V4dGVuZHMiLCJjYW5Db2xsYXBzZSIsImhpZGVTdW1tYXJ5Iiwib25TbGltVmlld0NsaWNrZWQiLCJvblRyYWNlR3JhcGhWaWV3Q2xpY2tlZCIsInNsaW1WaWV3IiwiaGlkZU1hcCIsInRpbWVab25lIiwidmlld1JhbmdlIiwidGltZSIsImN1cnJlbnQiLCJ1cGRhdGVOZXh0Vmlld1JhbmdlVGltZSIsInVwZGF0ZVZpZXdSYW5nZVRpbWUiLCJkZXNjcmliZSIsIml0IiwiZXhwZWN0IiwiZ2V0QnlSb2xlIiwidG9CZUluVGhlRG9jdW1lbnQiLCJxdWVyeUJ5Um9sZSIsIm5vdCIsInF1ZXJ5QWxsQnlSb2xlIiwidG9IYXZlTGVuZ3RoIiwicXVlcnlCeVRleHQiLCJuYW1lIiwiY29udGVudCIsInJlcGxhY2UiLCJzdGFydHNXaXRoIiwic3BhbnMiLCJfaGVhZGVySXRlbXMkMCR0ZXh0Q28iLCJfaGVhZGVySXRlbXMkMSR0ZXh0Q28iLCJfaGVhZGVySXRlbXMkMiR0ZXh0Q28iLCJfaGVhZGVySXRlbXMkMyR0ZXh0Q28iLCJfaGVhZGVySXRlbXMkNCR0ZXh0Q28iLCJoZWFkZXJJdGVtcyIsInRleHRDb250ZW50IiwibWF0Y2giLCJ0b0JlVHJ1dGh5IiwiZ2V0QnlUZXh0IiwiX3NldHVwIiwicmVyZW5kZXIiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvVHJhY2VQYWdlSGVhZGVyL1RyYWNlUGFnZUhlYWRlci50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVyLCBzY3JlZW4gfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0cmFjZUdlbmVyYXRvciBmcm9tICcuLi9kZW1vL3RyYWNlLWdlbmVyYXRvcnMnO1xuaW1wb3J0IHsgZ2V0VHJhY2VOYW1lIH0gZnJvbSAnLi4vbW9kZWwvdHJhY2Utdmlld2VyJztcbmltcG9ydCB0cmFuc2Zvcm1UcmFjZURhdGEgZnJvbSAnLi4vbW9kZWwvdHJhbnNmb3JtLXRyYWNlLWRhdGEnO1xuXG5pbXBvcnQgVHJhY2VQYWdlSGVhZGVyLCB7IFRyYWNlUGFnZUhlYWRlckVtYmVkUHJvcHMgfSBmcm9tICcuL1RyYWNlUGFnZUhlYWRlcic7XG5cbmNvbnN0IHRyYWNlID0gdHJhbnNmb3JtVHJhY2VEYXRhKHRyYWNlR2VuZXJhdG9yLnRyYWNlKHt9KSk7XG5jb25zdCBzZXR1cCA9IChwcm9wT3ZlcnJpZGVzPzogVHJhY2VQYWdlSGVhZGVyRW1iZWRQcm9wcykgPT4ge1xuICBjb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2FuQ29sbGFwc2U6IGZhbHNlLFxuICAgIGhpZGVTdW1tYXJ5OiBmYWxzZSxcbiAgICBvblNsaW1WaWV3Q2xpY2tlZDogKCkgPT4ge30sXG4gICAgb25UcmFjZUdyYXBoVmlld0NsaWNrZWQ6ICgpID0+IHt9LFxuICAgIHNsaW1WaWV3OiBmYWxzZSxcbiAgICB0cmFjZSxcbiAgICBoaWRlTWFwOiBmYWxzZSxcbiAgICB0aW1lWm9uZTogJycsXG4gICAgdmlld1JhbmdlOiB7IHRpbWU6IHsgY3VycmVudDogWzEwLCAyMF0gYXMgW251bWJlciwgbnVtYmVyXSB9IH0sXG4gICAgdXBkYXRlTmV4dFZpZXdSYW5nZVRpbWU6ICgpID0+IHt9LFxuICAgIHVwZGF0ZVZpZXdSYW5nZVRpbWU6ICgpID0+IHt9LFxuICAgIC4uLnByb3BPdmVycmlkZXMsXG4gIH07XG5cbiAgcmV0dXJuIHJlbmRlcig8VHJhY2VQYWdlSGVhZGVyIHsuLi5kZWZhdWx0UHJvcHN9IC8+KTtcbn07XG5cbmRlc2NyaWJlKCdUcmFjZVBhZ2VIZWFkZXIgdGVzdCcsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCByZW5kZXIgYSBoZWFkZXIgJywgKCkgPT4ge1xuICAgIHNldHVwKCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVJvbGUoJ2Jhbm5lcicpKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJlbmRlciBub3RoaW5nIGlmIGEgdHJhY2UgaXMgbm90IHByZXNlbnQnLCAoKSA9PiB7XG4gICAgc2V0dXAoeyB0cmFjZTogbnVsbCB9IGFzIFRyYWNlUGFnZUhlYWRlckVtYmVkUHJvcHMpO1xuICAgIGV4cGVjdChzY3JlZW4ucXVlcnlCeVJvbGUoJ2Jhbm5lcicpKS5ub3QudG9CZUluVGhlRG9jdW1lbnQoKTtcbiAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QWxsQnlSb2xlKCdsaXN0aXRlbScpKS50b0hhdmVMZW5ndGgoMCk7XG4gICAgZXhwZWN0KHNjcmVlbi5xdWVyeUJ5VGV4dCgvUmVzZXQgU2VsZWN0aW9uLykpLm5vdC50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJlbmRlciB0aGUgdHJhY2UgdGl0bGUnLCAoKSA9PiB7XG4gICAgc2V0dXAoKTtcbiAgICBleHBlY3QoXG4gICAgICBzY3JlZW4uZ2V0QnlSb2xlKCdoZWFkaW5nJywge1xuICAgICAgICBuYW1lOiAoY29udGVudCkgPT4gY29udGVudC5yZXBsYWNlKC8gL2csICcnKS5zdGFydHNXaXRoKGdldFRyYWNlTmFtZSh0cmFjZSEuc3BhbnMpLnJlcGxhY2UoLyAvZywgJycpKSxcbiAgICAgIH0pXG4gICAgKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJlbmRlciB0aGUgaGVhZGVyIGl0ZW1zJywgKCkgPT4ge1xuICAgIHNldHVwKCk7XG5cbiAgICBjb25zdCBoZWFkZXJJdGVtcyA9IHNjcmVlbi5xdWVyeUFsbEJ5Um9sZSgnbGlzdGl0ZW0nKTtcblxuICAgIGV4cGVjdChoZWFkZXJJdGVtcykudG9IYXZlTGVuZ3RoKDUpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZZWFyLW1vbnRoLWRheSBob3VyLW1pbnV0ZS1zZWNvbmRcbiAgICBleHBlY3QoaGVhZGVySXRlbXNbMF0udGV4dENvbnRlbnQ/Lm1hdGNoKC9UcmFjZSBTdGFydDpcXGR7NH0tXFxkezJ9LVxcZHsyfVxcc1xcZHsyfTpcXGR7Mn06XFxkezJ9XFwuXFxkezN9L2cpKS50b0JlVHJ1dGh5KCk7XG4gICAgZXhwZWN0KGhlYWRlckl0ZW1zWzFdLnRleHRDb250ZW50Py5tYXRjaCgvRHVyYXRpb246W1xcZHxcXC5dW1xcLnxcXGR8c11bXFwufFxcZHxzXT9bXFxkXT8vKSkudG9CZVRydXRoeSgpO1xuICAgIGV4cGVjdChoZWFkZXJJdGVtc1syXS50ZXh0Q29udGVudD8ubWF0Y2goL1NlcnZpY2VzOlxcZFxcZD8vZykpLnRvQmVUcnV0aHkoKTtcbiAgICBleHBlY3QoaGVhZGVySXRlbXNbM10udGV4dENvbnRlbnQ/Lm1hdGNoKC9EZXB0aDpcXGRcXGQ/LykpLnRvQmVUcnV0aHkoKTtcbiAgICBleHBlY3QoaGVhZGVySXRlbXNbNF0udGV4dENvbnRlbnQ/Lm1hdGNoKC9Ub3RhbCBTcGFuczpcXGRcXGQ/XFxkP1xcZD8vKSkudG9CZVRydXRoeSgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJlbmRlciBhIDxTcGFuR3JhcGg+JywgKCkgPT4ge1xuICAgIHNldHVwKCk7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRCeVRleHQoL1Jlc2V0IFNlbGVjdGlvbi8pKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnb2JzZXJ2ZXMgdGhlIHZpc2liaWxpdHkgdG9nZ2xlcyBmb3IgdmFyaW91cyBVWCBlbGVtZW50cycsICgpID0+IHtcbiAgICBpdCgnaGlkZXMgdGhlIG1pbmltYXAgd2hlbiBoaWRlTWFwID09PSB0cnVlJywgKCkgPT4ge1xuICAgICAgc2V0dXAoeyBoaWRlTWFwOiB0cnVlIH0gYXMgVHJhY2VQYWdlSGVhZGVyRW1iZWRQcm9wcyk7XG4gICAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QnlUZXh0KC9SZXNldCBTZWxlY3Rpb24vKSkubm90LnRvQmVJblRoZURvY3VtZW50KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGlkZXMgdGhlIHN1bW1hcnkgd2hlbiBoaWRlU3VtbWFyeSA9PT0gdHJ1ZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcmVyZW5kZXIgfSA9IHNldHVwKHsgaGlkZVN1bW1hcnk6IGZhbHNlIH0gYXMgVHJhY2VQYWdlSGVhZGVyRW1iZWRQcm9wcyk7XG4gICAgICBleHBlY3Qoc2NyZWVuLnF1ZXJ5QWxsQnlSb2xlKCdsaXN0aXRlbScpKS50b0hhdmVMZW5ndGgoNSk7XG5cbiAgICAgIHJlcmVuZGVyKDxUcmFjZVBhZ2VIZWFkZXIgey4uLih7IGhpZGVTdW1tYXJ5OiBmYWxzZSwgdHJhY2U6IG51bGwgfSBhcyBUcmFjZVBhZ2VIZWFkZXJFbWJlZFByb3BzKX0gLz4pO1xuICAgICAgZXhwZWN0KHNjcmVlbi5xdWVyeUFsbEJ5Um9sZSgnbGlzdGl0ZW0nKSkudG9IYXZlTGVuZ3RoKDApO1xuXG4gICAgICByZXJlbmRlcihcbiAgICAgICAgPFRyYWNlUGFnZUhlYWRlclxuICAgICAgICAgIHsuLi4oe1xuICAgICAgICAgICAgdHJhY2U6IHRyYWNlLFxuICAgICAgICAgICAgaGlkZVN1bW1hcnk6IHRydWUsXG4gICAgICAgICAgICBoaWRlTWFwOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdSYW5nZTogeyB0aW1lOiB7IGN1cnJlbnQ6IFsxMCwgMjBdIH0gfSxcbiAgICAgICAgICB9IGFzIFRyYWNlUGFnZUhlYWRlckVtYmVkUHJvcHMpfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgIGV4cGVjdChzY3JlZW4ucXVlcnlBbGxCeVJvbGUoJ2xpc3RpdGVtJykpLnRvSGF2ZUxlbmd0aCgwKTtcblxuICAgICAgcmVyZW5kZXIoXG4gICAgICAgIDxUcmFjZVBhZ2VIZWFkZXJcbiAgICAgICAgICB7Li4uKHtcbiAgICAgICAgICAgIHRyYWNlOiB0cmFjZSxcbiAgICAgICAgICAgIGhpZGVTdW1tYXJ5OiBmYWxzZSxcbiAgICAgICAgICAgIGhpZGVNYXA6IGZhbHNlLFxuICAgICAgICAgICAgdmlld1JhbmdlOiB7IHRpbWU6IHsgY3VycmVudDogWzEwLCAyMF0gfSB9LFxuICAgICAgICAgIH0gYXMgVHJhY2VQYWdlSGVhZGVyRW1iZWRQcm9wcyl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgICAgZXhwZWN0KHNjcmVlbi5xdWVyeUFsbEJ5Um9s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