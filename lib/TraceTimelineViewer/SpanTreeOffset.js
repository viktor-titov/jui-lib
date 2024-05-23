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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImdldCIsIl9nZXQiLCJSZWFjdCIsIklvQ2hldnJvblJpZ2h0IiwiSW9Jb3NBcnJvd0Rvd24iLCJzdHlsZXNGYWN0b3J5Iiwid2l0aFRoZW1lMiIsImF1dG9Db2xvciIsInNwYW5BbmNlc3RvcklkcyIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJ0aGVtZSIsIlNwYW5UcmVlT2Zmc2V0IiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiU3BhblRyZWVPZmZzZXRQYXJlbnQiLCJfdGVtcGxhdGVPYmplY3QyIiwiaW5kZW50R3VpZGUiLCJfdGVtcGxhdGVPYmplY3QzIiwiaW5kZW50R3VpZGVBY3RpdmUiLCJfdGVtcGxhdGVPYmplY3Q0IiwiaWNvbldyYXBwZXIiLCJfdGVtcGxhdGVPYmplY3Q1IiwiVW50aGVtZWRTcGFuVHJlZU9mZnNldCIsIl9SZWFjdCRQdXJlQ29tcG9uZW50IiwicHJvcHMiLCJfdGhpcyIsImNhbGwiLCJoYW5kbGVNb3VzZUxlYXZlIiwiZXZlbnQiLCJhbmNlc3RvcklkIiwicmVsYXRlZFRhcmdldCIsIkhUTUxTcGFuRWxlbWVudCIsInJlbW92ZUhvdmVySW5kZW50R3VpZGVJZCIsImhhbmRsZU1vdXNlRW50ZXIiLCJhZGRIb3ZlckluZGVudEd1aWRlSWQiLCJhbmNlc3RvcklkcyIsInNwYW4iLCJwdXNoIiwicmV2ZXJzZSIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwicmVuZGVyIiwiX2N4IiwiX3RoaXMyIiwiX3RoaXMkcHJvcHMiLCJjaGlsZHJlblZpc2libGUiLCJvbkNsaWNrIiwic2hvd0NoaWxkcmVuSWNvbiIsImhhc0NoaWxkcmVuIiwic3BhbklEIiwid3JhcHBlclByb3BzIiwicm9sZSIsImljb24iLCJzdHlsZXMiLCJfZXh0ZW5kcyIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwibWFwIiwiX2N4MiIsImhvdmVySW5kZW50R3VpZGVJZHMiLCJoYXMiLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJQdXJlQ29tcG9uZW50IiwiZGlzcGxheU5hbWUiLCJkZWZhdWx0UHJvcHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuVHJlZU9mZnNldC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBnZXQgYXMgX2dldCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IElvQ2hldnJvblJpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9pby9jaGV2cm9uLXJpZ2h0JztcbmltcG9ydCBJb0lvc0Fycm93RG93biBmcm9tICdyZWFjdC1pY29ucy9saWIvaW8vaW9zLWFycm93LWRvd24nO1xuXG5pbXBvcnQgeyBHcmFmYW5hVGhlbWUyIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBzdHlsZXNGYWN0b3J5LCB3aXRoVGhlbWUyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi9UaGVtZSc7XG5pbXBvcnQgeyBUcmFjZVNwYW4gfSBmcm9tICcuLi90eXBlcy90cmFjZSc7XG5pbXBvcnQgc3BhbkFuY2VzdG9ySWRzIGZyb20gJy4uL3V0aWxzL3NwYW4tYW5jZXN0b3ItaWRzJztcblxuZXhwb3J0IGNvbnN0IGdldFN0eWxlcyA9IHN0eWxlc0ZhY3RvcnkoKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgU3BhblRyZWVPZmZzZXQ6IGNzc2BcbiAgICAgIGxhYmVsOiBTcGFuVHJlZU9mZnNldDtcbiAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyMwMDAnKX07XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYCxcbiAgICBTcGFuVHJlZU9mZnNldFBhcmVudDogY3NzYFxuICAgICAgbGFiZWw6IFNwYW5UcmVlT2Zmc2V0UGFyZW50O1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIH1cbiAgICBgLFxuICAgIGluZGVudEd1aWRlOiBjc3NgXG4gICAgICBsYWJlbDogaW5kZW50R3VpZGU7XG4gICAgICAvKiBUaGUgc2l6ZSBvZiB0aGUgaW5kZW50R3VpZGUgaXMgYmFzZWQgb2ZmIG9mIHRoZSBpY29uV3JhcHBlciAqL1xuICAgICAgcGFkZGluZy1yaWdodDogY2FsYygwLjVyZW0gKyAxMnB4KTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDFweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICdsaWdodGdyZXknKX07XG4gICAgICB9XG4gICAgYCxcbiAgICBpbmRlbnRHdWlkZUFjdGl2ZTogY3NzYFxuICAgICAgbGFiZWw6IGluZGVudEd1aWRlQWN0aXZlO1xuICAgICAgYm9yZGVyLWNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJ2RhcmtncmV5Jyl9O1xuICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgYCxcbiAgICBpY29uV3JhcHBlcjogY3NzYFxuICAgICAgbGFiZWw6IGljb25XcmFwcGVyO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgcmlnaHQ6IDAuMjVyZW07XG4gICAgYCxcbiAgfTtcbn0pO1xuXG5leHBvcnQgdHlwZSBUUHJvcHMgPSB7XG4gIGNoaWxkcmVuVmlzaWJsZT86IGJvb2xlYW47XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICBzcGFuOiBUcmFjZVNwYW47XG4gIHNob3dDaGlsZHJlbkljb24/OiBib29sZWFuO1xuXG4gIGhvdmVySW5kZW50R3VpZGVJZHM6IFNldDxzdHJpbmc+O1xuICBhZGRIb3ZlckluZGVudEd1aWRlSWQ6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVtb3ZlSG92ZXJJbmRlbnRHdWlkZUlkOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRoZW1lOiBHcmFmYW5hVGhlbWUyO1xufTtcblxuZXhwb3J0IGNsYXNzIFVudGhlbWVkU3BhblRyZWVPZmZzZXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFRQcm9wcz4ge1xuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnVW50aGVtZWRTcGFuVHJlZU9mZnNldCc7XG5cbiAgYW5jZXN0b3JJZHM6IHN0cmluZ1tdO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY2hpbGRyZW5WaXNpYmxlOiBmYWxzZSxcbiAgICBzaG93Q2hpbGRyZW5JY29uOiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBUUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmFuY2VzdG9ySWRzID0gc3BhbkFuY2VzdG9ySWRzKHByb3BzLnNwYW4pO1xuICAgIC8vIFNvbWUgdHJhY2VzIGhhdmUgbXVsdGlwbGUgcm9vdC1sZXZlbCBzcGFucywgdGhpcyBjb25uZWN0cyB0aGVtIGFsbCB1bmRlciBvbmUgZ3VpZGVsaW5lIGFuZCBhZGRzIHRoZVxuICAgIC8vIG5lY2Vzc2FyeSBwYWRkaW5nIGZvciB0aGUgY29sbGFwc2UgaWNvbiBvbiByb290LWxldmVsIHNwYW5zLlxuICAgIHRoaXMuYW5jZXN0b3JJZHMucHVzaCgncm9vdCcpO1xuXG4gICAgdGhpcy5hbmNlc3Rvcklkcy5yZXZlcnNlKCk7XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIG1vdXNlIGxlYXZlcyB0byBhbnl3aGVyZSBleGNlcHQgYW5vdGhlciBzcGFuIHdpdGggdGhlIHNhbWUgYW5jZXN0b3IgaWQsIHRoaXMgc3BhbidzIGFuY2VzdG9yIGlkIGlzXG4gICAqIHJlbW92ZWQgZnJvbSB0aGUgc2V0IG9mIGhvdmVySW5kZW50R3VpZGVJZHMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFJlYWN0IFN5bnRoZXRpYyBldmVudCB0aWVkIHRvIG1vdXNlbGVhdmUuIEluY2x1ZGVzIHRoZSByZWxhdGVkIHRhcmdldCB3aGljaCBpc1xuICAgKiAgICAgdGhlIGVsZW1lbnQgdGhlIHVzZXIgaXMgbm93IGhvdmVyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gYW5jZXN0b3JJZCAtIFRoZSBzcGFuIGlkIHRoYXQgdGhlIHVzZXIgd2FzIGhvdmVyaW5nIG92ZXIuXG4gICAqL1xuICBoYW5kbGVNb3VzZUxlYXZlID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxTcGFuRWxlbWVudD4sIGFuY2VzdG9ySWQ6IHN0cmluZykgPT4ge1xuICAgIGlmIChcbiAgICAgICEoZXZlbnQucmVsYXRlZFRhcmdldCBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCkgfHxcbiAgICAgIF9nZXQoZXZlbnQsICdyZWxhdGVkVGFyZ2V0LmRhdGFzZXQuYW5jZXN0b3JJZCcpICE9PSBhbmNlc3RvcklkXG4gICAgKSB7XG4gICAgICB0aGlzLnByb3BzLnJlbW92ZUhvdmVySW5kZW50R3VpZGVJZChhbmNlc3RvcklkKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIElmIHRoZSBtb3VzZSBlbnRlcmVkIHRoaXMgc3BhbiBmcm9tIGFueXdoZXJlIGV4Y2VwdCBhbm90aGVyIHNwYW4gd2l0aCB0aGUgc2FtZSBhbmNlc3RvciBpZCwgdGhpcyBzcGFuJ3NcbiAgICogYW5jZXN0b3JJZCBpcyBhZGRlZCB0byB0aGUgc2V0IG9mIGhvdmVySW5kZW50R3VpZGVJZHMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFJlYWN0IFN5bnRoZXRpYyBldmVudCB0aWVkIHRvIG1vdXNlZW50ZXIuIEluY2x1ZGVzIHRoZSByZWxhdGVkIHRhcmdldCB3aGljaCBpc1xuICAgKiAgICAgdGhlIGxhc3QgZWxlbWVudCB0aGUgdXNlciB3YXMgaG92ZXJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhbmNlc3RvcklkIC0gVGhlIHNwYW4gaWQgdGhhdCB0aGUgdXNlciBpcyBub3cgaG92ZXJpbmcgb3Zlci5cbiAgICovXG4gIGhhbmRsZU1vdXNlRW50ZXIgPSAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTFNwYW5FbGVtZW50PiwgYW5jZXN0b3JJZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKFxuICAgICAgIShldmVudC5yZWxhdGVkVGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNwYW5FbGVtZW50KSB8fFxuICAgICAgX2dldChldmVudCwgJ3JlbGF0ZWRUYXJnZXQuZGF0YXNldC5hbmNlc3RvcklkJykgIT09IGFuY2VzdG9ySWRcbiAgICApIHtcbiAgICAgIHRoaXMucHJvcHMuYWRkSG92ZXJJbmRlbnRHdWlkZUlkKGFuY2VzdG9ySWQpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlblZpc2libGUsIG9uQ2xpY2ssIHNob3dDaGlsZHJlbkljb24sIHNwYW4sIHRoZW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaGFzQ2hpbGRyZW4sIHNwYW5JRCB9ID0gc3BhbjtcbiAgICBjb25zdCB3cmFwcGVyUHJvcHMgPSBoYXNDaGlsZHJlbiA/IHsgb25DbGljaywgcm9sZTogJ3N3aXRjaCcsICdhcmlhLWNoZWNrZWQnOiBjaGlsZHJlblZpc2libGUgfSA6IG51bGw7XG4gICAgY29uc3QgaWNvbiA9XG4gICAgICBzaG93Q2hpbGRyZW5JY29uICYmXG4gICAgICBoYXNDaGlsZHJlbiAmJlxuICAgICAgKGNoaWxkcmVuVmlzaWJsZSA/IChcbiAgICAgICAgPElvSW9zQXJyb3dEb3duIGRhdGEtdGVzdGlkPVwiaWNvbi1hcnJvdy1kb3duXCIgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxJb0NoZXZyb25SaWdodCBkYXRhLXRlc3RpZD1cImljb24tYXJyb3ctcmlnaHRcIiAvPlxuICAgICAgKSk7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVzKHRoZW1lKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjeChzdHlsZXMuU3BhblRyZWVPZmZzZXQsIHsgW3N0eWxlcy5TcGFuVHJlZU9mZnNldFBhcmVudF06IGhhc0NoaWxkcmVuIH0pfSB7Li4ud3JhcHBlclByb3BzfT5cbiAgICAgICAge3RoaXMuYW5jZXN0b3JJZHMubWFwKChhbmNlc3RvcklkKSA9PiAoXG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGtleT17YW5jZXN0b3JJZH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goc3R5bGVzLmluZGVudEd1aWRlLCB7XG4gICAgICAgICAgICAgIFtzdHlsZXMuaW5kZW50R3VpZGVBY3RpdmVdOiB0aGlzLnByb3BzLmhvdmVySW5kZW50R3VpZGVJZHMuaGFzKGFuY2VzdG9ySWQpLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBkYXRhLWFuY2VzdG9yLWlkPXthbmNlc3RvcklkfVxuICAgICAgICAgICAgZGF0YS10ZXN0aWQ9XCJTcGFuVHJlZU9mZnNldC0taW5kZW50R3VpZGVcIlxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlTW91c2VFbnRlcihldmVudCwgYW5jZXN0b3JJZCl9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVNb3VzZUxlYXZlKGV2ZW50LCBhbmNlc3RvcklkKX1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgICAge2ljb24gJiYgKFxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5pY29uV3JhcHBlcn1cbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZU1vdXNlRW50ZXIoZXZlbnQsIHNwYW5JRCl9XG4gICAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVNb3VzZUxlYXZlKGV2ZW50LCBzcGFuSUQpfVxuICAgICAgICAgICAgZGF0YS10ZXN0aWQ9XCJpY29uLXdyYXBwZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpY29ufVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKX1cbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZTIoVW50aGVtZWRTcGFuVHJlZU9mZnNldCk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixTQUFTQyxHQUFHLElBQUlDLElBQUksUUFBUSxRQUFRO0FBQ3BDLE9BQU9DLEtBQUssTUFBTSxPQUFPO0FBQ3pCLE9BQU9DLGNBQWMsTUFBTSxrQ0FBa0M7QUFDN0QsT0FBT0MsY0FBYyxNQUFNLG1DQUFtQztBQUc5RCxTQUFTQyxhQUFhLEVBQUVDLFVBQVUsUUFBUSxhQUFhO0FBRXZELFNBQVNDLFNBQVMsUUFBUSxVQUFVO0FBRXBDLE9BQU9DLGVBQWUsTUFBTSw0QkFBNEI7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBRXpELE9BQU8sSUFBTUMsU0FBUyxHQUFHUixhQUFhLENBQUMsVUFBQ1MsS0FBb0IsRUFBSztFQUMvRCxPQUFPO0lBQ0xDLGNBQWMsRUFBRWpCLEdBQUcsQ0FBQWtCLGVBQUEsS0FBQUEsZUFBQSxHQUFBQywyQkFBQSw0RkFFUlYsU0FBUyxDQUFDTyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBRWxDO0lBQ0RJLG9CQUFvQixFQUFFcEIsR0FBRyxDQUFBcUIsZ0JBQUEsS0FBQUEsZ0JBQUEsR0FBQUYsMkJBQUEsc0dBS3hCO0lBQ0RHLFdBQVcsRUFBRXRCLEdBQUcsQ0FBQXVCLGdCQUFBLEtBQUFBLGdCQUFBLEdBQUFKLDJCQUFBLDBXQVVRVixTQUFTLENBQUNPLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FFcEQ7SUFDRFEsaUJBQWlCLEVBQUV4QixHQUFHLENBQUF5QixnQkFBQSxLQUFBQSxnQkFBQSxHQUFBTiwyQkFBQSwrSUFFSlYs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