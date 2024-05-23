import _extends from "@babel/runtime/helpers/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/taggedTemplateLiteralLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;
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
import React from 'react';
import IoLink from 'react-icons/lib/io/link';
import { dateTimeFormat } from '@grafana/data';
import { config, reportInteraction } from '@grafana/runtime';
import { Button, DataLinkButton, TextArea, useStyles2 } from '@grafana/ui';
import { autoColor } from '../../Theme';
import { Divider } from '../../common/Divider';
import LabeledList from '../../common/LabeledList';
import { uAlignIcon, ubM0, ubMb1, ubMy1, ubTxRightAlign } from '../../uberUtilityStyles';
import { TopOfViewRefType } from '../VirtualizedTraceView';
import { formatDuration } from '../utils';
import AccordianKeyValues from './AccordianKeyValues';
import AccordianLogs from './AccordianLogs';
import AccordianReferences from './AccordianReferences';
import AccordianText from './AccordianText';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var getStyles = function getStyles(theme) {
  return {
    header: css(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0 1rem;\n      margin-bottom: 0.25rem;\n    "]))),
    listWrapper: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n      overflow: hidden;\n    "]))),
    debugInfo: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n      label: debugInfo;\n      display: block;\n      letter-spacing: 0.25px;\n      margin: 0.5em 0 -0.75em;\n      text-align: right;\n    "]))),
    debugLabel: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n      label: debugLabel;\n      &::before {\n        color: ", ";\n        content: attr(data-label);\n      }\n    "])), autoColor(theme, '#bbb')),
    debugValue: css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["\n      label: debugValue;\n      background-color: inherit;\n      border: none;\n      color: ", ";\n      cursor: pointer;\n      &:hover {\n        color: ", ";\n      }\n    "])), autoColor(theme, '#888'), autoColor(theme, '#333')),
    AccordianWarnings: css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteralLoose(["\n      label: AccordianWarnings;\n      background: ", ";\n      border: 1px solid ", ";\n      margin-bottom: 0.25rem;\n    "])), autoColor(theme, '#fafafa'), autoColor(theme, '#e4e4e4')),
    AccordianWarningsHeader: css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteralLoose(["\n      label: AccordianWarningsHeader;\n      background: ", ";\n      padding: 0.25rem 0.5rem;\n      &:hover {\n        background: ", ";\n      }\n    "])), autoColor(theme, '#fff7e6'), autoColor(theme, '#ffe7ba')),
    AccordianWarningsHeaderOpen: css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteralLoose(["\n      label: AccordianWarningsHeaderOpen;\n      border-bottom: 1px solid ", ";\n    "])), autoColor(theme, '#e8e8e8')),
    AccordianWarningsLabel: css(_templateObject9 || (_templateObject9 = _taggedTemplateLiteralLoose(["\n      label: AccordianWarningsLabel;\n      color: ", ";\n    "])), autoColor(theme, '#d36c08')),
    Textarea: css(_templateObject10 || (_templateObject10 = _taggedTemplateLiteralLoose(["\n      word-break: break-all;\n      white-space: pre;\n    "]))),
    LinkIcon: css(_templateObject11 || (_templateObject11 = _taggedTemplateLiteralLoose(["\n      font-size: 1.5em;\n    "])))
  };
};
export default function SpanDetail(props) {
  var detailState = props.detailState,
    linksGetter = props.linksGetter,
    logItemToggle = props.logItemToggle,
    logsToggle = props.logsToggle,
    processToggle = props.processToggle,
    span = props.span,
    tagsToggle = props.tagsToggle,
    traceStartTime = props.traceStartTime,
    warningsToggle = props.warningsToggle,
    stackTracesToggle = props.stackTracesToggle,
    referencesToggle = props.referencesToggle,
    referenceItemToggle = props.referenceItemToggle,
    createSpanLink = props.createSpanLink,
    createFocusSpanLink = props.createFocusSpanLink,
    topOfViewRefType = props.topOfViewRefType,
    datasourceType = props.datasourceType;
  var isTagsOpen = detailState.isTagsOpen,
    isProcessOpen = detailState.isProcessOpen,
    logsState = detailState.logs,
    isWarningsOpen = detailState.isWarningsOpen,
    referencesState = detailState.references,
    isStackTracesOpen = detailState.isStackTracesOpen;
  var operationName = span.operationName,
    process = span.process,
    duration = span.duration,
    relativeStartTime = span.relativeStartTime,
    startTime = span.startTime,
    traceID = span.traceID,
    spanID = span.spanID,
    logs = span.logs,
    tags = span.tags,
    warnings = span.warnings,
    references = span.references,
    stackTraces = span.stackTraces;
  var timeZone = props.timeZone;
  var overviewItems = [{
    key: 'svc',
    label: 'Service:',
    value: process.serviceName
  }, {
    key: 'duration',
    label: 'Duration:',
    value: formatDuration(duration)
  }, {
    key: 'start',
    label: 'Start Time:',
    value: formatDuration(relativeStartTime) + getAbsoluteTime(startTime, timeZone)
  }].concat(span.childSpanCount > 0 ? [{
    key: 'child_count',
    label: 'Child Count:',
    value: span.childSpanCount
  }] : []);
  var styles = useStyles2(getStyles);
  var logLinkButton = undefined;
  if (createSpanLink) {
    var links = createSpanLink(span);
    if (links != null && links.logLinks) {
      logLinkButton = /*#__PURE__*/_jsx(DataLinkButton, {
        link: _extends({}, links.logLinks[0], {
          title: 'Logs for this span',
          target: '_blank',
          origin: links.logLinks[0].field,
          onClick: function onClick(event) {
            var _links$logLinks, _links$logLinks$0$onC, _links$logLinks$;
            reportInteraction('grafana_traces_trace_view_span_link_clicked', {
              datasourceType: datasourceType,
              grafana_version: config.buildInfo.version,
              type: 'log',
              location: 'spanDetails'
            });
            links == null || (_links$logLinks = links.logLinks) == null || (_links$logLinks$0$onC = (_links$logLinks$ = _links$logLinks[0]).onClick) == null || _links$logLinks$0$onC.call(_links$logLinks$, event);
          }
        }),
        buttonProps: {
          icon: 'gf-logs'
        }
      });
    } else {
      logLinkButton = /*#__PURE__*/_jsx(Button, {
        variant: "primary",
        size: "sm",
        icon: 'gf-logs',
        disabled: true,
        tooltip: 'We did not match any variables between the link and this span. Check your configuration or this span attributes.',
        children: "Logs for this span"
      });
    }
  }
  var focusSpanLink = createFocusSpanLink(traceID, spanID);
  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "span-detail-component",
    children: [/*#__PURE__*/_jsxs("div", {
      className: styles.header,
      children: [/*#__PURE__*/_jsx("h2", {
        className: cx(ubM0),
        children: operationName
      }), /*#__PURE__*/_jsx("div", {
        className: styles.listWrapper,
        children: /*#__PURE__*/_jsx(LabeledList, {
          className: ubTxRightAlign,
          divider: true,
          items: overviewItems
        })
      })]
    }), logLinkButton, /*#__PURE__*/_jsx(Divider, {
      className: ubMy1,
      type: 'horizontal'
    }), /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(AccordianKeyValues, {
          data: tags,
          label: "Attributes",
          linksGetter: linksGetter,
          isOpen: isTagsOpen,
          onToggle: function onToggle() {
            return tagsToggle(spanID);
          }
        }), process.tags && /*#__PURE__*/_jsx(AccordianKeyValues, {
          className: ubMb1,
          data: process.tags,
          label: "Resource",
          linksGetter: linksGetter,
          isOpen: isProcessOpen,
          onToggle: function onToggle() {
            return processToggle(spanID);
          }
        })]
      }), logs && logs.length > 0 && /*#__PURE__*/_jsx(AccordianLogs, {
        linksGetter: linksGetter,
        logs: logs,
        isOpen: logsState.isOpen,
        openedItems: logsState.openedItems,
        onToggle: function onToggle() {
          return logsToggle(spanID);
        },
        onItemToggle: function onItemToggle(logItem) {
          return logItemToggle(spanID, logItem);
        },
        timestamp: traceStartTime
      }), warnings && warnings.length > 0 && /*#__PURE__*/_jsx(AccordianText, {
        className: styles.AccordianWarnings,
        headerClassName: styles.AccordianWarningsHeader,
        label: /*#__PURE__*/_jsx("span", {
          className: styles.AccordianWarningsLabel,
          children: "Warnings"
        }),
        data: warnings,
        isOpen: isWarningsOpen,
        onToggle: function onToggle() {
          return warningsToggle(spanID);
        }
      }), stackTraces && stackTraces.length && /*#__PURE__*/_jsx(AccordianText, {
        label: "Stack trace",
        data: stackTraces,
        isOpen: isStackTracesOpen,
        TextComponent: function TextComponent(textComponentProps) {
          var _textComponentProps$d;
          var text;
          if (((_textComponentProps$d = textComponentProps.data) == null ? void 0 : _textComponentProps$d.length) > 1) {
            text = textComponentProps.data.map(function (stackTrace, index) {
              return "StackTrace " + (index + 1) + ":\n" + stackTrace;
            }).join('\n');
          } else {
            var _textComponentProps$d2;
            text = (_textComponentProps$d2 = textComponentProps.data) == null ? void 0 : _textComponentProps$d2[0];
          }
          return /*#__PURE__*/_jsx(TextArea, {
            className: styles.Textarea,
            style: {
              cursor: 'unset'
            },
            readOnly: true,
            cols: 10,
            rows: 10,
            value: text
          });
        },
        onToggle: function onToggle() {
          return stackTracesToggle(spanID);
        }
      }), references && references.length > 0 && (references.length > 1 || references[0].refType !== 'CHILD_OF') && /*#__PURE__*/_jsx(AccordianReferences, {
        data: references,
        isOpen: referencesState.isOpen,
        openedItems: referencesState.openedItems,
        onToggle: function onToggle() {
          return referencesToggle(spanID);
        },
        onItemToggle: function onItemToggle(reference) {
          return referenceItemToggle(spanID, reference);
        },
        createFocusSpanLink: createFocusSpanLink
      }), topOfViewRefType === TopOfViewRefType.Explore && /*#__PURE__*/_jsxs("small", {
        className: styles.debugInfo,
        children: [/*#__PURE__*/_jsx("a", _extends({}, focusSpanLink, {
          onClick: function onClick(e) {
            // click handling logic copied from react router:
            // https://github.com/remix-run/react-router/blob/997b4d67e506d39ac6571cb369d6d2d6b3dda557/packages/react-router-dom/index.tsx#L392-L394s
            if (focusSpanLink.onClick && e.button === 0 && (
            // Ignore everything but left clicks
            !e.currentTarget.target || e.currentTarget.target === '_self') &&
            // Let browser handle "target=_blank" etc.
            !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) // Ignore clicks with modifier keys
            ) {
              e.preventDefault();
              focusSpanLink.onClick(e);
            }
          },
          children: /*#__PURE__*/_jsx(IoLink, {
            className: cx(uAlignIcon, styles.LinkIcon)
          })
        })), /*#__PURE__*/_jsx("span", {
          className: styles.debugLabel,
          "data-label": "SpanID:"
        }), " ", spanID]
      })]
    })]
  });
}
export var getAbsoluteTime = function getAbsoluteTime(startTime, timeZone) {
  var dateStr = dateTimeFormat(startTime / 1000, {
    timeZone: timeZone,
    defaultWithMS: true
  });
  var match = dateStr.split(' ');
  var absoluteTime = match[1] ? match[1] : dateStr;
  return " (" + absoluteTime + ")";
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwiSW9MaW5rIiwiZGF0ZVRpbWVGb3JtYXQiLCJjb25maWciLCJyZXBvcnRJbnRlcmFjdGlvbiIsIkJ1dHRvbiIsIkRhdGFMaW5rQnV0dG9uIiwiVGV4dEFyZWEiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiRGl2aWRlciIsIkxhYmVsZWRMaXN0IiwidUFsaWduSWNvbiIsInViTTAiLCJ1Yk1iMSIsInViTXkxIiwidWJUeFJpZ2h0QWxpZ24iLCJUb3BPZlZpZXdSZWZUeXBlIiwiZm9ybWF0RHVyYXRpb24iLCJBY2NvcmRpYW5LZXlWYWx1ZXMiLCJBY2NvcmRpYW5Mb2dzIiwiQWNjb3JkaWFuUmVmZXJlbmNlcyIsIkFjY29yZGlhblRleHQiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJoZWFkZXIiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJsaXN0V3JhcHBlciIsIl90ZW1wbGF0ZU9iamVjdDIiLCJkZWJ1Z0luZm8iLCJfdGVtcGxhdGVPYmplY3QzIiwiZGVidWdMYWJlbCIsIl90ZW1wbGF0ZU9iamVjdDQiLCJkZWJ1Z1ZhbHVlIiwiX3RlbXBsYXRlT2JqZWN0NSIsIkFjY29yZGlhbldhcm5pbmdzIiwiX3RlbXBsYXRlT2JqZWN0NiIsIkFjY29yZGlhbldhcm5pbmdzSGVhZGVyIiwiX3RlbXBsYXRlT2JqZWN0NyIsIkFjY29yZGlhbldhcm5pbmdzSGVhZGVyT3BlbiIsIl90ZW1wbGF0ZU9iamVjdDgiLCJBY2NvcmRpYW5XYXJuaW5nc0xhYmVsIiwiX3RlbXBsYXRlT2JqZWN0OSIsIlRleHRhcmVhIiwiX3RlbXBsYXRlT2JqZWN0MTAiLCJMaW5rSWNvbiIsIl90ZW1wbGF0ZU9iamVjdDExIiwiU3BhbkRldGFpbCIsInByb3BzIiwiZGV0YWlsU3RhdGUiLCJsaW5rc0dldHRlciIsImxvZ0l0ZW1Ub2dnbGUiLCJsb2dzVG9nZ2xlIiwicHJvY2Vzc1RvZ2dsZSIsInNwYW4iLCJ0YWdzVG9nZ2xlIiwidHJhY2VTdGFydFRpbWUiLCJ3YXJuaW5nc1RvZ2dsZSIsInN0YWNrVHJhY2VzVG9nZ2xlIiwicmVmZXJlbmNlc1RvZ2dsZSIsInJlZmVyZW5jZUl0ZW1Ub2dnbGUiLCJjcmVhdGVTcGFuTGluayIsImNyZWF0ZUZvY3VzU3BhbkxpbmsiLCJ0b3BPZlZpZXdSZWZUeXBlIiwiZGF0YXNvdXJjZVR5cGUiLCJpc1RhZ3NPcGVuIiwiaXNQcm9jZXNzT3BlbiIsImxvZ3NTdGF0ZSIsImxvZ3MiLCJpc1dhcm5pbmdzT3BlbiIsInJlZmVyZW5jZXNTdGF0ZSIsInJlZmVyZW5jZXMiLCJpc1N0YWNrVHJhY2VzT3BlbiIsIm9wZXJhdGlvbk5hbWUiLCJwcm9jZXNzIiwiZHVyYXRpb24iLCJyZWxhdGl2ZVN0YXJ0VGltZSIsInN0YXJ0VGltZSIsInRyYWNlSUQiLCJzcGFuSUQiLCJ0YWdzIiwid2FybmluZ3MiLCJzdGFja1RyYWNlcyIsInRpbWVab25lIiwib3ZlcnZpZXdJdGVtcyIsImtleSIsImxhYmVsIiwidmFsdWUiLCJzZXJ2aWNlTmFtZSIsImdldEFic29sdXRlVGltZSIsImNvbmNhdCIsImNoaWxkU3BhbkNvdW50Iiwic3R5bGVzIiwibG9nTGlua0J1dHRvbiIsInVuZGVmaW5lZCIsImxpbmtzIiwibG9nTGlua3MiLCJsaW5rIiwiX2V4dGVuZHMiLCJ0aXRsZSIsInRhcmdldCIsIm9yaWdpbiIsImZpZWxkIiwib25DbGljayIsImV2ZW50IiwiX2xpbmtzJGxvZ0xpbmtzIiwiX2xpbmtzJGxvZ0xpbmtzJDAkb25DIiwiX2xpbmtzJGxvZ0xpbmtzJCIsImdyYWZhbmFfdmVyc2lvbiIsImJ1aWxkSW5mbyIsInZlcnNpb24iLCJ0eXBlIiwibG9jYXRpb24iLCJjYWxsIiwiYnV0dG9uUHJvcHMiLCJpY29uIiwidmFyaWFudCIsInNpemUiLCJkaXNhYmxlZCIsInRvb2x0aXAiLCJjaGlsZHJlbiIsImZvY3VzU3BhbkxpbmsiLCJjbGFzc05hbWUiLCJkaXZpZGVyIiwiaXRlbXMiLCJkYXRhIiwiaXNPcGVuIiwib25Ub2dnbGUiLCJsZW5ndGgiLCJvcGVuZWRJdGVtcyIsIm9uSXRlbVRvZ2dsZSIsImxvZ0l0ZW0iLCJ0aW1lc3RhbXAiLCJoZWFkZXJDbGFzc05hbWUiLCJUZXh0Q29tcG9uZW50IiwidGV4dENvbXBvbmVudFByb3BzIiwiX3RleHRDb21wb25lbnRQcm9wcyRkIiwidGV4dCIsIm1hcCIsInN0YWNrVHJhY2UiLCJpbmRleCIsImpvaW4iLCJfdGV4dENvbXBvbmVudFByb3BzJGQyIiwic3R5bGUiLCJjdXJzb3IiLCJyZWFkT25seSIsImNvbHMiLCJyb3dzIiwicmVmVHlwZSIsInJlZmVyZW5jZSIsIkV4cGxvcmUiLCJlIiwiYnV0dG9uIiwiY3VycmVudFRhcmdldCIsIm1ldGFLZXkiLCJhbHRLZXkiLCJjdHJsS2V5Iiwic2hpZnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsImRhdGVTdHIiLCJkZWZhdWx0V2l0aE1TIiwibWF0Y2giLCJzcGxpdCIsImFic29sdXRlVGltZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvVHJhY2VUaW1lbGluZVZpZXdlci9TcGFuRGV0YWlsL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTcgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY3NzJztcbmltcG9ydCBjeCBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW9MaW5rIGZyb20gJ3JlYWN0LWljb25zL2xpYi9pby9saW5rJztcblxuaW1wb3J0IHsgZGF0ZVRpbWVGb3JtYXQsIEdyYWZhbmFUaGVtZTIsIExpbmtNb2RlbCwgVGltZVpvbmUgfSBmcm9tICdAZ3JhZmFuYS9kYXRhJztcbmltcG9ydCB7IGNvbmZpZywgcmVwb3J0SW50ZXJhY3Rpb24gfSBmcm9tICdAZ3JhZmFuYS9ydW50aW1lJztcbmltcG9ydCB7IEJ1dHRvbiwgRGF0YUxpbmtCdXR0b24sIFRleHRBcmVhLCB1c2VTdHlsZXMyIH0gZnJvbSAnQGdyYWZhbmEvdWknO1xuXG5pbXBvcnQgeyBhdXRvQ29sb3IgfSBmcm9tICcuLi8uLi9UaGVtZSc7XG5pbXBvcnQgeyBEaXZpZGVyIH0gZnJvbSAnLi4vLi4vY29tbW9uL0RpdmlkZXInO1xuaW1wb3J0IExhYmVsZWRMaXN0IGZyb20gJy4uLy4uL2NvbW1vbi9MYWJlbGVkTGlzdCc7XG5pbXBvcnQgeyBTcGFuTGlua0Z1bmMsIFROaWwgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFjZUtleVZhbHVlUGFpciwgVHJhY2VMaW5rLCBUcmFjZUxvZywgVHJhY2VTcGFuLCBUcmFjZVNwYW5SZWZlcmVuY2UgfSBmcm9tICcuLi8uLi90eXBlcy90cmFjZSc7XG5pbXBvcnQgeyB1QWxpZ25JY29uLCB1Yk0wLCB1Yk1iMSwgdWJNeTEsIHViVHhSaWdodEFsaWduIH0gZnJvbSAnLi4vLi4vdWJlclV0aWxpdHlTdHlsZXMnO1xuaW1wb3J0IHsgVG9wT2ZWaWV3UmVmVHlwZSB9IGZyb20gJy4uL1ZpcnR1YWxpemVkVHJhY2VWaWV3JztcbmltcG9ydCB7IGZvcm1hdER1cmF0aW9uIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5pbXBvcnQgQWNjb3JkaWFuS2V5VmFsdWVzIGZyb20gJy4vQWNjb3JkaWFuS2V5VmFsdWVzJztcbmltcG9ydCBBY2NvcmRpYW5Mb2dzIGZyb20gJy4vQWNjb3JkaWFuTG9ncyc7XG5pbXBvcnQgQWNjb3JkaWFuUmVmZXJlbmNlcyBmcm9tICcuL0FjY29yZGlhblJlZmVyZW5jZXMnO1xuaW1wb3J0IEFjY29yZGlhblRleHQgZnJvbSAnLi9BY2NvcmRpYW5UZXh0JztcbmltcG9ydCBEZXRhaWxTdGF0ZSBmcm9tICcuL0RldGFpbFN0YXRlJztcblxuY29uc3QgZ2V0U3R5bGVzID0gKHRoZW1lOiBHcmFmYW5hVGhlbWUyKSA9PiB7XG4gIHJldHVybiB7XG4gICAgaGVhZGVyOiBjc3NgXG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBnYXA6IDAgMXJlbTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDAuMjVyZW07XG4gICAgYCxcbiAgICBsaXN0V3JhcHBlcjogY3NzYFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBgLFxuICAgIGRlYnVnSW5mbzogY3NzYFxuICAgICAgbGFiZWw6IGRlYnVnSW5mbztcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMjVweDtcbiAgICAgIG1hcmdpbjogMC41ZW0gMCAtMC43NWVtO1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgYCxcbiAgICBkZWJ1Z0xhYmVsOiBjc3NgXG4gICAgICBsYWJlbDogZGVidWdMYWJlbDtcbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyNiYmInKX07XG4gICAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1sYWJlbCk7XG4gICAgICB9XG4gICAgYCxcbiAgICBkZWJ1Z1ZhbHVlOiBjc3NgXG4gICAgICBsYWJlbDogZGVidWdWYWx1ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGluaGVyaXQ7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICcjODg4Jyl9O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyMzMzMnKX07XG4gICAgICB9XG4gICAgYCxcbiAgICBBY2NvcmRpYW5XYXJuaW5nczogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhbldhcm5pbmdzO1xuICAgICAgYmFja2dyb3VuZDogJHthdXRvQ29sb3IodGhlbWUsICcjZmFmYWZhJyl9O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjZTRlNGU0Jyl9O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMC4yNXJlbTtcbiAgICBgLFxuICAgIEFjY29yZGlhbldhcm5pbmdzSGVhZGVyOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuV2FybmluZ3NIZWFkZXI7XG4gICAgICBiYWNrZ3JvdW5kOiAke2F1dG9Db2xvcih0aGVtZSwgJyNmZmY3ZTYnKX07XG4gICAgICBwYWRkaW5nOiAwLjI1cmVtIDAuNXJlbTtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiAke2F1dG9Db2xvcih0aGVtZSwgJyNmZmU3YmEnKX07XG4gICAgICB9XG4gICAgYCxcbiAgICBBY2NvcmRpYW5XYXJuaW5nc0hlYWRlck9wZW46IGNzc2BcbiAgICAgIGxhYmVsOiBBY2NvcmRpYW5XYXJuaW5nc0hlYWRlck9wZW47XG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJHthdXRvQ29sb3IodGhlbWUsICcjZThlOGU4Jyl9O1xuICAgIGAsXG4gICAgQWNjb3JkaWFuV2FybmluZ3NMYWJlbDogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhbldhcm5pbmdzTGFiZWw7XG4gICAgICBjb2xvcjogJHthdXRvQ29sb3IodGhlbWUsICcjZDM2YzA4Jyl9O1xuICAgIGAsXG4gICAgVGV4dGFyZWE6IGNzc2BcbiAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgICAgIHdoaXRlLXNwYWNlOiBwcmU7XG4gICAgYCxcbiAgICBMaW5rSWNvbjogY3NzYFxuICAgICAgZm9udC1zaXplOiAxLjVlbTtcbiAgICBgLFxuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgU3BhbkRldGFpbFByb3BzID0ge1xuICBkZXRhaWxTdGF0ZTogRGV0YWlsU3RhdGU7XG4gIGxpbmtzR2V0dGVyOiAoKGxpbmtzOiBUcmFjZUtleVZhbHVlUGFpcltdLCBpbmRleDogbnVtYmVyKSA9PiBUcmFjZUxpbmtbXSkgfCBUTmlsO1xuICBsb2dJdGVtVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcsIGxvZzogVHJhY2VMb2cpID0+IHZvaWQ7XG4gIGxvZ3NUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgcHJvY2Vzc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBzcGFuOiBUcmFjZVNwYW47XG4gIHRpbWVab25lOiBUaW1lWm9uZTtcbiAgdGFnc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICB0cmFjZVN0YXJ0VGltZTogbnVtYmVyO1xuICB3YXJuaW5nc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBzdGFja1RyYWNlc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICByZWZlcmVuY2VJdGVtVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcsIHJlZmVyZW5jZTogVHJhY2VTcGFuUmVmZXJlbmNlKSA9PiB2b2lkO1xuICByZWZlcmVuY2VzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGNyZWF0ZVNwYW5MaW5rPzogU3BhbkxpbmtGdW5jO1xuICBmb2N1c2VkU3BhbklkPzogc3RyaW5nO1xuICBjcmVhdGVGb2N1c1NwYW5MaW5rOiAodHJhY2VJZDogc3RyaW5nLCBzcGFuSWQ6IHN0cmluZykgPT4gTGlua01vZGVsO1xuICB0b3BPZlZpZXdSZWZUeXBlPzogVG9wT2ZWaWV3UmVmVHlwZTtcbiAgZGF0YXNvdXJjZVR5cGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNwYW5EZXRhaWwocHJvcHM6IFNwYW5EZXRhaWxQcm9wcykge1xuICBjb25zdCB7XG4gICAgZGV0YWlsU3RhdGUsXG4gICAgbGlua3NHZXR0ZXIsXG4gICAgbG9nSXRlbVRvZ2dsZSxcbiAgICBsb2dzVG9nZ2xlLFxuICAgIHByb2Nlc3NUb2dnbGUsXG4gICAgc3BhbixcbiAgICB0YWdzVG9nZ2xlLFxuICAgIHRyYWNlU3RhcnRUaW1lLFxuICAgIHdhcm5pbmdzVG9nZ2xlLFxuICAgIHN0YWNrVHJhY2VzVG9nZ2xlLFxuICAgIHJlZmVyZW5jZXNUb2dnbGUsXG4gICAgcmVmZXJlbmNlSXRlbVRvZ2dsZSxcbiAgICBjcmVhdGVTcGFuTGluayxcbiAgICBjcmVhdGVGb2N1c1NwYW5MaW5rLFxuICAgIHRvcE9mVmlld1JlZlR5cGUsXG4gICAgZGF0YXNvdXJjZVR5cGUsXG4gIH0gPSBwcm9wcztcbiAgY29uc3Qge1xuICAgIGlzVGFnc09wZW4sXG4gICAgaXNQcm9jZXNzT3BlbixcbiAgICBsb2dzOiBsb2dzU3RhdGUsXG4gICAgaXNXYXJuaW5nc09wZW4sXG4gICAgcmVmZXJlbmNlczogcmVmZXJlbmNlc1N0YXRlLFxuICAgIGlzU3RhY2tUcmFjZXNPcGVuLFxuICB9ID0gZGV0YWlsU3RhdGU7XG4gIGNvbnN0IHtcbiAgICBvcGVyYXRpb25OYW1lLFxuICAgIHByb2Nlc3MsXG4gICAgZHVyYXRpb24sXG4gICAgcmVsYXRpdmVTdGFydFRpbWUsXG4gICAgc3RhcnRUaW1lLFxuICAgIHRyYWNlSUQsXG4gICAgc3BhbklELFxuICAgIGxvZ3MsXG4gICAgdGFncyxcbiAgICB3YXJuaW5ncyxcbiAgICByZWZlcmVuY2VzLFxuICAgIHN0YWNrVHJhY2VzLFxuICB9ID0gc3BhbjtcbiAgY29uc3QgeyB0aW1lWm9uZSB9ID0gcHJvcHM7XG4gIGNvbnN0IG92ZXJ2aWV3SXRlbXMgPSBbXG4gICAge1xuICAgICAga2V5OiAnc3ZjJyxcbiAgICAgIGxhYmVsOiAnU2VydmljZTonLFxuICAgICAgdmFsdWU6IHByb2Nlc3Muc2VydmljZU5hbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdkdXJhdGlvbicsXG4gICAgICBsYWJlbDogJ0R1cmF0aW9uOicsXG4gICAgICB2YWx1ZTogZm9ybWF0RHVyYXRpb24oZHVyYXRpb24pLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnc3RhcnQnLFxuICAgICAgbGFiZWw6ICdTdGFydCBUaW1lOicsXG4gICAgICB2YWx1ZTogZm9ybWF0RHVyYXRpb24ocmVsYXRpdmVTdGFydFRpbWUpICsgZ2V0QWJzb2x1dGVUaW1lKHN0YXJ0VGltZSwgdGltZVpvbmUpLFxuICAgIH0sXG4gICAgLi4uKHNwYW4uY2hpbGRTcGFuQ291bnQgPiAwXG4gICAgICA/IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBrZXk6ICdjaGlsZF9jb3VudCcsXG4gICAgICAgICAgICBsYWJlbDogJ0NoaWxkIENvdW50OicsXG4gICAgICAgICAgICB2YWx1ZTogc3Bhbi5jaGlsZFNwYW5Db3VudCxcbiAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgICA6IFtdKSxcbiAgXTtcbiAgY29uc3Qgc3R5bGVzID0gdXNlU3R5bGVzMihnZXRTdHlsZXMpO1xuXG4gIGxldCBsb2dMaW5rQnV0dG9uOiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgaWYgKGNyZWF0ZVNwYW5MaW5rKSB7XG4gICAgY29uc3QgbGlua3MgPSBjcmVhdGVTcGFuTGluayhzcGFuKTtcbiAgICBpZiAobGlua3M/LmxvZ0xpbmtzKSB7XG4gICAgICBsb2dMaW5rQnV0dG9uID0gKFxuICAgICAgICA8RGF0YUxpbmtCdXR0b25cbiAgICAgICAgICBsaW5rPXt7XG4gICAgICAgICAgICAuLi5saW5rcy5sb2dMaW5rc1swXSxcbiAgICAgICAgICAgIHRpdGxlOiAnTG9ncyBmb3IgdGhpcyBzcGFuJyxcbiAgICAgICAgICAgIHRhcmdldDogJ19ibGFuaycsXG4gICAgICAgICAgICBvcmlnaW46IGxpbmtzLmxvZ0xpbmtzWzBdLmZpZWxkLFxuICAgICAgICAgICAgb25DbGljazogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIHJlcG9ydEludGVyYWN0aW9uKCdncmFmYW5hX3RyYWNlc190cmFjZV92aWV3X3NwYW5fbGlua19jbGlja2VkJywge1xuICAgICAgICAgICAgICAgIGRhdGFzb3VyY2VUeXBlOiBkYXRhc291cmNlVHlwZSxcbiAgICAgICAgICAgICAgICBncmFmYW5hX3ZlcnNpb246IGNvbmZpZy5idWlsZEluZm8udmVyc2lvbixcbiAgICAgICAgICAgICAgICB0eXBlOiAnbG9nJyxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ3NwYW5EZXRhaWxzJyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGxpbmtzPy5sb2dMaW5rcz8uWzBdLm9uQ2xpY2s/LihldmVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH19XG4gICAgICAgICAgYnV0dG9uUHJvcHM9e3sgaWNvbjogJ2dmLWxvZ3MnIH19XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dMaW5rQnV0dG9uID0gKFxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgaWNvbj17J2dmLWxvZ3MnfVxuICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgdG9vbHRpcD17XG4gICAgICAgICAgICAnV2UgZGlkIG5vdCBtYXRjaCBhbnkgdmFyaWFibGVzIGJldHdlZW4gdGhlIGxpbmsgYW5kIHRoaXMgc3Bhbi4gQ2hlY2sgeW91ciBjb25maWd1cmF0aW9uIG9yIHRoaXMgc3BhbiBhdHRyaWJ1dGVzLidcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgICAgICBMb2dzIGZvciB0aGlzIHNwYW5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZvY3VzU3BhbkxpbmsgPSBjcmVhdGVGb2N1c1NwYW5MaW5rKHRyYWNlSUQsIHNwYW5JRCk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RpZD1cInNwYW4tZGV0YWlsLWNvbXBvbmVudFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5oZWFkZXJ9PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPXtjeCh1Yk0wKX0+e29wZXJhdGlvbk5hbWV9PC9oMj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5saXN0V3JhcHBlcn0+XG4gICAgICAgICAgPExhYmVsZWRMaXN0IGNsYXNzTmFtZT17dWJUeFJpZ2h0QWxpZ259IGRpdmlkZXI9e3RydWV9IGl0ZW1zPXtvdmVydmlld0l0ZW1zfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAge2xvZ0xpbmtCdXR0b259XG4gICAgICA8RGl2aWRlciBjbGFzc05hbWU9e3ViTXkxfSB0eXBlPXsnaG9yaXpvbnRhbCd9IC8+XG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxBY2NvcmRpYW5LZXlWYWx1ZXNcbiAgICAgICAgICAgIGRhdGE9e3RhZ3N9XG4gICAgICAgICAgICBsYWJlbD1cIkF0dHJpYnV0ZXNcIlxuICAgICAgICAgICAgbGlua3NHZXR0ZXI9e2xpbmtzR2V0dGVyfVxuICAgICAgICAgICAgaXNPcGVuPXtpc1RhZ3NPcGVufVxuICAgICAgICAgICAgb25Ub2dnbGU9eygpID0+IHRhZ3NUb2dnbGUoc3BhbklEKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtwcm9jZXNzLnRhZ3MgJiYgKFxuICAgICAgICAgICAgPEFjY29yZGlhbktleVZhbHVlc1xuICAgICAgICAgICAgICBjbGFzc05hbWU9e3ViTWIxfVxuICAgICAgICAgICAgICBkYXRhPXtwcm9jZXNzLnRhZ3N9XG4gICAgICAgICAgICAgIGxhYmVsPVwiUmVzb3VyY2VcIlxuICAgICAgICAgICAgICBsaW5rc0dldHRlcj17bGlua3NHZXR0ZXJ9XG4gICAgICAgICAgICAgIGlzT3Blbj17aXNQcm9jZXNzT3Blbn1cbiAgICAgICAgICAgICAgb25Ub2dnbGU9eygpID0+IHByb2Nlc3NUb2dnbGUoc3BhbklEKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtsb2dzICYmIGxvZ3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgPEFjY29yZGlhbkxvZ3NcbiAgICAgICAgICAgIGxpbmtzR2V0dGVyPXtsaW5rc0dldHRlcn1cbiAgICAgICAgICAgIGxvZ3M9e2xvZ3N9XG4gICAgICAgICAgICBpc09wZW49e2xvZ3NTdGF0ZS5pc09wZW59XG4gICAgICAgICAgICBvcGVuZWRJdGVtcz17bG9nc1N0YXRlLm9wZW5lZEl0ZW1zfVxuICAgICAgICAgICAgb25Ub2dnbGU9eygpID0+IGxvZ3NUb2dnbGUoc3BhbklEKX1cbiAgICAgICAgICAgIG9uSXRlbVRvZ2dsZT17KGxvZ0l0ZW0pID0+IGxvZ0l0ZW1Ub2dnbGUoc3BhbklELCBsb2dJdGVtKX1cbiAgICAgICAgICAgIHRpbWVzdGFtcD17dHJhY2VTdGFydFRpbWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3dhcm5pbmdzICYmIHdhcm5pbmdzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgIDxBY2NvcmRpYW5UZXh0XG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5BY2NvcmRpYW5XYXJuaW5nc31cbiAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZT17c3R5bGVzLkFjY29yZGlhbldhcm5pbmdzSGVhZGVyfVxuICAgICAgICAgICAgbGFiZWw9ezxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLkFjY29yZGlhbldhcm5pbmdzTGFiZWx9Pldhcm5pbmdzPC9zcGFuPn1cbiAgICAgICAgICAgIGRhdGE9e3dhcm5pbmdzfVxuICAgICAgICAgICAgaXNPcGVuPXtpc1dhcm5pbmdzT3Blbn1cbiAgICAgICAgICAgIG9uVG9nZ2xlPXsoKSA9PiB3YXJuaW5nc1RvZ2dsZShzcGFuSUQpfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHtzdGFja1RyYWNlcyAmJiBzdGFja1RyYWNlcy5sZW5ndGggJiYgKFxuICAgICAgICAgIDxBY2NvcmRpYW5UZXh0XG4gICAgICAgICAgICBsYWJlbD1cIlN0YWNrIHRyYWNlXCJcbiAgICAgICAgICAgIGRhdGE9e3N0YWNrVHJhY2VzfVxuICAgICAgICAgICAgaXNPcGVuPXtpc1N0YWNrVHJhY2VzT3Blbn1cbiAgICAgICAgICAgIFRleHRDb21wb25lbnQ9eyh0ZXh0Q29tcG9uZW50UHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgbGV0IHRleHQ7XG4gICAgICAgICAgICAgIGlmICh0ZXh0Q29tcG9uZW50UHJvcHMuZGF0YT8ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50UHJvcHMuZGF0YVxuICAgICAgICAgICAgICAgICAgLm1hcCgoc3RhY2tUcmFjZSwgaW5kZXgpID0+IGBTdGFja1RyYWNlICR7aW5kZXggKyAxfTpcXG4ke3N0YWNrVHJhY2V9YClcbiAgICAgICAgICAgICAgICAgIC5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dENvbXBvbmVudFByb3BzLmRhdGE/LlswXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUZXh0QXJlYVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVGV4dGFyZWF9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBjdXJzb3I6ICd1bnNldCcgfX1cbiAgICAgICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICBjb2xzPXsxMH1cbiAgICAgICAgICAgICAgICAgIHJvd3M9ezEwfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RleHR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gc3RhY2tUcmFjZXNUb2dnbGUoc3BhbklEKX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7cmVmZXJlbmNlcyAmJiByZWZlcmVuY2VzLmxlbmd0aCA+IDAgJiYgKHJlZmVyZW5jZXMubGVuZ3RoID4gMSB8fCByZWZlcmVuY2VzWzBdLnJlZlR5cGUgIT09ICdDSElMRF9PRicpICYmIChcbiAgICAgICAgICA8QWNjb3JkaWFuUmVmZXJlbmNlc1xuICAgICAgICAgICAgZGF0YT17cmVmZXJlbmNlc31cbiAgICAgICAgICAgIGlzT3Blbj17cmVmZXJlbmNlc1N0YXRlLmlzT3Blbn1cbiAgICAgICAgICAgIG9wZW5lZEl0ZW1zPXtyZWZlcmVuY2VzU3RhdGUub3BlbmVkSXRlbXN9XG4gICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gcmVmZXJlbmNlc1RvZ2dsZShzcGFuSUQpfVxuICAgICAgICAgICAgb25JdGVtVG9nZ2xlPXsocmVmZXJlbmNlKSA9PiByZWZlcmVuY2VJdGVtVG9nZ2xlKHNwYW5JRCwgcmVmZXJlbmNlKX1cbiAgICAgICAgICAgIGNyZWF0ZUZvY3VzU3Bhbkxpbms9e2NyZWF0ZUZvY3VzU3Bhbkxpbmt9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3RvcE9mVmlld1JlZlR5cGUgPT09IFRvcE9mVmlld1JlZlR5cGUuRXhwbG9yZSAmJiAoXG4gICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT17c3R5bGVzLmRlYnVnSW5mb30+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICB7Li4uZm9jdXNTcGFuTGlua31cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjbGljayBoYW5kbGluZyBsb2dpYyBjb3BpZWQgZnJvbSByZWFjdCByb3V0ZXI6XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JlbWl4LXJ1bi9yZWFjdC1yb3V0ZXIvYmxvYi85OTdiNGQ2N2U1MDZkMzlhYzY1NzFjYjM2OWQ2ZDJkNmIzZGRhNTU3L3BhY2thZ2VzL3JlYWN0LXJvdXRlci1kb20vaW5kZXgudHN4I0wzOTItTDM5NHNcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBmb2N1c1NwYW5MaW5rLm9uQ2xpY2sgJiZcbiAgICAgICAgICAgICAgICAgIGUuYnV0dG9uID09PSAwICYmIC8vIElnbm9yZSBldmVyeXRoaW5nIGJ1dCBsZWZ0IGNsaWNrc1xuICAgICAgICAgICAgICAgICAgKCFlLmN1cnJlbnRUYXJnZXQudGFyZ2V0IHx8IGUuY3VycmVudFRhcmdldC50YXJnZXQgPT09ICdfc2VsZicpICYmIC8vIExldCBicm93c2VyIGhhbmRsZSBcInRhcmdldD1fYmxhbmtcIiBldGMuXG4gICAgICAgICAgICAgICAgICAhKGUubWV0YUtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkgLy8gSWdub3JlIGNsaWNrcyB3aXRoIG1vZGlmaWVyIGtleXNcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIGZvY3VzU3Bhbkxpbmsub25DbGljayhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxJb0xpbmsgY2xhc3NOYW1lPXtjeCh1QWxpZ25JY29uLCBzdHlsZXMuTGlua0ljb24pfT48L0lvTGluaz5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLmRlYnVnTGFiZWx9IGRhdGEtbGFiZWw9XCJTcGFuSUQ6XCIgLz4ge3NwYW5JRH1cbiAgICAgICAgICA8L3NtYWxsPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRBYnNvbHV0ZVRpbWUgPSAoc3RhcnRUaW1lOiBudW1iZXIsIHRpbWVab25lOiBUaW1lWm9uZSkgPT4ge1xuICBjb25zdCBkYXRlU3RyID0gZGF0ZVRpbWVGb3JtYXQoc3RhcnRUaW1lIC8gMTAwMCwgeyB0aW1lWm9uZSwgZGVmYXVsdFdpdGhNUzogdHJ1ZSB9KTtcbiAgY29uc3QgbWF0Y2ggPSBkYXRlU3RyLnNwbGl0KCcgJyk7XG4gIGNvbnN0IGFic29sdXRlVGltZSA9IG1hdGNoWzFdID8gbWF0Y2hbMV0gOiBkYXRlU3RyO1xuICByZXR1cm4gYCAoJHthYnNvbHV0ZVRpbWV9KWA7XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxHQUFHLFFBQVEsY0FBYztBQUNsQyxPQUFPQyxFQUFFLE1BQU0sWUFBWTtBQUMzQixP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