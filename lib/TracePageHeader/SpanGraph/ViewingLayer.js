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
import { withTheme2, stylesFactory, Button } from '@grafana/ui';
import { autoColor } from '../../Theme';
import DraggableManager, { EUpdateTypes } from '../../utils/DraggableManager';
import GraphTicks from './GraphTicks';
import Scrubber from './Scrubber';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var getStyles = stylesFactory(function (theme) {
  // Need this cause emotion will merge emotion generated classes into single className if used with cx from emotion
  // package and the selector won't work
  var ViewingLayerResetZoomHoverClassName = 'JaegerUiComponents__ViewingLayerResetZoomHoverClassName';
  var ViewingLayerResetZoom = css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n    label: ViewingLayerResetZoom;\n    display: none;\n    position: absolute;\n    right: 1%;\n    top: 10%;\n    z-index: 1;\n  "])));
  return {
    ViewingLayer: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: ViewingLayer;\n      cursor: vertical-text;\n      position: relative;\n      z-index: 1;\n      &:hover > .", " {\n        display: unset;\n      }\n    "])), ViewingLayerResetZoomHoverClassName),
    ViewingLayerGraph: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: ViewingLayerGraph;\n      border: 1px solid ", ";\n      /* need !important here to overcome something from semantic UI */\n      overflow: visible !important;\n      position: relative;\n      transform-origin: 0 0;\n      width: 100%;\n    "])), autoColor(theme, '#999')),
    ViewingLayerInactive: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: ViewingLayerInactive;\n      fill: ", ";\n    "])), autoColor(theme, 'rgba(214, 214, 214, 0.5)')),
    ViewingLayerCursorGuide: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: ViewingLayerCursorGuide;\n      stroke: ", ";\n      stroke-width: 1;\n    "])), autoColor(theme, '#f44')),
    ViewingLayerDraggedShift: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      label: ViewingLayerDraggedShift;\n      fill-opacity: 0.2;\n    "]))),
    ViewingLayerDrag: css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n      label: ViewingLayerDrag;\n      fill: ", ";\n    "])), autoColor(theme, '#44f')),
    ViewingLayerFullOverlay: css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n      label: ViewingLayerFullOverlay;\n      bottom: 0;\n      cursor: col-resize;\n      left: 0;\n      position: fixed;\n      right: 0;\n      top: 0;\n      user-select: none;\n    "]))),
    ViewingLayerResetZoom: ViewingLayerResetZoom,
    ViewingLayerResetZoomHoverClassName: ViewingLayerResetZoomHoverClassName
  };
});
/**
 * Designate the tags for the different dragging managers. Exported for tests.
 */
export var dragTypes = {
  /**
   * Tag for dragging the right scrubber, e.g. end of the current view range.
   */
  SHIFT_END: 'SHIFT_END',
  /**
   * Tag for dragging the left scrubber, e.g. start of the current view range.
   */
  SHIFT_START: 'SHIFT_START',
  /**
   * Tag for dragging a new view range.
   */
  REFRAME: 'REFRAME'
};

/**
 * Returns the layout information for drawing the view-range differential, e.g.
 * show what will change when the mouse is released. Basically, this is the
 * difference from the start of the drag to the current position.
 *
 * @returns {{ x: string, width: string, leadginX: string }}
 */
function getNextViewLayout(start, position) {
  var _ref = start < position ? [start, position] : [position, start],
    left = _ref[0],
    right = _ref[1];
  return {
    x: left * 100 + "%",
    width: (right - left) * 100 + "%",
    leadingX: position * 100 + "%"
  };
}

/**
 * `ViewingLayer` is rendered on top of the Canvas rendering of the minimap and
 * handles showing the current view range and handles mouse UX for modifying it.
 */
