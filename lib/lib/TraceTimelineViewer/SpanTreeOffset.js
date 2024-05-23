import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
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
import { get as _get } from 'lodash';
import React from 'react';
import IoChevronRight from 'react-icons/lib/io/chevron-right';
import IoIosArrowDown from 'react-icons/lib/io/ios-arrow-down';
import { stylesFactory, withTheme2 } from '@grafana/ui';
import { autoColor } from '../Theme';
import spanAncestorIds from '../utils/span-ancestor-ids';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var getStyles = stylesFactory(function (theme) {
  return {
    SpanTreeOffset: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: SpanTreeOffset;\n      color: ", ";\n      position: relative;\n    "])), autoColor(theme, '#000')),
    SpanTreeOffsetParent: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: SpanTreeOffsetParent;\n      &:hover {\n        cursor: pointer;\n      }\n    "]))),
    indentGuide: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: indentGuide;\n      /* The size of the indentGuide is based off of the iconWrapper */\n      padding-right: calc(0.5rem + 12px);\n      height: 100%;\n      border-left: 3px solid transparent;\n      display: inline-flex;\n      &::before {\n        content: '';\n        padding-left: 1px;\n        background-color: ", ";\n      }\n    "])), autoColor(theme, 'lightgrey')),
    indentGuideActive: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: indentGuideActive;\n      border-color: ", ";\n      &::before {\n        background-color: transparent;\n      }\n    "])), autoColor(theme, 'darkgrey')),
    iconWrapper: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: iconWrapper;\n      position: absolute;\n      right: 0.25rem;\n    "])))
  };
});
export var UnthemedSpanTreeOffset = /*#__PURE__*/function (_React$PureComponent) {
  function UnthemedSpanTreeOffset(props) {
    var _this;
    _this = _React$PureComponent.call(this, props) || this;
    /**
     * If the mouse leaves to anywhere except another span with the same ancestor id, this span's ancestor id is
     * removed from the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseleave. Includes the related target which is
     *     the element the user is now hovering.
     * @param {string} ancestorId - The span id that the user was hovering over.
     */
    _this.handleMouseLeave = function (event, ancestorId) {
      if (!(event.relatedTarget instanceof HTMLSpanElement) || _get(event, 'relatedTarget.dataset.ancestorId') !== ancestorId) {
        _this.props.removeHoverIndentGuideId(ancestorId);
      }
    };
    /**
     * If the mouse entered this span from anywhere except another span with the same ancestor id, this span's
     * ancestorId is added to the set of hoverIndentGuideIds.
     *
     * @param {Object} event - React Synthetic event tied to mouseenter. Includes the related target which is
     *     the last element the user was hovering.
     * @param {string} ancestorId - The span id that the user is now hovering over.
     */
    _this.handleMouseEnter = function (event, ancestorId) {
      if (!(event.relatedTarget instanceof HTMLSpanElement) || _get(event, 'relatedTarget.dataset.ancestorId') !== ancestorId) {
        _this.props.addHoverIndentGuideId(ancestorId);
      }
    };
    _this.ancestorIds = spanAncestorIds(props.span);
    // Some traces have multiple root-level spans, this connects them all under one guideline and adds the
    // necessary padding for the collapse icon on root-level spans.
    _this.ancestorIds.push('root');
    _this.ancestorIds.reverse();
    return _this;
  }
  _inheritsLoose(UnthemedSpanTreeOffset, _React$PureComponent);
  var _proto = UnthemedSpanTreeOffset.prototype;
  _proto.render = function render() {
    var _cx,
      _this2 = this;
    var _this$props = this.props,
      childrenVisible = _this$props.childrenVisible,
      onClick = _this$props.onClick,
      showChildrenIcon = _this$props.showChildrenIcon,
      span = _this$props.span,
      theme = _this$props.theme;
    var hasChildren = span.hasChildren,
      spanID = span.spanID;
    var wrapperProps = hasChildren ? {
      onClick: onClick,
      role: 'switch',
      'aria-checked': childrenVisible
    } : null;
    var icon = showChildrenIcon && hasChildren && (childrenVisible ? /*#__PURE__*/_jsx(IoIosArrowDown, {
      "data-testid": "icon-arrow-down"
    }) : /*#__PURE__*/_jsx(IoChevronRight, {
      "data-testid": "icon-arrow-right"
    }));
    var styles = getStyles(theme);
    return /*#__PURE__*/_jsxs("span", _extends({
      className: cx(styles.SpanTreeOffset, (_cx = {}, _cx[styles.SpanTreeOffsetParent] = hasChildren, _cx))
    }, wrapperProps, {
      children: [this.ancestorIds.map(function (ancestorId) {
        var _cx2;
        return /*#__PURE__*/_jsx("span", {
          className: cx(styles.indentGuide, (_cx2 = {}, _cx2[styles.indentGuideActive] = _this2.props.hoverIndentGuideIds.has(ancestorId), _cx2)),
          "data-ancestor-id": ancestorId,
          "data-testid": "SpanTreeOffset--indentGuide",
          onMouseEnter: function onMouseEnter(event) {
            return _this2.handleMouseEnter(event, ancestorId);
          },
          onMouseLeave: function onMouseLeave(event) {
            return _this2.handleMouseLeave(event, ancestorId);
          }
        }, ancestorId);
      }), icon && /*#__PURE__*/_jsx("span", {
        className: styles.iconWrapper,
        onMouseEnter: function onMouseEnter(event) {
          return _this2.handleMouseEnter(event, spanID);
        },
        onMouseLeave: function onMouseLeave(event) {
          return _this2.handleMouseLeave(event, spanID);
        },
        "data-testid": "icon-wrapper",
        children: icon
      })]
    }));
  };
  return UnthemedSpanTreeOffset;
}(React.PureComponent);
UnthemedSpanTreeOffset.displayName = 'UnthemedSpanTreeOffset';
UnthemedSpanTreeOffset.defaultProps = {
  childrenVisible: false,
  showChildrenIcon: true
};
export default withTheme2(UnthemedSpanTreeOffset);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImdldCIsIl9nZXQiLCJSZWFjdCIsIklvQ2hldnJvblJpZ2h0IiwiSW9Jb3NBcnJvd0Rvd24iLCJzdHlsZXNGYWN0b3J5Iiwid2l0aFRoZW1lMiIsImF1dG9Db2xvciIsInNwYW5BbmNlc3RvcklkcyIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJ0aGVtZSIsIlNwYW5UcmVlT2Zmc2V0IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiU3BhblRyZWVPZmZzZXRQYXJlbnQiLCJfdGVtcGxhdGVPYmplY3QyIiwiaW5kZW50R3VpZGUiLCJfdGVtcGxhdGVPYmplY3QzIiwiaW5kZW50R3VpZGVBY3RpdmUiLCJfdGVtcGxhdGVPYmplY3Q0IiwiaWNvbldyYXBwZXIiLCJfdGVtcGxhdGVPYmplY3Q1IiwiVW50aGVtZWRTcGFuVHJlZU9mZnNldCIsIl9SZWFjdCRQdXJlQ29tcG9uZW50IiwicHJvcHMiLCJfdGhpcyIsImNhbGwiLCJoYW5kbGVNb3VzZUxlYXZlIiwiZXZlbnQiLCJhbmNlc3RvcklkIiwicmVsYXRlZFRhcmdldCIsIkhUTUxTcGFuRWxlbWVudCIsInJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCIsImhhbmRsZU1vdXNlRW50ZXIiLCJhZGRIb3ZlckluZGVudEd1aWRlSWQiLCJhbmNlc3RvcklkcyIsInNwYW4iLCJwdXNoIiwicmV2ZXJzZSIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwicmVuZGVyIiwiX2N4IiwiX3RoaXMyIiwiX3RoaXMkcHJvcHMiLCJjaGlsZHJlblZpc2libGUiLCJvbkNsaWNrIiwic2hvd0NoaWxkcmVuSWNvbiIsImhhc0NoaWxkcmVuIiwic3BhbklEIiwid3JhcHBlclByb3BzIiwicm9sZSIsImljb24iLCJzdHlsZXMiLCJfZXh0ZW5kcyIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwibWFwIiwiX2N4MiIsImhvdmVySW5kZW50R3VpZGVJZHMiLCJoYXMiLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJQdXJlQ29tcG9uZW50IiwiZGlzcGxheU5hbWUiLCJkZWZhdWx0UHJvcHMiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL1RyYWNlVGltZWxpbmVWaWV3ZXIvU3BhblRyZWVPZmZzZXQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZ2V0IGFzIF9nZXQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJb0NoZXZyb25SaWdodCBmcm9tICdyZWFjdC1pY29ucy9saWIvaW8vY2hldnJvbi1yaWdodCc7XG5pbXBvcnQgSW9Jb3NBcnJvd0Rvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2lvL2lvcy1hcnJvdy1kb3duJztcblxuaW1wb3J0IHsgR3JhZmFuYVRoZW1lMiB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgc3R5bGVzRmFjdG9yeSwgd2l0aFRoZW1lMiB9IGZyb20gJ0BncmFmYW5hL3VpJztcblxuaW1wb3J0IHsgYXV0b0NvbG9yIH0gZnJvbSAnLi4vVGhlbWUnO1xuaW1wb3J0IHsgVHJhY2VTcGFuIH0gZnJvbSAnLi4vdHlwZXMvdHJhY2UnO1xuaW1wb3J0IHNwYW5BbmNlc3RvcklkcyBmcm9tICcuLi91dGlscy9zcGFuLWFuY2VzdG9yLWlkcyc7XG5cbmV4cG9ydCBjb25zdCBnZXRTdHlsZXMgPSBzdHlsZXNGYWN0b3J5KCh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIFNwYW5UcmVlT2Zmc2V0OiBjc3NgXG4gICAgICBsYWJlbDogU3BhblRyZWVPZmZzZXQ7XG4gICAgICBjb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICcjMDAwJyl9O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGAsXG4gICAgU3BhblRyZWVPZmZzZXRQYXJlbnQ6IGNzc2BcbiAgICAgIGxhYmVsOiBTcGFuVHJlZU9mZnNldFBhcmVudDtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG4gICAgYCxcbiAgICBpbmRlbnRHdWlkZTogY3NzYFxuICAgICAgbGFiZWw6IGluZGVudEd1aWRlO1xuICAgICAgLyogVGhlIHNpemUgb2YgdGhlIGluZGVudEd1aWRlIGlzIGJhc2VkIG9mZiBvZiB0aGUgaWNvbldyYXBwZXIgKi9cbiAgICAgIHBhZGRpbmctcmlnaHQ6IGNhbGMoMC41cmVtICsgMTJweCk7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAmOjpiZWZvcmUge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnbGlnaHRncmV5Jyl9O1xuICAgICAgfVxuICAgIGAsXG4gICAgaW5kZW50R3VpZGVBY3RpdmU6IGNzc2BcbiAgICAgIGxhYmVsOiBpbmRlbnRHdWlkZUFjdGl2ZTtcbiAgICAgIGJvcmRlci1jb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICdkYXJrZ3JleScpfTtcbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIGAsXG4gICAgaWNvbldyYXBwZXI6IGNzc2BcbiAgICAgIGxhYmVsOiBpY29uV3JhcHBlcjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHJpZ2h0OiAwLjI1cmVtO1xuICAgIGAsXG4gIH07XG59KTtcblxuZXhwb3J0IHR5cGUgVFByb3BzID0ge1xuICBjaGlsZHJlblZpc2libGU/OiBib29sZWFuO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgc3BhbjogVHJhY2VTcGFuO1xuICBzaG93Q2hpbGRyZW5JY29uPzogYm9vbGVhbjtcblxuICBob3ZlckluZGVudEd1aWRlSWRzOiBTZXQ8c3RyaW5nPjtcbiAgYWRkSG92ZXJJbmRlbnRHdWlkZUlkOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlbW92ZUhvdmVySW5kZW50R3VpZGVJZDogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICB0aGVtZTogR3JhZmFuYVRoZW1lMjtcbn07XG5cbmV4cG9ydCBjbGFzcyBVbnRoZW1lZFNwYW5UcmVlT2Zmc2V0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxUUHJvcHM+IHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ1VudGhlbWVkU3BhblRyZWVPZmZzZXQnO1xuXG4gIGFuY2VzdG9ySWRzOiBzdHJpbmdbXTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNoaWxkcmVuVmlzaWJsZTogZmFsc2UsXG4gICAgc2hvd0NoaWxkcmVuSWNvbjogdHJ1ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogVFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5hbmNlc3RvcklkcyA9IHNwYW5BbmNlc3Rvcklkcyhwcm9wcy5zcGFuKTtcbiAgICAvLyBTb21lIHRyYWNlcyBoYXZlIG11bHRpcGxlIHJvb3QtbGV2ZWwgc3BhbnMsIHRoaXMgY29ubmVjdHMgdGhlbSBhbGwgdW5kZXIgb25lIGd1aWRlbGluZSBhbmQgYWRkcyB0aGVcbiAgICAvLyBuZWNlc3NhcnkgcGFkZGluZyBmb3IgdGhlIGNvbGxhcHNlIGljb24gb24gcm9vdC1sZXZlbCBzcGFucy5cbiAgICB0aGlzLmFuY2VzdG9ySWRzLnB1c2goJ3Jvb3QnKTtcblxuICAgIHRoaXMuYW5jZXN0b3JJZHMucmV2ZXJzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBtb3VzZSBsZWF2ZXMgdG8gYW55d2hlcmUgZXhjZXB0IGFub3RoZXIgc3BhbiB3aXRoIHRoZSBzYW1lIGFuY2VzdG9yIGlkLCB0aGlzIHNwYW4ncyBhbmNlc3RvciBpZCBpc1xuICAgKiByZW1vdmVkIGZyb20gdGhlIHNldCBvZiBob3ZlckluZGVudEd1aWRlSWRzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBSZWFjdCBTeW50aGV0aWMgZXZlbnQgdGllZCB0byBtb3VzZWxlYXZlLiBJbmNsdWRlcyB0aGUgcmVsYXRlZCB0YXJnZXQgd2hpY2ggaXNcbiAgICogICAgIHRoZSBlbGVtZW50IHRoZSB1c2VyIGlzIG5vdyBob3ZlcmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGFuY2VzdG9ySWQgLSBUaGUgc3BhbiBpZCB0aGF0IHRoZSB1c2VyIHdhcyBob3ZlcmluZyBvdmVyLlxuICAgKi9cbiAgaGFuZGxlTW91c2VMZWF2ZSA9IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MU3BhbkVsZW1lbnQ+LCBhbmNlc3RvcklkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoXG4gICAgICAhKGV2ZW50LnJlbGF0ZWRUYXJnZXQgaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQpIHx8XG4gICAgICBfZ2V0KGV2ZW50LCAncmVsYXRlZFRhcmdldC5kYXRhc2V0LmFuY2VzdG9ySWQnKSAhPT0gYW5jZXN0b3JJZFxuICAgICkge1xuICAgICAgdGhpcy5wcm9wcy5yZW1vdmVIb3ZlckluZGVudEd1aWRlSWQoYW5jZXN0b3JJZCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgbW91c2UgZW50ZXJlZCB0aGlzIHNwYW4gZnJvbSBhbnl3aGVyZSBleGNlcHQgYW5vdGhlciBzcGFuIHdpdGggdGhlIHNhbWUgYW5jZXN0b3IgaWQsIHRoaXMgc3BhbidzXG4gICAqIGFuY2VzdG9ySWQgaXMgYWRkZWQgdG8gdGhlIHNldCBvZiBob3ZlckluZGVudEd1aWRlSWRzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBSZWFjdCBTeW50aGV0aWMgZXZlbnQgdGllZCB0byBtb3VzZWVudGVyLiBJbmNsdWRlcyB0aGUgcmVsYXRlZCB0YXJnZXQgd2hpY2ggaXNcbiAgICogICAgIHRoZSBsYXN0IGVsZW1lbnQgdGhlIHVzZXIgd2FzIGhvdmVyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYW5jZXN0b3JJZCAtIFRoZSBzcGFuIGlkIHRoYXQgdGhlIHVzZXIgaXMgbm93IGhvdmVyaW5nIG92ZXIuXG4gICAqL1xuICBoYW5kbGVNb3VzZUVudGVyID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxTcGFuRWxlbWVudD4sIGFuY2VzdG9ySWQ6IHN0cmluZykgPT4ge1xuICAgIGlmIChcbiAgICAgICEoZXZlbnQucmVsYXRlZFRhcmdldCBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCkgfHxcbiAgICAgIF9nZXQoZXZlbnQsICdyZWxhdGVkVGFyZ2V0LmRhdGFzZXQuYW5jZXN0b3JJZCcpICE9PSBhbmNlc3RvcklkXG4gICAgKSB7XG4gICAgICB0aGlzLnByb3BzLmFkZEhvdmVySW5kZW50R3VpZGVJZChhbmNlc3RvcklkKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW5WaXNpYmxlLCBvbkNsaWNrLCBzaG93Q2hpbGRyZW5JY29uLCBzcGFuLCB0aGVtZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGhhc0NoaWxkcmVuLCBzcGFuSUQgfSA9IHNwYW47XG4gICAgY29uc3Qgd3JhcHBlclByb3BzID0gaGFzQ2hpbGRyZW4gPyB7IG9uQ2xpY2ssIHJvbGU6ICdzd2l0Y2gnLCAnYXJpYS1jaGVja2VkJzogY2hpbGRyZW5WaXNpYmxlIH0gOiBudWxsO1xuICAgIGNvbnN0IGljb24gPVxuICAgICAgc2hvd0NoaWxkcmVuSWNvbiAmJlxuICAgICAgaGFzQ2hpbGRyZW4gJiZcbiAgICAgIChjaGlsZHJlblZpc2libGUgPyAoXG4gICAgICAgIDxJb0lvc0Fycm93RG93biBkYXRhLXRlc3RpZD1cImljb24tYXJyb3ctZG93blwiIC8+XG4gICAgICApIDogKFxuICAgICAgICA8SW9DaGV2cm9uUmlnaHQgZGF0YS10ZXN0aWQ9XCJpY29uLWFycm93LXJpZ2h0XCIgLz5cbiAgICAgICkpO1xuICAgIGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlcyh0aGVtZSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y3goc3R5bGVzLlNwYW5UcmVlT2Zmc2V0LCB7IFtzdHlsZXMuU3BhblRyZWVPZmZzZXRQYXJlbnRdOiBoYXNDaGlsZHJlbiB9KX0gey4uLndyYXBwZXJQcm9wc30+XG4gICAgICAgIHt0aGlzLmFuY2VzdG9ySWRzLm1hcCgoYW5jZXN0b3JJZCkgPT4gKFxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBrZXk9e2FuY2VzdG9ySWR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2N4KHN0eWxlcy5pbmRlbnRHdWlkZSwge1xuICAgICAgICAgICAgICBbc3R5bGVzLmluZGVudEd1aWRlQWN0aXZlXTogdGhpcy5wcm9wcy5ob3ZlckluZGVudEd1aWRlSWRzLmhhcyhhbmNlc3RvcklkKSxcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgZGF0YS1hbmNlc3Rvci1pZD17YW5jZXN0b3JJZH1cbiAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiU3BhblRyZWVPZmZzZXQtLWluZGVudEd1aWRlXCJcbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZU1vdXNlRW50ZXIoZXZlbnQsIGFuY2VzdG9ySWQpfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlTW91c2VMZWF2ZShldmVudCwgYW5jZXN0b3JJZCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICAgIHtpY29uICYmIChcbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuaWNvbldyYXBwZXJ9XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVNb3VzZUVudGVyKGV2ZW50LCBzcGFuSUQpfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlTW91c2VMZWF2ZShldmVudCwgc3BhbklEKX1cbiAgICAgICAgICAgIGRhdGEtdGVzdGlkPVwiaWNvbi13cmFwcGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aWNvbn1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICl9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoVGhlbWUyKFVudGhlbWVkU3BhblRyZWVPZmZzZXQpO1xuIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsRUFBRSxNQUFNLFlBQVk7QUFDM0IsU0FBU0MsR0FBRyxJQUFJQyxJQUFJLFFBQVEsUUFBUTtBQUNwQyxPQUFPQyxLQUFLLE1BQU0sT0FBTztBQUN6QixPQUFPQyxjQUFjLE1BQU0sa0NBQWtDO0FBQzdELE9BQU9DLGNBQWMsTUFBTSxtQ0FBbUM7QUFHOUQsU0FBU0MsYUFBYSxFQUFFQyxVQUFVLFFBQVEsYUFBYTtBQUV2RCxTQUFTQyxTQUFTLFFBQVEsVUFBVTtBQUVwQyxPQUFPQyxlQUFlLE1BQU0sNEJBQTRCO0FBQUMsU0FBQUMsR0FBQSxJQUFBQyxJQUFBLEVBQUFDLElBQUEsSUFBQUMsS0FBQTtBQUV6RCxPQUFPLElBQU1DLFNBQVMsR0FBR1IsYUFBYSxDQUFDLFVBQUNTLEtBQW9CLEVBQUs7RUFDL0QsT0FBTztJQUNMQyxjQUFjLEVBQUVqQixHQUFHLENBQUFrQixlQUFBLEtBQUFBLGVBQUEsR0FBQUMsMkJBQUEsNEZBRVJWLFNBQVMsQ0FBQ08sS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUVsQztJQUNESSxvQkFBb0IsRUFBRXBCLEdBQUcsQ0FBQXFCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFGLDJCQUFBLHNHQUt4QjtJQUNERyxXQUFXLEVBQUV0QixHQUFHLENBQUF1QixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBSiwyQkFBQSwwV0FVUVYsU0FBUyxDQUFDTyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBRXBEO0lBQ0RRLGlCQUFpQixFQUFFeEIsR0FBRyxDQUFBeUIsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQU4sMkJBQUEs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