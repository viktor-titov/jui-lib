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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWFjdCIsIkRpdmlkZXJEZW1vIiwiUmVnaW9uRGVtbyIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJEcmFnZ2FibGVNYW5hZ2VyRGVtbyIsIl9SZWFjdCRQdXJlQ29tcG9uZW50IiwicHJvcHMiLCJfdGhpcyIsImNhbGwiLCJfdXBkYXRlU3RhdGUiLCJuZXh0U3RhdGUiLCJzZXRTdGF0ZSIsInN0YXRlIiwiZGl2aWRlclBvc2l0aW9uIiwicmVnaW9uQ3Vyc29yIiwicmVnaW9uRHJhZ2dpbmciLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsInJlbmRlciIsIl90aGlzJHN0YXRlIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJ0b0ZpeGVkIiwicG9zaXRpb24iLCJ1cGRhdGVTdGF0ZSIsIm1hcCIsIm4iLCJqb2luIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3V0aWxzL0RyYWdnYWJsZU1hbmFnZXIvZGVtby9EcmFnZ2FibGVNYW5hZ2VyRGVtby50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IFROaWwgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XG5cbmltcG9ydCBEaXZpZGVyRGVtbyBmcm9tICcuL0RpdmlkZXJEZW1vJztcbmltcG9ydCBSZWdpb25EZW1vIGZyb20gJy4vUmVnaW9uRGVtbyc7XG5cbmltcG9ydCAnLi9EcmFnZ2FibGVNYW5hZ2VyRGVtby5jc3MnO1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVNYW5hZ2VyRGVtb1N0YXRlID0ge1xuICBkaXZpZGVyUG9zaXRpb246IG51bWJlcjtcbiAgcmVnaW9uQ3Vyc29yOiBudW1iZXIgfCBUTmlsO1xuICByZWdpb25EcmFnZ2luZzogW251bWJlciwgbnVtYmVyXSB8IFROaWw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGVNYW5hZ2VyRGVtbyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8e30sIERyYWdnYWJsZU1hbmFnZXJEZW1vU3RhdGU+IHtcbiAgc3RhdGU6IERyYWdnYWJsZU1hbmFnZXJEZW1vU3RhdGU7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IHt9KSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkaXZpZGVyUG9zaXRpb246IDAuMjUsXG4gICAgICByZWdpb25DdXJzb3I6IG51bGwsXG4gICAgICByZWdpb25EcmFnZ2luZzogbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgX3VwZGF0ZVN0YXRlID0gKG5leHRTdGF0ZToge30pID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKG5leHRTdGF0ZSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZGl2aWRlclBvc2l0aW9uLCByZWdpb25DdXJzb3IsIHJlZ2lvbkRyYWdnaW5nIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRyYWdnYWJsZU1hbmFnZXJEZW1vXCI+XG4gICAgICAgIDxoMT5EcmFnZ2FibGVNYW5hZ2VyIGRlbW88L2gxPlxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJEcmFnZ2FibGVNYW5hZ2VyRGVtby0tc2NlbmFyaW9cIj5cbiAgICAgICAgICA8aDI+RHJhZ2dpbmcgYSBEaXZpZGVyPC9oMj5cbiAgICAgICAgICA8cD5DbGljayBhbmQgZHJhZyB0aGUgZ3JheSBkaXZpZGVyIGluIHRoZSBjb2xvcmVkIGFyZWEsIGJlbG93LjwvcD5cbiAgICAgICAgICA8cD5WYWx1ZToge2RpdmlkZXJQb3NpdGlvbi50b0ZpeGVkKDMpfTwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRyYWdnYWJsZU1hbmFnZXJEZW1vLS1yZWFsbVwiPlxuICAgICAgICAgICAgPERpdmlkZXJEZW1vIHBvc2l0aW9uPXtkaXZpZGVyUG9zaXRpb259IHVwZGF0ZVN0YXRlPXt0aGlzLl91cGRhdGVTdGF0ZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJEcmFnZ2FibGVNYW5hZ2VyRGVtby0tc2NlbmFyaW9cIj5cbiAgICAgICAgICA8aDI+RHJhZ2dpbmcgYSBTdWItUmVnaW9uPC9oMj5cbiAgICAgICAgICA8cD5DbGljayBhbmQgZHJhZyBob3Jpem9udGFsbHkgc29tZXdoZXJlIGluIHRoZSBjb2xvcmVkIGFyZWEsIGJlbG93LjwvcD5cbiAgICAgICAgICA8cD5WYWx1ZToge3JlZ2lvbkRyYWdnaW5nICYmIHJlZ2lvbkRyYWdnaW5nLm1hcCgobikgPT4gbi50b0ZpeGVkKDMpKS5qb2luKCcsICcpfTwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRyYWdnYWJsZU1hbmFnZXJEZW1vLS1yZWFsbVwiPlxuICAgICAgICAgICAgPFJlZ2lvbkRlbW8gcmVnaW9uQ3Vyc29yPXtyZWdpb25DdXJzb3J9IHJlZ2lvbkRyYWdnaW5nPXtyZWdpb25EcmFnZ2luZ30gdXBkYXRlU3RhdGU9e3RoaXMuX3VwZGF0ZVN0YXRlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFLLE1BQU0sT0FBTztBQUl6QixPQUFPQyxXQUFXLE1BQU0sZUFBZTtBQUN2QyxPQUFPQyxVQUFVLE1BQU0sY0FBYztBQUVyQyxPQUFPLDRCQUE0QjtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQSxFQUFBQyxJQUFBLElBQUFDLEtBQUE7QUFBQSxJQVFmQyxvQkFBb0IsMEJBQUFDLG9CQUFBO0VBR3ZDLFNBQUFELHFCQUFZRSxLQUFTLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ3JCQSxLQUFBLEdBQUFGLG9CQUFBLENBQUFHLElBQUEsT0FBTUYsS0FBSyxDQUFDO0lBQUNDLEtBQUEsQ0FRZkUsWUFBWSxHQUFHLFVBQUNDLFNBQWEsRUFBSztNQUNoQ0gsS0FBQSxDQUFLSSxRQUFRLENBQUNELFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBVENILEtBQUEsQ0FBS0ssS0FBSyxHQUFHO01BQ1hDLGVBQWUsRUFBRSxJQUFJO01BQ3JCQyxZQUFZLEVBQUUsSUFBSTtNQUNsQkMsY0FBYyxFQUFFO0lBQ2xCLENBQUM7SUFBQyxPQUFBUixLQUFBO0VBQ0o7RUFBQ1MsY0FBQSxDQUFBWixvQkFBQSxFQUFBQyxvQkFBQTtFQUFBLElBQUFZLE1BQUEsR0FBQWIsb0JBQUEsQ0FBQWMsU0FBQTtFQUFBRCxNQUFBLENBTURFLE1BQU0sR0FBTixTQUFBQSxPQUFBLEVBQVM7SUFDUCxJQUFBQyxXQUFBLEdBQTBELElBQUksQ0FBQ1IsS0FBSztNQUE1REMsZUFBZSxHQUFBTyxXQUFBLENBQWZQLGVBQWU7TUFBRUMsWUFBWSxHQUFBTSxXQUFBLENBQVpOLFlBQVk7TUFBRUMsY0FBYyxHQUFBSyxXQUFBLENBQWRMLGNBQWM7SUFDckQsb0JBQ0VaLEtBQUE7TUFBS2tCLFNBQVMsRUFBQyxzQkFBc0I7TUFBQUMsUUFBQSxnQkFDbkNyQixJQUFBO1FBQUFxQixRQUFBLEVBQUk7TUFBcUIsQ0FBSSxDQUFDLGVBQzlCbkIsS0FBQTtRQUFTa0IsU0FBUyxFQUFDLGdDQUFnQztRQUFBQyxRQUFBLGdCQUNqRHJCLElBQUE7VUFBQXFCLFFBQUEsRUFBSTtRQUFrQixDQUFJLENBQUMsZUFDM0JyQixJQUFBO1VBQUFxQixRQUFBLEVBQUc7UUFBMkQsQ0FBRyxDQUFDLGVBQ2xFbkIsS0FBQTtVQUFBbUIsUUFBQSxHQUFHLFNBQU8sRUFBQ1QsZUFBZSxDQUFDVSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBSSxDQUFDLGVBQzFDdEIsSUFBQTtVQUFLb0IsU0FBUyxFQUFDLDZCQUE2QjtVQUFBQyxRQUFBLGVBQzFDckIsSUFBQSxDQUFDSCxXQUFXO1lBQUMwQixRQUFRLEVBQUVYLGVBQWdCO1lBQUNZLFdBQVcsRUFBRSxJQUFJLENBQUNoQjtVQUFhLENBQUU7UUFBQyxDQUN2RSxDQUFDO01BQUEsQ0FDQyxDQUFDLGVBQ1ZOLEtBQUE7UUFBU2tCLFNBQVMsRUFBQyxnQ0FBZ0M7UUFBQUMsUUFBQSxnQkFDakRyQixJQUFBO1VBQUFxQixRQUFBLEVBQUk7UUFBcUIsQ0FBSSxDQUFDLGVBQzlCckIsSUFBQTtVQUFBcUIsUUFBQSxFQUFHO1FBQWlFLENBQUcsQ0FBQyxlQUN4RW5CLEtBQUE7VUFBQW1CLFFBQUEsR0FBRyxTQUFPLEVBQUNQLGNBQWMsSUFBSUEsY0FBYyxDQUFDVyxHQUFHLENBQUMsVUFBQ0MsQ0FBQztZQUFBLE9BQUtBLENBQUMsQ0FBQ0osT0FBTyxDQUFDLENBQUMsQ0FBQztVQUFBLEVBQUMsQ0FBQ0ssSUFBSSxDQUFDLElBQUksQ0FBQztRQUFBLENBQUksQ0FBQyxlQUNwRjNCLElBQUE7VUFBS29CLFNBQVMsRUFBQyw2QkFBNkI7VUFBQUMsUUFBQSxlQUMxQ3JCLElBQUEsQ0FBQ0YsVUFBVTtZQUFDZSxZQUFZLEVBQUVBLFlBQWE7WUFBQ0MsY0FBYyxFQUFFQSxjQUFlO1lBQUNVLFdBQVcsRUFBRSxJQUFJLENBQUNoQjtVQUFhLENBQUU7UUFBQyxDQUN2RyxDQUFDO01BQUEsQ0FDQyxDQUFDO0lBQUEsQ0FDUCxDQUFDO0VBRVYsQ0FBQztFQUFBLE9BQUFMLG9CQUFBO0FBQUEsRUF2QytDUCxLQUFLLENBQUNnQyxhQUFhO0FBQUEsU0FBaER6QixvQkFBb0IsSUFBQTBCLE9BQUEiLCJpZ25vcmVMaXN0IjpbXX0=