export var UnthemedViewingLayer = /*#__PURE__*/function (_React$PureComponent) {
  /**
   * `_draggerReframe` handles clicking and dragging on the `ViewingLayer` to
   * redefined the view range.
   */

  /**
   * `_draggerStart` handles dragging the left scrubber to adjust the start of
   * the view range.
   */

  /**
   * `_draggerEnd` handles dragging the right scrubber to adjust the end of
   * the view range.
   */

  function UnthemedViewingLayer(props) {
    var _this;
    _this = _React$PureComponent.call(this, props) || this;
    _this._setRoot = function (elm) {
      _this._root = elm;
    };
    _this._getDraggingBounds = function (tag) {
      if (!_this._root) {
        throw new Error('invalid state');
      }
      var _this$_root$getBoundi = _this._root.getBoundingClientRect(),
        clientXLeft = _this$_root$getBoundi.left,
        width = _this$_root$getBoundi.width;
      var _this$props$viewRange = _this.props.viewRange.time.current,
        viewStart = _this$props$viewRange[0],
        viewEnd = _this$props$viewRange[1];
      var maxValue = 1;
      var minValue = 0;
      if (tag === dragTypes.SHIFT_START) {
        maxValue = viewEnd;
      } else if (tag === dragTypes.SHIFT_END) {
        minValue = viewStart;
      }
      return {
        clientXLeft: clientXLeft,
        maxValue: maxValue,
        minValue: minValue,
        width: width
      };
    };
    _this._handleReframeMouseMove = function (_ref2) {
      var value = _ref2.value;
      _this.props.updateNextViewRangeTime({
        cursor: value
      });
    };
    _this._handleReframeMouseLeave = function () {
      _this.props.updateNextViewRangeTime({
        cursor: null
      });
    };
    _this._handleReframeDragUpdate = function (_ref3) {
      var value = _ref3.value;
      var shift = value;
      var time = _this.props.viewRange.time;
      var anchor = time.reframe ? time.reframe.anchor : shift;
      var update = {
        reframe: {
          anchor: anchor,
          shift: shift
        }
      };
      _this.props.updateNextViewRangeTime(update);
    };
    _this._handleReframeDragEnd = function (_ref4) {
      var manager = _ref4.manager,
        value = _ref4.value;
      var time = _this.props.viewRange.time;
      var anchor = time.reframe ? time.reframe.anchor : value;
      var _ref5 = value < anchor ? [value, anchor] : [anchor, value],
        start = _ref5[0],
        end = _ref5[1];
      manager.resetBounds();
      _this.props.updateViewRangeTime(start, end, 'minimap');
    };
    _this._handleScrubberEnterLeave = function (_ref6) {
      var type = _ref6.type;
      var preventCursorLine = type === EUpdateTypes.MouseEnter;
      _this.setState({
        preventCursorLine: preventCursorLine
      });
    };
    _this._handleScrubberDragUpdate = function (_ref7) {
      var event = _ref7.event,
        tag = _ref7.tag,
        type = _ref7.type,
        value = _ref7.value;
      if (type === EUpdateTypes.DragStart) {
        event.stopPropagation();
      }
      if (tag === dragTypes.SHIFT_START) {
        _this.props.updateNextViewRangeTime({
          shiftStart: value
        });
      } else if (tag === dragTypes.SHIFT_END) {
        _this.props.updateNextViewRangeTime({
          shiftEnd: value
        });
      }
    };
    _this._handleScrubberDragEnd = function (_ref8) {
      var manager = _ref8.manager,
        tag = _ref8.tag,
        value = _ref8.value;
      var _this$props$viewRange2 = _this.props.viewRange.time.current,
        viewStart = _this$props$viewRange2[0],
        viewEnd = _this$props$viewRange2[1];
      var update;
      if (tag === dragTypes.SHIFT_START) {
        update = [value, viewEnd];
      } else if (tag === dragTypes.SHIFT_END) {
        update = [viewStart, value];
      } else {
        // to satisfy flow
        throw new Error('bad state');
      }
      manager.resetBounds();
      _this.setState({
        preventCursorLine: false
      });
      _this.props.updateViewRangeTime(update[0], update[1], 'minimap');
    };
    /**
     * Resets the zoom to fully zoomed out.
     */
    _this._resetTimeZoomClickHandler = function () {
      _this.props.updateViewRangeTime(0, 1);
    };
    _this._draggerReframe = new DraggableManager({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleReframeDragEnd,
      onDragMove: _this._handleReframeDragUpdate,
      onDragStart: _this._handleReframeDragUpdate,
      onMouseMove: _this._handleReframeMouseMove,
      onMouseLeave: _this._handleReframeMouseLeave,
      tag: dragTypes.REFRAME
    });
    _this._draggerStart = new DraggableManager({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleScrubberDragEnd,
      onDragMove: _this._handleScrubberDragUpdate,
      onDragStart: _this._handleScrubberDragUpdate,
      onMouseEnter: _this._handleScrubberEnterLeave,
      onMouseLeave: _this._handleScrubberEnterLeave,
      tag: dragTypes.SHIFT_START
    });
    _this._draggerEnd = new DraggableManager({
      getBounds: _this._getDraggingBounds,
      onDragEnd: _this._handleScrubberDragEnd,
      onDragMove: _this._handleScrubberDragUpdate,
      onDragStart: _this._handleScrubberDragUpdate,
      onMouseEnter: _this._handleScrubberEnterLeave,
      onMouseLeave: _this._handleScrubberEnterLeave,
      tag: dragTypes.SHIFT_END
    });
    _this._root = undefined;
    _this.state = {
      preventCursorLine: false
    };
    return _this;
  }
  _inheritsLoose(UnthemedViewingLayer, _React$PureComponent);
  var _proto = UnthemedViewingLayer.prototype;
  _proto.componentWillUnmount = function componentWillUnmount() {
    this._draggerReframe.dispose();
    this._draggerEnd.dispose();
    this._draggerStart.dispose();
  };
  /**
   * Renders the difference between where the drag started and the current
   * position, e.g. the red or blue highlight.
   *
   * @returns React.Node[]
   */
  _proto._getMarkers = function _getMarkers(from, to) {
    var styles = getStyles(this.props.theme);
    var layout = getNextViewLayout(from, to);
    return [/*#__PURE__*/_jsx("rect", {
      className: cx(styles.ViewingLayerDraggedShift, styles.ViewingLayerDrag),
      x: layout.x,
      y: "0",
      width: layout.width,
      height: this.props.height - 2
    }, "fill"), /*#__PURE__*/_jsx("rect", {
      className: cx(styles.ViewingLayerDrag),
      x: layout.leadingX,
      y: "0",
      width: "1",
      height: this.props.height - 2
    }, "edge")];
  };
  _proto.render = function render() {
    var _this$props = this.props,
      height = _this$props.height,
      viewRange = _this$props.viewRange,
      numTicks = _this$props.numTicks,
      theme = _this$props.theme;
    var preventCursorLine = this.state.preventCursorLine;
    var _viewRange$time = viewRange.time,
      current = _viewRange$time.current,
      cursor = _viewRange$time.cursor,
      shiftStart = _viewRange$time.shiftStart,
      shiftEnd = _viewRange$time.shiftEnd,
      reframe = _viewRange$time.reframe;
    var haveNextTimeRange = shiftStart != null || shiftEnd != null || reframe != null;
    var viewStart = current[0],
      viewEnd = current[1];
    var leftInactive = 0;
    if (viewStart) {
      leftInactive = viewStart * 100;
    }
    var rightInactive = 100;
    if (viewEnd) {
      rightInactive = 100 - viewEnd * 100;
    }
    var cursorPosition;
    if (!haveNextTimeRange && cursor != null && !preventCursorLine) {
      cursorPosition = cursor * 100 + "%";
    }
    var styles = getStyles(theme);
    return /*#__PURE__*/_jsxs("div", {
      "aria-hidden": true,
      className: styles.ViewingLayer,
      style: {
        height: height
      },
      children: [(viewStart !== 0 || viewEnd !== 1) && /*#__PURE__*/_jsx(Button, {
        onClick: this._resetTimeZoomClickHandler,
        className: cx(styles.ViewingLayerResetZoom, styles.ViewingLayerResetZoomHoverClassName),
        type: "button",
        variant: "secondary",
        children: "Reset Selection"
      }), /*#__PURE__*/_jsxs("svg", {
        height: height,
        className: styles.ViewingLayerGraph,
        ref: this._setRoot,
        onMouseDown: this._draggerReframe.handleMouseDown,
        onMouseLeave: this._draggerReframe.handleMouseLeave,
        onMouseMove: this._draggerReframe.handleMouseMove,
        children: [leftInactive > 0 && /*#__PURE__*/_jsx("rect", {
          x: 0,
          y: 0,
          height: "100%",
          width: leftInactive + "%",
          className: styles.ViewingLayerInactive,
          "data-testid": "left-ViewingLayerInactive"
        }), rightInactive > 0 && /*#__PURE__*/_jsx("rect", {
          x: 100 - rightInactive + "%",
          y: 0,
          height: "100%",
          width: rightInactive + "%",
          className: styles.ViewingLayerInactive,
          "data-testid": "right-ViewingLayerInactive"
        }), /*#__PURE__*/_jsx(GraphTicks, {
          numTicks: numTicks
        }), cursorPosition && /*#__PURE__*/_jsx("line", {
          className: styles.ViewingLayerCursorGuide,
          x1: cursorPosition,
          y1: "0",
          x2: cursorPosition,
          y2: height - 2,
          strokeWidth: "1",
          "data-testid": "ViewingLayerCursorGuide"
        }), shiftStart != null && this._getMarkers(viewStart, shiftStart), shiftEnd != null && this._getMarkers(viewEnd, shiftEnd), /*#__PURE__*/_jsx(Scrubber, {
          isDragging: shiftStart != null,
          onMouseDown: this._draggerStart.handleMouseDown,
          onMouseEnter: this._draggerStart.handleMouseEnter,
          onMouseLeave: this._draggerStart.handleMouseLeave,
          position: viewStart || 0
        }), /*#__PURE__*/_jsx(Scrubber, {
          isDragging: shiftEnd != null,
          position: viewEnd || 1,
          onMouseDown: this._draggerEnd.handleMouseDown,
          onMouseEnter: this._draggerEnd.handleMouseEnter,
          onMouseLeave: this._draggerEnd.handleMouseLeave
        }), reframe != null && this._getMarkers(reframe.anchor, reframe.shift)]
      }), haveNextTimeRange && /*#__PURE__*/_jsx("div", {
        className: styles.ViewingLayerFullOverlay
      })]
    });
  };
  return UnthemedViewingLayer;
}(React.PureComponent);
export default withTheme2(UnthemedViewingLayer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0Iiwid2l0aFRoZW1lMiIsInN0eWxlc0ZhY3RvcnkiLCJCdXR0b24iLCJhdXRvQ29sb3IiLCJEcmFnZ2FibGVNYW5hZ2VyIiwiRVVwZGF0ZVR5cGVzIiwiR3JhcGhUaWNrcyIsIlNjcnViYmVyIiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsImdldFN0eWxlcyIsInRoZW1lIiwiVmlld2luZ0xheWVyUmVzZXRab29tSG92ZXJDbGFzc05hbWUiLCJWaWV3aW5nTGF5ZXJSZXNldFpvb20iLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJWaWV3aW5nTGF5ZXIiLCJfdGVtcGxhdGVPYmplY3QyIiwiVmlld2luZ0xheWVyR3JhcGgiLCJfdGVtcGxhdGVPYmplY3QzIiwiVmlld2luZ0xheWVySW5hY3RpdmUiLCJfdGVtcGxhdGVPYmplY3Q0IiwiVmlld2luZ0xheWVyQ3Vyc29yR3VpZGUiLCJfdGVtcGxhdGVPYmplY3Q1IiwiVmlld2luZ0xheWVyRHJhZ2dlZFNoaWZ0IiwiX3RlbXBsYXRlT2JqZWN0NiIsIlZpZXdpbmdMYXllckRyYWciLCJfdGVtcGxhdGVPYmplY3Q3IiwiVmlld2luZ0xheWVyRnVsbE92ZXJsYXkiLCJfdGVtcGxhdGVPYmplY3Q4IiwiZHJhZ1R5cGVzIiwiU0hJRlRfRU5EIiwiU0hJRlRfU1RBUlQiLCJSRUZSQU1FIiwiZ2V0TmV4dFZpZXdMYXlvdXQiLCJzdGFydCIsInBvc2l0aW9uIiwiX3JlZiIsImxlZnQiLCJyaWdodCIsIngiLCJ3aWR0aCIsImxlYWRpbmdYIiwiVW50aGVtZWRWaWV3aW5nTGF5ZXIiLCJfUmVhY3QkUHVyZUNvbXBvbmVudCIsInByb3BzIiwiX3RoaXMiLCJjYWxsIiwiX3NldFJvb3QiLCJlbG0iLCJfcm9vdCIsIl9nZXREcmFnZ2luZ0JvdW5kcyIsInRhZyIsIkVycm9yIiwiX3RoaXMkX3Jvb3QkZ2V0Qm91bmRpIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WExlZnQiLCJfdGhpcyRwcm9wcyR2aWV3UmFuZ2UiLCJ2aWV3UmFuZ2UiLCJ0aW1lIiwiY3VycmVudCIsInZpZXdTdGFydCIsInZpZXdFbmQiLCJtYXhWYWx1ZSIsIm1pblZhbHVlIiwiX2hhbmRsZVJlZnJhbWVNb3VzZU1vdmUiLCJfcmVmMiIsInZhbHVlIiwidXBkYXRlTmV4dFZpZXdSYW5nZVRpbWUiLCJjdXJzb3IiLCJfaGFuZGxlUmVmcmFtZU1vdXNlTGVhdmUiLCJfaGFuZGxlUmVmcmFtZURyYWdVcGRhdGUiLCJfcmVmMyIsInNoaWZ0IiwiYW5jaG9yIiwicmVmcmFtZSIsInVwZGF0ZSIsIl9oYW5kbGVSZWZyYW1lRHJhZ0VuZCIsIl9yZWY0IiwibWFuYWdlciIsIl9yZWY1IiwiZW5kIiwicmVzZXRCb3VuZHMiLCJ1cGRhdGVWaWV3UmFuZ2VUaW1lIiwiX2hhbmRsZVNjcnViYmVyRW50ZXJMZWF2ZSIsIl9yZWY2IiwidHlwZSIsInByZXZlbnRDdXJzb3JMaW5lIiwiTW91c2VFbnRlciIsInNldFN0YXRlIiwiX2hhbmRsZVNjcnViYmVyRHJhZ1VwZGF0ZSIsIl9yZWY3IiwiZXZlbnQiLCJEcmFnU3RhcnQiLCJzdG9wUHJvcGFnYXRpb24iLCJzaGlmdFN0YXJ0Iiwic2hpZnRFbmQiLCJfaGFuZGxlU2NydWJiZXJEcmFnRW5kIiwiX3JlZjgiLCJfdGhpcyRwcm9wcyR2aWV3UmFuZ2UyIiwiX3Jlc2V0VGltZVpvb21DbGlja0hhbmRsZXIiLCJfZHJhZ2dlclJlZnJhbWUiLCJnZXRCb3VuZHMiLCJvbkRyYWdFbmQiLCJvbkRyYWdNb3ZlIiwib25EcmFnU3RhcnQiLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VMZWF2ZSIsIl9kcmFnZ2VyU3RhcnQiLCJvbk1vdXNlRW50ZXIiLCJfZHJhZ2dlckVuZCIsInVuZGVmaW5lZCIsInN0YXRlIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRpc3Bvc2UiLCJfZ2V0TWFya2VycyIsImZyb20iLCJ0byIsInN0eWxlcyIsImxheW91dCIsImNsYXNzTmFtZSIsInkiLCJoZWlnaHQiLCJyZW5kZXIiLCJfdGhpcyRwcm9wcyIsIm51bVRpY2tzIiwiX3ZpZXdSYW5nZSR0aW1lIiwiaGF2ZU5leHRUaW1lUmFuZ2UiLCJsZWZ0SW5hY3RpdmUiLCJyaWdodEluYWN0aXZlIiwiY3Vyc29yUG9zaXRpb24iLCJzdHlsZSIsImNoaWxkcmVuIiwib25DbGljayIsInZhcmlhbnQiLCJyZWYiLCJvbk1vdXNlRG93biIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZU1vdXNlTGVhdmUiLCJoYW5kbGVNb3VzZU1vdmUiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInN0cm9rZVdpZHRoIiwiaXNEcmFnZ2luZyIsImhhbmRsZU1vdXNlRW50ZXIiLCJQdXJlQ29tcG9uZW50Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1RyYWNlUGFnZUhlYWRlci9TcGFuR3JhcGgvVmlld2luZ0xheWVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR3JhZmFuYVRoZW1lMiB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgd2l0aFRoZW1lMiwgc3R5bGVzRmFjdG9yeSwgQnV0dG9uIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBUVXBkYXRlVmlld1JhbmdlVGltZUZ1bmN0aW9uLCBWaWV3UmFuZ2UsIFZpZXdSYW5nZVRpbWVVcGRhdGUsIFROaWwgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi8uLi9UaGVtZSc7XG5pbXBvcnQgRHJhZ2dhYmxlTWFuYWdlciwgeyBEcmFnZ2FibGVCb3VuZHMsIERyYWdnaW5nVXBkYXRlLCBFVXBkYXRlVHlwZXMgfSBmcm9tICcuLi8uLi91dGlscy9EcmFnZ2FibGVNYW5hZ2VyJztcblxuaW1wb3J0IEdyYXBoVGlja3MgZnJvbSAnLi9HcmFwaFRpY2tzJztcbmltcG9ydCBTY3J1YmJlciBmcm9tICcuL1NjcnViYmVyJztcblxuZXhwb3J0IGNvbnN0IGdldFN0eWxlcyA9IHN0eWxlc0ZhY3RvcnkoKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIC8vIE5lZWQgdGhpcyBjYXVzZSBlbW90aW9uIHdpbGwgbWVyZ2UgZW1vdGlvbiBnZW5lcmF0ZWQgY2xhc3NlcyBpbnRvIHNpbmdsZSBjbGFzc05hbWUgaWYgdXNlZCB3aXRoIGN4IGZyb20gZW1vdGlvblxuICAvLyBwYWNrYWdlIGFuZCB0aGUgc2VsZWN0b3Igd29uJ3Qgd29ya1xuICBjb25zdCBWaWV3aW5nTGF5ZXJSZXNldFpvb21Ib3ZlckNsYXNzTmFtZSA9ICdKYWVnZXJVaUNvbXBvbmVudHNfX1ZpZXdpbmdMYXllclJlc2V0Wm9vbUhvdmVyQ2xhc3NOYW1lJztcbiAgY29uc3QgVmlld2luZ0xheWVyUmVzZXRab29tID0gY3NzYFxuICAgIGxhYmVsOiBWaWV3aW5nTGF5ZXJSZXNldFpvb207XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDElO1xuICAgIHRvcDogMTAlO1xuICAgIHotaW5kZXg6IDE7XG4gIGA7XG4gIHJldHVybiB7XG4gICAgVmlld2luZ0xheWVyOiBjc3NgXG4gICAgICBsYWJlbDogVmlld2luZ0xheWVyO1xuICAgICAgY3Vyc29yOiB2ZXJ0aWNhbC10ZXh0O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgei1pbmRleDogMTtcbiAgICAgICY6aG92ZXIgPiAuJHtWaWV3aW5nTGF5ZXJSZXNldFpvb21Ib3ZlckNsYXNzTmFtZX0ge1xuICAgICAgICBkaXNwbGF5OiB1bnNldDtcbiAgICAgIH1cbiAgICBgLFxuICAgIFZpZXdpbmdMYXllckdyYXBoOiBjc3NgXG4gICAgICBsYWJlbDogVmlld2luZ0xheWVyR3JhcGg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyM5OTknKX07XG4gICAgICAvKiBuZWVkICFpbXBvcnRhbnQgaGVyZSB0byBvdmVyY29tZSBzb21ldGhpbmcgZnJvbSBzZW1hbnRpYyBVSSAqL1xuICAgICAgb3ZlcmZsb3c6IHZpc2libGUgIWltcG9ydGFudDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIGAsXG4gICAgVmlld2luZ0xheWVySW5hY3RpdmU6IGNzc2BcbiAgICAgIGxhYmVsOiBWaWV3aW5nTGF5ZXJJbmFjdGl2ZTtcbiAgICAgIGZpbGw6ICR7YXV0b0NvbG9yKHRoZW1lLCAncmdiYSgyMTQsIDIxNCwgMjE0LCAwLjUpJyl9O1xuICAgIGAsXG4gICAgVmlld2luZ0xheWVyQ3Vyc29yR3VpZGU6IGNzc2BcbiAgICAgIGxhYmVsOiBWaWV3aW5nTGF5ZXJDdXJzb3JHdWlkZTtcbiAgICAgIHN0cm9rZTogJHthdXRvQ29sb3IodGhlbWUsICcjZjQ0Jyl9O1xuICAgICAgc3Ryb2tlLXdpZHRoOiAxO1xuICAgIGAsXG4gICAgVmlld2luZ0xheWVyRHJhZ2dlZFNoaWZ0OiBjc3NgXG4gICAgICBsYWJlbDogVmlld2luZ0xheWVyRHJhZ2dlZFNoaWZ0O1xuICAgICAgZmlsbC1vcGFjaXR5OiAwLjI7XG4gICAgYCxcbiAgICBWaWV3aW5nTGF5ZXJEcmFnOiBjc3NgXG4gICAgICBsYWJlbDogVmlld2luZ0xheWVyRHJhZztcbiAgICAgIGZpbGw6ICR7YXV0b0NvbG9yKHRoZW1lLCAnIzQ0ZicpfTtcbiAgICBgLFxuICAgIFZpZXdpbmdMYXllckZ1bGxPdmVybGF5OiBjc3NgXG4gICAgICBsYWJlbDogVmlld2luZ0xheWVyRnVsbE92ZXJsYXk7XG4gICAgICBib3R0b206IDA7XG4gICAgICBjdXJzb3I6IGNvbC1yZXNpemU7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICB0b3A6IDA7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBgLFxuICAgIFZpZXdpbmdMYXllclJlc2V0Wm9vbSxcbiAgICBWaWV3aW5nTGF5ZXJSZXNldFpvb21Ib3ZlckNsYXNzTmFtZSxcbiAgfTtcbn0pO1xuXG5leHBvcnQgdHlwZSBWaWV3aW5nTGF5ZXJQcm9wcyA9IHtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIG51bVRpY2tzOiBudW1iZXI7XG4gIHVwZGF0ZVZpZXdSYW5nZVRpbWU6IFRVcGRhdGVWaWV3UmFuZ2VUaW1lRnVuY3Rpb247XG4gIHVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lOiAodXBkYXRlOiBWaWV3UmFuZ2VUaW1lVXBkYXRlKSA9PiB2b2lkO1xuICB2aWV3UmFuZ2U6IFZpZXdSYW5nZTtcbiAgdGhlbWU6IEdyYWZhbmFUaGVtZTI7XG59O1xuXG50eXBlIFZpZXdpbmdMYXllclN0YXRlID0ge1xuICAvKipcbiAgICogQ3Vyc29yIGxpbmUgc2hvdWxkIG5vdCBiZSBkcmF3biB3aGVuIHRoZSBtb3VzZSBpcyBvdmVyIHRoZSBzY3J1YmJlciBoYW5kbGUuXG4gICAqL1xuICBwcmV2ZW50Q3Vyc29yTGluZTogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogRGVzaWduYXRlIHRoZSB0YWdzIGZvciB0aGUgZGlmZmVyZW50IGRyYWdnaW5nIG1hbmFnZXJzLiBFeHBvcnRlZCBmb3IgdGVzdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBkcmFnVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBUYWcgZm9yIGRyYWdnaW5nIHRoZSByaWdodCBzY3J1YmJlciwgZS5nLiBlbmQgb2YgdGhlIGN1cnJlbnQgdmlldyByYW5nZS5cbiAgICovXG4gIFNISUZUX0VORDogJ1NISUZUX0VORCcsXG4gIC8qKlxuICAgKiBUYWcgZm9yIGRyYWdnaW5nIHRoZSBsZWZ0IHNjcnViYmVyLCBlLmcuIHN0YXJ0IG9mIHRoZSBjdXJyZW50IHZpZXcgcmFuZ2UuXG4gICAqL1xuICBTSElGVF9TVEFSVDogJ1NISUZUX1NUQVJUJyxcbiAgLyoqXG4gICAqIFRhZyBmb3IgZHJhZ2dpbmcgYSBuZXcgdmlldyByYW5nZS5cbiAgICovXG4gIFJFRlJBTUU6ICdSRUZSQU1FJyxcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGF5b3V0IGluZm9ybWF0aW9uIGZvciBkcmF3aW5nIHRoZSB2aWV3LXJhbmdlIGRpZmZlcmVudGlhbCwgZS5nLlxuICogc2hvdyB3aGF0IHdpbGwgY2hhbmdlIHdoZW4gdGhlIG1vdXNlIGlzIHJlbGVhc2VkLiBCYXNpY2FsbHksIHRoaXMgaXMgdGhlXG4gKiBkaWZmZXJlbmNlIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBkcmFnIHRvIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICpcbiAqIEByZXR1cm5zIHt7IHg6IHN0cmluZywgd2lkdGg6IHN0cmluZywgbGVhZGdpblg6IHN0cmluZyB9fVxuICovXG5mdW5jdGlvbiBnZXROZXh0Vmlld0xheW91dChzdGFydDogbnVtYmVyLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gIGNvbnN0IFtsZWZ0LCByaWdodF0gPSBzdGFydCA8IHBvc2l0aW9uID8gW3N0YXJ0LCBwb3NpdGlvbl0gOiBbcG9zaXRpb24sIHN0YXJ0XTtcbiAgcmV0dXJuIHtcbiAgICB4OiBgJHtsZWZ0ICogMTAwfSVgLFxuICAgIHdpZHRoOiBgJHsocmlnaHQgLSBsZWZ0KSAqIDEwMH0lYCxcbiAgICBsZWFkaW5nWDogYCR7cG9zaXRpb24gKiAxMDB9JWAsXG4gIH07XG59XG5cbi8qKlxuICogYFZpZXdpbmdMYXllcmAgaXMgcmVuZGVyZWQgb24gdG9wIG9mIHRoZSBDYW52YXMgcmVuZGVyaW5nIG9mIHRoZSBtaW5pbWFwIGFuZFxuICogaGFuZGxlcyBzaG93aW5nIHRoZSBjdXJyZW50IHZpZXcgcmFuZ2UgYW5kIGhhbmRsZXMgbW91c2UgVVggZm9yIG1vZGlmeWluZyBpdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFVudGhlbWVkVmlld2luZ0xheWVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxWaWV3aW5nTGF5ZXJQcm9wcywgVmlld2luZ0xheWVyU3RhdGU+IHtcbiAgc3RhdGU6IFZpZXdpbmdMYXllclN0YXRlO1xuXG4gIF9yb290OiBFbGVtZW50IHwgVE5pbDtcblxuICAvKipcbiAgICogYF9kcmFnZ2VyUmVmcmFtZWAgaGFuZGxlcyBjbGlja2luZyBhbmQgZHJhZ2dpbmcgb24gdGhlIGBWaWV3aW5nTGF5ZXJgIHRvXG4gICAqIHJlZGVmaW5lZCB0aGUgdmlldyByYW5nZS5cbiAgICovXG4gIF9kcmFnZ2VyUmVmcmFtZTogRHJhZ2dhYmxlTWFuYWdlcjtcblxuICAvKipcbiAgICogYF9kcmFnZ2VyU3RhcnRgIGhhbmRsZXMgZHJhZ2dpbmcgdGhlIGxlZnQgc2NydWJiZXIgdG8gYWRqdXN0IHRoZSBzdGFydCBvZlxuICAgKiB0aGUgdmlldyByYW5nZS5cbiAgICovXG4gIF9kcmFnZ2VyU3RhcnQ6IERyYWdnYWJsZU1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIGBfZHJhZ2dlckVuZGAgaGFuZGxlcyBkcmFnZ2luZyB0aGUgcmlnaHQgc2NydWJiZXIgdG8gYWRqdXN0IHRoZSBlbmQgb2ZcbiAgICogdGhlIHZpZXcgcmFuZ2UuXG4gICAqL1xuICBfZHJhZ2dlckVuZDogRHJhZ2dhYmxlTWFuYWdlcjtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogVmlld2luZ0xheWVyUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLl9kcmFnZ2VyUmVmcmFtZSA9IG5ldyBEcmFnZ2FibGVNYW5hZ2VyKHtcbiAgICAgIGdldEJvdW5kczogdGhpcy5fZ2V0RHJhZ2dpbmdCb3VuZHMsXG4gICAgICBvbkRyYWdFbmQ6IHRoaXMuX2hhbmRsZVJlZnJhbWVEcmFnRW5kLFxuICAgICAgb25EcmFnTW92ZTogdGhpcy5faGFuZGxlUmVmcmFtZURyYWdVcGRhdGUsXG4gICAgICBvbkRyYWdTdGFydDogdGhpcy5faGFuZGxlUmVmcmFtZURyYWdVcGRhdGUsXG4gICAgICBvbk1vdXNlTW92ZTogdGhpcy5faGFuZGxlUmVmcmFtZU1vdXNlTW92ZSxcbiAgICAgIG9uTW91c2VMZWF2ZTogdGhpcy5faGFuZGxlUmVmcmFtZU1vdXNlTGVhdmUsXG4gICAgICB0YWc6IGRyYWdUeXBlcy5SRUZSQU1FLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fZHJhZ2dlclN0YXJ0ID0gbmV3IERyYWdnYWJsZU1hbmFnZXIoe1xuICAgICAgZ2V0Qm91bmRzOiB0aGlzLl9nZXREcmFnZ2luZ0JvdW5kcyxcbiAgICAgIG9uRHJhZ0VuZDogdGhpcy5faGFuZGxlU2NydWJiZXJEcmFnRW5kLFxuICAgICAgb25EcmFnTW92ZTogdGhpcy5faGFuZGxlU2NydWJiZXJEcmFnVXBkYXRlLFxuICAgICAgb25EcmFnU3RhcnQ6IHRoaXMuX2hhbmRsZVNjcnViYmVyRHJhZ1VwZGF0ZSxcbiAgICAgIG9uTW91c2VFbnRlcjogdGhpcy5faGFuZGxlU2NydWJiZXJFbnRlckxlYXZlLFxuICAgICAgb25Nb3VzZUxlYXZlOiB0aGlzLl9oYW5kbGVTY3J1YmJlckVudGVyTGVhdmUsXG4gICAgICB0YWc6IGRyYWdUeXBlcy5TSElGVF9TVEFSVCxcbiAgICB9KTtcblxuICAgIHRoaXMuX2RyYWdnZXJFbmQgPSBuZXcgRHJhZ2dhYmxlTWFuYWdlcih7XG4gICAgICBnZXRCb3VuZHM6IHRoaXMuX2dldERyYWdnaW5nQm91bmRzLFxuICAgICAgb25EcmFnRW5kOiB0aGlzLl9oYW5kbGVTY3J1YmJlckRyYWdFbmQsXG4gICAgICBvbkRyYWdNb3ZlOiB0aGlzLl9oYW5kbGVTY3J1YmJlckRyYWdVcGRhdGUsXG4gICAgICBvbkRyYWdTdGFydDogdGhpcy5faGFuZGxlU2NydWJiZXJEcmFnVXBkYXRlLFxuICAgICAgb25Nb3VzZUVudGVyOiB0aGlzLl9oYW5kbGVTY3J1YmJlckVudGVyTGVhdmUsXG4gICAgICBvbk1vdXNlTGVhdmU6IHRoaXMuX2hhbmRsZVNjcnViYmVyRW50ZXJMZWF2ZSxcbiAgICAgIHRhZzogZHJhZ1R5cGVzLlNISUZUX0VORCxcbiAgICB9KTtcblxuICAgIHRoaXMuX3Jvb3QgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHByZXZlbnRDdXJzb3JMaW5lOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5fZHJhZ2dlclJlZnJhbWUuZGlzcG9zZSgpO1xuICAgIHRoaXMuX2RyYWdnZXJFbmQuZGlzcG9zZSgpO1xuICAgIHRoaXMuX2RyYWdnZXJTdGFydC5kaXNwb3NlKCk7XG4gIH1cblxuICBfc2V0Um9vdCA9IChlbG06IFNWR0VsZW1lbnQgfCBUTmlsKSA9PiB7XG4gICAgdGhpcy5fcm9vdCA9IGVsbTtcbiAgfTtcblxuICBfZ2V0RHJhZ2dpbmdCb3VuZHMgPSAodGFnOiBzdHJpbmcgfCBUTmlsKTogRHJhZ2dhYmxlQm91bmRzID0+IHtcbiAgICBpZiAoIXRoaXMuX3Jvb3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzdGF0ZScpO1xuICAgIH1cbiAgICBjb25zdCB7IGxlZnQ6IGNsaWVudFhMZWZ0LCB3aWR0aCB9ID0gdGhpcy5fcm9vdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBbdmlld1N0YXJ0LCB2aWV3RW5kXSA9IHRoaXMucHJvcHMudmlld1JhbmdlLnRpbWUuY3VycmVudDtcbiAgICBsZXQgbWF4VmFsdWUgPSAxO1xuICAgIGxldCBtaW5WYWx1ZSA9IDA7XG4gICAgaWYgKHRhZyA9PT0gZHJhZ1R5cGVzLlNISUZUX1NUQVJUKSB7XG4gICAgICBtYXhWYWx1ZSA9IHZpZXdFbmQ7XG4gICAgfSBlbHNlIGlmICh0YWcgPT09IGRyYWdUeXBlcy5TSElGVF9FTkQpIHtcbiAgICAgIG1pblZhbHVlID0gdmlld1N0YXJ0O1xuICAgIH1cbiAgICByZXR1cm4geyBjbGllbnRYTGVmdCwgbWF4VmFsdWUsIG1pblZhbHVlLCB3aWR0aCB9O1xuICB9O1xuXG4gIF9oYW5kbGVSZWZyYW1lTW91c2VNb3ZlID0gKHsgdmFsdWUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lKHsgY3Vyc29yOiB2YWx1ZSB9KTtcbiAgfTtcblxuICBfaGFuZGxlUmVmcmFtZU1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVOZXh0Vmlld1JhbmdlVGltZSh7IGN1cnNvcjogbnVsbCB9KTtcbiAgfTtcblxuICBfaGFuZGxlUmVmcmFtZURyYWdVcGRhdGUgPSAoeyB2YWx1ZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHNoaWZ0ID0gdmFsdWU7XG4gICAgY29uc3QgeyB0aW1lIH0gPSB0aGlzLnByb3BzLnZpZXdSYW5nZTtcbiAgICBjb25zdCBhbmNob3IgPSB0aW1lLnJlZnJhbWUgPyB0aW1lLnJlZnJhbWUuYW5jaG9yIDogc2hpZnQ7XG4gICAgY29uc3QgdXBkYXRlID0geyByZWZyYW1lOiB7IGFuY2hvciwgc2hpZnQgfSB9O1xuICAgIHRoaXMucHJvcHMudXBkYXRlTmV4dFZpZXdSYW5nZVRpbWUodXBkYXRlKTtcbiAgfTtcblxuICBfaGFuZGxlUmVmcmFtZURyYWdFbmQgPSAoeyBtYW5hZ2VyLCB2YWx1ZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgdGltZSB9ID0gdGhpcy5wcm9wcy52aWV3UmFuZ2U7XG4gICAgY29uc3QgYW5jaG9yID0gdGltZS5yZWZyYW1lID8gdGltZS5yZWZyYW1lLmFuY2hvciA6IHZhbHVlO1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHZhbHVlIDwgYW5jaG9yID8gW3ZhbHVlLCBhbmNob3JdIDogW2FuY2hvciwgdmFsdWVdO1xuICAgIG1hbmFnZXIucmVzZXRCb3VuZHMoKTtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVZpZXdSYW5nZVRpbWUoc3RhcnQsIGVuZCwgJ21pbmltYXAnKTtcbiAgfTtcblxuICBfaGFuZGxlU2NydWJiZXJFbnRlckxlYXZlID0gKHsgdHlwZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHByZXZlbnRDdXJzb3JMaW5lID0gdHlwZSA9PT0gRVVwZGF0ZVR5cGVzLk1vdXNlRW50ZXI7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRDdXJzb3JMaW5lIH0pO1xuICB9O1xuXG4gIF9oYW5kbGVTY3J1YmJlckRyYWdVcGRhdGUgPSAoeyBldmVudCwgdGFnLCB0eXBlLCB2YWx1ZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIGlmICh0eXBlID09PSBFVXBkYXRlVHlwZXMuRHJhZ1N0YXJ0KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgaWYgKHRhZyA9PT0gZHJhZ1R5cGVzLlNISUZUX1NUQVJUKSB7XG4gICAgICB0aGlzLnByb3BzLnVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lKHsgc2hpZnRTdGFydDogdmFsdWUgfSk7XG4gICAgfSBlbHNlIGlmICh0YWcgPT09IGRyYWdUeXBlcy5TSElGVF9FTkQpIHtcbiAgICAgIHRoaXMucHJvcHMudXBkYXRlTmV4dFZpZXdSYW5nZVRpbWUoeyBzaGlmdEVuZDogdmFsdWUgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9oYW5kbGVTY3J1YmJlckRyYWdFbmQgPSAoeyBtYW5hZ2VyLCB0YWcsIHZhbHVlIH06IERyYWdnaW5nVXBkYXRlKSA9PiB7XG4gICAgY29uc3QgW3ZpZXdTdGFydCwgdmlld0VuZF0gPSB0aGlzLnByb3BzLnZpZXdSYW5nZS50aW1lLmN1cnJlbnQ7XG4gICAgbGV0IHVwZGF0ZTogW251bWJlciwgbnVtYmVyXTtcbiAgICBpZiAodGFnID09PSBkcmFnVHlwZXMuU0hJRlRfU1RBUlQpIHtcbiAgICAgIHVwZGF0ZSA9IFt2YWx1ZSwgdmlld0VuZF07XG4gICAgfSBlbHNlIGlmICh0YWcgPT09IGRyYWdUeXBlcy5TSElGVF9FTkQpIHtcbiAgICAgIHVwZGF0ZSA9IFt2aWV3U3RhcnQsIHZhbHVlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdG8gc2F0aXNmeSBmbG93XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBzdGF0ZScpO1xuICAgIH1cbiAgICBtYW5hZ2VyLnJlc2V0Qm91bmRzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZlbnRDdXJzb3JMaW5lOiBmYWxzZSB9KTtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVZpZXdSYW5nZVRpbWUodXBkYXRlWzBdLCB1cGRhdGVbMV0sICdtaW5pbWFwJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgem9vbSB0byBmdWxseSB6b29tZWQgb3V0LlxuICAgKi9cbiAgX3Jlc2V0VGltZVpvb21DbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVWaWV3UmFuZ2VUaW1lKDAsIDEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gd2hlcmUgdGhlIGRyYWcgc3RhcnRlZCBhbmQgdGhlIGN1cnJlbnRcbiAgICogcG9zaXRpb24sIGUuZy4gdGhlIHJlZCBvciBibHVlIGhpZ2hsaWdodC5cbiAgICpcbiAgICogQHJldHVybnMgUmVhY3QuTm9kZVtdXG4gICAqL1xuICBfZ2V0TWFya2Vycyhmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXModGhpcy5wcm9wcy50aGVtZSk7XG4gICAgY29uc3QgbGF5b3V0ID0gZ2V0TmV4dFZpZXdMYXlvdXQoZnJvbSwgdG8pO1xuICAgIHJldHVybiBbXG4gICAgICA8cmVjdFxuICAgICAgICBrZXk9XCJmaWxsXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjeChzdHlsZXMuVmlld2luZ0xheWVyRHJhZ2dlZFNoaWZ0LCBzdHlsZXMuVmlld2luZ0xheWVyRHJhZyl9XG4gICAgICAgIHg9e2xheW91dC54fVxuICAgICAgICB5PVwiMFwiXG4gICAgICAgIHdpZHRoPXtsYXlvdXQud2lkdGh9XG4gICAgICAgIGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHQgLSAyfVxuICAgICAgLz4sXG4gICAgICA8cmVjdFxuICAgICAgICBrZXk9XCJlZGdlXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjeChzdHlsZXMuVmlld2luZ0xheWVyRHJhZyl9XG4gICAgICAgIHg9e2xheW91dC5sZWFkaW5nWH1cbiAgICAgICAgeT1cIjBcIlxuICAgICAgICB3aWR0aD1cIjFcIlxuICAgICAgICBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0IC0gMn1cbiAgICAgIC8+LFxuICAgIF07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBoZWlnaHQsIHZpZXdSYW5nZSwgbnVtVGlja3MsIHRoZW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcHJldmVudEN1cnNvckxpbmUgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBjdXJyZW50LCBjdXJzb3IsIHNoaWZ0U3RhcnQsIHNoaWZ0RW5kLCByZWZyYW1lIH0gPSB2aWV3UmFuZ2UudGltZTtcbiAgICBjb25zdCBoYXZlTmV4dFRpbWVSYW5nZSA9IHNoaWZ0U3RhcnQgIT0gbnVsbCB8fCBzaGlmdEVuZCAhPSBudWxsIHx8IHJlZnJhbWUgIT0gbnVsbDtcbiAgICBjb25zdCBbdmlld1N0YXJ0LCB2aWV3RW5kXSA9IGN1cnJlbnQ7XG4gICAgbGV0IGxlZnRJbmFjdGl2ZSA9IDA7XG4gICAgaWYgKHZpZXdTdGFydCkge1xuICAgICAgbGVmdEluYWN0aXZlID0gdmlld1N0YXJ0ICogMTAwO1xuICAgIH1cbiAgICBsZXQgcmlnaHRJbmFjdGl2ZSA9IDEwMDtcbiAgICBpZiAodmlld0VuZCkge1xuICAgICAgcmlnaHRJbmFjdGl2ZSA9IDEwMCAtIHZpZXdFbmQgKiAxMDA7XG4gICAgfVxuICAgIGxldCBjdXJzb3JQb3NpdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGlmICghaGF2ZU5leHRUaW1lUmFuZ2UgJiYgY3Vyc29yICE9IG51bGwgJiYgIXByZXZlbnRDdXJzb3JMaW5lKSB7XG4gICAgICBjdXJzb3JQb3NpdGlvbiA9IGAke2N1cnNvciAqIDEwMH0lYDtcbiAgICB9XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKHRoZW1lKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGFyaWEtaGlkZGVuIGNsYXNzTmFtZT17c3R5bGVzLlZpZXdpbmdMYXllcn0gc3R5bGU9e3sgaGVpZ2h0IH19PlxuICAgICAgICB7KHZpZXdTdGFydCAhPT0gMCB8fCB2aWV3RW5kICE9PSAxKSAmJiAoXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5fcmVzZXRUaW1lWm9vbUNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goc3R5bGVzLlZpZXdpbmdMYXllclJlc2V0Wm9vbSwgc3R5bGVzLlZpZXdpbmdMYXllclJlc2V0Wm9vbUhvdmVyQ2xhc3NOYW1lKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgdmFyaWFudD1cInNlY29uZGFyeVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgUmVzZXQgU2VsZWN0aW9uXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICl9XG4gICAgICAgIDxzdmdcbiAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5WaWV3aW5nTGF5ZXJHcmFwaH1cbiAgICAgICAgICByZWY9e3RoaXMuX3NldFJvb3R9XG4gICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuX2RyYWdnZXJSZWZyYW1lLmhhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuX2RyYWdnZXJSZWZyYW1lLmhhbmRsZU1vdXNlTGVhdmV9XG4gICAgICAgICAgb25Nb3VzZU1vdmU9e3RoaXMuX2RyYWdnZXJSZWZyYW1lLmhhbmRsZU1vdXNlTW92ZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtsZWZ0SW5hY3RpdmUgPiAwICYmIChcbiAgICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICAgIHg9ezB9XG4gICAgICAgICAgICAgIHk9ezB9XG4gICAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgICAgICAgICB3aWR0aD17YCR7bGVmdEluYWN0aXZlfSVgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5WaWV3aW5nTGF5ZXJJbmFjdGl2ZX1cbiAgICAgICAgICAgICAgZGF0YS10ZXN0aWQ9XCJsZWZ0LVZpZXdpbmdMYXllckluYWN0aXZlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7cmlnaHRJbmFjdGl2ZSA+IDAgJiYgKFxuICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAgeD17YCR7MTAwIC0gcmlnaHRJbmFjdGl2ZX0lYH1cbiAgICAgICAgICAgICAgeT17MH1cbiAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICAgICAgICAgIHdpZHRoPXtgJHtyaWdodEluYWN0aXZlfSVgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5WaWV3aW5nTGF5ZXJJbmFjdGl2ZX1cbiAgICAgICAgICAgICAgZGF0YS10ZXN0aWQ9XCJyaWdodC1WaWV3aW5nTGF5ZXJJbmFjdGl2ZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPEdyYXBoVGlja3MgbnVtVGlja3M9e251bVRpY2tzfSAvPlxuICAgICAgICAgIHtjdXJzb3JQb3NpdGlvbiAmJiAoXG4gICAgICAgICAgICA8bGluZVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5WaWV3aW5nTGF5ZXJDdXJzb3JHdWlkZX1cbiAgICAgICAgICAgICAgeDE9e2N1cnNvclBvc2l0aW9ufVxuICAgICAgICAgICAgICB5MT1cIjBcIlxuICAgICAgICAgICAgICB4Mj17Y3Vyc29yUG9zaXRpb259XG4gICAgICAgICAgICAgIHkyPXtoZWlnaHQgLSAyfVxuICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjFcIlxuICAgICAgICAgICAgICBkYXRhLXRlc3RpZD1cIlZpZXdpbmdMYXllckN1cnNvckd1aWRlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7c2hpZnRTdGFydCAhPSBudWxsICYmIHRoaXMuX2dldE1hcmtlcnModmlld1N0YXJ0LCBzaGlmdFN0YXJ0KX1cbiAgICAgICAgICB7c2hpZnRFbmQgIT0gbnVsbCAmJiB0aGlzLl9nZXRNYXJrZXJzKHZpZXdFbmQsIHNoaWZ0RW5kKX1cbiAgICAgICAgICA8U2NydWJiZXJcbiAgICAgICAgICAgIGlzRHJhZ2dpbmc9e3NoaWZ0U3RhcnQgIT0gbnVsbH1cbiAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLl9kcmFnZ2VyU3RhcnQuaGFuZGxlTW91c2VEb3dufVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXt0aGlzLl9kcmFnZ2VyU3RhcnQuaGFuZGxlTW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5fZHJhZ2dlclN0YXJ0LmhhbmRsZU1vdXNlTGVhdmV9XG4gICAgICAgICAgICBwb3NpdGlvbj17dmlld1N0YXJ0IHx8IDB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U2NydWJiZXJcbiAgICAgICAgICAgIGlzRHJhZ2dpbmc9e3NoaWZ0RW5kICE9IG51bGx9XG4gICAgICAgICAgICBwb3NpdGlvbj17dmlld0VuZCB8fCAxfVxuICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuX2RyYWdnZXJFbmQuaGFuZGxlTW91c2VEb3dufVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXt0aGlzLl9kcmFnZ2VyRW5kLmhhbmRsZU1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuX2RyYWdnZXJFbmQuaGFuZGxlTW91c2VMZWF2ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtyZWZyYW1lICE9IG51bGwgJiYgdGhpcy5fZ2V0TWFya2VycyhyZWZyYW1lLmFuY2hvciwgcmVmcmFtZS5zaGlmdCl9XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7LyogZnVsbE92ZXJsYXkgdXBkYXRlcyB0aGUgbW91c2UgY3Vyc29yIGJsb2NrcyBtb3VzZSBldmVudHMgKi99XG4gICAgICAgIHtoYXZlTmV4dFRpbWVSYW5nZSAmJiA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlZpZXdpbmdMYXllckZ1bGxPdmVybGF5fSAvPn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1c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