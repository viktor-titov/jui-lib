import _extends from "@babel/runtime/helpers/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
// Copyright (c) 2019 The Jaeger Authors.
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

import { css, cx } from '@emotion/css';
import * as React from 'react';
import IoIosArrowDown from 'react-icons/lib/io/ios-arrow-down';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';
import { Icon, useStyles2 } from '@grafana/ui';
import { autoColor } from '../../Theme';
import { uAlignIcon, ubMb1 } from '../../uberUtilityStyles';
import ReferenceLink from '../../url/ReferenceLink';
import AccordianKeyValues from './AccordianKeyValues';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = function getStyles(theme) {
  return {
    AccordianReferenceItem: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      border-bottom: 1px solid ", ";\n    "])), autoColor(theme, '#d8d8d8')),
    AccordianKeyValues: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      margin-left: 10px;\n    "]))),
    AccordianReferences: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: AccordianReferences;\n      border: 1px solid ", ";\n      position: relative;\n      margin-bottom: 0.25rem;\n    "])), autoColor(theme, '#d8d8d8')),
    AccordianReferencesHeader: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: AccordianReferencesHeader;\n      background: ", ";\n      color: inherit;\n      display: block;\n      padding: 0.25rem 0.5rem;\n      &:hover {\n        background: ", ";\n      }\n    "])), autoColor(theme, '#e4e4e4'), autoColor(theme, '#dadada')),
    AccordianReferencesContent: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: AccordianReferencesContent;\n      background: ", ";\n      border-top: 1px solid ", ";\n      padding: 0.5rem 0.5rem 0.25rem 0.5rem;\n    "])), autoColor(theme, '#f0f0f0'), autoColor(theme, '#d8d8d8')),
    AccordianReferencesFooter: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      label: AccordianReferencesFooter;\n      color: ", ";\n    "])), autoColor(theme, '#999')),
    ReferencesList: css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n      background: #fff;\n      border: 1px solid #ddd;\n      margin-bottom: 0.7em;\n      max-height: 450px;\n      overflow: auto;\n    "]))),
    list: css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n      width: 100%;\n      list-style: none;\n      padding: 0;\n      margin: 0;\n      background: #fff;\n    "]))),
    itemContent: css(_templateObject9 || (_templateObject9 = _taggedTemplateLiteralLoose(["\n      padding: 0.25rem 0.5rem;\n      display: flex;\n      width: 100%;\n      justify-content: space-between;\n    "]))),
    item: css(_templateObject10 || (_templateObject10 = _taggedTemplateLiteralLoose(["\n      &:nth-child(2n) {\n        background: #f5f5f5;\n      }\n    "]))),
    debugInfo: css(_templateObject11 || (_templateObject11 = _taggedTemplateLiteralLoose(["\n      letter-spacing: 0.25px;\n      margin: 0.5em 0 0;\n      flex-wrap: wrap;\n      display: flex;\n      justify-content: flex-end;\n    "]))),
    debugLabel: css(_templateObject12 || (_templateObject12 = _taggedTemplateLiteralLoose(["\n      margin: 0 5px 0 5px;\n      &::before {\n        color: #bbb;\n        content: attr(data-label);\n      }\n    "]))),
    serviceName: css(_templateObject13 || (_templateObject13 = _taggedTemplateLiteralLoose(["\n      margin-right: 8px;\n    "]))),
    title: css(_templateObject14 || (_templateObject14 = _taggedTemplateLiteralLoose(["\n      display: flex;\n      align-items: center;\n      gap: 4px;\n    "])))
  };
};
// export for test
export function References(props) {
  var data = props.data,
    createFocusSpanLink = props.createFocusSpanLink,
    openedItems = props.openedItems,
    onItemToggle = props.onItemToggle,
    interactive = props.interactive;
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsx("div", {
    className: styles.AccordianReferencesContent,
    children: data.map(function (reference, i) {
      var _reference$tags;
      return /*#__PURE__*/_jsxs("div", {
        className: i < data.length - 1 ? styles.AccordianReferenceItem : undefined,
        children: [/*#__PURE__*/_jsx("div", {
          className: styles.item,
          children: /*#__PURE__*/_jsx(ReferenceLink, {
            reference: reference,
            createFocusSpanLink: createFocusSpanLink,
            children: /*#__PURE__*/_jsxs("span", {
              className: styles.itemContent,
              children: [reference.span ? /*#__PURE__*/_jsxs("span", {
                children: [/*#__PURE__*/_jsx("span", {
                  className: cx('span-svc-name', styles.serviceName),
                  children: reference.span.process.serviceName
                }), /*#__PURE__*/_jsx("small", {
                  className: "endpoint-name",
                  children: reference.span.operationName
                })]
              }) : /*#__PURE__*/_jsxs("span", {
                className: cx('span-svc-name', styles.title),
                children: ["View Linked Span ", /*#__PURE__*/_jsx(Icon, {
                  name: "external-link-alt"
                })]
              }), /*#__PURE__*/_jsxs("small", {
                className: styles.debugInfo,
                children: [/*#__PURE__*/_jsx("span", {
                  className: styles.debugLabel,
                  "data-label": "TraceID:",
                  children: reference.traceID
                }), /*#__PURE__*/_jsx("span", {
                  className: styles.debugLabel,
                  "data-label": "SpanID:",
                  children: reference.spanID
                })]
              })]
            })
          })
        }, "" + reference.spanID), !!((_reference$tags = reference.tags) != null && _reference$tags.length) && /*#__PURE__*/_jsx("div", {
          className: styles.AccordianKeyValues,
          children: /*#__PURE__*/_jsx(AccordianKeyValues, {
            className: i < data.length - 1 ? ubMb1 : null,
            data: reference.tags || [],
            highContrast: true,
            interactive: interactive,
            isOpen: openedItems ? openedItems.has(reference) : false,
            label: 'attributes',
            linksGetter: null,
            onToggle: interactive && onItemToggle ? function () {
              return onItemToggle(reference);
            } : null
          })
        })]
      }, i);
    })
  });
}
var AccordianReferences = function AccordianReferences(_ref) {
  var data = _ref.data,
    _ref$interactive = _ref.interactive,
    interactive = _ref$interactive === void 0 ? true : _ref$interactive,
    isOpen = _ref.isOpen,
    onToggle = _ref.onToggle,
    onItemToggle = _ref.onItemToggle,
    openedItems = _ref.openedItems,
    createFocusSpanLink = _ref.createFocusSpanLink;
  var isEmpty = !Array.isArray(data) || !data.length;
  var arrow = null;
  var HeaderComponent = 'span';
  var headerProps = null;
  if (interactive) {
    arrow = isOpen ? /*#__PURE__*/_jsx(IoIosArrowDown, {
      className: uAlignIcon
    }) : /*#__PURE__*/_jsx(IoIosArrowRight, {
      className: uAlignIcon
    });
    HeaderComponent = 'a';
    headerProps = {
      'aria-checked': isOpen,
      onClick: isEmpty ? null : onToggle,
      role: 'switch'
    };
  }
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsxs("div", {
    className: styles.AccordianReferences,
    children: [/*#__PURE__*/_jsxs(HeaderComponent, _extends({
      className: styles.AccordianReferencesHeader
    }, headerProps, {
      children: [arrow, /*#__PURE__*/_jsx("strong", {
        children: /*#__PURE__*/_jsx("span", {
          children: "References"
        })
      }), ' ', "(", data.length, ")"]
    })), isOpen && /*#__PURE__*/_jsx(References, {
      data: data,
      openedItems: openedItems,
      createFocusSpanLink: createFocusSpanLink,
      onItemToggle: onItemToggle,
      interactive: interactive
    })]
  });
};
export default /*#__PURE__*/React.memo(AccordianReferences);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwiSW9Jb3NBcnJvd0Rvd24iLCJJb0lvc0Fycm93UmlnaHQiLCJJY29uIiwidXNlU3R5bGVzMiIsImF1dG9Db2xvciIsInVBbGlnbkljb24iLCJ1Yk1iMSIsIlJlZmVyZW5jZUxpbmsiLCJBY2NvcmRpYW5LZXlWYWx1ZXMiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJBY2NvcmRpYW5SZWZlcmVuY2VJdGVtIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiX3RlbXBsYXRlT2JqZWN0MiIsIkFjY29yZGlhblJlZmVyZW5jZXMiLCJfdGVtcGxhdGVPYmplY3QzIiwiQWNjb3JkaWFuUmVmZXJlbmNlc0hlYWRlciIsIl90ZW1wbGF0ZU9iamVjdDQiLCJBY2NvcmRpYW5SZWZlcmVuY2VzQ29udGVudCIsIl90ZW1wbGF0ZU9iamVjdDUiLCJBY2NvcmRpYW5SZWZlcmVuY2VzRm9vdGVyIiwiX3RlbXBsYXRlT2JqZWN0NiIsIlJlZmVyZW5jZXNMaXN0IiwiX3RlbXBsYXRlT2JqZWN0NyIsImxpc3QiLCJfdGVtcGxhdGVPYmplY3Q4IiwiaXRlbUNvbnRlbnQiLCJfdGVtcGxhdGVPYmplY3Q5IiwiaXRlbSIsIl90ZW1wbGF0ZU9iamVjdDEwIiwiZGVidWdJbmZvIiwiX3RlbXBsYXRlT2JqZWN0MTEiLCJkZWJ1Z0xhYmVsIiwiX3RlbXBsYXRlT2JqZWN0MTIiLCJzZXJ2aWNlTmFtZSIsIl90ZW1wbGF0ZU9iamVjdDEzIiwidGl0bGUiLCJfdGVtcGxhdGVPYmplY3QxNCIsIlJlZmVyZW5jZXMiLCJwcm9wcyIsImRhdGEiLCJjcmVhdGVGb2N1c1NwYW5MaW5rIiwib3BlbmVkSXRlbXMiLCJvbkl0ZW1Ub2dnbGUiLCJpbnRlcmFjdGl2ZSIsInN0eWxlcyIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwibWFwIiwicmVmZXJlbmNlIiwiaSIsIl9yZWZlcmVuY2UkdGFncyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInNwYW4iLCJwcm9jZXNzIiwib3BlcmF0aW9uTmFtZSIsIm5hbWUiLCJ0cmFjZUlEIiwic3BhbklEIiwidGFncyIsImhpZ2hDb250cmFzdCIsImlzT3BlbiIsImhhcyIsImxhYmVsIiwibGlua3NHZXR0ZXIiLCJvblRvZ2dsZSIsIl9yZWYiLCJfcmVmJGludGVyYWN0aXZlIiwiaXNFbXB0eSIsIkFycmF5IiwiaXNBcnJheSIsImFycm93IiwiSGVhZGVyQ29tcG9uZW50IiwiaGVhZGVyUHJvcHMiLCJvbkNsaWNrIiwicm9sZSIsIl9leHRlbmRzIiwibWVtbyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5EZXRhaWwvQWNjb3JkaWFuUmVmZXJlbmNlcy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFRoZSBKYWVnZXIgQXV0aG9ycy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzLCBjeCB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW9Jb3NBcnJvd0Rvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2lvL2lvcy1hcnJvdy1kb3duJztcbmltcG9ydCBJb0lvc0Fycm93UmlnaHQgZnJvbSAncmVhY3QtaWNvbnMvbGliL2lvL2lvcy1hcnJvdy1yaWdodCc7XG5cbmltcG9ydCB7IEZpZWxkLCBHcmFmYW5hVGhlbWUyLCBMaW5rTW9kZWwgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IEljb24sIHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmltcG9ydCB7IGF1dG9Db2xvciB9IGZyb20gJy4uLy4uL1RoZW1lJztcbmltcG9ydCB7IFRyYWNlU3BhblJlZmVyZW5jZSB9IGZyb20gJy4uLy4uL3R5cGVzL3RyYWNlJztcbmltcG9ydCB7IHVBbGlnbkljb24sIHViTWIxIH0gZnJvbSAnLi4vLi4vdWJlclV0aWxpdHlTdHlsZXMnO1xuaW1wb3J0IFJlZmVyZW5jZUxpbmsgZnJvbSAnLi4vLi4vdXJsL1JlZmVyZW5jZUxpbmsnO1xuXG5pbXBvcnQgQWNjb3JkaWFuS2V5VmFsdWVzIGZyb20gJy4vQWNjb3JkaWFuS2V5VmFsdWVzJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgQWNjb3JkaWFuUmVmZXJlbmNlSXRlbTogY3NzYFxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2Q4ZDhkOCcpfTtcbiAgICBgLFxuICAgIEFjY29yZGlhbktleVZhbHVlczogY3NzYFxuICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgYCxcbiAgICBBY2NvcmRpYW5SZWZlcmVuY2VzOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuUmVmZXJlbmNlcztcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2Q4ZDhkOCcpfTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuMjVyZW07XG4gICAgYCxcbiAgICBBY2NvcmRpYW5SZWZlcmVuY2VzSGVhZGVyOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuUmVmZXJlbmNlc0hlYWRlcjtcbiAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2U0ZTRlNCcpfTtcbiAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiAke2F1dG9Db2xvcih0aGVtZSwgJyNkYWRhZGEnKX07XG4gICAgICB9XG4gICAgYCxcbiAgICBBY2NvcmRpYW5SZWZlcmVuY2VzQ29udGVudDogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhblJlZmVyZW5jZXNDb250ZW50O1xuICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZjBmMGYwJyl9O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2Q4ZDhkOCcpfTtcbiAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW0gMC4yNXJlbSAwLjVyZW07XG4gICAgYCxcbiAgICBBY2NvcmRpYW5SZWZlcmVuY2VzRm9vdGVyOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuUmVmZXJlbmNlc0Zvb3RlcjtcbiAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyM5OTknKX07XG4gICAgYCxcbiAgICBSZWZlcmVuY2VzTGlzdDogY3NzYFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjdlbTtcbiAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4O1xuICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgYCxcbiAgICBsaXN0OiBjc3NgXG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBgLFxuICAgIGl0ZW1Db250ZW50OiBjc3NgXG4gICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBgLFxuICAgIGl0ZW06IGNzc2BcbiAgICAgICY6bnRoLWNoaWxkKDJuKSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gICAgICB9XG4gICAgYCxcbiAgICBkZWJ1Z0luZm86IGNzc2BcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjI1cHg7XG4gICAgICBtYXJnaW46IDAuNWVtIDAgMDtcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIGAsXG4gICAgZGVidWdMYWJlbDogY3NzYFxuICAgICAgbWFyZ2luOiAwIDVweCAwIDVweDtcbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbG9yOiAjYmJiO1xuICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtbGFiZWwpO1xuICAgICAgfVxuICAgIGAsXG4gICAgc2VydmljZU5hbWU6IGNzc2BcbiAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgIGAsXG4gICAgdGl0bGU6IGNzc2BcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgYCxcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIEFjY29yZGlhblJlZmVyZW5jZXNQcm9wcyA9IHtcbiAgZGF0YTogVHJhY2VTcGFuUmVmZXJlbmNlW107XG4gIGhpZ2hDb250cmFzdD86IGJvb2xlYW47XG4gIGludGVyYWN0aXZlPzogYm9vbGVhbjtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvcGVuZWRJdGVtcz86IFNldDxUcmFjZVNwYW5SZWZlcmVuY2U+O1xuICBvbkl0ZW1Ub2dnbGU/OiAocmVmZXJlbmNlOiBUcmFjZVNwYW5SZWZlcmVuY2UpID0+IHZvaWQ7XG4gIG9uVG9nZ2xlPzogbnVsbCB8ICgoKSA9PiB2b2lkKTtcbiAgY3JlYXRlRm9jdXNTcGFuTGluazogKHRyYWNlSWQ6IHN0cmluZywgc3BhbklkOiBzdHJpbmcpID0+IExpbmtNb2RlbDxGaWVsZD47XG59O1xuXG50eXBlIFJlZmVyZW5jZUl0ZW1Qcm9wcyA9IHtcbiAgZGF0YTogVHJhY2VTcGFuUmVmZXJlbmNlW107XG4gIGludGVyYWN0aXZlPzogYm9vbGVhbjtcbiAgb3BlbmVkSXRlbXM/OiBTZXQ8VHJhY2VTcGFuUmVmZXJlbmNlPjtcbiAgb25JdGVtVG9nZ2xlPzogKHJlZmVyZW5jZTogVHJhY2VTcGFuUmVmZXJlbmNlKSA9PiB2b2lkO1xuICBjcmVhdGVGb2N1c1NwYW5MaW5rOiAodHJhY2VJZDogc3RyaW5nLCBzcGFuSWQ6IHN0cmluZykgPT4gTGlua01vZGVsPEZpZWxkPjtcbn07XG5cbi8vIGV4cG9ydCBmb3IgdGVzdFxuZXhwb3J0IGZ1bmN0aW9uIFJlZmVyZW5jZXMocHJvcHM6IFJlZmVyZW5jZUl0ZW1Qcm9wcykge1xuICBjb25zdCB7IGRhdGEsIGNyZWF0ZUZvY3VzU3BhbkxpbmssIG9wZW5lZEl0ZW1zLCBvbkl0ZW1Ub2dnbGUsIGludGVyYWN0aXZlIH0gPSBwcm9wcztcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BY2NvcmRpYW5SZWZlcmVuY2VzQ29udGVudH0+XG4gICAgICB7ZGF0YS5tYXAoKHJlZmVyZW5jZSwgaSkgPT4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17aSA8IGRhdGEubGVuZ3RoIC0gMSA/IHN0eWxlcy5BY2NvcmRpYW5SZWZlcmVuY2VJdGVtIDogdW5kZWZpbmVkfSBrZXk9e2l9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaXRlbX0ga2V5PXtgJHtyZWZlcmVuY2Uuc3BhbklEfWB9PlxuICAgICAgICAgICAgPFJlZmVyZW5jZUxpbmsgcmVmZXJlbmNlPXtyZWZlcmVuY2V9IGNyZWF0ZUZvY3VzU3Bhbkxpbms9e2NyZWF0ZUZvY3VzU3Bhbkxpbmt9PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5pdGVtQ29udGVudH0+XG4gICAgICAgICAgICAgICAge3JlZmVyZW5jZS5zcGFuID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y3goJ3NwYW4tc3ZjLW5hbWUnLCBzdHlsZXMuc2VydmljZU5hbWUpfT5cbiAgICAgICAgICAgICAgICAgICAgICB7cmVmZXJlbmNlLnNwYW4ucHJvY2Vzcy5zZXJ2aWNlTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwiZW5kcG9pbnQtbmFtZVwiPntyZWZlcmVuY2Uuc3Bhbi5vcGVyYXRpb25OYW1lfTwvc21hbGw+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y3goJ3NwYW4tc3ZjLW5hbWUnLCBzdHlsZXMudGl0bGUpfT5cbiAgICAgICAgICAgICAgICAgICAgVmlldyBMaW5rZWQgU3BhbiA8SWNvbiBuYW1lPVwiZXh0ZXJuYWwtbGluay1hbHRcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT17c3R5bGVzLmRlYnVnSW5mb30+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5kZWJ1Z0xhYmVsfSBkYXRhLWxhYmVsPVwiVHJhY2VJRDpcIj5cbiAgICAgICAgICAgICAgICAgICAge3JlZmVyZW5jZS50cmFjZUlEfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZGVidWdMYWJlbH0gZGF0YS1sYWJlbD1cIlNwYW5JRDpcIj5cbiAgICAgICAgICAgICAgICAgICAge3JlZmVyZW5jZS5zcGFuSUR9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zbWFsbD5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9SZWZlcmVuY2VMaW5rPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHshIXJlZmVyZW5jZS50YWdzPy5sZW5ndGggJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BY2NvcmRpYW5LZXlWYWx1ZXN9PlxuICAgICAgICAgICAgICA8QWNjb3JkaWFuS2V5VmFsdWVzXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpIDwgZGF0YS5sZW5ndGggLSAxID8gdWJNYjEgOiBudWxsfVxuICAgICAgICAgICAgICAgIGRhdGE9e3JlZmVyZW5jZS50YWdzIHx8IFtdfVxuICAgICAgICAgICAgICAgIGhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICAgIGludGVyYWN0aXZlPXtpbnRlcmFjdGl2ZX1cbiAgICAgICAgICAgICAgICBpc09wZW49e29wZW5lZEl0ZW1zID8gb3BlbmVkSXRlbXMuaGFzKHJlZmVyZW5jZSkgOiBmYWxzZX1cbiAgICAgICAgICAgICAgICBsYWJlbD17J2F0dHJpYnV0ZXMnfVxuICAgICAgICAgICAgICAgIGxpbmtzR2V0dGVyPXtudWxsfVxuICAgICAgICAgICAgICAgIG9uVG9nZ2xlPXtpbnRlcmFjdGl2ZSAmJiBvbkl0ZW1Ub2dnbGUgPyAoKSA9PiBvbkl0ZW1Ub2dnbGUocmVmZXJlbmNlKSA6IG51bGx9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkpfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5jb25zdCBBY2NvcmRpYW5SZWZlcmVuY2VzOiBSZWFjdC5GQzxBY2NvcmRpYW5SZWZlcmVuY2VzUHJvcHM+ID0gKHtcbiAgZGF0YSxcbiAgaW50ZXJhY3RpdmUgPSB0cnVlLFxuICBpc09wZW4sXG4gIG9uVG9nZ2xlLFxuICBvbkl0ZW1Ub2dnbGUsXG4gIG9wZW5lZEl0ZW1zLFxuICBjcmVhdGVGb2N1c1NwYW5MaW5rLFxufSkgPT4ge1xuICBjb25zdCBpc0VtcHR5ID0gIUFycmF5LmlzQXJyYXkoZGF0YSkgfHwgIWRhdGEubGVuZ3RoO1xuICBsZXQgYXJyb3c6IFJlYWN0LlJlYWN0Tm9kZSB8IG51bGwgPSBudWxsO1xuICBsZXQgSGVhZGVyQ29tcG9uZW50OiAnc3BhbicgfCAnYScgPSAnc3Bhbic7XG4gIGxldCBoZWFkZXJQcm9wczoge30gfCBudWxsID0gbnVsbDtcbiAgaWYgKGludGVyYWN0aXZlKSB7XG4gICAgYXJyb3cgPSBpc09wZW4gPyA8SW9Jb3NBcnJvd0Rvd24gY2xhc3NOYW1lPXt1QWxpZ25JY29ufSAvPiA6IDxJb0lvc0Fycm93UmlnaHQgY2xhc3NOYW1lPXt1QWxpZ25JY29ufSAvPjtcbiAgICBIZWFkZXJDb21wb25lbnQgPSAnYSc7XG4gICAgaGVhZGVyUHJvcHMgPSB7XG4gICAgICAnYXJpYS1jaGVja2VkJzogaXNPcGVuLFxuICAgICAgb25DbGljazogaXNFbXB0eSA/IG51bGwgOiBvblRvZ2dsZSxcbiAgICAgIHJvbGU6ICdzd2l0Y2gnLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BY2NvcmRpYW5SZWZlcmVuY2VzfT5cbiAgICAgIDxIZWFkZXJDb21wb25lbnQgY2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuUmVmZXJlbmNlc0hlYWRlcn0gey4uLmhlYWRlclByb3BzfT5cbiAgICAgICAge2Fycm93fVxuICAgICAgICA8c3Ryb25nPlxuICAgICAgICAgIDxzcGFuPlJlZmVyZW5jZXM8L3NwYW4+XG4gICAgICAgIDwvc3Ryb25nPnsnICd9XG4gICAgICAgICh7ZGF0YS5sZW5ndGh9KVxuICAgICAgPC9IZWFkZXJDb21wb25lbnQ+XG4gICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgPFJlZmVyZW5jZXNcbiAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgIG9wZW5lZEl0ZW1zPXtvcGVuZWRJdGVtc31cbiAgICAgICAgICBjcmVhdGVGb2N1c1NwYW5MaW5rPXtjcmVhdGVGb2N1c1NwYW5MaW5rfVxuICAgICAgICAgIG9uSXRlbVRvZ2dsZT17b25JdGVtVG9nZ2xlfVxuICAgICAgICAgIGludGVyYWN0aXZlPXtpbnRlcmFjdGl2ZX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5tZW1vKEFjY29yZGlhblJlZmVyZW5jZXMpO1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLEVBQUVDLEVBQUUsUUFBUSxjQUFjO0FBQ3RDLE9BQU8sS0FBS0Ms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