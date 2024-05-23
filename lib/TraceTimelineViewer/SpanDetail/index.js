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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjc3MiLCJjeCIsIlJlYWN0IiwiSW9MaW5rIiwiZGF0ZVRpbWVGb3JtYXQiLCJjb25maWciLCJyZXBvcnRJbnRlcmFjdGlvbiIsIkJ1dHRvbiIsIkRhdGFMaW5rQnV0dG9uIiwiVGV4dEFyZWEiLCJ1c2VTdHlsZXMyIiwiYXV0b0NvbG9yIiwiRGl2aWRlciIsIkxhYmVsZWRMaXN0IiwidUFsaWduSWNvbiIsInViTTAiLCJ1Yk1iMSIsInViTXkxIiwidWJUeFJpZ2h0QWxpZ24iLCJUb3BPZlZpZXdSZWZUeXBlIiwiZm9ybWF0RHVyYXRpb24iLCJBY2NvcmRpYW5LZXlWYWx1ZXMiLCJBY2NvcmRpYW5Mb2dzIiwiQWNjb3JkaWFuUmVmZXJlbmNlcyIsIkFjY29yZGlhblRleHQiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiZ2V0U3R5bGVzIiwidGhlbWUiLCJoZWFkZXIiLCJfdGVtcGxhdGVPYmplY3QiLCJfdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UiLCJsaXN0V3JhcHBlciIsIl90ZW1wbGF0ZU9iamVjdDIiLCJkZWJ1Z0luZm8iLCJfdGVtcGxhdGVPYmplY3QzIiwiZGVidWdMYWJlbCIsIl90ZW1wbGF0ZU9iamVjdDQiLCJkZWJ1Z1ZhbHVlIiwiX3RlbXBsYXRlT2JqZWN0NSIsIkFjY29yZGlhbldhcm5pbmdzIiwiX3RlbXBsYXRlT2JqZWN0NiIsIkFjY29yZGlhbldhcm5pbmdzSGVhZGVyIiwiX3RlbXBsYXRlT2JqZWN0NyIsIkFjY29yZGlhbldhcm5pbmdzSGVhZGVyT3BlbiIsIl90ZW1wbGF0ZU9iamVjdDgiLCJBY2NvcmRpYW5XYXJuaW5nc0xhYmVsIiwiX3RlbXBsYXRlT2JqZWN0OSIsIlRleHRhcmVhIiwiX3RlbXBsYXRlT2JqZWN0MTAiLCJMaW5rSWNvbiIsIl90ZW1wbGF0ZU9iamVjdDExIiwiU3BhbkRldGFpbCIsInByb3BzIiwiZGV0YWlsU3RhdGUiLCJsaW5rc0dldHRlciIsImxvZ0l0ZW1Ub2dnbGUiLCJsb2dzVG9nZ2xlIiwicHJvY2Vzc1RvZ2dsZSIsInNwYW4iLCJ0YWdzVG9nZ2xlIiwidHJhY2VTdGFydFRpbWUiLCJ3YXJuaW5nc1RvZ2dsZSIsInN0YWNrVHJhY2VzVG9nZ2xlIiwicmVmZXJlbmNlc1RvZ2dsZSIsInJlZmVyZW5jZUl0ZW1Ub2dnbGUiLCJjcmVhdGVTcGFuTGluayIsImNyZWF0ZUZvY3VzU3BhbkxpbmsiLCJ0b3BPZlZpZXdSZWZUeXBlIiwiZGF0YXNvdXJjZVR5cGUiLCJpc1RhZ3NPcGVuIiwiaXNQcm9jZXNzT3BlbiIsImxvZ3NTdGF0ZSIsImxvZ3MiLCJpc1dhcm5pbmdzT3BlbiIsInJlZmVyZW5jZXNTdGF0ZSIsInJlZmVyZW5jZXMiLCJpc1N0YWNrVHJhY2VzT3BlbiIsIm9wZXJhdGlvbk5hbWUiLCJwcm9jZXNzIiwiZHVyYXRpb24iLCJyZWxhdGl2ZVN0YXJ0VGltZSIsInN0YXJ0VGltZSIsInRyYWNlSUQiLCJzcGFuSUQiLCJ0YWdzIiwid2FybmluZ3MiLCJzdGFja1RyYWNlcyIsInRpbWVab25lIiwib3ZlcnZpZXdJdGVtcyIsImtleSIsImxhYmVsIiwidmFsdWUiLCJzZXJ2aWNlTmFtZSIsImdldEFic29sdXRlVGltZSIsImNvbmNhdCIsImNoaWxkU3BhbkNvdW50Iiwic3R5bGVzIiwibG9nTGlua0J1dHRvbiIsInVuZGVmaW5lZCIsImxpbmtzIiwibG9nTGlua3MiLCJsaW5rIiwiX2V4dGVuZHMiLCJ0aXRsZSIsInRhcmdldCIsIm9yaWdpbiIsImZpZWxkIiwib25DbGljayIsImV2ZW50IiwiX2xpbmtzJGxvZ0xpbmtzIiwiX2xpbmtzJGxvZ0xpbmtzJDAkb25DIiwiX2xpbmtzJGxvZ0xpbmtzJCIsImdyYWZhbmFfdmVyc2lvbiIsImJ1aWxkSW5mbyIsInZlcnNpb24iLCJ0eXBlIiwibG9jYXRpb24iLCJjYWxsIiwiYnV0dG9uUHJvcHMiLCJpY29uIiwidmFyaWFudCIsInNpemUiLCJkaXNhYmxlZCIsInRvb2x0aXAiLCJjaGlsZHJlbiIsImZvY3VzU3BhbkxpbmsiLCJjbGFzc05hbWUiLCJkaXZpZGVyIiwiaXRlbXMiLCJkYXRhIiwiaXNPcGVuIiwib25Ub2dnbGUiLCJsZW5ndGgiLCJvcGVuZWRJdGVtcyIsIm9uSXRlbVRvZ2dsZSIsImxvZ0l0ZW0iLCJ0aW1lc3RhbXAiLCJoZWFkZXJDbGFzc05hbWUiLCJUZXh0Q29tcG9uZW50IiwidGV4dENvbXBvbmVudFByb3BzIiwiX3RleHRDb21wb25lbnRQcm9wcyRkIiwidGV4dCIsIm1hcCIsInN0YWNrVHJhY2UiLCJpbmRleCIsImpvaW4iLCJfdGV4dENvbXBvbmVudFByb3BzJGQyIiwic3R5bGUiLCJjdXJzb3IiLCJyZWFkT25seSIsImNvbHMiLCJyb3dzIiwicmVmVHlwZSIsInJlZmVyZW5jZSIsIkV4cGxvcmUiLCJlIiwiYnV0dG9uIiwiY3VycmVudFRhcmdldCIsIm1ldGFLZXkiLCJhbHRLZXkiLCJjdHJsS2V5Iiwic2hpZnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsImRhdGVTdHIiLCJkZWZhdWx0V2l0aE1TIiwibWF0Y2giLCJzcGxpdCIsImFic29sdXRlVGltZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFjZVRpbWVsaW5lVmlld2VyL1NwYW5EZXRhaWwvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNyBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9jc3MnO1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJb0xpbmsgZnJvbSAncmVhY3QtaWNvbnMvbGliL2lvL2xpbmsnO1xuXG5pbXBvcnQgeyBkYXRlVGltZUZvcm1hdCwgR3JhZmFuYVRoZW1lMiwgTGlua01vZGVsLCBUaW1lWm9uZSB9IGZyb20gJ0BncmFmYW5hL2RhdGEnO1xuaW1wb3J0IHsgY29uZmlnLCByZXBvcnRJbnRlcmFjdGlvbiB9IGZyb20gJ0BncmFmYW5hL3J1bnRpbWUnO1xuaW1wb3J0IHsgQnV0dG9uLCBEYXRhTGlua0J1dHRvbiwgVGV4dEFyZWEsIHVzZVN0eWxlczIgfSBmcm9tICdAZ3JhZmFuYS91aSc7XG5cbmltcG9ydCB7IGF1dG9Db2xvciB9IGZyb20gJy4uLy4uL1RoZW1lJztcbmltcG9ydCB7IERpdmlkZXIgfSBmcm9tICcuLi8uLi9jb21tb24vRGl2aWRlcic7XG5pbXBvcnQgTGFiZWxlZExpc3QgZnJvbSAnLi4vLi4vY29tbW9uL0xhYmVsZWRMaXN0JztcbmltcG9ydCB7IFNwYW5MaW5rRnVuYywgVE5pbCB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IFRyYWNlS2V5VmFsdWVQYWlyLCBUcmFjZUxpbmssIFRyYWNlTG9nLCBUcmFjZVNwYW4sIFRyYWNlU3BhblJlZmVyZW5jZSB9IGZyb20gJy4uLy4uL3R5cGVzL3RyYWNlJztcbmltcG9ydCB7IHVBbGlnbkljb24sIHViTTAsIHViTWIxLCB1Yk15MSwgdWJUeFJpZ2h0QWxpZ24gfSBmcm9tICcuLi8uLi91YmVyVXRpbGl0eVN0eWxlcyc7XG5pbXBvcnQgeyBUb3BPZlZpZXdSZWZUeXBlIH0gZnJvbSAnLi4vVmlydHVhbGl6ZWRUcmFjZVZpZXcnO1xuaW1wb3J0IHsgZm9ybWF0RHVyYXRpb24gfSBmcm9tICcuLi91dGlscyc7XG5cbmltcG9ydCBBY2NvcmRpYW5LZXlWYWx1ZXMgZnJvbSAnLi9BY2NvcmRpYW5LZXlWYWx1ZXMnO1xuaW1wb3J0IEFjY29yZGlhbkxvZ3MgZnJvbSAnLi9BY2NvcmRpYW5Mb2dzJztcbmltcG9ydCBBY2NvcmRpYW5SZWZlcmVuY2VzIGZyb20gJy4vQWNjb3JkaWFuUmVmZXJlbmNlcyc7XG5pbXBvcnQgQWNjb3JkaWFuVGV4dCBmcm9tICcuL0FjY29yZGlhblRleHQnO1xuaW1wb3J0IERldGFpbFN0YXRlIGZyb20gJy4vRGV0YWlsU3RhdGUnO1xuXG5jb25zdCBnZXRTdHlsZXMgPSAodGhlbWU6IEdyYWZhbmFUaGVtZTIpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBoZWFkZXI6IGNzc2BcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGdhcDogMCAxcmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMC4yNXJlbTtcbiAgICBgLFxuICAgIGxpc3RXcmFwcGVyOiBjc3NgXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGAsXG4gICAgZGVidWdJbmZvOiBjc3NgXG4gICAgICBsYWJlbDogZGVidWdJbmZvO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMC4yNXB4O1xuICAgICAgbWFyZ2luOiAwLjVlbSAwIC0wLjc1ZW07XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBgLFxuICAgIGRlYnVnTGFiZWw6IGNzc2BcbiAgICAgIGxhYmVsOiBkZWJ1Z0xhYmVsO1xuICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2JiYicpfTtcbiAgICAgICAgY29udGVudDogYXR0cihkYXRhLWxhYmVsKTtcbiAgICAgIH1cbiAgICBgLFxuICAgIGRlYnVnVmFsdWU6IGNzc2BcbiAgICAgIGxhYmVsOiBkZWJ1Z1ZhbHVlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyM4ODgnKX07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgY29sb3I6ICR7YXV0b0NvbG9yKHRoZW1lLCAnIzMzMycpfTtcbiAgICAgIH1cbiAgICBgLFxuICAgIEFjY29yZGlhbldhcm5pbmdzOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuV2FybmluZ3M7XG4gICAgICBiYWNrZ3JvdW5kOiAke2F1dG9Db2xvcih0aGVtZSwgJyNmYWZhZmEnKX07XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNlNGU0ZTQnKX07XG4gICAgICBtYXJnaW4tYm90dG9tOiAwLjI1cmVtO1xuICAgIGAsXG4gICAgQWNjb3JkaWFuV2FybmluZ3NIZWFkZXI6IGNzc2BcbiAgICAgIGxhYmVsOiBBY2NvcmRpYW5XYXJuaW5nc0hlYWRlcjtcbiAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2ZmZjdlNicpfTtcbiAgICAgIHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtO1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7YXV0b0NvbG9yKHRoZW1lLCAnI2ZmZTdiYScpfTtcbiAgICAgIH1cbiAgICBgLFxuICAgIEFjY29yZGlhbldhcm5pbmdzSGVhZGVyT3BlbjogY3NzYFxuICAgICAgbGFiZWw6IEFjY29yZGlhbldhcm5pbmdzSGVhZGVyT3BlbjtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke2F1dG9Db2xvcih0aGVtZSwgJyNlOGU4ZTgnKX07XG4gICAgYCxcbiAgICBBY2NvcmRpYW5XYXJuaW5nc0xhYmVsOiBjc3NgXG4gICAgICBsYWJlbDogQWNjb3JkaWFuV2FybmluZ3NMYWJlbDtcbiAgICAgIGNvbG9yOiAke2F1dG9Db2xvcih0aGVtZSwgJyNkMzZjMDgnKX07XG4gICAgYCxcbiAgICBUZXh0YXJlYTogY3NzYFxuICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICAgICAgd2hpdGUtc3BhY2U6IHByZTtcbiAgICBgLFxuICAgIExpbmtJY29uOiBjc3NgXG4gICAgICBmb250LXNpemU6IDEuNWVtO1xuICAgIGAsXG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBTcGFuRGV0YWlsUHJvcHMgPSB7XG4gIGRldGFpbFN0YXRlOiBEZXRhaWxTdGF0ZTtcbiAgbGlua3NHZXR0ZXI6ICgobGlua3M6IFRyYWNlS2V5VmFsdWVQYWlyW10sIGluZGV4OiBudW1iZXIpID0+IFRyYWNlTGlua1tdKSB8IFROaWw7XG4gIGxvZ0l0ZW1Ub2dnbGU6IChzcGFuSUQ6IHN0cmluZywgbG9nOiBUcmFjZUxvZykgPT4gdm9pZDtcbiAgbG9nc1RvZ2dsZTogKHNwYW5JRDogc3RyaW5nKSA9PiB2b2lkO1xuICBwcm9jZXNzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNwYW46IFRyYWNlU3BhbjtcbiAgdGltZVpvbmU6IFRpbWVab25lO1xuICB0YWdzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRyYWNlU3RhcnRUaW1lOiBudW1iZXI7XG4gIHdhcm5pbmdzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHN0YWNrVHJhY2VzVG9nZ2xlOiAoc3BhbklEOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlZmVyZW5jZUl0ZW1Ub2dnbGU6IChzcGFuSUQ6IHN0cmluZywgcmVmZXJlbmNlOiBUcmFjZVNwYW5SZWZlcmVuY2UpID0+IHZvaWQ7XG4gIHJlZmVyZW5jZXNUb2dnbGU6IChzcGFuSUQ6IHN0cmluZykgPT4gdm9pZDtcbiAgY3JlYXRlU3Bhbkxpbms/OiBTcGFuTGlua0Z1bmM7XG4gIGZvY3VzZWRTcGFuSWQ/OiBzdHJpbmc7XG4gIGNyZWF0ZUZvY3VzU3Bhbkxpbms6ICh0cmFjZUlkOiBzdHJpbmcsIHNwYW5JZDogc3RyaW5nKSA9PiBMaW5rTW9kZWw7XG4gIHRvcE9mVmlld1JlZlR5cGU/OiBUb3BPZlZpZXdSZWZUeXBlO1xuICBkYXRhc291cmNlVHlwZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3BhbkRldGFpbChwcm9wczogU3BhbkRldGFpbFByb3BzKSB7XG4gIGNvbnN0IHtcbiAgICBkZXRhaWxTdGF0ZSxcbiAgICBsaW5rc0dldHRlcixcbiAgICBsb2dJdGVtVG9nZ2xlLFxuICAgIGxvZ3NUb2dnbGUsXG4gICAgcHJvY2Vzc1RvZ2dsZSxcbiAgICBzcGFuLFxuICAgIHRhZ3NUb2dnbGUsXG4gICAgdHJhY2VTdGFydFRpbWUsXG4gICAgd2FybmluZ3NUb2dnbGUsXG4gICAgc3RhY2tUcmFjZXNUb2dnbGUsXG4gICAgcmVmZXJlbmNlc1RvZ2dsZSxcbiAgICByZWZlcmVuY2VJdGVtVG9nZ2xlLFxuICAgIGNyZWF0ZVNwYW5MaW5rLFxuICAgIGNyZWF0ZUZvY3VzU3BhbkxpbmssXG4gICAgdG9wT2ZWaWV3UmVmVHlwZSxcbiAgICBkYXRhc291cmNlVHlwZSxcbiAgfSA9IHByb3BzO1xuICBjb25zdCB7XG4gICAgaXNUYWdzT3BlbixcbiAgICBpc1Byb2Nlc3NPcGVuLFxuICAgIGxvZ3M6IGxvZ3NTdGF0ZSxcbiAgICBpc1dhcm5pbmdzT3BlbixcbiAgICByZWZlcmVuY2VzOiByZWZlcmVuY2VzU3RhdGUsXG4gICAgaXNTdGFja1RyYWNlc09wZW4sXG4gIH0gPSBkZXRhaWxTdGF0ZTtcbiAgY29uc3Qge1xuICAgIG9wZXJhdGlvbk5hbWUsXG4gICAgcHJvY2VzcyxcbiAgICBkdXJhdGlvbixcbiAgICByZWxhdGl2ZVN0YXJ0VGltZSxcbiAgICBzdGFydFRpbWUsXG4gICAgdHJhY2VJRCxcbiAgICBzcGFuSUQsXG4gICAgbG9ncyxcbiAgICB0YWdzLFxuICAgIHdhcm5pbmdzLFxuICAgIHJlZmVyZW5jZXMsXG4gICAgc3RhY2tUcmFjZXMsXG4gIH0gPSBzcGFuO1xuICBjb25zdCB7IHRpbWVab25lIH0gPSBwcm9wcztcbiAgY29uc3Qgb3ZlcnZpZXdJdGVtcyA9IFtcbiAgICB7XG4gICAgICBrZXk6ICdzdmMnLFxuICAgICAgbGFiZWw6ICdTZXJ2aWNlOicsXG4gICAgICB2YWx1ZTogcHJvY2Vzcy5zZXJ2aWNlTmFtZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ2R1cmF0aW9uJyxcbiAgICAgIGxhYmVsOiAnRHVyYXRpb246JyxcbiAgICAgIHZhbHVlOiBmb3JtYXREdXJhdGlvbihkdXJhdGlvbiksXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdzdGFydCcsXG4gICAgICBsYWJlbDogJ1N0YXJ0IFRpbWU6JyxcbiAgICAgIHZhbHVlOiBmb3JtYXREdXJhdGlvbihyZWxhdGl2ZVN0YXJ0VGltZSkgKyBnZXRBYnNvbHV0ZVRpbWUoc3RhcnRUaW1lLCB0aW1lWm9uZSksXG4gICAgfSxcbiAgICAuLi4oc3Bhbi5jaGlsZFNwYW5Db3VudCA+IDBcbiAgICAgID8gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGtleTogJ2NoaWxkX2NvdW50JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQ2hpbGQgQ291bnQ6JyxcbiAgICAgICAgICAgIHZhbHVlOiBzcGFuLmNoaWxkU3BhbkNvdW50LFxuICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICAgIDogW10pLFxuICBdO1xuICBjb25zdCBzdHlsZXMgPSB1c2VTdHlsZXMyKGdldFN0eWxlcyk7XG5cbiAgbGV0IGxvZ0xpbmtCdXR0b246IEpTWC5FbGVtZW50IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBpZiAoY3JlYXRlU3BhbkxpbmspIHtcbiAgICBjb25zdCBsaW5rcyA9IGNyZWF0ZVNwYW5MaW5rKHNwYW4pO1xuICAgIGlmIChsaW5rcz8ubG9nTGlua3MpIHtcbiAgICAgIGxvZ0xpbmtCdXR0b24gPSAoXG4gICAgICAgIDxEYXRhTGlua0J1dHRvblxuICAgICAgICAgIGxpbms9e3tcbiAgICAgICAgICAgIC4uLmxpbmtzLmxvZ0xpbmtzWzBdLFxuICAgICAgICAgICAgdGl0bGU6ICdMb2dzIGZvciB0aGlzIHNwYW4nLFxuICAgICAgICAgICAgdGFyZ2V0OiAnX2JsYW5rJyxcbiAgICAgICAgICAgIG9yaWdpbjogbGlua3MubG9nTGlua3NbMF0uZmllbGQsXG4gICAgICAgICAgICBvbkNsaWNrOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgcmVwb3J0SW50ZXJhY3Rpb24oJ2dyYWZhbmFfdHJhY2VzX3RyYWNlX3ZpZXdfc3Bhbl9saW5rX2NsaWNrZWQnLCB7XG4gICAgICAgICAgICAgICAgZGF0YXNvdXJjZVR5cGU6IGRhdGFzb3VyY2VUeXBlLFxuICAgICAgICAgICAgICAgIGdyYWZhbmFfdmVyc2lvbjogY29uZmlnLmJ1aWxkSW5mby52ZXJzaW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdsb2cnLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnc3BhbkRldGFpbHMnLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgbGlua3M/LmxvZ0xpbmtzPy5bMF0ub25DbGljaz8uKGV2ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfX1cbiAgICAgICAgICBidXR0b25Qcm9wcz17eyBpY29uOiAnZ2YtbG9ncycgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ0xpbmtCdXR0b24gPSAoXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICBpY29uPXsnZ2YtbG9ncyd9XG4gICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgICB0b29sdGlwPXtcbiAgICAgICAgICAgICdXZSBkaWQgbm90IG1hdGNoIGFueSB2YXJpYWJsZXMgYmV0d2VlbiB0aGUgbGluayBhbmQgdGhpcyBzcGFuLiBDaGVjayB5b3VyIGNvbmZpZ3VyYXRpb24gb3IgdGhpcyBzcGFuIGF0dHJpYnV0ZXMuJ1xuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgICAgIExvZ3MgZm9yIHRoaXMgc3BhblxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9jdXNTcGFuTGluayA9IGNyZWF0ZUZvY3VzU3BhbkxpbmsodHJhY2VJRCwgc3BhbklEKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtdGVzdGlkPVwic3Bhbi1kZXRhaWwtY29tcG9uZW50XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmhlYWRlcn0+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9e2N4KHViTTApfT57b3BlcmF0aW9uTmFtZX08L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmxpc3RXcmFwcGVyfT5cbiAgICAgICAgICA8TGFiZWxlZExpc3QgY2xhc3NOYW1lPXt1YlR4UmlnaHRBbGlnbn0gZGl2aWRlcj17dHJ1ZX0gaXRlbXM9e292ZXJ2aWV3SXRlbXN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICB7bG9nTGlua0J1dHRvbn1cbiAgICAgIDxEaXZpZGVyIGNsYXNzTmFtZT17dWJNeTF9IHR5cGU9eydob3Jpem9udGFsJ30gLz5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPEFjY29yZGlhbktleVZhbHVlc1xuICAgICAgICAgICAgZGF0YT17dGFnc31cbiAgICAgICAgICAgIGxhYmVsPVwiQXR0cmlidXRlc1wiXG4gICAgICAgICAgICBsaW5rc0dldHRlcj17bGlua3NHZXR0ZXJ9XG4gICAgICAgICAgICBpc09wZW49e2lzVGFnc09wZW59XG4gICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gdGFnc1RvZ2dsZShzcGFuSUQpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAge3Byb2Nlc3MudGFncyAmJiAoXG4gICAgICAgICAgICA8QWNjb3JkaWFuS2V5VmFsdWVzXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17dWJNYjF9XG4gICAgICAgICAgICAgIGRhdGE9e3Byb2Nlc3MudGFnc31cbiAgICAgICAgICAgICAgbGFiZWw9XCJSZXNvdXJjZVwiXG4gICAgICAgICAgICAgIGxpbmtzR2V0dGVyPXtsaW5rc0dldHRlcn1cbiAgICAgICAgICAgICAgaXNPcGVuPXtpc1Byb2Nlc3NPcGVufVxuICAgICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gcHJvY2Vzc1RvZ2dsZShzcGFuSUQpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2xvZ3MgJiYgbG9ncy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICA8QWNjb3JkaWFuTG9nc1xuICAgICAgICAgICAgbGlua3NHZXR0ZXI9e2xpbmtzR2V0dGVyfVxuICAgICAgICAgICAgbG9ncz17bG9nc31cbiAgICAgICAgICAgIGlzT3Blbj17bG9nc1N0YXRlLmlzT3Blbn1cbiAgICAgICAgICAgIG9wZW5lZEl0ZW1zPXtsb2dzU3RhdGUub3BlbmVkSXRlbXN9XG4gICAgICAgICAgICBvblRvZ2dsZT17KCkgPT4gbG9nc1RvZ2dsZShzcGFuSUQpfVxuICAgICAgICAgICAgb25JdGVtVG9nZ2xlPXsobG9nSXRlbSkgPT4gbG9nSXRlbVRvZ2dsZShzcGFuSUQsIGxvZ0l0ZW0pfVxuICAgICAgICAgICAgdGltZXN0YW1wPXt0cmFjZVN0YXJ0VGltZX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7d2FybmluZ3MgJiYgd2FybmluZ3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgPEFjY29yZGlhblRleHRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkFjY29yZGlhbldhcm5pbmdzfVxuICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuV2FybmluZ3NIZWFkZXJ9XG4gICAgICAgICAgICBsYWJlbD17PHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuQWNjb3JkaWFuV2FybmluZ3NMYWJlbH0+V2FybmluZ3M8L3NwYW4+fVxuICAgICAgICAgICAgZGF0YT17d2FybmluZ3N9XG4gICAgICAgICAgICBpc09wZW49e2lzV2FybmluZ3NPcGVufVxuICAgICAgICAgICAgb25Ub2dnbGU9eygpID0+IHdhcm5pbmdzVG9nZ2xlKHNwYW5JRCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge3N0YWNrVHJhY2VzICYmIHN0YWNrVHJhY2VzLmxlbmd0aCAmJiAoXG4gICAgICAgICAgPEFjY29yZGlhblRleHRcbiAgICAgICAgICAgIGxhYmVsPVwiU3RhY2sgdHJhY2VcIlxuICAgICAgICAgICAgZGF0YT17c3RhY2tUcmFjZXN9XG4gICAgICAgICAgICBpc09wZW49e2lzU3RhY2tUcmFjZXNPcGVufVxuICAgICAgICAgICAgVGV4dENvbXBvbmVudD17KHRleHRDb21wb25lbnRQcm9wcykgPT4ge1xuICAgICAgICAgICAgICBsZXQgdGV4dDtcbiAgICAgICAgICAgICAgaWYgKHRleHRDb21wb25lbnRQcm9wcy5kYXRhPy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHRDb21wb25lbnRQcm9wcy5kYXRhXG4gICAgICAgICAgICAgICAgICAubWFwKChzdGFja1RyYWNlLCBpbmRleCkgPT4gYFN0YWNrVHJhY2UgJHtpbmRleCArIDF9OlxcbiR7c3RhY2tUcmFjZX1gKVxuICAgICAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50UHJvcHMuZGF0YT8uWzBdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5UZXh0YXJlYX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGN1cnNvcjogJ3Vuc2V0JyB9fVxuICAgICAgICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICAgIGNvbHM9ezEwfVxuICAgICAgICAgICAgICAgICAgcm93cz17MTB9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGV4dH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uVG9nZ2xlPXsoKSA9PiBzdGFja1RyYWNlc1RvZ2dsZShzcGFuSUQpfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHtyZWZlcmVuY2VzICYmIHJlZmVyZW5jZXMubGVuZ3RoID4gMCAmJiAocmVmZXJlbmNlcy5sZW5ndGggPiAxIHx8IHJlZmVyZW5jZXNbMF0ucmVmVHlwZSAhPT0gJ0NISUxEX09GJykgJiYgKFxuICAgICAgICAgIDxBY2NvcmRpYW5SZWZlcmVuY2VzXG4gICAgICAgICAgICBkYXRhPXtyZWZlcmVuY2VzfVxuICAgICAgICAgICAgaXNPcGVuPXtyZWZlcmVuY2VzU3RhdGUuaXNPcGVufVxuICAgICAgICAgICAgb3BlbmVkSXRlbXM9e3JlZmVyZW5jZXNTdGF0ZS5vcGVuZWRJdGVtc31cbiAgICAgICAgICAgIG9uVG9nZ2xlPXsoKSA9PiByZWZlcmVuY2VzVG9nZ2xlKHNwYW5JRCl9XG4gICAgICAgICAgICBvbkl0ZW1Ub2dnbGU9eyhyZWZlcmVuY2UpID0+IHJlZmVyZW5jZUl0ZW1Ub2dnbGUoc3BhbklELCByZWZlcmVuY2UpfVxuICAgICAgICAgICAgY3JlYXRlRm9jdXNTcGFuTGluaz17Y3JlYXRlRm9jdXNTcGFuTGlua31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7dG9wT2ZWaWV3UmVmVHlwZSA9PT0gVG9wT2ZWaWV3UmVmVHlwZS5FeHBsb3JlICYmIChcbiAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPXtzdHlsZXMuZGVidWdJbmZvfT5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIHsuLi5mb2N1c1NwYW5MaW5rfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNsaWNrIGhhbmRsaW5nIGxvZ2ljIGNvcGllZCBmcm9tIHJlYWN0IHJvdXRlcjpcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcmVtaXgtcnVuL3JlYWN0LXJvdXRlci9ibG9iLzk5N2I0ZDY3ZTUwNmQzOWFjNjU3MWNiMzY5ZDZkMmQ2YjNkZGE1NTcvcGFja2FnZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC50c3gjTDM5Mi1MMzk0c1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGZvY3VzU3Bhbkxpbmsub25DbGljayAmJlxuICAgICAgICAgICAgICAgICAgZS5idXR0b24gPT09IDAgJiYgLy8gSWdub3JlIGV2ZXJ5dGhpbmcgYnV0IGxlZnQgY2xpY2tzXG4gICAgICAgICAgICAgICAgICAoIWUuY3VycmVudFRhcmdldC50YXJnZXQgfHwgZS5jdXJyZW50VGFyZ2V0LnRhcmdldCA9PT0gJ19zZWxmJykgJiYgLy8gTGV0IGJyb3dzZXIgaGFuZGxlIFwidGFyZ2V0PV9ibGFua1wiIGV0Yy5cbiAgICAgICAgICAgICAgICAgICEoZS5tZXRhS2V5IHx8IGUuYWx0S2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSAvLyBJZ25vcmUgY2xpY2tzIHdpdGggbW9kaWZpZXIga2V5c1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgZm9jdXNTcGFuTGluay5vbkNsaWNrKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPElvTGluayBjbGFzc05hbWU9e2N4KHVBbGlnbkljb24sIHN0eWxlcy5MaW5rSWNvbil9PjwvSW9MaW5rPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdHlsZXMuZGVidWdMYWJlbH0gZGF0YS1sYWJlbD1cIlNwYW5JRDpcIiAvPiB7c3BhbklEfVxuICAgICAgICAgIDwvc21hbGw+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldEFic29sdXRlVGltZSA9IChzdGFydFRpbWU6IG51bWJlciwgdGltZVpvbmU6IFRpbWVab25lKSA9PiB7XG4gIGNvbnN0IGRhdGVTdHIgPSBkYXRlVGltZUZvcm1hdChzdGFydFRpbWUgLyAxMDAwLCB7IHRpbWVab25lLCBkZWZhdWx0V2l0aE1TOiB0cnVlIH0pO1xuICBjb25zdCBtYXRjaCA9IGRhdGVTdHIuc3BsaXQoJyAnKTtcbiAgY29uc3QgYWJzb2x1dGVUaW1lID0gbWF0Y2hbMV0gPyBtYXRjaFsxXSA6IGRhdGVTdHI7XG4gIHJldHVybiBgICgke2Fic29sdXRlVGltZX0pYDtcbn07XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLEdBQUcsUUFBUSxjQUFjO0FBQ2xDLE9BQU9DLEVBQUUsTUFBTSxZQUFZO0FBQzNCLE9BQU9DLEtB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