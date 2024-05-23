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
import DraggableManager from '..';
import './RegionDemo.css';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var RegionDemo = /*#__PURE__*/function (_React$PureComponent) {
  function RegionDemo(props) {
    var _this;
    _this = _React$PureComponent.call(this, props) || this;
    _this._setRealm = function (elm) {
      _this._realmElm = elm;
    };
    _this._getDraggingBounds = function () {
      if (!_this._realmElm) {
        throw new Error('invalid state');
      }
      var _this$_realmElm$getBo = _this._realmElm.getBoundingClientRect(),
        clientXLeft = _this$_realmElm$getBo.left,
        width = _this$_realmElm$getBo.width;
      return {
        clientXLeft: clientXLeft,
        width: width,
        maxValue: 1,
        minValue: 0
      };
    };
    _this._handleMouseMove = function (_ref) {
      var value = _ref.value;
      _this.props.updateState({
        regionCursor: value
      });
    };
    _this._handleMouseLeave = function () {
      _this.props.updateState({
        regionCursor: null
      });
    };
    _this._handleDragUpdate = function (_ref2) {
      var value = _ref2.value;
      var prevRegionDragging = _this.props.regionDragging;
      var regionDragging;
      if (prevRegionDragging) {
        regionDragging = [prevRegionDragging[0], value];
      } else {
        regionDragging = [value, value];
      }
      _this.props.updateState({
        regionDragging: regionDragging
      });
    };
    _this._handleDragEnd = function (_ref3) {
      var value = _ref3.value;
      _this.props.updateState({
        regionDragging: null,
        regionCursor: value
      });
    };
    _this._realmElm = null;
    _this._dragManager = new DraggableManager({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleDragEnd,
      onDragMove: _this._handleDragUpdate,
      onDragStart: _this._handleDragUpdate,
      onMouseMove: _this._handleMouseMove,
      onMouseLeave: _this._handleMouseLeave
    });
    return _this;
  }
  _inheritsLoose(RegionDemo, _React$PureComponent);
  var _proto = RegionDemo.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      regionCursor = _this$props.regionCursor,
      regionDragging = _this$props.regionDragging;
    var cursorElm;
    var regionElm;
    if (regionDragging) {
      var a = regionDragging[0],
        b = regionDragging[1];
      var _ref4 = a < b ? [a, 1 - b] : [b, 1 - a],
        left = _ref4[0],
        right = _ref4[1];
      var regionStyle = {
        left: left * 100 + "%",
        right: right * 100 + "%"
      };
      regionElm = /*#__PURE__*/_jsx("div", {
        className: "RegionDemo--region",
        style: regionStyle
      });
    } else if (regionCursor) {
      var cursorStyle = {
        left: regionCursor * 100 + "%"
      };
      cursorElm = /*#__PURE__*/_jsx("div", {
        className: "RegionDemo--regionCursor",
        style: cursorStyle
      });
    }
    return /*#__PURE__*/_jsxs("div", {
      "aria-hidden": true,
      className: "RegionDemo--realm",
      onMouseDown: this._dragManager.handleMouseDown,
      onMouseMove: this._dragManager.handleMouseMove,
      onMouseLeave: this._dragManager.handleMouseMove,
      ref: this._setRealm,
      children: [regionElm, cursorElm]
    });
  };
  return RegionDemo;
}(React.PureComponent);
export { RegionDemo as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWFjdCIsIkRyYWdnYWJsZU1hbmFnZXIiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiUmVnaW9uRGVtbyIsIl9SZWFjdCRQdXJlQ29tcG9uZW50IiwicHJvcHMiLCJfdGhpcyIsImNhbGwiLCJfc2V0UmVhbG0iLCJlbG0iLCJfcmVhbG1FbG0iLCJfZ2V0RHJhZ2dpbmdCb3VuZHMiLCJFcnJvciIsIl90aGlzJF9yZWFsbUVsbSRnZXRCbyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFhMZWZ0IiwibGVmdCIsIndpZHRoIiwibWF4VmFsdWUiLCJtaW5WYWx1ZSIsIl9oYW5kbGVNb3VzZU1vdmUiLCJfcmVmIiwidmFsdWUiLCJ1cGRhdGVTdGF0ZSIsInJlZ2lvbkN1cnNvciIsIl9oYW5kbGVNb3VzZUxlYXZlIiwiX2hhbmRsZURyYWdVcGRhdGUiLCJfcmVmMiIsInByZXZSZWdpb25EcmFnZ2luZyIsInJlZ2lvbkRyYWdnaW5nIiwiX2hhbmRsZURyYWdFbmQiLCJfcmVmMyIsIl9kcmFnTWFuYWdlciIsImdldEJvdW5kcyIsIm9uRHJhZ0VuZCIsIm9uRHJhZ01vdmUiLCJvbkRyYWdTdGFydCIsIm9uTW91c2VNb3ZlIiwib25Nb3VzZUxlYXZlIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJyZW5kZXIiLCJfdGhpcyRwcm9wcyIsImN1cnNvckVsbSIsInJlZ2lvbkVsbSIsImEiLCJiIiwiX3JlZjQiLCJyaWdodCIsInJlZ2lvblN0eWxlIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJjdXJzb3JTdHlsZSIsIm9uTW91c2VEb3duIiwiaGFuZGxlTW91c2VEb3duIiwiaGFuZGxlTW91c2VNb3ZlIiwicmVmIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9EcmFnZ2FibGVNYW5hZ2VyL2RlbW8vUmVnaW9uRGVtby50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBEcmFnZ2FibGVNYW5hZ2VyLCB7IERyYWdnYWJsZUJvdW5kcywgRHJhZ2dpbmdVcGRhdGUgfSBmcm9tICcuLic7XG5pbXBvcnQgeyBUTmlsIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuXG5pbXBvcnQgJy4vUmVnaW9uRGVtby5jc3MnO1xuXG50eXBlIFRVcGRhdGUgPSB7XG4gIHJlZ2lvbkN1cnNvcj86IG51bWJlciB8IG51bGw7XG4gIHJlZ2lvbkRyYWdnaW5nPzogbnVtYmVyW10gfCBudWxsO1xufTtcblxudHlwZSBSZWdpb25EZW1vUHJvcHMgPSB7XG4gIHJlZ2lvbkN1cnNvcjogbnVtYmVyIHwgVE5pbDtcbiAgcmVnaW9uRHJhZ2dpbmc6IFtudW1iZXIsIG51bWJlcl0gfCBUTmlsO1xuICB1cGRhdGVTdGF0ZTogKHVwZGF0ZTogVFVwZGF0ZSkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lvbkRlbW8gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFJlZ2lvbkRlbW9Qcm9wcz4ge1xuICBfZHJhZ01hbmFnZXI6IERyYWdnYWJsZU1hbmFnZXI7XG5cbiAgX3JlYWxtRWxtOiBIVE1MRWxlbWVudCB8IFROaWw7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFJlZ2lvbkRlbW9Qcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuX3JlYWxtRWxtID0gbnVsbDtcblxuICAgIHRoaXMuX2RyYWdNYW5hZ2VyID0gbmV3IERyYWdnYWJsZU1hbmFnZXIoe1xuICAgICAgZ2V0Qm91bmRzOiB0aGlzLl9nZXREcmFnZ2luZ0JvdW5kcyxcbiAgICAgIG9uRHJhZ0VuZDogdGhpcy5faGFuZGxlRHJhZ0VuZCxcbiAgICAgIG9uRHJhZ01vdmU6IHRoaXMuX2hhbmRsZURyYWdVcGRhdGUsXG4gICAgICBvbkRyYWdTdGFydDogdGhpcy5faGFuZGxlRHJhZ1VwZGF0ZSxcbiAgICAgIG9uTW91c2VNb3ZlOiB0aGlzLl9oYW5kbGVNb3VzZU1vdmUsXG4gICAgICBvbk1vdXNlTGVhdmU6IHRoaXMuX2hhbmRsZU1vdXNlTGVhdmUsXG4gICAgfSk7XG4gIH1cblxuICBfc2V0UmVhbG0gPSAoZWxtOiBIVE1MRWxlbWVudCB8IFROaWwpID0+IHtcbiAgICB0aGlzLl9yZWFsbUVsbSA9IGVsbTtcbiAgfTtcblxuICBfZ2V0RHJhZ2dpbmdCb3VuZHMgPSAoKTogRHJhZ2dhYmxlQm91bmRzID0+IHtcbiAgICBpZiAoIXRoaXMuX3JlYWxtRWxtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3RhdGUnKTtcbiAgICB9XG4gICAgY29uc3QgeyBsZWZ0OiBjbGllbnRYTGVmdCwgd2lkdGggfSA9IHRoaXMuX3JlYWxtRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICBjbGllbnRYTGVmdCxcbiAgICAgIHdpZHRoLFxuICAgICAgbWF4VmFsdWU6IDEsXG4gICAgICBtaW5WYWx1ZTogMCxcbiAgICB9O1xuICB9O1xuXG4gIF9oYW5kbGVNb3VzZU1vdmUgPSAoeyB2YWx1ZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMudXBkYXRlU3RhdGUoeyByZWdpb25DdXJzb3I6IHZhbHVlIH0pO1xuICB9O1xuXG4gIF9oYW5kbGVNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudXBkYXRlU3RhdGUoeyByZWdpb25DdXJzb3I6IG51bGwgfSk7XG4gIH07XG5cbiAgX2hhbmRsZURyYWdVcGRhdGUgPSAoeyB2YWx1ZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgcmVnaW9uRHJhZ2dpbmc6IHByZXZSZWdpb25EcmFnZ2luZyB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgcmVnaW9uRHJhZ2dpbmc7XG4gICAgaWYgKHByZXZSZWdpb25EcmFnZ2luZykge1xuICAgICAgcmVnaW9uRHJhZ2dpbmcgPSBbcHJldlJlZ2lvbkRyYWdnaW5nWzBdLCB2YWx1ZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlZ2lvbkRyYWdnaW5nID0gW3ZhbHVlLCB2YWx1ZV07XG4gICAgfVxuICAgIHRoaXMucHJvcHMudXBkYXRlU3RhdGUoeyByZWdpb25EcmFnZ2luZyB9KTtcbiAgfTtcblxuICBfaGFuZGxlRHJhZ0VuZCA9ICh7IHZhbHVlIH06IERyYWdnaW5nVXBkYXRlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVTdGF0ZSh7IHJlZ2lvbkRyYWdnaW5nOiBudWxsLCByZWdpb25DdXJzb3I6IHZhbHVlIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHJlZ2lvbkN1cnNvciwgcmVnaW9uRHJhZ2dpbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGN1cnNvckVsbTtcbiAgICBsZXQgcmVnaW9uRWxtO1xuICAgIGlmIChyZWdpb25EcmFnZ2luZykge1xuICAgICAgY29uc3QgW2EsIGJdID0gcmVnaW9uRHJhZ2dpbmc7XG4gICAgICBjb25zdCBbbGVmdCwgcmlnaHRdID0gYSA8IGIgPyBbYSwgMSAtIGJdIDogW2IsIDEgLSBhXTtcbiAgICAgIGNvbnN0IHJlZ2lvblN0eWxlID0geyBsZWZ0OiBgJHtsZWZ0ICogMTAwfSVgLCByaWdodDogYCR7cmlnaHQgKiAxMDB9JWAgfTtcbiAgICAgIHJlZ2lvbkVsbSA9IDxkaXYgY2xhc3NOYW1lPVwiUmVnaW9uRGVtby0tcmVnaW9uXCIgc3R5bGU9e3JlZ2lvblN0eWxlfSAvPjtcbiAgICB9IGVsc2UgaWYgKHJlZ2lvbkN1cnNvcikge1xuICAgICAgY29uc3QgY3Vyc29yU3R5bGUgPSB7IGxlZnQ6IGAke3JlZ2lvbkN1cnNvciAqIDEwMH0lYCB9O1xuICAgICAgY3Vyc29yRWxtID0gPGRpdiBjbGFzc05hbWU9XCJSZWdpb25EZW1vLS1yZWdpb25DdXJzb3JcIiBzdHlsZT17Y3Vyc29yU3R5bGV9IC8+O1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBhcmlhLWhpZGRlblxuICAgICAgICBjbGFzc05hbWU9XCJSZWdpb25EZW1vLS1yZWFsbVwiXG4gICAgICAgIG9uTW91c2VEb3duPXt0aGlzLl9kcmFnTWFuYWdlci5oYW5kbGVNb3VzZURvd259XG4gICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLl9kcmFnTWFuYWdlci5oYW5kbGVNb3VzZU1vdmV9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5fZHJhZ01hbmFnZXIuaGFuZGxlTW91c2VNb3ZlfVxuICAgICAgICByZWY9e3RoaXMuX3NldFJlYWxtfVxuICAgICAgPlxuICAgICAgICB7cmVnaW9uRWxtfVxuICAgICAgICB7Y3Vyc29yRWxtfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBSyxNQUFNLE9BQU87QUFFekIsT0FBT0MsZ0JBQWdCLE1BQTJDLElBQUk7QUFHdEUsT0FBTyxrQkFBa0I7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBQUEsSUFhTEMsVUFBVSwwQkFBQUMsb0JBQUE7RUFLN0IsU0FBQUQsV0FBWUUsS0FBc0IsRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFDbENBLEtBQUEsR0FBQUYsb0JBQUEsQ0FBQUcsSUFBQSxPQUFNRixLQUFLLENBQUM7SUFBQ0MsS0FBQSxDQWNmRSxTQUFTLEdBQUcsVUFBQ0MsR0FBdUIsRUFBSztNQUN2Q0gsS0FBQSxDQUFLSSxTQUFTLEdBQUdELEdBQUc7SUFDdEIsQ0FBQztJQUFBSCxLQUFBLENBRURLLGtCQUFrQixHQUFHLFlBQXVCO01BQzFDLElBQUksQ0FBQ0wsS0FBQSxDQUFLSSxTQUFTLEVBQUU7UUFDbkIsTUFBTSxJQUFJRSxLQUFLLENBQUMsZUFBZSxDQUFDO01BQ2xDO01BQ0EsSUFBQUMscUJBQUEsR0FBcUNQLEtBQUEsQ0FBS0ksU0FBUyxDQUFDSSxxQkFBcUIsQ0FBQyxDQUFDO1FBQTdEQyxXQUFXLEdBQUFGLHFCQUFBLENBQWpCRyxJQUFJO1FBQWVDLEtBQUssR0FBQUoscUJBQUEsQ0FBTEksS0FBSztNQUNoQyxPQUFPO1FBQ0xGLFdBQVcsRUFBWEEsV0FBVztRQUNYRSxLQUFLLEVBQUxBLEtBQUs7UUFDTEMsUUFBUSxFQUFFLENBQUM7UUFDWEMsUUFBUSxFQUFFO01BQ1osQ0FBQztJQUNILENBQUM7SUFBQWIsS0FBQSxDQUVEYyxnQkFBZ0IsR0FBRyxVQUFBQyxJQUFBLEVBQStCO01BQUEsSUFBNUJDLEtB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