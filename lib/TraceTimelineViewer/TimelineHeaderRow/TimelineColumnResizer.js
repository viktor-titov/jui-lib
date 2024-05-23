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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0Iiwic3R5bGVzRmFjdG9yeSIsIkRyYWdnYWJsZU1hbmFnZXIiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwiVGltZWxpbmVDb2x1bW5SZXNpemVyIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwid3JhcHBlciIsIl90ZW1wbGF0ZU9iamVjdDIiLCJkcmFnZ2VyIiwiX3RlbXBsYXRlT2JqZWN0MyIsImRyYWdnZXJEcmFnZ2luZyIsIl90ZW1wbGF0ZU9iamVjdDQiLCJkcmFnZ2VyRHJhZ2dpbmdMZWZ0IiwiX3RlbXBsYXRlT2JqZWN0NSIsImRyYWdnZXJEcmFnZ2luZ1JpZ2h0IiwiX3RlbXBsYXRlT2JqZWN0NiIsImdyaXBJY29uIiwiX3RlbXBsYXRlT2JqZWN0NyIsImdyaXBJY29uRHJhZ2dpbmciLCJfdGVtcGxhdGVPYmplY3Q4IiwiX1JlYWN0JFB1cmVDb21wb25lbnQiLCJwcm9wcyIsIl90aGlzIiwiY2FsbCIsIl9zZXRSb290RWxtIiwiZWxtIiwiX3Jvb3RFbG0iLCJfZ2V0RHJhZ2dpbmdCb3VuZHMiLCJFcnJvciIsIl90aGlzJF9yb290RWxtJGdldEJvdSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFhMZWZ0IiwibGVmdCIsIndpZHRoIiwiX3RoaXMkcHJvcHMiLCJtaW4iLCJtYXgiLCJtYXhWYWx1ZSIsIm1pblZhbHVlIiwiX2hhbmRsZURyYWdVcGRhdGUiLCJfcmVmIiwidmFsdWUiLCJzZXRTdGF0ZSIsImRyYWdQb3NpdGlvbiIsIl9oYW5kbGVEcmFnRW5kIiwiX3JlZjIiLCJtYW5hZ2VyIiwicmVzZXRCb3VuZHMiLCJvbkNoYW5nZSIsIl9kcmFnTWFuYWdlciIsImdldEJvdW5kcyIsIm9uRHJhZ0VuZCIsIm9uRHJhZ01vdmUiLCJvbkRyYWdTdGFydCIsInVuZGVmaW5lZCIsInN0YXRlIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRpc3Bvc2UiLCJyZW5kZXIiLCJkcmFnZ2VyU3R5bGUiLCJfdGhpcyRwcm9wczIiLCJwb3NpdGlvbiIsImNvbHVtblJlc2l6ZUhhbmRsZUhlaWdodCIsImdyaXBTdHlsZSIsImlzRHJhZ2dpbmdMZWZ0IiwiaXNEcmFnZ2luZ1JpZ2h0Iiwic3R5bGVzIiwiaXNEcmFnZ2luZyIsImRyYWdnZXJMZWZ0IiwiTWF0aCIsImRyYWdnZXJSaWdodCIsInJpZ2h0IiwiaGVpZ2h0IiwiY2xhc3NOYW1lIiwicmVmIiwiY2hpbGRyZW4iLCJzdHlsZSIsIm9uTW91c2VEb3duIiwiaGFuZGxlTW91c2VEb3duIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHQiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9UaW1lbGluZUhlYWRlclJvdy9UaW1lbGluZUNvbHVtblJlc2l6ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBzdHlsZXNGYWN0b3J5IH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBUTmlsIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IERyYWdnYWJsZU1hbmFnZXIsIHsgRHJhZ2dhYmxlQm91bmRzLCBEcmFnZ2luZ1VwZGF0ZSB9IGZyb20gJy4uLy4uL3V0aWxzL0RyYWdnYWJsZU1hbmFnZXInO1xuXG5leHBvcnQgY29uc3QgZ2V0U3R5bGVzID0gc3R5bGVzRmFjdG9yeSgoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgVGltZWxpbmVDb2x1bW5SZXNpemVyOiBjc3NgXG4gICAgICBsZWZ0OiAwO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICB0b3A6IDA7XG4gICAgYCxcbiAgICB3cmFwcGVyOiBjc3NgXG4gICAgICBib3R0b206IDA7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgYCxcbiAgICBkcmFnZ2VyOiBjc3NgXG4gICAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgY3Vyc29yOiBjb2wtcmVzaXplO1xuICAgICAgaGVpZ2h0OiA1MDAwcHg7XG4gICAgICBtYXJnaW4tbGVmdDogLTFweDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIHdpZHRoOiAxcHg7XG4gICAgICB6LWluZGV4OiAxMDtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgICAgIH1cbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IC04cHg7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBjb250ZW50OiAnICc7XG4gICAgICB9XG4gICAgYCxcbiAgICBkcmFnZ2VyRHJhZ2dpbmc6IGNzc2BcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTM2LCAwLCAxMzYsIDAuMDUpO1xuICAgICAgd2lkdGg6IHVuc2V0O1xuICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgbGVmdDogLTIwMDBweDtcbiAgICAgICAgcmlnaHQ6IC0yMDAwcHg7XG4gICAgICB9XG4gICAgYCxcbiAgICBkcmFnZ2VyRHJhZ2dpbmdMZWZ0OiBjc3NgXG4gICAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkICM4MDg7XG4gICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjOTk5O1xuICAgIGAsXG4gICAgZHJhZ2dlckRyYWdnaW5nUmlnaHQ6IGNzc2BcbiAgICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgIzk5OTtcbiAgICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkICM4MDg7XG4gICAgYCxcbiAgICBncmlwSWNvbjogY3NzYFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgJjo6YmVmb3JlLFxuICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2NjO1xuICAgICAgICBjb250ZW50OiAnICc7XG4gICAgICAgIGhlaWdodDogOXB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiA5cHg7XG4gICAgICAgIHRvcDogMjVweDtcbiAgICAgIH1cbiAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgcmlnaHQ6IDVweDtcbiAgICAgIH1cbiAgICBgLFxuICAgIGdyaXBJY29uRHJhZ2dpbmc6IGNzc2BcbiAgICAgICY6OmJlZm9yZSxcbiAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgxMzYsIDAsIDEzNiwgMC41KTtcbiAgICAgIH1cbiAgICBgLFxuICB9O1xufSk7XG5cbmV4cG9ydCB0eXBlIFRpbWVsaW5lQ29sdW1uUmVzaXplclByb3BzID0ge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG4gIG9uQ2hhbmdlOiAobmV3U2l6ZTogbnVtYmVyKSA9PiB2b2lkO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBjb2x1bW5SZXNpemVIYW5kbGVIZWlnaHQ6IG51bWJlcjtcbn07XG5cbnR5cGUgVGltZWxpbmVDb2x1bW5SZXNpemVyU3RhdGUgPSB7XG4gIGRyYWdQb3NpdGlvbjogbnVtYmVyIHwgVE5pbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVsaW5lQ29sdW1uUmVzaXplciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8XG4gIFRpbWVsaW5lQ29sdW1uUmVzaXplclByb3BzLFxuICBUaW1lbGluZUNvbHVtblJlc2l6ZXJTdGF0ZVxuPiB7XG4gIHN0YXRlOiBUaW1lbGluZUNvbHVtblJlc2l6ZXJTdGF0ZTtcblxuICBfZHJhZ01hbmFnZXI6IERyYWdnYWJsZU1hbmFnZXI7XG4gIF9yb290RWxtOiBFbGVtZW50IHwgVE5pbDtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogVGltZWxpbmVDb2x1bW5SZXNpemVyUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5fZHJhZ01hbmFnZXIgPSBuZXcgRHJhZ2dhYmxlTWFuYWdlcih7XG4gICAgICBnZXRCb3VuZHM6IHRoaXMuX2dldERyYWdnaW5nQm91bmRzLFxuICAgICAgb25EcmFnRW5kOiB0aGlzLl9oYW5kbGVEcmFnRW5kLFxuICAgICAgb25EcmFnTW92ZTogdGhpcy5faGFuZGxlRHJhZ1VwZGF0ZSxcbiAgICAgIG9uRHJhZ1N0YXJ0OiB0aGlzLl9oYW5kbGVEcmFnVXBkYXRlLFxuICAgIH0pO1xuICAgIHRoaXMuX3Jvb3RFbG0gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRyYWdQb3NpdGlvbjogbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5fZHJhZ01hbmFnZXIuZGlzcG9zZSgpO1xuICB9XG5cbiAgX3NldFJvb3RFbG0gPSAoZWxtOiBFbGVtZW50IHwgVE5pbCkgPT4ge1xuICAgIHRoaXMuX3Jvb3RFbG0gPSBlbG07XG4gIH07XG5cbiAgX2dldERyYWdnaW5nQm91bmRzID0gKCk6IERyYWdnYWJsZUJvdW5kcyA9PiB7XG4gICAgaWYgKCF0aGlzLl9yb290RWxtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3RhdGUnKTtcbiAgICB9XG4gICAgY29uc3QgeyBsZWZ0OiBjbGllbnRYTGVmdCwgd2lkdGggfSA9IHRoaXMuX3Jvb3RFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyBtaW4sIG1heCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4ge1xuICAgICAgY2xpZW50WExlZnQsXG4gICAgICB3aWR0aCxcbiAgICAgIG1heFZhbHVlOiBtYXgsXG4gICAgICBtaW5WYWx1ZTogbWluLFxuICAgIH07XG4gIH07XG5cbiAgX2hhbmRsZURyYWdVcGRhdGUgPSAoeyB2YWx1ZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBkcmFnUG9zaXRpb246IHZhbHVlIH0pO1xuICB9O1xuXG4gIF9oYW5kbGVEcmFnRW5kID0gKHsgbWFuYWdlciwgdmFsdWUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICBtYW5hZ2VyLnJlc2V0Qm91bmRzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRyYWdQb3NpdGlvbjogbnVsbCB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGxlZnQ7XG4gICAgbGV0IGRyYWdnZXJTdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgICBjb25zdCB7IHBvc2l0aW9uLCBjb2x1bW5SZXNpemVIYW5kbGVIZWlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBkcmFnUG9zaXRpb24gfSA9IHRoaXMuc3RhdGU7XG4gICAgbGVmdCA9IGAke3Bvc2l0aW9uICogMTAwfSVgO1xuICAgIGNvbnN0IGdyaXBTdHlsZSA9IHsgbGVmdCB9O1xuICAgIGxldCBpc0RyYWdnaW5nTGVmdCA9IGZhbHNlO1xuICAgIGxldCBpc0RyYWdnaW5nUmlnaHQgPSBmYWxzZTtcbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXMoKTtcblxuICAgIGlmICh0aGlzLl9kcmFnTWFuYWdlci5pc0RyYWdnaW5nKCkgJiYgdGhpcy5fcm9vdEVsbSAmJiBkcmFnUG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgaXNEcmFnZ2luZ0xlZnQgPSBkcmFnUG9zaXRpb24gPCBwb3NpdGlvbjtcbiAgICAgIGlzRHJhZ2dpbmdSaWdodCA9IGRyYWdQb3NpdGlvbiA+IHBvc2l0aW9uO1xuICAgICAgbGVmdCA9IGAke2RyYWdQb3NpdGlvbiAqIDEwMH0lYDtcbiAgICAgIC8vIERyYXcgYSBoaWdobGlnaHQgZnJvbSB0aGUgY3VycmVudCBkcmFnZ2VkIHBvc2l0aW9uIGJhY2sgdG8gdGhlIG9yaWdpbmFsXG4gICAgICAvLyBwb3NpdGlvbiwgZS5nLiBoaWdobGlnaHQgdGhlIGNoYW5nZS4gRHJhdyB0aGUgaGlnaGxpZ2h0IHZpYSBgbGVmdGAgYW5kXG4gICAgICAvLyBgcmlnaHRgIGNzcyBzdHlsZXMgKHNpbXBsZXIgdGhhbiB1c2luZyBgd2lkdGhgKS5cbiAgICAgIGNvbnN0IGRyYWdnZXJMZWZ0ID0gYCR7TWF0aC5taW4ocG9zaXRpb24sIGRyYWdQb3NpdGlvbikgKiAxMDB9JWA7XG4gICAgICAvLyBzdWJ0cmFjdCAxcHggZm9yIGRyYWdnZXJSaWdodCB0byBkZWFsIHdpdGggdGhlIHJpZ2h0IGJvcmRlciBiZWluZyBvZmZcbiAgICAgIC8vIGJ5IDFweCB3aGVuIGRyYWdnaW5nIGxlZnRcbiAgICAgIGNvbnN0IGRyYWdnZXJSaWdodCA9IGBjYWxjKCR7KDEgLSBNYXRoLm1heChwb3NpdGlvbiwgZHJhZ1Bvc2l0aW9uKSkgKiAxMDB9JSAtIDFweClgO1xuICAgICAgZHJhZ2dlclN0eWxlID0geyBsZWZ0OiBkcmFnZ2VyTGVmdCwgcmlnaHQ6IGRyYWdnZXJSaWdodCB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2VyU3R5bGUgPSBncmlwU3R5bGU7XG4gICAgfVxuICAgIGRyYWdnZXJTdHlsZS5oZWlnaHQgPSBjb2x1bW5SZXNpemVIYW5kbGVIZWlnaHQ7XG5cbiAgICBjb25zdCBpc0RyYWdnaW5nID0gaXNEcmFnZ2luZ0xlZnQgfHwgaXNEcmFnZ2luZ1JpZ2h0O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRpbWVsaW5lQ29sdW1uUmVzaXplcn0gcmVmPXt0aGlzLl9zZXRSb290RWxtfSBkYXRhLXRlc3RpZD1cIlRpbWVsaW5lQ29sdW1uUmVzaXplclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjeChzdHlsZXMuZ3JpcEljb24sIGlzRHJhZ2dpbmcgJiYgc3R5bGVzLmdyaXBJY29uRHJhZ2dpbmcpfVxuICAgICAgICAgIHN0eWxlPXtncmlwU3R5bGV9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJUaW1lbGluZUNvbHVtblJlc2l6ZXItLWdyaXBJY29uXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGFyaWEtaGlkZGVuXG4gICAgICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAgICAgIHN0eWxlcy5kcmFnZ2VyLFxuICAgICAgICAgICAgaXNEcmFnZ2luZyAmJiBzdHlsZXMuZHJhZ2dlckRyYWdnaW5nLFxuICAgICAgICAgICAgaXNEcmFnZ2luZ1JpZ2h0ICYmIHN0eWxlcy5kcmFnZ2VyRHJhZ2dpbmdSaWdodCxcbiAgICAgICAgICAgIGlzRHJhZ2dpbmdMZWZ0ICYmIHN0eWxlcy5kcmFnZ2VyRHJhZ2dpbmdMZWZ0XG4gICAgICAgICAgKX1cbiAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5fZHJhZ01hbmFnZXIuaGFuZGxlTW91c2VEb3dufVxuICAgICAgICAgIHN0eWxlPXtkcmFnZ2VyU3R5bGV9XG4gICAgICAgICAgZGF0YS10ZXN0aWQ9XCJUaW1lbGluZUNvbHVtblJlc2l6ZXItLWRyYWdnZXJcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixPQUFPLEtBQUtDLEtBQUssTUFBTSxPQUFPO0FBRTlCLFNBQVNDLGFBQWEsUUFBUSxhQUFhO0FBRzNDLE9BQU9DLGdCQUFnQixNQUEyQyw4QkFBOEI7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBRWpHLE9BQU8sSUFBTUMsU0FBUyxHQUFHTixhQUFhLENBQUMsWUFBTTtFQUMzQyxPQUFPO0lBQ0xPLHFCQUFxQixFQUFFVixHQUFHLENBQUFXLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQSx5RkFLekI7SUFDREMsT0FBTyxFQUFFYixHQUFHLENBQUFjLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFGLDJCQUFBLDBFQUlY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O01BQ0E7TUFDQTtNQUNBLElBQU00QixXQUFXLEdBQU1DLElBQUksQ0FBQ3JDLEdBQUcsQ0FBQzZCLFFBQVEsRUFBRXJCLFlBQVksQ0FBQyxHQUFHLEdBQUcsTUFBRztNQUNoRTtNQUNBO01BQ0EsSUFBTThCLFlBQVksYUFBVyxDQUFDLENBQUMsR0FBR0QsSUFBSSxDQUFDcEMsR0FBRyxDQUFDNEIsUUFBUSxFQUFFckIsWUFBWSxDQUFDLElBQUksR0FBRyxhQUFVO01BQ25GbUIsWUFBWSxHQUFHO1FBQUU5QixJQUFJLEVBQUV1QyxXQUFXO1FBQUVHLEtBQUssRUFBRUQ7TUFBYSxDQUFDO0lBQzNELENBQUMsTUFBTTtNQUNMWCxZQUFZLEdBQUdJLFNBQVM7SUFDMUI7SUFDQUosWUFBWSxDQUFDYSxNQUFNLEdBQUdWLHdCQUF3QjtJQUU5QyxJQUFNSyxVQUFVLEdBQUdILGNBQWMsSUFBSUMsZUFBZTtJQUNwRCxvQkFDRW5FLEtBQUE7TUFBSzJFLFNBQVMsRUFBRVAsTUFBTSxDQUFDbEUscUJBQXNCO01BQUMwRSxHQUFHLEVBQUUsSUFBSSxDQUFDckQsV0FBWTtNQUFDLGVBQVksdUJBQXVCO01BQUFzRCxRQUFBLGdCQUN0Ry9FLElBQUE7UUFDRTZFLFNBQVMsRUFBRWxGLEVBQUUsQ0FBQzJFLE1BQU0sQ0FBQ3JELFFBQVEsRUFBRXNELFVBQVUsSUFBSUQsTUFBTSxDQUFDbkQsZ0JBQWdCLENBQUU7UUFDdEU2RCxLQUFLLEVBQUViLFNBQVU7UUFDakIsZUFBWTtNQUFpQyxDQUM5QyxDQUFDLGVBQ0ZuRSxJQUFBO1FBQ0UsbUJBQVc7UUFDWDZFLFNBQVMsRUFBRWxGLEVBQUUsQ0FDWDJFLE1BQU0sQ0FBQzdELE9BQU8sRUFDZDhELFVBQVUsSUFBSUQsTUFBTSxDQUFDM0QsZUFBZSxFQUNwQzBELGVBQWUsSUFBSUMsTUFBTSxDQUFDdkQsb0JBQW9CLEVBQzlDcUQsY0FBYyxJQUFJRSxNQUFNLENBQUN6RCxtQkFDM0IsQ0FBRTtRQUNGb0UsV0FBVyxFQUFFLElBQUksQ0FBQy9CLFlBQVksQ0FBQ2dDLGVBQWdCO1FBQy9DRixLQUFLLEVBQUVqQixZQUFhO1FBQ3BCLGVBQVk7TUFBZ0MsQ0FDN0MsQ0FBQztJQUFBLENBQ0MsQ0FBQztFQUVWLENBQUM7RUFBQSxPQUFBM0QscUJBQUE7QUFBQSxFQXpHZ0RSLEtBQUssQ0FBQ3VGLGFBQWE7QUFBQSxTQUFqRC9FLHFCQUFxQixJQUFBZ0YsT0FBQSIsImlnbm9yZUxpc3QiOltdfQ==