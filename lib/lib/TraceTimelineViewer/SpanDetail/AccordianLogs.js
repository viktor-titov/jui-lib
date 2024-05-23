import _extends from "@babel/runtime/helpers/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
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
import { sortBy as _sortBy } from 'lodash';
import * as React from 'react';
import IoIosArrowDown from 'react-icons/lib/io/ios-arrow-down';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';
import { useStyles2 } from '@grafana/ui';
import { autoColor } from '../../Theme';
import { uAlignIcon, ubMb1 } from '../../uberUtilityStyles';
import { formatDuration } from '../utils';
import AccordianKeyValues from './AccordianKeyValues';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = function getStyles(theme) {
  return {
    AccordianLogs: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      label: AccordianLogs;\n      border: 1px solid ", ";\n      position: relative;\n      margin-bottom: 0.25rem;\n    "])), autoColor(theme, '#d8d8d8')),
    AccordianLogsHeader: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      label: AccordianLogsHeader;\n      background: ", ";\n      color: inherit;\n      display: block;\n      padding: 0.25rem 0.5rem;\n      &:hover {\n        background: ", ";\n      }\n    "])), autoColor(theme, '#e4e4e4'), autoColor(theme, '#dadada')),
    AccordianLogsContent: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: AccordianLogsContent;\n      background: ", ";\n      border-top: 1px solid ", ";\n      padding: 0.5rem 0.5rem 0.25rem 0.5rem;\n    "])), autoColor(theme, '#f0f0f0'), autoColor(theme, '#d8d8d8')),
    AccordianLogsFooter: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: AccordianLogsFooter;\n      color: ", ";\n    "])), autoColor(theme, '#999'))
  };
};
export default function AccordianLogs(props) {
  var interactive = props.interactive,
    isOpen = props.isOpen,
    linksGetter = props.linksGetter,
    logs = props.logs,
    openedItems = props.openedItems,
    onItemToggle = props.onItemToggle,
    onToggle = props.onToggle,
    timestamp = props.timestamp;
  var arrow = null;
  var HeaderComponent = 'span';
  var headerProps = null;
  if (interactive) {
    arrow = isOpen ? /*#__PURE__*/_jsx(IoIosArrowDown, {
      className: uAlignIcon
    }) : /*#__PURE__*/_jsx(IoIosArrowRight, {
      className: "u-align-icon"
    });
    HeaderComponent = 'a';
    headerProps = {
      'aria-checked': isOpen,
      onClick: onToggle,
      role: 'switch'
    };
  }
  var styles = useStyles2(getStyles);
  return /*#__PURE__*/_jsxs("div", {
    className: styles.AccordianLogs,
    children: [/*#__PURE__*/_jsxs(HeaderComponent, _extends({
      className: styles.AccordianLogsHeader
    }, headerProps, {
      children: [arrow, " ", /*#__PURE__*/_jsx("strong", {
        children: "Events"
      }), " (", logs.length, ")"]
    })), isOpen && /*#__PURE__*/_jsxs("div", {
      className: styles.AccordianLogsContent,
      children: [_sortBy(logs, 'timestamp').map(function (log, i) {
        return /*#__PURE__*/_jsx(AccordianKeyValues
        // `i` is necessary in the key because timestamps can repeat
        , {
          className: i < logs.length - 1 ? ubMb1 : null,
          data: log.fields || [],
          highContrast: true,
          interactive: interactive,
          isOpen: openedItems ? openedItems.has(log) : false,
          label: "" + formatDuration(log.timestamp - timestamp),
          linksGetter: linksGetter,
          onToggle: interactive && onItemToggle ? function () {
            return onItemToggle(log);
          } : null
        }, log.timestamp + "-" + i);
      }), /*#__PURE__*/_jsx("small", {
        className: styles.AccordianLogsFooter,
        children: "Log timestamps are relative to the start time of the full trace."
      })]
    })]
  });
}
AccordianLogs.defaultProps = {
  interactive: true,
  linksGetter: undefined,
  onItemToggle: undefined,
  onToggle: undefined,
  openedItems: undefined
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJzb3J0QnkiLCJfc29ydEJ5IiwiUmVhY3QiLCJJb0lvc0Fycm93RG93biIsIklvSW9zQXJyb3dSaWdodCIsInVzZVN0eWxlczIiLCJhdXRvQ29sb3IiLCJ1QWxpZ25JY29uIiwidWJNYjEiLCJmb3JtYXREdXJhdGlvbiIsIkFjY29yZGlhbktleVZhbHVlcyIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJ0aGVtZSIsIkFjY29yZGlhbkxvZ3MiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJBY2NvcmRpYW5Mb2dzSGVhZGVyIiwiX3RlbXBsYXRlT2JqZWN0MiIsIkFjY29yZGlhbkxvZ3NDb250ZW50IiwiX3RlbXBsYXRlT2JqZWN0MyIsIkFjY29yZGlhbkxvZ3NGb290ZXIiLCJfdGVtcGxhdGVPYmplY3Q0IiwicHJvcHMiLCJpbnRlcmFjdGl2ZSIsImlzT3BlbiIsImxpbmtzR2V0dGVyIiwibG9ncyIsIm9wZW5lZEl0ZW1zIiwib25JdGVtVG9nZ2xlIiwib25Ub2dnbGUiLCJ0aW1lc3RhbXAiLCJhcnJvdyIsIkhlYWRlckNvbXBvbmVudCIsImhlYWRlclByb3BzIiwiY2xhc3NOYW1lIiwib25DbGljayIsInJvbGUiLCJzdHlsZXMiLCJjaGlsZHJlbiIsIl9leHRlbmRzIiwibGVuZ3RoIiwibWFwIiwibG9nIiwiaSIsImRhdGEiLCJmaWVsZHMiLCJoaWdoQ29udHJhc3QiLCJoYXMiLCJsYWJlbCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL0FjY29yZGlhbkxvZ3MudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IHsgc29ydEJ5IGFzIF9zb3J0QnkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IElvSW9zQXJyb3dEb3duIGZyb20gJ3JlYWN0LWljb25zL2xpYi9pby9pb3MtYXJyb3ctZG93bic7XG5pbXBvcnQgSW9Jb3NBcnJvd1JpZ2h0IGZyb20gJ3JlYWN0LWljb25zL2xpYi9pby9pb3MtYXJyb3ctcmlnaHQnO1xuXG5pbXBvcnQgeyBHcmFmYW5hVGhlbWUyIH0gZnJvbSAnQGdyYWZhbmEvZGF0YSc7XG5pbXBvcnQgeyB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi8uLi9UaGVtZSc7XG5pbXBvcnQgeyBUTmlsIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgVHJhY2VMb2csIFRyYWNlS2V5VmFsdWVQYWlyLCBUcmFjZUxpbmsgfSBmcm9tICcuLi8uLi90eXBlcy90cmFjZSc7XG5pbXBvcnQgeyB1QWxpZ25JY29uLCB1Yk1iMSB9IGZyb20gJy4uLy4uL3ViZXJVdGlsaXR5U3R5bGVzJztcbmltcG9ydCB7IGZvcm1hdER1cmF0aW9uIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5pbXBvcnQgQWNjb3JkaWFuS2V5VmFsdWVzIGZyb20gJy4vQWNjb3JkaWFuS2V5VmFsdWVzJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgQWNjb3JkaWFuTG9nczogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhbkxvZ3M7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNkOGQ4ZDgnKX07XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjI1cmVtO1xuICAgIGAsXG4gICAgQWNjb3JkaWFuTG9nc0hlYWRlcjogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhbkxvZ3NIZWFkZXI7XG4gICAgICBiYWNrZ3JvdW5kOiAke2F1dG9Db2xvcih0aGVtZSwgJyNlNGU0ZTQnKX07XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcGFkZGluZzogMC4yNXJlbSAwLjVyZW07XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZGFkYWRhJyl9O1xuICAgICAgfVxuICAgIGAsXG4gICAgQWNjb3JkaWFuTG9nc0NvbnRlbnQ6IGNzc2BcbiAgICAgIGxhYmVsOiBBY2NvcmRpYW5Mb2dzQ29udGVudDtcbiAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2YwZjBmMCcpfTtcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNkOGQ4ZDgnKX07XG4gICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtIDAuMjVyZW0gMC41cmVtO1xuICAgIGAsXG4gICAgQWNjb3JkaWFuTG9nc0Zvb3RlcjogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhbkxvZ3NGb290ZXI7XG4gICAgICBjb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICcjOTk5Jyl9O1xuICAgIGAsXG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBBY2NvcmRpYW5Mb2dzUHJvcHMgPSB7XG4gIGludGVyYWN0aXZlPzogYm9vbGVhbjtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBsaW5rc0dldHRlcjogKChwYWlyczogVHJhY2VLZXlWYWx1ZVBhaXJbXSwgaW5kZXg6IG51bWJlcikgPT4gVHJhY2VMaW5rW10pIHwgVE5pbDtcbiAgbG9nczogVHJhY2VMb2dbXTtcbiAgb25JdGVtVG9nZ2xlPzogKGxvZzogVHJhY2VMb2cpID0+IHZvaWQ7XG4gIG9uVG9nZ2xlPzogKCkgPT4gdm9pZDtcbiAgb3BlbmVkSXRlbXM/OiBTZXQ8VHJhY2VMb2c+O1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFjY29yZGlhbkxvZ3MocHJvcHM6IEFjY29yZGlhbkxvZ3NQcm9wcykge1xuICBjb25zdCB7IGludGVyYWN0aXZlLCBpc09wZW4sIGxpbmtzR2V0dGVyLCBsb2dzLCBvcGVuZWRJdGVtcywgb25JdGVtVG9nZ2xlLCBvblRvZ2dsZSwgdGltZXN0YW1wIH0gPSBwcm9wcztcbiAgbGV0IGFycm93OiBSZWFjdC5SZWFjdE5vZGUgfCBudWxsID0gbnVsbDtcbiAgbGV0IEhlYWRlckNvbXBvbmVudDogJ3NwYW4nIHwgJ2EnID0gJ3NwYW4nO1xuICBsZXQgaGVhZGVyUHJvcHM6IHt9IHwgbnVsbCA9IG51bGw7XG4gIGlmIChpbnRlcmFjdGl2ZSkge1xuICAgIGFycm93ID0gaXNPcGVuID8gPElvSW9zQXJyb3dEb3duIGNsYXNzTmFtZT17dUFsaWduSWNvbn0gLz4gOiA8SW9Jb3NBcnJvd1JpZ2h0IGNsYXNzTmFtZT1cInUtYWxpZ24taWNvblwiIC8+O1xuICAgIEhlYWRlckNvbXBvbmVudCA9ICdhJztcbiAgICBoZWFkZXJQcm9wcyA9IHtcbiAgICAgICdhcmlhLWNoZWNrZWQnOiBpc09wZW4sXG4gICAgICBvbkNsaWNrOiBvblRvZ2dsZSxcbiAgICAgIHJvbGU6ICdzd2l0Y2gnLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BY2NvcmRpYW5Mb2dzfT5cbiAgICAgIDxIZWFkZXJDb21wb25lbnQgY2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuTG9nc0hlYWRlcn0gey4uLmhlYWRlclByb3BzfT5cbiAgICAgICAge2Fycm93fSA8c3Ryb25nPkV2ZW50czwvc3Ryb25nPiAoe2xvZ3MubGVuZ3RofSlcbiAgICAgIDwvSGVhZGVyQ29tcG9uZW50PlxuICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuTG9nc0NvbnRlbnR9PlxuICAgICAgICAgIHtfc29ydEJ5KGxvZ3MsICd0aW1lc3RhbXAnKS5tYXAoKGxvZywgaSkgPT4gKFxuICAgICAgICAgICAgPEFjY29yZGlhbktleVZhbHVlc1xuICAgICAgICAgICAgICAvLyBgaWAgaXMgbmVjZXNzYXJ5IGluIHRoZSBrZXkgYmVjYXVzZSB0aW1lc3RhbXBzIGNhbiByZXBlYXRcbiAgICAgICAgICAgICAga2V5PXtgJHtsb2cudGltZXN0YW1wfS0ke2l9YH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtpIDwgbG9ncy5sZW5ndGggLSAxID8gdWJNYjEgOiBudWxsfVxuICAgICAgICAgICAgICBkYXRhPXtsb2cuZmllbGRzIHx8IFtdfVxuICAgICAgICAgICAgICBoaWdoQ29udHJhc3RcbiAgICAgICAgICAgICAgaW50ZXJhY3RpdmU9e2ludGVyYWN0aXZlfVxuICAgICAgICAgICAgICBpc09wZW49e29wZW5lZEl0ZW1zID8gb3BlbmVkSXRlbXMuaGFzKGxvZykgOiBmYWxzZX1cbiAgICAgICAgICAgICAgbGFiZWw9e2Ake2Zvcm1hdER1cmF0aW9uKGxvZy50aW1lc3RhbXAgLSB0aW1lc3RhbXApfWB9XG4gICAgICAgICAgICAgIGxpbmtzR2V0dGVyPXtsaW5rc0dldHRlcn1cbiAgICAgICAgICAgICAgb25Ub2dnbGU9e2ludGVyYWN0aXZlICYmIG9uSXRlbVRvZ2dsZSA/ICgpID0+IG9uSXRlbVRvZ2dsZShsb2cpIDogbnVsbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT17c3R5bGVzLkFjY29yZGlhbkxvZ3NGb290ZXJ9PlxuICAgICAgICAgICAgTG9nIHRpbWVzdGFtcHMgYXJlIHJlbGF0aXZlIHRvIHRoZSBzdGFydCB0aW1lIG9mIHRoZSBmdWxsIHRyYWNlLlxuICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuQWNjb3JkaWFuTG9ncy5kZWZhdWx0UHJvcHMgPSB7XG4gIGludGVyYWN0aXZlOiB0cnVlLFxuICBsaW5rc0dldHRlcjogdW5kZWZpbmVkLFxuICBvbkl0ZW1Ub2dnbGU6IHVuZGVmaW5lZCxcbiAgb25Ub2dnbGU6IHVuZGVmaW5lZCxcbiAgb3BlbmVkSXRlbXM6IHVuZGVmaW5lZCxcbn07XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLFNBQVNDLE1BQU0sSUFBSUMsT0FB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