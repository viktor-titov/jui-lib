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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0Iiwid2l0aFRoZW1lMiIsInN0eWxlc0ZhY3RvcnkiLCJCdXR0b24iLCJhdXRvQ29sb3IiLCJEcmFnZ2FibGVNYW5hZ2VyIiwiRVVwZGF0ZVR5cGVzIiwiR3JhcGhUaWNrcyIsIlNjcnViYmVyIiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsImdldFN0eWxlcyIsInRoZW1lIiwiVmlld2luZ0xheWVyUmVzZXRab29tSG92ZXJDbGFzc05hbWUiLCJWaWV3aW5nTGF5ZXJSZXNldFpvb20iLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJWaWV3aW5nTGF5ZXIiLCJfdGVtcGxhdGVPYmplY3QyIiwiVmlld2luZ0xheWVyR3JhcGgiLCJfdGVtcGxhdGVPYmplY3QzIiwiVmlld2luZ0xheWVySW5hY3RpdmUiLCJfdGVtcGxhdGVPYmplY3Q0IiwiVmlld2luZ0xheWVyQ3Vyc29yR3VpZGUiLCJfdGVtcGxhdGVPYmplY3Q1IiwiVmlld2luZ0xheWVyRHJhZ2dlZFNoaWZ0IiwiX3RlbXBsYXRlT2JqZWN0NiIsIlZpZXdpbmdMYXllckRyYWciLCJfdGVtcGxhdGVPYmplY3Q3IiwiVmlld2luZ0xheWVyRnVsbE92ZXJsYXkiLCJfdGVtcGxhdGVPYmplY3Q4IiwiZHJhZ1R5cGVzIiwiU0hJRlRfRU5EIiwiU0hJRlRfU1RBUlQiLCJSRUZSQU1FIiwiZ2V0TmV4dFZpZXdMYXlvdXQiLCJzdGFydCIsInBvc2l0aW9uIiwiX3JlZiIsImxlZnQiLCJyaWdodCIsIngiLCJ3aWR0aCIsImxlYWRpbmdYIiwiVW50aGVtZWRWaWV3aW5nTGF5ZXIiLCJfUmVhY3QkUHVyZUNvbXBvbmVudCIsInByb3BzIiwiX3RoaXMiLCJjYWxsIiwiX3NldFJvb3QiLCJlbG0iLCJfcm9vdCIsIl9nZXREcmFnZ2luZ0JvdW5kcyIsInRhZyIsIkVycm9yIiwiX3RoaXMkX3Jvb3QkZ2V0Qm91bmRpIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WExlZnQiLCJfdGhpcyRwcm9wcyR2aWV3UmFuZ2UiLCJ2aWV3UmFuZ2UiLCJ0aW1lIiwiY3VycmVudCIsInZpZXdTdGFydCIsInZpZXdFbmQiLCJtYXhWYWx1ZSIsIm1pblZhbHVlIiwiX2hhbmRsZVJlZnJhbWVNb3VzZU1vdmUiLCJfcmVmMiIsInZhbHVlIiwidXBkYXRlTmV4dFZpZXdSYW5nZVRpbWUiLCJjdXJzb3IiLCJfaGFuZGxlUmVmcmFtZU1vdXNlTGVhdmUiLCJfaGFuZGxlUmVmcmFtZURyYWdVcGRhdGUiLCJfcmVmMyIsInNoaWZ0IiwiYW5jaG9yIiwicmVmcmFtZSIsInVwZGF0ZSIsIl9oYW5kbGVSZWZyYW1lRHJhZ0VuZCIsIl9yZWY0IiwibWFuYWdlciIsIl9yZWY1IiwiZW5kIiwicmVzZXRCb3VuZHMiLCJ1cGRhdGVWaWV3UmFuZ2VUaW1lIiwiX2hhbmRsZVNjcnViYmVyRW50ZXJMZWF2ZSIsIl9yZWY2IiwidHlwZSIsInByZXZlbnRDdXJzb3JMaW5lIiwiTW91c2VFbnRlciIsInNldFN0YXRlIiwiX2hhbmRsZVNjcnViYmVyRHJhZ1VwZGF0ZSIsIl9yZWY3IiwiZXZlbnQiLCJEcmFnU3RhcnQiLCJzdG9wUHJvcGFnYXRpb24iLCJzaGlmdFN0YXJ0Iiwic2hpZnRFbmQiLCJfaGFuZGxlU2NydWJiZXJEcmFnRW5kIiwiX3JlZjgiLCJfdGhpcyRwcm9wcyR2aWV3UmFuZ2UyIiwiX3Jlc2V0VGltZVpvb21DbGlja0hhbmRsZXIiLCJfZHJhZ2dlclJlZnJhbWUiLCJnZXRCb3VuZHMiLCJvbkRyYWdFbmQiLCJvbkRyYWdNb3ZlIiwib25EcmFnU3RhcnQiLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VMZWF2ZSIsIl9kcmFnZ2VyU3RhcnQiLCJvbk1vdXNlRW50ZXIiLCJfZHJhZ2dlckVuZCIsInVuZGVmaW5lZCIsInN0YXRlIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRpc3Bvc2UiLCJfZ2V0TWFya2VycyIsImZyb20iLCJ0byIsInN0eWxlcyIsImxheW91dCIsImNsYXNzTmFtZSIsInkiLCJoZWlnaHQiLCJyZW5kZXIiLCJfdGhpcyRwcm9wcyIsIm51bVRpY2tzIiwiX3ZpZXdSYW5nZSR0aW1lIiwiaGF2ZU5leHRUaW1lUmFuZ2UiLCJsZWZ0SW5hY3RpdmUiLCJyaWdodEluYWN0aXZlIiwiY3Vyc29yUG9zaXRpb24iLCJzdHlsZSIsImNoaWxkcmVuIiwib25DbGljayIsInZhcmlhbnQiLCJyZWYiLCJvbk1vdXNlRG93biIsImhhbmRsZU1vdXNlRG93biIsImhhbmRsZU1vdXNlTGVhdmUiLCJoYW5kbGVNb3VzZU1vdmUiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInN0cm9rZVdpZHRoIiwiaXNEcmFnZ2luZyIsImhhbmRsZU1vdXNlRW50ZXIiLCJQdXJlQ29tcG9uZW50Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVBhZ2VIZWFkZXIvU3BhbkdyYXBoL1ZpZXdpbmdMYXllci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEdyYWZhbmFUaGVtZTIgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IHdpdGhUaGVtZTIsIHN0eWxlc0ZhY3RvcnksIEJ1dHRvbiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgVFVwZGF0ZVZpZXdSYW5nZVRpbWVGdW5jdGlvbiwgVmlld1JhbmdlLCBWaWV3UmFuZ2VUaW1lVXBkYXRlLCBUTmlsIH0gZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHsgYXV0b0NvbG9yIH0gZnJvbSAnLi4vLi4vVGhlbWUnO1xuaW1wb3J0IERyYWdnYWJsZU1hbmFnZXIsIHsgRHJhZ2dhYmxlQm91bmRzLCBEcmFnZ2luZ1VwZGF0ZSwgRVVwZGF0ZVR5cGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvRHJhZ2dhYmxlTWFuYWdlcic7XG5cbmltcG9ydCBHcmFwaFRpY2tzIGZyb20gJy4vR3JhcGhUaWNrcyc7XG5pbXBvcnQgU2NydWJiZXIgZnJvbSAnLi9TY3J1YmJlcic7XG5cbmV4cG9ydCBjb25zdCBnZXRTdHlsZXMgPSBzdHlsZXNGYWN0b3J5KCh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICAvLyBOZWVkIHRoaXMgY2F1c2UgZW1vdGlvbiB3aWxsIG1lcmdlIGVtb3Rpb24gZ2VuZXJhdGVkIGNsYXNzZXMgaW50byBzaW5nbGUgY2xhc3NOYW1lIGlmIHVzZWQgd2l0aCBjeCBmcm9tIGVtb3Rpb25cbiAgLy8gcGFja2FnZSBhbmQgdGhlIHNlbGVjdG9yIHdvbid0IHdvcmtcbiAgY29uc3QgVmlld2luZ0xheWVyUmVzZXRab29tSG92ZXJDbGFzc05hbWUgPSAnSmFlZ2VyVWlDb21wb25lbnRzX19WaWV3aW5nTGF5ZXJSZXNldFpvb21Ib3ZlckNsYXNzTmFtZSc7XG4gIGNvbnN0IFZpZXdpbmdMYXllclJlc2V0Wm9vbSA9IGNzc2BcbiAgICBsYWJlbDogVmlld2luZ0xheWVyUmVzZXRab29tO1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAxJTtcbiAgICB0b3A6IDEwJTtcbiAgICB6LWluZGV4OiAxO1xuICBgO1xuICByZXR1cm4ge1xuICAgIFZpZXdpbmdMYXllcjogY3NzYFxuICAgICAgbGFiZWw6IFZpZXdpbmdMYXllcjtcbiAgICAgIGN1cnNvcjogdmVydGljYWwtdGV4dDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHotaW5kZXg6IDE7XG4gICAgICAmOmhvdmVyID4gLiR7Vmlld2luZ0xheWVyUmVzZXRab29tSG92ZXJDbGFzc05hbWV9IHtcbiAgICAgICAgZGlzcGxheTogdW5zZXQ7XG4gICAgICB9XG4gICAgYCxcbiAgICBWaWV3aW5nTGF5ZXJHcmFwaDogY3NzYFxuICAgICAgbGFiZWw6IFZpZXdpbmdMYXllckdyYXBoO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjOTk5Jyl9O1xuICAgICAgLyogbmVlZCAhaW1wb3J0YW50IGhlcmUgdG8gb3ZlcmNvbWUgc29tZXRoaW5nIGZyb20gc2VtYW50aWMgVUkgKi9cbiAgICAgIG92ZXJmbG93OiB2aXNpYmxlICFpbXBvcnRhbnQ7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICBgLFxuICAgIFZpZXdpbmdMYXllckluYWN0aXZlOiBjc3NgXG4gICAgICBsYWJlbDogVmlld2luZ0xheWVySW5hY3RpdmU7XG4gICAgICBmaWxsOiAke2F1dG9Db2xvcih0aGVtZSwgJ3JnYmEoMjE0LCAyMTQsIDIxNCwgMC41KScpfTtcbiAgICBgLFxuICAgIFZpZXdpbmdMYXllckN1cnNvckd1aWRlOiBjc3NgXG4gICAgICBsYWJlbDogVmlld2luZ0xheWVyQ3Vyc29yR3VpZGU7XG4gICAgICBzdHJva2U6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2Y0NCcpfTtcbiAgICAgIHN0cm9rZS13aWR0aDogMTtcbiAgICBgLFxuICAgIFZpZXdpbmdMYXllckRyYWdnZWRTaGlmdDogY3NzYFxuICAgICAgbGFiZWw6IFZpZXdpbmdMYXllckRyYWdnZWRTaGlmdDtcbiAgICAgIGZpbGwtb3BhY2l0eTogMC4yO1xuICAgIGAsXG4gICAgVmlld2luZ0xheWVyRHJhZzogY3NzYFxuICAgICAgbGFiZWw6IFZpZXdpbmdMYXllckRyYWc7XG4gICAgICBmaWxsOiAke2F1dG9Db2xvcih0aGVtZSwgJyM0NGYnKX07XG4gICAgYCxcbiAgICBWaWV3aW5nTGF5ZXJGdWxsT3ZlcmxheTogY3NzYFxuICAgICAgbGFiZWw6IFZpZXdpbmdMYXllckZ1bGxPdmVybGF5O1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgY3Vyc29yOiBjb2wtcmVzaXplO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgdG9wOiAwO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgYCxcbiAgICBWaWV3aW5nTGF5ZXJSZXNldFpvb20sXG4gICAgVmlld2luZ0xheWVyUmVzZXRab29tSG92ZXJDbGFzc05hbWUsXG4gIH07XG59KTtcblxuZXhwb3J0IHR5cGUgVmlld2luZ0xheWVyUHJvcHMgPSB7XG4gIGhlaWdodDogbnVtYmVyO1xuICBudW1UaWNrczogbnVtYmVyO1xuICB1cGRhdGVWaWV3UmFuZ2VUaW1lOiBUVXBkYXRlVmlld1JhbmdlVGltZUZ1bmN0aW9uO1xuICB1cGRhdGVOZXh0Vmlld1JhbmdlVGltZTogKHVwZGF0ZTogVmlld1JhbmdlVGltZVVwZGF0ZSkgPT4gdm9pZDtcbiAgdmlld1JhbmdlOiBWaWV3UmFuZ2U7XG4gIHRoZW1lOiBHcmFmYW5hVGhlbWUyO1xufTtcblxudHlwZSBWaWV3aW5nTGF5ZXJTdGF0ZSA9IHtcbiAgLyoqXG4gICAqIEN1cnNvciBsaW5lIHNob3VsZCBub3QgYmUgZHJhd24gd2hlbiB0aGUgbW91c2UgaXMgb3ZlciB0aGUgc2NydWJiZXIgaGFuZGxlLlxuICAgKi9cbiAgcHJldmVudEN1cnNvckxpbmU6IGJvb2xlYW47XG59O1xuXG4vKipcbiAqIERlc2lnbmF0ZSB0aGUgdGFncyBmb3IgdGhlIGRpZmZlcmVudCBkcmFnZ2luZyBtYW5hZ2Vycy4gRXhwb3J0ZWQgZm9yIHRlc3RzLlxuICovXG5leHBvcnQgY29uc3QgZHJhZ1R5cGVzID0ge1xuICAvKipcbiAgICogVGFnIGZvciBkcmFnZ2luZyB0aGUgcmlnaHQgc2NydWJiZXIsIGUuZy4gZW5kIG9mIHRoZSBjdXJyZW50IHZpZXcgcmFuZ2UuXG4gICAqL1xuICBTSElGVF9FTkQ6ICdTSElGVF9FTkQnLFxuICAvKipcbiAgICogVGFnIGZvciBkcmFnZ2luZyB0aGUgbGVmdCBzY3J1YmJlciwgZS5nLiBzdGFydCBvZiB0aGUgY3VycmVudCB2aWV3IHJhbmdlLlxuICAgKi9cbiAgU0hJRlRfU1RBUlQ6ICdTSElGVF9TVEFSVCcsXG4gIC8qKlxuICAgKiBUYWcgZm9yIGRyYWdnaW5nIGEgbmV3IHZpZXcgcmFuZ2UuXG4gICAqL1xuICBSRUZSQU1FOiAnUkVGUkFNRScsXG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGxheW91dCBpbmZvcm1hdGlvbiBmb3IgZHJhd2luZyB0aGUgdmlldy1yYW5nZSBkaWZmZXJlbnRpYWwsIGUuZy5cbiAqIHNob3cgd2hhdCB3aWxsIGNoYW5nZSB3aGVuIHRoZSBtb3VzZSBpcyByZWxlYXNlZC4gQmFzaWNhbGx5LCB0aGlzIGlzIHRoZVxuICogZGlmZmVyZW5jZSBmcm9tIHRoZSBzdGFydCBvZiB0aGUgZHJhZyB0byB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7eyB4OiBzdHJpbmcsIHdpZHRoOiBzdHJpbmcsIGxlYWRnaW5YOiBzdHJpbmcgfX1cbiAqL1xuZnVuY3Rpb24gZ2V0TmV4dFZpZXdMYXlvdXQoc3RhcnQ6IG51bWJlciwgcG9zaXRpb246IG51bWJlcikge1xuICBjb25zdCBbbGVmdCwgcmlnaHRdID0gc3RhcnQgPCBwb3NpdGlvbiA/IFtzdGFydCwgcG9zaXRpb25dIDogW3Bvc2l0aW9uLCBzdGFydF07XG4gIHJldHVybiB7XG4gICAgeDogYCR7bGVmdCAqIDEwMH0lYCxcbiAgICB3aWR0aDogYCR7KHJpZ2h0IC0gbGVmdCkgKiAxMDB9JWAsXG4gICAgbGVhZGluZ1g6IGAke3Bvc2l0aW9uICogMTAwfSVgLFxuICB9O1xufVxuXG4vKipcbiAqIGBWaWV3aW5nTGF5ZXJgIGlzIHJlbmRlcmVkIG9uIHRvcCBvZiB0aGUgQ2FudmFzIHJlbmRlcmluZyBvZiB0aGUgbWluaW1hcCBhbmRcbiAqIGhhbmRsZXMgc2hvd2luZyB0aGUgY3VycmVudCB2aWV3IHJhbmdlIGFuZCBoYW5kbGVzIG1vdXNlIFVYIGZvciBtb2RpZnlpbmcgaXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBVbnRoZW1lZFZpZXdpbmdMYXllciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8Vmlld2luZ0xheWVyUHJvcHMsIFZpZXdpbmdMYXllclN0YXRlPiB7XG4gIHN0YXRlOiBWaWV3aW5nTGF5ZXJTdGF0ZTtcblxuICBfcm9vdDogRWxlbWVudCB8IFROaWw7XG5cbiAgLyoqXG4gICAqIGBfZHJhZ2dlclJlZnJhbWVgIGhhbmRsZXMgY2xpY2tpbmcgYW5kIGRyYWdnaW5nIG9uIHRoZSBgVmlld2luZ0xheWVyYCB0b1xuICAgKiByZWRlZmluZWQgdGhlIHZpZXcgcmFuZ2UuXG4gICAqL1xuICBfZHJhZ2dlclJlZnJhbWU6IERyYWdnYWJsZU1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIGBfZHJhZ2dlclN0YXJ0YCBoYW5kbGVzIGRyYWdnaW5nIHRoZSBsZWZ0IHNjcnViYmVyIHRvIGFkanVzdCB0aGUgc3RhcnQgb2ZcbiAgICogdGhlIHZpZXcgcmFuZ2UuXG4gICAqL1xuICBfZHJhZ2dlclN0YXJ0OiBEcmFnZ2FibGVNYW5hZ2VyO1xuXG4gIC8qKlxuICAgKiBgX2RyYWdnZXJFbmRgIGhhbmRsZXMgZHJhZ2dpbmcgdGhlIHJpZ2h0IHNjcnViYmVyIHRvIGFkanVzdCB0aGUgZW5kIG9mXG4gICAqIHRoZSB2aWV3IHJhbmdlLlxuICAgKi9cbiAgX2RyYWdnZXJFbmQ6IERyYWdnYWJsZU1hbmFnZXI7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IFZpZXdpbmdMYXllclByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5fZHJhZ2dlclJlZnJhbWUgPSBuZXcgRHJhZ2dhYmxlTWFuYWdlcih7XG4gICAgICBnZXRCb3VuZHM6IHRoaXMuX2dldERyYWdnaW5nQm91bmRzLFxuICAgICAgb25EcmFnRW5kOiB0aGlzLl9oYW5kbGVSZWZyYW1lRHJhZ0VuZCxcbiAgICAgIG9uRHJhZ01vdmU6IHRoaXMuX2hhbmRsZVJlZnJhbWVEcmFnVXBkYXRlLFxuICAgICAgb25EcmFnU3RhcnQ6IHRoaXMuX2hhbmRsZVJlZnJhbWVEcmFnVXBkYXRlLFxuICAgICAgb25Nb3VzZU1vdmU6IHRoaXMuX2hhbmRsZVJlZnJhbWVNb3VzZU1vdmUsXG4gICAgICBvbk1vdXNlTGVhdmU6IHRoaXMuX2hhbmRsZVJlZnJhbWVNb3VzZUxlYXZlLFxuICAgICAgdGFnOiBkcmFnVHlwZXMuUkVGUkFNRSxcbiAgICB9KTtcblxuICAgIHRoaXMuX2RyYWdnZXJTdGFydCA9IG5ldyBEcmFnZ2FibGVNYW5hZ2VyKHtcbiAgICAgIGdldEJvdW5kczogdGhpcy5fZ2V0RHJhZ2dpbmdCb3VuZHMsXG4gICAgICBvbkRyYWdFbmQ6IHRoaXMuX2hhbmRsZVNjcnViYmVyRHJhZ0VuZCxcbiAgICAgIG9uRHJhZ01vdmU6IHRoaXMuX2hhbmRsZVNjcnViYmVyRHJhZ1VwZGF0ZSxcbiAgICAgIG9uRHJhZ1N0YXJ0OiB0aGlzLl9oYW5kbGVTY3J1YmJlckRyYWdVcGRhdGUsXG4gICAgICBvbk1vdXNlRW50ZXI6IHRoaXMuX2hhbmRsZVNjcnViYmVyRW50ZXJMZWF2ZSxcbiAgICAgIG9uTW91c2VMZWF2ZTogdGhpcy5faGFuZGxlU2NydWJiZXJFbnRlckxlYXZlLFxuICAgICAgdGFnOiBkcmFnVHlwZXMuU0hJRlRfU1RBUlQsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9kcmFnZ2VyRW5kID0gbmV3IERyYWdnYWJsZU1hbmFnZXIoe1xuICAgICAgZ2V0Qm91bmRzOiB0aGlzLl9nZXREcmFnZ2luZ0JvdW5kcyxcbiAgICAgIG9uRHJhZ0VuZDogdGhpcy5faGFuZGxlU2NydWJiZXJEcmFnRW5kLFxuICAgICAgb25EcmFnTW92ZTogdGhpcy5faGFuZGxlU2NydWJiZXJEcmFnVXBkYXRlLFxuICAgICAgb25EcmFnU3RhcnQ6IHRoaXMuX2hhbmRsZVNjcnViYmVyRHJhZ1VwZGF0ZSxcbiAgICAgIG9uTW91c2VFbnRlcjogdGhpcy5faGFuZGxlU2NydWJiZXJFbnRlckxlYXZlLFxuICAgICAgb25Nb3VzZUxlYXZlOiB0aGlzLl9oYW5kbGVTY3J1YmJlckVudGVyTGVhdmUsXG4gICAgICB0YWc6IGRyYWdUeXBlcy5TSElGVF9FTkQsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9yb290ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwcmV2ZW50Q3Vyc29yTGluZTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX2RyYWdnZXJSZWZyYW1lLmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9kcmFnZ2VyRW5kLmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9kcmFnZ2VyU3RhcnQuZGlzcG9zZSgpO1xuICB9XG5cbiAgX3NldFJvb3QgPSAoZWxtOiBTVkdFbGVtZW50IHwgVE5pbCkgPT4ge1xuICAgIHRoaXMuX3Jvb3QgPSBlbG07XG4gIH07XG5cbiAgX2dldERyYWdnaW5nQm91bmRzID0gKHRhZzogc3RyaW5nIHwgVE5pbCk6IERyYWdnYWJsZUJvdW5kcyA9PiB7XG4gICAgaWYgKCF0aGlzLl9yb290KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3RhdGUnKTtcbiAgICB9XG4gICAgY29uc3QgeyBsZWZ0OiBjbGllbnRYTGVmdCwgd2lkdGggfSA9IHRoaXMuX3Jvb3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgW3ZpZXdTdGFydCwgdmlld0VuZF0gPSB0aGlzLnByb3BzLnZpZXdSYW5nZS50aW1lLmN1cnJlbnQ7XG4gICAgbGV0IG1heFZhbHVlID0gMTtcbiAgICBsZXQgbWluVmFsdWUgPSAwO1xuICAgIGlmICh0YWcgPT09IGRyYWdUeXBlcy5TSElGVF9TVEFSVCkge1xuICAgICAgbWF4VmFsdWUgPSB2aWV3RW5kO1xuICAgIH0gZWxzZSBpZiAodGFnID09PSBkcmFnVHlwZXMuU0hJRlRfRU5EKSB7XG4gICAgICBtaW5WYWx1ZSA9IHZpZXdTdGFydDtcbiAgICB9XG4gICAgcmV0dXJuIHsgY2xpZW50WExlZnQsIG1heFZhbHVlLCBtaW5WYWx1ZSwgd2lkdGggfTtcbiAgfTtcblxuICBfaGFuZGxlUmVmcmFtZU1vdXNlTW92ZSA9ICh7IHZhbHVlIH06IERyYWdnaW5nVXBkYXRlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVOZXh0Vmlld1JhbmdlVGltZSh7IGN1cnNvcjogdmFsdWUgfSk7XG4gIH07XG5cbiAgX2hhbmRsZVJlZnJhbWVNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudXBkYXRlTmV4dFZpZXdSYW5nZVRpbWUoeyBjdXJzb3I6IG51bGwgfSk7XG4gIH07XG5cbiAgX2hhbmRsZVJlZnJhbWVEcmFnVXBkYXRlID0gKHsgdmFsdWUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICBjb25zdCBzaGlmdCA9IHZhbHVlO1xuICAgIGNvbnN0IHsgdGltZSB9ID0gdGhpcy5wcm9wcy52aWV3UmFuZ2U7XG4gICAgY29uc3QgYW5jaG9yID0gdGltZS5yZWZyYW1lID8gdGltZS5yZWZyYW1lLmFuY2hvciA6IHNoaWZ0O1xuICAgIGNvbnN0IHVwZGF0ZSA9IHsgcmVmcmFtZTogeyBhbmNob3IsIHNoaWZ0IH0gfTtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lKHVwZGF0ZSk7XG4gIH07XG5cbiAgX2hhbmRsZVJlZnJhbWVEcmFnRW5kID0gKHsgbWFuYWdlciwgdmFsdWUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICBjb25zdCB7IHRpbWUgfSA9IHRoaXMucHJvcHMudmlld1JhbmdlO1xuICAgIGNvbnN0IGFuY2hvciA9IHRpbWUucmVmcmFtZSA/IHRpbWUucmVmcmFtZS5hbmNob3IgOiB2YWx1ZTtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSB2YWx1ZSA8IGFuY2hvciA/IFt2YWx1ZSwgYW5jaG9yXSA6IFthbmNob3IsIHZhbHVlXTtcbiAgICBtYW5hZ2VyLnJlc2V0Qm91bmRzKCk7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVWaWV3UmFuZ2VUaW1lKHN0YXJ0LCBlbmQsICdtaW5pbWFwJyk7XG4gIH07XG5cbiAgX2hhbmRsZVNjcnViYmVyRW50ZXJMZWF2ZSA9ICh7IHR5cGUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICBjb25zdCBwcmV2ZW50Q3Vyc29yTGluZSA9IHR5cGUgPT09IEVVcGRhdGVUeXBlcy5Nb3VzZUVudGVyO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Q3Vyc29yTGluZSB9KTtcbiAgfTtcblxuICBfaGFuZGxlU2NydWJiZXJEcmFnVXBkYXRlID0gKHsgZXZlbnQsIHRhZywgdHlwZSwgdmFsdWUgfTogRHJhZ2dpbmdVcGRhdGUpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gRVVwZGF0ZVR5cGVzLkRyYWdTdGFydCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIGlmICh0YWcgPT09IGRyYWdUeXBlcy5TSElGVF9TVEFSVCkge1xuICAgICAgdGhpcy5wcm9wcy51cGRhdGVOZXh0Vmlld1JhbmdlVGltZSh7IHNoaWZ0U3RhcnQ6IHZhbHVlIH0pO1xuICAgIH0gZWxzZSBpZiAodGFnID09PSBkcmFnVHlwZXMuU0hJRlRfRU5EKSB7XG4gICAgICB0aGlzLnByb3BzLnVwZGF0ZU5leHRWaWV3UmFuZ2VUaW1lKHsgc2hpZnRFbmQ6IHZhbHVlIH0pO1xuICAgIH1cbiAgfTtcblxuICBfaGFuZGxlU2NydWJiZXJEcmFnRW5kID0gKHsgbWFuYWdlciwgdGFnLCB2YWx1ZSB9OiBEcmFnZ2luZ1VwZGF0ZSkgPT4ge1xuICAgIGNvbnN0IFt2aWV3U3RhcnQsIHZpZXdFbmRdID0gdGhpcy5wcm9wcy52aWV3UmFuZ2UudGltZS5jdXJyZW50O1xuICAgIGxldCB1cGRhdGU6IFtudW1iZXIsIG51bWJlcl07XG4gICAgaWYgKHRhZyA9PT0gZHJhZ1R5cGVzLlNISUZUX1NUQVJUKSB7XG4gICAgICB1cGRhdGUgPSBbdmFsdWUsIHZpZXdFbmRdO1xuICAgIH0gZWxzZSBpZiAodGFnID09PSBkcmFnVHlwZXMuU0hJRlRfRU5EKSB7XG4gICAgICB1cGRhdGUgPSBbdmlld1N0YXJ0LCB2YWx1ZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRvIHNhdGlzZnkgZmxvd1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgc3RhdGUnKTtcbiAgICB9XG4gICAgbWFuYWdlci5yZXNldEJvdW5kcygpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBwcmV2ZW50Q3Vyc29yTGluZTogZmFsc2UgfSk7XG4gICAgdGhpcy5wcm9wcy51cGRhdGVWaWV3UmFuZ2VUaW1lKHVwZGF0ZVswXSwgdXBkYXRlWzFdLCAnbWluaW1hcCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIHpvb20gdG8gZnVsbHkgem9vbWVkIG91dC5cbiAgICovXG4gIF9yZXNldFRpbWVab29tQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMudXBkYXRlVmlld1JhbmdlVGltZSgwLCAxKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHdoZXJlIHRoZSBkcmFnIHN0YXJ0ZWQgYW5kIHRoZSBjdXJyZW50XG4gICAqIHBvc2l0aW9uLCBlLmcuIHRoZSByZWQgb3IgYmx1ZSBoaWdobGlnaHQuXG4gICAqXG4gICAqIEByZXR1cm5zIFJlYWN0Lk5vZGVbXVxuICAgKi9cbiAgX2dldE1hcmtlcnMoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKSB7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKHRoaXMucHJvcHMudGhlbWUpO1xuICAgIGNvbnN0IGxheW91dCA9IGdldE5leHRWaWV3TGF5b3V0KGZyb20sIHRvKTtcbiAgICByZXR1cm4gW1xuICAgICAgPHJlY3RcbiAgICAgICAga2V5PVwiZmlsbFwiXG4gICAgICAgIGNsYXNzTmFtZT17Y3goc3R5bGVzLlZpZXdpbmdMYXllckRyYWdnZWRTaGlmdCwgc3R5bGVzLlZpZXdpbmdMYXllckRyYWcpfVxuICAgICAgICB4PXtsYXlvdXQueH1cbiAgICAgICAgeT1cIjBcIlxuICAgICAgICB3aWR0aD17bGF5b3V0LndpZHRofVxuICAgICAgICBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0IC0gMn1cbiAgICAgIC8+LFxuICAgICAgPHJlY3RcbiAgICAgICAga2V5PVwiZWRnZVwiXG4gICAgICAgIGNsYXNzTmFtZT17Y3goc3R5bGVzLlZpZXdpbmdMYXllckRyYWcpfVxuICAgICAgICB4PXtsYXlvdXQubGVhZGluZ1h9XG4gICAgICAgIHk9XCIwXCJcbiAgICAgICAgd2lkdGg9XCIxXCJcbiAgICAgICAgaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodCAtIDJ9XG4gICAgICAvPixcbiAgICBdO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaGVpZ2h0LCB2aWV3UmFuZ2UsIG51bVRpY2tzLCB0aGVtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHByZXZlbnRDdXJzb3JMaW5lIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgY3VycmVudCwgY3Vyc29yLCBzaGlmdFN0YXJ0LCBzaGlmdEVuZCwgcmVmcmFtZSB9ID0gdmlld1JhbmdlLnRpbWU7XG4gICAgY29uc3QgaGF2ZU5leHRUaW1lUmFuZ2UgPSBzaGlmdFN0YXJ0ICE9IG51bGwgfHwgc2hpZnRFbmQgIT0gbnVsbCB8fCByZWZyYW1lICE9IG51bGw7XG4gICAgY29uc3QgW3ZpZXdTdGFydCwgdmlld0VuZF0gPSBjdXJyZW50O1xuICAgIGxldCBsZWZ0SW5hY3RpdmUgPSAwO1xuICAgIGlmICh2aWV3U3RhcnQpIHtcbiAgICAgIGxlZnRJbmFjdGl2ZSA9IHZpZXdTdGFydCAqIDEwMDtcbiAgICB9XG4gICAgbGV0IHJpZ2h0SW5hY3RpdmUgPSAxMDA7XG4gICAgaWYgKHZpZXdFbmQpIHtcbiAgICAgIHJpZ2h0SW5hY3RpdmUgPSAxMDAgLSB2aWV3RW5kICogMTAwO1xuICAgIH1cbiAgICBsZXQgY3Vyc29yUG9zaXRpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIWhhdmVOZXh0VGltZVJhbmdlICYmIGN1cnNvciAhPSBudWxsICYmICFwcmV2ZW50Q3Vyc29yTGluZSkge1xuICAgICAgY3Vyc29yUG9zaXRpb24gPSBgJHtjdXJzb3IgKiAxMDB9JWA7XG4gICAgfVxuICAgIGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlcyh0aGVtZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBhcmlhLWhpZGRlbiBjbGFzc05hbWU9e3N0eWxlcy5WaWV3aW5nTGF5ZXJ9IHN0eWxlPXt7IGhlaWdodCB9fT5cbiAgICAgICAgeyh2aWV3U3RhcnQgIT09IDAgfHwgdmlld0VuZCAhPT0gMSkgJiYgKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX3Jlc2V0VGltZVpvb21DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2N4KHN0eWxlcy5WaWV3aW5nTGF5ZXJSZXNldFpvb20sIHN0eWxlcy5WaWV3aW5nTGF5ZXJSZXNldFpvb21Ib3ZlckNsYXNzTmFtZSl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFJlc2V0IFNlbGVjdGlvblxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApfVxuICAgICAgICA8c3ZnXG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVmlld2luZ0xheWVyR3JhcGh9XG4gICAgICAgICAgcmVmPXt0aGlzLl9zZXRSb290fVxuICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLl9kcmFnZ2VyUmVmcmFtZS5oYW5kbGVNb3VzZURvd259XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLl9kcmFnZ2VyUmVmcmFtZS5oYW5kbGVNb3VzZUxlYXZlfVxuICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLl9kcmFnZ2VyUmVmcmFtZS5oYW5kbGVNb3VzZU1vdmV9XG4gICAgICAgID5cbiAgICAgICAgICB7bGVmdEluYWN0aXZlID4gMCAmJiAoXG4gICAgICAgICAgICA8cmVjdFxuICAgICAgICAgICAgICB4PXswfVxuICAgICAgICAgICAgICB5PXswfVxuICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgICAgICAgICAgd2lkdGg9e2Ake2xlZnRJbmFjdGl2ZX0lYH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVmlld2luZ0xheWVySW5hY3RpdmV9XG4gICAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwibGVmdC1WaWV3aW5nTGF5ZXJJbmFjdGl2ZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3JpZ2h0SW5hY3RpdmUgPiAwICYmIChcbiAgICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICAgIHg9e2AkezEwMCAtIHJpZ2h0SW5hY3RpdmV9JWB9XG4gICAgICAgICAgICAgIHk9ezB9XG4gICAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgICAgICAgICB3aWR0aD17YCR7cmlnaHRJbmFjdGl2ZX0lYH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVmlld2luZ0xheWVySW5hY3RpdmV9XG4gICAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwicmlnaHQtVmlld2luZ0xheWVySW5hY3RpdmVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxHcmFwaFRpY2tzIG51bVRpY2tzPXtudW1UaWNrc30gLz5cbiAgICAgICAgICB7Y3Vyc29yUG9zaXRpb24gJiYgKFxuICAgICAgICAgICAgPGxpbmVcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVmlld2luZ0xheWVyQ3Vyc29yR3VpZGV9XG4gICAgICAgICAgICAgIHgxPXtjdXJzb3JQb3NpdGlvbn1cbiAgICAgICAgICAgICAgeTE9XCIwXCJcbiAgICAgICAgICAgICAgeDI9e2N1cnNvclBvc2l0aW9ufVxuICAgICAgICAgICAgICB5Mj17aGVpZ2h0IC0gMn1cbiAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxXCJcbiAgICAgICAgICAgICAgZGF0YS10ZXN0aWQ9XCJWaWV3aW5nTGF5ZXJDdXJzb3JHdWlkZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3NoaWZ0U3RhcnQgIT0gbnVsbCAmJiB0aGlzLl9nZXRNYXJrZXJzKHZpZXdTdGFydCwgc2hpZnRTdGFydCl9XG4gICAgICAgICAge3NoaWZ0RW5kICE9IG51bGwgJiYgdGhpcy5fZ2V0TWFya2Vycyh2aWV3RW5kLCBzaGlmdEVuZCl9XG4gICAgICAgICAgPFNjcnViYmVyXG4gICAgICAgICAgICBpc0RyYWdnaW5nPXtzaGlmdFN0YXJ0ICE9IG51bGx9XG4gICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5fZHJhZ2dlclN0YXJ0LmhhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5fZHJhZ2dlclN0YXJ0LmhhbmRsZU1vdXNlRW50ZXJ9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuX2RyYWdnZXJTdGFydC5oYW5kbGVNb3VzZUxlYXZlfVxuICAgICAgICAgICAgcG9zaXRpb249e3ZpZXdTdGFydCB8fCAwfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNjcnViYmVyXG4gICAgICAgICAgICBpc0RyYWdnaW5nPXtzaGlmdEVuZCAhPSBudWxsfVxuICAgICAgICAgICAgcG9zaXRpb249e3ZpZXdFbmQgfHwgMX1cbiAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLl9kcmFnZ2VyRW5kLmhhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17dGhpcy5fZHJhZ2dlckVuZC5oYW5kbGVNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXt0aGlzLl9kcmFnZ2VyRW5kLmhhbmRsZU1vdXNlTGVhdmV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7cmVmcmFtZSAhPSBudWxsICYmIHRoaXMuX2dldE1hcmtlcnMocmVmcmFtZS5hbmNob3IsIHJlZnJhbWUuc2hpZnQpfVxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgey8qIGZ1bGxPdmVybGF5IHVwZGF0ZXMgdGhlIG1vdXNlIGN1cnNvciBibG9ja3MgbW91c2UgZXZlbnRzICovfVxuICAgICAgICB7aGF2ZU5leHRUaW1lUmFuZ2UgJiYgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5WaWV3aW5nTGF5ZXJGdWxsT3ZlcmxheX0gLz59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZTIoVW50aGVtZWRWaWV3aW5nTGF5ZXIpO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixPQUFPLEtBQUtDLEtBQUssTUFBTSxPQUFPO0FBRzlCLFNBQVNDLFVBQVUsRUFBRUMsYUFBYSxFQUFFQyxNQUFNLFFBQVEsYUFBYTtBQUcvRCxTQUFTQyxTQUFTLFFBQVEsYUFBYTtBQUN2QyxPQUFPQyxnQkFBZ0IsSUFBcUNDLFlBQVksUUFBUSw4QkFBOEI7QUFFOUcsT0FBT0MsVUFBVSxNQUFNLGNBQWM7QUFDckMsT0FBT0MsUUFBUSxNQUFNLFlBQVk7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBRWxDLE9BQU8sSUFBTUMsU0FBUyxHQUFHWCxhQUFhLENBQUMsVUFBQ1ksS0FBb0IsRUFBSztFQUMvRDtFQUNBO0VBQ0EsSUFBTUMsbUNBQW1DLEdBQUcseURBQXlEO0VBQ3JHLElBQU1DLHFCQUFxQixHQUFHbEIsR0FBRyxDQUFBbUIsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLDJCQUFBLDRJQU9oQztFQUNELE9BQU87SUFDTEMsWUFBWSxFQUFFckIsR0FBRyxDQUFBc0IsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUYsMkJBQUEsa0xBS0ZILG1DQUFtQyxDQUdqRDtJQUNETSxpQkFBaUIsRUFBRXZCLEdBQUcsQ0FBQXdCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFKLDJCQUFBLDBRQUVBZCxTQUFTLENBQUNVLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FNN0M7SUFDRFMsb0JBQW9CLEVBQUV6QixHQUFHLENBQUEwQixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBTiwyQkFBQSxzRUFFZmQsU0FBUyxDQUFDVSxL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