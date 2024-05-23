import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2;
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
import classNames from 'classnames';
import React from 'react';
import { Button, clearButtonStyles, stylesFactory, withTheme2 } from '@grafana/ui';
import { autoColor } from '../Theme';
import SpanDetail from './SpanDetail';
import SpanTreeOffset from './SpanTreeOffset';
import TimelineRow from './TimelineRow';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = stylesFactory(function (theme) {
  return {
    expandedAccent: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      cursor: pointer;\n      height: 100%;\n      overflow: hidden;\n      position: absolute;\n      width: 100%;\n      &::before {\n        border-left: 4px solid;\n        pointer-events: none;\n        width: 1000px;\n      }\n      &::after {\n        border-right: 1000px solid;\n        border-color: inherit;\n        cursor: pointer;\n        opacity: 0.2;\n      }\n\n      /* border-color inherit must come AFTER other border declarations for accent */\n      &::before,\n      &::after {\n        border-color: inherit;\n        content: ' ';\n        position: absolute;\n        height: 100%;\n      }\n\n      &:hover::after {\n        opacity: 0.35;\n      }\n    "]))),
    infoWrapper: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: infoWrapper;\n      border: 1px solid ", ";\n      border-top: 3px solid;\n      padding: 0.75rem;\n    "])), autoColor(theme, '#d3d3d3'))
  };
});
export var UnthemedSpanDetailRow = /*#__PURE__*/function (_React$PureComponent) {
  function UnthemedSpanDetailRow() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this._detailToggle = function () {
      _this.props.onDetailToggled(_this.props.span.spanID);
    };
    _this._linksGetter = function (items, itemIndex) {
      var _this$props = _this.props,
        linksGetter = _this$props.linksGetter,
        span = _this$props.span;
      return linksGetter(span, items, itemIndex);
    };
    return _this;
  }
  _inheritsLoose(UnthemedSpanDetailRow, _React$PureComponent);
  var _proto = UnthemedSpanDetailRow.prototype;
  _proto.render = function render() {
    var _this$props2 = this.props,
      color = _this$props2.color,
      columnDivision = _this$props2.columnDivision,
      detailState = _this$props2.detailState,
      logItemToggle = _this$props2.logItemToggle,
      logsToggle = _this$props2.logsToggle,
      processToggle = _this$props2.processToggle,
      referenceItemToggle = _this$props2.referenceItemToggle,
      referencesToggle = _this$props2.referencesToggle,
      warningsToggle = _this$props2.warningsToggle,
      stackTracesToggle = _this$props2.stackTracesToggle,
      span = _this$props2.span,
      timeZone = _this$props2.timeZone,
      tagsToggle = _this$props2.tagsToggle,
      traceStartTime = _this$props2.traceStartTime,
      hoverIndentGuideIds = _this$props2.hoverIndentGuideIds,
      addHoverIndentGuideId = _this$props2.addHoverIndentGuideId,
      removeHoverIndentGuideId = _this$props2.removeHoverIndentGuideId,
      theme = _this$props2.theme,
      createSpanLink = _this$props2.createSpanLink,
      focusedSpanId = _this$props2.focusedSpanId,
      createFocusSpanLink = _this$props2.createFocusSpanLink,
      topOfViewRefType = _this$props2.topOfViewRefType,
      datasourceType = _this$props2.datasourceType;
    var styles = getStyles(theme);
    return /*#__PURE__*/_jsxs(TimelineRow, {
      children: [/*#__PURE__*/_jsxs(TimelineRow.Cell, {
        width: columnDivision,
        style: {
          overflow: 'hidden'
        },
        children: [/*#__PURE__*/_jsx(SpanTreeOffset, {
          span: span,
          showChildrenIcon: false,
          hoverIndentGuideIds: hoverIndentGuideIds,
          addHoverIndentGuideId: addHoverIndentGuideId,
          removeHoverIndentGuideId: removeHoverIndentGuideId
        }), /*#__PURE__*/_jsx(Button, {
          fill: "text",
          onClick: this._detailToggle,
          className: classNames(styles.expandedAccent, clearButtonStyles(theme)),
          style: {
            borderColor: color
          },
          "data-testid": "detail-row-expanded-accent"
        })]
      }), /*#__PURE__*/_jsx(TimelineRow.Cell, {
        width: 1 - columnDivision,
        children: /*#__PURE__*/_jsx("div", {
          className: styles.infoWrapper,
          style: {
            borderTopColor: color
          },
          children: /*#__PURE__*/_jsx(SpanDetail, {
            detailState: detailState,
            linksGetter: this._linksGetter,
            logItemToggle: logItemToggle,
            logsToggle: logsToggle,
            processToggle: processToggle,
            referenceItemToggle: referenceItemToggle,
            referencesToggle: referencesToggle,
            warningsToggle: warningsToggle,
            stackTracesToggle: stackTracesToggle,
            span: span,
            timeZone: timeZone,
            tagsToggle: tagsToggle,
            traceStartTime: traceStartTime,
            createSpanLink: createSpanLink,
            focusedSpanId: focusedSpanId,
            createFocusSpanLink: createFocusSpanLink,
            topOfViewRefType: topOfViewRefType,
            datasourceType: datasourceType
          })
        })
      })]
    });
  };
  return UnthemedSpanDetailRow;
}(React.PureComponent);
export default withTheme2(UnthemedSpanDetailRow);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjbGFzc05hbWVzIiwiUmVhY3QiLCJCdXR0b24iLCJjbGVhckJ1dHRvblN0eWxlcyIsInN0eWxlc0ZhY3RvcnkiLCJ3aXRoVGhlbWUyIiwiYXV0b0NvbG9yIiwiU3BhbkRldGFpbCIsIlNwYW5UcmVlT2Zmc2V0IiwiVGltZWxpbmVSb3ciLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJleHBhbmRlZEFjY2VudCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsImluZm9XcmFwcGVyIiwiX3RlbXBsYXRlT2JqZWN0MiIsIlVudGhlbWVkU3BhbkRldGFpbFJvdyIsIl9SZWFjdCRQdXJlQ29tcG9uZW50IiwiX3RoaXMiLCJfbGVuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImNhbGwiLCJhcHBseSIsImNvbmNhdCIsIl9kZXRhaWxUb2dnbGUiLCJwcm9wcyIsIm9uRGV0YWlsVG9nZ2xlZCIsInNwYW4iLCJzcGFuSUQiLCJfbGlua3NHZXR0ZXIiLCJpdGVtcyIsIml0ZW1JbmRleCIsIl90aGlzJHByb3BzIiwibGlua3NHZXR0ZXIiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsInJlbmRlciIsIl90aGlzJHByb3BzMiIsImNvbG9yIiwiY29sdW1uRGl2aXNpb24iLCJkZXRhaWxTdGF0ZSIsImxvZ0l0ZW1Ub2dnbGUiLCJsb2dzVG9nZ2xlIiwicHJvY2Vzc1RvZ2dsZSIsInJlZmVyZW5jZUl0ZW1Ub2dnbGUiLCJyZWZlcmVuY2VzVG9nZ2xlIiwid2FybmluZ3NUb2dnbGUiLCJzdGFja1RyYWNlc1RvZ2dsZSIsInRpbWVab25lIiwidGFnc1RvZ2dsZSIsInRyYWNlU3RhcnRUaW1lIiwiaG92ZXJJbmRlbnRHdWlkZUlkcyIsImFkZEhvdmVySW5kZW50R3VpZGVJZCIsInJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCIsImNyZWF0ZVNwYW5MaW5rIiwiZm9jdXNlZFNwYW5JZCIsImNyZWF0ZUZvY3VzU3BhbkxpbmsiLCJ0b3BPZlZpZXdSZWZUeXBlIiwiZGF0YXNvdXJjZVR5cGUiLCJzdHlsZXMiLCJjaGlsZHJlbiIsIkNlbGwiLCJ3aWR0aCIsInN0eWxlIiwib3ZlcmZsb3ciLCJzaG93Q2hpbGRyZW5JY29uIiwiZmlsbCIsIm9uQ2xpY2siLCJjbGFzc05hbWUiLCJib3JkZXJDb2xvciIsImJvcmRlclRvcENvbG9yIiwiUHVyZUNvbXBvbmVudCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsUm93LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgR3JhZmFuYVRoZW1lMiwgTGlua01vZGVsLCBUaW1lWm9uZSB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgQnV0dG9uLCBjbGVhckJ1dHRvblN0eWxlcywgc3R5bGVzRmFjdG9yeSwgd2l0aFRoZW1lMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgYXV0b0NvbG9yIH0gZnJvbSAnLi4vVGhlbWUnO1xuaW1wb3J0IHsgU3BhbkxpbmtGdW5jIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgVHJhY2VMb2csIFRyYWNlU3BhbiwgVHJhY2VLZXlWYWx1ZVBhaXIsIFRyYWNlTGluaywgVHJhY2VTcGFuUmVmZXJlbmNlIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuXG5pbXBvcnQgU3BhbkRldGFpbCBmcm9tICcuL1NwYW5EZXRhaWwnO1xuaW1wb3J0IERldGFpbFN0YXRlIGZyb20gJy4vU3BhbkRldGFpbC9EZXRhaWxTdGF0ZSc7XG5pbXBvcnQgU3BhblRyZWVPZmZzZXQgZnJvbSAnLi9TcGFuVHJlZU9mZnNldCc7XG5pbXBvcnQgVGltZWxpbmVSb3cgZnJvbSAnLi9UaW1lbGluZVJvdyc7XG5pbXBvcnQgeyBUb3BPZlZpZXdSZWZUeXBlIH0gZnJvbSAnLi9WaXJ0dWFsaXplZFRyYWNlVmlldyc7XG5cbmNvbnN0IGdldFN0eWxlcyA9IHN0eWxlc0ZhY3RvcnkoKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgZXhwYW5kZWRBY2NlbnQ6IGNzc2BcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQ7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB3aWR0aDogMTAwMHB4O1xuICAgICAgfVxuICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICBib3JkZXItcmlnaHQ6IDEwMDBweCBzb2xpZDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIG9wYWNpdHk6IDAuMjtcbiAgICAgIH1cblxuICAgICAgLyogYm9yZGVyLWNvbG9yIGluaGVyaXQgbXVzdCBjb21lIEFGVEVSIG90aGVyIGJvcmRlciBkZWNsYXJhdGlvbnMgZm9yIGFjY2VudCAqL1xuICAgICAgJjo6YmVmb3JlLFxuICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIGNvbnRlbnQ6ICcgJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgICY6aG92ZXI6OmFmdGVyIHtcbiAgICAgICAgb3BhY2l0eTogMC4zNTtcbiAgICAgIH1cbiAgICBgLFxuICAgIGluZm9XcmFwcGVyOiBjc3NgXG4gICAgICBsYWJlbDogaW5mb1dyYXBwZXI7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNkM2QzZDMnKX07XG4gICAgICBib3JkZXItdG9wOiAzcHggc29saWQ7XG4gICAgICBwYWRkaW5nOiAwLjc1cmVtO1xuICAgIGAsXG4gIH07XG59KTtcblxuZXhwb3J0IHR5cGUgU3BhbkRldGFpbFJvd1Byb3BzID0ge1xuICBjb2xvcjogc3RyaW5nO1xuICBjb2x1bW5EaXZpc2lvbjogbnVtYmVyO1xuICBkZXRhaWxTdGF0ZTogRGV0YWlsU3RhdGU7XG4gIG9uRGV0YWlsVG9nZ2xlZDogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBsaW5rc0dldHRlcjogKHNwYW46IFRyYWNlU3BhbiwgbGlua3M6IFRyYWNlS2V5VmFsdWVQYWlyW10sIGluZGV4OiBudW1iZXIpID0+IFRyYWNlTGlua1tdO1xuICBsb2dJdGVtVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcsIGxvZzogVHJhY2VMb2cpID0+IHZvaWQ7XG4gIGxvZ3NUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgcHJvY2Vzc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICByZWZlcmVuY2VJdGVtVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcsIHJlZmVyZW5jZTogVHJhY2VTcGFuUmVmZXJlbmNlKSA9PiB2b2lkO1xuICByZWZlcmVuY2VzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHdhcm5pbmdzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHN0YWNrVHJhY2VzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNwYW46IFRyYWNlU3BhbjtcbiAgdGltZVpvbmU6IFRpbWVab25lO1xuICB0YWdzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRyYWNlU3RhcnRUaW1lOiBudW1iZXI7XG4gIGhvdmVySW5kZW50R3VpZGVJZHM6IFNldDxzdHJpbmc+O1xuICBhZGRIb3ZlckluZGVudEd1aWRlSWQ6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRoZW1lOiBHcmFmYW5hVGhlbWUyO1xuICBjcmVhdGVTcGFuTGluaz86IFNwYW5MaW5rRnVuYztcbiAgZm9jdXNlZFNwYW5JZD86IHN0cmluZztcbiAgY3JlYXRlRm9jdXNTcGFuTGluazogKHRyYWNlSWQ6IHN0cmluZywgc3BhbklkOiBzdHJpbmcpID0+IExpbmtNb2RlbDtcbiAgdG9wT2ZWaWV3UmVmVHlwZT86IFRvcE9mVmlld1JlZlR5cGU7XG4gIGRhdGFzb3VyY2VUeXBlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgVW50aGVtZWRTcGFuRGV0YWlsUm93IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxTcGFuRGV0YWlsUm93UHJvcHM+IHtcbiAgX2RldGFpbFRvZ2dsZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uRGV0YWlsVG9nZ2xlZCh0aGlzLnByb3BzLnNwYW4uc3BhbklEKTtcbiAgfTtcblxuICBfbGlua3NHZXR0ZXIgPSAoaXRlbXM6IFRyYWNlS2V5VmFsdWVQYWlyW10sIGl0ZW1JbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgeyBsaW5rc0dldHRlciwgc3BhbiB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlua3NHZXR0ZXIoc3BhbiwgaXRlbXMsIGl0ZW1JbmRleCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbG9yLFxuICAgICAgY29sdW1uRGl2aXNpb24sXG4gICAgICBkZXRhaWxTdGF0ZSxcbiAgICAgIGxvZ0l0ZW1Ub2dnbGUsXG4gICAgICBsb2dzVG9nZ2xlLFxuICAgICAgcHJvY2Vzc1RvZ2dsZSxcbiAgICAgIHJlZmVyZW5jZUl0ZW1Ub2dnbGUsXG4gICAgICByZWZlcmVuY2VzVG9nZ2xlLFxuICAgICAgd2FybmluZ3NUb2dnbGUsXG4gICAgICBzdGFja1RyYWNlc1RvZ2dsZSxcbiAgICAgIHNwYW4sXG4gICAgICB0aW1lWm9uZSxcbiAgICAgIHRhZ3NUb2dnbGUsXG4gICAgICB0cmFjZVN0YXJ0VGltZSxcbiAgICAgIGhvdmVySW5kZW50R3VpZGVJZHMsXG4gICAgICBhZGRIb3ZlckluZGVudEd1aWRlSWQsXG4gICAgICByZW1vdmVIb3ZlckluZGVudEd1aWRlSWQsXG4gICAgICB0aGVtZSxcbiAgICAgIGNyZWF0ZVNwYW5MaW5rLFxuICAgICAgZm9jdXNlZFNwYW5JZCxcbiAgICAgIGNyZWF0ZUZvY3VzU3BhbkxpbmssXG4gICAgICB0b3BPZlZpZXdSZWZUeXBlLFxuICAgICAgZGF0YXNvdXJjZVR5cGUsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKHRoZW1lKTtcbiAgICByZXR1cm4gKFxuICAgICAgPFRpbWVsaW5lUm93PlxuICAgICAgICA8VGltZWxpbmVSb3cuQ2VsbCB3aWR0aD17Y29sdW1uRGl2aXNpb259IHN0eWxlPXt7IG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICA8U3BhblRyZWVPZmZzZXRcbiAgICAgICAgICAgIHNwYW49e3NwYW59XG4gICAgICAgICAgICBzaG93Q2hpbGRyZW5JY29uPXtmYWxzZX1cbiAgICAgICAgICAgIGhvdmVySW5kZW50R3VpZGVJZHM9e2hvdmVySW5kZW50R3VpZGVJZHN9XG4gICAgICAgICAgICBhZGRIb3ZlckluZGVudEd1aWRlSWQ9e2FkZEhvdmVySW5kZW50R3VpZGVJZH1cbiAgICAgICAgICAgIHJlbW92ZUhvdmVySW5kZW50R3VpZGVJZD17cmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgZmlsbD1cInRleHRcIlxuICAgICAgICAgICAgb25DbGljaz17dGhpcy5fZGV0YWlsVG9nZ2xlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHN0eWxlcy5leHBhbmRlZEFjY2VudCwgY2xlYXJCdXR0b25TdHlsZXModGhlbWUpKX1cbiAgICAgICAgICAgIHN0eWxlPXt7IGJvcmRlckNvbG9yOiBjb2xvciB9fVxuICAgICAgICAgICAgZGF0YS10ZXN0aWQ9XCJkZXRhaWwtcm93LWV4cGFuZGVkLWFjY2VudFwiXG4gICAgICAgICAgPjwvQnV0dG9uPlxuICAgICAgICA8L1RpbWVsaW5lUm93LkNlbGw+XG4gICAgICAgIDxUaW1lbGluZVJvdy5DZWxsIHdpZHRoPXsxIC0gY29sdW1uRGl2aXNpb259PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaW5mb1dyYXBwZXJ9IHN0eWxlPXt7IGJvcmRlclRvcENvbG9yOiBjb2xvciB9fT5cbiAgICAgICAgICAgIDxTcGFuRGV0YWlsXG4gICAgICAgICAgICAgIGRldGFpbFN0YXRlPXtkZXRhaWxTdGF0ZX1cbiAgICAgICAgICAgICAgbGlua3NHZXR0ZXI9e3RoaXMuX2xpbmtzR2V0dGVyfVxuICAgICAgICAgICAgICBsb2dJdGVtVG9nZ2xlPXtsb2dJdGVtVG9nZ2xlfVxuICAgICAgICAgICAgICBsb2dzVG9nZ2xlPXtsb2dzVG9nZ2xlfVxuICAgICAgICAgICAgICBwcm9jZXNzVG9nZ2xlPXtwcm9jZXNzVG9nZ2xlfVxuICAgICAgICAgICAgICByZWZlcmVuY2VJdGVtVG9nZ2xlPXtyZWZlcmVuY2VJdGVtVG9nZ2xlfVxuICAgICAgICAgICAgICByZWZlcmVuY2VzVG9nZ2xlPXtyZWZlcmVuY2VzVG9nZ2xlfVxuICAgICAgICAgICAgICB3YXJuaW5nc1RvZ2dsZT17d2FybmluZ3NUb2dnbGV9XG4gICAgICAgICAgICAgIHN0YWNrVHJhY2VzVG9nZ2xlPXtzdGFja1RyYWNlc1RvZ2dsZX1cbiAgICAgICAgICAgICAgc3Bhbj17c3Bhbn1cbiAgICAgICAgICAgICAgdGltZVpvbmU9e3RpbWVab25lfVxuICAgICAgICAgICAgICB0YWdzVG9nZ2xlPXt0YWdzVG9nZ2xlfVxuICAgICAgICAgICAgICB0cmFjZVN0YXJ0VGltZT17dHJhY2VTdGFydFRpbWV9XG4gICAgICAgICAgICAgIGNyZWF0ZVNwYW5MaW5rPXtjcmVhdGVTcGFuTGlua31cbiAgICAgICAgICAgICAgZm9jdXNlZFNwYW5JZD17Zm9jdXNlZFNwYW5JZH1cbiAgICAgICAgICAgICAgY3JlYXRlRm9jdXNTcGFuTGluaz17Y3JlYXRlRm9jdXNTcGFuTGlua31cbiAgICAgICAgICAgICAgdG9wT2ZWaWV3UmVmVHlwZT17dG9wT2ZWaWV3UmVmVHlwZX1cbiAgICAgICAgICAgICAgZGF0YXNvdXJjZVR5cGU9e2RhdGFzb3VyY2VUeXBlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9UaW1lbGluZVJvdy5DZWxsPlxuICAgICAgPC9UaW1lbGluZVJvdz5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZTIoVW50aGVtZWRTcGFuRGV0YWlsUm93KTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsVUFBVSxNQUFNLFlBQVk7QUFDbkMsT0FBT0MsS0FBSyxNQUFNLE9BQU87QUFHekIsU0FBU0MsTUFBTSxFQUFFQyxpQkFBaUIsRUFBRUMsYUFBYSxFQUFFQyxVQUFVLFFBQVEsYUFBYTtBQUVsRixTQUFTQyxTQUFTLFFBQVEsVUFBVTtBQUlwQyxPQUFPQyxVQUFVLE1BQU0sY0FBYztBQUVyQyxPQUFPQyxjQUFjLE1BQU0sa0JBQWtCO0FBQzdDLE9BQU9DLFdBQVcsTUFBTSxlQUFlO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBLEVBQUFDLElBQUEsSUFBQUMsS0FBQTtBQUd4QyxJQUFNQyxTQUFTLEdBQUdWLGFBQWEsQ0FBQyxVQUFDVyxLQUFvQixFQUFLO0VBQ3hELE9BQU87SUFDTEMsY0FBYyxFQUFFakIsR0FBRyxDQUFBa0IsZUFBQSxLQUFBQSxlQUFBLEdBQUFDLDJCQUFBLG9yQkE4QmxCO0lBQ0RDLFdBQVcsRUFBRXBCLEdBQUcsQ0FBQXFCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFGLDJCQUFBLGdJQUVNWixTQUFTLENBQUNTLEtBQUssRUFBRSxTQUFTLENBQUM7RUFJbkQsQ0FBQztBQUNILENBQUMsQ0FBQztBQThCRixXQUFhTSxxQkFBcUIsMEJBQUFDLG9CQUFBO0VBQUEs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