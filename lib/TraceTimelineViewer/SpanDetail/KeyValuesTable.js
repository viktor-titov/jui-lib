import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
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
import jsonMarkup from 'json-markup';
import * as React from 'react';
import { Icon, useStyles2 } from '@grafana/ui';
import { autoColor } from '../../Theme';
import CopyIcon from '../../common/CopyIcon';
import { ubInlineBlock, uWidth100 } from '../../uberUtilityStyles';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var copyIconClassName = 'copyIcon';
export var getStyles = function getStyles(theme) {
  return {
    KeyValueTable: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: KeyValueTable;\n      background: ", ";\n      border: 1px solid ", ";\n      margin-bottom: 0.5rem;\n      max-height: 450px;\n      overflow: auto;\n    "])), autoColor(theme, '#fff'), autoColor(theme, '#ddd')),
    body: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: body;\n      vertical-align: baseline;\n    "]))),
    row: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: row;\n      & > td {\n        padding: 0rem 0.5rem;\n        height: 30px;\n      }\n      &:nth-child(2n) > td {\n        background: ", ";\n      }\n      &:not(:hover) .", " {\n        visibility: hidden;\n      }\n    "])), autoColor(theme, '#f5f5f5'), copyIconClassName),
    keyColumn: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: keyColumn;\n      color: ", ";\n      white-space: pre;\n      width: 125px;\n    "])), autoColor(theme, '#888')),
    copyColumn: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: copyColumn;\n      text-align: right;\n    "]))),
    linkIcon: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      label: linkIcon;\n      vertical-align: middle;\n      font-weight: bold;\n    "])))
  };
};
var jsonObjectOrArrayStartRegex = /^(\[|\{)/;
function parseIfComplexJson(value) {
  // if the value is a string representing actual json object or array, then use json-markup
  if (typeof value === 'string' && jsonObjectOrArrayStartRegex.test(value)) {
    // otherwise just return as is
    try {
      return JSON.parse(value);
      // eslint-disable-next-line no-empty
    } catch (_) {}
  }
  return value;
}
export var LinkValue = function LinkValue(props) {
  return /*#__PURE__*/_jsxs("a", {
    href: props.href,
    title: props.title,
    target: "_blank",
    rel: "noopener noreferrer",
    children: [props.children, " ", /*#__PURE__*/_jsx(Icon, {
      name: "external-link-alt"
    })]
  });
};
LinkValue.defaultProps = {
  title: ''
};
export default function KeyValuesTable(props) {
  var data = props.data,
    linksGetter = props.linksGetter;
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsx("div", {
    className: cx(styles.KeyValueTable),
    "data-testid": "KeyValueTable",
    children: /*#__PURE__*/_jsx("table", {
      className: uWidth100,
      children: /*#__PURE__*/_jsx("tbody", {
        className: styles.body,
        children: data.map(function (row, i) {
          var markup = {
            __html: jsonMarkup(parseIfComplexJson(row.value))
          };
          var jsonTable = /*#__PURE__*/_jsx("div", {
            className: ubInlineBlock,
            dangerouslySetInnerHTML: markup
          });
          var links = linksGetter ? linksGetter(data, i) : null;
          var valueMarkup;
          if (links && links.length) {
            // TODO: handle multiple items
            valueMarkup = /*#__PURE__*/_jsx("div", {
              children: /*#__PURE__*/_jsx(LinkValue, {
                href: links[0].url,
                title: links[0].text,
                children: jsonTable
              })
            });
          } else {
            valueMarkup = jsonTable;
          }
          return (
            /*#__PURE__*/
            // `i` is necessary in the key because row.key can repeat
            _jsxs("tr", {
              className: styles.row,
              children: [/*#__PURE__*/_jsx("td", {
                className: styles.keyColumn,
                "data-testid": "KeyValueTable--keyColumn",
                children: row.key
              }), /*#__PURE__*/_jsx("td", {
                children: valueMarkup
              }), /*#__PURE__*/_jsx("td", {
                className: styles.copyColumn,
                children: /*#__PURE__*/_jsx(CopyIcon, {
                  className: copyIconClassName,
                  copyText: JSON.stringify(row, null, 2),
                  tooltipTitle: "Copy JSON"
                })
              })]
            }, row.key + "-" + i)
          );
        })
      })
    })
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImpzb25NYXJrdXAiLCJSZWFjdCIsIkljb24iLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiQ29weUljb24iLCJ1YklubGluZUJsb2NrIiwidVdpZHRoMTAwIiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsImNvcHlJY29uQ2xhc3NOYW1lIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJLZXlWYWx1ZVRhYmxlIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiYm9keSIsIl90ZW1wbGF0ZU9iamVjdDIiLCJyb3ciLCJfdGVtcGxhdGVPYmplY3QzIiwia2V5Q29sdW1uIiwiX3RlbXBsYXRlT2JqZWN0NCIsImNvcHlDb2x1bW4iLCJfdGVtcGxhdGVPYmplY3Q1IiwibGlua0ljb24iLCJfdGVtcGxhdGVPYmplY3Q2IiwianNvbk9iamVjdE9yQXJyYXlTdGFydFJlZ2V4IiwicGFyc2VJZkNvbXBsZXhKc29uIiwidmFsdWUiLCJ0ZXN0IiwiSlNPTiIsInBhcnNlIiwiXyIsIkxpbmtWYWx1ZSIsInByb3BzIiwiaHJlZiIsInRpdGxlIiwidGFyZ2V0IiwicmVsIiwiY2hpbGRyZW4iLCJuYW1lIiwiZGVmYXVsdFByb3BzIiwiS2V5VmFsdWVzVGFibGUiLCJkYXRhIiwibGlua3NHZXR0ZXIiLCJzdHlsZXMiLCJjbGFzc05hbWUiLCJtYXAiLCJpIiwibWFya3VwIiwiX19odG1sIiwianNvblRhYmxlIiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJsaW5rcyIsInZhbHVlTWFya3VwIiwibGVuZ3RoIiwidXJsIiwidGV4dCIsImtleSIsImNvcHlUZXh0Iiwic3RyaW5naWZ5IiwidG9vbHRpcFRpdGxlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1RyYWNlVGltZWxpbmVWaWV3ZXIvU3BhbkRldGFpbC9LZXlWYWx1ZXNUYWJsZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQganNvbk1hcmt1cCBmcm9tICdqc29uLW1hcmt1cCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEdyYWZhbmFUaGVtZTIgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IEljb24sIHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmltcG9ydCB7IGF1dG9Db2xvciB9IGZyb20gJy4uLy4uL1RoZW1lJztcbmltcG9ydCBDb3B5SWNvbiBmcm9tICcuLi8uLi9jb21tb24vQ29weUljb24nO1xuaW1wb3J0IHsgVE5pbCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IFRyYWNlS2V5VmFsdWVQYWlyLCBUcmFjZUxpbmsgfSBmcm9tICcuLi8uLi90eXBlcy90cmFjZSc7XG5pbXBvcnQgeyB1YklubGluZUJsb2NrLCB1V2lkdGgxMDAgfSBmcm9tICcuLi8uLi91YmVyVXRpbGl0eVN0eWxlcyc7XG5cbmNvbnN0IGNvcHlJY29uQ2xhc3NOYW1lID0gJ2NvcHlJY29uJztcblxuZXhwb3J0IGNvbnN0IGdldFN0eWxlcyA9ICh0aGVtZTogR3JhZmFuYVRoZW1lMikgPT4ge1xuICByZXR1cm4ge1xuICAgIEtleVZhbHVlVGFibGU6IGNzc2BcbiAgICAgIGxhYmVsOiBLZXlWYWx1ZVRhYmxlO1xuICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZmZmJyl9O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjZGRkJyl9O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgICAgbWF4LWhlaWdodDogNDUwcHg7XG4gICAgICBvdmVyZmxvdzogYXV0bztcbiAgICBgLFxuICAgIGJvZHk6IGNzc2BcbiAgICAgIGxhYmVsOiBib2R5O1xuICAgICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xuICAgIGAsXG4gICAgcm93OiBjc3NgXG4gICAgICBsYWJlbDogcm93O1xuICAgICAgJiA+IHRkIHtcbiAgICAgICAgcGFkZGluZzogMHJlbSAwLjVyZW07XG4gICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIH1cbiAgICAgICY6bnRoLWNoaWxkKDJuKSA+IHRkIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZjVmNWY1Jyl9O1xuICAgICAgfVxuICAgICAgJjpub3QoOmhvdmVyKSAuJHtjb3B5SWNvbkNsYXNzTmFtZX0ge1xuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICB9XG4gICAgYCxcbiAgICBrZXlDb2x1bW46IGNzc2BcbiAgICAgIGxhYmVsOiBrZXlDb2x1bW47XG4gICAgICBjb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICcjODg4Jyl9O1xuICAgICAgd2hpdGUtc3BhY2U6IHByZTtcbiAgICAgIHdpZHRoOiAxMjVweDtcbiAgICBgLFxuICAgIGNvcHlDb2x1bW46IGNzc2BcbiAgICAgIGxhYmVsOiBjb3B5Q29sdW1uO1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgYCxcbiAgICBsaW5rSWNvbjogY3NzYFxuICAgICAgbGFiZWw6IGxpbmtJY29uO1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGAsXG4gIH07XG59O1xuXG5jb25zdCBqc29uT2JqZWN0T3JBcnJheVN0YXJ0UmVnZXggPSAvXihcXFt8XFx7KS87XG5cbmZ1bmN0aW9uIHBhcnNlSWZDb21wbGV4SnNvbih2YWx1ZTogdW5rbm93bikge1xuICAvLyBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIGFjdHVhbCBqc29uIG9iamVjdCBvciBhcnJheSwgdGhlbiB1c2UganNvbi1tYXJrdXBcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYganNvbk9iamVjdE9yQXJyYXlTdGFydFJlZ2V4LnRlc3QodmFsdWUpKSB7XG4gICAgLy8gb3RoZXJ3aXNlIGp1c3QgcmV0dXJuIGFzIGlzXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH0gY2F0Y2ggKF8pIHt9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgY29uc3QgTGlua1ZhbHVlID0gKHByb3BzOiB7IGhyZWY6IHN0cmluZzsgdGl0bGU/OiBzdHJpbmc7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxhIGhyZWY9e3Byb3BzLmhyZWZ9IHRpdGxlPXtwcm9wcy50aXRsZX0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxuICAgICAge3Byb3BzLmNoaWxkcmVufSA8SWNvbiBuYW1lPVwiZXh0ZXJuYWwtbGluay1hbHRcIiAvPlxuICAgIDwvYT5cbiAgKTtcbn07XG5cbkxpbmtWYWx1ZS5kZWZhdWx0UHJvcHMgPSB7XG4gIHRpdGxlOiAnJyxcbn07XG5cbmV4cG9ydCB0eXBlIEtleVZhbHVlc1RhYmxlUHJvcHMgPSB7XG4gIGRhdGE6IFRyYWNlS2V5VmFsdWVQYWlyW107XG4gIGxpbmtzR2V0dGVyOiAoKHBhaXJzOiBUcmFjZUtleVZhbHVlUGFpcltdLCBpbmRleDogbnVtYmVyKSA9PiBUcmFjZUxpbmtbXSkgfCBUTmlsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gS2V5VmFsdWVzVGFibGUocHJvcHM6IEtleVZhbHVlc1RhYmxlUHJvcHMpIHtcbiAgY29uc3QgeyBkYXRhLCBsaW5rc0dldHRlciB9ID0gcHJvcHM7XG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y3goc3R5bGVzLktleVZhbHVlVGFibGUpfSBkYXRhLXRlc3RpZD1cIktleVZhbHVlVGFibGVcIj5cbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3VXaWR0aDEwMH0+XG4gICAgICAgIDx0Ym9keSBjbGFzc05hbWU9e3N0eWxlcy5ib2R5fT5cbiAgICAgICAgICB7ZGF0YS5tYXAoKHJvdywgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFya3VwID0ge1xuICAgICAgICAgICAgICBfX2h0bWw6IGpzb25NYXJrdXAocGFyc2VJZkNvbXBsZXhKc29uKHJvdy52YWx1ZSkpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGpzb25UYWJsZSA9IDxkaXYgY2xhc3NOYW1lPXt1YklubGluZUJsb2NrfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17bWFya3VwfSAvPjtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gbGlua3NHZXR0ZXIgPyBsaW5rc0dldHRlcihkYXRhLCBpKSA6IG51bGw7XG4gICAgICAgICAgICBsZXQgdmFsdWVNYXJrdXA7XG4gICAgICAgICAgICBpZiAobGlua3MgJiYgbGlua3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSBtdWx0aXBsZSBpdGVtc1xuICAgICAgICAgICAgICB2YWx1ZU1hcmt1cCA9IChcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPExpbmtWYWx1ZSBocmVmPXtsaW5rc1swXS51cmx9IHRpdGxlPXtsaW5rc1swXS50ZXh0fT5cbiAgICAgICAgICAgICAgICAgICAge2pzb25UYWJsZX1cbiAgICAgICAgICAgICAgICAgIDwvTGlua1ZhbHVlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFsdWVNYXJrdXAgPSBqc29uVGFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAvLyBgaWAgaXMgbmVjZXNzYXJ5IGluIHRoZSBrZXkgYmVjYXVzZSByb3cua2V5IGNhbiByZXBlYXRcbiAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT17c3R5bGVzLnJvd30ga2V5PXtgJHtyb3cua2V5fS0ke2l9YH0+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17c3R5bGVzLmtleUNvbHVtbn0gZGF0YS10ZXN0aWQ9XCJLZXlWYWx1ZVRhYmxlLS1rZXlDb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgIHtyb3cua2V5fVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPnt2YWx1ZU1hcmt1cH08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e3N0eWxlcy5jb3B5Q29sdW1ufT5cbiAgICAgICAgICAgICAgICAgIDxDb3B5SWNvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NvcHlJY29uQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgICAgICBjb3B5VGV4dD17SlNPTi5zdHJpbmdpZnkocm93LCBudWxsLCAyKX1cbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRpdGxlPVwiQ29weSBKU09OXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEVBQUUsTUFBTSxZQUFZO0FBQzNCLE9BQU9DLFVBQVUsTUFBTSxhQUFhO0FBQ3BDLE9BQU8sS0FBS0MsS0FBSyxNQUFNLE9BQU87QUFHOUIsU0FBU0MsSUFBSSxFQUFFQyxVQUFVLFFBQVEsYUFBYTtBQUU5QyxTQUFTQyxTQUFTLFFBQVEsYUFBYTtBQUN2QyxPQUFPQyxRQUFRLE1BQU0sdUJBQXVCO0FBRzVDLFNBQVNDLGFBQWEsRUFBRUMsU0FBUyxRQUFRLHlCQUF5QjtBQUFDLFNBQUFDLEdBQUEsSUFBQUMsSUFBQSxFQUFBQyxJQUFBLElBQUFDLEtBQUE7QUFFbkUsSUFBTUMsaUJBQWlCLEdBQUcsVUFBVTtBQUVwQyxPQUFPLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJQyxLQUFvQixFQUFLO0VBQ2pELE9BQU87SUFDTEMsYUFBYSxFQUFF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