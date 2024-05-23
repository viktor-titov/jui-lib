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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwiSW9Jb3NBcnJvd0Rvd24iLCJJb0lvc0Fycm93UmlnaHQiLCJJY29uIiwidXNlU3R5bGVzMiIsImF1dG9Db2xvciIsInVBbGlnbkljb24iLCJ1Yk1iMSIsIlJlZmVyZW5jZUxpbmsiLCJBY2NvcmRpYW5LZXlWYWx1ZXMiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJBY2NvcmRpYW5SZWZlcmVuY2VJdGVtIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiX3RlbXBsYXRlT2JqZWN0MiIsIkFjY29yZGlhblJlZmVyZW5jZXMiLCJfdGVtcGxhdGVPYmplY3QzIiwiQWNjb3JkaWFuUmVmZXJlbmNlc0hlYWRlciIsIl90ZW1wbGF0ZU9iamVjdDQiLCJBY2NvcmRpYW5SZWZlcmVuY2VzQ29udGVudCIsIl90ZW1wbGF0ZU9iamVjdDUiLCJBY2NvcmRpYW5SZWZlcmVuY2VzRm9vdGVyIiwiX3RlbXBsYXRlT2JqZWN0NiIsIlJlZmVyZW5jZXNMaXN0IiwiX3RlbXBsYXRlT2JqZWN0NyIsImxpc3QiLCJfdGVtcGxhdGVPYmplY3Q4IiwiaXRlbUNvbnRlbnQiLCJfdGVtcGxhdGVPYmplY3Q5IiwiaXRlbSIsIl90ZW1wbGF0ZU9iamVjdDEwIiwiZGVidWdJbmZvIiwiX3RlbXBsYXRlT2JqZWN0MTEiLCJkZWJ1Z0xhYmVsIiwiX3RlbXBsYXRlT2JqZWN0MTIiLCJzZXJ2aWNlTmFtZSIsIl90ZW1wbGF0ZU9iamVjdDEzIiwidGl0bGUiLCJfdGVtcGxhdGVPYmplY3QxNCIsIlJlZmVyZW5jZXMiLCJwcm9wcyIsImRhdGEiLCJjcmVhdGVGb2N1c1NwYW5MaW5rIiwib3BlbmVkSXRlbXMiLCJvbkl0ZW1Ub2dnbGUiLCJpbnRlcmFjdGl2ZSIsInN0eWxlcyIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwibWFwIiwicmVmZXJlbmNlIiwiaSIsIl9yZWZlcmVuY2UkdGFncyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInNwYW4iLCJwcm9jZXNzIiwib3BlcmF0aW9uTmFtZSIsIm5hbWUiLCJ0cmFjZUlEIiwic3BhbklEIiwidGFncyIsImhpZ2hDb250cmFzdCIsImlzT3BlbiIsImhhcyIsImxhYmVsIiwibGlua3NHZXR0ZXIiLCJvblRvZ2dsZSIsIl9yZWYiLCJfcmVmJGludGVyYWN0aXZlIiwiaXNFbXB0eSIsIkFycmF5IiwiaXNBcnJheSIsImFycm93IiwiSGVhZGVyQ29tcG9uZW50IiwiaGVhZGVyUHJvcHMiLCJvbkNsaWNrIiwicm9sZSIsIl9leHRlbmRzIiwibWVtbyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL0FjY29yZGlhblJlZmVyZW5jZXMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBUaGUgSmFlZ2VyIEF1dGhvcnMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcywgY3ggfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IElvSW9zQXJyb3dEb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9pby9pb3MtYXJyb3ctZG93bic7XG5pbXBvcnQgSW9Jb3NBcnJvd1JpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9pby9pb3MtYXJyb3ctcmlnaHQnO1xuXG5pbXBvcnQgeyBGaWVsZCwgR3JhZmFuYVRoZW1lMiwgTGlua01vZGVsIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBJY29uLCB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi8uLi9UaGVtZSc7XG5pbXBvcnQgeyBUcmFjZVNwYW5SZWZlcmVuY2UgfSBmcm9tICcuLi8uLi90eXBlcy90cmFjZSc7XG5pbXBvcnQgeyB1QWxpZ25JY29uLCB1Yk1iMSB9IGZyb20gJy4uLy4uL3ViZXJVdGlsaXR5U3R5bGVzJztcbmltcG9ydCBSZWZlcmVuY2VMaW5rIGZyb20gJy4uLy4uL3VybC9SZWZlcmVuY2VMaW5rJztcblxuaW1wb3J0IEFjY29yZGlhbktleVZhbHVlcyBmcm9tICcuL0FjY29yZGlhbktleVZhbHVlcyc7XG5cbmNvbnN0IGdldFN0eWxlcyA9ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIEFjY29yZGlhblJlZmVyZW5jZUl0ZW06IGNzc2BcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNkOGQ4ZDgnKX07XG4gICAgYCxcbiAgICBBY2NvcmRpYW5LZXlWYWx1ZXM6IGNzc2BcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIGAsXG4gICAgQWNjb3JkaWFuUmVmZXJlbmNlczogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhblJlZmVyZW5jZXM7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNkOGQ4ZDgnKX07XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjI1cmVtO1xuICAgIGAsXG4gICAgQWNjb3JkaWFuUmVmZXJlbmNlc0hlYWRlcjogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhblJlZmVyZW5jZXNIZWFkZXI7XG4gICAgICBiYWNrZ3JvdW5kOiAke2F1dG9Db2xvcih0aGVtZSwgJyNlNGU0ZTQnKX07XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcGFkZGluZzogMC4yNXJlbSAwLjVyZW07XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZGFkYWRhJyl9O1xuICAgICAgfVxuICAgIGAsXG4gICAgQWNjb3JkaWFuUmVmZXJlbmNlc0NvbnRlbnQ6IGNzc2BcbiAgICAgIGxhYmVsOiBBY2NvcmRpYW5SZWZlcmVuY2VzQ29udGVudDtcbiAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2YwZjBmMCcpfTtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNkOGQ4ZDgnKX07XG4gICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtIDAuMjVyZW0gMC41cmVtO1xuICAgIGAsXG4gICAgQWNjb3JkaWFuUmVmZXJlbmNlc0Zvb3RlcjogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhblJlZmVyZW5jZXNGb290ZXI7XG4gICAgICBjb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICcjOTk5Jyl9O1xuICAgIGAsXG4gICAgUmVmZXJlbmNlc0xpc3Q6IGNzc2BcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMC43ZW07XG4gICAgICBtYXgtaGVpZ2h0OiA0NTBweDtcbiAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIGAsXG4gICAgbGlzdDogY3NzYFxuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgYCxcbiAgICBpdGVtQ29udGVudDogY3NzYFxuICAgICAgcGFkZGluZzogMC4yNXJlbSAwLjVyZW07XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYCxcbiAgICBpdGVtOiBjc3NgXG4gICAgICAmOm50aC1jaGlsZCgybikge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xuICAgICAgfVxuICAgIGAsXG4gICAgZGVidWdJbmZvOiBjc3NgXG4gICAgICBsZXR0ZXItc3BhY2luZzogMC4yNXB4O1xuICAgICAgbWFyZ2luOiAwLjVlbSAwIDA7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICBgLFxuICAgIGRlYnVnTGFiZWw6IGNzc2BcbiAgICAgIG1hcmdpbjogMCA1cHggMCA1cHg7XG4gICAgICAmOjpiZWZvcmUge1xuICAgICAgICBjb2xvcjogI2JiYjtcbiAgICAgICAgY29udGVudDogYXR0cihkYXRhLWxhYmVsKTtcbiAgICAgIH1cbiAgICBgLFxuICAgIHNlcnZpY2VOYW1lOiBjc3NgXG4gICAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgICBgLFxuICAgIHRpdGxlOiBjc3NgXG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNHB4O1xuICAgIGAsXG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBBY2NvcmRpYW5SZWZlcmVuY2VzUHJvcHMgPSB7XG4gIGRhdGE6IFRyYWNlU3BhblJlZmVyZW5jZVtdO1xuICBoaWdoQ29udHJhc3Q/OiBib29sZWFuO1xuICBpbnRlcmFjdGl2ZT86IGJvb2xlYW47XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb3BlbmVkSXRlbXM/OiBTZXQ8VHJhY2VTcGFuUmVmZXJlbmNlPjtcbiAgb25JdGVtVG9nZ2xlPzogKHJlZmVyZW5jZTogVHJhY2VTcGFuUmVmZXJlbmNlKSA9PiB2b2lkO1xuICBvblRvZ2dsZT86IG51bGwgfCAoKCkgPT4gdm9pZCk7XG4gIGNyZWF0ZUZvY3VzU3Bhbkxpbms6ICh0cmFjZUlkOiBzdHJpbmcsIHNwYW5JZDogc3RyaW5nKSA9PiBMaW5rTW9kZWw8RmllbGQ+O1xufTtcblxudHlwZSBSZWZlcmVuY2VJdGVtUHJvcHMgPSB7XG4gIGRhdGE6IFRyYWNlU3BhblJlZmVyZW5jZVtdO1xuICBpbnRlcmFjdGl2ZT86IGJvb2xlYW47XG4gIG9wZW5lZEl0ZW1zPzogU2V0PFRyYWNlU3BhblJlZmVyZW5jZT47XG4gIG9uSXRlbVRvZ2dsZT86IChyZWZlcmVuY2U6IFRyYWNlU3BhblJlZmVyZW5jZSkgPT4gdm9pZDtcbiAgY3JlYXRlRm9jdXNTcGFuTGluazogKHRyYWNlSWQ6IHN0cmluZywgc3BhbklkOiBzdHJpbmcpID0+IExpbmtNb2RlbDxGaWVsZD47XG59O1xuXG4vLyBleHBvcnQgZm9yIHRlc3RcbmV4cG9ydCBmdW5jdGlvbiBSZWZlcmVuY2VzKHByb3BzOiBSZWZlcmVuY2VJdGVtUHJvcHMpIHtcbiAgY29uc3QgeyBkYXRhLCBjcmVhdGVGb2N1c1NwYW5MaW5rLCBvcGVuZWRJdGVtcywgb25JdGVtVG9nZ2xlLCBpbnRlcmFjdGl2ZSB9ID0gcHJvcHM7XG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuUmVmZXJlbmNlc0NvbnRlbnR9PlxuICAgICAge2RhdGEubWFwKChyZWZlcmVuY2UsIGkpID0+IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2kgPCBkYXRhLmxlbmd0aCAtIDEgPyBzdHlsZXMuQWNjb3JkaWFuUmVmZXJlbmNlSXRlbSA6IHVuZGVmaW5lZH0ga2V5PXtpfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLml0ZW19IGtleT17YCR7cmVmZXJlbmNlLnNwYW5JRH1gfT5cbiAgICAgICAgICAgIDxSZWZlcmVuY2VMaW5rIHJlZmVyZW5jZT17cmVmZXJlbmNlfSBjcmVhdGVGb2N1c1NwYW5MaW5rPXtjcmVhdGVGb2N1c1NwYW5MaW5rfT5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuaXRlbUNvbnRlbnR9PlxuICAgICAgICAgICAgICAgIHtyZWZlcmVuY2Uuc3BhbiA/IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2N4KCdzcGFuLXN2Yy1uYW1lJywgc3R5bGVzLnNlcnZpY2VOYW1lKX0+XG4gICAgICAgICAgICAgICAgICAgICAge3JlZmVyZW5jZS5zcGFuLnByb2Nlc3Muc2VydmljZU5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT1cImVuZHBvaW50LW5hbWVcIj57cmVmZXJlbmNlLnNwYW4ub3BlcmF0aW9uTmFtZX08L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2N4KCdzcGFuLXN2Yy1uYW1lJywgc3R5bGVzLnRpdGxlKX0+XG4gICAgICAgICAgICAgICAgICAgIFZpZXcgTGlua2VkIFNwYW4gPEljb24gbmFtZT1cImV4dGVybmFsLWxpbmstYWx0XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxzbWFsbCBjbGFzc05hbWU9e3N0eWxlcy5kZWJ1Z0luZm99PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZGVidWdMYWJlbH0gZGF0YS1sYWJlbD1cIlRyYWNlSUQ6XCI+XG4gICAgICAgICAgICAgICAgICAgIHtyZWZlcmVuY2UudHJhY2VJRH1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmRlYnVnTGFiZWx9IGRhdGEtbGFiZWw9XCJTcGFuSUQ6XCI+XG4gICAgICAgICAgICAgICAgICAgIHtyZWZlcmVuY2Uuc3BhbklEfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvUmVmZXJlbmNlTGluaz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7ISFyZWZlcmVuY2UudGFncz8ubGVuZ3RoICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuS2V5VmFsdWVzfT5cbiAgICAgICAgICAgICAgPEFjY29yZGlhbktleVZhbHVlc1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aSA8IGRhdGEubGVuZ3RoIC0gMSA/IHViTWIxIDogbnVsbH1cbiAgICAgICAgICAgICAgICBkYXRhPXtyZWZlcmVuY2UudGFncyB8fCBbXX1cbiAgICAgICAgICAgICAgICBoaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgICBpbnRlcmFjdGl2ZT17aW50ZXJhY3RpdmV9XG4gICAgICAgICAgICAgICAgaXNPcGVuPXtvcGVuZWRJdGVtcyA/IG9wZW5lZEl0ZW1zLmhhcyhyZWZlcmVuY2UpIDogZmFsc2V9XG4gICAgICAgICAgICAgICAgbGFiZWw9eydhdHRyaWJ1dGVzJ31cbiAgICAgICAgICAgICAgICBsaW5rc0dldHRlcj17bnVsbH1cbiAgICAgICAgICAgICAgICBvblRvZ2dsZT17aW50ZXJhY3RpdmUgJiYgb25JdGVtVG9nZ2xlID8gKCkgPT4gb25JdGVtVG9nZ2xlKHJlZmVyZW5jZSkgOiBudWxsfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuY29uc3QgQWNjb3JkaWFuUmVmZXJlbmNlczogUmVhY3QuRkM8QWNjb3JkaWFuUmVmZXJlbmNlc1Byb3BzPiA9ICh7XG4gIGRhdGEsXG4gIGludGVyYWN0aXZlID0gdHJ1ZSxcbiAgaXNPcGVuLFxuICBvblRvZ2dsZSxcbiAgb25JdGVtVG9nZ2xlLFxuICBvcGVuZWRJdGVtcyxcbiAgY3JlYXRlRm9jdXNTcGFuTGluayxcbn0pID0+IHtcbiAgY29uc3QgaXNFbXB0eSA9ICFBcnJheS5pc0FycmF5KGRhdGEpIHx8ICFkYXRhLmxlbmd0aDtcbiAgbGV0IGFycm93OiBSZWFjdC5SZWFjdE5vZGUgfCBudWxsID0gbnVsbDtcbiAgbGV0IEhlYWRlckNvbXBvbmVudDogJ3NwYW4nIHwgJ2EnID0gJ3NwYW4nO1xuICBsZXQgaGVhZGVyUHJvcHM6IHt9IHwgbnVsbCA9IG51bGw7XG4gIGlmIChpbnRlcmFjdGl2ZSkge1xuICAgIGFycm93ID0gaXNPcGVuID8gPElvSW9zQXJyb3dEb3duIGNsYXNzTmFtZT17dUFsaWduSWNvbn0gLz4gOiA8SW9Jb3NBcnJvd1JpZ2h0IGNsYXNzTmFtZT17dUFsaWduSWNvbn0gLz47XG4gICAgSGVhZGVyQ29tcG9uZW50ID0gJ2EnO1xuICAgIGhlYWRlclByb3BzID0ge1xuICAgICAgJ2FyaWEtY2hlY2tlZCc6IGlzT3BlbixcbiAgICAgIG9uQ2xpY2s6IGlzRW1wdHkgPyBudWxsIDogb25Ub2dnbGUsXG4gICAgICByb2xlOiAnc3dpdGNoJyxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuUmVmZXJlbmNlc30+XG4gICAgICA8SGVhZGVyQ29tcG9uZW50IGNsYXNzTmFtZT17c3R5bGVzLkFjY29yZGlhblJlZmVyZW5jZXNIZWFkZXJ9IHsuLi5oZWFkZXJQcm9wc30+XG4gICAgICAgIHthcnJvd31cbiAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICA8c3Bhbj5SZWZlcmVuY2VzPC9zcGFuPlxuICAgICAgICA8L3N0cm9uZz57JyAnfVxuICAgICAgICAoe2RhdGEubGVuZ3RofSlcbiAgICAgIDwvSGVhZGVyQ29tcG9uZW50PlxuICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgIDxSZWZlcmVuY2VzXG4gICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICBvcGVuZWRJdGVtcz17b3BlbmVkSXRlbXN9XG4gICAgICAgICAgY3JlYXRlRm9jdXNTcGFuTGluaz17Y3JlYXRlRm9jdXNTcGFuTGlua31cbiAgICAgICAgICBvbkl0ZW1Ub2dnbGU9e29uSXRlbVRvZ2dsZX1cbiAgICAgICAgICBpbnRlcmFjdGl2ZT17aW50ZXJhY3RpdmV9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QubWVtbyhBY2NvcmRpYW5SZWZlcmVuY2VzKTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxFQUFFQyxFQUFFLFFBQVEsY0FBYztBQUN0QyxPQUFP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