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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJzb3J0QnkiLCJfc29ydEJ5IiwiUmVhY3QiLCJJb0lvc0Fycm93RG93biIsIklvSW9zQXJyb3dSaWdodCIsInVzZVN0eWxlczIiLCJhdXRvQ29sb3IiLCJ1QWxpZ25JY29uIiwidWJNYjEiLCJmb3JtYXREdXJhdGlvbiIsIkFjY29yZGlhbktleVZhbHVlcyIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJnZXRTdHlsZXMiLCJ0aGVtZSIsIkFjY29yZGlhbkxvZ3MiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJBY2NvcmRpYW5Mb2dzSGVhZGVyIiwiX3RlbXBsYXRlT2JqZWN0MiIsIkFjY29yZGlhbkxvZ3NDb250ZW50IiwiX3RlbXBsYXRlT2JqZWN0MyIsIkFjY29yZGlhbkxvZ3NGb290ZXIiLCJfdGVtcGxhdGVPYmplY3Q0IiwicHJvcHMiLCJpbnRlcmFjdGl2ZSIsImlzT3BlbiIsImxpbmtzR2V0dGVyIiwibG9ncyIsIm9wZW5lZEl0ZW1zIiwib25JdGVtVG9nZ2xlIiwib25Ub2dnbGUiLCJ0aW1lc3RhbXAiLCJhcnJvdyIsIkhlYWRlckNvbXBvbmVudCIsImhlYWRlclByb3BzIiwiY2xhc3NOYW1lIiwib25DbGljayIsInJvbGUiLCJzdHlsZXMiLCJjaGlsZHJlbiIsIl9leHRlbmRzIiwibGVuZ3RoIiwibWFwIiwibG9nIiwiaSIsImRhdGEiLCJmaWVsZHMiLCJoaWdoQ29udHJhc3QiLCJoYXMiLCJsYWJlbCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5EZXRhaWwvQWNjb3JkaWFuTG9ncy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2Nzcyc7XG5pbXBvcnQgeyBzb3J0QnkgYXMgX3NvcnRCeSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW9Jb3NBcnJvd0Rvd24gZnJvbSAncmVhY3QtaWNvbnMvbGliL2lvL2lvcy1hcnJvdy1kb3duJztcbmltcG9ydCBJb0lvc0Fycm93UmlnaHQgZnJvbSAncmVhY3QtaWNvbnMvbGliL2lvL2lvcy1hcnJvdy1yaWdodCc7XG5cbmltcG9ydCB7IEdyYWZhbmFUaGVtZTIgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmltcG9ydCB7IGF1dG9Db2xvciB9IGZyb20gJy4uLy4uL1RoZW1lJztcbmltcG9ydCB7IFROaWwgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFjZUxvZywgVHJhY2VLZXlWYWx1ZVBhaXIsIFRyYWNlTGluayB9IGZyb20gJy4uLy4uL3R5cGVzL3RyYWNlJztcbmltcG9ydCB7IHVBbGlnbkljb24sIHViTWIxIH0gZnJvbSAnLi4vLi4vdWJlclV0aWxpdHlTdHlsZXMnO1xuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24gfSBmcm9tICcuLi91dGlscyc7XG5cbmltcG9ydCBBY2NvcmRpYW5LZXlWYWx1ZXMgZnJvbSAnLi9BY2NvcmRpYW5LZXlWYWx1ZXMnO1xuXG5jb25zdCBnZXRTdHlsZXMgPSAodGhlbWU6IEdyYWZhbmFUaGVtZTIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBBY2NvcmRpYW5Mb2dzOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuTG9ncztcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2Q4ZDhkOCcpfTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuMjVyZW07XG4gICAgYCxcbiAgICBBY2NvcmRpYW5Mb2dzSGVhZGVyOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuTG9nc0hlYWRlcjtcbiAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2U0ZTRlNCcpfTtcbiAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiAke2F1dG9Db2xvcih0aGVtZSwgJyNkYWRhZGEnKX07XG4gICAgICB9XG4gICAgYCxcbiAgICBBY2NvcmRpYW5Mb2dzQ29udGVudDogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhbkxvZ3NDb250ZW50O1xuICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZjBmMGYwJyl9O1xuICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7YXV0b0NvbG9yKHRoZW1lLCAnI2Q4ZDhkOCcpfTtcbiAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW0gMC4yNXJlbSAwLjVyZW07XG4gICAgYCxcbiAgICBBY2NvcmRpYW5Mb2dzRm9vdGVyOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuTG9nc0Zvb3RlcjtcbiAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyM5OTknKX07XG4gICAgYCxcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIEFjY29yZGlhbkxvZ3NQcm9wcyA9IHtcbiAgaW50ZXJhY3RpdmU/OiBib29sZWFuO1xuICBpc09wZW46IGJvb2xlYW47XG4gIGxpbmtzR2V0dGVyOiAoKHBhaXJzOiBUcmFjZUtleVZhbHVlUGFpcltdLCBpbmRleDogbnVtYmVyKSA9PiBUcmFjZUxpbmtbXSkgfCBUTmlsO1xuICBsb2dzOiBUcmFjZUxvZ1tdO1xuICBvbkl0ZW1Ub2dnbGU/OiAobG9nOiBUcmFjZUxvZykgPT4gdm9pZDtcbiAgb25Ub2dnbGU/OiAoKSA9PiB2b2lkO1xuICBvcGVuZWRJdGVtcz86IFNldDxUcmFjZUxvZz47XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQWNjb3JkaWFuTG9ncyhwcm9wczogQWNjb3JkaWFuTG9nc1Byb3BzKSB7XG4gIGNvbnN0IHsgaW50ZXJhY3RpdmUsIGlzT3BlbiwgbGlua3NHZXR0ZXIsIGxvZ3MsIG9wZW5lZEl0ZW1zLCBvbkl0ZW1Ub2dnbGUsIG9uVG9nZ2xlLCB0aW1lc3RhbXAgfSA9IHByb3BzO1xuICBsZXQgYXJyb3c6IFJlYWN0LlJlYWN0Tm9kZSB8IG51bGwgPSBudWxsO1xuICBsZXQgSGVhZGVyQ29tcG9uZW50OiAnc3BhbicgfCAnYScgPSAnc3Bhbic7XG4gIGxldCBoZWFkZXJQcm9wczoge30gfCBudWxsID0gbnVsbDtcbiAgaWYgKGludGVyYWN0aXZlKSB7XG4gICAgYXJyb3cgPSBpc09wZW4gPyA8SW9Jb3NBcnJvd0Rvd24gY2xhc3NOYW1lPXt1QWxpZ25JY29ufSAvPiA6IDxJb0lvc0Fycm93UmlnaHQgY2xhc3NOYW1lPVwidS1hbGlnbi1pY29uXCIgLz47XG4gICAgSGVhZGVyQ29tcG9uZW50ID0gJ2EnO1xuICAgIGhlYWRlclByb3BzID0ge1xuICAgICAgJ2FyaWEtY2hlY2tlZCc6IGlzT3BlbixcbiAgICAgIG9uQ2xpY2s6IG9uVG9nZ2xlLFxuICAgICAgcm9sZTogJ3N3aXRjaCcsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlcyA9IHVzZVN0eWxlczIoZ2V0U3R5bGVzKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFjY29yZGlhbkxvZ3N9PlxuICAgICAgPEhlYWRlckNvbXBvbmVudCBjbGFzc05hbWU9e3N0eWxlcy5BY2NvcmRpYW5Mb2dzSGVhZGVyfSB7Li4uaGVhZGVyUHJvcHN9PlxuICAgICAgICB7YXJyb3d9IDxzdHJvbmc+RXZlbnRzPC9zdHJvbmc+ICh7bG9ncy5sZW5ndGh9KVxuICAgICAgPC9IZWFkZXJDb21wb25lbnQ+XG4gICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BY2NvcmRpYW5Mb2dzQ29udGVudH0+XG4gICAgICAgICAge19zb3J0QnkobG9ncywgJ3RpbWVzdGFtcCcpLm1hcCgobG9nLCBpKSA9PiAoXG4gICAgICAgICAgICA8QWNjb3JkaWFuS2V5VmFsdWVzXG4gICAgICAgICAgICAgIC8vIGBpYCBpcyBuZWNlc3NhcnkgaW4gdGhlIGtleSBiZWNhdXNlIHRpbWVzdGFtcHMgY2FuIHJlcGVhdFxuICAgICAgICAgICAgICBrZXk9e2Ake2xvZy50aW1lc3RhbXB9LSR7aX1gfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2kgPCBsb2dzLmxlbmd0aCAtIDEgPyB1Yk1iMSA6IG51bGx9XG4gICAgICAgICAgICAgIGRhdGE9e2xvZy5maWVsZHMgfHwgW119XG4gICAgICAgICAgICAgIGhpZ2hDb250cmFzdFxuICAgICAgICAgICAgICBpbnRlcmFjdGl2ZT17aW50ZXJhY3RpdmV9XG4gICAgICAgICAgICAgIGlzT3Blbj17b3BlbmVkSXRlbXMgPyBvcGVuZWRJdGVtcy5oYXMobG9nKSA6IGZhbHNlfVxuICAgICAgICAgICAgICBsYWJlbD17YCR7Zm9ybWF0RHVyYXRpb24obG9nLnRpbWVzdGFtcCAtIHRpbWVzdGFtcCl9YH1cbiAgICAgICAgICAgICAgbGlua3NHZXR0ZXI9e2xpbmtzR2V0dGVyfVxuICAgICAgICAgICAgICBvblRvZ2dsZT17aW50ZXJhY3RpdmUgJiYgb25JdGVtVG9nZ2xlID8gKCkgPT4gb25JdGVtVG9nZ2xlKGxvZykgOiBudWxsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuTG9nc0Zvb3Rlcn0+XG4gICAgICAgICAgICBMb2cgdGltZXN0YW1wcyBhcmUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IHRpbWUgb2YgdGhlIGZ1bGwgdHJhY2UuXG4gICAgICAgICAgPC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5BY2NvcmRpYW5Mb2dzLmRlZmF1bHRQcm9wcyA9IHtcbiAgaW50ZXJhY3RpdmU6IHRydWUsXG4gIGxpbmtzR2V0dGVyOiB1bmRlZmluZWQsXG4gIG9uSXRlbVRvZ2dsZTogdW5kZWZpbmVkLFxuICBvblRvZ2dsZTogdW5kZWZpbmVkLFxuICBvcGVuZWRJdGVtczogdW5kZWZpbmVkLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsR0FBRyxRQUFRLGNBQWM7QUFDbEMsU0FBU0MsTUFBTSxJQUFJQyxPQUFPLFFBQVEs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