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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJSZWFjdCIsIkRyYWdnYWJsZU1hbmFnZXIiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiUmVnaW9uRGVtbyIsIl9SZWFjdCRQdXJlQ29tcG9uZW50IiwicHJvcHMiLCJfdGhpcyIsImNhbGwiLCJfc2V0UmVhbG0iLCJlbG0iLCJfcmVhbG1FbG0iLCJfZ2V0RHJhZ2dpbmdCb3VuZHMiLCJFcnJvciIsIl90aGlzJF9yZWFsbUVsbSRnZXRCbyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFhMZWZ0IiwibGVmdCIsIndpZHRoIiwibWF4VmFsdWUiLCJtaW5WYWx1ZSIsIl9oYW5kbGVNb3VzZU1vdmUiLCJfcmVmIiwidmFsdWUiLCJ1cGRhdGVTdGF0ZSIsInJlZ2lvbkN1cnNvciIsIl9oYW5kbGVNb3VzZUxlYXZlIiwiX2hhbmRsZURyYWdVcGRhdGUiLCJfcmVmMiIsInByZXZSZWdpb25EcmFnZ2luZyIsInJlZ2lvbkRyYWdnaW5nIiwiX2hhbmRsZURyYWdFbmQiLCJfcmVmMyIsIl9kcmFnTWFuYWdlciIsImdldEJvdW5kcyIsIm9uRHJhZ0VuZCIsIm9uRHJhZ01vdmUiLCJvbkRyYWdTdGFydCIsIm9uTW91c2VNb3ZlIiwib25Nb3VzZUxlYXZlIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJyZW5kZXIiLCJfdGhpcyRwcm9wcyIsImN1cnNvckVsbSIsInJlZ2lvbkVsbSIsImEiLCJiIiwiX3JlZjQiLCJyaWdodCIsInJlZ2lvblN0eWxlIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJjdXJzb3JTdHlsZSIsIm9uTW91c2VEb3duIiwiaGFuZGxlTW91c2VEb3duIiwiaGFuZGxlTW91c2VNb3ZlIiwicmVmIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvdXRpbHMvRHJhZ2dhYmxlTWFuYWdlci9kZW1vL1JlZ2lvbkRlbW8udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgRHJhZ2dhYmxlTWFuYWdlciwgeyBEcmFnZ2FibGVCb3VuZHMsIERyYWdnaW5nVXBkYXRlIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgVE5pbCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuaW1wb3J0ICcuL1JlZ2lvbkRlbW8uY3NzJztcblxudHlwZSBUVXBkYXRlID0ge1xuICByZWdpb25DdXJzb3I/OiBudW1iZXIgfCBudWxsO1xuICByZWdpb25EcmFnZ2luZz86IG51bWJlcltdIHwgbnVsbDtcbn07XG5cbnR5cGUgUmVnaW9uRGVtb1Byb3BzID0ge1xuICByZWdpb25DdXJzb3I6IG51bWJlciB8IFROaWw7XG4gIHJlZ2lvbkRyYWdnaW5nOiBbbnVtYmVyLCBudW1iZXJdIHwgVE5pbDtcbiAgdXBkYXRlU3RhdGU6ICh1cGRhdGU6IFRVcGRhdGUpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpb25EZW1vIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxSZWdpb25EZW1vUHJvcHM+IHtcbiAgX2RyYWdNYW5hZ2VyOiBEcmFnZ2FibGVNYW5hZ2VyO1xuXG4gIF9yZWFsbUVsbTogSFRNTEVsZW1lbnQgfCBUTmlsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBSZWdpb25EZW1vUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLl9yZWFsbUVsbSA9IG51bGw7XG5cbiAgICB0aGlzLl9kcmFnTWFuYWdlciA9IG5ldyBEcmFnZ2FibGVNYW5hZ2VyKHtcbiAgICAgIGdldEJvdW5kczogdGhpcy5fZ2V0RHJhZ2dpbmdCb3VuZHMsXG4gICAgICBvbkRyYWdFbmQ6IHRoaXMuX2hhbmRsZURyYWdFbmQsXG4gICAgICBvbkRyYWdNb3ZlOiB0aGlzLl9oYW5kbGVEcmFnVXBkYXRlLFxuICAgICAgb25EcmFnU3RhcnQ6IHRoaXMuX2hhbmRsZURyYWdVcGRhdGUsXG4gICAgICBvbk1vdXNlTW92ZTogdGhpcy5faGFuZGxlTW91c2VNb3ZlLFxuICAgICAgb25Nb3VzZUxlYXZlOiB0aGlzLl9oYW5kbGVNb3VzZUxlYXZlLFxuICAgIH0pO1xuICB9XG5cbiAgX3NldFJlYWxtID0gKGVsbTogSFRNTEVsZW1lbnQgfCBUTmlsKSA9PiB7XG4gICAgdGhpcy5fcmVhbG1FbG0gPSBlbG07XG4gIH07XG5cbiAgX2dldERyYWdnaW5nQm91bmRzID0gKCk6IERyYWdnYWJsZUJvdW5kcyA9PiB7XG4gICAgaWYgKCF0aGlzLl9yZWFsbUVsbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHN0YXRlJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgbGVmdDogY2xpZW50WExlZnQsIHdpZHRoIH0gPSB0aGlzLl9yZWFsbUVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgY2xpZW50WExlZnQsXG4gICAgICB3aWR0aCxcbiAgICAgIG1heFZhbHVlOiAxLFxuICAgICAgbWluVmFsdWU6IDAsXG4gICAgfTtcbiAgfTtcblxuICBfaGFuZGxlTW91c2VNb3ZlID0gKHsgdmFsdWUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlKHsgcmVnaW9uQ3Vyc29yOiB2YWx1ZSB9KTtcbiAgfTtcblxuICBfaGFuZGxlTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlKHsgcmVnaW9uQ3Vyc29yOiBudWxsIH0pO1xuICB9O1xuXG4gIF9oYW5kbGVEcmFnVXBkYXRlID0gKHsgdmFsdWUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICBjb25zdCB7IHJlZ2lvbkRyYWdnaW5nOiBwcmV2UmVnaW9uRHJhZ2dpbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IHJlZ2lvbkRyYWdnaW5nO1xuICAgIGlmIChwcmV2UmVnaW9uRHJhZ2dpbmcpIHtcbiAgICAgIHJlZ2lvbkRyYWdnaW5nID0gW3ByZXZSZWdpb25EcmFnZ2luZ1swXSwgdmFsdWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWdpb25EcmFnZ2luZyA9IFt2YWx1ZSwgdmFsdWVdO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlKHsgcmVnaW9uRHJhZ2dpbmcgfSk7XG4gIH07XG5cbiAgX2hhbmRsZURyYWdFbmQgPSAoeyB2YWx1ZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMudXBkYXRlU3RhdGUoeyByZWdpb25EcmFnZ2luZzogbnVsbCwgcmVnaW9uQ3Vyc29yOiB2YWx1ZSB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByZWdpb25DdXJzb3IsIHJlZ2lvbkRyYWdnaW5nIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBjdXJzb3JFbG07XG4gICAgbGV0IHJlZ2lvbkVsbTtcbiAgICBpZiAocmVnaW9uRHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IFthLCBiXSA9IHJlZ2lvbkRyYWdnaW5nO1xuICAgICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IGEgPCBiID8gW2EsIDEgLSBiXSA6IFtiLCAxIC0gYV07XG4gICAgICBjb25zdCByZWdpb25TdHlsZSA9IHsgbGVmdDogYCR7bGVmdCAqIDEwMH0lYCwgcmlnaHQ6IGAke3JpZ2h0ICogMTAwfSVgIH07XG4gICAgICByZWdpb25FbG0gPSA8ZGl2IGNsYXNzTmFtZT1cIlJlZ2lvbkRlbW8tLXJlZ2lvblwiIHN0eWxlPXtyZWdpb25TdHlsZX0gLz47XG4gICAgfSBlbHNlIGlmIChyZWdpb25DdXJzb3IpIHtcbiAgICAgIGNvbnN0IGN1cnNvclN0eWxlID0geyBsZWZ0OiBgJHtyZWdpb25DdXJzb3IgKiAxMDB9JWAgfTtcbiAgICAgIGN1cnNvckVsbSA9IDxkaXYgY2xhc3NOYW1lPVwiUmVnaW9uRGVtby0tcmVnaW9uQ3Vyc29yXCIgc3R5bGU9e2N1cnNvclN0eWxlfSAvPjtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgYXJpYS1oaWRkZW5cbiAgICAgICAgY2xhc3NOYW1lPVwiUmVnaW9uRGVtby0tcmVhbG1cIlxuICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5fZHJhZ01hbmFnZXIuaGFuZGxlTW91c2VEb3dufVxuICAgICAgICBvbk1vdXNlTW92ZT17dGhpcy5fZHJhZ01hbmFnZXIuaGFuZGxlTW91c2VNb3ZlfVxuICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuX2RyYWdNYW5hZ2VyLmhhbmRsZU1vdXNlTW92ZX1cbiAgICAgICAgcmVmPXt0aGlzLl9zZXRSZWFsbX1cbiAgICAgID5cbiAgICAgICAge3JlZ2lvbkVsbX1cbiAgICAgICAge2N1cnNvckVsbX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU9BLEtBQUssTUFBTSxPQUFPO0FBRXpCLE9BQU9DLGdCQUFnQixNQUEyQyxJQUFJO0FBR3RFLE9BQU8sa0JBQWtCO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBLEVBQUFDLElBQUEsSUFBQUMsS0FBQTtBQUFBLElBYUxDLFVBQVUsMEJBQUFDLG9CQUFBO0VBSzdCLFNBQUFELFdBQVlFLEtBQXNCLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2xDQSxLQUFBLEdBQUFGLG9CQUFBLENBQUFHLElBQUEsT0FBTUYsS0FBSyxDQUFDO0lBQUNDLEtBQUEsQ0FjZkUsU0FBUyxHQUFHLFVBQUNDLEdBQXVCLEVBQUs7TUFDdkNILEtBQUEsQ0FBS0ksU0FBUyxHQUFHRCxHQUFHO0lBQ3RCLENBQUM7SUFBQUgsS0FBQSxDQUVESyxrQkFBa0IsR0FBRyxZQUF1QjtNQUMxQyxJQUFJLENBQUNMLEtBQUEsQ0FBS0ksU0FBUyxFQUFFO1FBQ25CLE1BQU0sSUFBSUUsS0FBSyxDQUFDLGVBQWUsQ0FBQztNQUNsQztNQUNBLElBQUFDLHFCQUFBLEdBQXFDUCxLQUFBLENBQUtJLFNBQVMsQ0FBQ0kscUJBQXFCLENBQUMsQ0FBQztRQUE3REMsV0FBVyxHQUFBRixxQkFBQSxDQUFqQkcsSUFBSTtRQUFlQyxLQUFLLEdBQUFKLHFCQUFBLENBQUxJLEtBQUs7TUFDaEMsT0FBTztRQUNMRixXQUFXLEVBQVhBLFdBQVc7UUFDWEUsS0FBSyxFQUFMQSxLQUFLO1FBQ0xDLFFBQVEsRUFBRSxDQUFDO1FBQ1hDLFFBQVEsRUFBRTtNQUNaLENBQUM7SUFDSCxDQUFDO0lBQUFiLEtBQUEsQ0FFRGMsZ0JBQWdCLEdBQUcsVUFBQUMsSUFBQSxFQUErQjtNQUFBLElB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