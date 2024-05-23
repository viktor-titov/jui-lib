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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsImpzb25NYXJrdXAiLCJSZWFjdCIsIkljb24iLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiQ29weUljb24iLCJ1YklubGluZUJsb2NrIiwidVdpZHRoMTAwIiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsImNvcHlJY29uQ2xhc3NOYW1lIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJLZXlWYWx1ZVRhYmxlIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiYm9keSIsIl90ZW1wbGF0ZU9iamVjdDIiLCJyb3ciLCJfdGVtcGxhdGVPYmplY3QzIiwia2V5Q29sdW1uIiwiX3RlbXBsYXRlT2JqZWN0NCIsImNvcHlDb2x1bW4iLCJfdGVtcGxhdGVPYmplY3Q1IiwibGlua0ljb24iLCJfdGVtcGxhdGVPYmplY3Q2IiwianNvbk9iamVjdE9yQXJyYXlTdGFydFJlZ2V4IiwicGFyc2VJZkNvbXBsZXhKc29uIiwidmFsdWUiLCJ0ZXN0IiwiSlNPTiIsInBhcnNlIiwiXyIsIkxpbmtWYWx1ZSIsInByb3BzIiwiaHJlZiIsInRpdGxlIiwidGFyZ2V0IiwicmVsIiwiY2hpbGRyZW4iLCJuYW1lIiwiZGVmYXVsdFByb3BzIiwiS2V5VmFsdWVzVGFibGUiLCJkYXRhIiwibGlua3NHZXR0ZXIiLCJzdHlsZXMiLCJjbGFzc05hbWUiLCJtYXAiLCJpIiwibWFya3VwIiwiX19odG1sIiwianNvblRhYmxlIiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJsaW5rcyIsInZhbHVlTWFya3VwIiwibGVuZ3RoIiwidXJsIiwidGV4dCIsImtleSIsImNvcHlUZXh0Iiwic3RyaW5naWZ5IiwidG9vbHRpcFRpdGxlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5EZXRhaWwvS2V5VmFsdWVzVGFibGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IGpzb25NYXJrdXAgZnJvbSAnanNvbi1tYXJrdXAnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBHcmFmYW5hVGhlbWUyIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyBJY29uLCB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi8uLi9UaGVtZSc7XG5pbXBvcnQgQ29weUljb24gZnJvbSAnLi4vLi4vY29tbW9uL0NvcHlJY29uJztcbmltcG9ydCB7IFROaWwgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFjZUtleVZhbHVlUGFpciwgVHJhY2VMaW5rIH0gZnJvbSAnLi4vLi4vdHlwZXMvdHJhY2UnO1xuaW1wb3J0IHsgdWJJbmxpbmVCbG9jaywgdVdpZHRoMTAwIH0gZnJvbSAnLi4vLi4vdWJlclV0aWxpdHlTdHlsZXMnO1xuXG5jb25zdCBjb3B5SWNvbkNsYXNzTmFtZSA9ICdjb3B5SWNvbic7XG5cbmV4cG9ydCBjb25zdCBnZXRTdHlsZXMgPSAodGhlbWU6IEdyYWZhbmFUaGVtZTIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBLZXlWYWx1ZVRhYmxlOiBjc3NgXG4gICAgICBsYWJlbDogS2V5VmFsdWVUYWJsZTtcbiAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2ZmZicpfTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2RkZCcpfTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgIG1heC1oZWlnaHQ6IDQ1MHB4O1xuICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgYCxcbiAgICBib2R5OiBjc3NgXG4gICAgICBsYWJlbDogYm9keTtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbiAgICBgLFxuICAgIHJvdzogY3NzYFxuICAgICAgbGFiZWw6IHJvdztcbiAgICAgICYgPiB0ZCB7XG4gICAgICAgIHBhZGRpbmc6IDByZW0gMC41cmVtO1xuICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICB9XG4gICAgICAmOm50aC1jaGlsZCgybikgPiB0ZCB7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2Y1ZjVmNScpfTtcbiAgICAgIH1cbiAgICAgICY6bm90KDpob3ZlcikgLiR7Y29weUljb25DbGFzc05hbWV9IHtcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgfVxuICAgIGAsXG4gICAga2V5Q29sdW1uOiBjc3NgXG4gICAgICBsYWJlbDoga2V5Q29sdW1uO1xuICAgICAgY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnIzg4OCcpfTtcbiAgICAgIHdoaXRlLXNwYWNlOiBwcmU7XG4gICAgICB3aWR0aDogMTI1cHg7XG4gICAgYCxcbiAgICBjb3B5Q29sdW1uOiBjc3NgXG4gICAgICBsYWJlbDogY29weUNvbHVtbjtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIGAsXG4gICAgbGlua0ljb246IGNzc2BcbiAgICAgIGxhYmVsOiBsaW5rSWNvbjtcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBgLFxuICB9O1xufTtcblxuY29uc3QganNvbk9iamVjdE9yQXJyYXlTdGFydFJlZ2V4ID0gL14oXFxbfFxceykvO1xuXG5mdW5jdGlvbiBwYXJzZUlmQ29tcGxleEpzb24odmFsdWU6IHVua25vd24pIHtcbiAgLy8gaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHJlcHJlc2VudGluZyBhY3R1YWwganNvbiBvYmplY3Qgb3IgYXJyYXksIHRoZW4gdXNlIGpzb24tbWFya3VwXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIGpzb25PYmplY3RPckFycmF5U3RhcnRSZWdleC50ZXN0KHZhbHVlKSkge1xuICAgIC8vIG90aGVyd2lzZSBqdXN0IHJldHVybiBhcyBpc1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9IGNhdGNoIChfKSB7fVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IExpbmtWYWx1ZSA9IChwcm9wczogeyBocmVmOiBzdHJpbmc7IHRpdGxlPzogc3RyaW5nOyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8YSBocmVmPXtwcm9wcy5ocmVmfSB0aXRsZT17cHJvcHMudGl0bGV9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgIHtwcm9wcy5jaGlsZHJlbn0gPEljb24gbmFtZT1cImV4dGVybmFsLWxpbmstYWx0XCIgLz5cbiAgICA8L2E+XG4gICk7XG59O1xuXG5MaW5rVmFsdWUuZGVmYXVsdFByb3BzID0ge1xuICB0aXRsZTogJycsXG59O1xuXG5leHBvcnQgdHlwZSBLZXlWYWx1ZXNUYWJsZVByb3BzID0ge1xuICBkYXRhOiBUcmFjZUtleVZhbHVlUGFpcltdO1xuICBsaW5rc0dldHRlcjogKChwYWlyczogVHJhY2VLZXlWYWx1ZVBhaXJbXSwgaW5kZXg6IG51bWJlcikgPT4gVHJhY2VMaW5rW10pIHwgVE5pbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEtleVZhbHVlc1RhYmxlKHByb3BzOiBLZXlWYWx1ZXNUYWJsZVByb3BzKSB7XG4gIGNvbnN0IHsgZGF0YSwgbGlua3NHZXR0ZXIgfSA9IHByb3BzO1xuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2N4KHN0eWxlcy5LZXlWYWx1ZVRhYmxlKX0gZGF0YS10ZXN0aWQ9XCJLZXlWYWx1ZVRhYmxlXCI+XG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt1V2lkdGgxMDB9PlxuICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPXtzdHlsZXMuYm9keX0+XG4gICAgICAgICAge2RhdGEubWFwKChyb3csIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmt1cCA9IHtcbiAgICAgICAgICAgICAgX19odG1sOiBqc29uTWFya3VwKHBhcnNlSWZDb21wbGV4SnNvbihyb3cudmFsdWUpKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBqc29uVGFibGUgPSA8ZGl2IGNsYXNzTmFtZT17dWJJbmxpbmVCbG9ja30gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e21hcmt1cH0gLz47XG4gICAgICAgICAgICBjb25zdCBsaW5rcyA9IGxpbmtzR2V0dGVyID8gbGlua3NHZXR0ZXIoZGF0YSwgaSkgOiBudWxsO1xuICAgICAgICAgICAgbGV0IHZhbHVlTWFya3VwO1xuICAgICAgICAgICAgaWYgKGxpbmtzICYmIGxpbmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAvLyBUT0RPOiBoYW5kbGUgbXVsdGlwbGUgaXRlbXNcbiAgICAgICAgICAgICAgdmFsdWVNYXJrdXAgPSAoXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxMaW5rVmFsdWUgaHJlZj17bGlua3NbMF0udXJsfSB0aXRsZT17bGlua3NbMF0udGV4dH0+XG4gICAgICAgICAgICAgICAgICAgIHtqc29uVGFibGV9XG4gICAgICAgICAgICAgICAgICA8L0xpbmtWYWx1ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhbHVlTWFya3VwID0ganNvblRhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgLy8gYGlgIGlzIG5lY2Vzc2FyeSBpbiB0aGUga2V5IGJlY2F1c2Ugcm93LmtleSBjYW4gcmVwZWF0XG4gICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9e3N0eWxlcy5yb3d9IGtleT17YCR7cm93LmtleX0tJHtpfWB9PlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e3N0eWxlcy5rZXlDb2x1bW59IGRhdGEtdGVzdGlkPVwiS2V5VmFsdWVUYWJsZS0ta2V5Q29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICB7cm93LmtleX1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57dmFsdWVNYXJrdXB9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXtzdHlsZXMuY29weUNvbHVtbn0+XG4gICAgICAgICAgICAgICAgICA8Q29weUljb25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjb3B5SWNvbkNsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgY29weVRleHQ9e0pTT04uc3RyaW5naWZ5KHJvdywgbnVsbCwgMil9XG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUaXRsZT1cIkNvcHkgSlNPTlwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixPQUFPQyxVQUFVLE1BQU0sYUFBYTtBQUNwQyxPQUFPLEtBQUtDLEtBQUssTUFBTSxPQUFPO0FBRzlCLFNBQVNDLElBQUksRUFBRUMsVUFBVSxRQUFRLGFBQWE7QUFFOUMsU0FBU0MsU0FBUyxRQUFRLGFBQWE7QUFDdkMsT0FBT0MsUUFBUSxNQUFNLHVCQUF1QjtBQUc1QyxTQUFTQyxhQUFhLEVBQUVDLFNBQVMsUUFBUSx5QkFBeUI7QUFBQyxTQUFBQyxHQUFBLElBQUFDLElBQUEsRUFBQUMsSUFBQSxJQUFBQyxLQUFBO0FBRW5FLElBQU1DLGlCQUFpQixHQUFHLFVBQVU7QUFFcEMsT0FBTyxJQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBSUMsS0FBb0IsRUFBSztFQUNqRCxPQUFPO0lBQ0xDLGFB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