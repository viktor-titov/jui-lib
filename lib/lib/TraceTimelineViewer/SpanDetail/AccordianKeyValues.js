import _extends from "@babel/runtime/helpers/extends";
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
import IoIosArrowDown from 'react-icons/lib/io/ios-arrow-down';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';
import { useStyles2 } from '@grafana/ui';
import { autoColor } from '../../Theme';
import { uAlignIcon, uTxEllipsis } from '../../uberUtilityStyles';
import * as markers from './AccordianKeyValues.markers';
import KeyValuesTable from './KeyValuesTable';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var getStyles = function getStyles(theme) {
  return {
    header: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: header;\n      cursor: pointer;\n      overflow: hidden;\n      padding: 0.25em 0.1em;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      &:hover {\n        background: ", ";\n      }\n    "])), autoColor(theme, '#e8e8e8')),
    headerEmpty: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: headerEmpty;\n      background: none;\n      cursor: initial;\n    "]))),
    headerHighContrast: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: headerHighContrast;\n      &:hover {\n        background: ", ";\n      }\n    "])), autoColor(theme, '#ddd')),
    emptyIcon: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: emptyIcon;\n      color: ", ";\n    "])), autoColor(theme, '#aaa')),
    summary: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: summary;\n      display: inline;\n      list-style: none;\n      padding: 0;\n    "]))),
    summaryItem: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      label: summaryItem;\n      display: inline;\n      margin-left: 0.7em;\n      padding-right: 0.5rem;\n      border-right: 1px solid ", ";\n      &:last-child {\n        padding-right: 0;\n        border-right: none;\n      }\n    "])), autoColor(theme, '#ddd')),
    summaryLabel: css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n      label: summaryLabel;\n      color: ", ";\n    "])), autoColor(theme, '#777')),
    summaryDelim: css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n      label: summaryDelim;\n      color: ", ";\n      padding: 0 0.2em;\n    "])), autoColor(theme, '#bbb'))
  };
};
// export for tests
export function KeyValuesSummary(props) {
  var data = props.data;
  var styles = useStyles2(getStyles);
  if (!Array.isArray(data) || !data.length) {
    return null;
  }
  return /*#__PURE__*/_jsx("ul", {
    className: styles.summary,
    children: data.map(function (item, i) {
      return (
        /*#__PURE__*/
        // `i` is necessary in the key because item.key can repeat
        _jsxs("li", {
          className: styles.summaryItem,
          children: [/*#__PURE__*/_jsx("span", {
            className: styles.summaryLabel,
            children: item.key
          }), /*#__PURE__*/_jsx("span", {
            className: styles.summaryDelim,
            children: "="
          }), String(item.value)]
        }, item.key + "-" + i)
      );
    })
  });
}
KeyValuesSummary.defaultProps = {
  data: null
};
export default function AccordianKeyValues(props) {
  var _cx, _cx2;
  var className = props.className,
    data = props.data,
    highContrast = props.highContrast,
    interactive = props.interactive,
    isOpen = props.isOpen,
    label = props.label,
    linksGetter = props.linksGetter,
    onToggle = props.onToggle;
  var isEmpty = !Array.isArray(data) || !data.length;
  var styles = useStyles2(getStyles);
  var iconCls = cx(uAlignIcon, (_cx = {}, _cx[styles.emptyIcon] = isEmpty, _cx));
  var arrow = null;
  var headerProps = null;
  if (interactive) {
    arrow = isOpen ? /*#__PURE__*/_jsx(IoIosArrowDown, {
      className: iconCls
    }) : /*#__PURE__*/_jsx(IoIosArrowRight, {
      className: iconCls
    });
    headerProps = {
      'aria-checked': isOpen,
      onClick: isEmpty ? null : onToggle,
      role: 'switch'
    };
  }
  return /*#__PURE__*/_jsxs("div", {
    className: cx(className, uTxEllipsis),
    children: [/*#__PURE__*/_jsxs("div", _extends({
      className: cx(styles.header, (_cx2 = {}, _cx2[styles.headerEmpty] = isEmpty, _cx2[styles.headerHighContrast] = highContrast && !isEmpty, _cx2))
    }, headerProps, {
      "data-testid": "AccordianKeyValues--header",
      children: [arrow, /*#__PURE__*/_jsxs("strong", {
        "data-test": markers.LABEL,
        children: [label, isOpen || ':']
      }), !isOpen && /*#__PURE__*/_jsx(KeyValuesSummary, {
        data: data
      })]
    })), isOpen && /*#__PURE__*/_jsx(KeyValuesTable, {
      data: data,
      linksGetter: linksGetter
    })]
  });
}
AccordianKeyValues.defaultProps = {
  className: null,
  highContrast: false,
  interactive: true,
  onToggle: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwiSW9Jb3NBcnJvd0Rvd24iLCJJb0lvc0Fycm93UmlnaHQiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwidUFsaWduSWNvbiIsInVUeEVsbGlwc2lzIiwibWFya2VycyIsIktleVZhbHVlc1RhYmxlIiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsImdldFN0eWxlcyIsInRoZW1lIiwiaGVhZGVyIiwiX3RlbXBsYXRlT2JqZWN0IiwiX3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlIiwiaGVhZGVyRW1wdHkiLCJfdGVtcGxhdGVPYmplY3QyIiwiaGVhZGVySGlnaENvbnRyYXN0IiwiX3RlbXBsYXRlT2JqZWN0MyIsImVtcHR5SWNvbiIsIl90ZW1wbGF0ZU9iamVjdDQiLCJzdW1tYXJ5IiwiX3RlbXBsYXRlT2JqZWN0NSIsInN1bW1hcnlJdGVtIiwiX3RlbXBsYXRlT2JqZWN0NiIsInN1bW1hcnlMYWJlbCIsIl90ZW1wbGF0ZU9iamVjdDciLCJzdW1tYXJ5RGVsaW0iLCJfdGVtcGxhdGVPYmplY3Q4IiwiS2V5VmFsdWVzU3VtbWFyeSIsInByb3BzIiwiZGF0YSIsInN0eWxlcyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwibWFwIiwiaXRlbSIsImkiLCJrZXkiLCJTdHJpbmciLCJ2YWx1ZSIsImRlZmF1bHRQcm9wcyIsIkFjY29yZGlhbktleVZhbHVlcyIsIl9jeCIsIl9jeDIiLCJoaWdoQ29udHJhc3QiLCJpbnRlcmFjdGl2ZSIsImlzT3BlbiIsImxhYmVsIiwibGlua3NHZXR0ZXIiLCJvblRvZ2dsZSIsImlzRW1wdHkiLCJpY29uQ2xzIiwiYXJyb3ciLCJoZWFkZXJQcm9wcyIsIm9uQ2xpY2siLCJyb2xlIiwiX2V4dGVuZHMiLCJMQUJFTCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL0FjY29yZGlhbktleVZhbHVlcy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgY3ggZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW9Jb3NBcnJvd0Rvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2lvL2lvcy1hcnJvdy1kb3duJztcbmltcG9ydCBJb0lvc0Fycm93UmlnaHQgZnJvbSAncmVhY3QtaWNvbnMvbGliL2lvL2lvcy1hcnJvdy1yaWdodCc7XG5cbmltcG9ydCB7IEdyYWZhbmFUaGVtZTIgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmltcG9ydCB7IGF1dG9Db2xvciB9IGZyb20gJy4uLy4uL1RoZW1lJztcbmltcG9ydCB7IFROaWwgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFjZUtleVZhbHVlUGFpciwgVHJhY2VMaW5rIH0gZnJvbSAnLi4vLi4vdHlwZXMvdHJhY2UnO1xuaW1wb3J0IHsgdUFsaWduSWNvbiwgdVR4RWxsaXBzaXMgfSBmcm9tICcuLi8uLi91YmVyVXRpbGl0eVN0eWxlcyc7XG5cbmltcG9ydCAqIGFzIG1hcmtlcnMgZnJvbSAnLi9BY2NvcmRpYW5LZXlWYWx1ZXMubWFya2Vycyc7XG5pbXBvcnQgS2V5VmFsdWVzVGFibGUgZnJvbSAnLi9LZXlWYWx1ZXNUYWJsZSc7XG5cbmV4cG9ydCBjb25zdCBnZXRTdHlsZXMgPSAodGhlbWU6IEdyYWZhbmFUaGVtZTIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBoZWFkZXI6IGNzc2BcbiAgICAgIGxhYmVsOiBoZWFkZXI7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgcGFkZGluZzogMC4yNWVtIDAuMWVtO1xuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2U4ZThlOCcpfTtcbiAgICAgIH1cbiAgICBgLFxuICAgIGhlYWRlckVtcHR5OiBjc3NgXG4gICAgICBsYWJlbDogaGVhZGVyRW1wdHk7XG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgY3Vyc29yOiBpbml0aWFsO1xuICAgIGAsXG4gICAgaGVhZGVySGlnaENvbnRyYXN0OiBjc3NgXG4gICAgICBsYWJlbDogaGVhZGVySGlnaENvbnRyYXN0O1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2RkZCcpfTtcbiAgICAgIH1cbiAgICBgLFxuICAgIGVtcHR5SWNvbjogY3NzYFxuICAgICAgbGFiZWw6IGVtcHR5SWNvbjtcbiAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyNhYWEnKX07XG4gICAgYCxcbiAgICBzdW1tYXJ5OiBjc3NgXG4gICAgICBsYWJlbDogc3VtbWFyeTtcbiAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgIGAsXG4gICAgc3VtbWFyeUl0ZW06IGNzc2BcbiAgICAgIGxhYmVsOiBzdW1tYXJ5SXRlbTtcbiAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgIG1hcmdpbi1sZWZ0OiAwLjdlbTtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcbiAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2RkZCcpfTtcbiAgICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICAgIH1cbiAgICBgLFxuICAgIHN1bW1hcnlMYWJlbDogY3NzYFxuICAgICAgbGFiZWw6IHN1bW1hcnlMYWJlbDtcbiAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyM3NzcnKX07XG4gICAgYCxcbiAgICBzdW1tYXJ5RGVsaW06IGNzc2BcbiAgICAgIGxhYmVsOiBzdW1tYXJ5RGVsaW07XG4gICAgICBjb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICcjYmJiJyl9O1xuICAgICAgcGFkZGluZzogMCAwLjJlbTtcbiAgICBgLFxuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgQWNjb3JkaWFuS2V5VmFsdWVzUHJvcHMgPSB7XG4gIGNsYXNzTmFtZT86IHN0cmluZyB8IFROaWw7XG4gIGRhdGE6IFRyYWNlS2V5VmFsdWVQYWlyW107XG4gIGhpZ2hDb250cmFzdD86IGJvb2xlYW47XG4gIGludGVyYWN0aXZlPzogYm9vbGVhbjtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBsYWJlbDogc3RyaW5nO1xuICBsaW5rc0dldHRlcjogKChwYWlyczogVHJhY2VLZXlWYWx1ZVBhaXJbXSwgaW5kZXg6IG51bWJlcikgPT4gVHJhY2VMaW5rW10pIHwgVE5pbDtcbiAgb25Ub2dnbGU/OiBudWxsIHwgKCgpID0+IHZvaWQpO1xufTtcblxuLy8gZXhwb3J0IGZvciB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIEtleVZhbHVlc1N1bW1hcnkocHJvcHM6IHsgZGF0YT86IFRyYWNlS2V5VmFsdWVQYWlyW10gfSkge1xuICBjb25zdCB7IGRhdGEgfSA9IHByb3BzO1xuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpIHx8ICFkYXRhLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8dWwgY2xhc3NOYW1lPXtzdHlsZXMuc3VtbWFyeX0+XG4gICAgICB7ZGF0YS5tYXAoKGl0ZW0sIGkpID0+IChcbiAgICAgICAgLy8gYGlgIGlzIG5lY2Vzc2FyeSBpbiB0aGUga2V5IGJlY2F1c2UgaXRlbS5rZXkgY2FuIHJlcGVhdFxuICAgICAgICA8bGkgY2xhc3NOYW1lPXtzdHlsZXMuc3VtbWFyeUl0ZW19IGtleT17YCR7aXRlbS5rZXl9LSR7aX1gfT5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3N0eWxlcy5zdW1tYXJ5TGFiZWx9PntpdGVtLmtleX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuc3VtbWFyeURlbGltfT49PC9zcGFuPlxuICAgICAgICAgIHtTdHJpbmcoaXRlbS52YWx1ZSl9XG4gICAgICAgIDwvbGk+XG4gICAgICApKX1cbiAgICA8L3VsPlxuICApO1xufVxuXG5LZXlWYWx1ZXNTdW1tYXJ5LmRlZmF1bHRQcm9wcyA9IHtcbiAgZGF0YTogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFjY29yZGlhbktleVZhbHVlcyhwcm9wczogQWNjb3JkaWFuS2V5VmFsdWVzUHJvcHMpIHtcbiAgY29uc3QgeyBjbGFzc05hbWUsIGRhdGEsIGhpZ2hDb250cmFzdCwgaW50ZXJhY3RpdmUsIGlzT3BlbiwgbGFiZWwsIGxpbmtzR2V0dGVyLCBvblRvZ2dsZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGlzRW1wdHkgPSAhQXJyYXkuaXNBcnJheShkYXRhKSB8fCAhZGF0YS5sZW5ndGg7XG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcbiAgY29uc3QgaWNvbkNscyA9IGN4KHVBbGlnbkljb24sIHsgW3N0eWxlcy5lbXB0eUljb25dOiBpc0VtcHR5IH0pO1xuICBsZXQgYXJyb3c6IFJlYWN0LlJlYWN0Tm9kZSB8IG51bGwgPSBudWxsO1xuICBsZXQgaGVhZGVyUHJvcHM6IHt9IHwgbnVsbCA9IG51bGw7XG4gIGlmIChpbnRlcmFjdGl2ZSkge1xuICAgIGFycm93ID0gaXNPcGVuID8gPElvSW9zQXJyb3dEb3duIGNsYXNzTmFtZT17aWNvbkNsc30gLz4gOiA8SW9Jb3NBcnJvd1JpZ2h0IGNsYXNzTmFtZT17aWNvbkNsc30gLz47XG4gICAgaGVhZGVyUHJvcHMgPSB7XG4gICAgICAnYXJpYS1jaGVja2VkJzogaXNPcGVuLFxuICAgICAgb25DbGljazogaXNFbXB0eSA/IG51bGwgOiBvblRvZ2dsZSxcbiAgICAgIHJvbGU6ICdzd2l0Y2gnLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjeChjbGFzc05hbWUsIHVUeEVsbGlwc2lzKX0+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y3goc3R5bGVzLmhlYWRlciwge1xuICAgICAgICAgIFtzdHlsZXMuaGVhZGVyRW1wdHldOiBpc0VtcHR5LFxuICAgICAgICAgIFtzdHlsZXMuaGVhZGVySGlnaENvbnRyYXN0XTogaGlnaENvbnRyYXN0ICYmICFpc0VtcHR5LFxuICAgICAgICB9KX1cbiAgICAgICAgey4uLmhlYWRlclByb3BzfVxuICAgICAgICBkYXRhLXRlc3RpZD1cIkFjY29yZGlhbktleVZhbHVlcy0taGVhZGVyXCJcbiAgICAgID5cbiAgICAgICAge2Fycm93fVxuICAgICAgICA8c3Ryb25nIGRhdGEtdGVzdD17bWFya2Vycy5MQUJFTH0+XG4gICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIHtpc09wZW4gfHwgJzonfVxuICAgICAgICA8L3N0cm9uZz5cbiAgICAgICAgeyFpc09wZW4gJiYgPEtleVZhbHVlc1N1bW1hcnkgZGF0YT17ZGF0YX0gLz59XG4gICAgICA8L2Rpdj5cbiAgICAgIHtpc09wZW4gJiYgPEtleVZhbHVlc1RhYmxlIGRhdGE9e2RhdGF9IGxpbmtzR2V0dGVyPXtsaW5rc0dldHRlcn0gLz59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbkFjY29yZGlhbktleVZhbHVlcy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNsYXNzTmFtZTogbnVsbCxcbiAgaGlnaENvbnRyYXN0OiBmYWxzZSxcbiAgaW50ZXJhY3RpdmU6IHRydWUsXG4gIG9uVG9nZ2xlOiBudWxsLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsT0FBT0MsRUFBRSxNQUFNLFlBQVk7QUFDM0IsT0FBTyxLQUFLQyxLQUFLLE1BQU0sT0FBTztBQUM5QixPQUFPQyxjQUFjLE1BQU0sbUNBQW1DO0FBQzlELE9BQU9DLGVBQWUsTUFBTSxvQ0FBb0M7QUFHaEUsU0FBU0MsVUFBVSxRQUFRLGFBQWE7QUFFeEMsU0FBU0MsU0FBUyxRQUFRLGFBQWE7QUFHdkMsU0FBU0MsVUFBVSxF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