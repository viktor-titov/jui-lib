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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjbGFzc05hbWVzIiwiUmVhY3QiLCJCdXR0b24iLCJjbGVhckJ1dHRvblN0eWxlcyIsInN0eWxlc0ZhY3RvcnkiLCJ3aXRoVGhlbWUyIiwiYXV0b0NvbG9yIiwiU3BhbkRldGFpbCIsIlNwYW5UcmVlT2Zmc2V0IiwiVGltZWxpbmVSb3ciLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJleHBhbmRlZEFjY2VudCIsIl90ZW1wbGF0ZU9iamVjdCIsIl90YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSIsImluZm9XcmFwcGVyIiwiX3RlbXBsYXRlT2JqZWN0MiIsIlVudGhlbWVkU3BhbkRldGFpbFJvdyIsIl9SZWFjdCRQdXJlQ29tcG9uZW50IiwiX3RoaXMiLCJfbGVuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImNhbGwiLCJhcHBseSIsImNvbmNhdCIsIl9kZXRhaWxUb2dnbGUiLCJwcm9wcyIsIm9uRGV0YWlsVG9nZ2xlZCIsInNwYW4iLCJzcGFuSUQiLCJfbGlua3NHZXR0ZXIiLCJpdGVtcyIsIml0ZW1JbmRleCIsIl90aGlzJHByb3BzIiwibGlua3NHZXR0ZXIiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsInJlbmRlciIsIl90aGlzJHByb3BzMiIsImNvbG9yIiwiY29sdW1uRGl2aXNpb24iLCJkZXRhaWxTdGF0ZSIsImxvZ0l0ZW1Ub2dnbGUiLCJsb2dzVG9nZ2xlIiwicHJvY2Vzc1RvZ2dsZSIsInJlZmVyZW5jZUl0ZW1Ub2dnbGUiLCJyZWZlcmVuY2VzVG9nZ2xlIiwid2FybmluZ3NUb2dnbGUiLCJzdGFja1RyYWNlc1RvZ2dsZSIsInRpbWVab25lIiwidGFnc1RvZ2dsZSIsInRyYWNlU3RhcnRUaW1lIiwiaG92ZXJJbmRlbnRHdWlkZUlkcyIsImFkZEhvdmVySW5kZW50R3VpZGVJZCIsInJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCIsImNyZWF0ZVNwYW5MaW5rIiwiZm9jdXNlZFNwYW5JZCIsImNyZWF0ZUZvY3VzU3BhbkxpbmsiLCJ0b3BPZlZpZXdSZWZUeXBlIiwiZGF0YXNvdXJjZVR5cGUiLCJzdHlsZXMiLCJjaGlsZHJlbiIsIkNlbGwiLCJ3aWR0aCIsInN0eWxlIiwib3ZlcmZsb3ciLCJzaG93Q2hpbGRyZW5JY29uIiwiZmlsbCIsIm9uQ2xpY2siLCJjbGFzc05hbWUiLCJib3JkZXJDb2xvciIsImJvcmRlclRvcENvbG9yIiwiUHVyZUNvbXBvbmVudCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5EZXRhaWxSb3cudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBHcmFmYW5hVGhlbWUyLCBMaW5rTW9kZWwsIFRpbWVab25lIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBCdXR0b24sIGNsZWFyQnV0dG9uU3R5bGVzLCBzdHlsZXNGYWN0b3J5LCB3aXRoVGhlbWUyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi9UaGVtZSc7XG5pbXBvcnQgeyBTcGFuTGlua0Z1bmMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFjZUxvZywgVHJhY2VTcGFuLCBUcmFjZUtleVZhbHVlUGFpciwgVHJhY2VMaW5rLCBUcmFjZVNwYW5SZWZlcmVuY2UgfSBmcm9tICcuLi90eXBlcy90cmFjZSc7XG5cbmltcG9ydCBTcGFuRGV0YWlsIGZyb20gJy4vU3BhbkRldGFpbCc7XG5pbXBvcnQgRGV0YWlsU3RhdGUgZnJvbSAnLi9TcGFuRGV0YWlsL0RldGFpbFN0YXRlJztcbmltcG9ydCBTcGFuVHJlZU9mZnNldCBmcm9tICcuL1NwYW5UcmVlT2Zmc2V0JztcbmltcG9ydCBUaW1lbGluZVJvdyBmcm9tICcuL1RpbWVsaW5lUm93JztcbmltcG9ydCB7IFRvcE9mVmlld1JlZlR5cGUgfSBmcm9tICcuL1ZpcnR1YWxpemVkVHJhY2VWaWV3JztcblxuY29uc3QgZ2V0U3R5bGVzID0gc3R5bGVzRmFjdG9yeSgodGhlbWU6IEdyYWZhbmFUaGVtZTIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBleHBhbmRlZEFjY2VudDogY3NzYFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHdpZHRoOiAxMDAwcHg7XG4gICAgICB9XG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIGJvcmRlci1yaWdodDogMTAwMHB4IHNvbGlkO1xuICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgb3BhY2l0eTogMC4yO1xuICAgICAgfVxuXG4gICAgICAvKiBib3JkZXItY29sb3IgaW5oZXJpdCBtdXN0IGNvbWUgQUZURVIgb3RoZXIgYm9yZGVyIGRlY2xhcmF0aW9ucyBmb3IgYWNjZW50ICovXG4gICAgICAmOjpiZWZvcmUsXG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgY29udGVudDogJyAnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgJjpob3Zlcjo6YWZ0ZXIge1xuICAgICAgICBvcGFjaXR5OiAwLjM1O1xuICAgICAgfVxuICAgIGAsXG4gICAgaW5mb1dyYXBwZXI6IGNzc2BcbiAgICAgIGxhYmVsOiBpbmZvV3JhcHBlcjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2QzZDNkMycpfTtcbiAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZDtcbiAgICAgIHBhZGRpbmc6IDAuNzVyZW07XG4gICAgYCxcbiAgfTtcbn0pO1xuXG5leHBvcnQgdHlwZSBTcGFuRGV0YWlsUm93UHJvcHMgPSB7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIGNvbHVtbkRpdmlzaW9uOiBudW1iZXI7XG4gIGRldGFpbFN0YXRlOiBEZXRhaWxTdGF0ZTtcbiAgb25EZXRhaWxUb2dnbGVkOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGxpbmtzR2V0dGVyOiAoc3BhbjogVHJhY2VTcGFuLCBsaW5rczogVHJhY2VLZXlWYWx1ZVBhaXJbXSwgaW5kZXg6IG51bWJlcikgPT4gVHJhY2VMaW5rW107XG4gIGxvZ0l0ZW1Ub2dnbGU6IChzcGFuSUQ6IHN0cmluZywgbG9nOiBUcmFjZUxvZykgPT4gdm9pZDtcbiAgbG9nc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBwcm9jZXNzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlZmVyZW5jZUl0ZW1Ub2dnbGU6IChzcGFuSUQ6IHN0cmluZywgcmVmZXJlbmNlOiBUcmFjZVNwYW5SZWZlcmVuY2UpID0+IHZvaWQ7XG4gIHJlZmVyZW5jZXNUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgd2FybmluZ3NUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc3RhY2tUcmFjZXNUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc3BhbjogVHJhY2VTcGFuO1xuICB0aW1lWm9uZTogVGltZVpvbmU7XG4gIHRhZ3NUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdHJhY2VTdGFydFRpbWU6IG51bWJlcjtcbiAgaG92ZXJJbmRlbnRHdWlkZUlkczogU2V0PHN0cmluZz47XG4gIGFkZEhvdmVySW5kZW50R3VpZGVJZDogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICByZW1vdmVIb3ZlckluZGVudEd1aWRlSWQ6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdGhlbWU6IEdyYWZhbmFUaGVtZTI7XG4gIGNyZWF0ZVNwYW5MaW5rPzogU3BhbkxpbmtGdW5jO1xuICBmb2N1c2VkU3BhbklkPzogc3RyaW5nO1xuICBjcmVhdGVGb2N1c1NwYW5MaW5rOiAodHJhY2VJZDogc3RyaW5nLCBzcGFuSWQ6IHN0cmluZykgPT4gTGlua01vZGVsO1xuICB0b3BPZlZpZXdSZWZUeXBlPzogVG9wT2ZWaWV3UmVmVHlwZTtcbiAgZGF0YXNvdXJjZVR5cGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjbGFzcyBVbnRoZW1lZFNwYW5EZXRhaWxSb3cgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFNwYW5EZXRhaWxSb3dQcm9wcz4ge1xuICBfZGV0YWlsVG9nZ2xlID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25EZXRhaWxUb2dnbGVkKHRoaXMucHJvcHMuc3Bhbi5zcGFuSUQpO1xuICB9O1xuXG4gIF9saW5rc0dldHRlciA9IChpdGVtczogVHJhY2VLZXlWYWx1ZVBhaXJbXSwgaXRlbUluZGV4OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB7IGxpbmtzR2V0dGVyLCBzcGFuIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaW5rc0dldHRlcihzcGFuLCBpdGVtcywgaXRlbUluZGV4KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29sb3IsXG4gICAgICBjb2x1bW5EaXZpc2lvbixcbiAgICAgIGRldGFpbFN0YXRlLFxuICAgICAgbG9nSXRlbVRvZ2dsZSxcbiAgICAgIGxvZ3NUb2dnbGUsXG4gICAgICBwcm9jZXNzVG9nZ2xlLFxuICAgICAgcmVmZXJlbmNlSXRlbVRvZ2dsZSxcbiAgICAgIHJlZmVyZW5jZXNUb2dnbGUsXG4gICAgICB3YXJuaW5nc1RvZ2dsZSxcbiAgICAgIHN0YWNrVHJhY2VzVG9nZ2xlLFxuICAgICAgc3BhbixcbiAgICAgIHRpbWVab25lLFxuICAgICAgdGFnc1RvZ2dsZSxcbiAgICAgIHRyYWNlU3RhcnRUaW1lLFxuICAgICAgaG92ZXJJbmRlbnRHdWlkZUlkcyxcbiAgICAgIGFkZEhvdmVySW5kZW50R3VpZGVJZCxcbiAgICAgIHJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCxcbiAgICAgIHRoZW1lLFxuICAgICAgY3JlYXRlU3BhbkxpbmssXG4gICAgICBmb2N1c2VkU3BhbklkLFxuICAgICAgY3JlYXRlRm9jdXNTcGFuTGluayxcbiAgICAgIHRvcE9mVmlld1JlZlR5cGUsXG4gICAgICBkYXRhc291cmNlVHlwZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzdHlsZXMgPSBnZXRTdHlsZXModGhlbWUpO1xuICAgIHJldHVybiAoXG4gICAgICA8VGltZWxpbmVSb3c+XG4gICAgICAgIDxUaW1lbGluZVJvdy5DZWxsIHdpZHRoPXtjb2x1bW5EaXZpc2lvbn0gc3R5bGU9e3sgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgICAgIDxTcGFuVHJlZU9mZnNldFxuICAgICAgICAgICAgc3Bhbj17c3Bhbn1cbiAgICAgICAgICAgIHNob3dDaGlsZHJlbkljb249e2ZhbHNlfVxuICAgICAgICAgICAgaG92ZXJJbmRlbnRHdWlkZUlkcz17aG92ZXJJbmRlbnRHdWlkZUlkc31cbiAgICAgICAgICAgIGFkZEhvdmVySW5kZW50R3VpZGVJZD17YWRkSG92ZXJJbmRlbnRHdWlkZUlkfVxuICAgICAgICAgICAgcmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkPXtyZW1vdmVIb3ZlckluZGVudEd1aWRlSWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBmaWxsPVwidGV4dFwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9kZXRhaWxUb2dnbGV9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoc3R5bGVzLmV4cGFuZGVkQWNjZW50LCBjbGVhckJ1dHRvblN0eWxlcyh0aGVtZSkpfVxuICAgICAgICAgICAgc3R5bGU9e3sgYm9yZGVyQ29sb3I6IGNvbG9yIH19XG4gICAgICAgICAgICBkYXRhLXRlc3RpZD1cImRldGFpbC1yb3ctZXhwYW5kZWQtYWNjZW50XCJcbiAgICAgICAgICA+PC9CdXR0b24+XG4gICAgICAgIDwvVGltZWxpbmVSb3cuQ2VsbD5cbiAgICAgICAgPFRpbWVsaW5lUm93LkNlbGwgd2lkdGg9ezEgLSBjb2x1bW5EaXZpc2lvbn0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5pbmZvV3JhcHBlcn0gc3R5bGU9e3sgYm9yZGVyVG9wQ29sb3I6IGNvbG9yIH19PlxuICAgICAgICAgICAgPFNwYW5EZXRhaWxcbiAgICAgICAgICAgICAgZGV0YWlsU3RhdGU9e2RldGFpbFN0YXRlfVxuICAgICAgICAgICAgICBsaW5rc0dldHRlcj17dGhpcy5fbGlua3NHZXR0ZXJ9XG4gICAgICAgICAgICAgIGxvZ0l0ZW1Ub2dnbGU9e2xvZ0l0ZW1Ub2dnbGV9XG4gICAgICAgICAgICAgIGxvZ3NUb2dnbGU9e2xvZ3NUb2dnbGV9XG4gICAgICAgICAgICAgIHByb2Nlc3NUb2dnbGU9e3Byb2Nlc3NUb2dnbGV9XG4gICAgICAgICAgICAgIHJlZmVyZW5jZUl0ZW1Ub2dnbGU9e3JlZmVyZW5jZUl0ZW1Ub2dnbGV9XG4gICAgICAgICAgICAgIHJlZmVyZW5jZXNUb2dnbGU9e3JlZmVyZW5jZXNUb2dnbGV9XG4gICAgICAgICAgICAgIHdhcm5pbmdzVG9nZ2xlPXt3YXJuaW5nc1RvZ2dsZX1cbiAgICAgICAgICAgICAgc3RhY2tUcmFjZXNUb2dnbGU9e3N0YWNrVHJhY2VzVG9nZ2xlfVxuICAgICAgICAgICAgICBzcGFuPXtzcGFufVxuICAgICAgICAgICAgICB0aW1lWm9uZT17dGltZVpvbmV9XG4gICAgICAgICAgICAgIHRhZ3NUb2dnbGU9e3RhZ3NUb2dnbGV9XG4gICAgICAgICAgICAgIHRyYWNlU3RhcnRUaW1lPXt0cmFjZVN0YXJ0VGltZX1cbiAgICAgICAgICAgICAgY3JlYXRlU3Bhbkxpbms9e2NyZWF0ZVNwYW5MaW5rfVxuICAgICAgICAgICAgICBmb2N1c2VkU3BhbklkPXtmb2N1c2VkU3BhbklkfVxuICAgICAgICAgICAgICBjcmVhdGVGb2N1c1NwYW5MaW5rPXtjcmVhdGVGb2N1c1NwYW5MaW5rfVxuICAgICAgICAgICAgICB0b3BPZlZpZXdSZWZUeXBlPXt0b3BPZlZpZXdSZWZUeXBlfVxuICAgICAgICAgICAgICBkYXRhc291cmNlVHlwZT17ZGF0YXNvdXJjZVR5cGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1RpbWVsaW5lUm93LkNlbGw+XG4gICAgICA8L1RpbWVsaW5lUm93PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFRoZW1lMihVbnRoZW1lZFNwYW5EZXRhaWxSb3cpO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxVQUFVLE1BQU0sWUFBWTtBQUNuQyxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUd6QixTQUFTQyxNQUFNLEVBQUVDLGlCQUFpQixFQUFFQyxhQUFhLEVBQUVDLFVBQVUsUUFBUSxhQUFhO0FBRWxGLFNBQVNDLFNBQVMsUUFBUSxVQUFVO0FBSXBDLE9BQU9DLFVBQVUsTUFBTSxjQUFjO0FBRXJDLE9BQU9DLGNBQWMsTUFBTSxrQkFBa0I7QUFDN0MsT0FBT0MsV0FBVyxNQUFNLGVBQWU7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBR3hDLElBQU1DLFNBQVMsR0FBR1YsYUFBYSxDQUFDLFVBQUNXLEtBQW9CLEVBQUs7RUFDeEQsT0FBTztJQUNMQyxjQUFjLEVBQUVqQixHQUFHLENBQUFrQixlQUFBLEtBQUFBLGVBQUEsR0FBQUMsMkJBQUEsb3JCQThCbEI7SUFDREMsV0FBVyxFQUFFcEIsR0FBRyxDQUFBcUIsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUYsMkJBQUEsZ0lBRU1aLFNBQVMsQ0FBQ1MsS0FBSyxFQUFFLFNBQVMsQ0FBQztFQUluRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBOEJGLFdBQWFNLHFCQUFxQiwwQkFBQUMsb0JBQUE7RUFBQSxTQUFBRCxz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