import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
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

import React from 'react';
import DividerDemo from './DividerDemo';
import RegionDemo from './RegionDemo';
import './DraggableManagerDemo.css';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var DraggableManagerDemo = /*#__PURE__*/function (_React$PureComponent) {
  function DraggableManagerDemo(props) {
    var _this;
    _this = _React$PureComponent.call(this, props) || this;
    _this._updateState = function (nextState) {
      _this.setState(nextState);
    };
    _this.state = {
      dividerPosition: 0.25,
      regionCursor: null,
      regionDragging: null
    };
    return _this;
  }
  _inheritsLoose(DraggableManagerDemo, _React$PureComponent);
  var _proto = DraggableManagerDemo.prototype;
  _proto.render = function render() {
    var _this$state = this.state,
      dividerPosition = _this$state.dividerPosition,
      regionCursor = _this$state.regionCursor,
      regionDragging = _this$state.regionDragging;
    return /*#__PURE__*/_jsxs("div", {
      className: "DraggableManagerDemo",
      children: [/*#__PURE__*/_jsx("h1", {
        children: "DraggableManager demo"
      }), /*#__PURE__*/_jsxs("section", {
        className: "DraggableManagerDemo--scenario",
        children: [/*#__PURE__*/_jsx("h2", {
          children: "Dragging a Divider"
        }), /*#__PURE__*/_jsx("p", {
          children: "Click and drag the gray divider in the colored area, below."
        }), /*#__PURE__*/_jsxs("p", {
          children: ["Value: ", dividerPosition.toFixed(3)]
        }), /*#__PURE__*/_jsx("div", {
          className: "DraggableManagerDemo--realm",
          children: /*#__PURE__*/_jsx(DividerDemo, {
            position: dividerPosition,
            updateState: this._updateState
          })
        })]
      }), /*#__PURE__*/_jsxs("section", {
        className: "DraggableManagerDemo--scenario",
        children: [/*#__PURE__*/_jsx("h2", {
          children: "Dragging a Sub-Region"
        }), /*#__PURE__*/_jsx("p", {
          children: "Click and drag horizontally somewhere in the colored area, below."
        }), /*#__PURE__*/_jsxs("p", {
          children: ["Value: ", regionDragging && regionDragging.map(function (n) {
            return n.toFixed(3);
          }).join(', ')]
        }), /*#__PURE__*/_jsx("div", {
          className: "DraggableManagerDemo--realm",
          children: /*#__PURE__*/_jsx(RegionDemo, {
            regionCursor: regionCursor,
            regionDragging: regionDragging,
            updateState: this._updateState
          })
        })]
      })]
    });
  };
  return DraggableManagerDemo;
}(React.PureComponent);
export { DraggableManagerDemo as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWFjdCIsIkRpdmlkZXJEZW1vIiwiUmVnaW9uRGVtbyIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJEcmFnZ2FibGVNYW5hZ2VyRGVtbyIsIl9SZWFjdCRQdXJlQ29tcG9uZW50IiwicHJvcHMiLCJfdGhpcyIsImNhbGwiLCJfdXBkYXRlU3RhdGUiLCJuZXh0U3RhdGUiLCJzZXRTdGF0ZSIsInN0YXRlIiwiZGl2aWRlclBvc2l0aW9uIiwicmVnaW9uQ3Vyc29yIiwicmVnaW9uRHJhZ2dpbmciLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsInJlbmRlciIsIl90aGlzJHN0YXRlIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJ0b0ZpeGVkIiwicG9zaXRpb24iLCJ1cGRhdGVTdGF0ZSIsIm1hcCIsIm4iLCJqb2luIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvRHJhZ2dhYmxlTWFuYWdlci9kZW1vL0RyYWdnYWJsZU1hbmFnZXJEZW1vLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgVE5pbCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuaW1wb3J0IERpdmlkZXJEZW1vIGZyb20gJy4vRGl2aWRlckRlbW8nO1xuaW1wb3J0IFJlZ2lvbkRlbW8gZnJvbSAnLi9SZWdpb25EZW1vJztcblxuaW1wb3J0ICcuL0RyYWdnYWJsZU1hbmFnZXJEZW1vLmNzcyc7XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZU1hbmFnZXJEZW1vU3RhdGUgPSB7XG4gIGRpdmlkZXJQb3NpdGlvbjogbnVtYmVyO1xuICByZWdpb25DdXJzb3I6IG51bWJlciB8IFROaWw7XG4gIHJlZ2lvbkRyYWdnaW5nOiBbbnVtYmVyLCBudW1iZXJdIHwgVE5pbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZU1hbmFnZXJEZW1vIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDx7fSwgRHJhZ2dhYmxlTWFuYWdlckRlbW9TdGF0ZT4ge1xuICBzdGF0ZTogRHJhZ2dhYmxlTWFuYWdlckRlbW9TdGF0ZTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczoge30pIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRpdmlkZXJQb3NpdGlvbjogMC4yNSxcbiAgICAgIHJlZ2lvbkN1cnNvcjogbnVsbCxcbiAgICAgIHJlZ2lvbkRyYWdnaW5nOiBudWxsLFxuICAgIH07XG4gIH1cblxuICBfdXBkYXRlU3RhdGUgPSAobmV4dFN0YXRlOiB7fSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaXZpZGVyUG9zaXRpb24sIHJlZ2lvbkN1cnNvciwgcmVnaW9uRHJhZ2dpbmcgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRHJhZ2dhYmxlTWFuYWdlckRlbW9cIj5cbiAgICAgICAgPGgxPkRyYWdnYWJsZU1hbmFnZXIgZGVtbzwvaDE+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIkRyYWdnYWJsZU1hbmFnZXJEZW1vLS1zY2VuYXJpb1wiPlxuICAgICAgICAgIDxoMj5EcmFnZ2luZyBhIERpdmlkZXI8L2gyPlxuICAgICAgICAgIDxwPkNsaWNrIGFuZCBkcmFnIHRoZSBncmF5IGRpdmlkZXIgaW4gdGhlIGNvbG9yZWQgYXJlYSwgYmVsb3cuPC9wPlxuICAgICAgICAgIDxwPlZhbHVlOiB7ZGl2aWRlclBvc2l0aW9uLnRvRml4ZWQoMyl9PC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRHJhZ2dhYmxlTWFuYWdlckRlbW8tLXJlYWxtXCI+XG4gICAgICAgICAgICA8RGl2aWRlckRlbW8gcG9zaXRpb249e2RpdmlkZXJQb3NpdGlvbn0gdXBkYXRlU3RhdGU9e3RoaXMuX3VwZGF0ZVN0YXRlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIkRyYWdnYWJsZU1hbmFnZXJEZW1vLS1zY2VuYXJpb1wiPlxuICAgICAgICAgIDxoMj5EcmFnZ2luZyBhIFN1Yi1SZWdpb248L2gyPlxuICAgICAgICAgIDxwPkNsaWNrIGFuZCBkcmFnIGhvcml6b250YWxseSBzb21ld2hlcmUgaW4gdGhlIGNvbG9yZWQgYXJlYSwgYmVsb3cuPC9wPlxuICAgICAgICAgIDxwPlZhbHVlOiB7cmVnaW9uRHJhZ2dpbmcgJiYgcmVnaW9uRHJhZ2dpbmcubWFwKChuKSA9PiBuLnRvRml4ZWQoMykpLmpvaW4oJywgJyl9PC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRHJhZ2dhYmxlTWFuYWdlckRlbW8tLXJlYWxtXCI+XG4gICAgICAgICAgICA8UmVnaW9uRGVtbyByZWdpb25DdXJzb3I9e3JlZ2lvbkN1cnNvcn0gcmVnaW9uRHJhZ2dpbmc9e3JlZ2lvbkRyYWdnaW5nfSB1cGRhdGVTdGF0ZT17dGhpcy5fdXBkYXRlU3RhdGV9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQUssTUFBTSxPQUFPO0FBSXpCLE9BQU9DLFdBQVcsTUFBTSxlQUFlO0FBQ3ZDLE9BQU9DLFVBQVUsTUFBTSxjQUFjO0FBRXJDLE9BQU8sNEJBQTRCO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBLEVBQUFDLElBQUEsSUFBQUMsS0FBQTtBQUFBLElBUWZDLG9CQUFvQiwwQkFBQUMsb0JBQUE7RUFHdkMsU0FBQUQscUJBQVlFLEtBQVMsRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDckJBLEtBQUEsR0FBQUYsb0JBQUEsQ0FBQUcsSUFBQSxPQUFNRixLQUFLLENBQUM7SUFBQ0MsS0FBQSxDQVFmRSxZQUFZLEdBQUcsVUFBQ0MsU0FBYSxFQUFLO01BQ2hDSCxLQUFBLENBQUtJLFFBQVEsQ0FBQ0QsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFUQ0gsS0FBQSxDQUFLSyxLQUFLLEdBQUc7TUFDWEMsZUFBZSxFQUFFLElBQUk7TUFDckJDLFlBQVksRUFBRSxJQUFJO01BQ2xCQyxjQUFjLEVBQUU7SUFDbEIsQ0FBQztJQUFDLE9BQUFSLEtBQUE7RUFDSjtFQUFDUyxjQUFBLENBQUFaLG9CQUFBLEVBQUFDLG9CQUFBO0VBQUEsSUFBQVksTUFBQSxHQUFBYixvQkFBQSxDQUFBYyxTQUFBO0VBQUFELE1BQUEsQ0FNREUsTUFBTSxHQUFOLFNBQUFBLE9BQUEsRUFBUztJQUNQLElBQUFDLFdBQUEsR0FBMEQsSUFBSSxDQUFDUixLQUFLO01BQTVEQyxlQUFlLEdBQUFPLFdBQUEsQ0FBZlAsZUFBZTtNQUFFQyxZQUFZLEdBQUFNLFdBQUEsQ0FBWk4sWUFBWTtNQUFFQyxjQUFjLEdBQUFLLFdBQUEsQ0FBZEwsY0FBYztJQUNyRCxvQkFDRVosS0FBQTtNQUFLa0IsU0FBUyxFQUFDLHNCQUFzQjtNQUFBQyxRQUFBLGdCQUNuQ3JCLElBQUE7UUFBQXFCLFFBQUEsRUFBSTtNQUFxQixDQUFJLENBQUMsZUFDOUJuQixLQUFBO1FBQVNrQixTQUFTLEVBQUMsZ0NBQWdDO1FBQUFDLFFBQUEsZ0JBQ2pEckIsSUFBQTtVQUFBcUIsUUFBQSxFQUFJO1FBQWtCLENBQUksQ0FBQyxlQUMzQnJCLElBQUE7VUFBQXFCLFFBQUEsRUFBRztRQUEyRCxDQUFHLENBQUMsZUFDbEVuQixLQUFBO1VBQUFtQixRQUFBLEdBQUcsU0FBTyxFQUFDVCxlQUFlLENBQUNVLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFJLENBQUMsZUFDMUN0QixJQUFBO1VBQUtvQixTQUFTLEVBQUMsNkJBQTZCO1VBQUFDLFFBQUEsZUFDMUNyQixJQUFBLENBQUNILFdBQVc7WUFBQzBCLFFBQVEsRUFBRVgsZUFBZ0I7WUFBQ1ksV0FBVyxFQUFFLElBQUksQ0FBQ2hCO1VBQWEsQ0FBRTtRQUFDLENBQ3ZFLENBQUM7TUFBQSxDQUNDLENBQUMsZUFDVk4sS0FBQTtRQUFTa0IsU0FBUyxFQUFDLGdDQUFnQztRQUFBQyxRQUFBLGdCQUNqRHJCLElBQUE7VUFBQXFCLFFBQUEsRUFBSTtRQUFxQixDQUFJLENBQUMsZUFDOUJyQixJQUFBO1VBQUFxQixRQUFBLEVBQUc7UUFBaUUsQ0FBRyxDQUFDLGVBQ3hFbkIsS0FBQTtVQUFBbUIsUUFBQSxHQUFHLFNBQU8sRUFBQ1AsY0FBYyxJQUFJQSxjQUFjLENBQUNXLEdBQUcsQ0FBQyxVQUFDQyxDQUFDO1lBQUEsT0FBS0EsQ0FBQyxDQUFDSixPQUFPLENBQUMsQ0FBQyxDQUFDO1VBQUEsRUFBQyxDQUFDSyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQUEsQ0FBSSxDQUFDLGVBQ3BGM0IsSUFBQTtVQUFLb0IsU0FBUyxFQUFDLDZCQUE2QjtVQUFBQyxRQUFBLGVBQzFDckIsSUFBQSxDQUFDRixVQUFVO1lBQUNlLFlBQVksRUFBRUEsWUFBYTtZQUFDQyxjQUFjLEVBQUVBLGNBQWU7WUFBQ1UsV0FBVyxFQUFFLElBQUksQ0FBQ2hCO1VBQWEsQ0FBRTtRQUFDLENBQ3ZHLENBQUM7TUFBQSxDQUNDLENBQUM7SUFBQSxDQUNQLENBQUM7RUFFVixDQUFDO0VBQUEsT0FBQUwsb0JBQUE7QUFBQSxFQXZDK0NQLEtBQUssQ0FBQ2dDLGFBQWE7QUFBQSxTQUFoRHpCLG9CQUFvQixJQUFBMEIsT0FBQSIsImlnbm9yZUxpc3QiOltdfQ==