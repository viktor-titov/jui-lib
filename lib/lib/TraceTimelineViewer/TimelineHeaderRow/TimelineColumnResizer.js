import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
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

import { css } from '@emotion/css';
import cx from 'classnames';
import * as React from 'react';
import { stylesFactory } from '@grafana/ui';
import DraggableManager from '../../utils/DraggableManager';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var getStyles = stylesFactory(function () {
  return {
    TimelineColumnResizer: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      left: 0;\n      position: absolute;\n      right: 0;\n      top: 0;\n    "]))),
    wrapper: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      bottom: 0;\n      position: absolute;\n      top: 0;\n    "]))),
    dragger: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      border-left: 2px solid transparent;\n      cursor: col-resize;\n      height: 5000px;\n      margin-left: -1px;\n      position: absolute;\n      top: 0;\n      width: 1px;\n      z-index: 10;\n      &:hover {\n        border-left: 2px solid rgba(0, 0, 0, 0.3);\n      }\n      &::before {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: -8px;\n        right: 0;\n        content: ' ';\n      }\n    "]))),
    draggerDragging: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      background: rgba(136, 0, 136, 0.05);\n      width: unset;\n      &::before {\n        left: -2000px;\n        right: -2000px;\n      }\n    "]))),
    draggerDraggingLeft: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      border-left: 2px solid #808;\n      border-right: 1px solid #999;\n    "]))),
    draggerDraggingRight: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      border-left: 1px solid #999;\n      border-right: 2px solid #808;\n    "]))),
    gripIcon: css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      &::before,\n      &::after {\n        border-right: 1px solid #ccc;\n        content: ' ';\n        height: 9px;\n        position: absolute;\n        right: 9px;\n        top: 25px;\n      }\n      &::after {\n        right: 5px;\n      }\n    "]))),
    gripIconDragging: css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n      &::before,\n      &::after {\n        border-right: 1px solid rgba(136, 0, 136, 0.5);\n      }\n    "])))
  };
});
var TimelineColumnResizer = /*#__PURE__*/function (_React$PureComponent) {
  function TimelineColumnResizer(props) {
    var _this;
    _this = _React$PureComponent.call(this, props) || this;
    _this._setRootElm = function (elm) {
      _this._rootElm = elm;
    };
    _this._getDraggingBounds = function () {
      if (!_this._rootElm) {
        throw new Error('invalid state');
      }
      var _this$_rootElm$getBou = _this._rootElm.getBoundingClientRect(),
        clientXLeft = _this$_rootElm$getBou.left,
        width = _this$_rootElm$getBou.width;
      var _this$props = _this.props,
        min = _this$props.min,
        max = _this$props.max;
      return {
        clientXLeft: clientXLeft,
        width: width,
        maxValue: max,
        minValue: min
      };
    };
    _this._handleDragUpdate = function (_ref) {
      var value = _ref.value;
      _this.setState({
        dragPosition: value
      });
    };
    _this._handleDragEnd = function (_ref2) {
      var manager = _ref2.manager,
        value = _ref2.value;
      manager.resetBounds();
      _this.setState({
        dragPosition: null
      });
      _this.props.onChange(value);
    };
    _this._dragManager = new DraggableManager({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleDragEnd,
      onDragMove: _this._handleDragUpdate,
      onDragStart: _this._handleDragUpdate
    });
    _this._rootElm = undefined;
    _this.state = {
      dragPosition: null
    };
    return _this;
  }
  _inheritsLoose(TimelineColumnResizer, _React$PureComponent);
  var _proto = TimelineColumnResizer.prototype;
  _proto.componentWillUnmount = function componentWillUnmount() {
    this._dragManager.dispose();
  };
  _proto.render = function render() {
    var left;
    var draggerStyle;
    var _this$props2 = this.props,
      position = _this$props2.position,
      columnResizeHandleHeight = _this$props2.columnResizeHandleHeight;
    var dragPosition = this.state.dragPosition;
    left = position * 100 + "%";
    var gripStyle = {
      left: left
    };
    var isDraggingLeft = false;
    var isDraggingRight = false;
    var styles = getStyles();
    if (this._dragManager.isDragging() && this._rootElm && dragPosition != null) {
      isDraggingLeft = dragPosition < position;
      isDraggingRight = dragPosition > position;
      left = dragPosition * 100 + "%";
      // Draw a highlight from the current dragged position back to the original
      // position, e.g. highlight the change. Draw the highlight via `left` and
      // `right` css styles (simpler than using `width`).
      var draggerLeft = Math.min(position, dragPosition) * 100 + "%";
      // subtract 1px for draggerRight to deal with the right border being off
      // by 1px when dragging left
      var draggerRight = "calc(" + (1 - Math.max(position, dragPosition)) * 100 + "% - 1px)";
      draggerStyle = {
        left: draggerLeft,
        right: draggerRight
      };
    } else {
      draggerStyle = gripStyle;
    }
    draggerStyle.height = columnResizeHandleHeight;
    var isDragging = isDraggingLeft || isDraggingRight;
    return /*#__PURE__*/_jsxs("div", {
      className: styles.TimelineColumnResizer,
      ref: this._setRootElm,
      "data-testid": "TimelineColumnResizer",
      children: [/*#__PURE__*/_jsx("div", {
        className: cx(styles.gripIcon, isDragging && styles.gripIconDragging),
        style: gripStyle,
        "data-testid": "TimelineColumnResizer--gripIcon"
      }), /*#__PURE__*/_jsx("div", {
        "aria-hidden": true,
        className: cx(styles.dragger, isDragging && styles.draggerDragging, isDraggingRight && styles.draggerDraggingRight, isDraggingLeft && styles.draggerDraggingLeft),
        onMouseDown: this._dragManager.handleMouseDown,
        style: draggerStyle,
        "data-testid": "TimelineColumnResizer--dragger"
      })]
    });
  };
  return TimelineColumnResizer;
}(React.PureComponent);
export { TimelineColumnResizer as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0Iiwic3R5bGVzRmFjdG9yeSIsIkRyYWdnYWJsZU1hbmFnZXIiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwiVGltZWxpbmVDb2x1bW5SZXNpemVyIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwid3JhcHBlciIsIl90ZW1wbGF0ZU9iamVjdDIiLCJkcmFnZ2VyIiwiX3RlbXBsYXRlT2JqZWN0MyIsImRyYWdnZXJEcmFnZ2luZyIsIl90ZW1wbGF0ZU9iamVjdDQiLCJkcmFnZ2VyRHJhZ2dpbmdMZWZ0IiwiX3RlbXBsYXRlT2JqZWN0NSIsImRyYWdnZXJEcmFnZ2luZ1JpZ2h0IiwiX3RlbXBsYXRlT2JqZWN0NiIsImdyaXBJY29uIiwiX3RlbXBsYXRlT2JqZWN0NyIsImdyaXBJY29uRHJhZ2dpbmciLCJfdGVtcGxhdGVPYmplY3Q4IiwiX1JlYWN0JFB1cmVDb21wb25lbnQiLCJwcm9wcyIsIl90aGlzIiwiY2FsbCIsIl9zZXRSb290RWxtIiwiZWxtIiwiX3Jvb3RFbG0iLCJfZ2V0RHJhZ2dpbmdCb3VuZHMiLCJFcnJvciIsIl90aGlzJF9yb290RWxtJGdldEJvdSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFhMZWZ0IiwibGVmdCIsIndpZHRoIiwiX3RoaXMkcHJvcHMiLCJtaW4iLCJtYXgiLCJtYXhWYWx1ZSIsIm1pblZhbHVlIiwiX2hhbmRsZURyYWdVcGRhdGUiLCJfcmVmIiwidmFsdWUiLCJzZXRTdGF0ZSIsImRyYWdQb3NpdGlvbiIsIl9oYW5kbGVEcmFnRW5kIiwiX3JlZjIiLCJtYW5hZ2VyIiwicmVzZXRCb3VuZHMiLCJvbkNoYW5nZSIsIl9kcmFnTWFuYWdlciIsImdldEJvdW5kcyIsIm9uRHJhZ0VuZCIsIm9uRHJhZ01vdmUiLCJvbkRyYWdTdGFydCIsInVuZGVmaW5lZCIsInN0YXRlIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRpc3Bvc2UiLCJyZW5kZXIiLCJkcmFnZ2VyU3R5bGUiLCJfdGhpcyRwcm9wczIiLCJwb3NpdGlvbiIsImNvbHVtblJlc2l6ZUhhbmRsZUhlaWdodCIsImdyaXBTdHlsZSIsImlzRHJhZ2dpbmdMZWZ0IiwiaXNEcmFnZ2luZ1JpZ2h0Iiwic3R5bGVzIiwiaXNEcmFnZ2luZyIsImRyYWdnZXJMZWZ0IiwiTWF0aCIsImRyYWdnZXJSaWdodCIsInJpZ2h0IiwiaGVpZ2h0IiwiY2xhc3NOYW1lIiwicmVmIiwiY2hpbGRyZW4iLCJzdHlsZSIsIm9uTW91c2VEb3duIiwiaGFuZGxlTW91c2VEb3duIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL1RyYWNlVGltZWxpbmVWaWV3ZXIvVGltZWxpbmVIZWFkZXJSb3cvVGltZWxpbmVDb2x1bW5SZXNpemVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgc3R5bGVzRmFjdG9yeSB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgVE5pbCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBEcmFnZ2FibGVNYW5hZ2VyLCB7IERyYWdnYWJsZUJvdW5kcywgRHJhZ2dpbmdVcGRhdGUgfSBmcm9tICcuLi8uLi91dGlscy9EcmFnZ2FibGVNYW5hZ2VyJztcblxuZXhwb3J0IGNvbnN0IGdldFN0eWxlcyA9IHN0eWxlc0ZhY3RvcnkoKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIFRpbWVsaW5lQ29sdW1uUmVzaXplcjogY3NzYFxuICAgICAgbGVmdDogMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgdG9wOiAwO1xuICAgIGAsXG4gICAgd3JhcHBlcjogY3NzYFxuICAgICAgYm90dG9tOiAwO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgIGAsXG4gICAgZHJhZ2dlcjogY3NzYFxuICAgICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgIGN1cnNvcjogY29sLXJlc2l6ZTtcbiAgICAgIGhlaWdodDogNTAwMHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IC0xcHg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICB3aWR0aDogMXB4O1xuICAgICAgei1pbmRleDogMTA7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gICAgICB9XG4gICAgICAmOjpiZWZvcmUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAtOHB4O1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgY29udGVudDogJyAnO1xuICAgICAgfVxuICAgIGAsXG4gICAgZHJhZ2dlckRyYWdnaW5nOiBjc3NgXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDEzNiwgMCwgMTM2LCAwLjA1KTtcbiAgICAgIHdpZHRoOiB1bnNldDtcbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGxlZnQ6IC0yMDAwcHg7XG4gICAgICAgIHJpZ2h0OiAtMjAwMHB4O1xuICAgICAgfVxuICAgIGAsXG4gICAgZHJhZ2dlckRyYWdnaW5nTGVmdDogY3NzYFxuICAgICAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCAjODA4O1xuICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzk5OTtcbiAgICBgLFxuICAgIGRyYWdnZXJEcmFnZ2luZ1JpZ2h0OiBjc3NgXG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM5OTk7XG4gICAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCAjODA4O1xuICAgIGAsXG4gICAgZ3JpcEljb246IGNzc2BcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgICY6OmJlZm9yZSxcbiAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NjYztcbiAgICAgICAgY29udGVudDogJyAnO1xuICAgICAgICBoZWlnaHQ6IDlweDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICByaWdodDogOXB4O1xuICAgICAgICB0b3A6IDI1cHg7XG4gICAgICB9XG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIHJpZ2h0OiA1cHg7XG4gICAgICB9XG4gICAgYCxcbiAgICBncmlwSWNvbkRyYWdnaW5nOiBjc3NgXG4gICAgICAmOjpiZWZvcmUsXG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMTM2LCAwLCAxMzYsIDAuNSk7XG4gICAgICB9XG4gICAgYCxcbiAgfTtcbn0pO1xuXG5leHBvcnQgdHlwZSBUaW1lbGluZUNvbHVtblJlc2l6ZXJQcm9wcyA9IHtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xuICBvbkNoYW5nZTogKG5ld1NpemU6IG51bWJlcikgPT4gdm9pZDtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgY29sdW1uUmVzaXplSGFuZGxlSGVpZ2h0OiBudW1iZXI7XG59O1xuXG50eXBlIFRpbWVsaW5lQ29sdW1uUmVzaXplclN0YXRlID0ge1xuICBkcmFnUG9zaXRpb246IG51bWJlciB8IFROaWw7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lbGluZUNvbHVtblJlc2l6ZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFxuICBUaW1lbGluZUNvbHVtblJlc2l6ZXJQcm9wcyxcbiAgVGltZWxpbmVDb2x1bW5SZXNpemVyU3RhdGVcbj4ge1xuICBzdGF0ZTogVGltZWxpbmVDb2x1bW5SZXNpemVyU3RhdGU7XG5cbiAgX2RyYWdNYW5hZ2VyOiBEcmFnZ2FibGVNYW5hZ2VyO1xuICBfcm9vdEVsbTogRWxlbWVudCB8IFROaWw7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFRpbWVsaW5lQ29sdW1uUmVzaXplclByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX2RyYWdNYW5hZ2VyID0gbmV3IERyYWdnYWJsZU1hbmFnZXIoe1xuICAgICAgZ2V0Qm91bmRzOiB0aGlzLl9nZXREcmFnZ2luZ0JvdW5kcyxcbiAgICAgIG9uRHJhZ0VuZDogdGhpcy5faGFuZGxlRHJhZ0VuZCxcbiAgICAgIG9uRHJhZ01vdmU6IHRoaXMuX2hhbmRsZURyYWdVcGRhdGUsXG4gICAgICBvbkRyYWdTdGFydDogdGhpcy5faGFuZGxlRHJhZ1VwZGF0ZSxcbiAgICB9KTtcbiAgICB0aGlzLl9yb290RWxtID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcmFnUG9zaXRpb246IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX2RyYWdNYW5hZ2VyLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIF9zZXRSb290RWxtID0gKGVsbTogRWxlbWVudCB8IFROaWwpID0+IHtcbiAgICB0aGlzLl9yb290RWxtID0gZWxtO1xuICB9O1xuXG4gIF9nZXREcmFnZ2luZ0JvdW5kcyA9ICgpOiBEcmFnZ2FibGVCb3VuZHMgPT4ge1xuICAgIGlmICghdGhpcy5fcm9vdEVsbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHN0YXRlJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgbGVmdDogY2xpZW50WExlZnQsIHdpZHRoIH0gPSB0aGlzLl9yb290RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsaWVudFhMZWZ0LFxuICAgICAgd2lkdGgsXG4gICAgICBtYXhWYWx1ZTogbWF4LFxuICAgICAgbWluVmFsdWU6IG1pbixcbiAgICB9O1xuICB9O1xuXG4gIF9oYW5kbGVEcmFnVXBkYXRlID0gKHsgdmFsdWUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgZHJhZ1Bvc2l0aW9uOiB2YWx1ZSB9KTtcbiAgfTtcblxuICBfaGFuZGxlRHJhZ0VuZCA9ICh7IG1hbmFnZXIsIHZhbHVlIH06IERyYWdnaW5nVXBkYXRlKSA9PiB7XG4gICAgbWFuYWdlci5yZXNldEJvdW5kcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBkcmFnUG9zaXRpb246IG51bGwgfSk7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBsZWZ0O1xuICAgIGxldCBkcmFnZ2VyU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG4gICAgY29uc3QgeyBwb3NpdGlvbiwgY29sdW1uUmVzaXplSGFuZGxlSGVpZ2h0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZHJhZ1Bvc2l0aW9uIH0gPSB0aGlzLnN0YXRlO1xuICAgIGxlZnQgPSBgJHtwb3NpdGlvbiAqIDEwMH0lYDtcbiAgICBjb25zdCBncmlwU3R5bGUgPSB7IGxlZnQgfTtcbiAgICBsZXQgaXNEcmFnZ2luZ0xlZnQgPSBmYWxzZTtcbiAgICBsZXQgaXNEcmFnZ2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKCk7XG5cbiAgICBpZiAodGhpcy5fZHJhZ01hbmFnZXIuaXNEcmFnZ2luZygpICYmIHRoaXMuX3Jvb3RFbG0gJiYgZHJhZ1Bvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgIGlzRHJhZ2dpbmdMZWZ0ID0gZHJhZ1Bvc2l0aW9uIDwgcG9zaXRpb247XG4gICAgICBpc0RyYWdnaW5nUmlnaHQgPSBkcmFnUG9zaXRpb24gPiBwb3NpdGlvbjtcbiAgICAgIGxlZnQgPSBgJHtkcmFnUG9zaXRpb24gKiAxMDB9JWA7XG4gICAgICAvLyBEcmF3IGEgaGlnaGxpZ2h0IGZyb20gdGhlIGN1cnJlbnQgZHJhZ2dlZCBwb3NpdGlvbiBiYWNrIHRvIHRoZSBvcmlnaW5hbFxuICAgICAgLy8gcG9zaXRpb24sIGUuZy4gaGlnaGxpZ2h0IHRoZSBjaGFuZ2UuIERyYXcgdGhlIGhpZ2hsaWdodCB2aWEgYGxlZnRgIGFuZFxuICAgICAgLy8gYHJpZ2h0YCBjc3Mgc3R5bGVzIChzaW1wbGVyIHRoYW4gdXNpbmcgYHdpZHRoYCkuXG4gICAgICBjb25zdCBkcmFnZ2VyTGVmdCA9IGAke01hdGgubWluKHBvc2l0aW9uLCBkcmFnUG9zaXRpb24pICogMTAwfSVgO1xuICAgICAgLy8gc3VidHJhY3QgMXB4IGZvciBkcmFnZ2VyUmlnaHQgdG8gZGVhbCB3aXRoIHRoZSByaWdodCBib3JkZXIgYmVpbmcgb2ZmXG4gICAgICAvLyBieSAxcHggd2hlbiBkcmFnZ2luZyBsZWZ0XG4gICAgICBjb25zdCBkcmFnZ2VyUmlnaHQgPSBgY2FsYygkeygxIC0gTWF0aC5tYXgocG9zaXRpb24sIGRyYWdQb3NpdGlvbikpICogMTAwfSUgLSAxcHgpYDtcbiAgICAgIGRyYWdnZXJTdHlsZSA9IHsgbGVmdDogZHJhZ2dlckxlZnQsIHJpZ2h0OiBkcmFnZ2VyUmlnaHQgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ2dlclN0eWxlID0gZ3JpcFN0eWxlO1xuICAgIH1cbiAgICBkcmFnZ2VyU3R5bGUuaGVpZ2h0ID0gY29sdW1uUmVzaXplSGFuZGxlSGVpZ2h0O1xuXG4gICAgY29uc3QgaXNEcmFnZ2luZyA9IGlzRHJhZ2dpbmdMZWZ0IHx8IGlzRHJhZ2dpbmdSaWdodDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5UaW1lbGluZUNvbHVtblJlc2l6ZXJ9IHJlZj17dGhpcy5fc2V0Um9vdEVsbX0gZGF0YS10ZXN0aWQ9XCJUaW1lbGluZUNvbHVtblJlc2l6ZXJcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y3goc3R5bGVzLmdyaXBJY29uLCBpc0RyYWdnaW5nICYmIHN0eWxlcy5ncmlwSWNvbkRyYWdnaW5nKX1cbiAgICAgICAgICBzdHlsZT17Z3JpcFN0eWxlfVxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiVGltZWxpbmVDb2x1bW5SZXNpemVyLS1ncmlwSWNvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBhcmlhLWhpZGRlblxuICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICBzdHlsZXMuZHJhZ2dlcixcbiAgICAgICAgICAgIGlzRHJhZ2dpbmcgJiYgc3R5bGVzLmRyYWdnZXJEcmFnZ2luZyxcbiAgICAgICAgICAgIGlzRHJhZ2dpbmdSaWdodCAmJiBzdHlsZXMuZHJhZ2dlckRyYWdnaW5nUmlnaHQsXG4gICAgICAgICAgICBpc0RyYWdnaW5nTGVmdCAmJiBzdHlsZXMuZHJhZ2dlckRyYWdnaW5nTGVmdFxuICAgICAgICAgICl9XG4gICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuX2RyYWdNYW5hZ2VyLmhhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICBzdHlsZT17ZHJhZ2dlclN0eWxlfVxuICAgICAgICAgIGRhdGEtdGVzdGlkPVwiVGltZWxpbmVDb2x1bW5SZXNpemVyLS1kcmFnZ2VyXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsRUFBRSxNQUFNLFlBQVk7QUFDM0IsT0FBTyxLQUFLQyxLQUFLLE1BQU0sT0FBTztBQUU5QixTQUFTQyxhQUFhLFFBQVEsYUFBYTtBQUczQyxPQUFPQyxnQkFBZ0IsTUFBMkMsOEJBQThCO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBLEVBQUFDLElBQUEsSUFBQUMsS0FBQTtBQUVqRyxPQUFPLElBQU1DLFNBQVMsR0FBR04sYUFBYSxDQUFDLFlBQU07RUFDM0MsT0FBTztJQUNMTyxxQkFBcUIsRUFBRVYsR0FBRyxDQUFBVyxlQUFBLEtBQUFBLGVBQUEsR0FBQUMsMkJBQUEseUZBS3pCO0lBQ0RDLE9BQU8sRUFBRWIsR0FBRyxDQUFBYyxnQkFBQSxLQUFBQSxnQkFBQSxHQUFBRiwyQkFB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RztNQUMvQjtNQUNBO01BQ0E7TUFDQSxJQUFNNEIsV0FBVyxHQUFNQyxJQUFJLENBQUNyQyxHQUFHLENBQUM2QixRQUFRLEVBQUVyQixZQUFZLENBQUMsR0FBRyxHQUFHLE1BQUc7TUFDaEU7TUFDQTtNQUNBLElBQU04QixZQUFZLGFBQVcsQ0FBQyxDQUFDLEdBQUdELElBQUksQ0FBQ3BDLEdBQUcsQ0FBQzRCLFFBQVEsRUFBRXJCLFlBQVksQ0FBQyxJQUFJLEdBQUcsYUFBVTtNQUNuRm1CLFlBQVksR0FBRztRQUFFOUIsSUFBSSxFQUFFdUMsV0FBVztRQUFFRyxLQUFLLEVBQUVEO01BQWEsQ0FBQztJQUMzRCxDQUFDLE1BQU07TUFDTFgsWUFBWSxHQUFHSSxTQUFTO0lBQzFCO0lBQ0FKLFlBQVksQ0FBQ2EsTUFBTSxHQUFHVix3QkFBd0I7SUFFOUMsSUFBTUssVUFBVSxHQUFHSCxjQUFjLElBQUlDLGVBQWU7SUFDcEQsb0JBQ0VuRSxLQUFBO01BQUsyRSxTQUFTLEVBQUVQLE1BQU0sQ0FBQ2xFLHFCQUFzQjtNQUFDMEUsR0FBRyxFQUFFLElBQUksQ0FBQ3JELFdBQVk7TUFBQyxlQUFZLHVCQUF1QjtNQUFBc0QsUUFBQSxnQkFDdEcvRSxJQUFBO1FBQ0U2RSxTQUFTLEVBQUVsRixFQUFFLENBQUMyRSxNQUFNLENBQUNyRCxRQUFRLEVBQUVzRCxVQUFVLElBQUlELE1BQU0sQ0FBQ25ELGdCQUFnQixDQUFFO1FBQ3RFNkQsS0FBSyxFQUFFYixTQUFVO1FBQ2pCLGVBQVk7TUFBaUMsQ0FDOUMsQ0FBQyxlQUNGbkUsSUFBQTtRQUNFLG1CQUFXO1FBQ1g2RSxTQUFTLEVBQUVsRixFQUFFLENBQ1gyRSxNQUFNLENBQUM3RCxPQUFPLEVBQ2Q4RCxVQUFVLElBQUlELE1BQU0sQ0FBQzNELGVBQWUsRUFDcEMwRCxlQUFlLElBQUlDLE1BQU0sQ0FBQ3ZELG9CQUFvQixFQUM5Q3FELGNBQWMsSUFBSUUsTUFBTSxDQUFDekQsbUJBQzNCLENBQUU7UUFDRm9FLFdBQVcsRUFBRSxJQUFJLENBQUMvQixZQUFZLENBQUNnQyxlQUFnQjtRQUMvQ0YsS0FBSyxFQUFFakIsWUFBYTtRQUNwQixlQUFZO01BQWdDLENBQzdDLENBQUM7SUFBQSxDQUNDLENBQUM7RUFFVixDQUFDO0VBQUEsT0FBQTNELHFCQUFBO0FBQUEsRUF6R2dEUixLQUFLLENBQUN1RixhQUFhO0FBQUEsU0FBakQvRSxxQkFBcUIsSUFBQWdGLE9BQUEiLCJpZ25vcmVMaXN0IjpbXX0=