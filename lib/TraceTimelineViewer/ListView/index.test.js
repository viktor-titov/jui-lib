import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["children"];
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
import ListView from './index';
import { jsx as _jsx } from "react/jsx-runtime";
var DATA_LENGTH = 10;
function getHeight(index) {
  return index * 2 + 2;
}
function Item(props) {
  var children = props.children,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/_jsx("div", _extends({}, rest, {
    children: children
  }));
}
var renderItem = function renderItem(itemKey, styles, itemIndex, attrs) {
  return /*#__PURE__*/_jsx(Item, _extends({
    style: styles
  }, attrs, {
    "data-testid": "item",
    children: itemIndex
  }), itemKey);
};
var props = {
  dataLength: DATA_LENGTH,
  getIndexFromKey: Number,
  getKeyFromIndex: String,
  initialDraw: 5,
  itemHeightGetter: getHeight,
  itemRenderer: renderItem,
  itemsWrapperClassName: 'SomeClassName',
  viewBuffer: 10,
  viewBufferMin: 5,
  windowScroller: true
};
describe('<ListView />', function () {
  beforeEach(function () {
    render( /*#__PURE__*/_jsx(ListView, _extends({}, props)));
  });
  it('renders without exploding', function () {
    expect(screen.getByTestId('ListView')).toBeInTheDocument();
  });
  it('renders the correct number of items', function () {
    expect(screen.getAllByTestId('item').length).toBe(DATA_LENGTH);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW5kZXIiLCJzY3JlZW4iLCJSZWFjdCIsIkxpc3RWaWV3IiwianN4IiwiX2pzeCIsIkRBVEFfTEVOR1RIIiwiZ2V0SGVpZ2h0IiwiaW5kZXgiLCJJdGVtIiwicHJvcHMiLCJjaGlsZHJlbiIsInJlc3QiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsIl9leGNsdWRlZCIsIl9leHRlbmRzIiwicmVuZGVySXRlbSIsIml0ZW1LZXkiLCJzdHlsZXMiLCJpdGVtSW5kZXgiLCJhdHRycyIsInN0eWxlIiwiZGF0YUxlbmd0aCIsImdldEluZGV4RnJvbUtleSIsIk51bWJlciIsImdldEtleUZyb21JbmRleCIsIlN0cmluZyIsImluaXRpYWxEcmF3IiwiaXRlbUhlaWdodEdldHRlciIsIml0ZW1SZW5kZXJlciIsIml0ZW1zV3JhcHBlckNsYXNzTmFtZSIsInZpZXdCdWZmZXIiLCJ2aWV3QnVmZmVyTWluIiwid2luZG93U2Nyb2xsZXIiLCJkZXNjcmliZSIsImJlZm9yZUVhY2giLCJpdCIsImV4cGVjdCIsImdldEJ5VGVzdElkIiwidG9CZUluVGhlRG9jdW1lbnQiLCJnZXRBbGxCeVRlc3RJZCIsImxlbmd0aCIsInRvQmUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9MaXN0Vmlldy9pbmRleC50ZXN0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVyLCBzY3JlZW4gfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBMaXN0VmlldywgeyBUTGlzdFZpZXdQcm9wcyB9IGZyb20gJy4vaW5kZXgnO1xuXG5jb25zdCBEQVRBX0xFTkdUSCA9IDEwO1xuXG5mdW5jdGlvbiBnZXRIZWlnaHQoaW5kZXg6IG51bWJlcikge1xuICByZXR1cm4gaW5kZXggKiAyICsgMjtcbn1cblxuZnVuY3Rpb24gSXRlbShwcm9wczogUmVhY3QuSFRNTFByb3BzPEhUTUxEaXZFbGVtZW50Pikge1xuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5yZXN0IH0gPSBwcm9wcztcbiAgcmV0dXJuIDxkaXYgey4uLnJlc3R9PntjaGlsZHJlbn08L2Rpdj47XG59XG5cbmNvbnN0IHJlbmRlckl0ZW06IFRMaXN0Vmlld1Byb3BzWydpdGVtUmVuZGVyZXInXSA9IChpdGVtS2V5LCBzdHlsZXMsIGl0ZW1JbmRleCwgYXR0cnMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8SXRlbSBrZXk9e2l0ZW1LZXl9IHN0eWxlPXtzdHlsZXN9IHsuLi5hdHRyc30gZGF0YS10ZXN0aWQ9XCJpdGVtXCI+XG4gICAgICB7aXRlbUluZGV4fVxuICAgIDwvSXRlbT5cbiAgKTtcbn07XG5cbmNvbnN0IHByb3BzID0ge1xuICBkYXRhTGVuZ3RoOiBEQVRBX0xFTkdUSCxcbiAgZ2V0SW5kZXhGcm9tS2V5OiBOdW1iZXIsXG4gIGdldEtleUZyb21JbmRleDogU3RyaW5nLFxuICBpbml0aWFsRHJhdzogNSxcbiAgaXRlbUhlaWdodEdldHRlcjogZ2V0SGVpZ2h0LFxuICBpdGVtUmVuZGVyZXI6IHJlbmRlckl0ZW0sXG4gIGl0ZW1zV3JhcHBlckNsYXNzTmFtZTogJ1NvbWVDbGFzc05hbWUnLFxuICB2aWV3QnVmZmVyOiAxMCxcbiAgdmlld0J1ZmZlck1pbjogNSxcbiAgd2luZG93U2Nyb2xsZXI6IHRydWUsXG59O1xuXG5kZXNjcmliZSgnPExpc3RWaWV3IC8+JywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZW5kZXIoPExpc3RWaWV3IHsuLi5wcm9wc30gLz4pO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB3aXRob3V0IGV4cGxvZGluZycsICgpID0+IHtcbiAgICBleHBlY3Qoc2NyZWVuLmdldEJ5VGVzdElkKCdMaXN0VmlldycpKS50b0JlSW5UaGVEb2N1bWVudCgpO1xuICB9KTtcblxuICBpdCgncmVuZGVycyB0aGUgY29ycmVjdCBudW1iZXIgb2YgaXRlbXMnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHNjcmVlbi5nZXRBbGxCeVRlc3RJZCgnaXRlbScpLmxlbmd0aCkudG9CZShEQVRBX0xFTkdUSCk7XG4gIH0pO1xufSk7XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLE1BQU0sRUFBRUMsTUFBTSxRQUFRLHdCQUF3QjtBQUN2RCxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUV6QixPQUFPQyxRQUFRLE1BQTBCLFNBQVM7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUE7QUFFbkQsSUFBTUMsV0FBVyxHQUFHLEVBQUU7QUFFdEIsU0FBU0MsU0FBU0EsQ0FBQ0MsS0FBYSxFQUFFO0VBQ2hDLE9BQU9BLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUN0QjtBQUVBLFNBQVNDLElBQUlBLENBQUNDLEtBQXNDLEVBQUU7RUFDcEQsSUFBUUMsUUFBUSxHQUFjRCxLQUFLLENBQTNCQyxRQUFRO0lBQUtDLElBQUksR0FBQUMsNkJBQUEsQ0FBS0gsS0FBSyxFQUFBSSxTQUFBO0VBQ25DLG9CQUFPVCxJQUFBLFFBQUFVLFFBQUEsS0FBU0gsSUFBSTtJQUFBRCxRQUFBLEVBQUdBO0VBQVEsRUFBTSxDQUFDO0FBQ3hDO0FBRUEsSUFBTUssVUFBMEMsR0FBRyxTQUE3Q0EsVUFBMENBLENBQUlDLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLEtBQUssRUFBSztFQUN4RixvQkFDRWYsSUFBQSxDQUFDSSxJQUFJLEVBQUFNLFFBQUE7SUFBZU0sS0FBSyxFQUFFSDtFQUFPLEdBQUtFLEtBQUs7SUFBRSxlQUFZLE1BQU07SUFBQVQsUUFBQSxFQUM3RFE7RUFBUyxJQURERixPQUVMLENBQUM7QUFFWCxDQUFDO0FBRUQsSUFBTVAsS0FBSyxHQUFHO0VBQ1pZLFVBQVUsRUFBRWhCLFdBQVc7RUFDdkJpQixlQUFlLEVBQUVDLE1BQU07RUFDdkJDLGVBQWUsRUFBRUMsTUFBTTtFQUN2QkMsV0FBVyxFQUFFLENBQUM7RUFDZEMsZ0JBQWdCLEVBQUVyQixTQUFTO0VBQzNCc0IsWUFBWSxFQUFFYixVQUFVO0VBQ3hCYyxxQkFBcUIsRUFBRSxlQUFlO0VBQ3RDQyxVQUFVLEVBQUUsRUFBRTtFQUNkQyxhQUFhLEVBQUUsQ0FBQztFQUNoQkMsY0FBYyxFQUFFO0FBQ2xCLENBQUM7QUFFREMsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFNO0VBQzdCQyxVQUFVLENBQUMsWUFBTTtJQUNmbkMsTUFBTSxlQUFDSyxJQUFBLENBQUNGLFFBQVEsRUFBQVksUUFBQSxLQUFLTCxLQUFLLENBQUcsQ0FBQyxDQUFDO0VBQ2pDLENBQUMsQ0FBQztFQUVGMEIsRUFBRSxDQUFDLDJCQUEyQixFQUFFLFlBQU07SUFDcENDLE1BQU0sQ0FBQ3BDLE1BQU0sQ0FBQ3FDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDQyxpQkFBaUIsQ0FBQyxDQUFDO0VBQzVELENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMscUNBQXFDLEVBQUUsWUFBTTtJQUM5Q0MsTUFBTSxDQUFDcEMsTUFBTSxDQUFDdUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQ0MsSUFBSSxDQUFDcEMsV0FBVyxDQUFDO0VBQ2hFLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==